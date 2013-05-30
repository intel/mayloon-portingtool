package com.intel.ide.eclipse.mpt.popup.actions;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceDescription;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.core.runtime.jobs.Job;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IPackageFragmentRoot;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.swt.widgets.Display;
import org.eclipse.text.edits.MalformedTreeException;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptException;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.ast.ASTParserAddNativeMethodDeclaration;
import com.intel.ide.eclipse.mpt.ast.LocalImportDeclaration;
import com.intel.ide.eclipse.mpt.builder.MayloonPropertiesBuilder;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;
import com.intel.ide.eclipse.mpt.project.MayloonProjectMessages;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

public class MayloonConvertAction implements IObjectActionDelegate {

	private ISelection selection;
	private IProject project;
	private Boolean originalAutoBuild;
	private Boolean finishFlag;

	public MayloonConvertAction() {
		// TODO Auto-generated constructor stub
	}

	private static CompilationUnit parse(ICompilationUnit unit) {
		ASTParser parser = ASTParser.newParser(AST.JLS3);
		parser.setKind(ASTParser.K_COMPILATION_UNIT);
		parser.setSource(unit);
		parser.setResolveBindings(true);
		return (CompilationUnit) parser.createAST(null); // parse
	}
	
	/*
	 * @see org.eclipse.ui.IActionDelegate#run(org.eclipse.jface.action.IAction)
	 */
	@SuppressWarnings("rawtypes")
	public void run(IAction action) {
		if (!MayloonSDK.isSdkLocationSet(true)) {
			return;
		}
		if (selection instanceof IStructuredSelection) {
			for (Iterator it = ((IStructuredSelection) selection).iterator(); it
					.hasNext();) {
				Object element = it.next();

				if (element instanceof IProject) {
					project = (IProject) element;
				} else if (element instanceof IAdaptable) {
					project = (IProject) ((IAdaptable) element)
							.getAdapter(IProject.class);
				}
				if (project != null) {
					// do convert and use monitor to show convert progress
					Job convertJob = new Job("Convert Project") {
						@Override
						protected IStatus run(IProgressMonitor monitor) {
							// 9 steps to convert project
							monitor.beginTask("Project converting...", 8);
							try {
								if (!ProjectUtil.checkAndroidApk(project)){
									throw new MptException(MptException.NO_APK);
								}
								
								if (!ProjectUtil.checkVersionMatch(project)) {
									throw new MptException(MayloonProjectMessages.Can_Not_Get_Mayloon_SDK_Version);
								}
								
								// disable AutoBuild
								originalAutoBuild = ProjectUtil.getAutoBuild();
								if(originalAutoBuild){
									ProjectUtil.setAutoBuild(false);
								}
								// generate .j2s configuration file
								MayloonPropertiesBuilder
										.mayloonPropBuild(project);
								MayloonPropertiesBuilder.j2sPropBuild(project);
								monitor.worked(1);

								String deployMode = ProjectUtil
										.getDeployMode(project);
								if(deployMode == null){
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
								ProjectUtil.addMayloonFrameworkFolder(project,
										deployMode, packageName);
								monitor.worked(1);

								// copy android build output resource to
								// /bin/apps/[package name]/
								ProjectUtil.addAndroidOutput2Mayloon(project,
										deployMode, packageName, false);
								monitor.worked(1);
								
								boolean partialConversionFlag = ProjectUtil.getPartialConversionMode();
								if(partialConversionFlag){
									// Update the user interface asynchronously
									finishFlag = false;
									partialConversionAsync();
								}
								
								// Add mayloon project builder to classpath
								MayloonNature.addMaloonProjectBuilder(project);
								monitor.worked(1);

								if(partialConversionFlag){
									finishFlag = true;
								}else{
									convertFinish();
								}
								// TODO luqiang, skip this release
								// ProjectUtil.addAntBuildSupport(project);
								
							} catch (CoreException e) {
								reportError(e);
							} catch (MptException e) {
								// TODO Auto-generated catch block
								reportError(e);
							}
							monitor.done();
							return Status.OK_STATUS;
						}
					};
					convertJob.setUser(true);
					convertJob.schedule();
				}
			}
		}
	}

	/*
	 * @see
	 * org.eclipse.ui.IActionDelegate#selectionChanged(org.eclipse.jface.action
	 * .IAction, org.eclipse.jface.viewers.ISelection)
	 */
	public void selectionChanged(IAction action, ISelection selection) {
		this.selection = selection;
		if (selection instanceof IStructuredSelection) {
			for (Iterator it = ((IStructuredSelection) selection).iterator(); it
					.hasNext();) {
				Object element = it.next();

				if (element instanceof IProject) {
					project = (IProject) element;
				}
			}
		}
	}

	/*
	 * @see
	 * org.eclipse.ui.IObjectActionDelegate#setActivePart(org.eclipse.jface.
	 * action.IAction, org.eclipse.ui.IWorkbenchPart)
	 */
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
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
									
									HashSet<String> mayloonStubClassSet = new HashSet<String>();
									ProjectUtil.getAndroidStubPackage(mayloonStubClassSet);
									
									LocalImportDeclaration localImportDeclaration = new LocalImportDeclaration();
									localImportDeclaration.process(parse(unit), project, mayloonStubClassSet);

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
}
