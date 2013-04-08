Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["org.eclipse.jdt.core.compiler.CharOperation", "org.eclipse.jdt.internal.compiler.lookup.TypeConstants"], "net.sf.j2s.core.builder.ReferenceCollection", ["net.sf.j2s.core.builder.JavaBuilder", "$.NameSet", "$.QualifiedNameSet"], function () {
c$ = Clazz.decorateAsClass (function () {
this.qualifiedNameReferences = null;
this.simpleNameReferences = null;
this.rootReferences = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "ReferenceCollection");
Clazz.makeConstructor (c$, 
function (qualifiedNameReferences, simpleNameReferences, rootReferences) {
this.qualifiedNameReferences = net.sf.j2s.core.builder.ReferenceCollection.internQualifiedNames (qualifiedNameReferences);
this.simpleNameReferences = net.sf.j2s.core.builder.ReferenceCollection.internSimpleNames (simpleNameReferences, true);
this.rootReferences = net.sf.j2s.core.builder.ReferenceCollection.internSimpleNames (rootReferences, false);
}, "~A,~A,~A");
Clazz.defineMethod (c$, "addDependencies", 
function (typeNameDependencies) {
var qNames =  Clazz.newArray (typeNameDependencies.length, '\0');
for (var i = typeNameDependencies.length; --i >= 0; ) qNames[i] = org.eclipse.jdt.core.compiler.CharOperation.splitOn ('.', typeNameDependencies[i].toCharArray ());

qNames = net.sf.j2s.core.builder.ReferenceCollection.internQualifiedNames (qNames);
next : for (var i = qNames.length; --i >= 0; ) {
var qualifiedTypeName = qNames[i];
while (!this.includes (qualifiedTypeName)) {
if (!this.includes (qualifiedTypeName[qualifiedTypeName.length - 1])) {
var length = this.simpleNameReferences.length;
System.arraycopy (this.simpleNameReferences, 0, this.simpleNameReferences =  Clazz.newArray (length + 1, '\0'), 0, length);
this.simpleNameReferences[length] = qualifiedTypeName[qualifiedTypeName.length - 1];
}if (!this.insideRoot (qualifiedTypeName[0])) {
var length = this.rootReferences.length;
System.arraycopy (this.rootReferences, 0, this.rootReferences =  Clazz.newArray (length + 1, '\0'), 0, length);
this.rootReferences[length] = qualifiedTypeName[0];
}var length = this.qualifiedNameReferences.length;
System.arraycopy (this.qualifiedNameReferences, 0, this.qualifiedNameReferences =  Clazz.newArray (length + 1, '\0'), 0, length);
this.qualifiedNameReferences[length] = qualifiedTypeName;
qualifiedTypeName = org.eclipse.jdt.core.compiler.CharOperation.subarray (qualifiedTypeName, 0, qualifiedTypeName.length - 1);
var temp = net.sf.j2s.core.builder.ReferenceCollection.internQualifiedNames ([qualifiedTypeName]);
if (temp === net.sf.j2s.core.builder.ReferenceCollection.EmptyQualifiedNames) continue next;qualifiedTypeName = temp[0];
}
}
}, "~A");
Clazz.defineMethod (c$, "includes", 
function (simpleName) {
for (var i = 0, l = this.simpleNameReferences.length; i < l; i++) if (simpleName === this.simpleNameReferences[i]) return true;

return false;
}, "~A");
Clazz.defineMethod (c$, "includes", 
function (qualifiedName) {
for (var i = 0, l = this.qualifiedNameReferences.length; i < l; i++) if (qualifiedName === this.qualifiedNameReferences[i]) return true;

return false;
}, "~A");
Clazz.defineMethod (c$, "includes", 
function (qualifiedNames, simpleNames) {
return this.includes (qualifiedNames, simpleNames, null);
}, "~A,~A");
Clazz.defineMethod (c$, "includes", 
function (qualifiedNames, simpleNames, rootNames) {
if (rootNames != null) {
var foundRoot = false;
for (var i = 0, l = rootNames.length; !foundRoot && i < l; i++) foundRoot = this.insideRoot (rootNames[i]);

if (!foundRoot) return false;
}if (simpleNames == null || qualifiedNames == null) {
if (simpleNames == null && qualifiedNames == null) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found well known match");
return true;
} else if (qualifiedNames == null) {
for (var i = 0, l = simpleNames.length; i < l; i++) {
if (this.includes (simpleNames[i])) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found match in well known package to " +  String.instantialize (simpleNames[i]));
return true;
}}
} else {
for (var i = 0, l = qualifiedNames.length; i < l; i++) {
var qualifiedName = qualifiedNames[i];
if (qualifiedName.length == 1 ? this.includes (qualifiedName[0]) : this.includes (qualifiedName)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found well known match in " + org.eclipse.jdt.core.compiler.CharOperation.toString (qualifiedName));
return true;
}}
}return false;
}var sLength = simpleNames.length;
var qLength = qualifiedNames.length;
if (sLength <= qLength) {
for (var i = 0; i < sLength; i++) {
if (this.includes (simpleNames[i])) {
for (var j = 0; j < qLength; j++) {
var qualifiedName = qualifiedNames[j];
if (qualifiedName.length == 1 ? this.includes (qualifiedName[0]) : this.includes (qualifiedName)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found match in " + org.eclipse.jdt.core.compiler.CharOperation.toString (qualifiedName) + " to " +  String.instantialize (simpleNames[i]));
return true;
}}
return false;
}}
} else {
for (var i = 0; i < qLength; i++) {
var qualifiedName = qualifiedNames[i];
if (qualifiedName.length == 1 ? this.includes (qualifiedName[0]) : this.includes (qualifiedName)) {
for (var j = 0; j < sLength; j++) {
if (this.includes (simpleNames[j])) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found match in " + org.eclipse.jdt.core.compiler.CharOperation.toString (qualifiedName) + " to " +  String.instantialize (simpleNames[j]));
return true;
}}
return false;
}}
}return false;
}, "~A,~A,~A");
Clazz.defineMethod (c$, "insideRoot", 
function (rootName) {
for (var i = 0, l = this.rootReferences.length; i < l; i++) if (rootName === this.rootReferences[i]) return true;

return false;
}, "~A");
c$.internQualifiedNames = Clazz.defineMethod (c$, "internQualifiedNames", 
function (qualifiedStrings) {
if (qualifiedStrings == null) return net.sf.j2s.core.builder.ReferenceCollection.EmptyQualifiedNames;
var length = qualifiedStrings.elementSize;
if (length == 0) return net.sf.j2s.core.builder.ReferenceCollection.EmptyQualifiedNames;
var result =  Clazz.newArray (length, '\0');
var strings = qualifiedStrings.values;
for (var i = 0, l = strings.length; i < l; i++) if (strings[i] != null) result[--length] = org.eclipse.jdt.core.compiler.CharOperation.splitOn ('/', strings[i].toCharArray ());

return net.sf.j2s.core.builder.ReferenceCollection.internQualifiedNames (result);
}, "net.sf.j2s.core.builder.StringSet");
c$.internQualifiedNames = Clazz.defineMethod (c$, "internQualifiedNames", 
function (qualifiedNames) {
if (qualifiedNames == null) return net.sf.j2s.core.builder.ReferenceCollection.EmptyQualifiedNames;
var length = qualifiedNames.length;
if (length == 0) return net.sf.j2s.core.builder.ReferenceCollection.EmptyQualifiedNames;
var keepers =  Clazz.newArray (length, '\0');
var index = 0;
next : for (var i = 0; i < length; i++) {
var qualifiedName = qualifiedNames[i];
var qLength = qualifiedName.length;
for (var j = 0, m = net.sf.j2s.core.builder.ReferenceCollection.WellKnownQualifiedNames.length; j < m; j++) {
var wellKnownName = net.sf.j2s.core.builder.ReferenceCollection.WellKnownQualifiedNames[j];
if (qLength > wellKnownName.length) break;
if (org.eclipse.jdt.core.compiler.CharOperation.equals (qualifiedName, wellKnownName)) continue next;}
var internedNames = net.sf.j2s.core.builder.ReferenceCollection.InternedQualifiedNames[qLength <= 7 ? qLength - 1 : 0];
qualifiedName = net.sf.j2s.core.builder.ReferenceCollection.internSimpleNames (qualifiedName, false);
keepers[index++] = internedNames.add (qualifiedName);
}
if (length > index) {
if (index == 0) return net.sf.j2s.core.builder.ReferenceCollection.EmptyQualifiedNames;
System.arraycopy (keepers, 0, keepers =  Clazz.newArray (index, '\0'), 0, index);
}return keepers;
}, "~A");
c$.internSimpleNames = Clazz.defineMethod (c$, "internSimpleNames", 
function (simpleStrings) {
return net.sf.j2s.core.builder.ReferenceCollection.internSimpleNames (simpleStrings, true);
}, "net.sf.j2s.core.builder.StringSet");
c$.internSimpleNames = Clazz.defineMethod (c$, "internSimpleNames", 
function (simpleStrings, removeWellKnown) {
if (simpleStrings == null) return net.sf.j2s.core.builder.ReferenceCollection.EmptySimpleNames;
var length = simpleStrings.elementSize;
if (length == 0) return net.sf.j2s.core.builder.ReferenceCollection.EmptySimpleNames;
var result =  Clazz.newArray (length, '\0');
var strings = simpleStrings.values;
for (var i = 0, l = strings.length; i < l; i++) if (strings[i] != null) result[--length] = strings[i].toCharArray ();

return net.sf.j2s.core.builder.ReferenceCollection.internSimpleNames (result, removeWellKnown);
}, "net.sf.j2s.core.builder.StringSet,~B");
c$.internSimpleNames = Clazz.defineMethod (c$, "internSimpleNames", 
function (simpleNames, removeWellKnown) {
if (simpleNames == null) return net.sf.j2s.core.builder.ReferenceCollection.EmptySimpleNames;
var length = simpleNames.length;
if (length == 0) return net.sf.j2s.core.builder.ReferenceCollection.EmptySimpleNames;
var keepers =  Clazz.newArray (length, '\0');
var index = 0;
next : for (var i = 0; i < length; i++) {
var name = simpleNames[i];
var sLength = name.length;
for (var j = 0, m = net.sf.j2s.core.builder.ReferenceCollection.WellKnownSimpleNames.length; j < m; j++) {
var wellKnownName = net.sf.j2s.core.builder.ReferenceCollection.WellKnownSimpleNames[j];
if (sLength > wellKnownName.length) break;
if (org.eclipse.jdt.core.compiler.CharOperation.equals (name, wellKnownName)) {
if (!removeWellKnown) keepers[index++] = net.sf.j2s.core.builder.ReferenceCollection.WellKnownSimpleNames[j];
continue next;}}
var internedNames = net.sf.j2s.core.builder.ReferenceCollection.InternedSimpleNames[sLength < 30 ? sLength : 0];
keepers[index++] = internedNames.add (name);
}
if (length > index) {
if (index == 0) return net.sf.j2s.core.builder.ReferenceCollection.EmptySimpleNames;
System.arraycopy (keepers, 0, keepers =  Clazz.newArray (index, '\0'), 0, index);
}return keepers;
}, "~A,~B");
c$.WellKnownQualifiedNames = c$.prototype.WellKnownQualifiedNames = [org.eclipse.jdt.internal.compiler.lookup.TypeConstants.JAVA_LANG_RUNTIMEEXCEPTION, org.eclipse.jdt.internal.compiler.lookup.TypeConstants.JAVA_LANG_THROWABLE, org.eclipse.jdt.internal.compiler.lookup.TypeConstants.JAVA_LANG_OBJECT, org.eclipse.jdt.internal.compiler.lookup.TypeConstants.JAVA_LANG, [org.eclipse.jdt.internal.compiler.lookup.TypeConstants.JAVA], [['o', 'r', 'g']], [['c', 'o', 'm']], org.eclipse.jdt.core.compiler.CharOperation.NO_CHAR_CHAR];
c$.WellKnownSimpleNames = c$.prototype.WellKnownSimpleNames = [org.eclipse.jdt.internal.compiler.lookup.TypeConstants.JAVA_LANG_RUNTIMEEXCEPTION[2], org.eclipse.jdt.internal.compiler.lookup.TypeConstants.JAVA_LANG_THROWABLE[2], org.eclipse.jdt.internal.compiler.lookup.TypeConstants.JAVA_LANG_OBJECT[2], org.eclipse.jdt.internal.compiler.lookup.TypeConstants.JAVA, org.eclipse.jdt.internal.compiler.lookup.TypeConstants.LANG, ['o', 'r', 'g'], ['c', 'o', 'm']];
Clazz.defineStatics (c$,
"EmptyQualifiedNames",  Clazz.newArray (0, '\0'));
c$.EmptySimpleNames = c$.prototype.EmptySimpleNames = org.eclipse.jdt.core.compiler.CharOperation.NO_CHAR_CHAR;
Clazz.defineStatics (c$,
"MaxQualifiedNames", 7);
c$.InternedQualifiedNames = c$.prototype.InternedQualifiedNames =  new Array (7);
Clazz.defineStatics (c$,
"MaxSimpleNames", 30);
c$.InternedSimpleNames = c$.prototype.InternedSimpleNames =  new Array (30);
{
for (var i = 0; i < 7; i++) net.sf.j2s.core.builder.ReferenceCollection.InternedQualifiedNames[i] =  new net.sf.j2s.core.builder.QualifiedNameSet (37);

for (var i = 0; i < 30; i++) net.sf.j2s.core.builder.ReferenceCollection.InternedSimpleNames[i] =  new net.sf.j2s.core.builder.NameSet (37);

}});
