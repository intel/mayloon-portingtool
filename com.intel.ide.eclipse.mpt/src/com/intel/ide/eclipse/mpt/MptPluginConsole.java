package com.intel.ide.eclipse.mpt;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.logging.Formatter;
import java.util.logging.Level;
import java.util.logging.LogRecord;

import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.widgets.Display;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.console.ConsolePlugin;
import org.eclipse.ui.console.IConsole;
import org.eclipse.ui.console.IConsoleConstants;
import org.eclipse.ui.console.IConsoleManager;
import org.eclipse.ui.console.MessageConsole;
import org.eclipse.ui.console.MessageConsoleStream;

public class MptPluginConsole {
	/**
	 * Message console for displaying KdtPlugin runtime message
	 */
	private static MessageConsole sConsole;
	/**
	 * Successful console stream (text in green)
	 */
	private static MessageConsoleStream sSuccessStream;
	/**
	 * Normal console stream (text in black)
	 */
	private static MessageConsoleStream sNormalStream;
	/**
	 * Warning console stream (text in orange)
	 */
	private static MessageConsoleStream sWarningStream;
	/**
	 * Error console stream (text in red)
	 */
    private static MessageConsoleStream sErrorStream; 
    /**
     * Color red
     */
    private static Color sColorRed;
    /**
     * Color green
     */
    private static Color sColorGreen;
    /**
     * Color orange
     */
    private static Color sColorOrange;
    /**
     * Message formatter
     */
    private static Formatter sFormatter;
    
    /**
     * Constructor
     */
	public static void initConsoleView(){
		sConsole = new MessageConsole(MptMessages.Mayloon_Console_Name, null);
		IConsoleManager consoleManager = ConsolePlugin.getDefault().getConsoleManager();
		consoleManager.addConsoles(new IConsole[]{sConsole});
		sNormalStream = sConsole.newMessageStream();
		sErrorStream = sConsole.newMessageStream();
		sWarningStream = sConsole.newMessageStream();
		sSuccessStream = sConsole.newMessageStream();
		Display display = MptPlugin.getDisplay();
		sColorRed = new Color(display, 0xFF, 0x00, 0x00);
		sColorGreen = new Color(display, 0x00, 0xFF, 0x00);
		sColorOrange = new Color(display, 0xFF, 0xA5, 0x00);
        display.asyncExec(new Runnable() {
            public void run() {
            	sErrorStream.setColor(sColorRed);
            	sWarningStream.setColor(sColorOrange);
            	sSuccessStream.setColor(sColorGreen);
            }
        });
        consoleManager.showConsoleView(sConsole);
        
		sFormatter = new Formatter(){
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
	 * Bring Kona console view to foreground
	 */
	public static void showConsoleView(){
        IWorkbenchWindow win = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
        if (win != null) {
            IWorkbenchPage page = win.getActivePage();
            if (page != null) {
                try {
                    page.showView(IConsoleConstants.ID_CONSOLE_VIEW,
                                  null /* secondaryId */,
                                  IWorkbenchPage.VIEW_ACTIVATE);
                } catch (PartInitException e) {
                }
            }
        }
        ConsolePlugin.getDefault().getConsoleManager().showConsoleView(sConsole);
	}
	
	/**
	 * Print general message to normal console stream
	 * @param tag     Component tag
	 * @param format  Format string
	 * @param args    Format arguments
	 */
	public static void general(String tag, String format, Object ...args){
		LogRecord record = new LogRecord(Level.INFO, String.format(format, args));
		record.setLoggerName(tag);
		sNormalStream.print(sFormatter.format(record));
		showConsoleView();
	}
	
	/**
	 * Print successful message to normal console stream
	 * @param tag     Component tag
	 * @param format  Format string
	 * @param args    Format arguments
	 */
	public static void success(String tag, String format, Object ...args){
		LogRecord record = new LogRecord(Level.INFO, String.format(format, args));
		record.setLoggerName(tag);
		sSuccessStream.print(sFormatter.format(record));
		showConsoleView();
	}
	
	/**
	 * Print warning message to error console stream
	 * @param tag     Component tag
	 * @param format  Format string
	 * @param args    Format arguments
	 */
	public static void warning(String tag, String format, Object ...args){
		LogRecord record = new LogRecord(Level.WARNING, String.format(format, args));
		record.setLoggerName(tag);
		sWarningStream.print(sFormatter.format(record));
		showConsoleView();
	}
	
	/**
	 * Print error message to error console stream
	 * @param tag     Component tag
	 * @param format  Format string
	 * @param args    Format arguments
	 */
	public static void error(String tag, String format, Object ...args){
		LogRecord record = new LogRecord(Level.SEVERE, String.format(format, args));
		record.setLoggerName(tag);
		sErrorStream.print(sFormatter.format(record));
		showConsoleView();
	}

	/**
	 * Print exception message to error console stream
	 * @param tag     Component tag
	 * @param e       Exception
	 * @param args    Format arguments
	 */
	public static void throwable(String tag, Throwable e){
		LogRecord record = new LogRecord(Level.SEVERE, "");
		record.setLoggerName(tag);
		record.setThrown(e);
		sErrorStream.print(sFormatter.format(record));
		showConsoleView();
	}

	/**
	 * Print exception message to error console stream
	 * @param tag     Component tag
	 * @param e       Exception
	 * @param format  Format string
	 * @param args    Format arguments
	 */
	public static void throwable(String tag, Throwable e, String format, Object ...args){
		LogRecord record = new LogRecord(Level.SEVERE, String.format(format, args));
		record.setLoggerName(tag);
		record.setThrown(e);
		sErrorStream.print(sFormatter.format(record));
		showConsoleView();
	}
	
	/**
	 * Return normal console stream
	 * @return MessageConsoleStream
	 */
	public static MessageConsoleStream getNormalStream(){
		return sNormalStream;
	}
	
	/**
	 * Return error console stream
	 * @return MessageConsoleStream
	 */
	public static MessageConsoleStream getErrorStream(){
		return sErrorStream;
	}
	
	/**
	 * @return the sSuccessStream
	 */
	public static MessageConsoleStream getsSuccessStream() {
		return sSuccessStream;
	}

	/**
	 * Return message formatter
	 * @return Formatter
	 */
	public static Formatter getFormatter(){
		return sFormatter;
	}

	/**
	 * Destroy
	 */
	public static void destroy(){
		sColorRed.dispose();
		sColorGreen.dispose();
		sColorOrange.dispose();
		try {
			sNormalStream.close();
			sErrorStream.close();
			sWarningStream.close();
			sSuccessStream.close();
		} catch (IOException e) {
		}
	}
}
