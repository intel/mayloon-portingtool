Clazz.declarePackage ("net.sf.j2s.ui.wizards");
Clazz.load (["org.eclipse.core.runtime.IExecutableExtension", "org.eclipse.jdt.internal.ui.wizards.NewElementWizard"], "net.sf.j2s.ui.wizards.Java2ScriptProjectWizard", ["java.io.File", "$.FileOutputStream", "java.lang.StringBuffer", "java.util.ArrayList", "$.Properties", "net.sf.j2s.core.Java2ScriptProjectNature", "net.sf.j2s.ui.launching.JavaRuntime", "net.sf.j2s.ui.property.FileUtil", "$.J2SClasspathModel", "net.sf.j2s.ui.resources.ExternalResources", "org.eclipse.core.runtime.Path", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.internal.ui.JavaPlugin", "$.JavaPluginImages", "org.eclipse.jdt.internal.ui.util.ExceptionHandler", "org.eclipse.jdt.internal.ui.wizards.NewWizardMessages", "org.eclipse.jdt.ui.actions.ShowInPackageViewAction", "org.eclipse.jdt.ui.wizards.NewJavaProjectWizardPageOne", "$.NewJavaProjectWizardPageTwo", "$wt.widgets.Display", "org.eclipse.ui.PlatformUI", "org.eclipse.ui.wizards.newresource.BasicNewProjectResourceWizard"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fFirstPage = null;
this.fSecondPage = null;
this.fConfigElement = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.wizards, "Java2ScriptProjectWizard", org.eclipse.jdt.internal.ui.wizards.NewElementWizard, org.eclipse.core.runtime.IExecutableExtension);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null);
});
Clazz.makeConstructor (c$, 
function (pageOne, pageTwo) {
Clazz.superConstructor (this, net.sf.j2s.ui.wizards.Java2ScriptProjectWizard, []);
this.setDefaultPageImageDescriptor (org.eclipse.jdt.internal.ui.JavaPluginImages.DESC_WIZBAN_NEWJPRJ);
this.setDialogSettings (org.eclipse.jdt.internal.ui.JavaPlugin.getDefault ().getDialogSettings ());
this.setWindowTitle (org.eclipse.jdt.internal.ui.wizards.NewWizardMessages.JavaProjectWizard_title);
this.fFirstPage = pageOne;
this.fSecondPage = pageTwo;
}, "org.eclipse.jdt.ui.wizards.NewJavaProjectWizardPageOne,org.eclipse.jdt.ui.wizards.NewJavaProjectWizardPageTwo");
Clazz.overrideMethod (c$, "addPages", 
function () {
if (this.fFirstPage == null) this.fFirstPage =  new org.eclipse.jdt.ui.wizards.NewJavaProjectWizardPageOne ();
this.addPage (this.fFirstPage);
if (this.fSecondPage == null) this.fSecondPage =  new org.eclipse.jdt.ui.wizards.NewJavaProjectWizardPageTwo (this.fFirstPage);
this.addPage (this.fSecondPage);
this.fFirstPage.init (this.getSelection (), this.getActivePart ());
});
Clazz.overrideMethod (c$, "finishPage", 
function (monitor) {
this.fSecondPage.performFinish (monitor);
}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "performFinish", 
function () {
var finished = Clazz.superCall (this, net.sf.j2s.ui.wizards.Java2ScriptProjectWizard, "performFinish", []);
if (finished) {
var newElement = this.getCreatedElement ();
var workingSets = this.fFirstPage.getWorkingSets ();
if (workingSets.length > 0) {
org.eclipse.ui.PlatformUI.getWorkbench ().getWorkingSetManager ().addToWorkingSets (newElement, workingSets);
}org.eclipse.ui.wizards.newresource.BasicNewProjectResourceWizard.updatePerspective (this.fConfigElement);
this.selectAndReveal (this.fSecondPage.getJavaProject ().getProject ());
$wt.widgets.Display.getDefault ().asyncExec (((Clazz.isClassDefined ("net.sf.j2s.ui.wizards.Java2ScriptProjectWizard$1") ? 0 : net.sf.j2s.ui.wizards.Java2ScriptProjectWizard.$Java2ScriptProjectWizard$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.wizards.Java2ScriptProjectWizard$1, this, Clazz.cloneFinals ("newElement", newElement))));
var monitor = null;
var jproject = this.getCreatedElement ();
var project = jproject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
var file =  new java.io.File (prjFolder, ".j2s");
var props =  new java.util.Properties ();
try {
var path = jproject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
props.setProperty ("j2s.output.path", relativePath);
} else {
props.setProperty ("j2s.output.path", "");
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jdt.core.JavaModelException)) {
e.printStackTrace ();
} else {
throw e;
}
}
var classpathModel =  new net.sf.j2s.ui.property.J2SClasspathModel ();
var allResources = net.sf.j2s.ui.resources.ExternalResources.getAllResources ();
var j2sLibPath = null;
if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
if ((allResources[0][0]).startsWith ("|")) {
allResources[0][0] = allResources[0][0].substring (1).$replace ('\\', '/');
}j2sLibPath = allResources[0][0].substring (0, allResources[0][0].lastIndexOf ("/") + 1);
} else {
j2sLibPath = "../net.sf.j2s.lib/j2slib/";
}var entry = net.sf.j2s.ui.launching.JavaRuntime.newArchiveRuntimeClasspathEntry (j2sLibPath + "/java.runtime.j2x");
if (entry != null) {
(entry).setAbsolute (true);
classpathModel.addResource (entry);
}this.updateJava2ScriptLibraries (classpathModel, j2sLibPath);
var buffer =  new StringBuffer ();
var resources = classpathModel.getResources ();
for (var i = 0; i < resources.length; i++) {
var res = resources[i];
var resPath = null;
resPath = res.toResourceString ();
if (res.isAbsolute ()) {
resPath = net.sf.j2s.ui.property.FileUtil.toRelativePath (resPath.substring (1),  new java.io.File (prjFolder).getAbsolutePath ());
}if (resPath != null) {
if (buffer.length () != 0) {
buffer.append (',');
}buffer.append (resPath);
}}
props.setProperty ("j2s.resources.list", buffer.toString ());
props.setProperty ("j2s.abandoned.resources.list", "");
props.setProperty ("j2s.compiler.status", "enable");
try {
props.store ( new java.io.FileOutputStream (file), "Java2Script Configuration");
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
this.updateJava2ScriptProject (prjFolder, props.getProperty ("j2s.output.path"));
try {
project.refreshLocal (1, null);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
try {
var pn =  new net.sf.j2s.core.Java2ScriptProjectNature ();
pn.setProject (project);
pn.configure ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
try {
project.build (15, monitor);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}return finished;
});
Clazz.defineMethod (c$, "getActivePart", 
($fz = function () {
var activeWindow = this.getWorkbench ().getActiveWorkbenchWindow ();
if (activeWindow != null) {
var activePage = activeWindow.getActivePage ();
if (activePage != null) {
return activePage.getActivePart ();
}}return null;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "handleFinishException", 
function (shell, e) {
var title = org.eclipse.jdt.internal.ui.wizards.NewWizardMessages.JavaProjectWizard_op_error_title;
var message = org.eclipse.jdt.internal.ui.wizards.NewWizardMessages.JavaProjectWizard_op_error_create_message;
org.eclipse.jdt.internal.ui.util.ExceptionHandler.handle (e, this.getShell (), title, message);
}, "$wt.widgets.Shell,java.lang.reflect.InvocationTargetException");
Clazz.overrideMethod (c$, "setInitializationData", 
function (cfig, propertyName, data) {
this.fConfigElement = cfig;
}, "org.eclipse.core.runtime.IConfigurationElement,~S,~O");
Clazz.defineMethod (c$, "performCancel", 
function () {
this.fSecondPage.performCancel ();
return Clazz.superCall (this, net.sf.j2s.ui.wizards.Java2ScriptProjectWizard, "performCancel", []);
});
Clazz.overrideMethod (c$, "getCreatedElement", 
function () {
return this.fSecondPage.getJavaProject ();
});
Clazz.defineMethod (c$, "updateJava2ScriptWizardTitle", 
function () {
this.setWindowTitle (this.getWindowTitle () + " with Java2Script Enabled");
});
Clazz.defineMethod (c$, "updateJava2ScriptLibraries", 
function (classpathModel, j2sLibPath) {
}, "net.sf.j2s.ui.property.J2SClasspathModel,~S");
Clazz.defineMethod (c$, "updateJava2ScriptProject", 
function (prjFolder, binRelative) {
}, "~S,~S");
Clazz.defineMethod (c$, "updateJavaLibraries", 
function (defaultEntries) {
var list =  new java.util.ArrayList ();
for (var i = 0; i < defaultEntries.length; i++) {
list.add (i, defaultEntries[i]);
}
list.add (org.eclipse.jdt.core.JavaCore.newVariableEntry ( new org.eclipse.core.runtime.Path ("J2S_ANNOTATION"),  new org.eclipse.core.runtime.Path ("J2S_ANNOTATION_SRC"), null));
return list.toArray ( new Array (list.size ()));
}, "~A");
c$.$Java2ScriptProjectWizard$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.wizards, "Java2ScriptProjectWizard$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var activePart = this.b$["net.sf.j2s.ui.wizards.Java2ScriptProjectWizard"].getActivePart ();
if (Clazz.instanceOf (activePart, org.eclipse.jdt.ui.IPackagesViewPart)) {
( new org.eclipse.jdt.ui.actions.ShowInPackageViewAction (activePart.getSite ())).run (this.f$.newElement);
}});
c$ = Clazz.p0p ();
};
});
