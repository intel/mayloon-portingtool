Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (null, "net.sf.j2s.ui.launching.J2SLaunchingUtil", ["java.io.ByteArrayInputStream", "$.ByteArrayOutputStream", "$.File", "$.FileFilter", "$.FileInputStream", "$.FileOutputStream", "java.lang.StringBuffer", "java.util.HashSet", "$.Properties", "net.sf.j2s.core.astvisitors.ASTTypeVisitor", "$.DependencyASTVisitor", "net.sf.j2s.core.hotspot.InnerHotspotServer", "net.sf.j2s.ui.Java2ScriptUIPlugin", "net.sf.j2s.ui.classpath.CompositeResources", "net.sf.j2s.ui.launching.ArgsUtil", "$.J2SApplicationRunnable", "$.J2SCyclicProjectUtils", "$.JavaRuntime", "net.sf.j2s.ui.property.FileUtil", "net.sf.j2s.ui.resources.ExternalResources", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.core.runtime.Path", "$.Platform", "org.eclipse.core.variables.VariablesPlugin", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.internal.corext.util.JavaModelUtil", "org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants", "org.eclipse.jface.dialogs.MessageDialog", "$wt.widgets.Display"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.launching, "J2SLaunchingUtil");
c$.launchingJ2SUnit = Clazz.defineMethod (c$, "launchingJ2SUnit", 
function (configuration, mode, extensionName) {
var isJUnit = true;
var mainType = net.sf.j2s.ui.launching.J2SLaunchingUtil.getMainType (configuration);
if (mainType == null) {
return ;
}var workingDir = net.sf.j2s.ui.launching.J2SLaunchingUtil.getWorkingDirectory (configuration);
if (workingDir != null) {
var buf =  new StringBuffer ();
var useXHTMLHeader = configuration.getAttribute ("use.xhtml.header", true);
var store = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getPreferenceStore ();
var preferred = store.getBoolean ("with-mozilla-addon-compatiable");
var addonCompatiable = configuration.getAttribute ("j2s.mozilla.addon.compatiable", preferred);
var allResources = net.sf.j2s.ui.resources.ExternalResources.getAllResources ();
var j2sLibPath = null;
if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
if ((allResources[0][0]).startsWith ("|")) {
allResources[0][0] = net.sf.j2s.ui.property.FileUtil.toRelativePath (allResources[0][0].substring (1), workingDir.getAbsolutePath ());
;}j2sLibPath = allResources[0][0].substring (0, allResources[0][0].lastIndexOf ("/") + 1);
} else {
j2sLibPath = "../net.sf.j2s.lib/j2slib/";
}var isUseGlobalURL = configuration.getAttribute ("use.global.alaa.url", false);
var gj2sLibPath = j2sLibPath;
if (isUseGlobalURL) {
gj2sLibPath = configuration.getAttribute ("global.j2slib.url", j2sLibPath);
if (gj2sLibPath.length == 0) {
gj2sLibPath = "./";
}if (!gj2sLibPath.endsWith ("/")) {
gj2sLibPath += "/";
}}var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
org.eclipse.jface.dialogs.MessageDialog.openError (null, "Project Error", "No Java2Script project is selected.");
return ;
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
org.eclipse.jface.dialogs.MessageDialog.openError (null, "Project Error", "The selected project is not a Java2Script project.");
return ;
}var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = "";
if (idx != -1) {
relativePath = path.substring (idx + 1);
}var grelativePath = relativePath;
if (isUseGlobalURL) {
grelativePath = configuration.getAttribute ("global.bin.url", relativePath);
if (grelativePath.length == 0) {
grelativePath = "./";
}if (!grelativePath.endsWith ("/")) {
grelativePath += "/";
}}var args = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, Clazz.castNullAs ("String"));
net.sf.j2s.ui.launching.J2SLaunchingUtil.generateJ2SHeaderHTML (buf, useXHTMLHeader, addonCompatiable, gj2sLibPath, mainType, workingDir, configuration);
var j2xStr = net.sf.j2s.ui.launching.J2SLaunchingUtil.generatePreJavaScript (buf, args, grelativePath, gj2sLibPath, isJUnit, mode, mainType, workingDir, configuration);
if (addonCompatiable) {
net.sf.j2s.ui.launching.J2SLaunchingUtil.generateFirefoxAddonPreJavaScript (buf, j2sLibPath, gj2sLibPath, grelativePath, isJUnit, mainType, workingDir, configuration);
buf.append ("\t\tClazzLoader.loadClass (\"junit.textui.TestRunner\", function () {\r\n");
buf.append ("\t\t\tClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
var mType = org.eclipse.jdt.internal.corext.util.JavaModelUtil.findTypeContainer (javaProject, mainType);
var isTestSuite = false;
if (mType != null) {
var suiteMethod = org.eclipse.jdt.internal.corext.util.JavaModelUtil.findMethod ("suite",  new Array (0), false, mType);
if (suiteMethod != null) {
var returnType = suiteMethod.getReturnType ();
if ("QTest;".equals (returnType) || "Qjunit.framework.Test;".equals (returnType)) {
isTestSuite = true;
}}}var mainTypeName =  new net.sf.j2s.core.astvisitors.ASTTypeVisitor ().assureQualifiedName (mainType);
if (isTestSuite) {
buf.append ("\t\t\t\tjunit.textui.TestRunner.run (" + mainTypeName + ".suite ());\r\n");
} else {
buf.append ("\t\t\t\tjunit.textui.TestRunner.run (" + mainTypeName + ");\r\n");
}buf.append ("\t\t\t});\r\n");
buf.append ("\t\t});\r\n");
buf.append ("\t}\r\n");
buf.append ("};\r\n");
net.sf.j2s.ui.launching.J2SLaunchingUtil.generateFirefoxAddonPostJavaScript (buf, j2sLibPath, gj2sLibPath, workingDir, configuration);
} else {
net.sf.j2s.ui.launching.J2SLaunchingUtil.generatePreLoadingJavaScript (buf, j2xStr, mainType, gj2sLibPath, isJUnit, grelativePath, workingDir, configuration);
buf.append ("ClazzLoader.loadClass (\"junit.textui.TestRunner\", function () {\r\n");
buf.append ("\tClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
var mType = org.eclipse.jdt.internal.corext.util.JavaModelUtil.findTypeContainer (javaProject, mainType);
var isTestSuite = false;
if (mType != null) {
var suiteMethod = org.eclipse.jdt.internal.corext.util.JavaModelUtil.findMethod ("suite",  new Array (0), false, mType);
if (suiteMethod != null) {
var returnType = suiteMethod.getReturnType ();
if ("QTest;".equals (returnType) || "Qjunit.framework.Test;".equals (returnType)) {
isTestSuite = true;
}}}var mainTypeName =  new net.sf.j2s.core.astvisitors.ASTTypeVisitor ().assureQualifiedName (mainType);
if (isTestSuite) {
buf.append ("\t\tjunit.textui.TestRunner.run (" + mainTypeName + ".suite ());\r\n");
} else {
buf.append ("\t\tjunit.textui.TestRunner.run (" + mainTypeName + ");\r\n");
}buf.append ("\t});\r\n");
buf.append ("});\r\n");
}net.sf.j2s.ui.launching.J2SLaunchingUtil.generatePostJavaScript (buf, configuration);
var url = net.sf.j2s.ui.launching.J2SLaunchingUtil.writeBufferToFile (buf, mainType, workingDir, extensionName);
$wt.widgets.Display.getDefault ().asyncExec ( new net.sf.j2s.ui.launching.J2SApplicationRunnable (configuration, url));
} else {
org.eclipse.jface.dialogs.MessageDialog.openError (null, "Project Error", "The selected J2S's working folder is not found.");
}}, "org.eclipse.debug.core.ILaunchConfiguration,~S,~S");
c$.launchingJ2SApp = Clazz.defineMethod (c$, "launchingJ2SApp", 
function (configuration, mode, extensionName) {
var isJUnit = false;
var mainType = net.sf.j2s.ui.launching.J2SLaunchingUtil.getMainType (configuration);
if (mainType == null) {
return ;
}var workingDir = net.sf.j2s.ui.launching.J2SLaunchingUtil.getWorkingDirectory (configuration);
if (workingDir != null) {
var buf =  new StringBuffer ();
var useXHTMLHeader = configuration.getAttribute ("use.xhtml.header", true);
var store = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getPreferenceStore ();
var preferred = store.getBoolean ("with-mozilla-addon-compatiable");
var addonCompatiable = configuration.getAttribute ("j2s.mozilla.addon.compatiable", preferred);
var allResources = net.sf.j2s.ui.resources.ExternalResources.getAllResources ();
var j2sLibPath = null;
if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
if ((allResources[0][0]).startsWith ("|")) {
allResources[0][0] = net.sf.j2s.ui.property.FileUtil.toRelativePath (allResources[0][0].substring (1), workingDir.getAbsolutePath ());
;}j2sLibPath = allResources[0][0].substring (0, allResources[0][0].lastIndexOf ("/") + 1);
} else {
j2sLibPath = "../net.sf.j2s.lib/j2slib/";
}var isUseGlobalURL = configuration.getAttribute ("use.global.alaa.url", false);
var gj2sLibPath = j2sLibPath;
if (isUseGlobalURL) {
gj2sLibPath = configuration.getAttribute ("global.j2slib.url", j2sLibPath);
if (gj2sLibPath.length == 0) {
gj2sLibPath = "./";
}if (!gj2sLibPath.endsWith ("/")) {
gj2sLibPath += "/";
}}var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
org.eclipse.jface.dialogs.MessageDialog.openError (null, "Project Error", "No Java2Script project is selected.");
return ;
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
org.eclipse.jface.dialogs.MessageDialog.openError (null, "Project Error", "The selected project is not a Java2Script project.");
return ;
}var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = "";
if (idx != -1) {
relativePath = path.substring (idx + 1);
}var grelativePath = relativePath;
if (isUseGlobalURL) {
grelativePath = configuration.getAttribute ("global.bin.url", relativePath);
if (grelativePath.length == 0) {
grelativePath = "./";
}if (!grelativePath.endsWith ("/")) {
grelativePath += "/";
}}var args = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, Clazz.castNullAs ("String"));
net.sf.j2s.ui.launching.J2SLaunchingUtil.generateJ2SHeaderHTML (buf, useXHTMLHeader, addonCompatiable, gj2sLibPath, mainType, workingDir, configuration);
var j2xStr = net.sf.j2s.ui.launching.J2SLaunchingUtil.generatePreJavaScript (buf, args, grelativePath, gj2sLibPath, isJUnit, mode, mainType, workingDir, configuration);
if (addonCompatiable) {
net.sf.j2s.ui.launching.J2SLaunchingUtil.generateFirefoxAddonPreJavaScript (buf, j2sLibPath, gj2sLibPath, grelativePath, isJUnit, mainType, workingDir, configuration);
buf.append ("\t\tClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
var mainTypeName =  new net.sf.j2s.core.astvisitors.ASTTypeVisitor ().assureQualifiedName (mainType);
buf.append ("\t\t\t" + mainTypeName + ".main(" + net.sf.j2s.ui.launching.ArgsUtil.wrapAsArgumentArray (args, true) + ");\r\n");
buf.append ("\t\t});\r\n");
buf.append ("\t}\r\n");
buf.append ("};\r\n");
net.sf.j2s.ui.launching.J2SLaunchingUtil.generateFirefoxAddonPostJavaScript (buf, j2sLibPath, gj2sLibPath, workingDir, configuration);
} else {
net.sf.j2s.ui.launching.J2SLaunchingUtil.generatePreLoadingJavaScript (buf, j2xStr, mainType, gj2sLibPath, isJUnit, grelativePath, workingDir, configuration);
buf.append ("ClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
var mainTypeName =  new net.sf.j2s.core.astvisitors.ASTTypeVisitor ().assureQualifiedName (mainType);
buf.append ("\t" + mainTypeName + ".main(" + net.sf.j2s.ui.launching.ArgsUtil.wrapAsArgumentArray (args, true) + ");\r\n");
buf.append ("});\r\n");
}net.sf.j2s.ui.launching.J2SLaunchingUtil.generatePostJavaScript (buf, configuration);
var url = net.sf.j2s.ui.launching.J2SLaunchingUtil.writeBufferToFile (buf, mainType, workingDir, extensionName);
$wt.widgets.Display.getDefault ().asyncExec ( new net.sf.j2s.ui.launching.J2SApplicationRunnable (configuration, url));
} else {
org.eclipse.jface.dialogs.MessageDialog.openError (null, "Project Error", "The selected J2S's working folder is not found.");
}}, "org.eclipse.debug.core.ILaunchConfiguration,~S,~S");
c$.writeBufferToFile = Clazz.defineMethod (c$, "writeBufferToFile", 
($fz = function (buf, mainType, workingDir, extensionName) {
var html = buf.toString ();
var rootPath = workingDir.getAbsolutePath ();
var file =  new java.io.File (rootPath, mainType + "." + extensionName);
net.sf.j2s.ui.launching.J2SLaunchingUtil.writeMainHTML (file, html);
var url = null;
try {
url = file.toURL ().toExternalForm ();
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return url;
}, $fz.isPrivate = true, $fz), "StringBuffer,~S,java.io.File,~S");
c$.generatePostJavaScript = Clazz.defineMethod (c$, "generatePostJavaScript", 
($fz = function (buf, configuration) {
buf.append ("</script>\r\n");
buf.append (configuration.getAttribute ("tail.body.html", ""));
buf.append ("</body>\r\n");
buf.append ("</html>");
}, $fz.isPrivate = true, $fz), "StringBuffer,org.eclipse.debug.core.ILaunchConfiguration");
c$.generatePreLoadingJavaScript = Clazz.defineMethod (c$, "generatePreLoadingJavaScript", 
($fz = function (buf, j2xStr, mainType, gj2sLibPath, isJUnit, grelativePath, workingDir, configuration) {
if (j2xStr.indexOf ("\"java\"") == -1) {
buf.append ("ClazzLoader.packageClasspath (\"java\", \"");
buf.append (gj2sLibPath);
buf.append ("\", true);\r\n");
}if (isJUnit && j2xStr.indexOf ("\"junit\"") == -1) {
buf.append ("ClazzLoader.packageClasspath (\"junit\", \"");
buf.append (gj2sLibPath);
buf.append ("\", true);\r\n");
}buf.append (j2xStr);
buf.append ("ClazzLoader.setPrimaryFolder (\"");
buf.append (grelativePath);
buf.append ("\");\r\n");
net.sf.j2s.ui.launching.J2SCyclicProjectUtils.emptyTracks ();
buf.append (net.sf.j2s.ui.launching.J2SLaunchingUtil.generateClasspathIgnoredClasses (configuration, mainType, workingDir, ""));
net.sf.j2s.ui.launching.J2SCyclicProjectUtils.emptyTracks ();
buf.append (net.sf.j2s.ui.launching.J2SLaunchingUtil.generateClasspathExistedClasses (configuration, mainType, workingDir, ""));
}, $fz.isPrivate = true, $fz), "StringBuffer,~S,~S,~S,~B,~S,java.io.File,org.eclipse.debug.core.ILaunchConfiguration");
c$.generateFirefoxAddonPostJavaScript = Clazz.defineMethod (c$, "generateFirefoxAddonPostJavaScript", 
($fz = function (buf, j2sLibPath, gj2sLibPath, workingDir, configuration) {
var addonCompatiableRawJS = configuration.getAttribute ("j2s.mozilla.addon.compatiable.raw.js", true);
if (!addonCompatiableRawJS) {
buf.append ("</script>\r\n<script type=\"text/javascript\" src=\"" + gj2sLibPath + "mozilla.addon.js\">");
} else {
buf.append ("\r\n");
var folder =  new java.io.File (workingDir.getAbsolutePath (), j2sLibPath);
var file =  new java.io.File (folder, "mozilla.addon.js");
if (file.exists ()) {
try {
var addonJS = net.sf.j2s.ui.launching.J2SLaunchingUtil.readAFile ( new java.io.FileInputStream (file));
if (addonJS != null) {
buf.append (addonJS);
}} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}}, $fz.isPrivate = true, $fz), "StringBuffer,~S,~S,java.io.File,org.eclipse.debug.core.ILaunchConfiguration");
c$.generateFirefoxAddonPreJavaScript = Clazz.defineMethod (c$, "generateFirefoxAddonPreJavaScript", 
($fz = function (buf, j2sLibPath, gj2sLibPath, grelativePath, isJUnit, mainType, workingDir, configuration) {
buf.append ("window[\"j2s.lib\"] = {\r\n");
var j2slibFolder =  new java.io.File (workingDir.getAbsolutePath (), j2sLibPath);
var j2sRelease =  new java.io.File (j2slibFolder, ".release");
var release =  new java.util.Properties ();
var alias = "2.0.0";
var version = "20081203";
release.put ("alias", alias);
release.put ("version", version);
if (j2sRelease.exists ()) {
try {
release.load ( new java.io.FileInputStream (j2sRelease));
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
alias = release.getProperty ("alias");
version = release.getProperty ("version");
}var kPath = gj2sLibPath.trim ();
if ((kPath.charAt (kPath.length - 1)).charCodeAt (0) == ('/').charCodeAt (0)) {
kPath = kPath.substring (0, kPath.length - 1);
}var j2sIdx = kPath.lastIndexOf ("/");
if (j2sIdx != -1) {
if (!"http://archive.java2script.org/".equals (kPath.substring (0, j2sIdx + 1))) {
buf.append ("\t/*base : \"http://archive.java2script.org/\",*/\r\n");
}buf.append ("\tbase : \"" + kPath.substring (0, j2sIdx + 1) + "\",\r\n");
if (!alias.equals (kPath.substring (j2sIdx + 1))) {
buf.append ("\t/*alias : \"" + alias + "\",*/\r\n");
}buf.append ("\talias : \"" + kPath.substring (j2sIdx + 1) + "\",\r\n");
} else {
buf.append ("\tbase : \"http://archive.java2script.org/\",\r\n");
buf.append ("\talias : \"" + alias + "\",\r\n");
}buf.append ("\tversion : \"" + version + "\",\r\n");
buf.append ("\t/*forward : true,*/\r\n");
buf.append ("\tmode : \"dailybuild\",\r\n");
buf.append ("\tonload : function () {\r\n");
var j2xStr = net.sf.j2s.ui.launching.J2SLaunchingUtil.generateClasspathJ2X (configuration, "j2sBase", workingDir);
if (j2xStr != null && j2xStr.length != 0) {
buf.append ("\t\tvar j2sBase = window[\"j2s.lib\"].j2sBase;\r\n");
if (j2xStr.indexOf ("\"java\"") == -1) {
buf.append ("\t\tClazzLoader.packageClasspath (\"java\", j2sBase, true);\r\n");
}if (isJUnit && j2xStr.indexOf ("\"junit\"") == -1) {
buf.append ("\t\tClazzLoader.packageClasspath (\"junit\", j2sBase, true);\r\n");
}buf.append ("\t\t");
buf.append (j2xStr.replaceAll ("\r\n", "\r\n\t\t").trim ());
buf.append ("\r\n");
}buf.append ("\t\tClazzLoader.setPrimaryFolder (\"");
buf.append (grelativePath);
buf.append ("\");\r\n");
net.sf.j2s.ui.launching.J2SCyclicProjectUtils.emptyTracks ();
buf.append (net.sf.j2s.ui.launching.J2SLaunchingUtil.generateClasspathIgnoredClasses (configuration, mainType, workingDir, "\t\t"));
net.sf.j2s.ui.launching.J2SCyclicProjectUtils.emptyTracks ();
buf.append (net.sf.j2s.ui.launching.J2SLaunchingUtil.generateClasspathExistedClasses (configuration, mainType, workingDir, "\t\t"));
}, $fz.isPrivate = true, $fz), "StringBuffer,~S,~S,~S,~B,~S,java.io.File,org.eclipse.debug.core.ILaunchConfiguration");
c$.generatePreJavaScript = Clazz.defineMethod (c$, "generatePreJavaScript", 
($fz = function (buf, args, grelativePath, gj2sLibPath, isJUnit, mode, mainType, workingDir, configuration) {
buf.append ("<a class=\"alaa\" title=\"Launch ");
buf.append (mainType);
buf.append ("\" href=\"text/javascript:if(a='");
buf.append (mainType);
buf.append ('@');
buf.append (grelativePath);
buf.append ("'");
if (args != null && args.length > 2) {
buf.append (",r=");
buf.append (net.sf.j2s.ui.launching.J2SLaunchingUtil.toXMLString (net.sf.j2s.ui.launching.ArgsUtil.wrapAsArgumentArray (args, false)));
}buf.append (",window['ClazzLoader']!=null)" + (isJUnit ? "$u$" : "$w$") + "(a");
if (args != null && args.length > 2) {
buf.append (",r");
}buf.append (");else{var d=document,t=\'onreadystatechange\',x=d.createElement(\'SCRIPT\'),f=function(){var s=this.readyState;if(s==null||s==\'loaded\'||s==\'complete\'){" + (isJUnit ? "$u$" : "$w$") + "(a");
if (args != null && args.length > 2) {
buf.append (",r");
}buf.append (");}};x.src='");
buf.append (gj2sLibPath);
buf.append ("j2slib.z.js\';(typeof x[t]==\'undefined\')?x.onload=f:x[t]=f;d.getElementsByTagName(\'HEAD\')[0].appendChild(x);void(0);}\">");
buf.append ("<span class=\"alaa-icon\"></span>");
buf.append (mainType);
buf.append ("</a>\r\n\r\n");
buf.append ("<script type=\"text/javascript\">\r\n");
net.sf.j2s.ui.launching.J2SCyclicProjectUtils.emptyTracks ();
var j2xStr = net.sf.j2s.ui.launching.J2SLaunchingUtil.generateClasspathJ2X (configuration, null, workingDir);
if ("debug".equals (mode)) {
buf.append ("window[\"j2s.script.debugging\"] = true;\r\n");
if (j2xStr.indexOf ("swt") != -1) {
buf.append ("window[\"swt.debugging\"] = true;\r\n");
}buf.append ("window[\"j2s.hotspot.port\"] = ");
buf.append (net.sf.j2s.core.hotspot.InnerHotspotServer.getHotspotPort ());
buf.append (";\r\n\r\n");
}return j2xStr;
}, $fz.isPrivate = true, $fz), "StringBuffer,~S,~S,~S,~B,~S,~S,java.io.File,org.eclipse.debug.core.ILaunchConfiguration");
c$.generateJ2SHeaderHTML = Clazz.defineMethod (c$, "generateJ2SHeaderHTML", 
($fz = function (buf, useXHTMLHeader, addonCompatiable, gj2sLibPath, mainType, workingDir, configuration) {
if (useXHTMLHeader) {
buf.append ("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\r\n");
buf.append ("\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n");
buf.append ("<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">\r\n");
} else {
buf.append ("<html>\r\n");
}buf.append ("<head>\r\n");
buf.append ("<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"/>\r\n");
buf.append ("<title>");
buf.append (mainType);
buf.append ("</title>\r\n");
buf.append (configuration.getAttribute ("head.header.html", ""));
if (!addonCompatiable) {
buf.append ("<script type=\"text/javascript\" src=\"" + gj2sLibPath + "j2slib.z.js\"></script>\r\n");
}net.sf.j2s.ui.launching.J2SCyclicProjectUtils.emptyTracks ();
var extraHTML = net.sf.j2s.ui.launching.J2SLaunchingUtil.generateClasspathHTML (configuration, mainType, workingDir);
if (extraHTML.trim ().length != 0) {
buf.append (extraHTML);
}buf.append (configuration.getAttribute ("tail.header.html", ""));
buf.append ("<style text=\"text/css\">\r\n");
buf.append ("div.powered {\r\n");
buf.append ("\tposition:absolute;\r\n\tright:0;\r\n\ttop:0;\r\n\tmargin:1em;\r\n");
buf.append ("}\r\n");
buf.append ("a.alaa {\r\n");
buf.append ("\tdisplay:block;\r\n\twhite-space:nowrap;\r\n\twidth:1em;\r\n\toverflow-x:visible;\r\n\ttext-decoration:none;\r\n\tpadding-left:32px;\r\n\tmargin:2em;\r\n\tcolor:navy;\r\n\tcursor:pointer;\r\n\tcursor:hand;\r\n");
buf.append ("}\r\n");
buf.append ("span.alaa-icon {\r\n");
buf.append ("\tdisplay:block;\r\n\tposition:absolute;\r\n\twidth:16px;\r\n\theight:16px;\r\n\tmargin:2px 8px 0 -24px;\r\n\tbackground-color:rgb(57,61,254);\r\n");
buf.append ("}\r\n");
buf.append ("</style>\r\n");
buf.append ("<script src=\"njs/njs_runtime.js\"></script>");
buf.append ("<script src=\"external/jsthread.js\"></script>");
buf.append ("<script src=\"external/fileapi.js\"></script>");
buf.append ("</head>\r\n");
buf.append ("<body>\r\n");
buf.append (configuration.getAttribute ("head.body.html", ""));
buf.append ("<!-- A Link An Application (ALAA) -->\r\n");
buf.append ("<div class=\"powered\">Powered by <a href=\"http://java2script.org/\">Java2Script</a></div>\r\n");
}, $fz.isPrivate = true, $fz), "StringBuffer,~B,~B,~S,~S,java.io.File,org.eclipse.debug.core.ILaunchConfiguration");
c$.writeMainHTML = Clazz.defineMethod (c$, "writeMainHTML", 
function (file, html) {
try {
var fos =  new java.io.FileOutputStream (file);
fos.write ([0xef, 0xbb, 0xbf]);
fos.write (html.getBytes ("utf-8"));
fos.close ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
}, "java.io.File,~S");
c$.generateClasspathHTML = Clazz.defineMethod (c$, "generateClasspathHTML", 
function (configuration, mainType, workingDir) {
var buf =  new StringBuffer ();
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return buf.toString ();
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return buf.toString ();
}var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
}var classpath = configuration.getAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
if (classpath == null || classpath.trim ().length == 0) {
var paths = net.sf.j2s.ui.launching.JavaRuntime.computeUnresolvedRuntimeClasspath (configuration);
var existed =  new java.util.HashSet ();
for (var i = 0; i < paths.length; i++) {
if (Clazz.instanceOf (paths[i], net.sf.j2s.ui.classpath.Resource)) {
var res = paths[i];
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (res)) {
continue ;}if (!existed.contains (res.getName ())) {
existed.add (res.getName ());
buf.append (res.toHTMLString ());
}}}
} else {
var fModel =  new net.sf.j2s.ui.classpath.CompositeResources ();
fModel.setFolder (workingDir);
fModel.setRelativePath (".j2s");
fModel.setBinRelativePath (relativePath);
if (classpath == null || classpath.trim ().length == 0) {
fModel.load ();
} else {
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
fModel.load ( new java.io.ByteArrayInputStream (propStr.getBytes ()));
}buf.append (fModel.toHTMLString ());
}var str = buf.toString ();
buf =  new StringBuffer ();
var split = str.$plit ("\r\n|\r|\n");
var set =  new java.util.HashSet ();
for (var i = 0; i < split.length; i++) {
if (set.contains (split[i])) {
var line = split[i].toLowerCase ();
if (line.startsWith ("<script ") && line.indexOf ("src=") != -1) {
continue ;}if (line.startsWith ("<link ") && line.indexOf ("href=") != -1) {
continue ;}}set.add (split[i]);
buf.append (split[i]);
buf.append ("\r\n");
}
return buf.toString ();
}, "org.eclipse.debug.core.ILaunchConfiguration,~S,java.io.File");
c$.generateClasspathJ2X = Clazz.defineMethod (c$, "generateClasspathJ2X", 
function (configuration, varName, workingDir) {
var isUseGlobalURL = configuration.getAttribute ("use.global.alaa.url", false);
var buf =  new StringBuffer ();
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return buf.toString ();
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return buf.toString ();
}var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
}var classpath = configuration.getAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
if (classpath == null || classpath.trim ().length == 0) {
var paths = net.sf.j2s.ui.launching.JavaRuntime.computeUnresolvedRuntimeClasspath (configuration);
var existed =  new java.util.HashSet ();
for (var i = 0; i < paths.length; i++) {
if (Clazz.instanceOf (paths[i], net.sf.j2s.ui.classpath.ContactedClasses)) {
var res = paths[i];
if (!existed.contains (res.getName ())) {
existed.add (res.getName ());
buf.append (res.toJ2XString ());
buf.append (',');
}} else if (Clazz.instanceOf (paths[i], net.sf.j2s.ui.classpath.CompositeResources)) {
var c = paths[i];
if (!existed.contains (c.getName ())) {
existed.add (c.getName ());
buf.append (c.toJ2XString ());
buf.append (',');
}}}
} else {
var fModel =  new net.sf.j2s.ui.classpath.CompositeResources ();
fModel.setFolder (workingDir);
fModel.setRelativePath (".j2s");
fModel.setBinRelativePath (relativePath);
if (classpath == null || classpath.trim ().length == 0) {
fModel.load ();
} else {
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
fModel.load ( new java.io.ByteArrayInputStream (propStr.getBytes ()));
}net.sf.j2s.ui.launching.J2SCyclicProjectUtils.emptyTracks ();
buf.append (fModel.toJ2XString ());
}var str = buf.toString ();
buf =  new StringBuffer ();
var split = str.$plit ("\r\n|\r|\n|,");
var set =  new java.util.HashSet ();
var keyPkg =  new java.util.HashSet ();
for (var i = 0; i < split.length; i++) {
if (set.contains (split[i])) {
continue ;}set.add (split[i]);
if (split[i] != null && split[i].trim ().length != 0) {
var j2xPath = split[i].trim ();
var f =  new java.io.File (j2xPath);
if (!f.exists () && j2xPath.indexOf ("net.sf.j2s.lib") != -1) {
if (j2xPath.matches (".*\\.v\\d{3}.*")) {
j2xPath = j2xPath.replaceAll ("\\.v\\d{3}", "");
f =  new java.io.File (j2xPath);
} else {
var location = org.eclipse.core.runtime.Platform.getInstallLocation ();
var url = location.getURL ();
var file =  new java.io.File (url.getFile (), "plugins");
var j2sFolders = file.listFiles (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SLaunchingUtil$1") ? 0 : net.sf.j2s.ui.launching.J2SLaunchingUtil.$J2SLaunchingUtil$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SLaunchingUtil$1, this, null)));
var j2slib = null;
if (j2sFolders != null && j2sFolders.length != 0) {
j2slib = j2sFolders[0];
j2xPath = j2xPath.replaceAll ("net\\.sf\\.j2s\\.lib([^\\/\\\\])*(\\/|\\\\)", j2slib.getName () + "$2");
f =  new java.io.File (j2xPath);
}}}if (f.exists ()) {
var prop =  new java.util.Properties ();
try {
prop.load ( new java.io.FileInputStream (f));
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
var pkg = prop.getProperty ("package.prefix");
if (keyPkg.contains (pkg)) {
continue ;}keyPkg.add (pkg);
buf.append ("ClazzLoader.packageClasspath (\"");
buf.append (pkg);
buf.append ("\", ");
var j2slibPath = net.sf.j2s.ui.property.FileUtil.toRelativePath (f.getParent (), workingDir.getAbsolutePath ());
var gj2sLibPath = j2slibPath;
if (isUseGlobalURL) {
gj2sLibPath = configuration.getAttribute ("global.j2slib.url", j2slibPath);
if (gj2sLibPath.length == 0) {
gj2sLibPath = "./";
}if (!gj2sLibPath.endsWith ("/")) {
gj2sLibPath += "/";
}}if (varName == null) {
buf.append ("\"");
buf.append (gj2sLibPath);
buf.append ("\"");
} else {
buf.append (varName);
}var pkgFile =  new java.io.File (f.getParentFile (), pkg.$replace ('.', '/') + "/package.js");
if (pkgFile.exists ()) {
buf.append (", true");
}buf.append (");\r\n");
}}}
return buf.toString ();
}, "org.eclipse.debug.core.ILaunchConfiguration,~S,java.io.File");
c$.generateClasspathExistedClasses = Clazz.defineMethod (c$, "generateClasspathExistedClasses", 
function (configuration, mainType, workingDir, indent) {
var isUseGlobalURL = configuration.getAttribute ("use.global.alaa.url", false);
var buf =  new StringBuffer ();
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return buf.toString ();
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return buf.toString ();
}var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
var srcFolder = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
srcFolder =  new java.io.File (workingDir, relativePath);
} else {
relativePath = "";
srcFolder = workingDir;
}buf.append ('[');
try {
buf.append (srcFolder.getCanonicalPath ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
buf.append (relativePath);
} else {
throw e;
}
}
buf.append ("],");
var classpath = configuration.getAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
if (classpath == null || classpath.trim ().length == 0) {
var paths = net.sf.j2s.ui.launching.JavaRuntime.computeUnresolvedRuntimeClasspath (configuration);
var existed =  new java.util.HashSet ();
for (var i = 0; i < paths.length; i++) {
if (Clazz.instanceOf (paths[i], net.sf.j2s.ui.classpath.UnitClass)) {
var unit = paths[i];
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (unit)) {
continue ;}buf.append (unit.getClassName ());
buf.append (',');
}}
for (var i = 0; i < paths.length; i++) {
if (Clazz.instanceOf (paths[i], net.sf.j2s.ui.classpath.CompositeResources)) {
var c = paths[i];
if (!existed.contains (c.getName ())) {
existed.add (c.getName ());
buf.append (c.existedClassesString ());
buf.append (',');
}}if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (paths[i])) {
continue ;}}
} else {
var fModel =  new net.sf.j2s.ui.classpath.CompositeResources ();
fModel.setFolder (workingDir);
fModel.setRelativePath (".j2s");
fModel.setBinRelativePath (relativePath);
if (classpath == null || classpath.trim ().length == 0) {
fModel.load ();
} else {
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
fModel.load ( new java.io.ByteArrayInputStream (propStr.getBytes ()));
}buf.append (fModel.existedClassesString ());
}var str = buf.toString ();
buf =  new StringBuffer ();
var split = str.$plit ("\r\n|\r|\n|,");
var set =  new java.util.HashSet ();
var existedPackages = false;
var lastLocation = "";
for (var i = 0; i < split.length; i++) {
if (split[i] != null && split[i].trim ().length != 0) {
var clazzName = split[i].trim ();
if (clazzName.startsWith ("[") && clazzName.endsWith ("]")) {
if (existedPackages) {
var arr = set.toArray ( new Array (0));
if (arr.length > 0) {
buf.append (indent);
buf.append ("ClazzLoader.packageClasspath (");
}if (arr.length > 1) {
buf.append ('[');
}net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buf, arr, null);
if (arr.length > 1) {
buf.append (']');
}if (arr.length > 0) {
buf.append (", \"");
var glastLocation = lastLocation;
if (isUseGlobalURL) {
glastLocation = configuration.getAttribute ("global.bin.url", lastLocation);
if (glastLocation.length == 0) {
glastLocation = "./";
}if (!glastLocation.endsWith ("/")) {
glastLocation += "/";
}}buf.append (glastLocation);
buf.append ("\");\r\n");
}existedPackages = false;
set.clear ();
}clazzName = clazzName.substring (1, clazzName.length - 1);
lastLocation = net.sf.j2s.ui.property.FileUtil.toRelativePath (clazzName, workingDir.getAbsolutePath ());
continue ;}var idx2 = clazzName.lastIndexOf (".");
if (idx2 != -1) {
clazzName = clazzName.substring (0, idx2);
set.add (clazzName);
existedPackages = true;
}}}
if (existedPackages) {
var arr = set.toArray ( new Array (0));
if (arr.length > 0) {
buf.append (indent);
buf.append ("ClazzLoader.packageClasspath (");
}if (arr.length > 1) {
buf.append ('[');
}net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buf, arr, null);
if (arr.length > 1) {
buf.append (']');
}if (arr.length > 0) {
buf.append (", \"");
var glastLocation = lastLocation;
if (isUseGlobalURL) {
glastLocation = configuration.getAttribute ("global.bin.url", lastLocation);
if (glastLocation.length == 0) {
glastLocation = "./";
}if (!glastLocation.endsWith ("/")) {
glastLocation += "/";
}}buf.append (glastLocation);
buf.append ("\");\r\n");
}existedPackages = false;
set.clear ();
}return buf.toString ();
}, "org.eclipse.debug.core.ILaunchConfiguration,~S,java.io.File,~S");
c$.generateClasspathIgnoredClasses = Clazz.defineMethod (c$, "generateClasspathIgnoredClasses", 
function (configuration, mainType, workingDir, indent) {
var buf =  new StringBuffer ();
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return buf.toString ();
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return buf.toString ();
}var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
}var classpath = configuration.getAttribute ("j2s.abandon.class.path", Clazz.castNullAs ("String"));
if (classpath == null || classpath.trim ().length == 0) {
var paths = net.sf.j2s.ui.launching.JavaRuntime.computeUnresolvedIgnoredClasses (configuration);
var existed =  new java.util.HashSet ();
for (var i = 0; i < paths.length; i++) {
if (Clazz.instanceOf (paths[i], net.sf.j2s.ui.classpath.CompositeResources)) {
var c = paths[i];
if (!existed.contains (c.getName ())) {
existed.add (c.getName ());
buf.append (c.ignoredClassesString ());
buf.append (',');
}}}
} else {
var fModel =  new net.sf.j2s.ui.classpath.CompositeResources ();
fModel.setFolder (workingDir);
fModel.setRelativePath (".j2s");
fModel.setBinRelativePath (relativePath);
if (classpath == null || classpath.trim ().length == 0) {
fModel.load ();
} else {
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.output.path=" + relativePath + "\r\nj2s.abandoned.resources.list=" + classpath;
fModel.load ( new java.io.ByteArrayInputStream (propStr.getBytes ()));
}buf.append (fModel.ignoredClassesString ());
}classpath = configuration.getAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
if (classpath == null || classpath.trim ().length == 0) {
var paths = net.sf.j2s.ui.launching.JavaRuntime.computeUnresolvedRuntimeClasspath (configuration);
var existed =  new java.util.HashSet ();
for (var i = 0; i < paths.length; i++) {
if (Clazz.instanceOf (paths[i], net.sf.j2s.ui.classpath.CompositeResources)) {
var c = paths[i];
if (!existed.contains (c.getName ())) {
existed.add (c.getName ());
buf.append (c.ignoredClassesString ());
buf.append (',');
}}}
} else {
var fModel =  new net.sf.j2s.ui.classpath.CompositeResources ();
fModel.setFolder (workingDir);
fModel.setRelativePath (".j2s");
fModel.setBinRelativePath (relativePath);
if (classpath == null || classpath.trim ().length == 0) {
fModel.load ();
} else {
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
fModel.load ( new java.io.ByteArrayInputStream (propStr.getBytes ()));
}buf.append (fModel.ignoredClassesString ());
}var str = buf.toString ();
buf =  new StringBuffer ();
var split = str.$plit ("\r\n|\r|\n|,");
var set =  new java.util.HashSet ();
for (var i = 0; i < split.length; i++) {
if (split[i] != null && split[i].trim ().length != 0) {
set.add (split[i].trim ());
}}
var arr = set.toArray ( new Array (0));
if (arr.length > 0) {
buf.append (indent);
buf.append ("ClazzLoader.ignore (");
net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buf, arr, null);
buf.append (");\r\n");
}return buf.toString ();
}, "org.eclipse.debug.core.ILaunchConfiguration,~S,java.io.File,~S");
c$.wrapTypeJS = Clazz.defineMethod (c$, "wrapTypeJS", 
function (className, binFolder) {
var buf =  new StringBuffer ();
buf.append ("<script type=\"text/javascript\" src=\"");
if (binFolder != null) {
var binPath = binFolder.trim ();
if (binPath.length != 0) {
buf.append (binPath);
if (!binPath.endsWith ("/")) {
buf.append ("/");
}}}buf.append (className.$replace ('.', '/'));
buf.append (".js\"></script>\r\n");
return buf.toString ();
}, "~S,~S");
c$.toXMLString = Clazz.defineMethod (c$, "toXMLString", 
function (str) {
return str.replaceAll ("&", "&amp;").replaceAll ("\"", "&quot;").replaceAll (">", "&gt;").replaceAll ("<", "&lt;");
}, "~S");
c$.readAFile = Clazz.defineMethod (c$, "readAFile", 
function (res) {
try {
var baos =  new java.io.ByteArrayOutputStream ();
var isUTF8 = false;
var utf8Header =  Clazz.newArray (3, 0);
var buf =  Clazz.newArray (1024, 0);
var read = 0;
var readLen = 0;
while ((read = res.read (utf8Header, readLen, 3 - readLen)) != -1) {
readLen += read;
if (readLen == 3) {
if (utf8Header[0] == 0xef && utf8Header[1] == 0xbb && utf8Header[2] == 0xbf) {
isUTF8 = true;
} else {
baos.write (utf8Header);
}break;
}}
while ((read = res.read (buf)) != -1) {
baos.write (buf, 0, read);
}
res.close ();
return isUTF8 ? baos.toString () : baos.toString ("utf-8");
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return null;
}, "java.io.InputStream");
c$.getWorkingDirectory = Clazz.defineMethod (c$, "getWorkingDirectory", 
function (configuration) {
var workingDir = null;
var path = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_WORKING_DIRECTORY, Clazz.castNullAs ("String"));
if (path != null) {
path = org.eclipse.core.variables.VariablesPlugin.getDefault ().getStringVariableManager ().performStringSubstitution (path);
var xpath =  new org.eclipse.core.runtime.Path (path);
if (xpath.isAbsolute ()) {
var dir =  new java.io.File (xpath.toOSString ());
if (dir.isDirectory ()) {
workingDir = dir;
} else {
var res = org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ().findMember (path);
if (Clazz.instanceOf (res, org.eclipse.core.resources.IContainer) && res.exists ()) {
workingDir = res.getLocation ().toFile ();
}}} else {
var res = org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ().findMember (path);
if (Clazz.instanceOf (res, org.eclipse.core.resources.IContainer) && res.exists ()) {
workingDir = res.getLocation ().toFile ();
}}}if (workingDir == null) {
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return null;
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return null;
}var project = javaProject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
workingDir =  new java.io.File (prjFolder);
}return workingDir;
}, "org.eclipse.debug.core.ILaunchConfiguration");
c$.getMainType = Clazz.defineMethod (c$, "getMainType", 
function (configuration) {
var mainType;
mainType = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME, Clazz.castNullAs ("String"));
if (mainType == null) {
return null;
}mainType = org.eclipse.core.variables.VariablesPlugin.getDefault ().getStringVariableManager ().performStringSubstitution (mainType);
return mainType;
}, "org.eclipse.debug.core.ILaunchConfiguration");
c$.$J2SLaunchingUtil$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SLaunchingUtil$1", null, java.io.FileFilter);
Clazz.overrideMethod (c$, "accept", 
function (pathname) {
var name = pathname.getName ().toLowerCase ();
if (name.startsWith ("net.sf.j2s.lib")) {
return true;
}return false;
}, "java.io.File");
c$ = Clazz.p0p ();
};
});
