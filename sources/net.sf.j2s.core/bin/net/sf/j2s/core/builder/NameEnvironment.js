Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["org.eclipse.jdt.internal.compiler.env.INameEnvironment", "org.eclipse.jdt.internal.compiler.util.SuffixConstants"], "net.sf.j2s.core.builder.NameEnvironment", ["java.util.ArrayList", "net.sf.j2s.core.builder.AbortIncrementalBuildException", "$.ClasspathLocation", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.core.compiler.CharOperation", "org.eclipse.jdt.internal.compiler.env.NameEnvironmentAnswer", "org.eclipse.jdt.internal.compiler.problem.AbortCompilation", "org.eclipse.jdt.internal.compiler.util.SimpleLookupTable", "$.SimpleSet", "org.eclipse.jdt.internal.core.JavaModel", "$.JavaProject"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isIncrementalBuild = false;
this.sourceLocations = null;
this.binaryLocations = null;
this.notifier = null;
this.initialTypeNames = null;
this.additionalUnits = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "NameEnvironment", null, [org.eclipse.jdt.internal.compiler.env.INameEnvironment, org.eclipse.jdt.internal.compiler.util.SuffixConstants]);
Clazz.makeConstructor (c$, 
function (root, javaProject, binaryLocationsPerProject, notifier) {
this.isIncrementalBuild = false;
this.notifier = notifier;
this.computeClasspathLocations (root, javaProject, binaryLocationsPerProject);
this.setNames (null, null);
}, "org.eclipse.core.resources.IWorkspaceRoot,org.eclipse.jdt.internal.core.JavaProject,org.eclipse.jdt.internal.compiler.util.SimpleLookupTable,net.sf.j2s.core.builder.BuildNotifier");
Clazz.makeConstructor (c$, 
function (javaProject) {
this.isIncrementalBuild = false;
try {
this.computeClasspathLocations (javaProject.getProject ().getWorkspace ().getRoot (), javaProject, null);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
this.sourceLocations =  new Array (0);
this.binaryLocations =  new Array (0);
} else {
throw e;
}
}
this.setNames (null, null);
}, "org.eclipse.jdt.core.IJavaProject");
Clazz.defineMethod (c$, "computeClasspathLocations", 
($fz = function (root, javaProject, binaryLocationsPerProject) {
var cycleMarker = javaProject.getCycleMarker ();
if (cycleMarker != null) {
var severity = "error".equals (javaProject.getOption ("org.eclipse.jdt.core.circularClasspath", true)) ? 2 : 1;
if (severity != cycleMarker.getAttribute ("severity", severity)) cycleMarker.setAttribute ("severity", severity);
}var classpathEntries = javaProject.getExpandedClasspath ();
var sLocations =  new java.util.ArrayList (classpathEntries.length);
var bLocations =  new java.util.ArrayList (classpathEntries.length);
nextEntry : for (var i = 0, l = classpathEntries.length; i < l; i++) {
var entry = classpathEntries[i];
var path = entry.getPath ();
var target = org.eclipse.jdt.internal.core.JavaModel.getTarget (path, true);
if (target == null) continue nextEntry;switch (entry.getEntryKind ()) {
case 3:
if (!(Clazz.instanceOf (target, org.eclipse.core.resources.IContainer))) continue nextEntry;var outputPath = entry.getOutputLocation () != null ? entry.getOutputLocation () : javaProject.getOutputLocation ();
var outputFolder;
if (outputPath.segmentCount () == 1) {
outputFolder = javaProject.getProject ();
} else {
outputFolder = root.getFolder (outputPath);
if (!outputFolder.exists ()) this.createOutputFolder (outputFolder);
}sLocations.add (net.sf.j2s.core.builder.ClasspathLocation.forSourceFolder (target, outputFolder, entry.fullInclusionPatternChars (), entry.fullExclusionPatternChars ()));
continue nextEntry;case 2:
if (!(Clazz.instanceOf (target, org.eclipse.core.resources.IProject))) continue nextEntry;var prereqProject = target;
if (!org.eclipse.jdt.internal.core.JavaProject.hasJavaNature (prereqProject)) continue nextEntry;var prereqJavaProject = org.eclipse.jdt.core.JavaCore.create (prereqProject);
var prereqClasspathEntries = prereqJavaProject.getRawClasspath ();
var seen =  new java.util.ArrayList ();
nextPrereqEntry : for (var j = 0, m = prereqClasspathEntries.length; j < m; j++) {
var prereqEntry = prereqClasspathEntries[j];
if (prereqEntry.getEntryKind () == 3) {
var prereqTarget = org.eclipse.jdt.internal.core.JavaModel.getTarget (prereqEntry.getPath (), true);
if (!(Clazz.instanceOf (prereqTarget, org.eclipse.core.resources.IContainer))) continue nextPrereqEntry;var prereqOutputPath = prereqEntry.getOutputLocation () != null ? prereqEntry.getOutputLocation () : prereqJavaProject.getOutputLocation ();
var binaryFolder = prereqOutputPath.segmentCount () == 1 ? prereqProject : root.getFolder (prereqOutputPath);
if (binaryFolder.exists () && !seen.contains (binaryFolder)) {
seen.add (binaryFolder);
var bLocation = net.sf.j2s.core.builder.ClasspathLocation.forBinaryFolder (binaryFolder, true, entry.getAccessRuleSet ());
bLocations.add (bLocation);
if (binaryLocationsPerProject != null) {
var existingLocations = binaryLocationsPerProject.get (prereqProject);
if (existingLocations == null) {
existingLocations = [bLocation];
} else {
var size = existingLocations.length;
System.arraycopy (existingLocations, 0, existingLocations =  new Array (size + 1), 0, size);
existingLocations[size] = bLocation;
}binaryLocationsPerProject.put (prereqProject, existingLocations);
}}}}
continue nextEntry;case 1:
if (Clazz.instanceOf (target, org.eclipse.core.resources.IResource)) {
var resource = target;
var bLocation = null;
if (Clazz.instanceOf (resource, org.eclipse.core.resources.IFile)) {
var accessRuleSet = ("ignore".equals (javaProject.getOption ("org.eclipse.jdt.core.compiler.problem.forbiddenReference", true)) && "ignore".equals (javaProject.getOption ("org.eclipse.jdt.core.compiler.problem.discouragedReference", true))) ? null : entry.getAccessRuleSet ();
bLocation = net.sf.j2s.core.builder.ClasspathLocation.forLibrary (resource, accessRuleSet);
} else if (Clazz.instanceOf (resource, org.eclipse.core.resources.IContainer)) {
var accessRuleSet = ("ignore".equals (javaProject.getOption ("org.eclipse.jdt.core.compiler.problem.forbiddenReference", true)) && "ignore".equals (javaProject.getOption ("org.eclipse.jdt.core.compiler.problem.discouragedReference", true))) ? null : entry.getAccessRuleSet ();
bLocation = net.sf.j2s.core.builder.ClasspathLocation.forBinaryFolder (target, false, accessRuleSet);
}bLocations.add (bLocation);
if (binaryLocationsPerProject != null) {
var p = resource.getProject ();
var existingLocations = binaryLocationsPerProject.get (p);
if (existingLocations == null) {
existingLocations = [bLocation];
} else {
var size = existingLocations.length;
System.arraycopy (existingLocations, 0, existingLocations =  new Array (size + 1), 0, size);
existingLocations[size] = bLocation;
}binaryLocationsPerProject.put (p, existingLocations);
}} else if (Clazz.instanceOf (target, java.io.File)) {
var accessRuleSet = ("ignore".equals (javaProject.getOption ("org.eclipse.jdt.core.compiler.problem.forbiddenReference", true)) && "ignore".equals (javaProject.getOption ("org.eclipse.jdt.core.compiler.problem.discouragedReference", true))) ? null : entry.getAccessRuleSet ();
bLocations.add (net.sf.j2s.core.builder.ClasspathLocation.forLibrary (path.toString (), accessRuleSet));
}continue nextEntry;}
}
var outputFolders =  new java.util.ArrayList (1);
this.sourceLocations =  new Array (sLocations.size ());
if (!sLocations.isEmpty ()) {
sLocations.toArray (this.sourceLocations);
next : for (var i = 0, l = this.sourceLocations.length; i < l; i++) {
var md = this.sourceLocations[i];
var outputPath = md.binaryFolder.getFullPath ();
for (var j = 0; j < i; j++) {
if (outputPath.equals (this.sourceLocations[j].binaryFolder.getFullPath ())) {
md.hasIndependentOutputFolder = this.sourceLocations[j].hasIndependentOutputFolder;
continue next;}}
outputFolders.add (md);
for (var j = 0, m = this.sourceLocations.length; j < m; j++) if (outputPath.equals (this.sourceLocations[j].sourceFolder.getFullPath ())) continue next;
md.hasIndependentOutputFolder = true;
}
}this.binaryLocations =  new Array (outputFolders.size () + bLocations.size ());
var index = 0;
for (var i = 0, l = outputFolders.size (); i < l; i++) this.binaryLocations[index++] = outputFolders.get (i);

for (var i = 0, l = bLocations.size (); i < l; i++) this.binaryLocations[index++] = bLocations.get (i);

}, $fz.isPrivate = true, $fz), "org.eclipse.core.resources.IWorkspaceRoot,org.eclipse.jdt.internal.core.JavaProject,org.eclipse.jdt.internal.compiler.util.SimpleLookupTable");
Clazz.overrideMethod (c$, "cleanup", 
function () {
this.initialTypeNames = null;
this.additionalUnits = null;
for (var i = 0, l = this.sourceLocations.length; i < l; i++) this.sourceLocations[i].cleanup ();

for (var i = 0, l = this.binaryLocations.length; i < l; i++) this.binaryLocations[i].cleanup ();

});
Clazz.defineMethod (c$, "createOutputFolder", 
($fz = function (outputFolder) {
this.createParentFolder (outputFolder.getParent ());
(outputFolder).create (1025, true, null);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.resources.IContainer");
Clazz.defineMethod (c$, "createParentFolder", 
($fz = function (parent) {
if (!parent.exists ()) {
this.createParentFolder (parent.getParent ());
(parent).create (true, true, null);
}}, $fz.isPrivate = true, $fz), "org.eclipse.core.resources.IContainer");
Clazz.defineMethod (c$, "findClass", 
($fz = function (qualifiedTypeName, typeName) {
if (this.notifier != null) this.notifier.checkCancelWithinCompiler ();
if (this.initialTypeNames != null && this.initialTypeNames.includes (qualifiedTypeName)) {
if (this.isIncrementalBuild) throw  new org.eclipse.jdt.internal.compiler.problem.AbortCompilation (true,  new net.sf.j2s.core.builder.AbortIncrementalBuildException (qualifiedTypeName));
return null;
}if (this.additionalUnits != null && this.sourceLocations.length > 0) {
var unit = this.additionalUnits.get (qualifiedTypeName);
if (unit != null) return  new org.eclipse.jdt.internal.compiler.env.NameEnvironmentAnswer (unit, null);
}var qBinaryFileName = qualifiedTypeName + ".class";
var binaryFileName = qBinaryFileName;
var qPackageName = "";
if (qualifiedTypeName.length > typeName.length) {
var typeNameStart = qBinaryFileName.length - typeName.length - 6;
qPackageName = qBinaryFileName.substring (0, typeNameStart - 1);
binaryFileName = qBinaryFileName.substring (typeNameStart);
}var suggestedAnswer = null;
for (var i = 0, l = this.binaryLocations.length; i < l; i++) {
var answer = this.binaryLocations[i].findClass (binaryFileName, qPackageName, qBinaryFileName);
if (answer != null) {
if (!answer.ignoreIfBetter ()) {
if (answer.isBetter (suggestedAnswer)) return answer;
} else if (answer.isBetter (suggestedAnswer)) suggestedAnswer = answer;
}}
if (suggestedAnswer != null) return suggestedAnswer;
return null;
}, $fz.isPrivate = true, $fz), "~S,~A");
Clazz.defineMethod (c$, "findType", 
function (compoundName) {
if (compoundName != null) return this.findClass ( String.instantialize (org.eclipse.jdt.core.compiler.CharOperation.concatWith (compoundName, '/')), compoundName[compoundName.length - 1]);
return null;
}, "~A");
Clazz.defineMethod (c$, "findType", 
function (typeName, packageName) {
if (typeName != null) return this.findClass ( String.instantialize (org.eclipse.jdt.core.compiler.CharOperation.concatWith (packageName, typeName, '/')), typeName);
return null;
}, "~A,~A");
Clazz.defineMethod (c$, "isPackage", 
function (compoundName, packageName) {
return this.isPackage ( String.instantialize (org.eclipse.jdt.core.compiler.CharOperation.concatWith (compoundName, packageName, '/')));
}, "~A,~A");
Clazz.defineMethod (c$, "isPackage", 
function (qualifiedPackageName) {
for (var i = 0, l = this.binaryLocations.length; i < l; i++) if (this.binaryLocations[i].isPackage (qualifiedPackageName)) return true;

return false;
}, "~S");
Clazz.defineMethod (c$, "setNames", 
function (typeNames, additionalFiles) {
if (typeNames == null) {
this.initialTypeNames = null;
} else {
this.initialTypeNames =  new org.eclipse.jdt.internal.compiler.util.SimpleSet (typeNames.length);
for (var i = 0, l = typeNames.length; i < l; i++) this.initialTypeNames.add (typeNames[i]);

}if (additionalFiles == null) {
this.additionalUnits = null;
} else {
this.additionalUnits =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (additionalFiles.length);
for (var i = 0, l = additionalFiles.length; i < l; i++) {
var additionalUnit = additionalFiles[i];
if (additionalUnit != null) this.additionalUnits.put (additionalUnit.initialTypeName, additionalFiles[i]);
}
}for (var i = 0, l = this.sourceLocations.length; i < l; i++) this.sourceLocations[i].reset ();

for (var i = 0, l = this.binaryLocations.length; i < l; i++) this.binaryLocations[i].reset ();

}, "~A,~A");
});
