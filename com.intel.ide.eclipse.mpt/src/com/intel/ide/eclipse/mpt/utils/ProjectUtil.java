package com.intel.ide.eclipse.mpt.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
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
import org.eclipse.core.runtime.QualifiedName;
import org.eclipse.core.runtime.Status;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragmentRoot;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.launching.JavaRuntime;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import com.intel.ide.eclipse.mpt.MayloonVersion;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptMessages;
import com.intel.ide.eclipse.mpt.MptPlugin;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.builder.AntPropertiesBuilder;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;
import com.intel.ide.eclipse.mpt.project.AndroidXPathFactory;
import com.intel.ide.eclipse.mpt.project.MayloonClasspathContainerInitializer;
import com.intel.ide.eclipse.mpt.project.MayloonProjectMessages;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;

/*
 * class to provide util functions to help Mayloon project
 */
public class ProjectUtil {	

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
	 * add the Mayloon output folder, the jar package will be created there.
	 * 
	 * @param project
	 * @throws CoreException
	 */
	public static void addMayloonOutputFolder(IProject project)
			throws CoreException {
		IFolder folder = project.getFolder(MptConstants.WS_ROOT
				+ MptConstants.MAYLOON_OUTPUT_DIR);
		if (!folder.exists()) {
			folder.create(true, true, null);
		}
	}

	/**
	 * Move the build output of android project to the application resource
	 * folder of Mayloon project
	 * 
	 * Step 1. move /gen/R.java to /src/[application package name]/ Step 2. move
	 * /[android output root]/[application package name] to /[mayloon
	 * output]/apps/
	 * 
	 * @param project
	 * @throws CoreException
	 */
	public static void moveAndroidOutput2Mayloon(IProject project) {

		// packageName is [package].[main activity]
		String packageName = extractPackageFromManifest(project);

		// TODO luqiang, cross-platform directory delimit problem ???
		// Step 1
		if (packageName != null && !packageName.equals("")) {

			String genRPath = null;
			genRPath = packageName.substring(0, packageName.lastIndexOf("."));
			
			IPath srcFilePath = project.getLocation().append(MptConstants.ANDROID_GEN_DIR);
			
			IPath destFilePath = project.getLocation().append("src");

			String srcFile = srcFilePath.toOSString() + "/"
					+ genRPath.replaceAll("\\.", "/") + "/R.java";

			String destFile = destFilePath.toOSString() + "/"
					+ genRPath.replaceAll("\\.", "/") + "/R.java";

			copyFilesFromPlugin2UserProject(new Path(srcFile), new Path(
					destFile));

			// Step 2
			srcFile = project.getLocation() + "/bin/" + packageName + "/";

			// TODO luqiang, see mayloon PackageManager, app.add should read
			// resource from package+activityName instead of package
			destFile = project.getLocation() + "/bin/apps/" + genRPath + "/";
			copyFilesFromPlugin2UserProject(new Path(srcFile), new Path(
					destFile));
			
			IFolder folder = project.getFolder(MptConstants.WS_ROOT
					+ MptConstants.MAYLOON_FRAMEWORK_JS_DIR);

			try {
				folder.refreshLocal(IResource.DEPTH_INFINITE, null);
			} catch (CoreException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
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
							"Could not move Android output resource due to cause {%1$s}",
							e.getMessage());
		}
	}

	/**
	 * Copy file from plugin to user's project
	 * 
	 * @param srcPath
	 * @param destPath
	 */
	public static void copyFilesFromPlugin2UserProject(IPath srcPath,
			IPath destPath) {
		IFileSystem fileSystem = EFS.getLocalFileSystem();
		IFileStore destDir = fileSystem.getStore(destPath);
		IFileStore srcDir = fileSystem.getStore(srcPath);

		// Will recursively copy the home directory to the backup
		// directory, overwriting any files in the backup directory in the way.
		try {
			srcDir.copy(destDir, EFS.OVERWRITE, null);
		} catch (CoreException e) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG,
					"Could not copy Mayloon resource due to cause {%1$s}",
					e.getMessage());
		}
	}

	/**
	 * delete file from src folder
	 * 
	 * @param srcPath
	 */
	public static void deleteFiles(IPath srcPath) {
		IFileSystem fileSystem = EFS.getLocalFileSystem();
		IFileStore srcDir = fileSystem.getStore(srcPath);

		// Will recursively copy the home directory to the backup
		// directory, overwriting any files in the backup directory in the way.
		try {
			srcDir.delete(EFS.NONE, null);
		} catch (CoreException e) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG,
					"Could not clear Android gen folder due to cause {%1$s}",
					e.getMessage());
		}
	}

	/**
	 * Clear Android's Gen Folder
	 * 
	 * @param project
	 */
	public static void clearAndroidGenFolder(IProject project) {
		IPath genPath = project.getLocation().append(
				MptConstants.ANDROID_GEN_DIR);
		deleteFiles(genPath);
	}

	/**
	 * add Mayloon Framework related resource
	 * 
	 * @param project
	 */
	public static void addMayloonFrameworkFolder(IProject project)
			throws CoreException {
		String mayloonSDKPath = MayloonSDK.getSdkLocation();
		IJavaProject javaProject = JavaCore.create(project);

		if (mayloonSDKPath == null || mayloonSDKPath.isEmpty()) {
			return;
		}

		FileInputStream stream = null;

		try {
			Properties properties = new Properties();
			properties.load(stream = new FileInputStream(new File(
					mayloonSDKPath, MptConstants.MAYLOON_EXTERNAL_PROPERTY)));

			String externalJSLib = properties.getProperty(
					MptConstants.MAYLOON_JS_LIBRARY_PATH, null);
			String njsLib = properties.getProperty(
					MptConstants.MAYLOON_NJS_LIBRARY_PATH, null);
//			String frameworkJs = properties.getProperty(
//					MptConstants.MAYLOON_JS_FRAMEWORK_PATH, null);
			String frameworkRes = properties.getProperty(
					MptConstants.MAYLOON_FRAMEWORK_RES, null);

			String startFiles = properties.getProperty(
					MptConstants.MAYLOON_APPLICATION_ENTRY, null);

			if (externalJSLib != null) {
				IFolder folder = project.getFolder(MptConstants.WS_ROOT
						+ MptConstants.MAYLOON_EXTERNAL_JS_DIR);
				if (!folder.exists()) {
					folder.create(true, true, null);
				}

				IPath srcPath = Path.fromPortableString(mayloonSDKPath + "/"
						+ externalJSLib);
				copyFilesFromPlugin2UserProject(srcPath,
						folder.getRawLocation());

				folder.refreshLocal(IResource.DEPTH_INFINITE, null);

			} else {
				MptPluginConsole
						.error(MptConstants.CONVERT_TAG,
								"Could not load Mayloon external javascript library due to cause {%1$s}",
								"Mayloon external javascript Library path is not seted correctly.");
			}
			
			if (njsLib != null) {
				IFolder folder = project.getFolder(MptConstants.WS_ROOT
						+ MptConstants.MAYLOON_NJS_JS_DIR);
				
				if (!folder.exists()) {
					folder.create(true, true, null);
				}

				IPath srcPath = Path.fromPortableString(mayloonSDKPath + "/"
						+ njsLib);
				copyFilesFromPlugin2UserProject(srcPath,
						folder.getRawLocation());

				folder.refreshLocal(IResource.DEPTH_INFINITE, null);

			} else {
				MptPluginConsole
						.error(MptConstants.CONVERT_TAG,
								"Could not load Mayloon njs javascript library due to cause {%1$s}",
								"Mayloon njs Library path is not seted correctly.");
			}

			// TODO luqiang, these framework javascript will be deleted by java
			// compile,
			// so we need find a method to tell the java builder, not clear
			// output before each build process
			// solution: after comiple complete, then move these framework javascript to output directory
//			if (frameworkJs != null) {
//
//				IWorkspace workspace = ResourcesPlugin.getWorkspace();
//				IWorkspaceRoot root = workspace.getRoot();
//
//				IPath srcPath = Path.fromPortableString(mayloonSDKPath
//						+ MptConstants.WS_ROOT + frameworkJs);
//				IPath destPath = root.getLocation().append(
//						javaProject.getOutputLocation());
//				copyFilesFromPlugin2UserProject(srcPath, destPath);
//
//				IFolder folder = project.getFolder(MptConstants.WS_ROOT
//						+ MptConstants.MAYLOON_FRAMEWORK_JS_DIR);
//				folder.refreshLocal(IResource.DEPTH_INFINITE, null);
//
//			} else {
//				MptPluginConsole
//						.error(MptConstants.CONVERT_TAG,
//								"Could not load Mayloon framework javascript files due to cause {%1$s}",
//								"Mayloon framework javascript path is not seted correctly.");
//			}

			if (frameworkRes != null) {
				IFolder folder = project.getFolder(MptConstants.WS_ROOT
						+ MptConstants.MAYLOON_FRAMEWORK_RES_DIR);
				if (!folder.exists()) {
					folder.create(true, true, null);
				}
				IPath srcPath = Path.fromPortableString(mayloonSDKPath + "/"
						+ frameworkRes);
				copyFilesFromPlugin2UserProject(srcPath,
						folder.getRawLocation());

				folder.refreshLocal(IResource.DEPTH_INFINITE, null);
			} else {
				MptPluginConsole
						.error(MptConstants.CONVERT_TAG,
								"Could not load Mayloon framework resource due to cause {%1$s}",
								"Mayloon framework resource path is not seted correctly.");
			}

			if (startFiles != null) {
				IFolder folder = project.getFolder(MptConstants.WS_ROOT
						+ MptConstants.MAYLOON_SRC_DIR);

				IPath srcPath = Path.fromPortableString(mayloonSDKPath + "/"
						+ startFiles);
				IPath destPath = project.getLocation().append(
						MptConstants.MAYLOON_SRC_DIR);

				copyFilesFromPlugin2UserProject(srcPath, destPath);
				folder.refreshLocal(IResource.DEPTH_INFINITE, null);
			} else {
				MptPluginConsole
						.error(MptConstants.CONVERT_TAG,
								"Could not load Mayloon application entry to cause {%1$s}",
								"Mayloon application entry is not seted correctly.");
			}
		} catch (FileNotFoundException e) {
			MptPluginConsole.error(MptConstants.CONVERT_TAG,
					MptMessages.Not_found_Mayloon_External_File_Message,
					MptConstants.MAYLOON_EXTERNAL_PROPERTY);
		} catch (IOException e) {
			MptPluginConsole
					.error(MptConstants.CONVERT_TAG,
							"Could not load Mayloon external information due to cause {%1$s}",
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
		if (jreIndex == -1) {
			// no jre classpath entry, add a jre container to Mayloon class path
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Remove JRE Class Container from classpath.");
			IClasspathEntry jre_entry = JavaRuntime
					.getDefaultJREContainerEntry();
//			entries = ProjectUtil.removeClassPathEntry(entries, jreIndex);
			entries = ProjectUtil.addClassPathEntry(entries, jre_entry);
		}
		
		// check ADT classpath entry
		int adtIndex = ProjectUtil.findClassPathEntry(entries,
				MptConstants.ADT_CLASSPATH_ENTRY_ID, IClasspathEntry.CPE_CONTAINER);
		if (adtIndex != -1) {
			// no jre classpath entry, add a jre container to Mayloon class path
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Remove ADT Class Container from classpath.");
			entries = ProjectUtil.removeClassPathEntry(entries, adtIndex);
		}
		
		// check android gen classpath entry
		IClasspathEntry[] classpathEntries = null; 
	    classpathEntries = javaProject.getResolvedClasspath(true); 
	    IPath android_gen_path = javaProject.getPath().append(MptConstants.ANDROID_GEN_DIR);
	         
	    int androidGenIndex = ProjectUtil.findClassPathEntry(entries,
	    		android_gen_path.toOSString(), IClasspathEntry.CPE_SOURCE);
		if (androidGenIndex != -1) {
			// no jre classpath entry, add a jre container to Mayloon class path
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Remove Android Gen src from classpath.");
			entries = ProjectUtil.removeClassPathEntry(entries, androidGenIndex);
		}
	    		

		// add Mayloon framework classpath if not exist
		int MayloonIndex = ProjectUtil.findClassPathEntry(entries,
				MayloonClasspathContainerInitializer.MAYLOON_CONTAINER_ID,
				IClasspathEntry.CPE_CONTAINER);
		if (MayloonIndex == -1) {
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Adding Mayloon Class Container to classpath.");
			IClasspathEntry Mayloon_entry = MayloonClasspathContainerInitializer
					.getContainerEntry();
			entries = ProjectUtil.addClassPathEntry(entries, Mayloon_entry);
		}

		if (entries != oldEntries) {
			javaProject.setRawClasspath(entries, new NullProgressMonitor());
			MptPluginConsole.general(MptConstants.CONVERT_TAG,
					"Changes on classpath has been applied.");
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
	 * Copy from ADT, ProjectCreator.java Combine Package Activity name with
	 * Package
	 * 
	 * @param packageName
	 * @param activityName
	 * @return
	 */
	private static String combinePackageActivityNames(String packageName,
			String activityName) {
		// Activity Name can have 3 forms:
		// - ".Name" means this is a class name in the given package name.
		// The full FQCN is thus packageName + ".Name"
		// - "Name" is an older variant of the former. Full FQCN is packageName
		// + "." + "Name"
		// - "com.blah.Name" is a full FQCN. Ignore packageName and use
		// activityName as-is.
		// To be valid, the package name should have at least two components.
		// This is checked
		// later during the creation of the build.xml file, so we just need to
		// detect there's
		// a dot but not at pos==0.

		int pos = activityName.indexOf('.');
		if (pos == 0) {
			return packageName + activityName;
		} else if (pos > 0) {
			return activityName;
		} else {
			return packageName + "." + activityName;
		}
	}

	/**
	 * Copy from ADT, ProjectCreator.java Extracts a "full" package & activity
	 * name from an AndroidManifest.xml.
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
	 */
	private static String extractPackageFromManifest(IProject project) {

		String packageName = "";

		IResource manifestFile = project
				.findMember(MptConstants.ANDROID_MANIFEST_FILE);

		if (manifestFile == null) {
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID,
					"Can't find Android file:%1$s",
					MptConstants.ANDROID_MANIFEST_FILE);
			return packageName;
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
				MptPluginConsole.error(MptPlugin.PLUGIN_ID,
						"Fail to parse android manifest file:%1$s",
						MptConstants.ANDROID_MANIFEST_FILE);
				return packageName;
			}

			// Get the first activity that matched earlier. If there is no
			// activity,
			// activityName is set to an empty string and the generated
			// "combined" name
			// will be in the form "package." (with a dot at the end).
			String activityName = "";
			if (activityNames.getLength() > 0) {
				activityName = activityNames.item(0).getNodeValue();
			}

			if (mLevel == OutputLevel.VERBOSE && activityNames.getLength() > 1) {
				MptPluginLogger
						.error(MptPlugin.PLUGIN_ID,
								"ERROR: There is more than one activity defined in '%1$s'.\n"
										+ "Only the first one will be used. If this is not appropriate, you need\n"
										+ "to specify one of these values manually instead:",
								MptConstants.ANDROID_MANIFEST_FILE);

				for (int i = 0; i < activityNames.getLength(); i++) {
					String name = activityNames.item(i).getNodeValue();
					name = combinePackageActivityNames(packageName, name);
					MptPluginLogger
							.warning(MptPlugin.PLUGIN_ID, "- %1$s", name);
				}
			}

			if (activityName.length() == 0) {
				MptPluginLogger.error(MptPlugin.PLUGIN_ID,
						"Missing <activity %1$s:name=\"...\"> in '%2$s'.\n"
								+ "No activity will be generated.",
						AndroidXPathFactory.DEFAULT_NS_PREFIX,
						MptConstants.ANDROID_MANIFEST_FILE);
			} else {
				packageName = packageName + activityName;
			}

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

	/**
	 * check the project's target android level, if it's higher than our
	 * Mayloon, we will give the user warning about this mismatch.
	 * 
	 * @param project
	 * @return true if match or pass
	 */
	public static boolean checkVersionMatch(IProject project) {
		MayloonVersion MayloonVersion = MayloonSDK.getSdkVersion();
		if (MayloonVersion == null) {
			MptPluginConsole.error(MptPlugin.PLUGIN_ID,
					MayloonProjectMessages.Can_Not_Get_Mayloon_SDK_Version);
			return false;
		}

		int minSdkVersion = getAndroidProjectMinSdkVersion(project);
		if (minSdkVersion > MayloonVersion.getAndroidApiLevel()) {
			// The minSdkVersion is greater than MayloonSdkApiLevel, application
			// may not be able to
			// get installed. Prompt for developer's decision on whether or not
			// to continue convert
			boolean proceed = MptPlugin
					.displayPrompt(
							MayloonProjectMessages.Version_Check_Title,
							String.format(
									MayloonProjectMessages.Android_MinSdkVersion_Higher_Message,
									minSdkVersion,
									MayloonVersion.getAndroidApiLevel()));
			if (!proceed) {
				return false;
			}
		}

		int targetApiLevel = getAndroidProjectApiLevel(project);
		if (targetApiLevel < minSdkVersion) {
			// Call attention:
			// Developer seems to build application with lower target API level
			// but
			// ask for a higher API level device to run it.
			MptPluginConsole
					.warning(
							MptConstants.GENERAL_TAG,
							"Target API level is smaller than minSdkVersion. \n"
									+ "Do you intend to build application on lower target API level but run it on device of higher \n"
									+ "API level ? If this is not your original intention, please correct later.");
		}
		if (targetApiLevel > MayloonVersion.getAndroidApiLevel()) {
			// Call attention:
			// Application build target API level is greater than
			// MayloonSdkApiLevel.
			// Application may not run properly on Mayloon device.
			MptPluginConsole
					.warning(
							MptConstants.GENERAL_TAG,
							"Target API level is greater than Mayloon SDK API level. \n"
									+ "Application may not run properly on Mayloon device.");
		}

		return true;
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
	 * Return package name of this application
	 */
	public static String getPackageName(IProject project) {
		IResource manifest = project
				.findMember(MptConstants.ANDROID_MANIFEST_FILE);
		if (manifest == null)
			return null;

		String packageName = null;
		try {
			XPath path = AndroidXPathFactory.newXPath(null);
			packageName = path.evaluate("/manifest/@package", new InputSource(
					new FileInputStream(manifest.getLocation().toFile())));
		} catch (XPathExpressionException e) {
			MptPluginLogger.throwable(e, "Unable to find package name.");
		} catch (FileNotFoundException e) {
			MptPluginLogger.throwable(e, "Unable to find %1$s."
					+ MptConstants.ANDROID_MANIFEST_FILE);
		}
		return packageName;
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
	 * Load a named string property from resource's persistent property table
	 * 
	 * @param resource
	 * @param propertyName
	 * @return String
	 */
	public static String loadStringProperty(IResource resource,
			String propertyName) {
		QualifiedName qname = new QualifiedName(MptPlugin.PLUGIN_ID,
				propertyName);
		try {
			return resource.getPersistentProperty(qname);
		} catch (CoreException e) {
			return null;
		}
	}

	/**
	 * Save a named string property to resource's persistent property table
	 * 
	 * @param resource
	 * @param propertyName
	 * @param value
	 * @return boolean
	 */
	public static boolean saveStringProperty(IResource resource,
			String propertyName, String value) {
		QualifiedName qname = new QualifiedName(MptPlugin.PLUGIN_ID,
				propertyName);
		try {
			resource.setPersistentProperty(qname, value);
		} catch (CoreException e) {
			return false;
		}
		return true;
	}

	/**
	 * Add and build support for project. Copy ant script and ant properties
	 * template to project directory.
	 * 
	 * @param project
	 *            IProject
	 */
	public static void addAntBuildSupport(IProject project) {
		String MayloonSdkLocation = MayloonSDK.getSdkLocation();
		if (MayloonSdkLocation == null || MayloonSdkLocation.isEmpty()) {
			return;
		}
		File projectLocation = project.getLocation().toFile();
		// copy Mayloon.custom.properties to project directory
		try {
			copyFile(new File(MayloonSdkLocation,
					MptConstants.MAYLOON_CUSTOM_PROPERTIES_TEMPLATE), new File(
					projectLocation, MptConstants.MAYLOON_CUSTOM_PROPERTIES));
		} catch (IOException e) {
			MptPluginLogger.warning("Could not copy %1$s to project %2$s",
					MptConstants.MAYLOON_CUSTOM_PROPERTIES, project.getName());
		}
		// copy build.xml to project directory
		try {
			copyFile(new File(MayloonSdkLocation,
					MptConstants.MAYLOON_BUILD_XML), new File(projectLocation,
					MptConstants.MAYLOON_BUILD_XML));
		} catch (IOException e) {
			MptPluginLogger.warning("Could not copy %1$s to project %2$s",
					MptConstants.MAYLOON_BUILD_XML, project.getName());
		}
		// create Mayloon.build.properties for project
		// TODO luqiang
		try {
			new AntPropertiesBuilder(JavaCore.create(project)).build();
		} catch (CoreException e) {
			MptPluginLogger.throwable(e);
			MptPluginConsole.error(MptConstants.GENERAL_TAG, e.getMessage());
			MptPluginConsole.warning(MptConstants.GENERAL_TAG,
					"Could not create %1$s for project %2$s",
					MptConstants.MAYLOON_BUILD_PROPERTIES, project.getName());
		}
		// refresh project
		try {
			project.refreshLocal(IResource.DEPTH_INFINITE, null);
		} catch (CoreException e) {
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
				"Backup project '%1$s'", project.getName());

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

		// clean up project
		// try {
		// project.build(IncrementalProjectBuilder.CLEAN_BUILD, null);
		// } catch (CoreException e) {
		// }

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
					"Could not complete backup due to cause {%1$s}",
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
									"Backup archive.zip is generated under project '%1$s'",
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

	public static void saveInputStreamAsFile(InputStream is, File file) {
		byte[] buf = new byte[1024];
		try {
			FileOutputStream fos = new FileOutputStream(file);
			int read = 0;
			while ((read = is.read(buf)) != -1) {
				fos.write(buf, 0, read);
			}
			fos.close();
			is.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
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
}
