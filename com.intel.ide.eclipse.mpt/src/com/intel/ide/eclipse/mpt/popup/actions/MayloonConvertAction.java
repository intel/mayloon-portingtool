package com.intel.ide.eclipse.mpt.popup.actions;

import java.util.Iterator;

import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IPackageFragmentRoot;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.swt.widgets.Display;
import org.eclipse.text.edits.MalformedTreeException;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.ast.ASTParserAddNativeMethodDeclaration;
import com.intel.ide.eclipse.mpt.builder.MayloonPropertiesBuilder;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;


public class MayloonConvertAction  implements IObjectActionDelegate {
	
	private ISelection selection;
	private IProject project;

	public MayloonConvertAction() {
		// TODO Auto-generated constructor stub
	}

	/*
	 * @see org.eclipse.ui.IActionDelegate#run(org.eclipse.jface.action.IAction)
	 */
	@SuppressWarnings("rawtypes")
	public void run(IAction action) {
		if(!MayloonSDK.isSdkLocationSet(true)) {
			return;
		}
		if (selection instanceof IStructuredSelection) {
			for (Iterator it = ((IStructuredSelection) selection).iterator(); it.hasNext();) {
				Object element = it.next();
				
				if (element instanceof IProject) {
					project = (IProject) element;
				} else if (element instanceof IAdaptable) {
					project = (IProject)((IAdaptable)element).getAdapter(IProject.class);
				}
				if (project != null) {
					try {
						if(ProjectUtil.isLibraryProject(project)) {
							MptPluginConsole.error(MptConstants.CONVERT_TAG, "Convert library project '%1$s' is not supported.", project.getName());
							return;
						}
						
						// luqiang, comment for test
//						if (!ProjectUtil.checkVersionMatch(project)) {
//							return;
//						}
						
						// generate .j2s configuration file
						// move to partial conversion complete
						// MayloonPropertiesBuilder.j2sPropBuild(project);
						
//						MayloonPropertiesBuilder.mayloonPropBuild(project);
//						
//						String deployMode = ProjectUtil.getDeployMode(project);
//						
//						ProjectUtil.backupProject(project);
//						
//						// get package name from AndroidManifest.xml
//						// packageName is [packageName], not include the main activity name.(not compatible with android internal implementation)
//						String packageName = ProjectUtil.extractPackageFromManifest(project);
//						
//						// merge j2s class path modify logic to it.
//						ProjectUtil.fixMayloonClassEntry(project);
//						
//						// merge j2s nature to it.
//						MayloonNature.addProjectNature(project);
//						
//						// copy mayloon framework resource and js library
//						ProjectUtil.addMayloonFrameworkFolder(project, deployMode, packageName);
//						
//						// copy android build output resource to /bin/apps/[package name]/
//						ProjectUtil.addAndroidOutput2Mayloon(project, deployMode, packageName, false);
//						
//						// clear android generated gen/ folder
//						ProjectUtil.clearAndroidGenFolder(project);
//						
//						// TODO luqiang, skip in this release
//						// ProjectUtil.addAntBuildSupport(project);	
						
						
						// Update the user interface asynchronously
						Display.getDefault().asyncExec(new Runnable() {
							public void run() {
								try {
//									IProject project = selectedProject.getProject();

									if (project
											.isNatureEnabled("org.eclipse.jdt.core.javanature")) {

										IPackageFragment[] packages = JavaCore.create(project)
												.getPackageFragments();
										// parse(JavaCore.create(project));
										for (IPackageFragment mypackage : packages) {
											if (mypackage.getKind() == IPackageFragmentRoot.K_SOURCE) {
												for (ICompilationUnit unit : mypackage
														.getCompilationUnits()) {
													
													// for local native method
													ASTParserAddNativeMethodDeclaration astParserAddNativeMethod = new ASTParserAddNativeMethodDeclaration();
													astParserAddNativeMethod.run(unit);									
													astParserAddNativeMethod.rewrite(astParserAddNativeMethod.getCompilationUnit(), astParserAddNativeMethod.getLocalStubMethodDetector().getNativeMethodBindingManagers());
													
													
													// for local method
//													ASTParserAddStubMethodDeclaration astParserAddStubMethod = new ASTParserAddStubMethodDeclaration();
//													astParserAddStubMethod.run(unit);									
//													astParserAddStubMethod.rewrite(astParserAddStubMethod.getCompilationUnit(), astParserAddStubMethod.getLocalStubMethodDetector().getStubMethodBindingManagers());

												}
											}
										}
									}
								} catch (JavaModelException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								} catch (CoreException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								} catch (MalformedTreeException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}

							}
						});
						
						
						// TODO luqiang, add monitor for it.
						project.refreshLocal(IResource.DEPTH_INFINITE, null);
						
						MptPluginConsole.general(MptConstants.CONVERT_TAG, "Project '%1$s' has been converted successfully.", project.getName());
					} catch (CoreException e) {
						MptPluginLogger.throwable(e);
						MptPluginConsole.error(MptConstants.CONVERT_TAG, "Project '%1$s' could not be converted due to cause {%2$s}", project.getName(), e.getMessage());
					}
				}
			}
		}
	}

	/* 
	 * @see org.eclipse.ui.IActionDelegate#selectionChanged(org.eclipse.jface.action.IAction,
	 *      org.eclipse.jface.viewers.ISelection)
	 */
	public void selectionChanged(IAction action, ISelection selection) {
		this.selection = selection;
		if (selection instanceof IStructuredSelection) {
			for (Iterator it = ((IStructuredSelection) selection).iterator(); it.hasNext();) {
				Object element = it.next();
				
				if (element instanceof IProject) {
					project = (IProject) element;
				}
			}
		}
	}

	/* 
	 * @see org.eclipse.ui.IObjectActionDelegate#setActivePart(org.eclipse.jface.action.IAction,
	 *      org.eclipse.ui.IWorkbenchPart)
	 */
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
	}
}
