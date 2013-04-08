Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (null, "net.sf.j2s.core.builder.QualifiedNameSet", ["org.eclipse.jdt.core.compiler.CharOperation"], function () {
c$ = Clazz.decorateAsClass (function () {
this.qualifiedNames = null;
this.elementSize = 0;
this.threshold = 0;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "QualifiedNameSet");
Clazz.makeConstructor (c$, 
function (size) {
this.elementSize = 0;
this.threshold = size;
var extraRoom = Math.round ((size * 1.5));
if (this.threshold == extraRoom) extraRoom++;
this.qualifiedNames =  Clazz.newArray (extraRoom, '\0');
}, "~N");
Clazz.defineMethod (c$, "add", 
function (qualifiedName) {
var qLength = qualifiedName.length;
if (qLength == 0) return org.eclipse.jdt.core.compiler.CharOperation.NO_CHAR_CHAR;
var length = this.qualifiedNames.length;
var index = org.eclipse.jdt.core.compiler.CharOperation.hashCode (qualifiedName[qLength - 1]) % length;
var current;
while ((current = this.qualifiedNames[index]) != null) {
if (org.eclipse.jdt.core.compiler.CharOperation.equals (current, qualifiedName)) return current;
if (++index == length) index = 0;
}
this.qualifiedNames[index] = qualifiedName;
if (++this.elementSize > this.threshold) this.rehash ();
return qualifiedName;
}, "~A");
Clazz.defineMethod (c$, "rehash", 
($fz = function () {
var newSet =  new net.sf.j2s.core.builder.QualifiedNameSet (this.elementSize * 2);
var current;
for (var i = this.qualifiedNames.length; --i >= 0; ) if ((current = this.qualifiedNames[i]) != null) newSet.add (current);

this.qualifiedNames = newSet.qualifiedNames;
this.elementSize = newSet.elementSize;
this.threshold = newSet.threshold;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "";
var qualifiedName;
for (var i = 0, l = this.qualifiedNames.length; i < l; i++) if ((qualifiedName = this.qualifiedNames[i]) != null) s += org.eclipse.jdt.core.compiler.CharOperation.toString (qualifiedName) + "\n";

return s;
});
});
