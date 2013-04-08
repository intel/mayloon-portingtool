Clazz.declarePackage ("net.sf.j2s.ui.resources");
Clazz.load (["java.util.HashMap"], "net.sf.j2s.ui.resources.ExternalResources", ["java.util.ArrayList", "org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.resources, "ExternalResources");
c$.checkExtensionPoints = Clazz.defineMethod (c$, "checkExtensionPoints", 
($fz = function () {
if (net.sf.j2s.ui.resources.ExternalResources.isExtensionPointsChecked) {
return ;
}($t$ = net.sf.j2s.ui.resources.ExternalResources.isExtensionPointsChecked = true, net.sf.j2s.ui.resources.ExternalResources.prototype.isExtensionPointsChecked = net.sf.j2s.ui.resources.ExternalResources.isExtensionPointsChecked, $t$);
var extensionRegistry = org.eclipse.core.runtime.Platform.getExtensionRegistry ();
var extensionPoint = extensionRegistry.getExtensionPoint ("net.sf.j2s.ui.externalResourceProvider");
if (extensionPoint == null) {
return ;
}var extensions = extensionPoint.getExtensions ();
for (var i = 0; i < extensions.length; i++) {
var extension = extensions[i];
var elements = extension.getConfigurationElements ();
for (var j = 0; j < elements.length; j++) {
var element = elements[j];
if ("externalResourceProvider".equals (element.getName ())) {
var className = element.getAttribute ("class");
var id = element.getAttribute ("id");
if (className != null && className.trim ().length != 0 && id != null && id.trim ().length != 0) {
try {
var callback = element.createExecutableExtension ("class");
if (Clazz.instanceOf (callback, net.sf.j2s.ui.resources.IExternalResourceProvider)) {
net.sf.j2s.ui.resources.ExternalResources.providers.put (id.trim (), callback);
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
c$.getProviders = Clazz.defineMethod (c$, "getProviders", 
function () {
net.sf.j2s.ui.resources.ExternalResources.checkExtensionPoints ();
return net.sf.j2s.ui.resources.ExternalResources.providers;
});
c$.getProviderByName = Clazz.defineMethod (c$, "getProviderByName", 
function (keyName) {
net.sf.j2s.ui.resources.ExternalResources.checkExtensionPoints ();
if (keyName != null) {
for (var iter = net.sf.j2s.ui.resources.ExternalResources.providers.keySet ().iterator (); iter.hasNext (); ) {
var key = iter.next ();
var provider = net.sf.j2s.ui.resources.ExternalResources.providers.get (key);
var keys = provider.getKeys ();
for (var i = 0; i < keys.length; i++) {
if (keyName.equals (keys[i])) {
return provider;
}}
}
}return null;
}, "~S");
c$.getAllKeys = Clazz.defineMethod (c$, "getAllKeys", 
function () {
net.sf.j2s.ui.resources.ExternalResources.checkExtensionPoints ();
var list =  new java.util.ArrayList ();
for (var iter = net.sf.j2s.ui.resources.ExternalResources.providers.keySet ().iterator (); iter.hasNext (); ) {
var key = iter.next ();
var provider = net.sf.j2s.ui.resources.ExternalResources.providers.get (key);
var keys = provider.getKeys ();
for (var i = 0; i < keys.length; i++) {
list.add (keys[i]);
}
}
return list.toArray ( new Array (0));
});
c$.getAllDescriptions = Clazz.defineMethod (c$, "getAllDescriptions", 
function () {
net.sf.j2s.ui.resources.ExternalResources.checkExtensionPoints ();
var list =  new java.util.ArrayList ();
for (var iter = net.sf.j2s.ui.resources.ExternalResources.providers.keySet ().iterator (); iter.hasNext (); ) {
var key = iter.next ();
var provider = net.sf.j2s.ui.resources.ExternalResources.providers.get (key);
var descs = provider.getDescriptions ();
for (var i = 0; i < descs.length; i++) {
list.add (descs[i]);
}
}
return list.toArray ( new Array (0));
});
c$.getAllResources = Clazz.defineMethod (c$, "getAllResources", 
function () {
net.sf.j2s.ui.resources.ExternalResources.checkExtensionPoints ();
var list =  new java.util.ArrayList ();
for (var iter = net.sf.j2s.ui.resources.ExternalResources.providers.keySet ().iterator (); iter.hasNext (); ) {
var key = iter.next ();
var provider = net.sf.j2s.ui.resources.ExternalResources.providers.get (key);
var ress = provider.getResources ();
for (var i = 0; i < ress.length; i++) {
list.add (ress[i]);
}
}
return list.toArray ( Clazz.newArray (0, 0, null));
});
c$.providers = c$.prototype.providers =  new java.util.HashMap ();
Clazz.defineStatics (c$,
"isExtensionPointsChecked", false);
});
