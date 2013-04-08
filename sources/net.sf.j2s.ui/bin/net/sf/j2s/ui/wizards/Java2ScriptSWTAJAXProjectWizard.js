Clazz.declarePackage ("net.sf.j2s.ui.wizards");
Clazz.load (["net.sf.j2s.ui.wizards.Java2ScriptProjectWizard"], "net.sf.j2s.ui.wizards.Java2ScriptSWTAJAXProjectWizard", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "java.util.ArrayList", "net.sf.j2s.ui.launching.J2SLaunchingUtil", "$.JavaRuntime", "org.eclipse.core.runtime.Path", "org.eclipse.jdt.core.JavaCore"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.wizards, "Java2ScriptSWTAJAXProjectWizard", net.sf.j2s.ui.wizards.Java2ScriptProjectWizard);
Clazz.overrideMethod (c$, "updateJava2ScriptWizardTitle", 
function () {
this.setWindowTitle (this.getWindowTitle () + " with Java2Script AJAX and SWT Enabled");
});
Clazz.overrideMethod (c$, "updateJava2ScriptLibraries", 
function (classpathModel, j2sLibPath) {
var entry = net.sf.j2s.ui.launching.JavaRuntime.newArchiveRuntimeClasspathEntry (j2sLibPath + "/swt.j2x");
if (entry != null) {
(entry).setAbsolute (true);
classpathModel.addResource (entry);
}}, "net.sf.j2s.ui.property.J2SClasspathModel,~S");
Clazz.defineMethod (c$, "updateJavaLibraries", 
function (defaultEntries) {
var list =  new java.util.ArrayList ();
for (var i = 0; i < defaultEntries.length; i++) {
list.add (i, defaultEntries[i]);
}
list.add (org.eclipse.jdt.core.JavaCore.newVariableEntry ( new org.eclipse.core.runtime.Path ("ECLIPSE_SWT"), null, null));
list.add (org.eclipse.jdt.core.JavaCore.newVariableEntry ( new org.eclipse.core.runtime.Path ("AJAX_SWT"),  new org.eclipse.core.runtime.Path ("AJAX_SWT_SRC"), null));
list.add (org.eclipse.jdt.core.JavaCore.newVariableEntry ( new org.eclipse.core.runtime.Path ("AJAX_RPC"),  new org.eclipse.core.runtime.Path ("AJAX_RPC_SRC"), null));
list.add (org.eclipse.jdt.core.JavaCore.newVariableEntry ( new org.eclipse.core.runtime.Path ("AJAX_PIPE"),  new org.eclipse.core.runtime.Path ("AJAX_PIPE_SRC"), null));
return Clazz.superCall (this, net.sf.j2s.ui.wizards.Java2ScriptSWTAJAXProjectWizard, "updateJavaLibraries", [list.toArray ( new Array (list.size ()))]);
}, "~A");
Clazz.overrideMethod (c$, "updateJava2ScriptProject", 
function (prjFolder, binRelative) {
try {
var cpFile =  new java.io.File (prjFolder, ".classpath");
var fis =  new java.io.FileInputStream (cpFile);
var classpath = net.sf.j2s.ui.launching.J2SLaunchingUtil.readAFile (fis);
if (classpath != null) {
var needUpdate = false;
if (classpath.indexOf ("ECLIPSE_SWT") == -1 && classpath.indexOf ("SWT_LIBRARY") == -1 && classpath.indexOf ("eclipse.swt") == -1) {
var idx = classpath.lastIndexOf ("<");
classpath = classpath.substring (0, idx) + "\t<classpathentry kind=\"var\" path=\"ECLIPSE_SWT\"/>\r\n" + classpath.substring (idx);
needUpdate = true;
}if (classpath.indexOf ("AJAX_SWT") == -1 && classpath.indexOf ("ajaxswt.jar") == -1) {
var idx = classpath.lastIndexOf ("<");
classpath = classpath.substring (0, idx) + "\t<classpathentry sourcepath=\"AJAX_SWT_SRC\" kind=\"var\" path=\"AJAX_SWT\"/>\r\n" + classpath.substring (idx);
needUpdate = true;
}if (classpath.indexOf ("AJAX_RPC") == -1 && classpath.indexOf ("ajaxrpc.jar") == -1) {
var idx = classpath.lastIndexOf ("<");
classpath = classpath.substring (0, idx) + "\t<classpathentry sourcepath=\"AJAX_RPC_SRC\" kind=\"var\" path=\"AJAX_RPC\"/>\r\n" + classpath.substring (idx);
needUpdate = true;
}if (classpath.indexOf ("AJAX_PIPE") == -1 && classpath.indexOf ("ajaxpipe.jar") == -1) {
var idx = classpath.lastIndexOf ("<");
classpath = classpath.substring (0, idx) + "\t<classpathentry sourcepath=\"AJAX_PIPE_SRC\" kind=\"var\" path=\"AJAX_PIPE\"/>\r\n" + classpath.substring (idx);
needUpdate = true;
}if (needUpdate) {
try {
var fos =  new java.io.FileOutputStream (cpFile);
fos.write (classpath.getBytes ("utf-8"));
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
}}} catch (e1) {
if (Clazz.instanceOf (e1, java.io.FileNotFoundException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
}, "~S,~S");
});
