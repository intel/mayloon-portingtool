Clazz.declarePackage ("net.sf.j2s.ui.generator");
Clazz.load (["org.eclipse.core.filebuffers.IFileBufferListener", "org.eclipse.jface.text.IDocumentListener", "org.eclipse.jface.viewers.IDoubleClickListener", "$.ISelectionChangedListener", "org.eclipse.ui.IPartListener2", "$.ISelectionListener", "org.eclipse.ui.part.ViewPart"], "net.sf.j2s.ui.generator.J2SView", ["net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor", "$.ASTVariableVisitor", "$.SWTDependencyASTVisitor", "$.SWTScriptVisitor", "net.sf.j2s.core.compiler.Java2ScriptCompiler", "net.sf.j2s.ui.Java2ScriptUIPlugin", "net.sf.j2s.ui.generator.EditorUtility", "$.J2SViewImages", "org.eclipse.core.filebuffers.FileBuffers", "org.eclipse.core.runtime.CoreException", "$.Status", "org.eclipse.jdt.core.dom.ASTParser", "org.eclipse.jface.action.Action", "$.IMenuListener", "$.MenuManager", "$.Separator", "org.eclipse.jface.dialogs.Dialog", "$wt.widgets.Text", "org.eclipse.ui.actions.ActionFactory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fFocusAction = null;
this.fClearAction = null;
this.fSelectAllAction = null;
this.fCopyAction = null;
this.fCompressVarNameAction = null;
this.scriptText = null;
this.fLinkWithEditor = null;
this.fCurrentASTLevel = 0;
this.fEditor = null;
this.fOpenable = null;
this.fRoot = null;
this.fDoLinkWithEditor = false;
this.fDialogSettings = null;
this.fScriptWritten = false;
this.fCompressVarName = false;
this.fSuperListener = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.generator, "J2SView", org.eclipse.ui.part.ViewPart);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.ui.generator.J2SView, []);
this.fDialogSettings = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getDialogSettings ();
this.fDoLinkWithEditor = this.fDialogSettings.getBoolean ("link_with_editor");
this.fScriptWritten = !this.fDialogSettings.getBoolean ("script_written");
this.fCompressVarName = this.fDialogSettings.getBoolean ("compress_name");
this.fCurrentASTLevel = 3;
});
Clazz.overrideMethod (c$, "createPartControl", 
function (parent) {
this.scriptText =  new $wt.widgets.Text (parent, 770);
org.eclipse.jface.dialogs.Dialog.applyDialogFont (this.scriptText);
this.makeActions ();
this.hookContextMenu ();
this.contributeToActionBars ();
this.hookGlobalActions ();
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "hookGlobalActions", 
($fz = function () {
var bars = this.getViewSite ().getActionBars ();
bars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.SELECT_ALL.getId (), this.fSelectAllAction);
bars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.COPY.getId (), this.fCopyAction);
bars.setGlobalActionHandler (org.eclipse.ui.actions.ActionFactory.DELETE.getId (), this.fClearAction);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hookContextMenu", 
($fz = function () {
var menuMgr =  new org.eclipse.jface.action.MenuManager ("#PopupMenu");
menuMgr.setRemoveAllWhenShown (true);
menuMgr.addMenuListener (((Clazz.isClassDefined ("net.sf.j2s.ui.generator.J2SView$1") ? 0 : net.sf.j2s.ui.generator.J2SView.$J2SView$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.generator.J2SView$1, this, null)));
var menu = menuMgr.createContextMenu (this.scriptText);
this.scriptText.setMenu (menu);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "contributeToActionBars", 
($fz = function () {
var bars = this.getViewSite ().getActionBars ();
this.fillLocalPullDown (bars.getMenuManager ());
this.fillLocalToolBar (bars.getToolBarManager ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "fillLocalPullDown", 
($fz = function (manager) {
manager.add (this.fCompressVarNameAction);
manager.add ( new org.eclipse.jface.action.Separator ());
manager.add (this.fSelectAllAction);
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IMenuManager");
Clazz.defineMethod (c$, "fillContextMenu", 
($fz = function (manager) {
manager.add (this.fFocusAction);
manager.add ( new org.eclipse.jface.action.Separator ());
manager.add (this.fCopyAction);
manager.add (this.fClearAction);
manager.add ( new org.eclipse.jface.action.Separator ());
manager.add (this.fSelectAllAction);
manager.add ( new org.eclipse.jface.action.Separator ("additions"));
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IMenuManager");
Clazz.defineMethod (c$, "fillLocalToolBar", 
($fz = function (manager) {
manager.add (this.fFocusAction);
manager.add (this.fClearAction);
manager.add (this.fLinkWithEditor);
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IToolBarManager");
Clazz.defineMethod (c$, "makeActions", 
($fz = function () {
this.fFocusAction = ((Clazz.isClassDefined ("net.sf.j2s.ui.generator.J2SView$2") ? 0 : net.sf.j2s.ui.generator.J2SView.$J2SView$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.generator.J2SView$2, this, null));
this.fFocusAction.setText ("Generate Script");
this.fFocusAction.setToolTipText ("Generate script from the selected Java element");
net.sf.j2s.ui.generator.J2SViewImages.setImageDescriptors (this.fFocusAction, "setfocus.gif");
this.fClearAction = ((Clazz.isClassDefined ("net.sf.j2s.ui.generator.J2SView$3") ? 0 : net.sf.j2s.ui.generator.J2SView.$J2SView$3$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.generator.J2SView$3, this, null));
this.fClearAction.setText ("Clear Script");
this.fClearAction.setToolTipText ("Clear the script output console");
net.sf.j2s.ui.generator.J2SViewImages.setImageDescriptors (this.fClearAction, "clear.gif");
this.fCompressVarNameAction = ((Clazz.isClassDefined ("net.sf.j2s.ui.generator.J2SView$4") ? 0 : net.sf.j2s.ui.generator.J2SView.$J2SView$4$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.generator.J2SView$4, this, null, "Enable Identifier Minimization", 2));
this.fCompressVarNameAction.setChecked (this.fCompressVarName);
this.fCompressVarNameAction.setToolTipText ("Minimization of identifiers for small script size");
this.fLinkWithEditor = ((Clazz.isClassDefined ("net.sf.j2s.ui.generator.J2SView$5") ? 0 : net.sf.j2s.ui.generator.J2SView.$J2SView$5$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.generator.J2SView$5, this, null));
this.fLinkWithEditor.setChecked (this.fDoLinkWithEditor);
this.fLinkWithEditor.setText ("&Link with Editor");
this.fLinkWithEditor.setToolTipText ("Link With Editor");
net.sf.j2s.ui.generator.J2SViewImages.setImageDescriptors (this.fLinkWithEditor, "synced.gif");
this.fCopyAction = ((Clazz.isClassDefined ("net.sf.j2s.ui.generator.J2SView$6") ? 0 : net.sf.j2s.ui.generator.J2SView.$J2SView$6$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.generator.J2SView$6, this, null));
this.fCopyAction.setText ("&Copy@Ctrl+C");
this.fCopyAction.setToolTipText ("Copy the selected script");
this.fSelectAllAction = ((Clazz.isClassDefined ("net.sf.j2s.ui.generator.J2SView$7") ? 0 : net.sf.j2s.ui.generator.J2SView.$J2SView$7$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.generator.J2SView$7, this, null));
this.fSelectAllAction.setText ("Select &All@Ctrl+A");
this.fSelectAllAction.setToolTipText ("Select all the script");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "performSetFocus", 
function () {
var part = net.sf.j2s.ui.generator.EditorUtility.getActiveEditor ();
if (Clazz.instanceOf (part, org.eclipse.ui.texteditor.ITextEditor)) {
try {
this.setInput (part);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
this.scriptText.setText ("Could not set AST view input ");
} else {
throw e;
}
}
}});
Clazz.defineMethod (c$, "performClear", 
function () {
this.fOpenable = null;
this.scriptText.setText ("");
});
Clazz.defineMethod (c$, "performScriptWritten", 
function () {
});
Clazz.defineMethod (c$, "performCompressName", 
function () {
this.fCompressVarName = this.fCompressVarNameAction.isChecked ();
this.fDialogSettings.put ("compress_name", !this.fScriptWritten);
});
Clazz.overrideMethod (c$, "setFocus", 
function () {
this.scriptText.setFocus ();
});
Clazz.defineMethod (c$, "setInput", 
function (editor) {
if (this.fEditor != null) {
}this.fEditor = null;
this.fRoot = null;
if (editor != null) {
var openable = net.sf.j2s.ui.generator.EditorUtility.getJavaInput (editor);
if (openable == null) {
throw  new org.eclipse.core.runtime.CoreException (this.getErrorStatus ("Editor not showing a CU or classfile", null));
}this.fOpenable = openable;
this.fRoot = this.createAST (this.fOpenable, this.fCurrentASTLevel);
var visitor =  new net.sf.j2s.core.astvisitors.SWTScriptVisitor ();
(visitor.getAdaptable (net.sf.j2s.core.astvisitors.ASTVariableVisitor)).setToCompileVariableName (this.fCompressVarName);
net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor.setJ2SMap (null);
if (this.fCompressVarName) {
var prjFolder = null;
if (Clazz.instanceOf (this.fOpenable, org.eclipse.jdt.core.IJavaElement)) {
var unit = this.fOpenable;
var javaProject = unit.getJavaProject ();
if (javaProject != null) {
prjFolder = javaProject.getProject ().getLocation ().toOSString ();
}}if (prjFolder != null) {
net.sf.j2s.core.compiler.Java2ScriptCompiler.updateJ2SMap (prjFolder);
}}this.fRoot.accept (visitor);
var dvisitor =  new net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor ();
dvisitor.setToCompileVariableName (this.fCompressVarName);
try {
this.fRoot.accept (dvisitor);
} catch (e) {
e.printStackTrace ();
}
this.outputJavaScript (visitor, dvisitor);
}}, "org.eclipse.ui.texteditor.ITextEditor");
Clazz.defineMethod (c$, "createAST", 
($fz = function (input, astLevel) {
var root;
var parser = org.eclipse.jdt.core.dom.ASTParser.newParser (astLevel);
parser.setResolveBindings (true);
if (Clazz.instanceOf (input, org.eclipse.jdt.core.ICompilationUnit)) {
parser.setSource (input);
} else {
parser.setSource (input);
}root = parser.createAST (null);
if (root == null) {
throw  new org.eclipse.core.runtime.CoreException (this.getErrorStatus ("Could not create AST", null));
}return root;
}, $fz.isPrivate = true, $fz), "org.eclipse.jdt.core.IOpenable,~N");
Clazz.defineMethod (c$, "getErrorStatus", 
($fz = function (message, th) {
return  new org.eclipse.core.runtime.Status (4, "net.sf.j2s.j2sview", 4, message, th);
}, $fz.isPrivate = true, $fz), "~S,Throwable");
Clazz.defineMethod (c$, "outputJavaScript", 
($fz = function (visitor, dvisitor) {
var js = dvisitor.getDependencyScript (visitor.getBuffer ());
js = js.replaceAll ("cla\\$\\$", "c\\$").replaceAll ("i$", "i\\$").replaceAll ("v$", "v\\$").replaceAll ("\\.b$", "\\.b\\$").replaceAll ("\\.\\$finals", "\\.f\\$");
this.scriptText.setText (js);
}, $fz.isPrivate = true, $fz), "net.sf.j2s.core.astvisitors.ASTScriptVisitor,net.sf.j2s.core.astvisitors.DependencyASTVisitor");
Clazz.defineMethod (c$, "performLinkWithEditor", 
function () {
this.fDoLinkWithEditor = this.fLinkWithEditor.isChecked ();
this.fDialogSettings.put ("link_with_editor", this.fDoLinkWithEditor);
if (this.fDoLinkWithEditor && this.fEditor != null) {
var selectionProvider = this.fEditor.getSelectionProvider ();
if (selectionProvider != null) {
this.doLinkWithEditor (selectionProvider.getSelection ());
}}});
Clazz.defineMethod (c$, "doLinkWithEditor", 
($fz = function (selection) {
var textSelection = selection;
var offset = textSelection.getOffset ();
var length = textSelection.getLength ();
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.ISelection");
Clazz.defineMethod (c$, "init", 
function (site) {
Clazz.superCall (this, net.sf.j2s.ui.generator.J2SView, "setSite", [site]);
if (this.fSuperListener == null) {
this.fSuperListener =  new net.sf.j2s.ui.generator.J2SView.ListenerMix (this);
var service = site.getWorkbenchWindow ().getSelectionService ();
service.addPostSelectionListener (this.fSuperListener);
site.getPage ().addPartListener (this.fSuperListener);
org.eclipse.core.filebuffers.FileBuffers.getTextFileBufferManager ().addFileBufferListener (this.fSuperListener);
}}, "org.eclipse.ui.IViewSite");
Clazz.defineMethod (c$, "handleEditorPostSelectionChanged", 
function (part, selection) {
if (!this.fDoLinkWithEditor || !(Clazz.instanceOf (selection, org.eclipse.jface.text.ITextSelection))) {
return ;
}if (this.fRoot == null || part !== this.fEditor) {
if (Clazz.instanceOf (part, org.eclipse.ui.texteditor.ITextEditor) && (net.sf.j2s.ui.generator.EditorUtility.getJavaInput (part) != null)) {
try {
this.setInput (part);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
this.setContentDescription (e.getStatus ().getMessage ());
} else {
throw e;
}
}
}} else {
this.doLinkWithEditor (selection);
}}, "org.eclipse.ui.IWorkbenchPart,org.eclipse.jface.viewers.ISelection");
Clazz.defineMethod (c$, "handleDocumentDisposed", 
function (document) {
}, "org.eclipse.jface.text.IDocument");
Clazz.defineMethod (c$, "handleDocumentChanged", 
function (document) {
}, "org.eclipse.jface.text.IDocument");
Clazz.defineMethod (c$, "handleSelectionChanged", 
function (selection) {
}, "org.eclipse.jface.viewers.ISelection");
Clazz.defineMethod (c$, "handleDoubleClick", 
function (event) {
}, "org.eclipse.jface.viewers.DoubleClickEvent");
Clazz.defineMethod (c$, "notifyWorkbenchPartClosed", 
function (partRef) {
if (this.fEditor != null && this.fEditor.equals (partRef.getPart (false))) {
try {
this.setInput (null);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
}}, "org.eclipse.ui.IWorkbenchPartReference");
c$.$J2SView$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.generator, "J2SView$1", null, org.eclipse.jface.action.IMenuListener);
Clazz.overrideMethod (c$, "menuAboutToShow", 
function (manager) {
this.b$["net.sf.j2s.ui.generator.J2SView"].fillContextMenu (manager);
}, "org.eclipse.jface.action.IMenuManager");
c$ = Clazz.p0p ();
};
c$.$J2SView$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.generator, "J2SView$2", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.generator.J2SView"].performSetFocus ();
});
c$ = Clazz.p0p ();
};
c$.$J2SView$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.generator, "J2SView$3", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.generator.J2SView"].performClear ();
});
c$ = Clazz.p0p ();
};
c$.$J2SView$4$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.generator, "J2SView$4", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.generator.J2SView"].performCompressName ();
});
c$ = Clazz.p0p ();
};
c$.$J2SView$5$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.generator, "J2SView$5", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.generator.J2SView"].performLinkWithEditor ();
});
c$ = Clazz.p0p ();
};
c$.$J2SView$6$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.generator, "J2SView$6", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.generator.J2SView"].scriptText.copy ();
});
c$ = Clazz.p0p ();
};
c$.$J2SView$7$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.generator, "J2SView$7", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.generator.J2SView"].scriptText.selectAll ();
});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.fASTViewVisible = true;
this.fView = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.generator.J2SView, "ListenerMix", null, [org.eclipse.ui.ISelectionListener, org.eclipse.core.filebuffers.IFileBufferListener, org.eclipse.jface.text.IDocumentListener, org.eclipse.jface.viewers.ISelectionChangedListener, org.eclipse.jface.viewers.IDoubleClickListener, org.eclipse.ui.IPartListener2]);
Clazz.makeConstructor (c$, 
function (a) {
this.fView = a;
}, "net.sf.j2s.ui.generator.J2SView");
Clazz.defineMethod (c$, "dispose", 
function () {
this.fView = null;
});
Clazz.defineMethod (c$, "selectionChanged", 
function (a, b) {
if (this.fASTViewVisible) {
this.fView.handleEditorPostSelectionChanged (a, b);
}}, "org.eclipse.ui.IWorkbenchPart,org.eclipse.jface.viewers.ISelection");
Clazz.overrideMethod (c$, "bufferCreated", 
function (a) {
}, "org.eclipse.core.filebuffers.IFileBuffer");
Clazz.overrideMethod (c$, "bufferDisposed", 
function (a) {
if (Clazz.instanceOf (a, org.eclipse.core.filebuffers.ITextFileBuffer)) {
this.fView.handleDocumentDisposed ((a).getDocument ());
}}, "org.eclipse.core.filebuffers.IFileBuffer");
Clazz.overrideMethod (c$, "bufferContentAboutToBeReplaced", 
function (a) {
}, "org.eclipse.core.filebuffers.IFileBuffer");
Clazz.overrideMethod (c$, "bufferContentReplaced", 
function (a) {
}, "org.eclipse.core.filebuffers.IFileBuffer");
Clazz.overrideMethod (c$, "stateChanging", 
function (a) {
}, "org.eclipse.core.filebuffers.IFileBuffer");
Clazz.overrideMethod (c$, "dirtyStateChanged", 
function (a, b) {
}, "org.eclipse.core.filebuffers.IFileBuffer,~B");
Clazz.overrideMethod (c$, "stateValidationChanged", 
function (a, b) {
}, "org.eclipse.core.filebuffers.IFileBuffer,~B");
Clazz.overrideMethod (c$, "underlyingFileMoved", 
function (a, b) {
}, "org.eclipse.core.filebuffers.IFileBuffer,org.eclipse.core.runtime.IPath");
Clazz.overrideMethod (c$, "underlyingFileDeleted", 
function (a) {
}, "org.eclipse.core.filebuffers.IFileBuffer");
Clazz.overrideMethod (c$, "stateChangeFailed", 
function (a) {
}, "org.eclipse.core.filebuffers.IFileBuffer");
Clazz.overrideMethod (c$, "documentAboutToBeChanged", 
function (a) {
}, "org.eclipse.jface.text.DocumentEvent");
Clazz.overrideMethod (c$, "documentChanged", 
function (a) {
this.fView.handleDocumentChanged (a.getDocument ());
}, "org.eclipse.jface.text.DocumentEvent");
Clazz.defineMethod (c$, "selectionChanged", 
function (a) {
this.fView.handleSelectionChanged (a.getSelection ());
}, "org.eclipse.jface.viewers.SelectionChangedEvent");
Clazz.overrideMethod (c$, "doubleClick", 
function (a) {
this.fView.handleDoubleClick (a);
}, "org.eclipse.jface.viewers.DoubleClickEvent");
Clazz.overrideMethod (c$, "partHidden", 
function (a) {
var b = a.getPart (false);
if (b === this.fView) {
this.fASTViewVisible = false;
}}, "org.eclipse.ui.IWorkbenchPartReference");
Clazz.overrideMethod (c$, "partVisible", 
function (a) {
var b = a.getPart (false);
if (b === this.fView) {
this.fASTViewVisible = true;
}}, "org.eclipse.ui.IWorkbenchPartReference");
Clazz.overrideMethod (c$, "partActivated", 
function (a) {
}, "org.eclipse.ui.IWorkbenchPartReference");
Clazz.overrideMethod (c$, "partBroughtToTop", 
function (a) {
}, "org.eclipse.ui.IWorkbenchPartReference");
Clazz.overrideMethod (c$, "partClosed", 
function (a) {
this.fView.notifyWorkbenchPartClosed (a);
}, "org.eclipse.ui.IWorkbenchPartReference");
Clazz.overrideMethod (c$, "partDeactivated", 
function (a) {
}, "org.eclipse.ui.IWorkbenchPartReference");
Clazz.overrideMethod (c$, "partOpened", 
function (a) {
}, "org.eclipse.ui.IWorkbenchPartReference");
Clazz.overrideMethod (c$, "partInputChanged", 
function (a) {
}, "org.eclipse.ui.IWorkbenchPartReference");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"SETTINGS_LINK_WITH_EDITOR", "link_with_editor",
"SETTINGS_NO_SCRIPT_WRITTEN", "script_written",
"SETTINGS_COMPRESS_VAR_NAME", "compress_name");
});
