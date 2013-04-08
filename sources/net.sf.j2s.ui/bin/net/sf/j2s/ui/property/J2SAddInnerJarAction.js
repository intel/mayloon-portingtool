Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["$wt.events.SelectionListener", "org.eclipse.core.runtime.Status", "org.eclipse.jdt.internal.debug.core.JDIDebugPlugin", "org.eclipse.ui.dialogs.ISelectionStatusValidator"], "net.sf.j2s.ui.property.J2SAddInnerJarAction", ["java.io.File", "java.util.ArrayList", "net.sf.j2s.ui.launching.JavaRuntime", "net.sf.j2s.ui.property.ArchiveFilter", "$.J2SLibrary", "net.sf.j2s.ui.resources.ExternalResources", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.jdt.internal.debug.ui.actions.ObjectFilter", "org.eclipse.jdt.ui.JavaUI", "org.eclipse.jface.viewers.ITreeContentProvider", "$.LabelProvider", "org.eclipse.ui.dialogs.ElementTreeSelectionDialog"], function () {
c$ = Clazz.decorateAsClass (function () {
this.page = null;
this.j2sFile = null;
this.validator = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "J2SAddInnerJarAction", null, $wt.events.SelectionListener);
Clazz.prepareFields (c$, function () {
this.validator = ((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SAddInnerJarAction$1") ? 0 : net.sf.j2s.ui.property.J2SAddInnerJarAction.$J2SAddInnerJarAction$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SAddInnerJarAction$1, this, null));
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
var lp = ((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SAddInnerJarAction$2") ? 0 : net.sf.j2s.ui.property.J2SAddInnerJarAction.$J2SAddInnerJarAction$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SAddInnerJarAction$2, this, null));
var cp = ((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SAddInnerJarAction$3") ? 0 : net.sf.j2s.ui.property.J2SAddInnerJarAction.$J2SAddInnerJarAction$3$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SAddInnerJarAction$3, this, null));
var dialog = ((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SAddInnerJarAction$4") ? 0 : net.sf.j2s.ui.property.J2SAddInnerJarAction.$J2SAddInnerJarAction$4$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SAddInnerJarAction$4, this, null, e.display.getActiveShell (), lp, cp));
dialog.setValidator (this.validator);
dialog.setTitle ("Libraries Selection");
dialog.setMessage ("Choose libraries (*.j2x)");
var rr = this.page.classpathModel.resources;
var al =  new java.util.ArrayList (rr.size ());
for (var iter = rr.iterator (); iter.hasNext (); ) {
var res = iter.next ();
try {
al.add ("|" + res.getAbsoluteFile ().getCanonicalPath ());
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
}
dialog.addFilter ( new org.eclipse.jdt.internal.debug.ui.actions.ObjectFilter (al));
var allKeys = net.sf.j2s.ui.resources.ExternalResources.getAllKeys ();
var allDescriptions = net.sf.j2s.ui.resources.ExternalResources.getAllDescriptions ();
var allResources = net.sf.j2s.ui.resources.ExternalResources.getAllResources ();
var libs =  new Array (allKeys.length);
for (var i = 0; i < libs.length; i++) {
var library =  new net.sf.j2s.ui.property.J2SLibrary ();
library.setName (allKeys[i]);
library.setDesc (allDescriptions[i]);
library.setResources (allResources[i]);
libs[i] = library;
}
dialog.setInput (libs);
net.sf.j2s.ajax.AWindowDelegate.asyncOpen (dialog, this, function () {
if (dialog.getReturnCode () == 0) {
var expandedElements = this.page.viewer.getExpandedElements ();
var elements = dialog.getResult ();
var added = false;
for (var i = 0; i < elements.length; i++) {
var elem = elements[i];
var resPath = elem.substring (1);
var entry = net.sf.j2s.ui.launching.JavaRuntime.newArchiveRuntimeClasspathEntry (resPath);
if (entry != null) {
(entry).setAbsolute (true);
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
Clazz.defineMethod (c$, "getJ2SFile", 
function () {
return this.j2sFile;
});
Clazz.defineMethod (c$, "setJ2SFile", 
function (file) {
this.j2sFile = file;
}, "java.io.File");
c$.$J2SAddInnerJarAction$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SAddInnerJarAction$1", null, org.eclipse.ui.dialogs.ISelectionStatusValidator);
Clazz.overrideMethod (c$, "validate", 
function (selection) {
if (selection.length == 0) {
return  new org.eclipse.core.runtime.Status (4, org.eclipse.jdt.internal.debug.core.JDIDebugPlugin.getUniqueIdentifier (), 0, "", null);
}for (var i = 0; i < selection.length; i++) {
if (!(Clazz.instanceOf (selection[i], String))) {
return  new org.eclipse.core.runtime.Status (4, org.eclipse.jdt.internal.debug.core.JDIDebugPlugin.getUniqueIdentifier (), 0, "", null);
}}
return  new org.eclipse.core.runtime.Status (0, org.eclipse.jdt.internal.debug.core.JDIDebugPlugin.getUniqueIdentifier (), 0, "", null);
}, "~A");
c$ = Clazz.p0p ();
};
c$.$J2SAddInnerJarAction$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SAddInnerJarAction$2", org.eclipse.jface.viewers.LabelProvider);
Clazz.defineMethod (c$, "getText", 
function (element) {
if (Clazz.instanceOf (element, Array)) {
return "Inner JS Library";
} else if (Clazz.instanceOf (element, net.sf.j2s.ui.property.J2SLibrary)) {
var lib = element;
var name = lib.getName ();
return name;
} else if (Clazz.instanceOf (element, String)) {
var res = element;
var name =  new java.io.File (res).getName ();
if (name.endsWith (".j2x")) {
return name.substring (0, name.length - 4);
}return name;
}return Clazz.superCall (this, net.sf.j2s.ui.property.J2SAddInnerJarAction$2, "getText", [element]);
}, "~O");
Clazz.defineMethod (c$, "getImage", 
function (element) {
if (Clazz.instanceOf (element, Array)) {
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.packagefolder_obj.gif");
} else if (Clazz.instanceOf (element, net.sf.j2s.ui.property.J2SLibrary)) {
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.packagefolder_obj.gif");
} else if (Clazz.instanceOf (element, String)) {
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.library_obj.gif");
}return Clazz.superCall (this, net.sf.j2s.ui.property.J2SAddInnerJarAction$2, "getImage", [element]);
}, "~O");
c$ = Clazz.p0p ();
};
c$.$J2SAddInnerJarAction$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SAddInnerJarAction$3", null, org.eclipse.jface.viewers.ITreeContentProvider);
Clazz.overrideMethod (c$, "inputChanged", 
function (viewer, oldInput, newInput) {
}, "org.eclipse.jface.viewers.Viewer,~O,~O");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.overrideMethod (c$, "getElements", 
function (inputElement) {
return this.getChildren (inputElement);
}, "~O");
Clazz.overrideMethod (c$, "hasChildren", 
function (element) {
if (Clazz.instanceOf (element, Array)) {
return true;
} else if (Clazz.instanceOf (element, net.sf.j2s.ui.property.J2SLibrary)) {
return true;
}return false;
}, "~O");
Clazz.overrideMethod (c$, "getParent", 
function (element) {
return null;
}, "~O");
Clazz.overrideMethod (c$, "getChildren", 
function (parentElement) {
if (Clazz.instanceOf (parentElement, Array)) {
var libs = parentElement;
return libs;
} else if (Clazz.instanceOf (parentElement, net.sf.j2s.ui.property.J2SLibrary)) {
var lib = parentElement;
var resources = lib.getResources ();
try {
var ress =  new Array (resources.length);
for (var i = 0; i < resources.length; i++) {
ress[i] = "|" + ( new java.io.File (resources[i].substring (1)).getCanonicalPath ());
}
return ress;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return resources;
}return null;
}, "~O");
c$ = Clazz.p0p ();
};
c$.$J2SAddInnerJarAction$4$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SAddInnerJarAction$4", org.eclipse.ui.dialogs.ElementTreeSelectionDialog);
Clazz.defineMethod (c$, "createTreeViewer", 
function (parent) {
var treeViewer = Clazz.superCall (this, net.sf.j2s.ui.property.J2SAddInnerJarAction$4, "createTreeViewer", [parent]);
treeViewer.expandToLevel (2);
return treeViewer;
}, "$wt.widgets.Composite");
c$ = Clazz.p0p ();
};
});
