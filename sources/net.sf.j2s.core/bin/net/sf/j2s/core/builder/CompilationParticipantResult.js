Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["org.eclipse.jdt.core.compiler.BuildContext"], "net.sf.j2s.core.builder.CompilationParticipantResult", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.sourceFile = null;
this.$hasAnnotations = false;
this.addedFiles = null;
this.deletedFiles = null;
this.problems = null;
this.dependencies = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "CompilationParticipantResult", org.eclipse.jdt.core.compiler.BuildContext);
Clazz.makeConstructor (c$, 
function (sourceFile) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.CompilationParticipantResult, []);
this.sourceFile = sourceFile;
this.$hasAnnotations = false;
this.addedFiles = null;
this.deletedFiles = null;
this.problems = null;
this.dependencies = null;
}, "net.sf.j2s.core.builder.SourceFile");
Clazz.overrideMethod (c$, "getContents", 
function () {
return this.sourceFile.getContents ();
});
Clazz.overrideMethod (c$, "getFile", 
function () {
return this.sourceFile.resource;
});
Clazz.overrideMethod (c$, "hasAnnotations", 
function () {
return this.$hasAnnotations;
});
Clazz.overrideMethod (c$, "recordAddedGeneratedFiles", 
function (addedGeneratedFiles) {
var length2 = addedGeneratedFiles.length;
if (length2 == 0) return ;
var length1 = this.addedFiles == null ? 0 : this.addedFiles.length;
var merged =  new Array (length1 + length2);
if (length1 > 0) System.arraycopy (this.addedFiles, 0, merged, 0, length1);
System.arraycopy (addedGeneratedFiles, 0, merged, length1, length2);
this.addedFiles = merged;
}, "~A");
Clazz.overrideMethod (c$, "recordDeletedGeneratedFiles", 
function (deletedGeneratedFiles) {
var length2 = deletedGeneratedFiles.length;
if (length2 == 0) return ;
var length1 = this.deletedFiles == null ? 0 : this.deletedFiles.length;
var merged =  new Array (length1 + length2);
if (length1 > 0) System.arraycopy (this.deletedFiles, 0, merged, 0, length1);
System.arraycopy (deletedGeneratedFiles, 0, merged, length1, length2);
this.deletedFiles = merged;
}, "~A");
Clazz.overrideMethod (c$, "recordDependencies", 
function (typeNameDependencies) {
var length2 = typeNameDependencies.length;
if (length2 == 0) return ;
var length1 = this.dependencies == null ? 0 : this.dependencies.length;
var merged =  new Array (length1 + length2);
if (length1 > 0) System.arraycopy (this.dependencies, 0, merged, 0, length1);
System.arraycopy (typeNameDependencies, 0, merged, length1, length2);
this.dependencies = merged;
}, "~A");
Clazz.overrideMethod (c$, "recordNewProblems", 
function (newProblems) {
var length2 = newProblems.length;
if (length2 == 0) return ;
var length1 = this.problems == null ? 0 : this.problems.length;
var merged =  new Array (length1 + length2);
if (length1 > 0) System.arraycopy (this.problems, 0, merged, 0, length1);
System.arraycopy (newProblems, 0, merged, length1, length2);
this.problems = merged;
}, "~A");
Clazz.defineMethod (c$, "reset", 
function (detectedAnnotations) {
this.$hasAnnotations = detectedAnnotations;
this.addedFiles = null;
this.deletedFiles = null;
this.problems = null;
this.dependencies = null;
}, "~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.sourceFile.toString ();
});
});
