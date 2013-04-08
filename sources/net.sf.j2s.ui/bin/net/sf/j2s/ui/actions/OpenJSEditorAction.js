Clazz.declarePackage ("net.sf.j2s.ui.actions");
Clazz.load (["org.eclipse.ui.IEditorActionDelegate"], "net.sf.j2s.ui.actions.OpenJSEditorAction", ["net.sf.j2s.ui.actions.UnitJavaScriptUtil", "org.eclipse.jdt.internal.ui.actions.SelectionConverter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.editor = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.actions, "OpenJSEditorAction", null, org.eclipse.ui.IEditorActionDelegate);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "run", 
function (action) {
var unit = org.eclipse.jdt.internal.ui.actions.SelectionConverter.getInputAsCompilationUnit (this.editor);
if (net.sf.j2s.ui.actions.OpenJSEditorAction.isFirstTime) {
($t$ = net.sf.j2s.ui.actions.OpenJSEditorAction.isFirstTime = false, net.sf.j2s.ui.actions.OpenJSEditorAction.prototype.isFirstTime = net.sf.j2s.ui.actions.OpenJSEditorAction.isFirstTime, $t$);
if (!net.sf.j2s.ui.actions.UnitJavaScriptUtil.isUnitJSExisted (unit)) {
net.sf.j2s.ui.actions.UnitJavaScriptUtil.popupError ();
action.setEnabled (false);
return ;
}}if (unit != null) {
if (net.sf.j2s.ui.actions.UnitJavaScriptUtil.openEditor (unit)) {
return ;
}}net.sf.j2s.ui.actions.UnitJavaScriptUtil.popupError ();
action.setEnabled (false);
}, "org.eclipse.jface.action.IAction");
Clazz.overrideMethod (c$, "selectionChanged", 
function (action, selection) {
}, "org.eclipse.jface.action.IAction,org.eclipse.jface.viewers.ISelection");
Clazz.overrideMethod (c$, "setActiveEditor", 
function (action, targetEditor) {
if (Clazz.instanceOf (targetEditor, org.eclipse.jdt.internal.ui.javaeditor.CompilationUnitEditor)) {
this.editor = targetEditor;
var unit = org.eclipse.jdt.internal.ui.actions.SelectionConverter.getInputAsCompilationUnit (this.editor);
var enabled = false;
if (unit != null) {
var javaModel = unit.getJavaModel ();
if (javaModel == null) {
return ;
}var resource = javaModel.getResource ();
if (resource == null) {
return ;
}enabled = net.sf.j2s.ui.actions.UnitJavaScriptUtil.isUnitJSExisted (unit);
}if (!enabled) {
if (net.sf.j2s.ui.actions.OpenJSEditorAction.isFirstTime) {
enabled = true;
}}action.setEnabled (enabled);
}}, "org.eclipse.jface.action.IAction,org.eclipse.ui.IEditorPart");
Clazz.defineStatics (c$,
"isFirstTime", true);
});
