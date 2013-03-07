package com.intel.ide.eclipse.mpt.preferences;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.eclipse.jface.preference.*;
import org.eclipse.jface.resource.JFaceResources;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.ui.IWorkbenchPreferencePage;
import org.eclipse.ui.IWorkbench;
import com.intel.ide.eclipse.mpt.MayloonVersion;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPlugin;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

/**
 * This class represents a preference page that
 * is contributed to the Preferences dialog. By 
 * subclassing <samp>FieldEditorPreferencePage</samp>, we
 * can use the field support built into JFace that allows
 * us to create a page that is small and knows how to 
 * save, restore and apply itself.
 * <p>
 * This page is used to modify preferences only. They
 * are stored in the preference store that belongs to
 * the main plug-in class. That way, preferences can
 * be accessed directly via the preference store.
 */

public class MayloonSDKPreferencePage
	extends FieldEditorPreferencePage
	implements IWorkbenchPreferencePage {
	
	private MayloonSDKDirectoryFieldEditor mDiretoryField;

	public MayloonSDKPreferencePage() {
		super(GRID);
		setPreferenceStore(MptPlugin.getDefault().getPreferenceStore());
		setDescription(MPTPreferenceMessages.Mayloon_Preference_Page_Description);
	}
	
	/**
	 * Creates the field editors. Field editors are abstractions of
	 * the common GUI blocks needed to manipulate various types
	 * of preferences. Each field editor knows how to save and
	 * restore itself.
	 */
	public void createFieldEditors() {
		mDiretoryField = new MayloonSDKDirectoryFieldEditor(PreferenceInitializer.PREFS_SDK_DIR, "SDK Location:", getFieldEditorParent()); //$NON-NLS-1$
		addField(mDiretoryField);
	}

	/* (non-Javadoc)
	 * @see org.eclipse.ui.IWorkbenchPreferencePage#init(org.eclipse.ui.IWorkbench)
	 */
	public void init(IWorkbench workbench) {
	}
	
	@Override
	public void dispose() {
		super.dispose();
		
		if (mDiretoryField != null) {
			mDiretoryField.dispose();
			mDiretoryField = null;
		}
	}
	
    /**
     * custom version of DirectoryFieldEditor which validates that the directory really contains an Kona SDK
     */
	private class MayloonSDKDirectoryFieldEditor extends DirectoryFieldEditor {
		protected Label label;
		
		public MayloonSDKDirectoryFieldEditor(String name, String labelText, Composite parent) {
			super(name, labelText, parent);
			setEmptyStringAllowed(false);
		}
		
		@Override
		protected void doFillIntoGrid(Composite parent, int numColumns) {
			setValidateStrategy(VALIDATE_ON_KEY_STROKE);
			super.doFillIntoGrid(parent, numColumns);
			label = new Label(parent, SWT.NONE);
			GridData gd = new GridData(GridData.FILL_HORIZONTAL);
            gd.horizontalSpan = numColumns;
            label.setLayoutData(gd);
		}
		
		/**
		 * check whether the text input contains a valid directory
		 * 
		 * @ return True if the apply/ok button should be enabled in the preference panel
		 */
		@Override
		protected boolean doCheckState() {
			this.label.setText("");
			if (!super.doCheckState()) {
				setErrorMessage(JFaceResources.getString("DirectoryFieldEditor.errorMessage")); //$NON-NLS-1$
				return false;
			}
			return checkSDKValid(getTextControl().getText().trim());
		}
		
		// helper function to check the diretory has valid Mayloon SDK layout
		private boolean checkSDKValid(String sdkLocation) {
			
			// Extractor Mayloon Runtime resource
			String filePath = MayloonSDK.getSdkLocation();
			String fileName = MptConstants.MAYLOON_RUNTIME_ZIP;
			ProjectUtil.fileExtractor(filePath, fileName, filePath);
			
			File mayloonZipLib = new File(sdkLocation, MptConstants.MAYLOON_ZIP);
			if (!mayloonZipLib.isFile()) {
				setErrorMessage(String.format(MPTPreferenceMessages.Can_Not_Find_File_In_SDK, MptConstants.MAYLOON_ZIP, sdkLocation));
				return false;
			}
			// unzip mayloon.zip
			ProjectUtil.fileExtractor(filePath, fileName, filePath);
			
			File sdkProperty = new File(sdkLocation, MptConstants.MAYLOON_SDK_PROPERTY);
			if(!sdkProperty.isFile()) {
				setErrorMessage(String.format(MPTPreferenceMessages.Can_Not_Find_File_In_SDK, MptConstants.MAYLOON_SDK_PROPERTY, sdkLocation));
				return false;
			}
			FileInputStream stream = null;
			try {
				Properties prop = new Properties();
				prop.load(stream = new FileInputStream(sdkProperty));
				MayloonVersion version = new MayloonVersion(prop);
				label.setText(String.format("SDK version is %1$s. Support API Level %2$s", 
	                          version.getSdkVersion(), 
	                          version.getAndroidApiLevel()));
			} catch (IOException e) {
			} finally {
				if(stream != null) {
					try {
						stream.close();
					} catch (IOException e) {
					}
				}
			}
			return true;
		}
	}

}