package com.intel.ide.eclipse.mpt.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathExpressionException;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IResourceVisitor;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceDescription;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.QualifiedName;
import org.eclipse.core.runtime.Status;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.launching.JavaRuntime;
import org.xml.sax.InputSource;

import com.intel.ide.eclipse.mpt.MayloonVersion;
import com.intel.ide.eclipse.mpt.MptConstants;
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

	/**
	 * add the Mayloon output folder, the jar package will be created there.
	 * @param project
	 * @throws CoreException
	 */
	public static void addMayloonOutputFolder(IProject project) throws CoreException {
		IFolder folder = project.getFolder(MptConstants.WS_ROOT + MptConstants.MAYLOON_OUTPUT_DIR);
		if (!folder.exists()) {
			folder.create(true, true, null);
		}
	}
	
	/**
	 * remove the android class entry: android.jar
	 * @param project
	 * @throws JavaModelException 
	 */
	public static void fixMayloonClassEntry(IProject project) throws JavaModelException {
		IJavaProject javaProject = JavaCore.create(project);
		// get the project classpath
		IClasspathEntry[] entries = javaProject.getRawClasspath();
		IClasspathEntry[] oldEntries = entries;
		
		// find android classpath and remove it
		int androidIndex = ProjectUtil.findClassPathEntry(entries, MptConstants.ANDROID_CLASSPATH_ENTRY_ID, 
															IClasspathEntry.CPE_CONTAINER);
		if (androidIndex != -1) {
			MptPluginConsole.general(MptConstants.CONVERT_TAG, "Removing Android Class Container from classpath.");
			entries = ProjectUtil.removeClassPathEntry(entries, androidIndex);
		}
		
		// check JRE classpath entry
		int jreIndex = ProjectUtil.findClassPathEntry(entries, JavaRuntime.JRE_CONTAINER, IClasspathEntry.CPE_CONTAINER);
		if (jreIndex == -1) {
			// no jre classpath entry, add a jre container to Mayloon class path
			MptPluginConsole.general(MptConstants.CONVERT_TAG, "Adding JRE Class Container to classpath.");
			IClasspathEntry jre_entry = JavaRuntime.getDefaultJREContainerEntry();
			entries = ProjectUtil.addClassPathEntry(entries, jre_entry);
		}
		
		// add Mayloon framework classpath if not exist
		int MayloonIndex = ProjectUtil.findClassPathEntry(entries, MayloonClasspathContainerInitializer.MAYLOON_CONTAINER_ID,  IClasspathEntry.CPE_CONTAINER);
		if (MayloonIndex == -1) {
			MptPluginConsole.general(MptConstants.CONVERT_TAG, "Adding Mayloon Class Container to classpath.");
			IClasspathEntry Mayloon_entry = MayloonClasspathContainerInitializer.getContainerEntry();
			entries = ProjectUtil.addClassPathEntry(entries, Mayloon_entry);
		}
		
		if (entries != oldEntries) {
			javaProject.setRawClasspath(entries, new NullProgressMonitor());
			MptPluginConsole.general(MptConstants.CONVERT_TAG, "Changes on classpath has been applied.");
		}
	}
	
	/**
	 * look for the specific classpath and return its index
	 * @param entries
	 * @param entryPath
	 * @param entryKind
	 * @return the index of the found classpath or -1.
	 */
	public static int findClassPathEntry(IClasspathEntry[] entries, String entryPath, int entryKind) {
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
	 * @param entries The classpath entries array
	 * @param index The index to remove
	 * @return A new class path entries array
	 */
	public static IClasspathEntry[] removeClassPathEntry(IClasspathEntry[] entries, int index) {
		IClasspathEntry[] newEntries = new IClasspathEntry[entries.length-1];
		// copy the entries before index
		System.arraycopy(entries, 0, newEntries, 0, index);
		// copy the entries after index
		System.arraycopy(entries, index + 1, newEntries, index, entries.length - index - 1);
		
		return newEntries;
	}
	
	/**
	 * add a classpath entry to the array
	 * @param entries The classpath entries array
	 * @param new_entry The classpath entry to add
	 * @return A new class path entries array
	 */
	public static IClasspathEntry[] addClassPathEntry(IClasspathEntry[] entries, IClasspathEntry new_entry) {
		IClasspathEntry[] newEntries = new IClasspathEntry[entries.length+1];
		System.arraycopy(entries, 0, newEntries, 0, entries.length);
		newEntries[entries.length] = new_entry;
		return newEntries;
	}
	
	/**
	 * get the target api level of this android project
	 * @param project the android project
	 * @return the android target api level of this project,
	 * 		   return -1 if fail to get
	 */
	public static int getAndroidProjectApiLevel(IProject project) {
		int androidApiLevel = -1;		
		IFile defaultProperties = project.getFile(MptConstants.ANDROID_DEFAULT_PROPERTIES);
		if (defaultProperties == null || !defaultProperties.exists()) {
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID,"Can't find android file:%1$s", MptConstants.ANDROID_DEFAULT_PROPERTIES); //$NON-NLS-1$
			return androidApiLevel;
		}
		
		FileInputStream stream = null;
		try {
			Properties p = new Properties();
			stream = new FileInputStream(defaultProperties.getLocation().toFile());
			p.load(stream);
			String target = p.getProperty(MptConstants.ANDROID_DEFAULT_PROPERTY_TARGET, "");
			Matcher matcher = Pattern.compile("[0-9]+$").matcher(target);
			if(matcher.find()){
				androidApiLevel = Integer.parseInt(matcher.group());
			} else {
				MptPluginConsole.warning(MptPlugin.PLUGIN_ID, "Can't parse android api level number from " + target);
			}
		} catch (FileNotFoundException e) {
			MptPluginLogger.log(e, "Can't find android file:%1$s", MptConstants.ANDROID_DEFAULT_PROPERTIES); //$NON-NLS-1$
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID, "Can't find android file:%1$s", MptConstants.ANDROID_DEFAULT_PROPERTIES);
		} catch (IOException e) {
			MptPluginLogger.log(e, "Fail to read the file:%1$s", MptConstants.ANDROID_DEFAULT_PROPERTIES); //$NON-NLS-1$
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID, "Fail to read the file:%1$s", MptConstants.ANDROID_DEFAULT_PROPERTIES);
		} finally {
			if(stream != null) {
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
	 * @param project
	 * @return boolean
	 */
	public static boolean isLibraryProject(IProject project) {
		boolean isLibraryProject = false;
		IResource defaultProperties = project.findMember("default.properties");
		if(defaultProperties!=null && defaultProperties.exists()) {
			Properties prop = new Properties();
			FileInputStream stream = null;
			try {
				prop.load(stream = new FileInputStream(defaultProperties.getLocation().toFile()));
			} catch (IOException e) {
				MptPluginLogger.throwable(e, "Could not load default.properties.");
			} finally {
				if(stream != null) {
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
	 * get the minimal sdk version required by this android project
	 * @param project the android project
	 * @return the minimal required sdk version, return -1 if no this requirement
	 */
	public static int getAndroidProjectMinSdkVersion(IProject project) {
		IResource manifestFile = project.findMember(MptConstants.ANDROID_MANIFEST_FILE);
		if (manifestFile == null) {
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID, "Can't find Android file:%1$s", MptConstants.ANDROID_MANIFEST_FILE);
			return -1;
		}
		
		IPath location = project.getLocation();
		XPath xPath = AndroidXPathFactory.newXPath(null);
		String value;
		// get the minSdkVersion value
		try {
			value = xPath.evaluate(
						   "/manifest/uses-sdk/@android:minSdkVersion", //$NON-NLS-1$
						   new InputSource(new FileInputStream(new File(location.toOSString(), MptConstants.ANDROID_MANIFEST_FILE))));
		} catch (XPathExpressionException e) {
			MptPluginLogger.log(e, "Fail to parse android manifest file:%1$s", MptConstants.ANDROID_MANIFEST_FILE); //$NON-NLS-1$
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID, "Fail to parse android manifest file:%1$s", MptConstants.ANDROID_MANIFEST_FILE);
			return -1;
		} catch (FileNotFoundException e) {
			MptPluginLogger.log(e, "Can't find android manifest file:%1$s", MptConstants.ANDROID_MANIFEST_FILE); //$NON-NLS-1$
			MptPluginConsole.warning(MptPlugin.PLUGIN_ID, "Can't find android manifest file:%1$s", MptConstants.ANDROID_MANIFEST_FILE);
			return -1;
		}
		
		int minSdkValue = 0;
		if (value.length() > 0) {
			try {
				minSdkValue = Integer.parseInt(value); 
			} catch (NumberFormatException e) {
				MptPluginConsole.warning(MptPlugin.PLUGIN_ID, "Attribute minSdkVersion is not an Integer in %1$s", MptConstants.ANDROID_MANIFEST_FILE); //$NON-NLS-1$
				return -1;
			}
			
			return minSdkValue;
		}
		
		return -1;
	}
	
	/**
	 * check the project's target android level, if it's higher than our Mayloon,
	 * we will give the user warning about this mismatch.
	 * @param project
	 * @return true if match or pass
	 */
    public static boolean checkVersionMatch(IProject project) {
    	MayloonVersion MayloonVersion = MayloonSDK.getSdkVersion();
    	if (MayloonVersion == null) {
    		MptPluginConsole.error(MptPlugin.PLUGIN_ID, MayloonProjectMessages.Can_Not_Get_Mayloon_SDK_Version);
    		return false;
    	}
    	
    	int minSdkVersion = getAndroidProjectMinSdkVersion(project);
    	if(minSdkVersion > MayloonVersion.getAndroidApiLevel()) {
    		// The minSdkVersion is greater than MayloonSdkApiLevel, application may not be able to
    		// get installed. Prompt for developer's decision on whether or not to continue convert
			boolean proceed = MptPlugin.displayPrompt(MayloonProjectMessages.Version_Check_Title, 
					                        String.format(MayloonProjectMessages.Android_MinSdkVersion_Higher_Message,
				                                          minSdkVersion, MayloonVersion.getAndroidApiLevel()));
			if (!proceed) {
				return false;
			}
    	}
    	
    	int targetApiLevel = getAndroidProjectApiLevel(project);
    	if(targetApiLevel < minSdkVersion) {
    		// Call attention:
    		// Developer seems to build application with lower target API level but
    		// ask for a higher API level device to run it. 
    		MptPluginConsole.warning(MptConstants.GENERAL_TAG,  "Target API level is smaller than minSdkVersion. \n" +
    				"Do you intend to build application on lower target API level but run it on device of higher \n" +
    				"API level ? If this is not your original intention, please correct later.");
    	}
    	if(targetApiLevel > MayloonVersion.getAndroidApiLevel()) {
    		// Call attention:
    		// Application build target API level is greater than MayloonSdkApiLevel. 
    		// Application may not run properly on Mayloon device. 
    		MptPluginConsole.warning(MptConstants.GENERAL_TAG,  "Target API level is greater than Mayloon SDK API level. \n" +
    				"Application may not run properly on Mayloon device.");
    	}
		
		return true;
    }
    
    public static IMarker markResource(IResource resource, String markerId, String message, int lineNumber, int startOffset, int endOffset, int severity) {
    	try {
            IMarker marker = resource.createMarker(markerId);
            marker.setAttribute(IMarker.MESSAGE, message);
            marker.setAttribute(IMarker.SEVERITY, severity);

            // if marker is text type, enforce a line number so that it shows in the editor
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

            resource.refreshLocal(IResource.DEPTH_ZERO, new NullProgressMonitor());   		
    		return marker;
    	} catch (CoreException e) {
    		MptPluginLogger.log(e, "Failed to add marker %1$s to %2$s", markerId, resource.getFullPath()); //$NON-NLS-1$
    	}
    	
    	return null;
    }
    
    public static IMarker markResource(IResource resource, String markerId, String message, int lineNumber, int severity) {
    	return markResource(resource, markerId, message, lineNumber, -1, -1, severity);
    }
    
    public static IMarker markProject(IProject project, String markerId, String message, int severity, int priority) {
        try {
	    	IMarker marker = project.createMarker(markerId);
	        marker.setAttribute(IMarker.MESSAGE, message);
	        marker.setAttribute(IMarker.SEVERITY, severity);
	        marker.setAttribute(IMarker.PRIORITY, priority);

	        project.refreshLocal(IResource.DEPTH_ZERO, new NullProgressMonitor());
	
	        return marker;
        } catch (CoreException e) {
        	MptPluginLogger.log(e, "Failed to add marker %1$s to project: %2$s", markerId, project.getName()); //$NON-NLS-1$
        }
        
        return null;
    }
    
    public static boolean findMarkersFromResource(IResource resource, String markerId) {
        try {
            if (resource.exists()) {
                IMarker[] markers = resource.findMarkers(markerId, true, IResource.DEPTH_ZERO);
                if (markers != null && markers.length > 0) {
                	return true;
                }
            }
        } catch (CoreException e) {
        	MptPluginLogger.log(e, "Failed to remove marker %1$s in %2$s", markerId, resource.toString()); //$NON-NLS-1$
        }
        
        return false;
    }
    /**
     * remove marker from the resource.
     * @param resource
     * @param markerId
     */
    public static void removeMarkersFromResource(IResource resource, String markerId, int depth) {
        try {
            if (resource.exists()) {
                resource.deleteMarkers(markerId, true, depth);
            }
        } catch (CoreException e) {
        	MptPluginLogger.log(e, "Failed to remove marker %1$s in %2$s", markerId, resource.toString()); //$NON-NLS-1$
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
        	// TODO luqiang
        	try {
				if (project.hasNature(MayloonNature.NATURE_ID)) {
					MayloonProjectList.add(javaProject);
				}
			} catch (CoreException e) {
				// pass
			}
        }
        
        return MayloonProjectList.toArray(new IJavaProject[MayloonProjectList.size()]);
    }
    
    /**
     * Return package name of this application
     */
    public static String getPackageName(IProject project){
		IResource manifest = project.findMember(MptConstants.ANDROID_MANIFEST_FILE);
		if(manifest == null)
			return null;
		
		String packageName = null;
		try {
			XPath path = AndroidXPathFactory.newXPath(null);
			packageName = path.evaluate("/manifest/@package", 
					                    new InputSource(new FileInputStream(manifest.getLocation().toFile())));
		} catch (XPathExpressionException e) {
			MptPluginLogger.throwable(e, "Unable to find package name.");
		} catch (FileNotFoundException e) {
			MptPluginLogger.throwable(e, "Unable to find %1$s." + MptConstants.ANDROID_MANIFEST_FILE);
		}
		return packageName;
    }
    
    /**
     * Return launch activity of this application
     */
    public static String getLauncherActivity(IProject project){
		IResource manifest = project.findMember(MptConstants.ANDROID_MANIFEST_FILE);
		if(manifest == null) 
			return null;
		
		String launcherActivity = null;
		try {
			XPath path = AndroidXPathFactory.newXPath(null);
			launcherActivity = path.evaluate("/manifest/application/activity/intent-filter/category[@android:name=\"android.intent.category.LAUNCHER\"]/parent::*/parent::*/@android:name", 
					                         new InputSource(new FileInputStream(manifest.getLocation().toFile())));
		} catch (XPathExpressionException e) {
			MptPluginLogger.throwable(e, "Unable to find launcher activity.");
		} catch (FileNotFoundException e) {
			MptPluginLogger.throwable(e, "Unable to find %1$s." + MptConstants.ANDROID_MANIFEST_FILE);
		}
		if(launcherActivity.startsWith(".")) {
			return launcherActivity;
		}else if(launcherActivity.indexOf('.') != -1){
			return launcherActivity;
		}else{
			return "." + launcherActivity;
		}
    }
    
    /**
     * Load a named string property from resource's persistent property table
     * @param resource
     * @param propertyName
     * @return String
     */
    public static String loadStringProperty(IResource resource, String propertyName){
        QualifiedName qname = new QualifiedName(MptPlugin.PLUGIN_ID, propertyName);
        try {
            return resource.getPersistentProperty(qname);
        } catch (CoreException e) {
            return null;
        }
    }
    
    /**
     * Save a named string property to resource's persistent property table
     * @param resource
     * @param propertyName
     * @param value
     * @return boolean
     */
    public static boolean saveStringProperty(IResource resource, String propertyName, String value) {
        QualifiedName qname = new QualifiedName(MptPlugin.PLUGIN_ID, propertyName);
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
	 * @param project IProject
	 */
	public static void addAntBuildSupport(IProject project) {
		String MayloonSdkLocation = MayloonSDK.getSdkLocation();
		if(MayloonSdkLocation == null || MayloonSdkLocation.isEmpty()) {
			return;
		}
		File projectLocation = project.getLocation().toFile();
		// copy Mayloon.custom.properties to project directory
		try {
			copyFile(new File(MayloonSdkLocation, MptConstants.MAYLOON_CUSTOM_PROPERTIES_TEMPLATE), 
					 new File(projectLocation, MptConstants.MAYLOON_CUSTOM_PROPERTIES));
		} catch (IOException e) {
			MptPluginLogger.warning("Could not copy %1$s to project %2$s", 
					MptConstants.MAYLOON_CUSTOM_PROPERTIES, project.getName());
		}
		// copy build.xml to project directory
		try {
			copyFile(new File(MayloonSdkLocation, MptConstants.MAYLOON_BUILD_XML), 
					 new File(projectLocation, MptConstants.MAYLOON_BUILD_XML));
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
			MptPluginConsole.warning(MptConstants.GENERAL_TAG, "Could not create %1$s for project %2$s", 
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
	 * @param source
	 * @param target
	 * @throws IOException
	 */
	public static void copyFile(File source, File target) throws IOException {
		FileInputStream sourceStream = null;
		FileOutputStream targetStream = null;
		try{
			FileChannel sourceChannel = (sourceStream = new FileInputStream(source)).getChannel();
			FileChannel targetChannel = (targetStream = new FileOutputStream(target)).getChannel();
			targetChannel.transferFrom(sourceChannel, 0, source.length());
		} finally {
			if(sourceStream != null) {
				try{
					sourceStream.close();
				} catch(IOException e) {
				}
			}
			if(targetStream != null) {
				try{
					targetStream.close();
				} catch(IOException e) {
				}
			}
		}
	}
	
	/**
	 * Backup the project which is going to be converted. All files and folders in
	 * the project directory will be compressed to an archive, except contents in
	 * project output directory.  
	 * @param project
	 */
	public static void backupProject(IProject project) {
		MptPluginConsole.general(MptConstants.GENERAL_TAG,  "Backup project '%1$s'", project.getName());
		
		// disable auto building mode if necessary
		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		boolean isAutoBuilding = workspace.isAutoBuilding();
		if(isAutoBuilding) {
			try {
		        IWorkspaceDescription desc = workspace.getDescription();
		        desc.setAutoBuilding(false);
				workspace.setDescription(desc);
			} catch (CoreException e) {
			}
		}
		
		// clean up project
		try {
			project.build(IncrementalProjectBuilder.CLEAN_BUILD, null);
		} catch (CoreException e) {
		}
		
		// do backup
		ZipOutputStream stream = null;
		File archive = null;
		try {
			archive = File.createTempFile(project.getName()+"_archive", "bk");
			final ZipOutputStream output = (stream = new ZipOutputStream(new FileOutputStream(archive)));
			final IPath base = project.getLocation();
			final byte[] buffer = new byte[4096];
			project.accept(new IResourceVisitor(){
				@Override
				public boolean visit(IResource resource) throws CoreException {
					if(resource.getType() == IResource.FILE) {
						IPath path = resource.getLocation();
						IPath entry = path.makeRelativeTo(base);
						FileInputStream stream = null;
						try {
							FileInputStream input = (stream = new FileInputStream(path.toFile()));
							output.putNextEntry(new ZipEntry(entry.toString()));
							int length = 0;
							while((length = input.read(buffer)) != -1) {
								output.write(buffer, 0, length);
							}
							output.closeEntry();
						} catch (IOException e) {
							throw new CoreException(new Status(IStatus.ERROR, MptPlugin.PLUGIN_ID, e.getMessage()));
						} finally {
							if(stream != null) {
								try {
									stream.close();
								} catch (IOException e) {
								}
							}
						}
					}
					return true;
				}});
		} catch (Exception e) {
			MptPluginLogger.throwable(e);
			MptPluginConsole.warning(MptConstants.GENERAL_TAG, "Could not complete backup due to cause {%1$s}", e.getMessage());
			archive.deleteOnExit();
			archive = null;
		} finally {
			if(stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
				}
			}
			if(archive != null) {
				if(archive.renameTo(new File(project.getLocation().toFile(), "archive.zip"))){
					MptPluginConsole.general(MptConstants.GENERAL_TAG,  
							"Backup archive.zip is generated under project '%1$s'", project.getName());
				}
			}
		}
		
		// restore auto building mode if necessary
		if(isAutoBuilding) {
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
	 * @param file
	 * @return String
	 */
	public static String getContent(File file) {
		String result = null;
		if(file.isFile()) {
			FileInputStream input = null;
			try {
				result = getContent(input = new FileInputStream(file));
			} catch (Exception e) {
			} finally {
				if(input != null) {
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
	 * @param input 
	 * @return String
	 */
	public static String getContent(InputStream input) {
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		try {
			byte[] buffer = new byte[2048];
			int length = 0;
			while((length = input.read(buffer)) != -1) {
				output.write(buffer, 0, length);
			}
		} catch (Exception e) {
		}
		return new String(output.toByteArray());
	}
}
