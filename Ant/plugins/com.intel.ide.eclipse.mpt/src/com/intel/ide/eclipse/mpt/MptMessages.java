package com.intel.ide.eclipse.mpt;

import org.eclipse.osgi.util.NLS;

public class MptMessages extends NLS {
	private static final String BUNDLE_NAME = "com.intel.ide.eclipse.mpt.messages"; //$NON-NLS-1$
	public static String Mayloon_Console_Name;
	public static String Console_Date_Tag;
	public static String Console_Data_Project_Tag;
	public static String Not_found_Mayloon_SDK_Title;
	public static String Not_found_Mayloon_SDK_Message;
	public static String Not_found_Mayloon_SDK_Version_File_Message;
	public static String Not_found_Mayloon_External_File_Message;
	
	static {
		NLS.initializeMessages(BUNDLE_NAME, MptMessages.class);
	}
	
	private MptMessages() {
	}
}
