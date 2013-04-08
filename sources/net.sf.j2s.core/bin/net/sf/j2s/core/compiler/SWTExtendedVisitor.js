Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (["net.sf.j2s.core.compiler.IExtendedVisitor"], "net.sf.j2s.core.compiler.SWTExtendedVisitor", ["net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor", "$.SWTScriptVisitor"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.compiler, "SWTExtendedVisitor", null, net.sf.j2s.core.compiler.IExtendedVisitor);
Clazz.overrideMethod (c$, "getScriptVisitor", 
function () {
return  new net.sf.j2s.core.astvisitors.SWTScriptVisitor ();
});
Clazz.overrideMethod (c$, "getDependencyVisitor", 
function () {
return  new net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor ();
});
});
