package com.intel.ide.eclipse.mpt.wizards.export;

import java.util.ArrayList;

import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
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
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.dialogs.ElementListSelectionDialog;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;

/**
 * Project selection page. In this page, user can choose a project to export. 
 * A set of checks will be performed to make sure project can be exported.
 * User can also choose whether or not signature is required for the output
 * jar in this page.
 */
public class ProjectSelectionPage extends ExportWizardPage {
	/**
	 * Text for project name 
	 */
	private Text fProjectText;
	/**
	 * Button for browsing project
	 */
	private Button fBrowseButton;
	
	/**
	 * Constructor
	 * @param wizard
	 */
	protected ProjectSelectionPage(ExportWizard wizard) {
		super(wizard, "ProjectSelectionPage");
		this.setTitle("Select Project to Export");
		this.setDescription("Will perform checks on selected project to make sure it can be exported");
	}

	@Override
	public void createControl(Composite parent) {
		Composite composite = new Composite(parent, SWT.NONE);
		composite.setLayoutData(new GridData(GridData.FILL_BOTH));
		composite.setLayout(new GridLayout(1, false));
		
		createProjectComponent(composite);
		//createSignatureComponent(composite);
		
        this.setErrorMessage(null);
        this.setMessage(null);
        this.setPageComplete(false);
        this.setControl(composite);
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
		
		new Label(composite, SWT.NONE).setText("Project:");
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
		dialog.setTitle("Choose Kona Project");
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
	 * Perform a variety of checks.
	 */
	protected void onChange(){
		this.setMessage(null);
		this.setErrorMessage(null);
		this.setPageComplete(false);
		
		String text = this.fProjectText.getText().trim();
		if(text.length() == 0){
			this.setErrorMessage("Please select a project to export.");
		}else{
			// TODO luqiang, add check whether the xxxx.html is generated
			
			
			IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
			IProject project = root.getProject(text);
			if(project==null || !project.exists()){
				this.setErrorMessage(String.format("%1$s is not a valid project name", text));
			}else{
				try {
					if(project.hasNature(MayloonNature.NATURE_ID)){
						IMarker marker = findFirstMarker(project, IMarker.PROBLEM, true,
								             IMarker.SEVERITY_ERROR, IResource.DEPTH_INFINITE, true);
						if(marker != null) {
							IProject markProject = marker.getResource().getProject();
							if(markProject.equals(project)) {
								this.setErrorMessage(String.format("Project '%1$s' has severe problem, please fix first.",
										             markProject.getName()));
							}else{
								this.setErrorMessage(String.format("Referenced project '%1$s' has severe problem, please fix first.",
										             markProject.getName()));
							}
							return;
						}
						if(!project.equals(this.fWizard.getProject())){
							this.fWizard.setProject(project);
						}
						this.setPageComplete(true);
					}else{
						this.setErrorMessage(String.format("%1$s is not a Kona project",text));
					}
				} catch (CoreException e) {
					this.setErrorMessage("Can not get project nature");
				}
			}
		}
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
}
