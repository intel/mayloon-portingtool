Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["net.sf.j2s.core.builder.AbstractImageBuilder"], "net.sf.j2s.core.builder.BatchImageBuilder", ["java.util.ArrayList", "net.sf.j2s.core.builder.IncrementalImageBuilder", "$.JavaBuilder", "$.StringSet", "org.eclipse.core.resources.IResourceProxyVisitor", "$.IResourceVisitor", "org.eclipse.core.runtime.Path", "org.eclipse.jdt.internal.compiler.util.Util", "org.eclipse.jdt.internal.core.util.Messages", "$.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.incrementalBuilder = null;
this.secondaryTypes = null;
this.typeLocatorsWithUndefinedTypes = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "BatchImageBuilder", net.sf.j2s.core.builder.AbstractImageBuilder);
Clazz.makeConstructor (c$, 
function (javaBuilder, buildStarting) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.BatchImageBuilder, [javaBuilder, buildStarting, null]);
this.nameEnvironment.isIncrementalBuild = false;
this.incrementalBuilder = null;
this.secondaryTypes = null;
this.typeLocatorsWithUndefinedTypes = null;
}, "net.sf.j2s.core.builder.JavaBuilder,~B");
Clazz.defineMethod (c$, "build", 
function () {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("FULL build");
try {
this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_cleaningOutput, this.javaBuilder.currentProject.getName ()));
net.sf.j2s.core.builder.JavaBuilder.removeProblemsAndTasksFor (this.javaBuilder.currentProject);
this.cleanOutputFolders (true);
this.notifier.updateProgressDelta (0.05);
this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.build_analyzingSources);
var sourceFiles =  new java.util.ArrayList (33);
this.addAllSourceFiles (sourceFiles);
this.notifier.updateProgressDelta (0.10);
if (sourceFiles.size () > 0) {
var allSourceFiles =  new Array (sourceFiles.size ());
sourceFiles.toArray (allSourceFiles);
this.notifier.setProgressPerCompilationUnit (0.75 / allSourceFiles.length);
this.workQueue.addAll (allSourceFiles);
this.compile (allSourceFiles);
if (this.typeLocatorsWithUndefinedTypes != null) if (this.secondaryTypes != null && !this.secondaryTypes.isEmpty ()) this.rebuildTypesAffectedBySecondaryTypes ();
if (this.incrementalBuilder != null) this.incrementalBuilder.buildAfterBatchBuild ();
}if (this.javaBuilder.javaProject.hasCycleMarker ()) this.javaBuilder.mustPropagateStructuralChanges ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
throw this.internalException (e);
} else {
throw e;
}
} finally {
if (net.sf.j2s.core.builder.JavaBuilder.SHOW_STATS) this.printStats ();
this.cleanUp ();
}
});
Clazz.overrideMethod (c$, "acceptSecondaryType", 
function (classFile) {
if (this.secondaryTypes != null) this.secondaryTypes.add (classFile.fileName ());
}, "org.eclipse.jdt.internal.compiler.ClassFile");
Clazz.defineMethod (c$, "cleanOutputFolders", 
function (copyBack) {
var deleteAll = "clean".equals (this.javaBuilder.javaProject.getOption ("org.eclipse.jdt.core.builder.cleanOutputFolder", true));
if (deleteAll) {
if (this.javaBuilder.participants != null) for (var i = 0, l = this.javaBuilder.participants.length; i < l; i++) this.javaBuilder.participants[i].cleanStarting (this.javaBuilder.javaProject);

var visited =  new java.util.ArrayList (this.sourceLocations.length);
for (var i = 0, l = this.sourceLocations.length; i < l; i++) {
this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_cleaningOutput, this.javaBuilder.currentProject.getName ()));
var sourceLocation = this.sourceLocations[i];
if (sourceLocation.hasIndependentOutputFolder) {
var outputFolder = sourceLocation.binaryFolder;
if (!visited.contains (outputFolder)) {
visited.add (outputFolder);
var members = outputFolder.members ();
for (var j = 0, m = members.length; j < m; j++) {
var member = members[j];
if (!member.isDerived ()) {
member.accept (((Clazz.isClassDefined ("net.sf.j2s.core.builder.BatchImageBuilder$1") ? 0 : net.sf.j2s.core.builder.BatchImageBuilder.$BatchImageBuilder$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.core.builder.BatchImageBuilder$1, this, null)));
}member.$delete (1, null);
}
}this.notifier.checkCancel ();
if (copyBack) this.copyExtraResourcesBack (sourceLocation, true);
} else {
var isOutputFolder = sourceLocation.sourceFolder.equals (sourceLocation.binaryFolder);
var exclusionPatterns = isOutputFolder ? sourceLocation.exclusionPatterns : null;
var inclusionPatterns = isOutputFolder ? sourceLocation.inclusionPatterns : null;
sourceLocation.binaryFolder.accept (((Clazz.isClassDefined ("net.sf.j2s.core.builder.BatchImageBuilder$2") ? 0 : net.sf.j2s.core.builder.BatchImageBuilder.$BatchImageBuilder$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.core.builder.BatchImageBuilder$2, this, Clazz.cloneFinals ("exclusionPatterns", exclusionPatterns, "inclusionPatterns", inclusionPatterns))), 0);
this.notifier.checkCancel ();
}this.notifier.checkCancel ();
}
} else if (copyBack) {
for (var i = 0, l = this.sourceLocations.length; i < l; i++) {
var sourceLocation = this.sourceLocations[i];
if (sourceLocation.hasIndependentOutputFolder) this.copyExtraResourcesBack (sourceLocation, false);
this.notifier.checkCancel ();
}
}}, "~B");
Clazz.defineMethod (c$, "cleanUp", 
function () {
this.incrementalBuilder = null;
this.secondaryTypes = null;
this.typeLocatorsWithUndefinedTypes = null;
Clazz.superCall (this, net.sf.j2s.core.builder.BatchImageBuilder, "cleanUp", []);
});
Clazz.defineMethod (c$, "compile", 
function (units, additionalUnits, compilingFirstGroup) {
if (additionalUnits != null && this.secondaryTypes == null) this.secondaryTypes =  new java.util.ArrayList (7);
Clazz.superCall (this, net.sf.j2s.core.builder.BatchImageBuilder, "compile", [units, additionalUnits, compilingFirstGroup]);
}, "~A,~A,~B");
Clazz.defineMethod (c$, "copyExtraResourcesBack", 
function (sourceLocation, deletedAll) {
this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.build_copyingResources);
var segmentCount = sourceLocation.sourceFolder.getFullPath ().segmentCount ();
var exclusionPatterns = sourceLocation.exclusionPatterns;
var inclusionPatterns = sourceLocation.inclusionPatterns;
var outputFolder = sourceLocation.binaryFolder;
var isAlsoProject = sourceLocation.sourceFolder.equals (this.javaBuilder.currentProject);
sourceLocation.sourceFolder.accept (((Clazz.isClassDefined ("net.sf.j2s.core.builder.BatchImageBuilder$3") ? 0 : net.sf.j2s.core.builder.BatchImageBuilder.$BatchImageBuilder$3$ ()), Clazz.innerTypeInstance (net.sf.j2s.core.builder.BatchImageBuilder$3, this, Clazz.cloneFinals ("exclusionPatterns", exclusionPatterns, "inclusionPatterns", inclusionPatterns, "segmentCount", segmentCount, "outputFolder", outputFolder, "deletedAll", deletedAll, "isAlsoProject", isAlsoProject))), 0);
}, "net.sf.j2s.core.builder.ClasspathMultiDirectory,~B");
Clazz.defineMethod (c$, "findOriginalResource", 
function (partialPath) {
for (var i = 0, l = this.sourceLocations.length; i < l; i++) {
var sourceLocation = this.sourceLocations[i];
if (sourceLocation.hasIndependentOutputFolder) {
var originalResource = sourceLocation.sourceFolder.getFile (partialPath);
if (originalResource.exists ()) return originalResource;
}}
return null;
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "printStats", 
($fz = function () {
if (this.compiler == null) return ;
var compilerStats = this.compiler.stats;
var time = compilerStats.elapsedTime ();
var lineCount = compilerStats.lineCount;
var speed = (Math.round ((lineCount * 10000.0 / time))) / 10.0;
System.out.println (">FULL BUILD STATS for: " + this.javaBuilder.javaProject.getElementName ());
System.out.println (">   compiled " + lineCount + " lines in " + time + "ms:" + speed + "lines/s");
System.out.print (">   parse: " + compilerStats.parseTime + " ms (" + (Math.round ((compilerStats.parseTime * 1000.0 / time))) / 10.0 + "%)");
System.out.print (", resolve: " + compilerStats.resolveTime + " ms (" + (Math.round ((compilerStats.resolveTime * 1000.0 / time))) / 10.0 + "%)");
System.out.print (", analyze: " + compilerStats.analyzeTime + " ms (" + (Math.round ((compilerStats.analyzeTime * 1000.0 / time))) / 10.0 + "%)");
System.out.println (", generate: " + compilerStats.generateTime + " ms (" + (Math.round ((compilerStats.generateTime * 1000.0 / time))) / 10.0 + "%)");
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "processAnnotationResults", 
function (results) {
if (this.incrementalBuilder == null) this.incrementalBuilder =  new net.sf.j2s.core.builder.IncrementalImageBuilder (this);
this.incrementalBuilder.processAnnotationResults (results);
}, "~A");
Clazz.defineMethod (c$, "rebuildTypesAffectedBySecondaryTypes", 
function () {
if (this.incrementalBuilder == null) this.incrementalBuilder =  new net.sf.j2s.core.builder.IncrementalImageBuilder (this);
var count = this.secondaryTypes.size ();
var qualifiedNames =  new net.sf.j2s.core.builder.StringSet (count * 2);
var simpleNames =  new net.sf.j2s.core.builder.StringSet (count);
var rootNames =  new net.sf.j2s.core.builder.StringSet (3);
while (--count >= 0) {
var secondaryTypeName = this.secondaryTypes.get (count);
var path =  new org.eclipse.core.runtime.Path (null,  String.instantialize (secondaryTypeName));
this.incrementalBuilder.addDependentsOf (path, false, qualifiedNames, simpleNames, rootNames);
}
this.incrementalBuilder.addAffectedSourceFiles (qualifiedNames, simpleNames, rootNames, this.typeLocatorsWithUndefinedTypes);
});
Clazz.defineMethod (c$, "storeProblemsFor", 
function (sourceFile, problems) {
if (sourceFile == null || problems == null || problems.length == 0) return ;
for (var i = problems.length; --i >= 0; ) {
var problem = problems[i];
if (problem != null && problem.getID () == 16777218) {
if (this.typeLocatorsWithUndefinedTypes == null) this.typeLocatorsWithUndefinedTypes =  new net.sf.j2s.core.builder.StringSet (3);
this.typeLocatorsWithUndefinedTypes.add (sourceFile.typeLocator ());
break;
}}
Clazz.superCall (this, net.sf.j2s.core.builder.BatchImageBuilder, "storeProblemsFor", [sourceFile, problems]);
}, "net.sf.j2s.core.builder.SourceFile,~A");
Clazz.overrideMethod (c$, "toString", 
function () {
return "batch image builder for:\n\tnew state: " + this.newState;
});
c$.$BatchImageBuilder$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.core.builder, "BatchImageBuilder$1", null, org.eclipse.core.resources.IResourceVisitor);
Clazz.overrideMethod (c$, "visit", 
function (resource) {
resource.setDerived (true);
return resource.getType () != 1;
}, "org.eclipse.core.resources.IResource");
c$ = Clazz.p0p ();
};
c$.$BatchImageBuilder$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.core.builder, "BatchImageBuilder$2", null, org.eclipse.core.resources.IResourceProxyVisitor);
Clazz.overrideMethod (c$, "visit", 
function (proxy) {
if (proxy.getType () == 1) {
if (org.eclipse.jdt.internal.compiler.util.Util.isClassFileName (proxy.getName ())) {
var resource = proxy.requestResource ();
if (this.f$.exclusionPatterns != null || this.f$.inclusionPatterns != null) if (org.eclipse.jdt.internal.core.util.Util.isExcluded (resource.getFullPath (), this.f$.inclusionPatterns, this.f$.exclusionPatterns, false)) return false;
if (!resource.isDerived ()) resource.setDerived (true);
resource.$delete (1, null);
}return false;
}if (this.f$.exclusionPatterns != null && this.f$.inclusionPatterns == null) if (org.eclipse.jdt.internal.core.util.Util.isExcluded (proxy.requestFullPath (), null, this.f$.exclusionPatterns, true)) return false;
this.b$["net.sf.j2s.core.builder.BatchImageBuilder"].notifier.checkCancel ();
return true;
}, "org.eclipse.core.resources.IResourceProxy");
c$ = Clazz.p0p ();
};
c$.$BatchImageBuilder$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.core.builder, "BatchImageBuilder$3", null, org.eclipse.core.resources.IResourceProxyVisitor);
Clazz.overrideMethod (c$, "visit", 
function (proxy) {
var resource = null;
switch (proxy.getType ()) {
case 1:
if (org.eclipse.jdt.internal.core.util.Util.isJavaLikeFileName (proxy.getName ()) || org.eclipse.jdt.internal.compiler.util.Util.isClassFileName (proxy.getName ())) return false;
resource = proxy.requestResource ();
if (this.b$["net.sf.j2s.core.builder.BatchImageBuilder"].javaBuilder.filterExtraResource (resource)) return false;
if (this.f$.exclusionPatterns != null || this.f$.inclusionPatterns != null) if (org.eclipse.jdt.internal.core.util.Util.isExcluded (resource.getFullPath (), this.f$.inclusionPatterns, this.f$.exclusionPatterns, false)) return false;
var partialPath = resource.getFullPath ().removeFirstSegments (this.f$.segmentCount);
var copiedResource = this.f$.outputFolder.getFile (partialPath);
if (copiedResource.exists ()) {
if (this.f$.deletedAll) {
var originalResource = this.b$["net.sf.j2s.core.builder.BatchImageBuilder"].findOriginalResource (partialPath);
var id = originalResource.getFullPath ().removeFirstSegments (1).toString ();
this.b$["net.sf.j2s.core.builder.BatchImageBuilder"].createProblemFor (resource, null, org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_duplicateResource, id), this.b$["net.sf.j2s.core.builder.BatchImageBuilder"].javaBuilder.javaProject.getOption ("org.eclipse.jdt.core.builder.duplicateResourceTask", true));
return false;
}copiedResource.$delete (1, null);
}this.b$["net.sf.j2s.core.builder.BatchImageBuilder"].createFolder (partialPath.removeLastSegments (1), this.f$.outputFolder);
this.b$["net.sf.j2s.core.builder.BatchImageBuilder"].copyResource (resource, copiedResource);
return false;
case 2:
resource = proxy.requestResource ();
if (this.b$["net.sf.j2s.core.builder.BatchImageBuilder"].javaBuilder.filterExtraResource (resource)) return false;
if (this.f$.isAlsoProject && this.b$["net.sf.j2s.core.builder.BatchImageBuilder"].isExcludedFromProject (resource.getFullPath ())) return false;
if (this.f$.exclusionPatterns != null && this.f$.inclusionPatterns == null) if (org.eclipse.jdt.internal.core.util.Util.isExcluded (resource.getFullPath (), null, this.f$.exclusionPatterns, true)) return false;
}
return true;
}, "org.eclipse.core.resources.IResourceProxy");
c$ = Clazz.p0p ();
};
});
