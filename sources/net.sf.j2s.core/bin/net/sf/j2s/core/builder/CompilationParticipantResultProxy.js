Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["net.sf.j2s.core.builder.CompilationParticipantResult"], "net.sf.j2s.core.builder.CompilationParticipantResultProxy", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "CompilationParticipantResultProxy", net.sf.j2s.core.builder.CompilationParticipantResult);
Clazz.makeConstructor (c$, 
function (sourceFile, context) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.CompilationParticipantResultProxy, [sourceFile]);
this.context = context;
}, "net.sf.j2s.core.builder.SourceFile,net.sf.j2s.core.builder.CompilationParticipantResult");
Clazz.defineMethod (c$, "equals", 
function (obj) {
return this.context.equals (obj);
}, "~O");
Clazz.defineMethod (c$, "getContents", 
function () {
return this.context.getContents ();
});
Clazz.defineMethod (c$, "getFile", 
function () {
return this.context.getFile ();
});
Clazz.defineMethod (c$, "hasAnnotations", 
function () {
return this.context.hasAnnotations ();
});
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.context.hashCode ();
});
Clazz.defineMethod (c$, "recordAddedGeneratedFiles", 
function (addedGeneratedFiles) {
this.context.recordAddedGeneratedFiles (addedGeneratedFiles);
}, "~A");
Clazz.defineMethod (c$, "recordDeletedGeneratedFiles", 
function (deletedGeneratedFiles) {
this.context.recordDeletedGeneratedFiles (deletedGeneratedFiles);
}, "~A");
Clazz.defineMethod (c$, "recordDependencies", 
function (typeNameDependencies) {
this.context.recordDependencies (typeNameDependencies);
}, "~A");
Clazz.defineMethod (c$, "recordNewProblems", 
function (newProblems) {
this.context.recordNewProblems (newProblems);
}, "~A");
Clazz.defineMethod (c$, "toString", 
function () {
return this.context.toString ();
});
Clazz.defineMethod (c$, "getSourceFile", 
function () {
return this.context.sourceFile;
});
Clazz.defineMethod (c$, "getHasAnnotations", 
function () {
return this.context.$hasAnnotations;
});
Clazz.defineMethod (c$, "getAddedFiles", 
function () {
return this.context.addedFiles;
});
Clazz.defineMethod (c$, "getDeletedFiles", 
function () {
return this.context.deletedFiles;
});
Clazz.defineMethod (c$, "getProblems", 
function () {
return this.context.problems;
});
Clazz.defineMethod (c$, "getDependencies", 
function () {
return this.context.dependencies;
});
Clazz.defineMethod (c$, "setHasAnnotations", 
function (hasAnnotation) {
this.context.$hasAnnotations = hasAnnotation;
}, "~B");
Clazz.defineMethod (c$, "setAddedFiles", 
function (addedFiles) {
this.context.addedFiles = addedFiles;
}, "~A");
Clazz.defineMethod (c$, "setDeletedFiles", 
function (deletedFiles) {
this.context.deletedFiles = deletedFiles;
}, "~A");
Clazz.defineMethod (c$, "setProblems", 
function (problems) {
this.context.problems = problems;
}, "~A");
Clazz.defineMethod (c$, "setDependencies", 
function (dependencies) {
this.context.dependencies = dependencies;
}, "~A");
});
