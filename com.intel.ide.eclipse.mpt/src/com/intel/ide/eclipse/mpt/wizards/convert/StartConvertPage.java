package com.intel.ide.eclipse.mpt.wizards.convert;

import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;

public class StartConvertPage extends WizardPage {

	protected StartConvertPage() {
		super("StartConvert");
		this.setTitle("Convert");
		this.setDescription("Convert to Mayloon Application");
	}

	@Override
	public void createControl(Composite parent) {
		Composite composite = new Composite(parent, SWT.NONE);
		composite.setLayoutData(new GridData(GridData.FILL_BOTH));
		composite.setLayout(new GridLayout(1, false));
		Label infoLabel = new Label(composite, SWT.WRAP);
		infoLabel.setText("If you want to check necessary files and information before converting, press \" Next \" \n" +
				"or you can press \"Finish \" to convert directly \n");
		this.setErrorMessage(null);
		this.setMessage(null);
	    this.setPageComplete(true);
	    this.setControl(composite);
	}
	
	@Override
	 public boolean canFlipToNextPage() {
		return isPageComplete();
	}

}
