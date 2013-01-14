package com.intel.ide.eclipse.mpt.classpath;

import java.util.Properties;

public interface IClasspathContainer {
	
	public void load();
	
	public void store(Properties props);
	
	public Resource[] getChildren();
	
}
