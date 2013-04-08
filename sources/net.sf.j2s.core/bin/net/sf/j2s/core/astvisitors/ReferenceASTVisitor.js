Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["org.eclipse.jdt.core.dom.ASTVisitor"], "net.sf.j2s.core.astvisitors.ReferenceASTVisitor", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$isReferenced = false;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "ReferenceASTVisitor", org.eclipse.jdt.core.dom.ASTVisitor);
Clazz.defineMethod (c$, "visit", 
function (node) {
var constValue = node.resolveConstantExpressionValue ();
if (constValue != null && (Clazz.instanceOf (constValue, Number) || Clazz.instanceOf (constValue, Boolean))) {
return false;
}this.$isReferenced = true;
return false;
}, "org.eclipse.jdt.core.dom.SimpleName");
Clazz.defineMethod (c$, "isReferenced", 
function () {
return this.$isReferenced;
});
Clazz.defineMethod (c$, "setReferenced", 
function (isReferenced) {
this.$isReferenced = isReferenced;
}, "~B");
});
