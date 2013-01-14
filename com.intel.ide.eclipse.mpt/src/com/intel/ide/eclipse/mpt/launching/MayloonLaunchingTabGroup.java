package com.intel.ide.eclipse.mpt.launching;

import org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup;
import org.eclipse.debug.ui.ILaunchConfigurationDialog;
import org.eclipse.debug.ui.ILaunchConfigurationTab;
import org.eclipse.jdt.debug.ui.launchConfigurations.JavaMainTab;

public class MayloonLaunchingTabGroup extends
		AbstractLaunchConfigurationTabGroup {

	public MayloonLaunchingTabGroup() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public void createTabs(ILaunchConfigurationDialog dialog, String mode) {
		ILaunchConfigurationTab[] tabs = new ILaunchConfigurationTab[] {
				new JavaMainTab(), 
				new MayloonArgumentsTab()
//				new J2SClasspathOptionTab(),
//				new J2SGenerateHTMLOptionsTab(),
//				new J2SConsoleOptionsTab()
		};
		setTabs(tabs);
		

	}

}
