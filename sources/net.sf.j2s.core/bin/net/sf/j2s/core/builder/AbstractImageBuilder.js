Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["net.sf.j2s.core.builder.ICompilationUnitLocator", "org.eclipse.jdt.internal.compiler.ICompilerRequestor"], "net.sf.j2s.core.builder.AbstractImageBuilder", ["java.io.ByteArrayInputStream", "$.PrintWriter", "java.lang.Boolean", "java.util.ArrayList", "$.Locale", "net.sf.j2s.core.builder.CompilationParticipantResult", "$.ImageBuilderInternalException", "$.JavaBuilder", "$.ProblemFactory", "$.SourceFile", "$.State", "$.WorkQueue", "org.eclipse.core.resources.IResourceProxyVisitor", "org.eclipse.core.runtime.Path", "org.eclipse.jdt.core.JavaConventions", "org.eclipse.jdt.core.compiler.CharOperation", "org.eclipse.jdt.internal.compiler.Compiler", "$.DefaultErrorHandlingPolicies", "org.eclipse.jdt.internal.compiler.impl.CompilerOptions", "org.eclipse.jdt.internal.compiler.lookup.TypeConstants", "org.eclipse.jdt.internal.compiler.problem.AbortCompilation", "org.eclipse.jdt.internal.compiler.util.SimpleSet", "org.eclipse.jdt.internal.core.JavaModelManager", "org.eclipse.jdt.internal.core.util.Messages", "$.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.javaBuilder = null;
this.newState = null;
this.nameEnvironment = null;
this.sourceLocations = null;
this.notifier = null;
this.compiler = null;
this.workQueue = null;
this.problemSourceFiles = null;
this.compiledAllAtOnce = false;
this.inCompiler = false;
this.keepStoringProblemMarkers = false;
this.filesWithAnnotations = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "AbstractImageBuilder", null, [org.eclipse.jdt.internal.compiler.ICompilerRequestor, net.sf.j2s.core.builder.ICompilationUnitLocator]);
Clazz.makeConstructor (c$, 
function (javaBuilder, buildStarting, newState) {
this.javaBuilder = javaBuilder;
this.nameEnvironment = javaBuilder.nameEnvironment;
this.sourceLocations = this.nameEnvironment.sourceLocations;
this.notifier = javaBuilder.notifier;
this.keepStoringProblemMarkers = true;
if (buildStarting) {
this.newState = newState == null ?  new net.sf.j2s.core.builder.State (javaBuilder) : newState;
this.compiler = this.newCompiler ();
this.workQueue =  new net.sf.j2s.core.builder.WorkQueue ();
this.problemSourceFiles =  new java.util.ArrayList (3);
if (this.javaBuilder.participants != null) {
for (var i = 0, l = this.javaBuilder.participants.length; i < l; i++) {
if (this.javaBuilder.participants[i].isAnnotationProcessor ()) {
this.filesWithAnnotations =  new org.eclipse.jdt.internal.compiler.util.SimpleSet (1);
break;
}}
}}}, "net.sf.j2s.core.builder.JavaBuilder,~B,net.sf.j2s.core.builder.State");
Clazz.overrideMethod (c$, "acceptResult", 
function (result) {
var compilationUnit = result.getCompilationUnit ();
if (!this.workQueue.isCompiled (compilationUnit)) {
this.workQueue.finished (compilationUnit);
try {
this.updateProblemsFor (compilationUnit, result);
this.updateTasksFor (compilationUnit, result);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
throw this.internalException (e);
} else {
throw e;
}
}
if (result.hasInconsistentToplevelHierarchies) if (!this.problemSourceFiles.contains (compilationUnit)) this.problemSourceFiles.add (compilationUnit);
var mainType = null;
var mainTypeName = null;
var typeLocator = compilationUnit.typeLocator ();
var classFiles = result.getClassFiles ();
var length = classFiles.length;
var duplicateTypeNames = null;
var definedTypeNames =  new java.util.ArrayList (length);
for (var i = 0; i < length; i++) {
var classFile = classFiles[i];
var compoundName = classFile.getCompoundName ();
var typeName = compoundName[compoundName.length - 1];
var isNestedType = classFile.isNestedType;
if (isNestedType) {
var qualifiedTypeName =  String.instantialize (classFile.outerMostEnclosingClassFile ().fileName ());
if (this.newState.isDuplicateLocator (qualifiedTypeName, typeLocator)) continue ;} else {
var qualifiedTypeName =  String.instantialize (classFile.fileName ());
if (this.newState.isDuplicateLocator (qualifiedTypeName, typeLocator)) {
if (duplicateTypeNames == null) duplicateTypeNames =  new java.util.ArrayList ();
duplicateTypeNames.add (compoundName);
if (mainType == null) {
try {
mainTypeName = compilationUnit.initialTypeName;
mainType = this.javaBuilder.javaProject.findType (mainTypeName.$replace ('/', '.'));
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jdt.core.JavaModelException)) {
} else {
throw e;
}
}
}var type;
if (qualifiedTypeName.equals (mainTypeName)) {
type = mainType;
} else {
var simpleName = qualifiedTypeName.substring (qualifiedTypeName.lastIndexOf ('/') + 1);
type = mainType == null ? null : mainType.getCompilationUnit ().getType (simpleName);
}this.createProblemFor (compilationUnit.resource, type, org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_duplicateClassFile,  String.instantialize (typeName)), "error");
continue ;}this.newState.recordLocatorForType (qualifiedTypeName, typeLocator);
if (result.checkSecondaryTypes && !qualifiedTypeName.equals (compilationUnit.initialTypeName)) this.acceptSecondaryType (classFile);
}try {
definedTypeNames.add (this.writeClassFile (classFile, compilationUnit, !isNestedType));
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
org.eclipse.jdt.internal.core.util.Util.log (e, "JavaBuilder handling CoreException");
if (e.getStatus ().getCode () == 275) this.createProblemFor (compilationUnit.resource, null, org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_classFileCollision, e.getMessage ()), "error");
 else this.createProblemFor (compilationUnit.resource, null, org.eclipse.jdt.internal.core.util.Messages.build_inconsistentClassFile, "error");
} else {
throw e;
}
}
}
if (result.hasAnnotations && this.filesWithAnnotations != null) this.filesWithAnnotations.add (compilationUnit);
this.compiler.lookupEnvironment.releaseClassFiles (classFiles);
this.finishedWith (typeLocator, result, compilationUnit.getMainTypeName (), definedTypeNames, duplicateTypeNames);
this.notifier.compiled (compilationUnit);
}}, "org.eclipse.jdt.internal.compiler.CompilationResult");
Clazz.defineMethod (c$, "acceptSecondaryType", 
function (classFile) {
}, "org.eclipse.jdt.internal.compiler.ClassFile");
Clazz.defineMethod (c$, "addAllSourceFiles", 
function (sourceFiles) {
for (var i = 0, l = this.sourceLocations.length; i < l; i++) {
var sourceLocation = this.sourceLocations[i];
var exclusionPatterns = sourceLocation.exclusionPatterns;
var inclusionPatterns = sourceLocation.inclusionPatterns;
var isAlsoProject = sourceLocation.sourceFolder.equals (this.javaBuilder.currentProject);
var segmentCount = sourceLocation.sourceFolder.getFullPath ().segmentCount ();
var outputFolder = sourceLocation.binaryFolder;
var isOutputFolder = sourceLocation.sourceFolder.equals (outputFolder);
sourceLocation.sourceFolder.accept (((Clazz.isClassDefined ("net.sf.j2s.core.builder.AbstractImageBuilder$1") ? 0 : net.sf.j2s.core.builder.AbstractImageBuilder.$AbstractImageBuilder$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.core.builder.AbstractImageBuilder$1, this, Clazz.cloneFinals ("exclusionPatterns", exclusionPatterns, "inclusionPatterns", inclusionPatterns, "sourceFiles", sourceFiles, "sourceLocation", sourceLocation, "isAlsoProject", isAlsoProject, "isOutputFolder", isOutputFolder, "segmentCount", segmentCount, "outputFolder", outputFolder))), 0);
this.notifier.checkCancel ();
}
}, "java.util.ArrayList");
Clazz.defineMethod (c$, "cleanUp", 
function () {
this.nameEnvironment.cleanup ();
this.javaBuilder = null;
this.nameEnvironment = null;
this.sourceLocations = null;
this.notifier = null;
this.compiler = null;
this.workQueue = null;
this.problemSourceFiles = null;
});
Clazz.defineMethod (c$, "compile", 
function (units) {
if (this.filesWithAnnotations != null && this.filesWithAnnotations.elementSize > 0) this.filesWithAnnotations.clear ();
var participantResults = this.javaBuilder.participants == null ? null : this.notifyParticipants (units);
if (participantResults != null && participantResults.length > units.length) {
units =  new Array (participantResults.length);
for (var i = participantResults.length; --i >= 0; ) units[i] = participantResults[i].sourceFile;

}var unitsLength = units.length;
this.compiledAllAtOnce = unitsLength <= net.sf.j2s.core.builder.AbstractImageBuilder.MAX_AT_ONCE;
if (this.compiledAllAtOnce) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) for (var i = 0; i < unitsLength; i++) System.out.println ("About to compile " + units[i].typeLocator ());

this.compile (units, null, true);
} else {
var remainingUnits =  new Array (unitsLength);
System.arraycopy (units, 0, remainingUnits, 0, unitsLength);
var doNow = unitsLength < net.sf.j2s.core.builder.AbstractImageBuilder.MAX_AT_ONCE ? unitsLength : net.sf.j2s.core.builder.AbstractImageBuilder.MAX_AT_ONCE;
var toCompile =  new Array (doNow);
var remainingIndex = 0;
var compilingFirstGroup = true;
while (remainingIndex < unitsLength) {
var count = 0;
while (remainingIndex < unitsLength && count < doNow) {
var unit = remainingUnits[remainingIndex];
if (unit != null && (compilingFirstGroup || this.workQueue.isWaiting (unit))) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("About to compile #" + remainingIndex + " : " + unit.typeLocator ());
toCompile[count++] = unit;
}remainingUnits[remainingIndex++] = null;
}
if (count < doNow) System.arraycopy (toCompile, 0, toCompile =  new Array (count), 0, count);
if (!compilingFirstGroup) for (var a = remainingIndex; a < unitsLength; a++) if (remainingUnits[a] != null && this.workQueue.isCompiled (remainingUnits[a])) remainingUnits[a] = null;

this.compile (toCompile, remainingUnits, compilingFirstGroup);
compilingFirstGroup = false;
}
}if (participantResults != null) {
for (var i = participantResults.length; --i >= 0; ) if (participantResults[i] != null) this.recordParticipantResult (participantResults[i]);

this.processAnnotations (participantResults);
}}, "~A");
Clazz.defineMethod (c$, "compile", 
function (units, additionalUnits, compilingFirstGroup) {
if (units.length == 0) return ;
this.notifier.aboutToCompile (units[0]);
if (!this.problemSourceFiles.isEmpty ()) {
var toAdd = this.problemSourceFiles.size ();
var length = additionalUnits == null ? 0 : additionalUnits.length;
if (length == 0) additionalUnits =  new Array (toAdd);
 else System.arraycopy (additionalUnits, 0, additionalUnits =  new Array (length + toAdd), 0, length);
for (var i = 0; i < toAdd; i++) additionalUnits[length + i] = this.problemSourceFiles.get (i);

}var initialTypeNames =  new Array (units.length);
for (var i = 0, l = units.length; i < l; i++) initialTypeNames[i] = units[i].initialTypeName;

this.nameEnvironment.setNames (initialTypeNames, additionalUnits);
this.notifier.checkCancel ();
try {
this.inCompiler = true;
this.compiler.compile (units);
} catch (ignored) {
if (Clazz.instanceOf (ignored, org.eclipse.jdt.internal.compiler.problem.AbortCompilation)) {
} else {
throw ignored;
}
} finally {
this.inCompiler = false;
}
this.notifier.checkCancel ();
}, "~A,~A,~B");
Clazz.defineMethod (c$, "copyResource", 
function (source, destination) {
var destPath = destination.getFullPath ();
try {
source.copy (destPath, 1025, null);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
source.refreshLocal (0, null);
if (!source.exists ()) return ;
throw e;
} else {
throw e;
}
}
org.eclipse.jdt.internal.core.util.Util.setReadOnly (destination, false);
}, "org.eclipse.core.resources.IResource,org.eclipse.core.resources.IResource");
Clazz.defineMethod (c$, "createProblemFor", 
function (resource, javaElement, message, problemSeverity) {
try {
var marker = resource.createMarker ("org.eclipse.jdt.core.problem");
var severity = problemSeverity.equals ("warning") ? 1 : 2;
var range = null;
if (javaElement != null) {
try {
range = javaElement.getNameRange ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jdt.core.JavaModelException)) {
if (e.getJavaModelStatus ().getCode () != 969) {
throw e;
}if (!org.eclipse.jdt.core.compiler.CharOperation.equals (javaElement.getElementName ().toCharArray (), org.eclipse.jdt.internal.compiler.lookup.TypeConstants.PACKAGE_INFO_NAME)) {
throw e;
}} else {
throw e;
}
}
}var start = range == null ? 0 : range.getOffset ();
var end = range == null ? 1 : start + range.getLength ();
marker.setAttributes (["message", "severity", "charStart", "charEnd", "sourceId"], [message,  new Integer (severity),  new Integer (start),  new Integer (end), "JDT"]);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
throw this.internalException (e);
} else {
throw e;
}
}
}, "org.eclipse.core.resources.IResource,org.eclipse.jdt.core.IMember,~S,~S");
Clazz.defineMethod (c$, "deleteGeneratedFiles", 
function (deletedGeneratedFiles) {
}, "~A");
Clazz.defineMethod (c$, "findSourceFile", 
function (file, mustExist) {
if (mustExist && !file.exists ()) return null;
var md = this.sourceLocations[0];
if (this.sourceLocations.length > 1) {
var sourceFileFullPath = file.getFullPath ();
for (var j = 0, m = this.sourceLocations.length; j < m; j++) {
if (this.sourceLocations[j].sourceFolder.getFullPath ().isPrefixOf (sourceFileFullPath)) {
md = this.sourceLocations[j];
if (md.exclusionPatterns == null && md.inclusionPatterns == null) break;
if (!org.eclipse.jdt.internal.core.util.Util.isExcluded (file, md.inclusionPatterns, md.exclusionPatterns)) break;
}}
}return  new net.sf.j2s.core.builder.SourceFile (file, md);
}, "org.eclipse.core.resources.IFile,~B");
Clazz.defineMethod (c$, "finishedWith", 
function (sourceLocator, result, mainTypeName, definedTypeNames, duplicateTypeNames) {
if (duplicateTypeNames == null) {
this.newState.record (sourceLocator, result.qualifiedReferences, result.simpleNameReferences, result.rootReferences, mainTypeName, definedTypeNames);
return ;
}var simpleRefs = result.simpleNameReferences;
next : for (var i = 0, l = duplicateTypeNames.size (); i < l; i++) {
var compoundName = duplicateTypeNames.get (i);
var typeName = compoundName[compoundName.length - 1];
var sLength = simpleRefs.length;
for (var j = 0; j < sLength; j++) if (org.eclipse.jdt.core.compiler.CharOperation.equals (simpleRefs[j], typeName)) continue next;
System.arraycopy (simpleRefs, 0, simpleRefs =  Clazz.newArray (sLength + 1, '\0'), 0, sLength);
simpleRefs[sLength] = typeName;
}
this.newState.record (sourceLocator, result.qualifiedReferences, simpleRefs, result.rootReferences, mainTypeName, definedTypeNames);
}, "~S,org.eclipse.jdt.internal.compiler.CompilationResult,~A,java.util.ArrayList,java.util.ArrayList");
Clazz.defineMethod (c$, "createFolder", 
function (packagePath, outputFolder) {
if (packagePath.isEmpty ()) return outputFolder;
var folder = outputFolder.getFolder (packagePath);
if (!folder.exists ()) {
this.createFolder (packagePath.removeLastSegments (1), outputFolder);
folder.create (1025, true, null);
}return folder;
}, "org.eclipse.core.runtime.IPath,org.eclipse.core.resources.IContainer");
Clazz.overrideMethod (c$, "fromIFile", 
function (file) {
return this.findSourceFile (file, true);
}, "org.eclipse.core.resources.IFile");
Clazz.defineMethod (c$, "initializeAnnotationProcessorManager", 
function (newCompiler) {
var annotationManager = org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ().createAnnotationProcessorManager ();
if (annotationManager != null) {
annotationManager.configureFromPlatform (newCompiler, this, this.javaBuilder.javaProject);
annotationManager.setErr ( new java.io.PrintWriter (System.err));
annotationManager.setOut ( new java.io.PrintWriter (System.out));
}newCompiler.annotationProcessorManager = annotationManager;
}, "org.eclipse.jdt.internal.compiler.Compiler");
Clazz.defineMethod (c$, "internalException", 
function (t) {
var imageBuilderException =  new net.sf.j2s.core.builder.ImageBuilderInternalException (t);
if (this.inCompiler) return  new org.eclipse.jdt.internal.compiler.problem.AbortCompilation (true, imageBuilderException);
return imageBuilderException;
}, "org.eclipse.core.runtime.CoreException");
Clazz.defineMethod (c$, "isExcludedFromProject", 
function (childPath) {
if (childPath.segmentCount () > 2) return false;
for (var j = 0, k = this.sourceLocations.length; j < k; j++) {
if (childPath.equals (this.sourceLocations[j].binaryFolder.getFullPath ())) return true;
if (childPath.equals (this.sourceLocations[j].sourceFolder.getFullPath ())) return true;
}
return childPath.equals (this.javaBuilder.javaProject.getOutputLocation ());
}, "org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "newCompiler", 
function () {
var projectOptions = this.javaBuilder.javaProject.getOptions (true);
var option = projectOptions.get ("org.eclipse.jdt.core.compiler.problem.invalidJavadoc");
if (option == null || option.equals ("ignore")) {
option = projectOptions.get ("org.eclipse.jdt.core.compiler.problem.missingJavadocTags");
if (option == null || option.equals ("ignore")) {
option = projectOptions.get ("org.eclipse.jdt.core.compiler.problem.missingJavadocComments");
if (option == null || option.equals ("ignore")) {
option = projectOptions.get ("org.eclipse.jdt.core.compiler.problem.unusedImport");
if (option == null || option.equals ("ignore")) {
projectOptions.put ("org.eclipse.jdt.core.compiler.doc.comment.support", "disabled");
}}}}var compilerOptions =  new org.eclipse.jdt.internal.compiler.impl.CompilerOptions (projectOptions);
compilerOptions.performMethodsFullRecovery = true;
compilerOptions.performStatementsRecovery = true;
var newCompiler =  new org.eclipse.jdt.internal.compiler.Compiler (this.nameEnvironment, org.eclipse.jdt.internal.compiler.DefaultErrorHandlingPolicies.proceedWithAllProblems (), compilerOptions, this, net.sf.j2s.core.builder.ProblemFactory.getProblemFactory (java.util.Locale.getDefault ()));
var options = newCompiler.options;
var setting = System.getProperty ("jdt.compiler.useSingleThread");
newCompiler.useSingleThread = setting != null && setting.equals ("true");
options.produceReferenceInfo = true;
if (options.complianceLevel >= 3276800 && options.processAnnotations) {
this.initializeAnnotationProcessorManager (newCompiler);
}return newCompiler;
});
Clazz.defineMethod (c$, "notifyParticipants", 
function (unitsAboutToCompile) {
var results =  new Array (unitsAboutToCompile.length);
for (var i = unitsAboutToCompile.length; --i >= 0; ) results[i] =  new net.sf.j2s.core.builder.CompilationParticipantResult (unitsAboutToCompile[i]);

for (var i = 0, l = this.javaBuilder.participants.length; i < l; i++) this.javaBuilder.participants[i].buildStarting (results, Clazz.instanceOf (this, net.sf.j2s.core.builder.BatchImageBuilder));

var uniqueFiles = null;
var toAdd = null;
var added = 0;
for (var i = results.length; --i >= 0; ) {
var result = results[i];
if (result == null) continue ;var deletedGeneratedFiles = result.deletedFiles;
if (deletedGeneratedFiles != null) this.deleteGeneratedFiles (deletedGeneratedFiles);
var addedGeneratedFiles = result.addedFiles;
if (addedGeneratedFiles != null) {
for (var j = addedGeneratedFiles.length; --j >= 0; ) {
var sourceFile = this.findSourceFile (addedGeneratedFiles[j], true);
if (sourceFile == null) continue ;if (uniqueFiles == null) {
uniqueFiles =  new org.eclipse.jdt.internal.compiler.util.SimpleSet (unitsAboutToCompile.length + 3);
for (var f = unitsAboutToCompile.length; --f >= 0; ) uniqueFiles.add (unitsAboutToCompile[f]);

}if (uniqueFiles.addIfNotIncluded (sourceFile) === sourceFile) {
var newResult =  new net.sf.j2s.core.builder.CompilationParticipantResult (sourceFile);
if (toAdd == null) {
toAdd =  new Array (addedGeneratedFiles.length);
} else {
var length = toAdd.length;
if (added == length) System.arraycopy (toAdd, 0, toAdd =  new Array (length + addedGeneratedFiles.length), 0, length);
}toAdd[added++] = newResult;
}}
}}
if (added > 0) {
var length = results.length;
System.arraycopy (results, 0, results =  new Array (length + added), 0, length);
System.arraycopy (toAdd, 0, results, length, added);
}return results;
}, "~A");
Clazz.defineMethod (c$, "processAnnotations", 
function (results) {
var hasAnnotationProcessor = false;
for (var i = 0, l = this.javaBuilder.participants.length; !hasAnnotationProcessor && i < l; i++) hasAnnotationProcessor = this.javaBuilder.participants[i].isAnnotationProcessor ();

if (!hasAnnotationProcessor) return ;
var foundAnnotations = this.filesWithAnnotations != null && this.filesWithAnnotations.elementSize > 0;
for (var i = results.length; --i >= 0; ) results[i].reset (foundAnnotations && this.filesWithAnnotations.includes (results[i].sourceFile));

for (var i = 0, l = this.javaBuilder.participants.length; i < l; i++) if (this.javaBuilder.participants[i].isAnnotationProcessor ()) this.javaBuilder.participants[i].processAnnotations (results);

this.processAnnotationResults (results);
}, "~A");
Clazz.defineMethod (c$, "recordParticipantResult", 
function (result) {
var problems = result.problems;
if (problems != null && problems.length > 0) {
this.notifier.updateProblemCounts (problems);
try {
this.storeProblemsFor (result.sourceFile, problems);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
org.eclipse.jdt.internal.core.util.Util.log (e, "JavaBuilder logging CompilationParticipant's CoreException to help debugging");
} else {
throw e;
}
}
}var dependencies = result.dependencies;
if (dependencies != null) {
var refs = this.newState.references.get (result.sourceFile.typeLocator ());
if (refs != null) refs.addDependencies (dependencies);
}}, "net.sf.j2s.core.builder.CompilationParticipantResult");
Clazz.defineMethod (c$, "storeProblemsFor", 
function (sourceFile, problems) {
if (sourceFile == null || problems == null || problems.length == 0) return ;
if (!this.keepStoringProblemMarkers) return ;
var resource = sourceFile.resource;
var managedMarkerTypes = org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ().compilationParticipants.managedMarkerTypes ();
for (var i = 0, l = problems.length; i < l; i++) {
var problem = problems[i];
var id = problem.getID ();
if (id == 16777540) {
var missingClassfileName = problem.getArguments ()[0];
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_incompleteClassPath, missingClassfileName));
var isInvalidClasspathError = "error".equals (this.javaBuilder.javaProject.getOption ("org.eclipse.jdt.core.incompleteClasspath", true));
if (isInvalidClasspathError && "abort".equals (this.javaBuilder.javaProject.getOption ("org.eclipse.jdt.core.builder.invalidClasspath", true))) {
net.sf.j2s.core.builder.JavaBuilder.removeProblemsAndTasksFor (this.javaBuilder.currentProject);
this.keepStoringProblemMarkers = false;
}var marker = this.javaBuilder.currentProject.createMarker ("org.eclipse.jdt.core.problem");
marker.setAttributes (["message", "severity", "categoryId", "sourceId"], [org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_incompleteClassPath, missingClassfileName),  new Integer (isInvalidClasspathError ? 2 : 1),  new Integer (10), "JDT"]);
}var markerType = problem.getMarkerType ();
var managedProblem = false;
if ("org.eclipse.jdt.core.problem".equals (markerType) || (managedProblem = managedMarkerTypes.contains (markerType))) {
var marker = resource.createMarker (markerType);
var attributeNames = net.sf.j2s.core.builder.AbstractImageBuilder.JAVA_PROBLEM_MARKER_ATTRIBUTE_NAMES;
var standardLength = attributeNames.length;
var allNames = attributeNames;
var managedLength = managedProblem ? 0 : 1;
var extraAttributeNames = problem.getExtraMarkerAttributeNames ();
var extraLength = extraAttributeNames == null ? 0 : extraAttributeNames.length;
if (managedLength > 0 || extraLength > 0) {
allNames =  new Array (standardLength + managedLength + extraLength);
System.arraycopy (attributeNames, 0, allNames, 0, standardLength);
if (managedLength > 0) allNames[standardLength] = "sourceId";
System.arraycopy (extraAttributeNames, 0, allNames, standardLength + managedLength, extraLength);
}var allValues =  new Array (allNames.length);
var index = 0;
allValues[index++] = problem.getMessage ();
allValues[index++] = problem.isError () ? net.sf.j2s.core.builder.AbstractImageBuilder.S_ERROR : net.sf.j2s.core.builder.AbstractImageBuilder.S_WARNING;
allValues[index++] =  new Integer (id);
allValues[index++] =  new Integer (problem.getSourceStart ());
var end = problem.getSourceEnd ();
allValues[index++] =  new Integer (end > 0 ? end + 1 : end);
allValues[index++] =  new Integer (problem.getSourceLineNumber ());
allValues[index++] = org.eclipse.jdt.internal.core.util.Util.getProblemArgumentsForMarker (problem.getArguments ());
allValues[index++] =  new Integer (problem.getCategoryID ());
if (managedLength > 0) allValues[index++] = "JDT";
if (extraLength > 0) System.arraycopy (problem.getExtraMarkerAttributeValues (), 0, allValues, index, extraLength);
marker.setAttributes (allNames, allValues);
if (!this.keepStoringProblemMarkers) return ;
}}
}, "net.sf.j2s.core.builder.SourceFile,~A");
Clazz.defineMethod (c$, "storeTasksFor", 
function (sourceFile, tasks) {
if (sourceFile == null || tasks == null || tasks.length == 0) return ;
var resource = sourceFile.resource;
for (var i = 0, l = tasks.length; i < l; i++) {
var task = tasks[i];
if (task.getID () == 536871362) {
var marker = resource.createMarker ("org.eclipse.jdt.core.task");
var priority = net.sf.j2s.core.builder.AbstractImageBuilder.P_NORMAL;
var compilerPriority = task.getArguments ()[2];
if ("HIGH".equals (compilerPriority)) priority = net.sf.j2s.core.builder.AbstractImageBuilder.P_HIGH;
 else if ("LOW".equals (compilerPriority)) priority = net.sf.j2s.core.builder.AbstractImageBuilder.P_LOW;
var attributeNames = net.sf.j2s.core.builder.AbstractImageBuilder.JAVA_TASK_MARKER_ATTRIBUTE_NAMES;
var standardLength = attributeNames.length;
var allNames = attributeNames;
var extraAttributeNames = task.getExtraMarkerAttributeNames ();
var extraLength = extraAttributeNames == null ? 0 : extraAttributeNames.length;
if (extraLength > 0) {
allNames =  new Array (standardLength + extraLength);
System.arraycopy (attributeNames, 0, allNames, 0, standardLength);
System.arraycopy (extraAttributeNames, 0, allNames, standardLength, extraLength);
}var allValues =  new Array (allNames.length);
var index = 0;
allValues[index++] = task.getMessage ();
allValues[index++] = priority;
allValues[index++] =  new Integer (task.getID ());
allValues[index++] =  new Integer (task.getSourceStart ());
allValues[index++] =  new Integer (task.getSourceEnd () + 1);
allValues[index++] =  new Integer (task.getSourceLineNumber ());
allValues[index++] = Boolean.FALSE;
allValues[index++] = "JDT";
if (extraLength > 0) System.arraycopy (task.getExtraMarkerAttributeValues (), 0, allValues, index, extraLength);
marker.setAttributes (allNames, allValues);
}}
}, "net.sf.j2s.core.builder.SourceFile,~A");
Clazz.defineMethod (c$, "updateProblemsFor", 
function (sourceFile, result) {
var problems = result.getProblems ();
if (problems == null || problems.length == 0) return ;
this.notifier.updateProblemCounts (problems);
this.storeProblemsFor (sourceFile, problems);
}, "net.sf.j2s.core.builder.SourceFile,org.eclipse.jdt.internal.compiler.CompilationResult");
Clazz.defineMethod (c$, "updateTasksFor", 
function (sourceFile, result) {
var tasks = result.getTasks ();
if (tasks == null || tasks.length == 0) return ;
this.storeTasksFor (sourceFile, tasks);
}, "net.sf.j2s.core.builder.SourceFile,org.eclipse.jdt.internal.compiler.CompilationResult");
Clazz.defineMethod (c$, "writeClassFile", 
function (classFile, compilationUnit, isTopLevelType) {
var fileName =  String.instantialize (classFile.fileName ());
var filePath =  new org.eclipse.core.runtime.Path (fileName);
var outputFolder = compilationUnit.sourceLocation.binaryFolder;
var container = outputFolder;
if (filePath.segmentCount () > 1) {
container = this.createFolder (filePath.removeLastSegments (1), outputFolder);
filePath =  new org.eclipse.core.runtime.Path (filePath.lastSegment ());
}var file = container.getFile (filePath.addFileExtension ("class"));
this.writeClassFileContents (classFile, file, fileName, isTopLevelType, compilationUnit);
return filePath.lastSegment ().toCharArray ();
}, "org.eclipse.jdt.internal.compiler.ClassFile,net.sf.j2s.core.builder.SourceFile,~B");
Clazz.defineMethod (c$, "writeClassFileContents", 
function (classFile, file, qualifiedFileName, isTopLevelType, compilationUnit) {
var input =  new java.io.ByteArrayInputStream (classFile.getBytes ());
if (file.exists ()) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Writing changed class file " + file.getName ());
if (!file.isDerived ()) file.setDerived (true);
file.setContents (input, true, false, null);
} else {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Writing new class file " + file.getName ());
file.create (input, 1025, null);
}}, "org.eclipse.jdt.internal.compiler.ClassFile,org.eclipse.core.resources.IFile,~S,~B,net.sf.j2s.core.builder.SourceFile");
c$.$AbstractImageBuilder$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.core.builder, "AbstractImageBuilder$1", null, org.eclipse.core.resources.IResourceProxyVisitor);
Clazz.overrideMethod (c$, "visit", 
function (proxy) {
switch (proxy.getType ()) {
case 1:
if (org.eclipse.jdt.internal.core.util.Util.isJavaLikeFileName (proxy.getName ())) {
var resource = proxy.requestResource ();
if (this.f$.exclusionPatterns != null || this.f$.inclusionPatterns != null) if (org.eclipse.jdt.internal.core.util.Util.isExcluded (resource.getFullPath (), this.f$.inclusionPatterns, this.f$.exclusionPatterns, false)) return false;
this.f$.sourceFiles.add ( new net.sf.j2s.core.builder.SourceFile (resource, this.f$.sourceLocation));
}return false;
case 2:
var folderPath = null;
if (this.f$.isAlsoProject) if (this.b$["net.sf.j2s.core.builder.AbstractImageBuilder"].isExcludedFromProject (folderPath = proxy.requestFullPath ())) return false;
if (this.f$.exclusionPatterns != null) {
if (folderPath == null) folderPath = proxy.requestFullPath ();
if (org.eclipse.jdt.internal.core.util.Util.isExcluded (folderPath, this.f$.inclusionPatterns, this.f$.exclusionPatterns, true)) {
return this.f$.inclusionPatterns != null;
}}if (!this.f$.isOutputFolder) {
if (folderPath == null) folderPath = proxy.requestFullPath ();
var packageName = folderPath.lastSegment ();
if (packageName.length > 0) {
var sourceLevel = this.b$["net.sf.j2s.core.builder.AbstractImageBuilder"].javaBuilder.javaProject.getOption ("org.eclipse.jdt.core.compiler.source", true);
var complianceLevel = this.b$["net.sf.j2s.core.builder.AbstractImageBuilder"].javaBuilder.javaProject.getOption ("org.eclipse.jdt.core.compiler.compliance", true);
if (org.eclipse.jdt.core.JavaConventions.validatePackageName (packageName, sourceLevel, complianceLevel).getSeverity () != 4) this.b$["net.sf.j2s.core.builder.AbstractImageBuilder"].createFolder (folderPath.removeFirstSegments (this.f$.segmentCount), this.f$.outputFolder);
}}}
return true;
}, "org.eclipse.core.resources.IResourceProxy");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"MAX_AT_ONCE", 2000);
c$.JAVA_PROBLEM_MARKER_ATTRIBUTE_NAMES = c$.prototype.JAVA_PROBLEM_MARKER_ATTRIBUTE_NAMES = ["message", "severity", "id", "charStart", "charEnd", "lineNumber", "arguments", "categoryId"];
c$.JAVA_TASK_MARKER_ATTRIBUTE_NAMES = c$.prototype.JAVA_TASK_MARKER_ATTRIBUTE_NAMES = ["message", "priority", "id", "charStart", "charEnd", "lineNumber", "userEditable", "sourceId"];
c$.S_ERROR = c$.prototype.S_ERROR =  new Integer (2);
c$.S_WARNING = c$.prototype.S_WARNING =  new Integer (1);
c$.P_HIGH = c$.prototype.P_HIGH =  new Integer (2);
c$.P_NORMAL = c$.prototype.P_NORMAL =  new Integer (1);
c$.P_LOW = c$.prototype.P_LOW =  new Integer (0);
});
