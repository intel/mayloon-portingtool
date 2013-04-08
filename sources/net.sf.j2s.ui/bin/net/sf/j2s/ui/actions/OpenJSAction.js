Clazz.declarePackage ("net.sf.j2s.ui.actions");
Clazz.load (["org.eclipse.ui.IObjectActionDelegate"], "net.sf.j2s.ui.actions.OpenJSAction", ["net.sf.j2s.ui.actions.UnitJavaScriptUtil"], function () {
c$ = Clazz.decorateAsClass (function () {
this.unit = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.actions, "OpenJSAction", null, org.eclipse.ui.IObjectActionDelegate);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "setActivePart", 
function (action, targetPart) {
}, "org.eclipse.jface.action.IAction,org.eclipse.ui.IWorkbenchPart");
Clazz.overrideMethod (c$, "run", 
function (action) {
if (net.sf.j2s.ui.actions.OpenJSAction.isFirstTime) {
($t$ = net.sf.j2s.ui.actions.OpenJSAction.isFirstTime = false, net.sf.j2s.ui.actions.OpenJSAction.prototype.isFirstTime = net.sf.j2s.ui.actions.OpenJSAction.isFirstTime, $t$);
if (!net.sf.j2s.ui.actions.UnitJavaScriptUtil.isUnitJSExisted (this.unit)) {
net.sf.j2s.ui.actions.UnitJavaScriptUtil.popupError ();
action.setEnabled (false);
return ;
}}if (this.unit != null) {
if (net.sf.j2s.ui.actions.UnitJavaScriptUtil.openEditor (this.unit)) {
return ;
}}net.sf.j2s.ui.actions.UnitJavaScriptUtil.popupError ();
action.setEnabled (false);
}, "org.eclipse.jface.action.IAction");
Clazz.overrideMethod (c$, "selectionChanged", 
function (action, selection) {
this.unit = null;
if (Clazz.instanceOf (selection, org.eclipse.jface.viewers.IStructuredSelection)) {
var structSelection = selection;
var firstElement = structSelection.getFirstElement ();
if (Clazz.instanceOf (firstElement, org.eclipse.jdt.core.ICompilationUnit)) {
this.unit = firstElement;
}} else if (Clazz.instanceOf (selection, org.eclipse.jdt.core.ICompilationUnit)) {
this.unit = selection;
}var enabled = false;
if (this.unit != null) {
enabled = net.sf.j2s.ui.actions.UnitJavaScriptUtil.isUnitJSExisted (this.unit);
}if (!enabled) {
if (net.sf.j2s.ui.actions.OpenJSAction.isFirstTime) {
enabled = true;
}}action.setEnabled (enabled);
}, "org.eclipse.jface.action.IAction,org.eclipse.jface.viewers.ISelection");
Clazz.defineStatics (c$,
"isFirstTime", true);
});
