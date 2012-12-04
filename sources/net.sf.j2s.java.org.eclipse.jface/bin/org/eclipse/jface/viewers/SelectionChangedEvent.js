Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["java.util.EventObject"], "org.eclipse.jface.viewers.SelectionChangedEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.selection = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "SelectionChangedEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, selection) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.SelectionChangedEvent, [source]);
;
this.selection = selection;
}, "org.eclipse.jface.viewers.ISelectionProvider,org.eclipse.jface.viewers.ISelection");
Clazz.defineMethod (c$, "getSelection", 
function () {
return this.selection;
});
Clazz.defineMethod (c$, "getSelectionProvider", 
function () {
return this.getSource ();
});
});
