Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["net.sf.j2s.core.builder.IncrementalImageBuilder"], "net.sf.j2s.core.builder.Java2ScriptIncrementalImageBuilder", ["java.util.Locale", "net.sf.j2s.core.builder.ProblemFactory", "net.sf.j2s.core.compiler.Java2ScriptImageCompiler", "org.eclipse.jdt.internal.compiler.DefaultErrorHandlingPolicies", "org.eclipse.jdt.internal.compiler.impl.CompilerOptions"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.builder, "Java2ScriptIncrementalImageBuilder", net.sf.j2s.core.builder.IncrementalImageBuilder);
Clazz.overrideMethod (c$, "newCompiler", 
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
var newCompiler =  new net.sf.j2s.core.compiler.Java2ScriptImageCompiler (this.nameEnvironment, org.eclipse.jdt.internal.compiler.DefaultErrorHandlingPolicies.proceedWithAllProblems (), compilerOptions, this, net.sf.j2s.core.builder.ProblemFactory.getProblemFactory (java.util.Locale.getDefault ()));
var options = newCompiler.options;
var setting = System.getProperty ("jdt.compiler.useSingleThread");
newCompiler.useSingleThread = setting != null && setting.equals ("true");
options.produceReferenceInfo = true;
if (options.complianceLevel >= 3276800 && options.processAnnotations) {
this.initializeAnnotationProcessorManager (newCompiler);
}return newCompiler;
});
});
