Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.AbstractPluginVisitor"], "net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor", ["java.lang.StringBuffer"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.astvisitors, "ASTJ2SMapVisitor", net.sf.j2s.core.astvisitors.AbstractPluginVisitor);
c$.setJ2SMap = Clazz.defineMethod (c$, "setJ2SMap", 
function (m) {
($t$ = net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.maps = m, net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.prototype.maps = net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.maps, $t$);
}, "java.util.Map");
Clazz.defineMethod (c$, "getJ2SName", 
function (node) {
var binding = node.resolveBinding ();
if (binding == null) return node.getIdentifier ();
if (Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IVariableBinding)) {
return this.getJ2SName (binding);
}if (Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IMethodBinding)) {
return this.getJ2SName (binding);
}var nameID = node.getIdentifier ();
return nameID;
}, "org.eclipse.jdt.core.dom.SimpleName");
Clazz.defineMethod (c$, "getJ2SName", 
function (binding) {
var nameID = binding.getName ();
if (net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.maps == null || net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.maps.size () == 0) {
return nameID;
}var className = null;
var varBinding = binding;
var declaringClass = varBinding.getDeclaringClass ();
if (declaringClass != null) {
className = declaringClass.getQualifiedName ();
}var key = className + "." + nameID;
var value = net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.maps.get (key);
if (value != null && Clazz.instanceOf (value, net.sf.j2s.core.astvisitors.NameConvertItem)) {
var item = value;
return item.toVarName;
}return nameID;
}, "org.eclipse.jdt.core.dom.IVariableBinding");
Clazz.defineMethod (c$, "getJ2SName", 
($fz = function (binding) {
var nameID = binding.getName ();
if (net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.maps == null || net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.maps.size () == 0) {
return nameID;
}var className = null;
var methodBinding = binding;
var declaringClass = methodBinding.getDeclaringClass ();
var superclass = declaringClass.getSuperclass ();
while (superclass != null) {
var declaredMethods = superclass.getDeclaredMethods ();
for (var i = 0; i < declaredMethods.length; i++) {
var methodName = declaredMethods[i].getName ();
if (nameID.equals (methodName)) {
return this.getJ2SName (declaredMethods[i]);
}}
superclass = superclass.getSuperclass ();
}
if (declaringClass != null) {
className = declaringClass.getQualifiedName ();
}var key = className + "#" + nameID;
var value = net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.maps.get (key);
if (value != null && Clazz.instanceOf (value, net.sf.j2s.core.astvisitors.NameConvertItem)) {
var item = value;
return item.toVarName;
}return nameID;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.IMethodBinding");
Clazz.defineMethod (c$, "checkSameName", 
function (binding, name) {
if (binding != null) {
var declaredMethods = binding.getDeclaredMethods ();
for (var i = 0; i < declaredMethods.length; i++) {
var methodName = this.getJ2SName (declaredMethods[i]);
if (name.equals (methodName)) {
return true;
}}
var superclass = binding.getSuperclass ();
if (this.checkSameName (superclass, name)) {
return true;
}var interfaces = binding.getInterfaces ();
if (interfaces != null) {
for (var i = 0; i < interfaces.length; i++) {
if (this.checkSameName (interfaces[i], name)) {
return true;
}}
}}return false;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
Clazz.defineMethod (c$, "getFieldName", 
function (binding, name) {
if (binding != null) {
var superclass = binding.getSuperclass ();
if (superclass != null) {
var buffer =  new StringBuffer ();
var declaredFields = superclass.getDeclaredFields ();
for (var i = 0; i < declaredFields.length; i++) {
var fieldName = this.getJ2SName (declaredFields[i]);
if (name.equals (fieldName)) {
buffer.append ("$");
}}
buffer.append (this.getFieldName (superclass, name));
return buffer.toString ();
}}return name;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
Clazz.defineMethod (c$, "isInheritedFieldName", 
function (binding, name) {
if ("serialVersionUID".equals (name)) {
return false;
}if (binding == null) {
return false;
}var superclass = binding.getSuperclass ();
var declaredFields = null;
if (superclass != null) {
declaredFields = superclass.getDeclaredFields ();
} else {
declaredFields = binding.getDeclaredFields ();
}for (var i = 0; i < declaredFields.length; i++) {
var fieldName = this.getJ2SName (declaredFields[i]);
if (name.equals (fieldName)) {
return true;
}}
if (this.isInheritedFieldName (superclass, name)) {
return true;
}var interfaces = binding.getInterfaces ();
if (interfaces != null) {
for (var i = 0; i < interfaces.length; i++) {
if (this.isInheritedFieldName (interfaces[i], name)) {
return true;
}}
}return false;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
Clazz.defineStatics (c$,
"maps", null);
});
