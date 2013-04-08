Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["$wt.events.SelectionListener", "org.eclipse.core.runtime.Status", "org.eclipse.jdt.internal.debug.core.JDIDebugPlugin", "org.eclipse.ui.dialogs.ISelectionStatusValidator"], "net.sf.j2s.ui.property.J2SAbandonClassesAction", ["net.sf.j2s.ui.property.J2SCategory", "$.J2SClasspathContentProvider", "$.J2SClasspathLabelProvider", "org.eclipse.ui.dialogs.ElementTreeSelectionDialog", "org.eclipse.ui.views.navigator.ResourceSorter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.page = null;
this.validator = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "J2SAbandonClassesAction", null, $wt.events.SelectionListener);
Clazz.prepareFields (c$, function () {
this.validator = ((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SAbandonClassesAction$1") ? 0 : net.sf.j2s.ui.property.J2SAbandonClassesAction.$J2SAbandonClassesAction$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SAbandonClassesAction$1, this, null));
});
Clazz.makeConstructor (c$, 
function (page) {
this.page = page;
}, "net.sf.j2s.ui.property.J2SConfigPage");
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var lp =  new net.sf.j2s.ui.property.J2SClasspathLabelProvider ();
var cp =  new net.sf.j2s.ui.property.J2SClasspathContentProvider ();
var dialog = ((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SAbandonClassesAction$2") ? 0 : net.sf.j2s.ui.property.J2SAbandonClassesAction.$J2SAbandonClassesAction$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SAbandonClassesAction$2, this, null, e.display.getActiveShell (), lp, cp));
dialog.setValidator (this.validator);
dialog.setTitle ("Classes Selection");
dialog.setMessage ("Choose classes to be abandoned");
var alreadyUpdated = false;
var unitClasses = this.page.classpathModel.getUnitClasses ();
for (var i = 0; i < unitClasses.length; i++) {
if (!unitClasses[i].getAbsoluteFile ().exists ()) {
this.page.classpathModel.removeUnitClass (unitClasses[i]);
alreadyUpdated = true;
}}
dialog.setInput ( new net.sf.j2s.ui.property.J2SCategory (this.page.classpathModel, "Classes"));
dialog.setSorter ( new org.eclipse.ui.views.navigator.ResourceSorter (1));
net.sf.j2s.ajax.AWindowDelegate.asyncOpen (dialog, this, function () {
if (dialog.getReturnCode () == 0) {
var expandedElements = this.page.viewer.getExpandedElements ();
var elements = dialog.getResult ();
for (var i = 0; i < elements.length; i++) {
this.page.classpathModel.abandonUnitClass (elements[i]);
}
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
} else if (alreadyUpdated) {
this.page.fireConfigModified ();
}});
return;
}, "$wt.events.SelectionEvent");
Clazz.overrideMethod (c$, "widgetDefaultSelected", 
function (e) {
}, "$wt.events.SelectionEvent");
c$.$J2SAbandonClassesAction$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SAbandonClassesAction$1", null, org.eclipse.ui.dialogs.ISelectionStatusValidator);
Clazz.overrideMethod (c$, "validate", 
function (selection) {
if (selection.length == 0) {
return  new org.eclipse.core.runtime.Status (4, org.eclipse.jdt.internal.debug.core.JDIDebugPlugin.getUniqueIdentifier (), 0, "", null);
}return  new org.eclipse.core.runtime.Status (0, org.eclipse.jdt.internal.debug.core.JDIDebugPlugin.getUniqueIdentifier (), 0, "", null);
}, "~A");
c$ = Clazz.p0p ();
};
c$.$J2SAbandonClassesAction$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SAbandonClassesAction$2", org.eclipse.ui.dialogs.ElementTreeSelectionDialog);
Clazz.defineMethod (c$, "createTreeViewer", 
function (parent) {
var treeViewer = Clazz.superCall (this, net.sf.j2s.ui.property.J2SAbandonClassesAction$2, "createTreeViewer", [parent]);
return treeViewer;
}, "$wt.widgets.Composite");
c$ = Clazz.p0p ();
};
});
