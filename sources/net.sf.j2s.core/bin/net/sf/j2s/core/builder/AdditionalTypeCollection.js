Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["net.sf.j2s.core.builder.ReferenceCollection"], "net.sf.j2s.core.builder.AdditionalTypeCollection", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.definedTypeNames = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "AdditionalTypeCollection", net.sf.j2s.core.builder.ReferenceCollection);
Clazz.makeConstructor (c$, 
function (definedTypeNames, qualifiedReferences, simpleNameReferences, rootReferences) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.AdditionalTypeCollection, [qualifiedReferences, simpleNameReferences, rootReferences]);
this.definedTypeNames = definedTypeNames;
}, "~A,~A,~A,~A");
});
