Clazz.declarePackage ("net.sf.j2s.ui.actions");
Clazz.load (null, "net.sf.j2s.ui.actions.Bundle2StringUtil", ["java.io.ByteArrayOutputStream", "$.File", "$.FileInputStream", "$.FileOutputStream"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.actions, "Bundle2StringUtil");
c$.convert = Clazz.defineMethod (c$, "convert", 
function (basePath, bundleName) {
var bundlePath = bundleName.replaceAll ("\\.", "/") + ".properties";
var content = net.sf.j2s.ui.actions.Bundle2StringUtil.readFileAll ( new java.io.FileInputStream ( new java.io.File (basePath, bundlePath)));
var contentStr = content.replaceAll ("\\s*#.*[\\r\\n]+", "").replaceAll ("\\\\", "\\\\\\\\").replaceAll ("\\t", "\\\\t").replaceAll ("\\r", "\\\\r").replaceAll ("\\n", "\\\\n").replaceAll ("\\'", "\\\\'").replaceAll ("\\\"", "\\\\\"");
var jsStr = "java.util.ResourceBundle.registerBundle(\"" + bundleName + "\", \"" + contentStr + "\");";
try {
bundlePath = bundleName.replaceAll ("\\.", "/") + ".properties.js";
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
}, "~S,~S");
c$.readFileAll = Clazz.defineMethod (c$, "readFileAll", 
function (res) {
try {
var baos =  new java.io.ByteArrayOutputStream ();
var buf =  Clazz.newArray (1024, 0);
var read = 0;
while ((read = res.read (buf)) != -1) {
baos.write (buf, 0, read);
}
res.close ();
return baos.toString ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return "Missing";
}, "java.io.InputStream");
});
