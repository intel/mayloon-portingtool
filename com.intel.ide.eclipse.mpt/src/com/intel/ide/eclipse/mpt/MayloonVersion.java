package com.intel.ide.eclipse.mpt;

import java.util.Properties;

/**
 * Class to get Kona version from a properties 
 */
public class MayloonVersion {
	private static final String PROP_SDK_VERSION = "Sdk.Version";
	private static final String PROP_ANDROID_APILEVEL = "Android.ApiLevel";
	private static final String PROP_ANDROID_VERSION = "Android.Version";
	private static final String PROP_MAYLOON_JRE_VERSION = "Mayloon.JRE.Version";
	
	private String mSdkVersion;
	private int mAndroidApiLevel;
	private String mAndroidVersion;
	private String mMayloonJREVersion;
	
	public MayloonVersion(Properties properties) {
		mSdkVersion = properties.getProperty(PROP_SDK_VERSION, null);
		String androidApiLevel = properties.getProperty(PROP_ANDROID_APILEVEL, null);
		if (androidApiLevel != null) {
			mAndroidApiLevel = Integer.parseInt(androidApiLevel);
		}
		mAndroidVersion = properties.getProperty(PROP_ANDROID_VERSION, null);
		mMayloonJREVersion = properties.getProperty(PROP_MAYLOON_JRE_VERSION, null);
	}
	
	/**
	 * Return the Mayloon Sdk version
	 */
	public String getSdkVersion() {
		return mSdkVersion;
	}
	
	/**
	 * Return the Android Api level our sdk is based on 
	 */
	public int getAndroidApiLevel() {
		return mAndroidApiLevel;
	}
	
	/**
	 * Return the Android Version our sdk is based on
	 */
	public String getAndroidVersion() {
		return mAndroidVersion;
	}
	
	/**
	 * Return the Mayloon JRE Version
	 */
	public String getMayloonJREVersion() {
		return mMayloonJREVersion;
	}
}
