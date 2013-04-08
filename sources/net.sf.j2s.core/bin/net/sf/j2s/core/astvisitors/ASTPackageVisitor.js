Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.AbstractPluginVisitor"], "net.sf.j2s.core.astvisitors.ASTPackageVisitor", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.thisPackageName = "";
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "ASTPackageVisitor", net.sf.j2s.core.astvisitors.AbstractPluginVisitor);
Clazz.defineMethod (c$, "skipDeclarePackages", 
function () {
return ["java.lang", "java.lang.ref", "java.lang.ref.reflect", "java.lang.reflect", "java.lang.annotation", "java.lang.instrument", "java.lang.management", "java.io", "java.util"];
});
Clazz.defineMethod (c$, "getPackageName", 
function () {
return this.thisPackageName;
});
Clazz.defineMethod (c$, "setPackageName", 
function (thisPackageName) {
this.thisPackageName = thisPackageName;
}, "~S");
});
