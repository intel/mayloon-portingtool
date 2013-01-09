package com.intel.ide.eclipse.mpt.builder;

import java.io.File;
import java.util.ArrayList;
import java.util.Map;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IResourceDelta;
import org.eclipse.core.resources.IResourceDeltaVisitor;
import org.eclipse.core.resources.IResourceVisitor;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;


public class MayloonPackageBuilder extends IncrementalProjectBuilder {

	public static final String BUILDER_ID = "com.intel.ide.eclipse.mpt.MayloonPackageBuilder"; //$NON-NLS-1$
											   
	/**
	 * Tag used in printing message to console view.
	 */
	public static final String BUILDER_TAG = "MayloonBuilder";
	/**
	 * File extensions of Android build output
	 */
	public static final String EXT_APK = ".apk";
	/**
	 * List of project on which the build has done
	 */
	private ArrayList<IProject> doneProjects = new ArrayList<IProject>();
	
	/**
	 * Do migrate incompatibility check with specified kind of build and monitor
	 * @param kind
	 * @param monitor
	 * @throws CoreException
	 */
	private void doMigrateCheck(int kind, IProgressMonitor monitor) throws CoreException {
		IProject project = this.getProject();
		IResourceDelta delta = this.getDelta(project);
		if(delta != null) {
			delta.accept(new IResourceDeltaVisitor(){
				public boolean visit(IResourceDelta delta) throws CoreException {
					IResource resource = delta.getResource();
					if(resource.getType() == IResource.FILE) {
						doMigrateCheck(resource);
					}
					return true;
				}});
		}else{
			project.accept(new IResourceVisitor(){
				public boolean visit(IResource resource) throws CoreException {
					if(resource.getType() == IResource.FILE) {
						doMigrateCheck(resource);
					}
					return true;
				}});
		}
	}
	
	// TODO luqiang, we don't need this migrate check, because mayloon check compatible problem depend on its specific extension of JDT compiler. 
	/**
	 * Do migrate incompatibility check on resource object
	 * @param resource
	 */
	private void doMigrateCheck(IResource resource) {
		MptPluginLogger.general("In doMigrateCheck");
		String category = resource.getLocation().getFileExtension();
//		MigrateHandlerLoader loader = MigrateHandlerLoader.instance();
//		ArrayList<MigrateHandler> handlers = loader.getCategoryHandler(category);
//		if(handlers != null) {
//			try {
//				resource.deleteMarkers(MptConstants.MARKER_MIGRATE, true, IResource.DEPTH_ZERO);
//			} catch (CoreException e) {
//				MptPluginLogger.throwable(e);
//			}
//			for(MigrateHandler handler : handlers) {
//				try {
//					handler.handle(resource);
//				} catch (Exception e) {
//				}
//			}
//		}
	}
	
	@Override
	@SuppressWarnings("rawtypes")
	public IProject[] build(int kind, Map args, IProgressMonitor monitor) throws CoreException {
		IProject project = getProject();
		if(ProjectUtil.isLibraryProject(project)) {
			return project.getReferencedProjects();
		}
		
		// do migrate incompatibility check
		//doMigrateCheck(kind, monitor);
		
		// remove build problem marker
		ProjectUtil.removeMarkersFromResource(project, MptConstants.MARKER_BUILDER, IResource.DEPTH_ONE);
		
		// check if apk is built successfully
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		IJavaProject javaProject = JavaCore.create(project);
		IFolder apkOutputFolder = (IFolder)root.findMember(javaProject.getPath().append("/bin"));
		apkOutputFolder.refreshLocal(IResource.DEPTH_ONE, new SubProgressMonitor(monitor, 1));
		IFile apk = null;
		for(IResource resoruce : apkOutputFolder.members(IResource.FILE)){
			if(resoruce.exists() && resoruce.getLocation().toString().endsWith(EXT_APK)){
				apk = (IFile)resoruce;
				break;
			}
		}
		
		// mark a problem and return if apk doesn't exist 
		if(apk == null){
			ProjectUtil.markProject(project, 
					    MptConstants.MARKER_BUILDER, 
					    "Mayloon builder aborts because Android builder doesn't build Apk successfully. Please try full build by clean & build", 
					    IMarker.SEVERITY_ERROR, 
					    IMarker.PRIORITY_HIGH);
			return project.getReferencedProjects();
		}
		
		// create Mayloon output folder if it's not present
		IFolder MayloonOutputFolder = project.getFolder(MptConstants.MAYLOON_OUTPUT_DIR);
		if(MayloonOutputFolder==null || !MayloonOutputFolder.exists()){
			MayloonOutputFolder.create(true, true, new SubProgressMonitor(monitor, 1));
		}
		
		// get Mayloon output jar file object (it doesn't need to exist)
		IFile MayloonOutputJar = MayloonOutputFolder.getFile(project.getName()+ ".jar");
		
		// build output jar which package apk and referenced libraries and reference 
		// project compiled code, and signed with a debug signature
		// TODO luqiang, using j2s JDT compiler extension instead!!!
		//build(javaProject, apk.getLocation().toFile(), MayloonOutputJar.getLocation().toFile(), MayloonSDK.getDebugSignatureInfo());
		
		// refresh Mayloon output folder, and mark output jar as derived as appropriate
		MayloonOutputFolder.refreshLocal(IResource.DEPTH_INFINITE, new SubProgressMonitor(monitor, 1));
		if(MayloonOutputJar.exists()){
			MayloonOutputJar.setDerived(true, new SubProgressMonitor(monitor, 1));
		}
		monitor.done();
		return project.getReferencedProjects();
	}
	
	/**
	 * Return a relative path from file to its root parent
	 * 
	 * @param root   File
	 * @param file   File
	 * @return File
	 */
	protected File getRelativeFile(File root, File file) {
		String strRoot = root.getAbsolutePath();
		String strFile = file.getAbsolutePath();
		if(!strFile.startsWith(strRoot)){
			return null;
		}
		StringBuilder relative = new StringBuilder(strFile);
		relative.delete(0, strRoot.length());
		while(relative.charAt(0)==File.separatorChar){
			relative = relative.delete(0, 1);
		}
		return new File(relative.toString());
	}
	
	@Override
	protected void clean(IProgressMonitor monitor) throws CoreException {
		IProject project = getProject();
		ProjectUtil.removeMarkersFromResource(project, MptConstants.MARKER_BUILDER, IResource.DEPTH_ONE);
		ProjectUtil.removeMarkersFromResource(project, MptConstants.MARKER_MIGRATE, IResource.DEPTH_INFINITE);
		try{
			monitor.beginTask("Clean up Mayloon Project", 1);
			IFolder outputFolder = project.getFolder(MptConstants.MAYLOON_OUTPUT_DIR);
			if(outputFolder!=null && outputFolder.exists()){
				IFile outputJar = outputFolder.getFile(project.getName()+".jar");
				if(outputJar!=null && outputJar.exists()){
					outputJar.delete(true, monitor);
				}
				outputFolder.refreshLocal(IResource.DEPTH_ZERO, monitor);
			}
		} finally {
			monitor.done();
		}
	}

}
