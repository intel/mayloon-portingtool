package com.intel.ide.eclipse.mpt.wizards.export;

import java.io.File;
import java.lang.reflect.InvocationTargetException;

import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jface.operation.IRunnableWithProgress;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.wizard.IWizardPage;
import org.eclipse.jface.wizard.Wizard;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.MessageBox;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IExportWizard;
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.PlatformUI;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

/**
 * Mayloon Export Wizard
 */
public class ExportWizard extends Wizard implements IExportWizard {
	
	public static final String EXPORT_TAG = "Export";
	
	/**
     * Project to export
     */
	private IProject fProject;
	/**
	 * Wizard pages in this export wizard
	 */
	private IWizardPage fProjectSelectionPage;
	
	/**
	 * Destination file
	 */
	private File fDestinationFile;

	public ExportWizard() {
		this.setHelpAvailable(false);
		this.setWindowTitle("Export Mayloon Application");
	}

	@Override
	public void init(IWorkbench workbench, IStructuredSelection selection) {
		Object object = selection.getFirstElement();
		if(object instanceof IProject){
			this.setProject((IProject)object);
		}else if(object instanceof IAdaptable){
			IResource resource = (IResource)((IAdaptable)object).getAdapter(IResource.class);
			if(resource != null){
				this.setProject(resource.getProject());
			}
		}

	}
	
	@Override
	public void addPages(){
		this.addPage(fProjectSelectionPage = new ProjectSelectionPage(this));
	}
	
	@Override
	public boolean performFinish() {
		IWorkbench workbench = PlatformUI.getWorkbench();
		try{
			workbench.getProgressService().busyCursorWhile(new IRunnableWithProgress(){
				public void run(IProgressMonitor monitor) throws InvocationTargetException, InterruptedException {
                    try {
                        export();
                    } finally {
                        monitor.done();
                    }
				}});
		} catch (InvocationTargetException e) {
        } catch (InterruptedException e) {
        }
		return true;
	}
	
	/**
	 * Export the mayloon application 
	 */
	private boolean export(){
		/*
		 * schedule an incremental build to make sure up-to-date apk from Android builder
		 */
//		try {
//			this.fProject.build(IncrementalProjectBuilder.INCREMENTAL_BUILD, new NullProgressMonitor());
//		} catch (CoreException e) {
//		}
		// TODO luqiang, work only deploy as tizen package
		String deployMode = ProjectUtil.getDeployMode(fProject);
				
		if (!deployMode.equals(MptConstants.J2S_DEPLOY_MODE_TIZEN)) {
			Shell activeShell = PlatformUI.getWorkbench().getActiveWorkbenchWindow().getShell();
		    MessageBox dialog = 
		    		  new MessageBox(activeShell, SWT.ICON_QUESTION | SWT.OK);
		    		dialog.setText("Deployment Mode Check");
		    		dialog.setMessage("Please set your deployment mode as Tizen first(j2s.deploy.mode=Tizen)");
		    		int returnCode = dialog.open();
		    		if (SWT.OK == returnCode) {
		    		}
		    		return false;
		}
		
		// check whether the android.core.Start.html is generated successful
		// TODO luqiang, 
		
		performTizenPackage();
		
		return true;
	}
	
	/**
	 * Package mayloon application as tizen project 
	 */
	private void performTizenPackage() {
		try {
			// generate the .project, config.xml, Icon.png and android.core.Start.html file of tizen application
			ProjectUtil.addTizenProjectFile(fProject);
			// copy mayloon runtime resource to mayloon_bin
			ProjectUtil.addMayloonFrameworkFolder(fProject, MptConstants.J2S_DEPLOY_MODE_TIZEN);
			
			// copy mayloon compile output folder to mayloon_bin
			// copy /bin/apps
			ProjectUtil.addAndroidOutput2Mayloon(fProject, MptConstants.J2S_DEPLOY_MODE_TIZEN);
			
			// copy /bin/classes
			ProjectUtil.addMayloonCompiledJSFiles(fProject);			
			
		} catch (CoreException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
	
	/**
	 * Fire update event to wizard pages
	 * @param event
	 */
	public void fireUpdateEvent(int event){
		for(IWizardPage page : getPages()){
			((ExportWizardPage)page).onUpdateEvent(event);
		}
	}

    @Override
    public boolean canFinish() {
    	if(this.getContainer().getCurrentPage() == this.fProjectSelectionPage){
    		return true;
    	}
        return false;
    }
    
    /**
     * Set current project to export
     * @param project
     */
    public void setProject(IProject project){
		this.fProject = project;
	}
	/**
	 * Return current project to export
	 * @return IProject
	 */
	public IProject getProject(){
		return this.fProject;
	}
	/**
	 * Return project selection page
	 * @return IWizardPage
	 */
	public IWizardPage getProjectSelectionPage(){
		return this.fProjectSelectionPage;
	}
	/**
	 * Return destination file
	 * @return File
	 */
	public File getDestinationFile(){
		return this.fDestinationFile;
	}

}
