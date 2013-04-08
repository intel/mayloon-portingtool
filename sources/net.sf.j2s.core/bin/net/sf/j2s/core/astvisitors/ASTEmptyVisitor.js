Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["org.eclipse.jdt.core.dom.ASTVisitor", "java.lang.StringBuffer", "java.util.HashMap"], "net.sf.j2s.core.astvisitors.ASTEmptyVisitor", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.buffer = null;
this.visitorMap = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "ASTEmptyVisitor", org.eclipse.jdt.core.dom.ASTVisitor);
Clazz.prepareFields (c$, function () {
this.buffer =  new StringBuffer ();
this.visitorMap =  new java.util.HashMap ();
});
Clazz.defineMethod (c$, "getBuffer", 
function () {
return this.buffer;
});
Clazz.defineMethod (c$, "setBuffer", 
function (buffer) {
this.buffer = buffer;
}, "StringBuffer");
Clazz.defineMethod (c$, "getAdaptable", 
function (clazz) {
if (clazz === net.sf.j2s.core.astvisitors.ASTEmptyVisitor) {
return this;
}var visitor = this.visitorMap.get (clazz);
if (visitor != null) {
return visitor;
}try {
var newInstance = clazz.newInstance ();
if (Clazz.instanceOf (newInstance, net.sf.j2s.core.astvisitors.IPluginVisitor)) {
this.registerPluginVisitor (newInstance);
return newInstance;
}} catch (e$$) {
if (Clazz.instanceOf (e$$, InstantiationException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
return null;
}, "Class");
Clazz.defineMethod (c$, "registerPluginVisitor", 
function (visitor) {
visitor.setVisitor (this);
this.visitorMap.put (visitor.getClass (), visitor);
}, "net.sf.j2s.core.astvisitors.IPluginVisitor");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.AnnotationTypeDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.AnnotationTypeMemberDeclaration");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.BlockComment");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.Javadoc");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.LineComment");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.MarkerAnnotation");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.MemberRef");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.MemberValuePair");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.MethodRef");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.MethodRefParameter");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.NormalAnnotation");
Clazz.defineMethod (c$, "visit", 
function (node) {
node.getType ().accept (this);
return false;
}, "org.eclipse.jdt.core.dom.ParameterizedType");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.SingleMemberAnnotation");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.TagElement");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.TextElement");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.TypeParameter");
Clazz.defineMethod (c$, "visit", 
function (node) {
return false;
}, "org.eclipse.jdt.core.dom.WildcardType");
});
