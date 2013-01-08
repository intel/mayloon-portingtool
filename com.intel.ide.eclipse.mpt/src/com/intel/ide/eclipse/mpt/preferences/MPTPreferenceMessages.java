package com.intel.ide.eclipse.mpt.preferences;

import org.eclipse.osgi.util.NLS;

public class MPTPreferenceMessages extends NLS {
	private static final String BUNDLE_NAME = "com.intel.ide.eclipse.mpt.preferences.messages"; //$NON-NLS-1$
	public static String Mayloon_Preference_Page_Description;
	public static String Can_Not_Find_File_In_SDK;
	
	static {
		NLS.initializeMessages(BUNDLE_NAME, MPTPreferenceMessages.class);
	}
	
	private MPTPreferenceMessages() {
	}
}
