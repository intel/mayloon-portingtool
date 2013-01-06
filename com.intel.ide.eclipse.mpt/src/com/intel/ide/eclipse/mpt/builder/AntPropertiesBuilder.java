package com.intel.ide.eclipse.mpt.builder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IClasspathContainer;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.project.MayloonClasspathContainerInitializer;

public class AntPropertiesBuilder {
	/**
	 * Properties in kona.build.properties file
	 */
	public static final String MAYLOON_BUILD_PROPERTIES = "mayloon.build.properties";
	public static final String PROPERTY_MAYLOON_SDK_DIR = "mayloon.sdk.dir";
	public static final String PROPERTY_ANDROID_SDK_DIR = "android.sdk.dir";
	public static final String PROPERTY_ANDROID_SDK_PLATFORM_TARGET_DIR = "android.sdk.platform.target.dir";
	public static final String PROPERTY_CURRENT_PROJECT = "current.project";
	public static final String PROPERTY_CURRENT_PROJECT_SOURCE_DIRS = "current.project.source.dirs";
	public static final String PROPERTY_CURRENT_PROJECT_CLASSPATH_DIRS = "current.project.classpath.dirs";
	public static final String PROPERTY_CURRENT_PROJECT_CLASSPATH_JARS = "current.project.classpath.jars";
	public static final String PROPERTY_CURRENT_PROJECT_REFERENCE_PROJECTS = "current.project.reference.projects";
	public static final String FORMAT_REFERENCE_PROJECT_DIR = "reference.project.%1$s.dir";
	public static final String FORMAT_REFERENCE_PROJECT_OUTPUT_DIR = "reference.project.%1$s.output.dir";
	public static final String FORMAT_REFERENCE_PROJECT_SOURCE_DIRS = "reference.project.%1$s.source.dirs";
	public static final String FORMAT_REFERENCE_PROJECT_CLASSPATH_JARS = "reference.project.%1$s.classpath.jars";
	public static final String FORMAT_REFERENCE_PROJECT_CLASSPATH_DIRS = "reference.project.%1$s.classpath.dirs";
	public static final String FORMAT_REFERENCE_PROJECT_REFERENCE_PROJECTS = "reference.project.%1$s.reference.projects";
	public static final String DELIMETER = ";";
	/**
	 * Path ID for Mayloon and Android classpath containers
	 */
	public static final String KONA_CONTAINER_ID = MayloonClasspathContainerInitializer.MAYLOON_CONTAINER_ID;
	public static final String ANDROID_CONTAINER_ID = MptConstants.ANDROID_CLASSPATH_ENTRY_ID;
	/**
	 * Current java project
	 */
	protected IJavaProject fProject;
	/**
	 * True if current project initiates the ant properties build
	 */
	protected boolean fInitProject;
	
	/**
	 * Interface for filter
	 */
	private interface Filter {
		/**
		 * Return true if object is acceptable, otherwise false
		 * @param o
		 * @return boolean
		 */
		public boolean accept(Object o);
	}
	
	/**
	 * Constructor
	 * @param project
	 */
	public AntPropertiesBuilder(IJavaProject project) {
		this.fProject = project;
	}
	
	/**
	 * Build ant properties starting from current project, and save to 
	 * Properties table
	 * @throws CoreException
	 */
	public void build() throws CoreException {
		this.fInitProject = true;
		Properties prop = new Properties();
		build(prop);
		save(prop);
	}
	/**
	 * Iterate all classpath entries of current project, build properties on source 
	 * folders, classpath folders and jars, and referenced projects. Iterate all 
	 * referenced projects (if exist), and recursively build all properties.
	 * @param prop
	 * @throws CoreException
	 */
	private void build(Properties prop) throws CoreException {
		String projectName = this.fProject.getProject().getName().replaceAll("\\s", "_");
		if(projectName.equals(prop.getProperty(PROPERTY_CURRENT_PROJECT)) ||
		   prop.getProperty(getPropertyName(FORMAT_REFERENCE_PROJECT_DIR, projectName)) != null) {
			// break loop
			return;
		}
		
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		ArrayList<File> sources = new ArrayList<File>();
		ArrayList<IJavaProject> projects = new ArrayList<IJavaProject>();
		ArrayList<File> libraries = new ArrayList<File>();
		for(IClasspathEntry entry : fProject.getRawClasspath()) {
			IPath path = entry.getPath();
			IResource resource = root.findMember(path);
			switch(entry.getEntryKind()){
			case IClasspathEntry.CPE_SOURCE: 
				if(resource != null) {
					sources.add(resource.getLocation().toFile().getAbsoluteFile());
				}else if(path.toFile().exists()){
					sources.add(path.toFile().getAbsoluteFile());
				}else{
					IFolder folder = root.getFolder(path);
					sources.add(folder.getLocation().toFile().getAbsoluteFile());
				}
				break;
			case IClasspathEntry.CPE_PROJECT: 
				if(resource != null) {
					projects.add(JavaCore.create(resource.getProject()));
				}
				break;
			case IClasspathEntry.CPE_LIBRARY: 
				if(resource != null) {
					libraries.add(resource.getLocation().toFile().getAbsoluteFile());
				}else{
					libraries.add(path.toFile().getAbsoluteFile());
				}
				break;
			case IClasspathEntry.CPE_VARIABLE: 
			case IClasspathEntry.CPE_CONTAINER: 
				break;
			}
		}
		for(IProject project : fProject.getProject().getReferencedProjects()) {
			if(project.isOpen() && project.hasNature(JavaCore.NATURE_ID) && !project.equals(this.fProject.getProject())) {
				IJavaProject javaProject = JavaCore.create(project);
				if(!projects.contains(javaProject)) {
					projects.add(javaProject);
				}
			}
		}
		
		// get source folders, classpath folders, classpath jars, and referenced projects
		String sourceDirs = asList(sources, DELIMETER, null);
		String classpathDirs = asList(libraries, DELIMETER, new Filter(){
			public boolean accept(Object o) {
				File directory = new File(o.toString());
				return directory.isDirectory();
			}
		});
		String classpathJars = asList(libraries, DELIMETER, new Filter(){
			public boolean accept(Object o) {
				File jar = new File(o.toString());
				return jar.isFile() && jar.getName().toLowerCase().endsWith(".jar");
			}
		});
		String referenceProjects = asList(projects, DELIMETER, null);
		
		if(this.fInitProject) {
			// set up following properties:
			//   current.project
			//   current.project.source.dirs
			//   current.project.classpath.dirs
			//   current.project.classpath.jars
			//   current.project.reference.projects
			prop.setProperty(PROPERTY_CURRENT_PROJECT, projectName);
			prop.setProperty(PROPERTY_CURRENT_PROJECT_SOURCE_DIRS, sourceDirs);
			prop.setProperty(PROPERTY_CURRENT_PROJECT_CLASSPATH_DIRS, classpathDirs);
			prop.setProperty(PROPERTY_CURRENT_PROJECT_CLASSPATH_JARS, classpathJars);
			prop.setProperty(PROPERTY_CURRENT_PROJECT_REFERENCE_PROJECTS, referenceProjects);
			// set up following properties:
			//   kona.sdk.dir
			//   android.sdk.dir
			//   android.sdk.platform.target.dir
			IClasspathContainer container = JavaCore.getClasspathContainer(new Path(KONA_CONTAINER_ID), fProject);
			if(container != null) {
				for(IClasspathEntry entry : container.getClasspathEntries()) {
					if(entry.getEntryKind() == IClasspathEntry.CPE_LIBRARY) {
						File path = entry.getPath().toFile().getAbsoluteFile();
						if(path.toString().toLowerCase().endsWith("kona.jar")) {
							prop.setProperty(PROPERTY_MAYLOON_SDK_DIR, path.getParent());
						}
					}
				}
			}
			container = JavaCore.getClasspathContainer(new Path(ANDROID_CONTAINER_ID), fProject);
			if(container != null) {
				for(IClasspathEntry entry : container.getClasspathEntries()) {
					if(entry.getEntryKind() == IClasspathEntry.CPE_LIBRARY) {
						File path = entry.getPath().toFile().getAbsoluteFile();
						if(path.toString().toLowerCase().endsWith("android.jar")) {
							File target = path.getParentFile();
							File platform = target.getParentFile();
							File sdk = platform.getParentFile();
							prop.setProperty(PROPERTY_ANDROID_SDK_DIR, sdk.toString());
							prop.setProperty(PROPERTY_ANDROID_SDK_PLATFORM_TARGET_DIR, target.toString());
						}
					}
				}
			}
		}else{
			// set up following properties:
			//   reference.project.<RefProject>.output.dir
			//   reference.project.<RefProject>.dir
			//   reference.project.<RefProject>.source.dirs
			//   reference.project.<RefProject>.classpath.dirs
			//   reference.project.<RefProject>.classpath.jars
			//   reference.project.<RefProject>.reference.projects
			IPath path = fProject.getOutputLocation();
			IResource resource = root.findMember(path);
			if(resource != null && resource.exists()) {
				prop.setProperty(getPropertyName(FORMAT_REFERENCE_PROJECT_OUTPUT_DIR, projectName), 
						         resource.getLocation().toFile().getAbsolutePath().toString());
			}else{
				prop.setProperty(getPropertyName(FORMAT_REFERENCE_PROJECT_OUTPUT_DIR, projectName),
				                 path.toFile().getAbsolutePath().toString());
			}
			prop.setProperty(getPropertyName(FORMAT_REFERENCE_PROJECT_DIR, projectName), fProject.getProject().getLocation().toOSString());
			prop.setProperty(getPropertyName(FORMAT_REFERENCE_PROJECT_SOURCE_DIRS, projectName), sourceDirs);
			prop.setProperty(getPropertyName(FORMAT_REFERENCE_PROJECT_CLASSPATH_DIRS, projectName), classpathDirs);
			prop.setProperty(getPropertyName(FORMAT_REFERENCE_PROJECT_CLASSPATH_JARS, projectName), classpathJars);
			prop.setProperty(getPropertyName(FORMAT_REFERENCE_PROJECT_REFERENCE_PROJECTS, projectName), referenceProjects);
		}
		
		for(IJavaProject project : projects) {
			AntPropertiesBuilder builder = new AntPropertiesBuilder(project);
			builder.build(prop);
		}
	}
	/**
	 * Return property name from format w/ argument
	 * @param format
	 * @param arg
	 * @return String
	 */
	private String getPropertyName(String format, String arg) {
		return String.format(format, arg);
	}
	/**
	 * Convert a list to string format. Each element in list will be separated
	 * by delimiter string in result string.
	 * @param array
	 * @param delimiter
	 * @param filter
	 * @return String
	 */
	private String asList(List<?> array, String delimiter, Filter filter) {
		StringBuffer buffer = new StringBuffer();
		Iterator<?> it = array.iterator();
		while(it.hasNext()) {
			Object o = it.next();
			if(o == null) {
				continue;
			}
			if(filter != null && !filter.accept(o)) {
				continue;
			}
			String append = null;
			if(o instanceof IJavaProject) {
				append = ((IJavaProject)o).getProject().getName().replaceAll("\\s", "_");
			}else{
				append = o.toString();
			}
			if(buffer.length() > 0){
				buffer.append(delimiter);
			}
			buffer.append(append);
		}
		return buffer.toString();
	}
	/**
	 * Save properties to kona.build.properties file
	 * @param prop
	 */
	private void save(Properties prop) {
		FileOutputStream stream = null;
		try {
			File location = new File(fProject.getProject().getLocation().toFile(), MAYLOON_BUILD_PROPERTIES);
			PrintWriter writer = new PrintWriter(stream = new FileOutputStream(location));
			prop.store(writer, "Mayloon Build Properties. This is automatically generated by Mayloon Builder.");
			writer.flush();
			writer.close();
		} catch (IOException e) {
			MptPluginConsole.warning(MptConstants.BUILD_TAG, "Ant build properties could not be generated due to cause {%1$s}", e.getMessage());
		} finally {
			if(stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
				}
			}
		}
	}
	
}
