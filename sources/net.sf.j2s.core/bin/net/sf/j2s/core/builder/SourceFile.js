Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["org.eclipse.jdt.internal.compiler.env.ICompilationUnit"], "net.sf.j2s.core.builder.SourceFile", ["net.sf.j2s.core.builder.MissingSourceFileException", "org.eclipse.jdt.core.compiler.CharOperation", "org.eclipse.jdt.internal.compiler.problem.AbortCompilation", "org.eclipse.jdt.internal.core.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resource = null;
this.sourceLocation = null;
this.initialTypeName = null;
this.updateClassFile = false;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "SourceFile", null, org.eclipse.jdt.internal.compiler.env.ICompilationUnit);
Clazz.makeConstructor (c$, 
function (resource, sourceLocation) {
this.resource = resource;
this.sourceLocation = sourceLocation;
this.initialTypeName = this.extractTypeName ();
this.updateClassFile = false;
}, "org.eclipse.core.resources.IFile,net.sf.j2s.core.builder.ClasspathMultiDirectory");
Clazz.makeConstructor (c$, 
function (resource, sourceLocation, updateClassFile) {
this.construct (resource, sourceLocation);
this.updateClassFile = updateClassFile;
}, "org.eclipse.core.resources.IFile,net.sf.j2s.core.builder.ClasspathMultiDirectory,~B");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (this === o) return true;
if (!(Clazz.instanceOf (o, net.sf.j2s.core.builder.SourceFile))) return false;
var f = o;
return this.sourceLocation === f.sourceLocation && this.resource.getFullPath ().equals (f.resource.getFullPath ());
}, "~O");
Clazz.defineMethod (c$, "extractTypeName", 
function () {
var fullPath = this.resource.getFullPath ();
var resourceSegmentCount = fullPath.segmentCount ();
var sourceFolderSegmentCount = this.sourceLocation.sourceFolder.getFullPath ().segmentCount ();
var charCount = (resourceSegmentCount - sourceFolderSegmentCount - 1);
resourceSegmentCount--;
for (var i = sourceFolderSegmentCount; i < resourceSegmentCount; i++) charCount += fullPath.segment (i).length;

var lastSegment = fullPath.segment (resourceSegmentCount);
var extensionIndex = org.eclipse.jdt.internal.core.util.Util.indexOfJavaLikeExtension (lastSegment);
charCount += extensionIndex;
var result =  Clazz.newArray (charCount, '\0');
var offset = 0;
for (var i = sourceFolderSegmentCount; i < resourceSegmentCount; i++) {
var segment = fullPath.segment (i);
var size = segment.length;
segment.getChars (0, size, result, offset);
offset += size;
result[offset++] = '/';
}
lastSegment.getChars (0, extensionIndex, result, offset);
return  String.instantialize (result);
});
Clazz.overrideMethod (c$, "getContents", 
function () {
try {
return org.eclipse.jdt.internal.core.util.Util.getResourceContentsAsCharArray (this.resource);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
throw  new org.eclipse.jdt.internal.compiler.problem.AbortCompilation (true,  new net.sf.j2s.core.builder.MissingSourceFileException (this.resource.getFullPath ().toString ()));
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getFileName", 
function () {
return this.resource.getFullPath ().toString ().toCharArray ();
});
Clazz.overrideMethod (c$, "getMainTypeName", 
function () {
var typeName = this.initialTypeName.toCharArray ();
var lastIndex = org.eclipse.jdt.core.compiler.CharOperation.lastIndexOf ('/', typeName);
return org.eclipse.jdt.core.compiler.CharOperation.subarray (typeName, lastIndex + 1, -1);
});
Clazz.overrideMethod (c$, "getPackageName", 
function () {
var typeName = this.initialTypeName.toCharArray ();
var lastIndex = org.eclipse.jdt.core.compiler.CharOperation.lastIndexOf ('/', typeName);
return org.eclipse.jdt.core.compiler.CharOperation.splitOn ('/', typeName, 0, lastIndex);
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.initialTypeName.hashCode ();
});
Clazz.defineMethod (c$, "typeLocator", 
function () {
return this.resource.getProjectRelativePath ().toString ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "SourceFile[" + this.resource.getFullPath () + "]";
});
Clazz.defineMethod (c$, "ignoreOptionalProblems", 
function () {
return false;
});
});
