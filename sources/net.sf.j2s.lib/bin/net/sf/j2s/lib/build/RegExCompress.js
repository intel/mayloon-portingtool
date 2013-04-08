Clazz.declarePackage ("net.sf.j2s.lib.build");
Clazz.load (null, "net.sf.j2s.lib.build.RegExCompress", ["java.io.ByteArrayOutputStream", "$.File", "$.FileInputStream", "$.FileOutputStream", "java.lang.StringBuffer", "java.util.regex.Pattern"], function () {
c$ = Clazz.declareType (net.sf.j2s.lib.build, "RegExCompress");
c$.mk = Clazz.defineMethod (c$, "mk", 
function (str, regex, replacement) {
var matcher = java.util.regex.Pattern.compile (regex).matcher (str);
matcher.reset ();
var result = matcher.find ();
if (result) {
var sb =  new StringBuffer ();
do {
if (matcher.group (10) != null) {
matcher.appendReplacement (sb, "$11 $12");
} else if (matcher.group (13) != null) {
matcher.appendReplacement (sb, "$14 $15");
} else {
matcher.appendReplacement (sb, replacement);
}result = matcher.find ();
} while (result);
matcher.appendTail (sb);
return sb.toString ();
}return str;
}, "~S,~S,~S");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var completelyCompressing = true;
var indexDelta = 0;
if (args.length % 2 == 1 && args.length > 0) {
completelyCompressing = "true".equals (args[0]);
indexDelta = 1;
}for (var i = 0; i < Math.floor ((args.length - indexDelta) / 2); i++) {
var src =  new java.io.File (args[i + i + indexDelta]);
var dest =  new java.io.File (args[i + i + 1 + indexDelta]);
net.sf.j2s.lib.build.RegExCompress.pack (src, dest, completelyCompressing);
}
}, "~A");
c$.pack = Clazz.defineMethod (c$, "pack", 
($fz = function (src, dest, completelyCompress) {
if (src.exists () && dest.exists () && (src.lastModified () <= dest.lastModified () && !src.getAbsolutePath ().equals (dest.getAbsolutePath ()))) {
return ;
}if (!src.exists ()) {
System.err.println ("Source file " + src.getAbsolutePath () + " does not exist!");
return ;
}var s = net.sf.j2s.lib.build.RegExCompress.readFileAll ( new java.io.FileInputStream (src));
var j2sKeySig = "/* http://j2s.sf.net/ */";
if (s.startsWith (j2sKeySig)) {
return ;
}if (completelyCompress) {
s = net.sf.j2s.lib.build.RegExCompress.regexCompress (s);
} else {
s = net.sf.j2s.lib.build.RegExCompress.regexCompress2 (s);
}if (!dest.getParentFile ().exists ()) {
dest.getParentFile ().mkdirs ();
}try {
var fos =  new java.io.FileOutputStream (dest);
var compressedStr = j2sKeySig + s;
fos.write (compressedStr.getBytes ());
fos.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "java.io.File,java.io.File,~B");
c$.regexCompress = Clazz.defineMethod (c$, "regexCompress", 
function (str) {
str = str.replaceAll ("(\r([^\n]))|(([^\r])\n)", "$4\r\n$2");
var ignoreCSS = false;
var cssCodes = null;
var idx1 = str.indexOf ("$WTC$$.registerCSS");
var idx2 = -1;
var idx = idx1;
while (idx != -1) {
var index = str.indexOf ("\");\r\n", idx);
if (index != -1) {
idx2 = index + 5;
ignoreCSS = true;
idx = str.indexOf ("$WTC$$.registerCSS", idx2);
} else {
break;
}}
var specialFunKey = "@324@();";
if (ignoreCSS) {
cssCodes = str.substring (idx1, idx2);
str = str.substring (0, idx1) + specialFunKey + str.substring (idx2);
}var regEx = "(\'\'|\'[^\\n\\r]*[^\\\\]\')|(\"\"|\"([^\\n\\r\\\"]|\\\\\\\")*[^\\\\]\")|(\\/\\/[^\\n\\r]*[\\n\\r])|(\\/\\*[^*]*\\*+([^\\/][^*]*\\*+)*\\/)|(\\s+(\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*))|([^\\w\\x24\\/\'\"*)\\?:]\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*)";
str = net.sf.j2s.lib.build.RegExCompress.mk (str, regEx + "|((\\b|\\x24)\\s+(\\b|\\x24))|" + "(([+\\-])\\s+([+\\-]))|" + "(\\s+)", "$1$2$8$9");
if (ignoreCSS) {
idx = str.indexOf (specialFunKey);
if (idx != -1) {
str = str.substring (0, idx) + cssCodes + str.substring (idx + specialFunKey.length);
} else {
System.err.println ("Error! Fail to ignore CSS codes!");
}}return str;
}, "~S");
c$.regexCompress2 = Clazz.defineMethod (c$, "regexCompress2", 
function (str) {
str = str.replaceAll ("(\r([^\n]))|(([^\r])\n)", "$4\r\n$2");
var ignoreCSS = false;
var cssCodes = null;
var idx1 = str.indexOf ("$WTC$$.registerCSS");
var idx2 = -1;
var idx = idx1;
while (idx != -1) {
var index = str.indexOf ("\");\r\n", idx);
if (index != -1) {
idx2 = index + 5;
ignoreCSS = true;
idx = str.indexOf ("$WTC$$.registerCSS", idx2);
} else {
break;
}}
var specialFunKey = "@324@();\r\n";
if (ignoreCSS) {
cssCodes = str.substring (idx1, idx2);
str = str.substring (0, idx1) + specialFunKey + str.substring (idx2);
}var whiteSpace = "[ \\f\\t\\v]";
var regEx = "(\'\'|\'[^\\n\\r]*[^\\\\]\')|(\"\"|\"([^\\n\\r\\\"]|\\\\\\\")*[^\\\\]\")|(\\/\\/[^\\n\\r]*[\\n\\r])|(\\/\\*[^*]*\\*+([^\\/][^*]*\\*+)*\\/)|(" + whiteSpace + "+(\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*))|" + "([^\\w\\x24\\/'\"*)\\?:]\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*)";
str = net.sf.j2s.lib.build.RegExCompress.mk (str, regEx + "|((\\b|\\x24)" + whiteSpace + "+(\\b|\\x24))|" + "(([+\\-])" + whiteSpace + "+([+\\-]))|" + "(" + whiteSpace + "+)", "$1$2$8$9");
if (ignoreCSS) {
idx = str.indexOf (specialFunKey);
if (idx != -1) {
str = str.substring (0, idx) + cssCodes + str.substring (idx + specialFunKey.length);
} else {
System.err.println ("Error! Fail to ignore CSS codes!");
}}return str;
}, "~S");
c$.readFileAll = Clazz.defineMethod (c$, "readFileAll", 
function (res) {
try {
var baos =  new java.io.ByteArrayOutputStream ();
var utf8Header =  Clazz.newArray (3, 0);
var buf =  Clazz.newArray (1024, 0);
var read = 0;
var readLen = 0;
while ((read = res.read (utf8Header, readLen, 3 - readLen)) != -1) {
readLen += read;
if (readLen == 3) {
if (utf8Header[0] == 0xef && utf8Header[1] == 0xbb && utf8Header[2] == 0xbf) {
} else {
baos.write (utf8Header);
}break;
}}
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
