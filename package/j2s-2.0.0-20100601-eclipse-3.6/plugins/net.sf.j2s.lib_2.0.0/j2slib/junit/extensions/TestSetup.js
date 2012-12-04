Clazz.declarePackage ("junit.extensions");
Clazz.load (["junit.extensions.TestDecorator"], "junit.extensions.TestSetup", ["junit.framework.Protectable"], function () {
c$ = Clazz.declareType (junit.extensions, "TestSetup", junit.extensions.TestDecorator);
Clazz.overrideMethod (c$, "run", 
function (result) {
var p = ((Clazz.isClassDefined ("junit.extensions.TestSetup$1") ? 0 : junit.extensions.TestSetup.$TestSetup$1$ ()), Clazz.innerTypeInstance (junit.extensions.TestSetup$1, this, Clazz.cloneFinals ("result", result)));
result.runProtected (this, p);
}, "junit.framework.TestResult");
Clazz.defineMethod (c$, "setUp", 
function () {
});
Clazz.defineMethod (c$, "tearDown", 
function () {
});
c$.$TestSetup$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (junit.extensions, "TestSetup$1", null, junit.framework.Protectable);
Clazz.overrideMethod (c$, "protect", 
function () {
this.b$["junit.extensions.TestSetup"].setUp ();
this.b$["junit.extensions.TestSetup"].basicRun (this.f$.result);
this.b$["junit.extensions.TestSetup"].tearDown ();
});
c$ = Clazz.p0p ();
};
});
