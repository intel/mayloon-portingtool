package com.intel.ide.eclipse.mpt;

import java.io.PrintStream;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;

public class MptPluginLogger {
	
	/**
	 * Log general message
	 * @param format  Format string
	 * @param args    Format arguments
	 */
    public static void general(String format, Object ...args) {
    	log(IStatus.INFO, format, args);
    }
    
	/**
	 * Log warning message
	 * @param format  Format string
	 * @param args    Format arguments
	 */
    public static void warning(String format, Object ...args) {
    	log(IStatus.WARNING, format, args);
    }

	/**
	 * Log error message
	 * @param format  Format string
	 * @param args    Format arguments
	 */
    public static void error(String format, Object ...args) {
    	log(IStatus.ERROR, format, args);
    }
    
	/**
	 * Log throwable message
	 * @param e       Exception
	 */
    public static void throwable(Throwable e) {
    	log(e, "");
    }

	/**
	 * Log throwable message
	 * @param e       Exception
	 * @param format  Format string
	 * @param args    Format arguments
	 */
    public static void throwable(Throwable e, String format, Object ...args) {
    	log(e, format, args);
    }

    /**
     * Log message with severity, format and arguments to Plugin logger. If
     * Plugin logger is not available, then print to system standard output 
     * streams.
     * @param severity  Severity number
     * @param format    Format string
     * @param args      Format arguments
     */
    public static void log(int severity, String format, Object ...args) {
    	assert format!=null;
    	Status status = new Status(severity, MptPlugin.PLUGIN_ID, String.format(format, args));
    	if(MptPlugin.getDefault() != null){
    		MptPlugin.getDefault().getLog().log(status);
    	}else{
    		PrintStream printer = (severity>IStatus.INFO?System.err:System.out);
    		printer.println(status);
    	}
	}
    
    /**
     * Log message with throwable, format and arguments to Plugin logger. If
     * Plugin logger is not available, then print to system standard output 
     * streams.
     * @param e         Exception
     * @param format    Format string
     * @param args      Format arguments
     */
    public static void log(Throwable e, String format, Object ...args) {
    	assert format!=null;
    	Status status = new Status(IStatus.ERROR, MptPlugin.PLUGIN_ID, String.format(format, args), e);
    	if(MptPlugin.getDefault() != null){
    		MptPlugin.getDefault().getLog().log(status);
    	}else{
    		System.err.println(status);
    	}
    }

}
