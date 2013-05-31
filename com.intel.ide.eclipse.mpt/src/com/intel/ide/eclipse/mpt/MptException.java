package com.intel.ide.eclipse.mpt;

public class MptException extends Exception{
	
	public static final String DEPLOY_MODE_ERROR  = "Can't get deploy mode successfully";
	public static final String MAYLOON_SDK_ERROR = "Can't get Mayloon SDK successfully";
	public static final String EXTERNAL_JS_LIB_PATH_ERROR = "Mayloon external javascript Library path is not set correctly.";
	public static final String J2S_LIB_PATH_ERROR = "Mayloon j2s Library path is not set correctly.";
	public static final String FRAMEWORK_PATH_ERROR = "Mayloon framework resource path is not set correctly.";
	public static final String APP_ENTRY_ERROR = "Mayloon application entry is not set correctly.";

	public MptException(){
		super();
	}
	
	public MptException(String message){
		super(message);
	}
	
	public MptException(String format, Object ...args){
		super(String.format(format, args));
	}
}
