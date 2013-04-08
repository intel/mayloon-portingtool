Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.ASTJ2SDocVisitor", "java.lang.StringBuffer"], "net.sf.j2s.core.astvisitors.ASTScriptVisitor", ["java.util.ArrayList", "net.sf.j2s.core.astvisitors.ASTFieldVisitor", "$.ASTFinalVariable", "$.ASTJ2SMapVisitor", "$.ASTMethodVisitor", "$.ASTPackageVisitor", "$.ASTTypeVisitor", "$.ASTVariableVisitor", "$.Bindings", "$.MethodReferenceASTVisitor", "$.ReferenceASTVisitor", "org.eclipse.jdt.core.dom.Modifier", "$.PrimitiveType"], function () {
c$ = Clazz.decorateAsClass (function () {
this.laterBuffer = null;
this.methodBuffer = null;
this.rootTypeNode = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "ASTScriptVisitor", net.sf.j2s.core.astvisitors.ASTJ2SDocVisitor);
Clazz.prepareFields (c$, function () {
this.laterBuffer =  new StringBuffer ();
this.methodBuffer =  new StringBuffer ();
});
Clazz.defineMethod (c$, "isMethodRegistered", 
function (methodName) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTMethodVisitor)).isMethodRegistered (methodName);
}, "~S");
Clazz.defineMethod (c$, "translate", 
function (className, methodName) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTMethodVisitor)).translate (className, methodName);
}, "~S,~S");
Clazz.defineMethod (c$, "getPackageName", 
function () {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).getPackageName ();
});
Clazz.defineMethod (c$, "discardGenericType", 
function (name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).discardGenericType (name);
}, "~S");
Clazz.defineMethod (c$, "listFinalVariables", 
function (list, seperator, scope) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).listFinalVariables (list, seperator, scope);
}, "java.util.List,~S,~S");
Clazz.defineMethod (c$, "getFullClassName", 
function () {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).getFullClassName ();
});
Clazz.defineMethod (c$, "getTypeStringName", 
function (type) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).getTypeStringName (type);
}, "org.eclipse.jdt.core.dom.Type");
Clazz.defineMethod (c$, "getFieldName", 
function (binding, name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor)).getFieldName (binding, name);
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
Clazz.defineMethod (c$, "getJ2SName", 
function (node) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor)).getJ2SName (node);
}, "org.eclipse.jdt.core.dom.SimpleName");
Clazz.defineMethod (c$, "getJ2SName", 
function (binding) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor)).getJ2SName (binding);
}, "org.eclipse.jdt.core.dom.IVariableBinding");
Clazz.defineMethod (c$, "isInheritedFieldName", 
function (binding, name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor)).isInheritedFieldName (binding, name);
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
Clazz.defineMethod (c$, "checkKeyworkViolation", 
function (name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTFieldVisitor)).checkKeyworkViolation (name);
}, "~S");
Clazz.defineMethod (c$, "checkSameName", 
function (binding, name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor)).checkSameName (binding, name);
}, "org.eclipse.jdt.core.dom.ITypeBinding,~S");
Clazz.defineMethod (c$, "isIntegerType", 
function (type) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).isIntegerType (type);
}, "~S");
Clazz.defineMethod (c$, "getClassName", 
function () {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).getClassName ();
});
Clazz.defineMethod (c$, "getVariableName", 
function (name) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).getVariableName (name);
}, "~S");
Clazz.defineMethod (c$, "canAutoOverride", 
function (node) {
return (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTMethodVisitor)).canAutoOverride (node);
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var binding = node.resolveBinding ();
var typeVisitor = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor));
var anonClassName = null;
if (binding.isAnonymous () || binding.isLocal ()) {
var binaryName = binding.getBinaryName ();
if (binaryName == null) {
var bindingKey = binding.getKey ();
if (bindingKey != null) {
binaryName = bindingKey = bindingKey.substring (1, bindingKey.length - 1).$replace ('/', '.');
}}anonClassName = this.assureQualifiedName (this.shortenQualifiedName (binaryName));
} else {
anonClassName = this.assureQualifiedName (this.shortenQualifiedName (binding.getQualifiedName ()));
}var shortClassName = null;
var idx = anonClassName.lastIndexOf ('.');
if (idx == -1) {
shortClassName = anonClassName;
} else {
shortClassName = anonClassName.substring (idx + 1);
}var className = typeVisitor.getClassName ();
var fullClassName = anonClassName;
var packageName = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).getPackageName ();
this.buffer.append ("(Clazz.isClassDefined (\"");
this.buffer.append (fullClassName);
this.buffer.append ("\") ? 0 : ");
var tmpBuffer = this.buffer;
this.buffer = this.methodBuffer;
this.methodBuffer =  new StringBuffer ();
this.buffer.append ("c$.$");
this.buffer.append (shortClassName);
this.buffer.append ("$ = function () {\r\n");
this.buffer.append ("Clazz.pu$h ();\r\n");
this.buffer.append ("c$ = ");
this.buffer.append ("Clazz.decorateAsClass (");
var oldClassName = className;
typeVisitor.setClassName (shortClassName);
this.buffer.append ("function () {\r\n");
if (!(Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.EnumConstantDeclaration))) {
this.buffer.append ("Clazz.prepareCallback (this, arguments);\r\n");
}var oldLaterBuffer = this.laterBuffer;
this.laterBuffer =  new StringBuffer ();
var bodyDeclarations = node.bodyDeclarations ();
var needPreparation = false;
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
needPreparation = this.isFieldNeedPreparation (field);
if (needPreparation) {
break;
}} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
var init = element;
if ((init.getModifiers () & 8) == 0) {
needPreparation = true;
break;
}}}
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.MethodDeclaration)) {
continue ;} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var fieldDeclaration = element;
if (this.isFieldNeedPreparation (fieldDeclaration)) {
this.visitWith (fieldDeclaration, true);
continue ;}}element.accept (this);
}
this.buffer.append ("Clazz.instantialize (this, arguments);\r\n");
this.buffer.append ("}, ");
var emptyFun = "Clazz.decorateAsClass (function () {\r\nClazz.instantialize (this, arguments);\r\n}, ";
idx = this.buffer.lastIndexOf (emptyFun);
if (idx != -1 && idx == this.buffer.length () - emptyFun.length) {
this.buffer.replace (idx, this.buffer.length (), "Clazz.declareType (");
} else {
emptyFun = "Clazz.decorateAsClass (function () {\r\nClazz.prepareCallback (this, arguments);\r\nClazz.instantialize (this, arguments);\r\n}, ";
idx = this.buffer.lastIndexOf (emptyFun);
if (idx != -1 && idx == this.buffer.length () - emptyFun.length) {
this.buffer.replace (idx, this.buffer.length (), "Clazz.declareAnonymous (");
}}var lastIndexOf = fullClassName.lastIndexOf ('.');
if (lastIndexOf != -1) {
this.buffer.append (this.assureQualifiedName (this.shortenPackageName (fullClassName)));
this.buffer.append (", \"" + fullClassName.substring (lastIndexOf + 1) + "\"");
} else {
this.buffer.append ("null, \"" + fullClassName + "\"");
}if (binding != null) {
var superclass = binding.getSuperclass ();
if (superclass != null) {
var clazzName = superclass.getQualifiedName ();
clazzName = this.assureQualifiedName (this.shortenQualifiedName (clazzName));
if (clazzName != null && clazzName.length != 0 && !"Object".equals (clazzName)) {
this.buffer.append (", ");
this.buffer.append (clazzName);
} else {
var declaredTypes = binding.getInterfaces ();
if (declaredTypes != null && declaredTypes.length > 0) {
clazzName = declaredTypes[0].getQualifiedName ();
if (clazzName != null && clazzName.length != 0) {
clazzName = this.assureQualifiedName (this.shortenQualifiedName (clazzName));
this.buffer.append (", null, ");
this.buffer.append (clazzName);
}}}}}this.buffer.append (");\r\n");
bodyDeclarations = node.bodyDeclarations ();
if (needPreparation) {
this.buffer.append ("Clazz.prepareFields (c$, function () {\r\n");
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
if (!this.isFieldNeedPreparation (field)) {
continue ;}element.accept (this);
} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
var init = element;
if ((init.getModifiers () & 8) == 0) {
element.accept (this);
}}}
this.buffer.append ("});\r\n");
}for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.MethodDeclaration)) {
element.accept (this);
}}
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var fields = element;
if ((fields.getModifiers () & 8) != 0) {
var fragments = fields.fragments ();
for (var j = 0; j < fragments.size (); j++) {
this.buffer.append ("c$");
this.buffer.append (".");
var vdf = fragments.get (j);
vdf.getName ().accept (this);
this.buffer.append (" = ");
var initializer = vdf.getInitializer ();
if (initializer != null) {
initializer.accept (this);
} else {
var type = fields.getType ();
if (type.isPrimitiveType ()) {
var pType = type;
if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.BOOLEAN) {
this.buffer.append ("false");
} else {
this.buffer.append ("0");
}} else {
this.buffer.append ("null");
}}this.buffer.append (";\r\n");
}
}}}
this.buffer.append ("c$ = Clazz.p0p ();\r\n");
typeVisitor.setClassName (oldClassName);
this.buffer.append (this.laterBuffer);
this.laterBuffer = oldLaterBuffer;
this.buffer.append ("};\r\n");
var methods = this.methodBuffer.toString ();
this.methodBuffer = this.buffer;
this.methodBuffer.append (methods);
this.buffer = tmpBuffer;
this.buffer.append (packageName);
this.buffer.append (".");
idx = className.indexOf ('$');
if (idx != -1) {
this.buffer.append (className.substring (0, idx));
} else {
this.buffer.append (className);
}this.buffer.append (".$");
this.buffer.append (shortClassName);
this.buffer.append ("$ ())");
return false;
}, "org.eclipse.jdt.core.dom.AnonymousClassDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var type = node.getType ();
if (type.isPrimitiveType ()) {
var resolveTypeBinding = node.getExpression ().resolveTypeBinding ();
if (resolveTypeBinding != null) {
var name = resolveTypeBinding.getName ();
var pType = type;
if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.INT || pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.BYTE || pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.SHORT || pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.LONG) {
if ("char".equals (name)) {
this.buffer.append ("(");
node.getExpression ().accept (this);
this.buffer.append (").charCodeAt (0)");
return false;
} else if ("float".equals (name) || "double".equals (name)) {
this.buffer.append ("Math.round (");
node.getExpression ().accept (this);
this.buffer.append (")");
return false;
}}if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.CHAR) {
if ("char".equals (name)) {
} else if ("float".equals (name) || "double".equals (name)) {
this.buffer.append ("String.fromCharCode (");
this.buffer.append ("Math.round (");
node.getExpression ().accept (this);
this.buffer.append (")");
this.buffer.append (")");
return false;
} else if ("int".equals (name) || "byte".equals (name) || "double".equals (name) || "float".equals (name) || "short".equals (name) || "long".equals (name)) {
this.buffer.append ("String.fromCharCode (");
node.getExpression ().accept (this);
this.buffer.append (")");
return false;
}}}}node.getExpression ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.CastExpression");
Clazz.defineMethod (c$, "visit", 
function (node) {
var anonDeclare = node.getAnonymousClassDeclaration ();
var expression = node.getExpression ();
if (anonDeclare == null) {
if (expression != null) {
expression.accept (this);
}var binding = node.resolveTypeBinding ();
if (binding != null) {
if (!binding.isTopLevel ()) {
if ((binding.getModifiers () & 8) == 0) {
this.buffer.append ("Clazz.innerTypeInstance (");
if (binding.isAnonymous () || binding.isLocal ()) {
this.buffer.append (this.assureQualifiedName (this.shortenQualifiedName (binding.getBinaryName ())));
} else {
this.buffer.append (this.assureQualifiedName (this.shortenQualifiedName (binding.getQualifiedName ())));
}this.buffer.append (", this, ");
this.buffer.append ("null");
var $arguments = node.$arguments ();
if ($arguments.size () > 0) {
this.buffer.append (", ");
this.visitList ($arguments, ", ");
}this.buffer.append (")");
return false;
}}}var fqName = this.getTypeStringName (node.getType ());
if ("String".equals (fqName) || "java.lang.String".equals (fqName)) {
this.buffer.append (" String.instantialize");
} else if ("Object".equals (fqName) || "java.lang.Object".equals (fqName)) {
this.buffer.append (" new JavaObject");
} else {
this.buffer.append (" new ");
if (fqName != null) {
fqName = this.assureQualifiedName (this.shortenQualifiedName (fqName));
this.buffer.append (fqName);
}}this.buffer.append (" (");
var methodDeclaration = null;
var constructorBinding = node.resolveConstructorBinding ();
if (constructorBinding != null) {
methodDeclaration = constructorBinding.getMethodDeclaration ();
}this.visitMethodParameterList (node.$arguments (), methodDeclaration);
this.buffer.append (")");
} else {
var binding = node.resolveTypeBinding ();
var anonClassName = null;
if (binding.isAnonymous () || binding.isLocal ()) {
var binaryName = binding.getBinaryName ();
if (binaryName == null) {
var bindingKey = binding.getKey ();
if (bindingKey != null) {
binaryName = bindingKey = bindingKey.substring (1, bindingKey.length - 1).$replace ('/', '.');
}}anonClassName = this.assureQualifiedName (this.shortenQualifiedName (binaryName));
} else {
anonClassName = this.assureQualifiedName (this.shortenQualifiedName (binding.getQualifiedName ()));
}this.buffer.append ("(");
var $arguments = node.$arguments ();
var argSize = $arguments.size ();
var variableVisitor = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor));
variableVisitor.isFinalSensible = true;
var lastCurrentBlock = this.currentBlockForVisit;
var v$ = variableVisitor.v$;
var visitedVars = variableVisitor.visitedVars;
var normalVars = variableVisitor.normalVars;
var lastVisitedVars = visitedVars;
var lastNormalVars = normalVars;
this.currentBlockForVisit = this.blockLevel;
visitedVars = variableVisitor.visitedVars =  new java.util.ArrayList ();
variableVisitor.normalVars =  new java.util.ArrayList ();
anonDeclare.accept (this);
this.buffer.append (", ");
this.buffer.append ("Clazz.innerTypeInstance (");
this.buffer.append (anonClassName);
this.buffer.append (", this, ");
var scope = null;
if (this.methodDeclareStack.size () != 0) {
scope = this.methodDeclareStack.peek ();
}variableVisitor.normalVars = lastNormalVars;
this.buffer.append (this.listFinalVariables (visitedVars, ", ", scope));
if (argSize > 0) {
this.buffer.append (", ");
}var methodDeclaration = null;
var constructorBinding = node.resolveConstructorBinding ();
if (constructorBinding != null) {
methodDeclaration = constructorBinding.getMethodDeclaration ();
}this.visitMethodParameterList (node.$arguments (), methodDeclaration);
if (lastCurrentBlock != -1) {
for (var j = 0; j < visitedVars.size (); j++) {
var fv = visitedVars.get (j);
var size = v$.size ();
for (var i = 0; i < size; i++) {
var vv = v$.get (size - i - 1);
if (vv.variableName.equals (fv.variableName) && vv.blockLevel <= lastCurrentBlock && !lastVisitedVars.contains (vv)) {
lastVisitedVars.add (vv);
}}
}
}variableVisitor.visitedVars = lastVisitedVars;
this.currentBlockForVisit = lastCurrentBlock;
this.buffer.append (")");
this.buffer.append (")");
}return false;
}, "org.eclipse.jdt.core.dom.ClassInstanceCreation");
Clazz.defineMethod (c$, "visitMethodParameterList", 
function ($arguments, methodDeclaration, begin, end) {
var parameterTypes = null;
var clazzName = null;
var methodName = null;
if (methodDeclaration != null) {
parameterTypes = methodDeclaration.getParameterTypes ();
var declaringClass = methodDeclaration.getDeclaringClass ();
if (declaringClass != null) {
clazzName = declaringClass.getQualifiedName ();
}methodName = methodDeclaration.getName ();
}for (var i = begin; i < end; i++) {
var element = $arguments.get (i);
var typeStr = null;
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.CastExpression)) {
var castExp = element;
var exp = castExp.getExpression ();
if (Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.NullLiteral)) {
var nullTypeBinding = castExp.resolveTypeBinding ();
if (nullTypeBinding != null) {
if (nullTypeBinding.isArray ()) {
typeStr = "Array";
} else if (nullTypeBinding.isPrimitive ()) {
var code = org.eclipse.jdt.core.dom.PrimitiveType.toCode (nullTypeBinding.getName ());
if (code === org.eclipse.jdt.core.dom.PrimitiveType.BOOLEAN) {
typeStr = "Boolean";
} else {
typeStr = "Number";
}} else if (!nullTypeBinding.isTypeVariable ()) {
typeStr = this.assureQualifiedName (this.shortenQualifiedName (nullTypeBinding.getQualifiedName ()));
}}}}if (typeStr != null) {
this.buffer.append ("Clazz.castNullAs (\"");
this.buffer.append (typeStr.replaceFirst ("^\\$wt.", "org.eclipse.swt."));
this.buffer.append ("\")");
} else {
this.boxingNode (element);
var exp = element;
var typeBinding = exp.resolveTypeBinding ();
var typeName = null;
if (typeBinding != null) {
typeName = typeBinding.getName ();
}var parameterTypeName = null;
if (parameterTypes != null && parameterTypes.length > i) {
parameterTypeName = parameterTypes[i].getName ();
}if ("char".equals (typeName) && "int".equals (parameterTypeName)) {
var ignored = false;
ignored = (i == 0 && ("indexOf".equals (methodName) || "lastIndexOf".equals (methodName)) && ("java.lang.String".equals (net.sf.j2s.core.astvisitors.Bindings.removeBrackets (clazzName))));
if (!ignored) {
this.buffer.append (".charCodeAt (0)");
}}}if (i < end - 1) {
this.buffer.append (", ");
}}
}, "java.util.List,org.eclipse.jdt.core.dom.IMethodBinding,~N,~N");
Clazz.defineMethod (c$, "visitMethodParameterList", 
function ($arguments, methodDeclaration) {
this.visitMethodParameterList ($arguments, methodDeclaration, 0, $arguments.size ());
}, "java.util.List,org.eclipse.jdt.core.dom.IMethodBinding");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("this.construct (");
var methodDeclaration = null;
var constructorBinding = node.resolveConstructorBinding ();
if (constructorBinding != null) {
methodDeclaration = constructorBinding.getMethodDeclaration ();
}this.visitMethodParameterList (node.$arguments (), methodDeclaration);
this.buffer.append (");\r\n");
return false;
}, "org.eclipse.jdt.core.dom.ConstructorInvocation");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("this.");
node.getName ().accept (this);
this.buffer.append (" = ");
node.getName ().accept (this);
this.buffer.append (";\r\n");
return Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTScriptVisitor, "visit", [node]);
}, "org.eclipse.jdt.core.dom.EnumConstantDeclaration");
Clazz.defineMethod (c$, "endVisit", 
function (node) {
if (node !== this.rootTypeNode && node.getParent () != null && Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) {
return ;
}this.buffer.append ("Clazz.instantialize (this, arguments);\r\n");
this.buffer.append ("}, ");
var emptyFun = "Clazz.decorateAsClass (function () {\r\nClazz.instantialize (this, arguments);\r\n}, ";
var idx = this.buffer.lastIndexOf (emptyFun);
if (idx != -1 && idx == this.buffer.length () - emptyFun.length) {
this.buffer.replace (idx, this.buffer.length (), "Clazz.declareType (");
}var parent = node.getParent ();
if (parent != null && Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) {
var packageName = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).getPackageName ();
var className = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).getClassName ();
var fullClassName = null;
if (packageName != null && packageName.length != 0) {
fullClassName = packageName + '.' + className;
} else {
fullClassName = className;
}var name = node.getName ().getIdentifier ();
this.buffer.append (this.assureQualifiedName (fullClassName));
this.buffer.append (", \"" + name + "\"");
this.buffer.append (", Enum");
} else {
var fullClassName = null;
var packageName = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).getPackageName ();
var className = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).getClassName ();
if (packageName != null && packageName.length != 0) {
fullClassName = packageName + '.' + className;
} else {
fullClassName = className;
}var lastIndexOf = fullClassName.lastIndexOf ('.');
if (lastIndexOf != -1) {
this.buffer.append (this.assureQualifiedName (this.shortenPackageName (fullClassName)));
this.buffer.append (", \"" + fullClassName.substring (lastIndexOf + 1) + "\"");
} else {
this.buffer.append ("null, \"" + fullClassName + "\"");
}this.buffer.append (", Enum");
}var superInterfaces = node.superInterfaceTypes ();
var size = superInterfaces.size ();
if (size > 0) {
this.buffer.append (", ");
}if (size > 1) {
this.buffer.append ("[");
}for (var iter = superInterfaces.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var binding = (element).resolveBinding ();
if (binding != null) {
var clazzName = binding.getQualifiedName ();
clazzName = this.assureQualifiedName (this.shortenQualifiedName (clazzName));
this.buffer.append (clazzName);
} else {
this.buffer.append (element);
}if (iter.hasNext ()) {
this.buffer.append (", ");
}}
if (size > 1) {
this.buffer.append ("]");
}this.buffer.append (");\r\n");
this.buffer.append (this.laterBuffer);
var bd = node.bodyDeclarations ();
var methodCount = 0;
for (var it = bd.listIterator (); it.hasNext (); ) {
if (Clazz.instanceOf (it.next (), org.eclipse.jdt.core.dom.MethodDeclaration)) {
methodCount++;
}}
var methods =  new Array (methodCount);
var next = 0;
for (var it = bd.listIterator (); it.hasNext (); ) {
var decl = it.next ();
if (Clazz.instanceOf (decl, org.eclipse.jdt.core.dom.MethodDeclaration)) {
methods[next++] = decl;
}}
for (var i = 0; i < methods.length; i++) {
methods[i].accept (this);
}
var bodyDeclarations = node.bodyDeclarations ();
var needPreparation = false;
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
needPreparation = this.isFieldNeedPreparation (field);
if (needPreparation) {
break;
}} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
var init = element;
if ((init.getModifiers () & 8) == 0) {
needPreparation = true;
break;
}}}
if (needPreparation) {
this.buffer.append ("Clazz.prepareFields (c$, function () {\r\n");
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
if (!this.isFieldNeedPreparation (field)) {
continue ;}element.accept (this);
} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
var init = element;
if ((init.getModifiers () & 8) == 0) {
element.accept (this);
}}}
this.buffer.append ("};\r\n");
}for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
element.accept (this);
} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
if ((field.getModifiers () & 8) != 0) {
var fragments = field.fragments ();
for (var j = 0; j < fragments.size (); j++) {
this.buffer.append ("c$");
this.buffer.append (".");
var vdf = fragments.get (j);
vdf.getName ().accept (this);
this.buffer.append (" = ");
var initializer = vdf.getInitializer ();
if (initializer != null) {
initializer.accept (this);
} else {
var type = field.getType ();
if (type.isPrimitiveType ()) {
var pType = type;
if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.BOOLEAN) {
this.buffer.append ("false");
} else {
this.buffer.append ("0");
}} else {
this.buffer.append ("null");
}}this.buffer.append (";\r\n");
}
}}}
var constants = node.enumConstants ();
for (var i = 0; i < constants.size (); i++) {
var enumConst = constants.get (i);
var anonDeclare = enumConst.getAnonymousClassDeclaration ();
if (anonDeclare == null) {
this.buffer.append ("Clazz.defineEnumConstant (");
this.buffer.append ("c$");
this.buffer.append (", \"");
enumConst.getName ().accept (this);
this.buffer.append ("\", " + i + ", [");
this.visitList (enumConst.$arguments (), ", ");
this.buffer.append ("]);\r\n");
} else {
var binding = node.resolveBinding ();
var anonClassName = null;
if (binding.isAnonymous () || binding.isLocal ()) {
anonClassName = this.assureQualifiedName (this.shortenQualifiedName (binding.getBinaryName ()));
} else {
anonClassName = this.assureQualifiedName (this.shortenQualifiedName (binding.getQualifiedName ()));
}anonDeclare.accept (this);
this.buffer.append ("Clazz.defineEnumConstant (");
this.buffer.append ("c$");
this.buffer.append (", \"");
enumConst.getName ().accept (this);
this.buffer.append ("\", " + i + ", [");
this.visitList (enumConst.$arguments (), ", ");
this.buffer.append ("], ");
this.buffer.append (anonClassName);
this.buffer.append (");\r\n");
}}
Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTScriptVisitor, "endVisit", [node]);
}, "org.eclipse.jdt.core.dom.EnumDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var binding = node.resolveBinding ();
var typeVisitor = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor));
if (binding != null) {
if (binding.isTopLevel ()) {
typeVisitor.setClassName (binding.getName ());
} else {
}}if ((node !== this.rootTypeNode) && node.getParent () != null && Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) {
var visitor = null;
try {
visitor = this.getClass ().newInstance ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
visitor =  new net.sf.j2s.core.astvisitors.ASTScriptVisitor ();
} else {
throw e;
}
}
visitor.rootTypeNode = node;
(visitor.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).setClassName ((this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).getClassName ());
(visitor.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).setPackageName ((this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).getPackageName ());
node.accept (visitor);
if ((node.getModifiers () & 8) != 0) {
var str = visitor.getBuffer ().toString ();
if (!str.startsWith ("c$")) {
this.laterBuffer.append (str);
} else {
this.laterBuffer.append ("Clazz.pu$h ();\r\n");
this.laterBuffer.append (str);
this.laterBuffer.append ("c$ = Clazz.p0p ();\r\n");
}} else {
this.methodBuffer.append ("Clazz.pu$h ();\r\n");
this.methodBuffer.append (visitor.getBuffer ().toString ());
this.methodBuffer.append ("c$ = Clazz.p0p ();\r\n");
}return false;
}this.buffer.append ("c$ = ");
this.buffer.append ("Clazz.decorateAsClass (");
this.buffer.append ("function () {\r\n");
var bodyDeclarations = node.bodyDeclarations ();
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.MethodDeclaration)) {
continue ;} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
continue ;} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var fieldDeclaration = element;
if (this.isFieldNeedPreparation (fieldDeclaration)) {
this.visitWith (fieldDeclaration, true);
continue ;}}element.accept (this);
}
return false;
}, "org.eclipse.jdt.core.dom.EnumDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
node.getExpression ().accept (this);
this.buffer.append (".");
node.getName ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.FieldAccess");
Clazz.defineMethod (c$, "visit", 
function (node) {
return this.visitWith (node, false);
}, "org.eclipse.jdt.core.dom.FieldDeclaration");
Clazz.defineMethod (c$, "visitWith", 
function (node, ignoreInitializer) {
if ((node.getModifiers () & 8) != 0) {
return false;
}var xparent = node.getParent ();
while (xparent != null && !(Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) && !(Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AnonymousClassDeclaration))) {
xparent = xparent.getParent ();
}
var typeBinding = null;
if (xparent != null) {
if (Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) {
var type = xparent;
typeBinding = type.resolveBinding ();
} else if (Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AnonymousClassDeclaration)) {
var type = xparent;
typeBinding = type.resolveBinding ();
}}var fragments = node.fragments ();
for (var iter = fragments.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var fieldName = this.getJ2SName (element.getName ());
var ext = "";
if (this.checkKeyworkViolation (fieldName)) {
ext += "$";
}if (typeBinding != null && this.checkSameName (typeBinding, fieldName)) {
ext += "$";
}this.buffer.append ("this.");
if (this.isInheritedFieldName (typeBinding, fieldName)) {
fieldName = this.getFieldName (typeBinding, fieldName);
this.buffer.append (ext + fieldName);
} else {
this.buffer.append (ext + fieldName);
}this.buffer.append (" = ");
if (!ignoreInitializer && element.getInitializer () != null) {
element.getInitializer ().accept (this);
} else {
var isArray = false;
var frags = node.fragments ();
if (frags.size () > 0) {
var varFrag = frags.get (0);
var resolveBinding = varFrag.resolveBinding ();
if (resolveBinding != null) {
isArray = resolveBinding.getType ().isArray ();
if (isArray) {
this.buffer.append ("null");
}}}if (!isArray) {
if (node.getType ().isPrimitiveType ()) {
var pType = node.getType ();
if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.BOOLEAN) {
this.buffer.append ("false");
} else {
this.buffer.append ("0");
}} else {
this.buffer.append ("null");
}}}this.buffer.append (";\r\n");
}
return false;
}, "org.eclipse.jdt.core.dom.FieldDeclaration,~B");
Clazz.defineMethod (c$, "checkSimpleBooleanOperator", 
($fz = function (op) {
if (op.equals ("^") || op.equals ("|") || op.equals ("&")) {
return true;
}return false;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "checkInfixOperator", 
($fz = function (node) {
if (this.checkSimpleBooleanOperator (node.getOperator ().toString ())) {
return true;
}var left = node.getLeftOperand ();
if (Clazz.instanceOf (left, org.eclipse.jdt.core.dom.InfixExpression)) {
if (this.checkInfixOperator (left)) {
return true;
}}var right = node.getRightOperand ();
if (Clazz.instanceOf (right, org.eclipse.jdt.core.dom.InfixExpression)) {
if (this.checkInfixOperator (right)) {
return true;
}}return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.InfixExpression");
Clazz.defineMethod (c$, "charVisit", 
($fz = function (node, beCare) {
if (!beCare || !(Clazz.instanceOf (node, org.eclipse.jdt.core.dom.Expression))) {
this.boxingNode (node);
return ;
}var binding = (node).resolveTypeBinding ();
if (binding.isPrimitive () && "char".equals (binding.getName ())) {
this.buffer.append ("(");
this.boxingNode (node);
this.buffer.append (").charCodeAt (0)");
} else {
this.boxingNode (node);
}}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.ASTNode,~B");
Clazz.defineMethod (c$, "visit", 
function (node) {
var constValue = this.checkConstantValue (node);
if (constValue != null) {
this.buffer.append (constValue);
return false;
}var expTypeBinding = node.resolveTypeBinding ();
var beCare = false;
if (expTypeBinding != null && expTypeBinding.getName ().indexOf ("String") == -1) {
beCare = true;
}var operator = node.getOperator ().toString ();
var left = node.getLeftOperand ();
var typeBinding = left.resolveTypeBinding ();
if ("/".equals (operator)) {
if (typeBinding != null && typeBinding.isPrimitive ()) {
if (this.isIntegerType (typeBinding.getName ())) {
var right = node.getRightOperand ();
var rightTypeBinding = right.resolveTypeBinding ();
if (this.isIntegerType (rightTypeBinding.getName ())) {
var tmpBuffer = this.buffer;
this.buffer =  new StringBuffer ();
this.buffer.append ("Math.floor (");
this.charVisit (left, beCare);
this.buffer.append (' ');
this.buffer.append (operator);
this.buffer.append (' ');
this.charVisit (right, beCare);
this.buffer.append (')');
var extendedOperands = node.extendedOperands ();
if (extendedOperands.size () > 0) {
for (var iter = extendedOperands.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var is2Floor = false;
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Expression)) {
var exp = element;
var expBinding = exp.resolveTypeBinding ();
if (this.isIntegerType (expBinding.getName ())) {
this.buffer.insert (0, "Math.floor (");
is2Floor = true;
}}this.buffer.append (' ');
this.buffer.append (operator);
this.buffer.append (' ');
this.charVisit (element, beCare);
if (is2Floor) {
this.buffer.append (')');
}}
}tmpBuffer.append (this.buffer);
this.buffer = tmpBuffer;
tmpBuffer = null;
return false;
}}}}var simple = false;
if (typeBinding != null && typeBinding.isPrimitive ()) {
if ("boolean".equals (typeBinding.getName ())) {
if (this.checkInfixOperator (node)) {
this.buffer.append (" new Boolean (");
simple = true;
}}}this.charVisit (node.getLeftOperand (), beCare);
this.buffer.append (' ');
this.buffer.append (operator);
if ("==".equals (operator) || "!=".equals (operator)) {
if (typeBinding != null && !typeBinding.isPrimitive () && !(Clazz.instanceOf (node.getLeftOperand (), org.eclipse.jdt.core.dom.NullLiteral)) && !(Clazz.instanceOf (node.getRightOperand (), org.eclipse.jdt.core.dom.NullLiteral))) {
this.buffer.append ('=');
}}this.buffer.append (' ');
this.charVisit (node.getRightOperand (), beCare);
var extendedOperands = node.extendedOperands ();
if (extendedOperands.size () > 0) {
for (var iter = extendedOperands.iterator (); iter.hasNext (); ) {
this.buffer.append (' ');
this.buffer.append (operator);
this.buffer.append (' ');
var element = iter.next ();
this.charVisit (element, beCare);
}
}if (simple) {
this.buffer.append (").valueOf ()");
}return false;
}, "org.eclipse.jdt.core.dom.InfixExpression");
Clazz.defineMethod (c$, "visit", 
function (node) {
if (this.getJ2STag (node, "@j2sIgnore") != null) {
return false;
}node.getBody ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.Initializer");
Clazz.defineMethod (c$, "endVisit", 
function (node) {
if (this.getJ2STag (node, "@j2sIgnore") != null) {
this.addAnonymousClassDeclarationMethods ();
return ;
}var mBinding = node.resolveBinding ();
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.SimpleRPCRunnable", "ajaxRun")) {
if (this.getJ2STag (node, "@j2sKeep") == null) {
this.addAnonymousClassDeclarationMethods ();
return ;
}}var pipeMethods = ["pipeSetup", "pipeThrough", "through", "pipeMonitoring", "pipeMonitoringInterval", "pipeWaitClosingInterval", "setPipeHelper"];
for (var i = 0; i < pipeMethods.length; i++) {
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", pipeMethods[i])) {
if (this.getJ2STag (node, "@j2sKeep") == null) {
this.addAnonymousClassDeclarationMethods ();
return ;
}}}
if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (mBinding, "net.sf.j2s.ajax.CompoundPipeSession", "convert")) {
if (this.getJ2STag (node, "@j2sKeep") == null) {
this.addAnonymousClassDeclarationMethods ();
return ;
}}if (mBinding != null) {
this.methodDeclareStack.pop ();
}Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTScriptVisitor, "endVisit", [node]);
this.addAnonymousClassDeclarationMethods ();
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
Clazz.defineMethod (c$, "addAnonymousClassDeclarationMethods", 
function () {
});
Clazz.defineMethod (c$, "getFilterMethods", 
function () {
return  new Array (0);
});
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
}}if (mBinding != null) {
this.methodDeclareStack.push (mBinding.getKey ());
}if (node.getBody () == null) {
if (this.isMethodNativeIgnored (node)) {
return false;
}}var body = node.getBody ();
var needToCheckArgs = false;
var argsList = null;
if (body != null && this.containsOnlySuperCall (body)) {
var sts = body.statements ();
var statement = sts.get (sts.size () - 1);
if (Clazz.instanceOf (statement, org.eclipse.jdt.core.dom.ReturnStatement)) {
var ret = statement;
var exp = ret.getExpression ();
if (Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.SuperMethodInvocation)) {
var superRet = exp;
if (superRet.getName ().toString ().equals (node.getName ().toString ())) {
needToCheckArgs = true;
argsList = superRet.$arguments ();
}}} else if (Clazz.instanceOf (statement, org.eclipse.jdt.core.dom.ExpressionStatement)) {
var sttmt = statement;
var exp = sttmt.getExpression ();
if (Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.SuperMethodInvocation)) {
var superRet = exp;
if (superRet.getName ().toString ().equals (node.getName ().toString ())) {
needToCheckArgs = true;
argsList = superRet.$arguments ();
}}} else if (Clazz.instanceOf (statement, org.eclipse.jdt.core.dom.SuperConstructorInvocation)) {
var superConstructor = statement;
needToCheckArgs = true;
argsList = superConstructor.$arguments ();
if (argsList.size () == 0) {
var constructorBinding = superConstructor.resolveConstructorBinding ();
var declaringClass = constructorBinding.getDeclaringClass ();
if ("java.lang.Object".equals (declaringClass.getQualifiedName ())) {
needToCheckArgs = false;
}}}}if (needToCheckArgs) {
var params = node.parameters ();
if (params.size () == argsList.size ()) {
var isOnlySuper = true;
for (var iter = params.iterator (), itr = argsList.iterator (); iter.hasNext (); ) {
var astNode = iter.next ();
var argNode = itr.next ();
if (Clazz.instanceOf (astNode, org.eclipse.jdt.core.dom.SingleVariableDeclaration) && Clazz.instanceOf (argNode, org.eclipse.jdt.core.dom.SimpleName)) {
var varDecl = astNode;
var paramID = varDecl.getName ().getIdentifier ();
var argID = (argNode).getIdentifier ();
if (!paramID.equals (argID)) {
isOnlySuper = false;
break;
}} else {
isOnlySuper = false;
break;
}}
if (isOnlySuper && this.getJ2STag (node, "@j2sKeep") == null) {
return false;
}}}if ((node.getModifiers () & 2) != 0) {
if (mBinding != null) {
var isReferenced = net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor.checkReference (node.getRoot (), mBinding.getKey ());
if (!isReferenced && this.getJ2STag (node, "@j2sKeep") == null) {
return false;
}}}if (node.isConstructor ()) {
this.buffer.append ("Clazz.makeConstructor (");
} else {
if ((node.getModifiers () & 8) != 0) {
this.buffer.append ("c$");
this.buffer.append (".");
node.getName ().accept (this);
this.buffer.append (" = ");
}if (this.getJ2STag (node, "@j2sOverride") != null) {
this.buffer.append ("Clazz.overrideMethod (");
} else {
var isOK2AutoOverriding = this.canAutoOverride (node);
if (isOK2AutoOverriding) {
this.buffer.append ("Clazz.overrideMethod (");
} else {
this.buffer.append ("Clazz.defineMethod (");
}}}this.buffer.append ("c$");
if (node.isConstructor ()) {
this.buffer.append (", ");
} else {
this.buffer.append (", \"");
var identifier = this.getJ2SName (node.getName ());
if (this.checkKeyworkViolation (identifier)) {
this.buffer.append ('$');
}this.buffer.append (identifier);
this.buffer.append ("\", ");
}this.buffer.append ("\r\n");
var isPrivate = (node.getModifiers () & 2) != 0;
if (isPrivate) {
this.buffer.append ("($fz = ");
}this.buffer.append ("function (");
var parameters = node.parameters ();
this.visitList (parameters, ", ");
this.buffer.append (") ");
if (node.isConstructor ()) {
var isSuperCalled = false;
var statements = node.getBody ().statements ();
if (statements.size () > 0) {
var firstStatement = statements.get (0);
if (Clazz.instanceOf (firstStatement, org.eclipse.jdt.core.dom.SuperConstructorInvocation) || Clazz.instanceOf (firstStatement, org.eclipse.jdt.core.dom.ConstructorInvocation)) {
isSuperCalled = true;
}}if (this.getJ2STag (node, "@j2sIgnoreSuperConstructor") != null) {
isSuperCalled = true;
}var existedSuperClass = false;
var binding = node.resolveBinding ();
if (binding != null) {
var declaringClass = binding.getDeclaringClass ();
var superclass = declaringClass.getSuperclass ();
var qualifiedName = this.discardGenericType (superclass.getQualifiedName ());
existedSuperClass = superclass != null && !"java.lang.Object".equals (qualifiedName) && !"java.lang.Enum".equals (qualifiedName);
}if (!isSuperCalled && existedSuperClass) {
this.buffer.append ("{\r\n");
this.buffer.append ("Clazz.superConstructor (this, ");
this.buffer.append (this.assureQualifiedName (this.shortenQualifiedName (this.getFullClassName ())));
this.buffer.append (", []);\r\n");
var read = this.checkJ2STags (node, false);
if (!read) {
this.blockLevel++;
this.visitList (statements, "");
this.endVisit (node.getBody ());
} else {
this.buffer.append ("}");
}} else {
var read = this.checkJ2STags (node, true);
if (!read) {
node.getBody ().accept (this);
}}} else if (node.getBody () == null) {
this.blockLevel++;
var read = this.checkJ2STags (node, true);
if (!read) {
this.buffer.append ("{\r\n");
this.visitNativeJavadoc (node.getJavadoc (), null, false);
this.buffer.append ("}");
}var normalVars = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).normalVars;
for (var i = normalVars.size () - 1; i >= 0; i--) {
var $var = normalVars.get (i);
if ($var.blockLevel >= this.blockLevel) {
normalVars.remove (i);
}}
this.blockLevel--;
} else {
var read = this.checkJ2STags (node, true);
if (!read) {
node.getBody ().accept (this);
}}if (isPrivate) {
this.buffer.append (", $fz.isPrivate = true, $fz)");
}if (parameters.size () != 0) {
this.buffer.append (", \"");
for (var iter = parameters.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var isArray = false;
var resolveBinding = element.getName ().resolveBinding ();
if (Clazz.instanceOf (resolveBinding, org.eclipse.jdt.core.dom.IVariableBinding)) {
var varBinding = resolveBinding;
if (varBinding != null) {
isArray = varBinding.getType ().isArray ();
if (isArray) {
this.buffer.append ("~A");
}}}if (!isArray) {
var type = element.getType ();
if (type.isPrimitiveType ()) {
var pType = type;
if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.BOOLEAN) {
this.buffer.append ("~B");
} else {
this.buffer.append ("~N");
}} else if (type.isArrayType ()) {
this.buffer.append ("~A");
} else {
var binding = type.resolveBinding ();
if (binding != null) {
if (binding.isTypeVariable ()) {
this.buffer.append ("~O");
} else {
var name = binding.getQualifiedName ();
name = this.shortenQualifiedName (name);
if ("String".equals (name)) {
this.buffer.append ("~S");
} else if ("Object".equals (name)) {
this.buffer.append ("~O");
} else {
this.buffer.append (name);
}}} else {
this.buffer.append (type);
}}}if (iter.hasNext ()) {
this.buffer.append (",");
}}
this.buffer.append ("\"");
}this.buffer.append (");\r\n");
return false;
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
Clazz.defineMethod (c$, "checkJ2STags", 
($fz = function (node, needScope) {
var prefix = "{\r\n";
var suffix = "\r\n}";
if (!needScope) {
prefix = "";
suffix = "";
}var read = false;
if (this.isDebugging ()) {
read = this.readSources (node, "@j2sDebug", prefix, suffix, false);
}if (!read) {
var toCompileVariableName = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).isToCompileVariableName ();
if (!toCompileVariableName) {
read = this.readSources (node, "@j2sNativeSrc", prefix, suffix, false);
}}if (!read) {
read = this.readSources (node, "@j2sNative", prefix, suffix, false);
}if (!read) {
read = this.readSources (node, "@j2sNativeNJS", prefix, suffix, false);
if (read) {
this.SetNarrativeJS ();
}}return read;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.MethodDeclaration,~B");
Clazz.defineMethod (c$, "containsOnlySuperCall", 
($fz = function (body) {
var isOnlyOneCall = false;
var ss = body.statements ();
var size = ss.size ();
if (size == 1) {
isOnlyOneCall = true;
} else {
var filterMethods = this.getFilterMethods ();
if (filterMethods.length > 0 && size > 1) {
var obj = ss.get (size - 1);
if (Clazz.instanceOf (obj, org.eclipse.jdt.core.dom.ExpressionStatement)) {
var smt = obj;
var e = smt.getExpression ();
if (Clazz.instanceOf (e, org.eclipse.jdt.core.dom.SuperMethodInvocation)) {
isOnlyOneCall = true;
for (var i = 0; i < size - 1; i++) {
var statement = ss.get (i);
var method = null;
if (Clazz.instanceOf (statement, org.eclipse.jdt.core.dom.ExpressionStatement)) {
var sttmt = statement;
var exp = sttmt.getExpression ();
if (Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.MethodInvocation)) {
method = exp;
}} else if (Clazz.instanceOf (statement, org.eclipse.jdt.core.dom.IfStatement)) {
var ifSss = statement;
if (ifSss.getElseStatement () == null) {
var thenStatement = ifSss.getThenStatement ();
if (Clazz.instanceOf (thenStatement, org.eclipse.jdt.core.dom.Block)) {
var block = thenStatement;
var statements = block.statements ();
if (statements.size () == 1) {
thenStatement = statements.get (0);
}}if (Clazz.instanceOf (thenStatement, org.eclipse.jdt.core.dom.ExpressionStatement)) {
var expStmt = thenStatement;
var exp = expStmt.getExpression ();
if (Clazz.instanceOf (exp, org.eclipse.jdt.core.dom.MethodInvocation)) {
method = exp;
}}}}if (method != null) {
var isFiltered = false;
var methodBinding = method.resolveMethodBinding ();
for (var j = 0; j < filterMethods.length; j += 2) {
if ("*".equals (filterMethods[i + 1])) {
if (methodBinding == null) {
continue ;}var type = methodBinding.getDeclaringClass ();
if (type != null && filterMethods[i].equals (type.getQualifiedName ())) {
isFiltered = true;
break;
}} else if (net.sf.j2s.core.astvisitors.Bindings.isMethodInvoking (methodBinding, filterMethods[j], filterMethods[j + 1])) {
isFiltered = true;
break;
}}
if (isFiltered) {
continue ;}}isOnlyOneCall = false;
break;
}
}}}}return isOnlyOneCall;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.Block");
Clazz.defineMethod (c$, "visit", 
function (node) {
var expression = node.getExpression ();
var methodName = node.getName ().getIdentifier ();
var args = node.$arguments ();
var size = args.size ();
var isThread = false;
if (methodName.equals ("sleep") || methodName.equals ("Thread.sleep")) {
var binding = node.getName ().resolveBinding ();
if (binding != null && Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IMethodBinding)) {
var mthBinding = binding;
var className = mthBinding.getDeclaringClass ().getQualifiedName ();
if (className.equals ("java.lang.Thread")) {
isThread = true;
this.buffer.append ("Concurrent.Thread.sleep(");
this.visitList (args, ", ", 0, node.resolveMethodBinding ().getParameterTypes ().length - 1);
var arg = args.get (args.size () - 1);
this.visitList (args, ", ", node.resolveMethodBinding ().getParameterTypes ().length - 1, size);
this.buffer.append (")");
return false;
}}}if (expression != null && !isThread) {
expression.accept (this);
this.buffer.append (".");
}var isSpecialMethod = false;
if (this.isMethodRegistered (methodName) && (size == 0 || methodName.equals ("split") || methodName.equals ("replace"))) {
var binding = node.getName ().resolveBinding ();
if (binding != null && Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IMethodBinding)) {
var mthBinding = binding;
var className = mthBinding.getDeclaringClass ().getQualifiedName ();
var propertyName = this.translate (className, methodName);
if (propertyName != null) {
if (propertyName.startsWith ("~")) {
this.buffer.append ('$');
this.buffer.append (propertyName.substring (1));
isSpecialMethod = true;
} else {
this.buffer.append (propertyName);
return false;
}}}}if (!isSpecialMethod) {
node.getName ().accept (this);
}this.buffer.append (" (");
var methodBinding = node.resolveMethodBinding ();
if (methodBinding != null && methodBinding.isVarargs ()) {
var paramTypes = methodBinding.getParameterTypes ();
this.visitList (args, ", ", 0, paramTypes.length - 1);
if (paramTypes.length - 1 > 0) {
this.buffer.append (", ");
}var needBrackets = true;
if (args.size () == 0) {
if (needBrackets) this.buffer.append ("[]");
} else {
var arg = args.get (args.size () - 1);
var resolveTypeBinding = arg.resolveTypeBinding ();
if (resolveTypeBinding != null && resolveTypeBinding.isArray () && args.size () == 1) needBrackets = false;
if (needBrackets) this.buffer.append ("[");
this.visitList (args, ", ", paramTypes.length - 1, size);
if (needBrackets) this.buffer.append ("]");
}} else {
var methodDeclaration = node.resolveMethodBinding ();
this.visitMethodParameterList (node.$arguments (), methodDeclaration);
}this.buffer.append (")");
return false;
}, "org.eclipse.jdt.core.dom.MethodInvocation");
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
this.buffer.append (node.getIdentifier ());
return false;
}}}var xparent = node.getParent ();
if (xparent == null) {
this.buffer.append (node);
return false;
}var ch = String.fromCharCode (0);
if (this.buffer.length () > 0) {
ch = this.buffer.charAt (this.buffer.length () - 1);
}if ((ch).charCodeAt (0) == ('.').charCodeAt (0) && Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.QualifiedName)) {
if (binding != null && Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IVariableBinding)) {
var varBinding = binding;
var variableDeclaration = varBinding.getVariableDeclaration ();
var declaringClass = variableDeclaration.getDeclaringClass ();
var fieldName = this.getJ2SName (node);
if (this.checkSameName (declaringClass, fieldName)) {
this.buffer.append ('$');
}if (this.checkKeyworkViolation (fieldName)) {
this.buffer.append ('$');
}if (declaringClass != null && this.isInheritedFieldName (declaringClass, fieldName)) {
fieldName = this.getFieldName (declaringClass, fieldName);
}this.buffer.append (fieldName);
return false;
}this.buffer.append (node);
return false;
}if (Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.ClassInstanceCreation) && !(Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IVariableBinding))) {
var binding2 = node.resolveTypeBinding ();
if (binding != null) {
var name = binding2.getQualifiedName ();
name = this.assureQualifiedName (this.shortenQualifiedName (name));
this.buffer.append (name);
} else {
var nodeId = this.getJ2SName (node);
this.buffer.append (this.assureQualifiedName (this.shortenQualifiedName (nodeId)));
}return false;
}if (binding == null) {
var name = this.getJ2SName (node);
name = this.shortenQualifiedName (name);
if (this.checkKeyworkViolation (name)) {
this.buffer.append ('$');
}this.buffer.append (name);
return false;
}if (Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IVariableBinding)) {
var varBinding = binding;
this.simpleNameInVarBinding (node, ch, varBinding);
} else if (Clazz.instanceOf (binding, org.eclipse.jdt.core.dom.IMethodBinding)) {
var mthBinding = binding;
this.simpleNameInMethodBinding (node, ch, mthBinding);
} else {
var typeBinding = node.resolveTypeBinding ();
if (typeBinding != null) {
var name = typeBinding.getQualifiedName ();
name = this.assureQualifiedName (this.shortenQualifiedName (name));
if (this.checkKeyworkViolation (name)) {
this.buffer.append ('$');
}this.buffer.append (name);
} else {
var name = node.getFullyQualifiedName ();
if (this.checkKeyworkViolation (name)) {
this.buffer.append ('$');
}this.buffer.append (name);
}}return false;
}, "org.eclipse.jdt.core.dom.SimpleName");
Clazz.defineMethod (c$, "simpleNameInVarBinding", 
($fz = function (node, ch, varBinding) {
var thisClassName = this.getClassName ();
if ((varBinding.getModifiers () & 8) != 0) {
var variableDeclaration = varBinding.getVariableDeclaration ();
var declaringClass = variableDeclaration.getDeclaringClass ();
if ((ch).charCodeAt (0) != ('.').charCodeAt (0) && (ch).charCodeAt (0) != ('\"').charCodeAt (0) && declaringClass != null) {
var name = declaringClass.getQualifiedName ();
if ((name == null || name.length == 0) && declaringClass.isAnonymous ()) {
name = declaringClass.getBinaryName ();
}name = this.assureQualifiedName (this.shortenQualifiedName (name));
if (name.length != 0) {
this.buffer.append (name);
this.buffer.append (".");
}}var fieldName = this.getJ2SName (node);
if (this.checkSameName (declaringClass, fieldName)) {
this.buffer.append ('$');
}if (this.checkKeyworkViolation (fieldName)) {
this.buffer.append ('$');
}if (declaringClass != null && this.isInheritedFieldName (declaringClass, fieldName)) {
fieldName = this.getFieldName (declaringClass, fieldName);
}this.buffer.append (fieldName);
} else {
var parent = node.getParent ();
if (parent != null && !(Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.FieldAccess))) {
var variableDeclaration = varBinding.getVariableDeclaration ();
var declaringClass = variableDeclaration.getDeclaringClass ();
if (declaringClass != null && thisClassName != null && (ch).charCodeAt (0) != ('.').charCodeAt (0)) {
this.appendFieldName (parent, declaringClass);
}}var fieldVar = null;
if ((this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).isFinalSensible && (varBinding.getModifiers () & 16) != 0 && varBinding.getDeclaringMethod () != null) {
var key = varBinding.getDeclaringMethod ().getKey ();
if (this.methodDeclareStack.size () == 0 || !key.equals (this.methodDeclareStack.peek ())) {
this.buffer.append ("this.f$.");
if (this.currentBlockForVisit != -1) {
var v$ = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).v$;
var visitedVars = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).visitedVars;
var size = v$.size ();
for (var i = 0; i < size; i++) {
var vv = v$.get (size - i - 1);
if (vv.variableName.equals (varBinding.getName ()) && vv.blockLevel <= this.currentBlockForVisit) {
if (!visitedVars.contains (vv)) {
visitedVars.add (vv);
}fieldVar = vv.toVariableName;
}}
}}}var variableDeclaration = varBinding.getVariableDeclaration ();
var declaringClass = variableDeclaration.getDeclaringClass ();
var fieldName = null;
if (declaringClass != null) {
fieldName = this.getJ2SName (node);
} else if (fieldVar == null) {
fieldName = this.getVariableName (node.getIdentifier ());
} else {
fieldName = fieldVar;
}if (this.checkKeyworkViolation (fieldName)) {
this.buffer.append ('$');
}if (declaringClass != null && this.checkSameName (declaringClass, fieldName)) {
this.buffer.append ('$');
}if (declaringClass != null && this.isInheritedFieldName (declaringClass, fieldName)) {
fieldName = this.getFieldName (declaringClass, fieldName);
}this.buffer.append (fieldName);
}}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.SimpleName,~N,org.eclipse.jdt.core.dom.IVariableBinding");
Clazz.defineMethod (c$, "simpleNameInMethodBinding", 
($fz = function (node, ch, mthBinding) {
var thisClassName = this.getClassName ();
if ((mthBinding.getModifiers () & 8) != 0) {
var variableDeclaration = mthBinding.getMethodDeclaration ();
var declaringClass = variableDeclaration.getDeclaringClass ();
var isClassString = false;
if (declaringClass != null) {
isClassString = "java.lang.String".equals (declaringClass.getQualifiedName ());
var parent = node.getParent ();
if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.MethodInvocation)) {
var mthInv = parent;
if (mthInv.getExpression () == null) {
var name = declaringClass.getQualifiedName ();
name = this.assureQualifiedName (this.shortenQualifiedName (name));
if (name.length != 0) {
this.buffer.append (name);
this.buffer.append (".");
}}}}var name = this.getJ2SName (node);
name = this.shortenQualifiedName (name);
if (!(isClassString && "valueOf".equals (name)) && this.checkKeyworkViolation (name)) {
this.buffer.append ('$');
}this.buffer.append (name);
} else {
var parent = node.getParent ();
var isClassString = false;
if (parent != null && !(Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.FieldAccess))) {
var variableDeclaration = mthBinding.getMethodDeclaration ();
var declaringClass = variableDeclaration.getDeclaringClass ();
if (declaringClass != null && thisClassName != null && (ch).charCodeAt (0) != ('.').charCodeAt (0)) {
isClassString = "java.lang.String".equals (declaringClass.getQualifiedName ());
this.appendFieldName (parent, declaringClass);
}}var name = this.getJ2SName (node);
name = this.shortenQualifiedName (name);
if (!(isClassString && "valueOf".equals (name)) && this.checkKeyworkViolation (name)) {
this.buffer.append ('$');
}this.buffer.append (name);
}}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.SimpleName,~N,org.eclipse.jdt.core.dom.IMethodBinding");
Clazz.defineMethod (c$, "appendFieldName", 
($fz = function (parent, declaringClass) {
var name = declaringClass.getQualifiedName ();
var isThis = false;
var superLevel = 0;
while (parent != null) {
if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) {
var type = parent;
var typeBinding = type.resolveBinding ();
superLevel++;
if (net.sf.j2s.core.astvisitors.Bindings.isSuperType (declaringClass, typeBinding)) {
if (superLevel == 1) {
this.buffer.append ("this.");
isThis = true;
} else {
name = typeBinding.getQualifiedName ();
}break;
}} else if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.AnonymousClassDeclaration)) {
var type = parent;
var typeBinding = type.resolveBinding ();
superLevel++;
if (net.sf.j2s.core.astvisitors.Bindings.isSuperType (declaringClass, typeBinding)) {
if (superLevel == 1) {
this.buffer.append ("this.");
isThis = true;
} else {
name = typeBinding.getQualifiedName ();
if ((name == null || name.length == 0) && typeBinding.isLocal ()) {
name = typeBinding.getBinaryName ();
var idx0 = name.lastIndexOf (".");
if (idx0 == -1) {
idx0 = 0;
}var idx1 = name.indexOf ('$', idx0);
if (idx1 != -1) {
var idx2 = name.indexOf ('$', idx1 + 1);
var parentAnon = "";
if (idx2 == -1) {
parent = parent.getParent ();
while (parent != null) {
if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) {
break;
} else if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.AnonymousClassDeclaration)) {
var atype = parent;
var aTypeBinding = atype.resolveBinding ();
var aName = aTypeBinding.getBinaryName ();
parentAnon = aName.substring (aName.indexOf ('$')) + parentAnon;
}parent = parent.getParent ();
}
name = name.substring (0, idx1) + parentAnon + name.substring (idx1);
}}}}break;
}}parent = parent.getParent ();
}
if (!isThis) {
this.buffer.append ("this.b$[\"");
this.buffer.append (this.shortenQualifiedName (name));
this.buffer.append ("\"].");
}}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.ASTNode,org.eclipse.jdt.core.dom.ITypeBinding");
Clazz.defineMethod (c$, "visit", 
function (node) {
var binding = node.resolveBinding ();
if (binding != null) {
this.buffer.append (this.assureQualifiedName (this.shortenQualifiedName (binding.getQualifiedName ())));
} else {
this.buffer.append (node);
}return false;
}, "org.eclipse.jdt.core.dom.SimpleType");
Clazz.defineMethod (c$, "visit", 
function (node) {
var name = node.getName ();
var binding = name.resolveBinding ();
if (binding != null) {
var identifier = name.getIdentifier ();
var f = null;
if (this.methodDeclareStack.size () == 0) {
f =  new net.sf.j2s.core.astvisitors.ASTFinalVariable (this.blockLevel + 1, identifier, null);
} else {
var methodSig = this.methodDeclareStack.peek ();
f =  new net.sf.j2s.core.astvisitors.ASTFinalVariable (this.blockLevel + 1, identifier, methodSig);
}var v$ = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).v$;
var normalVars = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).normalVars;
f.toVariableName = this.getIndexedVarName (identifier, normalVars.size ());
normalVars.add (f);
if ((binding.getModifiers () & 16) != 0) {
v$.add (f);
}}name.accept (this);
return false;
}, "org.eclipse.jdt.core.dom.SingleVariableDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var constructorBinding = node.resolveConstructorBinding ();
var declaringClass = constructorBinding.getDeclaringClass ();
if ("java.lang.Object".equals (declaringClass.getQualifiedName ())) {
return false;
}var parent = node.getParent ();
if (Clazz.instanceOf (parent, org.eclipse.jdt.core.dom.Block)) {
var methoBlock = parent;
var methodParent = methoBlock.getParent ();
if (Clazz.instanceOf (methodParent, org.eclipse.jdt.core.dom.MethodDeclaration)) {
var method = methodParent;
if (this.getJ2STag (method, "@j2sIgnoreSuperConstructor") != null) {
return false;
}}}this.buffer.append ("Clazz.superConstructor (this, ");
this.buffer.append (this.assureQualifiedName (this.shortenQualifiedName (this.getFullClassName ())));
var $arguments = node.$arguments ();
if ($arguments.size () > 0) {
this.buffer.append (", [");
var methodDeclaration = null;
if (constructorBinding != null) {
methodDeclaration = constructorBinding.getMethodDeclaration ();
}this.visitMethodParameterList ($arguments, methodDeclaration);
this.buffer.append ("]");
}this.buffer.append (");\r\n");
return false;
}, "org.eclipse.jdt.core.dom.SuperConstructorInvocation");
Clazz.defineMethod (c$, "visit", 
function (node) {
var xparent = node.getParent ();
while (xparent != null && !(Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) && !(Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AnonymousClassDeclaration))) {
xparent = xparent.getParent ();
}
var typeBinding = null;
if (xparent != null) {
if (Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) {
var type = xparent;
typeBinding = type.resolveBinding ();
} else if (Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AnonymousClassDeclaration)) {
var type = xparent;
typeBinding = type.resolveBinding ().getSuperclass ();
}}var fieldName = this.getJ2SName (node.getName ());
if (this.isInheritedFieldName (typeBinding, fieldName)) {
if (typeBinding != null) {
var declaredFields = typeBinding.getDeclaredFields ();
for (var i = 0; i < declaredFields.length; i++) {
var superFieldName = this.getJ2SName (declaredFields[i]);
if (fieldName.equals (superFieldName)) {
this.buffer.append ("this.");
if (this.checkKeyworkViolation (fieldName)) {
this.buffer.append ('$');
}fieldName = this.getFieldName (typeBinding.getSuperclass (), fieldName);
this.buffer.append (fieldName);
return false;
}}
}}this.buffer.append ("this.");
if (this.checkKeyworkViolation (fieldName)) {
this.buffer.append ('$');
}this.buffer.append (fieldName);
return false;
}, "org.eclipse.jdt.core.dom.SuperFieldAccess");
Clazz.defineMethod (c$, "visit", 
function (node) {
this.buffer.append ("Clazz.superCall (this, ");
this.buffer.append (this.assureQualifiedName (this.shortenQualifiedName (this.getFullClassName ())));
this.buffer.append (", \"");
var name = this.getJ2SName (node.getName ());
this.buffer.append (name);
this.buffer.append ("\", [");
var methodDeclaration = node.resolveMethodBinding ();
this.visitMethodParameterList (node.$arguments (), methodDeclaration);
this.buffer.append ("])");
return false;
}, "org.eclipse.jdt.core.dom.SuperMethodInvocation");
Clazz.defineMethod (c$, "visit", 
function (node) {
var qualifier = node.getQualifier ();
if (qualifier != null) {
var xparent = node.getParent ();
while (xparent != null && !(Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AbstractTypeDeclaration)) && !(Clazz.instanceOf (xparent, org.eclipse.jdt.core.dom.AnonymousClassDeclaration))) {
xparent = xparent.getParent ();
}
if (xparent == null || xparent.getParent () == null || xparent.getParent ().getParent () == null) {
this.buffer.append ("this");
} else {
this.buffer.append ("this.b$[\"");
qualifier.accept (this);
this.buffer.append ("\"]");
}} else {
this.buffer.append ("this");
}return false;
}, "org.eclipse.jdt.core.dom.ThisExpression");
Clazz.defineMethod (c$, "endVisit", 
function (node) {
if (node !== this.rootTypeNode && node.getParent () != null && (Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.AbstractTypeDeclaration) || Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.TypeDeclarationStatement))) {
return ;
}if (!node.isInterface ()) {
this.buffer.append ("Clazz.instantialize (this, arguments);\r\n");
this.buffer.append ("}, ");
}var emptyFun = "Clazz.decorateAsClass (function () {\r\nClazz.instantialize (this, arguments);\r\n}, ";
var idx = this.buffer.lastIndexOf (emptyFun);
if (idx != -1 && idx == this.buffer.length () - emptyFun.length) {
this.buffer.replace (idx, this.buffer.length (), "Clazz.declareType (");
}var fullClassName = null;
var packageName = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).getPackageName ();
var className = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).getClassName ();
if (packageName != null && packageName.length != 0) {
fullClassName = packageName + '.' + className;
} else {
fullClassName = className;
}if (node.isInterface ()) {
var needReturn = false;
for (var iter = node.bodyDeclarations ().iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
if (this.getJ2STag (element, "@j2sIgnore") != null) {
continue ;}needReturn = true;
} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
if (this.getJ2STag (field, "@j2sIgnore") != null) {
continue ;}if ((field.getModifiers () & 8) != 0) {
needReturn = true;
} else if (node.isInterface ()) {
var fragments = field.fragments ();
needReturn = fragments.size () > 0;
}}if (needReturn) {
break;
}}
if (needReturn) {
this.buffer.append ("c$ = ");
}this.buffer.append ("Clazz.declareInterface (");
var lastIndexOf = fullClassName.lastIndexOf ('.');
if (lastIndexOf != -1) {
this.buffer.append (this.assureQualifiedName (this.shortenPackageName (fullClassName)));
this.buffer.append (", \"" + fullClassName.substring (lastIndexOf + 1) + "\"");
} else {
this.buffer.append ("null, \"" + fullClassName + "\"");
}} else {
var lastIndexOf = fullClassName.lastIndexOf ('.');
if (lastIndexOf != -1) {
this.buffer.append (this.assureQualifiedName (this.shortenPackageName (fullClassName)));
this.buffer.append (", \"" + fullClassName.substring (lastIndexOf + 1) + "\"");
} else {
this.buffer.append ("null, \"" + fullClassName + "\"");
}this.buffer.append (", ");
}var defined = false;
var typeBinding = node.resolveBinding ();
if (typeBinding != null) {
var superclass = typeBinding.getSuperclass ();
if (superclass != null) {
var clazzName = superclass.getQualifiedName ();
clazzName = this.assureQualifiedName (this.shortenQualifiedName (clazzName));
if (clazzName != null && clazzName.length != 0 && !"Object".equals (clazzName)) {
this.buffer.append (clazzName);
defined = true;
}}}if (!defined && !node.isInterface ()) {
this.buffer.append ("null");
}this.buffer.append (", ");
var superInterfaces = node.superInterfaceTypes ();
var size = superInterfaces.size ();
if (size == 0) {
this.buffer.append ("null");
} else if (size > 1) {
this.buffer.append ("[");
}for (var iter = superInterfaces.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var binding = (element).resolveBinding ();
if (binding != null) {
var clazzName = binding.getQualifiedName ();
clazzName = this.assureQualifiedName (this.shortenQualifiedName (clazzName));
this.buffer.append (clazzName);
} else {
this.buffer.append (element);
}if (iter.hasNext ()) {
this.buffer.append (", ");
}}
if (size > 1) {
this.buffer.append ("]");
}var superclass = null;
var superType = node.getSuperclassType ();
if (superType != null) {
superclass = superType.resolveBinding ();
}if (superclass != null) {
var binding = superclass;
if (binding != null && !binding.isTopLevel ()) {
if ((binding.getModifiers () & 8) == 0) {
this.buffer.append (", Clazz.innerTypeInstance (");
this.buffer.append (this.assureQualifiedName (this.shortenQualifiedName (binding.getQualifiedName ())));
this.buffer.append (", this, null, Clazz.inheritArgs");
this.buffer.append (")");
}}}var len = this.buffer.length ();
if (", null, null".equals (this.buffer.substring (len - 12))) {
this.buffer.$delete (len - 12, len);
} else if (", null".equals (this.buffer.substring (len - 6))) {
this.buffer.$delete (len - 6, len);
}this.buffer.append (");\r\n");
var laterBufferBackup = this.laterBuffer;
this.laterBuffer =  new StringBuffer ();
var bodyDeclarations = node.bodyDeclarations ();
var tmpBuffer = this.buffer;
var needPreparation = false;
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
if (this.getJ2STag (field, "@j2sIgnore") != null) {
continue ;}if (node.isInterface () || !this.isFieldNeedPreparation (field)) {
continue ;}needPreparation = true;
break;
} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
var init = element;
if (this.getJ2STag (init, "@j2sIgnore") != null) {
continue ;}if ((init.getModifiers () & 8) == 0) {
needPreparation = true;
break;
}}}
if (needPreparation) {
this.buffer.append ("Clazz.prepareFields (c$, function () {\r\n");
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
if (this.getJ2STag (field, "@j2sIgnore") != null) {
continue ;}if (node.isInterface () || !this.isFieldNeedPreparation (field)) {
continue ;}element.accept (this);
} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
var init = element;
if (this.getJ2STag (init, "@j2sIgnore") != null) {
continue ;}if ((init.getModifiers () & 8) == 0) {
element.accept (this);
}}}
this.buffer.append ("});\r\n");
}for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.EnumDeclaration)) {
element.accept (this);
}}
var methods = node.getMethods ();
for (var i = 0; i < methods.length; i++) {
methods[i].accept (this);
}
var staticCount = -1;
var refVisitor =  new net.sf.j2s.core.astvisitors.ReferenceASTVisitor ();
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.TypeDeclaration)) {
if (node.isInterface ()) {
element.accept (this);
}}}
this.buffer.append (this.laterBuffer);
tmpBuffer = this.buffer;
var tmpLaterBuffer = this.laterBuffer;
this.buffer =  new StringBuffer ();
this.laterBuffer =  new StringBuffer ();
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.TypeDeclaration)) {
if (node.isInterface ()) {
continue ;}} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
if (this.getJ2STag (element, "@j2sIgnore") != null) {
continue ;}if (((element).getModifiers () & 8) != 0) {
element.accept (this);
} else {
continue ;}} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
if (this.getJ2STag (field, "@j2sIgnore") != null) {
continue ;}if ((field.getModifiers () & 8) != 0) {
var fragments = field.fragments ();
for (var j = 0; j < fragments.size (); j++) {
var vdf = fragments.get (j);
var initializer = vdf.getInitializer ();
if (initializer != null) {
initializer.accept (this);
}}
} else if (node.isInterface ()) {
var fragments = field.fragments ();
for (var j = 0; j < fragments.size (); j++) {
var vdf = fragments.get (j);
var initializer = vdf.getInitializer ();
vdf.getName ().accept (this);
if (initializer != null) {
initializer.accept (this);
}}
}}}
this.buffer = tmpBuffer;
this.laterBuffer = tmpLaterBuffer;
if (this.methodBuffer.length () > 0) {
this.buffer.append (this.methodBuffer);
this.methodBuffer =  new StringBuffer ();
}this.buffer.append (laterBufferBackup);
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.TypeDeclaration)) {
if (node.isInterface ()) {
continue ;}} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
if (this.getJ2STag (element, "@j2sIgnore") != null) {
continue ;}if (staticCount != -1) {
this.buffer.append (");\r\n");
staticCount = -1;
}if (((element).getModifiers () & 8) != 0) {
element.accept (this);
} else {
continue ;}} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
var field = element;
if (this.getJ2STag (field, "@j2sIgnore") != null) {
continue ;}if ((field.getModifiers () & 8) != 0) {
var fragments = field.fragments ();
for (var j = 0; j < fragments.size (); j++) {
var vdf = fragments.get (j);
if ("serialVersionUID".equals (vdf.getName ().getIdentifier ())) {
continue ;}var initializer = vdf.getInitializer ();
refVisitor.setReferenced (false);
if (initializer != null) {
initializer.accept (refVisitor);
}if (refVisitor.isReferenced ()) {
if (staticCount != -1) {
this.buffer.append (");\r\n");
staticCount = -1;
}this.buffer.append ("c$");
this.buffer.append (".");
vdf.getName ().accept (this);
this.buffer.append (" = ");
this.buffer.append ("c$");
this.buffer.append (".prototype.");
vdf.getName ().accept (this);
this.buffer.append (" = ");
initializer.accept (this);
this.buffer.append (";\r\n");
continue ;} else {
staticCount++;
if (staticCount == 0) {
this.buffer.append ("Clazz.defineStatics (c$");
}}this.buffer.append (",\r\n\"");
vdf.getName ().accept (this);
this.buffer.append ("\", ");
if (initializer != null) {
initializer.accept (this);
} else {
var type = field.getType ();
if (type.isPrimitiveType ()) {
var pType = type;
if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.BOOLEAN) {
this.buffer.append ("false");
} else if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.CHAR) {
this.buffer.append ("'\\0'");
} else {
this.buffer.append ("0");
}} else {
this.buffer.append ("null");
}}}
} else if (node.isInterface ()) {
var fragments = field.fragments ();
for (var j = 0; j < fragments.size (); j++) {
var vdf = fragments.get (j);
if ("serialVersionUID".equals (vdf.getName ().getIdentifier ())) {
continue ;}var initializer = vdf.getInitializer ();
refVisitor.setReferenced (false);
if (initializer != null) {
initializer.accept (refVisitor);
}if (refVisitor.isReferenced ()) {
if (staticCount != -1) {
this.buffer.append (");\r\n");
staticCount = -1;
}this.buffer.append ("c$");
this.buffer.append (".");
vdf.getName ().accept (this);
this.buffer.append (" = ");
this.buffer.append ("c$");
this.buffer.append (".prototype.");
vdf.getName ().accept (this);
this.buffer.append (" = ");
initializer.accept (this);
this.buffer.append (";\r\n");
continue ;} else {
staticCount++;
if (staticCount == 0) {
this.buffer.append ("Clazz.defineStatics (c$");
}}this.buffer.append (",\r\n\"");
vdf.getName ().accept (this);
this.buffer.append ("\", ");
if (initializer != null) {
initializer.accept (this);
} else {
var type = field.getType ();
if (type.isPrimitiveType ()) {
var pType = type;
if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.BOOLEAN) {
this.buffer.append ("false");
} else if (pType.getPrimitiveTypeCode () === org.eclipse.jdt.core.dom.PrimitiveType.CHAR) {
this.buffer.append ("'\\0'");
} else {
this.buffer.append ("0");
}} else {
this.buffer.append ("null");
}}}
}}}
if (staticCount != -1) {
this.buffer.append (");\r\n");
}var fieldsSerializables = this.prepareSimpleSerializable (node, bodyDeclarations);
if (fieldsSerializables.length > 0) {
this.buffer.append ("Clazz.registerSerializableFields(c$, ");
this.buffer.append (fieldsSerializables.toString ());
this.buffer.append (");\r\n");
}this.readSources (node, "@j2sSuffix", "\r\n", "\r\n", true);
this.laterBuffer =  new StringBuffer ();
Clazz.superCall (this, net.sf.j2s.core.astvisitors.ASTScriptVisitor, "endVisit", [node]);
}, "org.eclipse.jdt.core.dom.TypeDeclaration");
Clazz.defineMethod (c$, "prepareSimpleSerializable", 
($fz = function (node, bodyDeclarations) {
var fieldsSerializables =  new StringBuffer ();
var binding = node.resolveBinding ();
var isSimpleSerializable = binding != null && (net.sf.j2s.core.astvisitors.Bindings.findTypeInHierarchy (binding, "net.sf.j2s.ajax.SimpleSerializable") != null);
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
if (node.isInterface ()) {
continue ;}var fieldDeclaration = element;
if (isSimpleSerializable) {
var fragments = fieldDeclaration.fragments ();
var modifiers = fieldDeclaration.getModifiers ();
if ((org.eclipse.jdt.core.dom.Modifier.isPublic (modifiers) || org.eclipse.jdt.core.dom.Modifier.isProtected (modifiers)) && !org.eclipse.jdt.core.dom.Modifier.isStatic (modifiers) && !org.eclipse.jdt.core.dom.Modifier.isTransient (modifiers)) {
var type = fieldDeclaration.getType ();
var dims = 0;
if (type.isArrayType ()) {
dims = 1;
type = (type).getComponentType ();
}var mark = null;
if (type.isPrimitiveType ()) {
var pType = type;
var code = pType.getPrimitiveTypeCode ();
if (code === org.eclipse.jdt.core.dom.PrimitiveType.FLOAT) {
mark = "F";
} else if (code === org.eclipse.jdt.core.dom.PrimitiveType.DOUBLE) {
mark = "D";
} else if (code === org.eclipse.jdt.core.dom.PrimitiveType.INT) {
mark = "I";
} else if (code === org.eclipse.jdt.core.dom.PrimitiveType.LONG) {
mark = "L";
} else if (code === org.eclipse.jdt.core.dom.PrimitiveType.SHORT) {
mark = "S";
} else if (code === org.eclipse.jdt.core.dom.PrimitiveType.BYTE) {
mark = "B";
} else if (code === org.eclipse.jdt.core.dom.PrimitiveType.CHAR) {
mark = "C";
} else if (code === org.eclipse.jdt.core.dom.PrimitiveType.BOOLEAN) {
mark = "b";
}}var resolveBinding = type.resolveBinding ();
if ("java.lang.String".equals (resolveBinding.getQualifiedName ())) {
mark = "s";
}if (mark != null) {
for (var xiter = fragments.iterator (); xiter.hasNext (); ) {
var $var = xiter.next ();
var curDim = dims + $var.getExtraDimensions ();
if (curDim <= 1) {
if (fieldsSerializables.length () > 0) {
fieldsSerializables.append (", ");
}var fieldName = $var.getName ().toString ();
if (this.checkKeyworkViolation (fieldName)) {
fieldName = "$" + fieldName;
}var prefix = null;
if (binding != null && this.checkSameName (binding, fieldName)) {
prefix = "$";
}if (binding != null && this.isInheritedFieldName (binding, fieldName)) {
fieldName = this.getFieldName (binding, fieldName);
}if (prefix != null) {
fieldName = prefix + fieldName;
}fieldsSerializables.append ("\"" + fieldName + "\", \"");
if ((mark.charAt (0)).charCodeAt (0) == ('s').charCodeAt (0) && curDim == 1) {
fieldsSerializables.append ("AX");
} else if (curDim == 1) {
fieldsSerializables.append ("A");
fieldsSerializables.append (mark);
} else {
fieldsSerializables.append (mark);
}fieldsSerializables.append ("\"");
}}
}}}}}
return fieldsSerializables.toString ();
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.TypeDeclaration,java.util.List");
Clazz.defineMethod (c$, "visit", 
function (node) {
var binding = node.resolveBinding ();
var typeVisitor = (this.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor));
if (binding != null) {
if (binding.isTopLevel ()) {
typeVisitor.setClassName (binding.getName ());
} else {
}}if ((node !== this.rootTypeNode) && node.getParent () != null && (Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.AbstractTypeDeclaration) || Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.TypeDeclarationStatement))) {
var visitor = null;
try {
visitor = this.getClass ().newInstance ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
visitor =  new net.sf.j2s.core.astvisitors.ASTScriptVisitor ();
} else {
throw e;
}
}
visitor.rootTypeNode = node;
var className = typeVisitor.getClassName ();
var visitorClassName = null;
if (Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.TypeDeclarationStatement)) {
var anonClassName = null;
if (binding.isAnonymous () || binding.isLocal ()) {
anonClassName = this.assureQualifiedName (this.shortenQualifiedName (binding.getBinaryName ()));
} else {
anonClassName = this.assureQualifiedName (this.shortenQualifiedName (binding.getQualifiedName ()));
}var idx = anonClassName.lastIndexOf ('.');
if (idx == -1) {
visitorClassName = anonClassName;
} else {
visitorClassName = anonClassName.substring (idx + 1);
}} else {
visitorClassName = className + "." + node.getName ();
}(visitor.getAdaptable (net.sf.j2s.core.astvisitors.ASTTypeVisitor)).setClassName (visitorClassName);
(visitor.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).setPackageName ((this.getAdaptable (net.sf.j2s.core.astvisitors.ASTPackageVisitor)).getPackageName ());
node.accept (visitor);
if (node.isInterface () || (node.getModifiers () & 8) != 0 || (Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.TypeDeclaration) && (node.getParent ()).isInterface ())) {
var str = visitor.getBuffer ().toString ();
if (!str.startsWith ("c$")) {
this.laterBuffer.append (str);
} else {
this.laterBuffer.append ("Clazz.pu$h ();\r\n");
this.laterBuffer.append (str);
this.laterBuffer.append ("c$ = Clazz.p0p ();\r\n");
}} else {
this.buffer.append ("if (!Clazz.isClassDefined (\"");
this.buffer.append (visitor.getFullClassName ());
this.buffer.append ("\")) {\r\n");
this.methodBuffer.append ("c$.$");
var targetClassName = visitor.getClassName ();
targetClassName = targetClassName.$replace ('.', '$');
this.methodBuffer.append (targetClassName);
this.methodBuffer.append ("$ = function () {\r\n");
this.methodBuffer.append ("Clazz.pu$h ();\r\n");
this.methodBuffer.append (visitor.getBuffer ().toString ());
this.methodBuffer.append ("c$ = Clazz.p0p ();\r\n");
this.methodBuffer.append ("};\r\n");
var pkgName = visitor.getPackageName ();
if (pkgName != null && pkgName.length > 0) {
this.buffer.append (pkgName);
this.buffer.append (".");
}this.buffer.append (className);
this.buffer.append (".$");
this.buffer.append (targetClassName);
this.buffer.append ("$ ();\r\n");
this.buffer.append ("}\r\n");
}return false;
}if (node.isInterface ()) {
return false;
}this.readSources (node, "@j2sPrefix", "", " ", true);
this.buffer.append ("c$ = ");
this.buffer.append ("Clazz.decorateAsClass (");
this.buffer.append ("function () {\r\n");
if (node === this.rootTypeNode && (node.getModifiers () & 8) == 0 && ((Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.TypeDeclaration) && !(node.getParent ()).isInterface ()) || Clazz.instanceOf (node.getParent (), org.eclipse.jdt.core.dom.TypeDeclarationStatement))) {
this.buffer.append ("Clazz.prepareCallback (this, arguments);\r\n");
}var bodyDeclarations = node.bodyDeclarations ();
for (var iter = bodyDeclarations.iterator (); iter.hasNext (); ) {
var element = iter.next ();
if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.MethodDeclaration)) {
continue ;} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.Initializer)) {
continue ;} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.EnumDeclaration)) {
continue ;} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.FieldDeclaration)) {
if (node.isInterface ()) {
continue ;}var fieldDeclaration = element;
if (this.getJ2STag (fieldDeclaration, "@j2sIgnore") != null) {
continue ;}if (this.isFieldNeedPreparation (fieldDeclaration)) {
this.visitWith (fieldDeclaration, true);
continue ;}} else if (Clazz.instanceOf (element, org.eclipse.jdt.core.dom.TypeDeclaration)) {
if (node.isInterface ()) {
continue ;}}element.accept (this);
}
return false;
}, "org.eclipse.jdt.core.dom.TypeDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
var type = node.getType ();
if (type.isPrimitiveType ()) {
var resolveBinding = type.resolveBinding ();
var name = resolveBinding.getName ();
if ("boolean".equals (name)) {
this.buffer.append ("Boolean");
return false;
} else {
this.buffer.append ("Number");
return false;
}} else if (type.isArrayType ()) {
this.buffer.append ("Array");
return false;
} else {
var resolveBinding = type.resolveBinding ();
var name = resolveBinding.getName ();
if ("Object".equals (name) || "java.lang.Object".equals (name)) {
this.buffer.append ("JavaObject");
return false;
}}type.accept (this);
return false;
}, "org.eclipse.jdt.core.dom.TypeLiteral");
});
