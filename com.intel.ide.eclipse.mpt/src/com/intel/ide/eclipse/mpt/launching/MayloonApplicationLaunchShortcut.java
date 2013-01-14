package com.intel.ide.eclipse.mpt.launching;

import org.eclipse.debug.core.DebugPlugin;
import org.eclipse.debug.core.ILaunchConfigurationType;
import org.eclipse.debug.core.ILaunchManager;
import org.eclipse.jdt.debug.ui.launchConfigurations.JavaApplicationLaunchShortcut;


public class MayloonApplicationLaunchShortcut extends
		JavaApplicationLaunchShortcut {

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.debug.ui.launcher.JavaLaunchShortcut#getConfigurationType()
	 */
	protected ILaunchConfigurationType getConfigurationType() {
		//return getLaunchManager().getLaunchConfigurationType(IJavaLaunchConfigurationConstants.ID_JAVA_APPLICATION);		
		return getLaunchManager().getLaunchConfigurationType("com.intel.ide.eclipse.launching.MayloonApplication");//IJavaLaunchConfigurationConstants.ID_JAVA_APPLICATION);		
	}
	
	/**
	 * Returns the singleton launch manager.
	 * 
	 * @return launch manager
	 */
	private ILaunchManager getLaunchManager() {
		return DebugPlugin.getDefault().getLaunchManager();
	}
	
}
