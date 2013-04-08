Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (null, "net.sf.j2s.core.builder.NameSet", ["org.eclipse.jdt.core.compiler.CharOperation"], function () {
c$ = Clazz.decorateAsClass (function () {
this.names = null;
this.elementSize = 0;
this.threshold = 0;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "NameSet");
Clazz.makeConstructor (c$, 
function (size) {
this.elementSize = 0;
this.threshold = size;
var extraRoom = Math.round ((size * 1.5));
if (this.threshold == extraRoom) extraRoom++;
this.names =  Clazz.newArray (extraRoom, '\0');
}, "~N");
Clazz.defineMethod (c$, "add", 
function (name) {
var length = this.names.length;
var index = org.eclipse.jdt.core.compiler.CharOperation.hashCode (name) % length;
var current;
while ((current = this.names[index]) != null) {
if (org.eclipse.jdt.core.compiler.CharOperation.equals (current, name)) return current;
if (++index == length) index = 0;
}
this.names[index] = name;
if (++this.elementSize > this.threshold) this.rehash ();
return name;
}, "~A");
Clazz.defineMethod (c$, "rehash", 
($fz = function () {
var newSet =  new net.sf.j2s.core.builder.NameSet (this.elementSize * 2);
var current;
for (var i = this.names.length; --i >= 0; ) if ((current = this.names[i]) != null) newSet.add (current);

this.names = newSet.names;
this.elementSize = newSet.elementSize;
this.threshold = newSet.threshold;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "";
var name;
for (var i = 0, l = this.names.length; i < l; i++) if ((name = this.names[i]) != null) s +=  String.instantialize (name) + "\n";

return s;
});
});
