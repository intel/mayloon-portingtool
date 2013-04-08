Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (null, "net.sf.j2s.ui.launching.JavaRuntime", ["java.io.ByteArrayInputStream", "$.File", "net.sf.j2s.ui.classpath.CSSResource", "$.CompositeResources", "$.ContactedClasses", "$.ProjectResources", "$.UnitClass", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.jdt.core.IJavaProject", "$.JavaCore", "org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.launching, "JavaRuntime");
c$.newVariableRuntimeClasspathEntry = Clazz.defineMethod (c$, "newVariableRuntimeClasspathEntry", 
function (path) {
return null;
}, "org.eclipse.core.runtime.IPath");
c$.newRuntimeContainerClasspathEntry = Clazz.defineMethod (c$, "newRuntimeContainerClasspathEntry", 
function (path, kind, proj) {
return null;
}, "org.eclipse.core.runtime.IPath,~N,org.eclipse.jdt.core.IJavaProject");
c$.newArchiveRuntimeClasspathEntry = Clazz.defineMethod (c$, "newArchiveRuntimeClasspathEntry", 
function (relativePath) {
var path = relativePath.toFile ().getName ();
if (path.endsWith (".z.js")) {
var cc =  new net.sf.j2s.ui.classpath.ContactedClasses ();
cc.setFolder (relativePath.toFile ().getParentFile ());
cc.setRelativePath (path);
cc.setClasspathProperty (3);
return cc;
} else if (path.endsWith (".css")) {
var css =  new net.sf.j2s.ui.classpath.CSSResource ();
css.setFolder (relativePath.toFile ().getParentFile ());
css.setRelativePath (path);
css.setClasspathProperty (3);
return css;
} else if (path.endsWith (".j2s")) {
var comp =  new net.sf.j2s.ui.classpath.CompositeResources ();
comp.setFolder (relativePath.toFile ().getParentFile ().getParentFile ());
comp.setRelativePath ("/" + relativePath.toFile ().getParentFile ().getName () + "/" + path);
comp.setClasspathProperty (3);
return comp;
}return null;
}, "org.eclipse.core.runtime.IPath");
c$.newArchiveRuntimeClasspathEntry = Clazz.defineMethod (c$, "newArchiveRuntimeClasspathEntry", 
function (relativePath) {
var path =  new java.io.File (relativePath).getName ();
if (path.endsWith (".z.js") || path.endsWith (".j2x")) {
var cc =  new net.sf.j2s.ui.classpath.ContactedClasses ();
cc.setFolder ( new java.io.File (relativePath).getParentFile ());
cc.setRelativePath (path);
cc.setClasspathProperty (3);
return cc;
} else if (path.endsWith (".css")) {
var css =  new net.sf.j2s.ui.classpath.CSSResource ();
css.setFolder ( new java.io.File (relativePath).getParentFile ());
css.setRelativePath (path);
css.setClasspathProperty (3);
return css;
} else if (path.endsWith (".j2s")) {
var comp =  new net.sf.j2s.ui.classpath.CompositeResources ();
comp.setFolder ( new java.io.File (relativePath).getParentFile ().getParentFile ());
comp.setRelativePath ("/" +  new java.io.File (relativePath).getParentFile ().getName () + "/" + path);
comp.setClasspathProperty (3);
return comp;
}return null;
}, "~S");
c$.newProjectRuntimeClasspathEntry = Clazz.defineMethod (c$, "newProjectRuntimeClasspathEntry", 
function (jp) {
var prjRes =  new net.sf.j2s.ui.classpath.ProjectResources ();
prjRes.setClasspathProperty (1);
prjRes.setFolder (jp.getProject ().getLocation ().toFile ());
prjRes.setRelativePath ("/" + jp.getElementName () + "/.j2s");
prjRes.setClasspathProperty (3);
return prjRes;
}, "org.eclipse.jdt.core.IJavaProject");
c$.newRuntimeContainerClasspathEntry = Clazz.defineMethod (c$, "newRuntimeContainerClasspathEntry", 
function (path, standard_classes) {
return null;
}, "org.eclipse.core.runtime.IPath,~N");
c$.newArchiveRuntimeClasspathEntry = Clazz.defineMethod (c$, "newArchiveRuntimeClasspathEntry", 
function (elem) {
var relativePath = elem.getProjectRelativePath ();
var path = relativePath.toString ();
if (path.endsWith (".z.js")) {
var cc =  new net.sf.j2s.ui.classpath.ContactedClasses ();
cc.setFolder (elem.getProject ().getLocation ().toFile ());
cc.setRelativePath (path);
if (path.indexOf ("j2s-") == 0) {
cc.setClasspathProperty (2);
} else {
cc.setClasspathProperty (3);
}return cc;
} else if (path.endsWith (".css")) {
var css =  new net.sf.j2s.ui.classpath.CSSResource ();
css.setFolder (elem.getProject ().getLocation ().toFile ());
css.setRelativePath (path);
css.setClasspathProperty (3);
return css;
} else if (".j2s".equals (relativePath.toFile ().getName ())) {
var prjRes =  new net.sf.j2s.ui.classpath.ProjectResources ();
prjRes.setFolder (elem.getProject ().getLocation ().toFile ());
prjRes.setRelativePath (elem.getFullPath ().toPortableString ());
prjRes.setClasspathProperty (3);
return prjRes;
} else if (path.endsWith (".j2s")) {
var comp =  new net.sf.j2s.ui.classpath.CompositeResources ();
comp.setFolder (elem.getProject ().getLocation ().toFile ());
comp.setRelativePath (elem.getFullPath ().toPortableString ());
comp.setClasspathProperty (3);
return comp;
} else if (path.endsWith (".js")) {
var unit =  new net.sf.j2s.ui.classpath.UnitClass ();
unit.setFolder (elem.getProject ().getLocation ().toFile ());
unit.setRelativePath (path);
var prj = elem.getAdapter (org.eclipse.jdt.core.IJavaProject);
if (prj != null) {
try {
unit.setBinRelativePath (prj.getOutputLocation ().toString ());
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jdt.core.JavaModelException)) {
unit.setBinRelativePath ("");
} else {
throw e;
}
}
} else {
unit.setBinRelativePath ("");
}unit.setClasspathProperty (3);
unit.parseClassName ();
return unit;
}return null;
}, "org.eclipse.core.resources.IResource");
c$.newStringVariableClasspathEntry = Clazz.defineMethod (c$, "newStringVariableClasspathEntry", 
function (varString) {
return null;
}, "~S");
c$.getJavaProject = Clazz.defineMethod (c$, "getJavaProject", 
function (launchConfiguration) {
return null;
}, "org.eclipse.debug.core.ILaunchConfiguration");
c$.computeUnresolvedRuntimeClasspath = Clazz.defineMethod (c$, "computeUnresolvedRuntimeClasspath", 
function (configuration) {
try {
var fModel =  new net.sf.j2s.ui.classpath.CompositeResources ();
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return  new Array (0);
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return  new Array (0);
}var project = javaProject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
var workingDir =  new java.io.File (prjFolder);
fModel.setFolder (workingDir);
fModel.setRelativePath (".j2s");
var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
}fModel.setBinRelativePath (relativePath);
var useDefault = true;
try {
useDefault = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
var classpath = configuration.getAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
if (useDefault || classpath == null || classpath.trim ().length == 0) {
fModel.load ();
} else {
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
fModel.load ( new java.io.ByteArrayInputStream (propStr.getBytes ()));
}fModel.setClasspathProperty (3);
var children = fModel.getChildren ();
for (var i = 0; i < children.length; i++) {
children[i].setClasspathProperty (3);
var xpath = children[i].getRelativePath ();
if (xpath != null && xpath.endsWith (".z.js")) {
if (xpath.indexOf ("j2s-core") != -1 || xpath.indexOf ("j2s-swt") != -1) {
children[i].setClasspathProperty (2);
} else {
children[i].setClasspathProperty (3);
}}}
return children;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return  new Array (0);
}, "org.eclipse.debug.core.ILaunchConfiguration");
c$.computeUnresolvedIgnoredClasses = Clazz.defineMethod (c$, "computeUnresolvedIgnoredClasses", 
function (configuration) {
try {
var fModel =  new net.sf.j2s.ui.classpath.CompositeResources ();
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return  new Array (0);
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return  new Array (0);
}var project = javaProject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
var workingDir =  new java.io.File (prjFolder);
fModel.setFolder (workingDir);
fModel.setRelativePath (".j2s");
var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
}fModel.setBinRelativePath (relativePath);
var useDefault = true;
try {
useDefault = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
var classpath = configuration.getAttribute ("j2s.abandon.class.path", Clazz.castNullAs ("String"));
if (useDefault || classpath == null || classpath.trim ().length == 0) {
fModel.load ();
} else {
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.output.path=" + relativePath + "\r\nj2s.abandoned.resources.list=" + classpath;
fModel.load ( new java.io.ByteArrayInputStream (propStr.getBytes ()));
}fModel.setClasspathProperty (3);
return [fModel];
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return  new Array (0);
}, "org.eclipse.debug.core.ILaunchConfiguration");
c$.computeUpdatedRuntimeClasspath = Clazz.defineMethod (c$, "computeUpdatedRuntimeClasspath", 
function (configuration) {
try {
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, Clazz.castNullAs ("String"));
if ((projectName == null) || (projectName.trim ().length < 1)) {
return  new Array (0);
}var javaProject = javaModel.getJavaProject (projectName);
if ((javaProject == null) || !javaProject.exists ()) {
return  new Array (0);
}var project = javaProject.getProject ();
var prjFolder = project.getLocation ().toOSString ();
var workingDir =  new java.io.File (prjFolder);
var path = javaProject.getOutputLocation ().toString ();
var idx = path.indexOf ('/', 2);
var relativePath = null;
if (idx != -1) {
relativePath = path.substring (idx + 1);
}var fModel =  new net.sf.j2s.ui.classpath.CompositeResources ();
fModel.setFolder (workingDir);
fModel.setRelativePath (".j2s");
fModel.setBinRelativePath (relativePath);
fModel.load ();
var newModel =  new net.sf.j2s.ui.classpath.CompositeResources ();
newModel.setFolder (workingDir);
newModel.setRelativePath (".j2s");
newModel.setBinRelativePath (relativePath);
var classpath = configuration.getAttribute ("j2s.class.path", Clazz.castNullAs ("String"));
if (classpath != null && classpath.trim ().length != 0) {
if (relativePath == null) {
relativePath = "";
}var propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
newModel.load ( new java.io.ByteArrayInputStream (propStr.getBytes ()));
}newModel.setClasspathProperty (3);
var nodes = newModel.getChildren ();
for (var i = 0; i < nodes.length; i++) {
if (Clazz.instanceOf (nodes[i], net.sf.j2s.ui.classpath.UnitClass) && !fModel.existedResource (nodes[i])) {
newModel.removeResource (nodes[i]);
}}
var existedChildren = fModel.getChildren ();
for (var i = 0; i < existedChildren.length; i++) {
newModel.addResource (existedChildren[i]);
}
var children = newModel.getChildren ();
for (var i = 0; i < children.length; i++) {
children[i].setClasspathProperty (3);
var xpath = children[i].getRelativePath ();
if (xpath != null && xpath.endsWith (".z.js")) {
if (xpath.indexOf ("j2s-core") != -1 || xpath.indexOf ("j2s-swt") != -1) {
children[i].setClasspathProperty (2);
} else {
children[i].setClasspathProperty (3);
}}}
return children;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return  new Array (0);
}, "org.eclipse.debug.core.ILaunchConfiguration");
});
