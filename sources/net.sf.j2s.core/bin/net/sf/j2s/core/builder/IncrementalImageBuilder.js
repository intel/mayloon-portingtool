Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["net.sf.j2s.core.builder.AbstractImageBuilder"], "net.sf.j2s.core.builder.IncrementalImageBuilder", ["java.io.ByteArrayInputStream", "java.util.ArrayList", "$.Date", "net.sf.j2s.core.builder.AbortIncrementalBuildException", "$.JavaBuilder", "$.ReferenceCollection", "$.SourceFile", "$.StringSet", "org.eclipse.core.runtime.Path", "org.eclipse.jdt.core.compiler.CharOperation", "org.eclipse.jdt.internal.compiler.classfmt.ClassFileReader", "org.eclipse.jdt.internal.compiler.lookup.TypeConstants", "org.eclipse.jdt.internal.compiler.problem.AbortCompilation", "org.eclipse.jdt.internal.compiler.util.SimpleLookupTable", "$.Util", "org.eclipse.jdt.internal.core.util.Messages", "$.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sourceFiles = null;
this.previousSourceFiles = null;
this.qualifiedStrings = null;
this.simpleStrings = null;
this.rootStrings = null;
this.secondaryTypesToRemove = null;
this.hasStructuralChanges = false;
this.compileLoop = 0;
this.makeOutputFolderConsistent = false;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "IncrementalImageBuilder", net.sf.j2s.core.builder.AbstractImageBuilder);
Clazz.makeConstructor (c$, 
function (javaBuilder, buildState) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.IncrementalImageBuilder, [javaBuilder, true, buildState]);
this.nameEnvironment.isIncrementalBuild = true;
this.makeOutputFolderConsistent = "enabled".equals (javaBuilder.javaProject.getOption ("org.eclipse.jdt.core.builder.recreateModifiedClassFileInOutputFolder", true));
}, "net.sf.j2s.core.builder.JavaBuilder,net.sf.j2s.core.builder.State");
Clazz.makeConstructor (c$, 
function (javaBuilder) {
this.construct (javaBuilder, null);
this.newState.copyFrom (javaBuilder.lastState);
}, "net.sf.j2s.core.builder.JavaBuilder");
Clazz.makeConstructor (c$, 
function (batchBuilder) {
this.construct (batchBuilder.javaBuilder, batchBuilder.newState);
this.resetCollections ();
}, "net.sf.j2s.core.builder.BatchImageBuilder");
Clazz.defineMethod (c$, "build", 
function (deltas) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("INCREMENTAL build");
try {
this.resetCollections ();
this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.build_analyzingDeltas);
if (this.javaBuilder.hasBuildpathErrors ()) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("COMPILING all source files since the buildpath has errors ");
this.javaBuilder.currentProject.deleteMarkers ("org.eclipse.jdt.core.problem", false, 0);
this.addAllSourceFiles (this.sourceFiles);
this.notifier.updateProgressDelta (0.25);
} else {
var sourceDelta = deltas.get (this.javaBuilder.currentProject);
if (sourceDelta != null) if (!this.findSourceFiles (sourceDelta)) return false;
this.notifier.updateProgressDelta (0.10);
var keyTable = deltas.keyTable;
var valueTable = deltas.valueTable;
for (var i = 0, l = valueTable.length; i < l; i++) {
var delta = valueTable[i];
if (delta != null) {
var p = keyTable[i];
var classFoldersAndJars = this.javaBuilder.binaryLocationsPerProject.get (p);
if (classFoldersAndJars != null) if (!this.findAffectedSourceFiles (delta, classFoldersAndJars, p)) return false;
}}
this.notifier.updateProgressDelta (0.10);
this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.build_analyzingSources);
this.addAffectedSourceFiles ();
this.notifier.updateProgressDelta (0.05);
}this.compileLoop = 0;
var increment = 0.40;
while (this.sourceFiles.size () > 0) {
if (++this.compileLoop > net.sf.j2s.core.builder.IncrementalImageBuilder.MaxCompileLoop) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("ABORTING incremental build... exceeded loop count");
return false;
}this.notifier.checkCancel ();
var allSourceFiles =  new Array (this.sourceFiles.size ());
this.sourceFiles.toArray (allSourceFiles);
this.resetCollections ();
this.workQueue.addAll (allSourceFiles);
this.notifier.setProgressPerCompilationUnit (increment / allSourceFiles.length);
increment = increment / 2;
this.compile (allSourceFiles);
this.removeSecondaryTypes ();
this.addAffectedSourceFiles ();
}
if (this.hasStructuralChanges && this.javaBuilder.javaProject.hasCycleMarker ()) this.javaBuilder.mustPropagateStructuralChanges ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, net.sf.j2s.core.builder.AbortIncrementalBuildException)) {
var e = e$$;
{
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("ABORTING incremental build... problem with " + e.qualifiedTypeName + ". Likely renamed inside its existing source file.");
return false;
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.CoreException)) {
var e = e$$;
{
throw this.internalException (e);
}
} else {
throw e$$;
}
} finally {
this.cleanUp ();
}
return true;
}, "org.eclipse.jdt.internal.compiler.util.SimpleLookupTable");
Clazz.defineMethod (c$, "buildAfterBatchBuild", 
function () {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("INCREMENTAL build after batch build @ " +  new java.util.Date (System.currentTimeMillis ()));
try {
this.addAffectedSourceFiles ();
while (this.sourceFiles.size () > 0) {
this.notifier.checkCancel ();
var allSourceFiles =  new Array (this.sourceFiles.size ());
this.sourceFiles.toArray (allSourceFiles);
this.resetCollections ();
this.notifier.setProgressPerCompilationUnit (0.08 / allSourceFiles.length);
this.workQueue.addAll (allSourceFiles);
this.compile (allSourceFiles);
this.removeSecondaryTypes ();
this.addAffectedSourceFiles ();
}
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
throw this.internalException (e);
} else {
throw e;
}
} finally {
this.cleanUp ();
}
});
Clazz.defineMethod (c$, "addAffectedSourceFiles", 
function () {
if (this.qualifiedStrings.elementSize == 0 && this.simpleStrings.elementSize == 0) return ;
this.addAffectedSourceFiles (this.qualifiedStrings, this.simpleStrings, this.rootStrings, null);
});
Clazz.defineMethod (c$, "addAffectedSourceFiles", 
function (qualifiedSet, simpleSet, rootSet, affectedTypes) {
var internedQualifiedNames = net.sf.j2s.core.builder.ReferenceCollection.internQualifiedNames (qualifiedSet);
if (internedQualifiedNames.length < qualifiedSet.elementSize) internedQualifiedNames = null;
var internedSimpleNames = net.sf.j2s.core.builder.ReferenceCollection.internSimpleNames (simpleSet, true);
if (internedSimpleNames.length < simpleSet.elementSize) internedSimpleNames = null;
var internedRootNames = net.sf.j2s.core.builder.ReferenceCollection.internSimpleNames (rootSet, false);
var keyTable = this.newState.references.keyTable;
var valueTable = this.newState.references.valueTable;
next : for (var i = 0, l = valueTable.length; i < l; i++) {
var typeLocator = keyTable[i];
if (typeLocator != null) {
if (affectedTypes != null && !affectedTypes.includes (typeLocator)) continue next;var refs = valueTable[i];
if (refs.includes (internedQualifiedNames, internedSimpleNames, internedRootNames)) {
var file = this.javaBuilder.currentProject.getFile (typeLocator);
var sourceFile = this.findSourceFile (file, true);
if (sourceFile == null) continue next;if (this.sourceFiles.contains (sourceFile)) continue next;if (this.compiledAllAtOnce && this.previousSourceFiles != null && this.previousSourceFiles.contains (sourceFile)) continue next;if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("  adding affected source file " + typeLocator);
this.sourceFiles.add (sourceFile);
}}}
}, "net.sf.j2s.core.builder.StringSet,net.sf.j2s.core.builder.StringSet,net.sf.j2s.core.builder.StringSet,net.sf.j2s.core.builder.StringSet");
Clazz.defineMethod (c$, "addDependentsOf", 
function (path, isStructuralChange) {
this.addDependentsOf (path, isStructuralChange, this.qualifiedStrings, this.simpleStrings, this.rootStrings);
}, "org.eclipse.core.runtime.IPath,~B");
Clazz.defineMethod (c$, "addDependentsOf", 
function (path, isStructuralChange, qualifiedNames, simpleNames, rootNames) {
path = path.setDevice (null);
if (isStructuralChange) {
var last = path.lastSegment ();
if (last.length == org.eclipse.jdt.internal.compiler.lookup.TypeConstants.PACKAGE_INFO_NAME.length) if (org.eclipse.jdt.core.compiler.CharOperation.equals (last.toCharArray (), org.eclipse.jdt.internal.compiler.lookup.TypeConstants.PACKAGE_INFO_NAME)) path = path.removeLastSegments (1);
}if (isStructuralChange && !this.hasStructuralChanges) {
this.newState.tagAsStructurallyChanged ();
this.hasStructuralChanges = true;
}rootNames.add (path.segment (0));
var packageName = path.removeLastSegments (1).toString ();
var wasNew = qualifiedNames.add (packageName);
var typeName = path.lastSegment ();
var memberIndex = typeName.indexOf ('$');
if (memberIndex > 0) typeName = typeName.substring (0, memberIndex);
wasNew =  new Boolean (simpleNames.add (typeName) | wasNew).valueOf ();
if (wasNew && net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("  will look for dependents of " + typeName + " in " + packageName);
}, "org.eclipse.core.runtime.IPath,~B,net.sf.j2s.core.builder.StringSet,net.sf.j2s.core.builder.StringSet,net.sf.j2s.core.builder.StringSet");
Clazz.defineMethod (c$, "checkForClassFileChanges", 
function (binaryDelta, md, segmentCount) {
var resource = binaryDelta.getResource ();
var isExcluded = (md.exclusionPatterns != null || md.inclusionPatterns != null) && org.eclipse.jdt.internal.core.util.Util.isExcluded (resource, md.inclusionPatterns, md.exclusionPatterns);
switch (resource.getType ()) {
case 2:
if (isExcluded && md.inclusionPatterns == null) return true;
var children = binaryDelta.getAffectedChildren ();
for (var i = 0, l = children.length; i < l; i++) if (!this.checkForClassFileChanges (children[i], md, segmentCount)) return false;

return true;
case 1:
if (!isExcluded && org.eclipse.jdt.internal.compiler.util.Util.isClassFileName (resource.getName ())) {
var typePath = resource.getFullPath ().removeFirstSegments (segmentCount).removeFileExtension ();
if (this.newState.isKnownType (typePath.toString ())) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("MUST DO FULL BUILD. Found change to class file " + typePath);
return false;
}return true;
}}
return true;
}, "org.eclipse.core.resources.IResourceDelta,net.sf.j2s.core.builder.ClasspathMultiDirectory,~N");
Clazz.defineMethod (c$, "cleanUp", 
function () {
Clazz.superCall (this, net.sf.j2s.core.builder.IncrementalImageBuilder, "cleanUp", []);
this.sourceFiles = null;
this.previousSourceFiles = null;
this.qualifiedStrings = null;
this.simpleStrings = null;
this.rootStrings = null;
this.secondaryTypesToRemove = null;
this.hasStructuralChanges = false;
this.compileLoop = 0;
});
Clazz.defineMethod (c$, "compile", 
function (units, additionalUnits, compilingFirstGroup) {
if (compilingFirstGroup && additionalUnits != null) {
var extras = null;
for (var i = 0, l = additionalUnits.length; i < l; i++) {
var unit = additionalUnits[i];
if (unit != null && this.newState.getDefinedTypeNamesFor (unit.typeLocator ()) != null) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("About to compile file with secondary types " + unit.typeLocator ());
if (extras == null) extras =  new java.util.ArrayList (3);
extras.add (unit);
}}
if (extras != null) {
var oldLength = units.length;
var toAdd = extras.size ();
System.arraycopy (units, 0, units =  new Array (oldLength + toAdd), 0, oldLength);
for (var i = 0; i < toAdd; i++) units[oldLength++] = extras.get (i);

}}Clazz.superCall (this, net.sf.j2s.core.builder.IncrementalImageBuilder, "compile", [units, additionalUnits, compilingFirstGroup]);
}, "~A,~A,~B");
Clazz.overrideMethod (c$, "deleteGeneratedFiles", 
function (deletedGeneratedFiles) {
try {
for (var j = deletedGeneratedFiles.length; --j >= 0; ) {
var deletedFile = deletedGeneratedFiles[j];
if (deletedFile.exists ()) continue ;var sourceFile = this.findSourceFile (deletedFile, false);
var typeLocator = sourceFile.typeLocator ();
var mdSegmentCount = sourceFile.sourceLocation.sourceFolder.getFullPath ().segmentCount ();
var typePath = sourceFile.resource.getFullPath ().removeFirstSegments (mdSegmentCount).removeFileExtension ();
this.addDependentsOf (typePath, true);
this.previousSourceFiles = null;
var definedTypeNames = this.newState.getDefinedTypeNamesFor (typeLocator);
if (definedTypeNames == null) {
this.removeClassFile (typePath, sourceFile.sourceLocation.binaryFolder);
} else {
if (definedTypeNames.length > 0) {
var packagePath = typePath.removeLastSegments (1);
for (var d = 0, l = definedTypeNames.length; d < l; d++) this.removeClassFile (packagePath.append ( String.instantialize (definedTypeNames[d])), sourceFile.sourceLocation.binaryFolder);

}}this.newState.removeLocator (typeLocator);
}
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
org.eclipse.jdt.internal.core.util.Util.log (e, "JavaBuilder logging CompilationParticipant's CoreException to help debugging");
} else {
throw e;
}
}
}, "~A");
Clazz.defineMethod (c$, "findAffectedSourceFiles", 
function (delta, classFoldersAndJars, prereqProject) {
for (var i = 0, l = classFoldersAndJars.length; i < l; i++) {
var bLocation = classFoldersAndJars[i];
if (bLocation != null) {
var p = bLocation.getProjectRelativePath ();
if (p != null) {
var binaryDelta = delta.findMember (p);
if (binaryDelta != null) {
if (Clazz.instanceOf (bLocation, net.sf.j2s.core.builder.ClasspathJar)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("ABORTING incremental build... found delta to jar/zip file");
return false;
}if (binaryDelta.getKind () == 1 || binaryDelta.getKind () == 2) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("ABORTING incremental build... found added/removed binary folder");
return false;
}var segmentCount = binaryDelta.getFullPath ().segmentCount ();
var children = binaryDelta.getAffectedChildren ();
var structurallyChangedTypes = null;
if (bLocation.isOutputFolder ()) structurallyChangedTypes = this.newState.getStructurallyChangedTypes (this.javaBuilder.getLastState (prereqProject));
for (var j = 0, m = children.length; j < m; j++) this.findAffectedSourceFiles (children[j], segmentCount, structurallyChangedTypes);

this.notifier.checkCancel ();
}}}}
return true;
}, "org.eclipse.core.resources.IResourceDelta,~A,org.eclipse.core.resources.IProject");
Clazz.defineMethod (c$, "findAffectedSourceFiles", 
function (binaryDelta, segmentCount, structurallyChangedTypes) {
var resource = binaryDelta.getResource ();
switch (resource.getType ()) {
case 2:
switch (binaryDelta.getKind ()) {
case 1:
case 2:
var packagePath = resource.getFullPath ().removeFirstSegments (segmentCount);
var packageName = packagePath.toString ();
if (binaryDelta.getKind () == 1) {
if (!this.newState.isKnownPackage (packageName)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found added package " + packageName);
this.addDependentsOf (packagePath, false);
return ;
}if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Skipped dependents of added package " + packageName);
} else {
if (!this.nameEnvironment.isPackage (packageName)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found removed package " + packageName);
this.addDependentsOf (packagePath, false);
return ;
}if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Skipped dependents of removed package " + packageName);
}case 4:
var children = binaryDelta.getAffectedChildren ();
for (var i = 0, l = children.length; i < l; i++) this.findAffectedSourceFiles (children[i], segmentCount, structurallyChangedTypes);

}
return ;
case 1:
if (org.eclipse.jdt.internal.compiler.util.Util.isClassFileName (resource.getName ())) {
var typePath = resource.getFullPath ().removeFirstSegments (segmentCount).removeFileExtension ();
switch (binaryDelta.getKind ()) {
case 1:
case 2:
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found added/removed class file " + typePath);
this.addDependentsOf (typePath, false);
return ;
case 4:
if ((binaryDelta.getFlags () & 256) == 0) return ;
if (structurallyChangedTypes != null && !structurallyChangedTypes.includes (typePath.toString ())) return ;
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found changed class file " + typePath);
this.addDependentsOf (typePath, false);
}
return ;
}}
}, "org.eclipse.core.resources.IResourceDelta,~N,net.sf.j2s.core.builder.StringSet");
Clazz.defineMethod (c$, "findSourceFiles", 
function (delta) {
var visited = this.makeOutputFolderConsistent ?  new java.util.ArrayList (this.sourceLocations.length) : null;
for (var i = 0, l = this.sourceLocations.length; i < l; i++) {
var md = this.sourceLocations[i];
if (this.makeOutputFolderConsistent && md.hasIndependentOutputFolder && !visited.contains (md.binaryFolder)) {
visited.add (md.binaryFolder);
var binaryDelta = delta.findMember (md.binaryFolder.getProjectRelativePath ());
if (binaryDelta != null) {
var segmentCount = binaryDelta.getFullPath ().segmentCount ();
var children = binaryDelta.getAffectedChildren ();
for (var j = 0, m = children.length; j < m; j++) if (!this.checkForClassFileChanges (children[j], md, segmentCount)) return false;

}}if (md.sourceFolder.equals (this.javaBuilder.currentProject)) {
var segmentCount = delta.getFullPath ().segmentCount ();
var children = delta.getAffectedChildren ();
for (var j = 0, m = children.length; j < m; j++) if (!this.isExcludedFromProject (children[j].getFullPath ())) if (!this.findSourceFiles (children[j], md, segmentCount)) return false;

} else {
var sourceDelta = delta.findMember (md.sourceFolder.getProjectRelativePath ());
if (sourceDelta != null) {
if (sourceDelta.getKind () == 2) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("ABORTING incremental build... found removed source folder");
return false;
}var segmentCount = sourceDelta.getFullPath ().segmentCount ();
var children = sourceDelta.getAffectedChildren ();
try {
for (var j = 0, m = children.length; j < m; j++) if (!this.findSourceFiles (children[j], md, segmentCount)) return false;

} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
if (e.getStatus ().getCode () == 275) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("ABORTING incremental build... found renamed package");
return false;
}throw e;
} else {
throw e;
}
}
}}this.notifier.checkCancel ();
}
return true;
}, "org.eclipse.core.resources.IResourceDelta");
Clazz.defineMethod (c$, "findSourceFiles", 
function (sourceDelta, md, segmentCount) {
var resource = sourceDelta.getResource ();
var isExcluded = (md.exclusionPatterns != null || md.inclusionPatterns != null) && org.eclipse.jdt.internal.core.util.Util.isExcluded (resource, md.inclusionPatterns, md.exclusionPatterns);
switch (resource.getType ()) {
case 2:
if (isExcluded && md.inclusionPatterns == null) return true;
switch (sourceDelta.getKind ()) {
case 1:
if (!isExcluded) {
var addedPackagePath = resource.getFullPath ().removeFirstSegments (segmentCount);
this.createFolder (addedPackagePath, md.binaryFolder);
if (this.sourceLocations.length > 1 && this.newState.isKnownPackage (addedPackagePath.toString ())) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Skipped dependents of added package " + addedPackagePath);
} else {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found added package " + addedPackagePath);
this.addDependentsOf (addedPackagePath, true);
}}case 4:
var children = sourceDelta.getAffectedChildren ();
for (var i = 0, l = children.length; i < l; i++) if (!this.findSourceFiles (children[i], md, segmentCount)) return false;

return true;
case 2:
if (isExcluded) {
children = sourceDelta.getAffectedChildren ();
for (var i = 0, l = children.length; i < l; i++) if (!this.findSourceFiles (children[i], md, segmentCount)) return false;

return true;
}var removedPackagePath = resource.getFullPath ().removeFirstSegments (segmentCount);
if (this.sourceLocations.length > 1) {
for (var i = 0, l = this.sourceLocations.length; i < l; i++) {
if (this.sourceLocations[i].sourceFolder.getFolder (removedPackagePath).exists ()) {
this.createFolder (removedPackagePath, md.binaryFolder);
var removedChildren = sourceDelta.getAffectedChildren ();
for (var j = 0, m = removedChildren.length; j < m; j++) if (!this.findSourceFiles (removedChildren[j], md, segmentCount)) return false;

return true;
}}
}if ((sourceDelta.getFlags () & 8192) != 0) {
var movedFolder = this.javaBuilder.workspaceRoot.getFolder (sourceDelta.getMovedToPath ());
net.sf.j2s.core.builder.JavaBuilder.removeProblemsAndTasksFor (movedFolder);
}var removedPackageFolder = md.binaryFolder.getFolder (removedPackagePath);
if (removedPackageFolder.exists ()) removedPackageFolder.$delete (1, null);
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found removed package " + removedPackagePath);
this.addDependentsOf (removedPackagePath, true);
this.newState.removePackage (sourceDelta);
}
return true;
case 1:
if (isExcluded) return true;
var resourceName = resource.getName ();
if (org.eclipse.jdt.internal.core.util.Util.isJavaLikeFileName (resourceName)) {
var typePath = resource.getFullPath ().removeFirstSegments (segmentCount).removeFileExtension ();
var typeLocator = resource.getProjectRelativePath ().toString ();
switch (sourceDelta.getKind ()) {
case 1:
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Compile this added source file " + typeLocator);
this.sourceFiles.add ( new net.sf.j2s.core.builder.SourceFile (resource, md, true));
var typeName = typePath.toString ();
if (!this.newState.isDuplicateLocator (typeName, typeLocator)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found added source file " + typeName);
this.addDependentsOf (typePath, true);
}return true;
case 2:
var definedTypeNames = this.newState.getDefinedTypeNamesFor (typeLocator);
if (definedTypeNames == null) {
this.removeClassFile (typePath, md.binaryFolder);
if ((sourceDelta.getFlags () & 8192) != 0) {
var movedFile = this.javaBuilder.workspaceRoot.getFile (sourceDelta.getMovedToPath ());
net.sf.j2s.core.builder.JavaBuilder.removeProblemsAndTasksFor (movedFile);
}} else {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found removed source file " + typePath.toString ());
this.addDependentsOf (typePath, true);
if (definedTypeNames.length > 0) {
var packagePath = typePath.removeLastSegments (1);
for (var i = 0, l = definedTypeNames.length; i < l; i++) this.removeClassFile (packagePath.append ( String.instantialize (definedTypeNames[i])), md.binaryFolder);

}}this.newState.removeLocator (typeLocator);
return true;
case 4:
if ((sourceDelta.getFlags () & 256) == 0 && (sourceDelta.getFlags () & 1048576) == 0) return true;
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Compile this changed source file " + typeLocator);
this.sourceFiles.add ( new net.sf.j2s.core.builder.SourceFile (resource, md, true));
}
return true;
} else if (org.eclipse.jdt.internal.compiler.util.Util.isClassFileName (resourceName)) {
if (this.makeOutputFolderConsistent) {
var typePath = resource.getFullPath ().removeFirstSegments (segmentCount).removeFileExtension ();
if (this.newState.isKnownType (typePath.toString ())) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("MUST DO FULL BUILD. Found change to class file " + typePath);
return false;
}}return true;
} else if (md.hasIndependentOutputFolder) {
if (this.javaBuilder.filterExtraResource (resource)) return true;
var resourcePath = resource.getFullPath ().removeFirstSegments (segmentCount);
var outputFile = md.binaryFolder.getFile (resourcePath);
switch (sourceDelta.getKind ()) {
case 1:
if (outputFile.exists ()) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Deleting existing file " + resourcePath);
outputFile.$delete (1, null);
}if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Copying added file " + resourcePath);
this.createFolder (resourcePath.removeLastSegments (1), md.binaryFolder);
this.copyResource (resource, outputFile);
return true;
case 2:
if (outputFile.exists ()) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Deleting removed file " + resourcePath);
outputFile.$delete (1, null);
}return true;
case 4:
if ((sourceDelta.getFlags () & 256) == 0 && (sourceDelta.getFlags () & 1048576) == 0) return true;
if (outputFile.exists ()) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Deleting existing file " + resourcePath);
outputFile.$delete (1, null);
}if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Copying changed file " + resourcePath);
this.createFolder (resourcePath.removeLastSegments (1), md.binaryFolder);
this.copyResource (resource, outputFile);
}
return true;
}}
return true;
}, "org.eclipse.core.resources.IResourceDelta,net.sf.j2s.core.builder.ClasspathMultiDirectory,~N");
Clazz.defineMethod (c$, "finishedWith", 
function (sourceLocator, result, mainTypeName, definedTypeNames, duplicateTypeNames) {
var previousTypeNames = this.newState.getDefinedTypeNamesFor (sourceLocator);
if (previousTypeNames == null) previousTypeNames = [mainTypeName];
var packagePath = null;
next : for (var i = 0, l = previousTypeNames.length; i < l; i++) {
var previous = previousTypeNames[i];
for (var j = 0, m = definedTypeNames.size (); j < m; j++) if (org.eclipse.jdt.core.compiler.CharOperation.equals (previous, definedTypeNames.get (j))) continue next;
var sourceFile = result.getCompilationUnit ();
if (packagePath == null) {
var count = sourceFile.sourceLocation.sourceFolder.getFullPath ().segmentCount ();
packagePath = sourceFile.resource.getFullPath ().removeFirstSegments (count).removeLastSegments (1);
}if (this.secondaryTypesToRemove == null) this.secondaryTypesToRemove =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable ();
var types = this.secondaryTypesToRemove.get (sourceFile.sourceLocation.binaryFolder);
if (types == null) types =  new java.util.ArrayList (definedTypeNames.size ());
types.add (packagePath.append ( String.instantialize (previous)));
this.secondaryTypesToRemove.put (sourceFile.sourceLocation.binaryFolder, types);
}
Clazz.superCall (this, net.sf.j2s.core.builder.IncrementalImageBuilder, "finishedWith", [sourceLocator, result, mainTypeName, definedTypeNames, duplicateTypeNames]);
}, "~S,org.eclipse.jdt.internal.compiler.CompilationResult,~A,java.util.ArrayList,java.util.ArrayList");
Clazz.overrideMethod (c$, "processAnnotationResults", 
function (results) {
for (var i = results.length; --i >= 0; ) {
var result = results[i];
if (result == null) continue ;var deletedGeneratedFiles = result.deletedFiles;
if (deletedGeneratedFiles != null) this.deleteGeneratedFiles (deletedGeneratedFiles);
var addedGeneratedFiles = result.addedFiles;
if (addedGeneratedFiles != null) {
for (var j = addedGeneratedFiles.length; --j >= 0; ) {
var sourceFile = this.findSourceFile (addedGeneratedFiles[j], true);
if (sourceFile != null && !this.sourceFiles.contains (sourceFile)) this.sourceFiles.add (sourceFile);
}
}this.recordParticipantResult (result);
}
}, "~A");
Clazz.defineMethod (c$, "removeClassFile", 
function (typePath, outputFolder) {
if (typePath.lastSegment ().indexOf ('$') == -1) {
this.newState.removeQualifiedTypeName (typePath.toString ());
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found removed type " + typePath);
this.addDependentsOf (typePath, true);
}var classFile = outputFolder.getFile (typePath.addFileExtension ("class"));
if (classFile.exists ()) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Deleting class file of removed type " + typePath);
classFile.$delete (1, null);
}}, "org.eclipse.core.runtime.IPath,org.eclipse.core.resources.IContainer");
Clazz.defineMethod (c$, "removeSecondaryTypes", 
function () {
if (this.secondaryTypesToRemove != null) {
var keyTable = this.secondaryTypesToRemove.keyTable;
var valueTable = this.secondaryTypesToRemove.valueTable;
for (var i = 0, l = keyTable.length; i < l; i++) {
var outputFolder = keyTable[i];
if (outputFolder != null) {
var paths = valueTable[i];
for (var j = 0, m = paths.size (); j < m; j++) this.removeClassFile (paths.get (j), outputFolder);

}}
this.secondaryTypesToRemove = null;
if (this.previousSourceFiles != null) this.previousSourceFiles = null;
}});
Clazz.defineMethod (c$, "resetCollections", 
function () {
if (this.sourceFiles == null) {
this.sourceFiles =  new java.util.ArrayList (33);
this.previousSourceFiles = null;
this.qualifiedStrings =  new net.sf.j2s.core.builder.StringSet (3);
this.simpleStrings =  new net.sf.j2s.core.builder.StringSet (3);
this.rootStrings =  new net.sf.j2s.core.builder.StringSet (3);
this.hasStructuralChanges = false;
this.compileLoop = 0;
} else {
this.previousSourceFiles = this.sourceFiles.isEmpty () ? null : this.sourceFiles.clone ();
this.sourceFiles.clear ();
this.qualifiedStrings.clear ();
this.simpleStrings.clear ();
this.rootStrings.clear ();
this.workQueue.clear ();
}});
Clazz.overrideMethod (c$, "updateProblemsFor", 
function (sourceFile, result) {
var markers = net.sf.j2s.core.builder.JavaBuilder.getProblemsFor (sourceFile.resource);
var problems = result.getProblems ();
if (problems == null && markers.length == 0) return ;
this.notifier.updateProblemCounts (markers, problems);
net.sf.j2s.core.builder.JavaBuilder.removeProblemsFor (sourceFile.resource);
this.storeProblemsFor (sourceFile, problems);
}, "net.sf.j2s.core.builder.SourceFile,org.eclipse.jdt.internal.compiler.CompilationResult");
Clazz.overrideMethod (c$, "updateTasksFor", 
function (sourceFile, result) {
var markers = net.sf.j2s.core.builder.JavaBuilder.getTasksFor (sourceFile.resource);
var tasks = result.getTasks ();
if (tasks == null && markers.length == 0) return ;
net.sf.j2s.core.builder.JavaBuilder.removeTasksFor (sourceFile.resource);
this.storeTasksFor (sourceFile, tasks);
}, "net.sf.j2s.core.builder.SourceFile,org.eclipse.jdt.internal.compiler.CompilationResult");
Clazz.overrideMethod (c$, "writeClassFileContents", 
function (classfile, file, qualifiedFileName, isTopLevelType, compilationUnit) {
var bytes = classfile.getBytes ();
if (file.exists ()) {
if (this.writeClassFileCheck (file, qualifiedFileName, bytes) || compilationUnit.updateClassFile) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Writing changed class file " + file.getName ());
if (!file.isDerived ()) file.setDerived (true);
file.setContents ( new java.io.ByteArrayInputStream (bytes), true, false, null);
} else if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) {
System.out.println ("Skipped over unchanged class file " + file.getName ());
}} else {
if (isTopLevelType) this.addDependentsOf ( new org.eclipse.core.runtime.Path (qualifiedFileName), true);
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Writing new class file " + file.getName ());
try {
file.create ( new java.io.ByteArrayInputStream (bytes), 1025, null);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
if (e.getStatus ().getCode () == 275) {
var status = e.getStatus ();
if (Clazz.instanceOf (status, org.eclipse.core.resources.IResourceStatus)) {
var oldFilePath = (status).getPath ();
var oldTypeName = oldFilePath.removeFileExtension ().lastSegment ().toCharArray ();
var previousTypeNames = this.newState.getDefinedTypeNamesFor (compilationUnit.typeLocator ());
var fromSameFile = false;
if (previousTypeNames == null) {
fromSameFile = org.eclipse.jdt.core.compiler.CharOperation.equals (compilationUnit.getMainTypeName (), oldTypeName);
} else {
for (var i = 0, l = previousTypeNames.length; i < l; i++) {
if (org.eclipse.jdt.core.compiler.CharOperation.equals (previousTypeNames[i], oldTypeName)) {
fromSameFile = true;
break;
}}
}if (fromSameFile) {
var collision = file.getParent ().getFile ( new org.eclipse.core.runtime.Path (oldFilePath.lastSegment ()));
collision.$delete (true, false, null);
var success = false;
try {
file.create ( new java.io.ByteArrayInputStream (bytes), 1025, null);
success = true;
} catch (ignored) {
if (Clazz.instanceOf (ignored, org.eclipse.core.runtime.CoreException)) {
} else {
throw ignored;
}
}
if (success) return ;
}}throw  new org.eclipse.jdt.internal.compiler.problem.AbortCompilation (true,  new net.sf.j2s.core.builder.AbortIncrementalBuildException (qualifiedFileName));
}throw e;
} else {
throw e;
}
}
}}, "org.eclipse.jdt.internal.compiler.ClassFile,org.eclipse.core.resources.IFile,~S,~B,net.sf.j2s.core.builder.SourceFile");
Clazz.defineMethod (c$, "writeClassFileCheck", 
function (file, fileName, newBytes) {
try {
var oldBytes = org.eclipse.jdt.internal.core.util.Util.getResourceContentsAsByteArray (file);
notEqual : if (newBytes.length == oldBytes.length) {
for (var i = newBytes.length; --i >= 0; ) if (newBytes[i] != oldBytes[i]) break notEqual;

return false;
}var location = file.getLocationURI ();
if (location == null) return false;
var filePath = location.getSchemeSpecificPart ();
var reader =  new org.eclipse.jdt.internal.compiler.classfmt.ClassFileReader (oldBytes, filePath.toCharArray ());
if (!(reader.isLocal () || reader.isAnonymous ()) && reader.hasStructuralChanges (newBytes)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Type has structural changes " + fileName);
this.addDependentsOf ( new org.eclipse.core.runtime.Path (fileName), true);
this.newState.wasStructurallyChanged (fileName);
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jdt.internal.compiler.classfmt.ClassFormatException)) {
this.addDependentsOf ( new org.eclipse.core.runtime.Path (fileName), true);
this.newState.wasStructurallyChanged (fileName);
} else {
throw e;
}
}
return true;
}, "org.eclipse.core.resources.IFile,~S,~A");
Clazz.overrideMethod (c$, "toString", 
function () {
return "incremental image builder for:\n\tnew state: " + this.newState;
});
Clazz.defineStatics (c$,
"MaxCompileLoop", 5);
});
