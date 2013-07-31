package com.intel.ide.eclipse.mpt.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
import java.util.Vector;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;

import org.eclipse.core.filesystem.EFS;
import org.eclipse.core.filesystem.IFileStore;
import org.eclipse.core.filesystem.IFileSystem;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IResourceVisitor;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceDescription;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Status;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.launching.JavaRuntime;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.intel.ide.eclipse.mpt.MayloonVersion;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptException;
import com.intel.ide.eclipse.mpt.MptMessages;
import com.intel.ide.eclipse.mpt.MptPlugin;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.compressor.CompressException;
import com.intel.ide.eclipse.mpt.compressor.Compressor;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;
import com.intel.ide.eclipse.mpt.project.AndroidXPathFactory;
import com.intel.ide.eclipse.mpt.project.MayloonClasspathContainerInitializer;
import com.intel.ide.eclipse.mpt.project.MayloonProjectMessages;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;

/*
 * class to provide util functions to help Mayloon project
 */
/**
 * @author mayloon
 * 
 */
public class ProjectUtil {

	private static final int BUFFER = 2048;

	public enum OutputLevel {
		/** Silent mode. Project creation will only display errors. */
		SILENT,
		/**
		 * Normal mode. Project creation will display what's being done, display
		 * error but not warnings.
		 */
		NORMAL,
		/**
		 * Verbose mode. Project creation will display what's being done, errors
		 * and warnings.
		 */
		VERBOSE;
	}

	private static OutputLevel mLevel;

	/**
	 * Get the Mayloon output folder, the tizen package will be created there.
	 * 
	 * @param project
	 * @throws CoreException
	 */
	public static IPath getMayloonOutputFolder(IProject project)
			throws CoreException {
		Properties prop = new Properties();
		try {
			FileInputStream fiStream = new FileInputStream(project.getProject()
					.getLocation()
					.append(MptConstants.MAYLOON_BUILD_PROPERTIES).toFile());
			prop.load(fiStream);
			fiStream.close();
		} catch (IOException e) {
			MptPluginConsole.warning(MptConstants.GENERAL_TAG,
					"Could not open %1$s for project %2$s",
					MptConstants.MAYLOON_BUILD_PROPERTIES, project.getName());
			e.printStackTrace();
		}
		String destnation = prop
				.getProperty(MptConstants.PROPERTY_CURRENT_PROJECT_EXPORT_DESTINATION);
		if (destnation == null) {
			IFolder MayloonOutputFolder = project
					.getFolder(MptConstants.MAYLOON_OUTPUT_DIR);
			if (MayloonOutputFolder == null || !MayloonOutputFolder.exists()) {
				MayloonOutputFolder.create(true, true, null);
			}
			destnation = MayloonOutputFolder.getRawLocation().toString();
		}
		IPath path = new Path(destnation);
		return path;
	}

	/**
	 * Set the Mayloon output folder, the tizen package will be created there.
	 * 
	 * @param project
	 * @param destinationFile
	 * @throws CoreException
	 */
	public static void setMayloonOutputFolder(IProject project,
			File destinationFile) {
		try {
			Properties prop = new Properties();
			FileInputStream fiStream = new FileInputStream(project.getProject()
					.getLocation()
					.append(MptConstants.MAYLOON_BUILD_PROPERTIES).toFile());
			prop.load(fiStream);
			fiStream.close();
			prop.setProperty(
					MptConstants.PROPERTY_CURRENT_PROJECT_EXPORT_DESTINATION,
					destinationFile.toString());
			FileOutputStream foStream = new FileOutputStream(project
					.getProject().getLocation()
					.append(MptConstants.MAYLOON_BUILD_PROPERTIES).toFile());
			prop.store(foStream,
					"Mayloon Build Properties. This is automatically generated by Mayloon Builder.");
			foStream.close();
		} catch (IOException e) {
			MptPluginConsole.warning(MptConstants.GENERAL_TAG,
					"Could not create %1$s for project %2$s",
					MptConstants.MAYLOON_BUILD_PROPERTIES, project.getName());
			e.printStackTrace();
		}
	}

	/**
	 * Move the build output of android project to the application resource
	 * folder of Mayloon project
	 * 
	 * Step 1. move /gen/package/R.java to /src/[application package name]/ Step
	 * 2. move /[android output root]/[application package name] to /[mayloon
	 * output]/apps/
	 * 
	 * @param project
	 * @param deployMode
	 * @param packageName
	 * @param isExport
	 *            , whether call it from export logic
	 * @throws CoreException
	 * @throws MptException
	 */
	public static void addAndroidOutput2Mayloon(IProject project,
			String deployMode, String packageName, boolean isExport)
			throws CoreException, MptException {

		// Step 1
		if (packageName != null && !packageName.equals("")) {
			// Step 2
			IPath filePath = project.getLocation().append(
					MptConstants.ANDROID_OUTPUT_DIR);

			// copy .apk to .zip otherwise, java Zip api can't read .apk as zip
			// file
			IPath tempZipFile = filePath.append(project.getName()
					+ MptConstants.ZIP_FILE_EXTENSION);
			IPath apkFile = filePath.append(project.getName()
					+ MptConstants.ANDROID_APK_EXTENSION);

			if (!apkFile.toFile().exists()) {
				MptPluginConsole
						.error(MptConstants.CONVERT_TAG,
								"Mayloon Convert aborts because Android builder doesn't build Apk successfully. Please try full build by clean & build.");
				throw new MptException("Can't get file %1$s.",
						project.getName());
			}

			copyFile(apkFile.toOSString(), tempZipFile.toOSString());

			// unzip android appliction .zip to bin/apps/pckageName/

			String apkFileName = project.getName()
					+ MptConstants.ZIP_FILE_EXTENSION;

			if (deployMode.equals(MptConstants.J2S_DEPLOY_MODE_BROWSER)) {

				String mayloonBinAppPath = project.getLocation().append(
						"bin/apps/")
						+ packageName + "/";
				ProjectUtil.fileExtractor(filePath.toOSString(), apkFileName,
						mayloonBinAppPath);

			} else if (deployMode.equals(MptConstants.J2S_DEPLOY_MODE_TIZEN)) {
				String mayloon4TizenBinAppPath = getMayloonOutputFolder(project)
						.append("bin/apps/") + packageName + "/";
				ProjectUtil.fileExtractor(filePath.toOSString(), apkFileName,
						mayloon4TizenBinAppPath);
			}

			// delete .zip otherwise
			deleteFiles(tempZipFile);
		}
	}

	/**
	 * Get miss class's package location
	 * 
	 * @param packageSplit
	 * @param project
	 * @return IPath
	 */
	public static IPath GetPackageLocation(String[] packageSplit,
			IProject project) {

		IPath destFilePath = project.getLocation().append(
				MptConstants.MAYLOON_SRC_DIR);

		for (int i = 0; i < packageSplit.length - 1; i++) {
			destFilePath = destFilePath.append(packageSplit[i]);
		}
		return destFilePath;
	}

	/**
	 * Create the package folder from missing class string
	 * 
	 * @param destFilePath
	 * @param project
	 * @return retVal
	 */
	public static boolean CreateMissClassPackageFolder(IPath destFilePath,
			IProject project) {
		boolean retVal = true;
		File files = new File(destFilePath.toOSString());
		if (!files.exists()) {
			if (files.mkdirs()) {
				System.out
						.println("Miss Class Package directories are created!");

			} else {
				System.out
						.println("Failed to create Miss Class Package directories!");
				retVal = false;
			}
		}

		return retVal;
	}

	/**
	 * Create the Annotation Class folder
	 * 
	 * @param destFilePath
	 * @param project
	 * @return retVal
	 */
	public static boolean CreateAnnotationFolder(IPath destFilePath,
			IProject project) {
		boolean retVal = false;
		File files = new File(destFilePath.toOSString());
		if (!files.exists()) {
			if (files.mkdirs()) {
				System.out
						.println("Mayloon Stub Annotation Class directories are created!");
				retVal = true;
			} else {
				System.out
						.println("Failed to create Mayloon Stub Annotation Class directories!");

			}
		}

		return retVal;
	}

	/**
	 * move file from src to dest
	 * 
	 * @param srcPath
	 * @param destPath
	 */
	public static void moveFiles(IPath srcPath, IPath destPath) {
		IFileSystem fileSystem = EFS.getLocalFileSystem();
		IFileStore destDir = fileSystem.getStore(destPath);
		IFileStore srcDir = fileSystem.getStore(srcPath);

		// Will recursively copy the home directory to the backup
		// directory, overwriting any files in the backup directory in the way.
		try {
			srcDir.move(destDir, EFS.OVERWRITE, null);
		} catch (CoreException e) {
			MptPluginConsole
					.error(MptConstants.CONVERT_TAG,
							"Could not move Android output resource due to cause {%1$s}.",
							e.getMessage());
		}
	}

	/**
	 * Copy file from plugin to user's project
	 * 
	 * @param srcPath
	 * @param destPath
	 * @throws CoreException
	 */
	public static void copyFilesFromPlugin2UserProject(IPath srcPath, IPath destPath,
			boolean bCompress){
		ProjectUtil.mergeFolder(srcPath.toOSString(), destPath.toOSString(), true, bCompress);
	}
	
	public static void copyFilesFromPlugin2UserProject(IPath srcPath, IPath destPath)
			throws CoreException{
		IFileSystem fileSystem = EFS.getLocalFileSystem();
		IFileStore destDir = fileSystem.getStore(destPath);
		IFileStore srcDir = fileSystem.getStore(srcPath);

		// Will recursively copy the home directory to the backup
		// directory, overwriting any files in the backup directory in the way.
		srcDir.copy(destDir, EFS.OVERWRITE, null);
	}

	/**
	 * delete file from src folder
	 * 
	 * @param srcPath
	 */
	public static void deleteFiles(IPath srcPath) {
		IFileSystem fileSystem = EFS.getLocalFileSystem();
		IFileStore srcDir = fileSystem.getStore(srcPath);

		try {
			srcDir.delete(EFS.NONE, null);
		} catch (CoreException e) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG,
					"Could not clear Android gen folder due to cause {%1$s}.",
					e.getMessage());
		}
	}

	/**
	 * Copy .html and icon.png to Tizen deployment directory
	 * 
	 * @param project
	 * @throws CoreException
	 * @throws MptException 
	 */
	public static void addTizenProjectFile(IProject project)
			throws CoreException, MptException {
		try {
			IPath destPath = null;
			IPath srcPath;
			IFile srcFile = project.getFile(MptConstants.WS_ROOT + project.getName()
					+ MptConstants.MAYLOON_START_ENTRY_FILE);
			if(!srcFile.exists()){
				throw new MptException("Can't get %1$s.html", project.getName());
			}
			destPath = getMayloonOutputFolder(project).append(
					project.getName() + MptConstants.MAYLOON_START_ENTRY_FILE);

			srcPath = srcFile.getRawLocation();
			
			BufferedReader bufferedReader = new BufferedReader(new FileReader(srcPath.toOSString()));
			BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(destPath.toOSString()));
			String read = null;
			String write = null;
			String j2sLibTag = "var j2slibPath";
			while ((read = bufferedReader.readLine()) != null)
			{
				int beginIndex, endIndex;
				if(read.indexOf(j2sLibTag) != -1){
					write = "var j2slibPath=\"./j2slib/\"\r\n";
				}else{
					write = read;
				}
				bufferedWriter.write(write);
				bufferedWriter.newLine();
				bufferedWriter.flush();
		    }
			bufferedWriter.close();
			bufferedReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Add icon for tizen project
	 */
	public static void addProjectIcon(IProject project, String packageName){
		File srcIconFile = null;
		IPath dstPath = null;
		try {
			dstPath = getMayloonOutputFolder(project);
		} catch (CoreException e1) {
			return;
		}

		IResource manifest = project.findMember(MptConstants.ANDROID_MANIFEST_FILE);
		FileInputStream stream = null;
		String iconPath = null;
		XPath path = AndroidXPathFactory.newXPath(null);
		try {
			iconPath = path.evaluate("/manifest/application/@android:icon", new InputSource(
								stream = new FileInputStream(manifest.getLocation().toFile())));
		} catch (XPathExpressionException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e){
			e.printStackTrace();
		} finally {
			if (stream != null){
				try {
					stream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		if (iconPath != null && !iconPath.isEmpty()){
			String tmpPath = iconPath.substring(iconPath.indexOf('@') + 1, iconPath.lastIndexOf('/'));
			final String folderName = tmpPath.substring(tmpPath.lastIndexOf('/') + 1);
			final String iconName = iconPath.substring(iconPath.lastIndexOf('/') + 1) + ".png";
			
			FileFilter filter = new FileFilter() {
				public boolean accept(File file) {
					if (!file.isDirectory()){
						if (!file.getName().equals(iconName)){
							return false;
						}
						
						String fullPath = file.getAbsolutePath();
						if (fullPath.indexOf(folderName) < 0){
							return false;
						}
					}
					return true;
				}
			};
			
			Vector<File> icons = new Vector<File>();
			String folderPath = project.getLocation().append("bin/apps/") + packageName + "/";
			ProjectUtil.searchFiles(folderPath, filter, icons);
			
			int maxByte = -1;
			for (int i = 0;i < icons.size();i ++){
				try {
					FileInputStream fis = new FileInputStream(icons.get(i));
					int tempSize = fis.available();
					if (tempSize > maxByte){
						maxByte = tempSize;
						srcIconFile = icons.get(i);
					}
					fis.close();
				} catch (FileNotFoundException e) {
				} catch (IOException e){
				}
			}
		}
		
		if (srcIconFile == null){ // if not exist, use default icon
			String mayloonSDKPath = MayloonSDK.getSdkLocation();
			if (mayloonSDKPath == null || mayloonSDKPath.isEmpty()) {
				return;
			}
			IPath srcPath = Path.fromPortableString(mayloonSDKPath + "/"
					+ MptConstants.MAYLOON_TIZEN_ICON);
			srcIconFile = srcPath.toFile();
		}
	
		try {
			ProjectUtil.copyFile(srcIconFile,
					dstPath.append(MptConstants.MAYLOON_TIZEN_ICON).toFile());
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}

	/**
	 * save XML document
	 * 
	 * @param filename
	 * @param document
	 */
	public static void saveXml(String fileName, Document doc) {
		TransformerFactory transFactory = TransformerFactory.newInstance();
		try {
			Transformer transformer = transFactory.newTransformer();
			transformer.setOutputProperty("indent", "yes");

			DOMSource source = new DOMSource();
			source.setNode(doc);
			StreamResult result = new StreamResult();
			result.setOutputStream(new FileOutputStream(fileName));
			transformer.transform(source, result);
		} catch (TransformerConfigurationException e) {
			e.printStackTrace();
		} catch (TransformerException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	/**
	 * add Mayloon Framework related resource
	 * 
	 * @param project
	 * @param deployMode
	 * @param packageName
	 * @throws CoreException
	 * @throws MptException
	 */
	public static void addMayloonFrameworkFolder(IProject project,
			String deployMode, String packageName, boolean bCompress) throws CoreException,
			MptException {
		String mayloonSDKPath = MayloonSDK.getSdkLocation();
		IJavaProject javaProject = JavaCore.create(project);

		if (mayloonSDKPath == null || mayloonSDKPath.isEmpty()) {
			throw new MptException(MptException.MAYLOON_SDK_ERROR);
		}

		FileInputStream stream = null;

		try {
			Properties properties = new Properties();
			properties.load(stream = new FileInputStream(new File(
					mayloonSDKPath, MptConstants.MAYLOON_EXTERNAL_PROPERTY)));

			String externalJSLib = properties.getProperty(
					MptConstants.MAYLOON_JS_LIBRARY_PATH, null);
			String frameworkRes = properties.getProperty(
					MptConstants.MAYLOON_FRAMEWORK_RES, null);
			String startFiles = properties.getProperty(
					MptConstants.MAYLOON_APPLICATION_ENTRY, null);

			if (externalJSLib != null) {
				IFolder folder = null;
				IPath destPath = null;
				IPath srcPath = Path.fromPortableString(mayloonSDKPath + "/"
						+ externalJSLib);

				if (deployMode.equals(MptConstants.J2S_DEPLOY_MODE_BROWSER)) {
					folder = project.getFolder(MptConstants.WS_ROOT
							+ MptConstants.MAYLOON_EXTERNAL_JS_DIR);
					if (!folder.exists()) {
						folder.create(true, true, null);
					}
					copyFilesFromPlugin2UserProject(srcPath, folder.getRawLocation(), bCompress);
				} else if (deployMode
						.equals(MptConstants.J2S_DEPLOY_MODE_TIZEN)) {
					destPath = getMayloonOutputFolder(project);
					copyFilesFromPlugin2UserProject(
							srcPath,
							destPath.append(MptConstants.MAYLOON_EXTERNAL_JS_DIR),
							bCompress);
				}
				if (folder != null) {
					folder.refreshLocal(IResource.DEPTH_INFINITE, null);
				}

			} else {
				throw new MptException(MptException.EXTERNAL_JS_LIB_PATH_ERROR);
			}

			if (deployMode.equals(MptConstants.J2S_DEPLOY_MODE_TIZEN)) {
				IPath destPath = null;

				IPath j2sLibPath = getJ2SLibPath(project);

				destPath = getMayloonOutputFolder(project);

				copyFilesFromPlugin2UserProject(j2sLibPath,
						destPath.append(MptConstants.MAYLOON_J2S_LIBRARY),
						bCompress);
			}

			if (frameworkRes != null) {
				IPath destPath = null;
				IFolder folder = null;
				IPath srcPath = Path.fromPortableString(mayloonSDKPath + "/"
						+ frameworkRes);
				if (deployMode.equals(MptConstants.J2S_DEPLOY_MODE_BROWSER)) {
					folder = project.getFolder(MptConstants.WS_ROOT
							+ MptConstants.MAYLOON_FRAMEWORK_RES_DIR);
					if (!folder.exists()) {
						folder.create(true, true, null);
					}
					copyFilesFromPlugin2UserProject(srcPath,
							folder.getRawLocation(), bCompress);
				} else if (deployMode
						.equals(MptConstants.J2S_DEPLOY_MODE_TIZEN)) {
					destPath = getMayloonOutputFolder(project);
					copyFilesFromPlugin2UserProject(
							srcPath,
							destPath.append(MptConstants.MAYLOON_FRAMEWORK_RES_DIR),
							bCompress);
				}
				if (folder != null) {
					folder.refreshLocal(IResource.DEPTH_INFINITE, null);
				}

				// folder.refreshLocal(IResource.DEPTH_INFINITE, null);
			} else {
				throw new MptException(MptException.FRAMEWORK_PATH_ERROR);
			}

			if (startFiles != null) {
				IFolder folder = project.getFolder(MptConstants.WS_ROOT
						+ MptConstants.MAYLOON_SRC_DIR);

				IPath srcPath = Path.fromPortableString(mayloonSDKPath + "/"
						+ startFiles);
				IPath destPath = project.getLocation().append(
						MptConstants.MAYLOON_SRC_DIR);

				copyFilesFromPlugin2UserProject(srcPath, destPath, bCompress);

				// change pm.installPackage(/**/); to
				// pm.installPackage("convert android application's package name");
				// for example, pm.installPackage("com.intel.linpack");
				// fixs mayloon application start entry logic
				fixsMayloonAppEntry(
						destPath.append(MptConstants.MAYLOON_START_ENTRY_JAVA_FILE),
						packageName);

				folder.refreshLocal(IResource.DEPTH_INFINITE, null);
			} else {
				throw new MptException(MptException.APP_ENTRY_ERROR);

			}

		} catch (FileNotFoundException e) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG,
					MptMessages.Not_found_Mayloon_External_File_Message,
					MptConstants.MAYLOON_EXTERNAL_PROPERTY);
		} catch (IOException e) {
			MptPluginConsole
					.error(MptConstants.CONVERT_TAG,
							"Could not load Mayloon external information due to cause {%1$s}.",
							e.getMessage());
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
				}
			}
		}

	}

	/**
	 * Change mayloon application entry file(com.android.core.Start.java)
	 * according to user application package name.
	 * 
	 * @param filePath
	 * @param packageName
	 */
	public static void fixsMayloonAppEntry(IPath filePath, String packageName) {
		BufferedReader br = null;
		BufferedWriter bw = null;

		String tempOutPutFile = filePath.toOSString() + ".temp";

		try {
			String sCurrentLine;

			br = new BufferedReader(new FileReader(filePath.toOSString()));
			bw = new BufferedWriter(new FileWriter(tempOutPutFile));

			while ((sCurrentLine = br.readLine()) != null) {
				if (sCurrentLine
						.contains(MptConstants.MAYLOON_START_ENTRY_BASE)) {
					String insatllPackageEntry = MptConstants.MAYLOON_START_ENTRY_BASE
							.replaceAll(MptConstants.MAYLOON_START_ENTRY_MATCH,
									packageName);
					bw.write(insatllPackageEntry);
					bw.newLine();
				} else {
					bw.write(sCurrentLine);
					bw.newLine();
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)
					br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
			try {
				if (bw != null)
					bw.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}

		// rm original Start.java, rename Start.java.temp to Start.java
		deleteFiles(filePath);

		moveFiles(new Path(tempOutPutFile), filePath);

	}

	/**
	 * Add missed class stub file to user's application
	 * 
	 * @param filePath
	 * @param packageName
	 */
	public static void AddMissedClass2UserApp(IPath filePath, String packageName) {
		BufferedReader br = null;
		BufferedWriter bw = null;

		String tempOutPutFile = filePath.toOSString() + ".temp";

		try {
			String sCurrentLine;

			br = new BufferedReader(new FileReader(filePath.toOSString()));
			bw = new BufferedWriter(new FileWriter(tempOutPutFile));

			while ((sCurrentLine = br.readLine()) != null) {
				if (sCurrentLine
						.contains(MptConstants.MAYLOON_START_ENTRY_BASE)) {
					String insatllPackageEntry = MptConstants.MAYLOON_START_ENTRY_BASE
							.replaceAll(MptConstants.MAYLOON_START_ENTRY_MATCH,
									packageName);
					bw.write(insatllPackageEntry);
					bw.newLine();
				} else {
					bw.write(sCurrentLine);
					bw.newLine();
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)
					br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
			try {
				if (bw != null)
					bw.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}

		// rm original template file
		deleteFiles(filePath);

		moveFiles(new Path(tempOutPutFile), filePath);
	}

	/**
	 * add Mayloon compiled output files(/bin/classes) to Tizen deployment
	 * directory
	 * 
	 * @param project
	 * @throws CoreException
	 */
	public static void addMayloonCompiledJSFiles(IProject project, boolean bCompress) {

		IJavaProject javaProject = JavaCore.create(project);

		IPath outputPath;
		IPath projectPath = new Path(project.getName());
		try {
			outputPath = javaProject.getOutputLocation().makeRelativeTo(
					projectPath);

			IPath srcPath = project.getLocation().append(outputPath);
			IPath destPath = getMayloonOutputFolder(project);
			ProjectUtil.copyFilesFromPlugin2UserProject(srcPath,
					destPath.append(outputPath), bCompress);

		} catch (JavaModelException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (CoreException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * add source folder of referenced project to local src
	 * @param project
	 * @param ref_proj
	 * @return if succeed
	 */
	public static boolean addReferencedProjectSource(IProject project, IProject ref_proj){
		String dstFolderPath = project.getLocation().toOSString() + MptConstants.FILE_SEPARATOR + "src";
		String srcProjectFolder = ref_proj.getLocation().toOSString();
		srcProjectFolder = srcProjectFolder.substring(0, srcProjectFolder.lastIndexOf(MptConstants.FILE_SEPARATOR));

		IJavaProject javaProject = JavaCore.create(ref_proj);
		try {
			IClasspathEntry[] entries = javaProject.getRawClasspath();
			for (int i = 0;i < entries.length;i ++){
				if (entries[i].getEntryKind() == IClasspathEntry.CPE_SOURCE ){
					String path = entries[i].getPath().toOSString();
					if (path.substring(path.lastIndexOf('/') + 1).equals("gen")){
						continue; //generated files won't be copied
					}
					String srcFolderPath = srcProjectFolder + path;
					if (ProjectUtil.mergeFolder(srcFolderPath, dstFolderPath, false, false)){
						try {
							project.refreshLocal(IResource.DEPTH_INFINITE, null);
						} catch (CoreException e) {
						}
					}
				}
			}
		} catch (JavaModelException e1) {
			e1.printStackTrace(); return false;
		}
		
		return true;
	}
	
	/**
	 * 
	 * @return
	 */
	private static IProject[] getProjectList(){
		IProject[] projects = ResourcesPlugin.getWorkspace().getRoot().getProjects();
		return projects;
	}
	
	public static void checkLibraryDependency(IProject project, Set<String> warningInfo)
			throws JavaModelException {
		IJavaProject javaProject = JavaCore.create(project);
		IClasspathEntry[] entries = javaProject.getRawClasspath();

		if (warningInfo == null){
			warningInfo = new HashSet<String>();
		}
		
		// find android classpath and remove it
		int androidIndex = ProjectUtil.findClassPathEntry(entries,
				MptConstants.ANDROID_CLASSPATH_ENTRY_ID,
				IClasspathEntry.CPE_CONTAINER);
		if (androidIndex != -1) {
			entries = ProjectUtil.removeClassPathEntry(entries, androidIndex);
		}

		// check JRE classpath entry
		int jreIndex = ProjectUtil.findClassPathEntry(entries,
				JavaRuntime.JRE_CONTAINER, IClasspathEntry.CPE_CONTAINER);
		if (jreIndex != -1) {
			entries = ProjectUtil.removeClassPathEntry(entries, jreIndex);
		}

		// check ADT classpath entry
		int adtIndex = ProjectUtil.findClassPathEntry(entries,
				MptConstants.ADT_CLASSPATH_ENTRY_ID,
				IClasspathEntry.CPE_CONTAINER);
		if (adtIndex != -1) {
			entries = ProjectUtil.removeClassPathEntry(entries, adtIndex);
		}
		
		// check com.android.ide.eclipse.adt.DEPENDENCIES
		int adtDepIndex = ProjectUtil.findClassPathEntry(entries,
				MptConstants.ADT_DPD_CLASSPATH_ENTRY_ID,
				IClasspathEntry.CPE_CONTAINER);
		if (adtDepIndex != -1){
			entries = ProjectUtil.removeClassPathEntry(entries, adtDepIndex);
		}
		
		// check others
		String path = project.getFullPath().toOSString();
		for (int i = 0;i < entries.length;i ++){
			if (entries[i].getEntryKind() == IClasspathEntry.CPE_SOURCE ){
				if (!entries[i].getPath().toOSString().startsWith(path)){
					String info = "Project depends on other " +	getKindName(entries[i].getEntryKind()) + ":" + entries[i].getPath().toOSString();
					warningInfo.add(info);
					MptPluginConsole.warning(MptConstants.CONVERT_TAG, info);
				}				
			}
			else if (entries[i].getEntryKind() == IClasspathEntry.CPE_PROJECT){
				String info = "Project depends on other " +	getKindName(entries[i].getEntryKind()) + ":" + entries[i].getPath().toOSString();
				MptPluginConsole.general(MptConstants.CONVERT_TAG, info);
			}
			else {
				String info = "Project depends on other " +	getKindName(entries[i].getEntryKind()) + ":" + entries[i].getPath().toOSString();
				warningInfo.add(info);
				MptPluginConsole.warning(MptConstants.CONVERT_TAG, info);
			}
		}
		
		//check Android referenced projects
		ProjectUtil.checkAndroidReferencedProjects(project);
	}
	
	public static String getKindName(int kind){
		String kindName = "";
		switch (kind){
			case IClasspathEntry.CPE_CONTAINER:
				kindName = "container";break;
			case IClasspathEntry.CPE_LIBRARY:
				kindName = "library";break;
			case IClasspathEntry.CPE_PROJECT:
				kindName = "project";break;
			case IClasspathEntry.CPE_SOURCE:
				kindName = "source";break;
			case IClasspathEntry.CPE_VARIABLE:
				kindName = "variable";break;
			default:
				kindName = "";
		}
		return kindName;
	}
	
	/**
	 * fix dependencies
	 * @param project
	 */
	public static void fixDependencies(IProject project){
		Vector<IProject> proj_list = new Vector<IProject>();
		
		proj_list.add(project);
		try {
			ProjectUtil.getProjectDependency(project, proj_list);
			ProjectUtil.getAndroidDependency(project, proj_list);
			
			//fix dependencies
			for (int i = 1;i < proj_list.size();i ++){
				if (ProjectUtil.addReferencedProjectSource(project, proj_list.get(i))){
					MptPluginConsole.general(MptConstants.CONVERT_TAG, 
							"Source code of referenced project [" + proj_list.get(i).getName() + "] is merged into project [" + project.getName() + "].");
				}
			}
			
			//clean class path
			IJavaProject javaProject = JavaCore.create(project);
			IClasspathEntry[] entries = javaProject.getRawClasspath();
			Vector<Integer> fixed_refs = new Vector<Integer>();	//items need to be removed
			
			for (int i = 0;i < entries.length;i ++){
				if (entries[i].getEntryKind() == IClasspathEntry.CPE_PROJECT){
					String fullname = entries[i].getPath().toOSString();
					String name = fullname.substring(fullname.lastIndexOf('/') + 1);
					
					for (int j = 1;j < proj_list.size();j ++){
						if (proj_list.get(j).getName().equals(name)){
							fixed_refs.add(i); break;
						}
					}
				}
			}
			
			for (int i = fixed_refs.size() - 1;i >= 0;i --){
				entries = ProjectUtil.removeClassPathEntry(entries, fixed_refs.get(i));
			}
			if (fixed_refs.size() > 0){
				javaProject.setRawClasspath(entries, new NullProgressMonitor());
			}
		} catch (JavaModelException e) {
		}
	}
	
	/**
	 * get a list of referenced projects
	 * @param project
	 * @param proj_list
	 * @throws JavaModelException
	 */
	private static void getProjectDependency(IProject project,
			Vector<IProject> proj_list) throws JavaModelException{
		IJavaProject javaProject = JavaCore.create(project);
		IClasspathEntry[] entries = javaProject.getRawClasspath();
		
		for (int i = 0;i < entries.length;i ++){
			if (entries[i].getEntryKind() == IClasspathEntry.CPE_PROJECT){
				String fullname = entries[i].getPath().toOSString();
				String name = fullname.substring(fullname.lastIndexOf('/') + 1);
				IProject[] projects = ProjectUtil.getProjectList();
				boolean foundFlag = false;
				for (int j = 0;j < projects.length;j ++){
					if (projects[j].getName().equals(name)){
						if (!proj_list.contains(projects[j])){
							proj_list.add(projects[j]);
							ProjectUtil.getProjectDependency(projects[j], proj_list);
							ProjectUtil.getAndroidDependency(projects[j], proj_list);
						}
						foundFlag = true; break;
					}
				}
				if (!foundFlag){
					MptPluginConsole.warning(MptConstants.CONVERT_TAG, 
							"Referenced project [" + name + "] not found.");
				}
			}
		}
	}
	
	/**
	 * get a list of referenced projects
	 * @param project
	 * @param proj_list
	 * @throws JavaModelException
	 */
	private static void getAndroidDependency(IProject project,
			Vector<IProject> proj_list) throws JavaModelException {
		IResource defaultProperties = project
				.findMember(MptConstants.ANDROID_DEFAULT_PROPERTIES);
		if (defaultProperties != null && defaultProperties.exists()) {
			Properties prop = new Properties();
			FileInputStream stream = null;
			try {
				prop.load(stream = new FileInputStream(defaultProperties.getLocation().toFile()));
			} catch (IOException e) {
				MptPluginLogger.throwable(e, "Could not load project.properties.");
			} finally {
				if (stream != null) {
					try {
						stream.close();
					} catch (IOException e) {
					}
				}
			}
			
			int refer = 1;
			for (String value = null; (value = prop.getProperty("android.library.reference." + refer, "")).length() > 0; refer ++) {
				String name = value.substring(value.lastIndexOf('/') + 1);
				if (name.length() <= 0 && value.length() > 0){
					value = value.substring(0, value.lastIndexOf('/'));
					name = value.substring(value.lastIndexOf('/') + 1);
				}
				IProject[] projects = ProjectUtil.getProjectList();
				boolean foundFlag = false;
				for (int j = 0;j < projects.length;j ++){
					if (projects[j].getName().equals(name)){
						if (!proj_list.contains(projects[j])){
							proj_list.add(projects[j]);
							ProjectUtil.getProjectDependency(projects[j], proj_list);
							ProjectUtil.getAndroidDependency(projects[j], proj_list);
						}
						foundFlag = true; break;
					}
				}
				if (!foundFlag){
					MptPluginConsole.warning(MptConstants.CONVERT_TAG, 
							"Referenced project [" + name + "] not found.");
				}
			}
		}
	}
	
	/**
	 * remove the android class entry: android.jar
	 * 
	 * @param project
	 * @throws JavaModelException
	 */
	public static void fixMayloonClassEntry(IProject project)
			throws JavaModelException {
		IJavaProject javaProject = JavaCore.create(project);
		// get the project classpath
		IClasspathEntry[] entries = javaProject.getRawClasspath();
		IClasspathEntry[] oldEntries = entries;

		// find android classpath and remove it
		int androidIndex = ProjectUtil.findClassPathEntry(entries,
				MptConstants.ANDROID_CLASSPATH_ENTRY_ID,
				IClasspathEntry.CPE_CONTAINER);
		if (androidIndex != -1) {
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Removing Android Class Container from classpath.");
			entries = ProjectUtil.removeClassPathEntry(entries, androidIndex);
		}

		// check JRE classpath entry
		int jreIndex = ProjectUtil.findClassPathEntry(entries,
				JavaRuntime.JRE_CONTAINER, IClasspathEntry.CPE_CONTAINER);
		if (jreIndex != -1) {
			// no jre classpath entry, add a jre container to Mayloon class path
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Remove JRE Class Container from classpath.");
			entries = ProjectUtil.removeClassPathEntry(entries, jreIndex);
			// entries = ProjectUtil.addClassPathEntry(entries, jre_entry);
		}

		// check ADT classpath entry
		int adtIndex = ProjectUtil.findClassPathEntry(entries,
				MptConstants.ADT_CLASSPATH_ENTRY_ID,
				IClasspathEntry.CPE_CONTAINER);
		if (adtIndex != -1) {
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Removing ADT Class Container from classpath.");
			entries = ProjectUtil.removeClassPathEntry(entries, adtIndex);
		}

		// add Mayloon framework classpath if not exist
		int MayloonRuntimeIndex = ProjectUtil.findClassPathEntry(entries,
				MayloonClasspathContainerInitializer.MAYLOON_CONTAINER_ID,
				IClasspathEntry.CPE_CONTAINER);
		if (MayloonRuntimeIndex == -1) {
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Adding Mayloon Runtime Class Container to classpath.");
			IClasspathEntry mayloon_runtime_entry = MayloonClasspathContainerInitializer
					.getContainerEntry();
			entries = ProjectUtil.addClassPathEntry(entries,
					mayloon_runtime_entry);
		}

		// add Mayloon JRE classpath if not exist
		// int MayloonJREIndex = ProjectUtil.findClassPathEntry(entries,
		// MayloonJREClasspathContainerInitializer.MAYLOON_JRE_CONTAINER_ID,
		// IClasspathEntry.CPE_CONTAINER);
		// if (MayloonJREIndex == -1) {
		// MptPluginConsole.general(MptConstants.CONVERT_TAG,
		// "Adding Mayloon JRE Class Container to classpath.");
		// IClasspathEntry mayloon_jre_entry =
		// MayloonJREClasspathContainerInitializer
		// .getContainerEntry();
		// entries = ProjectUtil.addClassPathEntry(entries, mayloon_jre_entry);
		// }

		if (entries != oldEntries) {
			javaProject.setRawClasspath(entries, new NullProgressMonitor());
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Changes to classpath have been applied.");
		}
	}

	/**
	 * look for the specific classpath and return its index
	 * 
	 * @param entries
	 * @param entryPath
	 * @param entryKind
	 * @return the index of the found classpath or -1.
	 */
	public static int findClassPathEntry(IClasspathEntry[] entries,
			String entryPath, int entryKind) {
		for (int i = 0; i < entries.length; i++) {
			IClasspathEntry entry = entries[i];
			int kind = entry.getEntryKind();
			if (kind == entryKind || entryKind == 0) {
				IPath path = entry.getPath();
				String osPathString = path.toOSString();
				if (osPathString.equals(entryPath)) {
					return i;
				}
			}
		}

		return -1;
	}

	/**
	 * remove a classpath entry from the array
	 * 
	 * @param entries
	 *            The classpath entries array
	 * @param index
	 *            The index to remove
	 * @return A new class path entries array
	 */
	public static IClasspathEntry[] removeClassPathEntry(
			IClasspathEntry[] entries, int index) {
		IClasspathEntry[] newEntries = new IClasspathEntry[entries.length - 1];
		// copy the entries before index
		System.arraycopy(entries, 0, newEntries, 0, index);
		// copy the entries after index
		System.arraycopy(entries, index + 1, newEntries, index, entries.length
				- index - 1);

		return newEntries;
	}

	/**
	 * add a classpath entry to the array
	 * 
	 * @param entries
	 *            The classpath entries array
	 * @param new_entry
	 *            The classpath entry to add
	 * @return A new class path entries array
	 */
	public static IClasspathEntry[] addClassPathEntry(
			IClasspathEntry[] entries, IClasspathEntry new_entry) {
		IClasspathEntry[] newEntries = new IClasspathEntry[entries.length + 1];
		System.arraycopy(entries, 0, newEntries, 0, entries.length);
		newEntries[entries.length] = new_entry;
		return newEntries;
	}

	/**
	 * get the target api level of this android project
	 * 
	 * @param project
	 *            the android project
	 * @return the android target api level of this project, return -1 if fail
	 *         to get
	 */
	public static int getAndroidProjectApiLevel(IProject project) {
		int androidApiLevel = -1;
		IFile defaultProperties = project
				.getFile(MptConstants.ANDROID_DEFAULT_PROPERTIES);
		if (defaultProperties == null || !defaultProperties.exists()) {
			MptPluginConsole
					.warning(
							MptPlugin.PLUGIN_ID,
							"Can't find android file:%1$s", MptConstants.ANDROID_DEFAULT_PROPERTIES); //$NON-NLS-1$
			return androidApiLevel;
		}

		FileInputStream stream = null;
		try {
			Properties p = new Properties();
			stream = new FileInputStream(defaultProperties.getLocation()
					.toFile());
			p.load(stream);
			String target = p.getProperty(
					MptConstants.ANDROID_DEFAULT_PROPERTY_TARGET, "");
			Matcher matcher = Pattern.compile("[0-9]+$").matcher(target);
			if (matcher.find()) {
				androidApiLevel = Integer.parseInt(matcher.group());
			} else {
				MptPluginConsole.warning(MptPlugin.PLUGIN_ID,
						"Can't parse android api level number from " + target);
			}
		} catch (FileNotFoundException e) {
			MptPluginLogger
					.log(e,
							"Can't find android file:%1$s", MptConstants.ANDROID_DEFAULT_PROPERTIES); //$NON-NLS-1$
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID,
					"Can't find android file:%1$s",
					MptConstants.ANDROID_DEFAULT_PROPERTIES);
		} catch (IOException e) {
			MptPluginLogger
					.log(e,
							"Fail to read the file:%1$s", MptConstants.ANDROID_DEFAULT_PROPERTIES); //$NON-NLS-1$
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID,
					"Fail to read the file:%1$s",
					MptConstants.ANDROID_DEFAULT_PROPERTIES);
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
				}
			}
		}

		return androidApiLevel;
	}

	/**
	 * Return whether this project is a library project.
	 * 
	 * @param project
	 * @return boolean
	 */
	public static boolean isLibraryProject(IProject project) {
		boolean isLibraryProject = false;
		IResource defaultProperties = project
				.findMember(MptConstants.ANDROID_DEFAULT_PROPERTIES);
		if (defaultProperties != null && defaultProperties.exists()) {
			Properties prop = new Properties();
			FileInputStream stream = null;
			try {
				prop.load(stream = new FileInputStream(defaultProperties
						.getLocation().toFile()));
			} catch (IOException e) {
				MptPluginLogger.throwable(e,
						"Could not load project.properties.");
			} finally {
				if (stream != null) {
					try {
						stream.close();
					} catch (IOException e) {
					}
				}
			}
			String value = prop.getProperty("android.library", "false");
			isLibraryProject = Boolean.valueOf(value);
		}
		return isLibraryProject;
	}
	
	/**
	 * check if one or more projects are referenced in android properties
	 * @param project
	 * @return true if referencing other projects
	 */
	public static Set<String> checkAndroidReferencedProjects(IProject project) {
		Set<String> refInfo = new HashSet<String>();
		IResource defaultProperties = project
				.findMember(MptConstants.ANDROID_DEFAULT_PROPERTIES);
		if (defaultProperties != null && defaultProperties.exists()) {
			Properties prop = new Properties();
			FileInputStream stream = null;
			try {
				prop.load(stream = new FileInputStream(defaultProperties.getLocation().toFile()));
			} catch (IOException e) {
				MptPluginLogger.throwable(e, "Could not load project.properties.");
			} finally {
				if (stream != null) {
					try {
						stream.close();
					} catch (IOException e) {
					}
				}
			}
			
			int refer = 1;
			for (String value = null; (value = prop.getProperty("android.library.reference." + refer, "")).length() > 0; refer ++) {
				String refProj = "Project depends on other Android project :" + value;
				refInfo.add(refProj);
				MptPluginConsole.general(MptConstants.CONVERT_TAG, refProj);
			}
		}
		return refInfo;
	}	

	/**
	 * Not compatibility with Android internal implementation Copy from ADT,
	 * ProjectCreator.java Extracts a "full" package & activity name from an
	 * AndroidManifest.xml.
	 * <p/>
	 * The keywords dictionary is always filed the package name under the key
	 * {@link #PH_PACKAGE}. If an activity name can be found, it is filed under
	 * the key {@link #PH_ACTIVITY_ENTRY_NAME}. When no activity is found, this
	 * key is not created.
	 * 
	 * @param manifestFile
	 *            The AndroidManifest.xml file
	 * @param outKeywords
	 *            Place where to put the out parameters: package and activity
	 *            names.
	 * @return True if the package/activity was parsed and updated in the
	 *         keyword dictionary.
	 * @throws MptException
	 */
	public static String extractPackageFromManifest(IProject project)
			throws MptException {

		String packageName = "";

		IResource manifestFile = project
				.findMember(MptConstants.ANDROID_MANIFEST_FILE);

		if (manifestFile == null) {
			throw new MptException("Can't find Android file:%1$s",
					MptConstants.ANDROID_MANIFEST_FILE);
		}

		IPath location = project.getLocation();
		XPath xPath = AndroidXPathFactory.newXPath(null);
		InputSource source;
		try {
			source = new InputSource(new FileInputStream(new File(
					location.toOSString(), MptConstants.ANDROID_MANIFEST_FILE)));

			packageName = xPath.evaluate("/manifest/@package", //$NON-NLS-1$
					source);

			// Select the "android:name" attribute of all <activity> nodes but
			// only if they
			// contain a sub-node <intent-filter><action> with an "android:name"
			// attribute which
			// is 'android.intent.action.MAIN' and an <intent-filter><category>
			// with an
			// "android:name" attribute which is
			// 'android.intent.category.LAUNCHER'
			String expression = String
					.format("/manifest/application/activity"
							+ "[intent-filter/action/@%1$s:name='android.intent.action.MAIN' and "
							+ "intent-filter/category/@%1$s:name='android.intent.category.LAUNCHER']"
							+ "/@%1$s:name",
							AndroidXPathFactory.DEFAULT_NS_PREFIX);

			source = new InputSource(new FileInputStream(new File(
					location.toOSString(), MptConstants.ANDROID_MANIFEST_FILE)));

			NodeList activityNames = (NodeList) xPath.evaluate(expression,
					source, XPathConstants.NODESET);

			// If we get here, both XPath expressions were valid so we're most
			// likely dealing
			// with an actual AndroidManifest.xml file. The nodes may not have
			// the requested
			// attributes though, if which case we should warn.
			if (packageName == null || packageName.length() == 0) {
				MptPluginLogger
						.warning(
								MptPlugin.PLUGIN_ID,
								"Missing <manifest package=\"...\"> in '%1$s'", MptConstants.ANDROID_MANIFEST_FILE); //$NON-NLS-1$
				throw new MptException(
						"Fail to parse android manifest file:%1$s",
						MptConstants.ANDROID_MANIFEST_FILE);
			}

			/*
			 * mayloon update We don't follow android internal implementation of
			 * packageName logic. So skip below package + activityName logic.
			 */
			// Get the first activity that matched earlier. If there is no
			// activity,
			// activityName is set to an empty string and the generated
			// "combined" name
			// will be in the form "package." (with a dot at the end).
			/*
			 * String activityName = ""; if (activityNames.getLength() > 0) {
			 * activityName = activityNames.item(0).getNodeValue(); }
			 * 
			 * if (mLevel == OutputLevel.VERBOSE && activityNames.getLength() >
			 * 1) { MptPluginLogger .error(MptPlugin.PLUGIN_ID,
			 * "ERROR: There is more than one activity defined in '%1$s'.\n" +
			 * "Only the first one will be used. If this is not appropriate, you need\n"
			 * + "to specify one of these values manually instead:",
			 * MptConstants.ANDROID_MANIFEST_FILE);
			 * 
			 * for (int i = 0; i < activityNames.getLength(); i++) { String name
			 * = activityNames.item(i).getNodeValue(); name =
			 * combinePackageActivityNames(packageName, name); MptPluginLogger
			 * .warning(MptPlugin.PLUGIN_ID, "- %1$s", name); } }
			 * 
			 * if (activityName.length() == 0) {
			 * MptPluginLogger.error(MptPlugin.PLUGIN_ID,
			 * "Missing <activity %1$s:name=\"...\"> in '%2$s'.\n" +
			 * "No activity will be generated.",
			 * AndroidXPathFactory.DEFAULT_NS_PREFIX,
			 * MptConstants.ANDROID_MANIFEST_FILE); } else { packageName =
			 * packageName + activityName; }
			 */

		} catch (FileNotFoundException e) {
			MptPluginConsole.error(MptPlugin.PLUGIN_ID,
					"FileNotFound, Failed to read %1$s",
					MptConstants.ANDROID_MANIFEST_FILE);
		} catch (IOException e) {
			MptPluginConsole.error(MptPlugin.PLUGIN_ID, "Failed to read %1$s",
					MptConstants.ANDROID_MANIFEST_FILE);
		} catch (XPathExpressionException e) {
			Throwable t = e.getCause();
			MptPluginConsole.error(MptPlugin.PLUGIN_ID,
					"Fail to parse android manifest file:%1$s",
					MptConstants.ANDROID_MANIFEST_FILE);
		}

		return packageName;
	}

	/**
	 * get the minimal sdk version required by this android project
	 * 
	 * @param project
	 *            the android project
	 * @return the minimal required sdk version, return -1 if no this
	 *         requirement
	 */
	public static int getAndroidProjectMinSdkVersion(IProject project) {
		IResource manifestFile = project
				.findMember(MptConstants.ANDROID_MANIFEST_FILE);
		if (manifestFile == null) {
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID,
					"Can't find Android file:%1$s",
					MptConstants.ANDROID_MANIFEST_FILE);
			return -1;
		}

		IPath location = project.getLocation();
		XPath xPath = AndroidXPathFactory.newXPath(null);
		String value;
		// get the minSdkVersion value
		try {
			value = xPath
					.evaluate(
							"/manifest/uses-sdk/@android:minSdkVersion", //$NON-NLS-1$
							new InputSource(new FileInputStream(new File(
									location.toOSString(),
									MptConstants.ANDROID_MANIFEST_FILE))));
		} catch (XPathExpressionException e) {
			MptPluginLogger
					.log(e,
							"Fail to parse android manifest file:%1$s", MptConstants.ANDROID_MANIFEST_FILE); //$NON-NLS-1$
			MptPluginConsole.error(MptPlugin.PLUGIN_ID,
					"Fail to parse android manifest file:%1$s",
					MptConstants.ANDROID_MANIFEST_FILE);
			return -1;
		} catch (FileNotFoundException e) {
			MptPluginLogger
					.log(e,
							"Can't find android manifest file:%1$s", MptConstants.ANDROID_MANIFEST_FILE); //$NON-NLS-1$
			MptPluginConsole.error(MptPlugin.PLUGIN_ID,
					"Can't find android manifest file:%1$s",
					MptConstants.ANDROID_MANIFEST_FILE);
			return -1;
		}

		int minSdkValue = 0;
		if (value.length() > 0) {
			try {
				minSdkValue = Integer.parseInt(value);
			} catch (NumberFormatException e) {
				MptPluginConsole
						.error(MptPlugin.PLUGIN_ID,
								"Attribute minSdkVersion is not an Integer in %1$s", MptConstants.ANDROID_MANIFEST_FILE); //$NON-NLS-1$
				return -1;
			}

			return minSdkValue;
		}

		return -1;
	}

	public static IMarker markResource(IResource resource, String markerId,
			String message, int lineNumber, int startOffset, int endOffset,
			int severity) {
		try {
			IMarker marker = resource.createMarker(markerId);
			marker.setAttribute(IMarker.MESSAGE, message);
			marker.setAttribute(IMarker.SEVERITY, severity);

			// if marker is text type, enforce a line number so that it shows in
			// the editor
			// somewhere (line 1)
			if (lineNumber < 1 && marker.isSubtypeOf(IMarker.TEXT)) {
				lineNumber = 1;
			}

			if (lineNumber >= 1) {
				marker.setAttribute(IMarker.LINE_NUMBER, lineNumber);
			}

			if (startOffset != -1) {
				marker.setAttribute(IMarker.CHAR_START, startOffset);
				marker.setAttribute(IMarker.CHAR_END, endOffset);
			}

			resource.refreshLocal(IResource.DEPTH_ZERO,
					new NullProgressMonitor());
			return marker;
		} catch (CoreException e) {
			MptPluginLogger
					.log(e,
							"Failed to add marker %1$s to %2$s", markerId, resource.getFullPath()); //$NON-NLS-1$
		}

		return null;
	}

	public static IMarker markResource(IResource resource, String markerId,
			String message, int lineNumber, int severity) {
		return markResource(resource, markerId, message, lineNumber, -1, -1,
				severity);
	}

	public static IMarker markProject(IProject project, String markerId,
			String message, int severity, int priority) {
		try {
			IMarker marker = project.createMarker(markerId);
			marker.setAttribute(IMarker.MESSAGE, message);
			marker.setAttribute(IMarker.SEVERITY, severity);
			marker.setAttribute(IMarker.PRIORITY, priority);

			project.refreshLocal(IResource.DEPTH_ZERO,
					new NullProgressMonitor());

			return marker;
		} catch (CoreException e) {
			MptPluginLogger
					.log(e,
							"Failed to add marker %1$s to project: %2$s", markerId, project.getName()); //$NON-NLS-1$
		}

		return null;
	}

	public static boolean findMarkersFromResource(IResource resource,
			String markerId) {
		try {
			if (resource.exists()) {
				IMarker[] markers = resource.findMarkers(markerId, true,
						IResource.DEPTH_ZERO);
				if (markers != null && markers.length > 0) {
					return true;
				}
			}
		} catch (CoreException e) {
			MptPluginLogger
					.log(e,
							"Failed to remove marker %1$s in %2$s", markerId, resource.toString()); //$NON-NLS-1$
		}

		return false;
	}

	/**
	 * remove marker from the resource.
	 * 
	 * @param resource
	 * @param markerId
	 */
	public static void removeMarkersFromResource(IResource resource,
			String markerId, int depth) {
		try {
			if (resource.exists()) {
				resource.deleteMarkers(markerId, true, depth);
			}
		} catch (CoreException e) {
			MptPluginLogger
					.log(e,
							"Failed to remove marker %1$s in %2$s", markerId, resource.toString()); //$NON-NLS-1$
		}
	}

	/**
	 * get all Mayloon projects in the current workspace
	 */
	public static IJavaProject[] getMayloonProjects() {
		IWorkspaceRoot workspaceRoot = ResourcesPlugin.getWorkspace().getRoot();
		IJavaModel javaModel = JavaCore.create(workspaceRoot);
		IJavaProject[] javaProjects = null;
		try {
			javaProjects = javaModel.getJavaProjects();
		} catch (JavaModelException e) {
			return null;
		}

		ArrayList<IJavaProject> MayloonProjectList = new ArrayList<IJavaProject>();
		for (IJavaProject javaProject : javaProjects) {
			IProject project = javaProject.getProject();

			// check if it's a Mayloon project
			try {
				if (project.hasNature(MayloonNature.NATURE_ID)) {
					MayloonProjectList.add(javaProject);
				}
			} catch (CoreException e) {
				// pass
			}
		}

		return MayloonProjectList.toArray(new IJavaProject[MayloonProjectList
				.size()]);
	}

	/**
	 * check package name of this application and get error information
	 * 
	 * @param project
	 * @return error information set if can't get package name, or empty Set.
	 */
	public static Set<String> getPackageNameCheckInfo(IProject project) {
		Set<String> errorInfo = new HashSet<String>();
		FileInputStream stream = null;
		IResource manifest = project
				.findMember(MptConstants.ANDROID_MANIFEST_FILE);

		if (manifest == null)
			return errorInfo;

		String packageName = null;
		try {
			XPath path = AndroidXPathFactory.newXPath(null);
			packageName = path.evaluate("/manifest/@package", new InputSource(
					stream = new FileInputStream(manifest.getLocation().toFile())));
		} catch (XPathExpressionException e) {
			MptPluginLogger.throwable(e, "Unable to find package name");
			errorInfo.add(e.getMessage() + "Unable to find package name");
		} catch (FileNotFoundException e) {
			MptPluginLogger.throwable(e, "Unable to find %1$s",
					MptConstants.ANDROID_MANIFEST_FILE);
			errorInfo.add(String.format(e.getMessage() + "Unable to find %1$s",
					MptConstants.ANDROID_MANIFEST_FILE));
		}finally{
			if(stream != null){
				try {
					stream.close();
				} catch (IOException e) {
					e.printStackTrace();
					errorInfo.add(e.getMessage());
				}
			}
		}
		if (packageName == null || packageName.isEmpty()) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG, String.format(
					"Can't get package name information from %1$s",
					MptConstants.ANDROID_MANIFEST_FILE));
			errorInfo.add(String.format(
					"Can't get package name information from %1$s",
					MptConstants.ANDROID_MANIFEST_FILE));
		}
		return errorInfo;
	}

	/**
	 * Return launch activity of this application
	 */
	public static String getLauncherActivity(IProject project) {
		IResource manifest = project
				.findMember(MptConstants.ANDROID_MANIFEST_FILE);
		if (manifest == null)
			return null;

		String launcherActivity = null;
		try {
			XPath path = AndroidXPathFactory.newXPath(null);
			launcherActivity = path
					.evaluate(
							"/manifest/application/activity/intent-filter/category[@android:name=\"android.intent.category.LAUNCHER\"]/parent::*/parent::*/@android:name",
							new InputSource(new FileInputStream(manifest
									.getLocation().toFile())));
		} catch (XPathExpressionException e) {
			MptPluginLogger.throwable(e, "Unable to find launcher activity.");
		} catch (FileNotFoundException e) {
			MptPluginLogger.throwable(e, "Unable to find %1$s."
					+ MptConstants.ANDROID_MANIFEST_FILE);
		}
		if (launcherActivity.startsWith(".")) {
			return launcherActivity;
		} else if (launcherActivity.indexOf('.') != -1) {
			return launcherActivity;
		} else {
			return "." + launcherActivity;
		}
	}

	/**
	 * Copy source file to target file
	 * 
	 * @param source
	 * @param target
	 * @throws IOException
	 */
	public static void copyFile(File source, File target) throws IOException {
		FileInputStream sourceStream = null;
		FileOutputStream targetStream = null;
		try {
			FileChannel sourceChannel = (sourceStream = new FileInputStream(
					source)).getChannel();
			FileChannel targetChannel = (targetStream = new FileOutputStream(
					target)).getChannel();
			targetChannel.transferFrom(sourceChannel, 0, source.length());
		} finally {
			if (sourceStream != null) {
				try {
					sourceStream.close();
				} catch (IOException e) {
				}
			}
			if (targetStream != null) {
				try {
					targetStream.close();
				} catch (IOException e) {
				}
			}
		}
	}

	/**
	 * Backup the project which is going to be converted. All files and folders
	 * in the project directory will be compressed to an archive, except
	 * contents in project output directory.
	 * 
	 * @param project
	 */
	public static void backupProject(IProject project) {
		MptPluginConsole.general(MptConstants.GENERAL_TAG,
				"Backup project '%1$s'.", project.getName());

		// disable auto building mode if necessary
		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		boolean isAutoBuilding = workspace.isAutoBuilding();
		if (isAutoBuilding) {
			try {
				IWorkspaceDescription desc = workspace.getDescription();
				desc.setAutoBuilding(false);
				workspace.setDescription(desc);
			} catch (CoreException e) {
			}
		}

		// do backup
		ZipOutputStream stream = null;
		File archive = null;
		try {
			archive = File.createTempFile(project.getName() + "_archive", "bk");
			final ZipOutputStream output = (stream = new ZipOutputStream(
					new FileOutputStream(archive)));
			final IPath base = project.getLocation();
			final byte[] buffer = new byte[4096];
			project.accept(new IResourceVisitor() {
				@Override
				public boolean visit(IResource resource) throws CoreException {
					if (resource.getType() == IResource.FILE) {
						IPath path = resource.getLocation();
						IPath entry = path.makeRelativeTo(base);
						FileInputStream stream = null;
						try {
							FileInputStream input = (stream = new FileInputStream(
									path.toFile()));
							output.putNextEntry(new ZipEntry(entry.toString()));
							int length = 0;
							while ((length = input.read(buffer)) != -1) {
								output.write(buffer, 0, length);
							}
							output.closeEntry();
						} catch (IOException e) {
							throw new CoreException(new Status(IStatus.ERROR,
									MptPlugin.PLUGIN_ID, e.getMessage()));
						} finally {
							if (stream != null) {
								try {
									stream.close();
								} catch (IOException e) {
								}
							}
						}
					}
					return true;
				}
			});
		} catch (Exception e) {
			MptPluginLogger.throwable(e);
			MptPluginConsole.warning(MptConstants.GENERAL_TAG,
					"Could not complete backup due to cause {%1$s}.",
					e.getMessage());
			archive.deleteOnExit();
			archive = null;
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
				}
			}
			if (archive != null) {
				if (archive.renameTo(new File(project.getLocation().toFile(),
						"archive.zip"))) {
					MptPluginConsole
							.general(
									MptConstants.GENERAL_TAG,
									"Backup archive.zip is generated under project '%1$s'.",
									project.getName());
				}
			}
		}

		// restore auto building mode if necessary
		if (isAutoBuilding) {
			try {
				IWorkspaceDescription desc = workspace.getDescription();
				desc.setAutoBuilding(true);
				workspace.setDescription(desc);
			} catch (CoreException e) {
			}
		}
	}

	/**
	 * Get the content string from file
	 * 
	 * @param file
	 * @return String
	 */
	public static String getContent(File file) {
		String result = null;
		if (file.isFile()) {
			FileInputStream input = null;
			try {
				result = getContent(input = new FileInputStream(file));
			} catch (Exception e) {
			} finally {
				if (input != null) {
					try {
						input.close();
					} catch (IOException e) {
					}
				}
			}
		}
		return result;
	}

	/**
	 * Get the content string from input stream
	 * 
	 * @param input
	 * @return String
	 */
	public static String getContent(InputStream input) {
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		try {
			byte[] buffer = new byte[2048];
			int length = 0;
			while ((length = input.read(buffer)) != -1) {
				output.write(buffer, 0, length);
			}
		} catch (Exception e) {
		}
		return new String(output.toByteArray());
	}

	public static String toRelativePath(String absPath, String basePath) {
		try {
			File absFile = new File(absPath).getCanonicalFile();
			File baseFile = new File(basePath).getCanonicalFile();
			String absURL = absFile.toURL().toString();
			String baseURL = baseFile.toURL().toString();
			if (absURL.startsWith(baseURL)) {
				String relativeURL = absURL.substring(baseURL.length());
				if (relativeURL.startsWith("/") || relativeURL.startsWith("\\")) {
					relativeURL = relativeURL.substring(1);
				}
				return relativeURL;
			}
			int index = absURL.indexOf('/');
			int lastIndex = index;
			while (index != -1) {
				String partURL = absURL.substring(0, index);
				if (!baseURL.startsWith(partURL + "/")
						&& !baseURL.equals(partURL)) {
					break;
				}
				lastIndex = index;
				index = absURL.indexOf('/', lastIndex + 1);
			}
			absURL = absURL.substring(lastIndex + 1);
			baseURL = baseURL.substring(lastIndex + 1);
			String[] parts = baseURL.split("\\/");
			int length = parts.length;
			if (baseFile.isFile()) {
				length--;
			}
			StringBuffer buffer = new StringBuffer();
			for (int i = 0; i < length; i++) {
				buffer.append("../");
			}
			buffer.append(absURL);
			return buffer.toString();
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * merge files and sub folders of src_folder into dst_folder
	 * @param srcFolderPath
	 * @param dstFolderPath
	 * @return true if succeed
	 */
	public static boolean mergeFolder(String srcFolderPath, String dstFolderPath,
			boolean bOverwrite, boolean bCompress){
		File srcFolder = new File(srcFolderPath);
		File dstFolder = new File(dstFolderPath);
		
		if (!srcFolder.exists() || !srcFolder.isDirectory()) {
			return false;
		}
		if (dstFolder.exists()){
			if (!dstFolder.isDirectory()){
				return false;
			}
		}
		else {
			try {
				if (!dstFolder.mkdirs()){
					return false;
				}
			} catch (Exception e) {
			}
		}
		
		File[] files = srcFolder.listFiles();
		for (int i = 0; i < files.length; i++) {
			File file = new File(dstFolder, files[i].getName());
			if (files[i].isDirectory()) {
				if (!file.exists()){
					try {
						if (!file.mkdirs()){
							return false;
						}
					} catch (Exception e) {
						e.printStackTrace();
					}	
				}
				if (!mergeFolder(files[i].getAbsolutePath(), file.getAbsolutePath(), bOverwrite, bCompress)){
					return false;
				}
			} else {
				if (!file.exists() || bOverwrite) {
					if (bCompress && files[i].getAbsoluteFile().toString().endsWith(".js")){
						try {
							Compressor.compress(files[i].getAbsolutePath(), file.getAbsolutePath());
						} catch (CompressException e) {		// could not compress this file
							streamCopyFile(files[i], file);
						}
					}
					else streamCopyFile(files[i], file);
				}
			}
		}
		
		return true;
	}
	
	public static void copyFolder(String srcPath, String destPath,
			boolean overwrite) {
		File srcFolder = new File(srcPath);
		if (srcFolder.exists() && srcFolder.isDirectory()) {
			File destFolder = new File(destPath);
			if (destFolder.exists() && destFolder.isDirectory()) {
				// return ;
			} else {
				try {
					destFolder.mkdirs();
				} catch (Exception e) {
				}
			}
			FileFilter filter = new FileFilter() {
				public boolean accept(File file) {
					if (file.isDirectory()) {
						String name = file.getName();
						if (name.equals("CVS")) {
							return false;
						}
					}
					if (file.getAbsolutePath().endsWith(".swp")) {
						return false;
					}
					return true;
				}
			};
			File[] files = srcFolder.listFiles(filter);
			for (int i = 0; i < files.length; i++) {
				File file = new File(destFolder, files[i].getName());
				if (files[i].isDirectory()) {
					copyFolder(files[i].getAbsolutePath(),
							file.getAbsolutePath(), overwrite);
				} else {
					if (!file.exists() || overwrite) {
						streamCopyFile(files[i], file);
					}
				}
			}
		}
	}

	public static void copyFile(String srcFile, String destFile) {
		streamCopyFile(new File(srcFile), new File(destFile));
	}

	public static void streamCopyFile(File srcFile, File destFile) {
		try {
			FileInputStream fi = new FileInputStream(srcFile);
			FileOutputStream fo = new FileOutputStream(destFile);
			byte[] buf = new byte[1024];
			int readLength = 0;
			while (readLength != -1) {
				readLength = fi.read(buf);
				if (readLength != -1) {
					fo.write(buf, 0, readLength);
				}
			}
			fo.close();
			fi.close();
		} catch (Exception e) {
		}
	}
	
	/**
	 * Search for files within specific folder
	 * @param folder
	 * @param filter		FileFilter for filtering files
	 * @param filelist		results of searching
	 */
	public static void searchFiles(String folder, FileFilter filter, Vector<File> filelist){
		File srcFolder = new File(folder);
		if (!srcFolder.exists() || !srcFolder.isDirectory()){
			return;
		}
		
		File[] files;
		if (filter == null){
			files = srcFolder.listFiles();
		}
		else files = srcFolder.listFiles(filter);
		
		for (int i = 0; i < files.length; i++) {
			if (files[i].isDirectory()) {
				searchFiles(files[i].getAbsolutePath(), filter, filelist);
			} else {
				filelist.add(files[i]);
			}
		}
	}

	public static void fileExtractor(String filePath, String fileName,
			String outputPath) {

		try {
			ZipFile zipFile = new ZipFile(filePath + "/" + fileName);
			Enumeration<? extends ZipEntry> emu = zipFile.entries();

			while (emu.hasMoreElements()) {
				ZipEntry entry = (ZipEntry) emu.nextElement();
				if (entry.isDirectory()) {
					new File(outputPath + entry.getName()).mkdirs();
					continue;
				}
				BufferedInputStream bis = new BufferedInputStream(
						zipFile.getInputStream(entry));
				File file = new File(outputPath + entry.getName());
				File parent = file.getParentFile();
				if (parent != null && (!parent.exists())) {
					parent.mkdirs();
				}
				FileOutputStream fos = new FileOutputStream(file);
				BufferedOutputStream bos = new BufferedOutputStream(fos, BUFFER);

				int count;
				byte data[] = new byte[BUFFER];
				while ((count = bis.read(data, 0, BUFFER)) != -1) {
					bos.write(data, 0, count);
				}
				bos.flush();
				bos.close();
				bis.close();
			}
			zipFile.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Add missed class stub file to user's application
	 * 
	 * @param filePath
	 * @param packageName
	 */
	public static boolean AddMissedClass2UserApp(IPath filePath,
			String missClassName, IProject project, ArrayList<String> info) {
		boolean retVal = true;
		BufferedReader br = null;
		BufferedWriter bw = null;

		String tempOutPutFile = filePath.toOSString() + ".temp";

		String[] packageSplit = missClassName.split("\\.");

		String packageName = missClassName.substring(0,
				missClassName.lastIndexOf('.'));

		String className = missClassName.substring(missClassName
				.lastIndexOf('.') + 1);

		try {
			String sCurrentLine;

			br = new BufferedReader(new FileReader(filePath.toOSString()));
			bw = new BufferedWriter(new FileWriter(tempOutPutFile));

			while ((sCurrentLine = br.readLine()) != null) {
				if (sCurrentLine
						.contains(MptConstants.MAYLOON_MISSCLASS_TEMPLATE_PACKAGE_TARGET)) {
					String packageStatement = sCurrentLine.replaceAll(
							MptConstants.MAYLOON_MISSCLASS_TEMPLATE_PACKAGE,
							packageName);
					bw.write(packageStatement);
					bw.newLine();
				} else if (sCurrentLine
						.contains(MptConstants.MAYLOON_MISSCLASS_TEMPLATE_NAME)) {
					String constructorStatement = sCurrentLine.replaceAll(
							MptConstants.MAYLOON_MISSCLASS_TEMPLATE_NAME,
							className);
					bw.write(constructorStatement);
					bw.newLine();
				} else {
					bw.write(sCurrentLine);
					bw.newLine();
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)
					br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
			try {
				if (bw != null)
					bw.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}

		IPath packageFolderPath = GetPackageLocation(packageSplit, project);

		// create folder according to missClassName
		if (CreateMissClassPackageFolder(packageFolderPath, project)) {

			String srcFile = tempOutPutFile;

			String destFile = packageFolderPath.toOSString() + IPath.SEPARATOR
					+ className + ".java";

			copyFile(srcFile, destFile);

			retVal = true;
		}

		deleteFiles(new Path(tempOutPutFile));
		MptPluginConsole.general(MptConstants.PARTIAL_CONVERSION_TAG,
				"StubClass '%1$s' has been added to project '%2$s'.",
				missClassName, project.getName());
		info.add(missClassName);
		return retVal;
	}

	public static void AddAnnotationClass2UserApp(IProject project) {
		String[] packageSplit = MptConstants.MAYLOON_STUB_ANNOTATION_PATH
				.split("\\.");
		IPath packageFolderPath = GetPackageLocation(packageSplit, project);
		if (CreateAnnotationFolder(packageFolderPath, project)) {
			String mayloonSDKPath = MayloonSDK.getSdkLocation();
			String srcFile = mayloonSDKPath
					+ MptConstants.MAYLOON_STUB_ANNOTATION_FILE;
			String destFile = packageFolderPath.toOSString() + IPath.SEPARATOR
					+ MptConstants.MAYLOON_STUB_ANNOTATION_FILE;
			copyFile(srcFile, destFile);
			MptPluginConsole
					.general(
							MptConstants.PARTIAL_CONVERSION_TAG,
							"Annotation class '%1$s' has been added to project '%2$s'.",
							MptConstants.MAYLOON_STUB_ANNOTATION_PATH,
							project.getName());
		}
	}

	private static HashSet<String> mayloonJarClassSet = null;
	/**
	 * get the class names from mayloon.jar
	 * 
	 * @return
	 * @throws IOException
	 */
	public static HashSet<String> getMayloonJarClasses(){
		if (mayloonJarClassSet == null) {
			mayloonJarClassSet = new HashSet<String>();
			String mayloonSDKPath = MayloonSDK.getSdkLocation();
			File mayloonJarFile = new File(mayloonSDKPath
					+ MptConstants.WS_ROOT + MptConstants.MAYLOON_JAR_LIB);
			JarFile jar;
			try {
				jar = new JarFile(mayloonJarFile, true);
				Enumeration<JarEntry> e = jar.entries();
				while (e.hasMoreElements()) {
					mayloonJarClassSet.add(e.nextElement().getName()
							.replace('/', '.'));
				}
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}

		}
		return mayloonJarClassSet;
	}

	/**
	 * check whether apk is built successfully
	 * 
	 * @param project
	 * @return
	 * @throws CoreException
	 */
	public static boolean checkAndroidApk(IProject project, Set<String> errorInfo)
			throws CoreException {
		if (errorInfo == null){
			errorInfo = new HashSet<String>();
		}
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		IJavaProject javaProject = JavaCore.create(project);
		IFolder apkOutputFolder = (IFolder) root.findMember(javaProject
				.getPath().append("/bin"));
		apkOutputFolder.refreshLocal(IResource.DEPTH_ONE, null);

		IPath filePath = project.getLocation().append(
				MptConstants.ANDROID_OUTPUT_DIR);

		IPath apkFile = filePath.append(project.getName()
				+ MptConstants.ANDROID_APK_EXTENSION);

		if (!apkFile.toFile().exists()) {
			String info = getNoAndroidFileErrorInfo(apkFile.toOSString());
			MptPluginConsole.error(MptConstants.CONVERT_TAG, info);
			errorInfo.add(info);
			return false;
		}
		return true;
	}

	/**
	 * check necessary Android files and get error information
	 * 
	 * @param project
	 * @return Necessary Android files error information Set. If no error, the
	 *         return Set will be empty
	 * @throws CoreException
	 */
	public static Set<String> getAndroidFilesCheckInfo(IProject project)
			throws CoreException {
		Set<String> errorInfo = new HashSet<String>();
		//check AndroidManifest.xml
		if (!checkAndroidFile(project, MptConstants.ANDROID_MANIFEST_FILE)) {
			errorInfo.add(getNoAndroidFileErrorInfo(MptConstants.ANDROID_MANIFEST_FILE));
		}
		//check project.properties
		if(!checkAndroidFile(project, MptConstants.ANDROID_DEFAULT_PROPERTIES)){
			errorInfo.add(getNoAndroidFileErrorInfo(MptConstants.ANDROID_DEFAULT_PROPERTIES));
		}
		// check bin folder and bin/projectname.apk file
		if(!checkAndroidFile(project, MptConstants.ANDROID_OUTPUT_DIR)){
			errorInfo.add(getNoAndroidFileErrorInfo(MptConstants.ANDROID_OUTPUT_DIR));
		}else{
			checkAndroidApk(project, errorInfo);
		}
		return errorInfo;
	}

	public static String getNoAndroidFileErrorInfo(String filePath){
		String errorInfo = String.format("Can't find necessary Android file: %1$s.", filePath);
		return errorInfo;
	}
	
	/**	
	 * check Android file
	 * 
	 * @param project
	 * @param filePath
	 * @return 
	 */
	public static boolean checkAndroidFile(IProject project, String filePath) {
		IResource androidFile = project.findMember(filePath);
		if (androidFile == null) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG,
					getNoAndroidFileErrorInfo(filePath));
			return false;
		}
		return true;
	}

	/**
	 * check necessary SDK files and get error information
	 * @param project
	 * @return Mayloon SDK files error information Set. If no error, the return
	 *         Set will be empty
	 */
	public static Set<String> getSdkFilesCheckInfo(IProject project) {
		Set<String> errorInfo= new HashSet<String>();
		// check Mayloon SDK folder
		String mayloonSDKPath = MayloonSDK.getSdkLocation();
		if (mayloonSDKPath == null || mayloonSDKPath.isEmpty()) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG, MptException.MAYLOON_SDK_ERROR);
			errorInfo.add(MptException.MAYLOON_SDK_ERROR);
			return errorInfo;
		}
		// check the mayloon.jar file
		if(!checkSdkFile(mayloonSDKPath, MptConstants.MAYLOON_JAR_LIB)){
			errorInfo.add(getNoSdkFileErrorInfo(mayloonSDKPath, MptConstants.MAYLOON_JAR_LIB));
		}
		// check sdk-info.properties
		if(!checkSdkFile(mayloonSDKPath, MptConstants.MAYLOON_SDK_PROPERTY)){
			errorInfo.add(getNoSdkFileErrorInfo(mayloonSDKPath, MptConstants.MAYLOON_SDK_PROPERTY));
		}
		//check Mayloon version
		MayloonVersion MayloonVersion = MayloonSDK.getSdkVersion();
		if (MayloonVersion == null) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG,MayloonProjectMessages.Can_Not_Get_Mayloon_SDK_Version);
			errorInfo.add(MayloonProjectMessages.Can_Not_Get_Mayloon_SDK_Version);
		}
		// check external-info.properties file
		File propertyFile = new File(mayloonSDKPath, MptConstants.MAYLOON_EXTERNAL_PROPERTY);
		if (!propertyFile.exists()) {
			String errorMessage = getNoSdkFileErrorInfo(mayloonSDKPath, MptConstants.MAYLOON_EXTERNAL_PROPERTY);
			MptPluginConsole.error(MptConstants.CONVERT_TAG, errorMessage);
			errorInfo.add(errorMessage);
			return errorInfo;
		}
		// check the external files set in external-info.properties
		FileInputStream stream = null;
		try {
			Properties properties = new Properties();
			properties.load(stream = new FileInputStream(propertyFile));

			Enumeration<Object> keys = properties.keys();
			while (keys.hasMoreElements()) {
				String key = (String) keys.nextElement();
				String filePath = properties.getProperty(key, null);
				if (filePath == null) {
					String errorMessage = String.format("The %1$s is not set correctly.", key);
					MptPluginConsole.error(MptConstants.CONVERT_TAG, errorMessage);
					errorInfo.add(errorMessage);
				} else {
					if(!checkSdkFile(mayloonSDKPath, filePath)){
						errorInfo.add(getNoSdkFileErrorInfo(mayloonSDKPath, filePath));
					}
				}
			}
		} catch (FileNotFoundException e) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG, e.getMessage());
			e.printStackTrace();
			errorInfo.add(e.getMessage());
		} catch (IOException e) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG, e.getMessage());
			e.printStackTrace();
			errorInfo.add(e.getMessage());
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
					MptPluginConsole.error(MptConstants.CONVERT_TAG, e.getMessage());
					e.printStackTrace();
					errorInfo.add(e.getMessage());
				}
			}
		}
		return errorInfo;
	}
	
	public static String getNoSdkFileErrorInfo(String mayloonSDKPath, String filePath){
		String errorInfo =  String.format(
				"Can't find Mayloon SDK file: %1$s  from SDK Directory:\"%2$s\".", filePath,
				mayloonSDKPath);
		return errorInfo;
	}

	/**
	 * check whether the file is under Mayloon SDK directory.
	 * 
	 * @param mayloonSDKPath
	 * @param filePath
	 * @return false if file doesn't exist, or true
	 */
	public static boolean checkSdkFile(String mayloonSDKPath, String filePath) {
		File file = new File(mayloonSDKPath, filePath);
		if (!file.exists()) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG,
					getNoSdkFileErrorInfo(mayloonSDKPath, filePath));
			return false;
		}
		return true;
	}

	/**
	 * check whether the project's target android level matches Mayloon
	 * supportable version
	 * 
	 * @param project
	 * @return Warning information if version doesn't match, or the return
	 *         string will be empty <br/>
	 *         If can't get Mayloon Version, return null
	 */
	public static Set<String> getVersionMatchCheckInfo(IProject project) {
		Set<String> warningInfo = new HashSet<String>();
		MayloonVersion MayloonVersion = MayloonSDK.getSdkVersion();
		if (MayloonVersion == null) {
			return warningInfo;
		}
		int mayloonApiLevel = MayloonVersion.getAndroidApiLevel();
		int minSdkVersion = getAndroidProjectMinSdkVersion(project);
		if (minSdkVersion > mayloonApiLevel) {
			String warningMessage = String
					.format("The minimal android target version %1$s is higher than the Mayloon supportable version %2$s",
							minSdkVersion, mayloonApiLevel);
			MptPluginConsole.warning(MptConstants.CONVERT_TAG, warningMessage);
			warningInfo.add(warningMessage);
		}

		int targetApiLevel = getAndroidProjectApiLevel(project);
		if (targetApiLevel < minSdkVersion) {
			String warningMessage = String
					.format("Target API level %1$s is smaller than minSdkVersion %2$s.",
							targetApiLevel, minSdkVersion);
			MptPluginConsole.warning(MptConstants.CONVERT_TAG, warningMessage);
			warningInfo.add(warningMessage);
		}
		if (targetApiLevel > MayloonVersion.getAndroidApiLevel()) {
			String warningMessage = String
					.format("Target API level %1$s is greater than Mayloon SDK API level %2$s.",
							targetApiLevel, mayloonApiLevel);
			MptPluginConsole.warning(MptConstants.CONVERT_TAG, warningMessage);
			warningInfo.add(warningMessage);
		}

		return warningInfo;
	}

	public static IPath getJ2SLibPath(IProject project) throws MptException {

		FileInputStream stream = null;
		IPath j2sLib = null;

		try {
			Properties properties = new Properties();
			properties.load(stream = new FileInputStream(project.getLocation()
					.append(MptConstants.MAYLOON_PROJECT_SETTING).toFile()));

			String j2sResList = properties.getProperty(
					MptConstants.J2S_RESROUCE_LIST, null);
			String[] j2sResSplit = j2sResList.split(",");
			String temp = j2sResSplit[0];
			j2sLib = project.getLocation().append(
					temp.substring(0, temp.lastIndexOf("/")));
		} catch (FileNotFoundException e) {
			throw new MptException(
					MptMessages.Not_found_Mayloon_External_File_Message,
					MptConstants.MAYLOON_PROJECT_SETTING);
		} catch (IOException e) {
			throw new MptException(e.getMessage());
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
				}
			}
		}

		return j2sLib;
	}

	/**
	 * get current AutoBuild set
	 * 
	 * @return
	 */
	public static boolean getAutoBuild() {
		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		IWorkspaceDescription description = workspace.getDescription();
		return description.isAutoBuilding();
	}

	/**
	 * set AutoBuild
	 * 
	 * @param value
	 * @throws CoreException
	 */
	public static void setAutoBuild(Boolean value) throws CoreException {
		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		IWorkspaceDescription description = workspace.getDescription();
		description.setAutoBuilding(value);
		workspace.setDescription(description);
	}
	
	/**
	 * after compile complete, add mayloon runtime js files
	 * 
	 * @param javaProject
	 * @param projectName
	 */
	public static void addMayloonRuntimeJSFiles(IProject project) {
		FileInputStream stream = null;
		String mayloonSDKPath = getMayloonSDKLocation(project);
		
		Properties properties = new Properties();
		try {
			properties.load(stream = new FileInputStream(new File(
					mayloonSDKPath, MptConstants.MAYLOON_EXTERNAL_PROPERTY)));
		} catch (FileNotFoundException e1) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG,
					"Could not find Mayloon SDK files at %1$s", mayloonSDKPath);
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		String frameworkJs = properties.getProperty(
				MptConstants.MAYLOON_JS_FRAMEWORK_PATH, null);
		
		if (frameworkJs != null) {
			IPath srcPath = Path.fromPortableString(mayloonSDKPath
					+ MptConstants.WS_ROOT + frameworkJs);
			IPath outputPath;
			IPath projectPath = new Path(project.getName());
			try {
				outputPath = JavaCore.create(project).getOutputLocation().makeRelativeTo(projectPath);
				
				IPath destPath = JavaCore.create(project).getProject().getLocation().append(outputPath);
				
				ProjectUtil.copyFilesFromPlugin2UserProject(srcPath, destPath);
				IFolder folder = JavaCore.create(project).getProject().getFolder(outputPath);
				folder.refreshLocal(IResource.DEPTH_INFINITE, null);
			} catch (JavaModelException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (CoreException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			MptPluginConsole
					.error(MptConstants.BUILD_TAG,
							"Could not load Mayloon framework javascript files due to cause {%1$s}",
							"Mayloon framework javascript path is not seted correctly.");
		}
	}
	
	/**
	 * Get the Mayloon SDK folder.
	 * 
	 * @param project
	 * @throws CoreException
	 */
	public static String getMayloonSDKLocation(IProject project){
		Properties prop = new Properties();
		try {
			FileInputStream fiStream = new FileInputStream(project.getProject().getLocation().append(MptConstants.MAYLOON_BUILD_PROPERTIES).toFile());
			prop.load(fiStream);
			fiStream.close();
		} catch (IOException e) {
			MptPluginConsole.warning(MptConstants.GENERAL_TAG,
					"Could not open %1$s for project %2$s",
					MptConstants.MAYLOON_BUILD_PROPERTIES, project.getName() );
			e.printStackTrace();
		}
		String destnation = prop.getProperty(MptConstants.PROPERTY_MAYLOON_SDK_DIR);
		return destnation;
	}
}
