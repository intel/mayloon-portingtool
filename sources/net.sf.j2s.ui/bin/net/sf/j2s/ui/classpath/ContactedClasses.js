Clazz.declarePackage ("net.sf.j2s.ui.classpath");
Clazz.load (["net.sf.j2s.ui.classpath.IClasspathContainer", "$.IExternalResource", "$.Resource"], "net.sf.j2s.ui.classpath.ContactedClasses", ["java.lang.StringBuffer", "java.util.ArrayList", "net.sf.j2s.ui.classpath.CSSResource", "$.ContactedUnitClass", "$.PathUtil", "net.sf.j2s.ui.launching.J2SCyclicProjectUtils"], function () {
c$ = Clazz.decorateAsClass (function () {
this.binRelativePath = null;
this.classList = null;
this.externalList = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.classpath, "ContactedClasses", net.sf.j2s.ui.classpath.Resource, [net.sf.j2s.ui.classpath.IExternalResource, net.sf.j2s.ui.classpath.IClasspathContainer]);
Clazz.overrideMethod (c$, "load", 
function () {
var file = this.getAbsoluteFile ();
this.classList =  new java.util.ArrayList ();
this.externalList =  new java.util.ArrayList ();
if (file.exists ()) {
var props = net.sf.j2s.ui.classpath.PathUtil.loadJZ (file);
var reses = net.sf.j2s.ui.classpath.PathUtil.getResources (props);
this.binRelativePath = props.getProperty ("j2s.output.path");
for (var i = 0; i < reses.length; i++) {
if (reses[i] != null) {
var res = reses[i].trim ();
if (res.endsWith (".z.js")) {
var jz =  new net.sf.j2s.ui.classpath.ContactedClasses ();
jz.setFolder (this.getAbsoluteFolder ());
jz.setRelativePath (res);
jz.setParent (this);
this.externalList.add (jz);
} else if (res.endsWith (".js")) {
var unit =  new net.sf.j2s.ui.classpath.ContactedUnitClass ();
unit.setFolder (this.getAbsoluteFolder ());
unit.setRelativePath (res);
unit.parseClassName ();
unit.setParent (this);
this.classList.add (unit);
} else if (res.endsWith (".css")) {
var css =  new net.sf.j2s.ui.classpath.CSSResource ();
css.setFolder (this.getAbsoluteFolder ());
css.setRelativePath (res);
css.setParent (this);
this.externalList.add (css);
}}}
}});
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
if (this.externalList == null || this.classList == null) {
this.load ();
}var size = this.externalList.size ();
var res =  new Array (this.classList.size () + size);
for (var i = 0; i < size; i++) {
res[i] = this.externalList.get (i);
}
for (var i = 0; i < this.classList.size (); i++) {
res[i + size] = this.classList.get (i);
}
return res;
});
Clazz.defineMethod (c$, "getClasses", 
function () {
return this.classList.toArray ( new Array (0));
});
Clazz.defineMethod (c$, "getExternals", 
function () {
return this.externalList.toArray ( new Array (0));
});
Clazz.defineMethod (c$, "getBinRelativePath", 
function () {
return this.binRelativePath;
});
Clazz.defineMethod (c$, "setBinRelativePath", 
function (binRelativePath) {
this.binRelativePath = binRelativePath;
}, "~S");
Clazz.defineMethod (c$, "toHTMLString", 
function () {
if (this.getRelativePath () != null && this.getRelativePath ().endsWith (".j2x")) {
return "";
}var p = this.getParent ();
if (p != null) {
if (Clazz.instanceOf (p, net.sf.j2s.ui.classpath.ContactedClasses)) {
var pp = p.getParent ();
if (pp != null && Clazz.instanceOf (pp, net.sf.j2s.ui.classpath.ContactedClasses)) {
return "";
}}}var buf =  new StringBuffer ();
if (this.externalList == null) {
this.load ();
}for (var iter = this.externalList.iterator (); iter.hasNext (); ) {
var res = iter.next ();
if (!net.sf.j2s.ui.launching.J2SCyclicProjectUtils.visit (res)) {
continue ;}buf.append (res.toHTMLString ());
}
buf.append ("<script type=\"text/javascript\" src=\"");
var binFolder = this.getBinRelativePath ();
if (binFolder != null) {
var binPath = binFolder.trim ();
if (binPath.length != 0) {
buf.append (binPath);
if (!binPath.endsWith ("/")) {
buf.append ("/");
}}}if (p != null) {
if (Clazz.instanceOf (p, net.sf.j2s.ui.classpath.ContactedClasses)) {
var cc = p;
var path = cc.getRelativePath ();
var idx = path.lastIndexOf ('/');
if (idx != -1) {
buf.append (path.substring (0, idx + 1));
}} else if (Clazz.instanceOf (p, net.sf.j2s.ui.classpath.CompositeResources)) {
var cc = p;
var binRelative = cc.getBinRelativePath ();
if (binRelative != null) {
if (binRelative.length != 0 && this.getRelativePath ().endsWith (".z.js")) {
return "";
}buf.append (binRelative);
}}}buf.append (this.getRelativePath ());
buf.append ("\"></script>\r\n");
return buf.toString ();
});
Clazz.defineMethod (c$, "toJ2XString", 
function () {
if (this.getName ().endsWith (".j2x")) {
try {
return this.getAbsoluteFile ().getCanonicalPath ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}return "";
});
Clazz.overrideMethod (c$, "getType", 
function () {
return 4;
});
});
