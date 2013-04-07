package com.intel.eclipse.mayloon.internal;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IStatus;
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
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.jdt.core.dom.rewrite.ListRewrite;
import org.eclipse.jdt.internal.compiler.ClassFile;
import org.eclipse.jdt.internal.compiler.CompilationResult;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.Document;
import org.eclipse.text.edits.MalformedTreeException;
import org.eclipse.text.edits.TextEdit;

public class MptCompilationParticipant extends CompilationParticipant {

	/**
	 * ICompilerRequestor implementation
	 */
	static private class CompileRequestorImpl implements
			org.eclipse.jdt.internal.compiler.ICompilerRequestor {

		private List problems;
		private List classes;

		public CompileRequestorImpl() {
			this.problems = new ArrayList();
			this.classes = new ArrayList();
		}

		public void acceptResult(CompilationResult result) {
			boolean errors = false;
			if (result.hasProblems()) {
				IProblem[] problems = result.getProblems();
				for (int i = 0; i < problems.length; i++) {
					if (problems[i].isError())
						errors = true;

					this.problems.add(problems[i]);
				}
			}
			if (!errors) {
				ClassFile[] classFiles = result.getClassFiles();
				for (int i = 0; i < classFiles.length; i++)
					this.classes.add(classFiles[i]);
			}
		}

		List getProblems() {
			return this.problems;
		}

		List getResults() {
			return this.classes;
		}

	}

	@Override
	public boolean isActive(IJavaProject project) {
		return true;
	}

	// give error message when save file
	@Override
	public void reconcile(ReconcileContext context) {
		CompilationUnit ast;
		try {
			ast = context.getAST3();
			if (ast == null) {
				return;
			}
		} catch (JavaModelException e) {
			return;
		}

		// String fileName = context.getWorkingCopy().getElementName();
		// List<MyProblems> problems = createProblems(fileName, ast);
		// context.putProblems(MyProblems.MARKER_ID,
		// problems.toArray(new MyProblems[problems.size()]));
	}

	private static CompilationUnit parse(ICompilationUnit unit) {
		ASTParser parser = ASTParser.newParser(AST.JLS3);
		parser.setKind(ASTParser.K_COMPILATION_UNIT);
		parser.setSource(unit);
		parser.setResolveBindings(true);
		return (CompilationUnit) parser.createAST(null); // parse
	}

	private void AddBlankLine() throws MalformedTreeException,
			BadLocationException, CoreException, IOException {

		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		IWorkspaceRoot root = workspace.getRoot();
		// Get all projects in the workspace
		IProject[] projects = root.getProjects();
		// Loop over all projects
		for (IProject project : projects) {
			try {
				if (project.isNatureEnabled("org.eclipse.jdt.core.javanature")) {

					IPackageFragment[] packages = JavaCore.create(project)
							.getPackageFragments();
					// parse(JavaCore.create(project));
					for (IPackageFragment mypackage : packages) {
						if (mypackage.getKind() == IPackageFragmentRoot.K_SOURCE) {
							for (ICompilationUnit unit : mypackage
									.getCompilationUnits()) {
								// Now create the AST for the ICompilationUnits

								// parse compilation unit
								CompilationUnit astRoot = parse(unit);

								// create a ASTRewrite
								AST ast = astRoot.getAST();
								ASTRewrite rewriter = ASTRewrite.create(ast);

								// for getting insertion position
								TypeDeclaration typeDecl = (TypeDeclaration) astRoot
										.types().get(0);
								
								if (typeDecl.getMethods().length != 0) {
									MethodDeclaration methodDecl = typeDecl
											.getMethods()[0];
									Block block = methodDecl.getBody();

									ListRewrite listRewrite = rewriter
											.getListRewrite(block,
													Block.STATEMENTS_PROPERTY);
									// notice here, we just create a string
									// placeholder, and string is simply as empty
									Statement placeHolder = (Statement) rewriter
											.createStringPlaceholder(
													"int test_temp = 0;",
													ASTNode.EXPRESSION_STATEMENT);
									listRewrite.insertFirst(placeHolder, null);

									TextEdit edits = rewriter.rewriteAST();

									// apply the text edits to the compilation unit
									Document document = new Document(
											unit.getSource());

									edits.apply(document);

									// this is the code for adding statements
									unit.getBuffer().setContents(document.get());

									System.out.println("done");
								} else {
									System.out.println("No method is defined in " + typeDecl.getName().toString());
								}
								
								
							}
						}
					}
				}
			} catch (CoreException e) {
				e.printStackTrace();
			} catch (MalformedTreeException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (BadLocationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	// give error message when build project
	@Override
	public void buildStarting(BuildContext[] files, boolean isBatch) {
		for (BuildContext context : files) {
			String fileNAme = context.getFile().getName();
			CompilationUnit ast = (CompilationUnit) createAstFromFile(context
					.getFile());

			// create requestor for accumulating discovered problems
			IProblemRequestor problemRequestor = new IProblemRequestor() {
				public void acceptProblem(IProblem problem) {
					System.out.println(problem.getID() + ": "
							+ problem.getMessage());
				}

				public void beginReporting() {
				}

				public void endReporting() {
				}

				public boolean isActive() {
					return true;
				} // will detect problems if active
			};

			// use working copy to hold source with error
			try {
				ICompilationUnit cu = JavaCore
						.createCompilationUnitFrom(context.getFile());
				cu.getWorkingCopy(new WorkingCopyOwner() {
				}, problemRequestor, null);
			} catch (JavaModelException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// List<MyProblems> problems = createProblems(fileNAme, ast);
			// context.recordNewProblems(
			// problems.toArray(new MyProblems[problems.size()]));
		}

		try {
			AddBlankLine();
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

	// AST generate
	private CompilationUnit createAstFromFile(IFile file) {
		ICompilationUnit cu = JavaCore.createCompilationUnitFrom(file);
		ASTParser parser = ASTParser.newParser(AST.JLS3);
		parser.setSource(cu);
		parser.setResolveBindings(true);
		CompilationUnit ast = (CompilationUnit) parser
				.createAST(new NullProgressMonitor());
		return ast;
	}

	// generate error message from AST
	// private List<MyProblems> createProblems(final String fileName,
	// final CompilationUnit ast) {
	// final List<MyProblems> problems = new ArrayList<MyProblems>();
	//
	// ast.accept(new ASTVisitor() {
	// @Override
	// public boolean visit(MethodInvocation node) {
	// MyProblems prom = new MyProblems(IStatus.WARNING, node
	// .getName().toString(), fileName);
	// int start = node.getStartPosition();
	// prom.setSourceStart(start);
	// prom.setSourceEnd(start + node.getLength());
	// prom.setSourceLineNumber(ast.getLineNumber(start));
	// problems.add(prom);
	// return false;
	// }
	// });
	// return problems;
	// }

}
