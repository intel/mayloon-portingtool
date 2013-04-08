Clazz.declarePackage ("net.sf.j2s.ui.editors");
Clazz.load (["org.eclipse.ui.part.MultiPageEditorActionBarContributor"], "net.sf.j2s.ui.editors.J2SConfigEditorContributor", ["org.eclipse.ui.actions.ActionFactory", "org.eclipse.ui.ide.IDEActionFactory", "org.eclipse.ui.texteditor.ITextEditorActionConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.activeEditorPart = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.editors, "J2SConfigEditorContributor", org.eclipse.ui.part.MultiPageEditorActionBarContributor);
Clazz.defineMethod (c$, "getAction", 
function (editor, actionID) {
return (editor == null ? null : editor.getAction (actionID));
}, "org.eclipse.ui.texteditor.ITextEditor,~S");
Clazz.overrideMethod (c$, "setActivePage", 
function (part) {
if (this.activeEditorPart === part) return ;
this.activeEditorPart = part;
var actionBars = this.getActionBars ();
if (actionBars != null) {
var editor = (Clazz.instanceOf (part, org.eclipse.ui.texteditor.ITextEditor)) ? part : null;
actionBars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.DELETE.getId (), this.getAction (editor, org.eclipse.ui.texteditor.ITextEditorActionConstants.DELETE));
actionBars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.UNDO.getId (), this.getAction (editor, org.eclipse.ui.texteditor.ITextEditorActionConstants.UNDO));
actionBars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.REDO.getId (), this.getAction (editor, org.eclipse.ui.texteditor.ITextEditorActionConstants.REDO));
actionBars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.CUT.getId (), this.getAction (editor, org.eclipse.ui.texteditor.ITextEditorActionConstants.CUT));
actionBars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.COPY.getId (), this.getAction (editor, org.eclipse.ui.texteditor.ITextEditorActionConstants.COPY));
actionBars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.PASTE.getId (), this.getAction (editor, org.eclipse.ui.texteditor.ITextEditorActionConstants.PASTE));
actionBars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.SELECT_ALL.getId (), this.getAction (editor, org.eclipse.ui.texteditor.ITextEditorActionConstants.SELECT_ALL));
actionBars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.FIND.getId (), this.getAction (editor, org.eclipse.ui.texteditor.ITextEditorActionConstants.FIND));
actionBars.setGlobalActionHandler (org.eclipse.ui.ide.IDEActionFactory.BOOKMARK.getId (), this.getAction (editor, org.eclipse.ui.ide.IDEActionFactory.BOOKMARK.getId ()));
actionBars.updateActionBars ();
}}, "org.eclipse.ui.IEditorPart");
Clazz.overrideMethod (c$, "contributeToMenu", 
function (manager) {
}, "org.eclipse.jface.action.IMenuManager");
Clazz.overrideMethod (c$, "contributeToToolBar", 
function (manager) {
}, "org.eclipse.jface.action.IToolBarManager");
});
