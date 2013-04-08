Clazz.declarePackage ("net.sf.j2s.ui.classpath");
Clazz.load (null, "net.sf.j2s.ui.classpath.PathUtil", ["java.io.ByteArrayInputStream", "$.File", "$.FileInputStream", "$.FileOutputStream", "$.FileReader", "java.lang.StringBuffer", "java.util.ArrayList", "$.Properties", "net.sf.j2s.ui.classpath.CompositeResources"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.classpath, "PathUtil");
c$.hello = Clazz.defineMethod (c$, "hello", 
function () {
var prjFolder = "S:\\eclipse-3.1.1\\eclipse\\workspace\\my.self\\";
var file =  new java.io.File (prjFolder, ".j2s");
var props =  new java.util.Properties ();
if (file.exists ()) {
try {
props.load ( new java.io.FileInputStream (file));
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e1 = e$$;
{
e1.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e1 = e$$;
{
e1.printStackTrace ();
}
} else {
throw e$$;
}
}
}var list = ["console.css", "j2score/navtiveconsole.js", "lib/j2s.core-common.z.js", "/swt.jface/.j2s", "lib/hello.j2s", "bin/net/sf/j2s/hello/HelloWorld.js", "bin/net/sf/j2s/hello/HelloJ2S.js"];
props.setProperty ("j2s.output.path", "bin");
props.setProperty ("j2s.resources.list", net.sf.j2s.ui.classpath.PathUtil.joinArray (list, ","));
var classes = net.sf.j2s.ui.classpath.PathUtil.getClasses (props);
for (var i = 0; i < classes.length; i++) {
System.out.println (classes[i]);
}
try {
props.store ( new java.io.FileOutputStream (file), "Java2Script Configuration");
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
});
c$.getResources = Clazz.defineMethod (c$, "getResources", 
function (props) {
var listStr = props.getProperty ("j2s.resources.list");
if (listStr != null) {
var splits = listStr.$plit (",");
return splits;
}return  new Array (0);
}, "java.util.Properties");
c$.getAbandonedResources = Clazz.defineMethod (c$, "getAbandonedResources", 
function (props) {
var listStr = props.getProperty ("j2s.abandoned.resources.list");
if (listStr != null) {
var splits = listStr.$plit (",");
return splits;
}return  new Array (0);
}, "java.util.Properties");
c$.convertClassName = Clazz.defineMethod (c$, "convertClassName", 
function (path, binPath) {
if (binPath != null) {
if (!binPath.endsWith ("/")) {
binPath += "/";
}}if (path != null && path.endsWith (".js")) {
if (binPath != null && path.startsWith (binPath)) {
path = path.substring (binPath.length);
}path = path.substring (0, path.length - 3);
return path.$replace ('/', '.');
}return null;
}, "~S,~S");
c$.getClasses = Clazz.defineMethod (c$, "getClasses", 
function (props) {
var list =  new java.util.ArrayList ();
var listStr = props.getProperty ("j2s.resources.list");
if (listStr != null) {
var splits = listStr.$plit (",");
var binPath = props.getProperty ("j2s.output.path");
if (binPath != null) {
if (!binPath.endsWith ("/")) {
binPath += "/";
}}for (var i = 0; i < splits.length; i++) {
if (splits[i] != null && splits[i].endsWith (".js")) {
if (binPath != null && splits[i].startsWith (binPath)) {
splits[i] = splits[i].substring (binPath.length);
}splits[i] = splits[i].substring (0, splits[i].length - 3);
list.add (splits[i].$replace ('/', '.'));
}}
}return list.toArray ( new Array (0));
}, "java.util.Properties");
c$.addClass = Clazz.defineMethod (c$, "addClass", 
function (props, className) {
var binPath = props.getProperty ("j2s.output.path");
if (binPath == null) {
binPath = "";
} else {
if (!binPath.endsWith ("/")) {
binPath += "/";
}}var listStr = props.getProperty ("j2s.resources.list");
if (listStr == null) {
props.setProperty ("j2s.resources.list", binPath + className.$replace ('.', '/') + ".js");
} else {
var list = listStr.$plit (",");
var existed = false;
for (var i = 0; i < list.length; i++) {
if (className.equals (list[i])) {
existed = true;
break;
}}
if (!existed) {
props.setProperty ("j2s.resources.list", listStr + "," + binPath + className.$replace ('.', '/') + ".js");
}}}, "java.util.Properties,~S");
c$.joinArray = Clazz.defineMethod (c$, "joinArray", 
function (list, seperator) {
var buf =  new StringBuffer ();
for (var i = 0; i < list.length; i++) {
buf.append (list[i]);
if (i != list.length - 1) {
buf.append (seperator);
}}
var listStr = buf.toString ();
return listStr;
}, "~A,~S");
c$.loadJZ = Clazz.defineMethod (c$, "loadJZ", 
function (file) {
var props =  new java.util.Properties ();
if (file.exists ()) {
try {
var reader =  new java.io.FileReader (file);
var buf =  Clazz.newArray (1024, '\0');
var buffer =  new StringBuffer ();
var read = 0;
var isStarted = false;
while ((read = reader.read (buf)) != -1) {
buffer.append (buf, 0, read);
if (buffer.length () > 10) {
if (buffer.toString ().startsWith ("/*=j2s=")) {
isStarted = true;
} else {
return props;
}}if (isStarted) {
if (buffer.indexOf ("=*/") != -1) {
break;
}}}
reader.close ();
if (isStarted) {
var str = buffer.toString ();
var idx1 = str.indexOf ('\n', 7);
if (idx1 != -1) {
var idx2 = str.indexOf ("=*/", idx1);
if (idx2 != -1) {
str = str.substring (idx1 + 1, idx2);
props.load ( new java.io.ByteArrayInputStream (str.getBytes ()));
}}}} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e1 = e$$;
{
e1.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e1 = e$$;
{
e1.printStackTrace ();
}
} else {
throw e$$;
}
}
}return props;
}, "java.io.File");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var prjFolder = "S:\\eclipse-3.1.1\\eclipse\\workspace\\my.self\\";
var file =  new java.io.File (prjFolder, ".j2s");
var res =  new net.sf.j2s.ui.classpath.CompositeResources ();
res.setFolder (file.getParentFile ());
res.setRelativePath (file.getName ());
res.load ();
var list = res.getChildren ();
for (var i = 0; i < list.length; i++) {
var item = list[i];
System.out.println (item.getName ());
var exists = item.exists ();
System.out.println (exists);
if (exists) {
if (Clazz.instanceOf (item, net.sf.j2s.ui.classpath.IClasspathContainer)) {
var pc = item;
pc.load ();
var children = pc.getChildren ();
for (var j = 0; j < children.length; j++) {
System.out.println ("--" + children[j].getName ());
}
}}}
System.out.println (res.toHTMLString ());
var prop2 =  new java.util.Properties ();
res.store (prop2);
try {
prop2.store ( new java.io.FileOutputStream ( new java.io.File ("x.j2s")), "Hello");
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, "~A");
Clazz.defineStatics (c$,
"J2S_RESOURCES_LIST", "j2s.resources.list",
"J2S_ABANDOMED_RESOURCES_LIST", "j2s.abandoned.resources.list",
"J2S_OUTPUT_PATH", "j2s.output.path");
});
