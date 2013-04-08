Clazz.declarePackage ("net.sf.j2s.core.builder");
c$ = Clazz.decorateAsClass (function () {
this.file = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "SourceFileProxy");
Clazz.makeConstructor (c$, 
function (file) {
this.file = file;
}, "net.sf.j2s.core.builder.SourceFile");
Clazz.defineMethod (c$, "getResource", 
function () {
return this.file.resource;
});
