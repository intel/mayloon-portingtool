Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.AbstractPluginVisitor"], "net.sf.j2s.core.astvisitors.ASTFieldVisitor", null, function () {
c$ = Clazz.declareType (net.sf.j2s.core.astvisitors, "ASTFieldVisitor", net.sf.j2s.core.astvisitors.AbstractPluginVisitor);
Clazz.defineMethod (c$, "checkKeyworkViolation", 
function (name) {
for (var i = 0; i < net.sf.j2s.core.astvisitors.ASTFieldVisitor.keywods.length; i++) {
if (net.sf.j2s.core.astvisitors.ASTFieldVisitor.keywods[i].equals (name)) {
return true;
}}
return false;
}, "~S");
Clazz.defineMethod (c$, "isSimpleQualified", 
function (node) {
var qualifier = node.getQualifier ();
if (Clazz.instanceOf (qualifier, org.eclipse.jdt.core.dom.SimpleName)) {
return true;
} else if (Clazz.instanceOf (qualifier, org.eclipse.jdt.core.dom.QualifiedName)) {
return this.isSimpleQualified (qualifier);
}return false;
}, "org.eclipse.jdt.core.dom.QualifiedName");
Clazz.defineMethod (c$, "isFieldNeedPreparation", 
function (node) {
if ((node.getModifiers () & 8) != 0) {
return false;
}var fragments = node.fragments ();
for (var iter = fragments.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var initializer = element.getInitializer ();
if (initializer != null) {
var constValue = initializer.resolveConstantExpressionValue ();
if (constValue != null && (Clazz.instanceOf (constValue, Number) || Clazz.instanceOf (constValue, Character) || Clazz.instanceOf (constValue, Boolean) || Clazz.instanceOf (constValue, String))) {
return false;
}if (Clazz.instanceOf (initializer, org.eclipse.jdt.core.dom.NullLiteral)) {
return false;
}return true;
} else {
return false;
}}
return false;
}, "org.eclipse.jdt.core.dom.FieldDeclaration");
c$.keywods = c$.prototype.keywods = ["class", "for", "while", "do", "in", "return", "function", "var", "class", "pubic", "protected", "private", "new", "delete", "static", "package", "import", "extends", "implements", "instanceof", "typeof", "void", "if", "this", "super", "prototype", "else", "break", "true", "fasle", "try", "catch", "throw", "throws", "continue", "switch", "default", "case", "export", "import", "const", "with", "arguments", "valueOf"];
});
