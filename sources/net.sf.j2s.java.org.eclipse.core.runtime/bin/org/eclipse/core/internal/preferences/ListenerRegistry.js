Clazz.declarePackage ("org.eclipse.core.internal.preferences");
Clazz.load (null, "org.eclipse.core.internal.preferences.ListenerRegistry", ["java.lang.NullPointerException", "org.eclipse.core.internal.runtime.ListenerList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.registry = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences, "ListenerRegistry");
Clazz.prepareFields (c$, function () {
this.registry =  new org.eclipse.core.internal.preferences.ListenerRegistry.ListenerMap (25);
});
Clazz.defineMethod (c$, "getListeners", 
function (path) {
var list = this.registry.get (path);
return list == null ? org.eclipse.core.internal.preferences.ListenerRegistry.EMPTY_LIST : list.getListeners ();
}, "~S");
Clazz.defineMethod (c$, "add", 
function (path, listener) {
var list = this.registry.get (path);
if (list == null) list =  new org.eclipse.core.internal.runtime.ListenerList (1);
list.add (listener);
this.registry.put (path, list);
}, "~S,~O");
Clazz.defineMethod (c$, "remove", 
function (path, listener) {
var list = this.registry.get (path);
if (list == null) return ;
list.remove (listener);
if (list.isEmpty ()) this.registry.remove (path);
}, "~S,~O");
Clazz.defineMethod (c$, "clear", 
function (path) {
this.registry.remove (path);
}, "~S");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.keys = null;
this.values = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.preferences.ListenerRegistry, "ListenerMap");
Clazz.makeConstructor (c$, 
function (size) {
this.keys =  new Array (size);
this.values =  new Array (size);
}, "~N");
Clazz.defineMethod (c$, "get", 
function (key) {
if (key == null) throw  new NullPointerException ();
for (var i = 0; i < this.keys.length; i++) if (key.equals (this.keys[i])) return this.values[i];

return null;
}, "~S");
Clazz.defineMethod (c$, "put", 
function (key, value) {
if (key == null) throw  new NullPointerException ();
if (value == null) {
this.remove (key);
return ;
}var emptyIndex = -1;
for (var i = 0; i < this.keys.length; i++) {
var existing = this.keys[i];
if (existing == null) {
emptyIndex = i;
continue ;}if (existing.equals (key)) {
this.values[i] = value;
return ;
}}
if (emptyIndex == -1) emptyIndex = this.grow ();
this.keys[emptyIndex] = key;
this.values[emptyIndex] = value;
}, "~S,org.eclipse.core.internal.runtime.ListenerList");
Clazz.defineMethod (c$, "grow", 
($fz = function () {
var size = this.keys.length;
var tempKeys =  new Array (size + 10);
System.arraycopy (this.keys, 0, tempKeys, 0, size);
this.keys = tempKeys;
var tempValues =  new Array (size + 10);
System.arraycopy (this.values, 0, tempValues, 0, size);
this.values = tempValues;
return size;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "remove", 
function (key) {
if (key == null) throw  new NullPointerException ();
for (var i = 0; i < this.keys.length; i++) if (key.equals (this.keys[i])) {
this.keys[i] = null;
this.values[i] = null;
return ;
}
}, "~S");
Clazz.defineStatics (c$,
"GROW_SIZE", 10);
c$ = Clazz.p0p ();
c$.EMPTY_LIST = c$.prototype.EMPTY_LIST =  new Array (0);
});
