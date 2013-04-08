Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["$wt.events.SelectionListener"], "net.sf.j2s.ui.property.J2SAddProjectAction", ["java.io.File", "$.FileInputStream", "java.util.ArrayList", "$.Properties", "net.sf.j2s.ui.launching.JavaRuntime", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.core.runtime.MultiStatus", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin", "org.eclipse.jdt.internal.debug.ui.actions.ActionMessages", "$.ProjectSelectionDialog"], function () {
c$ = Clazz.decorateAsClass (function () {
this.page = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "J2SAddProjectAction", null, $wt.events.SelectionListener);
Clazz.makeConstructor (c$, 
function (page) {
this.page = page;
}, "net.sf.j2s.ui.property.J2SConfigPage");
Clazz.defineMethod (c$, "getPossibleAdditions", 
function () {
var projects;
var root = org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ();
try {
projects = org.eclipse.jdt.core.JavaCore.create (root).getJavaProjects ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jdt.core.JavaModelException)) {
org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin.log (e);
projects =  new Array (0);
} else {
throw e;
}
}
var remaining =  new java.util.ArrayList ();
var path = null;
if (this.page.j2sFile != null) {
path = this.page.j2sFile.getAbsolutePath ();
}for (var i = 0; i < projects.length; i++) {
var file =  new java.io.File (projects[i].getProject ().getLocation ().toOSString (), ".j2s");
if (file.exists () && (path != null && !path.equals (file.getAbsolutePath ()))) {
var props =  new java.util.Properties ();
var isEnabled = false;
try {
props.load ( new java.io.FileInputStream (file));
var status = props.getProperty ("j2s.compiler.status");
if ("enable".equals (status)) {
isEnabled = true;
}} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e1 = e$$;
{
e1.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e1 = e$$;
{
e1.printStackTrace ();
}
} else {
throw e$$;
}
}
if (isEnabled) {
var ress = this.page.classpathModel.resources;
var existed = false;
for (var iter = ress.iterator (); iter.hasNext (); ) {
var r = iter.next ();
if (Clazz.instanceOf (r, net.sf.j2s.ui.classpath.ProjectResources)) {
var pr = r;
try {
if (pr.getAbsoluteFile ().getCanonicalPath ().equals (file.getCanonicalPath ())) {
existed = true;
break;
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}
if (!existed) {
remaining.add (projects[i]);
}}}}
var alreadySelected =  new java.util.ArrayList ();
remaining.removeAll (alreadySelected);
return remaining;
});
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var projects = this.getPossibleAdditions ();
var dialog =  new org.eclipse.jdt.internal.debug.ui.actions.ProjectSelectionDialog (this.page.getShell (), projects);
dialog.setTitle (org.eclipse.jdt.internal.debug.ui.actions.ActionMessages.AddProjectAction_Project_Selection_2);
var status =  new org.eclipse.core.runtime.MultiStatus (org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin.getUniqueIdentifier (), 150, "One or more exceptions occurred while adding projects.", null);
net.sf.j2s.ajax.AWindowDelegate.asyncOpen (dialog, this, function () {
if (dialog.getReturnCode () == 0) {
var expandedElements = this.page.viewer.getExpandedElements ();
var selections = dialog.getResult ();
var added = false;
for (var i = 0; i < selections.length; i++) {
var jp = selections[i];
var entry = net.sf.j2s.ui.launching.JavaRuntime.newProjectRuntimeClasspathEntry (jp);
if (entry != null) {
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
});
