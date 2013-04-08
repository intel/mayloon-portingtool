Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["org.eclipse.core.resources.IncrementalProjectBuilder"], "net.sf.j2s.core.builder.JavaBuilder", ["java.io.ByteArrayInputStream", "$.ByteArrayOutputStream", "$.DataInputStream", "$.DataOutputStream", "$.File", "$.FileInputStream", "java.util.ArrayList", "$.Date", "$.HashSet", "$.Properties", "net.sf.j2s.core.builder.BatchImageBuilder", "$.BuildNotifier", "$.Java2ScriptBatchImageBuilder", "$.Java2ScriptIncrementalImageBuilder", "$.NameEnvironment", "$.State", "org.eclipse.jdt.core.JavaCore", "org.eclipse.jdt.core.compiler.CharOperation", "org.eclipse.jdt.internal.compiler.util.SimpleLookupTable", "org.eclipse.jdt.internal.core.JavaModel", "$.JavaModelManager", "$.JavaProject", "org.eclipse.jdt.internal.core.builder.JavaBuilder", "org.eclipse.jdt.internal.core.util.Messages", "$.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.currentProject = null;
this.javaProject = null;
this.workspaceRoot = null;
this.participants = null;
this.nameEnvironment = null;
this.binaryLocationsPerProject = null;
this.lastState = null;
this.notifier = null;
this.extraResourceFileFilters = null;
this.extraResourceFolderFilters = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "JavaBuilder", org.eclipse.core.resources.IncrementalProjectBuilder);
c$.getProblemsFor = Clazz.defineMethod (c$, "getProblemsFor", 
function (resource) {
try {
if (resource != null && resource.exists ()) {
var markers = resource.findMarkers ("org.eclipse.jdt.core.problem", false, 2);
var markerTypes = org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ().compilationParticipants.managedMarkerTypes ();
if (markerTypes.isEmpty ()) return markers;
var markerList =  new java.util.ArrayList (5);
for (var i = 0, length = markers.length; i < length; i++) {
markerList.add (markers[i]);
}
var iterator = markerTypes.iterator ();
while (iterator.hasNext ()) {
markers = resource.findMarkers (iterator.next (), false, 2);
for (var i = 0, length = markers.length; i < length; i++) {
markerList.add (markers[i]);
}
}
var result;
markerList.toArray (result =  new Array (markerList.size ()));
return result;
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
return  new Array (0);
}, "org.eclipse.core.resources.IResource");
c$.getTasksFor = Clazz.defineMethod (c$, "getTasksFor", 
function (resource) {
try {
if (resource != null && resource.exists ()) return resource.findMarkers ("org.eclipse.jdt.core.task", false, 2);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
return  new Array (0);
}, "org.eclipse.core.resources.IResource");
c$.buildStarting = Clazz.defineMethod (c$, "buildStarting", 
function () {
});
c$.buildFinished = Clazz.defineMethod (c$, "buildFinished", 
function () {
net.sf.j2s.core.builder.BuildNotifier.resetProblemCounters ();
});
c$.removeProblemsFor = Clazz.defineMethod (c$, "removeProblemsFor", 
function (resource) {
try {
if (resource != null && resource.exists ()) {
resource.deleteMarkers ("org.eclipse.jdt.core.problem", false, 2);
var markerTypes = org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ().compilationParticipants.managedMarkerTypes ();
if (markerTypes.size () == 0) return ;
var iterator = markerTypes.iterator ();
while (iterator.hasNext ()) resource.deleteMarkers (iterator.next (), false, 2);

}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
}, "org.eclipse.core.resources.IResource");
c$.removeTasksFor = Clazz.defineMethod (c$, "removeTasksFor", 
function (resource) {
try {
if (resource != null && resource.exists ()) resource.deleteMarkers ("org.eclipse.jdt.core.task", false, 2);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
}, "org.eclipse.core.resources.IResource");
c$.removeProblemsAndTasksFor = Clazz.defineMethod (c$, "removeProblemsAndTasksFor", 
function (resource) {
try {
if (resource != null && resource.exists ()) {
resource.deleteMarkers ("org.eclipse.jdt.core.problem", false, 2);
resource.deleteMarkers ("org.eclipse.jdt.core.task", false, 2);
var markerTypes = org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ().compilationParticipants.managedMarkerTypes ();
if (markerTypes.size () == 0) return ;
var iterator = markerTypes.iterator ();
while (iterator.hasNext ()) resource.deleteMarkers (iterator.next (), false, 2);

}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
}, "org.eclipse.core.resources.IResource");
c$.readState = Clazz.defineMethod (c$, "readState", 
function (project, $in) {
return net.sf.j2s.core.builder.State.read (project, $in);
}, "org.eclipse.core.resources.IProject,java.io.DataInputStream");
c$.writeState = Clazz.defineMethod (c$, "writeState", 
function (state, out) {
(state).write (out);
}, "~O,java.io.DataOutputStream");
Clazz.overrideMethod (c$, "build", 
function (kind, ignored, monitor) {
this.currentProject = this.getProject ();
if (this.currentProject == null || !this.currentProject.isAccessible ()) return  new Array (0);
var j2sDeployMode = this.getDeployMode ();
if (j2sDeployMode.equals ("") || j2sDeployMode == null) {
return  new Array (0);
}if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("\nStarting build of " + this.currentProject.getName () + " @ " +  new java.util.Date (System.currentTimeMillis ()));
this.notifier =  new net.sf.j2s.core.builder.BuildNotifier (monitor, this.currentProject, j2sDeployMode, "Build");
this.notifier.begin ();
var ok = false;
try {
this.notifier.checkCancel ();
kind = this.initializeBuilder (kind, true);
if (this.isWorthBuilding ()) {
if (kind == 6) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Performing full build as requested by user");
this.buildAll ();
} else {
if ((this.lastState = this.getLastState (this.currentProject)) == null) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Performing full build since last saved state was not found");
this.buildAll ();
} else if (this.hasClasspathChanged ()) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Performing full build since classpath has changed");
this.buildAll ();
} else if (this.nameEnvironment.sourceLocations.length > 0) {
var deltas = this.findDeltas ();
if (deltas == null) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Performing full build since deltas are missing after incremental request");
this.buildAll ();
} else if (deltas.elementSize > 0) {
this.buildDeltas (deltas);
} else if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) {
System.out.println ("Nothing to build since deltas were empty");
}} else {
if (this.hasStructuralDelta ()) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Performing full build since there are structural deltas");
this.buildAll ();
} else {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Nothing to build since there are no source folders and no deltas");
this.lastState.tagAsNoopBuild ();
}}}ok = true;
}} catch (e$$) {
if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.CoreException)) {
var e = e$$;
{
org.eclipse.jdt.internal.core.util.Util.log (e, "JavaBuilder handling CoreException while building: " + this.currentProject.getName ());
this.createInconsistentBuildMarker (e);
}
} else if (Clazz.instanceOf (e$$, net.sf.j2s.core.builder.ImageBuilderInternalException)) {
var e = e$$;
{
org.eclipse.jdt.internal.core.util.Util.log (e.getThrowable (), "JavaBuilder handling ImageBuilderInternalException while building: " + this.currentProject.getName ());
this.createInconsistentBuildMarker (e.coreException);
}
} else if (Clazz.instanceOf (e$$, net.sf.j2s.core.builder.MissingSourceFileException)) {
var e = e$$;
{
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_missingSourceFile, e.missingSourceFile));
net.sf.j2s.core.builder.JavaBuilder.removeProblemsAndTasksFor (this.currentProject);
var marker = this.currentProject.createMarker ("org.eclipse.jdt.core.problem");
marker.setAttributes (["message", "severity", "sourceId"], [org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_missingSourceFile, e.missingSourceFile),  new Integer (2), "JDT"]);
}
} else {
throw e$$;
}
} finally {
for (var i = 0, l = this.participants == null ? 0 : this.participants.length; i < l; i++) this.participants[i].buildFinished (this.javaProject);

if (!ok) this.clearLastState ();
this.notifier.done ();
this.cleanup ();
}
var requiredProjects = this.getRequiredProjects (true);
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Finished build of " + this.currentProject.getName () + " @ " +  new java.util.Date (System.currentTimeMillis ()));
return requiredProjects;
}, "~N,java.util.Map,org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "buildAll", 
($fz = function () {
this.notifier.checkCancel ();
this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_preparingBuild, this.currentProject.getName ()));
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG && this.lastState != null) System.out.println ("Clearing last state : " + this.lastState);
this.clearLastState ();
var imageBuilder =  new net.sf.j2s.core.builder.Java2ScriptBatchImageBuilder (this, true);
imageBuilder.build ();
this.recordNewState (imageBuilder.newState);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "buildDeltas", 
($fz = function (deltas) {
this.notifier.checkCancel ();
this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_preparingBuild, this.currentProject.getName ()));
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG && this.lastState != null) System.out.println ("Clearing last state : " + this.lastState);
this.clearLastState ();
var imageBuilder =  new net.sf.j2s.core.builder.Java2ScriptIncrementalImageBuilder (this);
if (imageBuilder.build (deltas)) {
this.recordNewState (imageBuilder.newState);
} else {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Performing full build since incremental build failed");
this.buildAll ();
}}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.internal.compiler.util.SimpleLookupTable");
Clazz.defineMethod (c$, "getDeployMode", 
($fz = function () {
var j2sDeployMode = null;
var file =  new java.io.File (this.currentProject.getLocation ().toOSString (), ".j2s");
if (!file.exists ()) {
return j2sDeployMode;
}var props =  new java.util.Properties ();
try {
props.load ( new java.io.FileInputStream (file));
j2sDeployMode = props.getProperty ("j2s.deploy.mode", null);
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e1 = e$$;
{
e1.printStackTrace ();
return j2sDeployMode;
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e1 = e$$;
{
e1.printStackTrace ();
return j2sDeployMode;
}
} else {
throw e$$;
}
}
return j2sDeployMode;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "clean", 
function (monitor) {
this.currentProject = this.getProject ();
if (this.currentProject == null || !this.currentProject.isAccessible ()) return ;
var j2sDeployMode = this.getDeployMode ();
if (j2sDeployMode.equals ("") || j2sDeployMode == null) {
return ;
}if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("\nCleaning " + this.currentProject.getName () + " @ " +  new java.util.Date (System.currentTimeMillis ()));
this.notifier =  new net.sf.j2s.core.builder.BuildNotifier (monitor, this.currentProject, j2sDeployMode, "Clean");
this.notifier.begin ();
try {
this.notifier.checkCancel ();
this.initializeBuilder (15, true);
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Clearing last state as part of clean : " + this.lastState);
this.clearLastState ();
net.sf.j2s.core.builder.JavaBuilder.removeProblemsAndTasksFor (this.currentProject);
 new net.sf.j2s.core.builder.BatchImageBuilder (this, false).cleanOutputFolders (false);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
org.eclipse.jdt.internal.core.util.Util.log (e, "JavaBuilder handling CoreException while cleaning: " + this.currentProject.getName ());
this.createInconsistentBuildMarker (e);
} else {
throw e;
}
} finally {
this.notifier.done ();
this.cleanup ();
}
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Finished cleaning " + this.currentProject.getName () + " @ " +  new java.util.Date (System.currentTimeMillis ()));
}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "createInconsistentBuildMarker", 
($fz = function (coreException) {
var message = null;
var status = coreException.getStatus ();
if (status.isMultiStatus ()) {
var children = status.getChildren ();
if (children != null && children.length > 0) message = children[0].getMessage ();
}if (message == null) message = coreException.getMessage ();
var marker = this.currentProject.createMarker ("org.eclipse.jdt.core.problem");
marker.setAttributes (["message", "severity", "categoryId", "sourceId"], [org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_inconsistentProject, message),  new Integer (2),  new Integer (10), "JDT"]);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.CoreException");
Clazz.defineMethod (c$, "cleanup", 
($fz = function () {
this.participants = null;
this.nameEnvironment = null;
this.binaryLocationsPerProject = null;
this.lastState = null;
this.notifier.resetProblemCounters ();
this.notifier = null;
this.extraResourceFileFilters = null;
this.extraResourceFolderFilters = null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "clearLastState", 
($fz = function () {
org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ().setLastBuiltState (this.currentProject, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "filterExtraResource", 
function (resource) {
if (this.extraResourceFileFilters != null) {
var name = resource.getName ().toCharArray ();
for (var i = 0, l = this.extraResourceFileFilters.length; i < l; i++) if (org.eclipse.jdt.core.compiler.CharOperation.match (this.extraResourceFileFilters[i], name, true)) return true;

}if (this.extraResourceFolderFilters != null) {
var path = resource.getProjectRelativePath ();
var pathName = path.toString ();
var count = path.segmentCount ();
if (resource.getType () == 1) count--;
for (var i = 0, l = this.extraResourceFolderFilters.length; i < l; i++) if (pathName.indexOf (this.extraResourceFolderFilters[i]) != -1) for (var j = 0; j < count; j++) if (this.extraResourceFolderFilters[i].equals (path.segment (j))) return true;


}return false;
}, "org.eclipse.core.resources.IResource");
Clazz.defineMethod (c$, "findDeltas", 
($fz = function () {
this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_readingDelta, this.currentProject.getName ()));
var delta = this.getDelta (this.currentProject);
var deltas =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (3);
if (delta != null) {
if (delta.getKind () != 0) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found source delta for: " + this.currentProject.getName ());
deltas.put (this.currentProject, delta);
}} else {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Missing delta for: " + this.currentProject.getName ());
this.notifier.subTask ("");
return null;
}var keyTable = this.binaryLocationsPerProject.keyTable;
var valueTable = this.binaryLocationsPerProject.valueTable;
nextProject : for (var i = 0, l = keyTable.length; i < l; i++) {
var p = keyTable[i];
if (p != null && p !== this.currentProject) {
var s = this.getLastState (p);
if (!this.lastState.wasStructurallyChanged (p, s)) {
if (s.wasNoopBuild ()) continue nextProject;var classFoldersAndJars = valueTable[i];
var canSkip = true;
for (var j = 0, m = classFoldersAndJars.length; j < m; j++) {
if (classFoldersAndJars[j].isOutputFolder ()) classFoldersAndJars[j] = null;
 else canSkip = false;
}
if (canSkip) continue nextProject;}this.notifier.subTask (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_readingDelta, p.getName ()));
delta = this.getDelta (p);
if (delta != null) {
if (delta.getKind () != 0) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Found binary delta for: " + p.getName ());
deltas.put (p, delta);
}} else {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Missing delta for: " + p.getName ());
this.notifier.subTask ("");
return null;
}}}
this.notifier.subTask ("");
return deltas;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getLastState", 
function (project) {
var lastBuiltState = org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ().getLastBuiltState (project, this.notifier.monitor);
if (lastBuiltState == null) {
return null;
}var baos =  new java.io.ByteArrayOutputStream ();
var out =  new java.io.DataOutputStream (baos);
try {
org.eclipse.jdt.internal.core.builder.JavaBuilder.writeState (lastBuiltState, out);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
var bais =  new java.io.ByteArrayInputStream (baos.toByteArray ());
var $in =  new java.io.DataInputStream (bais);
var state = null;
try {
state = net.sf.j2s.core.builder.State.read (project, $in);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return state;
}, "org.eclipse.core.resources.IProject");
Clazz.defineMethod (c$, "getRequiredProjects", 
($fz = function (includeBinaryPrerequisites) {
if (this.javaProject == null || this.workspaceRoot == null) return  new Array (0);
var projects =  new java.util.ArrayList ();
var externalFoldersManager = org.eclipse.jdt.internal.core.JavaModelManager.getExternalManager ();
try {
var entries = this.javaProject.getExpandedClasspath ();
for (var i = 0, l = entries.length; i < l; i++) {
var entry = entries[i];
var path = entry.getPath ();
var p = null;
switch (entry.getEntryKind ()) {
case 2:
p = this.workspaceRoot.getProject (path.lastSegment ());
if ((entry).isOptional () && !org.eclipse.jdt.internal.core.JavaProject.hasJavaNature (p)) p = null;
break;
case 1:
if (includeBinaryPrerequisites && path.segmentCount () > 1) {
var resource = this.workspaceRoot.findMember (path.segment (0));
if (Clazz.instanceOf (resource, org.eclipse.core.resources.IProject)) {
p = resource;
} else {
resource = externalFoldersManager.getFolder (path);
if (resource != null) p = resource.getProject ();
}}}
if (p != null && !projects.contains (p)) projects.add (p);
}
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jdt.core.JavaModelException)) {
return  new Array (0);
} else {
throw e;
}
}
var result =  new Array (projects.size ());
projects.toArray (result);
return result;
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "hasBuildpathErrors", 
function () {
var markers = this.currentProject.findMarkers ("org.eclipse.jdt.core.problem", false, 0);
for (var i = 0, l = markers.length; i < l; i++) if (markers[i].getAttribute ("categoryId", -1) == 10) return true;

return false;
});
Clazz.defineMethod (c$, "hasClasspathChanged", 
($fz = function () {
var newSourceLocations = this.nameEnvironment.sourceLocations;
var oldSourceLocations = this.lastState.sourceLocations;
var newLength = newSourceLocations.length;
var oldLength = oldSourceLocations.length;
var n;
var o;
for (n = o = 0; n < newLength && o < oldLength; n++, o++) {
if (newSourceLocations[n].equals (oldSourceLocations[o])) continue ;try {
if (newSourceLocations[n].sourceFolder.members ().length == 0) {
o--;
continue ;} else if (this.lastState.isSourceFolderEmpty (oldSourceLocations[o].sourceFolder)) {
n--;
continue ;}} catch (ignore) {
if (Clazz.instanceOf (ignore, org.eclipse.core.runtime.CoreException)) {
} else {
throw ignore;
}
}
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) {
System.out.println ("New location: " + newSourceLocations[n] + "\n!= old location: " + oldSourceLocations[o]);
this.printLocations (newSourceLocations, oldSourceLocations);
}return true;
}
while (n < newLength) {
try {
if (newSourceLocations[n].sourceFolder.members ().length == 0) {
n++;
continue ;}} catch (ignore) {
if (Clazz.instanceOf (ignore, org.eclipse.core.runtime.CoreException)) {
} else {
throw ignore;
}
}
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) {
System.out.println ("Added non-empty source folder");
this.printLocations (newSourceLocations, oldSourceLocations);
}return true;
}
while (o < oldLength) {
if (this.lastState.isSourceFolderEmpty (oldSourceLocations[o].sourceFolder)) {
o++;
continue ;}if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) {
System.out.println ("Removed non-empty source folder");
this.printLocations (newSourceLocations, oldSourceLocations);
}return true;
}
var newBinaryLocations = this.nameEnvironment.binaryLocations;
var oldBinaryLocations = this.lastState.binaryLocations;
newLength = newBinaryLocations.length;
oldLength = oldBinaryLocations.length;
for (n = o = 0; n < newLength && o < oldLength; n++, o++) {
if (newBinaryLocations[n].equals (oldBinaryLocations[o])) continue ;if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) {
System.out.println ("New location: " + newBinaryLocations[n] + "\n!= old location: " + oldBinaryLocations[o]);
this.printLocations (newBinaryLocations, oldBinaryLocations);
}return true;
}
if (n < newLength || o < oldLength) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) {
System.out.println ("Number of binary folders/jar files has changed:");
this.printLocations (newBinaryLocations, oldBinaryLocations);
}return true;
}return false;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hasJavaBuilder", 
($fz = function (project) {
var buildCommands = project.getDescription ().getBuildSpec ();
for (var i = 0, l = buildCommands.length; i < l; i++) if (buildCommands[i].getBuilderName ().equals ("org.eclipse.jdt.core.javabuilder")) return true;

return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.resources.IProject");
Clazz.defineMethod (c$, "hasStructuralDelta", 
($fz = function () {
var delta = this.getDelta (this.currentProject);
if (delta != null && delta.getKind () != 0) {
var classFoldersAndJars = this.binaryLocationsPerProject.get (this.currentProject);
if (classFoldersAndJars != null) {
for (var i = 0, l = classFoldersAndJars.length; i < l; i++) {
var classFolderOrJar = classFoldersAndJars[i];
if (classFolderOrJar != null) {
var p = classFolderOrJar.getProjectRelativePath ();
if (p != null) {
var binaryDelta = delta.findMember (p);
if (binaryDelta != null && binaryDelta.getKind () != 0) return true;
}}}
}}return false;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializeBuilder", 
($fz = function (kind, forBuild) {
this.javaProject = org.eclipse.jdt.core.JavaCore.create (this.currentProject);
this.workspaceRoot = this.currentProject.getWorkspace ().getRoot ();
if (forBuild) {
this.participants = org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ().compilationParticipants.getCompilationParticipants (this.javaProject);
if (this.participants != null) for (var i = 0, l = this.participants.length; i < l; i++) if (this.participants[i].aboutToBuild (this.javaProject) == 2) kind = 6;

var projectName = this.currentProject.getName ();
if (net.sf.j2s.core.builder.JavaBuilder.builtProjects == null || net.sf.j2s.core.builder.JavaBuilder.builtProjects.contains (projectName)) {
org.eclipse.jdt.internal.core.JavaModel.flushExternalFileCache ();
($t$ = net.sf.j2s.core.builder.JavaBuilder.builtProjects =  new java.util.ArrayList (), net.sf.j2s.core.builder.JavaBuilder.prototype.builtProjects = net.sf.j2s.core.builder.JavaBuilder.builtProjects, $t$);
}net.sf.j2s.core.builder.JavaBuilder.builtProjects.add (projectName);
}this.binaryLocationsPerProject =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (3);
this.nameEnvironment =  new net.sf.j2s.core.builder.NameEnvironment (this.workspaceRoot, this.javaProject, this.binaryLocationsPerProject, this.notifier);
if (forBuild) {
var filterSequence = this.javaProject.getOption ("org.eclipse.jdt.core.builder.resourceCopyExclusionFilter", true);
var filters = filterSequence != null && filterSequence.length > 0 ? org.eclipse.jdt.core.compiler.CharOperation.splitAndTrimOn (',', filterSequence.toCharArray ()) : null;
if (filters == null) {
this.extraResourceFileFilters = null;
this.extraResourceFolderFilters = null;
} else {
var fileCount = 0;
var folderCount = 0;
for (var i = 0, l = filters.length; i < l; i++) {
var f = filters[i];
if (f.length == 0) continue ;if ((f[f.length - 1]).charCodeAt (0) == ('/').charCodeAt (0)) folderCount++;
 else fileCount++;
}
this.extraResourceFileFilters =  Clazz.newArray (fileCount, '\0');
this.extraResourceFolderFilters =  new Array (folderCount);
for (var i = 0, l = filters.length; i < l; i++) {
var f = filters[i];
if (f.length == 0) continue ;if ((f[f.length - 1]).charCodeAt (0) == ('/').charCodeAt (0)) this.extraResourceFolderFilters[--folderCount] =  String.instantialize (f, 0, f.length - 1);
 else this.extraResourceFileFilters[--fileCount] = f;
}
}}return kind;
}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "isClasspathBroken", 
($fz = function (classpath, p) {
var markers = p.findMarkers ("org.eclipse.jdt.core.buildpath_problem", false, 0);
for (var i = 0, l = markers.length; i < l; i++) if (markers[i].getAttribute ("severity", -1) == 2) return true;

return false;
}, $fz.isPrivate = true, $fz), "~A,org.eclipse.core.resources.IProject");
Clazz.defineMethod (c$, "isWorthBuilding", 
($fz = function () {
var abortBuilds = "abort".equals (this.javaProject.getOption ("org.eclipse.jdt.core.builder.invalidClasspath", true));
if (!abortBuilds) return true;
if (this.isClasspathBroken (this.javaProject.getRawClasspath (), this.currentProject)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Aborted build because project has classpath errors (incomplete or involved in cycle)");
net.sf.j2s.core.builder.JavaBuilder.removeProblemsAndTasksFor (this.currentProject);
var marker = this.currentProject.createMarker ("org.eclipse.jdt.core.problem");
marker.setAttributes (["message", "severity", "categoryId", "sourceId"], [org.eclipse.jdt.internal.core.util.Messages.build_abortDueToClasspathProblems,  new Integer (2),  new Integer (10), "JDT"]);
return false;
}if ("warning".equals (this.javaProject.getOption ("org.eclipse.jdt.core.incompleteClasspath", true))) return true;
var requiredProjects = this.getRequiredProjects (false);
for (var i = 0, l = requiredProjects.length; i < l; i++) {
var p = requiredProjects[i];
if (this.getLastState (p) == null) {
var prereq = org.eclipse.jdt.core.JavaCore.create (p);
if (prereq.hasCycleMarker () && "warning".equals (this.javaProject.getOption ("org.eclipse.jdt.core.circularClasspath", true))) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Continued to build even though prereq project " + p.getName () + " was not built since its part of a cycle");
continue ;}if (!this.hasJavaBuilder (p)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Continued to build even though prereq project " + p.getName () + " is not built by JavaBuilder");
continue ;}if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Aborted build because prereq project " + p.getName () + " was not built");
net.sf.j2s.core.builder.JavaBuilder.removeProblemsAndTasksFor (this.currentProject);
var marker = this.currentProject.createMarker ("org.eclipse.jdt.core.problem");
marker.setAttributes (["message", "severity", "categoryId", "sourceId"], [this.isClasspathBroken (prereq.getRawClasspath (), p) ? org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_prereqProjectHasClasspathProblems, p.getName ()) : org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_prereqProjectMustBeRebuilt, p.getName ()),  new Integer (2),  new Integer (10), "JDT"]);
return false;
}}
return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "mustPropagateStructuralChanges", 
function () {
var cycleParticipants =  new java.util.HashSet (3);
this.javaProject.updateCycleParticipants ( new java.util.ArrayList (), cycleParticipants, this.workspaceRoot,  new java.util.HashSet (3), null);
var currentPath = this.javaProject.getPath ();
var i = cycleParticipants.iterator ();
while (i.hasNext ()) {
var participantPath = i.next ();
if (participantPath !== currentPath) {
var project = this.workspaceRoot.getProject (participantPath.segment (0));
if (this.hasBeenBuilt (project)) {
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Requesting another build iteration since cycle participant " + project.getName () + " has not yet seen some structural changes");
this.needRebuild ();
return ;
}}}
});
Clazz.defineMethod (c$, "printLocations", 
($fz = function (newLocations, oldLocations) {
System.out.println ("New locations:");
for (var i = 0, length = newLocations.length; i < length; i++) System.out.println ("    " + newLocations[i].debugPathString ());

System.out.println ("Old locations:");
for (var i = 0, length = oldLocations.length; i < length; i++) System.out.println ("    " + oldLocations[i].debugPathString ());

}, $fz.isPrivate = true, $fz), "~A,~A");
Clazz.defineMethod (c$, "recordNewState", 
($fz = function (state) {
var keyTable = this.binaryLocationsPerProject.keyTable;
for (var i = 0, l = keyTable.length; i < l; i++) {
var prereqProject = keyTable[i];
if (prereqProject != null && prereqProject !== this.currentProject) state.recordStructuralDependency (prereqProject, this.getLastState (prereqProject));
}
var baos =  new java.io.ByteArrayOutputStream ();
var out =  new java.io.DataOutputStream (baos);
try {
state.write (out);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
var bais =  new java.io.ByteArrayInputStream (baos.toByteArray ());
var $in =  new java.io.DataInputStream (bais);
var newState = null;
try {
newState = org.eclipse.jdt.internal.core.builder.JavaBuilder.readState (this.currentProject, $in);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
if (net.sf.j2s.core.builder.JavaBuilder.DEBUG) System.out.println ("Recording new state : " + state);
org.eclipse.jdt.internal.core.JavaModelManager.getJavaModelManager ().setLastBuiltState (this.currentProject, newState);
}, $fz.isPrivate = true, $fz), "net.sf.j2s.core.builder.State");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.currentProject == null ? "JavaBuilder for unknown project" : "JavaBuilder for " + this.currentProject.getName ();
});
Clazz.defineStatics (c$,
"SOURCE_ID", "JDT",
"J2S_DEPLOY_MODE", "j2s.deploy.mode",
"DEBUG", false,
"SHOW_STATS", false,
"builtProjects", null);
});
