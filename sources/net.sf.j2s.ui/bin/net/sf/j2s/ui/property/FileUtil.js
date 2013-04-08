Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (null, "net.sf.j2s.ui.property.FileUtil", ["java.io.File", "$.FileOutputStream", "java.lang.StringBuffer"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.property, "FileUtil");
c$.saveInputStreamAsFile = Clazz.defineMethod (c$, "saveInputStreamAsFile", 
function (is, file) {
var buf =  Clazz.newArray (1024, 0);
try {
var fos =  new java.io.FileOutputStream (file);
var read = 0;
while ((read = is.read (buf)) != -1) {
fos.write (buf, 0, read);
}
fos.close ();
is.close ();
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
}, "java.io.InputStream,java.io.File");
c$.toRelativePath = Clazz.defineMethod (c$, "toRelativePath", 
function (absPath, basePath) {
try {
var absFile =  new java.io.File (absPath).getCanonicalFile ();
var baseFile =  new java.io.File (basePath).getCanonicalFile ();
var absURL = absFile.toURL ().toString ();
var baseURL = baseFile.toURL ().toString ();
if (absURL.startsWith (baseURL)) {
var relativeURL = absURL.substring (baseURL.length);
if (relativeURL.startsWith ("/") || relativeURL.startsWith ("\\")) {
relativeURL = relativeURL.substring (1);
}return relativeURL;
}var index = absURL.indexOf ('/');
var lastIndex = index;
while (index != -1) {
var partURL = absURL.substring (0, index);
if (!baseURL.startsWith (partURL + "/") && !baseURL.equals (partURL)) {
break;
}lastIndex = index;
index = absURL.indexOf ('/', lastIndex + 1);
}
absURL = absURL.substring (lastIndex + 1);
baseURL = baseURL.substring (lastIndex + 1);
var parts = baseURL.$plit ("\\/");
var length = parts.length;
if (baseFile.isFile ()) {
length--;
}var buffer =  new StringBuffer ();
for (var i = 0; i < length; i++) {
buffer.append ("../");
}
buffer.append (absURL);
return buffer.toString ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.net.MalformedURLException)) {
var e = e$$;
{
e.printStackTrace ();
return null;
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
e.printStackTrace ();
return null;
}
} else {
throw e$$;
}
}
}, "~S,~S");
});
