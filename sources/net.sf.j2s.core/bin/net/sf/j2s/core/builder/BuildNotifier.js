Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (null, "net.sf.j2s.core.builder.BuildNotifier", ["java.lang.StringBuffer", "net.sf.j2s.core.utils.CorePluginConsole", "org.eclipse.core.runtime.OperationCanceledException", "org.eclipse.jdt.internal.compiler.problem.AbortCompilation", "org.eclipse.jdt.internal.core.util.Messages", "$wt.widgets.MessageBox", "org.eclipse.ui.PlatformUI"], function () {
c$ = Clazz.decorateAsClass (function () {
this.monitor = null;
this.cancelling = false;
this.percentComplete = 0;
this.progressPerCompilationUnit = 0;
this.newErrorCount = 0;
this.fixedErrorCount = 0;
this.newWarningCount = 0;
this.fixedWarningCount = 0;
this.workDone = 0;
this.totalWork = 0;
this.previousSubtask = null;
this.j2sDeployMode = null;
this.builderMode = null;
this.currentProject = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "BuildNotifier");
c$.resetProblemCounters = Clazz.defineMethod (c$, "resetProblemCounters", 
function () {
($t$ = net.sf.j2s.core.builder.BuildNotifier.NewErrorCount = 0, net.sf.j2s.core.builder.BuildNotifier.prototype.NewErrorCount = net.sf.j2s.core.builder.BuildNotifier.NewErrorCount, $t$);
($t$ = net.sf.j2s.core.builder.BuildNotifier.FixedErrorCount = 0, net.sf.j2s.core.builder.BuildNotifier.prototype.FixedErrorCount = net.sf.j2s.core.builder.BuildNotifier.FixedErrorCount, $t$);
($t$ = net.sf.j2s.core.builder.BuildNotifier.NewWarningCount = 0, net.sf.j2s.core.builder.BuildNotifier.prototype.NewWarningCount = net.sf.j2s.core.builder.BuildNotifier.NewWarningCount, $t$);
($t$ = net.sf.j2s.core.builder.BuildNotifier.FixedWarningCount = 0, net.sf.j2s.core.builder.BuildNotifier.prototype.FixedWarningCount = net.sf.j2s.core.builder.BuildNotifier.FixedWarningCount, $t$);
});
Clazz.makeConstructor (c$, 
function (monitor, project, deployMode, builderMode) {
this.j2sDeployMode = deployMode;
this.currentProject = project;
this.builderMode = builderMode;
this.monitor = monitor;
this.cancelling = false;
this.newErrorCount = net.sf.j2s.core.builder.BuildNotifier.NewErrorCount;
this.fixedErrorCount = net.sf.j2s.core.builder.BuildNotifier.FixedErrorCount;
this.newWarningCount = net.sf.j2s.core.builder.BuildNotifier.NewWarningCount;
this.fixedWarningCount = net.sf.j2s.core.builder.BuildNotifier.FixedWarningCount;
this.workDone = 0;
this.totalWork = 1000000;
}, "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.resources.IProject,~S,~S");
Clazz.defineMethod (c$, "aboutToCompile", 
function (unit) {
var message = org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_compiling, unit.resource.getFullPath ().removeLastSegments (1).makeRelative ().toString ());
this.subTask (message);
}, "net.sf.j2s.core.builder.SourceFile");
Clazz.defineMethod (c$, "begin", 
function () {
if (this.monitor != null) this.monitor.beginTask ("", this.totalWork);
this.previousSubtask = null;
});
Clazz.defineMethod (c$, "checkCancel", 
function () {
if (this.monitor != null && this.monitor.isCanceled ()) throw  new org.eclipse.core.runtime.OperationCanceledException ();
});
Clazz.defineMethod (c$, "checkCancelWithinCompiler", 
function () {
if (this.monitor != null && this.monitor.isCanceled () && !this.cancelling) {
this.setCancelling (true);
throw  new org.eclipse.jdt.internal.compiler.problem.AbortCompilation (true, null);
}});
Clazz.defineMethod (c$, "compiled", 
function (unit) {
var message = org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_compiling, unit.resource.getFullPath ().removeLastSegments (1).makeRelative ().toString ());
this.subTask (message);
this.updateProgressDelta (this.progressPerCompilationUnit);
this.checkCancelWithinCompiler ();
}, "net.sf.j2s.core.builder.SourceFile");
Clazz.defineMethod (c$, "done", 
function () {
($t$ = net.sf.j2s.core.builder.BuildNotifier.NewErrorCount = this.newErrorCount, net.sf.j2s.core.builder.BuildNotifier.prototype.NewErrorCount = net.sf.j2s.core.builder.BuildNotifier.NewErrorCount, $t$);
($t$ = net.sf.j2s.core.builder.BuildNotifier.FixedErrorCount = this.fixedErrorCount, net.sf.j2s.core.builder.BuildNotifier.prototype.FixedErrorCount = net.sf.j2s.core.builder.BuildNotifier.FixedErrorCount, $t$);
($t$ = net.sf.j2s.core.builder.BuildNotifier.NewWarningCount = this.newWarningCount, net.sf.j2s.core.builder.BuildNotifier.prototype.NewWarningCount = net.sf.j2s.core.builder.BuildNotifier.NewWarningCount, $t$);
($t$ = net.sf.j2s.core.builder.BuildNotifier.FixedWarningCount = this.fixedWarningCount, net.sf.j2s.core.builder.BuildNotifier.prototype.FixedWarningCount = net.sf.j2s.core.builder.BuildNotifier.FixedWarningCount, $t$);
this.updateProgress (1.0);
this.subTask (org.eclipse.jdt.internal.core.util.Messages.build_done);
if (this.monitor != null) this.monitor.done ();
this.previousSubtask = null;
if ("tizen".equals (this.j2sDeployMode)) {
if (net.sf.j2s.core.builder.BuildNotifier.NewErrorCount != 0) {
net.sf.j2s.core.utils.CorePluginConsole.error ("Build", "Project '%1$s' could not be built for '%2$s'", [this.currentProject.getName (), this.j2sDeployMode]);
org.eclipse.ui.PlatformUI.getWorkbench ().getDisplay ().asyncExec (((Clazz.isClassDefined ("net.sf.j2s.core.builder.BuildNotifier$1") ? 0 : net.sf.j2s.core.builder.BuildNotifier.$BuildNotifier$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.core.builder.BuildNotifier$1, this, null)));
} else {
if ("Build".equals (this.builderMode)) {
net.sf.j2s.core.utils.CorePluginConsole.success ("Build", "Project '%1$s' has been built for '%2$s' successfully.", [this.currentProject.getName (), this.j2sDeployMode]);
}}} else if ("browser".equals (this.j2sDeployMode) && "Build".equals (this.builderMode)) {
if (net.sf.j2s.core.builder.BuildNotifier.NewErrorCount != 0) {
net.sf.j2s.core.utils.CorePluginConsole.error ("Build", "Project '%1$s' could not be built for '%2$s'", [this.currentProject.getName (), this.j2sDeployMode]);
} else {
net.sf.j2s.core.utils.CorePluginConsole.success ("Build", "Project '%1$s' has been built for '%2$s' successfully.", [this.currentProject.getName (), this.j2sDeployMode]);
}}try {
this.currentProject.refreshLocal (2, null);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "problemsMessage", 
function () {
var numNew = this.newErrorCount + this.newWarningCount;
var numFixed = this.fixedErrorCount + this.fixedWarningCount;
if (numNew == 0 && numFixed == 0) return "";
var displayBoth = numNew > 0 && numFixed > 0;
var buffer =  new StringBuffer ();
buffer.append ('(');
if (numNew > 0) {
buffer.append (org.eclipse.jdt.internal.core.util.Messages.build_foundHeader);
buffer.append (' ');
if (displayBoth || this.newErrorCount > 0) {
if (this.newErrorCount == 1) buffer.append (org.eclipse.jdt.internal.core.util.Messages.build_oneError);
 else buffer.append (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_multipleErrors, String.valueOf (this.newErrorCount)));
if (displayBoth || this.newWarningCount > 0) buffer.append (" + ");
}if (displayBoth || this.newWarningCount > 0) {
if (this.newWarningCount == 1) buffer.append (org.eclipse.jdt.internal.core.util.Messages.build_oneWarning);
 else buffer.append (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_multipleWarnings, String.valueOf (this.newWarningCount)));
}if (numFixed > 0) buffer.append (", ");
}if (numFixed > 0) {
buffer.append (org.eclipse.jdt.internal.core.util.Messages.build_fixedHeader);
buffer.append (' ');
if (displayBoth) {
buffer.append (String.valueOf (this.fixedErrorCount));
buffer.append (" + ");
buffer.append (String.valueOf (this.fixedWarningCount));
} else {
if (this.fixedErrorCount > 0) {
if (this.fixedErrorCount == 1) buffer.append (org.eclipse.jdt.internal.core.util.Messages.build_oneError);
 else buffer.append (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_multipleErrors, String.valueOf (this.fixedErrorCount)));
if (this.fixedWarningCount > 0) buffer.append (" + ");
}if (this.fixedWarningCount > 0) {
if (this.fixedWarningCount == 1) buffer.append (org.eclipse.jdt.internal.core.util.Messages.build_oneWarning);
 else buffer.append (org.eclipse.jdt.internal.core.util.Messages.bind (org.eclipse.jdt.internal.core.util.Messages.build_multipleWarnings, String.valueOf (this.fixedWarningCount)));
}}}buffer.append (')');
return buffer.toString ();
});
Clazz.defineMethod (c$, "setCancelling", 
function (cancelling) {
this.cancelling = cancelling;
}, "~B");
Clazz.defineMethod (c$, "setProgressPerCompilationUnit", 
function (progress) {
this.progressPerCompilationUnit = progress;
}, "~N");
Clazz.defineMethod (c$, "subTask", 
function (message) {
var pm = this.problemsMessage ();
var msg = pm.length == 0 ? message : pm + " " + message;
if (msg.equals (this.previousSubtask)) return ;
if (this.monitor != null) this.monitor.subTask (msg);
this.previousSubtask = msg;
}, "~S");
Clazz.defineMethod (c$, "updateProblemCounts", 
function (newProblems) {
for (var i = 0, l = newProblems.length; i < l; i++) if (newProblems[i].isError ()) this.newErrorCount++;
 else this.newWarningCount++;

}, "~A");
Clazz.defineMethod (c$, "updateProblemCounts", 
function (oldProblems, newProblems) {
if (newProblems != null) {
next : for (var i = 0, l = newProblems.length; i < l; i++) {
var newProblem = newProblems[i];
if (newProblem.getID () == 536871362) continue ;var isError = newProblem.isError ();
var message = newProblem.getMessage ();
if (oldProblems != null) {
for (var j = 0, m = oldProblems.length; j < m; j++) {
var pb = oldProblems[j];
if (pb == null) continue ;var wasError = 2 == pb.getAttribute ("severity", 2);
if (isError == wasError && message.equals (pb.getAttribute ("message", ""))) {
oldProblems[j] = null;
continue next;}}
}if (isError) this.newErrorCount++;
 else this.newWarningCount++;
}
}if (oldProblems != null) {
next : for (var i = 0, l = oldProblems.length; i < l; i++) {
var oldProblem = oldProblems[i];
if (oldProblem == null) continue next;var wasError = 2 == oldProblem.getAttribute ("severity", 2);
var message = oldProblem.getAttribute ("message", "");
if (newProblems != null) {
for (var j = 0, m = newProblems.length; j < m; j++) {
var pb = newProblems[j];
if (pb.getID () == 536871362) continue ;if (wasError == pb.isError () && message.equals (pb.getMessage ())) continue next;}
}if (wasError) this.fixedErrorCount++;
 else this.fixedWarningCount++;
}
}}, "~A,~A");
Clazz.defineMethod (c$, "updateProgress", 
function (newPercentComplete) {
if (newPercentComplete > this.percentComplete) {
this.percentComplete = Math.min (newPercentComplete, 1.0);
var work = Math.round (this.percentComplete * this.totalWork);
if (work > this.workDone) {
if (this.monitor != null) this.monitor.worked (work - this.workDone);
this.workDone = work;
}}}, "~N");
Clazz.defineMethod (c$, "updateProgressDelta", 
function (percentWorked) {
this.updateProgress (this.percentComplete + percentWorked);
}, "~N");
Clazz.defineMethod (c$, "getBuilderMode", 
function () {
return this.builderMode;
});
Clazz.defineMethod (c$, "setBuilderMode", 
function (builderMode) {
this.builderMode = builderMode;
}, "~S");
c$.$BuildNotifier$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.core.builder, "BuildNotifier$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var activeShell = org.eclipse.ui.PlatformUI.getWorkbench ().getActiveWorkbenchWindow ().getShell ();
var dialog =  new $wt.widgets.MessageBox (activeShell, 292);
dialog.setText ("Detect some compilation errors");
dialog.setMessage ("Do you really want to ignore these compile errors?");
DialogSync2Async.block (dialog, this, function () {
var returnCode = dialog.dialogReturn;
if (32 == returnCode) {
}});
return;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"J2S_DEPLOY_MODE_BROWSER", "browser",
"J2S_DEPLOY_MODE_TIZEN", "tizen",
"BUILD_TAG", "Build",
"CLEAN_TAG", "Clean",
"NewErrorCount", 0,
"FixedErrorCount", 0,
"NewWarningCount", 0,
"FixedWarningCount", 0);
});
