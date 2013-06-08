package com.intel.ide.eclipse.mpt;

public class MptConstants {
	public static final String WS_ROOT = "/"; //$NON-NLS-1$
	public static final String MAYLOON_OUTPUT_DIR = "mayloon_bin"; //$NON-NLS-1$
	public static final String MAYLOON_APP_RES_DIR = "/apps/"; //$NON-NLS-1$
	public static final String MAYLOON_EXTERNAL_JS_DIR = "external"; //$NON-NLS-1$
	public static final String MAYLOON_NJS_JS_DIR = "njs"; //$NON-NLS-1$
	public static final String MAYLOON_SRC_DIR = "src"; //$NON-NLS-1$
	public static final String MAYLOON_FRAMEWORK_JS_DIR = "bin"; //$NON-NLS-1$
	public static final String MAYLOON_FRAMEWORK_RES_DIR = "res_sys"; //$NON-NLS-1$	
	public static final String MAYLOON_JAR_LIB = "mayloon.jar"; //$NON-NLS-1$
	public static final String MAYLOON_JRE_LIB = "mayloon_jre.jar"; //$NON-NLS-1$
	public static final String MAYLOON_JAR_LIB_NAME = "Mayloon"; //$NON-NLS-1$
	public static final String MAYLOON_JRE_LIB_NAME = "MayloonJRE"; //$NON-NLS-1$
	public static final String MAYLOON_DEPLOY_MODE = "mayloon.deploy.mode";
	public static final String J2S_DEPLOY_MODE_BROWSER = "browser";
	public static final String J2S_DEPLOY_MODE_TIZEN = "tizen";
	public static final String TIZEN_PROJECT_FILE = ".project";
	public static final String TIZEN_CONFIGURATION_FILE = "config.xml";
	public static final String TIZEN_NAME_ELEMENT_NAME = "name";
	public static final String TIZEN_ICON_ELEMENT_NAME = "icon";
	public static final String TIZEN_CONTENT_ELEMENT_NAME = "content";
	public static final String TIZEN_ID_ATTRIBUTE_NAMR = "id";
	public static final String TIZEN_SRC_ATTRIBUTE_NAMR = "src";
	public static final String TIZEN_APPLICATION_ELEMENT_NAME = "tizen:application";
	public static final String TIZEN_WIDGET_ID_DOMAIN = "http://yourdomain/";
	public static final String MAYLOON_J2SLIB = "j2slib";
	
	public static final String MAYLOON_START_ENTRY_FILE = ".html";
	public static final String MAYLOON_TIZEN_ICON = "Icon.png";
	public static final String MAYLOON_START_ENTRY_JAVA_FILE = "android/core/Start.java";
	public static final String MAYLOON_START_ENTRY_BASE = "pm.installPackage(\"/**/\");";
	public static final String MAYLOON_START_ENTRY_MATCH = "/\\*\\*/";
	// The container id of the android framework jar file android.jar
	public static final String ANDROID_CLASSPATH_ENTRY_ID = "com.android.ide.eclipse.adt.ANDROID_FRAMEWORK"; //$NON-NLS-1$
	
	public static final String ANDROID_APK_EXTENSION = ".apk";
	public static final String ZIP_FILE_EXTENSION = ".zip";
	public static final String CLASS_FILE_EXTENSION = ".class";
	public static final String JAVA_FILE_EXTENSION = ".java";
	
	// The container id of the android develop tools
	public static final String ADT_CLASSPATH_ENTRY_ID = "com.android.ide.eclipse.adt.LIBRARIES"; //$NON-NLS-1$
	// The container id of the JRE
	public static final String JRE_CLASSPATH_ENTRY_ID = "org.eclipse.jdt.launching.JRE_CONTAINER"; //$NON-NLS-1$
	// The container id of the Mayloon Native JRE
	public static final String MAYLOON_JRE_CLASSPATH_ENTRY_ID = "com.intel.ide.eclipse.mpt.JRE_CONTAINER"; //$NON-NLS-1$
	// MAYLOON Sdk property file name
	public static final String MAYLOON_SDK_PROPERTY = "sdk-info.properties"; //$NON-NLS-1$
	//MAYLOON stub Constants
	public static final String MAYLOON_STUB_ANNOTATION_PATH = "com.intel.mpt.annotation.MayloonStubAnnotation";
	public static final String MAYLOON_STUB_ANNOTATION_FILE = "MayloonStubAnnotation.java";
	public static final String MAYLOON_MISSCLASS_TEMPLATE_PACKAGE = "android.mayloon.template";
	public static final String MAYLOON_MISSCLASS_TEMPLATE_NAME = "MissClassTemplate";
	public static final String MAYLOON_MISSCLASS_TEMPLATE_FILE = "MissClassTemplate.java";
	public static final String MAYLOON_MISSCLASS_TEMPLATE_PACKAGE_TARGET = "package ";
	
	// MAYLOON External Resource property file name
	public static final String MAYLOON_EXTERNAL_PROPERTY = "external-info.properties"; //$NON-NLS-1$
	public static final String MAYLOON_RUNTIME_PACKAGE = "package_name.json"; //$NON-NLS-1$
	public static final String ANDROID_RUNTIME_STUB_CLASS = "mayloon_missed_class.json";
	public static final String MAYLOON_JS_FRAMEWORK_PATH = "Mayloon.Framework.Path";
	public static final String MAYLOON_JS_LIBRARY_PATH = "Mayloon.Framework.External.Path";
	public static final String MAYLOON_J2S_LIBRARY = "j2slib";
	public static final String MAYLOON_RUNTIME_ZIP = "mayloon.zip";
	public static final String MAYLOON_FRAMEWORK_RES = "Mayloon.Framework.RES.Path";
	public static final String MAYLOON_APPLICATION_ENTRY = "Mayloon.Application.Entry";
	// MAYLOON ant build properties and ant script xml
	public static final String MAYLOON_CUSTOM_PROPERTIES = "mayloon.custom.properties"; //$NON-NLS-1$
	public static final String MAYLOON_CUSTOM_PROPERTIES_TEMPLATE = "mayloon.custom.properties.template"; //$NON-NLS-1$
	public static final String MAYLOON_BUILD_PROPERTIES = "mayloon.build.properties"; //$NON-NLS-1$
	public static final String MAYLOON_BUILD_PROPERTIES_TEMPLATE = "mayloon.build.properties.template"; //$NON-NLS-1$
	public static final String MAYLOON_BUILD_XML = "build.xml"; //$NON-NLS-1$
	public static final String PROPERTY_CURRENT_PROJECT_EXPORT_DESTINATION = "current.project.export.destination";
	// default property file in an Android project, we will get target api level from here
	public static final String ANDROID_DEFAULT_PROPERTIES = "project.properties"; //$NON-NLS-1$

	// the target property name in default.properties
	public static final String ANDROID_DEFAULT_PROPERTY_TARGET = "target"; //$NON-NLS-1$
	// Android manifest file in an Android project, we will get the minimal sdk version required by this project 
	public static final String ANDROID_MANIFEST_FILE = "AndroidManifest.xml"; //$NON-NLS-1$
	// Android string values file location in project
	public static final String ANDROID_VALUES_STRINGS = "res/values/strings.xml";//$NON-NLS-1$
    // Namespace for the android resource XML
    public static final String ANDROID_NS_RESOURCES = "http://schemas.android.com/apk/res/android"; //$NON-NLS-1$
    // Android output directory
    public static final String ANDROID_OUTPUT_DIR = "bin";
    
    public static final String MAYLOON_J2S_BUILDER = "net.sf.j2s.core.java2scriptbuilder";
    
    public static final String MAYLOON_PROJECT_SETTING = ".j2s"; //".mayloon"; In net.sf.j2s.core, .j2s is used to check whether enable java2scriptbuilder when building.
    public static final String J2S_RESROUCE_LIST = "j2s.resources.list";
    
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
    // Tag for partial conversion in console
    public static final String PARTIAL_CONVERSION_TAG = "Partial Conversion";
    // Tag for build message in console
    public static final String BUILD_TAG = "Build";
    // Tag for run message in console
    public static final String RUN_TAG = "Run";
    // Tag for export message in console
    public static final String EXPORT_TAG = "Export";
    
}
