Clazz.declarePackage ("net.sf.j2s.ui.generator");
Clazz.load (null, "net.sf.j2s.ui.generator.J2SViewImages", ["java.lang.StringBuffer", "java.net.URL", "net.sf.j2s.ui.Java2ScriptUIPlugin", "org.eclipse.jface.resource.ImageDescriptor"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.generator, "J2SViewImages");
c$.setImageDescriptors = Clazz.defineMethod (c$, "setImageDescriptors", 
function (action, type) {
try {
var id = org.eclipse.jface.resource.ImageDescriptor.createFromURL (net.sf.j2s.ui.generator.J2SViewImages.makeIconFileURL ("d", type));
if (id != null) action.setDisabledImageDescriptor (id);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
try {
var id = org.eclipse.jface.resource.ImageDescriptor.createFromURL (net.sf.j2s.ui.generator.J2SViewImages.makeIconFileURL ("c", type));
if (id != null) action.setHoverImageDescriptor (id);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
action.setImageDescriptor (net.sf.j2s.ui.generator.J2SViewImages.create ("e", type));
}, "org.eclipse.jface.action.IAction,~S");
c$.create = Clazz.defineMethod (c$, "create", 
($fz = function (path, name) {
try {
return org.eclipse.jface.resource.ImageDescriptor.createFromURL (net.sf.j2s.ui.generator.J2SViewImages.makeIconFileURL (path, name));
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return org.eclipse.jface.resource.ImageDescriptor.getMissingImageDescriptor ();
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~S,~S");
c$.makeIconFileURL = Clazz.defineMethod (c$, "makeIconFileURL", 
($fz = function (path, name) {
var buffer =  new StringBuffer (path);
buffer.append ('/');
buffer.append (name);
return  new java.net.URL (net.sf.j2s.ui.generator.J2SViewImages.fgIconBaseURL, buffer.toString ());
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineStatics (c$,
"fgIconBaseURL", null);
{
($t$ = net.sf.j2s.ui.generator.J2SViewImages.fgIconBaseURL = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getBundle ().getEntry ("/icons/"), net.sf.j2s.ui.generator.J2SViewImages.prototype.fgIconBaseURL = net.sf.j2s.ui.generator.J2SViewImages.fgIconBaseURL, $t$);
}Clazz.defineStatics (c$,
"COLLAPSE", "collapseall.gif",
"EXPAND", "expandall.gif",
"LINK_WITH_EDITOR", "synced.gif",
"SETFOCUS", "setfocus.gif",
"REFRESH", "refresh.gif",
"CLEAR", "clear.gif",
"ADD_TO_TRAY", "add.gif");
});
