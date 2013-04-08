Clazz.declarePackage ("net.sf.j2s.lib.build");
Clazz.load (null, "net.sf.j2s.lib.build.J2SVersionDelta", ["java.io.ByteArrayOutputStream", "$.File", "$.FileInputStream", "java.util.ArrayList"], function () {
c$ = Clazz.declareType (net.sf.j2s.lib.build, "J2SVersionDelta");
c$.readFileContent = Clazz.defineMethod (c$, "readFileContent", 
($fz = function (file) {
var res = null;
var baos =  new java.io.ByteArrayOutputStream ();
var buf =  Clazz.newArray (1024, 0);
var read = 0;
try {
res =  new java.io.FileInputStream (file);
while ((read = res.read (buf)) != -1) {
baos.write (buf, 0, read);
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
} finally {
if (res != null) {
try {
res.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}
return baos.toString ();
}, $fz.isPrivate = true, $fz), "java.io.File");
c$.traverseFolder = Clazz.defineMethod (c$, "traverseFolder", 
($fz = function (file, baseFolder, oldVersion, deltas) {
var files = file.listFiles ();
if (files != null && files.length > 0) {
for (var i = 0; i < files.length; i++) {
var f = files[i];
if (f.isDirectory ()) {
net.sf.j2s.lib.build.J2SVersionDelta.traverseFolder (f, baseFolder, oldVersion, deltas);
} else {
var absPath = f.getAbsolutePath ();
var relativePath = absPath.substring (baseFolder.length + 1);
var idx = relativePath.indexOf (java.io.File.separator);
relativePath = relativePath.substring (idx + 1);
var oldPath = baseFolder + java.io.File.separator + oldVersion + java.io.File.separator + relativePath;
var oldFile =  new java.io.File (oldPath);
if (!oldFile.exists () || oldFile.length () != f.length ()) {
deltas.add (relativePath);
} else {
var content = net.sf.j2s.lib.build.J2SVersionDelta.readFileContent (f);
var oldContent = net.sf.j2s.lib.build.J2SVersionDelta.readFileContent (oldFile);
if (!content.equals (oldContent)) {
deltas.add (relativePath);
}}}}
}}, $fz.isPrivate = true, $fz), "java.io.File,~S,~S,java.util.List");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
if (args == null || args.length != 3) {
System.out.println ("Usage:\r\nJ2SVersionDelta <base folder> <original version alias> <updated version alias>");
return ;
}var oldVersion = args[1];
var newVersion = args[2];
var originalFolder =  new java.io.File (args[0], oldVersion);
var updatedFolder =  new java.io.File (args[0], newVersion);
if (!originalFolder.exists ()) {
System.out.println ("Folder " + oldVersion + " does not exist!");
return ;
}if (!updatedFolder.exists ()) {
System.out.println ("Folder " + newVersion + " does not exist!");
return ;
}var basePath =  new java.io.File (args[0]).getAbsolutePath ();
var deltas =  new java.util.ArrayList ();
net.sf.j2s.lib.build.J2SVersionDelta.traverseFolder (updatedFolder, basePath, oldVersion, deltas);
var size = deltas.size ();
if (size > 0) {
System.out.println ("window[\"j2s.update.delta\"] = [");
for (var i = 0; i < size; i++) {
var path = deltas.get (i);
if (i > 0) {
System.out.print ("\t\"$\", \"$\", ");
} else {
System.out.print ("\t\"" + oldVersion + "\", ");
System.out.print ("\"" + newVersion + "\", ");
}System.out.print ("\"" + path.$replace ('\\', '/') + "\"");
if (i == size - 1) {
System.out.println ();
} else {
System.out.println (",");
}}
System.out.println ("];");
} else {
System.out.println ("There is no updates!");
}}, "~A");
});
