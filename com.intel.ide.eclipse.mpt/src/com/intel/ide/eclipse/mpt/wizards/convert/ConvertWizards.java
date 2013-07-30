package com.intel.ide.eclipse.mpt.wizards.convert;

import org.eclipse.swt.widgets.Composite;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IImportDeclaration;
import org.eclipse.jdt.core.IJavaModelMarker;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IPackageFragmentRoot;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.compiler.IProblem;
import org.eclipse.jdt.internal.core.util.Util;
import org.eclipse.jface.operation.IRunnableWithProgress;
import org.eclipse.jface.wizard.IWizardPage;
import org.eclipse.jface.wizard.Wizard;
import org.eclipse.text.edits.MalformedTreeException;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptException;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.ast.ASTParserAddNativeMethodDeclaration;
import com.intel.ide.eclipse.mpt.builder.MayloonPropertiesBuilder;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;
import com.intel.ide.eclipse.mpt.project.MayloonProjectMessages;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

public class ConvertWizards extends Wizard {
	private IProject project;
	private ConvertWizardDialog wizardDialog;
	private CheckPreConvertPage checkPreConvertPage;
	private PartialConversionInfoPage parConversionInfoPage;
	
	private Boolean originalAutoBuild;
	private Boolean convertFlag;	//see if already tried converting; check this before perform finishing
	ArrayList<String> parConversionInfo = new ArrayList<String>();
	
	public ConvertWizards(IProject project){
		this.project = project;
		this.wizardDialog = null;
		this.originalAutoBuild = false;
		this.convertFlag = false;
		this.setHelpAvailable(false);
		this.setNeedsProgressMonitor(true);
	}

	@Override
	public void addPages(){
		this.addPage(new StartConvertPage());
		this.addPage(this.checkPreConvertPage = new CheckPreConvertPage(this));
		this.addPage(this.parConversionInfoPage = new PartialConversionInfoPage());
	}
	
	@Override
	public void createPageControls(Composite pageContainer) {
		IWizardPage wizardPages[] = this.getPages();
		if(wizardPages.length != 0){
			wizardPages[0].createControl(pageContainer);
			Assert.isNotNull(wizardPages[0].getControl());
		}
    }
	
	@Override
	public IWizardPage getNextPage(IWizardPage page) {
		IWizardPage wizardPages[] = this.getPages();
		int index = -1;
		for(int i = 0; i != wizardPages.length; i++){
			if(wizardPages[i].equals(page)) {
				index = i;
				break;
			}
		}
	    if (index == wizardPages.length - 1 || index == -1) {
	    	return null;
		}
	    if(wizardPages[index + 1].getName().equals("CheckPreConvertPage")){
	    	try {
	    		if(wizardPages[index + 1].getControl() != null){
	    			wizardPages[index + 1].dispose();
	    		}
				this.getContainer().run(true, true, new IRunnableWithProgress() {
					@Override
					public void run(IProgressMonitor monitor) throws InvocationTargetException,
							InterruptedException{
							check(monitor);
					}
				});
			} catch (InvocationTargetException e) {
				reportError(e);
			} catch (InterruptedException e) {
				reportError(e);
			}
	    }
	    else if (wizardPages[index + 1].getName().equals("PartialConversionInfo")){
	    	if(wizardPages[index + 1].getControl() != null){
	    		wizardPages[index + 1].dispose();
	    	}
    		    		
	    	//convert a project
    		try {
    			this.getContainer().run(true, true, new IRunnableWithProgress() {
    				@Override
    				public void run(IProgressMonitor monitor) throws InvocationTargetException,
    						InterruptedException{
    					convert(monitor);
    					monitor.done();
    				}
    			});
    		} catch (InvocationTargetException e) {
    			reportError(e);
    		} catch (InterruptedException e) {
    			reportError(e);
    		}
	    }
	    return (IWizardPage) wizardPages[index+1];
	}
	
	@Override
	public boolean canFinish(){
		return convertFlag;
	}
	
	@Override
	public boolean performFinish() {
		if (this.convertFlag){
			return true;	//already tried, skip converting
		}
		
		try {
			this.getContainer().run(true, true, new IRunnableWithProgress() {
				@Override
				public void run(IProgressMonitor monitor) throws InvocationTargetException,
						InterruptedException{
					convert(monitor);
					monitor.done();
				}
			});
		} catch (InvocationTargetException e) {
			reportError(e);
		} catch (InterruptedException e) {
			reportError(e);
		}		
		return true;
	}
	
	private void check(IProgressMonitor monitor){
		try {
			monitor.beginTask("Checking necessary files and information", 5);
			Set<String> errorInfoSet= new HashSet<String>();
			Set<String> warningInfoSet= new HashSet<String>();
			
			monitor.subTask("Mayloon SDK files");
			errorInfoSet.addAll(ProjectUtil.getSdkFilesCheckInfo(project));
			monitor.worked(1);
			
			monitor.subTask("Android files");
			errorInfoSet.addAll(ProjectUtil.getAndroidFilesCheckInfo(project));
			monitor.worked(1);
			
			monitor.subTask("Libraries information");
			ProjectUtil.checkLibraryDependency(project, warningInfoSet);
			monitor.worked(1);
			
			monitor.subTask("Package name information");
			if(!errorInfoSet
					.contains(ProjectUtil
							.getNoAndroidFileErrorInfo(MptConstants.ANDROID_MANIFEST_FILE))) {
				errorInfoSet.addAll(ProjectUtil.getPackageNameCheckInfo(project));
			}
			monitor.worked(1);
			
			monitor.subTask("Version match");
			if(!errorInfoSet.contains(MayloonProjectMessages.Can_Not_Get_Mayloon_SDK_Version)){
				warningInfoSet.addAll(ProjectUtil.getVersionMatchCheckInfo(project));
			}
			monitor.worked(1);
			
			this.checkPreConvertPage.setWarningInfoSet(warningInfoSet);
			this.checkPreConvertPage.setErrorInfoSet(errorInfoSet);
		} catch (Exception e) {
			reportError(e);
		}
		monitor.done();
	}
	
	private void convert(IProgressMonitor monitor){
		try {
			// 8 steps to convert project
			monitor.beginTask("Project converting...", 8);
			this.convertFlag = true;

			// disable AutoBuild
			originalAutoBuild = ProjectUtil.getAutoBuild();
			if (originalAutoBuild) {
				ProjectUtil.setAutoBuild(false);
			}
			
			//fix project dependencies
			ProjectUtil.fixDependencies(project);
			monitor.worked(1);
			
			// generate .j2s configuration file
			MayloonPropertiesBuilder.mayloonPropBuild(project);
			MayloonPropertiesBuilder.j2sPropBuild(project);
			monitor.worked(1);
			
			String deployMode = MptConstants.J2S_DEPLOY_MODE_BROWSER;

			ProjectUtil.backupProject(project);
			monitor.worked(1);

			// get package name from AndroidManifest.xml
			// packageName is [packageName], not include the
			// main activity name.(not compatible with
			// android internal implementation)
			String packageName = ProjectUtil
					.extractPackageFromManifest(project);		
			
			// merge j2s class path modify logic to it.
			ProjectUtil.fixMayloonClassEntry(project);
			monitor.worked(1);

			// merge j2s nature to it.
			MayloonNature.addProjectNature(project);
			monitor.worked(1);

			// copy mayloon framework resource and js
			// library
			ProjectUtil.addMayloonFrameworkFolder(project, deployMode,
					packageName, false);
			monitor.worked(1);

			// copy android build output resource to
			// /bin/apps/[package name]/
			ProjectUtil.addAndroidOutput2Mayloon(project, deployMode,
					packageName, false);
			monitor.worked(1);

			if (partialConversionFlag) {
				partialConversionSync(monitor);
			}

			// Add mayloon project builder to classpath
			MayloonNature.addMaloonProjectBuilder(project);
			monitor.worked(1);

			convertFinish();
		} catch (CoreException e) {
			reportError(e);
		} catch (MptException e) {
			reportError(e);
		}
	}
	

	public IMarker[] findJavaProblemMarkers(ICompilationUnit cu)
			throws CoreException {
		IResource javaSourceFile = cu.getUnderlyingResource();
		IMarker[] markers = javaSourceFile.findMarkers(
				IJavaModelMarker.JAVA_MODEL_PROBLEM_MARKER, true,
				IResource.DEPTH_INFINITE);
		
		return markers;
	}
	
	private static String outerClassName(String className){
		String[] split = className.split("\\.");
		StringBuilder outerClassName = new StringBuilder();
		boolean found = false;
		outerClassName.append(split[0]);
		
		for(int i =1; i<split.length; i++){
			char c = split[i].charAt(0);
			if (c >= 'A' && c <= 'Z'){
				if(found){
					break;
				}
				found = true;
			}
			outerClassName.append(".").append(split[i]);
		}
		return outerClassName.toString();
	}
	
	private static boolean needStub(String name, Set<String> unresolvedImports) {
		for (String item : unresolvedImports) {
			if (name.equals(item) || name.startsWith(item + "."))
				if (!ProjectUtil.getMayloonJarClasses().contains(name))
					return true;
		}
		return false;
	}
	
	private void partialConversionSync(IProgressMonitor monitor){
		try {
			if (project.isNatureEnabled("org.eclipse.jdt.core.javanature")) {
				IJavaProject javaProject = JavaCore.create(project);
				Map options = javaProject.getOptions(false);
				options.put(JavaCore.CORE_JAVA_BUILD_INVALID_CLASSPATH, JavaCore.IGNORE);
				options.put(JavaCore.COMPILER_PB_UNUSED_IMPORT, JavaCore.IGNORE);
				javaProject.setOptions(options);
				
				/*
				 * Perform a full build. Subsequent builds can be incremental.
				 */
				project.build(IncrementalProjectBuilder.FULL_BUILD, monitor);

				IPackageFragment[] packages = JavaCore
						.create(project)
						.getPackageFragments();
				
				Set <String> unresolvedImports = new HashSet <String>();
				Set <String> allImports = new HashSet <String>();
				int numJavaProblems = 0;

				for (IPackageFragment mypackage : packages) {
					if (mypackage.getKind() == IPackageFragmentRoot.K_SOURCE) {
						for (ICompilationUnit unit : mypackage
								.getCompilationUnits()) {

							// Turn JNI method declarations into stub methods
							ASTParserAddNativeMethodDeclaration astParserAddNativeMethod = new ASTParserAddNativeMethodDeclaration();
							astParserAddNativeMethod
									.run(unit);
							astParserAddNativeMethod.rewrite(
									astParserAddNativeMethod
											.getCompilationUnit(),
									astParserAddNativeMethod
											.getLocalStubMethodDetector()
											.getNativeMethodBindingManagers());
							this.parConversionInfoPage.addStubMethodInfo(
									astParserAddNativeMethod.getStubMethodInfo());

							// All imports
							IImportDeclaration[] thisImports = unit.getImports();
							for(IImportDeclaration node: thisImports){
								String importNodeName = node.getElementName();
								if(node.isOnDemand()){
									MptPluginConsole.warning(MptConstants.PARTIAL_CONVERSION_TAG,
											"The on demand import: '%1$s' is not supported in Partial Conversion mode",
											importNodeName);
									continue;
								}
								allImports.add(importNodeName);
							}

							// Unresolved imports
							IMarker[] markers = findJavaProblemMarkers(unit);
							numJavaProblems += markers.length;
							for (IMarker marker : markers) {
								int id = marker.getAttribute(IJavaModelMarker.ID,
										-1);
								
								if (id == IProblem.ImportNotFound){
									String[] args = Util
											.getProblemArgumentsFromMarker(marker
													.getAttribute(
															IJavaModelMarker.ARGUMENTS,
															""));
									unresolvedImports.add(args[0]);
								}
							}
						}
					}
				}

				if (!unresolvedImports.isEmpty()) {
					IPath templateFilePath = new Path(MayloonSDK.getSdkLocation()
							+ IPath.SEPARATOR
							+ MptConstants.MAYLOON_MISSCLASS_TEMPLATE_FILE);
					boolean AnnotationClassAddedFlag = false;
					for (String importName : allImports) {
						String outerClassName = outerClassName(importName);
						if (needStub(outerClassName, unresolvedImports)) {
							ProjectUtil.AddMissedClass2UserApp(
									templateFilePath, outerClassName, project,
									this.parConversionInfo);
							
							if(!AnnotationClassAddedFlag){
								ProjectUtil.AddAnnotationClass2UserApp(project);
								AnnotationClassAddedFlag = true;
							}
						}
					}
					parConversionInfoPage.addStubClassInfo(parConversionInfo);
					project.refreshLocal(IResource.DEPTH_INFINITE, null);
				}
			}
		} catch (JavaModelException e) {
			reportError(e);
		} catch (CoreException e) {
			reportError(e);
		} catch (MalformedTreeException e) {
			reportError(e);
		} 
	}	
	
	private void reportError(Exception e){
		MptPluginLogger.throwable(e);
		e.printStackTrace();
		MptPluginConsole
				.error(MptConstants.CONVERT_TAG,
						"Project '%1$s' could not be converted due to cause {%2$s}",
						project.getName(),
						e.getMessage());
	}

	private void convertFinish() throws CoreException{
		// TODO luqiang, add monitor for it.
		project.refreshLocal(IResource.DEPTH_INFINITE,
				null);
		
		MptPluginConsole
				.success(
						MptConstants.CONVERT_TAG,
						"Project '%1$s' has been converted successfully.",
						project.getName());
		if (originalAutoBuild){
			ProjectUtil.setAutoBuild(true);
		}
	}
	

	/**
	 * @return the project
	 */
	public IProject getProject() {
		return project;
	}

	/**
	 * @param project the project to set
	 */
	public void setProject(IProject project) {
		this.project = project;
	}

	private boolean partialConversionFlag = false;
	
	void enablePartialConversion(boolean enabled){
		partialConversionFlag = enabled;
	}
	
	public void setWizardDialog(ConvertWizardDialog dialog){
		this.wizardDialog = dialog;
	}
	
	public ConvertWizardDialog getWizardDialog(){
		return this.wizardDialog;
	}
}
