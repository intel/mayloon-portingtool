Clazz.declarePackage ("net.sf.j2s.lib.build");
Clazz.load (null, "net.sf.j2s.lib.build.J2SConcat", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "java.lang.StringBuffer", "net.sf.j2s.lib.build.RegExCompress"], function () {
c$ = Clazz.declareType (net.sf.j2s.lib.build, "J2SConcat");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var completelyCompressing = true;
var indexDelta = 1;
if (args.length > 0 && ("true".equals (args[0]) || "false".equals (args[0]))) {
completelyCompressing = "true".equals (args[0]);
indexDelta++;
}var dest =  new java.io.File (args[indexDelta - 1]);
var buf =  new StringBuffer ();
var j2sKeySig = "/* http://j2s.sf.net/ */";
buf.append (j2sKeySig);
System.out.println ("To " + dest.getAbsolutePath ());
var isAllFileEarlier = dest.exists ();
if (isAllFileEarlier) {
for (var i = 0; i < args.length - 1 - indexDelta; i++) {
var src =  new java.io.File (args[indexDelta], args[i + 1 + indexDelta]);
if (!src.exists ()) {
System.err.println ("Source file " + src.getAbsolutePath () + " does not exist!");
return ;
}if (src.lastModified () > dest.lastModified ()) {
isAllFileEarlier = false;
break;
}}
if (isAllFileEarlier) {
System.out.println ("Already updated.");
return ;
}}for (var i = 0; i < args.length - 1 - indexDelta; i++) {
var src =  new java.io.File (args[indexDelta], args[i + 1 + indexDelta]);
try {
var s = net.sf.j2s.lib.build.RegExCompress.readFileAll ( new java.io.FileInputStream (src));
if (s.startsWith (j2sKeySig)) {
s = s.substring (j2sKeySig.length);
}if (s.startsWith ("Clazz.load") || s.startsWith ("$_L")) {
var idx1 = s.indexOf ("{") + 1;
if (idx1 != -1) {
var idx2 = s.lastIndexOf ("}");
if (idx2 != -1) {
s = s.substring (idx1, idx2);
}}}buf.append (s);
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
e.printStackTrace ();
return ;
} else {
throw e;
}
}
}
try {
var fos =  new java.io.FileOutputStream (dest);
fos.write ([0xef, 0xbb, 0xbf]);
if (completelyCompressing) {
fos.write (net.sf.j2s.lib.build.RegExCompress.regexCompress (buf.toString ()).getBytes ("UTF-8"));
} else {
fos.write (net.sf.j2s.lib.build.RegExCompress.regexCompress2 (buf.toString ()).getBytes ("UTF-8"));
}fos.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, "~A");
});
