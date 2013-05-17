package com.intel.ide.eclipse.mpt.preferences;

import java.io.File;

import org.eclipse.core.runtime.preferences.AbstractPreferenceInitializer;
import org.eclipse.jface.preference.IPreferenceStore;
import com.intel.ide.eclipse.mpt.MptPlugin;
import com.intel.ide.eclipse.mpt.MptPluginConsole;

/**
 * Class used to initialize default preference values.
 */
public class PreferenceInitializer extends AbstractPreferenceInitializer {
	public final static String PREFS_SDK_DIR = MptPlugin.PLUGIN_ID + ".sdk"; //$NON-NLS-1$
	public final static String PARTIAL_CONVERSION_MODE = MPTPreferenceMessages.Mayloon_Partial_Conversion_Mode;

	// singleton instance
	private final static PreferenceInitializer sPreference = new PreferenceInitializer();

	// default store which is provided by eclipse
	private IPreferenceStore mPreferenceStore;

	public static void init(IPreferenceStore preferenceStore) {
		sPreference.mPreferenceStore = preferenceStore;
	}

	public static PreferenceInitializer getPreference() {
		return sPreference;
	}
	
	public String getOsSdkFolder() {
		String sdkLocation = null;
		if(mPreferenceStore != null) {
			sdkLocation = mPreferenceStore.getString(PREFS_SDK_DIR);
		}
		// make sure it ends with a file separator
		if (sdkLocation != null && sdkLocation.length() > 0 && sdkLocation.endsWith(File.separator) == false) {
			sdkLocation = sdkLocation + File.separator;
		}
		return sdkLocation;
	}
	
	public Boolean getPartialConversionMode(){
		return mPreferenceStore.getBoolean(PARTIAL_CONVERSION_MODE);
	}
	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.core.runtime.preferences.AbstractPreferenceInitializer#
	 * initializeDefaultPreferences()
	 */
	public void initializeDefaultPreferences() {
	}

}
