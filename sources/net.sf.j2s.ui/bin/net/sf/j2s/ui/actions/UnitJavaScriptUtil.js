Clazz.declarePackage ("net.sf.j2s.ui.actions");
Clazz.load (null, "net.sf.j2s.ui.actions.UnitJavaScriptUtil", ["java.io.File", "java.util.ArrayList", "net.sf.j2s.ui.Java2ScriptUIPlugin", "org.eclipse.core.filesystem.EFS", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.core.runtime.Path", "$.Platform", "org.eclipse.jface.dialogs.MessageDialog", "org.eclipse.osgi.util.NLS", "$wt.widgets.Shell", "org.eclipse.ui.ide.FileStoreEditorInput", "$.IDE", "org.eclipse.ui.internal.ide.IDEWorkbenchMessages", "$.IDEWorkbenchPlugin", "org.eclipse.ui.part.FileEditorInput"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.actions, "UnitJavaScriptUtil");
c$.getEditorID = Clazz.defineMethod (c$, "getEditorID", 
function () {
var editorRegistry = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getWorkbench ().getEditorRegistry ();
var descriptor = editorRegistry.getDefaultEditor ("j2s.js", org.eclipse.core.runtime.Platform.getContentTypeManager ().findContentTypeFor ("j2s.js"));
var editorID = null;
if (descriptor != null) {
editorID = descriptor.getId ();
} else {
editorID = "org.eclipse.ui.DefaultTextEditor";
}return editorID;
});
c$.openEditor = Clazz.defineMethod (c$, "openEditor", 
function (unit) {
var relativePath = net.sf.j2s.ui.actions.UnitJavaScriptUtil.getRelativeJSPath (unit);
var javaModel = unit.getJavaModel ();
var file =  new java.io.File (javaModel.getResource ().getLocation ().toOSString (), relativePath);
var files = javaModel.getWorkspace ().getRoot ().findFilesForLocation (org.eclipse.core.runtime.Path.fromPortableString (relativePath));
var editorInput = null;
if (files != null && files.length != 0) {
editorInput =  new org.eclipse.ui.part.FileEditorInput (files[0]);
try {
net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getWorkbench ().getActiveWorkbenchWindow ().getActivePage ().openEditor (editorInput, net.sf.j2s.ui.actions.UnitJavaScriptUtil.getEditorID ());
return true;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.ui.PartInitException)) {
e.printStackTrace ();
} else {
throw e;
}
}
} else {
var fileStore = org.eclipse.core.filesystem.EFS.getLocalFileSystem ().getStore ( new org.eclipse.core.runtime.Path (file.getParent ()));
fileStore = fileStore.getChild (file.getName ());
if (!fileStore.fetchInfo ().isDirectory () && fileStore.fetchInfo ().exists ()) {
var fWindow = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getWorkbench ().getActiveWorkbenchWindow ();
var page = fWindow.getActivePage ();
try {
var input = net.sf.j2s.ui.actions.UnitJavaScriptUtil.getEditorInput (fileStore);
var editorId = null;
var descriptor;
try {
descriptor = org.eclipse.ui.ide.IDE.getEditorDescriptor ("java2script.txt");
if (descriptor != null) editorId = descriptor.getId ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.ui.PartInitException)) {
} else {
throw e;
}
}
page.openEditor (input, editorId);
return true;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.ui.PartInitException)) {
var msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.ui.internal.ide.IDEWorkbenchMessages.OpenLocalFileAction_message_errorOnOpen, fileStore.getName ());
org.eclipse.ui.internal.ide.IDEWorkbenchPlugin.log (msg, e.getStatus ());
org.eclipse.jface.dialogs.MessageDialog.openError (fWindow.getShell (), org.eclipse.ui.internal.ide.IDEWorkbenchMessages.OpenLocalFileAction_title, msg);
} else {
throw e;
}
}
}}return false;
}, "org.eclipse.jdt.core.ICompilationUnit");
c$.getEditorInput = Clazz.defineMethod (c$, "getEditorInput", 
($fz = function (fileStore) {
var workspaceFile = net.sf.j2s.ui.actions.UnitJavaScriptUtil.getWorkspaceFile (fileStore);
if (workspaceFile != null) return  new org.eclipse.ui.part.FileEditorInput (workspaceFile);
return  new org.eclipse.ui.ide.FileStoreEditorInput (fileStore);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.filesystem.IFileStore");
c$.getWorkspaceFile = Clazz.defineMethod (c$, "getWorkspaceFile", 
($fz = function (fileStore) {
var root = org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ();
var files = root.findFilesForLocationURI (fileStore.toURI ());
files = net.sf.j2s.ui.actions.UnitJavaScriptUtil.filterNonExistentFiles (files);
if (files == null || files.length == 0) return null;
return files[0];
}, $fz.isPrivate = true, $fz), "org.eclipse.core.filesystem.IFileStore");
c$.filterNonExistentFiles = Clazz.defineMethod (c$, "filterNonExistentFiles", 
($fz = function (files) {
if (files == null) return null;
var length = files.length;
var existentFiles =  new java.util.ArrayList (length);
for (var i = 0; i < length; i++) {
if (files[i].exists ()) existentFiles.add (files[i]);
}
return existentFiles.toArray ( new Array (existentFiles.size ()));
}, $fz.isPrivate = true, $fz), "~A");
c$.getRelativeJSPath = Clazz.defineMethod (c$, "getRelativeJSPath", 
function (unit) {
if (unit == null) {
return null;
}var javaProject = unit.getJavaProject ();
if (javaProject != null) {
var relativePath = null;
var parent = unit.getParent ();
while (parent != null) {
if (Clazz.instanceOf (parent, org.eclipse.jdt.internal.core.PackageFragmentRoot)) {
relativePath = unit.getPath ().toPortableString ().substring (parent.getPath ().toPortableString ().length);
break;
}parent = parent.getParent ();
}
var outputLocation = null;
try {
outputLocation = javaProject.getOutputLocation ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jdt.core.JavaModelException)) {
e.printStackTrace ();
} else {
throw e;
}
}
if (outputLocation != null && relativePath != null) {
relativePath = outputLocation + relativePath.substring (0, relativePath.lastIndexOf ('.')) + ".js";
return relativePath;
}}return null;
}, "org.eclipse.jdt.core.ICompilationUnit");
c$.isUnitJSExisted = Clazz.defineMethod (c$, "isUnitJSExisted", 
function (unit) {
var file =  new java.io.File (unit.getJavaModel ().getResource ().getLocation ().toOSString (), net.sf.j2s.ui.actions.UnitJavaScriptUtil.getRelativeJSPath (unit));
return file.exists ();
}, "org.eclipse.jdt.core.ICompilationUnit");
c$.popupError = Clazz.defineMethod (c$, "popupError", 
function () {
var shell =  new $wt.widgets.Shell ();
org.eclipse.jface.dialogs.MessageDialog.openError (shell, "Generated JavaScript", "Error occurs while opening the generated JavaScript file.");
});
});
