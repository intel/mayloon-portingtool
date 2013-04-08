Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["java.lang.RuntimeException"], "net.sf.j2s.core.builder.MissingSourceFileException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.missingSourceFile = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "MissingSourceFileException", RuntimeException);
Clazz.makeConstructor (c$, 
function (missingSourceFile) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.MissingSourceFileException, []);
this.missingSourceFile = missingSourceFile;
}, "~S");
});
