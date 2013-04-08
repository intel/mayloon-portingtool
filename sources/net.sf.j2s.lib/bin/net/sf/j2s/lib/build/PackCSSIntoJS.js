Clazz.declarePackage ("net.sf.j2s.lib.build");
Clazz.load (null, "net.sf.j2s.lib.build.PackCSSIntoJS", ["java.io.File", "$.FileFilter", "$.FileInputStream", "$.FileOutputStream", "java.lang.StringBuffer", "net.sf.j2s.lib.build.RegExCompress"], function () {
c$ = Clazz.declareType (net.sf.j2s.lib.build, "PackCSSIntoJS");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
if (args.length < 1) {
System.out.println ("Usage: ... <Folder that contains *.css and *.js>\r\n");
return ;
}var base = args[0];
var file =  new java.io.File (base);
if (!file.exists () || !file.isDirectory ()) {
System.out.println ("Usage: ... <Folder that contains *.css and *.js>\r\n");
return ;
}net.sf.j2s.lib.build.PackCSSIntoJS.traverseCSSFile (file);
}, "~A");
c$.traverseCSSFile = Clazz.defineMethod (c$, "traverseCSSFile", 
($fz = function (folder) {
var folders = folder.listFiles (((Clazz.isClassDefined ("net.sf.j2s.lib.build.PackCSSIntoJS$1") ? 0 : net.sf.j2s.lib.build.PackCSSIntoJS.$PackCSSIntoJS$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.lib.build.PackCSSIntoJS$1, this, null)));
for (var i = 0; i < folders.length; i++) {
net.sf.j2s.lib.build.PackCSSIntoJS.traverseCSSFile (folders[i]);
}
var cssFiles = folder.listFiles (((Clazz.isClassDefined ("net.sf.j2s.lib.build.PackCSSIntoJS$2") ? 0 : net.sf.j2s.lib.build.PackCSSIntoJS.$PackCSSIntoJS$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.lib.build.PackCSSIntoJS$2, this, null)));
for (var i = 0; i < cssFiles.length; i++) {
var cssFile = cssFiles[i];
var path = cssFile.getAbsolutePath ();
var jsFile =  new java.io.File (path.substring (0, path.length - 4) + ".js");
if (!jsFile.exists ()) {
var name = cssFile.getName ();
name = name.substring (0, name.length - 4);
var lastIdx = 0;
var idx = -1;
var buffer =  new StringBuffer ();
while ((idx = name.indexOf ("-", lastIdx)) != -1) {
buffer.append (name.substring (lastIdx, lastIdx + 1).toUpperCase ());
buffer.append (name.substring (lastIdx + 1, idx));
lastIdx = idx + 1;
}
buffer.append (name.substring (lastIdx, lastIdx + 1).toUpperCase ());
buffer.append (name.substring (lastIdx + 1));
buffer.append (".js");
jsFile =  new java.io.File (cssFile.getParent (), buffer.toString ());
}if (jsFile.exists ()) {
var jsContent = net.sf.j2s.lib.build.RegExCompress.readFileAll ( new java.io.FileInputStream (jsFile));
var index = 0;
var jsContentAfter = net.sf.j2s.lib.build.PackCSSIntoJS.mergeCSS (cssFile, jsContent, index);
if (!jsContent.equals (jsContentAfter)) {
System.out.println ("Updating " + jsFile.getName () + " ...");
try {
var fos =  new java.io.FileOutputStream (jsFile);
fos.write ([0xef, 0xbb, 0xbf]);
fos.write (jsContentAfter.getBytes ("UTF-8"));
fos.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}}
}, $fz.isPrivate = true, $fz), "java.io.File");
c$.mergeCSS = Clazz.defineMethod (c$, "mergeCSS", 
($fz = function (cssFile, jsContent, index) {
var key = "$WTC$$.registerCSS";
var idx1 = jsContent.indexOf (key, index);
if (idx1 != -1) {
var idx2 = jsContent.indexOf (");", idx1);
if (idx2 != -1) {
var idx3 = jsContent.indexOf (",", idx1);
if (idx3 == -1 || idx3 > idx2) {
idx3 = idx2;
idx2 += 2;
} else {
idx2 = jsContent.indexOf (");\r\n", idx1);
if (idx2 == -1) {
System.err.println ("O, no, packed CSS is not packed correctly.");
} else {
idx2 += 4;
}}var cssContent = net.sf.j2s.lib.build.PackCSSIntoJS.readCSSFileContent (cssFile);
var alreadyMerged = jsContent.substring (0, idx3) + ", \"" + cssContent + "\");\r\n";
var jsContentAfter = alreadyMerged + jsContent.substring (idx2);
var ieCSSPath = cssFile.getAbsolutePath ().replaceAll ("\\.css", ".IE.css");
var ieCSSFile =  new java.io.File (ieCSSPath);
if (ieCSSFile.exists ()) {
return net.sf.j2s.lib.build.PackCSSIntoJS.mergeCSS (ieCSSFile, jsContentAfter, alreadyMerged.length);
} else {
return jsContentAfter;
}}}return jsContent;
}, $fz.isPrivate = true, $fz), "java.io.File,~S,~N");
c$.readCSSFileContent = Clazz.defineMethod (c$, "readCSSFileContent", 
($fz = function (cssFile) {
var cssContent = net.sf.j2s.lib.build.RegExCompress.readFileAll ( new java.io.FileInputStream (cssFile));
cssContent = cssContent.replaceAll ("\\s*[\\r\\n]+", "\n").replaceAll ("[\\r\\n]+\\s*", "\n").replaceAll ("\\\\", "\\\\\\\\").replaceAll ("\\t", "").replaceAll ("\\r", "\\\\r").replaceAll ("\\n", "\\\\n").replaceAll ("\\'", "\\\\'").replaceAll ("\\\"", "\\\\\"");
return cssContent;
}, $fz.isPrivate = true, $fz), "java.io.File");
c$.$PackCSSIntoJS$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.lib.build, "PackCSSIntoJS$1", null, java.io.FileFilter);
Clazz.overrideMethod (c$, "accept", 
function (pathname) {
if (pathname.isDirectory ()) {
return true;
}return false;
}, "java.io.File");
c$ = Clazz.p0p ();
};
c$.$PackCSSIntoJS$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.lib.build, "PackCSSIntoJS$2", null, java.io.FileFilter);
Clazz.overrideMethod (c$, "accept", 
function (pathname) {
var fileName = pathname.getName ();
if (pathname.isFile () && fileName.endsWith (".css") && !fileName.endsWith (".IE.css")) {
return true;
}return false;
}, "java.io.File");
c$ = Clazz.p0p ();
};
});
