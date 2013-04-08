Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (["net.sf.j2s.core.compiler.IExtendedCompiler"], "net.sf.j2s.core.compiler.Java2ScriptCompiler", ["com.neilmix.narrativejs.CompilerMain", "java.io.File", "$.FileInputStream", "$.FileOutputStream", "java.lang.RuntimeException", "$.StringBuffer", "$.Thread", "java.util.ArrayList", "$.HashMap", "$.Properties", "java.util.regex.Pattern", "net.sf.j2s.core.Java2ScriptProjectNature", "net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor", "$.ASTScriptVisitor", "$.ASTVariableVisitor", "$.DependencyASTVisitor", "$.NameConvertItem", "$.SWTDependencyASTVisitor", "$.SWTScriptVisitor", "net.sf.j2s.core.builder.SourceFileProxy", "net.sf.j2s.core.compiler.ExtendedVisitors", "$.FileUtil", "$.RegExCompress", "net.sf.j2s.core.hotspot.InnerHotspotServer", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.core.dom.ASTParser"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.compiler, "Java2ScriptCompiler", null, net.sf.j2s.core.compiler.IExtendedCompiler);
Clazz.overrideMethod (c$, "process", 
function (sourceUnit, binaryFolder) {
var project = binaryFolder.getProject ();
{
if (net.sf.j2s.core.Java2ScriptProjectNature.hasJavaBuilder (project)) {
if (net.sf.j2s.core.Java2ScriptProjectNature.removeJavaBuilder (project)) {
 new Thread (((Clazz.isClassDefined ("net.sf.j2s.core.compiler.Java2ScriptCompiler$1") ? 0 : net.sf.j2s.core.compiler.Java2ScriptCompiler.$Java2ScriptCompiler$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.core.compiler.Java2ScriptCompiler$1, this, Clazz.cloneFinals ("project", project)))).start ();
return ;
}}}var prjFolder = project.getLocation ().toOSString ();
var file =  new java.io.File (prjFolder, ".j2s");
if (!file.exists ()) {
return ;
}var props =  new java.util.Properties ();
try {
props.load ( new java.io.FileInputStream (file));
var status = props.getProperty ("j2s.compiler.status");
if (!"enable".equals (status)) {
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
props.setProperty ("j2s.resources.list", buf.toString ());
props.setProperty ("j2s.output.path", binaryFolder.getProjectRelativePath ().toPortableString ());
try {
props.store ( new java.io.FileOutputStream (file), "Java2Script Configuration");
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
var root;
var astParser = org.eclipse.jdt.core.dom.ASTParser.newParser (3);
if (Clazz.instanceOf (sourceUnit, net.sf.j2s.core.builder.SourceFile)) {
var unitSource = sourceUnit;
var createdUnit = org.eclipse.jdt.core.JavaCore.createCompilationUnitFrom ( new net.sf.j2s.core.builder.SourceFileProxy (unitSource).getResource ());
astParser.setResolveBindings (true);
astParser.setSource (createdUnit);
root = astParser.createAST (null);
var dvisitor = null;
var visitorID = props.getProperty ("j2s.compiler.visitor");
var extVisitor = null;
if ("ASTScriptVisitor".equals (visitorID)) {
dvisitor =  new net.sf.j2s.core.astvisitors.DependencyASTVisitor ();
} else if ("SWTScriptVisitor".equals (visitorID)) {
dvisitor =  new net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor ();
} else {
if (visitorID != null && visitorID.length != 0) {
extVisitor = net.sf.j2s.core.compiler.ExtendedVisitors.getExistedVisitor (visitorID);
if (extVisitor != null) {
dvisitor = extVisitor.getDependencyVisitor ();
}}if (dvisitor == null) {
dvisitor =  new net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor ();
}}var errorOccurs = false;
try {
root.accept (dvisitor);
} catch (e) {
e.printStackTrace ();
errorOccurs = true;
}
if (!errorOccurs) {
} else {
var folderPath = binFolder;
var elementName = root.getJavaElement ().getElementName ();
elementName = elementName.substring (0, elementName.lastIndexOf ('.'));
var packageName = dvisitor.getPackageName ();
if (packageName != null) {
var folder =  new java.io.File (folderPath, packageName.$replace ('.', java.io.File.separatorChar));
folderPath = folder.getAbsolutePath ();
var jsFile =  new java.io.File (folderPath, elementName + ".js");
if (jsFile.exists ()) {
jsFile.$delete ();
}}return ;
}var visitor = null;
if ("ASTScriptVisitor".equals (visitorID)) {
visitor =  new net.sf.j2s.core.astvisitors.ASTScriptVisitor ();
} else if ("SWTScriptVisitor".equals (visitorID)) {
visitor =  new net.sf.j2s.core.astvisitors.SWTScriptVisitor ();
} else {
if (extVisitor != null) {
visitor = extVisitor.getScriptVisitor ();
}if (visitor == null) {
visitor =  new net.sf.j2s.core.astvisitors.SWTScriptVisitor ();
}}var isDebugging = "debug".equals (props.getProperty ("j2s.compiler.mode"));
visitor.setDebugging (isDebugging);
dvisitor.setDebugging (isDebugging);
var toCompress = "release".equals (props.getProperty ("j2s.compiler.mode"));
(visitor.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).setToCompileVariableName (toCompress);
dvisitor.setToCompileVariableName (toCompress);
if (toCompress) {
net.sf.j2s.core.compiler.Java2ScriptCompiler.updateJ2SMap (prjFolder);
}errorOccurs = false;
try {
root.accept (visitor);
} catch (e) {
e.printStackTrace ();
errorOccurs = true;
}
if (!errorOccurs) {
net.sf.j2s.core.compiler.Java2ScriptCompiler.outputJavaScript (visitor, dvisitor, root, binFolder, props);
} else {
var folderPath = binFolder;
var elementName = root.getJavaElement ().getElementName ();
elementName = elementName.substring (0, elementName.lastIndexOf ('.'));
var packageName = visitor.getPackageName ();
if (packageName != null) {
var folder =  new java.io.File (folderPath, packageName.$replace ('.', java.io.File.separatorChar));
folderPath = folder.getAbsolutePath ();
var jsFile =  new java.io.File (folderPath, elementName + ".js");
if (jsFile.exists ()) {
jsFile.$delete ();
}}}}}, "org.eclipse.jdt.internal.compiler.env.ICompilationUnit,org.eclipse.core.resources.IContainer");
c$.updateJ2SMap = Clazz.defineMethod (c$, "updateJ2SMap", 
function (prjFolder) {
var j2sMap =  new java.io.File (prjFolder, ".j2smap");
if (j2sMap.exists ()) {
var mapStr = net.sf.j2s.core.compiler.FileUtil.readSource (j2sMap);
if (mapStr != null) {
var lastClassName = null;
var varList =  new java.util.HashMap ();
var lines = mapStr.$plit ("\r\n|\r|\n");
for (var j = 0; j < lines.length; j++) {
var line = lines[j].trim ();
if (line.length > 0) {
if (!line.startsWith ("#")) {
var index = line.indexOf ("=");
if (index != -1) {
var key = line.substring (0, index).trim ();
var toVarName = line.substring (index + 1).trim ();
var isMethod = true;
var idx = key.lastIndexOf ('#');
if (idx == -1) {
isMethod = false;
idx = key.lastIndexOf ('.');
if (idx == -1) {
continue ;}}var className = key.substring (0, idx);
if (className.startsWith ("$")) {
if (lastClassName != null) {
className = className.replaceAll ("\\$", lastClassName);
} else {
className = className.replaceAll ("\\$", "");
lastClassName = className;
}} else {
lastClassName = className;
}var varName = key.substring (idx + 1);
if (isMethod) {
key = className + "#" + varName;
} else {
key = className + "." + varName;
}varList.put (key,  new net.sf.j2s.core.astvisitors.NameConvertItem (className, varName, toVarName, isMethod));
}}}}
net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.setJ2SMap (varList);
return ;
}}net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.setJ2SMap (null);
}, "~S");
c$.outputJavaScript = Clazz.defineMethod (c$, "outputJavaScript", 
function (visitor, dvisitor, fRoot, folderPath, props) {
var js = dvisitor.getDependencyScript (visitor.getBuffer ());
var lineBreak = props.getProperty ("j2s.compiler.linebreak");
var whiteSpace = props.getProperty ("j2s.compiler.whitespace");
if (lineBreak != null && whiteSpace != null && lineBreak.length == 0 && whiteSpace.equals ("false")) {
js = net.sf.j2s.core.compiler.RegExCompress.regexCompress (js);
} else {
if (lineBreak != null) {
if (!lineBreak.equals ("\r\n")) {
if ("\r".equals (lineBreak)) {
js = js.replaceAll ("\\r\\n", "\r");
} else if ("\n".equals (lineBreak)) {
js = js.replaceAll ("\\r\\n", "\n");
} else if (lineBreak.length == 0) {
js = js.replaceAll ("\\r\\n", "");
}}}if (whiteSpace != null) {
if (whiteSpace.equals ("false")) {
js = net.sf.j2s.core.compiler.RegExCompress.regexCompress2 (js);
}}}js = js.replaceAll ("cla\\$\\$", "c\\$").replaceAll ("i$", "i\\$").replaceAll ("v$", "v\\$").replaceAll ("\\.b$", "\\.b\\$").replaceAll ("\\.\\$finals", "\\.f\\$");
var abbr = props.getProperty ("j2s.compiler.abbreviation");
if (abbr != null) {
if (abbr.equals ("true")) {
var abbrPrefix = props.getProperty ("j2s.compiler.abbreviation.prefix");
if (abbrPrefix == null) {
abbrPrefix = "$_";
}abbrPrefix = abbrPrefix.replaceAll ("\\$", "\\\\\\$");
var clazzAll = net.sf.j2s.core.compiler.Java2ScriptCompiler.getClazzAbbrMap ();
var buf =  new StringBuffer ();
for (var i = 0; i < Math.floor (clazzAll.length / 2); i++) {
var method = clazzAll[i + i].substring (6);
if ("pu$h".equals (method)) {
method = "pu\\$h";
}buf.append ("(Clazz\\." + method + ")");
if (i < Math.floor (clazzAll.length / 2) - 1) {
buf.append ("|");
}}
var matcher = java.util.regex.Pattern.compile (buf.toString ()).matcher (js);
matcher.reset ();
var result = matcher.find ();
if (result) {
var sb =  new StringBuffer ();
do {
var groupCount = matcher.groupCount ();
for (var i = 0; i < groupCount; i++) {
var group = matcher.group (i);
if (group != null && group.length != 0) {
for (var j = 0; j < Math.floor (clazzAll.length / 2); j++) {
if (group.equals (clazzAll[j + j])) {
matcher.appendReplacement (sb, abbrPrefix + clazzAll[j + j + 1]);
break;
}}
break;
}}
result = matcher.find ();
} while (result);
matcher.appendTail (sb);
js = sb.toString ();
}}}var elementName = fRoot.getJavaElement ().getElementName ();
elementName = elementName.substring (0, elementName.lastIndexOf ('.'));
var packageName = visitor.getPackageName ();
if (packageName != null) {
var folder =  new java.io.File (folderPath, packageName.$replace ('.', java.io.File.separatorChar));
folderPath = folder.getAbsolutePath ();
if (!folder.exists () || !folder.isDirectory ()) {
if (!folder.mkdirs ()) {
throw  new RuntimeException ("Failed to create folder " + folderPath);
}}net.sf.j2s.core.hotspot.InnerHotspotServer.addCompiledItem (packageName + "." + elementName);
} else {
net.sf.j2s.core.hotspot.InnerHotspotServer.addCompiledItem (elementName);
}var jsExtension = ".js";
var jsFile =  new java.io.File (folderPath, elementName + jsExtension);
try {
var fos =  new java.io.FileOutputStream (jsFile);
fos.write ([0xef, 0xbb, 0xbf]);
fos.write (js.getBytes ("UTF-8"));
fos.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
if (jsExtension.equals (".njs")) {
try {
com.neilmix.narrativejs.CompilerMain.main ([jsFile.getAbsolutePath ()]);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}var classNameSet = dvisitor.getClassNames ();
if (classNameSet.length > 1) {
var buffer =  new StringBuffer ();
var key = "ClazzLoader.jarClasspath (path + \"" + elementName + ".js\", [";
buffer.append (key + "\r\n");
net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buffer, classNameSet, null, ",\r\n");
buffer.append ("]);\r\n");
var s = props.getProperty ("package.js");
if (s == null || s.length == 0) {
s = "package.js";
}var f =  new java.io.File (folderPath, s);
var source = null;
if (f.exists ()) {
source = net.sf.j2s.core.compiler.FileUtil.readSource (f);
var index = source.indexOf (key);
var updated = false;
if (index != -1) {
var index2 = source.indexOf ("]);", index + key.length);
if (index2 != -1) {
source = source.substring (0, index) + buffer.toString () + source.substring (index2 + 5);
updated = true;
}}if (!updated) {
source += buffer.toString ();
}}if (source == null) {
var pkgName = null;
if (packageName == null || packageName.length == 0) {
pkgName = "package";
} else {
pkgName = packageName + ".package";
}source = "var path = ClazzLoader.getClasspathFor (\"" + pkgName + "\");\r\n" + "path = path.substring (0, path.lastIndexOf (\"package.js\"));\r\n";
source += buffer.toString ();
}try {
var fos =  new java.io.FileOutputStream (f);
fos.write (source.getBytes ());
fos.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}, "net.sf.j2s.core.astvisitors.ASTScriptVisitor,net.sf.j2s.core.astvisitors.DependencyASTVisitor,org.eclipse.jdt.core.dom.CompilationUnit,~S,java.util.Properties");
c$.getClazzAbbrMap = Clazz.defineMethod (c$, "getClazzAbbrMap", 
function () {
var clazzAll = ["Clazz.load", "L", "Clazz.declareAnonymous", "W", "Clazz.declareType", "T", "Clazz.declarePackage", "J", "Clazz.decorateAsClass", "C", "Clazz.instantialize", "Z", "Clazz.declareInterface", "I", "Clazz.isClassDefined", "D", "Clazz.pu$h", "H", "Clazz.p0p", "P", "Clazz.prepareCallback", "B", "Clazz.innerTypeInstance", "N", "Clazz.makeConstructor", "K", "Clazz.superCall", "U", "Clazz.superConstructor", "R", "Clazz.defineMethod", "M", "Clazz.overrideMethod", "V", "Clazz.defineStatics", "S", "Clazz.defineEnumConstant", "E", "Clazz.cloneFinals", "F", "Clazz.prepareFields", "Y", "Clazz.newArray", "A", "Clazz.instanceOf", "O", "Clazz.exceptionOf", "e", "Clazz.inheritArgs", "G", "Clazz.checkPrivateMethod", "X", "Clazz.makeFunction", "Q", "Clazz.registerSerializableFields", "s"];
return clazzAll;
});
c$.$Java2ScriptCompiler$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.core.compiler, "Java2ScriptCompiler$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
try {
Concurrent.Thread.sleep(50);
} catch (e1) {
if (Clazz.instanceOf (e1, InterruptedException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
try {
this.f$.project.build (15, null);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
c$ = Clazz.p0p ();
};
});
