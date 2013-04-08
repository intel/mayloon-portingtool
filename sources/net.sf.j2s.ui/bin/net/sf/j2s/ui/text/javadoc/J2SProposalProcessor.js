Clazz.declarePackage ("net.sf.j2s.ui.text.javadoc");
Clazz.load (["org.eclipse.jface.text.contentassist.ICompletionProposal", "$.ICompletionProposalExtension", "$.ICompletionProposalExtension2", "$.ICompletionProposalExtension3", "$.ICompletionProposalExtension4", "$.IContentAssistProcessor", "org.eclipse.ui.internal.texteditor.HippieCompletionEngine"], "net.sf.j2s.ui.text.javadoc.J2SProposalProcessor", ["java.lang.Character", "java.util.ArrayList", "net.sf.j2s.ui.text.javadoc.IJavaDocTagConstants", "org.eclipse.jdt.ui.JavaUI", "$wt.graphics.Point"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fEngine = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.text.javadoc, "J2SProposalProcessor", null, org.eclipse.jface.text.contentassist.IContentAssistProcessor);
Clazz.prepareFields (c$, function () {
this.fEngine =  new org.eclipse.ui.internal.texteditor.HippieCompletionEngine ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "computeCompletionProposals", 
function (viewer, offset) {
try {
var prefix = this.getPrefix (viewer, offset);
var suggestions = this.getSuggestions (viewer, offset, prefix);
var result =  new java.util.ArrayList ();
for (var it = suggestions.iterator (); it.hasNext (); ) {
var string = it.next ();
if (string.length > 0) result.add (this.createProposal (string, prefix, offset));
}
return result.toArray ( new Array (result.size ()));
} catch (x) {
if (Clazz.instanceOf (x, org.eclipse.jface.text.BadLocationException)) {
return net.sf.j2s.ui.text.javadoc.J2SProposalProcessor.NO_PROPOSALS;
} else {
throw x;
}
}
}, "org.eclipse.jface.text.ITextViewer,~N");
Clazz.defineMethod (c$, "getPrefix", 
($fz = function (viewer, offset) {
var doc = viewer.getDocument ();
if (doc == null || offset > doc.getLength ()) return null;
var length = 0;
while (--offset >= 0 && Character.isJavaIdentifierPart (doc.getChar (offset))) length++;

return doc.get (offset + 1, length);
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.text.ITextViewer,~N");
Clazz.defineMethod (c$, "createProposal", 
($fz = function (string, prefix, offset) {
return  new net.sf.j2s.ui.text.javadoc.J2SProposalProcessor.Proposal (string, prefix, offset);
}, $fz.isPrivate = true, $fz), "~S,~S,~N");
Clazz.overrideMethod (c$, "computeContextInformation", 
function (viewer, offset) {
return net.sf.j2s.ui.text.javadoc.J2SProposalProcessor.NO_CONTEXTS;
}, "org.eclipse.jface.text.ITextViewer,~N");
Clazz.overrideMethod (c$, "getCompletionProposalAutoActivationCharacters", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getContextInformationAutoActivationCharacters", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getContextInformationValidator", 
function () {
return null;
});
Clazz.defineMethod (c$, "getSuggestions", 
($fz = function (viewer, offset, prefix) {
var list =  new java.util.ArrayList ();
var tags =  new Array (net.sf.j2s.ui.text.javadoc.IJavaDocTagConstants.JAVADOC_GENERAL_TAGS.length);
for (var i = 0; i < tags.length; i++) {
tags[i] = net.sf.j2s.ui.text.javadoc.IJavaDocTagConstants.JAVADOC_GENERAL_TAGS[i].substring (1);
}
if (prefix.length == 0) {
var doc = viewer.getDocument ();
var last = doc.get (offset - 1, 1);
if ((last.charAt (0)).charCodeAt (0) != ('@').charCodeAt (0)) {
return list;
}}for (var i = 0; i < tags.length; i++) {
if (tags[i].startsWith (prefix)) {
list.add (tags[i].substring (prefix.length));
}}
return list;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.text.ITextViewer,~N,~S");
Clazz.overrideMethod (c$, "getErrorMessage", 
function () {
return null;
});
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.fString = null;
this.fPrefix = null;
this.fOffset = 0;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.text.javadoc.J2SProposalProcessor, "Proposal", null, [org.eclipse.jface.text.contentassist.ICompletionProposal, org.eclipse.jface.text.contentassist.ICompletionProposalExtension, org.eclipse.jface.text.contentassist.ICompletionProposalExtension2, org.eclipse.jface.text.contentassist.ICompletionProposalExtension3, org.eclipse.jface.text.contentassist.ICompletionProposalExtension4]);
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.fString = a;
this.fPrefix = b;
this.fOffset = c;
}, "~S,~S,~N");
Clazz.defineMethod (c$, "apply", 
function (a) {
this.apply (null, '\0', 0, this.fOffset);
}, "org.eclipse.jface.text.IDocument");
Clazz.overrideMethod (c$, "getSelection", 
function (a) {
return  new $wt.graphics.Point (this.fOffset + this.fString.length, 0);
}, "org.eclipse.jface.text.IDocument");
Clazz.overrideMethod (c$, "getAdditionalProposalInfo", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getDisplayString", 
function () {
return this.fPrefix + this.fString;
});
Clazz.overrideMethod (c$, "getImage", 
function () {
return org.eclipse.jdt.ui.JavaUI.getSharedImages ().getImage ("org.eclipse.jdt.ui.jdoc_tag_obj.gif");
});
Clazz.overrideMethod (c$, "getContextInformation", 
function () {
return null;
});
Clazz.defineMethod (c$, "apply", 
function (a, b, c) {
try {
var d = this.fString.substring (c - this.fOffset);
a.replace (c, 0, d);
} catch (x) {
if (Clazz.instanceOf (x, org.eclipse.jface.text.BadLocationException)) {
x.printStackTrace ();
} else {
throw x;
}
}
}, "org.eclipse.jface.text.IDocument,~N,~N");
Clazz.overrideMethod (c$, "isValidFor", 
function (a, b) {
return this.validate (a, b, null);
}, "org.eclipse.jface.text.IDocument,~N");
Clazz.overrideMethod (c$, "getTriggerCharacters", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getContextInformationPosition", 
function () {
return 0;
});
Clazz.defineMethod (c$, "apply", 
function (a, b, c, d) {
this.apply (a.getDocument (), b, d);
}, "org.eclipse.jface.text.ITextViewer,~N,~N,~N");
Clazz.overrideMethod (c$, "selected", 
function (a, b) {
}, "org.eclipse.jface.text.ITextViewer,~B");
Clazz.overrideMethod (c$, "unselected", 
function (a) {
}, "org.eclipse.jface.text.ITextViewer");
Clazz.overrideMethod (c$, "validate", 
function (a, b, c) {
try {
var d = this.fOffset - this.fPrefix.length;
return b >= this.fOffset && b < this.fOffset + this.fString.length && a.get (d, b - (d)).equals ((this.fPrefix + this.fString).substring (0, b - d));
} catch (x) {
if (Clazz.instanceOf (x, org.eclipse.jface.text.BadLocationException)) {
return false;
} else {
throw x;
}
}
}, "org.eclipse.jface.text.IDocument,~N,org.eclipse.jface.text.DocumentEvent");
Clazz.overrideMethod (c$, "getInformationControlCreator", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getPrefixCompletionText", 
function (a, b) {
return this.fPrefix + this.fString;
}, "org.eclipse.jface.text.IDocument,~N");
Clazz.overrideMethod (c$, "getPrefixCompletionStart", 
function (a, b) {
return this.fOffset - this.fPrefix.length;
}, "org.eclipse.jface.text.IDocument,~N");
Clazz.overrideMethod (c$, "isAutoInsertable", 
function () {
return true;
});
c$ = Clazz.p0p ();
c$.NO_PROPOSALS = c$.prototype.NO_PROPOSALS =  new Array (0);
c$.NO_CONTEXTS = c$.prototype.NO_CONTEXTS =  new Array (0);
});
