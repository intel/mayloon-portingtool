Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.AbstractPluginVisitor"], "net.sf.j2s.core.astvisitors.ASTTypeVisitor", ["java.lang.StringBuffer", "net.sf.j2s.core.astvisitors.ASTFieldVisitor", "$.ASTPackageVisitor", "$.Bindings"], function () {
c$ = Clazz.decorateAsClass (function () {
this.thisClassName = "";
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "ASTTypeVisitor", net.sf.j2s.core.astvisitors.AbstractPluginVisitor);
Clazz.defineMethod (c$, "getClassName", 
function () {
return this.thisClassName;
});
Clazz.defineMethod (c$, "setClassName", 
function (className) {
this.thisClassName = className;
}, "~S");
Clazz.defineMethod (c$, "getFullClassName", 
function () {
var fullClassName = null;
var thisPackageName = (this.getVisitor ().getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).getPackageName ();
if (thisPackageName != null && thisPackageName.length != 0 && !"java.lang".equals (thisPackageName)) {
fullClassName = thisPackageName + '.' + this.thisClassName;
} else {
fullClassName = this.thisClassName;
}return fullClassName;
});
Clazz.defineMethod (c$, "discardGenericType", 
function (name) {
if (name == null) {
return null;
}return net.sf.j2s.core.astvisitors.Bindings.removeBrackets (name);
}, "~S");
Clazz.defineMethod (c$, "isInheritedClassName", 
function (binding, name) {
if (binding == null) {
return false;
}var bindingName = this.discardGenericType (binding.getQualifiedName ());
if (name.equals (bindingName)) {
return true;
}var superclass = binding.getSuperclass ();
if (this.isInheritedClassName (superclass, name)) {
return true;
}var interfaces = binding.getInterfaces ();
if (interfaces != null) {
for (var i = 0; i < interfaces.length; i++) {
if (this.isInheritedClassName (interfaces[i], name)) {
return true;
}}
}return false;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
Clazz.defineMethod (c$, "shortenQualifiedName", 
function (name) {
name = net.sf.j2s.core.astvisitors.Bindings.removeBrackets (name);
var index = name.indexOf ("java.lang.");
var ch = String.fromCharCode (0);
if (index == 0 && (name.indexOf ('.', index + 10) == -1 || (((ch = name.charAt (index + 10))).charCodeAt (0) >= ('A').charCodeAt (0) && (ch).charCodeAt (0) <= ('Z').charCodeAt (0)))) {
if (!name.startsWith ("java.lang.ref") && !name.startsWith ("java.lang.annotaion") && !name.startsWith ("java.lang.instrument") && !name.startsWith ("java.lang.management")) {
name = name.substring (10);
}}var swt = "org.eclipse.swt.SWT";
index = name.indexOf (swt);
if (index != -1) {
var after = name.substring (swt.length);
if (after.length == 0 || after.startsWith (".")) {
name = "$WT" + after;
}} else {
var os = "org.eclipse.swt.internal.browser.OS";
index = name.indexOf (os);
if (index != -1) {
var after = name.substring (os.length);
if (after.length == 0 || after.startsWith (".")) {
name = "O$" + after;
}}}var xhtml = "org.eclipse.swt.internal.xhtml.";
index = name.indexOf (xhtml);
if (index != -1) {
var after = name.substring (xhtml.length);
name = after;
}xhtml = "net.sf.j2s.html.";
index = name.indexOf (xhtml);
if (index != -1) {
var after = name.substring (xhtml.length);
name = after;
}swt = "org.eclipse.swt";
index = name.indexOf (swt);
if (index != -1) {
var after = name.substring (swt.length);
name = "$wt" + after;
}return name;
}, "~S");
Clazz.defineMethod (c$, "shortenPackageName", 
function (fullName) {
var name = fullName.substring (0, fullName.lastIndexOf ('.'));
name = net.sf.j2s.core.astvisitors.Bindings.removeBrackets (name);
var index = name.indexOf ("java.lang.");
var ch = String.fromCharCode (0);
if (index != -1 && (name.indexOf ('.', index + 10) == -1 || (((ch = name.charAt (index + 10))).charCodeAt (0) >= ('A').charCodeAt (0) && (ch).charCodeAt (0) <= ('Z').charCodeAt (0)))) {
if (!fullName.startsWith ("java.lang.ref") && !fullName.startsWith ("java.lang.annotation") && !fullName.startsWith ("java.lang.instrument") && !fullName.startsWith ("java.lang.management")) {
name = name.substring (10);
}}var swt = "org.eclipse.swt.SWT";
index = name.indexOf (swt);
if (index != -1) {
var after = name.substring (swt.length);
if (after.length == 0 || after.startsWith (".")) {
name = "$WT" + after;
}} else {
var os = "org.eclipse.swt.internal.browser.OS";
index = name.indexOf (os);
if (index != -1) {
var after = name.substring (os.length);
if (after.length == 0 || after.startsWith (".")) {
name = "O$" + after;
}}}swt = "org.eclipse.swt";
index = name.indexOf (swt);
if (index != -1) {
var after = name.substring (swt.length);
name = "$wt" + after;
}return name;
}, "~S");
Clazz.defineMethod (c$, "getTypeStringName", 
function (type) {
if (type == null) {
return null;
}if (Clazz.instanceOf (type, org.eclipse.jdt.core.dom.PrimitiveType) || Clazz.instanceOf (type, org.eclipse.jdt.core.dom.WildcardType)) {
return null;
} else if (Clazz.instanceOf (type, org.eclipse.jdt.core.dom.ArrayType)) {
var arrType = type;
return this.getTypeStringName (arrType.getElementType ());
} else if (Clazz.instanceOf (type, org.eclipse.jdt.core.dom.ParameterizedType)) {
var paramType = type;
return this.getTypeStringName (paramType.getType ());
} else if (Clazz.instanceOf (type, org.eclipse.jdt.core.dom.QualifiedType)) {
var qualType = type;
return this.getTypeStringName (qualType.getQualifier ()) + "." + qualType.getName ().getIdentifier ();
} else if (Clazz.instanceOf (type, org.eclipse.jdt.core.dom.SimpleType)) {
var simpType = type;
var binding = simpType.resolveBinding ();
if (binding != null) {
return binding.getQualifiedName ();
}}return null;
}, "org.eclipse.jdt.core.dom.Type");
Clazz.defineMethod (c$, "assureQualifiedName", 
function (name) {
if (name == null || name.length == 0) {
return name;
}var keywords = net.sf.j2s.core.astvisitors.ASTFieldVisitor.keywods;
var packages = null;
var existedKeyword = false;
for (var i = 0; i < keywords.length; i++) {
if (name.indexOf (keywords[i]) != -1) {
if (packages == null) {
packages = name.$plit ("\\.");
}for (var j = 0; j < packages.length; j++) {
if (keywords[i].equals (packages[j])) {
packages[j] = "[\"" + packages[j] + "\"]";
existedKeyword = true;
}}
}}
if (existedKeyword) {
var sb =  new StringBuffer ();
for (var i = 0; i < packages.length; i++) {
if ((packages[i].charAt (0)).charCodeAt (0) == ('[').charCodeAt (0)) {
if (i == 0) {
sb.append ("window");
}sb.append (packages[i]);
} else {
if (i != 0) {
sb.append ('.');
}sb.append (packages[i]);
}}
return sb.toString ();
} else {
return name;
}}, "~S");
Clazz.defineMethod (c$, "isIntegerType", 
function (type) {
if ("int".equals (type) || "long".equals (type) || "byte".equals (type) || "short".equals (type) || "char".equals (type)) {
return true;
}return false;
}, "~S");
});
