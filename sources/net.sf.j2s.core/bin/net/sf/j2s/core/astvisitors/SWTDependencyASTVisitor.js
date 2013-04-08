Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.DependencyASTVisitor"], "net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor", ["net.sf.j2s.core.astvisitors.Bindings"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.astvisitors, "SWTDependencyASTVisitor", net.sf.j2s.core.astvisitors.DependencyASTVisitor);
Clazz.defineMethod (c$, "getFilterMethods", 
function () {
return ["org.eclipse.swt.widgets.Widget", "checkSubclass", "org.eclipse.swt.widgets.Dialog", "checkSubclass", "org.eclipse.swt.widgets.Widget", "checkWidget", "org.eclipse.swt.widgets.Display", "checkDevice", "org.eclipse.swt.graphics.Device", "checkDevice", "org.eclipse.jface.util.Assert", "*", "org.eclipse.core.internal.commands.util.Assert", "*", "org.eclipse.core.internal.runtime.Assert", "*"];
});
Clazz.defineMethod (c$, "visit", 
function (node) {
var methodBinding = node.resolveMethodBinding ();
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
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.MethodInvocation");
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
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
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
}} else if (this.isMethodInvoking (methodBinding, filterMethods[i], filterMethods[i + 1])) {
return ;
}}
Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor, "endVisit", [node]);
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
Clazz.defineMethod (c$, "isMethodInvoking", 
($fz = function (methodBinding, className, methodName) {
if (methodBinding != null && methodName.equals (methodBinding.getName ())) {
var findMethodInHierarchy = net.sf.j2s.core.astvisitors.Bindings.findMethodInHierarchy (methodBinding.getDeclaringClass (), methodName, null);
var last = findMethodInHierarchy;
var count = 0;
while (findMethodInHierarchy != null && (count++) < 10) {
last = findMethodInHierarchy;
var superclass = last.getDeclaringClass ().getSuperclass ();
if (superclass == null) {
break;
}findMethodInHierarchy = net.sf.j2s.core.astvisitors.Bindings.findMethodInHierarchy (superclass, methodName, null);
}
if (last == null) {
last = methodBinding;
}if (className.equals (last.getDeclaringClass ().getQualifiedName ())) {
return true;
}}return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.IMethodBinding,~S,~S");
Clazz.defineMethod (c$, "isMethodInvoking", 
($fz = function (exp, className, methodName) {
if (Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.MethodInvocation)) {
var method = exp;
var methodBinding = method.resolveMethodBinding ();
if (this.isMethodInvoking (methodBinding, className, methodName)) {
return true;
}}return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.Expression,~S,~S");
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
if (this.isMethodInvoking (exp, "org.eclipse.swt.widgets.Widget", "error")) {
return false;
}if (this.isMethodInvoking (exp, "org.eclipse.swt.SWT", "error")) {
return false;
}if (this.isMethodInvoking (exp, "org.eclipse.swt.widgets.Display", "error")) {
return false;
}}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.IfStatement");
});
