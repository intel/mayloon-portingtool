Clazz.declarePackage ("net.sf.j2s.ui.actions");
Clazz.load (["org.eclipse.ui.IObjectActionDelegate"], "net.sf.j2s.ui.actions.GeneratePropertiesJSAction", ["java.io.File", "java.util.HashSet", "net.sf.j2s.ui.actions.Bundle2StringUtil", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jface.dialogs.MessageDialog"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selection = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.actions, "GeneratePropertiesJSAction", null, org.eclipse.ui.IObjectActionDelegate);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "setActivePart", 
function (action, targetPart) {
}, "org.eclipse.jface.action.IAction,org.eclipse.ui.IWorkbenchPart");
Clazz.overrideMethod (c$, "run", 
function (action) {
if (Clazz.instanceOf (this.selection, org.eclipse.jface.viewers.IStructuredSelection)) {
var structSelection = this.selection;
var parents =  new java.util.HashSet ();
var files = structSelection.toArray ();
for (var i = 0; i < files.length; i++) {
var fileRes = files[i];
var parentContainer = fileRes.getParent ();
var parent = org.eclipse.jdt.core.JavaCore.create (parentContainer);
while (parent != null) {
if (Clazz.instanceOf (parent, org.eclipse.jdt.internal.core.PackageFragmentRoot)) {
var pkgRoot = parent;
var base = pkgRoot.getJavaModel ().getResource ().getLocation ().toOSString ();
var basePath = pkgRoot.getPath ().toOSString ();
var relativePath = fileRes.getFullPath ().toPortableString ().substring (parent.getPath ().toPortableString ().length);
var bundleName = relativePath.substring (0, relativePath.indexOf ('.')).$replace (java.io.File.pathSeparatorChar, '.').$replace ('/', '.');
if ((bundleName.charAt (0)).charCodeAt (0) == ('.').charCodeAt (0)) {
bundleName = bundleName.substring (1);
}if (!basePath.startsWith (base)) {
basePath =  new java.io.File (base, basePath).getAbsolutePath ();
}try {
net.sf.j2s.ui.actions.Bundle2StringUtil.convert (basePath, bundleName);
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
e.printStackTrace ();
} else {
throw e;
}
}
break;
}parent = parent.getParent ();
}
parents.add (parentContainer);
}
for (var iter = parents.iterator (); iter.hasNext (); ) {
var parent = iter.next ();
try {
parent.refreshLocal (1, null);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}
org.eclipse.jface.dialogs.MessageDialog.openInformation (null, "Finished", "*.properties are converted into equivalent *.js!");
}}, "org.eclipse.jface.action.IAction");
Clazz.overrideMethod (c$, "selectionChanged", 
function (action, selection) {
this.selection = selection;
}, "org.eclipse.jface.action.IAction,org.eclipse.jface.viewers.ISelection");
});
