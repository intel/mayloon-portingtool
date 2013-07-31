/**
 * 
 */
package com.intel.ide.eclipse.mpt.wizards.convert;

import java.util.HashSet;
import java.util.Set;

import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.FormAttachment;
import org.eclipse.swt.layout.FormData;
import org.eclipse.swt.layout.FormLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;

import com.intel.ide.eclipse.mpt.project.MayloonProjectMessages;
import org.eclipse.swt.widgets.List;
import org.eclipse.jface.viewers.ListViewer;

public class CheckPreConvertPage extends WizardPage {

	private ConvertWizards convertWizards;
	private Set<String> errorInfoSet;
	private Set<String> warningInfoSet;
	private static final String errorInfoType = "Error information:";
	private static final String warningInfoType = "Warning information:";
	private static final int infoCompositeWidth = 550;
	// If there are two infoComposites, the height will be base. 
	private static final int infoCompositeBaseHeight = 100; 
	//If there is only one infoComposite, the height will be double.
	private static final int infoCompositeDoubleHeight = 200;
	private static final int formOffset = 10;
	
	protected CheckPreConvertPage(ConvertWizards convertWizards) {
		super("CheckPreConvertPage");
		this.setWizard(convertWizards);
		this.convertWizards = convertWizards;
		this.setTitle("Check Before Convert");
		this.setDescription("Check necessary files and information before converting to MayLoon Application");
		this.errorInfoSet = new HashSet<String>();
		this.warningInfoSet = new HashSet<String>();
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jface.dialogs.IDialogPage#createControl(org.eclipse.swt.widgets.Composite)
	 */
	@Override
	public void createControl(Composite parent) {
		Composite composite = new Composite(parent, SWT.NONE);
		composite.setLayout(new FormLayout());
		composite.setLayoutData(new FormData());
		
		createAllComponents(composite);
        //this.setPageComplete(false);
        this.setControl(composite);
      }
	
	@Override
	public void dispose(){
		super.dispose();
		setControl(null);
	}

	private void createAllComponents(Composite composite){
		Composite errorComposite = new Composite(composite, SWT.NONE);
		errorComposite.setLayout(new FormLayout());
		Composite warningComposite = new Composite(composite, SWT.NONE);
		warningComposite.setLayout(new FormLayout());
		Label textLabel = new Label(composite, SWT.WRAP);
		
		if(!getErrorInfoSet().isEmpty()){
			if(getWarningInfoSet().isEmpty()){
				this.setErrorMessage("Error information shows below, no warning information");
				errorComposite.setBounds(0, 0, infoCompositeWidth, infoCompositeDoubleHeight);
				createInfoComponent(errorComposite, errorInfoType, new FormAttachment());
			}else{
				this.setErrorMessage("Error and warning information shows below");
				errorComposite.setBounds(0, 0, infoCompositeWidth, infoCompositeBaseHeight);
				createInfoComponent(errorComposite, errorInfoType, new FormAttachment());
				
				warningComposite.setBounds(0, 0, infoCompositeWidth, infoCompositeBaseHeight);
				FormData formData = new FormData();
				formData.top = new FormAttachment(errorComposite, formOffset);
				warningComposite.setLayoutData(formData);
				createInfoComponent(warningComposite, warningInfoType, formData.top);
			}
		}else if(!getWarningInfoSet().isEmpty()){
			this.setMessage("Warning information shows below, no error information");
			warningComposite.setBounds(0, 0, infoCompositeWidth, infoCompositeDoubleHeight);
			createInfoComponent(warningComposite, warningInfoType, new FormAttachment());
			FormData labelData = new FormData();
			labelData.top = new FormAttachment(warningComposite, formOffset);
			textLabel.setLayoutData(labelData);
			textLabel.setText(MayloonProjectMessages.WARNING_EXISTED_MESSAGE);
		}else{
			this.setMessage("No error and warning information");
			textLabel.setText(MayloonProjectMessages.NO_ERROR_AND_WARNING_MESSAGE);
		}
	}
	
	private void createInfoComponent(Composite composite, String infoType, FormAttachment top){
		Label infoLabel = new Label(composite, SWT.WRAP);
		FormData labelData = new FormData();
		labelData.top = top;
		infoLabel.setText(infoType);
		infoLabel.setLayoutData(labelData);
		
		ListViewer infoListViewer = new ListViewer(composite, SWT.FULL_SELECTION | SWT.BORDER|SWT.V_SCROLL|SWT.H_SCROLL);
		List list = infoListViewer.getList();
		FormData listData = new FormData();
		listData.top = new FormAttachment(infoLabel, 0);
		listData.width = composite.getBounds().width;
		listData.height = composite.getBounds().height - infoLabel.getBounds().height;
		list.setLayoutData(listData);
		if(infoType.equals(errorInfoType)){
			infoListViewer.add(errorInfoSet.toArray());
		}else if(infoType.equals(warningInfoType)){
			infoListViewer.add(warningInfoSet.toArray());
		}
	}
	
	public boolean canFlipToNextPage() {
		return isPageComplete() && errorInfoSet.isEmpty();
	}

	/**
	 * @return the convertWizards
	 */
	public ConvertWizards getConvertWizards() {
		return convertWizards;
	}

	/**
	 * @param convertWizards the convertWizards to set
	 */
	public void setConvertWizards(ConvertWizards convertWizards) {
		this.convertWizards = convertWizards;
	}

	/**
	 * @return the errorInfoSet
	 */
	public Set<String> getErrorInfoSet() {
		return errorInfoSet == null ? new HashSet<String>() : errorInfoSet;
	}

	/**
	 * @param errorInfoSet the errorInfoSet to set
	 */
	public void setErrorInfoSet(Set<String> errorInfoSet) {
		this.errorInfoSet = errorInfoSet;
	}

	/**
	 * @return the warningInfoSet
	 */
	public Set<String> getWarningInfoSet() {
		return warningInfoSet == null ? new HashSet<String>(): warningInfoSet;
	}

	/**
	 * @param warningInfoSet the warningInfoSet to set
	 */
	public void setWarningInfoSet(Set<String> warningInfoSet) {
		this.warningInfoSet = warningInfoSet;
	}
}
