package com.intel.ide.eclipse.mpt.project;

import org.eclipse.core.resources.IMarker;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.ClasspathContainerInitializer;
import org.eclipse.jdt.core.IClasspathContainer;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;

import com.intel.ide.eclipse.mpt.MayloonVersion;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

/**
 * classpath container initializer for mayloon framework
 *
 */
public class MayloonClasspathContainerInitializer extends
		ClasspathContainerInitializer {

	// The container id for mayloon framework jar file
	public static String MAYLOON_CONTAINER_ID = 
		"com.intel.ide.eclipse.mpt.MAYLOON_FRAMEWORK"; //$NON-NLS-1$
	
	// classpath container for mayloon project
	static class mayloonClasspathContainer  implements IClasspathContainer {
	    private IClasspathEntry[] mClasspathEntry;
	    private IPath mContainerPath;
	    private String mName;
	    
	    /**
	     * Constructs the container with the {@link IClasspathEntry} representing the mayloon
	     * framework jar file and the container id
	     * @param entries the entries representing the mayloon framework.
	     * @param path the path containing the classpath container id.
	     * @param name the name of the container to display.
	     */
	    mayloonClasspathContainer(IClasspathEntry[] entries, IPath path, String name) {
	        mClasspathEntry = entries;
	        mContainerPath = path;
	        mName = name;
	    }
	    
	    public IClasspathEntry[] getClasspathEntries() {
	        return mClasspathEntry;
	    }

	    public String getDescription() {
	        return mName;
	    }

	    public int getKind() {
	        return IClasspathContainer.K_DEFAULT_SYSTEM;
	    }

	    public IPath getPath() {
	        return mContainerPath;
	    }
	}
	
	public MayloonClasspathContainerInitializer() {

	}

	/**
	 * Binds a classpath container for a project
	 * @param containerPath the container path
	 * @param project the project to bind
	 */
	@Override
	public void initialize(IPath containerPath, IJavaProject project)
			throws CoreException {
		if (MAYLOON_CONTAINER_ID.equals(containerPath.toString())) {
			IClasspathContainer container = allocatemayloonContainer(project);
			if (container != null) {
				JavaCore.setClasspathContainer(new Path(MAYLOON_CONTAINER_ID), 
						new IJavaProject[] {project},
						new IClasspathContainer[] {container},
						new NullProgressMonitor());
			}
		}
	}
	
	/**
	 * allocate a mayloon classpath container.
	 * @param project
	 * @return
	 */
	private static IClasspathContainer allocatemayloonContainer(IJavaProject project) {
		if (!MayloonSDK.isSdkLocationSet(false)) {
			// sdk is not set, add marker for this project.
			if (!ProjectUtil.findMarkersFromResource(project.getProject(), MptConstants.MARKER_SDK)) {
				ProjectUtil.markProject(project.getProject(), MptConstants.MARKER_SDK, MayloonProjectMessages.Not_found_Mayloon_SDK_Message, IMarker.SEVERITY_ERROR, IMarker.PRIORITY_HIGH);
			}
			
			return null;
		}
		
		String mayloonJarPath = MayloonSDK.getSdkLocation() + MptConstants.MAYLOON_JAR_LIB;
		
		IClasspathEntry frameworkClasspathEntry = JavaCore.newLibraryEntry(
				new Path(mayloonJarPath),
				null, // source attachment path
				null, // default source attachment root path.
				null,
				null,
				false // not exported.
				);
		
		MayloonVersion mayloonVersion = MayloonSDK.getSdkVersion();
		String version = null;
		if (mayloonVersion != null) {
			version = mayloonVersion.getSdkVersion();
			if (version.isEmpty()) {
				version = "unknow version"; //$NON-NLS-1$
			} else {
				version = MptConstants.MAYLOON_JAR_LIB_NAME + " " + version; //$NON-NLS-1$
			}
		}
		
		return new mayloonClasspathContainer(new IClasspathEntry[] {frameworkClasspathEntry},
				new Path(MAYLOON_CONTAINER_ID),
				version);
	}
	
	/**
	 * Creating a new {@link IClasspathEntry} of type {@link IClasspathEntry#CPE_CONTAINER}
	 * linking to the mayloon framework
	 * @return
	 */
	public static IClasspathEntry getContainerEntry() {
		return JavaCore.newContainerEntry(new Path(MAYLOON_CONTAINER_ID));
	}
	
	/**
	 * Updates the projects with mayloon framework container
	 * @param mayloonProjects
	 * @return
	 */
	public static boolean updateProjects(IJavaProject[] mayloonProjects) {
		try {
			int projectCount = mayloonProjects.length;
			
			IClasspathContainer[] containers = new IClasspathContainer[projectCount];
			for (int i = 0; i < projectCount; i++) {
				containers[i] = allocatemayloonContainer(mayloonProjects[i]);
			}
			
			JavaCore.setClasspathContainer(new Path(MAYLOON_CONTAINER_ID), mayloonProjects, containers, new NullProgressMonitor());
			
			return true;
		} catch (JavaModelException e) {
			return false;
		}
	}
	
	@Override
	public boolean canUpdateClasspathContainer(IPath containerPath, IJavaProject project) {
		return true;
	}
}
