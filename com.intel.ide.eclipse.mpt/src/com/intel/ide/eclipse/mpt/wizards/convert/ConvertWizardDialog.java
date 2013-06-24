package com.intel.ide.eclipse.mpt.wizards.convert;

import org.eclipse.jface.wizard.IWizard;
import org.eclipse.jface.wizard.WizardDialog;
import org.eclipse.swt.widgets.Shell;

public class ConvertWizardDialog extends WizardDialog {

	public ConvertWizardDialog(Shell parentShell, IWizard newWizard) {
		super(parentShell, newWizard);
	}
	
	public void enableCancel(boolean bEnable){
		this.getButton(CANCEL).setEnabled(bEnable);
	}
}
