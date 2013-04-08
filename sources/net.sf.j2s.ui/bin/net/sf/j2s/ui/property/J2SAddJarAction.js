Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["$wt.events.SelectionListener", "org.eclipse.core.runtime.Status", "org.eclipse.jdt.internal.debug.core.JDIDebugPlugin", "org.eclipse.ui.dialogs.ISelectionStatusValidator"], "net.sf.j2s.ui.property.J2SAddJarAction", ["java.io.File", "java.util.ArrayList", "net.sf.j2s.ui.launching.JavaRuntime", "net.sf.j2s.ui.property.ArchiveFilter", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.jface.viewers.StructuredSelection", "org.eclipse.ui.dialogs.ElementTreeSelectionDialog", "org.eclipse.ui.model.WorkbenchContentProvider", "$.WorkbenchLabelProvider", "org.eclipse.ui.views.navigator.ResourceSorter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.page = null;
this.validator = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "J2SAddJarAction", null, $wt.events.SelectionListener);
Clazz.prepareFields (c$, function () {
this.validator = ((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SAddJarAction$1") ? 0 : net.sf.j2s.ui.property.J2SAddJarAction.$J2SAddJarAction$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SAddJarAction$1, this, null));
});
Clazz.makeConstructor (c$, 
function (page) {
this.page = page;
}, "net.sf.j2s.ui.property.J2SConfigPage");
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var filter =  new net.sf.j2s.ui.property.ArchiveFilter ( new java.util.ArrayList ());
var root = org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ();
var rootPath = root.getLocation ().toOSString ();
var rootTruePath =  new java.io.File (rootPath).getAbsolutePath ();
var j2sPath = this.page.j2sFile.getAbsolutePath ();
var prjName = null;
if (j2sPath.startsWith (rootTruePath)) {
j2sPath = j2sPath.substring (rootTruePath.length);
if (j2sPath.startsWith (java.io.File.separator)) {
j2sPath = j2sPath.substring (1);
}prjName = j2sPath.substring (0, j2sPath.indexOf (java.io.File.separatorChar));
}var project = (prjName != null) ? root.getProject (prjName) : null;
var lp =  new org.eclipse.ui.model.WorkbenchLabelProvider ();
var cp =  new org.eclipse.ui.model.WorkbenchContentProvider ();
var dialog = ((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SAddJarAction$2") ? 0 : net.sf.j2s.ui.property.J2SAddJarAction.$J2SAddJarAction$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SAddJarAction$2, this, Clazz.cloneFinals ("project", project), e.display.getActiveShell (), lp, cp));
dialog.setValidator (this.validator);
dialog.setTitle ("Java2Script Resources Selection");
dialog.setMessage ("Choose Java2Scrip resources (*.js and *.css)");
dialog.addFilter (filter);
dialog.setInput (root);
dialog.setSorter ( new org.eclipse.ui.views.navigator.ResourceSorter (1));
net.sf.j2s.ajax.AWindowDelegate.asyncOpen (dialog, this, function () {
if (dialog.getReturnCode () == 0) {
var expandedElements = this.page.viewer.getExpandedElements ();
var elements = dialog.getResult ();
var added = false;
for (var i = 0; i < elements.length; i++) {
var elem = elements[i];
var entry = net.sf.j2s.ui.launching.JavaRuntime.newArchiveRuntimeClasspathEntry (elem);
if (entry != null) {
this.page.classpathModel.resources.add (entry);
added = true;
}}
if (added) {
var bar = this.page.viewer.getTree ().getVerticalBar ();
var selection = 0;
if (bar != null) {
selection = (0.0 + bar.getSelection ()) / bar.getMaximum ();
}this.page.viewer.refresh ();
this.page.viewer.setExpandedElements (expandedElements);
if (bar != null) {
bar.setSelection (Math.round (selection * bar.getMaximum ()));
}this.page.updateButtonGroup ();
this.page.fireConfigModified ();
}}});
return;
}, "$wt.events.SelectionEvent");
Clazz.overrideMethod (c$, "widgetDefaultSelected", 
function (e) {
}, "$wt.events.SelectionEvent");
c$.$J2SAddJarAction$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SAddJarAction$1", null, org.eclipse.ui.dialogs.ISelectionStatusValidator);
Clazz.overrideMethod (c$, "validate", 
function (selection) {
if (selection.length == 0) {
return  new org.eclipse.core.runtime.Status (4, org.eclipse.jdt.internal.debug.core.JDIDebugPlugin.getUniqueIdentifier (), 0, "", null);
}for (var i = 0; i < selection.length; i++) {
if (!(Clazz.instanceOf (selection[i], org.eclipse.core.resources.IFile))) {
return  new org.eclipse.core.runtime.Status (4, org.eclipse.jdt.internal.debug.core.JDIDebugPlugin.getUniqueIdentifier (), 0, "", null);
}}
return  new org.eclipse.core.runtime.Status (0, org.eclipse.jdt.internal.debug.core.JDIDebugPlugin.getUniqueIdentifier (), 0, "", null);
}, "~A");
c$ = Clazz.p0p ();
};
c$.$J2SAddJarAction$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SAddJarAction$2", org.eclipse.ui.dialogs.ElementTreeSelectionDialog);
Clazz.defineMethod (c$, "createTreeViewer", 
function (parent) {
var treeViewer = Clazz.superCall (this, net.sf.j2s.ui.property.J2SAddJarAction$2, "createTreeViewer", [parent]);
if (this.f$.project != null) {
treeViewer.setSelection ( new org.eclipse.jface.viewers.StructuredSelection (this.f$.project));
treeViewer.expandToLevel (this.f$.project, 2);
}return treeViewer;
}, "$wt.widgets.Composite");
c$ = Clazz.p0p ();
};
});
