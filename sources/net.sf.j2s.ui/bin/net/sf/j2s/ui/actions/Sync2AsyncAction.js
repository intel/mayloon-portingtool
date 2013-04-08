Clazz.declarePackage ("net.sf.j2s.ui.actions");
Clazz.load (["org.eclipse.ui.IEditorActionDelegate"], "net.sf.j2s.ui.actions.Sync2AsyncAction", ["org.eclipse.jdt.internal.ui.actions.SelectionConverter", "org.eclipse.jdt.ui.actions.ExtractMethodAction"], function () {
c$ = Clazz.decorateAsClass (function () {
this.editor = null;
this.extractMethodAction = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.actions, "Sync2AsyncAction", null, org.eclipse.ui.IEditorActionDelegate);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "run", 
function (action) {
var unit = org.eclipse.jdt.internal.ui.actions.SelectionConverter.getInputAsCompilationUnit (this.editor);
System.out.println (unit.getClass ());
}, "org.eclipse.jface.action.IAction");
Clazz.overrideMethod (c$, "selectionChanged", 
function (action, selection) {
if (this.editor != null && this.extractMethodAction != null) {
this.extractMethodAction.update (selection);
System.out.println ("fdsafs");
System.out.println (org.eclipse.jdt.internal.ui.actions.SelectionConverter.getInputAsCompilationUnit (this.editor).getClass ());
}}, "org.eclipse.jface.action.IAction,org.eclipse.jface.viewers.ISelection");
Clazz.overrideMethod (c$, "setActiveEditor", 
function (action, targetEditor) {
if (Clazz.instanceOf (targetEditor, org.eclipse.jdt.internal.ui.javaeditor.CompilationUnitEditor)) {
this.editor = targetEditor;
this.extractMethodAction =  new org.eclipse.jdt.ui.actions.ExtractMethodAction (this.editor);
this.extractMethodAction.setActionDefinitionId ("org.eclipse.jdt.ui.edit.text.java.extract.method");
var provider = this.editor.getSelectionProvider ();
var selection = provider.getSelection ();
net.sf.j2s.ui.actions.Sync2AsyncAction.initAction (this.extractMethodAction, provider, selection);
} else {
this.extractMethodAction = null;
}}, "org.eclipse.jface.action.IAction,org.eclipse.ui.IEditorPart");
c$.initAction = Clazz.defineMethod (c$, "initAction", 
($fz = function (action, provider, selection) {
System.out.println (provider);
provider.addSelectionChangedListener (action);
action.update (selection);
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.ui.actions.SelectionDispatchAction,org.eclipse.jface.viewers.ISelectionProvider,org.eclipse.jface.viewers.ISelection");
});
