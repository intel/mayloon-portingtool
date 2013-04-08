Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (["net.sf.j2s.core.compiler.IExtendedCompiler"], "net.sf.j2s.core.compiler.J2SDependencyCompiler", ["java.io.File", "$.FileInputStream", "$.FileWriter", "java.lang.RuntimeException", "$.StringBuffer", "java.util.ArrayList", "$.Properties", "net.sf.j2s.core.astvisitors.DependencyASTVisitor", "net.sf.j2s.core.builder.SourceFileProxy", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.core.dom.ASTParser"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.compiler, "J2SDependencyCompiler", null, net.sf.j2s.core.compiler.IExtendedCompiler);
Clazz.overrideMethod (c$, "process", 
function (sourceUnit, binaryFolder) {
var prjFolder = binaryFolder.getProject ().getLocation ().toOSString ();
var file =  new java.io.File (prjFolder, ".j2s");
if (!file.exists ()) {
return ;
}var props =  new java.util.Properties ();
try {
props.load ( new java.io.FileInputStream (file));
var status = props.getProperty ("j2s.compiler.status");
if (!"enable".equals (status)) {
return ;
}var dependencyStatus = props.getProperty ("j2s.compiler.dependency.status");
if (dependencyStatus != null && !"enable".equals (status)) {
return ;
}} catch (e$$) {
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
var binFolder = binaryFolder.getLocation ().toOSString ();
var list = null;
var resPaths = props.getProperty ("j2s.resources.list");
if (resPaths == null || resPaths.trim ().length == 0) {
list =  new java.util.ArrayList ();
} else {
var splits = resPaths.$plit (",");
list =  new java.util.ArrayList ();
for (var i = 0; i < splits.length; i++) {
list.add (splits[i]);
}
}var abandonedList = null;
var abandonedPaths = props.getProperty ("j2s.abandoned.resources.list");
if (abandonedPaths == null || abandonedPaths.trim ().length == 0) {
abandonedList =  new java.util.ArrayList ();
} else {
var splits = abandonedPaths.$plit (",");
abandonedList =  new java.util.ArrayList ();
for (var i = 0; i < splits.length; i++) {
abandonedList.add (splits[i]);
}
}if (Clazz.instanceOf (sourceUnit, net.sf.j2s.core.builder.SourceFile)) {
var unitSource = sourceUnit;
var fileName =  String.instantialize (unitSource.getFileName ());
var idx = fileName.lastIndexOf ('/');
var className = fileName.substring (idx + 1, fileName.lastIndexOf ('.'));
var path =  new StringBuffer ();
var pkgs = unitSource.getPackageName ();
for (var j = 0; j < pkgs.length; j++) {
path.append ( String.instantialize (pkgs[j]));
path.append ("/");
}
path.append (className);
path.append (".js");
var jsPath = binaryFolder.getProjectRelativePath ().toPortableString () + "/" + path.toString ();
if (!list.contains (jsPath) && !abandonedList.contains (jsPath)) {
list.add (jsPath);
}}var buf =  new StringBuffer ();
for (var iter = list.iterator (); iter.hasNext (); ) {
var path = iter.next ();
buf.append (path);
if (iter.hasNext ()) {
buf.append (",");
}}
var root;
var astParser = org.eclipse.jdt.core.dom.ASTParser.newParser (3);
if (Clazz.instanceOf (sourceUnit, net.sf.j2s.core.builder.SourceFile)) {
var unitSource = sourceUnit;
var createdUnit = org.eclipse.jdt.core.JavaCore.createCompilationUnitFrom ( new net.sf.j2s.core.builder.SourceFileProxy (unitSource).getResource ());
astParser.setResolveBindings (true);
astParser.setSource (createdUnit);
root = astParser.createAST (null);
var visitor =  new net.sf.j2s.core.astvisitors.DependencyASTVisitor ();
var errorOccurs = false;
try {
root.accept (visitor);
} catch (e) {
e.printStackTrace ();
errorOccurs = true;
}
if (!errorOccurs) {
net.sf.j2s.core.compiler.J2SDependencyCompiler.outputJavaScript (visitor, root, binFolder);
} else {
var folderPath = binFolder;
var elementName = root.getJavaElement ().getElementName ();
elementName = elementName.substring (0, elementName.lastIndexOf ('.'));
var packageName = visitor.getPackageName ();
if (packageName != null) {
var folder =  new java.io.File (folderPath, packageName.$replace ('.', java.io.File.separatorChar));
folderPath = folder.getAbsolutePath ();
var jsFile =  new java.io.File (folderPath, elementName + ".jz");
if (jsFile.exists ()) {
jsFile.$delete ();
}}}}}, "org.eclipse.jdt.internal.compiler.env.ICompilationUnit,org.eclipse.core.resources.IContainer");
c$.outputJavaScript = Clazz.defineMethod (c$, "outputJavaScript", 
function (visitor, fRoot, folderPath) {
var js = visitor.getBuffer ().toString ();
var elementName = fRoot.getJavaElement ().getElementName ();
elementName = elementName.substring (0, elementName.lastIndexOf ('.'));
var packageName = visitor.getPackageName ();
if (packageName != null) {
var folder =  new java.io.File (folderPath, packageName.$replace ('.', java.io.File.separatorChar));
folderPath = folder.getAbsolutePath ();
if (!folder.exists () || !folder.isDirectory ()) {
if (!folder.mkdirs ()) {
throw  new RuntimeException ("Failed to create folder " + folderPath);
}}}var jsFile =  new java.io.File (folderPath, elementName + ".jz");
var fileWriter = null;
try {
fileWriter =  new java.io.FileWriter (jsFile);
fileWriter.write (js);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
} finally {
if (fileWriter != null) {
try {
fileWriter.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}
}, "net.sf.j2s.core.astvisitors.DependencyASTVisitor,org.eclipse.jdt.core.dom.CompilationUnit,~S");
});
