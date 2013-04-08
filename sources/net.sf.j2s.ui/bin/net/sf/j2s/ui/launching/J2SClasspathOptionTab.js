Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.debug.ui.AbstractLaunchConfigurationTab"], "net.sf.j2s.ui.launching.J2SClasspathOptionTab", ["java.io.ByteArrayInputStream", "$.File", "net.sf.j2s.ui.property.IJ2SConfigModifiedListener", "$.J2SConfigPage", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.internal.debug.ui.IJavaDebugHelpContextIds", "$.JavaDebugImages", "org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages", "org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants", "$wt.events.SelectionAdapter", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite", "$.Label", "org.eclipse.ui.PlatformUI"], function () {
c$ = Clazz.decorateAsClass (function () {
this.configPage = null;
this.fLaunchConfiguration = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.launching, "J2SClasspathOptionTab", org.eclipse.debug.ui.AbstractLaunchConfigurationTab);
Clazz.overrideMethod (c$, "createControl", 
function (parent) {
var font = parent.getFont ();
var comp =  new $wt.widgets.Composite (parent, 0);
this.setControl (comp);
org.eclipse.ui.PlatformUI.getWorkbench ().getHelpSystem ().setHelp (this.getControl (), org.eclipse.jdt.internal.debug.ui.IJavaDebugHelpContextIds.LAUNCH_CONFIGURATION_DIALOG_CLASSPATH_TAB);
var topLayout =  new $wt.layout.GridLayout ();
comp.setLayout (topLayout);
var gd;
var label =  new $wt.widgets.Label (comp, 0);
label.setText (org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages.JavaClasspathTab_0);
gd =  new $wt.layout.GridData (32);
label.setLayoutData (gd);
this.configPage =  new net.sf.j2s.ui.property.J2SConfigPage (comp, 0);
this.configPage.forClasspathTab ();
this.configPage.getRestoreDefaultButton ().addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SClasspathOptionTab$1") ? 0 : net.sf.j2s.ui.launching.J2SClasspathOptionTab.$J2SClasspathOptionTab$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SClasspathOptionTab$1, this, null)));
this.configPage.addConfigModifiedListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SClasspathOptionTab$2") ? 0 : net.sf.j2s.ui.launching.J2SClasspathOptionTab.$J2SClasspathOptionTab$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SClasspathOptionTab$2, this, null)));
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "setDefaults", 
function (configuration) {
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.overrideMethod (c$, "initializeFrom", 
function (configuration) {
this.setDirty (false);
this.fLaunchConfiguration = configuration;
try {
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return ;
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return ;
}var project = javaProject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
var workingDir =  new java.io.File (prjFolder);
var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
}var j2sFile =  new java.io.File (workingDir, ".j2s");
var classpath = configuration.getAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
var abandonClasspath = configuration.getAttribute ("j2s.abandon.class.path", Clazz.castNullAs ("String"));
if ((classpath == null || classpath.trim ().length == 0) && (abandonClasspath == null || abandonClasspath.trim ().length == 0)) {
this.configPage.initConfigPage (j2sFile);
} else {
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.compiler.status=enable\r\nj2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath + "\r\nj2s.abandoned.resources.list=" + abandonClasspath;
this.configPage.initConfigPage (j2sFile,  new java.io.ByteArrayInputStream (propStr.getBytes ()));
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, "org.eclipse.debug.core.ILaunchConfiguration");
Clazz.overrideMethod (c$, "performApply", 
function (configuration) {
try {
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return ;
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return ;
}var project = javaProject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
var workingDir =  new java.io.File (prjFolder);
var useDefault = true;
try {
useDefault = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
}var j2sFile =  new java.io.File (workingDir, ".j2s");
var classpath = configuration.getAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
var abandonClasspath = configuration.getAttribute ("j2s.abandon.class.path", Clazz.castNullAs ("String"));
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath + "\r\nj2s.abandoned.resources.list==" + abandonClasspath;
var is =  new java.io.ByteArrayInputStream (propStr.getBytes ());
var prop = this.configPage.getUpdatedProperties (is, j2sFile);
var resList = prop.getProperty ("j2s.resources.list");
if (!resList.equals (classpath)) {
configuration.setAttribute ("j2s.class.path", resList);
}resList = prop.getProperty ("j2s.abandoned.resources.list");
if (!resList.equals (classpath)) {
configuration.setAttribute ("j2s.abandon.class.path", resList);
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.overrideMethod (c$, "getName", 
function () {
return org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages.JavaClasspathTab_Cla_ss_path_3;
});
c$.getClasspathImage = Clazz.defineMethod (c$, "getClasspathImage", 
function () {
return org.eclipse.jdt.internal.debug.ui.JavaDebugImages.get ("IMG_OBJS_CLASSPATH");
});
Clazz.overrideMethod (c$, "getImage", 
function () {
return net.sf.j2s.ui.launching.J2SClasspathOptionTab.getClasspathImage ();
});
c$.$J2SClasspathOptionTab$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SClasspathOptionTab$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var configCopy = (this.b$["net.sf.j2s.ui.launching.J2SClasspathOptionTab"].fLaunchConfiguration);
try {
var classpath = configCopy.getAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
var abandonClasspath = configCopy.getAttribute ("j2s.abandon.class.path", Clazz.castNullAs ("String"));
if ((classpath == null || classpath.trim ().length == 0) && (abandonClasspath == null || abandonClasspath.trim ().length == 0)) {
return ;
}configCopy.setAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
configCopy.setAttribute ("j2s.abandon.class.path", Clazz.castNullAs ("String"));
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = this.b$["net.sf.j2s.ui.launching.J2SClasspathOptionTab"].fLaunchConfiguration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return ;
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return ;
}var project = javaProject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
var workingDir =  new java.io.File (prjFolder);
var j2sFile =  new java.io.File (workingDir, ".j2s");
this.b$["net.sf.j2s.ui.launching.J2SClasspathOptionTab"].configPage.initConfigPage (j2sFile);
this.b$["net.sf.j2s.ui.launching.J2SClasspathOptionTab"].updateLaunchConfigurationDialog ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.eclipse.jdt.core.JavaModelException)) {
var e1 = e$$;
{
e1.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.CoreException)) {
var e1 = e$$;
{
e1.printStackTrace ();
}
} else {
throw e$$;
}
}
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SClasspathOptionTab$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SClasspathOptionTab$2", null, net.sf.j2s.ui.property.IJ2SConfigModifiedListener);
Clazz.overrideMethod (c$, "configModified", 
function () {
this.b$["net.sf.j2s.ui.launching.J2SClasspathOptionTab"].setDirty (true);
this.b$["net.sf.j2s.ui.launching.J2SClasspathOptionTab"].updateLaunchConfigurationDialog ();
});
c$ = Clazz.p0p ();
};
});
