
package junit.textui;

import java.io.PrintStream;
import java.text.NumberFormat;
import java.util.Enumeration;

import junit.framework.AssertionFailedError;
import junit.framework.Test;
import junit.framework.TestFailure;
import junit.framework.TestListener;
import junit.framework.TestResult;
import junit.runner.BaseTestRunner;

public class ResultPrinter implements TestListener {
	PrintStream fWriter;
	int fColumn= 0;
	
	public ResultPrinter(PrintStream writer) {
		fWriter= writer;
	}
	
	/* API for use by textui.TestRunner
	 */

	synchronized void print(TestResult result, long runTime) {
		printHeader(runTime);
	    printErrors(result);
	    printFailures(result);
	    printFooter(result);
	}

    /**
     * @j2sNative
     * console.log("\n<RETURN> to continue");
     **/
	void printWaitPrompt() {
		getWriter().println();
		getWriter().println("<RETURN> to continue");
	}
	
	/* Internal methods 
	 */
    /**
     * @j2sNative
     * console.log("\nTime: " + this.elapsedTimeAsString(runTime));
     **/
	protected void printHeader(long runTime) {
		getWriter().println();
		getWriter().println("Time: "+elapsedTimeAsString(runTime));
	}
	
	protected void printErrors(TestResult result) {
		printDefects(result.errors(), result.errorCount(), "error");
	}
	
	protected void printFailures(TestResult result) {
		printDefects(result.failures(), result.failureCount(), "failure");
	}
	
	protected void printDefects(Enumeration booBoos, int count, String type) {
		if (count == 0) return;
		if (count == 1) {
            /**
             * @j2sNative
             * console.log("There was " + count + " " + type + ":");
             **/
            {
                getWriter().println("There was " + count + " " + type + ":");
            }
        } else {
            /**
             * @j2sNative
             * console.log("There were " + count + " " + type + "s:");
             **/
            {
                getWriter().println("There were " + count + " " + type + "s:");
            }
        }
		for (int i= 1; booBoos.hasMoreElements(); i++) {
			printDefect((TestFailure) booBoos.nextElement(), i);
		}
	}
	
	public void printDefect(TestFailure booBoo, int count) { // only public for testing purposes
		printDefectHeader(booBoo, count);
		printDefectTrace(booBoo);
	}

    /**
     * @j2sNative
     * console.log(count + ") " + booBoo.failedTest());
     **/
	protected void printDefectHeader(TestFailure booBoo, int count) {
		// I feel like making this a println, then adding a line giving the throwable a chance to print something
		// before we get to the stack trace.
		getWriter().print(count + ") " + booBoo.failedTest());
	}

    /**
     * @j2sNative
     * console.log(booBoo.trace());
     **/
	protected void printDefectTrace(TestFailure booBoo) {
		//getWriter().print(BaseTestRunner.getFilteredTrace(booBoo.trace()));
		getWriter().println(booBoo.trace());
	}

	protected void printFooter(TestResult result) {
        if (result.wasSuccessful()) {
             /**
             * @j2sNative
             * console.log("\nOK" + " (" +
             *                          result.runCount() + " test" + (result.runCount() == 1 ? "": "s") +
             *                          (result.knownFailureCount() == 0 ? "" : ", but "+ result.knownFailureCount() + " known failure") +
             *                          (result.knownFailureCount() == 1 ? "": "s") +
             *                      ")");
             **/
            {
                getWriter().println();
                getWriter().print("OK");
                getWriter().println (" (" + result.runCount() + " test" + (result.runCount() == 1 ? "": "s") + ")");
            }
        } else {
            /**
             * @j2sNative
             * console.log("\nFAILURES!!!");
             * console.log("Tests run: " + result.runCount() +
             *              ",  Failures: "+result.failureCount() +
             *              ",  Errors: "+result.errorCount() +
             *              ",  KnownFailures: "+result.knownFailureCount());
             * 
             * console.log("Failures:\n");
             * var failures = result.failures();
             * while(failures.hasMoreElements()){
             *     console.log(failures.nextElement().fFailedTest.toString());
             * }
             * console.log("Errors:\n");
             * var errors = result.errors();
             * while(errors.hasMoreElements()){
             *     console.log(errors.nextElement().fFailedTest.toString());
             * }
             **/
            {
                getWriter().println();
                getWriter().println("FAILURES!!!");
                getWriter().println("Tests run: "+result.runCount()+
                         ",  Failures: "+result.failureCount()+
                         ",  Errors: "+result.errorCount());
            }
        }
        getWriter().println();
	}


	/**
	 * Returns the formatted string of the elapsed time.
	 * Duplicated from BaseTestRunner. Fix it.
	 */
	protected String elapsedTimeAsString(long runTime) {
		return "" + ((double)runTime/1000);
		//return NumberFormat.getInstance().format((double)runTime/1000);
	}

	public PrintStream getWriter() {
		return fWriter;
	}
	/**
	 * @see junit.framework.TestListener#addError(Test, Throwable)
     * @j2sNative
     * console.log("E");
	 */
	public void addError(Test test, Throwable t) {
		getWriter().print("E");
	}

	/**
	 * @see junit.framework.TestListener#addFailure(Test, AssertionFailedError)
	 * @j2sNative
	 * console.log("F");
	 */
	public void addFailure(Test test, AssertionFailedError t) {
	    getWriter().print("F");
	}

	/**
	 * @see junit.framework.TestListener#addKnownFailure(Test, AssertionFailedError)
	 * @j2sNative
	 * console.log("Known F");
	 */
	public void addKnownFailure(Test test, AssertionFailedError t) {
	    getWriter().print("Known F");
	}

	/**
	 * @see junit.framework.TestListener#endTest(Test)
	 */
	public void endTest(Test test) {
	}

	/**
	 * @see junit.framework.TestListener#startTest(Test)
	 */
	public void startTest(Test test) {
        /**
         * @j2sNative
         * console.log(".");
         **/
        {
            getWriter().print(".");
        }
		if (fColumn++ >= 40) {
			getWriter().println();
			fColumn= 0;
		}
	}

}
