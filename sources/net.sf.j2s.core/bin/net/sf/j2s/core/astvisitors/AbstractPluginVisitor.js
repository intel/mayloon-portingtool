Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.IPluginVisitor"], "net.sf.j2s.core.astvisitors.AbstractPluginVisitor", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.visitor = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "AbstractPluginVisitor", null, net.sf.j2s.core.astvisitors.IPluginVisitor);
Clazz.overrideMethod (c$, "getBuffer", 
function () {
return this.visitor.getBuffer ();
});
Clazz.overrideMethod (c$, "getVisitor", 
function () {
return this.visitor;
});
Clazz.overrideMethod (c$, "setVisitor", 
function (visitor) {
this.visitor = visitor;
}, "net.sf.j2s.core.astvisitors.ASTEmptyVisitor");
});
