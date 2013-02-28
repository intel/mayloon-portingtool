package com.intel.ide.eclipse.mpt.wizards.export;

import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.events.VerifyEvent;
import org.eclipse.swt.events.VerifyListener;
import org.eclipse.swt.widgets.Text;

/**
 * Abstract export wizard page
 */
public abstract class ExportWizardPage extends WizardPage {
	/**
	 * Export wizard
	 */
	protected ExportWizard fWizard;
	/**
	 * Update indicator on visible
	 */
	protected boolean fUpdateOnVisible;
	/**
	 * Update in progress indicator
	 */
	protected boolean fUpdateInProgress;
	/**
	 * Password verifier
	 */
    protected static final VerifyListener sPasswordVerifier = new VerifyListener() {
        public void verifyText(VerifyEvent e) {
            // verify the characters are valid for password.
            int len = e.text.length();
            // first limit to 127 characters max
            if (len + ((Text)e.getSource()).getText().length() > 127) {
                e.doit = false;
                return;
            }
            // now only take non control characters
            for (int i = 0 ; i < len ; i++) {
                if (e.text.charAt(i) < 32) {
                    e.doit = false;
                    return;
                }
            }
        }
    };
    /**
     * Constructor
     * @param wizard
     * @param pageName
     */
	public ExportWizardPage(ExportWizard wizard, String pageName) {
		super(pageName);
		this.fWizard = wizard;
		this.fUpdateOnVisible = true;
		this.fUpdateInProgress = false;
	}
	@Override
	public void setVisible(boolean visible) {
		if(visible){
			onVisible();
		}
		super.setVisible(visible);
	}
	/**
	 * Visible handler
	 */
	protected void onVisible(){
		//do nothing, subclass to implement
	}
	/**
	 * Update event handler
	 */
	public void onUpdateEvent(int event){
		//do nothing, subclass to implement
	}
}
