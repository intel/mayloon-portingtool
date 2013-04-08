Clazz.declarePackage ("net.sf.j2s.ui.generator");
Clazz.load (null, "net.sf.j2s.ui.generator.EditorUtility", ["net.sf.j2s.ui.Java2ScriptUIPlugin", "org.eclipse.jdt.core.IJavaElement"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.generator, "EditorUtility");
c$.getActiveEditor = Clazz.defineMethod (c$, "getActiveEditor", 
function () {
var window = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getWorkbench ().getActiveWorkbenchWindow ();
if (window != null) {
var page = window.getActivePage ();
if (page != null) {
return page.getActiveEditor ();
}}return null;
});
c$.getJavaInput = Clazz.defineMethod (c$, "getJavaInput", 
function (part) {
var editorInput = part.getEditorInput ();
if (editorInput != null) {
var input = editorInput.getAdapter (org.eclipse.jdt.core.IJavaElement);
if (Clazz.instanceOf (input, org.eclipse.jdt.core.IOpenable)) {
return input;
}}return null;
}, "org.eclipse.ui.IEditorPart");
c$.selectInEditor = Clazz.defineMethod (c$, "selectInEditor", 
function (editor, offset, length) {
var active = net.sf.j2s.ui.generator.EditorUtility.getActiveEditor ();
if (active !== editor) {
editor.getSite ().getPage ().activate (editor);
}editor.selectAndReveal (offset, length);
}, "org.eclipse.ui.texteditor.ITextEditor,~N,~N");
});
