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
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Path;
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

	public ExportWizard() {
		this.setHelpAvailable(false);
		this.setWindowTitle("Export Mayloon Application");
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
		IWorkbench workbench = PlatformUI.getWorkbench();
		try {
			workbench.getProgressService().busyCursorWhile(
					new IRunnableWithProgress() {
						public void run(IProgressMonitor monitor)
								throws InvocationTargetException,
								InterruptedException {
							try {
								export();
							} finally {
								monitor.done();
							}
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
	private boolean export() {
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
		String deployMode = ProjectUtil.getDeployMode(fProject);

		if (!deployMode.equals(MptConstants.J2S_DEPLOY_MODE_TIZEN)) {
			Shell activeShell = PlatformUI.getWorkbench()
					.getActiveWorkbenchWindow().getShell();
			MessageBox dialog = new MessageBox(activeShell, SWT.ICON_QUESTION
					| SWT.OK);
			dialog.setText("Deployment Mode Check");
			dialog.setMessage("Please set your deployment mode as Tizen first(mayloon.deploy.mode=Tizen)");
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
			// set export destination
			ProjectUtil.setMayloonOutputFolder(fProject, fDestinationFile);
			// get package name from AndroidManifest.xml
			// packageName is [packageName], not include the main activity
			// name.(not compatible with android internal implementation)
			String packageName = ProjectUtil
					.extractPackageFromManifest(fProject);

			// generate the Icon.png and project name.html
			// file of tizen application
			ProjectUtil.addTizenProjectFile(fProject);
			MptPluginConsole.general(MptConstants.EXPORT_TAG,
					"%1$s has been copied to %2$s", fProject.getName()
							+ MptConstants.MAYLOON_START_ENTRY_FILE,
					fDestinationFile.toString());
			// copy mayloon runtime resource to export destination
			ProjectUtil.addMayloonFrameworkFolder(fProject,
					MptConstants.J2S_DEPLOY_MODE_TIZEN, packageName);

			// copy mayloon Icon to mayloon_bin
			// copy /bin/apps
			ProjectUtil.addAndroidOutput2Mayloon(fProject,
					MptConstants.J2S_DEPLOY_MODE_TIZEN, packageName, true);

			// copy /bin/classes
			ProjectUtil.addMayloonCompiledJSFiles(fProject);

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
		} catch (MptException e) {
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
			String deployMode = ProjectUtil.getDeployMode(fProject);
			if (!deployMode.equals(MptConstants.J2S_DEPLOY_MODE_TIZEN)) {
				((ProjectSelectionPage) this.fProjectSelectionPage)
						.setErrorMessage("Please set your deployment mode as Tizen first(mayloon.deploy.mode=Tizen)");
				return false;
			}
			return true;
		}
		return false;
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

}
