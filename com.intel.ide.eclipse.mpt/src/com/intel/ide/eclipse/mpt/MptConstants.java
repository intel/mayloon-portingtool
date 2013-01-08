package com.intel.ide.eclipse.mpt;

public class MptConstants {
	public static final String WS_ROOT = "/"; //$NON-NLS-1$
	public static final String MAYLOON_OUTPUT_DIR = "mayloon_bin"; //$NON-NLS-1$
	public static final String MAYLOON_JAR_LIB = "mayloon.jar"; //$NON-NLS-1$
	public static final String MAYLOON_JAR_LIB_NAME = "Mayloon"; //$NON-NLS-1$
	// The container id of the android framework jar file android.jar
	public static final String ANDROID_CLASSPATH_ENTRY_ID = "com.android.ide.eclipse.adt.ANDROID_FRAMEWORK"; //$NON-NLS-1$
	// MAYLOON Sdk property file name
	public static final String MAYLOON_SDK_PROPERTY = "sdk-info.properties"; //$NON-NLS-1$
	// MAYLOON ant build properties and ant script xml
	public static final String MAYLOON_CUSTOM_PROPERTIES = "mayloon.custom.properties"; //$NON-NLS-1$
	public static final String MAYLOON_CUSTOM_PROPERTIES_TEMPLATE = "mayloon.custom.properties.template"; //$NON-NLS-1$
	public static final String MAYLOON_BUILD_PROPERTIES = "mayloon.build.properties"; //$NON-NLS-1$
	public static final String MAYLOON_BUILD_PROPERTIES_TEMPLATE = "mayloon.build.properties.template"; //$NON-NLS-1$
	public static final String MAYLOON_BUILD_XML = "build.xml"; //$NON-NLS-1$
	// default property file in an Android project, we will get target api level from here
	public static final String ANDROID_PROJECT_PROPERTIES = "project.properties"; //$NON-NLS-1$
	// the target property name in default.properties
	public static final String ANDROID_DEFAULT_PROPERTY_TARGET = "target"; //$NON-NLS-1$
	// Android manifest file in an Android project, we will get the minimal sdk version required by this project 
	public static final String ANDROID_MANIFEST_FILE = "AndroidManifest.xml"; //$NON-NLS-1$
	// Android string values file location in project
	public static final String ANDROID_VALUES_STRINGS = "res/values/strings.xml";//$NON-NLS-1$
    // Namespace for the android resource XML
    public static final String ANDROID_NS_RESOURCES = "http://schemas.android.com/apk/res/android"; //$NON-NLS-1$
    
    // MAYLOON Sdk error marker, to be used when we can't find MAYLOON sdk.
    public static final String MARKER_SDK = MptPlugin.PLUGIN_ID + ".sdkProblem"; //$NON-NLS-1$
    // MAYLOON builder error marker, to be used when MAYLOON build hit problems
    public static final String MARKER_BUILDER = MptPlugin.PLUGIN_ID + ".buildProblem"; //$NON-NLS-1$
    // MAYLOON builder error marker, to be used when MAYLOON migrate hit problems
    public static final String MARKER_MIGRATE = MptPlugin.PLUGIN_ID + ".migrateProblem"; //$NON-NLS-1$
    
    // Tag for general message in console
    public static final String GENERAL_TAG = "General";
    // Tag for convert message in console
    public static final String CONVERT_TAG = "Convert";
    // Tag for build message in console
    public static final String BUILD_TAG = "Build";
    
}
