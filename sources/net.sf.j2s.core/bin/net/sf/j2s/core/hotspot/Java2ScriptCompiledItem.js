Clazz.declarePackage ("net.sf.j2s.core.hotspot");
c$ = Clazz.decorateAsClass (function () {
this.time = 0;
this.id = 0;
this.name = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.hotspot, "Java2ScriptCompiledItem");
Clazz.makeConstructor (c$, 
function (time, id, name) {
this.time = time;
this.id = id;
this.name = name;
}, "~N,~N,~S");
Clazz.defineMethod (c$, "getTime", 
function () {
return this.time;
});
Clazz.defineMethod (c$, "setTime", 
function (time) {
this.time = time;
}, "~N");
Clazz.defineMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "setId", 
function (id) {
this.id = id;
}, "~N");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.name = name;
}, "~S");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) return true;
if (obj == null || !(Clazz.instanceOf (obj, net.sf.j2s.core.hotspot.Java2ScriptCompiledItem))) {
return false;
}var item = obj;
if (this.time != item.time || this.id != item.id) {
return false;
}if (this.name != null) {
return this.name.equals (item.name);
} else {
return item.name == null;
}}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.name != null) {
return (this.name.hashCode () + this.time + this.id);
} else {
return (this.time + this.id);
}});
