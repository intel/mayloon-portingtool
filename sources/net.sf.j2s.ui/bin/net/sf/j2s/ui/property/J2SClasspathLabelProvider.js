Clazz.declarePackage ("net.sf.j2s.ui.property");
Clazz.load (["org.eclipse.jface.viewers.LabelProvider"], "net.sf.j2s.ui.property.J2SClasspathLabelProvider", ["org.eclipse.jdt.ui.JavaUI"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.property, "J2SClasspathLabelProvider", org.eclipse.jface.viewers.LabelProvider);
Clazz.overrideMethod (c$, "getImage", 
function (element) {
if (Clazz.instanceOf (element, net.sf.j2s.ui.classpath.UnitClass) || Clazz.instanceOf (element, net.sf.j2s.ui.classpath.ContactedUnitClass)) {
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.class_obj.gif");
} else if (Clazz.instanceOf (element, net.sf.j2s.ui.classpath.CSSResource)) {
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.classf_obj.gif");
} else if (Clazz.instanceOf (element, net.sf.j2s.ui.classpath.ContactedClasses)) {
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.library_obj.gif");
} else if (Clazz.instanceOf (element, net.sf.j2s.ui.classpath.ProjectResources)) {
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.packagefolder_obj.gif");
} else if (Clazz.instanceOf (element, net.sf.j2s.ui.classpath.CompositeResources)) {
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.jar_l_obj.gif");
} else if (Clazz.instanceOf (element, net.sf.j2s.ui.property.J2SCategory)) {
var ctg = element;
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.empty_logical_package_obj.gif");
}return null;
}, "~O");
Clazz.overrideMethod (c$, "getText", 
function (element) {
if (Clazz.instanceOf (element, net.sf.j2s.ui.classpath.Resource)) {
var res = element;
var name = res.getName ();
if (name.endsWith (".j2x")) {
return name.substring (0, name.length - 4);
}return name;
} else if (Clazz.instanceOf (element, net.sf.j2s.ui.property.J2SCategory)) {
var ctg = element;
return ctg.getKey ();
}return null;
}, "~O");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
});
