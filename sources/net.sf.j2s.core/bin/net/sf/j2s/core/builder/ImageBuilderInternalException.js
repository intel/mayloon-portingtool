Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["java.lang.RuntimeException"], "net.sf.j2s.core.builder.ImageBuilderInternalException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.coreException = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "ImageBuilderInternalException", RuntimeException);
Clazz.makeConstructor (c$, 
function (e) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.ImageBuilderInternalException, []);
this.coreException = e;
}, "org.eclipse.core.runtime.CoreException");
Clazz.defineMethod (c$, "getThrowable", 
function () {
return this.coreException;
});
Clazz.defineMethod (c$, "printStackTrace", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
if (this.coreException != null) {
System.err.println (this);
System.err.println ("Stack trace of embedded core exception:");
this.coreException.printStackTrace ();
} else {
Clazz.superCall (this, net.sf.j2s.core.builder.ImageBuilderInternalException, "printStackTrace", []);
}});
});
