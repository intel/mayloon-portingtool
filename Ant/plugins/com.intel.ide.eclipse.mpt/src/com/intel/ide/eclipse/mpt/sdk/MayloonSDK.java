package com.intel.ide.eclipse.mpt.sdk;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

import com.intel.ide.eclipse.mpt.MayloonVersion;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptMessages;
import com.intel.ide.eclipse.mpt.MptPlugin;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.preferences.PreferenceInitializer;

public class MayloonSDK {
	private static final String LOG_TAG = "MayloonSDK";
	
	/**
	 * Return Mayloon SDK location. If Mayloon SDK is not configured, null
	 * will be returned.
	 * @return String
	 */
	public static String getSdkLocation() {
		return PreferenceInitializer.getPreference() == null ? 
				null : PreferenceInitializer.getPreference().getOsSdkFolder();
	}
	
	/**
	 * Return true if Mayloon SDK location is set, otherwise return false and
	 * display warning message in UI as appropriately
	 * @param showWarnUI
	 * @return boolean
	 */
	public static boolean isSdkLocationSet(boolean showWarnUI) {
    	String location = getSdkLocation();
    	if (location==null || location.isEmpty()) {
    		if (showWarnUI) {
        		MptPlugin.displayWarning(MptMessages.Not_found_Mayloon_SDK_Title, 
        				                 MptMessages.Not_found_Mayloon_SDK_Message);
    		}
    		return false;
    	}
    	return true;
	}
	
	/**
	 * Return Mayloon SDK version
	 * @return MayloonVersion
	 */
	public static MayloonVersion getSdkVersion() {
    	String location = getSdkLocation();
    	if (location==null || location.isEmpty()) {
    		return null;
    	}
    	
    	FileInputStream stream = null;
    	MayloonVersion version = null;
    	try {
	    	Properties p = new Properties();
	    	p.load(stream = new FileInputStream(new File(location, MptConstants.MAYLOON_SDK_PROPERTY)));
	    	version = new MayloonVersion(p);
    	} catch (FileNotFoundException e) {
    		MptPluginConsole.error(LOG_TAG, MptMessages.Not_found_Mayloon_SDK_Version_File_Message, MptConstants.MAYLOON_SDK_PROPERTY);
    	} catch (IOException e) {
    		MptPluginConsole.error(LOG_TAG, "Could not load Mayloon SDK version due to cause {%1$s}", e.getMessage());
    	} finally {
    		if(stream != null) {
    			try {
					stream.close();
				} catch (IOException e) {
				}
    		}
    	}
    	
    	return version;
	}
}
