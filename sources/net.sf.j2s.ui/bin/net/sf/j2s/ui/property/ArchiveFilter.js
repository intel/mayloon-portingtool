Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["org.eclipse.jdt.internal.debug.ui.actions.ObjectFilter"], "net.sf.j2s.ui.property.ArchiveFilter", ["java.util.HashSet", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin", "$wt.custom.BusyIndicator"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fArchives = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "ArchiveFilter", org.eclipse.jdt.internal.debug.ui.actions.ObjectFilter);
Clazz.defineMethod (c$, "select", 
function (viewer, parentElement, element) {
return this.fArchives.contains (element) && Clazz.superCall (this, net.sf.j2s.ui.property.ArchiveFilter, "select", [viewer, parentElement, element]);
}, "org.eclipse.jface.viewers.Viewer,~O,~O");
Clazz.makeConstructor (c$, 
function (objects) {
Clazz.superConstructor (this, net.sf.j2s.ui.property.ArchiveFilter, [objects]);
this.init ();
}, "java.util.List");
Clazz.defineMethod (c$, "init", 
($fz = function () {
$wt.custom.BusyIndicator.showWhile (org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin.getStandardDisplay (), ((Clazz.isClassDefined ("net.sf.j2s.ui.property.ArchiveFilter$1") ? 0 : net.sf.j2s.ui.property.ArchiveFilter.$ArchiveFilter$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.ArchiveFilter$1, this, null)));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "traverse", 
($fz = function (container, set) {
var added = false;
try {
var resources = container.members ();
for (var i = 0; i < resources.length; i++) {
var resource = resources[i];
if (Clazz.instanceOf (resource, org.eclipse.core.resources.IFile)) {
var file = resource;
var ext = file.getFileExtension ();
if (ext != null && (file.getName ().endsWith (".z.js") || ext.equalsIgnoreCase ("css"))) {
set.add (file);
added = true;
}} else if (Clazz.instanceOf (resource, org.eclipse.core.resources.IContainer)) {
if (this.traverse (resource, set)) {
set.add (resource);
added = true;
}}}
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
return added;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.resources.IContainer,java.util.Set");
c$.$ArchiveFilter$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "ArchiveFilter$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.property.ArchiveFilter"].fArchives =  new java.util.HashSet ();
this.b$["net.sf.j2s.ui.property.ArchiveFilter"].traverse (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot (), this.b$["net.sf.j2s.ui.property.ArchiveFilter"].fArchives);
});
c$ = Clazz.p0p ();
};
});
