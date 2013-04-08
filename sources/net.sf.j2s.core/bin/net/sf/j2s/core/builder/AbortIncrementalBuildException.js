Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["java.lang.RuntimeException"], "net.sf.j2s.core.builder.AbortIncrementalBuildException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.qualifiedTypeName = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "AbortIncrementalBuildException", RuntimeException);
Clazz.makeConstructor (c$, 
function (qualifiedTypeName) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.AbortIncrementalBuildException, []);
this.qualifiedTypeName = qualifiedTypeName;
}, "~S");
});
