Clazz.declarePackage ("net.sf.j2s.ui.property");
c$ = Clazz.decorateAsClass (function () {
this.parent = null;
this.key = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "J2SCategory");
Clazz.makeConstructor (c$, 
function (parent, key) {
this.parent = parent;
this.key = key;
}, "net.sf.j2s.ui.property.J2SClasspathModel,~S");
Clazz.defineMethod (c$, "getKey", 
function () {
return this.key;
});
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj == null || !(Clazz.instanceOf (obj, net.sf.j2s.ui.property.J2SCategory))) {
return false;
}var ctg = obj;
if (ctg.key != null && ctg.key.equals (this.key)) {
return true;
}return false;
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
if (this.key != null) {
return this.key.hashCode ();
}return Clazz.superCall (this, net.sf.j2s.ui.property.J2SCategory, "hashCode", []);
});
