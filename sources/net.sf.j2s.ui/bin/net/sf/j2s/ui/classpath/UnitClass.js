Clazz.declarePackage ("net.sf.j2s.ui.classpath");
Clazz.load (["net.sf.j2s.ui.classpath.Resource"], "net.sf.j2s.ui.classpath.UnitClass", ["java.io.File", "net.sf.j2s.ui.classpath.PathUtil", "net.sf.j2s.ui.launching.J2SLaunchingUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.className = null;
this.binRelativePath = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.classpath, "UnitClass", net.sf.j2s.ui.classpath.Resource);
Clazz.defineMethod (c$, "getClassName", 
function () {
return this.className;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.getClassName ();
});
Clazz.defineMethod (c$, "parseClassName", 
function () {
this.className = net.sf.j2s.ui.classpath.PathUtil.convertClassName (this.getRelativePath (), this.binRelativePath);
});
Clazz.defineMethod (c$, "getBinRelativePath", 
function () {
return this.binRelativePath;
});
Clazz.defineMethod (c$, "setBinRelativePath", 
function (binRelativePath) {
this.binRelativePath = binRelativePath;
}, "~S");
Clazz.overrideMethod (c$, "exists", 
function () {
return  new java.io.File (this.getFolder (), this.getRelativePath ()).exists ();
});
Clazz.overrideMethod (c$, "toHTMLString", 
function () {
var bin = "";
if (true) return bin;
if (this.getParent () != null && (Clazz.instanceOf (this.getParent (), net.sf.j2s.ui.classpath.CompositeResources))) {
var cc = this.getParent ();
var binRelative = cc.getBinRelativePath ();
if (binRelative != null) {
bin += binRelative;
}}return net.sf.j2s.ui.launching.J2SLaunchingUtil.wrapTypeJS (this.getClassName (), bin + this.getBinRelativePath ());
});
Clazz.overrideMethod (c$, "getType", 
function () {
return 2;
});
});
