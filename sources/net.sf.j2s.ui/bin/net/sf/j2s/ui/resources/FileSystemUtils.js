Clazz.declarePackage ("net.sf.j2s.ui.resources");
Clazz.load (null, "net.sf.j2s.ui.resources.FileSystemUtils", ["java.io.File", "$.FileFilter", "$.FileInputStream", "$.FileOutputStream"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.resources, "FileSystemUtils");
c$.copyFolder = Clazz.defineMethod (c$, "copyFolder", 
function (srcPath, destPath, overwrite) {
var srcFolder =  new java.io.File (srcPath);
if (srcFolder.exists () && srcFolder.isDirectory ()) {
var destFolder =  new java.io.File (destPath);
if (destFolder.exists () && destFolder.isDirectory ()) {
} else {
try {
destFolder.mkdirs ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
}var filter = ((Clazz.isClassDefined ("net.sf.j2s.ui.resources.FileSystemUtils$1") ? 0 : net.sf.j2s.ui.resources.FileSystemUtils.$FileSystemUtils$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.resources.FileSystemUtils$1, this, null));
var files = srcFolder.listFiles (filter);
for (var i = 0; i < files.length; i++) {
var file =  new java.io.File (destFolder, files[i].getName ());
if (files[i].isDirectory ()) {
net.sf.j2s.ui.resources.FileSystemUtils.copyFolder (files[i].getAbsolutePath (), file.getAbsolutePath (), overwrite);
} else {
if (!file.exists () || overwrite) {
net.sf.j2s.ui.resources.FileSystemUtils.streamCopyFile (files[i], file);
}}}
}}, "~S,~S,~B");
c$.copyFile = Clazz.defineMethod (c$, "copyFile", 
function (srcFile, destFile) {
net.sf.j2s.ui.resources.FileSystemUtils.streamCopyFile ( new java.io.File (srcFile),  new java.io.File (destFile));
}, "~S,~S");
c$.streamCopyFile = Clazz.defineMethod (c$, "streamCopyFile", 
function (srcFile, destFile) {
try {
var fi =  new java.io.FileInputStream (srcFile);
var fo =  new java.io.FileOutputStream (destFile);
var buf =  Clazz.newArray (1024, 0);
var readLength = 0;
while (readLength != -1) {
readLength = fi.read (buf);
if (readLength != -1) {
fo.write (buf, 0, readLength);
}}
fo.close ();
fi.close ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
}, "java.io.File,java.io.File");
c$.$FileSystemUtils$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.resources, "FileSystemUtils$1", null, java.io.FileFilter);
Clazz.overrideMethod (c$, "accept", 
function (file) {
if (file.isDirectory ()) {
var name = file.getName ();
if (name.equals ("CVS")) {
return false;
}}if (file.getAbsolutePath ().endsWith (".swp")) {
return false;
}return true;
}, "java.io.File");
c$ = Clazz.p0p ();
};
});
