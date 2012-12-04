Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["java.util.EventObject"], "org.eclipse.jface.dialogs.PageChangedEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.selectedPage = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "PageChangedEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, selectedPage) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.PageChangedEvent, [source]);
;
this.selectedPage = selectedPage;
}, "org.eclipse.jface.dialogs.IPageChangeProvider,~O");
Clazz.defineMethod (c$, "getSelectedPage", 
function () {
return this.selectedPage;
});
Clazz.defineMethod (c$, "getPageChangeProvider", 
function () {
return this.getSource ();
});
});
