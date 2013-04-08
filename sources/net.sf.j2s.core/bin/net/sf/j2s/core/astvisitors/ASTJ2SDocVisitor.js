Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.ASTKeywordVisitor"], "net.sf.j2s.core.astvisitors.ASTJ2SDocVisitor", ["java.lang.StringBuffer", "java.util.ArrayList", "java.util.regex.Pattern", "net.sf.j2s.core.astvisitors.ASTVariableVisitor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nativeJavadoc = null;
this.javadocRoot = null;
this.$isDebugging = false;
this.$isNarrativeJS = false;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "ASTJ2SDocVisitor", net.sf.j2s.core.astvisitors.ASTKeywordVisitor);
Clazz.defineMethod (c$, "isNarrativeJS", 
function () {
return this.$isNarrativeJS;
});
Clazz.defineMethod (c$, "SetNarrativeJS", 
function () {
this.$isNarrativeJS = true;
});
Clazz.defineMethod (c$, "isDebugging", 
function () {
return this.$isDebugging;
});
Clazz.defineMethod (c$, "setDebugging", 
function (isDebugging) {
this.$isDebugging = isDebugging;
}, "~B");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.blockLevel++;
var parent = node.getParent ();
if (!(Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.Block))) {
this.buffer.append ("{\r\n");
}if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.MethodDeclaration)) {
var method = parent;
var javadoc = method.getJavadoc ();
if (this.visitNativeJavadoc (javadoc, node, true) == false) {
return false;
}var methodBinding = method.resolveBinding ();
if (methodBinding != null) {
var superclass = methodBinding.getDeclaringClass ().getSuperclass ();
var containsSuperPrivateMethod = false;
while (superclass != null) {
var methods = superclass.getDeclaredMethods ();
for (var i = 0; i < methods.length; i++) {
if (methods[i].getName ().equals (methodBinding.getName ()) && (methods[i].getModifiers () & 2) != 0) {
containsSuperPrivateMethod = true;
break;
}}
if (containsSuperPrivateMethod) {
break;
}superclass = superclass.getSuperclass ();
}
if (containsSuperPrivateMethod) {
this.buffer.append ("var $private = Clazz.checkPrivateMethod (arguments);\r\n");
this.buffer.append ("if ($private != null) {\r\n");
this.buffer.append ("return $private.apply (this, arguments);\r\n");
this.buffer.append ("}\r\n");
}}} else if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.Initializer)) {
var initializer = parent;
var javadoc = initializer.getJavadoc ();
if (this.visitNativeJavadoc (javadoc, node, true) == false) {
return false;
}}var blockStart = node.getStartPosition ();
var previousStart = this.getPreviousStartPosition (node);
var root = node.getRoot ();
this.checkJavadocs (root);
for (var i = this.nativeJavadoc.length - 1; i >= 0; i--) {
var javadoc = this.nativeJavadoc[i];
var commentStart = javadoc.getStartPosition ();
if (commentStart > previousStart && commentStart < blockStart) {
if (this.visitNativeJavadoc (javadoc, node, true) == false) {
return false;
}}}
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTJ2SDocVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.Block");
Clazz.defineMethod (c$, "visitNativeJavadoc", 
function (javadoc, node, superVisit) {
if (javadoc != null) {
var tags = javadoc.tags ();
if (tags.size () != 0) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if ("@j2sIgnore".equals (tagEl.getTagName ())) {
if (superVisit) Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTJ2SDocVisitor, "visit", [node]);
return false;
}}
if (this.isDebugging ()) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if ("@j2sDebug".equals (tagEl.getTagName ())) {
if (superVisit) Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTJ2SDocVisitor, "visit", [node]);
this.visitJavadocJ2SSource (tagEl);
return false;
}}
}var toCompileVariableName = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).isToCompileVariableName ();
if (!toCompileVariableName) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if ("@j2sNativeSrc".equals (tagEl.getTagName ())) {
if (superVisit) Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTJ2SDocVisitor, "visit", [node]);
this.visitJavadocJ2SSource (tagEl);
return false;
}}
}for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if ("@j2sNative".equals (tagEl.getTagName ())) {
if (superVisit) Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTJ2SDocVisitor, "visit", [node]);
this.visitJavadocJ2SSource (tagEl);
return false;
}}
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if ("@j2sNativeNJS".equals (tagEl.getTagName ())) {
if (superVisit) Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTJ2SDocVisitor, "visit", [node]);
this.visitJavadocJ2SSource (tagEl);
this.SetNarrativeJS ();
return false;
}}
}}return true;
}, "org.eclipse.jdt.core.dom.Javadoc,org.eclipse.jdt.core.dom.Block,~B");
Clazz.defineMethod (c$, "visitJavadocJ2SSource", 
($fz = function (tagEl) {
var fragments = tagEl.fragments ();
var isFirstLine = true;
var buf =  new StringBuffer ();
for (var iterator = fragments.iterator (); iterator.hasNext (); ) {
var commentEl = iterator.next ();
var text = commentEl.getText ().trim ();
if (isFirstLine) {
if (text.length == 0) {
continue ;}}buf.append (text);
buf.append ("\r\n");
}
this.buffer.append (this.fixCommentBlock (buf.toString ()));
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.TagElement");
Clazz.defineMethod (c$, "readSources", 
function (node, tagName, prefix, suffix, both) {
var existed = false;
var javadoc = node.getJavadoc ();
if (javadoc != null) {
var tags = javadoc.tags ();
if (tags.size () != 0) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if (tagName.equals (tagEl.getTagName ())) {
if (tagEl != null) {
var fragments = tagEl.fragments ();
var buf =  new StringBuffer ();
var isFirstLine = true;
for (var iterator = fragments.iterator (); iterator.hasNext (); ) {
var commentEl = iterator.next ();
var text = commentEl.getText ().trim ();
if (isFirstLine) {
if (text.length == 0) {
continue ;}}buf.append (text);
buf.append ("\r\n");
}
var sources = buf.toString ().trim ();
sources = sources.replaceAll ("(\\/)-\\*|\\*-(\\/)", "$1*$2").replaceAll ("<@>", "@");
this.buffer.append (prefix + sources + suffix);
existed = true;
}}}
}}if (existed && !both) {
return existed;
}var modifiers = node.modifiers ();
for (var iter = modifiers.iterator (); iter.hasNext (); ) {
var obj = iter.next ();
if (Clazz.instanceOf (obj, org.eclipse.jdt.core.dom.Annotation)) {
var annotation = obj;
var qName = annotation.getTypeName ().getFullyQualifiedName ();
var index = qName.indexOf ("J2S");
if (index != -1) {
var annName = qName.substring (index);
annName = annName.replaceFirst ("J2S", "@j2s");
if (annName.startsWith (tagName)) {
var buf =  new StringBuffer ();
var annotationBinding = annotation.resolveAnnotationBinding ();
if (annotationBinding != null) {
var valuePairs = annotationBinding.getAllMemberValuePairs ();
if (valuePairs != null && valuePairs.length > 0) {
for (var i = 0; i < valuePairs.length; i++) {
var value = valuePairs[i].getValue ();
if (value != null) {
if (Clazz.instanceOf (value, Array)) {
var lines = value;
for (var j = 0; j < lines.length; j++) {
buf.append (lines[j]);
buf.append ("\r\n");
}
} else if (Clazz.instanceOf (value, String)) {
buf.append (value);
buf.append ("\r\n");
}}}
}}this.buffer.append (prefix + buf.toString ().trim () + suffix);
existed = true;
}}}}
return existed;
}, "org.eclipse.jdt.core.dom.BodyDeclaration,~S,~S,~S,~B");
Clazz.defineMethod (c$, "fixCommentBlock", 
($fz = function (text) {
if (text == null || text.length == 0) {
return text;
}return java.util.regex.Pattern.compile ("\\/-\\*(.*)\\*-\\/", 40).matcher (text).replaceAll ("/*$1*/");
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "checkJavadocs", 
($fz = function (root) {
if (root !== this.javadocRoot) {
this.nativeJavadoc = null;
this.javadocRoot = root;
}if (this.nativeJavadoc == null) {
this.nativeJavadoc =  new Array (0);
if (Clazz.instanceOf (root, org.eclipse.jdt.core.dom.CompilationUnit)) {
var unit = root;
var commentList = unit.getCommentList ();
var list =  new java.util.ArrayList ();
for (var iter = commentList.iterator (); iter.hasNext (); ) {
var comment = iter.next ();
if (Clazz.instanceOf (comment, org.eclipse.jdt.core.dom.Javadoc)) {
var javadoc = comment;
var tags = javadoc.tags ();
if (tags.size () != 0) {
for (var itr = tags.iterator (); itr.hasNext (); ) {
var tagEl = itr.next ();
var tagName = tagEl.getTagName ();
if ("@j2sIgnore".equals (tagName) || "@j2sDebug".equals (tagName) || "@j2sNative".equals (tagName) || "@j2sNativeNJS".equals (tagName)) {
list.add (comment);
}}
}}}
this.nativeJavadoc = list.toArray (this.nativeJavadoc);
}}}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.ASTNode");
Clazz.defineMethod (c$, "getPreviousStartPosition", 
($fz = function (node) {
var previousStart = 0;
var blockParent = node.getParent ();
if (blockParent != null) {
if (Clazz.instanceOf (blockParent, org.eclipse.jdt.core.dom.Statement)) {
var sttmt = blockParent;
previousStart = sttmt.getStartPosition ();
if (Clazz.instanceOf (sttmt, org.eclipse.jdt.core.dom.Block)) {
var parentBlock = sttmt;
for (var iter = parentBlock.statements ().iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (element === node) {
break;
}previousStart = element.getStartPosition () + element.getLength ();
}
} else if (Clazz.instanceOf (sttmt, org.eclipse.jdt.core.dom.IfStatement)) {
var ifSttmt = sttmt;
if (ifSttmt.getElseStatement () === node) {
var thenSttmt = ifSttmt.getThenStatement ();
previousStart = thenSttmt.getStartPosition () + thenSttmt.getLength ();
}}} else if (Clazz.instanceOf (blockParent, org.eclipse.jdt.core.dom.MethodDeclaration)) {
var method = blockParent;
previousStart = method.getStartPosition ();
} else if (Clazz.instanceOf (blockParent, org.eclipse.jdt.core.dom.Initializer)) {
var initializer = blockParent;
previousStart = initializer.getStartPosition ();
} else if (Clazz.instanceOf (blockParent, org.eclipse.jdt.core.dom.CatchClause)) {
var catchClause = blockParent;
previousStart = catchClause.getStartPosition ();
}}return previousStart;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.Block");
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
if (modifiers != null && modifiers.size () > 0) {
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
}return null;
}, "org.eclipse.jdt.core.dom.BodyDeclaration,~S");
Clazz.defineMethod (c$, "isMethodNativeIgnored", 
function (node) {
if ((node.getModifiers () & 256) != 0) {
if (this.isDebugging () && this.getJ2STag (node, "@j2sDebug") != null) {
return false;
}if (this.getJ2STag (node, "@j2sNative") != null) {
return false;
}return true;
}return true;
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
});
