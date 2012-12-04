Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.Viewer", "$.ILabelProviderListener"], "org.eclipse.jface.viewers.ContentViewer", ["org.eclipse.jface.viewers.LabelProvider", "$wt.events.DisposeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contentProvider = null;
this.input = null;
this.labelProvider = null;
this.labelProviderListener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ContentViewer", org.eclipse.jface.viewers.Viewer);
Clazz.prepareFields (c$, function () {
this.labelProviderListener = ((Clazz.isClassDefined ("org.eclipse.jface.viewers.ContentViewer$1") ? 0 : org.eclipse.jface.viewers.ContentViewer.$ContentViewer$1$ ()), Clazz.innerTypeInstance (org.eclipse.jface.viewers.ContentViewer$1, this, null));
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.viewers.ContentViewer, []);
});
Clazz.defineMethod (c$, "getContentProvider", 
function () {
return this.contentProvider;
});
Clazz.overrideMethod (c$, "getInput", 
function () {
return this.input;
});
Clazz.defineMethod (c$, "getLabelProvider", 
function () {
if (this.labelProvider == null) this.labelProvider =  new org.eclipse.jface.viewers.LabelProvider ();
return this.labelProvider;
});
Clazz.defineMethod (c$, "handleDispose", 
function (event) {
if (this.contentProvider != null) {
this.contentProvider.inputChanged (this, this.getInput (), null);
this.contentProvider.dispose ();
this.contentProvider = null;
}if (this.labelProvider != null) {
this.labelProvider.removeListener (this.labelProviderListener);
this.labelProvider.dispose ();
this.labelProvider = null;
}}, "$wt.events.DisposeEvent");
Clazz.defineMethod (c$, "handleLabelProviderChanged", 
function (event) {
this.labelProviderChanged ();
}, "org.eclipse.jface.viewers.LabelProviderChangedEvent");
Clazz.defineMethod (c$, "hookControl", 
function (control) {
control.addDisposeListener (((Clazz.isClassDefined ("org.eclipse.jface.viewers.ContentViewer$2") ? 0 : org.eclipse.jface.viewers.ContentViewer.$ContentViewer$2$ ()), Clazz.innerTypeInstance (org.eclipse.jface.viewers.ContentViewer$2, this, null)));
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "labelProviderChanged", 
function () {
this.refresh ();
});
Clazz.defineMethod (c$, "setContentProvider", 
function (contentProvider) {
;
var oldContentProvider = this.contentProvider;
this.contentProvider = contentProvider;
if (oldContentProvider != null) {
var currentInput = this.getInput ();
oldContentProvider.inputChanged (this, currentInput, null);
oldContentProvider.dispose ();
contentProvider.inputChanged (this, null, currentInput);
this.refresh ();
}}, "org.eclipse.jface.viewers.IContentProvider");
Clazz.overrideMethod (c$, "setInput", 
function (input) {
;
var oldInput = this.getInput ();
this.contentProvider.inputChanged (this, oldInput, input);
this.input = input;
this.inputChanged (this.input, oldInput);
}, "~O");
Clazz.defineMethod (c$, "setLabelProvider", 
function (labelProvider) {
var oldProvider = this.labelProvider;
if (labelProvider === oldProvider) {
return ;
}if (oldProvider != null) {
oldProvider.removeListener (this.labelProviderListener);
}this.labelProvider = labelProvider;
if (labelProvider != null) {
labelProvider.addListener (this.labelProviderListener);
}this.refresh ();
if (oldProvider != null) {
oldProvider.dispose ();
}}, "org.eclipse.jface.viewers.IBaseLabelProvider");
c$.$ContentViewer$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "ContentViewer$1", null, org.eclipse.jface.viewers.ILabelProviderListener);
Clazz.overrideMethod (c$, "labelProviderChanged", 
function (event) {
this.b$["org.eclipse.jface.viewers.ContentViewer"].handleLabelProviderChanged (event);
}, "org.eclipse.jface.viewers.LabelProviderChangedEvent");
c$ = Clazz.p0p ();
};
c$.$ContentViewer$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "ContentViewer$2", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.viewers.ContentViewer"].handleDispose (event);
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
};
});
