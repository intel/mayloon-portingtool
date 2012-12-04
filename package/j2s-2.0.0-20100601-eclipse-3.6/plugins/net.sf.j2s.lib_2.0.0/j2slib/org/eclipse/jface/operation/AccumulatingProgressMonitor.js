Clazz.declarePackage ("org.eclipse.jface.operation");
Clazz.load (["org.eclipse.core.runtime.ProgressMonitorWrapper"], "org.eclipse.jface.operation.AccumulatingProgressMonitor", ["org.eclipse.jface.dialogs.Dialog"], function () {
c$ = Clazz.decorateAsClass (function () {
this.display = null;
this.collector = null;
this.currentTask = "";
if (!Clazz.isClassDefined ("org.eclipse.jface.operation.AccumulatingProgressMonitor.Collector")) {
org.eclipse.jface.operation.AccumulatingProgressMonitor.$AccumulatingProgressMonitor$Collector$ ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.operation, "AccumulatingProgressMonitor", org.eclipse.core.runtime.ProgressMonitorWrapper);
Clazz.makeConstructor (c$, 
function (monitor, display) {
Clazz.superConstructor (this, org.eclipse.jface.operation.AccumulatingProgressMonitor, [monitor]);
;
this.display = display;
}, "org.eclipse.core.runtime.IProgressMonitor,$wt.widgets.Display");
Clazz.overrideMethod (c$, "beginTask", 
function (name, totalWork) {
{
this.collector = null;
}this.display.syncExec (((Clazz.isClassDefined ("org.eclipse.jface.operation.AccumulatingProgressMonitor$1") ? 0 : org.eclipse.jface.operation.AccumulatingProgressMonitor.$AccumulatingProgressMonitor$1$ ()), Clazz.innerTypeInstance (org.eclipse.jface.operation.AccumulatingProgressMonitor$1, this, Clazz.cloneFinals ("name", name, "totalWork", totalWork))));
}, "~S,~N");
Clazz.defineMethod (c$, "clearCollector", 
($fz = function (collectorToClear) {
if (this.collector === collectorToClear) this.collector = null;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.operation.AccumulatingProgressMonitor.Collector");
Clazz.defineMethod (c$, "createCollector", 
($fz = function (subTask, work) {
this.collector = Clazz.innerTypeInstance (org.eclipse.jface.operation.AccumulatingProgressMonitor.Collector, this, null, subTask, work, this.getWrappedProgressMonitor ());
this.display.asyncExec (this.collector);
}, $fz.isPrivate = true, $fz), "~S,~N");
Clazz.overrideMethod (c$, "done", 
function () {
{
this.collector = null;
}this.display.syncExec (((Clazz.isClassDefined ("org.eclipse.jface.operation.AccumulatingProgressMonitor$2") ? 0 : org.eclipse.jface.operation.AccumulatingProgressMonitor.$AccumulatingProgressMonitor$2$ ()), Clazz.innerTypeInstance (org.eclipse.jface.operation.AccumulatingProgressMonitor$2, this, null)));
});
Clazz.overrideMethod (c$, "internalWorked", 
function (work) {
if (this.collector == null) {
this.createCollector (null, work);
} else {
this.collector.worked (work);
}}, "~N");
Clazz.overrideMethod (c$, "setTaskName", 
function (name) {
{
this.collector = null;
}this.display.syncExec (((Clazz.isClassDefined ("org.eclipse.jface.operation.AccumulatingProgressMonitor$3") ? 0 : org.eclipse.jface.operation.AccumulatingProgressMonitor.$AccumulatingProgressMonitor$3$ ()), Clazz.innerTypeInstance (org.eclipse.jface.operation.AccumulatingProgressMonitor$3, this, Clazz.cloneFinals ("name", name))));
}, "~S");
Clazz.overrideMethod (c$, "subTask", 
function (name) {
if (this.collector == null) {
this.createCollector (name, 0);
} else {
this.collector.subTask (name);
}}, "~S");
Clazz.overrideMethod (c$, "worked", 
function (work) {
this.internalWorked (work);
}, "~N");
Clazz.overrideMethod (c$, "clearBlocked", 
function () {
var pm = this.getWrappedProgressMonitor ();
if (!(Clazz.instanceOf (pm, org.eclipse.core.runtime.IProgressMonitorWithBlocking))) return ;
this.display.asyncExec (((Clazz.isClassDefined ("org.eclipse.jface.operation.AccumulatingProgressMonitor$4") ? 0 : org.eclipse.jface.operation.AccumulatingProgressMonitor.$AccumulatingProgressMonitor$4$ ()), Clazz.innerTypeInstance (org.eclipse.jface.operation.AccumulatingProgressMonitor$4, this, Clazz.cloneFinals ("pm", pm))));
});
Clazz.overrideMethod (c$, "setBlocked", 
function (reason) {
var pm = this.getWrappedProgressMonitor ();
if (!(Clazz.instanceOf (pm, org.eclipse.core.runtime.IProgressMonitorWithBlocking))) return ;
this.display.asyncExec (((Clazz.isClassDefined ("org.eclipse.jface.operation.AccumulatingProgressMonitor$5") ? 0 : org.eclipse.jface.operation.AccumulatingProgressMonitor.$AccumulatingProgressMonitor$5$ ()), Clazz.innerTypeInstance (org.eclipse.jface.operation.AccumulatingProgressMonitor$5, this, Clazz.cloneFinals ("pm", pm, "reason", reason))));
}, "org.eclipse.core.runtime.IStatus");
c$.$AccumulatingProgressMonitor$Collector$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.$subTask = null;
this.$worked = 0;
this.monitor = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.operation.AccumulatingProgressMonitor, "Collector", null, Runnable);
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.$subTask = a;
this.$worked = b;
this.monitor = c;
}, "~S,~N,org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "worked", 
function (a) {
this.$worked = this.$worked + a;
}, "~N");
Clazz.defineMethod (c$, "subTask", 
function (a) {
this.$subTask = a;
}, "~S");
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.operation.AccumulatingProgressMonitor"].clearCollector (this);
if (this.$subTask != null) this.monitor.subTask (this.$subTask);
if (this.$worked > 0) this.monitor.internalWorked (this.$worked);
});
c$ = Clazz.p0p ();
};
c$.$AccumulatingProgressMonitor$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.operation, "AccumulatingProgressMonitor$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.operation.AccumulatingProgressMonitor"].currentTask = this.f$.name;
this.b$["org.eclipse.jface.operation.AccumulatingProgressMonitor"].getWrappedProgressMonitor ().beginTask (this.f$.name, this.f$.totalWork);
});
c$ = Clazz.p0p ();
};
c$.$AccumulatingProgressMonitor$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.operation, "AccumulatingProgressMonitor$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.operation.AccumulatingProgressMonitor"].getWrappedProgressMonitor ().done ();
});
c$ = Clazz.p0p ();
};
c$.$AccumulatingProgressMonitor$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.operation, "AccumulatingProgressMonitor$3", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.operation.AccumulatingProgressMonitor"].currentTask = this.f$.name;
this.b$["org.eclipse.jface.operation.AccumulatingProgressMonitor"].getWrappedProgressMonitor ().setTaskName (this.f$.name);
});
c$ = Clazz.p0p ();
};
c$.$AccumulatingProgressMonitor$4$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.operation, "AccumulatingProgressMonitor$4", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
(this.f$.pm).clearBlocked ();
org.eclipse.jface.dialogs.Dialog.getBlockedHandler ().clearBlocked ();
});
c$ = Clazz.p0p ();
};
c$.$AccumulatingProgressMonitor$5$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.operation, "AccumulatingProgressMonitor$5", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
(this.f$.pm).setBlocked (this.f$.reason);
org.eclipse.jface.dialogs.Dialog.getBlockedHandler ().showBlocked (this.f$.pm, this.f$.reason, this.b$["org.eclipse.jface.operation.AccumulatingProgressMonitor"].currentTask);
});
c$ = Clazz.p0p ();
};
});
