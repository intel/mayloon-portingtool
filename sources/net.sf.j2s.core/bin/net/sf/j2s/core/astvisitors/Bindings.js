Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (null, "net.sf.j2s.core.astvisitors.Bindings", ["java.lang.StringBuffer", "java.util.ArrayList", "$.Collections", "$.HashSet", "org.eclipse.core.runtime.Assert", "$.Platform", "org.eclipse.jdt.core.Signature", "org.eclipse.jdt.core.dom.Modifier"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.astvisitors, "Bindings");
c$.equals = Clazz.defineMethod (c$, "equals", 
function (b1, b2) {
var isEqualTo = b1.isEqualTo (b2);
if (!isEqualTo && Clazz.instanceOf (b1, org.eclipse.jdt.core.dom.ITypeBinding) && Clazz.instanceOf (b2, org.eclipse.jdt.core.dom.ITypeBinding)) {
var bb1 = b1;
var bb2 = b2;
var bb1Name = bb1.getBinaryName ();
if (bb1Name != null) {
isEqualTo = bb1Name.equals (bb2.getBinaryName ());
}}if (net.sf.j2s.core.astvisitors.Bindings.CHECK_CORE_BINDING_IS_EQUAL_TO) {
var originalEquals = net.sf.j2s.core.astvisitors.Bindings.originalEquals (b1, b2);
if (originalEquals != isEqualTo) {
var detail = "\nb1 == " + b1.getKey () + ",\nb2 == " + (b2 == null ? "null binding" : b2.getKey ());
try {
detail += "\nb1.getJavaElement() == " + b1.getJavaElement () + ",\nb2.getJavaElement() == " + (b2 == null ? "null binding" : b2.getJavaElement ().toString ());
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
detail += "\nException in getJavaElement():\n" + e;
} else {
throw e;
}
}
}}return isEqualTo;
}, "org.eclipse.jdt.core.dom.IBinding,org.eclipse.jdt.core.dom.IBinding");
c$.originalEquals = Clazz.defineMethod (c$, "originalEquals", 
($fz = function (b1, b2) {
org.eclipse.core.runtime.Assert.isNotNull (b1);
if (b1 === b2) return true;
if (b2 == null) return false;
var k1 = b1.getKey ();
var k2 = b2.getKey ();
if (k1 == null || k2 == null) return false;
return k1.equals (k2);
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.IBinding,org.eclipse.jdt.core.dom.IBinding");
c$.equals = Clazz.defineMethod (c$, "equals", 
function (b1, b2) {
org.eclipse.core.runtime.Assert.isNotNull (b1);
if (b1 === b2) return true;
if (b2 == null) return false;
if (b1.length != b2.length) return false;
for (var i = 0; i < b1.length; i++) {
if (!net.sf.j2s.core.astvisitors.Bindings.equals (b1[i], b2[i])) return false;
}
return true;
}, "~A,~A");
c$.hashCode = Clazz.defineMethod (c$, "hashCode", 
function (binding) {
org.eclipse.core.runtime.Assert.isNotNull (binding);
var key = binding.getKey ();
if (key == null) return binding.hashCode ();
return key.hashCode ();
}, "org.eclipse.jdt.core.dom.IBinding");
c$.asString = Clazz.defineMethod (c$, "asString", 
function (binding) {
if (Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IMethodBinding)) return net.sf.j2s.core.astvisitors.Bindings.asString (binding);
 else if (Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.ITypeBinding)) return net.sf.j2s.core.astvisitors.Bindings.asString (binding);
 else if (Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IVariableBinding)) return net.sf.j2s.core.astvisitors.Bindings.asString (binding);
return binding.toString ();
}, "org.eclipse.jdt.core.dom.IBinding");
c$.asString = Clazz.defineMethod (c$, "asString", 
($fz = function (variableBinding) {
if (!variableBinding.isField ()) return variableBinding.toString ();
if (variableBinding.getDeclaringClass () == null) {
org.eclipse.core.runtime.Assert.isTrue (variableBinding.getName ().equals ("length"));
return "(array type):length";
}var result =  new StringBuffer ();
result.append (variableBinding.getDeclaringClass ().getName ());
result.append (':');
result.append (variableBinding.getName ());
return result.toString ();
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.IVariableBinding");
c$.asString = Clazz.defineMethod (c$, "asString", 
($fz = function (type) {
return type.getQualifiedName ();
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.ITypeBinding");
c$.asString = Clazz.defineMethod (c$, "asString", 
($fz = function (method) {
var result =  new StringBuffer ();
result.append (method.getDeclaringClass ().getName ());
result.append (':');
result.append (method.getName ());
result.append ('(');
var parameters = method.getParameterTypes ();
var lastComma = parameters.length - 1;
for (var i = 0; i < parameters.length; i++) {
var parameter = parameters[i];
result.append (parameter.getName ());
if (i < lastComma) result.append (", ");
}
result.append (')');
return result.toString ();
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.IMethodBinding");
c$.getTypeQualifiedName = Clazz.defineMethod (c$, "getTypeQualifiedName", 
function (type) {
var result =  new java.util.ArrayList (5);
net.sf.j2s.core.astvisitors.Bindings.createName (type, false, result);
var buffer =  new StringBuffer ();
for (var i = 0; i < result.size (); i++) {
if (i > 0) {
buffer.append ('.');
}buffer.append ((result.get (i)));
}
return buffer.toString ();
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.getFullyQualifiedName = Clazz.defineMethod (c$, "getFullyQualifiedName", 
function (type) {
var name = type.getQualifiedName ();
var index = name.indexOf ('<');
if (index > 0) name = name.substring (0, index);
return name;
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.createName = Clazz.defineMethod (c$, "createName", 
($fz = function (type, includePackage, list) {
var baseType = type;
if (type.isArray ()) {
baseType = type.getElementType ();
}if (!baseType.isPrimitive () && !baseType.isNullType ()) {
var declaringType = baseType.getDeclaringClass ();
if (declaringType != null) {
net.sf.j2s.core.astvisitors.Bindings.createName (declaringType, includePackage, list);
} else if (includePackage && !baseType.getPackage ().isUnnamed ()) {
var components = baseType.getPackage ().getNameComponents ();
for (var i = 0; i < components.length; i++) {
list.add (components[i]);
}
}}if (!baseType.isAnonymous ()) {
list.add (type.getName ());
} else {
list.add ("$local$");
}}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.ITypeBinding,~B,java.util.List");
c$.getNameComponents = Clazz.defineMethod (c$, "getNameComponents", 
function (type) {
var result =  new java.util.ArrayList (5);
net.sf.j2s.core.astvisitors.Bindings.createName (type, false, result);
return result.toArray ( new Array (result.size ()));
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.getAllNameComponents = Clazz.defineMethod (c$, "getAllNameComponents", 
function (type) {
var result =  new java.util.ArrayList (5);
net.sf.j2s.core.astvisitors.Bindings.createName (type, true, result);
return result.toArray ( new Array (result.size ()));
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.getTopLevelType = Clazz.defineMethod (c$, "getTopLevelType", 
function (type) {
var parent = type.getDeclaringClass ();
while (parent != null) {
type = parent;
parent = type.getDeclaringClass ();
}
return type;
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.isRuntimeException = Clazz.defineMethod (c$, "isRuntimeException", 
function (thrownException) {
if (thrownException == null || thrownException.isPrimitive () || thrownException.isArray ()) return false;
return net.sf.j2s.core.astvisitors.Bindings.findTypeInHierarchy (thrownException, "java.lang.RuntimeException") != null;
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.findFieldInType = Clazz.defineMethod (c$, "findFieldInType", 
function (type, fieldName) {
if (type.isPrimitive ()) return null;
var fields = type.getDeclaredFields ();
for (var i = 0; i < fields.length; i++) {
var field = fields[i];
if (field.getName ().equals (fieldName)) return field;
}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
c$.findMethodInType = Clazz.defineMethod (c$, "findMethodInType", 
function (type, methodName, parameters) {
if (type.isPrimitive ()) return null;
var methods = type.getDeclaredMethods ();
for (var i = 0; i < methods.length; i++) {
if (parameters == null) {
if (methodName.equals (methods[i].getName ())) return methods[i];
} else {
if (net.sf.j2s.core.astvisitors.Bindings.isEqualMethod (methods[i], methodName, parameters)) return methods[i];
}}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S,~A");
c$.findMethodInType = Clazz.defineMethod (c$, "findMethodInType", 
function (type, methodName, parameters) {
if (type.isPrimitive ()) return null;
var methods = type.getDeclaredMethods ();
for (var i = 0; i < methods.length; i++) {
if (parameters == null) {
if (methodName.equals (methods[i].getName ())) return methods[i];
} else {
if (net.sf.j2s.core.astvisitors.Bindings.isEqualMethod (methods[i], methodName, parameters)) return methods[i];
}}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S,~A");
c$.findOverriddenMethodInType = Clazz.defineMethod (c$, "findOverriddenMethodInType", 
function (type, method) {
if (type.isPrimitive ()) return null;
var methods = type.getDeclaredMethods ();
for (var i = 0; i < methods.length; i++) {
if (net.sf.j2s.core.astvisitors.Bindings.isSubsignature (method, methods[i])) return methods[i];
}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,org.eclipse.jdt.core.dom.IMethodBinding");
c$.findConstructorInType = Clazz.defineMethod (c$, "findConstructorInType", 
function (type, method) {
if (type.isPrimitive ()) return null;
var types = method.getParameterTypes ();
var methods = type.getDeclaredMethods ();
for (var i = 0; i < methods.length; i++) {
if (methods[i].isConstructor () && !methods[i].isDefaultConstructor ()) {
var parameterTypes = methods[i].getParameterTypes ();
if (types.length == parameterTypes.length) {
var equals = true;
for (var j = 0; j < parameterTypes.length; j++) {
if (!parameterTypes[j].equals (types[j])) {
equals = false;
break;
}}
if (equals) {
return methods[i];
}}}}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,org.eclipse.jdt.core.dom.IMethodBinding");
c$.findFieldInHierarchy = Clazz.defineMethod (c$, "findFieldInHierarchy", 
function (type, fieldName) {
var field = net.sf.j2s.core.astvisitors.Bindings.findFieldInType (type, fieldName);
if (field != null) return field;
var superClass = type.getSuperclass ();
if (superClass != null) {
field = net.sf.j2s.core.astvisitors.Bindings.findFieldInType (type, fieldName);
if (field != null) return field;
}var interfaces = type.getInterfaces ();
for (var i = 0; i < interfaces.length; i++) {
field = net.sf.j2s.core.astvisitors.Bindings.findFieldInType (type, fieldName);
if (field != null) return field;
}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
c$.findMethodInHierarchy = Clazz.defineMethod (c$, "findMethodInHierarchy", 
function (type, methodName, parameters) {
var method = net.sf.j2s.core.astvisitors.Bindings.findMethodInType (type, methodName, parameters);
if (method != null) return method;
var superClass = type.getSuperclass ();
if (superClass != null) {
method = net.sf.j2s.core.astvisitors.Bindings.findMethodInHierarchy (superClass, methodName, parameters);
if (method != null) return method;
}var interfaces = type.getInterfaces ();
for (var i = 0; i < interfaces.length; i++) {
method = net.sf.j2s.core.astvisitors.Bindings.findMethodInHierarchy (interfaces[i], methodName, parameters);
if (method != null) return method;
}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S,~A");
c$.findMethodInHierarchy = Clazz.defineMethod (c$, "findMethodInHierarchy", 
function (typeObject, type, methodName, parameters) {
var method = net.sf.j2s.core.astvisitors.Bindings.findMethodInType (type, methodName, parameters);
if (method != null) return method;
var superClass = type.getSuperclass ();
if (superClass == null && type.isInterface ()) superClass = typeObject;
if (superClass != null) {
method = net.sf.j2s.core.astvisitors.Bindings.findMethodInHierarchy (typeObject, superClass, methodName, parameters);
if (method != null) return method;
}var interfaces = type.getInterfaces ();
for (var i = 0; i < interfaces.length; i++) {
method = net.sf.j2s.core.astvisitors.Bindings.findMethodInHierarchy (typeObject, interfaces[i], methodName, parameters);
if (method != null) return method;
}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,org.eclipse.jdt.core.dom.ITypeBinding,~S,~A");
c$.findOverriddenMethodInHierarchy = Clazz.defineMethod (c$, "findOverriddenMethodInHierarchy", 
function (type, binding) {
var method = net.sf.j2s.core.astvisitors.Bindings.findOverriddenMethodInType (type, binding);
if (method != null) return method;
var superClass = type.getSuperclass ();
if (superClass != null) {
method = net.sf.j2s.core.astvisitors.Bindings.findOverriddenMethodInHierarchy (superClass, binding);
if (method != null) return method;
}var interfaces = type.getInterfaces ();
for (var i = 0; i < interfaces.length; i++) {
method = net.sf.j2s.core.astvisitors.Bindings.findOverriddenMethodInHierarchy (interfaces[i], binding);
if (method != null) return method;
}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,org.eclipse.jdt.core.dom.IMethodBinding");
c$.findMethodDefininition = Clazz.defineMethod (c$, "findMethodDefininition", 
function (method, testVisibility) {
var modifiers = method.getModifiers ();
if (org.eclipse.jdt.core.dom.Modifier.isPrivate (modifiers) || org.eclipse.jdt.core.dom.Modifier.isStatic (modifiers) || method.isConstructor ()) {
return null;
}var type = method.getDeclaringClass ();
if (type.isInterface ()) {
return null;
}if (type.getSuperclass () != null) {
var res = net.sf.j2s.core.astvisitors.Bindings.findOverriddenMethodInHierarchy (type.getSuperclass (), method);
if (res != null && !org.eclipse.jdt.core.dom.Modifier.isPrivate (res.getModifiers ())) {
if (!testVisibility || net.sf.j2s.core.astvisitors.Bindings.isVisibleInHierarchy (res, method.getDeclaringClass ().getPackage ())) {
return res;
}}}var interfaces = type.getInterfaces ();
for (var i = 0; i < interfaces.length; i++) {
var res = net.sf.j2s.core.astvisitors.Bindings.findOverriddenMethodInHierarchy (interfaces[i], method);
if (res != null) {
return res;
}}
return null;
}, "org.eclipse.jdt.core.dom.IMethodBinding,~B");
c$.findMethodImplementation = Clazz.defineMethod (c$, "findMethodImplementation", 
function (method, testVisibility) {
var superClass = method.getDeclaringClass ().getSuperclass ();
while (superClass != null) {
var res = net.sf.j2s.core.astvisitors.Bindings.findOverriddenMethodInType (superClass, method);
if (res != null) {
if (net.sf.j2s.core.astvisitors.Bindings.isVisibleInHierarchy (res, method.getDeclaringClass ().getPackage ())) {
return res;
}return null;
}superClass = superClass.getSuperclass ();
}
return null;
}, "org.eclipse.jdt.core.dom.IMethodBinding,~B");
c$.isVisibleInHierarchy = Clazz.defineMethod (c$, "isVisibleInHierarchy", 
function (member, pack) {
var otherflags = member.getModifiers ();
var declaringType = member.getDeclaringClass ();
if (org.eclipse.jdt.core.dom.Modifier.isPublic (otherflags) || org.eclipse.jdt.core.dom.Modifier.isProtected (otherflags) || (declaringType != null && declaringType.isInterface ())) {
return true;
} else if (org.eclipse.jdt.core.dom.Modifier.isPrivate (otherflags)) {
return false;
}return pack === declaringType.getPackage ();
}, "org.eclipse.jdt.core.dom.IMethodBinding,org.eclipse.jdt.core.dom.IPackageBinding");
c$.findMethodDeclarationInHierarchy = Clazz.defineMethod (c$, "findMethodDeclarationInHierarchy", 
function (type, methodBinding) {
var superClass = type.getSuperclass ();
if (superClass != null) {
var method = net.sf.j2s.core.astvisitors.Bindings.findOverriddenMethodInType (superClass, methodBinding);
if (method != null) return method;
method = net.sf.j2s.core.astvisitors.Bindings.findMethodDeclarationInHierarchy (superClass, methodBinding);
if (method != null) return method;
}var interfaces = type.getInterfaces ();
for (var i = 0; i < interfaces.length; i++) {
var curr = interfaces[i];
var method = net.sf.j2s.core.astvisitors.Bindings.findOverriddenMethodInType (curr, methodBinding);
if (method != null) return method;
method = net.sf.j2s.core.astvisitors.Bindings.findMethodDeclarationInHierarchy (interfaces[i], methodBinding);
if (method != null) return method;
}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,org.eclipse.jdt.core.dom.IMethodBinding");
c$.findConstructorInHierarchy = Clazz.defineMethod (c$, "findConstructorInHierarchy", 
function (type, methodBinding) {
var superClass = type.getSuperclass ();
if (superClass != null) {
var method = net.sf.j2s.core.astvisitors.Bindings.findConstructorInType (superClass, methodBinding);
if (method != null) return method;
method = net.sf.j2s.core.astvisitors.Bindings.findConstructorInHierarchy (superClass, methodBinding);
if (method != null) return method;
}return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,org.eclipse.jdt.core.dom.IMethodBinding");
c$.getAllSuperTypes = Clazz.defineMethod (c$, "getAllSuperTypes", 
function (type) {
var result =  new java.util.HashSet ();
net.sf.j2s.core.astvisitors.Bindings.collectSuperTypes (type, result);
result.remove (type);
return result.toArray ( new Array (result.size ()));
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.collectSuperTypes = Clazz.defineMethod (c$, "collectSuperTypes", 
($fz = function (curr, collection) {
if (collection.add (curr)) {
var interfaces = curr.getInterfaces ();
for (var i = 0; i < interfaces.length; i++) {
net.sf.j2s.core.astvisitors.Bindings.collectSuperTypes (interfaces[i], collection);
}
var superClass = curr.getSuperclass ();
if (superClass != null) {
net.sf.j2s.core.astvisitors.Bindings.collectSuperTypes (superClass, collection);
}}}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.ITypeBinding,java.util.Set");
c$.isEqualMethod = Clazz.defineMethod (c$, "isEqualMethod", 
function (method, methodName, parameters) {
if (!method.getName ().equals (methodName)) return false;
var methodParameters = method.getParameterTypes ();
if (methodParameters.length != parameters.length) return false;
for (var i = 0; i < parameters.length; i++) {
if (!net.sf.j2s.core.astvisitors.Bindings.equals (methodParameters[i].getErasure (), parameters[i].getErasure ())) return false;
}
return true;
}, "org.eclipse.jdt.core.dom.IMethodBinding,~S,~A");
c$.isSubsignature = Clazz.defineMethod (c$, "isSubsignature", 
function (overriding, overridden) {
if (!overriding.getName ().equals (overridden.getName ())) return false;
var m1Params = overriding.getParameterTypes ();
var m2Params = overridden.getParameterTypes ();
if (m1Params.length != m2Params.length) return false;
var m1TypeParams = overriding.getTypeParameters ();
var m2TypeParams = overridden.getTypeParameters ();
if (m1TypeParams.length != m2TypeParams.length && m1TypeParams.length != 0) return false;
if (m2TypeParams.length != 0) {
for (var i = 0; i < m1TypeParams.length; i++) {
var m1Bounds = net.sf.j2s.core.astvisitors.Bindings.getTypeBoundsForSubsignature (m1TypeParams[i]);
var m2Bounds = net.sf.j2s.core.astvisitors.Bindings.getTypeBoundsForSubsignature (m2TypeParams[i]);
if (!m1Bounds.equals (m2Bounds)) return false;
}
if (net.sf.j2s.core.astvisitors.Bindings.equals (m2Params, m1Params)) return true;
for (var i = 0; i < m1Params.length; i++) {
var m1Param = m1Params[i];
if (net.sf.j2s.core.astvisitors.Bindings.containsTypeVariables (m1Param)) m1Param = m1Param.getErasure ();
 else if (m1Param.isRawType ()) m1Param = m1Param.getTypeDeclaration ();
if (!(net.sf.j2s.core.astvisitors.Bindings.equals (m1Param, m2Params[i].getErasure ()))) return false;
}
return true;
} else {
if (net.sf.j2s.core.astvisitors.Bindings.equals (m1Params, m2Params)) return true;
for (var i = 0; i < m1Params.length; i++) {
var m1Param = m1Params[i];
if (m1Param.isRawType ()) m1Param = m1Param.getTypeDeclaration ();
if (!(net.sf.j2s.core.astvisitors.Bindings.equals (m1Param, m2Params[i].getErasure ()))) return false;
}
return true;
}}, "org.eclipse.jdt.core.dom.IMethodBinding,org.eclipse.jdt.core.dom.IMethodBinding");
c$.containsTypeVariables = Clazz.defineMethod (c$, "containsTypeVariables", 
($fz = function (type) {
if (type.isTypeVariable ()) return true;
if (type.isArray ()) return net.sf.j2s.core.astvisitors.Bindings.containsTypeVariables (type.getElementType ());
if (type.isCapture ()) return net.sf.j2s.core.astvisitors.Bindings.containsTypeVariables (type.getWildcard ());
if (type.isParameterizedType ()) return net.sf.j2s.core.astvisitors.Bindings.containsTypeVariables (type.getTypeArguments ());
if (type.isTypeVariable ()) return net.sf.j2s.core.astvisitors.Bindings.containsTypeVariables (type.getTypeBounds ());
if (type.isWildcardType () && type.getBound () != null) return net.sf.j2s.core.astvisitors.Bindings.containsTypeVariables (type.getBound ());
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.ITypeBinding");
c$.containsTypeVariables = Clazz.defineMethod (c$, "containsTypeVariables", 
($fz = function (types) {
for (var i = 0; i < types.length; i++) if (net.sf.j2s.core.astvisitors.Bindings.containsTypeVariables (types[i])) return true;

return false;
}, $fz.isPrivate = true, $fz), "~A");
c$.getTypeBoundsForSubsignature = Clazz.defineMethod (c$, "getTypeBoundsForSubsignature", 
($fz = function (typeParameter) {
var typeBounds = typeParameter.getTypeBounds ();
var count = typeBounds.length;
if (count == 0) return java.util.Collections.EMPTY_SET;
var result =  new java.util.HashSet (typeBounds.length);
for (var i = 0; i < typeBounds.length; i++) {
var bound = typeBounds[i];
if ("java.lang.Object".equals (typeBounds[0].getQualifiedName ())) continue ; else if (net.sf.j2s.core.astvisitors.Bindings.containsTypeVariables (bound)) result.add (bound.getErasure ());
 else if (bound.isRawType ()) result.add (bound.getTypeDeclaration ());
 else result.add (bound);
}
return result;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.ITypeBinding");
c$.isEqualMethod = Clazz.defineMethod (c$, "isEqualMethod", 
function (method, methodName, parameters) {
if (!method.getName ().equals (methodName)) return false;
var methodParameters = method.getParameterTypes ();
if (methodParameters.length != parameters.length) return false;
var first;
var second;
var index;
for (var i = 0; i < parameters.length; i++) {
first = parameters[i];
index = first.indexOf ('<');
if (index > 0) first = first.substring (0, index);
second = methodParameters[i].getErasure ().getQualifiedName ();
index = second.indexOf ('<');
if (index > 0) second = second.substring (0, index);
if (!first.equals (second)) return false;
}
return true;
}, "org.eclipse.jdt.core.dom.IMethodBinding,~S,~A");
c$.findTypeInHierarchy = Clazz.defineMethod (c$, "findTypeInHierarchy", 
function (hierarchyType, fullyQualifiedTypeName) {
if (hierarchyType == null || hierarchyType.isArray () || hierarchyType.isPrimitive ()) {
return null;
}if (fullyQualifiedTypeName.equals (hierarchyType.getQualifiedName ())) {
return hierarchyType;
}var superClass = hierarchyType.getSuperclass ();
if (superClass != null) {
var res = net.sf.j2s.core.astvisitors.Bindings.findTypeInHierarchy (superClass, fullyQualifiedTypeName);
if (res != null) {
return res;
}}var superInterfaces = hierarchyType.getInterfaces ();
for (var i = 0; i < superInterfaces.length; i++) {
var res = net.sf.j2s.core.astvisitors.Bindings.findTypeInHierarchy (superInterfaces[i], fullyQualifiedTypeName);
if (res != null) {
return res;
}}
return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
c$.getAssignedVariable = Clazz.defineMethod (c$, "getAssignedVariable", 
function (assignment) {
var leftHand = assignment.getLeftHandSide ();
switch (leftHand.getNodeType ()) {
case 42:
return (leftHand).resolveBinding ();
case 40:
return (leftHand).getName ().resolveBinding ();
case 22:
return (leftHand).resolveFieldBinding ();
case 47:
return (leftHand).resolveFieldBinding ();
default:
return null;
}
}, "org.eclipse.jdt.core.dom.Assignment");
c$.isSuperType = Clazz.defineMethod (c$, "isSuperType", 
function (possibleSuperType, type) {
if (type.isArray () || type.isPrimitive ()) {
return false;
}if (net.sf.j2s.core.astvisitors.Bindings.equals (type, possibleSuperType)) {
return true;
}var superClass = type.getSuperclass ();
if (superClass != null) {
if (net.sf.j2s.core.astvisitors.Bindings.isSuperType (possibleSuperType, superClass)) {
return true;
}}if (possibleSuperType.isInterface ()) {
var superInterfaces = type.getInterfaces ();
for (var i = 0; i < superInterfaces.length; i++) {
if (net.sf.j2s.core.astvisitors.Bindings.isSuperType (possibleSuperType, superInterfaces[i])) {
return true;
}}
}return false;
}, "org.eclipse.jdt.core.dom.ITypeBinding,org.eclipse.jdt.core.dom.ITypeBinding");
c$.findMethod = Clazz.defineMethod (c$, "findMethod", 
function (method, type) {
method = method.getMethodDeclaration ();
var candidates = type.getMethods ();
for (var i = 0; i < candidates.length; i++) {
var candidate = candidates[i];
if (candidate.getElementName ().equals (method.getName ()) && net.sf.j2s.core.astvisitors.Bindings.sameParameters (method, candidate)) {
return candidate;
}}
return null;
}, "org.eclipse.jdt.core.dom.IMethodBinding,org.eclipse.jdt.core.IType");
c$.sameParameters = Clazz.defineMethod (c$, "sameParameters", 
($fz = function (method, candidate) {
var methodParamters = method.getParameterTypes ();
var candidateParameters = candidate.getParameterTypes ();
if (methodParamters.length != candidateParameters.length) return false;
var scope = candidate.getDeclaringType ();
for (var i = 0; i < methodParamters.length; i++) {
var methodParameter = methodParamters[i];
var candidateParameter = candidateParameters[i];
if (!net.sf.j2s.core.astvisitors.Bindings.sameParameter (methodParameter, candidateParameter, scope)) return false;
}
return true;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.IMethodBinding,org.eclipse.jdt.core.IMethod");
c$.sameParameter = Clazz.defineMethod (c$, "sameParameter", 
($fz = function (type, candidate, scope) {
if (type.getDimensions () != org.eclipse.jdt.core.Signature.getArrayCount (candidate)) return false;
if (type.isArray ()) type = type.getElementType ();
candidate = org.eclipse.jdt.core.Signature.getElementType (candidate);
if ((org.eclipse.jdt.core.Signature.getTypeSignatureKind (candidate) == 2) != type.isPrimitive ()) {
return false;
}if (type.isPrimitive () || type.isTypeVariable ()) {
return type.getName ().equals (org.eclipse.jdt.core.Signature.toString (candidate));
} else {
candidate = org.eclipse.jdt.core.Signature.getTypeErasure (candidate);
type = type.getErasure ();
if ((candidate.charAt (org.eclipse.jdt.core.Signature.getArrayCount (candidate))).charCodeAt (0) == ('L').charCodeAt (0)) {
return org.eclipse.jdt.core.Signature.toString (candidate).equals (net.sf.j2s.core.astvisitors.Bindings.getFullyQualifiedName (type));
} else {
var qualifiedCandidates = scope.resolveType (org.eclipse.jdt.core.Signature.toString (candidate));
if (qualifiedCandidates == null || qualifiedCandidates.length == 0) return false;
var packageName = type.getPackage ().isUnnamed () ? "" : type.getPackage ().getName ();
var typeName = net.sf.j2s.core.astvisitors.Bindings.getTypeQualifiedName (type);
for (var i = 0; i < qualifiedCandidates.length; i++) {
var qualifiedCandidate = qualifiedCandidates[i];
if (qualifiedCandidate[0].equals (packageName) && qualifiedCandidate[1].equals (typeName)) return true;
}
}}return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.ITypeBinding,~S,org.eclipse.jdt.core.IType");
c$.normalizeTypeBinding = Clazz.defineMethod (c$, "normalizeTypeBinding", 
function (binding) {
if (binding != null && !binding.isNullType () && !net.sf.j2s.core.astvisitors.Bindings.isVoidType (binding)) {
if (binding.isAnonymous ()) {
var baseBindings = binding.getInterfaces ();
if (baseBindings.length > 0) {
return baseBindings[0];
}return binding.getSuperclass ();
}if (binding.isCapture ()) {
return binding.getWildcard ();
}return binding;
}return null;
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.isVoidType = Clazz.defineMethod (c$, "isVoidType", 
function (binding) {
return "void".equals (binding.getName ());
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.normalizeForDeclarationUse = Clazz.defineMethod (c$, "normalizeForDeclarationUse", 
function (binding, ast) {
if (binding.isNullType ()) return ast.resolveWellKnownType ("java.lang.Object");
if (binding.isPrimitive ()) return binding;
binding = net.sf.j2s.core.astvisitors.Bindings.normalizeTypeBinding (binding);
if (binding == null || !binding.isWildcardType ()) return binding;
if (binding.isUpperbound ()) {
return binding.getBound ();
} else {
return ast.resolveWellKnownType ("java.lang.Object");
}}, "org.eclipse.jdt.core.dom.ITypeBinding,org.eclipse.jdt.core.dom.AST");
c$.getBindingOfParentType = Clazz.defineMethod (c$, "getBindingOfParentType", 
function (node) {
while (node != null) {
if (Clazz.instanceOf (node, org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) {
return (node).resolveBinding ();
} else if (Clazz.instanceOf (node, org.eclipse.jdt.core.dom.AnonymousClassDeclaration)) {
return (node).resolveBinding ();
}node = node.getParent ();
}
return null;
}, "org.eclipse.jdt.core.dom.ASTNode");
c$.getRawName = Clazz.defineMethod (c$, "getRawName", 
function (binding) {
var name = binding.getName ();
if (binding.isParameterizedType () || binding.isGenericType ()) {
var idx = name.indexOf ('<');
if (idx != -1) {
return name.substring (0, idx);
}}return name;
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.getRawQualifiedName = Clazz.defineMethod (c$, "getRawQualifiedName", 
function (binding) {
var EMPTY = "";
if (binding.isAnonymous () || binding.isLocal ()) {
return "";
}if (binding.isPrimitive () || binding.isNullType () || binding.isTypeVariable ()) {
return binding.getName ();
}if (binding.isArray ()) {
var elementTypeQualifiedName = net.sf.j2s.core.astvisitors.Bindings.getRawQualifiedName (binding.getElementType ());
if (elementTypeQualifiedName.length != 0) {
var stringBuffer =  new StringBuffer (elementTypeQualifiedName);
stringBuffer.append ('[').append (']');
return stringBuffer.toString ();
} else {
return "";
}}if (binding.isMember ()) {
var outerName = net.sf.j2s.core.astvisitors.Bindings.getRawQualifiedName (binding.getDeclaringClass ());
if (outerName.length > 0) {
var buffer =  new StringBuffer ();
buffer.append (outerName);
buffer.append ('.');
buffer.append (net.sf.j2s.core.astvisitors.Bindings.getRawName (binding));
return buffer.toString ();
} else {
return "";
}} else if (binding.isTopLevel ()) {
var packageBinding = binding.getPackage ();
var buffer =  new StringBuffer ();
if (packageBinding != null && packageBinding.getName ().length > 0) {
buffer.append (packageBinding.getName ()).append ('.');
}buffer.append (net.sf.j2s.core.astvisitors.Bindings.getRawName (binding));
return buffer.toString ();
}return "";
}, "org.eclipse.jdt.core.dom.ITypeBinding");
c$.getVariableDeclaration = Clazz.defineMethod (c$, "getVariableDeclaration", 
function ($var) {
var declaringClass = $var.getDeclaringClass ();
if (declaringClass == null) {
return $var;
}if (declaringClass.getTypeDeclaration () === declaringClass) {
return $var;
}var genericFields = declaringClass.getTypeDeclaration ().getDeclaredFields ();
var name = $var.getName ();
for (var i = 0; i < genericFields.length; i++) {
if (name.equals (genericFields[i].getName ())) {
return genericFields[i];
}}
org.eclipse.core.runtime.Assert.isTrue (false, "field does not exist in generic type");
return $var;
}, "org.eclipse.jdt.core.dom.IVariableBinding");
c$.isDeclarationBinding = Clazz.defineMethod (c$, "isDeclarationBinding", 
function (binding) {
switch (binding.getKind ()) {
case 2:
return (binding).getTypeDeclaration () === binding;
case 3:
var $var = binding;
return !$var.isField () || net.sf.j2s.core.astvisitors.Bindings.isDeclarationBinding ($var.getDeclaringClass ());
case 4:
return (binding).getMethodDeclaration () === binding;
}
return true;
}, "org.eclipse.jdt.core.dom.IBinding");
c$.containsOverridingMethod = Clazz.defineMethod (c$, "containsOverridingMethod", 
function (candidates, overridable) {
for (var index = 0; index < candidates.length; index++) {
if (net.sf.j2s.core.astvisitors.Bindings.areOverriddenMethods (candidates[index], overridable)) return true;
}
return false;
}, "~A,org.eclipse.jdt.core.dom.IMethodBinding");
c$.containsSignatureEquivalentConstructor = Clazz.defineMethod (c$, "containsSignatureEquivalentConstructor", 
function (candidates, overridable) {
for (var index = 0; index < candidates.length; index++) {
if (net.sf.j2s.core.astvisitors.Bindings.isSignatureEquivalentConstructor (candidates[index], overridable)) return true;
}
return false;
}, "~A,org.eclipse.jdt.core.dom.IMethodBinding");
c$.isSignatureEquivalentConstructor = Clazz.defineMethod (c$, "isSignatureEquivalentConstructor", 
function (overridden, overridable) {
if (!overridden.isConstructor () || !overridable.isConstructor ()) return false;
if (overridden.isDefaultConstructor ()) return false;
return net.sf.j2s.core.astvisitors.Bindings.areSubTypeCompatible (overridden, overridable);
}, "org.eclipse.jdt.core.dom.IMethodBinding,org.eclipse.jdt.core.dom.IMethodBinding");
c$.areOverriddenMethods = Clazz.defineMethod (c$, "areOverriddenMethods", 
function (overridden, overridable) {
if (!overridden.getName ().equals (overridable.getName ())) return false;
return net.sf.j2s.core.astvisitors.Bindings.areSubTypeCompatible (overridden, overridable);
}, "org.eclipse.jdt.core.dom.IMethodBinding,org.eclipse.jdt.core.dom.IMethodBinding");
c$.areSubTypeCompatible = Clazz.defineMethod (c$, "areSubTypeCompatible", 
($fz = function (overridden, overridable) {
if (overridden.getParameterTypes ().length != overridable.getParameterTypes ().length) return false;
var overriddenReturn = overridden.getReturnType ();
var overridableReturn = overridable.getReturnType ();
if (overriddenReturn == null || overridableReturn == null) return false;
if (!overriddenReturn.getErasure ().isSubTypeCompatible (overridableReturn.getErasure ())) return false;
var overriddenTypes = overridden.getParameterTypes ();
var overridableTypes = overridable.getParameterTypes ();
org.eclipse.core.runtime.Assert.isTrue (overriddenTypes.length == overridableTypes.length);
for (var index = 0; index < overriddenTypes.length; index++) {
var overridableErasure = overridableTypes[index].getErasure ();
var overriddenErasure = overriddenTypes[index].getErasure ();
if (!overridableErasure.isSubTypeCompatible (overriddenErasure) || !overridableErasure.getKey ().equals (overriddenErasure.getKey ())) return false;
}
var overriddenExceptions = overridden.getExceptionTypes ();
var overridableExceptions = overridable.getExceptionTypes ();
var checked = false;
for (var index = 0; index < overriddenExceptions.length; index++) {
checked = false;
for (var offset = 0; offset < overridableExceptions.length; offset++) {
if (overriddenExceptions[index].isSubTypeCompatible (overridableExceptions[offset])) checked = true;
}
if (!checked) return false;
}
return true;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.IMethodBinding,org.eclipse.jdt.core.dom.IMethodBinding");
c$.isMethodInvoking = Clazz.defineMethod (c$, "isMethodInvoking", 
function (methodBinding, className, methodName) {
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
}, "org.eclipse.jdt.core.dom.IMethodBinding,~S,~S");
c$.isMethodInvoking = Clazz.defineMethod (c$, "isMethodInvoking", 
function (exp, className, methodName) {
if (Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.MethodInvocation)) {
var method = exp;
var methodBinding = method.resolveMethodBinding ();
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (methodBinding, className, methodName)) {
return true;
}}return false;
}, "org.eclipse.jdt.core.dom.Expression,~S,~S");
c$.removeBrackets = Clazz.defineMethod (c$, "removeBrackets", 
function (qName) {
if (qName == null) {
return qName;
}var length = qName.length;
var buf =  new StringBuffer ();
var ltCount = 0;
for (var i = 0; i < length; i++) {
var c = qName.charAt (i);
if ((c).charCodeAt (0) == ('<').charCodeAt (0)) {
ltCount++;
} else if ((c).charCodeAt (0) == ('>').charCodeAt (0)) {
ltCount--;
}if (ltCount == 0 && (c).charCodeAt (0) != ('>').charCodeAt (0)) {
buf.append (c);
}}
qName = buf.toString ().trim ();
return qName;
}, "~S");
Clazz.defineStatics (c$,
"ARRAY_LENGTH_FIELD_BINDING_STRING", "(array type):length",
"CHECK_CORE_BINDING_IS_EQUAL_TO", false);
{
var value = org.eclipse.core.runtime.Platform.getDebugOption ("org.eclipse.jdt.ui/debug/checkCoreBindingIsEqualTo");
($t$ = net.sf.j2s.core.astvisitors.Bindings.CHECK_CORE_BINDING_IS_EQUAL_TO = value != null && value.equalsIgnoreCase ("true"), net.sf.j2s.core.astvisitors.Bindings.prototype.CHECK_CORE_BINDING_IS_EQUAL_TO = net.sf.j2s.core.astvisitors.Bindings.CHECK_CORE_BINDING_IS_EQUAL_TO, $t$);
}});
