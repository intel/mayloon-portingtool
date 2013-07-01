package com.intel.ide.eclipse.mpt.project;

import org.eclipse.osgi.util.NLS;

public class MayloonProjectMessages extends NLS {
	private static final String BUNDLE_NAME = "com.intel.ide.eclipse.mpt.project.messages"; //$NON-NLS-1$
	public static String Can_Not_Get_Mayloon_SDK_Version;
	public static String Android_MinSdkVersion_Higher_Than_ApiLevel_Message;
	public static String Version_Check_Title;
	public static String Android_MinSdkVersion_Higher_Message;
	public static String Not_found_Mayloon_SDK_Message;
	public static String Mayloon_Framework_Library_Title;
	public static String Mayloon_Framework_Library_Description;
	public static String WARNING_EXISTED_MESSAGE;
	public static String NO_ERROR_AND_WARNING_MESSAGE;
	static {
		NLS.initializeMessages(BUNDLE_NAME, MayloonProjectMessages.class);
	}
	
	private MayloonProjectMessages() {
	}
	
}
