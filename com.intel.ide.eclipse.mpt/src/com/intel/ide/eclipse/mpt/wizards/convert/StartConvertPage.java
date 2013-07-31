package com.intel.ide.eclipse.mpt.wizards.convert;

import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;

public class StartConvertPage extends WizardPage {

	protected StartConvertPage() {
		super("StartConvert");
		this.setTitle("Convert");
		this.setDescription("Convert to MayLoon Application");
	}

	@Override
	public void createControl(Composite parent) {
		Composite composite = new Composite(parent, SWT.NONE);
		composite.setLayoutData(new GridData(GridData.FILL_BOTH));
		composite.setLayout(new GridLayout(1, false));
		Label infoLabel = new Label(composite, SWT.WRAP);
		infoLabel.setText("Press \"Next\" to check necessary files and information.");
		this.setErrorMessage(null);
		this.setMessage(null);
	    this.setPageComplete(true);
	    this.setControl(composite);
	    new Label(composite, SWT.NONE);

		final Button btnEnablePartialConversion = new Button(composite,
				SWT.CHECK);
		btnEnablePartialConversion.setToolTipText("Enable partial conversion if you want to generate stubs for JNI method declarations and APIs not supported so far.");
		final ConvertWizards host = (ConvertWizards) this.getWizard();

		btnEnablePartialConversion.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				host.enablePartialConversion(btnEnablePartialConversion
						.getSelection());
			}
		});

		btnEnablePartialConversion.setText("Enable partial conversion");
		host.enablePartialConversion(btnEnablePartialConversion.getSelection());
	}
	
	@Override
	public boolean canFlipToNextPage() {
		return isPageComplete();
	}

}
