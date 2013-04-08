Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.AbstractPluginVisitor"], "net.sf.j2s.core.astvisitors.ASTTigerVisitor", ["org.eclipse.jdt.core.dom.PrimitiveType"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.astvisitors, "ASTTigerVisitor", net.sf.j2s.core.astvisitors.AbstractPluginVisitor);
Clazz.defineMethod (c$, "boxingNode", 
function (element) {
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Expression)) {
var exp = element;
if (exp.resolveBoxing ()) {
var typeBinding = exp.resolveTypeBinding ();
if (typeBinding.isPrimitive ()) {
var name = typeBinding.getName ();
var type = org.eclipse.jdt.core.dom.PrimitiveType.toCode (name);
var primitiveTypeName = null;
if (type === org.eclipse.jdt.core.dom.PrimitiveType.INT) {
primitiveTypeName = "Integer";
} else if (type === org.eclipse.jdt.core.dom.PrimitiveType.LONG) {
primitiveTypeName = "Long";
} else if (type === org.eclipse.jdt.core.dom.PrimitiveType.FLOAT) {
primitiveTypeName = "Float";
} else if (type === org.eclipse.jdt.core.dom.PrimitiveType.DOUBLE) {
primitiveTypeName = "Double";
} else if (type === org.eclipse.jdt.core.dom.PrimitiveType.BOOLEAN) {
primitiveTypeName = "Boolean";
} else if (type === org.eclipse.jdt.core.dom.PrimitiveType.BYTE) {
primitiveTypeName = "Byte";
} else if (type === org.eclipse.jdt.core.dom.PrimitiveType.SHORT) {
primitiveTypeName = "Short";
} else if (type === org.eclipse.jdt.core.dom.PrimitiveType.CHAR) {
primitiveTypeName = "Character";
}if (primitiveTypeName != null) {
this.getBuffer ().append ("new " + primitiveTypeName + " (");
element.accept (this.visitor);
this.getBuffer ().append (")");
return ;
}}} else if (exp.resolveUnboxing ()) {
var typeBinding = exp.resolveTypeBinding ();
if (!typeBinding.isPrimitive ()) {
var name = typeBinding.getQualifiedName ();
var primitiveName = null;
if ("java.lang.Integer".equals (name)) {
primitiveName = "int";
} else if ("java.lang.Long".equals (name)) {
primitiveName = "long";
} else if ("java.lang.Float".equals (name)) {
primitiveName = "float";
} else if ("java.lang.Double".equals (name)) {
primitiveName = "double";
} else if ("java.lang.Boolean".equals (name)) {
primitiveName = "boolean";
} else if ("java.lang.Byte".equals (name)) {
primitiveName = "byte";
} else if ("java.lang.Short".equals (name)) {
primitiveName = "short";
} else if ("java.lang.Character".equals (name)) {
primitiveName = "char";
}if (primitiveName != null) {
this.getBuffer ().append ("(");
element.accept (this.visitor);
this.getBuffer ().append (")." + primitiveName + "Value ()");
return ;
}}}}element.accept (this.visitor);
}, "org.eclipse.jdt.core.dom.ASTNode");
});
