package com.intel.ide.eclipse.mpt.wizards.export;

import java.io.File;
import java.lang.reflect.InvocationTargetException;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.core.runtime.IProgressMonitor;
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
import com.intel.ide.eclipse.mpt.MptException;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
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
	
	private boolean bEnableCompress;

	public ExportWizard() {
		this.setHelpAvailable(false);
		this.setWindowTitle("Export MayLoon Application");
		this.setNeedsProgressMonitor(true);
	}

	@Override
	public void init(IWorkbench workbench, IStructuredSelection selection) {
		Object object = selection.getFirstElement();
		if (object instanceof IProject) {
			this.setProject((IProject) object);
		} else if (object instanceof IAdaptable) {
			IResource resource = (IResource) ((IAdaptable) object)
					.getAdapter(IResource.class);
			if (resource != null) {
				this.setProject(resource.getProject());
			}
		}

	}

	@Override
	public void addPages() {
		this.addPage(fProjectSelectionPage = new ProjectSelectionPage(this));
	}

	@Override
	public boolean performFinish() {
		try {
			this.getContainer().run(true, true, new IRunnableWithProgress() {
				@Override
				public void run(IProgressMonitor monitor) throws InvocationTargetException,
						InterruptedException{
					export(monitor);
					monitor.done();
				}
			});
		} catch (InvocationTargetException e) {
		} catch (InterruptedException e) {
		}
		return true;
	}

	/**
	 * Export the mayloon application
	 */
	private boolean export(IProgressMonitor monitor) {
		/*
		 * schedule an incremental build to make sure up-to-date apk from
		 * Android builder
		 */
		// try {
		// this.fProject.build(IncrementalProjectBuilder.INCREMENTAL_BUILD, new
		// NullProgressMonitor());
		// } catch (CoreException e) {
		// }
		// work only deploy as tizen package

		if (!checkEntryFile()) {
			Shell activeShell = PlatformUI.getWorkbench()
					.getActiveWorkbenchWindow().getShell();
			MessageBox dialog = new MessageBox(activeShell, SWT.ICON_QUESTION
					| SWT.OK);
			dialog.setText("Entry File Check");
			dialog.setMessage(String
					.format("Could not find %1$s.html. Please run your project as MayLoon Application first.", fProject.getName()));
			int returnCode = dialog.open();
			if (SWT.OK == returnCode) {
			}
			return false;
		}

		// check whether the android.core.Start.html is generated successful
		// TODO luqiang,

		performTizenPackage(monitor);

		return true;
	}

	/**
	 * Package mayloon application as tizen project
	 */
	private void performTizenPackage(IProgressMonitor monitor) {
		try {
			monitor.beginTask("Exporting MayLoon application...", 5);
			// set export destination
			ProjectUtil.setMayloonOutputFolder(fProject, fDestinationFile);
			// get package name from AndroidManifest.xml
			// packageName is [packageName], not include the main activity
			// name.(not compatible with android internal implementation)
			String packageName = ProjectUtil
					.extractPackageFromManifest(fProject);

			// generate project name.html
			// file of tizen application
			ProjectUtil.addTizenProjectFile(fProject);
			MptPluginConsole.general(MptConstants.EXPORT_TAG,
					"%1$s has been copied to %2$s", fProject.getName()
							+ MptConstants.MAYLOON_START_ENTRY_FILE,
					fDestinationFile.toString());
			monitor.worked(1);

			// copy mayloon runtime resource to export destination
			ProjectUtil.addMayloonFrameworkFolder(fProject,
					MptConstants.J2S_DEPLOY_MODE_TIZEN, packageName, this.bEnableCompress);
			monitor.worked(1);

			// copy mayloon Icon to mayloon_bin
			// copy /bin/apps
			ProjectUtil.addAndroidOutput2Mayloon(fProject,
					MptConstants.J2S_DEPLOY_MODE_TIZEN, packageName, true);
			monitor.worked(1);
			
			// add an icon
			ProjectUtil.addProjectIcon(fProject, packageName);
			monitor.worked(1);
			
			// copy /bin/classes
			ProjectUtil.addMayloonCompiledJSFiles(fProject, this.bEnableCompress);
			monitor.worked(1);

			// TODO luqiang, add monitor for it.
			fProject.refreshLocal(IResource.DEPTH_INFINITE, null);

			MptPluginConsole.success(MptConstants.EXPORT_TAG,
					"Project '%1$s' has been exported successfully.",
					fProject.getName());
		} catch (CoreException e) {
			// TODO Auto-generated catch block
			MptPluginConsole.error(MptConstants.EXPORT_TAG,
					"Project '%1$s' could not be exported due to cause {%2$s}",
					fProject.getName(), e.getMessage());
			e.printStackTrace();
		} 
		catch (MptException e) {
			// TODO Auto-generated catch block
			MptPluginConsole.error(MptConstants.EXPORT_TAG,
					"Project '%1$s' could not be exported due to cause {%2$s}",
					fProject.getName(), e.getMessage());
			e.printStackTrace();
		}
	}

	/**
	 * Fire update event to wizard pages
	 * 
	 * @param event
	 */
	public void fireUpdateEvent(int event) {
		for (IWizardPage page : getPages()) {
			((ExportWizardPage) page).onUpdateEvent(event);
		}
	}

	@Override
	public boolean canFinish() {
		if (this.getContainer().getCurrentPage() == this.fProjectSelectionPage) {
			if (!checkEntryFile()) {
				((ProjectSelectionPage) this.fProjectSelectionPage)
						.setErrorMessage(String
								.format("Could not find %1$s.html. Please run your project as MayLoon Application first.", fProject.getName()));
				return false;
			}
			return true;
		}
		return false;
	}
	
	private boolean checkEntryFile(){
		IFile srcFile = fProject.getFile(MptConstants.WS_ROOT + fProject.getName()
				+ MptConstants.MAYLOON_START_ENTRY_FILE);
		return srcFile.exists();
	}

	/**
	 * Set current project to export
	 * 
	 * @param project
	 */
	public void setProject(IProject project) {
		this.fProject = project;
	}

	/**
	 * Return current project to export
	 * 
	 * @return IProject
	 */
	public IProject getProject() {
		return this.fProject;
	}

	/**
	 * Return project selection page
	 * 
	 * @return IWizardPage
	 */
	public IWizardPage getProjectSelectionPage() {
		return this.fProjectSelectionPage;
	}

	/**
	 * Set destination file to export
	 * 
	 * @param destinationFile
	 */
	public void setDestinationFile(File destinationFile) {
		this.fDestinationFile = destinationFile;
	}

	/**
	 * Return destination file
	 * 
	 * @return File
	 */
	public File getDestinationFile() {
		return this.fDestinationFile;
	}

	public void enableCompressAction(boolean bEnable){
		this.bEnableCompress = bEnable;
	}
}
