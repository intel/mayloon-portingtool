/*******************************************************************************
 * Copyright (c) 2000, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core.builder;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.logging.Formatter;
import java.util.logging.Level;
import java.util.logging.LogRecord;

import org.eclipse.core.resources.*;
import org.eclipse.core.runtime.*;

import org.eclipse.jdt.core.compiler.CategorizedProblem;
import org.eclipse.jdt.core.compiler.IProblem;
import org.eclipse.jdt.internal.compiler.problem.AbortCompilation;
import org.eclipse.jdt.internal.core.util.Messages;
import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.MessageBox;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.console.ConsolePlugin;
import org.eclipse.ui.console.IConsole;
import org.eclipse.ui.console.MessageConsole;
import org.eclipse.ui.console.MessageConsoleStream;

public class BuildNotifier {

protected IProgressMonitor monitor;
protected boolean cancelling;
protected float percentComplete;
protected float progressPerCompilationUnit;
protected int newErrorCount;
protected int fixedErrorCount;
protected int newWarningCount;
protected int fixedWarningCount;
protected int workDone;
protected int totalWork;
protected String previousSubtask;
private static final String J2S_DEPLOY_MODE_BROWSER = "browser";
private static final String J2S_DEPLOY_MODE_TIZEN = "tizen";
private static final String EXPORT_TAG = "Export";
private String j2sDeployMode;
private IProject currentProject;

private static MessageConsole sConsole;
private static MessageConsoleStream sNormalStream;
private static MessageConsoleStream sErrorStream;
private static Color sColorRed;
private static Formatter sFormatter;

public static int NewErrorCount = 0;
public static int FixedErrorCount = 0;
public static int NewWarningCount = 0;
public static int FixedWarningCount = 0;

public static void resetProblemCounters() {
	NewErrorCount = 0;
	FixedErrorCount = 0;
	NewWarningCount = 0;
	FixedWarningCount = 0;
}

public BuildNotifier(IProgressMonitor monitor, IProject project, String deployMode) {
	this.j2sDeployMode = deployMode;
	this.currentProject = project;
	
	this.monitor = monitor;
	this.cancelling = false;
	this.newErrorCount = NewErrorCount;
	this.fixedErrorCount = FixedErrorCount;
	this.newWarningCount = NewWarningCount;
	this.fixedWarningCount = FixedWarningCount;
	this.workDone = 0;
	this.totalWork = 1000000;
	initConsoleView();
}

/**
 * init MPTConsole for J2S
 */

public void initConsoleView(){
	IConsole[] IConsole = ConsolePlugin.getDefault().getConsoleManager().getConsoles();
	this.sConsole = (MessageConsole) IConsole[1];
	this.sNormalStream = sConsole.newMessageStream();
	this.sErrorStream = sConsole.newMessageStream();
	Display display = ConsolePlugin.getDefault().getWorkbench().getDisplay();
	sColorRed = new Color(display, 0xFF, 0x00, 0x00);
    display.asyncExec(new Runnable() {
        public void run() {
        	sErrorStream.setColor(sColorRed);
        }
    });
	this.sFormatter = new Formatter(){
		public String format(LogRecord record) {
			StringBuffer buffer = new StringBuffer();
			buffer.append(String.format("[%1$tF_%1$tT:%1$tL] [%2$s] [%3$s] %4$s\n", 
                                        Calendar.getInstance(),
                                        record.getLevel(),
                                        record.getLoggerName(),
                                        record.getMessage()));
			if(record.getThrown() != null){
				StringWriter writer = new StringWriter();
				record.getThrown().printStackTrace(new PrintWriter(writer));
				buffer.append(writer.toString());
			}
			return buffer.toString();
		}
	};
}

/**
 * Notification before a compile that a unit is about to be compiled.
 */
public void aboutToCompile(SourceFile unit) {
	String message = Messages.bind(Messages.build_compiling, unit.resource.getFullPath().removeLastSegments(1).makeRelative().toString());
	subTask(message);
}

public void begin() {
	if (this.monitor != null)
		this.monitor.beginTask("", this.totalWork); //$NON-NLS-1$
	this.previousSubtask = null;
}

/**
 * Check whether the build has been canceled.
 */
public void checkCancel() {
	if (this.monitor != null && this.monitor.isCanceled())
		throw new OperationCanceledException();
}

/**
 * Check whether the build has been canceled.
 * Must use this call instead of checkCancel() when within the compiler.
 */
public void checkCancelWithinCompiler() {
	if (this.monitor != null && this.monitor.isCanceled() && !this.cancelling) {
		// Once the compiler has been canceled, don't check again.
		setCancelling(true);
		// Only AbortCompilation can stop the compiler cleanly.
		// We check cancelation again following the call to compile.
		throw new AbortCompilation(true, null);
	}
}

/**
 * Notification while within a compile that a unit has finished being compiled.
 */
public void compiled(SourceFile unit) {
	String message = Messages.bind(Messages.build_compiling, unit.resource.getFullPath().removeLastSegments(1).makeRelative().toString());
	subTask(message);
	updateProgressDelta(this.progressPerCompilationUnit);
	checkCancelWithinCompiler();
}

public void done() {
	NewErrorCount = this.newErrorCount;
	FixedErrorCount = this.fixedErrorCount;
	NewWarningCount = this.newWarningCount;
	FixedWarningCount = this.fixedWarningCount;

	updateProgress(1.0f);
	subTask(Messages.build_done);
	if (this.monitor != null)
		this.monitor.done();
	this.previousSubtask = null;
	
	if (J2S_DEPLOY_MODE_TIZEN.equals(j2sDeployMode)){
		// Message with ok and cancel button and info icon
		if (NewErrorCount != 0) {
			error(EXPORT_TAG, "Project '%1$s' could not be exported for '%2$s'", currentProject.getName(),j2sDeployMode);
			PlatformUI.getWorkbench().getDisplay().asyncExec(new Runnable() {
			    public void run() {
				    Shell activeShell = PlatformUI.getWorkbench().getActiveWorkbenchWindow().getShell();
				    MessageBox dialog = 
				    		  new MessageBox(activeShell, SWT.ICON_QUESTION | SWT.OK | SWT.CANCEL);
				    		dialog.setText("Detect some compilation errors");
				    		dialog.setMessage("Do you really want to ignore these compile errors?");
				    		int returnCode = dialog.open();
				    		if (SWT.OK == returnCode) {
				    			// TODO luqiang, Package for Tizen Project
//				    			performTizenPackage();
				    		}
				}
			});
		}else{
			general(EXPORT_TAG, "Project '%1$s' has been exported for '%2$s' successfully.", currentProject.getName(),j2sDeployMode);
		}
	}else if(J2S_DEPLOY_MODE_BROWSER.equals(j2sDeployMode)){
		if (NewErrorCount != 0) {
			error(EXPORT_TAG, "Project '%1$s' could not be exported for '%2$s'", currentProject.getName(),j2sDeployMode);
		}else{
			general(EXPORT_TAG, "Project '%1$s' has been exported for '%2$s' successfully.", currentProject.getName(),j2sDeployMode);
		}
	}
	
	try {
		currentProject.refreshLocal(IResource.DEPTH_INFINITE, null);
	} catch (CoreException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
}





/**
 * Returns a string describing the problems.
 */
protected String problemsMessage() {
	int numNew = this.newErrorCount + this.newWarningCount;
	int numFixed = this.fixedErrorCount + this.fixedWarningCount;
	if (numNew == 0 && numFixed == 0) return ""; //$NON-NLS-1$

	boolean displayBoth = numNew > 0 && numFixed > 0;
	StringBuffer buffer = new StringBuffer();
	buffer.append('(');
	if (numNew > 0) {
		// (Found x errors + y warnings)
		buffer.append(Messages.build_foundHeader);
		buffer.append(' ');
		if (displayBoth || this.newErrorCount > 0) {
			if (this.newErrorCount == 1)
				buffer.append(Messages.build_oneError);
			else
				buffer.append(Messages.bind(Messages.build_multipleErrors, String.valueOf(this.newErrorCount)));
			if (displayBoth || this.newWarningCount > 0)
				buffer.append(" + "); //$NON-NLS-1$
		}
		if (displayBoth || this.newWarningCount > 0) {
			if (this.newWarningCount == 1)
				buffer.append(Messages.build_oneWarning);
			else
				buffer.append(Messages.bind(Messages.build_multipleWarnings, String.valueOf(this.newWarningCount)));
		}
		if (numFixed > 0)
			buffer.append(", "); //$NON-NLS-1$
	}
	if (numFixed > 0) {
		// (Fixed x errors + y warnings) or (Found x errors + y warnings, Fixed x + y)
		buffer.append(Messages.build_fixedHeader);
		buffer.append(' ');
		if (displayBoth) {
			buffer.append(String.valueOf(this.fixedErrorCount));
			buffer.append(" + "); //$NON-NLS-1$
			buffer.append(String.valueOf(this.fixedWarningCount));
		} else {
			if (this.fixedErrorCount > 0) {
				if (this.fixedErrorCount == 1)
					buffer.append(Messages.build_oneError);
				else
					buffer.append(Messages.bind(Messages.build_multipleErrors, String.valueOf(this.fixedErrorCount)));
				if (this.fixedWarningCount > 0)
					buffer.append(" + "); //$NON-NLS-1$
			}
			if (this.fixedWarningCount > 0) {
				if (this.fixedWarningCount == 1)
					buffer.append(Messages.build_oneWarning);
				else
					buffer.append(Messages.bind(Messages.build_multipleWarnings, String.valueOf(this.fixedWarningCount)));
			}
		}
	}
	buffer.append(')');
	return buffer.toString();
}

/**
 * Sets the cancelling flag, which indicates we are in the middle
 * of being cancelled.  Certain places (those callable indirectly from the compiler)
 * should not check cancel again while this is true, to avoid OperationCanceledException
 * being thrown at an inopportune time.
 */
public void setCancelling(boolean cancelling) {
	this.cancelling = cancelling;
}

/**
 * Sets the amount of progress to report for compiling each compilation unit.
 */
public void setProgressPerCompilationUnit(float progress) {
	this.progressPerCompilationUnit = progress;
}

public void subTask(String message) {
	String pm = problemsMessage();
	String msg = pm.length() == 0 ? message : pm + " " + message; //$NON-NLS-1$

	if (msg.equals(this.previousSubtask)) return; // avoid refreshing with same one
	//if (JavaBuilder.DEBUG) System.out.println(msg);
	if (this.monitor != null)
		this.monitor.subTask(msg);

	this.previousSubtask = msg;
}

protected void updateProblemCounts(CategorizedProblem[] newProblems) {
	for (int i = 0, l = newProblems.length; i < l; i++)
		if (newProblems[i].isError()) this.newErrorCount++; else this.newWarningCount++;
}

/**
 * Update the problem counts from one compilation result given the old and new problems,
 * either of which may be null.
 */
protected void updateProblemCounts(IMarker[] oldProblems, CategorizedProblem[] newProblems) {
	if (newProblems != null) {
		next : for (int i = 0, l = newProblems.length; i < l; i++) {
			CategorizedProblem newProblem = newProblems[i];
			if (newProblem.getID() == IProblem.Task) continue; // skip task
			boolean isError = newProblem.isError();
			String message = newProblem.getMessage();

			if (oldProblems != null) {
				for (int j = 0, m = oldProblems.length; j < m; j++) {
					IMarker pb = oldProblems[j];
					if (pb == null) continue; // already matched up with a new problem
					boolean wasError = IMarker.SEVERITY_ERROR
						== pb.getAttribute(IMarker.SEVERITY, IMarker.SEVERITY_ERROR);
					if (isError == wasError && message.equals(pb.getAttribute(IMarker.MESSAGE, ""))) { //$NON-NLS-1$
						oldProblems[j] = null;
						continue next;
					}
				}
			}
			if (isError) this.newErrorCount++; else this.newWarningCount++;
		}
	}
	if (oldProblems != null) {
		next : for (int i = 0, l = oldProblems.length; i < l; i++) {
			IMarker oldProblem = oldProblems[i];
			if (oldProblem == null) continue next; // already matched up with a new problem
			boolean wasError = IMarker.SEVERITY_ERROR
				== oldProblem.getAttribute(IMarker.SEVERITY, IMarker.SEVERITY_ERROR);
			String message = oldProblem.getAttribute(IMarker.MESSAGE, ""); //$NON-NLS-1$

			if (newProblems != null) {
				for (int j = 0, m = newProblems.length; j < m; j++) {
					CategorizedProblem pb = newProblems[j];
					if (pb.getID() == IProblem.Task) continue; // skip task
					if (wasError == pb.isError() && message.equals(pb.getMessage()))
						continue next;
				}
			}
			if (wasError) this.fixedErrorCount++; else this.fixedWarningCount++;
		}
	}
}

public void updateProgress(float newPercentComplete) {
	if (newPercentComplete > this.percentComplete) {
		this.percentComplete = Math.min(newPercentComplete, 1.0f);
		int work = Math.round(this.percentComplete * this.totalWork);
		if (work > this.workDone) {
			if (this.monitor != null)
				this.monitor.worked(work - this.workDone);
			//if (JavaBuilder.DEBUG)
				//System.out.println(java.text.NumberFormat.getPercentInstance().format(this.percentComplete));
			this.workDone = work;
		}
	}
}

public void updateProgressDelta(float percentWorked) {
	updateProgress(this.percentComplete + percentWorked);
}

/**
 * Print general message to normal console stream
 * @param tag     Component tag
 * @param format  Format string
 * @param args    Format arguments
 */
public void general(String tag, String format, Object ...args){
	LogRecord record = new LogRecord(Level.INFO, String.format(format, args));
	record.setLoggerName(tag);
	sNormalStream.print(sFormatter.format(record));
	ConsolePlugin.getDefault().getConsoleManager().showConsoleView(sConsole);
}

/**
 * Print warning message to error console stream
 * @param tag     Component tag
 * @param format  Format string
 * @param args    Format arguments
 */
public void warning(String tag, String format, Object ...args){
	LogRecord record = new LogRecord(Level.WARNING, String.format(format, args));
	record.setLoggerName(tag);
	sErrorStream.print(sFormatter.format(record));
	ConsolePlugin.getDefault().getConsoleManager().showConsoleView(sConsole);
}

/**
 * Print error message to error console stream
 * @param tag     Component tag
 * @param format  Format string
 * @param args    Format arguments
 */
public void error(String tag, String format, Object ...args){
	LogRecord record = new LogRecord(Level.SEVERE, String.format(format, args));
	record.setLoggerName(tag);
	sErrorStream.print(sFormatter.format(record));
	ConsolePlugin.getDefault().getConsoleManager().showConsoleView(sConsole);
}
}
