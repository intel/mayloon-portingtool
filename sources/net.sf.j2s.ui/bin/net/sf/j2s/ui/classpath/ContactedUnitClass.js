Clazz.declarePackage ("net.sf.j2s.ui.classpath");
Clazz.load (["net.sf.j2s.ui.classpath.Resource"], "net.sf.j2s.ui.classpath.ContactedUnitClass", ["net.sf.j2s.ui.classpath.PathUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.className = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.classpath, "ContactedUnitClass", net.sf.j2s.ui.classpath.Resource);
Clazz.overrideMethod (c$, "getName", 
function () {
return this.getClassName ();
});
Clazz.defineMethod (c$, "getClassName", 
function () {
return this.className;
});
Clazz.defineMethod (c$, "setClassName", 
function (className) {
this.className = className;
}, "~S");
Clazz.defineMethod (c$, "parseClassName", 
function () {
this.className = net.sf.j2s.ui.classpath.PathUtil.convertClassName (this.getRelativePath (), null);
});
Clazz.overrideMethod (c$, "exists", 
function () {
return true;
});
Clazz.overrideMethod (c$, "toHTMLString", 
function () {
return "";
});
Clazz.overrideMethod (c$, "getType", 
function () {
return 2;
});
});
