Clazz.declarePackage ("net.sf.j2s.core.builder");
c$ = Clazz.decorateAsClass (function () {
this.values = null;
this.elementSize = 0;
this.threshold = 0;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "StringSet");
Clazz.makeConstructor (c$, 
function (size) {
this.elementSize = 0;
this.threshold = size;
var extraRoom = Math.round ((size * 1.5));
if (this.threshold == extraRoom) extraRoom++;
this.values =  new Array (extraRoom);
}, "~N");
Clazz.defineMethod (c$, "add", 
function (value) {
var length = this.values.length;
var index = (value.hashCode () & 0x7FFFFFFF) % length;
var current;
while ((current = this.values[index]) != null) {
if (value.equals (current)) return false;
if (++index == length) index = 0;
}
this.values[index] = value;
if (++this.elementSize > this.threshold) this.rehash ();
return true;
}, "~S");
Clazz.defineMethod (c$, "clear", 
function () {
for (var i = this.values.length; --i >= 0; ) this.values[i] = null;

this.elementSize = 0;
});
Clazz.defineMethod (c$, "includes", 
function (value) {
var length = this.values.length;
var index = (value.hashCode () & 0x7FFFFFFF) % length;
var current;
while ((current = this.values[index]) != null) {
if (value.equals (current)) return true;
if (++index == length) index = 0;
}
return false;
}, "~S");
Clazz.defineMethod (c$, "rehash", 
($fz = function () {
var newSet =  new net.sf.j2s.core.builder.StringSet (this.elementSize * 2);
var current;
for (var i = this.values.length; --i >= 0; ) if ((current = this.values[i]) != null) newSet.add (current);

this.values = newSet.values;
this.elementSize = newSet.elementSize;
this.threshold = newSet.threshold;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "";
var value;
for (var i = 0, l = this.values.length; i < l; i++) if ((value = this.values[i]) != null) s += value + "\n";

return s;
});
