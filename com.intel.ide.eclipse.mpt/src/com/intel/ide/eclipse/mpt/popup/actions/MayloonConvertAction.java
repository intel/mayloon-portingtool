package com.intel.ide.eclipse.mpt.popup.actions;

import java.util.Iterator;

import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.core.runtime.jobs.Job;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.builder.MayloonPropertiesBuilder;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;


public class MayloonConvertAction  implements IObjectActionDelegate {
	
	private ISelection selection;

	public MayloonConvertAction() {
		// TODO Auto-generated constructor stub
	}

	/*
	 * @see org.eclipse.ui.IActionDelegate#run(org.eclipse.jface.action.IAction)
	 */
	@SuppressWarnings("rawtypes")
	public void run(IAction action) {
		if(!MayloonSDK.isSdkLocationSet(true)) {
			return;
		}
		if (selection instanceof IStructuredSelection) {
			for (Iterator it = ((IStructuredSelection) selection).iterator(); it.hasNext();) {
				Object element = it.next();
				final IProject project;
				
				if (element instanceof IProject) {
					project = (IProject) element;
				} else if (element instanceof IAdaptable) {
					project = (IProject)((IAdaptable)element).getAdapter(IProject.class);
				} else{
					project = null;
				}
				
				if (project != null) {
					if(ProjectUtil.isLibraryProject(project)) {
						MptPluginConsole.error(MptConstants.CONVERT_TAG, "Convert library project '%1$s' is not supported.", project.getName());
						return;
					}
						
					if (!ProjectUtil.checkVersionMatch(project)) {
						return;
					}
					
					//do convert and use monitor to show convert progress 
					Job convertJob = new Job("Convert Project") {		
						@Override
						protected IStatus run(IProgressMonitor monitor) {

							// 8 steps to convert project
							monitor.beginTask("Project converting...", 8);
							try {
								// generate .j2s configuration file
								MayloonPropertiesBuilder.mayloonPropBuild(project);
								monitor.worked(1);
								
								String deployMode = ProjectUtil.getDeployMode(project);
								
								ProjectUtil.backupProject(project);
								monitor.worked(1);
								
								// get package name from AndroidManifest.xml
								// packageName is [packageName], not include the main activity name.(not compatible with android internal implementation)
								String packageName = ProjectUtil.extractPackageFromManifest(project);
								
								// merge j2s class path modify logic to it.
								ProjectUtil.fixMayloonClassEntry(project);
								monitor.worked(1);
								
								// merge j2s nature to it.
								MayloonNature.addProjectNature(project);
								monitor.worked(1);
								
								// copy mayloon framework resource and js library
								ProjectUtil.addMayloonFrameworkFolder(project, deployMode, packageName);
								monitor.worked(1);
								
								// copy android build output resource to /bin/apps/[package name]/
								ProjectUtil.addAndroidOutput2Mayloon(project, deployMode, packageName, false);
								monitor.worked(1);
								
								// clear android generated gen/ folder
								ProjectUtil.clearAndroidGenFolder(project);		
								monitor.worked(1);
								
								// TODO luqiang, skip this release
								// ProjectUtil.addAntBuildSupport(project);	
								
								// TODO luqiang, add monitor for it.
								project.refreshLocal(IResource.DEPTH_INFINITE, null);
								monitor.worked(1);
							} catch (CoreException e) {
								MptPluginLogger.throwable(e);
								MptPluginConsole.error(MptConstants.CONVERT_TAG, "Project '%1$s' could not be converted due to cause {%2$s}", project.getName(), e.getMessage());
							}
							monitor.done();
							return Status.OK_STATUS;
						}
					};
					convertJob.setUser(true);
					convertJob.schedule();
					MptPluginConsole.general(MptConstants.CONVERT_TAG, "Project '%1$s' has been converted successfully.", project.getName());
				}
			}
		}
	}

	/* 
	 * @see org.eclipse.ui.IActionDelegate#selectionChanged(org.eclipse.jface.action.IAction,
	 *      org.eclipse.jface.viewers.ISelection)
	 */
	public void selectionChanged(IAction action, ISelection selection) {
		this.selection = selection;
	}

	/* 
	 * @see org.eclipse.ui.IObjectActionDelegate#setActivePart(org.eclipse.jface.action.IAction,
	 *      org.eclipse.ui.IWorkbenchPart)
	 */
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
	}
}
