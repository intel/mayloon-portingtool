Clazz.declarePackage ("net.sf.j2s.lib.providers");
Clazz.load (["com.intel.ide.eclipse.mpt.extensionpoint.IExternalResourceProvider4MPT"], "net.sf.j2s.lib.providers.JavaRuntimeJSProvider4MPT", ["com.intel.ide.eclipse.mpt.utils.ProjectUtil", "java.io.File", "$.FileFilter", "net.sf.j2s.lib.LibPlugin", "org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.declareType (net.sf.j2s.lib.providers, "JavaRuntimeJSProvider4MPT", null, com.intel.ide.eclipse.mpt.extensionpoint.IExternalResourceProvider4MPT);
Clazz.overrideMethod (c$, "getKeys", 
function () {
return net.sf.j2s.lib.providers.JavaRuntimeJSProvider4MPT.CORE_KEY_LIST;
});
Clazz.overrideMethod (c$, "getDescriptions", 
function () {
return net.sf.j2s.lib.providers.JavaRuntimeJSProvider4MPT.CORE_DESC_LIST;
});
Clazz.overrideMethod (c$, "getResources", 
function () {
var starterURL = net.sf.j2s.lib.LibPlugin.getDefault ().getBundle ().getEntry ("/" + java.io.File.separator);
var srcPath = ".";
try {
srcPath = org.eclipse.core.runtime.Platform.asLocalURL (starterURL).getFile ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
srcPath = srcPath.$replace ('/', java.io.File.separatorChar);
var folder =  new java.io.File (srcPath, "j2slib");
var files = folder.listFiles (((Clazz.isClassDefined ("net.sf.j2s.lib.providers.JavaRuntimeJSProvider4MPT$1") ? 0 : net.sf.j2s.lib.providers.JavaRuntimeJSProvider4MPT.$JavaRuntimeJSProvider4MPT$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.lib.providers.JavaRuntimeJSProvider4MPT$1, this, null)));
if (files == null) {
return  new Array (0);
}var list =  new Array (1);
list[0] =  new Array (files.length);
for (var i = 0; i < files.length; i++) {
list[0][i] = "|" + files[i].getAbsolutePath ();
}
return list;
});
Clazz.overrideMethod (c$, "copyResources", 
function (key, destPath) {
var patterResouces = net.sf.j2s.lib.providers.JavaRuntimeJSProvider4MPT.CORE_RESOURCE_LIST;
var starterURL = net.sf.j2s.lib.LibPlugin.getDefault ().getBundle ().getEntry ("/" + java.io.File.separator);
var srcPath = ".";
try {
srcPath = org.eclipse.core.runtime.Platform.asLocalURL (starterURL).getFile ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
srcPath = srcPath.$replace ('/', java.io.File.separatorChar);
var index = 0;
for (var i = 0; i < net.sf.j2s.lib.providers.JavaRuntimeJSProvider4MPT.CORE_KEY_LIST.length; i++) {
if (net.sf.j2s.lib.providers.JavaRuntimeJSProvider4MPT.CORE_KEY_LIST[i].equals (key)) {
index = i;
break;
}}
for (var j = 0; j < patterResouces[index].length; j++) {
var srcFile =  new java.io.File (srcPath, "j2slib/" + patterResouces[index][j]);
var destFile =  new java.io.File (destPath, patterResouces[index][j]);
if (!destFile.exists () || srcFile.lastModified () >= destFile.lastModified ()) {
com.intel.ide.eclipse.mpt.utils.ProjectUtil.copyFile (srcFile.getAbsolutePath (), destFile.getAbsolutePath ());
}}
}, "~S,~S");
c$.$JavaRuntimeJSProvider4MPT$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.lib.providers, "JavaRuntimeJSProvider4MPT$1", null, java.io.FileFilter);
Clazz.overrideMethod (c$, "accept", 
function (pathname) {
if (pathname.isFile () && pathname.getName ().endsWith (".j2x")) {
return true;
}return false;
}, "java.io.File");
c$ = Clazz.p0p ();
};
c$.CORE_KEY_LIST = c$.prototype.CORE_KEY_LIST = ["J2S Core"];
c$.CORE_DESC_LIST = c$.prototype.CORE_DESC_LIST = ["Java2Script core library"];
c$.CORE_RESOURCE_LIST = c$.prototype.CORE_RESOURCE_LIST = [["j2slib.z.js"]];
});
