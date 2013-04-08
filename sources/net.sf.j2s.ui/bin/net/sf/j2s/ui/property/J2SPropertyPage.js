Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["org.eclipse.ui.dialogs.PropertyPage"], "net.sf.j2s.ui.property.J2SPropertyPage", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "java.lang.StringBuffer", "java.util.Properties", "net.sf.j2s.core.Java2ScriptProjectNature", "net.sf.j2s.ui.property.FileUtil", "$.J2SConfigPage", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isEnabled = false;
this.configPage = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "J2SPropertyPage", org.eclipse.ui.dialogs.PropertyPage);
Clazz.defineMethod (c$, "updateConfig", 
($fz = function () {
var jproject = this.getElement ();
var project = jproject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
var file =  new java.io.File (prjFolder, ".j2s");
var props =  new java.util.Properties ();
if (file.exists ()) {
try {
props.load ( new java.io.FileInputStream (file));
} catch (e$$) {
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
var ress = this.configPage.classpathModel.resources;
var buffer =  new StringBuffer ();
for (var iter = ress.iterator (); iter.hasNext (); ) {
var res = iter.next ();
var resPath = null;
resPath = res.toResourceString ();
if (res.isAbsolute ()) {
resPath = net.sf.j2s.ui.property.FileUtil.toRelativePath (resPath.substring (1), file.getAbsolutePath ());
}if (resPath != null) {
if (buffer.length () != 0) {
buffer.append (',');
}buffer.append (resPath);
}}
ress = this.configPage.classpathModel.unitClasses;
for (var iter = ress.iterator (); iter.hasNext (); ) {
var res = iter.next ();
var resPath = res.toResourceString ();
if (resPath != null) {
if (buffer.length () != 0) {
buffer.append (',');
}buffer.append (resPath);
}}
props.setProperty ("j2s.resources.list", buffer.toString ());
ress = this.configPage.classpathModel.abandonedClasses;
buffer =  new StringBuffer ();
for (var iter = ress.iterator (); iter.hasNext (); ) {
var res = iter.next ();
var resPath = res.toResourceString ();
if (resPath != null) {
if (buffer.length () != 0) {
buffer.append (',');
}buffer.append (resPath);
}}
props.setProperty ("j2s.abandoned.resources.list", buffer.toString ());
} else if (this.configPage.isCompilerEnabled ()) {
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
var ress = this.configPage.classpathModel.resources;
var buffer =  new StringBuffer ();
for (var iter = ress.iterator (); iter.hasNext (); ) {
var res = iter.next ();
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
}if (this.configPage.isCompilerEnabled ()) {
props.setProperty ("j2s.compiler.status", "enable");
} else {
props.setProperty ("j2s.compiler.status", "disable");
}if (!this.configPage.isCompilerEnabled () && !file.exists ()) {
} else {
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
try {
project.refreshLocal (1, null);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "createContents", 
function (parent) {
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
composite.setLayout (layout);
var data =  new $wt.layout.GridData (4);
data.grabExcessHorizontalSpace = true;
composite.setLayoutData (data);
var jproject = this.getElement ();
var project = jproject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
var file =  new java.io.File (prjFolder, ".j2s");
this.configPage =  new net.sf.j2s.ui.property.J2SConfigPage (composite, 0);
this.configPage.initConfigPage (file);
this.isEnabled = this.configPage.isCompilerEnabled ();
return composite;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "performOk", 
function () {
this.updateConfig ();
if (this.configPage.isCompilerEnabled ()) {
if (Clazz.instanceOf (this.getContainer (), org.eclipse.jface.preference.PreferenceDialog)) {
var dialog = this.getContainer ();
dialog.close ();
}if (this.isEnabled) {
return true;
}var monitor = null;
var jproject = this.getElement ();
var project = jproject.getProject ();
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
} else {
var jproject = this.getElement ();
var project = jproject.getProject ();
try {
var pn =  new net.sf.j2s.core.Java2ScriptProjectNature ();
pn.setProject (project);
pn.deconfigure ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}return true;
});
});
