Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (["java.util.HashMap"], "net.sf.j2s.core.compiler.ExtendedVisitors", ["org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.compiler, "ExtendedVisitors");
c$.checkExtensionPoints = Clazz.defineMethod (c$, "checkExtensionPoints", 
($fz = function () {
if (net.sf.j2s.core.compiler.ExtendedVisitors.isExtensionPointsChecked) {
return ;
}($t$ = net.sf.j2s.core.compiler.ExtendedVisitors.isExtensionPointsChecked = true, net.sf.j2s.core.compiler.ExtendedVisitors.prototype.isExtensionPointsChecked = net.sf.j2s.core.compiler.ExtendedVisitors.isExtensionPointsChecked, $t$);
var extensionRegistry = org.eclipse.core.runtime.Platform.getExtensionRegistry ();
var extensionPoint = extensionRegistry.getExtensionPoint ("net.sf.j2s.core.extendedASTScriptVisitor");
if (extensionPoint == null) {
return ;
}var extensions = extensionPoint.getExtensions ();
for (var i = 0; i < extensions.length; i++) {
var extension = extensions[i];
var elements = extension.getConfigurationElements ();
for (var j = 0; j < elements.length; j++) {
var element = elements[j];
if ("extendedASTScriptVisitor".equals (element.getName ())) {
var className = element.getAttribute ("class");
var id = element.getAttribute ("id");
if (className != null && className.trim ().length != 0 && id != null && id.trim ().length != 0) {
try {
var callback = element.createExecutableExtension ("class");
if (Clazz.instanceOf (callback, net.sf.j2s.core.compiler.IExtendedVisitor)) {
net.sf.j2s.core.compiler.ExtendedVisitors.visitors.put (id.trim (), callback);
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
function (visitorID, visitor) {
if (visitorID != null && visitorID.trim ().length != 0 && visitor != null) {
net.sf.j2s.core.compiler.ExtendedVisitors.visitors.put (visitorID, visitor);
}}, "~S,net.sf.j2s.core.compiler.IExtendedVisitor");
c$.deregister = Clazz.defineMethod (c$, "deregister", 
function (visitorID) {
if (visitorID != null && visitorID.trim ().length != 0) {
return net.sf.j2s.core.compiler.ExtendedVisitors.visitors.remove (visitorID);
}return null;
}, "~S");
c$.getExistedVisitors = Clazz.defineMethod (c$, "getExistedVisitors", 
function () {
net.sf.j2s.core.compiler.ExtendedVisitors.checkExtensionPoints ();
return net.sf.j2s.core.compiler.ExtendedVisitors.visitors.values ().toArray ( new Array (0));
});
c$.getExistedVisitor = Clazz.defineMethod (c$, "getExistedVisitor", 
function (id) {
net.sf.j2s.core.compiler.ExtendedVisitors.checkExtensionPoints ();
return net.sf.j2s.core.compiler.ExtendedVisitors.visitors.get (id);
}, "~S");
c$.visitors = c$.prototype.visitors =  new java.util.HashMap ();
Clazz.defineStatics (c$,
"isExtensionPointsChecked", false);
});
