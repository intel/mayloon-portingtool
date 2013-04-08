Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.ASTScriptVisitor"], "net.sf.j2s.core.astvisitors.SWTScriptVisitor", ["net.sf.j2s.core.astvisitors.Bindings"], function () {
c$ = Clazz.decorateAsClass (function () {
this.metSWTBlockWhile = false;
this.metDialogOpen = false;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "SWTScriptVisitor", net.sf.j2s.core.astvisitors.ASTScriptVisitor);
Clazz.defineMethod (c$, "skipDeclarePackages", 
function () {
var swt = "org.eclipse.swt";
var swtInnerPackages = [swt, swt + ".accessibility", swt + ".browser", swt + ".custom", swt + ".dnd", swt + ".events", swt + ".graphics", swt + ".internal", swt + ".internal.dnd", swt + ".internal.browser", swt + ".internal.struct", swt + ".layout", swt + ".widgets"];
var pkgs = Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "skipDeclarePackages", []);
var packages =  new Array (swtInnerPackages.length + pkgs.length);
System.arraycopy (pkgs, 0, packages, 0, pkgs.length);
System.arraycopy (swtInnerPackages, 0, packages, pkgs.length, swtInnerPackages.length);
return packages;
});
Clazz.defineMethod (c$, "visit", 
function (node) {
var constValue = this.checkConstantValue (node);
if (constValue != null) {
this.buffer.append (constValue);
return false;
}var binding = node.resolveBinding ();
if (binding != null && Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.ITypeBinding)) {
var typeBinding = binding;
if (typeBinding != null) {
var name = typeBinding.getQualifiedName ();
if (name.startsWith ("org.eclipse.swt.internal.xhtml.") || name.startsWith ("net.sf.j2s.html.")) {
var identifier = node.getIdentifier ();
if ("window".equals (identifier)) {
identifier = "w$";
} else if ("document".equals (identifier)) {
identifier = "d$";
}this.buffer.append (identifier);
return false;
}if ("org.eclipse.swt.internal.browser.OS".equals (name)) {
this.buffer.append ("O$");
return false;
}}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.SimpleName");
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
name = "";
}name = this.shortenQualifiedName (name);
if (name.indexOf ("java.lang.") == 0) {
name = name.substring (10);
}var xhtml = "org.eclipse.swt.internal.xhtml.";
if (name.indexOf (xhtml) == 0) {
name = name.substring (xhtml.length);
}xhtml = "net.sf.j2s.html.";
if (name.indexOf (xhtml) == 0) {
name = name.substring (xhtml.length);
}xhtml = "$wt.internal.xhtml.";
if (name.indexOf (xhtml) == 0) {
name = name.substring (xhtml.length);
}if ("window".equals (name)) {
name = "w$";
} else if ("document".equals (name)) {
name = "d$";
}if (name.length != 0) {
this.buffer.append (name);
this.buffer.append ('.');
}}}}}var qName = node.getQualifier ();
var nodeStr = qName.toString ();
if (nodeStr.equals ("net.sf.j2s.html") || nodeStr.equals ("org.eclipse.swt.internal.xhtml")) {
node.getName ().accept (this);
return false;
}node.getQualifier ().accept (this);
this.buffer.append ('.');
node.getName ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.QualifiedName");
Clazz.defineMethod (c$, "visit", 
function (node) {
var binding = node.resolveTypeBinding ();
if (binding != null) {
if (this.isTypeOf (binding, "org.eclipse.swt.internal.RunnableCompatibility")) {
this.buffer.append ("Clazz.makeFunction (");
var result = Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "visit", [node]);
this.buffer.append (")");
return result;
}}var anonDeclare = node.getAnonymousClassDeclaration ();
if (anonDeclare != null) {
} else {
var fqName = null;
var name = this.getTypeStringName (node.getType ());
if (name != null) {
fqName = name;
} else {
fqName = "noname";
}fqName = this.shortenQualifiedName (fqName);
var filterKey = "org.eclipse.swt.internal.xhtml.";
if (fqName.startsWith (filterKey)) {
this.buffer.append (" new ");
this.buffer.append (fqName.substring (filterKey.length));
this.buffer.append (" (");
this.visitList (node.$arguments (), ", ");
this.buffer.append (")");
return false;
}filterKey = "net.sf.j2s.html.";
if (fqName.startsWith (filterKey)) {
this.buffer.append (" new ");
this.buffer.append (fqName.substring (filterKey.length));
this.buffer.append (" (");
this.visitList (node.$arguments (), ", ");
this.buffer.append (")");
return false;
}filterKey = "$wt.internal.xhtml.";
if (fqName.startsWith (filterKey)) {
this.buffer.append (" new ");
this.buffer.append (fqName.substring (filterKey.length));
this.buffer.append (" (");
this.visitList (node.$arguments (), ", ");
this.buffer.append (")");
return false;
}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.ClassInstanceCreation");
Clazz.defineMethod (c$, "isTypeOf", 
function (binding, clazzName) {
if (binding == null || clazzName == null || clazzName.length == 0) {
return false;
}if (clazzName.equals (binding.getBinaryName ())) {
return true;
} else {
return this.isTypeOf (binding.getSuperclass (), clazzName);
}}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
Clazz.defineMethod (c$, "visit", 
function (node) {
var exp = node.getExpression ();
if (Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.PrefixExpression)) {
var preExp = exp;
if ("!".equals (preExp.getOperator ().toString ())) {
var operand = preExp.getOperand ();
if (Clazz.instanceOf (operand, org.eclipse.jdt.core.dom.MethodInvocation)) {
var shellIsDisposed = operand;
var shellExp = shellIsDisposed.getExpression ();
if (shellExp != null) {
var typeBinding = shellExp.resolveTypeBinding ();
if (this.isTypeOf (typeBinding, "org.eclipse.swt.widgets.Shell")) {
var methodName = shellIsDisposed.getName ();
if ("isDisposed".equals (methodName.getIdentifier ())) {
this.metSWTBlockWhile = true;
this.buffer.append ("Sync2Async.block (");
shellExp.accept (this);
this.buffer.append (", this, function () {\r\n");
return false;
}}}}}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.WhileStatement");
Clazz.overrideMethod (c$, "getFilterMethods", 
function () {
return ["org.eclipse.swt.widgets.Widget", "checkSubclass", "org.eclipse.swt.widgets.Dialog", "checkSubclass", "org.eclipse.swt.widgets.Widget", "checkWidget", "org.eclipse.swt.widgets.Display", "checkDevice", "org.eclipse.swt.graphics.Device", "checkDevice", "org.eclipse.jface.util.Assert", "*", "org.eclipse.core.internal.commands.util.Assert", "*", "org.eclipse.core.internal.runtime.Assert", "*"];
});
Clazz.defineMethod (c$, "visit", 
function (node) {
var methodBinding = node.resolveMethodBinding ();
if (methodBinding != null && "open".equals (methodBinding.getName ()) && methodBinding.getParameterTypes ().length == 0) {
var isDialogBlock = false;
var isWindowBlock = false;
if ((isDialogBlock = net.sf.j2s.core.astvisitors.Bindings.findTypeInHierarchy (methodBinding.getDeclaringClass (), "org.eclipse.swt.widgets.Dialog") != null) || (!this.getPackageName ().startsWith ("org.eclipse.jface.") && (isWindowBlock = net.sf.j2s.core.astvisitors.Bindings.findTypeInHierarchy (methodBinding.getDeclaringClass (), "org.eclipse.jface.window.Window") != null))) {
var lastIndexOf1 = this.buffer.lastIndexOf (";\r\n");
if (lastIndexOf1 != -1) {
lastIndexOf1 += 3;
}var lastIndexOf2 = this.buffer.lastIndexOf ("}\r\n");
if (lastIndexOf2 != -1) {
lastIndexOf2 += 3;
}var lastIndexOf3 = this.buffer.lastIndexOf ("}");
if (lastIndexOf3 != -1) {
lastIndexOf3 += 1;
}var lastIndexOf4 = this.buffer.lastIndexOf ("{\r\n");
if (lastIndexOf4 != -1) {
lastIndexOf4 += 3;
}var lastIndexOf5 = this.buffer.lastIndexOf ("{");
if (lastIndexOf5 != -1) {
lastIndexOf5 += 1;
}var lastIndexOf = -1;
if (lastIndexOf1 == -1 && lastIndexOf2 == -1 && lastIndexOf3 == -1 && lastIndexOf1 == -1 && lastIndexOf2 == -1 && lastIndexOf3 == -1) {
lastIndexOf = this.buffer.length ();
} else {
lastIndexOf = Math.max (Math.max (Math.max (lastIndexOf1, lastIndexOf2), lastIndexOf3), Math.max (lastIndexOf4, lastIndexOf5));
}var s = this.buffer.substring (lastIndexOf);
this.buffer.$delete (lastIndexOf, this.buffer.length ());
if (isDialogBlock) {
this.buffer.append ("DialogSync2Async.block (");
} else if (isWindowBlock) {
this.buffer.append ("net.sf.j2s.ajax.AWindowDelegate.asyncOpen (");
}node.getExpression ().accept (this);
this.buffer.append (", this, function () {\r\n");
this.buffer.append (s);
node.getExpression ().accept (this);
if (isDialogBlock) {
this.buffer.append (".dialogReturn");
} else if (isWindowBlock) {
this.buffer.append (".getReturnCode ()");
}this.metDialogOpen = true;
return false;
}}if (methodBinding != null && "net.sf.j2s.ajax.junit.AsyncSWT".equals (methodBinding.getDeclaringClass ().getQualifiedName ()) && "waitLayout".equals (methodBinding.getName ())) {
this.metSWTBlockWhile = true;
node.getExpression ().accept (this);
this.buffer.append (".waitLayout (");
var shellExp = node.$arguments ().get (0);
shellExp.accept (this);
this.buffer.append (", ");
var runnableExp = node.$arguments ().get (1);
runnableExp.accept (this);
this.buffer.append (", this, function () {\r\n//");
return false;
}var filterMethods = this.getFilterMethods ();
for (var i = 0; i < filterMethods.length; i += 2) {
if ("*".equals (filterMethods[i + 1])) {
if (methodBinding == null) {
continue ;}var type = methodBinding.getDeclaringClass ();
if (type != null && filterMethods[i].equals (type.getQualifiedName ())) {
return false;
}} else if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (methodBinding, filterMethods[i], filterMethods[i + 1])) {
return false;
}}
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.MethodInvocation");
Clazz.defineMethod (c$, "endVisit", 
function (node) {
var methodBinding = node.resolveBinding ();
var filterMethods = this.getFilterMethods ();
for (var i = 0; i < filterMethods.length; i += 2) {
if ("*".equals (filterMethods[i + 1])) {
if (methodBinding == null) {
continue ;}var type = methodBinding.getDeclaringClass ();
if (type != null && filterMethods[i].equals (type.getQualifiedName ())) {
return ;
}} else if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (methodBinding, filterMethods[i], filterMethods[i + 1])) {
return ;
}}
Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "endVisit", [node]);
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var methodBinding = node.resolveBinding ();
var filterMethods = this.getFilterMethods ();
for (var i = 0; i < filterMethods.length; i += 2) {
if ("*".equals (filterMethods[i + 1])) {
if (methodBinding == null) {
continue ;}var type = methodBinding.getDeclaringClass ();
if (type != null && filterMethods[i].equals (type.getQualifiedName ())) {
return false;
}} else if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (methodBinding, filterMethods[i], filterMethods[i + 1])) {
return false;
}}
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var swtBlockWhileCount = 0;
var swtDialogOpenCount = 0;
var lastSWTBlockWhile = this.metSWTBlockWhile;
this.metSWTBlockWhile = false;
var lastDialogOpen = this.metDialogOpen;
this.metDialogOpen = false;
if (Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "visit", [node]) == false) {
this.metSWTBlockWhile = lastSWTBlockWhile;
this.metDialogOpen = lastDialogOpen;
return false;
}var statements = node.statements ();
for (var iter = statements.iterator (); iter.hasNext (); ) {
var stmt = iter.next ();
if (Clazz.instanceOf (stmt, org.eclipse.jdt.core.dom.ExpressionStatement)) {
var expStmt = stmt;
var exp = expStmt.getExpression ();
var filterMethods = this.getFilterMethods ();
var isContinue = false;
for (var i = 0; i < filterMethods.length; i += 2) {
if ("*".equals (filterMethods[i + 1])) {
continue ;} else if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (exp, filterMethods[i], filterMethods[i + 1])) {
isContinue = true;
break;
}}
if (isContinue) {
continue ;}}stmt.accept (this);
if (this.metSWTBlockWhile) {
swtBlockWhileCount++;
this.metSWTBlockWhile = false;
}if (this.metDialogOpen) {
swtDialogOpenCount++;
this.metDialogOpen = false;
}}
for (var i = 0; i < swtBlockWhileCount + swtDialogOpenCount; i++) {
this.buffer.append ("});\r\n");
this.buffer.append ("return;\r\n");
}
this.metSWTBlockWhile = lastSWTBlockWhile;
this.metDialogOpen = lastDialogOpen;
return false;
}, "org.eclipse.jdt.core.dom.Block");
Clazz.defineMethod (c$, "visit", 
function (node) {
if (node.getElseStatement () == null) {
var thenStatement = node.getThenStatement ();
if (Clazz.instanceOf (thenStatement, org.eclipse.jdt.core.dom.Block)) {
var block = thenStatement;
var statements = block.statements ();
if (statements.size () == 1) {
thenStatement = statements.get (0);
}}if (Clazz.instanceOf (thenStatement, org.eclipse.jdt.core.dom.ExpressionStatement)) {
var expStmt = thenStatement;
var exp = expStmt.getExpression ();
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (exp, "org.eclipse.swt.widgets.Widget", "error")) {
return false;
}if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (exp, "org.eclipse.swt.SWT", "error")) {
return false;
}if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (exp, "org.eclipse.swt.widgets.Display", "error")) {
return false;
}}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTScriptVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.IfStatement");
});
