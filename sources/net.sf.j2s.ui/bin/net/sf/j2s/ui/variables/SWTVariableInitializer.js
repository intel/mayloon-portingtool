Clazz.declarePackage ("net.sf.j2s.ui.variables");
Clazz.load (["org.eclipse.jdt.core.ClasspathVariableInitializer"], "net.sf.j2s.ui.variables.SWTVariableInitializer", ["java.io.File", "$.FileFilter", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.core.runtime.NullProgressMonitor", "$.Path", "$.Platform", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.internal.launching.LaunchingPlugin"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fMonitor = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.variables, "SWTVariableInitializer", org.eclipse.jdt.core.ClasspathVariableInitializer);
Clazz.overrideMethod (c$, "initialize", 
function (variable) {
var newPath = null;
if ("ECLIPSE_SWT".equals (variable)) {
var location = org.eclipse.core.runtime.Platform.getInstallLocation ();
var url = location.getURL ();
var file =  new java.io.File (url.getFile (), "plugins");
var swtJars = file.listFiles (((Clazz.isClassDefined ("net.sf.j2s.ui.variables.SWTVariableInitializer$1") ? 0 : net.sf.j2s.ui.variables.SWTVariableInitializer.$SWTVariableInitializer$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.variables.SWTVariableInitializer$1, this, null)));
if (swtJars == null || swtJars.length == 0) {
return ;
}var mainSWT = swtJars[0];
for (var i = 1; i < swtJars.length; i++) {
var swt = swtJars[0];
if (swt.getName ().length > mainSWT.getName ().length) {
mainSWT = swt;
}}
newPath = org.eclipse.core.runtime.Path.fromOSString (mainSWT.getAbsolutePath ());
}if (newPath == null) {
return ;
}var workspace = org.eclipse.core.resources.ResourcesPlugin.getWorkspace ();
var wsDescription = workspace.getDescription ();
var wasAutobuild = wsDescription.isAutoBuilding ();
try {
this.setAutobuild (workspace, false);
this.setJREVariable (newPath, variable);
} catch (ce) {
if (Clazz.instanceOf (ce, org.eclipse.core.runtime.CoreException)) {
org.eclipse.jdt.internal.launching.LaunchingPlugin.log (ce);
return ;
} else {
throw ce;
}
} finally {
try {
this.setAutobuild (workspace, wasAutobuild);
} catch (ce) {
if (Clazz.instanceOf (ce, org.eclipse.core.runtime.CoreException)) {
org.eclipse.jdt.internal.launching.LaunchingPlugin.log (ce);
} else {
throw ce;
}
}
}
}, "~S");
Clazz.defineMethod (c$, "setJREVariable", 
($fz = function (newPath, $var) {
org.eclipse.jdt.core.JavaCore.setClasspathVariable ($var, newPath, this.getMonitor ());
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IPath,~S");
Clazz.defineMethod (c$, "setAutobuild", 
($fz = function (ws, newState) {
var wsDescription = ws.getDescription ();
var oldState = wsDescription.isAutoBuilding ();
if (oldState != newState) {
wsDescription.setAutoBuilding (newState);
ws.setDescription (wsDescription);
}return oldState;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.resources.IWorkspace,~B");
Clazz.defineMethod (c$, "getMonitor", 
function () {
if (this.fMonitor == null) {
return  new org.eclipse.core.runtime.NullProgressMonitor ();
}return this.fMonitor;
});
c$.$SWTVariableInitializer$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.variables, "SWTVariableInitializer$1", null, java.io.FileFilter);
Clazz.overrideMethod (c$, "accept", 
function (pathname) {
var name = pathname.getName ().toLowerCase ();
if (name.startsWith ("org.eclipse.swt.") && name.endsWith (".jar") && name.indexOf ("source") == -1) {
return true;
}return false;
}, "java.io.File");
c$ = Clazz.p0p ();
};
});
