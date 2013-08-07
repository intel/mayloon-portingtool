package com.intel.ide.eclipse.mpt.wizards.export;

import java.io.File;
import java.util.ArrayList;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.ui.JavaElementLabelProvider;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.DirectoryDialog;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.dialogs.ElementListSelectionDialog;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

/**
 * Project selection page. In this page, user can choose a project to export. 
 * A set of checks will be performed to make sure project can be exported.
 */
public class ProjectSelectionPage extends ExportWizardPage {
	/**
	 * Text for project name 
	 */
	private Text fProjectText;
	
	/**
	 * Text for export path 
	 */
	private Text fDestinationText;
	
	/**
	 * Button for browsing project
	 */
	private Button fBrowseButton;
	
	/**
	 * Button for browsing export path
	 */
	private Button fDestinationButton;
	
	private IProject fProject;
	
	private File fDestinationFile;
	
	private static final int labelWidth = 98;
	/**
	 * Constructor
	 * @param wizard
	 */
	protected ProjectSelectionPage(ExportWizard wizard) {
		super(wizard, "ProjectSelectionPage");
		this.setTitle("Select Project to Export");
		this.setDescription("Will export the selected project to the destination directory.");
	}

	@Override
	public void createControl(Composite parent) {
		Composite composite = new Composite(parent, SWT.NONE);
		composite.setLayoutData(new GridData(GridData.FILL_BOTH));
		composite.setLayout(new GridLayout(1, false));
		
		createProjectComponent(composite);
		createDestinationComponent(composite);
		createCompressComponent(composite);
		
        this.setErrorMessage(null);
        this.setMessage(null);
        this.setPageComplete(false);
        this.setControl(composite);
        
        this.onChange();
	}
	
	private void createCompressComponent(Composite parent){
		final Button btnEnableCompressAction = new Button(parent,
				SWT.CHECK);
		btnEnableCompressAction.setToolTipText("Enable compress action to reduce sizes of js files.");
		final ExportWizard host = (ExportWizard) this.getWizard();

		btnEnableCompressAction.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				host.enableCompressAction(btnEnableCompressAction
						.getSelection());
			}
		});

		btnEnableCompressAction.setText("Enable JavaScript compression");
		host.enableCompressAction(btnEnableCompressAction.getSelection());
	}

	/**
	 * Create project component, containing a text and browse button for project selection
	 * @param parent
	 */
	private void createProjectComponent(Composite parent){
		Composite composite = new Composite(parent, SWT.NONE);
		composite.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		GridLayout gl = new GridLayout(3, false);
		gl.marginHeight = gl.marginWidth = 0;
		composite.setLayout(gl);
		
		Label label = new Label(composite, SWT.NONE);
		GridData gd_label = new GridData(SWT.LEFT, SWT.CENTER, false, false, 1, 1);
		gd_label.widthHint = labelWidth;
		label.setLayoutData(gd_label);
		label.setText("Project:");
		
		fProjectText = new Text(composite, SWT.BORDER);
		fProjectText.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		fProjectText.addModifyListener(new ModifyListener(){
			public void modifyText(ModifyEvent e) {
				onChange();
			}
		});
		if(fWizard.getProject() != null){
			fProjectText.setText(fWizard.getProject().getName());
		}
		
		fBrowseButton = new Button(composite, SWT.NONE);
		fBrowseButton.setText("Browse...");
		fBrowseButton.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(SelectionEvent e) {
				onBrowseProject();
			}
		});
	}
	
	/**
	 * Create path component, containing a text and browse button for export destination selection
	 * @param parent
	 */
	private void createDestinationComponent(Composite parent) {
		Composite composite = new Composite(parent, SWT.NONE);
		composite.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		GridLayout gl = new GridLayout(3, false);
		gl.marginHeight = gl.marginWidth = 0;
		composite.setLayout(gl);
		
		Label label = new Label(composite, SWT.NONE);
		GridData gd_label = new GridData(SWT.LEFT, SWT.CENTER, false, false, 1, 1);
		gd_label.widthHint = labelWidth;
		label.setLayoutData(gd_label);
		label.setText("Export destination:");
		
		fDestinationText = new Text(composite, SWT.BORDER);
		fDestinationText.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		fDestinationText.addModifyListener(new ModifyListener(){
			public void modifyText(ModifyEvent e) {
				onChange();
			}
		});
		
		String text = this.fProjectText.getText().trim();
		if (text.length() != 0) {
			IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
			IProject project = root.getProject(text);
			if(project != null && project.exists()){
				try {
					IPath destPath = ProjectUtil.getMayloonOutputFolder(project);
					fDestinationText.setText(destPath.toString());
				} catch (CoreException e1) {
					this.setErrorMessage("Can not get project default output folder");
				} 
			}
		}
		fDestinationButton = new Button(composite, SWT.NONE);
		fDestinationButton.setText("Browse...");
		fDestinationButton.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(SelectionEvent e) {
				onBrowseDestination();
			}
		});
	}
//	@Override
//	public IWizardPage getNextPage() {
//		return fWizard.getSignatureRequired() ? 
//			   fWizard.getKeystoreSelectionPage() : fWizard.getDestinationPage();
//	}
	@Override
	public void onVisible(){
		super.onVisible();
		onChange();
	}
	/**
	 * Browse project and choose
	 */
	protected void onBrowseProject(){
		ILabelProvider labelProvider = new JavaElementLabelProvider(JavaElementLabelProvider.SHOW_DEFAULT);
		ElementListSelectionDialog dialog = new ElementListSelectionDialog(this.getShell(), labelProvider);
		dialog.setTitle("Choose MayLoon Project");
		dialog.setMessage("Please choose a Kona project to open.");
		ArrayList<IJavaProject> projects = new ArrayList<IJavaProject>();
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		for(IProject project : root.getProjects()) {
			try {
				if(project.hasNature(MayloonNature.NATURE_ID)) {
					projects.add(JavaCore.create(project));
				}
			} catch (CoreException e) {
			}
		}
		dialog.setElements(projects.toArray(new Object[projects.size()]));
		try {
			IJavaModel javaModel = JavaCore.create(root);
			IJavaProject project = javaModel.getJavaProject(this.fProjectText.getText().trim());
			if(project != null) {
				dialog.setInitialSelections(new Object[]{project});
			}
		} catch(Exception e) {
		}
		if(dialog.open() == Window.OK) {
			IJavaProject project = (IJavaProject)dialog.getFirstResult();
			if(project != null) {
				this.fProjectText.setText(project.getElementName());
			}
		}
	}
	/**
	 * Browse file system and choose the destination directory
	 */
	protected void onBrowseDestination(){
		DirectoryDialog dialog = new DirectoryDialog (this.getShell(), SWT.OPEN); 
		dialog.setText("Export Destination Selection");
		if(this.fDestinationText.getText() != null){
			dialog.setFilterPath(this.fDestinationText.getText().trim());
		}
		String selecteddir=dialog.open(); 
		if(selecteddir != null){
			this.fDestinationText.setText(selecteddir);
		}
	}
	
	private boolean checkProject(){
		if (!this.checkSelectedProject() || !this.checkEntryFile()){
			this.fWizard.setProject(null);
			return false;
		}
		this.fWizard.setProject(this.fProject);
		return true;
	}
	
	private boolean checkDestDir(){
		if (!this.checkDestDirectory()){
			this.fWizard.setDestinationFile(null);
			return false;
		}
		this.fWizard.setDestinationFile(this.fDestinationFile);
		return true;
	}
	
	/**
	 * Perform a variety of checks.
	 */
	protected void onChange(){
		this.setMessage(null);
		this.setErrorMessage(null);
		this.setPageComplete(false);

		if (this.checkProject()){
			this.checkDestDir();
		}
		
		fWizard.getContainer().updateButtons();
		this.setPageComplete(true);
	}
	/**
	 * Find the first marker of specified type and properties from project. 
	 * @param project          Project to search
	 * @param type             Type of marker
	 * @param includeSubtypes  True to include markers of sub-type, otherwise false
	 * @param severity         Severity of marker
	 * @param depth            Search depth
	 * @param includeReferencedProject   True to include referenced projects, otherwise false
	 * @return IMarker         Marker object if find, otherwise null
	 */
	protected IMarker findFirstMarker(IProject project, String type, boolean includeSubtypes, 
			                          int severity, int depth, boolean includeReferencedProject) {
		try {
			IMarker[] markers = project.findMarkers(type, includeSubtypes, depth);
			for(IMarker marker : markers) {
				if(severity == marker.getAttribute(IMarker.SEVERITY, -1)) {
					return marker;
				}
			}
			if(includeReferencedProject) {
				for(IProject refProject : project.getReferencedProjects()) {
					IMarker marker = findFirstMarker(refProject, type, includeSubtypes, 
							                         severity, depth, includeReferencedProject);
					if(marker != null) {
						return marker;
					}
				}
			}
		} catch (CoreException e) {
			MptPluginLogger.throwable(e);
		}
		return null;
	}

    private String getProjectName(){
    	if (this.fProjectText == null){
    		return null;
    	}
    	return this.fProjectText.getText().trim();
    }
    
    private String getDestinationDir(){
    	if (this.fDestinationText == null){
    		return null;
    	}
    	return this.fDestinationText.getText().trim();
    }
    
	private boolean checkSelectedProject(){
		String projectName = this.getProjectName();
		if (projectName == null || projectName.length() == 0){
			this.setErrorMessage("Please select a project to export.");
			return false;
		}
		
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		fProject = root.getProject(projectName);
		
		if (fProject == null || !fProject.exists()){
			this.setErrorMessage(String.format("%1$s is not a valid project name", projectName));
			return false;
		}
		
		if (!ProjectUtil.checkIsMayloonProject(fProject)){
			this.setErrorMessage(String.format("Project \"%1$s\" is not a Mayloon project.", fProject.getName()));
			return false;
		}
		return true;
	}
	
	private boolean checkDestDirectory(){
		String destinationDir = this.getDestinationDir();
		
		if (destinationDir == null || destinationDir.length() == 0){
			this.setErrorMessage("Please select a destination directory to export.");
			return false;
		}
		
		this.fDestinationFile = new File(destinationDir);
		
		if (this.fDestinationFile == null){
			this.setErrorMessage("Not a valid destination directory.");
			return false;
		}
		if (!this.fDestinationFile.isDirectory()){
			this.setErrorMessage("The destination directory doesn't exist.");
			return false;
		}
		return true;
	}
	
	private boolean checkEntryFile(){
		if (fProject == null || !fProject.exists()){
			return false;
		}
		IFile srcFile = fProject.getFile(MptConstants.WS_ROOT + fProject.getName()
				+ MptConstants.MAYLOON_START_ENTRY_FILE);
		if (!srcFile.exists()){
			this.setErrorMessage(String.format("Could not find %1$s.html. Please run your project as MayLoon Application first.", fProject.getName()));
			return false;
		}
		return true;
	}	
   
}
