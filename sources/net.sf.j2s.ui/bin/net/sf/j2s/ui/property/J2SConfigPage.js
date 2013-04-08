Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["$wt.widgets.Composite", "java.util.HashSet"], "net.sf.j2s.ui.property.J2SConfigPage", ["java.lang.StringBuffer", "java.util.Properties", "net.sf.j2s.ui.classpath.CompositeResources", "net.sf.j2s.ui.launching.JavaRuntime", "net.sf.j2s.ui.property.FileUtil", "$.J2SAbandonClassesAction", "$.J2SAddInnerJarAction", "$.J2SAddJarAction", "$.J2SAddProjectAction", "$.J2SClasspathContentProvider", "$.J2SClasspathLabelProvider", "$.J2SClasspathModel", "net.sf.j2s.ui.resources.ExternalResources", "org.eclipse.debug.internal.ui.SWTFactory", "org.eclipse.jface.viewers.ISelectionChangedListener", "$.StructuredSelection", "$.TreeViewer", "$wt.events.SelectionAdapter", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Button", "$.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buttonEnable = null;
this.buttonDisable = null;
this.compilerEnabled = true;
this.compilerStatusComp = null;
this.buttonUp = null;
this.viewer = null;
this.classpathModel = null;
this.buttonDown = null;
this.buttonRemove = null;
this.buttonAbandon = null;
this.buttonRestore = null;
this.buttonAddRes = null;
this.buttonAddInnerRes = null;
this.buttonAddPrj = null;
this.buttonDefault = null;
this.j2sFile = null;
this.listeners = null;
this.addInnerJarAction = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "J2SConfigPage", $wt.widgets.Composite);
Clazz.prepareFields (c$, function () {
this.listeners =  new java.util.HashSet ();
});
Clazz.defineMethod (c$, "addConfigModifiedListener", 
function (listener) {
this.listeners.add (listener);
}, "net.sf.j2s.ui.property.IJ2SConfigModifiedListener");
Clazz.defineMethod (c$, "removeConfigModifiedListener", 
function (listener) {
this.listeners.remove (listener);
}, "net.sf.j2s.ui.property.IJ2SConfigModifiedListener");
Clazz.defineMethod (c$, "fireConfigModified", 
function () {
for (var iter = this.listeners.iterator (); iter.hasNext (); ) {
var listener = iter.next ();
listener.configModified ();
}
});
Clazz.makeConstructor (c$, 
function (parent, style) {
Clazz.superConstructor (this, net.sf.j2s.ui.property.J2SConfigPage, [parent, style]);
var gl =  new $wt.layout.GridLayout ();
gl.numColumns = 1;
this.setLayout (gl);
this.setLayoutData ( new $wt.layout.GridData (1808));
this.compilerStatusComp =  new $wt.widgets.Composite (this, 0);
var gl1 =  new $wt.layout.GridLayout ();
gl1.numColumns = 3;
this.compilerStatusComp.setLayout (gl1);
var gd1 =  new $wt.layout.GridData (768);
this.compilerStatusComp.setLayoutData (gd1);
this.buttonEnable =  new $wt.widgets.Button (this.compilerStatusComp, 2);
 new $wt.widgets.Label (this.compilerStatusComp, 0).setText (":");
this.buttonDisable =  new $wt.widgets.Button (this.compilerStatusComp, 2);
this.buttonEnable.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SConfigPage$1") ? 0 : net.sf.j2s.ui.property.J2SConfigPage.$J2SConfigPage$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SConfigPage$1, this, null)));
this.buttonDisable.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SConfigPage$2") ? 0 : net.sf.j2s.ui.property.J2SConfigPage.$J2SConfigPage$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SConfigPage$2, this, null)));
var viewerComp =  new $wt.widgets.Composite (this, 0);
var gl3 =  new $wt.layout.GridLayout ();
gl3.numColumns = 2;
viewerComp.setLayout (gl3);
var gd2 =  new $wt.layout.GridData (1808);
gd2.heightHint = 250;
viewerComp.setLayoutData (gd2);
this.viewer =  new org.eclipse.jface.viewers.TreeViewer (viewerComp, 2050);
this.viewer.setContentProvider ( new net.sf.j2s.ui.property.J2SClasspathContentProvider ());
this.viewer.setLabelProvider ( new net.sf.j2s.ui.property.J2SClasspathLabelProvider ());
this.viewer.getTree ().setLayoutData ( new $wt.layout.GridData (1808));
this.viewer.addSelectionChangedListener (((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SConfigPage$3") ? 0 : net.sf.j2s.ui.property.J2SConfigPage.$J2SConfigPage$3$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SConfigPage$3, this, null)));
var actionComp =  new $wt.widgets.Composite (viewerComp, 0);
actionComp.setLayout ( new $wt.layout.GridLayout ());
actionComp.setLayoutData ( new $wt.layout.GridData (1040));
this.buttonAddInnerRes = org.eclipse.debug.internal.ui.SWTFactory.createPushButton (actionComp, "Add Libraries", null);
this.addInnerJarAction =  new net.sf.j2s.ui.property.J2SAddInnerJarAction (this);
this.buttonAddInnerRes.addSelectionListener (this.addInnerJarAction);
this.buttonAddRes = org.eclipse.debug.internal.ui.SWTFactory.createPushButton (actionComp, "Add Resources", null);
this.buttonAddRes.addSelectionListener ( new net.sf.j2s.ui.property.J2SAddJarAction (this));
this.buttonAddPrj = org.eclipse.debug.internal.ui.SWTFactory.createPushButton (actionComp, "Add Projects", null);
this.buttonAddPrj.addSelectionListener ( new net.sf.j2s.ui.property.J2SAddProjectAction (this));
this.buttonUp = org.eclipse.debug.internal.ui.SWTFactory.createPushButton (actionComp, "Up", null);
this.buttonUp.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SConfigPage$4") ? 0 : net.sf.j2s.ui.property.J2SConfigPage.$J2SConfigPage$4$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SConfigPage$4, this, null)));
this.buttonDown = org.eclipse.debug.internal.ui.SWTFactory.createPushButton (actionComp, "Down", null);
this.buttonDown.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SConfigPage$5") ? 0 : net.sf.j2s.ui.property.J2SConfigPage.$J2SConfigPage$5$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SConfigPage$5, this, null)));
this.buttonRemove = org.eclipse.debug.internal.ui.SWTFactory.createPushButton (actionComp, "Remove", null);
this.buttonRemove.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SConfigPage$6") ? 0 : net.sf.j2s.ui.property.J2SConfigPage.$J2SConfigPage$6$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SConfigPage$6, this, null)));
this.buttonAbandon = org.eclipse.debug.internal.ui.SWTFactory.createPushButton (actionComp, "Abandon Classes", null);
this.buttonAbandon.addSelectionListener ( new net.sf.j2s.ui.property.J2SAbandonClassesAction (this));
this.buttonRestore = org.eclipse.debug.internal.ui.SWTFactory.createPushButton (actionComp, "Restore Classes", null);
this.buttonRestore.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.property.J2SConfigPage$7") ? 0 : net.sf.j2s.ui.property.J2SConfigPage.$J2SConfigPage$7$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.property.J2SConfigPage$7, this, null)));
this.buttonDefault = org.eclipse.debug.internal.ui.SWTFactory.createPushButton (actionComp, "Restore Default Classpath", null);
var gd3 =  new $wt.layout.GridData ();
gd3.exclude = true;
this.buttonDefault.setLayoutData (gd3);
this.updateButtonGroup ();
}, "$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "forClasspathTab", 
function () {
var gd3 =  new $wt.layout.GridData ();
this.buttonDefault.setLayoutData (gd3);
var gd1 =  new $wt.layout.GridData (768);
gd1.exclude = true;
this.compilerStatusComp.setLayoutData (gd1);
});
Clazz.defineMethod (c$, "isLastElementSelected", 
($fz = function () {
var sels = this.getSelection ();
if (this.classpathModel.abandonedClasses.size () > 0) {
var res = this.classpathModel.abandonedClasses.get (this.classpathModel.abandonedClasses.size () - 1);
for (var i = 0; i < sels.length; i++) {
if (res === sels[i]) {
return true;
}}
}if (this.classpathModel.unitClasses.size () > 0) {
var res = this.classpathModel.unitClasses.get (this.classpathModel.unitClasses.size () - 1);
for (var i = 0; i < sels.length; i++) {
if (res === sels[i]) {
return true;
}}
}if (this.classpathModel.resources.size () > 0) {
var res = this.classpathModel.resources.get (this.classpathModel.resources.size () - 1);
for (var i = 0; i < sels.length; i++) {
if (res === sels[i]) {
return true;
}}
}return false;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isFirstElementSelected", 
($fz = function () {
var sels = this.getSelection ();
if (this.classpathModel.abandonedClasses.size () > 0) {
var res = this.classpathModel.abandonedClasses.get (0);
for (var i = 0; i < sels.length; i++) {
if (res === sels[i]) {
return true;
}}
}if (this.classpathModel.unitClasses.size () > 0) {
var res = this.classpathModel.unitClasses.get (0);
for (var i = 0; i < sels.length; i++) {
if (res === sels[i]) {
return true;
}}
}if (this.classpathModel.resources.size () > 0) {
var res = this.classpathModel.resources.get (0);
for (var i = 0; i < sels.length; i++) {
if (res === sels[i]) {
return true;
}}
}return false;
}, $fz.isPrivate = true, $fz));
c$.up = Clazz.defineMethod (c$, "up", 
($fz = function (sels, list) {
var size = list.size ();
for (var i = 1; i < size; i++) {
var obj = list.get (i);
for (var j = 0; j < sels.length; j++) {
if (sels[j] === obj) {
var t = list.get (i - 1);
list.set (i - 1, sels[j]);
list.set (i, t);
break;
}}
}
}, $fz.isPrivate = true, $fz), "~A,java.util.List");
c$.down = Clazz.defineMethod (c$, "down", 
($fz = function (sels, list) {
var size = list.size ();
for (var i = size - 2; i >= 0; i--) {
var obj = list.get (i);
for (var j = 0; j < sels.length; j++) {
if (sels[j] === obj) {
var t = list.get (i + 1);
list.set (i + 1, sels[j]);
list.set (i, t);
break;
}}
}
}, $fz.isPrivate = true, $fz), "~A,java.util.List");
Clazz.defineMethod (c$, "updateButtonGroup", 
function () {
this.buttonAbandon.setEnabled (true);
this.buttonRestore.setEnabled (false);
this.buttonRemove.setEnabled (false);
this.buttonDown.setEnabled (false);
this.buttonUp.setEnabled (false);
this.buttonAddPrj.setEnabled (false);
this.buttonAddRes.setEnabled (false);
this.buttonAddInnerRes.setEnabled (false);
if (!this.isNoContactedUnits ()) {
return ;
}if (this.isSelectionInOneCategory ()) {
this.buttonRemove.setEnabled (true);
if (!this.isLastElementSelected ()) {
this.buttonDown.setEnabled (true);
}if (!this.isFirstElementSelected ()) {
this.buttonUp.setEnabled (true);
}if (this.isResourcesSelected ()) {
this.buttonAddPrj.setEnabled (true);
this.buttonAddRes.setEnabled (true);
this.buttonAddInnerRes.setEnabled (true);
} else {
if (this.isAbandonsSelected ()) {
this.buttonRestore.setEnabled (true);
} else {
this.buttonAbandon.setEnabled (true);
}}} else if (!this.isSelectionContainsCategory () && this.getSelection ().length > 0) {
this.buttonRemove.setEnabled (true);
}if (this.getSelection ().length == 1) {
if (this.isResourceCategorySelected ()) {
this.buttonAddPrj.setEnabled (true);
this.buttonAddInnerRes.setEnabled (true);
this.buttonAddRes.setEnabled (true);
} else if (this.isAbandonedCategorySelected () && this.classpathModel.abandonedClasses.size () > 0) {
this.buttonRestore.setEnabled (true);
}}});
Clazz.defineMethod (c$, "isNoContactedUnits", 
($fz = function () {
var sels = this.getSelection ();
if (sels.length == 0) {
return true;
}var b1 = true;
for (var i = 0; i < sels.length; i++) {
if (Clazz.instanceOf (sels[i], net.sf.j2s.ui.classpath.ContactedUnitClass)) {
b1 = false;
break;
}if (Clazz.instanceOf (sels[i], net.sf.j2s.ui.classpath.CSSResource) && Clazz.instanceOf ((sels[i]).getParent (), net.sf.j2s.ui.classpath.ContactedClasses)) {
b1 = false;
break;
}}
return b1;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSelection", 
function () {
var selection = this.viewer.getSelection ();
if (selection.size () >= 1) {
return selection.toArray ();
} else {
return  new Array (0);
}});
Clazz.defineMethod (c$, "isSelectionInOneCategory", 
($fz = function () {
var sels = this.getSelection ();
if (sels.length == 0) {
return false;
}var b1 = false;
for (var i = 0; i < sels.length; i++) {
if (this.classpathModel.isResourceInResources (sels[i])) {
b1 = true;
break;
}}
var b2 = false;
for (var i = 0; i < sels.length; i++) {
if (this.classpathModel.isResourceInClasses (sels[i])) {
b2 = true;
break;
}}
if (b1 && b2) {
return false;
}var b3 = false;
for (var i = 0; i < sels.length; i++) {
if (this.classpathModel.isResourceInAbandons (sels[i])) {
b3 = true;
break;
}}
for (var i = 0; i < sels.length; i++) {
if (Clazz.instanceOf (sels[i], net.sf.j2s.ui.property.J2SCategory)) {
return false;
}}
if ((b1 && b3) || (b2 && b3)) {
return false;
}return b1 || b2 || b3;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isResourcesSelected", 
($fz = function () {
var sels = this.getSelection ();
var b = false;
var other = false;
for (var i = 0; i < sels.length; i++) {
if (this.classpathModel.isResourceInResources (sels[i])) {
b = true;
break;
} else {
other = true;
}}
return b && !other;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isResourceCategorySelected", 
($fz = function () {
var sels = this.getSelection ();
var b = false;
for (var i = 0; i < sels.length; i++) {
if (Clazz.instanceOf (sels[i], net.sf.j2s.ui.property.J2SCategory)) {
var ctg = sels[i];
if (net.sf.j2s.ui.property.J2SClasspathModel.categories[0].equals (ctg.getKey ())) {
b = true;
break;
}}}
return b;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isAbandonedCategorySelected", 
($fz = function () {
var sels = this.getSelection ();
var b = false;
for (var i = 0; i < sels.length; i++) {
if (Clazz.instanceOf (sels[i], net.sf.j2s.ui.property.J2SCategory)) {
var ctg = sels[i];
if (net.sf.j2s.ui.property.J2SClasspathModel.categories[net.sf.j2s.ui.property.J2SClasspathModel.categories.length - 1].equals (ctg.getKey ())) {
b = true;
break;
}}}
return b;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isClassesSelected", 
($fz = function () {
var sels = this.getSelection ();
var b = false;
for (var i = 0; i < sels.length; i++) {
if (this.classpathModel.isResourceInClasses (sels[i])) {
b = true;
break;
}}
return b;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isAbandonsSelected", 
($fz = function () {
var sels = this.getSelection ();
var b = false;
for (var i = 0; i < sels.length; i++) {
if (this.classpathModel.isResourceInAbandons (sels[i])) {
b = true;
break;
}}
return b;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isSelectionContainsCategory", 
($fz = function () {
var sels = this.getSelection ();
var b = false;
for (var i = 0; i < sels.length; i++) {
if (Clazz.instanceOf (sels[i], net.sf.j2s.ui.property.J2SCategory)) {
b = true;
break;
}}
return b;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initConfigPage", 
function (j2sFile) {
this.initConfigPage (j2sFile, null);
}, "java.io.File");
Clazz.defineMethod (c$, "initConfigPage", 
function (file, is) {
if (file != null) {
this.j2sFile = file;
}this.classpathModel =  new net.sf.j2s.ui.property.J2SClasspathModel ();
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
this.classpathModel.resources.add (entry);
}var comp =  new net.sf.j2s.ui.classpath.CompositeResources ();
comp.setFolder (this.j2sFile.getParentFile ());
comp.setRelativePath (this.j2sFile.getName ());
if (this.addInnerJarAction != null) {
this.addInnerJarAction.setJ2SFile (this.j2sFile);
}if (is != null) {
comp.load (is);
} else {
comp.load ();
}this.updateByCompositeResource (comp);
}, "java.io.File,java.io.InputStream");
Clazz.defineMethod (c$, "updateByCompositeResource", 
($fz = function (comp) {
var children = comp.getChildren ();
for (var i = 0; i < children.length; i++) {
var res = children[i];
if (Clazz.instanceOf (res, net.sf.j2s.ui.classpath.UnitClass)) {
this.classpathModel.addUnitClass (res);
} else {
this.classpathModel.addResource (res);
}}
children = comp.getAbandonedResources ();
for (var i = 0; i < children.length; i++) {
var res = children[i];
if (Clazz.instanceOf (res, net.sf.j2s.ui.classpath.UnitClass)) {
this.classpathModel.addAbandonedClass (res);
} else {
}}
this.viewer.setInput (this.classpathModel);
this.viewer.expandToLevel (2);
if (comp.getCompilerStatus () != null && "enable".equals (comp.getCompilerStatus ())) {
this.compilerEnabled = true;
} else {
this.compilerEnabled = false;
}if (!this.compilerEnabled) {
this.disableCompiler ();
} else {
this.enableCompiler ();
}}, $fz.isPrivate = true, $fz), "net.sf.j2s.ui.classpath.CompositeResources");
Clazz.defineMethod (c$, "enableCompiler", 
($fz = function () {
this.buttonDisable.setSelection (false);
this.buttonDisable.forceFocus ();
this.buttonEnable.setSelection (true);
this.buttonEnable.setText ("Java2Script compiler is enabled");
this.buttonDisable.setText ("Disable Java2Script Compiler");
this.compilerEnabled = true;
this.compilerStatusComp.layout (true);
this.setConfigEditable (true);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "disableCompiler", 
($fz = function () {
this.buttonDisable.setSelection (true);
this.buttonEnable.forceFocus ();
this.buttonEnable.setSelection (false);
this.buttonEnable.setText ("Enable Java2Script Compiler");
this.buttonDisable.setText ("Java2Script compiler is disabled");
this.compilerEnabled = false;
this.compilerStatusComp.layout (true);
this.setConfigEditable (false);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setConfigEditable", 
($fz = function (editable) {
this.viewer.getTree ().setEnabled (editable);
if (editable) {
this.updateButtonGroup ();
} else {
this.buttonAbandon.setEnabled (false);
this.buttonRestore.setEnabled (false);
this.buttonRemove.setEnabled (false);
this.buttonDown.setEnabled (false);
this.buttonUp.setEnabled (false);
this.buttonAddPrj.setEnabled (false);
this.buttonAddRes.setEnabled (false);
this.buttonAddInnerRes.setEnabled (false);
}}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "isCompilerEnabled", 
function () {
return this.compilerEnabled;
});
Clazz.defineMethod (c$, "getUpdatedProperties", 
function (is, file) {
var props =  new java.util.Properties ();
try {
props.load (is);
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
var ress = this.classpathModel.resources;
var buffer =  new StringBuffer ();
for (var iter = ress.iterator (); iter.hasNext (); ) {
var res = iter.next ();
var resPath = null;
resPath = res.toResourceString ();
if (res.isAbsolute () && file != null) {
resPath = net.sf.j2s.ui.property.FileUtil.toRelativePath (resPath.substring (1), file.getAbsolutePath ());
}if (resPath != null) {
if (buffer.length () != 0) {
buffer.append (',');
}buffer.append (resPath);
}}
ress = this.classpathModel.unitClasses;
for (var iter = ress.iterator (); iter.hasNext (); ) {
var res = iter.next ();
var resPath = res.toResourceString ();
if (resPath != null) {
if (buffer.length () != 0) {
buffer.append (',');
}buffer.append (resPath);
}}
props.setProperty ("j2s.resources.list", buffer.toString ());
ress = this.classpathModel.abandonedClasses;
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
if (this.isCompilerEnabled ()) {
props.setProperty ("j2s.compiler.status", "enable");
} else {
props.setProperty ("j2s.compiler.status", "disable");
}return props;
}, "java.io.InputStream,java.io.File");
Clazz.overrideMethod (c$, "setFocus", 
function () {
if (this.compilerEnabled) {
var selection = this.viewer.getSelection ();
if (selection == null || selection.isEmpty ()) {
this.viewer.setSelection ( new org.eclipse.jface.viewers.StructuredSelection (this.classpathModel.getCategories ()[0]));
}this.viewer.getControl ().setFocus ();
} else {
this.buttonEnable.setFocus ();
}return true;
});
Clazz.defineMethod (c$, "getRestoreDefaultButton", 
function () {
return this.buttonDefault;
});
c$.$J2SConfigPage$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SConfigPage$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].enableCompiler ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].fireConfigModified ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConfigPage$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SConfigPage$2", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].disableCompiler ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].fireConfigModified ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConfigPage$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SConfigPage$3", null, org.eclipse.jface.viewers.ISelectionChangedListener);
Clazz.overrideMethod (c$, "selectionChanged", 
function (event) {
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].updateButtonGroup ();
}, "org.eclipse.jface.viewers.SelectionChangedEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConfigPage$4$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SConfigPage$4", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var expandedElements = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.getExpandedElements ();
if (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].isResourcesSelected ()) {
net.sf.j2s.ui.property.J2SConfigPage.up (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].getSelection (), this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.resources);
} else if (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].isClassesSelected ()) {
net.sf.j2s.ui.property.J2SConfigPage.up (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].getSelection (), this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.unitClasses);
} else {
net.sf.j2s.ui.property.J2SConfigPage.up (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].getSelection (), this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.abandonedClasses);
}var bar = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.getTree ().getVerticalBar ();
var selection = 0;
if (bar != null) {
selection = (0.0 + bar.getSelection ()) / bar.getMaximum ();
}this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.refresh ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.setExpandedElements (expandedElements);
if (bar != null) {
bar.setSelection (Math.round (selection * bar.getMaximum ()));
}this.b$["net.sf.j2s.ui.property.J2SConfigPage"].updateButtonGroup ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].fireConfigModified ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConfigPage$5$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SConfigPage$5", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var expandedElements = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.getExpandedElements ();
if (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].isResourcesSelected ()) {
net.sf.j2s.ui.property.J2SConfigPage.down (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].getSelection (), this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.resources);
} else if (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].isClassesSelected ()) {
net.sf.j2s.ui.property.J2SConfigPage.down (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].getSelection (), this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.unitClasses);
} else {
net.sf.j2s.ui.property.J2SConfigPage.down (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].getSelection (), this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.abandonedClasses);
}var bar = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.getTree ().getVerticalBar ();
var selection = 0;
if (bar != null) {
selection = (0.0 + bar.getSelection ()) / bar.getMaximum ();
}this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.refresh ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.setExpandedElements (expandedElements);
if (bar != null) {
bar.setSelection (Math.round (selection * bar.getMaximum ()));
}this.b$["net.sf.j2s.ui.property.J2SConfigPage"].updateButtonGroup ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].fireConfigModified ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConfigPage$6$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SConfigPage$6", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var expandedElements = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.getExpandedElements ();
var sels = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].getSelection ();
for (var i = 0; i < sels.length; i++) {
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.removeTheResource (sels[i]);
}
var bar = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.getTree ().getVerticalBar ();
var selection = 0;
if (bar != null) {
selection = (0.0 + bar.getSelection ()) / bar.getMaximum ();
}this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.refresh ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.setExpandedElements (expandedElements);
if (bar != null) {
bar.setSelection (Math.round (selection * bar.getMaximum ()));
}this.b$["net.sf.j2s.ui.property.J2SConfigPage"].updateButtonGroup ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].fireConfigModified ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConfigPage$7$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.property, "J2SConfigPage$7", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var expandedElements = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.getExpandedElements ();
var sels = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].getSelection ();
for (var i = 0; i < sels.length; i++) {
if (Clazz.instanceOf (sels[i], net.sf.j2s.ui.property.J2SCategory)) {
for (var j = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.abandonedClasses.size () - 1; j >= 0; j--) {
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.restoreUnitClass (this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.abandonedClasses.get (j));
}
break;
}this.b$["net.sf.j2s.ui.property.J2SConfigPage"].classpathModel.restoreUnitClass (sels[i]);
}
var bar = this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.getTree ().getVerticalBar ();
var selection = 0;
if (bar != null) {
selection = (0.0 + bar.getSelection ()) / bar.getMaximum ();
}this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.refresh ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].viewer.setExpandedElements (expandedElements);
if (bar != null) {
bar.setSelection (Math.round (selection * bar.getMaximum ()));
}this.b$["net.sf.j2s.ui.property.J2SConfigPage"].updateButtonGroup ();
this.b$["net.sf.j2s.ui.property.J2SConfigPage"].fireConfigModified ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
});
