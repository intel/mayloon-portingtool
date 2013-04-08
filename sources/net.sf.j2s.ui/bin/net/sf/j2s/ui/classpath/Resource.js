Clazz.declarePackage ("net.sf.j2s.ui.classpath");
Clazz.load (["net.sf.j2s.ui.classpath.IRuntimeClasspathEntry"], "net.sf.j2s.ui.classpath.Resource", ["java.io.File", "org.eclipse.core.resources.ResourcesPlugin", "org.eclipse.core.runtime.Path", "org.eclipse.jdt.core.JavaCore"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parent = null;
this.folder = null;
this.relativePath = null;
this.$isAbsolute = false;
this.resourceCategory = 0;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.classpath, "Resource", null, net.sf.j2s.ui.classpath.IRuntimeClasspathEntry);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (folder, relativePath) {
this.folder = folder;
this.relativePath = relativePath;
}, "java.io.File,~S");
Clazz.makeConstructor (c$, 
function (parent, folder, relativePath) {
this.parent = parent;
this.folder = folder;
this.relativePath = relativePath;
}, "net.sf.j2s.ui.classpath.Resource,java.io.File,~S");
Clazz.defineMethod (c$, "isAbsolute", 
function () {
return this.$isAbsolute;
});
Clazz.defineMethod (c$, "setAbsolute", 
function (isAbsolute) {
this.$isAbsolute = isAbsolute;
}, "~B");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "setParent", 
function (parent) {
this.parent = parent;
}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "getAbsoluteFolder", 
function () {
return  new java.io.File (this.folder, this.relativePath).getParentFile ();
});
Clazz.defineMethod (c$, "getAbsoluteFile", 
function () {
if (this.folder == null || this.relativePath == null || this.relativePath.trim ().length == 0) {
return null;
}return  new java.io.File (this.folder, this.relativePath);
});
Clazz.defineMethod (c$, "getFolder", 
function () {
return this.folder;
});
Clazz.defineMethod (c$, "setFolder", 
function (folder) {
this.folder = folder;
}, "java.io.File");
Clazz.defineMethod (c$, "getRelativePath", 
function () {
return this.relativePath;
});
Clazz.defineMethod (c$, "setRelativePath", 
function (relativePath) {
this.relativePath = relativePath;
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
var file =  new java.io.File (this.getFolder (), this.relativePath);
var name = file.getName ();
if (name.endsWith (".z.js")) {
return name.substring (0, name.length - 5);
}var idx = name.lastIndexOf ('.');
if (idx != -1) {
var ext = name.substring (idx + 1);
if ("js".equals (ext) || "j2s".equals (ext)) {
return name.substring (0, idx);
} else {
return name;
}}return name;
});
Clazz.defineMethod (c$, "exists", 
function () {
return  new java.io.File (this.getFolder (), this.relativePath).exists ();
});
Clazz.defineMethod (c$, "toResourceString", 
function () {
if (this.$isAbsolute) {
return "|" +  new java.io.File (this.getFolder (), this.relativePath).getAbsolutePath ();
}if (this.relativePath != null) {
return this.relativePath;
}return null;
});
Clazz.defineMethod (c$, "toHTMLString", 
function () {
if (this.relativePath != null) {
return this.relativePath;
}return null;
});
Clazz.overrideMethod (c$, "getClasspathEntry", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getClasspathProperty", 
function () {
return this.resourceCategory;
});
Clazz.overrideMethod (c$, "getJavaProject", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getLocation", 
function () {
return this.getAbsoluteFile ().getAbsolutePath ();
});
Clazz.overrideMethod (c$, "getPath", 
function () {
return org.eclipse.core.runtime.Path.fromPortableString (this.relativePath);
});
Clazz.overrideMethod (c$, "getResource", 
function () {
if (this.relativePath != null) {
if (this.relativePath.startsWith ("/") && this.relativePath.endsWith ("/.j2s")) {
var javaModel = org.eclipse.jdt.core.JavaCore.create (org.eclipse.core.resources.ResourcesPlugin.getWorkspace ().getRoot ());
var projectName = this.relativePath.substring (1, this.relativePath.indexOf ('/', 3));
var javaProject = javaModel.getJavaProject (projectName);
var project = javaProject.getProject ();
return project;
}}return null;
});
Clazz.overrideMethod (c$, "getType", 
function () {
return 5;
});
Clazz.overrideMethod (c$, "getVariableName", 
function () {
return this.getName ();
});
Clazz.overrideMethod (c$, "setClasspathProperty", 
function (location) {
this.resourceCategory = location;
}, "~N");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj != null && Clazz.instanceOf (obj, net.sf.j2s.ui.classpath.Resource)) {
var item = obj;
var file1 = this.getAbsoluteFile ();
var file2 = item.getAbsoluteFile ();
if (file1 == null && file2 == null) {
return true;
} else if (file1.equals (file2)) {
return true;
}return false;
}return false;
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
var file = this.getAbsoluteFile ();
if (file != null) {
return file.hashCode ();
}return Clazz.superCall (this, net.sf.j2s.ui.classpath.Resource, "hashCode", []);
});
});
