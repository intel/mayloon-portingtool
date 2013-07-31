package com.intel.ide.eclipse.mpt.launching;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;
import net.sf.j2s.core.astvisitors.ASTTypeVisitor;
import net.sf.j2s.core.astvisitors.DependencyASTVisitor;
import net.sf.j2s.core.hotspot.InnerHotspotServer;
import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.core.variables.VariablesPlugin;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IMethod;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.internal.corext.util.JavaModelUtil;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.osgi.service.datalocation.Location;
import org.eclipse.swt.widgets.Display;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPlugin;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.builder.MayloonPropertiesBuilder;
import com.intel.ide.eclipse.mpt.classpath.CompositeResources;
import com.intel.ide.eclipse.mpt.classpath.ContactedClasses;
import com.intel.ide.eclipse.mpt.classpath.IRuntimeClasspathEntry;
import com.intel.ide.eclipse.mpt.classpath.Resource;
import com.intel.ide.eclipse.mpt.classpath.UnitClass;
import com.intel.ide.eclipse.mpt.extensionpoint.ExternalResources;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

public class J2SLaunchingUtil {

	public static void launchingJ2SUnit(ILaunchConfiguration configuration, String mode, String extensionName)
			throws CoreException {
		boolean isJUnit = true;
		String mainType = J2SLaunchingUtil.getMainType(configuration);
		if (mainType == null) {
			return;
		}

		File workingDir = J2SLaunchingUtil.getWorkingDirectory(configuration);

		if (workingDir != null) {
			StringBuffer buf = new StringBuffer();
			boolean useXHTMLHeader = configuration.getAttribute(
					IJ2SLauchingConfiguration.USE_XHTML_HEADER, true);

			IPreferenceStore store = MptPlugin.getDefault().getPreferenceStore();
			
			boolean preferred = false;
			boolean addonCompatiable = false;

//			boolean preferred = store.getBoolean(PreferenceConstants.ADDON_COMPATIABLE);
			
//			boolean addonCompatiable = configuration.getAttribute(
//					IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE, preferred);
			//boolean addonCompatiable = true;
			
			String[][] allResources = ExternalResources.getAllResources();
			String j2sLibPath = null;
			if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
				if ((allResources[0][0]).startsWith("|")) {
					allResources[0][0] = ProjectUtil.toRelativePath(allResources[0][0].substring(1), 
							workingDir.getAbsolutePath());;
				}
				j2sLibPath = allResources[0][0].substring(0, allResources[0][0].lastIndexOf("/") + 1);
			} else {
				j2sLibPath = "../net.sf.j2s.lib/j2slib/";
			}

			boolean isUseGlobalURL = configuration.getAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
			String gj2sLibPath = j2sLibPath;
			if (isUseGlobalURL) {
				gj2sLibPath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, j2sLibPath);
				if (gj2sLibPath.length() == 0) {
					gj2sLibPath = "./";
				}
				if (!gj2sLibPath.endsWith("/")) {
					gj2sLibPath += "/";
				}
			}
			
			MptPlugin.setJ2sLibPaht(gj2sLibPath);
			
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				MessageDialog.openError(null, "Project Error", "No Java2Script project is selected.");
				return;
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				MessageDialog.openError(null, "Project Error", "The selected project is not a Java2Script project.");
				return;
			}
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = "";
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			String grelativePath = relativePath;
			if (isUseGlobalURL) {
				grelativePath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, relativePath);
				if (grelativePath.length() == 0) {
					grelativePath = "./";
				}
				if (!grelativePath.endsWith("/")) {
					grelativePath += "/";
				}
			}
			
			File location = new File(javaProject.getProject().getLocation().toFile(), MptConstants.MAYLOON_PROJECT_SETTING);
			Properties prop = new Properties();
			try {
	               //load a properties file
	    		prop.load(new FileInputStream(location));
	    		
	    		prop.setProperty(MptConstants.J2S_RESROUCE_LIST, gj2sLibPath + "java.runtime.j2x");
	    		MayloonPropertiesBuilder.saveProperty(prop, javaProject);
	 
	    	} catch (IOException ex) {
	    		ex.printStackTrace();
	        }  
			String args = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, (String) null);

			generateJ2SHeaderHTML(buf, useXHTMLHeader, addonCompatiable,
					gj2sLibPath, mainType, workingDir, configuration);

			String j2xStr = generatePreJavaScript(buf, args, 
					grelativePath, gj2sLibPath, isJUnit, mode, mainType, workingDir,
					configuration);
			
			generatePreLoadingJavaScript(buf, j2xStr, mainType, gj2sLibPath,
					isJUnit, grelativePath, workingDir, configuration, javaProject);
			
			buf.append("ClazzLoader.loadClass (\"junit.textui.TestRunner\", function () {\r\n");
			buf.append("\tClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
			IType mType = (IType) JavaModelUtil.findTypeContainer(javaProject, mainType);
			boolean isTestSuite = false;
			if (mType != null) {
				IMethod suiteMethod = JavaModelUtil.findMethod("suite", new String[0], false, mType);
				if (suiteMethod != null) {
					String returnType = suiteMethod.getReturnType();
					if ("QTest;".equals(returnType) 
							|| "Qjunit.framework.Test;".equals(returnType) ) {
						isTestSuite = true;
					}
				}
			}
			String mainTypeName = new ASTTypeVisitor().assureQualifiedName(mainType);
			if (isTestSuite) {
				buf.append("\t\tjunit.textui.TestRunner.run (" + mainTypeName + ".suite ());\r\n");
			} else {
				buf.append("\t\tjunit.textui.TestRunner.run (" + mainTypeName + ");\r\n");
			}
			buf.append("\t});\r\n");
			buf.append("});\r\n");

			generatePostJavaScript(buf, configuration);

			String url = writeBufferToFile(buf, mainType, workingDir, extensionName);

			// TODO luqiang
//			Display.getDefault().asyncExec(
//					new J2SApplicationRunnable(configuration, url));
		} else {
			MessageDialog.openError(null, "Project Error", "The selected MayLoon's working folder is not found.");
		}
	}

	public static void launchingJ2SApp(ILaunchConfiguration configuration, String mode, String extensionName)
			throws CoreException {
		boolean isJUnit = false;
		String mainType = J2SLaunchingUtil.getMainType(configuration);
		if (mainType == null) {
			return;
		}

		File workingDir = J2SLaunchingUtil.getWorkingDirectory(configuration);

		if (workingDir != null) {
			StringBuffer buf = new StringBuffer();
			boolean useXHTMLHeader = configuration.getAttribute(
					IJ2SLauchingConfiguration.USE_XHTML_HEADER, true);
			
			boolean addonCompatiable = false;

			
//			boolean preferred = store.getBoolean(PreferenceConstants.ADDON_COMPATIABLE);
//			
//			boolean addonCompatiable = configuration.getAttribute(
//					IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE, preferred);
			//boolean addonCompatiable = true;
			
			// TODO luqiang, the net.sf.j2s.lib/j2slib location should be set more robustly.
			String[][] allResources = ExternalResources.getAllResources();
			String j2sLibPath = null;
			if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
				if ((allResources[0][0]).startsWith("|")) {
					allResources[0][0] = ProjectUtil.toRelativePath(allResources[0][0].substring(1), 
							workingDir.getAbsolutePath());;
				}
				j2sLibPath = allResources[0][0].substring(0, allResources[0][0].lastIndexOf("/") + 1);
			} else {
				j2sLibPath = "../net.sf.j2s.lib/j2slib/";
			}

			boolean isUseGlobalURL = configuration.getAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
			String gj2sLibPath = j2sLibPath;
			if (isUseGlobalURL) {
				gj2sLibPath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, j2sLibPath);
				if (gj2sLibPath.length() == 0) {
					gj2sLibPath = "./";
				}
				if (!gj2sLibPath.endsWith("/")) {
					gj2sLibPath += "/";
				}
			}
			
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				MessageDialog.openError(null, "Project Error", "No MayLoon project is selected.");
				return;
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				MessageDialog.openError(null, "Project Error", "The selected project is not a MayLoon project.");
				return;
			}
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = "";
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			String grelativePath = relativePath;
			if (isUseGlobalURL) {
				grelativePath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, relativePath);
				if (grelativePath.length() == 0) {
					grelativePath = "./";
				}
				if (!grelativePath.endsWith("/")) {
					grelativePath += "/";
				}
			}
			
			File location = new File(javaProject.getProject().getLocation().toFile(), MptConstants.MAYLOON_PROJECT_SETTING);
			Properties prop = new Properties();
			Properties propMayloon = new Properties();
			File locationPropMayloon = new File(javaProject.getProject().getLocation().toFile(), MptConstants.MAYLOON_BUILD_PROPERTIES);
			
	    	try {
	               //load a properties file
	    		prop.load(new FileInputStream(location));
	    		propMayloon.load(new FileInputStream(locationPropMayloon));
	    		
	    		String javaRuntimeJ2x = gj2sLibPath + "java.runtime.j2x";
	    		String j2sResourceList = prop.getProperty(MptConstants.J2S_RESROUCE_LIST, null);
	    		prop.setProperty(MptConstants.J2S_RESROUCE_LIST, javaRuntimeJ2x + ", " + j2sResourceList);
	    		MayloonPropertiesBuilder.saveProperty(prop, javaProject);
	 
	    	} catch (IOException ex) {
	    		ex.printStackTrace();
	        }    	

			String args = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, (String) null);

			generateJ2SHeaderHTML(buf, useXHTMLHeader, addonCompatiable,
					gj2sLibPath, mainType, workingDir, configuration);

			String j2xStr = generatePreJavaScript(buf, args, 
					grelativePath, gj2sLibPath, isJUnit, mode, mainType, workingDir,
					configuration);
			
			
			generatePreLoadingJavaScript(buf, j2xStr, mainType, gj2sLibPath,
					isJUnit, grelativePath, workingDir, configuration, javaProject);
			
			buf.append("ClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
			String mainTypeName = new ASTTypeVisitor().assureQualifiedName(mainType);
			buf.append("\t" + mainTypeName + ".main(" + ArgsUtil.wrapAsArgumentArray(args, true) + ");\r\n");
			buf.append("});\r\n");

			generatePostJavaScript(buf, configuration);

			String url = writeBufferToFile(buf, projectName, workingDir, extensionName);
			
			// TODO luqiang, after compile complete, add mayloon runtime js files
//			addMayloonRuntimeJSFiles(javaProject, projectName);
			MptPluginConsole.general(MptConstants.RUN_TAG, "%1$s has been generated at %2$s.", projectName + MptConstants.MAYLOON_START_ENTRY_FILE, url);

//			Display.getDefault().asyncExec(
//					new J2SApplicationRunnable(configuration, url));
			
			try {
				javaProject.getProject().refreshLocal(IResource.DEPTH_INFINITE, null);
			} catch (CoreException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			MptPluginConsole.success(MptConstants.RUN_TAG, "Project '%1$s' has been run as Mayloon Application successfully.", projectName);
		} else {
			MessageDialog.openError(null, "Project Error", "The selected J2S's working folder is not found.");
		}
	}
	
	private static void addMayloonRuntimeJSFiles(IJavaProject javaProject, String projectName) {
		FileInputStream stream = null;
		String mayloonSDKPath = MayloonSDK.getSdkLocation();
		
		Properties properties = new Properties();
		try {
			properties.load(stream = new FileInputStream(new File(
					mayloonSDKPath, MptConstants.MAYLOON_EXTERNAL_PROPERTY)));
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		String frameworkJs = properties.getProperty(
				MptConstants.MAYLOON_JS_FRAMEWORK_PATH, null);
		
		if (frameworkJs != null) {
			IPath srcPath = Path.fromPortableString(mayloonSDKPath
					+ MptConstants.WS_ROOT + frameworkJs);
			IPath outputPath;
			IPath projectPath = new Path(projectName);
			try {
				outputPath = javaProject.getOutputLocation().makeRelativeTo(projectPath);
				
				IPath destPath = javaProject.getProject().getLocation().append(outputPath);
				
				ProjectUtil.copyFilesFromPlugin2UserProject(srcPath, destPath);
				IFolder folder = javaProject.getProject().getFolder(outputPath);
				folder.refreshLocal(IResource.DEPTH_INFINITE, null);
			} catch (JavaModelException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (CoreException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			MptPluginConsole
					.error(MptConstants.BUILD_TAG,
							"Could not load MayLoon framework javascript files due to cause {%1$s}",
							"MayLoon framework javascript path is not set correctly.");
		}
	}

	private static String writeBufferToFile(StringBuffer buf, String mainType,
			File workingDir, String extensionName) {
		String html = buf.toString();
		String rootPath = workingDir.getAbsolutePath();
		File file = new File(rootPath, mainType + "." + extensionName);
		J2SLaunchingUtil.writeMainHTML(file, html);
		String url = null;
		try {
			url = file.toURL().toExternalForm();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return url;
	}

	private static void generatePostJavaScript(StringBuffer buf,
			ILaunchConfiguration configuration) throws CoreException {
		buf.append("</script>\r\n");

		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.TAIL_BODY_HTML, ""));
		buf.append("</body>\r\n");
		buf.append("</html>");
	}

	private static void generatePreLoadingJavaScript(StringBuffer buf,
			String j2xStr, String mainType, String gj2sLibPath, boolean isJUnit,
			String grelativePath, File workingDir,
			ILaunchConfiguration configuration, IJavaProject javaProject) throws CoreException {
		if (j2xStr.indexOf("\"java\"") == -1) {
			buf.append("ClazzLoader.packageClasspath (\"java\", j2sLibPath, true);\r\n");
		}
		if (isJUnit && j2xStr.indexOf("\"junit\"") == -1) {
			buf.append("ClazzLoader.packageClasspath (\"junit\", j2sLibPath, true);\r\n");;
		}
		buf.append(j2xStr);
		
		buf.append("ClazzLoader.setPrimaryFolder (\"");
		buf.append(grelativePath);
		buf.append("\");\r\n");
		
		J2SCyclicProjectUtils.emptyTracks();
		buf.append(J2SLaunchingUtil.generateClasspathIgnoredClasses(configuration, mainType, workingDir, ""));
		
		J2SCyclicProjectUtils.emptyTracks();
		buf.append(J2SLaunchingUtil.generateClasspathExistedClasses(configuration, mainType, workingDir, ""));
	}

	private static String generatePreJavaScript(StringBuffer buf, String args, 
			String grelativePath, String gj2sLibPath, boolean isJUnit, String mode,
			String mainType, File workingDir, ILaunchConfiguration configuration)
			throws CoreException {
		buf.append("<a class=\"alaa\" title=\"Launch ");
		buf.append(mainType);
		buf.append("\" href=\"text/javascript:if(a='");
		buf.append(mainType);
		buf.append('@');
		buf.append(grelativePath);
		buf.append("'");
		if (args != null && args.length() > 2) { // []
			buf.append(",r=");
			buf.append(J2SLaunchingUtil.toXMLString(ArgsUtil.wrapAsArgumentArray(args, false)));
		}
		buf.append(",window['ClazzLoader']!=null)" + (isJUnit ? "$u$" : "$w$") + "(a");
		if (args != null && args.length() > 2) { // []
			buf.append(",r");
		}
		buf.append(");else{var d=document,t='onreadystatechange',x=d.createElement('SCRIPT')," +
				"f=function(){var s=this.readyState;if(s==null||s=='loaded'||s=='complete'){" + (isJUnit ? "$u$" : "$w$") + "(a");
		if (args != null && args.length() > 2) { // []
			buf.append(",r");
		}
		buf.append(");}};x.src='");
		buf.append(gj2sLibPath);
		buf.append("j2slib.z.js';(typeof x[t]=='undefined')?x.onload=f:x[t]=f;" +
				"d.getElementsByTagName('HEAD')[0].appendChild(x);void(0);}\">");
		buf.append("</a>\r\n\r\n");
		
		/*
		 * MainType Class may already included in the header section
		 */
		buf.append("<script type=\"text/javascript\">\r\n");

		J2SCyclicProjectUtils.emptyTracks();
		
		String j2xStr = null;
		j2xStr = J2SLaunchingUtil.generateClasspathJ2X(configuration, null, workingDir);
		if ("debug".equals(mode)) {
			buf.append("window[\"j2s.script.debugging\"] = true;\r\n");
			if (j2xStr.indexOf("swt") != -1) {
				buf.append("window[\"swt.debugging\"] = true;\r\n");
			}
			buf.append("window[\"j2s.hotspot.port\"] = ");
			buf.append(InnerHotspotServer.getHotspotPort());
			buf.append(";\r\n\r\n");
		}
		return j2xStr;
	}

	private static void generateJ2SHeaderHTML(StringBuffer buf,
			boolean useXHTMLHeader, boolean addonCompatiable,
			String gj2sLibPath, String mainType, File workingDir,
			ILaunchConfiguration configuration) throws CoreException {
		if (useXHTMLHeader) {
			buf.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\r\n");
			buf.append("\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n");
			buf.append("<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">\r\n");
		} else {
			buf.append("<html>\r\n");
		}
		buf.append("<head>\r\n");
		buf.append("<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"/>\r\n");
		buf.append("<title>");
		buf.append(mainType);
		buf.append("</title>\r\n");
		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.HEAD_HEADER_HTML, ""));

		if (!addonCompatiable) {
			buf.append("<script type=\"text/javascript\">\r\n");
			buf.append("var j2slibPath=\""+gj2sLibPath+"\"\r\n");
			buf.append("document.write(\"<script type=\\\"text/javascript\\\" src=\\\"\"+j2slibPath+\"j2slib.z.js\\\"\\></script\\>\");\r\n");
			buf.append("</script>\r\n");
		}
		
		J2SCyclicProjectUtils.emptyTracks();
		String extraHTML = J2SLaunchingUtil.generateClasspathHTML(configuration, mainType, workingDir);
		if (extraHTML.trim().length() != 0) { 
			buf.append(extraHTML);
		}

		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.TAIL_HEADER_HTML, ""));
		
		buf.append("<style text=\"text/css\">\r\n");
		buf.append("div.powered {\r\n");
		buf.append("\tposition:absolute;\r\n" +
				"\tright:0;\r\n" +
				"\ttop:0;\r\n" +
				"\tmargin:1em;\r\n");
		buf.append("}\r\n");
		buf.append("a.alaa {\r\n");
		buf.append("\tdisplay:block;\r\n" +
				"\twhite-space:nowrap;\r\n" +
				"\twidth:1em;\r\n" +
				"\toverflow-x:visible;\r\n" +
				"\ttext-decoration:none;\r\n" +
				"\tpadding-left:32px;\r\n" +
				"\tmargin:2em;\r\n" +
				"\tcolor:navy;\r\n" +
				"\tcursor:pointer;\r\n" +
				"\tcursor:hand;\r\n");
		buf.append("}\r\n");
		buf.append("span.alaa-icon {\r\n");
		buf.append("\tdisplay:block;\r\n" +
				"\tposition:absolute;\r\n" +
				"\twidth:16px;\r\n" +
				"\theight:16px;\r\n" +
				"\tmargin:2px 8px 0 -24px;\r\n" +
				"\tbackground-color:rgb(57,61,254);\r\n");
		buf.append("}\r\n");
		buf.append("</style>\r\n");
		buf.append("<script src=\"external/jsthread.js\"></script>");
		buf.append("</head>\r\n");
		buf.append("<body>\r\n");
		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.HEAD_BODY_HTML, ""));
	}

	public static void writeMainHTML(File file, String html) {
		try {
			FileOutputStream fos = new FileOutputStream(file);
			fos.write(new byte[] {(byte) 0xef, (byte) 0xbb, (byte) 0xbf}); // UTF-8 header!
			fos.write(html.getBytes("utf-8"));
			fos.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/*
	 * Append the *.js in classpath
	 */
	static String generateClasspathHTML(
			ILaunchConfiguration configuration, String mainType, File workingDir)
			throws CoreException {
		StringBuffer buf = new StringBuffer();
		
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
		if ((projectName == null) || (projectName.trim().length() < 1)) {
			return buf.toString();
		}			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			return buf.toString();
		}
		
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = null;
		if (idx != -1) {
			relativePath = path.substring(idx + 1); 
		}
	
		String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof Resource) {
					Resource res = (Resource) paths[i];
					if (!J2SCyclicProjectUtils.visit(res)) {
						continue;
					}
					if (!existed.contains(res.getName())) {
						existed.add(res.getName());
						buf.append(res.toHTMLString());
					}
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			buf.append(fModel.toHTMLString());
		}
		
		String str = buf.toString();
		buf = new StringBuffer();
		String[] split = str.split("\r\n|\r|\n");
		Set set = new HashSet();
		for (int i = 0; i < split.length; i++) {
			if (set.contains(split[i])) {
				String line = split[i].toLowerCase();
				if (line.startsWith("<script ") && line.indexOf("src=") != -1) {
					continue;
				}
				if (line.startsWith("<link ") && line.indexOf("href=") != -1) {
					continue;
				}
			}
			set.add(split[i]);
			buf.append(split[i]);
			buf.append("\r\n");
		}
		return buf.toString();
	}

	/*
	 * Append the *.js in classpath
	 */
	static String generateClasspathJ2X(
			ILaunchConfiguration configuration, String varName, File workingDir)
			throws CoreException {
		boolean isUseGlobalURL = configuration.getAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
		StringBuffer buf = new StringBuffer();
		
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
		if ((projectName == null) || (projectName.trim().length() < 1)) {
			return buf.toString();
		}			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			return buf.toString();
		}
		
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = null;
		if (idx != -1) {
			relativePath = path.substring(idx + 1); 
		}
	
		String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof ContactedClasses) {
					ContactedClasses res = (ContactedClasses) paths[i];
					if (!existed.contains(res.getName())) {
						existed.add(res.getName());
						buf.append(res.toJ2XString());
						buf.append(',');
					}
				} else if (paths[i] instanceof CompositeResources) {
					CompositeResources c = (CompositeResources) paths[i];
					if (!existed.contains(c.getName())) {
						existed.add(c.getName());
						buf.append(c.toJ2XString());
						buf.append(',');
					}
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			J2SCyclicProjectUtils.emptyTracks();
			buf.append(fModel.toJ2XString());
		}
		
		String str = buf.toString();
		buf = new StringBuffer();
		String[] split = str.split("\r\n|\r|\n|,");
		Set set = new HashSet();
		Set keyPkg = new HashSet();
		for (int i = 0; i < split.length; i++) {
			if (set.contains(split[i])) {
				continue;
			}
			set.add(split[i]);
			if (split[i] != null && split[i].trim().length() != 0) {
				String j2xPath = split[i].trim();
				File f = new File(j2xPath);
				if (!f.exists() && j2xPath.indexOf("net.sf.j2s.lib") != -1) {
					if (j2xPath.matches(".*\\.v\\d{3}.*")) { // installed by update manager
						j2xPath = j2xPath.replaceAll("\\.v\\d{3}", "");
						f = new File(j2xPath);
					} else { // is normally installed but is importing incompatiable projects 
						Location location = Platform.getInstallLocation();
						URL url = location.getURL();
						File file = new File(url.getFile(), "plugins");
						File[] j2sFolders = file.listFiles(new FileFilter() {
							public boolean accept(File pathname) {
								String name = pathname.getName().toLowerCase();
								if (name.startsWith("net.sf.j2s.lib")) {
									return true;
								}
								return false;
							}
						});
						File j2slib = null;
						if (j2sFolders != null && j2sFolders.length != 0) {
							j2slib = j2sFolders[0];
							j2xPath = j2xPath.replaceAll("net\\.sf\\.j2s\\.lib([^\\/\\\\])*(\\/|\\\\)", j2slib.getName() + "$2");
							f = new File(j2xPath);
						}
					}
				}
				if (f.exists()) {
					Properties prop = new Properties();
					try {
						prop.load(new FileInputStream(f));
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
					String pkg = prop.getProperty("package.prefix");
					if (keyPkg.contains(pkg)) {
						continue;
					}
					keyPkg.add(pkg);
					buf.append("ClazzLoader.packageClasspath (\"");
					buf.append(pkg);
					buf.append("\", ");
					String j2slibPath = ProjectUtil.toRelativePath(f.getParent(), workingDir.getAbsolutePath());
					String gj2sLibPath = j2slibPath;
					if (isUseGlobalURL) {
						gj2sLibPath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, j2slibPath);
						if (gj2sLibPath.length() == 0) {
							gj2sLibPath = "./";
						}
						if (!gj2sLibPath.endsWith("/")) {
							gj2sLibPath += "/";
						}
					}
					buf.append("j2slibPath");
					File pkgFile = new File(f.getParentFile(), pkg.replace('.', '/') + "/package.js");
					if (pkgFile.exists()) {
						buf.append(", true");
					}
					buf.append(");\r\n");
				}
			}
		}
		return buf.toString();
	}

	/*
	 * Append the *.js in classpath
	 */
	static String generateClasspathExistedClasses (
			ILaunchConfiguration configuration, String mainType, File workingDir, String indent)
			throws CoreException {
		boolean isUseGlobalURL = configuration.getAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
		
		StringBuffer buf = new StringBuffer();
		
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
		if ((projectName == null) || (projectName.trim().length() < 1)) {
			return buf.toString();
		}			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			return buf.toString();
		}
	
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = null;
		File srcFolder = null;
		if (idx != -1) {
			relativePath = path.substring(idx + 1);
			srcFolder = new File(workingDir, relativePath);
		} else {
			relativePath = "";
			srcFolder = workingDir;
		}
	
		buf.append('[');
		try {
			buf.append(srcFolder.getCanonicalPath());
		} catch (IOException e) {
			// should never run into these lines!
			e.printStackTrace();
			buf.append(relativePath);
		}
		buf.append("],");
		String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof UnitClass) {
					UnitClass unit = (UnitClass) paths[i];
					if (!J2SCyclicProjectUtils.visit(unit)) {
						continue;
					}
					buf.append(unit.getClassName());
					buf.append(',');
				}
			}
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof CompositeResources) {
					CompositeResources c = (CompositeResources) paths[i];
					if (!existed.contains(c.getName())) {
						existed.add(c.getName());
						buf.append(c.existedClassesString());
						buf.append(',');
					}
				}
				if (!J2SCyclicProjectUtils.visit(paths[i])) {
					continue;
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			buf.append(fModel.existedClassesString());
		}
		
		String str = buf.toString();
		buf = new StringBuffer();
		String[] split = str.split("\r\n|\r|\n|,");
		Set set = new HashSet();
		boolean existedPackages = false;
		String lastLocation = "";
		for (int i = 0; i < split.length; i++) {
			if (split[i] != null && split[i].trim().length() != 0) {
				String clazzName = split[i].trim();
				if (clazzName.startsWith("[") && clazzName.endsWith("]")) {
					if (existedPackages) {
						String[] arr = (String[]) set.toArray(new String[0]);
						if (arr.length > 0) {
							buf.append(indent);
							buf.append("ClazzLoader.packageClasspath (");
						}
						if (arr.length > 1) {
							buf.append('[');
						}
						DependencyASTVisitor.joinArrayClasses(buf, arr, null);
						if (arr.length > 1) {
							buf.append(", ");
							// add mayloon runtime package
							AddMayloonRuntimePackage(buf);
							buf.append(']');
						}
						if (arr.length > 0) {
							buf.append(", \"");
							String glastLocation = lastLocation;
							if (isUseGlobalURL) {
								glastLocation = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, lastLocation);
								if (glastLocation.length() == 0) {
									glastLocation = "./";
								}
								if (!glastLocation.endsWith("/")) {
									glastLocation += "/";
								}
							}
							buf.append(glastLocation);
							buf.append("\");\r\n");
						}
						existedPackages = false;
						set.clear();
					}
					clazzName = clazzName.substring(1, clazzName.length() - 1);
					lastLocation = ProjectUtil.toRelativePath(clazzName, workingDir.getAbsolutePath());
					continue;
				}
				int idx2 = clazzName.lastIndexOf(".");
				if (idx2 != -1) {
					clazzName = clazzName.substring(0, idx2);
					set.add(clazzName);
					existedPackages = true;
				}
			}
		}
		if (existedPackages) {
			String[] arr = (String[]) set.toArray(new String[0]);
			if (arr.length > 0) {
				buf.append(indent);
				buf.append("ClazzLoader.packageClasspath (");
			}
			if (arr.length > 1) {
				buf.append('[');
			}
			DependencyASTVisitor.joinArrayClasses(buf, arr, null);
			if (arr.length > 1) {
				buf.append(", ");
				// add mayloon runtime package
				AddMayloonRuntimePackage(buf);
				buf.append(']');
			}
			if (arr.length > 0) {
				buf.append(", \"");
				String glastLocation = lastLocation;
				if (isUseGlobalURL) {
					glastLocation = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, lastLocation);
					if (glastLocation.length() == 0) {
						glastLocation = "./";
					}
					if (!glastLocation.endsWith("/")) {
						glastLocation += "/";
					}
				}
				buf.append(glastLocation);
				buf.append("\");\r\n");
			}
			existedPackages = false;
			set.clear();
		}
		return buf.toString();
	}
	
	private static void AddMayloonRuntimePackage(StringBuffer buf) {
		
		String mayloonSDKPath = MayloonSDK.getSdkLocation();
		
		File packageNameFile = new File(mayloonSDKPath + MptConstants.WS_ROOT + MptConstants.MAYLOON_RUNTIME_PACKAGE);
		JSONParser parser = new JSONParser();
		ArrayList<String> mayloonPackageList = new ArrayList<String>();
		BufferedReader input;
		try {
			input = new BufferedReader(new FileReader(packageNameFile));
			try {
				
				Object obj = parser.parse(input);
				
				JSONArray jsonArray = (JSONArray) obj;
				Iterator<?> iterator = jsonArray.iterator();
				while (iterator.hasNext()) {
					mayloonPackageList.add(iterator.next().toString());
				}

			} catch (ParseException e) {
				e.printStackTrace();
			} catch (IOException ex) {
				ex.printStackTrace();

			} finally {
				try {
					input.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		for (int i = 0; i < mayloonPackageList.size(); i++) {
			buf.append("\"");
			buf.append(mayloonPackageList.get(i));
			buf.append("\"");
			if (i != mayloonPackageList.size() - 1) {
				buf.append(", ");
			}
		}
	}

	/*
	 * To generate ClazzLoader.ignore (...)
	 */
	static String generateClasspathIgnoredClasses (
			ILaunchConfiguration configuration, String mainType, File workingDir, String indent)
			throws CoreException {
		StringBuffer buf = new StringBuffer();
		
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
		if ((projectName == null) || (projectName.trim().length() < 1)) {
			return buf.toString();
		}			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			return buf.toString();
		}
	
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = null;
		if (idx != -1) {
			relativePath = path.substring(idx + 1); 
		}
	
		String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_ABANDON_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedIgnoredClasses(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof CompositeResources) {
					CompositeResources c = (CompositeResources) paths[i];
					if (!existed.contains(c.getName())) {
						existed.add(c.getName());
						buf.append(c.ignoredClassesString());
						buf.append(',');
					}
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.abandoned.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			buf.append(fModel.ignoredClassesString());
		}
		
		classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof CompositeResources) {
					CompositeResources c = (CompositeResources) paths[i];
					if (!existed.contains(c.getName())) {
						existed.add(c.getName());
						buf.append(c.ignoredClassesString());
						buf.append(',');
					}
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			buf.append(fModel.ignoredClassesString());
		}
	
		String str = buf.toString();
		buf = new StringBuffer();
		String[] split = str.split("\r\n|\r|\n|,");
		Set set = new HashSet();
		for (int i = 0; i < split.length; i++) {
			if (split[i] != null && split[i].trim().length() != 0) {
				set.add(split[i].trim());
			}
		}
		String[] arr = (String[]) set.toArray(new String[0]);
		if (arr.length > 0) {
			buf.append(indent);
			buf.append("ClazzLoader.ignore (");
			DependencyASTVisitor.joinArrayClasses(buf, arr, null);
			buf.append(");\r\n");
		}
		return buf.toString();
	}

	public static String wrapTypeJS(String className, String binFolder) {
		StringBuffer buf = new StringBuffer();
		buf.append("<script type=\"text/javascript\" src=\"");
		if (binFolder != null) {
			String binPath = binFolder.trim();
			if (binPath.length() != 0) {
				buf.append(binPath);
				if (!binPath.endsWith("/")) {
					buf.append("/");
				}
			}
		}
		buf.append(className.replace('.', '/'));
		buf.append(".js\"></script>\r\n");
		return buf.toString();
	}

	static String toXMLString(String str) {
		return str.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll(">", "&gt;").replaceAll("<", "&lt;");
	}

	public static String readAFile(InputStream res) {
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			boolean isUTF8 = false;
			byte[] utf8Header = new byte[3];
			byte[] buf = new byte[1024];
			int read = 0;
			// Try to ignore the UTF-8 header! And return string are considered as
			// UTF-8 encoded.
			int readLen = 0;
			while ((read = res.read(utf8Header, readLen, 3 - readLen)) != -1) {
				readLen += read;
				if (readLen == 3) {
					if (utf8Header[0] == (byte) 0xef
							&& utf8Header[1] == (byte) 0xbb
							&& utf8Header[2] == (byte) 0xbf) {
						// skip
						isUTF8 = true;
					} else {
						baos.write(utf8Header);
					}
					break;
				}
			}
			while ((read = res.read(buf)) != -1) {
				baos.write(buf, 0, read);
			}
			res.close();
			return isUTF8 ? baos.toString() : baos.toString("utf-8");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	static File getWorkingDirectory(ILaunchConfiguration configuration)
			throws CoreException {
		File workingDir = null;
		String path = configuration.getAttribute(
				IJavaLaunchConfigurationConstants.ATTR_WORKING_DIRECTORY,
				(String) null);
		if (path != null) {
			path = VariablesPlugin.getDefault().getStringVariableManager()
					.performStringSubstitution(path);
			Path xpath = new Path(path);
			if (xpath.isAbsolute()) {
				File dir = new File(xpath.toOSString());
				if (dir.isDirectory()) {
					workingDir = dir;
				} else {
					// This may be a workspace relative path returned by a
					// variable.
					// However variable paths start with a slash and thus are
					// thought to
					// be absolute
					IResource res = ResourcesPlugin.getWorkspace().getRoot()
							.findMember(path);
					if (res instanceof IContainer && res.exists()) {
						workingDir = res.getLocation().toFile();
					}
				}
			} else {
				IResource res = ResourcesPlugin.getWorkspace().getRoot()
						.findMember(path);
				if (res instanceof IContainer && res.exists()) {
					workingDir = res.getLocation().toFile();
				}
			}
		}
		if (workingDir == null) {
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				return null;
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				return null;
			}
	        IProject project = javaProject.getProject();
			String prjFolder = project.getLocation().toOSString();
			workingDir = new File(prjFolder);
		}
		return workingDir;
	}

	static String getMainType(ILaunchConfiguration configuration)
			throws CoreException {
		String mainType;
		mainType = configuration.getAttribute(
				IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME,
				(String) null);
		if (mainType == null) {
			return null;
		}
		mainType = VariablesPlugin.getDefault().getStringVariableManager()
				.performStringSubstitution(mainType);
		return mainType;
	}
}
