package com.intel.eclipse.mayloon.internal;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.jdt.core.compiler.CategorizedProblem;
import org.eclipse.jdt.core.compiler.IProblem;

public class MptUnsupportedProblems extends CategorizedProblem {

    public static final String MARKER_ID = "com.intel.eclipse.mayloon.internal.java.marker";

    private int status;

    private String message;

    private String fileName;

    private int sourceStart;

    private int sourceEnd;

    private int lineNumber;

    public MptUnsupportedProblems(int status, String message, String fileName) {
        super();
        this.status = status;
        this.message = message;
        this.fileName = fileName;
    }

    @Override
    public int getCategoryID() {
        return CategorizedProblem.CAT_UNSPECIFIED;
    }

    @Override
    public String getMarkerType() {
        return MARKER_ID;
    }

    public String[] getArguments() {
        return new String[0];
    }

    public int getID() {
        return IProblem.ExternalProblemNotFixable;
    }

    public String getMessage() {
        return message;
    }

    public char[] getOriginatingFileName() {
        return fileName.toCharArray();
    }

    public boolean isError() {
        return status == IStatus.ERROR;
    }

    public boolean isWarning() {
        return status == IStatus.WARNING;
    }

    public int getSourceStart() {
        return sourceStart;
    }

    public int getSourceEnd() {
        return sourceEnd;
    }

    public int getSourceLineNumber() {
        return lineNumber;
    }

    public void setSourceStart(int sourceStart) {
        this.sourceStart = sourceStart;
    }

    public void setSourceEnd(int sourceEnd) {
        this.sourceEnd = sourceEnd;
    }

    public void setSourceLineNumber(int lineNumber) {
        this.lineNumber = lineNumber;
    }

}
