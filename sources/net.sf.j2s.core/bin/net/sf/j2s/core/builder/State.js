Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (null, "net.sf.j2s.core.builder.State", ["java.lang.Long", "java.util.ArrayList", "$.Date", "net.sf.j2s.core.builder.AdditionalTypeCollection", "$.ClasspathLocation", "$.JavaBuilder", "$.ReferenceCollection", "$.StringSet", "org.eclipse.core.runtime.Path", "org.eclipse.jdt.core.compiler.CharOperation", "org.eclipse.jdt.internal.compiler.env.AccessRuleSet", "org.eclipse.jdt.internal.compiler.util.SimpleLookupTable", "org.eclipse.jdt.internal.core.ClasspathAccessRule", "$.JavaModelManager", "org.eclipse.jdt.internal.core.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.javaProjectName = null;
this.sourceLocations = null;
this.binaryLocations = null;
this.references = null;
this.typeLocators = null;
this.buildNumber = 0;
this.lastStructuralBuildTime = 0;
this.structuralBuildTimes = null;
this.knownPackageNames = null;
this.previousStructuralBuildTime = 0;
this.structurallyChangedTypes = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "State");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (javaBuilder) {
this.knownPackageNames = null;
this.previousStructuralBuildTime = -1;
this.structurallyChangedTypes = null;
this.javaProjectName = javaBuilder.currentProject.getName ();
this.sourceLocations = javaBuilder.nameEnvironment.sourceLocations;
this.binaryLocations = javaBuilder.nameEnvironment.binaryLocations;
this.references =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (7);
this.typeLocators =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (7);
this.buildNumber = 0;
this.lastStructuralBuildTime = this.computeStructuralBuildTime (javaBuilder.lastState == null ? 0 : javaBuilder.lastState.lastStructuralBuildTime);
this.structuralBuildTimes =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (3);
}, "net.sf.j2s.core.builder.JavaBuilder");
Clazz.defineMethod (c$, "computeStructuralBuildTime", 
function (previousTime) {
var newTime = System.currentTimeMillis ();
if (newTime <= previousTime) newTime = previousTime + 1;
return newTime;
}, "~N");
Clazz.defineMethod (c$, "copyFrom", 
function (lastState) {
this.knownPackageNames = null;
this.previousStructuralBuildTime = lastState.previousStructuralBuildTime;
this.structurallyChangedTypes = lastState.structurallyChangedTypes;
this.buildNumber = lastState.buildNumber + 1;
this.lastStructuralBuildTime = lastState.lastStructuralBuildTime;
this.structuralBuildTimes = lastState.structuralBuildTimes;
try {
this.references = lastState.references.clone ();
this.typeLocators = lastState.typeLocators.clone ();
} catch (e) {
if (Clazz.instanceOf (e, CloneNotSupportedException)) {
this.references =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (lastState.references.elementSize);
var keyTable = lastState.references.keyTable;
var valueTable = lastState.references.valueTable;
for (var i = 0, l = keyTable.length; i < l; i++) if (keyTable[i] != null) this.references.put (keyTable[i], valueTable[i]);

this.typeLocators =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (lastState.typeLocators.elementSize);
keyTable = lastState.typeLocators.keyTable;
valueTable = lastState.typeLocators.valueTable;
for (var i = 0, l = keyTable.length; i < l; i++) if (keyTable[i] != null) this.typeLocators.put (keyTable[i], valueTable[i]);

} else {
throw e;
}
}
}, "net.sf.j2s.core.builder.State");
Clazz.defineMethod (c$, "getDefinedTypeNamesFor", 
function (typeLocator) {
var c = this.references.get (typeLocator);
if (Clazz.instanceOf (c, net.sf.j2s.core.builder.AdditionalTypeCollection)) return (c).definedTypeNames;
return null;
}, "~S");
Clazz.defineMethod (c$, "getReferences", 
function () {
return this.references;
});
Clazz.defineMethod (c$, "getStructurallyChangedTypes", 
function (prereqState) {
if (prereqState != null && prereqState.previousStructuralBuildTime > 0) {
var o = this.structuralBuildTimes.get (prereqState.javaProjectName);
var previous = o == null ? 0 : (o).longValue ();
if (previous == prereqState.previousStructuralBuildTime) return prereqState.structurallyChangedTypes;
}return null;
}, "net.sf.j2s.core.builder.State");
Clazz.defineMethod (c$, "isDuplicateLocator", 
function (qualifiedTypeName, typeLocator) {
var existing = this.typeLocators.get (qualifiedTypeName);
return existing != null && !existing.equals (typeLocator);
}, "~S,~S");
Clazz.defineMethod (c$, "isKnownPackage", 
function (qualifiedPackageName) {
if (this.knownPackageNames == null) {
var names =  new java.util.ArrayList (this.typeLocators.elementSize);
var keyTable = this.typeLocators.keyTable;
for (var i = 0, l = keyTable.length; i < l; i++) {
if (keyTable[i] != null) {
var packageName = keyTable[i];
var last = packageName.lastIndexOf ('/');
packageName = last == -1 ? null : packageName.substring (0, last);
while (packageName != null && !names.contains (packageName)) {
names.add (packageName);
last = packageName.lastIndexOf ('/');
packageName = last == -1 ? null : packageName.substring (0, last);
}
}}
this.knownPackageNames =  new Array (names.size ());
names.toArray (this.knownPackageNames);
}for (var i = 0, l = this.knownPackageNames.length; i < l; i++) if (this.knownPackageNames[i].equals (qualifiedPackageName)) return true;

return false;
}, "~S");
Clazz.defineMethod (c$, "isKnownType", 
function (qualifiedTypeName) {
return this.typeLocators.containsKey (qualifiedTypeName);
}, "~S");
Clazz.defineMethod (c$, "isSourceFolderEmpty", 
function (sourceFolder) {
var sourceFolderName = sourceFolder.getProjectRelativePath ().addTrailingSeparator ().toString ();
var table = this.typeLocators.valueTable;
for (var i = 0, l = table.length; i < l; i++) if (table[i] != null && (table[i]).startsWith (sourceFolderName)) return false;

return true;
}, "org.eclipse.core.resources.IContainer");
Clazz.defineMethod (c$, "record", 
function (typeLocator, qualifiedRefs, simpleRefs, rootRefs, mainTypeName, typeNames) {
if (typeNames.size () == 1 && org.eclipse.jdt.core.compiler.CharOperation.equals (mainTypeName, typeNames.get (0))) {
this.references.put (typeLocator,  new net.sf.j2s.core.builder.ReferenceCollection (qualifiedRefs, simpleRefs, rootRefs));
} else {
var definedTypeNames =  Clazz.newArray (typeNames.size (), '\0');
typeNames.toArray (definedTypeNames);
this.references.put (typeLocator,  new net.sf.j2s.core.builder.AdditionalTypeCollection (definedTypeNames, qualifiedRefs, simpleRefs, rootRefs));
}}, "~S,~A,~A,~A,~A,java.util.ArrayList");
Clazz.defineMethod (c$, "recordLocatorForType", 
function (qualifiedTypeName, typeLocator) {
this.knownPackageNames = null;
var start = typeLocator.indexOf (qualifiedTypeName, 0);
if (start > 0) qualifiedTypeName = typeLocator.substring (start, start + qualifiedTypeName.length);
this.typeLocators.put (qualifiedTypeName, typeLocator);
}, "~S,~S");
Clazz.defineMethod (c$, "recordStructuralDependency", 
function (prereqProject, prereqState) {
if (prereqState != null) if (prereqState.lastStructuralBuildTime > 0) this.structuralBuildTimes.put (prereqProject.getName (),  new Long (prereqState.lastStructuralBuildTime));
}, "org.eclipse.core.resources.IProject,net.sf.j2s.core.builder.State");
Clazz.defineMethod (c$, "removeLocator", 
function (typeLocatorToRemove) {
this.knownPackageNames = null;
this.references.removeKey (typeLocatorToRemove);
this.typeLocators.removeValue (typeLocatorToRemove);
}, "~S");
Clazz.defineMethod (c$, "removePackage", 
function (sourceDelta) {
var resource = sourceDelta.getResource ();
switch (resource.getType ()) {
case 2:
var children = sourceDelta.getAffectedChildren ();
for (var i = 0, l = children.length; i < l; i++) this.removePackage (children[i]);

return ;
case 1:
var typeLocatorPath = resource.getProjectRelativePath ();
if (org.eclipse.jdt.internal.core.util.Util.isJavaLikeFileName (typeLocatorPath.lastSegment ())) this.removeLocator (typeLocatorPath.toString ());
}
}, "org.eclipse.core.resources.IResourceDelta");
Clazz.defineMethod (c$, "removeQualifiedTypeName", 
function (qualifiedTypeNameToRemove) {
this.knownPackageNames = null;
this.typeLocators.removeKey (qualifiedTypeNameToRemove);
}, "~S");
c$.read = Clazz.defineMethod (c$, "read", 
function (project, $in) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("About to read state " + project.getName ());
if (23 != $in.readByte ()) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found non-compatible state version... answered null for " + project.getName ());
return null;
}var newState =  new net.sf.j2s.core.builder.State ();
newState.javaProjectName = $in.readUTF ();
if (!project.getName ().equals (newState.javaProjectName)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Project's name does not match... answered null");
return null;
}newState.buildNumber = $in.readInt ();
newState.lastStructuralBuildTime = $in.readLong ();
var length = $in.readInt ();
newState.sourceLocations =  new Array (length);
for (var i = 0; i < length; i++) {
var sourceFolder = project;
var outputFolder = project;
var folderName;
if ((folderName = $in.readUTF ()).length > 0) sourceFolder = project.getFolder (folderName);
if ((folderName = $in.readUTF ()).length > 0) outputFolder = project.getFolder (folderName);
var md = net.sf.j2s.core.builder.ClasspathLocation.forSourceFolder (sourceFolder, outputFolder, net.sf.j2s.core.builder.State.readNames ($in), net.sf.j2s.core.builder.State.readNames ($in));
if ($in.readBoolean ()) md.hasIndependentOutputFolder = true;
newState.sourceLocations[i] = md;
}
length = $in.readInt ();
newState.binaryLocations =  new Array (length);
var root = project.getWorkspace ().getRoot ();
for (var i = 0; i < length; i++) {
switch ($in.readByte ()) {
case 1:
newState.binaryLocations[i] = newState.sourceLocations[$in.readInt ()];
break;
case 2:
var path =  new org.eclipse.core.runtime.Path ($in.readUTF ());
var outputFolder = path.segmentCount () == 1 ? root.getProject (path.toString ()) : root.getFolder (path);
newState.binaryLocations[i] = net.sf.j2s.core.builder.ClasspathLocation.forBinaryFolder (outputFolder, $in.readBoolean (), net.sf.j2s.core.builder.State.readRestriction ($in));
break;
case 3:
newState.binaryLocations[i] = net.sf.j2s.core.builder.ClasspathLocation.forLibrary ($in.readUTF (), $in.readLong (), net.sf.j2s.core.builder.State.readRestriction ($in));
break;
case 4:
newState.binaryLocations[i] = net.sf.j2s.core.builder.ClasspathLocation.forLibrary (root.getFile ( new org.eclipse.core.runtime.Path ($in.readUTF ())), net.sf.j2s.core.builder.State.readRestriction ($in));
}
}
newState.structuralBuildTimes =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (length = $in.readInt ());
for (var i = 0; i < length; i++) newState.structuralBuildTimes.put ($in.readUTF (),  new Long ($in.readLong ()));

var internedTypeLocators =  new Array (length = $in.readInt ());
for (var i = 0; i < length; i++) internedTypeLocators[i] = $in.readUTF ();

newState.typeLocators =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (length = $in.readInt ());
for (var i = 0; i < length; i++) newState.recordLocatorForType ($in.readUTF (), internedTypeLocators[$in.readInt ()]);

var internedRootNames = net.sf.j2s.core.builder.ReferenceCollection.internSimpleNames (net.sf.j2s.core.builder.State.readNames ($in), false);
var internedSimpleNames = net.sf.j2s.core.builder.ReferenceCollection.internSimpleNames (net.sf.j2s.core.builder.State.readNames ($in), false);
var internedQualifiedNames =  Clazz.newArray (length = $in.readInt (), '\0');
for (var i = 0; i < length; i++) {
var qLength = $in.readInt ();
var qName =  Clazz.newArray (qLength, '\0');
for (var j = 0; j < qLength; j++) qName[j] = internedSimpleNames[$in.readInt ()];

internedQualifiedNames[i] = qName;
}
internedQualifiedNames = net.sf.j2s.core.builder.ReferenceCollection.internQualifiedNames (internedQualifiedNames);
newState.references =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (length = $in.readInt ());
for (var i = 0; i < length; i++) {
var typeLocator = internedTypeLocators[$in.readInt ()];
var collection = null;
switch ($in.readByte ()) {
case 1:
var additionalTypeNames = net.sf.j2s.core.builder.State.readNames ($in);
var qualifiedNames =  Clazz.newArray ($in.readInt (), '\0');
for (var j = 0, m = qualifiedNames.length; j < m; j++) qualifiedNames[j] = internedQualifiedNames[$in.readInt ()];

var simpleNames =  Clazz.newArray ($in.readInt (), '\0');
for (var j = 0, m = simpleNames.length; j < m; j++) simpleNames[j] = internedSimpleNames[$in.readInt ()];

var rootNames =  Clazz.newArray ($in.readInt (), '\0');
for (var j = 0, m = rootNames.length; j < m; j++) rootNames[j] = internedRootNames[$in.readInt ()];

collection =  new net.sf.j2s.core.builder.AdditionalTypeCollection (additionalTypeNames, qualifiedNames, simpleNames, rootNames);
break;
case 2:
var qNames =  Clazz.newArray ($in.readInt (), '\0');
for (var j = 0, m = qNames.length; j < m; j++) qNames[j] = internedQualifiedNames[$in.readInt ()];

var sNames =  Clazz.newArray ($in.readInt (), '\0');
for (var j = 0, m = sNames.length; j < m; j++) sNames[j] = internedSimpleNames[$in.readInt ()];

var rNames =  Clazz.newArray ($in.readInt (), '\0');
for (var j = 0, m = rNames.length; j < m; j++) rNames[j] = internedRootNames[$in.readInt ()];

collection =  new net.sf.j2s.core.builder.ReferenceCollection (qNames, sNames, rNames);
}
newState.references.put (typeLocator, collection);
}
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Successfully read state for " + newState.javaProjectName);
return newState;
}, "org.eclipse.core.resources.IProject,java.io.DataInputStream");
c$.readName = Clazz.defineMethod (c$, "readName", 
($fz = function ($in) {
var nLength = $in.readInt ();
var name =  Clazz.newArray (nLength, '\0');
for (var j = 0; j < nLength; j++) name[j] = $in.readChar ();

return name;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
c$.readNames = Clazz.defineMethod (c$, "readNames", 
($fz = function ($in) {
var length = $in.readInt ();
var names =  Clazz.newArray (length, '\0');
for (var i = 0; i < length; i++) names[i] = net.sf.j2s.core.builder.State.readName ($in);

return names;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
c$.readRestriction = Clazz.defineMethod (c$, "readRestriction", 
($fz = function ($in) {
var length = $in.readInt ();
if (length == 0) return null;
var accessRules =  new Array (length);
for (var i = 0; i < length; i++) {
var pattern = net.sf.j2s.core.builder.State.readName ($in);
var problemId = $in.readInt ();
accessRules[i] =  new org.eclipse.jdt.internal.core.ClasspathAccessRule (pattern, problemId);
}
var manager = org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ();
return  new org.eclipse.jdt.internal.compiler.env.AccessRuleSet (accessRules, $in.readByte (), manager.intern ($in.readUTF ()));
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "tagAsNoopBuild", 
function () {
this.buildNumber = -1;
});
Clazz.defineMethod (c$, "wasNoopBuild", 
function () {
return this.buildNumber == -1;
});
Clazz.defineMethod (c$, "tagAsStructurallyChanged", 
function () {
this.previousStructuralBuildTime = this.lastStructuralBuildTime;
this.structurallyChangedTypes =  new net.sf.j2s.core.builder.StringSet (7);
this.lastStructuralBuildTime = this.computeStructuralBuildTime (this.previousStructuralBuildTime);
});
Clazz.defineMethod (c$, "wasStructurallyChanged", 
function (prereqProject, prereqState) {
if (prereqState != null) {
var o = this.structuralBuildTimes.get (prereqProject.getName ());
var previous = o == null ? 0 : (o).longValue ();
if (previous == prereqState.lastStructuralBuildTime) return false;
}return true;
}, "org.eclipse.core.resources.IProject,net.sf.j2s.core.builder.State");
Clazz.defineMethod (c$, "wasStructurallyChanged", 
function (typeName) {
if (this.structurallyChangedTypes != null) {
if (this.structurallyChangedTypes.elementSize > net.sf.j2s.core.builder.State.MaxStructurallyChangedTypes) this.structurallyChangedTypes = null;
 else this.structurallyChangedTypes.add (typeName);
}}, "~S");
Clazz.defineMethod (c$, "write", 
function (out) {
var length;
var keyTable;
var valueTable;
out.writeByte (23);
out.writeUTF (this.javaProjectName);
out.writeInt (this.buildNumber);
out.writeLong (this.lastStructuralBuildTime);
out.writeInt (length = this.sourceLocations.length);
for (var i = 0; i < length; i++) {
var md = this.sourceLocations[i];
out.writeUTF (md.sourceFolder.getProjectRelativePath ().toString ());
out.writeUTF (md.binaryFolder.getProjectRelativePath ().toString ());
this.writeNames (md.inclusionPatterns, out);
this.writeNames (md.exclusionPatterns, out);
out.writeBoolean (md.hasIndependentOutputFolder);
}
out.writeInt (length = this.binaryLocations.length);
next : for (var i = 0; i < length; i++) {
var c = this.binaryLocations[i];
if (Clazz.instanceOf (c, net.sf.j2s.core.builder.ClasspathMultiDirectory)) {
out.writeByte (1);
for (var j = 0, m = this.sourceLocations.length; j < m; j++) {
if (this.sourceLocations[j] === c) {
out.writeInt (j);
continue next;}}
} else if (Clazz.instanceOf (c, net.sf.j2s.core.builder.ClasspathDirectory)) {
out.writeByte (2);
var cd = c;
out.writeUTF (cd.binaryFolder.getFullPath ().toString ());
out.writeBoolean (cd.$isOutputFolder);
this.writeRestriction (cd.accessRuleSet, out);
} else {
var jar = c;
if (jar.resource == null) {
out.writeByte (3);
out.writeUTF (jar.zipFilename);
out.writeLong (jar.lastModified ());
} else {
out.writeByte (4);
out.writeUTF (jar.resource.getFullPath ().toString ());
}this.writeRestriction (jar.accessRuleSet, out);
}}
out.writeInt (length = this.structuralBuildTimes.elementSize);
if (length > 0) {
keyTable = this.structuralBuildTimes.keyTable;
valueTable = this.structuralBuildTimes.valueTable;
for (var i = 0, l = keyTable.length; i < l; i++) {
if (keyTable[i] != null) {
length--;
out.writeUTF (keyTable[i]);
out.writeLong ((valueTable[i]).longValue ());
}}
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG && length != 0) System.out.println ("structuralBuildNumbers table is inconsistent");
}out.writeInt (length = this.references.elementSize);
var internedTypeLocators =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (length);
if (length > 0) {
keyTable = this.references.keyTable;
for (var i = 0, l = keyTable.length; i < l; i++) {
if (keyTable[i] != null) {
length--;
var key = keyTable[i];
out.writeUTF (key);
internedTypeLocators.put (key,  new Integer (internedTypeLocators.elementSize));
}}
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG && length != 0) System.out.println ("references table is inconsistent");
}out.writeInt (length = this.typeLocators.elementSize);
if (length > 0) {
keyTable = this.typeLocators.keyTable;
valueTable = this.typeLocators.valueTable;
for (var i = 0, l = keyTable.length; i < l; i++) {
if (keyTable[i] != null) {
length--;
out.writeUTF (keyTable[i]);
var index = internedTypeLocators.get (valueTable[i]);
out.writeInt (index.intValue ());
}}
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG && length != 0) System.out.println ("typeLocators table is inconsistent");
}var internedRootNames =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (3);
var internedQualifiedNames =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (31);
var internedSimpleNames =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (31);
valueTable = this.references.valueTable;
for (var i = 0, l = valueTable.length; i < l; i++) {
if (valueTable[i] != null) {
var collection = valueTable[i];
var rNames = collection.rootReferences;
for (var j = 0, m = rNames.length; j < m; j++) {
var rName = rNames[j];
if (!internedRootNames.containsKey (rName)) internedRootNames.put (rName,  new Integer (internedRootNames.elementSize));
}
var qNames = collection.qualifiedNameReferences;
for (var j = 0, m = qNames.length; j < m; j++) {
var qName = qNames[j];
if (!internedQualifiedNames.containsKey (qName)) {
internedQualifiedNames.put (qName,  new Integer (internedQualifiedNames.elementSize));
for (var k = 0, n = qName.length; k < n; k++) {
var sName = qName[k];
if (!internedSimpleNames.containsKey (sName)) internedSimpleNames.put (sName,  new Integer (internedSimpleNames.elementSize));
}
}}
var sNames = collection.simpleNameReferences;
for (var j = 0, m = sNames.length; j < m; j++) {
var sName = sNames[j];
if (!internedSimpleNames.containsKey (sName)) internedSimpleNames.put (sName,  new Integer (internedSimpleNames.elementSize));
}
}}
var internedArray =  Clazz.newArray (internedRootNames.elementSize, '\0');
var rootNames = internedRootNames.keyTable;
var positions = internedRootNames.valueTable;
for (var i = positions.length; --i >= 0; ) {
if (positions[i] != null) {
var index = (positions[i]).intValue ();
internedArray[index] = rootNames[i];
}}
this.writeNames (internedArray, out);
internedArray =  Clazz.newArray (internedSimpleNames.elementSize, '\0');
var simpleNames = internedSimpleNames.keyTable;
positions = internedSimpleNames.valueTable;
for (var i = positions.length; --i >= 0; ) {
if (positions[i] != null) {
var index = (positions[i]).intValue ();
internedArray[index] = simpleNames[i];
}}
this.writeNames (internedArray, out);
var internedQArray =  Clazz.newArray (internedQualifiedNames.elementSize, '\0');
var qualifiedNames = internedQualifiedNames.keyTable;
positions = internedQualifiedNames.valueTable;
for (var i = positions.length; --i >= 0; ) {
if (positions[i] != null) {
var index = (positions[i]).intValue ();
internedQArray[index] = qualifiedNames[i];
}}
out.writeInt (length = internedQArray.length);
for (var i = 0; i < length; i++) {
var qName = internedQArray[i];
var qLength = qName.length;
out.writeInt (qLength);
for (var j = 0; j < qLength; j++) {
var index = internedSimpleNames.get (qName[j]);
out.writeInt (index.intValue ());
}
}
out.writeInt (length = this.references.elementSize);
if (length > 0) {
keyTable = this.references.keyTable;
for (var i = 0, l = keyTable.length; i < l; i++) {
if (keyTable[i] != null) {
length--;
var index = internedTypeLocators.get (keyTable[i]);
out.writeInt (index.intValue ());
var collection = valueTable[i];
if (Clazz.instanceOf (collection, net.sf.j2s.core.builder.AdditionalTypeCollection)) {
out.writeByte (1);
var atc = collection;
this.writeNames (atc.definedTypeNames, out);
} else {
out.writeByte (2);
}var qNames = collection.qualifiedNameReferences;
var qLength = qNames.length;
out.writeInt (qLength);
for (var j = 0; j < qLength; j++) {
index = internedQualifiedNames.get (qNames[j]);
out.writeInt (index.intValue ());
}
var sNames = collection.simpleNameReferences;
var sLength = sNames.length;
out.writeInt (sLength);
for (var j = 0; j < sLength; j++) {
index = internedSimpleNames.get (sNames[j]);
out.writeInt (index.intValue ());
}
var rNames = collection.rootReferences;
var rLength = rNames.length;
out.writeInt (rLength);
for (var j = 0; j < rLength; j++) {
index = internedRootNames.get (rNames[j]);
out.writeInt (index.intValue ());
}
}}
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG && length != 0) System.out.println ("references table is inconsistent");
}}, "java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeName", 
($fz = function (name, out) {
var nLength = name.length;
out.writeInt (nLength);
for (var j = 0; j < nLength; j++) out.writeChar (name[j].charCodeAt (0));

}, $fz.isPrivate = true, $fz), "~A,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeNames", 
($fz = function (names, out) {
var length = names == null ? 0 : names.length;
out.writeInt (length);
for (var i = 0; i < length; i++) this.writeName (names[i], out);

}, $fz.isPrivate = true, $fz), "~A,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeRestriction", 
($fz = function (accessRuleSet, out) {
if (accessRuleSet == null) {
out.writeInt (0);
} else {
var accessRules = accessRuleSet.getAccessRules ();
var length = accessRules.length;
out.writeInt (length);
if (length != 0) {
for (var i = 0; i < length; i++) {
var accessRule = accessRules[i];
this.writeName (accessRule.pattern, out);
out.writeInt (accessRule.problemId);
}
out.writeByte (accessRuleSet.classpathEntryType);
out.writeUTF (accessRuleSet.classpathEntryName);
}}}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.internal.compiler.env.AccessRuleSet,java.io.DataOutputStream");
Clazz.overrideMethod (c$, "toString", 
function () {
return "State for " + this.javaProjectName + " (#" + this.buildNumber + " @ " +  new java.util.Date (this.lastStructuralBuildTime) + ")";
});
Clazz.defineStatics (c$,
"MaxStructurallyChangedTypes", 100,
"VERSION", 0x0017,
"SOURCE_FOLDER", 1,
"BINARY_FOLDER", 2,
"EXTERNAL_JAR", 3,
"INTERNAL_JAR", 4);
});
