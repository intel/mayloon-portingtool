Clazz.declarePackage ("net.sf.j2s.lib.build");
Clazz.load (null, "net.sf.j2s.lib.build.Bundle2StringUtil", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "net.sf.j2s.lib.build.RegExCompress"], function () {
c$ = Clazz.declareType (net.sf.j2s.lib.build, "Bundle2StringUtil");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var bundleName = null;
var basePath = "bin/";
if (args.length != 0) {
basePath = args[0];
bundleName = args[1];
} else {
bundleName = "net.sf.j2s.java.core.messages";
}var bundlePath = bundleName.replaceAll ("\\.", "/") + ".properties";
var content = net.sf.j2s.lib.build.RegExCompress.readFileAll ( new java.io.FileInputStream ( new java.io.File (basePath, bundlePath)));
var contentStr = content.replaceAll ("\\s*#.*[\\r\\n]+", "").replaceAll ("\\\\", "\\\\\\\\").replaceAll ("\\t", "\\\\t").replaceAll ("\\r", "\\\\r").replaceAll ("\\n", "\\\\n").replaceAll ("\\'", "\\\\'").replaceAll ("\\\"", "\\\\\"");
var jsStr = "java.util.ResourceBundle.registerBundle(\"" + bundleName + "\", \"" + contentStr + "\");";
System.out.println (jsStr);
if (args.length != 0) {
try {
bundlePath = bundleName.replaceAll ("\\.", "/") + ".js";
var fos =  new java.io.FileOutputStream ( new java.io.File (basePath, bundlePath));
fos.write (jsStr.getBytes ());
fos.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}, "~A");
});
