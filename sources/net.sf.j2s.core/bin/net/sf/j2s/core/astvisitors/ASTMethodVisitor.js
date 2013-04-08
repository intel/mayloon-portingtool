Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.AbstractPluginVisitor"], "net.sf.j2s.core.astvisitors.ASTMethodVisitor", ["java.util.HashMap", "$.HashSet", "net.sf.j2s.core.astvisitors.Bindings", "$.MethodReferenceASTVisitor"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.astvisitors, "ASTMethodVisitor", net.sf.j2s.core.astvisitors.AbstractPluginVisitor);
c$.init = Clazz.defineMethod (c$, "init", 
function () {
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.pmMap =  new java.util.HashMap (), net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.pmMap = net.sf.j2s.core.astvisitors.ASTMethodVisitor.pmMap, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.methodSet =  new java.util.HashSet (), net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.methodSet = net.sf.j2s.core.astvisitors.ASTMethodVisitor.methodSet, $t$);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.register ("java.lang.String", "length", "length");
net.sf.j2s.core.astvisitors.ASTMethodVisitor.register ("java.lang.String", "replace", "~replace");
net.sf.j2s.core.astvisitors.ASTMethodVisitor.register ("java.lang.String", "split", "~plit");
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerAllMaps ();
});
Clazz.defineMethod (c$, "isMethodRegistered", 
function (methodName) {
return net.sf.j2s.core.astvisitors.ASTMethodVisitor.methodSet.contains (methodName);
}, "~S");
c$.register = Clazz.defineMethod (c$, "register", 
function (className, methodName, propertyName) {
net.sf.j2s.core.astvisitors.ASTMethodVisitor.pmMap.put (className + "." + methodName, propertyName);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.methodSet.add (methodName);
}, "~S,~S,~S");
Clazz.defineMethod (c$, "translate", 
function (className, methodName) {
return net.sf.j2s.core.astvisitors.ASTMethodVisitor.pmMap.get (className + "." + methodName);
}, "~S,~S");
c$.registerMap = Clazz.defineMethod (c$, "registerMap", 
function (map) {
for (var i = 1; i < map.length; i++) {
net.sf.j2s.core.astvisitors.ASTMethodVisitor.register (net.sf.j2s.core.astvisitors.ASTMethodVisitor.PACKAGE_PREFIX + map[0], "get" + map[i].substring (0, 1).toUpperCase () + map[i].substring (1), map[i]);
}
}, "~A");
c$.registerAllMaps = Clazz.defineMethod (c$, "registerAllMaps", 
function () {
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapDocument);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNode);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNodeList);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNamedNodeMap);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapCharacterData);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapAttr);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapElement);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapDocumentType);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNotation);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapEntity);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.registerMap (net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapProcessingInstruction);
});
Clazz.defineMethod (c$, "testForceOverriding", 
($fz = function (method) {
if (method == null) {
return true;
}var methodName = method.getName ();
var classInHierarchy = method.getDeclaringClass ();
do {
var methods = classInHierarchy.getDeclaredMethods ();
var count = 0;
var superMethod = null;
for (var i = 0; i < methods.length; i++) {
if (methodName.equals (methods[i].getName ())) {
count++;
superMethod = methods[i];
}}
if (count > 1) {
return false;
} else if (count == 1) {
if (!net.sf.j2s.core.astvisitors.Bindings.isSubsignature (method, superMethod)) {
return false;
} else if ((superMethod.getModifiers () & 2) != 0) {
return false;
}}classInHierarchy = classInHierarchy.getSuperclass ();
} while (classInHierarchy != null);
return true;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.dom.IMethodBinding");
Clazz.defineMethod (c$, "canAutoOverride", 
function (node) {
var isOK2AutoOverriding = false;
var methodBinding = node.resolveBinding ();
if (methodBinding != null && this.testForceOverriding (methodBinding)) {
var superMethod = net.sf.j2s.core.astvisitors.Bindings.findMethodDeclarationInHierarchy (methodBinding.getDeclaringClass (), methodBinding);
if (superMethod != null) {
var parentRoot = node.getParent ();
while (parentRoot != null && !(Clazz.instanceOf (parentRoot, org.eclipse.jdt.core.dom.AbstractTypeDeclaration))) {
parentRoot = parentRoot.getParent ();
}
if (parentRoot != null) {
isOK2AutoOverriding = !net.sf.j2s.core.astvisitors.MethodReferenceASTVisitor.checkReference (parentRoot, superMethod.getKey ());
}}}return isOK2AutoOverriding;
}, "org.eclipse.jdt.core.dom.MethodDeclaration");
Clazz.defineStatics (c$,
"methodSet", null,
"pmMap", null,
"PACKAGE_PREFIX", null,
"mapDocument", null,
"mapNode", null,
"mapNodeList", null,
"mapNamedNodeMap", null,
"mapCharacterData", null,
"mapAttr", null,
"mapElement", null,
"mapDocumentType", null,
"mapNotation", null,
"mapEntity", null,
"mapProcessingInstruction", null);
{
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.PACKAGE_PREFIX = "org.w3c.dom.", net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.PACKAGE_PREFIX = net.sf.j2s.core.astvisitors.ASTMethodVisitor.PACKAGE_PREFIX, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapDocument = ["Document", "doctype", "implementation", "documentElement"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapDocument = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapDocument, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNode = ["Node", "nodeName", "nodeValue", "nodeType", "parentNode", "childNodes", "firstChild", "lastChild", "previousSibling", "nextSibling", "attributes", "ownerDocument", "namespaceURI", "prefix", "localName"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapNode = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNode, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNodeList = ["NodeList", "length"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapNodeList = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNodeList, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNamedNodeMap = ["NamedNodeMap", "length"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapNamedNodeMap = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNamedNodeMap, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapCharacterData = ["CharacterData", "data", "length"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapCharacterData = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapCharacterData, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapAttr = ["Attr", "name", "specified", "value", "ownerElement"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapAttr = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapAttr, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapElement = ["Element", "tagName"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapElement = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapElement, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapDocumentType = ["DocumentType", "name", "entities", "notations", "publicId", "systemId", "internalSubset"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapDocumentType = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapDocumentType, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNotation = ["Notation", "publicId", "systemId"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapNotation = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapNotation, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapEntity = ["Entity", "publicId", "systemId", "notationName"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapEntity = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapEntity, $t$);
($t$ = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapProcessingInstruction = ["ProcessingInstruction", "target", "data"], net.sf.j2s.core.astvisitors.ASTMethodVisitor.prototype.mapProcessingInstruction = net.sf.j2s.core.astvisitors.ASTMethodVisitor.mapProcessingInstruction, $t$);
net.sf.j2s.core.astvisitors.ASTMethodVisitor.init ();
}});
