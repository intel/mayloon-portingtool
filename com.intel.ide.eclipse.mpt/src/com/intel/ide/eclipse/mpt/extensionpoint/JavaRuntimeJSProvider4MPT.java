/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package com.intel.ide.eclipse.mpt.extensionpoint;

import java.io.File;
import java.io.FileFilter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

import com.intel.ide.eclipse.mpt.MptPlugin;
import com.intel.ide.eclipse.mpt.extensionpoint.IExternalResourceProvider4MPT;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;
import org.eclipse.core.runtime.Platform;


public class JavaRuntimeJSProvider4MPT implements IExternalResourceProvider4MPT {

	/*
	private static String[] CORE_KEY_LIST = new String[] {
		"Common", "Utilities", "Bare Core" 
	};
	
	private static String[] CORE_DESC_LIST = new String[] {
		"With common Java classes supported, such as StringBuffer", 
		"With Java utilities supported, such as java.util.*", 
		"With only the Java class inheritance supported" 
	};

	private static String[][] CORE_RESOURCE_LIST = new String[][] {
		new String[] {
				"j2s-core-common.z.js"
		},
		new String[] {
				"j2s-core-util.z.js"
		},
		new String[] {
				"j2s-core-bare.z.js"
		}
	};
	*/
	private static String[] CORE_KEY_LIST = new String[] {
		"J2S Core" 
	};
	
	private static String[] CORE_DESC_LIST = new String[] {
		"Java2Script core library" 
	};

	private static String[][] CORE_RESOURCE_LIST = new String[][] {
		new String[] {
				/*
				"j2s-core-bare.z.js",
				"j2s-core-basic.z.js",
				"j2s-core-error.z.js",
				"j2s-core-common.z.js",
				"j2s-core-util.z.js",
				"j2s-core-more.z.js"
				*/
				"j2slib.z.js"
		}
	};
	
	public String[] getKeys() {
		return CORE_KEY_LIST;
	}

	public String[] getDescriptions() {
		return CORE_DESC_LIST;
	}

	public String[][] getResources() {
		String srcPath = "."; //$NON-NLS-1$
		try {
            URL j2slibPath = Platform.getBundle("net.sf.j2s.lib").getEntry("/" + File.separator);
            srcPath = Platform.asLocalURL(j2slibPath).getFile();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		srcPath = srcPath.replace('/', File.separatorChar);
		/*
		String[][] list = new String[CORE_RESOURCE_LIST.length][];
		for (int i = 0; i < list.length; i++) {
			list[i] = new String[CORE_RESOURCE_LIST[i].length];
			for (int j = 0; j < CORE_RESOURCE_LIST[i].length; j++) {
				list[i][j] = "|" + new File(srcPath, "j2slib/" + CORE_RESOURCE_LIST[i][j]).getAbsolutePath();
			}
		}
		return list;
		*/
		File folder = new File(srcPath, "j2slib");
		File[] files = folder.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				if (pathname.isFile() && pathname.getName().endsWith(".j2x")) {
					return true;
				}
				return false;
			}
		});
		/*
		for (int i = 0; i < files.length; i++) {
			Properties prop = new Properties();
			try {
				prop.load(new FileInputStream(files[i]));
				prop.getProperty("package.prefix");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		*/
		if (files == null) {
			return new String[0][];
		}
		String[][] list = new String[1][];
		list[0] = new String[files.length];
		for (int i = 0; i < files.length; i++) {
			list[0][i] = "|" + files[i].getAbsolutePath();
		}
		return list;
	}

	public void copyResources(String key, String destPath) {
		String[][] patterResouces = CORE_RESOURCE_LIST;
		String srcPath = "."; //$NON-NLS-1$
		try {
            URL j2slibPath = Platform.getBundle("net.sf.j2s.lib").getEntry("/" + File.separator);
            srcPath = Platform.asLocalURL(j2slibPath).getFile();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		srcPath = srcPath.replace('/', File.separatorChar);
        File logFile = new File("C:/users/gxux/ptlogCopyResources.log");
        try {
            if (!logFile.exists()) {
                logFile.createNewFile();
            }
            FileOutputStream fos = new FileOutputStream(logFile);
            fos.write(srcPath.getBytes("UTF-8"));
            fos.close();
        } catch (IOException ioe) {
        }
		int index = 0;
		for (int i = 0; i < CORE_KEY_LIST.length; i++) {
			if (CORE_KEY_LIST[i].equals(key)) {
				index = i;
				break;
			}
		}
		for (int j = 0; j < patterResouces[index].length; j++) {
			File srcFile = new File(srcPath, "j2slib/" + patterResouces[index][j]);
			File destFile = new File(destPath, patterResouces[index][j]);
			if (!destFile.exists() || srcFile.lastModified() >= destFile.lastModified()) {
				ProjectUtil.copyFile(srcFile.getAbsolutePath(), destFile.getAbsolutePath());
			}
		}
	}

}
