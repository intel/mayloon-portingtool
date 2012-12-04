Clazz.declarePackage ("org.eclipse.jface.viewers.deferred");
Clazz.load (["org.eclipse.jface.viewers.ILazyContentProvider", "org.eclipse.jface.viewers.deferred.AbstractVirtualTable", "org.eclipse.jface.viewers.AcceptAllFilter"], "org.eclipse.jface.viewers.deferred.DeferredContentProvider", ["org.eclipse.jface.viewers.deferred.BackgroundContentProvider", "$wt.widgets.Display"], function () {
c$ = Clazz.decorateAsClass (function () {
this.limit = -1;
this.provider = null;
this.sortOrder = null;
this.filter = null;
this.table = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred, "DeferredContentProvider", null, org.eclipse.jface.viewers.ILazyContentProvider);
Clazz.prepareFields (c$, function () {
this.filter = org.eclipse.jface.viewers.AcceptAllFilter.getInstance ();
});
Clazz.makeConstructor (c$, 
function (sortOrder) {
this.sortOrder = sortOrder;
}, "java.util.Comparator");
Clazz.overrideMethod (c$, "dispose", 
function () {
this.setProvider (null);
});
Clazz.overrideMethod (c$, "inputChanged", 
function (viewer, oldInput, newInput) {
if (newInput == null) {
this.setProvider (null);
return ;
};
;
var model = newInput;
this.table =  new org.eclipse.jface.viewers.deferred.DeferredContentProvider.TableViewerAdapter (viewer);
var newProvider =  new org.eclipse.jface.viewers.deferred.BackgroundContentProvider (this.table, model, this.sortOrder, $wt.widgets.Display.getCurrent ());
this.setProvider (newProvider);
newProvider.setLimit (this.limit);
newProvider.setFilter (this.filter);
}, "org.eclipse.jface.viewers.Viewer,~O,~O");
Clazz.defineMethod (c$, "setSortOrder", 
function (sortOrder) {
;
this.sortOrder = sortOrder;
if (this.provider != null) {
this.provider.setSortOrder (sortOrder);
}}, "java.util.Comparator");
Clazz.defineMethod (c$, "setFilter", 
function (toSet) {
this.filter = toSet;
if (this.provider != null) {
this.provider.setFilter (toSet);
}}, "org.eclipse.jface.viewers.IFilter");
Clazz.defineMethod (c$, "setLimit", 
function (limit) {
this.limit = limit;
if (this.provider != null) {
this.provider.setLimit (limit);
}}, "~N");
Clazz.defineMethod (c$, "getLimit", 
function () {
return this.limit;
});
Clazz.overrideMethod (c$, "updateElement", 
function (element) {
if (this.provider != null) {
this.provider.checkVisibleRange (element);
}}, "~N");
Clazz.defineMethod (c$, "setProvider", 
($fz = function (newProvider) {
if (this.provider != null) {
this.provider.dispose ();
}this.provider = newProvider;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.deferred.BackgroundContentProvider");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.viewer = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred.DeferredContentProvider, "TableViewerAdapter", org.eclipse.jface.viewers.deferred.AbstractVirtualTable);
Clazz.makeConstructor (c$, 
function (viewer) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.deferred.DeferredContentProvider.TableViewerAdapter, []);
this.viewer = viewer;
}, "org.eclipse.jface.viewers.TableViewer");
Clazz.overrideMethod (c$, "clear", 
function (index) {
this.viewer.clear (index);
}, "~N");
Clazz.overrideMethod (c$, "replace", 
function (element, itemIndex) {
this.viewer.replace (element, itemIndex);
}, "~O,~N");
Clazz.overrideMethod (c$, "setItemCount", 
function (total) {
this.viewer.setItemCount (total);
}, "~N");
Clazz.overrideMethod (c$, "getItemCount", 
function () {
return this.viewer.getTable ().getItemCount ();
});
Clazz.overrideMethod (c$, "getTopIndex", 
function () {
return Math.max (this.viewer.getTable ().getTopIndex () - 1, 0);
});
Clazz.overrideMethod (c$, "getVisibleItemCount", 
function () {
var start = this.getTopIndex ();
var itemCount = this.getItemCount ();
var table = this.viewer.getTable ();
return Math.min (Math.floor (table.getBounds ().height / table.getItemHeight ()) + 2, itemCount - start);
});
c$ = Clazz.p0p ();
});
