Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["java.util.ArrayList"], "net.sf.j2s.ui.property.J2SClasspathModel", ["net.sf.j2s.ui.property.J2SCategory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resources = null;
this.unitClasses = null;
this.abandonedClasses = null;
this.ctgs = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "J2SClasspathModel");
Clazz.prepareFields (c$, function () {
this.resources =  new java.util.ArrayList ();
this.unitClasses =  new java.util.ArrayList ();
this.abandonedClasses =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "addResource", 
function (res) {
if (!this.resources.contains (res)) {
if (res.getName ().endsWith (".j2x")) {
for (var iter = this.resources.iterator (); iter.hasNext (); ) {
var r = iter.next ();
if (r.getName ().endsWith (".j2x")) {
var equals = false;
try {
equals = r.getAbsoluteFile ().getCanonicalPath ().equals (res.getAbsoluteFile ().getCanonicalPath ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
if (equals) {
return ;
}}}
}this.resources.add (res);
}}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "removeResource", 
function (res) {
this.resources.remove (res);
}, "net.sf.j2s.ui.classpath.Resource");
Clazz.defineMethod (c$, "addUnitClass", 
function (cl) {
this.unitClasses.add (cl);
}, "net.sf.j2s.ui.classpath.UnitClass");
Clazz.defineMethod (c$, "removeUnitClass", 
function (cl) {
this.unitClasses.remove (cl);
}, "net.sf.j2s.ui.classpath.UnitClass");
Clazz.defineMethod (c$, "addAbandonedClass", 
function (cl) {
this.abandonedClasses.add (cl);
}, "net.sf.j2s.ui.classpath.UnitClass");
Clazz.defineMethod (c$, "removeAbandonedClass", 
function (cl) {
this.abandonedClasses.remove (cl);
}, "net.sf.j2s.ui.classpath.UnitClass");
Clazz.defineMethod (c$, "abandonUnitClass", 
function (cl) {
this.unitClasses.remove (cl);
this.abandonedClasses.add (cl);
}, "net.sf.j2s.ui.classpath.UnitClass");
Clazz.defineMethod (c$, "restoreUnitClass", 
function (cl) {
this.abandonedClasses.remove (cl);
this.unitClasses.add (cl);
}, "net.sf.j2s.ui.classpath.UnitClass");
Clazz.defineMethod (c$, "getResources", 
function () {
return this.resources.toArray ( new Array (0));
});
Clazz.defineMethod (c$, "getUnitClasses", 
function () {
return this.unitClasses.toArray ( new Array (0));
});
Clazz.defineMethod (c$, "getAbandonedClasses", 
function () {
return this.abandonedClasses.toArray ( new Array (0));
});
Clazz.defineMethod (c$, "getCategories", 
function () {
if (this.ctgs != null) {
return this.ctgs;
}this.ctgs =  new Array (net.sf.j2s.ui.property.J2SClasspathModel.categories.length);
for (var i = 0; i < this.ctgs.length; i++) {
this.ctgs[i] =  new net.sf.j2s.ui.property.J2SCategory (this, net.sf.j2s.ui.property.J2SClasspathModel.categories[i]);
}
return this.ctgs;
});
Clazz.defineMethod (c$, "isResourceInResources", 
function (res) {
return this.resources.contains (res);
}, "~O");
Clazz.defineMethod (c$, "isResourceInClasses", 
function (res) {
return this.unitClasses.contains (res);
}, "~O");
Clazz.defineMethod (c$, "isResourceInAbandons", 
function (res) {
return this.abandonedClasses.contains (res);
}, "~O");
Clazz.defineMethod (c$, "removeTheResource", 
function (res) {
if (!this.resources.remove (res)) {
if (!this.unitClasses.remove (res)) {
this.abandonedClasses.remove (res);
}}}, "net.sf.j2s.ui.classpath.Resource");
c$.categories = c$.prototype.categories = ["Resources", "Abandoned Classes"];
});
