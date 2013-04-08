Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (["net.sf.j2s.core.compiler.IExtendedVisitor"], "net.sf.j2s.core.compiler.ASTExtendedVisitor", ["net.sf.j2s.core.astvisitors.ASTScriptVisitor", "$.DependencyASTVisitor"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.compiler, "ASTExtendedVisitor", null, net.sf.j2s.core.compiler.IExtendedVisitor);
Clazz.overrideMethod (c$, "getScriptVisitor", 
function () {
return  new net.sf.j2s.core.astvisitors.ASTScriptVisitor ();
});
Clazz.overrideMethod (c$, "getDependencyVisitor", 
function () {
return  new net.sf.j2s.core.astvisitors.DependencyASTVisitor ();
});
});
