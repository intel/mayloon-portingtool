package com.intel.ide.eclipse.mpt;

import java.util.logging.Filter;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.LogRecord;
import java.util.logging.Logger;
import java.util.logging.StreamHandler;
import org.eclipse.core.resources.IResource;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.jface.util.IPropertyChangeListener;
import org.eclipse.jface.util.PropertyChangeEvent;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.plugin.AbstractUIPlugin;
import org.osgi.framework.BundleContext;
import com.intel.ide.eclipse.mpt.logger.MptLogger;
import com.intel.ide.eclipse.mpt.preferences.PreferenceInitializer;
import com.intel.ide.eclipse.mpt.project.MayloonClasspathContainerInitializer;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

/**
 * The activator class controls the plug-in life cycle
 */
public class MptPlugin extends AbstractUIPlugin {

	// The plug-in ID
	public static final String PLUGIN_ID = "com.intel.ide.eclipse.mpt"; //$NON-NLS-1$

	// The shared instance
	private static MptPlugin sPlugin;
	
	// The net.sf.j2s.lib path
	// TODO luqiang, using plug-in preferences instead
	private static String j2sLibPaht = null;
	
	public static String getJ2sLibPaht() {
		return j2sLibPaht;
	}

	public static void setJ2sLibPaht(String j2sLibPaht) {
		MptPlugin.j2sLibPaht = j2sLibPaht;
	}

	/**
	 * The constructor
	 */
	public MptPlugin() {
	}

	/*
	 * (non-Javadoc)
	 * @see org.eclipse.ui.plugin.AbstractUIPlugin#start(org.osgi.framework.BundleContext)
	 */
	public void start(BundleContext context) throws Exception {
		super.start(context);
		sPlugin = this;
		
		MptPluginConsole.initConsoleView();
		initKdbLogger();
		
        // get the default eclipse store
        IPreferenceStore store = getPreferenceStore();
        PreferenceInitializer.init(store);
        store.addPropertyChangeListener(new IPropertyChangeListener() {
			@Override
			public void propertyChange(PropertyChangeEvent event) {
				// Mayloon SDK Location has changed.
				if (PreferenceInitializer.PREFS_SDK_DIR.equals(event.getProperty())) {
					IJavaProject[] mayloonProjects = ProjectUtil.getMayloonProjects();
					if (mayloonProjects != null) {
						// remove sdk marker for each mayloon project
						for (IJavaProject javaProject : mayloonProjects) {
							ProjectUtil.removeMarkersFromResource(javaProject.getProject(), MptConstants.MARKER_SDK, IResource.DEPTH_ZERO);
						}
					}
					
					// update each Mayloon project's classpath.
					MayloonClasspathContainerInitializer.updateProjects(mayloonProjects);
				}
				
			}
		});
		
	}

	/*
	 * (non-Javadoc)
	 * @see org.eclipse.ui.plugin.AbstractUIPlugin#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext context) throws Exception {
		sPlugin = null;
		super.stop(context);
	}

	/**
	 * Returns the shared instance
	 *
	 * @return the shared instance
	 */
	public static MptPlugin getDefault() {
		return sPlugin;
	}

	/**
	 * Returns an image descriptor for the image file at the given
	 * plug-in relative path
	 *
	 * @param path the path
	 * @return the image descriptor
	 */
	public static ImageDescriptor getImageDescriptor(String path) {
		return imageDescriptorFromPlugin(PLUGIN_ID, path);
	}
	
	public static Display getDisplay() {
        IWorkbench bench = null;
        synchronized (MptPlugin.class) {
            bench = sPlugin.getWorkbench();
        }

        if (bench != null) {
            return bench.getDisplay();
        }
        return null;
    }
	
	/**
     * Displays an error dialog box. This dialog box is ran asynchronously in the ui thread,
     * therefore this method can be called from any thread.
     * @param title The title of the dialog box
     * @param message The error message
     */
    public final static void displayError(final String title, final String format, final Object ...args) {
        // get the current Display
        final Display display = getDisplay();

        final String message = String.format(format, args);
        // dialog box only run in ui thread..
        display.asyncExec(new Runnable() {
            public void run() {
                Shell shell = display.getActiveShell();
                MessageDialog.openError(shell, title, message);
            }
        });
    }
    
    /**
     * Displays a warning dialog box. This dialog box is ran asynchronously in the ui thread,
     * therefore this method can be called from any thread.
     * @param title The title of the dialog box
     * @param message The warning message
     */
    public final static void displayWarning(final String title, final String format, final Object ...args) {
        // get the current Display
        final Display display = getDisplay();

        final String message = String.format(format, args);
        // dialog box only run in ui thread..
        display.asyncExec(new Runnable() {
            public void run() {
                Shell shell = display.getActiveShell();
                MessageDialog.openWarning(shell, title, message);
            }
        });
    }

    /**
     * Display a yes/no question dialog box. This dialog is opened synchronously in the ui thread,
     * therefore this message can be called from any thread.
     * @param title The title of the dialog box
     * @param message The error message
     * @return true if OK was clicked.
     */
    public final static boolean displayPrompt(final String title, final String format, final Object ...args) {
        // get the current Display and Shell
        final Display display = getDisplay();

        final String message = String.format(format, args);
        // we need to ask the user what he wants to do.
        final boolean[] result = new boolean[1];
        display.syncExec(new Runnable() {
            public void run() {
                Shell shell = display.getActiveShell();
                result[0] = MessageDialog.openQuestion(shell, title, message);
            }
        });
        return result[0];
    }
    
    private static void initKdbLogger(){
    	Logger logger = Logger.getLogger("KdbClient");
    	logger.setUseParentHandlers(false);
		Handler handler = new StreamHandler(MptPluginConsole.getNormalStream(),
				MptPluginConsole.getFormatter());
		handler.setFilter(new Filter(){
			public boolean isLoggable(LogRecord record) {
				return record.getLevel() != Level.SEVERE;
			}
		});
		logger.addHandler(handler);
		handler = new StreamHandler(MptPluginConsole.getErrorStream(),
				MptPluginConsole.getFormatter());
		handler.setFilter(new Filter(){
			public boolean isLoggable(LogRecord record) {
				return record.getLevel() == Level.SEVERE;
			}
		});
		logger.addHandler(handler);
		MptLogger.init(logger);
		MptLogger.setLevel(Level.ALL);
    }
}
