Clazz.declarePackage ("net.sf.j2s.core.builder");
c$ = Clazz.decorateAsClass (function () {
this.classpath = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "ClasspathDirectoryProxy");
Clazz.makeConstructor (c$, 
function (classpath) {
this.classpath = classpath;
}, "net.sf.j2s.core.builder.ClasspathDirectory");
Clazz.defineMethod (c$, "getBinaryFolder", 
function () {
return this.classpath.binaryFolder;
});
