Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["java.util.EventObject"], "org.eclipse.jface.viewers.DoubleClickEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.selection = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "DoubleClickEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, selection) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.DoubleClickEvent, [source]);
;
this.selection = selection;
}, "org.eclipse.jface.viewers.Viewer,org.eclipse.jface.viewers.ISelection");
Clazz.defineMethod (c$, "getSelection", 
function () {
return this.selection;
});
Clazz.defineMethod (c$, "getViewer", 
function () {
return this.getSource ();
});
});
