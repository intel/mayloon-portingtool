package net.sf.j2s.core.utils;

import java.io.Console;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.logging.Formatter;
import java.util.logging.Level;
import java.util.logging.LogRecord;

import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.widgets.Display;
import org.eclipse.ui.console.ConsolePlugin;
import org.eclipse.ui.console.IConsole;
import org.eclipse.ui.console.IConsoleManager;
import org.eclipse.ui.console.MessageConsole;
import org.eclipse.ui.console.MessageConsoleStream;

public class CorePluginConsole {
	/**
	 * Message console for displaying J2sCorePlugin runtime message
	 */
	private static MessageConsole sConsole = null;
	/**
	 * Successful console stream (text in green)
	 */
	private static MessageConsoleStream sSuccessStream;
	/**
	 * Normal console stream (text in black)
	 */
	private static MessageConsoleStream sNormalStream;
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
	 * Message formatter
	 */
	private static Formatter sFormatter;
	

	/**
	 * get MptPluginConsole from default ConsoleManager to init CorePluginConsole
	 */
	public static void initConsoleView() {
		IConsoleManager consoleManager = ConsolePlugin.getDefault().getConsoleManager();
		IConsole[] IConsole = consoleManager.getConsoles();
		for(int i = 0; i != IConsole.length;i++){
			if(IConsole[i].getName().equals(MptConstants.Mayloon_Console_Name)){
				sConsole = (MessageConsole) IConsole[i];
			}
		}
		if(sConsole == null){
			sConsole = new MessageConsole(MptConstants.Mayloon_Console_Name, null);
		}
		sSuccessStream = sConsole.newMessageStream();
		sNormalStream = sConsole.newMessageStream();
		sErrorStream = sConsole.newMessageStream();
		Display display = ConsolePlugin.getDefault().getWorkbench()
				.getDisplay();
		sColorRed = new Color(display, 0xFF, 0x00, 0x00);
		sColorGreen = new Color(display, 0x00, 0xFF, 0x00);
		display.asyncExec(new Runnable() {
			public void run() {
				sErrorStream.setColor(sColorRed);
				sSuccessStream.setColor(sColorGreen);
			}
		});
		sFormatter = new Formatter() {
			public String format(LogRecord record) {
				StringBuffer buffer = new StringBuffer();
				buffer.append(String.format(
						"[%1$tF_%1$tT:%1$tL] [%2$s] [%3$s] %4$s\n",
						Calendar.getInstance(), record.getLevel(),
						record.getLoggerName(), record.getMessage()));
				if (record.getThrown() != null) {
					StringWriter writer = new StringWriter();
					record.getThrown().printStackTrace(new PrintWriter(writer));
					buffer.append(writer.toString());
				}
				return buffer.toString();
			}
		};
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
	ConsolePlugin.getDefault().getConsoleManager().showConsoleView(sConsole);
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
	ConsolePlugin.getDefault().getConsoleManager().showConsoleView(sConsole);
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
	sErrorStream.print(sFormatter.format(record));
	ConsolePlugin.getDefault().getConsoleManager().showConsoleView(sConsole);
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
	ConsolePlugin.getDefault().getConsoleManager().showConsoleView(sConsole);
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
	try {
		sNormalStream.close();
	} catch (IOException e) {
	}
	try {
		sErrorStream.close();
	} catch (IOException e) {
	}
	try {
		sSuccessStream.close();
	} catch (IOException e) {
	}
}

public static boolean isInit(){
	return sConsole==null ? false : true;
} 
}
