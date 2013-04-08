Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.debug.core.model.IProcess"], "net.sf.j2s.ui.launching.J2SProcess", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.launch = null;
this.label = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.launching, "J2SProcess", null, org.eclipse.debug.core.model.IProcess);
Clazz.makeConstructor (c$, 
function (launch, label) {
this.launch = launch;
this.label = label;
}, "org.eclipse.debug.core.ILaunch,~S");
Clazz.overrideMethod (c$, "getAttribute", 
function (key) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getExitValue", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getLabel", 
function () {
return this.label;
});
Clazz.overrideMethod (c$, "getLaunch", 
function () {
return this.launch;
});
Clazz.overrideMethod (c$, "getStreamsProxy", 
function () {
return null;
});
Clazz.overrideMethod (c$, "setAttribute", 
function (key, value) {
}, "~S,~S");
Clazz.overrideMethod (c$, "getAdapter", 
function (adapter) {
return null;
}, "Class");
Clazz.overrideMethod (c$, "canTerminate", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isTerminated", 
function () {
return true;
});
Clazz.overrideMethod (c$, "terminate", 
function () {
});
});
