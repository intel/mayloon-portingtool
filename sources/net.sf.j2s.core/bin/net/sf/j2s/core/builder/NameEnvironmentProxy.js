Clazz.declarePackage ("net.sf.j2s.core.builder");
c$ = Clazz.decorateAsClass (function () {
this.nameEnv = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "NameEnvironmentProxy");
Clazz.makeConstructor (c$, 
function (env) {
this.nameEnv = env;
}, "net.sf.j2s.core.builder.NameEnvironment");
Clazz.defineMethod (c$, "getBinaryLocations", 
function () {
return this.nameEnv.binaryLocations;
});
