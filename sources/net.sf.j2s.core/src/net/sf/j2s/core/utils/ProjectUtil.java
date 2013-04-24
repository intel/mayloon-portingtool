package net.sf.j2s.core.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

import org.eclipse.core.filesystem.EFS;
import org.eclipse.core.filesystem.IFileStore;
import org.eclipse.core.filesystem.IFileSystem;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;

public class ProjectUtil {
	
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
			CorePluginConsole.error(MptConstants.CONVERT_TAG,
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
			CorePluginConsole
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
			CorePluginConsole.warning(MptConstants.GENERAL_TAG,
					"Could not open %1$s for project %2$s",
					MptConstants.MAYLOON_BUILD_PROPERTIES, project.getName() );
			e.printStackTrace();
		}
		String destnation = prop.getProperty(MptConstants.PROPERTY_MAYLOON_SDK_DIR);
		return destnation;
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
			CorePluginConsole.error(MptConstants.CONVERT_TAG,
					"Could not copy Mayloon resource due to cause {%1$s}",
					e.getMessage());
		}
	}

}
