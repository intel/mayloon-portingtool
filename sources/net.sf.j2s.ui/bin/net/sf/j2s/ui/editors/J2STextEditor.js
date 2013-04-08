Clazz.declarePackage ("net.sf.j2s.ui.editors");
Clazz.load (["org.eclipse.ui.editors.text.TextEditor"], "net.sf.j2s.ui.editors.J2STextEditor", null, function () {
c$ = Clazz.declareType (net.sf.j2s.ui.editors, "J2STextEditor", org.eclipse.ui.editors.text.TextEditor);
Clazz.defineMethod (c$, "setReadOnly", 
function (readOnly) {
this.getSourceViewer ().getTextWidget ().setEditable (!readOnly);
}, "~B");
Clazz.defineMethod (c$, "getJ2SSourceViewer", 
function () {
return this.getSourceViewer ();
});
});
