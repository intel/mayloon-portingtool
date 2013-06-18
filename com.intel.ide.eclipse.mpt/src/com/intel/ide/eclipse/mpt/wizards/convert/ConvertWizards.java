package com.intel.ide.eclipse.mpt.wizards.convert;

import org.eclipse.swt.widgets.Composite;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashSet;
import java.util.Set;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IPackageFragmentRoot;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jface.operation.IRunnableWithProgress;
import org.eclipse.jface.wizard.IWizardPage;
import org.eclipse.jface.wizard.Wizard;
import org.eclipse.swt.widgets.Display;
import org.eclipse.text.edits.MalformedTreeException;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptException;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.ast.ASTParserAddNativeMethodDeclaration;
import com.intel.ide.eclipse.mpt.ast.LocalImportDeclaration;
import com.intel.ide.eclipse.mpt.builder.MayloonPropertiesBuilder;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;
import com.intel.ide.eclipse.mpt.project.MayloonProjectMessages;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

public class ConvertWizards extends Wizard {
	private IProject project;
	private CheckPreConvertPage checkPreConvertPage;
	private Boolean originalAutoBuild;
	private Boolean finishFlag;
	
	public ConvertWizards(IProject project){
		this.project = project;
		this.originalAutoBuild = false;
		this.finishFlag = false;
		this.setHelpAvailable(false);
		this.setNeedsProgressMonitor(true);
	}

	@Override
	public void addPages(){
		this.addPage(new StartConvertPage());
		this.addPage(this.checkPreConvertPage = new CheckPreConvertPage(this));
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
	    return (IWizardPage) wizardPages[index+1];
	}
	
	@Override
	public boolean canFinish(){
		if(!this.checkPreConvertPage.getErrorInfoSet().isEmpty()){
			return false;
		}
		return true;
	}
	
	@Override
	public boolean performFinish() {
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
			
			monitor.subTask("Reference project information");
			errorInfoSet.addAll(ProjectUtil.getReferencedCheckInfo(project));
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
				warningInfoSet = ProjectUtil.getVersionMatchCheckInfo(project);
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
			// 9 steps to convert project
			monitor.beginTask("Project converting...", 8);
			if (!ProjectUtil.checkAndroidApk(project)) {
				throw new MptException("can't get %1$s.apk file",
						project.getName());
			}

			if (!ProjectUtil.checkVersionMatch(project)) {
				throw new MptException(
						MayloonProjectMessages.Can_Not_Get_Mayloon_SDK_Version);
			}
			
			//check if one or more projects are referenced
			if (ProjectUtil.checkReferencedProjects(project)
				|| ProjectUtil.checkAndroidReferencedProjects(project)){
				throw new MptException("one or more projects are referenced");
			}								

			// disable AutoBuild
			originalAutoBuild = ProjectUtil.getAutoBuild();
			if (originalAutoBuild) {
				ProjectUtil.setAutoBuild(false);
			}
			// generate .j2s configuration file
			MayloonPropertiesBuilder.mayloonPropBuild(project);
			MayloonPropertiesBuilder.j2sPropBuild(project);
			monitor.worked(1);

			String deployMode = ProjectUtil.getDeployMode(project);
			if (deployMode == null) {
				throw new MptException(MptException.DEPLOY_MODE_ERROR);
			}

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
					packageName);
			monitor.worked(1);

			// copy android build output resource to
			// /bin/apps/[package name]/
			ProjectUtil.addAndroidOutput2Mayloon(project, deployMode,
					packageName, false);
			monitor.worked(1);

			if (partialConversionFlag) {
				// Update the user interface asynchronously
				finishFlag = false;
				partialConversionAsync();
			}

			// Add mayloon project builder to classpath
			MayloonNature.addMaloonProjectBuilder(project);
			monitor.worked(1);

			if (partialConversionFlag) {
				finishFlag = true;
			} else {
				convertFinish();
			}
		} catch (CoreException e) {
			reportError(e);
		} catch (MptException e) {
			reportError(e);
		}
	}
	

	private static CompilationUnit parse(ICompilationUnit unit) {
		ASTParser parser = ASTParser.newParser(AST.JLS3);
		parser.setKind(ASTParser.K_COMPILATION_UNIT);
		parser.setSource(unit);
		parser.setResolveBindings(true);
		return (CompilationUnit) parser.createAST(null); // parse
	}
	
	private void partialConversionAsync(){
		Display.getDefault().asyncExec(new Runnable() {
			public void run() {
				try {
					// IProject project =
					// selectedProject.getProject();

					if (project
							.isNatureEnabled("org.eclipse.jdt.core.javanature")) {

						IPackageFragment[] packages = JavaCore
								.create(project)
								.getPackageFragments();
						// parse(JavaCore.create(project));
						for (IPackageFragment mypackage : packages) {
							if (mypackage.getKind() == IPackageFragmentRoot.K_SOURCE) {
								for (ICompilationUnit unit : mypackage
										.getCompilationUnits()) {

									// for local native
									// method
									ASTParserAddNativeMethodDeclaration astParserAddNativeMethod = new ASTParserAddNativeMethodDeclaration();
									astParserAddNativeMethod
											.run(unit);
									astParserAddNativeMethod.rewrite(
											astParserAddNativeMethod
													.getCompilationUnit(),
											astParserAddNativeMethod
													.getLocalStubMethodDetector()
													.getNativeMethodBindingManagers());
									
									HashSet<String> mayloonJarClassSet = ProjectUtil.getMayloonJarClasses();
									
									LocalImportDeclaration localImportDeclaration = new LocalImportDeclaration();
									localImportDeclaration.process(parse(unit), project, mayloonJarClassSet);
									
									// for local method
									// ASTParserAddStubMethodDeclaration
									// astParserAddStubMethod
									// = new
									// ASTParserAddStubMethodDeclaration();
									// astParserAddStubMethod.run(unit);
									// astParserAddStubMethod.rewrite(astParserAddStubMethod.getCompilationUnit(),
									// astParserAddStubMethod.getLocalStubMethodDetector().getStubMethodBindingManagers());
								}
							}
						}
					}
					while (!finishFlag) {
						this.wait(1);
					}
					convertFinish();
				} catch (JavaModelException e) {
					reportError(e);
				} catch (CoreException e) {
					reportError(e);
				} catch (MalformedTreeException e) {
					reportError(e);
				} catch (InterruptedException e) {
					reportError(e);
				} catch (IOException e) {
					reportError(e);
				}

			}
		});
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

	/**
	 * @return the checkPreConvertPage
	 */
	public CheckPreConvertPage getCheckPreConvertPage() {
		return checkPreConvertPage;
	}

	/**
	 * @param checkPreConvertPage the checkPreConvertPage to set
	 */
	public void setCheckPreConvertPage(CheckPreConvertPage checkPreConvertPage) {
		this.checkPreConvertPage = checkPreConvertPage;
	}

	private boolean partialConversionFlag = false;
	
	void enablePartialConversion(boolean enabled){
		partialConversionFlag = enabled;
	}
}
