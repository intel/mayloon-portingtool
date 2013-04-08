Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["org.eclipse.jdt.core.dom.ASTVisitor"], "net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor", ["net.sf.j2s.core.astvisitors.Bindings"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isReferenced = false;
this.methodSignature = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "MethodReferenceASTVisitor", org.eclipse.jdt.core.dom.ASTVisitor);
Clazz.makeConstructor (c$, 
($fz = function (methodSignature) {
Clazz.superConstructor (this, net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor);
this.methodSignature = methodSignature.replaceAll ("%?<[^>]+>", "");
}, $fz.isPrivate = true, $fz), "~S");
c$.checkReference = Clazz.defineMethod (c$, "checkReference", 
function (node, methodSignature) {
var methodRefVisitor =  new net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor (methodSignature);
methodRefVisitor.isReferenced = false;
node.accept (methodRefVisitor);
return methodRefVisitor.isReferenced;
}, "org.eclipse.jdt.core.dom.ASTNode,~S");
Clazz.defineMethod (c$, "visit", 
function (node) {
var constructorBinding = node.resolveConstructorBinding ();
if (constructorBinding != null) {
var key = constructorBinding.getKey ();
if (key != null) {
key = key.replaceAll ("%?<[^>]+>", "");
}if (this.methodSignature.equals (key)) {
this.isReferenced = true;
return false;
}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.ClassInstanceCreation");
Clazz.defineMethod (c$, "visit", 
function (node) {
var constructorBinding = node.resolveConstructorBinding ();
var key = constructorBinding.getKey ();
if (key != null) {
key = key.replaceAll ("%?<[^>]+>", "");
}if (this.methodSignature.equals (key)) {
this.isReferenced = true;
return false;
}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.ConstructorInvocation");
Clazz.defineMethod (c$, "visit", 
function (node) {
var methodBinding = node.resolveMethodBinding ();
if (methodBinding != null) {
var key = methodBinding.getKey ();
if (key != null) {
key = key.replaceAll ("%?<[^>]+>", "");
}if (this.methodSignature.equals (key)) {
this.isReferenced = true;
return false;
}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.MethodInvocation");
Clazz.defineMethod (c$, "visit", 
function (node) {
var methodBinding = node.resolveMethodBinding ();
var key = null;
if (methodBinding != null) {
key = methodBinding.getKey ();
if (key != null) {
key = key.replaceAll ("%?<[^>]+>", "");
}}if (this.methodSignature.equals (key)) {
this.isReferenced = true;
return false;
}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.SuperMethodInvocation");
Clazz.defineMethod (c$, "getJ2STag", 
function (node, tagName) {
var javadoc = node.getJavadoc ();
if (javadoc != null) {
var tags = javadoc.tags ();
if (tags.size () != 0) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if (tagName.equals (tagEl.getTagName ())) {
return tagEl;
}}
}}var modifiers = node.modifiers ();
for (var iter = modifiers.iterator (); iter.hasNext (); ) {
var obj = iter.next ();
if (Clazz.instanceOf (obj, org.eclipse.jdt.core.dom.Annotation)) {
var annotation = obj;
var qName = annotation.getTypeName ().getFullyQualifiedName ();
var idx = qName.indexOf ("J2S");
if (idx != -1) {
var annName = qName.substring (idx);
annName = annName.replaceFirst ("J2S", "@j2s");
if (annName.startsWith (tagName)) {
return annotation;
}}}}
return null;
}, "org.eclipse.jdt.core.dom.BodyDeclaration,~S");
Clazz.defineMethod (c$, "visit", 
function (node) {
if (this.getJ2STag (node, "@j2sIgnore") != null) {
return false;
}var mBinding = node.resolveBinding ();
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.SimpleRPCRunnable", "ajaxRun")) {
if (this.getJ2STag (node, "@j2sKeep") == null) {
return false;
}}var pipeMethods = ["pipeSetup", "pipeThrough", "through", "pipeMonitoring", "pipeMonitoringInterval", "pipeWaitClosingInterval", "setPipeHelper"];
for (var i = 0; i < pipeMethods.length; i++) {
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", pipeMethods[i])) {
if (this.getJ2STag (node, "@j2sKeep") == null) {
return false;
}}}
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.CompoundPipeSession", "convert")) {
if (this.getJ2STag (node, "@j2sKeep") == null) {
return false;
}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
});
