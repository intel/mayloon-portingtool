Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (["$wt.dnd.DropTargetListener", "java.util.ArrayList"], "org.eclipse.jface.util.DelegatingDropAdapter", ["org.eclipse.jface.util.SafeRunnable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
this.currentListener = null;
this.originalDropType = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.util, "DelegatingDropAdapter", null, $wt.dnd.DropTargetListener);
Clazz.prepareFields (c$, function () {
this.listeners =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "addDropTargetListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.util.TransferDropTargetListener");
Clazz.defineMethod (c$, "dragEnter", 
function (event) {
this.originalDropType = event.detail;
this.updateCurrentListener (event);
}, "$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "dragLeave", 
function (event) {
this.setCurrentListener (null, event);
}, "$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "dragOperationChanged", 
function (event) {
this.originalDropType = event.detail;
var oldListener = this.getCurrentListener ();
this.updateCurrentListener (event);
var newListener = this.getCurrentListener ();
if (newListener != null && newListener === oldListener) {
org.eclipse.jface.util.SafeRunnable.run (((Clazz.isClassDefined ("org.eclipse.jface.util.DelegatingDropAdapter$1") ? 0 : org.eclipse.jface.util.DelegatingDropAdapter.$DelegatingDropAdapter$1$ ()), Clazz.innerTypeInstance (org.eclipse.jface.util.DelegatingDropAdapter$1, this, Clazz.cloneFinals ("newListener", newListener, "event", event))));
}}, "$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "dragOver", 
function (event) {
var oldListener = this.getCurrentListener ();
this.updateCurrentListener (event);
var newListener = this.getCurrentListener ();
if (newListener != null && newListener === oldListener) {
org.eclipse.jface.util.SafeRunnable.run (((Clazz.isClassDefined ("org.eclipse.jface.util.DelegatingDropAdapter$2") ? 0 : org.eclipse.jface.util.DelegatingDropAdapter.$DelegatingDropAdapter$2$ ()), Clazz.innerTypeInstance (org.eclipse.jface.util.DelegatingDropAdapter$2, this, Clazz.cloneFinals ("newListener", newListener, "event", event))));
}}, "$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "drop", 
function (event) {
this.updateCurrentListener (event);
if (this.getCurrentListener () != null) {
org.eclipse.jface.util.SafeRunnable.run (((Clazz.isClassDefined ("org.eclipse.jface.util.DelegatingDropAdapter$3") ? 0 : org.eclipse.jface.util.DelegatingDropAdapter.$DelegatingDropAdapter$3$ ()), Clazz.innerTypeInstance (org.eclipse.jface.util.DelegatingDropAdapter$3, this, Clazz.cloneFinals ("event", event))));
}this.setCurrentListener (null, event);
}, "$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "dropAccept", 
function (event) {
if (this.getCurrentListener () != null) {
org.eclipse.jface.util.SafeRunnable.run (((Clazz.isClassDefined ("org.eclipse.jface.util.DelegatingDropAdapter$4") ? 0 : org.eclipse.jface.util.DelegatingDropAdapter.$DelegatingDropAdapter$4$ ()), Clazz.innerTypeInstance (org.eclipse.jface.util.DelegatingDropAdapter$4, this, Clazz.cloneFinals ("event", event))));
}}, "$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "getCurrentListener", 
($fz = function () {
return this.currentListener;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSupportedTransferType", 
($fz = function (dataTypes, listener) {
for (var i = 0; i < dataTypes.length; i++) {
if (listener.getTransfer ().isSupportedType (dataTypes[i])) {
return dataTypes[i];
}}
return null;
}, $fz.isPrivate = true, $fz), "~A,org.eclipse.jface.util.TransferDropTargetListener");
Clazz.defineMethod (c$, "getTransfers", 
function () {
var types =  new Array (this.listeners.size ());
for (var i = 0; i < this.listeners.size (); i++) {
var listener = this.listeners.get (i);
types[i] = listener.getTransfer ();
}
return types;
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.listeners.isEmpty ();
});
Clazz.defineMethod (c$, "removeDropTargetListener", 
function (listener) {
if (this.currentListener === listener) this.currentListener = null;
this.listeners.remove (listener);
}, "org.eclipse.jface.util.TransferDropTargetListener");
Clazz.defineMethod (c$, "setCurrentListener", 
($fz = function (listener, event) {
if (this.currentListener === listener) return false;
if (this.currentListener != null) {
org.eclipse.jface.util.SafeRunnable.run (((Clazz.isClassDefined ("org.eclipse.jface.util.DelegatingDropAdapter$5") ? 0 : org.eclipse.jface.util.DelegatingDropAdapter.$DelegatingDropAdapter$5$ ()), Clazz.innerTypeInstance (org.eclipse.jface.util.DelegatingDropAdapter$5, this, Clazz.cloneFinals ("event", event))));
}this.currentListener = listener;
if (this.currentListener != null) {
org.eclipse.jface.util.SafeRunnable.run (((Clazz.isClassDefined ("org.eclipse.jface.util.DelegatingDropAdapter$6") ? 0 : org.eclipse.jface.util.DelegatingDropAdapter.$DelegatingDropAdapter$6$ ()), Clazz.innerTypeInstance (org.eclipse.jface.util.DelegatingDropAdapter$6, this, Clazz.cloneFinals ("event", event))));
}return true;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.util.TransferDropTargetListener,$wt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "updateCurrentListener", 
($fz = function (event) {
var originalDetail = event.detail;
event.detail = this.originalDropType;
var iter = this.listeners.iterator ();
while (iter.hasNext ()) {
var listener = iter.next ();
var dataType = this.getSupportedTransferType (event.dataTypes, listener);
if (dataType != null) {
var originalDataType = event.currentDataType;
event.currentDataType = dataType;
if (listener.isEnabled (event)) {
if (!this.setCurrentListener (listener, event)) event.detail = originalDetail;
return ;
} else {
event.currentDataType = originalDataType;
}}}
this.setCurrentListener (null, event);
event.detail = 0;
}, $fz.isPrivate = true, $fz), "$wt.dnd.DropTargetEvent");
c$.$DelegatingDropAdapter$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "DelegatingDropAdapter$1", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.newListener.dragOperationChanged (this.f$.event);
});
c$ = Clazz.p0p ();
};
c$.$DelegatingDropAdapter$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "DelegatingDropAdapter$2", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.newListener.dragOver (this.f$.event);
});
c$ = Clazz.p0p ();
};
c$.$DelegatingDropAdapter$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "DelegatingDropAdapter$3", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.util.DelegatingDropAdapter"].getCurrentListener ().drop (this.f$.event);
});
c$ = Clazz.p0p ();
};
c$.$DelegatingDropAdapter$4$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "DelegatingDropAdapter$4", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.util.DelegatingDropAdapter"].getCurrentListener ().dropAccept (this.f$.event);
});
c$ = Clazz.p0p ();
};
c$.$DelegatingDropAdapter$5$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "DelegatingDropAdapter$5", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.util.DelegatingDropAdapter"].currentListener.dragLeave (this.f$.event);
});
c$ = Clazz.p0p ();
};
c$.$DelegatingDropAdapter$6$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "DelegatingDropAdapter$6", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.util.DelegatingDropAdapter"].currentListener.dragEnter (this.f$.event);
});
c$ = Clazz.p0p ();
};
});
