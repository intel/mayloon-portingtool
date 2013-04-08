Clazz.declarePackage ("net.sf.j2s.ui.property");
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.desc = null;
this.resources = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.property, "J2SLibrary");
Clazz.defineMethod (c$, "getDesc", 
function () {
return this.desc;
});
Clazz.defineMethod (c$, "setDesc", 
function (desc) {
this.desc = desc;
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "getResources", 
function () {
return this.resources;
});
Clazz.defineMethod (c$, "setResources", 
function (resources) {
this.resources = resources;
}, "~A");
