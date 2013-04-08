Clazz.declarePackage ("net.sf.j2s.ui.classpath");
Clazz.load (["net.sf.j2s.ui.classpath.IClasspathContainer", "$.Resource"], "net.sf.j2s.ui.classpath.CompositeResources", ["java.io.File", "$.FileFilter", "$.FileInputStream", "java.lang.StringBuffer", "java.util.ArrayList", "$.Properties", "net.sf.j2s.ui.classpath.CSSResource", "$.ContactedClasses", "$.PathUtil", "$.UnitClass", "net.sf.j2s.ui.launching.J2SCyclicProjectUtils"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resources = null;
this.abandonedResources = null;
this.binRelativePath = null;
this.compilerStatus = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.classpath, "CompositeResources", net.sf.j2s.ui.classpath.Resource, net.sf.j2s.ui.classpath.IClasspathContainer);
Clazz.defineMethod (c$, "getAbsoluteFile", 
function () {
if (this.getRelativePath ().startsWith ("/")) {
return  new java.io.File (this.getFolder (), this.getRelativePath ());
} else {
return Clazz.superCall (this, net.sf.j2s.ui.classpath.CompositeResources, "getAbsoluteFile", []);
}});
Clazz.defineMethod (c$, "exists", 
function () {
if (this.getRelativePath ().startsWith ("/")) {
return  new java.io.File (this.getFolder (), this.getRelativePath ()).exists ();
} else {
return Clazz.superCall (this, net.sf.j2s.ui.classpath.CompositeResources, "exists", []);
}});
Clazz.defineMethod (c$, "getBinRelativePath", 
function () {
if (this.getRelativePath ().startsWith ("/")) {
return this.getRelativePath ().substring (0, this.getRelativePath ().lastIndexOf ('/') + 1);
} else {
return "";
}});
Clazz.defineMethod (c$, "load", 
function () {
var file = this.getAbsoluteFile ();
this.resources =  new java.util.ArrayList ();
this.abandonedResources =  new java.util.ArrayList ();
if (file != null && file.exists ()) {
var fis = null;
try {
fis =  new java.io.FileInputStream (file);
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.load (fis);
}});
Clazz.defineMethod (c$, "getCompilerStatus", 
function () {
return this.compilerStatus;
});
Clazz.defineMethod (c$, "load", 
function (fis) {
this.resources =  new java.util.ArrayList ();
this.abandonedResources =  new java.util.ArrayList ();
if (fis != null) {
var props =  new java.util.Properties ();
try {
props.load (fis);
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
this.compilerStatus = props.getProperty ("j2s.compiler.status");
this.binRelativePath = props.getProperty ("j2s.output.path");
var reses = net.sf.j2s.ui.classpath.PathUtil.getResources (props);
this.addResourceByString (this.resources, reses);
reses = net.sf.j2s.ui.classpath.PathUtil.getAbandonedResources (props);
this.addResourceByString (this.abandonedResources, reses);
}}, "java.io.InputStream");
Clazz.defineMethod (c$, "getAbandonedResources", 
function () {
if (this.abandonedResources == null) {
return  new Array (0);
}return this.abandonedResources.toArray ( new Array (0));
});
Clazz.defineMethod (c$, "addResourceByString", 
($fz = function (resourcesList, reses) {
for (var i = 0; i < reses.length; i++) {
if (reses[i] != null) {
var res = reses[i].trim ();
if (res.startsWith ("|")) {
res = res.substring (1);
var rr = null;
if (res.endsWith (".z.js") || res.endsWith (".j2x")) {
rr =  new net.sf.j2s.ui.classpath.ContactedClasses ();
} else if (res.endsWith (".css")) {
rr =  new net.sf.j2s.ui.classpath.CSSResource ();
} else if (res.endsWith ("/.j2s")) {
rr =  new net.sf.j2s.ui.classpath.ProjectResources ();
} else if (res.endsWith (".j2s")) {
rr =  new net.sf.j2s.ui.classpath.CompositeResources ();
}rr.setFolder ( new java.io.File (res).getParentFile ());
rr.setRelativePath ( new java.io.File (res).getName ());
rr.setParent (this);
rr.setAbsolute (true);
resourcesList.add (rr);
} else if (res.endsWith (".z.js") || res.endsWith (".j2x")) {
var jz =  new net.sf.j2s.ui.classpath.ContactedClasses ();
jz.setFolder (this.getAbsoluteFolder ());
jz.setRelativePath (res);
jz.setParent (this);
resourcesList.add (jz);
} else if (res.endsWith (".js")) {
var unit =  new net.sf.j2s.ui.classpath.UnitClass ();
unit.setFolder (this.getAbsoluteFolder ());
unit.setRelativePath (res);
unit.setBinRelativePath (this.binRelativePath);
unit.parseClassName ();
unit.setParent (this);
resourcesList.add (unit);
} else if (res.endsWith (".css")) {
var css =  new net.sf.j2s.ui.classpath.CSSResource ();
css.setFolder (this.getAbsoluteFolder ());
css.setRelativePath (res);
css.setParent (this);
resourcesList.add (css);
} else if (res.endsWith ("/.j2s")) {
var prj =  new net.sf.j2s.ui.classpath.ProjectResources ();
prj.setFolder (this.getAbsoluteFolder ().getParentFile ());
prj.setRelativePath (res);
prj.setParent (this);
resourcesList.add (prj);
} else if (res.endsWith (".j2s")) {
var comp =  new net.sf.j2s.ui.classpath.CompositeResources ();
comp.setFolder (this.getAbsoluteFolder ());
comp.setRelativePath (res);
comp.setParent (this);
resourcesList.add (comp);
}}}
}, $fz.isPrivate = true, $fz), "java.util.List,~A");
Clazz.overrideMethod (c$, "store", 
function (props) {
var reses = this.getChildren ();
var buf =  new StringBuffer ();
for (var i = 0; i < reses.length; i++) {
var str = reses[i].toResourceString ();
buf.append (str);
if (i != reses.length - 1) {
buf.append (",");
}}
props.setProperty ("j2s.resources.list", buf.toString ());
props.setProperty ("j2s.output.path", this.binRelativePath);
}, "java.util.Properties");
Clazz.overrideMethod (c$, "getChildren", 
function () {
if (this.resources == null) {
this.load ();
}return this.resources.toArray ( new Array (0));
});
Clazz.defineMethod (c$, "addResource", 
function (res) {
if (!this.resources.contains (res)) {
this.resources.add (res);
}}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "existedResource", 
function (res) {
return this.resources.contains (res);
}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "removeResource", 
function (res) {
this.resources.add (res);
}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "removeResource", 
function (res) {
this.resources.remove (res);
}, "~N");
Clazz.defineMethod (c$, "upResource", 
function (res) {
}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "downResource", 
function (res) {
}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "topResource", 
function (res) {
}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "bottomResource", 
function (res) {
}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "upResource", 
function (res) {
}, "~N");
Clazz.defineMethod (c$, "downResource", 
function (res) {
}, "~N");
Clazz.defineMethod (c$, "topResource", 
function (res) {
}, "~N");
Clazz.defineMethod (c$, "bottomResource", 
function (res) {
}, "~N");
Clazz.defineMethod (c$, "setBinRelativePath", 
function (binRelativePath) {
this.binRelativePath = binRelativePath;
}, "~S");
Clazz.defineMethod (c$, "toHTMLString", 
function () {
var buf =  new StringBuffer ();
if (this.resources == null) {
this.load ();
}for (var iter = this.resources.iterator (); iter.hasNext (); ) {
var res = iter.next ();
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (res)) {
continue ;}buf.append (res.toHTMLString ());
}
return buf.toString ();
});
Clazz.defineMethod (c$, "toJ2XString", 
function () {
var buf =  new StringBuffer ();
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (this)) {
return buf.toString ();
}if (this.resources == null) {
this.load ();
}if (Clazz.instanceOf (this, net.sf.j2s.ui.classpath.ProjectResources)) {
var pr = this;
var binFolder =  new java.io.File (pr.getAbsoluteFolder (), this.binRelativePath);
var files = binFolder.listFiles (((Clazz.isClassDefined ("net.sf.j2s.ui.classpath.CompositeResources$1") ? 0 : net.sf.j2s.ui.classpath.CompositeResources.$CompositeResources$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.classpath.CompositeResources$1, this, null)));
if (files != null && files.length != 0) {
for (var i = 0; i < files.length; i++) {
buf.append (files[i].getAbsolutePath ());
buf.append (',');
}
return buf.toString ();
}}for (var iter = this.resources.iterator (); iter.hasNext (); ) {
var res = iter.next ();
if (Clazz.instanceOf (res, net.sf.j2s.ui.classpath.CompositeResources)) {
var c = res;
buf.append (c.toJ2XString ());
buf.append (',');
}}
for (var iter = this.resources.iterator (); iter.hasNext (); ) {
var res = iter.next ();
if (Clazz.instanceOf (res, net.sf.j2s.ui.classpath.ContactedClasses)) {
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (res)) {
continue ;}var unit = res;
buf.append (unit.toJ2XString ());
buf.append (',');
}}
return buf.toString ();
});
Clazz.defineMethod (c$, "existedClassesString", 
function () {
var buf =  new StringBuffer ();
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (this)) {
return buf.toString ();
}if (this.resources == null) {
this.load ();
}if (Clazz.instanceOf (this, net.sf.j2s.ui.classpath.ProjectResources)) {
var pr = this;
var binFolder =  new java.io.File (pr.getAbsoluteFolder (), this.binRelativePath);
var files = binFolder.listFiles (((Clazz.isClassDefined ("net.sf.j2s.ui.classpath.CompositeResources$2") ? 0 : net.sf.j2s.ui.classpath.CompositeResources.$CompositeResources$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.classpath.CompositeResources$2, this, null)));
if (files != null && files.length != 0) {
var prop =  new java.util.Properties ();
try {
prop.load ( new java.io.FileInputStream (files[0]));
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
var pkg = prop.getProperty ("package.prefix");
var pkgFile =  new java.io.File (files[0].getParentFile (), pkg.$replace ('.', '/') + "/package.js");
if (pkgFile.exists ()) {
return buf.toString ();
}}}buf.append ('[');
try {
buf.append ( new java.io.File (this.getAbsoluteFolder (), this.binRelativePath).getCanonicalPath ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
buf.append (']');
buf.append (',');
for (var iter = this.resources.iterator (); iter.hasNext (); ) {
var res = iter.next ();
if (Clazz.instanceOf (res, net.sf.j2s.ui.classpath.UnitClass)) {
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (res)) {
continue ;}var unit = res;
buf.append (unit.getClassName ());
buf.append (',');
}}
for (var iter = this.resources.iterator (); iter.hasNext (); ) {
var res = iter.next ();
if (Clazz.instanceOf (res, net.sf.j2s.ui.classpath.CompositeResources)) {
var c = res;
buf.append (c.existedClassesString ());
buf.append (',');
}}
return buf.toString ();
});
Clazz.defineMethod (c$, "ignoredClassesString", 
function () {
var buf =  new StringBuffer ();
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (this)) {
return buf.toString ();
}if (this.resources == null) {
this.load ();
}for (var iter = this.resources.iterator (); iter.hasNext (); ) {
var res = iter.next ();
if (Clazz.instanceOf (res, net.sf.j2s.ui.classpath.CompositeResources)) {
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (res)) {
continue ;}var c = res;
buf.append (c.ignoredClassesString ());
buf.append (',');
}}
for (var iter = this.abandonedResources.iterator (); iter.hasNext (); ) {
var res = iter.next ();
if (Clazz.instanceOf (res, net.sf.j2s.ui.classpath.UnitClass)) {
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (res)) {
continue ;}var unit = res;
buf.append (unit.getClassName ());
buf.append (',');
}}
return buf.toString ();
});
Clazz.overrideMethod (c$, "getType", 
function () {
return 3;
});
c$.$CompositeResources$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.classpath, "CompositeResources$1", null, java.io.FileFilter);
Clazz.overrideMethod (c$, "accept", 
function (pathname) {
if (pathname.isFile () && pathname.getName ().endsWith (".j2x")) {
return true;
}return false;
}, "java.io.File");
c$ = Clazz.p0p ();
};
c$.$CompositeResources$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.classpath, "CompositeResources$2", null, java.io.FileFilter);
Clazz.overrideMethod (c$, "accept", 
function (pathname) {
if (pathname.isFile () && pathname.getName ().endsWith (".j2x")) {
return true;
}return false;
}, "java.io.File");
c$ = Clazz.p0p ();
};
});
