Clazz.declarePackage ("net.sf.j2s.ui.text.javadoc");
Clazz.load (["org.eclipse.jdt.ui.text.java.IJavaCompletionProposalComputer", "net.sf.j2s.ui.text.javadoc.J2SProposalProcessor"], "net.sf.j2s.ui.text.javadoc.J2SProposalComputer", ["java.util.Arrays"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fProcessor = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.text.javadoc, "J2SProposalComputer", null, org.eclipse.jdt.ui.text.java.IJavaCompletionProposalComputer);
Clazz.prepareFields (c$, function () {
this.fProcessor =  new net.sf.j2s.ui.text.javadoc.J2SProposalProcessor ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "computeCompletionProposals", 
function (context, monitor) {
return java.util.Arrays.asList (this.fProcessor.computeCompletionProposals (context.getViewer (), context.getInvocationOffset ()));
}, "org.eclipse.jdt.ui.text.java.ContentAssistInvocationContext,org.eclipse.core.runtime.IProgressMonitor");
Clazz.overrideMethod (c$, "computeContextInformation", 
function (context, monitor) {
return java.util.Arrays.asList (this.fProcessor.computeContextInformation (context.getViewer (), context.getInvocationOffset ()));
}, "org.eclipse.jdt.ui.text.java.ContentAssistInvocationContext,org.eclipse.core.runtime.IProgressMonitor");
Clazz.overrideMethod (c$, "getErrorMessage", 
function () {
return this.fProcessor.getErrorMessage ();
});
Clazz.overrideMethod (c$, "sessionStarted", 
function () {
});
Clazz.overrideMethod (c$, "sessionEnded", 
function () {
});
});
