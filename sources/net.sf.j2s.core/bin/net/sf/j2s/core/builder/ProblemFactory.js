Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["org.eclipse.jdt.internal.compiler.problem.DefaultProblemFactory", "org.eclipse.jdt.internal.compiler.util.SimpleLookupTable"], "net.sf.j2s.core.builder.ProblemFactory", null, function () {
c$ = Clazz.declareType (net.sf.j2s.core.builder, "ProblemFactory", org.eclipse.jdt.internal.compiler.problem.DefaultProblemFactory);
c$.getProblemFactory = Clazz.defineMethod (c$, "getProblemFactory", 
function (locale) {
var factory = net.sf.j2s.core.builder.ProblemFactory.factories.get (locale);
if (factory == null) net.sf.j2s.core.builder.ProblemFactory.factories.put (locale, factory =  new net.sf.j2s.core.builder.ProblemFactory (locale));
return factory;
}, "java.util.Locale");
c$.factories = c$.prototype.factories =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (5);
});
