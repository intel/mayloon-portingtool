Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (["org.eclipse.jdt.internal.compiler.Compiler"], "net.sf.j2s.core.compiler.Java2ScriptImageCompiler", ["java.util.ArrayList", "net.sf.j2s.core.builder.ClasspathDirectoryProxy", "$.NameEnvironmentProxy", "net.sf.j2s.core.compiler.ExtendedCompilers"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sourceUnits = null;
this.binaryFolder = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.compiler, "Java2ScriptImageCompiler", org.eclipse.jdt.internal.compiler.Compiler);
Clazz.defineMethod (c$, "compile", 
function (sourceUnits) {
this.binaryFolder = null;
var nameEnv = this.lookupEnvironment.nameEnvironment;
if (Clazz.instanceOf (nameEnv, net.sf.j2s.core.builder.NameEnvironment)) {
var env = nameEnv;
var binaryLocations =  new net.sf.j2s.core.builder.NameEnvironmentProxy (env).getBinaryLocations ();
for (var j = 0; j < binaryLocations.length; j++) {
if (binaryLocations[j].isOutputFolder ()) {
if (Clazz.instanceOf (binaryLocations[j], net.sf.j2s.core.builder.ClasspathDirectory)) {
this.binaryFolder =  new net.sf.j2s.core.builder.ClasspathDirectoryProxy (binaryLocations[j]).getBinaryFolder ();
break;
}}}
}this.sourceUnits =  new java.util.ArrayList ();
Clazz.superCall (this, net.sf.j2s.core.compiler.Java2ScriptImageCompiler, "compile", [sourceUnits]);
}, "~A");
Clazz.defineMethod (c$, "addCompilationUnit", 
function (sourceUnit, parsedUnit) {
this.sourceUnits.add (sourceUnit);
Clazz.superCall (this, net.sf.j2s.core.compiler.Java2ScriptImageCompiler, "addCompilationUnit", [sourceUnit, parsedUnit]);
}, "org.eclipse.jdt.internal.compiler.env.ICompilationUnit,org.eclipse.jdt.internal.compiler.ast.CompilationUnitDeclaration");
Clazz.overrideMethod (c$, "process", 
function (unit, i) {
if (this.binaryFolder != null) {
var sourceUnit = this.sourceUnits.get (i);
net.sf.j2s.core.compiler.ExtendedCompilers.process (sourceUnit, this.binaryFolder);
this.sourceUnits.set (i,  String.instantialize ());
}this.lookupEnvironment.unitBeingCompleted = unit;
var parseStart = System.currentTimeMillis ();
this.parser.getMethodBodies (unit);
var resolveStart = System.currentTimeMillis ();
this.stats.parseTime += resolveStart - parseStart;
if (unit.scope != null) unit.scope.faultInTypes ();
if (unit.scope != null) unit.scope.verifyMethods (this.lookupEnvironment.methodVerifier ());
unit.resolve ();
var analyzeStart = System.currentTimeMillis ();
this.stats.resolveTime += analyzeStart - resolveStart;
unit.analyseCode ();
var generateStart = System.currentTimeMillis ();
this.stats.analyzeTime += generateStart - analyzeStart;
unit.generateCode ();
if (this.options.produceReferenceInfo && unit.scope != null) unit.scope.storeDependencyInfo ();
unit.finalizeProblems ();
this.stats.generateTime += System.currentTimeMillis () - generateStart;
unit.$compilationResult.totalUnitsKnown = this.totalUnits;
this.lookupEnvironment.unitBeingCompleted = null;
}, "org.eclipse.jdt.internal.compiler.ast.CompilationUnitDeclaration,~N");
});
