Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (["java.util.HashMap"], "net.sf.j2s.core.compiler.ExtendedCompilers", ["org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.compiler, "ExtendedCompilers");
c$.checkExtensionPoints = Clazz.defineMethod (c$, "checkExtensionPoints", 
($fz = function () {
if (net.sf.j2s.core.compiler.ExtendedCompilers.isExtensionPointsChecked) {
return ;
}($t$ = net.sf.j2s.core.compiler.ExtendedCompilers.isExtensionPointsChecked = true, net.sf.j2s.core.compiler.ExtendedCompilers.prototype.isExtensionPointsChecked = net.sf.j2s.core.compiler.ExtendedCompilers.isExtensionPointsChecked, $t$);
var extensionRegistry = org.eclipse.core.runtime.Platform.getExtensionRegistry ();
var extensionPoint = extensionRegistry.getExtensionPoint ("net.sf.j2s.core.extendedCompiler");
if (extensionPoint == null) {
return ;
}var extensions = extensionPoint.getExtensions ();
for (var i = 0; i < extensions.length; i++) {
var extension = extensions[i];
var elements = extension.getConfigurationElements ();
for (var j = 0; j < elements.length; j++) {
var element = elements[j];
if ("extendedCompiler".equals (element.getName ())) {
var className = element.getAttribute ("class");
var id = element.getAttribute ("id");
if (className != null && className.trim ().length != 0 && id != null && id.trim ().length != 0) {
try {
var callback = element.createExecutableExtension ("class");
if (Clazz.instanceOf (callback, net.sf.j2s.core.compiler.IExtendedCompiler)) {
net.sf.j2s.core.compiler.ExtendedCompilers.compilers.put (id.trim (), callback);
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}}
}
}, $fz.isPrivate = true, $fz));
c$.register = Clazz.defineMethod (c$, "register", 
function (compilerID, compiler) {
if (compilerID != null && compilerID.trim ().length != 0 && compiler != null) {
net.sf.j2s.core.compiler.ExtendedCompilers.compilers.put (compilerID, compiler);
}}, "~S,net.sf.j2s.core.compiler.IExtendedCompiler");
c$.deregister = Clazz.defineMethod (c$, "deregister", 
function (compilerID) {
if (compilerID != null && compilerID.trim ().length != 0) {
return net.sf.j2s.core.compiler.ExtendedCompilers.compilers.remove (compilerID);
}return null;
}, "~S");
c$.process = Clazz.defineMethod (c$, "process", 
function (sourceUnit, binFolder) {
net.sf.j2s.core.compiler.ExtendedCompilers.checkExtensionPoints ();
if (!net.sf.j2s.core.compiler.ExtendedCompilers.compilers.isEmpty ()) {
for (var iter = net.sf.j2s.core.compiler.ExtendedCompilers.compilers.values ().iterator (); iter.hasNext (); ) {
var compiler = iter.next ();
try {
compiler.process (sourceUnit, binFolder);
} catch (e) {
e.printStackTrace ();
}
}
}}, "org.eclipse.jdt.internal.compiler.env.ICompilationUnit,org.eclipse.core.resources.IContainer");
c$.compilers = c$.prototype.compilers =  new java.util.HashMap ();
Clazz.defineStatics (c$,
"isExtensionPointsChecked", false);
});
