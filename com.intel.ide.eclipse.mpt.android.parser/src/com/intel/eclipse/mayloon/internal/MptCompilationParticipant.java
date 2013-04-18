package com.intel.eclipse.mayloon.internal;

import java.io.IOException;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IPackageFragmentRoot;
import org.eclipse.jdt.core.IProblemRequestor;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.WorkingCopyOwner;
import org.eclipse.jdt.core.compiler.BuildContext;
import org.eclipse.jdt.core.compiler.CompilationParticipant;
import org.eclipse.jdt.core.compiler.IProblem;
import org.eclipse.jdt.core.compiler.ReconcileContext;


import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.swt.widgets.Display;
import org.eclipse.text.edits.MalformedTreeException;

import com.intel.ide.eclipse.mpt.ast.ASTParserAddNativeMethodDeclaration;
import com.intel.ide.eclipse.mpt.ast.ASTParserAddStubMethodDeclaration;
import com.intel.ide.eclipse.mpt.ast.ASTParserRemoveNativeMethodDeclaration;

public class MptCompilationParticipant extends CompilationParticipant {

	private IJavaProject selectedProject;

	@Override
	public boolean isActive(IJavaProject project) {
		selectedProject = project;
		return true;
	}

	// give error message when save file
	@Override
	public void reconcile(ReconcileContext context) {
		return;
	}

	private static CompilationUnit parse(ICompilationUnit unit) {
		ASTParser parser = ASTParser.newParser(AST.JLS3);
		parser.setKind(ASTParser.K_COMPILATION_UNIT);
		parser.setSource(unit);
		parser.setResolveBindings(true);
		return (CompilationUnit) parser.createAST(null); // parse
	}

	private void CreateStub() throws MalformedTreeException,
			BadLocationException, CoreException, IOException {

		// Update the user interface asynchronously
		Display.getDefault().asyncExec(new Runnable() {
			public void run() {
				try {
					IProject project = selectedProject.getProject();

					if (project
							.isNatureEnabled("org.eclipse.jdt.core.javanature")) {

						IPackageFragment[] packages = JavaCore.create(project)
								.getPackageFragments();
						// parse(JavaCore.create(project));
						for (IPackageFragment mypackage : packages) {
							if (mypackage.getKind() == IPackageFragmentRoot.K_SOURCE) {
								for (ICompilationUnit unit : mypackage
										.getCompilationUnits()) {
									// for local method
									ASTParserAddStubMethodDeclaration astParserAddStubMethod = new ASTParserAddStubMethodDeclaration();
									astParserAddStubMethod.run(unit);									
									astParserAddStubMethod.rewrite(astParserAddStubMethod.getCompilationUnit(), astParserAddStubMethod.getLocalStubMethodDetector().getStubMethodBindingManagers());

								}
							}
						}
					}
					
					
					// change native method
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

	}

	// give error message when build project
	@Override
	public void buildStarting(BuildContext[] files, boolean isBatch) {
		try {
			CreateStub();
		} catch (MalformedTreeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (BadLocationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (CoreException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
