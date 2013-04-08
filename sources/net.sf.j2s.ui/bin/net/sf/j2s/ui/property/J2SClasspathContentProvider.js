Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["org.eclipse.jface.viewers.ITreeContentProvider"], "net.sf.j2s.ui.property.J2SClasspathContentProvider", ["net.sf.j2s.ui.property.J2SClasspathModel"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.property, "J2SClasspathContentProvider", null, org.eclipse.jface.viewers.ITreeContentProvider);
Clazz.overrideMethod (c$, "getChildren", 
function (parentElement) {
if (Clazz.instanceOf (parentElement, net.sf.j2s.ui.property.J2SClasspathModel)) {
var model = parentElement;
return model.getCategories ();
} else if (Clazz.instanceOf (parentElement, net.sf.j2s.ui.property.J2SCategory)) {
var ctg = parentElement;
if (net.sf.j2s.ui.property.J2SClasspathModel.categories[0].equals (ctg.getKey ())) {
return ctg.getParent ().getResources ();
} else if ("Classes".equals (ctg.getKey ())) {
return ctg.getParent ().getUnitClasses ();
} else {
return ctg.getParent ().getAbandonedClasses ();
}} else if (Clazz.instanceOf (parentElement, net.sf.j2s.ui.classpath.CompositeResources)) {
var comp = parentElement;
return comp.getChildren ();
} else if (Clazz.instanceOf (parentElement, net.sf.j2s.ui.classpath.ContactedClasses)) {
var comp = parentElement;
return comp.getChildren ();
}return  new Array (0);
}, "~O");
Clazz.overrideMethod (c$, "getParent", 
function (element) {
return null;
}, "~O");
Clazz.overrideMethod (c$, "hasChildren", 
function (element) {
return this.getChildren (element).length > 0;
}, "~O");
Clazz.overrideMethod (c$, "getElements", 
function (inputElement) {
return this.getChildren (inputElement);
}, "~O");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.overrideMethod (c$, "inputChanged", 
function (viewer, oldInput, newInput) {
}, "org.eclipse.jface.viewers.Viewer,~O,~O");
});
