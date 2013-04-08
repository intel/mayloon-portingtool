Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.ASTEmptyVisitor", "java.util.Stack"], "net.sf.j2s.core.astvisitors.ASTKeywordVisitor", ["net.sf.j2s.core.astvisitors.ASTFieldVisitor", "$.ASTFinalVariable", "$.ASTPackageVisitor", "$.ASTTigerVisitor", "$.ASTTypeVisitor", "$.ASTVariableVisitor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.blockLevel = 0;
this.methodDeclareStack = null;
this.currentBlockForVisit = -1;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "ASTKeywordVisitor", net.sf.j2s.core.astvisitors.ASTEmptyVisitor);
Clazz.prepareFields (c$, function () {
this.methodDeclareStack =  new java.util.Stack ();
});
Clazz.defineMethod (c$, "boxingNode", 
function (element) {
(this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTigerVisitor)).boxingNode (element);
}, "org.eclipse.jdt.core.dom.ASTNode");
Clazz.defineMethod (c$, "assureQualifiedName", 
function (name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).assureQualifiedName (name);
}, "~S");
Clazz.defineMethod (c$, "shortenQualifiedName", 
function (name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).shortenQualifiedName (name);
}, "~S");
Clazz.defineMethod (c$, "shortenPackageName", 
function (name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).shortenPackageName (name);
}, "~S");
Clazz.defineMethod (c$, "checkConstantValue", 
function (node) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).checkConstantValue (node);
}, "org.eclipse.jdt.core.dom.Expression");
Clazz.defineMethod (c$, "skipDeclarePackages", 
function () {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).skipDeclarePackages ();
});
Clazz.defineMethod (c$, "isSimpleQualified", 
function (node) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTFieldVisitor)).isSimpleQualified (node);
}, "org.eclipse.jdt.core.dom.QualifiedName");
Clazz.defineMethod (c$, "isFieldNeedPreparation", 
function (node) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTFieldVisitor)).isFieldNeedPreparation (node);
}, "org.eclipse.jdt.core.dom.FieldDeclaration");
Clazz.defineMethod (c$, "getIndexedVarName", 
function (name, i) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).getIndexedVarName (name, i);
}, "~S,~N");
Clazz.defineMethod (c$, "visitList", 
function (list, seperator) {
for (var iter = list.iterator (); iter.hasNext (); ) {
var element = iter.next ();
this.boxingNode (element);
if (iter.hasNext ()) {
this.buffer.append (seperator);
}}
}, "java.util.List,~S");
Clazz.defineMethod (c$, "visitList", 
function (list, seperator, begin, end) {
for (var i = begin; i < end; i++) {
var element = list.get (i);
this.boxingNode (element);
if (i < end - 1) {
this.buffer.append (seperator);
}}
}, "java.util.List,~S,~N,~N");
Clazz.defineMethod (c$, "visit", 
function (node) {
node.getArray ().accept (this);
this.buffer.append ('[');
var index = node.getIndex ();
index.accept (this);
var rightTypeBinding = index.resolveTypeBinding ();
if (rightTypeBinding != null && "char".equals (rightTypeBinding.getName ())) {
this.buffer.append (".charCodeAt (0)");
}this.buffer.append (']');
return false;
}, "org.eclipse.jdt.core.dom.ArrayAccess");
Clazz.defineMethod (c$, "visit", 
function (node) {
var initializer = node.getInitializer ();
if (initializer != null) {
initializer.accept (this);
} else {
var dim = node.dimensions ();
var elementType = node.getType ().getElementType ().resolveBinding ();
if (elementType != null) {
if (elementType.isPrimitive ()) {
var typeCode = elementType.getName ();
if ("int".equals (typeCode) || "float".equals (typeCode) || "double".equals (typeCode) || "byte".equals (typeCode) || "long".equals (typeCode) || "short".equals (typeCode)) {
this.buffer.append (" Clazz.newArray (");
this.visitList (dim, ", ");
this.buffer.append (", 0)");
} else if ("char".equals (typeCode)) {
this.buffer.append (" Clazz.newArray (");
this.visitList (dim, ", ");
this.buffer.append (", '\\0')");
} else if ("boolean".equals (typeCode)) {
this.buffer.append (" Clazz.newArray (");
this.visitList (dim, ", ");
this.buffer.append (", false)");
} else {
if (dim != null && dim.size () > 1) {
this.buffer.append (" Clazz.newArray (");
this.visitList (dim, ", ");
this.buffer.append (", null)");
} else {
this.buffer.append (" new Array (");
this.visitList (dim, "");
this.buffer.append (")");
}}} else {
if (dim != null && dim.size () > 1) {
this.buffer.append (" Clazz.newArray (");
this.visitList (dim, ", ");
this.buffer.append (", null)");
} else {
this.buffer.append (" new Array (");
this.visitList (dim, "");
this.buffer.append (")");
}}}}return false;
}, "org.eclipse.jdt.core.dom.ArrayCreation");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("[");
var list = node.expressions ();
this.visitList (list, ", ");
this.buffer.append ("]");
return false;
}, "org.eclipse.jdt.core.dom.ArrayInitializer");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.AssertStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
var left = node.getLeftHandSide ();
var varBinding = null;
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.Name)) {
var leftName = left;
var nameBinding = leftName.resolveBinding ();
if (Clazz.instanceOf (nameBinding, org.eclipse.jdt.core.dom.IVariableBinding)) {
varBinding = nameBinding;
}} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
varBinding = leftAccess.resolveFieldBinding ();
}var declaring = null;
var qName = null;
if (varBinding != null && (varBinding.getModifiers () & 8) != 0 && (declaring = varBinding.getDeclaringClass ()) != null && !(qName = declaring.getQualifiedName ()).startsWith ("org.eclipse.swt.internal.xhtml.") && !qName.startsWith ("net.sf.j2s.html.")) {
if (!(Clazz.instanceOf (left, org.eclipse.jdt.core.dom.SimpleName) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName) && Clazz.instanceOf ((left).getQualifier (), org.eclipse.jdt.core.dom.SimpleName)) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess) && Clazz.instanceOf ((left).getExpression (), org.eclipse.jdt.core.dom.ThisExpression)))) {
this.buffer.append ("(((");
} else {
this.buffer.append ("(");
}if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
if (!(Clazz.instanceOf (leftName.getQualifier (), org.eclipse.jdt.core.dom.SimpleName))) {
leftName.getQualifier ().accept (this);
}} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
if (!(Clazz.instanceOf (leftAccess.getExpression (), org.eclipse.jdt.core.dom.ThisExpression))) {
leftAccess.getExpression ().accept (this);
}}if (!(Clazz.instanceOf (left, org.eclipse.jdt.core.dom.SimpleName) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName) && Clazz.instanceOf ((left).getQualifier (), org.eclipse.jdt.core.dom.SimpleName)) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess) && Clazz.instanceOf ((left).getExpression (), org.eclipse.jdt.core.dom.ThisExpression)))) {
this.buffer.append (") || true) ? ($t$ = ");
} else {
this.buffer.append ("$t$ = ");
}this.buffer.append (this.shortenQualifiedName (varBinding.getDeclaringClass ().getQualifiedName ()));
this.buffer.append ('.');
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
leftName.getName ().accept (this);
} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
leftAccess.getName ().accept (this);
} else {
var leftName = left;
leftName.accept (this);
}this.buffer.append (' ');
var op = node.getOperator ().toString ();
this.buffer.append (op);
var right = node.getRightHandSide ();
this.buffer.append (' ');
this.boxingNode (right);
this.buffer.append (", ");
this.buffer.append (this.shortenQualifiedName (varBinding.getDeclaringClass ().getQualifiedName ()));
this.buffer.append (".prototype.");
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
leftName.getName ().accept (this);
} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
leftAccess.getName ().accept (this);
} else {
var leftName = left;
leftName.accept (this);
}this.buffer.append (" = ");
this.buffer.append (this.shortenQualifiedName (varBinding.getDeclaringClass ().getQualifiedName ()));
this.buffer.append ('.');
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
leftName.getName ().accept (this);
} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
leftAccess.getName ().accept (this);
} else {
var leftName = left;
leftName.accept (this);
}if (!(Clazz.instanceOf (left, org.eclipse.jdt.core.dom.SimpleName) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName) && Clazz.instanceOf ((left).getQualifier (), org.eclipse.jdt.core.dom.SimpleName)) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess) && Clazz.instanceOf ((left).getExpression (), org.eclipse.jdt.core.dom.ThisExpression)))) {
this.buffer.append (", $t$) : 0)");
} else {
this.buffer.append (", $t$)");
}return false;
}var typeBinding = left.resolveTypeBinding ();
var op = node.getOperator ().toString ();
var right = node.getRightHandSide ();
if (typeBinding != null && typeBinding.isPrimitive ()) {
if ("boolean".equals (typeBinding.getName ())) {
if (op.startsWith ("^") || op.startsWith ("|") || op.startsWith ("&")) {
left.accept (this);
this.buffer.append (" = new Boolean (");
left.accept (this);
this.buffer.append (' ');
this.buffer.append (op.charAt (0));
if (Clazz.instanceOf (right, org.eclipse.jdt.core.dom.InfixExpression)) {
this.buffer.append (" (");
right.accept (this);
this.buffer.append ("))");
} else {
this.buffer.append (' ');
right.accept (this);
this.buffer.append (')');
}this.buffer.append (".valueOf ()");
return false;
}} else if (typeBinding != null && "char".equals (typeBinding.getName ())) {
var isMixedOp = op.trim ().length > 1;
if (!isMixedOp) {
if (Clazz.instanceOf (right, org.eclipse.jdt.core.dom.Name) || Clazz.instanceOf (right, org.eclipse.jdt.core.dom.CharacterLiteral) || Clazz.instanceOf (right, org.eclipse.jdt.core.dom.ArrayAccess) || Clazz.instanceOf (right, org.eclipse.jdt.core.dom.FieldAccess) || Clazz.instanceOf (right, org.eclipse.jdt.core.dom.MethodInvocation) || Clazz.instanceOf (right, org.eclipse.jdt.core.dom.ParenthesizedExpression) || Clazz.instanceOf (right, org.eclipse.jdt.core.dom.SuperFieldAccess) || Clazz.instanceOf (right, org.eclipse.jdt.core.dom.SuperMethodInvocation) || Clazz.instanceOf (right, org.eclipse.jdt.core.dom.ThisExpression) || Clazz.instanceOf (right, org.eclipse.jdt.core.dom.CastExpression)) {
left.accept (this);
this.buffer.append (" = ");
right.accept (this);
return false;
}}var rightTypeBinding = right.resolveTypeBinding ();
left.accept (this);
this.buffer.append (" = String.fromCharCode (");
if (isMixedOp) {
this.buffer.append ("(");
left.accept (this);
this.buffer.append (").charCodeAt (0) ");
this.buffer.append (op.charAt (0));
}if (Clazz.instanceOf (right, org.eclipse.jdt.core.dom.InfixExpression)) {
this.buffer.append (" (");
right.accept (this);
this.buffer.append (')');
if ("char".equals (rightTypeBinding.getName ())) {
this.buffer.append (".charCodeAt (0)");
}} else {
this.buffer.append (' ');
if ("char".equals (rightTypeBinding.getName ())) {
this.buffer.append (" (");
right.accept (this);
this.buffer.append (").charCodeAt (0)");
} else {
right.accept (this);
}}this.buffer.append (')');
return false;
}}left.accept (this);
this.buffer.append (' ');
this.buffer.append (op);
this.buffer.append (' ');
var binding = right.resolveTypeBinding ();
if (binding != null && "char".equals (binding.getName ())) {
this.buffer.append ('(');
right.accept (this);
this.buffer.append (").charCodeAt (0)");
} else {
this.boxingNode (right);
}return false;
}, "org.eclipse.jdt.core.dom.Assignment");
Clazz.defineMethod (c$, "endVisit", 
function (node) {
var parent = node.getParent ();
if (!(Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.Block))) {
this.buffer.append ("}");
}var v$ = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).v$;
var normalVars = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).normalVars;
for (var i = v$.size () - 1; i >= 0; i--) {
var $var = v$.get (i);
if ($var.blockLevel >= this.blockLevel) {
v$.remove (i);
}}
for (var i = normalVars.size () - 1; i >= 0; i--) {
var $var = normalVars.get (i);
if ($var.blockLevel >= this.blockLevel) {
normalVars.remove (i);
}}
this.blockLevel--;
Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTKeywordVisitor, "endVisit", [node]);
}, "org.eclipse.jdt.core.dom.Block");
Clazz.defineMethod (c$, "endVisit", 
function (node) {
var v$ = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).v$;
var visitedVars = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).visitedVars;
var normalVars = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).normalVars;
var parameters = node.parameters ();
var methodSig = null;
var resolveBinding = node.resolveBinding ();
if (resolveBinding != null) {
methodSig = resolveBinding.getKey ();
}for (var i = parameters.size () - 1; i >= 0; i--) {
var varDecl = parameters.get (i);
var name = varDecl.getName ();
var binding = name.resolveBinding ();
if (binding != null) {
var identifier = name.getIdentifier ();
var f =  new net.sf.j2s.core.astvisitors.ASTFinalVariable (this.blockLevel + 1, identifier, methodSig);
f.toVariableName = this.getIndexedVarName (identifier, normalVars.size ());
normalVars.remove (f);
if ((binding.getModifiers () & 16) != 0) {
v$.remove (f);
}visitedVars.remove (f);
}}
Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTKeywordVisitor, "endVisit", [node]);
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append (node.booleanValue ());
return false;
}, "org.eclipse.jdt.core.dom.BooleanLiteral");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("break");
var label = node.getLabel ();
if (label != null) {
this.buffer.append (' ');
label.accept (this);
}this.buffer.append (";\r\n");
return false;
}, "org.eclipse.jdt.core.dom.BreakStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append (" catch (");
node.getException ().accept (this);
this.buffer.append (") ");
node.getBody ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.CatchClause");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append (node.getEscapedValue ());
return false;
}, "org.eclipse.jdt.core.dom.CharacterLiteral");
Clazz.defineMethod (c$, "visit", 
function (node) {
node.getExpression ().accept (this);
this.buffer.append (" ? ");
node.getThenExpression ().accept (this);
this.buffer.append (" : ");
node.getElseExpression ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.ConditionalExpression");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("continue ");
var label = node.getLabel ();
if (label != null) {
label.accept (this);
}this.buffer.append (";");
return false;
}, "org.eclipse.jdt.core.dom.ContinueStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("do ");
node.getBody ().accept (this);
this.buffer.append (" while (");
node.getExpression ().accept (this);
this.buffer.append (");\r\n");
return false;
}, "org.eclipse.jdt.core.dom.DoStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append (";");
return false;
}, "org.eclipse.jdt.core.dom.EmptyStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
var name = node.getParameter ().getName ();
var varName = name.getIdentifier ();
this.buffer.append ("for (var ");
this.buffer.append (varName);
this.buffer.append (", $");
this.buffer.append (varName);
this.buffer.append (" = ");
var exp = node.getExpression ();
var typeBinding = exp.resolveTypeBinding ();
if (typeBinding.isArray ()) {
this.buffer.append ("0, $$");
this.buffer.append (varName);
this.buffer.append (" = ");
exp.accept (this);
this.buffer.append ("; $");
this.buffer.append (varName);
this.buffer.append (" < $$");
this.buffer.append (varName);
this.buffer.append (".length && ((");
this.buffer.append (varName);
this.buffer.append (" = $$");
this.buffer.append (varName);
this.buffer.append ("[$");
this.buffer.append (varName);
this.buffer.append ("]) || true); $");
this.buffer.append (varName);
this.buffer.append ("++");
} else {
exp.accept (this);
this.buffer.append (".iterator (); $");
this.buffer.append (varName);
this.buffer.append (".hasNext () && ((");
this.buffer.append (varName);
this.buffer.append (" = $");
this.buffer.append (varName);
this.buffer.append (".next ()) || true);");
}this.buffer.append (") ");
node.getBody ().accept (this);
this.buffer.append ("\r\n");
return false;
}, "org.eclipse.jdt.core.dom.EnhancedForStatement");
Clazz.defineMethod (c$, "endVisit", 
function (node) {
this.buffer.append (";\r\n");
Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTKeywordVisitor, "endVisit", [node]);
}, "org.eclipse.jdt.core.dom.ExpressionStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("for (");
this.visitList (node.initializers (), ", ");
this.buffer.append ("; ");
var expression = node.getExpression ();
if (expression != null) {
expression.accept (this);
}this.buffer.append ("; ");
this.visitList (node.updaters (), ", ");
this.buffer.append (") ");
node.getBody ().accept (this);
this.buffer.append ("\r\n");
return false;
}, "org.eclipse.jdt.core.dom.ForStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("if (");
this.boxingNode (node.getExpression ());
this.buffer.append (") ");
node.getThenStatement ().accept (this);
if (node.getElseStatement () != null) {
this.buffer.append (" else ");
node.getElseStatement ().accept (this);
}return false;
}, "org.eclipse.jdt.core.dom.IfStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.ImportDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var right = node.getRightOperand ();
this.buffer.append ("Clazz.instanceOf (");
node.getLeftOperand ().accept (this);
this.buffer.append (", ");
if (Clazz.instanceOf (right, org.eclipse.jdt.core.dom.ArrayType)) {
this.buffer.append ("Array");
} else {
right.accept (this);
}this.buffer.append (")");
return false;
}, "org.eclipse.jdt.core.dom.InstanceofExpression");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append (node.getLabel ());
this.buffer.append (" : ");
node.getBody ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.LabeledStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.Modifier");
Clazz.defineMethod (c$, "visit", 
function (node) {
var token = node.getToken ();
if (token.endsWith ("L") || token.endsWith ("l")) {
this.buffer.append (token.substring (0, token.length - 1));
} else if (!token.startsWith ("0x") && !token.startsWith ("0X")) {
if (token.endsWith ("F") || token.endsWith ("f") || token.endsWith ("D") || token.endsWith ("d")) {
this.buffer.append (token.substring (0, token.length - 1));
} else {
this.buffer.append (token);
}} else {
this.buffer.append (token);
}return false;
}, "org.eclipse.jdt.core.dom.NumberLiteral");
Clazz.defineMethod (c$, "visit", 
function (node) {
var binding = node.resolveTypeBinding ();
if (binding != null) this.buffer.append ("null");
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTKeywordVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.NullLiteral");
Clazz.defineMethod (c$, "visit", 
function (node) {
var packageVisitor = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor));
packageVisitor.setPackageName ("" + node.getName ());
var swtInnerPackages = this.skipDeclarePackages ();
for (var i = 0; i < swtInnerPackages.length; i++) {
if (packageVisitor.getPackageName ().equals (swtInnerPackages[i])) {
return false;
}}
this.buffer.append ("Clazz.declarePackage (\"");
node.getName ().accept (this);
this.buffer.append ("\");\r\n");
return false;
}, "org.eclipse.jdt.core.dom.PackageDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("(");
node.getExpression ().accept (this);
this.buffer.append (")");
return false;
}, "org.eclipse.jdt.core.dom.ParenthesizedExpression");
Clazz.defineMethod (c$, "endVisit", 
function (node) {
var left = node.getOperand ();
var varBinding = null;
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.Name)) {
var leftName = left;
var nameBinding = leftName.resolveBinding ();
if (Clazz.instanceOf (nameBinding, org.eclipse.jdt.core.dom.IVariableBinding)) {
varBinding = nameBinding;
}} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
varBinding = leftAccess.resolveFieldBinding ();
}var declaring = null;
var qName = null;
if (varBinding != null && (varBinding.getModifiers () & 8) != 0 && (declaring = varBinding.getDeclaringClass ()) != null && !(qName = declaring.getQualifiedName ()).startsWith ("org.eclipse.swt.internal.xhtml.") && !qName.startsWith ("net.sf.j2s.html.")) {
return ;
}var typeBinding = node.getOperand ().resolveTypeBinding ();
if (typeBinding != null && typeBinding.isPrimitive ()) {
if ("char".equals (typeBinding.getName ())) {
return ;
}}this.buffer.append (node.getOperator ());
Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTKeywordVisitor, "endVisit", [node]);
}, "org.eclipse.jdt.core.dom.PostfixExpression");
Clazz.defineMethod (c$, "visit", 
function (node) {
var left = node.getOperand ();
var varBinding = null;
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.Name)) {
var leftName = left;
var nameBinding = leftName.resolveBinding ();
if (Clazz.instanceOf (nameBinding, org.eclipse.jdt.core.dom.IVariableBinding)) {
varBinding = nameBinding;
}} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
varBinding = leftAccess.resolveFieldBinding ();
}var declaring = null;
var qName = null;
if (varBinding != null && (varBinding.getModifiers () & 8) != 0 && (declaring = varBinding.getDeclaringClass ()) != null && !(qName = declaring.getQualifiedName ()).startsWith ("org.eclipse.swt.internal.xhtml.") && !qName.startsWith ("net.sf.j2s.html.")) {
if (!(Clazz.instanceOf (left, org.eclipse.jdt.core.dom.SimpleName) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName) && Clazz.instanceOf ((left).getQualifier (), org.eclipse.jdt.core.dom.SimpleName)) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess) && Clazz.instanceOf ((left).getExpression (), org.eclipse.jdt.core.dom.ThisExpression)))) {
this.buffer.append ("(((");
} else {
this.buffer.append ("(");
}if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
if (!(Clazz.instanceOf (leftName.getQualifier (), org.eclipse.jdt.core.dom.SimpleName))) {
leftName.getQualifier ().accept (this);
}} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
if (!(Clazz.instanceOf (leftAccess.getExpression (), org.eclipse.jdt.core.dom.ThisExpression))) {
leftAccess.getExpression ().accept (this);
}}if (!(Clazz.instanceOf (left, org.eclipse.jdt.core.dom.SimpleName) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName) && Clazz.instanceOf ((left).getQualifier (), org.eclipse.jdt.core.dom.SimpleName)) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess) && Clazz.instanceOf ((left).getExpression (), org.eclipse.jdt.core.dom.ThisExpression)))) {
this.buffer.append (") || true) ? ($t$ = ");
} else {
this.buffer.append ("$t$ = ");
}this.buffer.append (this.shortenQualifiedName (varBinding.getDeclaringClass ().getQualifiedName ()));
this.buffer.append ('.');
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
leftName.getName ().accept (this);
} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
leftAccess.getName ().accept (this);
} else {
var leftName = left;
leftName.accept (this);
}this.buffer.append (' ');
var op = node.getOperator ().toString ();
this.buffer.append (op);
this.buffer.append (", ");
this.buffer.append (this.shortenQualifiedName (varBinding.getDeclaringClass ().getQualifiedName ()));
this.buffer.append (".prototype.");
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
leftName.getName ().accept (this);
} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
leftAccess.getName ().accept (this);
} else {
var leftName = left;
leftName.accept (this);
}this.buffer.append (" = ");
this.buffer.append (this.shortenQualifiedName (varBinding.getDeclaringClass ().getQualifiedName ()));
this.buffer.append ('.');
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
leftName.getName ().accept (this);
} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
leftAccess.getName ().accept (this);
} else {
var leftName = left;
leftName.accept (this);
}if (!(Clazz.instanceOf (left, org.eclipse.jdt.core.dom.SimpleName) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName) && Clazz.instanceOf ((left).getQualifier (), org.eclipse.jdt.core.dom.SimpleName)) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess) && Clazz.instanceOf ((left).getExpression (), org.eclipse.jdt.core.dom.ThisExpression)))) {
this.buffer.append (", $t$) : 0)");
} else {
this.buffer.append (", $t$)");
}return false;
}var typeBinding = node.getOperand ().resolveTypeBinding ();
if (typeBinding != null && typeBinding.isPrimitive ()) {
if ("char".equals (typeBinding.getName ())) {
this.buffer.append ("(");
node.getOperand ().accept (this);
this.buffer.append (" = String.fromCharCode (($c$ = ");
node.getOperand ().accept (this);
var op = node.getOperator ().toString ();
if ("++".equals (op)) {
this.buffer.append (").charCodeAt (0) + 1)");
} else {
this.buffer.append (").charCodeAt (0) - 1)");
}this.buffer.append (", $c$)");
return false;
}}this.boxingNode (node.getOperand ());
return false;
}, "org.eclipse.jdt.core.dom.PostfixExpression");
Clazz.defineMethod (c$, "visit", 
function (node) {
var constValue = this.checkConstantValue (node);
if (constValue != null) {
this.buffer.append (constValue);
return false;
}var op = node.getOperator ().toString ();
if ("~".equals (op) || "!".equals (op)) {
this.buffer.append (op);
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTKeywordVisitor, "visit", [node]);
}var left = node.getOperand ();
var varBinding = null;
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.Name)) {
var leftName = left;
var nameBinding = leftName.resolveBinding ();
if (Clazz.instanceOf (nameBinding, org.eclipse.jdt.core.dom.IVariableBinding)) {
varBinding = nameBinding;
}} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
varBinding = leftAccess.resolveFieldBinding ();
}var declaring = null;
var qName = null;
if (varBinding != null && (varBinding.getModifiers () & 8) != 0 && (declaring = varBinding.getDeclaringClass ()) != null && !(qName = declaring.getQualifiedName ()).startsWith ("org.eclipse.swt.internal.xhtml.") && !qName.startsWith ("net.sf.j2s.html.")) {
if (!(Clazz.instanceOf (left, org.eclipse.jdt.core.dom.SimpleName) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName) && Clazz.instanceOf ((left).getQualifier (), org.eclipse.jdt.core.dom.SimpleName)) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess) && Clazz.instanceOf ((left).getExpression (), org.eclipse.jdt.core.dom.ThisExpression)))) {
this.buffer.append ("(((");
} else {
this.buffer.append ("(");
}if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
if (!(Clazz.instanceOf (leftName.getQualifier (), org.eclipse.jdt.core.dom.SimpleName))) {
leftName.getQualifier ().accept (this);
}} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
if (!(Clazz.instanceOf (leftAccess.getExpression (), org.eclipse.jdt.core.dom.ThisExpression))) {
leftAccess.getExpression ().accept (this);
}}if (!(Clazz.instanceOf (left, org.eclipse.jdt.core.dom.SimpleName) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName) && Clazz.instanceOf ((left).getQualifier (), org.eclipse.jdt.core.dom.SimpleName)) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess) && Clazz.instanceOf ((left).getExpression (), org.eclipse.jdt.core.dom.ThisExpression)))) {
this.buffer.append (") || true) ? ($t$ = ");
} else {
this.buffer.append ("$t$ = ");
}this.buffer.append (op);
this.buffer.append (' ');
this.buffer.append (this.shortenQualifiedName (varBinding.getDeclaringClass ().getQualifiedName ()));
this.buffer.append ('.');
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
leftName.getName ().accept (this);
} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
leftAccess.getName ().accept (this);
} else {
var leftName = left;
leftName.accept (this);
}this.buffer.append (", ");
this.buffer.append (this.shortenQualifiedName (varBinding.getDeclaringClass ().getQualifiedName ()));
this.buffer.append (".prototype.");
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
leftName.getName ().accept (this);
} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
leftAccess.getName ().accept (this);
} else {
var leftName = left;
leftName.accept (this);
}this.buffer.append (" = ");
this.buffer.append (this.shortenQualifiedName (varBinding.getDeclaringClass ().getQualifiedName ()));
this.buffer.append ('.');
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName)) {
var leftName = left;
leftName.getName ().accept (this);
} else if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess)) {
var leftAccess = left;
leftAccess.getName ().accept (this);
} else {
var leftName = left;
leftName.accept (this);
}if (!(Clazz.instanceOf (left, org.eclipse.jdt.core.dom.SimpleName) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.QualifiedName) && Clazz.instanceOf ((left).getQualifier (), org.eclipse.jdt.core.dom.SimpleName)) || (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.FieldAccess) && Clazz.instanceOf ((left).getExpression (), org.eclipse.jdt.core.dom.ThisExpression)))) {
this.buffer.append (", $t$) : 0)");
} else {
this.buffer.append (", $t$)");
}return false;
}var typeBinding = node.getOperand ().resolveTypeBinding ();
if (typeBinding.isPrimitive ()) {
if ("char".equals (typeBinding.getName ())) {
this.buffer.append ("(");
node.getOperand ().accept (this);
this.buffer.append (" = String.fromCharCode ((");
node.getOperand ().accept (this);
if ("++".equals (op)) {
this.buffer.append (").charCodeAt (0) + 1)");
} else {
this.buffer.append (").charCodeAt (0) - 1)");
}this.buffer.append (")");
return false;
}}this.buffer.append (node.getOperator ());
this.boxingNode (node.getOperand ());
return false;
}, "org.eclipse.jdt.core.dom.PrefixExpression");
Clazz.defineMethod (c$, "visit", 
function (node) {
if (this.isSimpleQualified (node)) {
var constValue = this.checkConstantValue (node);
if (constValue != null) {
this.buffer.append (constValue);
return false;
}}var parent = node.getParent ();
if (parent != null && !(Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.QualifiedName))) {
var qualifier = node.getQualifier ();
while (Clazz.instanceOf (qualifier, org.eclipse.jdt.core.dom.QualifiedName)) {
var binding = qualifier.resolveBinding ();
if (binding != null && !(Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IVariableBinding))) {
var xqualifier = (qualifier).getQualifier ();
if (Clazz.instanceOf (xqualifier, org.eclipse.jdt.core.dom.QualifiedName)) {
var xbinding = qualifier.resolveBinding ();
if (xbinding != null && !(Clazz.instanceOf (xbinding, org.eclipse.jdt.core.dom.IVariableBinding))) {
qualifier = xqualifier;
continue ;}}}break;
}
var binding = qualifier.resolveBinding ();
if (binding != null) {
if (!(Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IVariableBinding))) {
var typeBinding = qualifier.resolveTypeBinding ();
if (typeBinding != null) {
var name = null;
var declaringClass = typeBinding.getDeclaringClass ();
if (declaringClass != null) {
name = declaringClass.getQualifiedName ();
} else {
var pkg = typeBinding.getPackage ();
if (pkg != null) {
name = pkg.getName ();
} else {
name = "";
}}var xhtml = "net.sf.j2s.html.";
if (name.indexOf (xhtml) == 0) {
name = name.substring (xhtml.length);
}if (name.indexOf ("java.lang.") == 0) {
name = name.substring (10);
}if (name.length != 0) {
this.buffer.append (name);
this.buffer.append ('.');
}}}}}var qName = node.getQualifier ();
var nodeStr = qName.toString ();
if (nodeStr.equals ("net.sf.j2s.html") || nodeStr.equals ("org.eclipse.swt.internal.xhtml")) {
node.getName ().accept (this);
return false;
}qName.accept (this);
this.buffer.append ('.');
node.getName ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.QualifiedName");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("return ");
var expression = node.getExpression ();
if (expression != null) {
expression.accept (this);
}this.buffer.append (";\r\n");
return false;
}, "org.eclipse.jdt.core.dom.ReturnStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append (node.getEscapedValue ());
return false;
}, "org.eclipse.jdt.core.dom.StringLiteral");
Clazz.defineMethod (c$, "visit", 
function (node) {
if (node.isDefault ()) {
this.buffer.append ("default");
} else {
this.buffer.append ("case ");
node.getExpression ().accept (this);
}this.buffer.append (":\r\n");
return false;
}, "org.eclipse.jdt.core.dom.SwitchCase");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("switch (");
node.getExpression ().accept (this);
this.buffer.append (") {\r\n");
this.visitList (node.statements (), "");
this.buffer.append ("}\r\n");
return false;
}, "org.eclipse.jdt.core.dom.SwitchStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
node.getBody ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.SynchronizedStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("throw ");
node.getExpression ().accept (this);
this.buffer.append (";\r\n");
return false;
}, "org.eclipse.jdt.core.dom.ThrowStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("try ");
node.getBody ().accept (this);
var catchClauses = node.catchClauses ();
var size = catchClauses.size ();
if (size > 0) {
var catchEName = "e$$";
if (size == 1) {
var element = catchClauses.get (0);
var exName = element.getException ().getName ();
catchEName = exName.getIdentifier ();
}this.buffer.append (" catch (" + catchEName + ") ");
var scopeAdded = false;
var endedWithThrowable = false;
for (var iter = catchClauses.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var type = element.getException ().getType ();
var typeName = type.toString ();
if (!"Throwable".equals (typeName) && !"java.lang.Throwable".equals (typeName)) {
if (!scopeAdded) {
this.buffer.append ("{\r\n");
scopeAdded = true;
}this.buffer.append ("if (Clazz.instanceOf (" + catchEName + ", ");
type.accept (this);
this.buffer.append (")) ");
} else {
endedWithThrowable = true;
}var exName = element.getException ().getName ();
var eName = exName.getIdentifier ();
var notEName = false;
if (!catchEName.equals (eName)) {
this.buffer.append ("{\r\n");
this.buffer.append ("var ");
this.buffer.append (eName);
this.buffer.append (" = " + catchEName + ";\r\n");
notEName = true;
}element.getBody ().accept (this);
if (notEName) {
this.buffer.append ("\r\n}");
}if (iter.hasNext ()) {
this.buffer.append (" else ");
}}
if (!endedWithThrowable) {
this.buffer.append (" else {\r\nthrow " + catchEName + ";\r\n}");
}if (scopeAdded) {
this.buffer.append ("\r\n}");
}}var finallys = node.getFinally ();
if (finallys != null) {
this.buffer.append (" finally ");
finallys.accept (this);
}this.buffer.append ("\r\n");
return false;
}, "org.eclipse.jdt.core.dom.TryStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("var ");
this.visitList (node.fragments (), ", ");
return false;
}, "org.eclipse.jdt.core.dom.VariableDeclarationExpression");
Clazz.defineMethod (c$, "visit", 
function (node) {
var name = node.getName ();
var binding = name.resolveBinding ();
if (binding != null) {
var identifier = name.getIdentifier ();
var f = null;
if (this.methodDeclareStack.size () == 0) {
f =  new net.sf.j2s.core.astvisitors.ASTFinalVariable (this.blockLevel, identifier, null);
} else {
var methodSig = this.methodDeclareStack.peek ();
f =  new net.sf.j2s.core.astvisitors.ASTFinalVariable (this.blockLevel, identifier, methodSig);
}var v$ = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).v$;
var normalVars = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).normalVars;
f.toVariableName = this.getIndexedVarName (identifier, normalVars.size ());
normalVars.add (f);
if ((binding.getModifiers () & 16) != 0) {
v$.add (f);
}}name.accept (this);
var initializer = node.getInitializer ();
if (initializer != null) {
this.buffer.append (" = ");
var typeBinding = initializer.resolveTypeBinding ();
if (typeBinding != null && "char".equals (typeBinding.getName ())) {
var nameTypeBinding = name.resolveTypeBinding ();
var nameType = nameTypeBinding.getName ();
if (!"char".equals (nameType) && nameType.indexOf ("String") == -1) {
this.buffer.append ("(");
initializer.accept (this);
this.buffer.append (").charCodeAt (0)");
return false;
}}var nameTypeBinding = name.resolveTypeBinding ();
if (nameTypeBinding != null) {
var nameType = nameTypeBinding.getName ();
if ("char".equals (nameType)) {
if (typeBinding != null && !"char".equals (typeBinding.getName ())) {
this.buffer.append ("String.fromCharCode (");
initializer.accept (this);
this.buffer.append (")");
return false;
}}}this.boxingNode (initializer);
}return false;
}, "org.eclipse.jdt.core.dom.VariableDeclarationFragment");
Clazz.defineMethod (c$, "visit", 
function (node) {
var fragments = node.fragments ();
for (var iter = fragments.iterator (); iter.hasNext (); ) {
var element = iter.next ();
this.buffer.append ("var ");
element.accept (this);
this.buffer.append (";\r\n");
}
return false;
}, "org.eclipse.jdt.core.dom.VariableDeclarationStatement");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("while (");
node.getExpression ().accept (this);
this.buffer.append (") ");
node.getBody ().accept (this);
this.buffer.append ("\r\n");
return false;
}, "org.eclipse.jdt.core.dom.WhileStatement");
});
