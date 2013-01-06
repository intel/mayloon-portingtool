package com.intel.ide.eclipse.mpt.logger;

import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * A logger which is used at both KdbClient and KdbServer side. Usually, KdbServer runs
 * on Kona device, and KdbClient in Eclipse Plugin. Given the difference on platform and
 * logging environment, it's caller's responsibility to constructor proper Logger object
 * to initialize the KdbLogger.
 */
public class MptLogger 
{
	/**
	 * Underlying java.lang.logging.Logger object
	 */
	private static Logger sLogger = null;
	
	/**
	 * Initialize KdbLogger with specified Logger object
	 * @param logger
	 */
	public static void init(Logger logger){
		sLogger = logger;
	}
	
	/**
	 * Set logging level
	 * @param level
	 */
	public static void setLevel(Level level)
	{
		if(sLogger != null){
			sLogger.setLevel(level);
			flush(sLogger);
		}
	}
	
	/**
	 * Log trace message, usually for debug purpose
	 * @param message
	 */
	public static void trace(String message)
	{
		if(sLogger != null){
			sLogger.info(message);
			flush(sLogger);
		}
	}
	
	/**
	 * Log general information message
	 * @param message
	 */
	public static void general(String message)
	{
		if(sLogger != null){
			sLogger.info(message);
			flush(sLogger);
		}
	}
	
	/**
	 * Log warning message
	 * @param message
	 */
	public static void warning(String message)
	{
		if(sLogger != null){
			sLogger.warning(message);
			flush(sLogger);
		}
	}
	
	/**
	 * Log error message
	 * @param message
	 */
	public static void error(String message)
	{
		if(sLogger != null){
			sLogger.severe(message);
			flush(sLogger);
		}
	}
	
	/**
	 * Log throwable exception message
	 * @param e
	 */
	public static void throwable(Throwable e)
	{
		if(sLogger != null){
			sLogger.log(Level.SEVERE, "", e);
			flush(sLogger);
		}
	}
	
	/**
	 * Log additional message, for example, console output from some
	 * process.
	 * @param message
	 */
	public static void message(String message)
	{
		if(sLogger != null){
			sLogger.info(String.format("Additional message:\n>>>>>>Message Start>>>>>>%1$s\n<<<<<<Message Stop<<<<<<<", message));
			flush(sLogger);
		}
	}
	
	/**
	 * Destroy logger. All handlers in this logger will be removed, flushed and closed.
	 */
	public static void destroy()
	{
		if(sLogger != null){
			Handler[] handlers = sLogger.getHandlers();
			for(Handler handler : handlers){
				sLogger.removeHandler(handler);
				handler.flush();
				handler.close();
			}
			sLogger = null;
		}
	}
	
	/**
	 * Helper method to flush a logger.
	 * @param logger  Logger object which needs to flush
	 */
	private static void flush(Logger logger){
		if(logger != null){
			Handler[] handlers = logger.getHandlers();
			for(Handler handler : handlers){
				handler.flush();
			}
		}
	}
}
