Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.ASTEmptyVisitor", "java.util.HashSet"], ["net.sf.j2s.core.astvisitors.DependencyASTVisitor", "$.QNTypeBinding"], ["java.lang.StringBuffer", "java.util.ArrayList", "$.Arrays", "net.sf.j2s.core.astvisitors.ASTPackageVisitor", "$.ASTTypeVisitor", "$.Bindings", "org.eclipse.jdt.core.dom.Modifier"], function () {
c$ = Clazz.decorateAsClass (function () {
this.classNameSet = null;
this.classBindingSet = null;
this.musts = null;
this.requires = null;
this.optionals = null;
this.ignores = null;
this.$isDebugging = false;
this.nativeJavadoc = null;
this.javadocRoot = null;
this.toCompileVariableName = true;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "DependencyASTVisitor", net.sf.j2s.core.astvisitors.ASTEmptyVisitor);
Clazz.prepareFields (c$, function () {
this.classNameSet =  new java.util.HashSet ();
this.classBindingSet =  new java.util.HashSet ();
this.musts =  new java.util.HashSet ();
this.requires =  new java.util.HashSet ();
this.optionals =  new java.util.HashSet ();
this.ignores =  new java.util.HashSet ();
});
Clazz.defineMethod (c$, "discardGenericType", 
function (name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).discardGenericType (name);
}, "~S");
Clazz.defineMethod (c$, "getPackageName", 
function () {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).getPackageName ();
});
Clazz.defineMethod (c$, "getClassNames", 
function () {
return this.classNameSet.toArray ( new Array (0));
});
Clazz.defineMethod (c$, "checkSuperType", 
function (set) {
var removed =  new java.util.HashSet ();
var reseted =  new java.util.HashSet ();
for (var iter = set.iterator (); iter.hasNext (); ) {
var n = iter.next ();
if (Clazz.instanceOf (n, net.sf.j2s.core.astvisitors.QNTypeBinding)) {
var qn = n;
var isRemoved = false;
for (var iterator = this.classBindingSet.iterator (); iterator.hasNext (); ) {
var binding = iterator.next ();
if (qn.binding != null && net.sf.j2s.core.astvisitors.Bindings.isSuperType (binding, qn.binding)) {
removed.add (qn);
isRemoved = true;
break;
}}
if (!isRemoved) {
reseted.add (qn);
}}}
set.removeAll (removed);
set.removeAll (reseted);
for (var i = reseted.iterator (); i.hasNext (); ) {
var qn = i.next ();
set.add (qn.qualifiedName);
}
}, "java.util.Set");
Clazz.defineMethod (c$, "remedyDependency", 
function (set) {
var classNames = this.getClassNames ();
for (var i = 0; i < classNames.length; i++) {
if ("net.sf.j2s.ajax.ASWTClass".equals (classNames[i])) {
return ;
}}
var toRemoveList =  new java.util.ArrayList ();
var needRemedy = false;
;for (var iterator = set.iterator (); iterator.hasNext (); ) {
var next = iterator.next ();
var name = null;
if (Clazz.instanceOf (next, net.sf.j2s.core.astvisitors.QNTypeBinding)) {
var qn = next;
name = qn.qualifiedName;
} else {
name = next;
}if ("net.sf.j2s.ajax.AClass".equals (name) || "net.sf.j2s.ajax.ASWTClass".equals (name)) {
needRemedy = true;
}for (var itr = this.classNameSet.iterator (); itr.hasNext (); ) {
var className = itr.next ();
if (name.startsWith (className + ".")) {
toRemoveList.add (next);
}}
}
if (needRemedy) {
set.add ("java.lang.reflect.Constructor");
}for (var iterator = toRemoveList.iterator (); iterator.hasNext (); ) {
set.remove (iterator.next ());
}
}, "java.util.Set");
Clazz.defineMethod (c$, "getDependencyScript", 
function (mainJS) {
this.checkSuperType (this.musts);
this.checkSuperType (this.requires);
this.checkSuperType (this.optionals);
this.remedyDependency (this.musts);
this.remedyDependency (this.requires);
this.remedyDependency (this.optionals);
this.musts.remove ("");
this.requires.remove ("");
this.optionals.remove ("");
for (var iter = this.ignores.iterator (); iter.hasNext (); ) {
var s = iter.next ();
if (this.musts.contains (s)) {
this.musts.remove (s);
}if (this.requires.contains (s)) {
this.requires.remove (s);
}if (this.optionals.contains (s)) {
this.optionals.remove (s);
}}
for (var iter = this.musts.iterator (); iter.hasNext (); ) {
var s = iter.next ();
if (this.requires.contains (s)) {
this.requires.remove (s);
}if (this.optionals.contains (s)) {
this.optionals.remove (s);
}}
for (var iter = this.requires.iterator (); iter.hasNext (); ) {
var s = iter.next ();
if (this.optionals.contains (s)) {
this.optionals.remove (s);
}}
var js = mainJS.toString ();
if (this.musts.size () == 0 && this.requires.size () == 0 && this.optionals.size () == 0) {
return js;
}var buf =  new StringBuffer ();
if (js.startsWith ("Clazz.declarePackage")) {
var index = js.indexOf ("\r\n");
buf.append (js.substring (0, index + 2));
js = js.substring (index + 2);
}buf.append ("Clazz.load (");
if (this.musts.size () != 0 || this.requires.size () != 0) {
buf.append ("[");
var ss = this.musts.toArray ( new Array (0));
java.util.Arrays.sort (ss);
var lastClassName = net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buf, ss, null);
if (this.musts.size () != 0 && this.requires.size () != 0) {
buf.append (", ");
}ss = this.requires.toArray ( new Array (0));
java.util.Arrays.sort (ss);
net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buf, ss, lastClassName);
buf.append ("], ");
} else {
buf.append ("null, ");
}if (this.classNameSet.size () > 1) {
buf.append ("[");
}net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buf, this.getClassNames (), null);
if (this.classNameSet.size () > 1) {
buf.append ("]");
}buf.append (", ");
if (this.optionals.size () != 0) {
buf.append ("[");
var ss = this.optionals.toArray ( new Array (0));
java.util.Arrays.sort (ss);
net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buf, ss, null);
buf.append ("], ");
} else {
buf.append ("null, ");
}buf.append ("function () {\r\n");
buf.append (js);
buf.append ("});\r\n");
return buf.toString ();
}, "StringBuffer");
c$.joinArrayClasses = Clazz.defineMethod (c$, "joinArrayClasses", 
function (buf, ss, last) {
return net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buf, ss, last, ", ");
}, "StringBuffer,~A,~S");
c$.joinArrayClasses = Clazz.defineMethod (c$, "joinArrayClasses", 
function (buf, ss, last, seperator) {
var lastClassName = last;
for (var i = 0; i < ss.length; i++) {
buf.append ("\"");
var dollared = true;
if (lastClassName == null) {
dollared = false;
} else {
var idx1 = lastClassName.lastIndexOf ('.');
var idx2 = ss[i].lastIndexOf ('.');
if (idx1 == -1 || idx2 == -1 || idx1 != idx2) {
dollared = false;
} else {
if (lastClassName.subSequence (0, idx1).equals (ss[i].subSequence (0, idx2))) {
buf.append ("$");
buf.append (ss[i].substring (idx2));
} else {
dollared = false;
}}}if (!dollared) {
var key = "org.eclipse.swt.";
if (ss[i].startsWith (key)) {
buf.append ("$wt.");
buf.append (ss[i].substring (key.length));
;} else {
buf.append (ss[i]);
}}lastClassName = ss[i];
buf.append ("\"");
if (i != ss.length - 1) {
buf.append (seperator);
}}
return lastClassName;
}, "StringBuffer,~A,~S,~S");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var set =  new java.util.HashSet ();
set.add ("java.lang.UnsupportedOperationException");
set.add ("java.lang.CloneNotSupportedException");
set.add ("java.io.ObjectOutputStream");
set.add ("java.lang.ClassNotFoundException");
set.add ("java.io.ObjectInputStream");
set.add ("java.lang.IllegalStateException");
set.add ("java.lang.IllegalArgumentException");
set.add ("java.lang.CloneNotSupportedException");
set.add ("java.io.IOException");
set.add ("java.io.PrintWriter");
set.add ("java.util.NoSuchElementException");
set.add ("java.lang.Float");
set.add ("java.util.ConcurrentModificationException");
set.add ("java.lang.ClassCastException");
set.add ("java.lang.NullPointerException");
set.add ("java.lang.StringIndexOutOfBoundsException");
var s = ["java.lang.Character", "java.lang.InternalError", "java.util.Collections", "java.io.FileInputStream", "java.lang.InterruptedException", "java.lang.IndexOutOfBoundsException", "java.lang.ArrayIndexOutOfBoundsException"];
for (var i = 0; i < s.length; i++) {
set.add (s[i]);
}
s = ["java.io.ObjectOutputStream", "java.text.SimpleDateFormat", "java.util.TimeZone", "java.lang.ClassNotFoundException", "java.io.ObjectInputStream", "java.lang.CloneNotSupportedException", "java.lang.IllegalArgumentException", "java.util.Locale", "java.io.IOException", "java.text.DateFormat", "java.util.GregorianCalendar", "java.util.Calendar", "java.lang.ref.SoftReference"];
for (var i = 0; i < s.length; i++) {
set.add (s[i]);
}
var ss = set.toArray ( new Array (0));
var buf =  new StringBuffer ();
java.util.Arrays.sort (ss);
net.sf.j2s.core.astvisitors.DependencyASTVisitor.joinArrayClasses (buf, ss, null);
System.out.println (buf.toString ().replaceAll (", ", ",\r\n\t"));
}, "~A");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.ImportDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var packageVisitor = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor));
packageVisitor.setPackageName ("" + node.getName ());
return false;
}, "org.eclipse.jdt.core.dom.PackageDeclaration");
Clazz.defineMethod (c$, "readClasses", 
function (annotation, set) {
var buf =  new StringBuffer ();
var annotationBinding = annotation.resolveAnnotationBinding ();
if (annotationBinding != null) {
var valuePairs = annotationBinding.getAllMemberValuePairs ();
if (valuePairs != null && valuePairs.length > 0) {
for (var i = 0; i < valuePairs.length; i++) {
var value = valuePairs[i].getValue ();
if (Clazz.instanceOf (value, Array)) {
var values = value;
for (var j = 0; j < values.length; j++) {
var item = values[j];
if (Clazz.instanceOf (item, org.eclipse.jdt.core.dom.ITypeBinding)) {
var binding = item;
buf.append (binding.getQualifiedName ());
buf.append (",");
}}
continue ;} else if (Clazz.instanceOf (value, org.eclipse.jdt.core.dom.ITypeBinding)) {
var binding = value;
value = binding.getQualifiedName ();
}buf.append (value);
buf.append (",");
}
}}var split = buf.toString ().trim ().$plit ("\\s*,\\s*");
for (var i = 0; i < split.length; i++) {
var s = split[i].trim ();
if (s.length > 0) {
set.add (s);
}}
}, "org.eclipse.jdt.core.dom.Annotation,java.util.Set");
Clazz.defineMethod (c$, "readClasses", 
function (tagEl, set) {
var fragments = tagEl.fragments ();
var buf =  new StringBuffer ();
var isFirstLine = true;
for (var iterator = fragments.iterator (); iterator.hasNext (); ) {
var commentEl = iterator.next ();
var text = commentEl.getText ().trim ();
if (isFirstLine) {
if (text.length == 0) {
continue ;}}buf.append (text);
buf.append (",");
}
var split = buf.toString ().trim ().$plit ("\\s*,\\s*");
for (var i = 0; i < split.length; i++) {
var s = split[i].trim ();
if (s.length > 0) {
set.add (s);
}}
}, "org.eclipse.jdt.core.dom.TagElement,java.util.Set");
Clazz.defineMethod (c$, "visit", 
function (node) {
var resolveTypeBinding = node.getType ().resolveBinding ();
var declaringClass = resolveTypeBinding.getDeclaringClass ();
var qn =  new net.sf.j2s.core.astvisitors.QNTypeBinding ();
var qualifiedName = null;
if (declaringClass != null) {
var dclClass = null;
while ((dclClass = declaringClass.getDeclaringClass ()) != null) {
declaringClass = dclClass;
}
qualifiedName = declaringClass.getQualifiedName ();
qn.binding = declaringClass;
} else {
qualifiedName = resolveTypeBinding.getQualifiedName ();
qn.binding = resolveTypeBinding;
}qualifiedName = this.discardGenericType (qualifiedName);
qn.qualifiedName = qualifiedName;
if (this.isQualifiedNameOK (qualifiedName, node) && !this.musts.contains (qn) && !this.requires.contains (qn)) {
this.optionals.add (qn);
}return false;
}, "org.eclipse.jdt.core.dom.TypeLiteral");
Clazz.defineMethod (c$, "visit", 
function (node) {
var resolveBinding = node.resolveBinding ();
if (resolveBinding != null && resolveBinding.isTopLevel ()) {
var thisClassName = resolveBinding.getQualifiedName ();
this.classNameSet.add (thisClassName);
this.classBindingSet.add (resolveBinding);
}this.readTags (node);
this.visitForMusts (node);
this.visitForRequires (node);
this.visitForOptionals (node);
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.TypeDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
if (this.getJ2STag (node, "@j2sIgnore") != null) {
return false;
}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.FieldDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
if (this.getJ2STag (node, "@j2sIgnore") != null) {
return false;
}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.Initializer");
Clazz.defineMethod (c$, "readTags", 
($fz = function (node) {
var javadoc = node.getJavadoc ();
if (javadoc != null) {
var tags = javadoc.tags ();
if (tags.size () != 0) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
var tagName = tagEl.getTagName ();
if ("@j2sRequireImport".equals (tagName)) {
this.readClasses (tagEl, this.requires);
} else if ("@j2sOptionalImport".equals (tagName)) {
this.readClasses (tagEl, this.optionals);
} else if ("@j2sIgnoreImport".equals (tagName)) {
this.readClasses (tagEl, this.ignores);
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
if (annName.startsWith ("@j2sRequireImport")) {
this.readClasses (annotation, this.requires);
} else if (annName.startsWith ("@j2sOptionalImport")) {
this.readClasses (annotation, this.optionals);
} else if (annName.startsWith ("@j2sIgnoreImport")) {
this.readClasses (annotation, this.ignores);
}}}}
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.AbstractTypeDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var resolveBinding = node.resolveBinding ();
if (resolveBinding.isTopLevel ()) {
var thisClassName = resolveBinding.getQualifiedName ();
this.classNameSet.add (thisClassName);
this.classBindingSet.add (resolveBinding);
}this.readTags (node);
this.musts.add ("java.lang.Enum");
this.visitForMusts (node);
this.visitForRequires (node);
this.visitForOptionals (node);
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.EnumDeclaration");
Clazz.defineMethod (c$, "isClassKnown", 
function (qualifiedName) {
var knownClasses = ["java.lang.Object", "java.lang.Class", "java.lang.String", "java.io.Serializable", "java.lang.Iterable", "java.lang.CharSequence", "java.lang.Cloneable", "java.lang.Comparable", "java.lang.Runnable", "java.util.Comparator", "java.lang.System", "java.io.PrintStream", "java.lang.Math", "java.lang.Integer"];
for (var i = 0; i < knownClasses.length; i++) {
if (knownClasses[i].equals (qualifiedName)) {
return true;
}}
return false;
}, "~S");
Clazz.defineMethod (c$, "isQualifiedNameOK", 
function (qualifiedName, node) {
if (qualifiedName != null && !this.isClassKnown (qualifiedName) && qualifiedName.indexOf ('[') == -1 && !"int".equals (qualifiedName) && !"float".equals (qualifiedName) && !"double".equals (qualifiedName) && !"long".equals (qualifiedName) && !"short".equals (qualifiedName) && !"byte".equals (qualifiedName) && !"char".equals (qualifiedName) && !"boolean".equals (qualifiedName) && !"void".equals (qualifiedName) && !qualifiedName.startsWith ("org.w3c.dom.") && !qualifiedName.startsWith ("org.eclipse.swt.internal.xhtml.") && !qualifiedName.startsWith ("net.sf.j2s.html.")) {
var root = node.getRoot ();
if (Clazz.instanceOf (root, org.eclipse.jdt.core.dom.CompilationUnit)) {
var type = root;
var existedSelf = false;
var types = type.types ();
for (var iter = types.iterator (); iter.hasNext (); ) {
var typeDecl = iter.next ();
if (typeDecl.resolveBinding ().getQualifiedName ().equals (qualifiedName)) {
existedSelf = true;
break;
}}
if (!existedSelf) {
return true;
}}}return false;
}, "~S,org.eclipse.jdt.core.dom.ASTNode");
Clazz.defineMethod (c$, "visitForMusts", 
function (node) {
var superclassType = null;
if (Clazz.instanceOf (node, org.eclipse.jdt.core.dom.TypeDeclaration)) {
superclassType = (node).getSuperclassType ();
}if (superclassType != null) {
var superBinding = superclassType.resolveBinding ();
if (superBinding != null) {
var qn =  new net.sf.j2s.core.astvisitors.QNTypeBinding ();
var qualifiedName;
var declaringClass = superBinding.getDeclaringClass ();
if (declaringClass != null) {
var dclClass = null;
while ((dclClass = declaringClass.getDeclaringClass ()) != null) {
declaringClass = dclClass;
}
qualifiedName = declaringClass.getQualifiedName ();
qn.binding = declaringClass;
} else {
qualifiedName = superBinding.getQualifiedName ();
qn.binding = superBinding;
}qualifiedName = this.discardGenericType (qualifiedName);
qn.qualifiedName = qualifiedName;
if (this.isQualifiedNameOK (qualifiedName, node)) {
this.musts.add (qn);
}}}var superInterfaces = null;
if (Clazz.instanceOf (node, org.eclipse.jdt.core.dom.TypeDeclaration)) {
superInterfaces = (node).superInterfaceTypes ();
} else {
superInterfaces = (node).superInterfaceTypes ();
}var size = superInterfaces.size ();
if (size != 0) {
for (var iter = superInterfaces.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var binding = (element).resolveBinding ();
var qn =  new net.sf.j2s.core.astvisitors.QNTypeBinding ();
if (binding != null) {
var qualifiedName;
var declaringClass = binding.getDeclaringClass ();
if (declaringClass != null) {
var dclClass = null;
while ((dclClass = declaringClass.getDeclaringClass ()) != null) {
declaringClass = dclClass;
}
qualifiedName = declaringClass.getQualifiedName ();
qn.binding = declaringClass;
} else {
qualifiedName = binding.getQualifiedName ();
qn.binding = binding;
}qualifiedName = this.discardGenericType (qualifiedName);
qn.qualifiedName = qualifiedName;
if (this.isQualifiedNameOK (qualifiedName, node)) {
this.musts.add (qn);
}} else {
qn.qualifiedName = element.toString ();
qn.binding = binding;
this.musts.add (qn);
}}
}}, "org.eclipse.jdt.core.dom.AbstractTypeDeclaration");
Clazz.defineMethod (c$, "visitForRequires", 
function (node) {
for (var iter = node.bodyDeclarations ().iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.TypeDeclaration)) {
var isInteface = false;
if (Clazz.instanceOf (node, org.eclipse.jdt.core.dom.TypeDeclaration)) {
isInteface = (node).isInterface ();
} else {
isInteface = false;
}if (isInteface || (node.getModifiers () & 8) != 0) {
var visitor = this.getSelfVisitor ();
element.accept (visitor);
this.requires.addAll (visitor.musts);
this.requires.addAll (visitor.requires);
this.requires.addAll (visitor.optionals);
}} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
if (this.getJ2STag (element, "@j2sIgnore") != null) {
continue ;}var visitor = this.getSelfVisitor ();
element.accept (this);
this.requires.addAll (visitor.musts);
this.requires.addAll (visitor.requires);
this.requires.addAll (visitor.optionals);
} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
if (this.getJ2STag (field, "@j2sIgnore") != null) {
continue ;}var fragments = field.fragments ();
for (var j = 0; j < fragments.size (); j++) {
var vdf = fragments.get (j);
var initializer = vdf.getInitializer ();
var visitor = this.getSelfVisitor ();
if (initializer != null) {
initializer.accept (visitor);
}this.requires.addAll (visitor.musts);
this.requires.addAll (visitor.requires);
this.requires.addAll (visitor.optionals);
}
}}
}, "org.eclipse.jdt.core.dom.AbstractTypeDeclaration");
Clazz.defineMethod (c$, "getSelfVisitor", 
($fz = function () {
try {
var obj = this.getClass ().getConstructor ( new Array (0)).newInstance ( new Array (0));
return obj;
} catch (e$$) {
if (Clazz.instanceOf (e$$, IllegalArgumentException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, SecurityException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, InstantiationException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, NoSuchMethodException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
return null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "visitForOptionals", 
function (node) {
}, "org.eclipse.jdt.core.dom.AbstractTypeDeclaration");
Clazz.defineMethod (c$, "isSimpleQualified", 
function (node) {
var qualifier = node.getQualifier ();
if (Clazz.instanceOf (qualifier, org.eclipse.jdt.core.dom.SimpleName)) {
return true;
} else if (Clazz.instanceOf (qualifier, org.eclipse.jdt.core.dom.QualifiedName)) {
return this.isSimpleQualified (qualifier);
}return false;
}, "org.eclipse.jdt.core.dom.QualifiedName");
Clazz.defineMethod (c$, "visit", 
function (node) {
var constValue = node.resolveConstantExpressionValue ();
if (constValue != null && (Clazz.instanceOf (constValue, Number) || Clazz.instanceOf (constValue, Character) || Clazz.instanceOf (constValue, String) || Clazz.instanceOf (constValue, Boolean)) && this.isSimpleQualified (node)) {
return false;
}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.QualifiedName");
Clazz.defineMethod (c$, "visit", 
function (node) {
var constValue = node.resolveConstantExpressionValue ();
if (constValue != null && (Clazz.instanceOf (constValue, Number) || Clazz.instanceOf (constValue, Character) || Clazz.instanceOf (constValue, Boolean))) {
return false;
}var typeBinding = node.resolveTypeBinding ();
var binding = node.resolveBinding ();
var isCasting = false;
var isQualified = false;
var nodeParent = node.getParent ();
while (nodeParent != null && Clazz.instanceOf (nodeParent, org.eclipse.jdt.core.dom.QualifiedName)) {
isQualified = true;
nodeParent = nodeParent.getParent ();
}
if (nodeParent != null && Clazz.instanceOf (nodeParent, org.eclipse.jdt.core.dom.SimpleType)) {
isCasting = true;
}if (typeBinding != null && !isCasting && isQualified && !(Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IVariableBinding))) {
var qn =  new net.sf.j2s.core.astvisitors.QNTypeBinding ();
var qualifiedName = null;
if (!typeBinding.isPrimitive ()) {
if (typeBinding.isArray ()) {
var elementType = typeBinding.getElementType ();
while (elementType.isArray ()) {
elementType = elementType.getElementType ();
}
if (!elementType.isPrimitive ()) {
var declaringClass = elementType.getDeclaringClass ();
if (declaringClass != null) {
var dclClass = null;
while ((dclClass = declaringClass.getDeclaringClass ()) != null) {
declaringClass = dclClass;
}
qualifiedName = declaringClass.getQualifiedName ();
qn.binding = declaringClass;
} else {
qualifiedName = elementType.getQualifiedName ();
qn.binding = elementType;
}}} else {
var declaringClass = typeBinding.getDeclaringClass ();
if (declaringClass != null) {
var dclClass = null;
while ((dclClass = declaringClass.getDeclaringClass ()) != null) {
declaringClass = dclClass;
}
qualifiedName = declaringClass.getQualifiedName ();
qn.binding = declaringClass;
} else {
qualifiedName = typeBinding.getQualifiedName ();
qn.binding = typeBinding;
}}}if (this.isQualifiedNameOK (qualifiedName, node) && !this.musts.contains (qualifiedName) && !this.requires.contains (qualifiedName)) {
qn.qualifiedName = qualifiedName;
this.optionals.add (qn);
}} else if (Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IVariableBinding)) {
var varBinding = binding;
if ((varBinding.getModifiers () & 8) != 0) {
var qn =  new net.sf.j2s.core.astvisitors.QNTypeBinding ();
var qualifiedName = null;
var variableDeclaration = varBinding.getVariableDeclaration ();
var declaringClass = variableDeclaration.getDeclaringClass ();
var dclClass = null;
while ((dclClass = declaringClass.getDeclaringClass ()) != null) {
declaringClass = dclClass;
}
qualifiedName = declaringClass.getQualifiedName ();
if (this.isQualifiedNameOK (qualifiedName, node) && !this.musts.contains (qualifiedName) && !this.requires.contains (qualifiedName)) {
qn.qualifiedName = qualifiedName;
this.optionals.add (qn);
}}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.SimpleName");
Clazz.defineMethod (c$, "visit", 
function (node) {
var resolveTypeBinding = node.resolveTypeBinding ();
var qn =  new net.sf.j2s.core.astvisitors.QNTypeBinding ();
var qualifiedName = null;
if (resolveTypeBinding != null && resolveTypeBinding.isAnonymous ()) {
qualifiedName = node.getType ().resolveBinding ().getQualifiedName ();
qn.binding = node.getType ().resolveBinding ();
} else if (resolveTypeBinding != null) {
var declaringClass = resolveTypeBinding.getDeclaringClass ();
if (declaringClass != null) {
var dclClass = null;
while ((dclClass = declaringClass.getDeclaringClass ()) != null) {
declaringClass = dclClass;
}
qualifiedName = declaringClass.getQualifiedName ();
qn.binding = declaringClass;
} else {
qualifiedName = resolveTypeBinding.getQualifiedName ();
qn.binding = resolveTypeBinding;
}} else {
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}qualifiedName = this.discardGenericType (qualifiedName);
qn.qualifiedName = qualifiedName;
if (this.isQualifiedNameOK (qualifiedName, node) && !this.musts.contains (qn) && !this.requires.contains (qn)) {
this.optionals.add (qn);
}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.ClassInstanceCreation");
Clazz.defineMethod (c$, "visit", 
function (node) {
var resolveMethodBinding = node.resolveMethodBinding ();
if (resolveMethodBinding != null && org.eclipse.jdt.core.dom.Modifier.isStatic (resolveMethodBinding.getModifiers ())) {
var expression = node.getExpression ();
if (Clazz.instanceOf (expression, org.eclipse.jdt.core.dom.Name)) {
var name = expression;
var resolveTypeBinding = name.resolveTypeBinding ();
var declaringClass = resolveTypeBinding.getDeclaringClass ();
var qn =  new net.sf.j2s.core.astvisitors.QNTypeBinding ();
var qualifiedName = null;
if (declaringClass != null) {
var dclClass = null;
while ((dclClass = declaringClass.getDeclaringClass ()) != null) {
declaringClass = dclClass;
}
qualifiedName = declaringClass.getQualifiedName ();
qn.binding = declaringClass;
} else {
qualifiedName = resolveTypeBinding.getQualifiedName ();
qn.binding = resolveTypeBinding;
}qualifiedName = this.discardGenericType (qualifiedName);
qn.qualifiedName = qualifiedName;
if (this.isQualifiedNameOK (qualifiedName, node) && !this.musts.contains (qn) && !this.requires.contains (qn)) {
this.optionals.add (qn);
}}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.MethodInvocation");
Clazz.defineMethod (c$, "isDebugging", 
function () {
return this.$isDebugging;
});
Clazz.defineMethod (c$, "setDebugging", 
function (isDebugging) {
this.$isDebugging = isDebugging;
}, "~B");
Clazz.defineMethod (c$, "isToCompileVariableName", 
function () {
return this.toCompileVariableName;
});
Clazz.defineMethod (c$, "setToCompileVariableName", 
function (toCompileVariableName) {
this.toCompileVariableName = toCompileVariableName;
}, "~B");
Clazz.defineMethod (c$, "visit", 
function (node) {
var mBinding = node.resolveBinding ();
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", "deal")) {
var parameterTypes = mBinding.getParameterTypes ();
if (parameterTypes != null && parameterTypes.length == 1) {
var paramType = parameterTypes[0];
var declaringClass = paramType.getDeclaringClass ();
var qn =  new net.sf.j2s.core.astvisitors.QNTypeBinding ();
var qualifiedName = null;
if (declaringClass != null) {
qn.binding = declaringClass;
qualifiedName = declaringClass.getQualifiedName ();
} else {
qn.binding = paramType;
qualifiedName = paramType.getQualifiedName ();
}qn.qualifiedName = this.discardGenericType (qualifiedName);
this.optionals.add (qn);
}}var toBeIgnored = false;
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.SimpleRPCRunnable", "ajaxRun")) {
toBeIgnored = true;
}if (!toBeIgnored) {
var pipeMethods = ["pipeSetup", "pipeThrough", "through", "pipeMonitoring", "pipeMonitoringInterval", "pipeWaitClosingInterval", "setPipeHelper"];
for (var i = 0; i < pipeMethods.length; i++) {
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", pipeMethods[i])) {
toBeIgnored = true;
break;
}}
}if (!toBeIgnored) {
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.CompoundPipeSession", "convert")) {
toBeIgnored = true;
}}if (toBeIgnored && this.getJ2STag (node, "@j2sKeep") == null) {
return false;
}if (this.getJ2STag (node, "@j2sNative") != null) {
return false;
}if (this.getJ2STag (node, "@j2sNativeSrc") != null) {
return false;
}if (this.getJ2STag (node, "@j2sIgnore") != null) {
return false;
}if (node.getBody () == null) {
return false;
}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var constValue = node.resolveConstantExpressionValue ();
var resolveFieldBinding = node.resolveFieldBinding ();
var exp = node.getExpression ();
if (resolveFieldBinding != null && constValue == null && org.eclipse.jdt.core.dom.Modifier.isStatic (resolveFieldBinding.getModifiers ())) {
var expression = exp;
if (Clazz.instanceOf (expression, org.eclipse.jdt.core.dom.Name)) {
var name = expression;
var resolveTypeBinding = name.resolveTypeBinding ();
var declaringClass = resolveTypeBinding.getDeclaringClass ();
var qn =  new net.sf.j2s.core.astvisitors.QNTypeBinding ();
var qualifiedName = null;
if (declaringClass != null) {
var dclClass = null;
while ((dclClass = declaringClass.getDeclaringClass ()) != null) {
declaringClass = dclClass;
}
qualifiedName = declaringClass.getQualifiedName ();
qn.binding = declaringClass;
} else {
qualifiedName = resolveTypeBinding.getQualifiedName ();
qn.binding = resolveTypeBinding;
}qualifiedName = this.discardGenericType (qualifiedName);
qn.qualifiedName = qualifiedName;
if (this.isQualifiedNameOK (qualifiedName, node) && !this.musts.contains (qn) && !this.requires.contains (qn)) {
this.optionals.add (qn);
}}} else if (constValue != null && (Clazz.instanceOf (constValue, Number) || Clazz.instanceOf (constValue, Character) || Clazz.instanceOf (constValue, Boolean))) {
if ((Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.QualifiedName)) || (Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.QualifiedName) && this.isSimpleQualified (exp))) {
return false;
}}return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.FieldAccess");
Clazz.defineMethod (c$, "visit", 
function (node) {
var parent = node.getParent ();
if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.MethodDeclaration)) {
var method = parent;
var javadoc = method.getJavadoc ();
if (this.visitNativeJavadoc (javadoc, node, true) == false) {
return false;
}} else if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.Initializer)) {
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
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.Block");
Clazz.defineMethod (c$, "visitNativeJavadoc", 
function (javadoc, node, superVisit) {
if (javadoc != null) {
var tags = javadoc.tags ();
if (tags.size () != 0) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if ("@j2sIgnore".equals (tagEl.getTagName ())) {
if (superVisit) Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
return false;
}}
if (this.$isDebugging) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if ("@j2sDebug".equals (tagEl.getTagName ())) {
if (superVisit) Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
return false;
}}
}if (!this.toCompileVariableName) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if ("@j2sNativeSrc".equals (tagEl.getTagName ())) {
if (superVisit) Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
return false;
}}
}for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if ("@j2sNative".equals (tagEl.getTagName ())) {
if (superVisit) Clazz.superCall (this, net.sf.j2s.core.astvisitors.DependencyASTVisitor, "visit", [node]);
return false;
}}
}}return true;
}, "org.eclipse.jdt.core.dom.Javadoc,org.eclipse.jdt.core.dom.Block,~B");
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
if ("@j2sIgnore".equals (tagName) || "@j2sDebug".equals (tagName) || "@j2sNative".equals (tagName)) {
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
var modifiers = node.modifiers ();
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
var javadoc = node.getJavadoc ();
if (javadoc != null) {
var tags = javadoc.tags ();
if (tags.size () != 0) {
for (var iter = tags.iterator (); iter.hasNext (); ) {
var tagEl = iter.next ();
if (tagName.equals (tagEl.getTagName ())) {
return tagEl;
}}
}}return null;
}, "org.eclipse.jdt.core.dom.BodyDeclaration,~S");
c$ = Clazz.decorateAsClass (function () {
this.qualifiedName = null;
this.binding = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "QNTypeBinding");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj == null) {
return false;
}if (Clazz.instanceOf (obj, String)) {
return this.qualifiedName.equals (obj);
} else if (Clazz.instanceOf (obj, net.sf.j2s.core.astvisitors.QNTypeBinding)) {
var b = obj;
return this.qualifiedName.equals (b.qualifiedName);
} else {
return false;
}}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.qualifiedName.hashCode ();
});
});
