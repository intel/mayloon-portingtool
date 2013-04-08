Clazz.declarePackage ("net.sf.j2s.ui.editors");
Clazz.load (["org.eclipse.core.resources.IResourceChangeListener", "org.eclipse.ui.part.MultiPageEditorPart"], "net.sf.j2s.ui.editors.J2SConfigEditor", ["java.io.ByteArrayInputStream", "$.ByteArrayOutputStream", "java.util.Properties", "net.sf.j2s.ui.editors.J2STextEditor", "net.sf.j2s.ui.property.IJ2SConfigModifiedListener", "$.J2SConfigPage", "org.eclipse.core.resources.IFile", "$.ResourcesPlugin", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jface.dialogs.ErrorDialog", "$wt.layout.GridLayout", "$wt.widgets.Composite", "$.Display", "org.eclipse.ui.PartInitException", "org.eclipse.ui.ide.IDE"], function () {
c$ = Clazz.decorateAsClass (function () {
this.editor = null;
this.lastEnabled = false;
this.configPage = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.editors, "J2SConfigEditor", org.eclipse.ui.part.MultiPageEditorPart, org.eclipse.core.resources.IResourceChangeListener);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.ui.editors.J2SConfigEditor);
org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().addResourceChangeListener (this);
});
Clazz.defineMethod (c$, "createPage1", 
function () {
try {
var readOnlyEditor =  new net.sf.j2s.ui.editors.J2STextEditor ();
var index = this.addPage (readOnlyEditor, this.getEditorInput ());
this.editor = readOnlyEditor;
this.setPageText (index, "Source");
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.ui.PartInitException)) {
org.eclipse.jface.dialogs.ErrorDialog.openError (this.getSite ().getShell (), "Error creating nested text editor", null, e.getStatus ());
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "createPage0", 
function () {
var composite =  new $wt.widgets.Composite (this.getContainer (), 0);
var layout =  new $wt.layout.GridLayout ();
composite.setLayout (layout);
layout.numColumns = 2;
this.configPage =  new net.sf.j2s.ui.property.J2SConfigPage (composite, 0);
this.configPage.addConfigModifiedListener (((Clazz.isClassDefined ("net.sf.j2s.ui.editors.J2SConfigEditor$1") ? 0 : net.sf.j2s.ui.editors.J2SConfigEditor.$J2SConfigEditor$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.editors.J2SConfigEditor$1, this, null)));
var index = this.addPage (composite);
this.setPageText (index, "Config");
var file = this.getEditorInput ().getAdapter (org.eclipse.core.resources.IFile);
if (file != null) {
var j2sFile = org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ().getFile (file.getFullPath ()).getLocation ().toFile ();
this.configPage.initConfigPage (j2sFile);
this.lastEnabled = this.configPage.isCompilerEnabled ();
}});
Clazz.overrideMethod (c$, "createPages", 
function () {
this.createPage0 ();
this.createPage1 ();
this.setPartName (this.getEditorInput ().getName ());
});
Clazz.defineMethod (c$, "dispose", 
function () {
org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().removeResourceChangeListener (this);
Clazz.superCall (this, net.sf.j2s.ui.editors.J2SConfigEditor, "dispose", []);
});
Clazz.overrideMethod (c$, "doSave", 
function (monitor) {
this.getEditor (1).doSave (monitor);
var file = this.getEditorInput ().getAdapter (org.eclipse.core.resources.IFile);
if (file != null) {
var path = file.getFullPath ();
if (path.segmentCount () == 2 && ".j2s".equals (path.segment (1))) {
var b = false;
if (this.getActivePage () == 0) {
b = this.configPage.isCompilerEnabled ();
} else {
var props =  new java.util.Properties ();
var textWidget = (this.editor).getJ2SSourceViewer ().getTextWidget ();
var bytes = textWidget.getText ().getBytes ();
try {
props.load ( new java.io.ByteArrayInputStream (bytes));
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
var status = props.getProperty ("j2s.compiler.status");
if ("enable".equals (status)) {
b = true;
}}if (!this.lastEnabled && b) {
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = path.segment (0);
if ((projectName == null) || (projectName.trim ().length < 1)) {
return ;
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return ;
}var project = javaProject.getProject ();
try {
project.build (15, monitor);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}this.lastEnabled = b;
}}}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.overrideMethod (c$, "doSaveAs", 
function () {
var editor = this.getEditor (1);
editor.doSaveAs ();
this.setPageText (0, editor.getTitle ());
this.setInput (editor.getEditorInput ());
});
Clazz.defineMethod (c$, "gotoMarker", 
function (marker) {
this.setActivePage (0);
org.eclipse.ui.ide.IDE.gotoMarker (this.getEditor (1), marker);
}, "org.eclipse.core.resources.IMarker");
Clazz.defineMethod (c$, "init", 
function (site, editorInput) {
if (!(Clazz.instanceOf (editorInput, org.eclipse.ui.IFileEditorInput))) throw  new org.eclipse.ui.PartInitException ("Invalid Input: Must be IFileEditorInput");
Clazz.superCall (this, net.sf.j2s.ui.editors.J2SConfigEditor, "init", [site, editorInput]);
}, "org.eclipse.ui.IEditorSite,org.eclipse.ui.IEditorInput");
Clazz.overrideMethod (c$, "isSaveAsAllowed", 
function () {
return true;
});
Clazz.defineMethod (c$, "pageChange", 
function (newPageIndex) {
Clazz.superCall (this, net.sf.j2s.ui.editors.J2SConfigEditor, "pageChange", [newPageIndex]);
var textWidget = (this.editor).getJ2SSourceViewer ().getTextWidget ();
var bytes = textWidget.getText ().getBytes ();
var file = this.getEditorInput ().getAdapter (org.eclipse.core.resources.IFile);
if (newPageIndex == 1) {
var oldProps =  new java.util.Properties ();
try {
oldProps.load ( new java.io.ByteArrayInputStream (bytes));
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
var props = this.configPage.getUpdatedProperties ( new java.io.ByteArrayInputStream (bytes), file.getRawLocation ().toFile ());
if (!props.equals (oldProps)) {
var os =  new java.io.ByteArrayOutputStream ();
try {
props.store (os, "Java2Script Configuration");
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
textWidget.setText (os.toString ());
}} else {
var oldProps =  new java.util.Properties ();
try {
oldProps.load ( new java.io.ByteArrayInputStream (bytes));
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
var props = this.configPage.getUpdatedProperties ( new java.io.ByteArrayInputStream (bytes), file.getRawLocation ().toFile ());
if (!props.equals (oldProps)) {
this.configPage.initConfigPage (null,  new java.io.ByteArrayInputStream (bytes));
}}}, "~N");
Clazz.overrideMethod (c$, "resourceChanged", 
function (event) {
if (event.getType () == 2) {
$wt.widgets.Display.getDefault ().asyncExec (((Clazz.isClassDefined ("net.sf.j2s.ui.editors.J2SConfigEditor$2") ? 0 : net.sf.j2s.ui.editors.J2SConfigEditor.$J2SConfigEditor$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.editors.J2SConfigEditor$2, this, Clazz.cloneFinals ("event", event))));
} else if (event.getType () == 1) {
if (this.getActivePage () == 0) {
$wt.widgets.Display.getDefault ().asyncExec (((Clazz.isClassDefined ("net.sf.j2s.ui.editors.J2SConfigEditor$3") ? 0 : net.sf.j2s.ui.editors.J2SConfigEditor.$J2SConfigEditor$3$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.editors.J2SConfigEditor$3, this, null)));
}}}, "org.eclipse.core.resources.IResourceChangeEvent");
c$.$J2SConfigEditor$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.editors, "J2SConfigEditor$1", null, net.sf.j2s.ui.property.IJ2SConfigModifiedListener);
Clazz.overrideMethod (c$, "configModified", 
function () {
var oldProps =  new java.util.Properties ();
var textWidget = (this.b$["net.sf.j2s.ui.editors.J2SConfigEditor"].editor).getJ2SSourceViewer ().getTextWidget ();
var bytes = textWidget.getText ().getBytes ();
try {
oldProps.load ( new java.io.ByteArrayInputStream (bytes));
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
var file = this.b$["net.sf.j2s.ui.editors.J2SConfigEditor"].getEditorInput ().getAdapter (org.eclipse.core.resources.IFile);
var props = this.b$["net.sf.j2s.ui.editors.J2SConfigEditor"].configPage.getUpdatedProperties ( new java.io.ByteArrayInputStream (bytes), file.getRawLocation ().toFile ());
if (!props.equals (oldProps)) {
var os =  new java.io.ByteArrayOutputStream ();
try {
props.store (os, "Java2Script Configuration");
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
textWidget.setText (os.toString ());
}});
c$ = Clazz.p0p ();
};
c$.$J2SConfigEditor$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.editors, "J2SConfigEditor$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var pages = this.b$["net.sf.j2s.ui.editors.J2SConfigEditor"].getSite ().getWorkbenchWindow ().getPages ();
for (var i = 0; i < pages.length; i++) {
if ((this.b$["net.sf.j2s.ui.editors.J2SConfigEditor"].editor.getEditorInput ()).getFile ().getProject ().equals (this.f$.event.getResource ())) {
var editorPart = pages[i].findEditor (this.b$["net.sf.j2s.ui.editors.J2SConfigEditor"].editor.getEditorInput ());
pages[i].closeEditor (editorPart, true);
}}
});
c$ = Clazz.p0p ();
};
c$.$J2SConfigEditor$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.editors, "J2SConfigEditor$3", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var file = this.b$["net.sf.j2s.ui.editors.J2SConfigEditor"].getEditorInput ().getAdapter (org.eclipse.core.resources.IFile);
if (file != null) {
var j2sFile = org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ().getFile (file.getFullPath ()).getLocation ().toFile ();
this.b$["net.sf.j2s.ui.editors.J2SConfigEditor"].configPage.initConfigPage (j2sFile);
}});
c$ = Clazz.p0p ();
};
});
