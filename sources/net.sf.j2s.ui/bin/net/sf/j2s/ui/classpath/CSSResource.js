Clazz.declarePackage ("net.sf.j2s.ui.classpath");
Clazz.load (["net.sf.j2s.ui.classpath.IExternalResource", "$.Resource"], "net.sf.j2s.ui.classpath.CSSResource", ["java.lang.StringBuffer"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.classpath, "CSSResource", net.sf.j2s.ui.classpath.Resource, net.sf.j2s.ui.classpath.IExternalResource);
Clazz.overrideMethod (c$, "toHTMLString", 
function () {
var p = this.getParent ();
if (p != null) {
if (Clazz.instanceOf (p, net.sf.j2s.ui.classpath.ContactedClasses)) {
var pp = p.getParent ();
if (pp != null && Clazz.instanceOf (pp, net.sf.j2s.ui.classpath.ContactedClasses)) {
return "";
}}}var buf =  new StringBuffer ();
buf.append ("<link rel=\"stylesheet\" href=\"");
if (p != null) {
if (Clazz.instanceOf (p, net.sf.j2s.ui.classpath.ContactedClasses)) {
var cc = p;
var path = cc.getRelativePath ();
var idx = path.lastIndexOf ('/');
if (idx != -1) {
buf.append (path.substring (0, idx + 1));
}} else if (Clazz.instanceOf (p, net.sf.j2s.ui.classpath.CompositeResources)) {
var cc = p;
var path = cc.getBinRelativePath ();
if (path != null) {
buf.append (path);
}}buf.append (this.getRelativePath ());
} else {
buf.append (this.getRelativePath ());
}buf.append ("\"/>\r\n");
return buf.toString ();
});
Clazz.overrideMethod (c$, "getType", 
function () {
return 5;
});
});
