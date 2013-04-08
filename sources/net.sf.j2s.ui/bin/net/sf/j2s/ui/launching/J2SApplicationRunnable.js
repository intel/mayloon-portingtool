Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (null, "net.sf.j2s.ui.launching.J2SApplicationRunnable", ["java.io.File", "java.net.URL", "net.sf.j2s.ui.Java2ScriptUIPlugin", "$wt.program.Program", "org.eclipse.ui.actions.ActionFactory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.configuration = null;
this.url = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.launching, "J2SApplicationRunnable", null, Runnable);
Clazz.makeConstructor (c$, 
function (configuration, url) {
this.configuration = configuration;
this.url = url;
}, "org.eclipse.debug.core.ILaunchConfiguration,~S");
Clazz.overrideMethod (c$, "run", 
function () {
var isToViewInConsole = true;
var isViewFast = false;
var isViewMaximize = false;
try {
var store = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getPreferenceStore ();
var preferred = store.getBoolean ("open-j2s-app-in-inner-console");
isToViewInConsole = this.configuration.getAttribute ("view.in.j2s.console", preferred);
isViewMaximize = this.configuration.getAttribute ("maximize.j2s.console", false);
isViewFast = this.configuration.getAttribute ("fast.view.j2s.console", false);
} catch (e1) {
if (Clazz.instanceOf (e1, org.eclipse.core.runtime.CoreException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
if (!isToViewInConsole) {
if (this.url != null && this.url.length != 0) {
try {
var file =  new java.net.URL (this.url).getFile ();
var win32 = ((System.getProperty ("os.name").indexOf ("Windows") != -1) || (System.getProperty ("os.name").indexOf ("windows") != -1));
if (win32 && file.startsWith ("/")) {
file = file.substring (1);
}file = file.$replace ('/', java.io.File.separatorChar);
$wt.program.Program.launch (file);
} catch (e1) {
if (Clazz.instanceOf (e1, java.net.MalformedURLException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
}return ;
}var activePage = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getWorkbench ().getWorkbenchWindows ()[0].getActivePage ();
var console = activePage.findView ("net.sf.j2s.ui.console.J2SConsoleView");
if (console == null) {
try {
console = activePage.showView ("net.sf.j2s.ui.console.J2SConsoleView");
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.ui.PartInitException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}if (console != null) {
var j2sConsole = console;
var page = j2sConsole.getViewSite ().getWorkbenchWindow ().getActivePage ();
var wp = page;
var ref = wp.findViewReference ("net.sf.j2s.ui.console.J2SConsoleView");
if (isViewFast && !wp.isFastView (ref)) {
wp.addFastView (ref);
}page.activate (j2sConsole);
j2sConsole.setFocus ();
if (isViewMaximize) {
var action = org.eclipse.ui.actions.ActionFactory.MAXIMIZE.create (j2sConsole.getViewSite ().getWorkbenchWindow ());
action.run ();
}if (this.url != null) {
j2sConsole.browse (this.url);
}}});
});
