Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.debug.ui.AbstractLaunchConfigurationTab"], "net.sf.j2s.ui.launching.J2SConsoleOptionsTab", ["java.io.File", "$.FileInputStream", "java.util.Properties", "net.sf.j2s.ui.Java2ScriptUIPlugin", "net.sf.j2s.ui.launching.J2SLaunchingUtil", "net.sf.j2s.ui.property.FileUtil", "net.sf.j2s.ui.resources.ExternalResources", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.internal.debug.ui.JavaDebugImages", "org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants", "$wt.events.FocusAdapter", "$.ModifyListener", "$.SelectionAdapter", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Button", "$.Composite", "$.Group", "$.Label", "$.Text"], function () {
c$ = Clazz.decorateAsClass (function () {
this.btnInner = null;
this.btnCompatiable = null;
this.btnCompatiableRawJS = null;
this.btnFastView = null;
this.btnMaximize = null;
this.btnUseGlobalURL = null;
this.btnExternal = null;
this.lblJ2SLib = null;
this.txtJ2SLib = null;
this.lblBin = null;
this.txtBin = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.launching, "J2SConsoleOptionsTab", org.eclipse.debug.ui.AbstractLaunchConfigurationTab);
Clazz.overrideMethod (c$, "createControl", 
function (parent) {
var font = parent.getFont ();
var comp =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout (1, true);
comp.setLayout (layout);
comp.setFont (font);
var gd =  new $wt.layout.GridData (1808);
comp.setLayoutData (gd);
this.setControl (comp);
var group =  new $wt.widgets.Group (comp, 0);
group.setFont (font);
layout =  new $wt.layout.GridLayout ();
group.setLayout (layout);
group.setLayoutData ( new $wt.layout.GridData (768));
var controlName = "Java2Script Console";
group.setText (controlName);
this.btnInner =  new $wt.widgets.Button (group, 16);
this.btnInner.setText ("Inner J2S Console");
this.btnInner.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SConsoleOptionsTab$1") ? 0 : net.sf.j2s.ui.launching.J2SConsoleOptionsTab.$J2SConsoleOptionsTab$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SConsoleOptionsTab$1, this, null)));
this.btnFastView =  new $wt.widgets.Button (group, 32);
this.btnFastView.setText ("Make J2S console as fast view automatically");
var gdfv =  new $wt.layout.GridData ();
gdfv.horizontalIndent = 32;
this.btnFastView.setLayoutData (gdfv);
this.btnFastView.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SConsoleOptionsTab$2") ? 0 : net.sf.j2s.ui.launching.J2SConsoleOptionsTab.$J2SConsoleOptionsTab$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SConsoleOptionsTab$2, this, null)));
this.btnMaximize =  new $wt.widgets.Button (group, 32);
this.btnMaximize.setText ("Maximize J2S console automatically");
var gdm =  new $wt.layout.GridData ();
gdm.horizontalIndent = 32;
this.btnMaximize.setLayoutData (gdm);
this.btnMaximize.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SConsoleOptionsTab$3") ? 0 : net.sf.j2s.ui.launching.J2SConsoleOptionsTab.$J2SConsoleOptionsTab$3$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SConsoleOptionsTab$3, this, null)));
this.btnExternal =  new $wt.widgets.Button (group, 16);
this.btnExternal.setText ("Registered external browsers, like Firefox, IE");
this.btnExternal.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SConsoleOptionsTab$4") ? 0 : net.sf.j2s.ui.launching.J2SConsoleOptionsTab.$J2SConsoleOptionsTab$4$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SConsoleOptionsTab$4, this, null)));
this.btnCompatiable =  new $wt.widgets.Button (comp, 32);
this.btnCompatiable.setText ("Generate codes with Mozilla Add-on supports");
this.btnCompatiable.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SConsoleOptionsTab$5") ? 0 : net.sf.j2s.ui.launching.J2SConsoleOptionsTab.$J2SConsoleOptionsTab$5$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SConsoleOptionsTab$5, this, null)));
this.btnCompatiableRawJS =  new $wt.widgets.Button (comp, 32);
var gdjs =  new $wt.layout.GridData ();
gdjs.horizontalIndent = 32;
this.btnCompatiableRawJS.setLayoutData (gdjs);
this.btnCompatiableRawJS.setText ("Write compatiable JavaScript instead of including mozilla.addon.js");
this.btnCompatiableRawJS.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SConsoleOptionsTab$6") ? 0 : net.sf.j2s.ui.launching.J2SConsoleOptionsTab.$J2SConsoleOptionsTab$6$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SConsoleOptionsTab$6, this, null)));
this.btnUseGlobalURL =  new $wt.widgets.Button (comp, 32);
this.btnUseGlobalURL.setText ("Use global *.js URL");
this.btnUseGlobalURL.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SConsoleOptionsTab$7") ? 0 : net.sf.j2s.ui.launching.J2SConsoleOptionsTab.$J2SConsoleOptionsTab$7$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SConsoleOptionsTab$7, this, null)));
var txtComp =  new $wt.widgets.Composite (comp, 0);
var gdtxt =  new $wt.layout.GridData ();
gdtxt.horizontalIndent = 32;
txtComp.setLayoutData (gdtxt);
txtComp.setLayout ( new $wt.layout.GridLayout (2, false));
this.lblJ2SLib =  new $wt.widgets.Label (txtComp, 0);
this.lblJ2SLib.setText ("J2SLib base URL:");
this.txtJ2SLib =  new $wt.widgets.Text (txtComp, 2048);
var gdtxt1 =  new $wt.layout.GridData ();
gdtxt1.widthHint = 240;
this.txtJ2SLib.setLayoutData (gdtxt1);
var focusListener = ((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SConsoleOptionsTab$8") ? 0 : net.sf.j2s.ui.launching.J2SConsoleOptionsTab.$J2SConsoleOptionsTab$8$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SConsoleOptionsTab$8, this, null));
var modifyListener = ((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SConsoleOptionsTab$9") ? 0 : net.sf.j2s.ui.launching.J2SConsoleOptionsTab.$J2SConsoleOptionsTab$9$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SConsoleOptionsTab$9, this, null));
this.txtJ2SLib.addFocusListener (focusListener);
this.txtJ2SLib.addModifyListener (modifyListener);
this.lblBin =  new $wt.widgets.Label (txtComp, 0);
this.lblBin.setText ("Binary folder URL:");
this.txtBin =  new $wt.widgets.Text (txtComp, 2048);
var gdtxt2 =  new $wt.layout.GridData ();
gdtxt2.widthHint = 240;
this.txtBin.setLayoutData (gdtxt2);
this.txtBin.addFocusListener (focusListener);
this.txtBin.addModifyListener (modifyListener);
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "setDefaults", 
function (configuration) {
configuration.setAttribute ("fast.view.j2s.console", false);
configuration.setAttribute ("maximize.j2s.console", false);
var store = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getPreferenceStore ();
var preferred = store.getBoolean ("open-j2s-app-in-inner-console");
configuration.setAttribute ("view.in.j2s.console", preferred);
preferred = store.getBoolean ("with-mozilla-addon-compatiable");
configuration.setAttribute ("j2s.mozilla.addon.compatiable", preferred);
configuration.setAttribute ("j2s.mozilla.addon.compatiable.raw.js", true);
configuration.setAttribute ("use.global.alaa.url", false);
configuration.setAttribute ("global.j2slib.url", "http://archive.java2script.org/" + this.getCurrentReleaseAlias (configuration) + "/");
configuration.setAttribute ("global.bin.url", this.getCurrentBinPath (configuration));
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.overrideMethod (c$, "initializeFrom", 
function (configuration) {
try {
this.btnFastView.setSelection (configuration.getAttribute ("fast.view.j2s.console", false));
this.btnMaximize.setSelection (configuration.getAttribute ("maximize.j2s.console", false));
this.btnCompatiableRawJS.setSelection (configuration.getAttribute ("j2s.mozilla.addon.compatiable.raw.js", true));
var store = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getPreferenceStore ();
var preferred = store.getBoolean ("open-j2s-app-in-inner-console");
var external = configuration.getAttribute ("view.in.j2s.console", preferred);
this.btnInner.setSelection (external);
this.btnExternal.setSelection (!external);
this.btnFastView.setEnabled (external);
this.btnMaximize.setEnabled (external);
preferred = store.getBoolean ("with-mozilla-addon-compatiable");
var compatiable = configuration.getAttribute ("j2s.mozilla.addon.compatiable", preferred);
this.btnCompatiable.setSelection (compatiable);
this.btnCompatiableRawJS.setEnabled (compatiable);
var useGlobal = configuration.getAttribute ("use.global.alaa.url", false);
this.btnUseGlobalURL.setSelection (useGlobal);
this.lblJ2SLib.setEnabled (useGlobal);
this.lblBin.setEnabled (useGlobal);
this.txtJ2SLib.setEnabled (useGlobal);
this.txtBin.setEnabled (useGlobal);
this.txtJ2SLib.setText (configuration.getAttribute ("global.j2slib.url", "http://archive.java2script.org/" + this.getCurrentReleaseAlias (configuration) + "/"));
this.txtBin.setText (configuration.getAttribute ("global.bin.url", this.getCurrentBinPath (configuration)));
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, "org.eclipse.debug.core.ILaunchConfiguration");
Clazz.defineMethod (c$, "getCurrentBinPath", 
($fz = function (configuration) {
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
try {
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return null;
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return null;
}var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = "./";
if (idx != -1) {
relativePath = path.substring (idx + 1);
}return relativePath;
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.eclipse.jdt.core.JavaModelException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.CoreException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
return "bin/";
}, $fz.isPrivate = true, $fz), "org.eclipse.debug.core.ILaunchConfiguration");
Clazz.defineMethod (c$, "getCurrentJ2SLibPath", 
($fz = function (workingDir) {
var allResources = net.sf.j2s.ui.resources.ExternalResources.getAllResources ();
var j2sLibPath = null;
if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
if ((allResources[0][0]).startsWith ("|")) {
allResources[0][0] = net.sf.j2s.ui.property.FileUtil.toRelativePath (allResources[0][0].substring (1), workingDir.getAbsolutePath ());
;}j2sLibPath = allResources[0][0].substring (0, allResources[0][0].lastIndexOf ("/") + 1);
} else {
j2sLibPath = "../net.sf.j2s.lib/j2slib/";
}return j2sLibPath;
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "getCurrentReleaseAlias", 
($fz = function (configuration) {
var workingDir = null;
try {
workingDir = net.sf.j2s.ui.launching.J2SLaunchingUtil.getWorkingDirectory (configuration);
var j2sLibPath = this.getCurrentJ2SLibPath (workingDir);
var j2slibFolder =  new java.io.File (workingDir.getAbsolutePath (), j2sLibPath);
var j2sRelease =  new java.io.File (j2slibFolder, ".release");
var release =  new java.util.Properties ();
var alias = "2.0.0";
var version = "20081203";
release.put ("alias", alias);
release.put ("version", version);
if (j2sRelease.exists ()) {
try {
release.load ( new java.io.FileInputStream (j2sRelease));
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
alias = release.getProperty ("alias");
version = release.getProperty ("version");
}return alias;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
return "2.0.0";
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.debug.core.ILaunchConfiguration");
Clazz.overrideMethod (c$, "performApply", 
function (configuration) {
configuration.setAttribute ("fast.view.j2s.console", this.btnFastView.getSelection ());
configuration.setAttribute ("maximize.j2s.console", this.btnMaximize.getSelection ());
configuration.setAttribute ("view.in.j2s.console", this.btnInner.getSelection ());
configuration.setAttribute ("j2s.mozilla.addon.compatiable", this.btnCompatiable.getSelection ());
configuration.setAttribute ("j2s.mozilla.addon.compatiable.raw.js", this.btnCompatiableRawJS.getSelection ());
configuration.setAttribute ("use.global.alaa.url", this.btnUseGlobalURL.getSelection ());
configuration.setAttribute ("global.j2slib.url", this.txtJ2SLib.getText ());
configuration.setAttribute ("global.bin.url", this.txtBin.getText ());
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.overrideMethod (c$, "getName", 
function () {
return "Miscellaneous";
});
Clazz.overrideMethod (c$, "getImage", 
function () {
return net.sf.j2s.ui.launching.J2SConsoleOptionsTab.getClasspathImage ();
});
c$.getClasspathImage = Clazz.defineMethod (c$, "getClasspathImage", 
function () {
return org.eclipse.jdt.internal.debug.ui.JavaDebugImages.get ("IMG_OBJS_MONITOR");
});
Clazz.overrideMethod (c$, "activated", 
function (workingCopy) {
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.overrideMethod (c$, "deactivated", 
function (workingCopy) {
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
c$.$J2SConsoleOptionsTab$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SConsoleOptionsTab$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].updateLaunchConfigurationDialog ();
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnFastView.setEnabled (this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnInner.getSelection ());
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnMaximize.setEnabled (this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnInner.getSelection ());
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleOptionsTab$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SConsoleOptionsTab$2", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleOptionsTab$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SConsoleOptionsTab$3", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleOptionsTab$4$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SConsoleOptionsTab$4", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].updateLaunchConfigurationDialog ();
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnFastView.setEnabled (this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnInner.getSelection ());
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnMaximize.setEnabled (this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnInner.getSelection ());
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleOptionsTab$5$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SConsoleOptionsTab$5", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].updateLaunchConfigurationDialog ();
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnCompatiableRawJS.setEnabled (this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnCompatiable.getSelection ());
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleOptionsTab$6$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SConsoleOptionsTab$6", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleOptionsTab$7$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SConsoleOptionsTab$7", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].updateLaunchConfigurationDialog ();
var selection = this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].btnUseGlobalURL.getSelection ();
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].lblJ2SLib.setEnabled (selection);
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].lblBin.setEnabled (selection);
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].txtJ2SLib.setEnabled (selection);
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].txtBin.setEnabled (selection);
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleOptionsTab$8$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SConsoleOptionsTab$8", $wt.events.FocusAdapter);
Clazz.overrideMethod (c$, "focusGained", 
function (e) {
(e.widget).selectAll ();
}, "$wt.events.FocusEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleOptionsTab$9$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SConsoleOptionsTab$9", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (e) {
this.b$["net.sf.j2s.ui.launching.J2SConsoleOptionsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
};
});
