package com.intel.eclipse.mayloon.internal;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
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
import org.eclipse.jdt.core.dom.ImportDeclaration;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.NodeFinder;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.jdt.core.dom.rewrite.ListRewrite;
import org.eclipse.jdt.internal.compiler.ClassFile;
import org.eclipse.jdt.internal.compiler.CompilationResult;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.Document;
import org.eclipse.swt.widgets.Display;
import org.eclipse.text.edits.MalformedTreeException;
import org.eclipse.text.edits.TextEdit;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.ast.ASTParserAddNativeMethodDeclaration;
import com.intel.ide.eclipse.mpt.ast.ASTParserAddStubMethodDeclaration;
import com.intel.ide.eclipse.mpt.ast.ASTParserRemoveNativeMethodDeclaration;
import com.intel.ide.eclipse.mpt.ast.ASTParserRemoveStubMethodDeclaration;
import com.intel.ide.eclipse.mpt.ast.LocalNativeMethodDetector;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

public class MptCompilationParticipant extends CompilationParticipant {

	private IJavaProject selectedProject;
	Set<String> mayloonStubClassSet = null;

	@Override
	public boolean isActive(IJavaProject project) {
		selectedProject = project;
		if (mayloonStubClassSet == null) {
			mayloonStubClassSet = new HashSet<String>();
			getAndroidStubPackage(mayloonStubClassSet);
		}
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

									// for local native method
									// ASTParserAddNativeMethodDeclaration
									// astParserAddNativeMethod = new
									// ASTParserAddNativeMethodDeclaration();
									// astParserAddNativeMethod.run(unit);
									// astParserAddNativeMethod.rewrite(
									// astParserAddNativeMethod
									// .getCompilationUnit(),
									// astParserAddNativeMethod
									// .getLocalStubMethodDetector()
									// .getNativeMethodBindingManagers());

									// for local method
									ASTParserAddStubMethodDeclaration astParserAddStubMethod = new ASTParserAddStubMethodDeclaration();
									astParserAddStubMethod.run(unit);
									astParserAddStubMethod.rewrite(
											astParserAddStubMethod
													.getCompilationUnit(),
											astParserAddStubMethod
													.getLocalStubMethodDetector()
													.getStubMethodBindingManagers());

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

	private String getConstantName(IProblem fProblem) {
		int id = fProblem.getID();
		Field[] fields = IProblem.class.getFields();
		for (int i = 0; i < fields.length; i++) {
			Field f = fields[i];
			try {
				if (f.getType() == int.class && f.getInt(f) == id) {
					System.out.println("IProblem, id = " + fProblem.getID()
							+ ", name = " + f.getName());
					return "IProblem." + f.getName();
				}
			} catch (IllegalArgumentException e) {
			} catch (IllegalAccessException e) {
			}
		}
		return "<UNKNOWN CONSTANT>";
	}

	private String getErrorLabel(IProblem fProblem) {
		int id = fProblem.getID();
		StringBuffer buf = new StringBuffer();

		if ((id & IProblem.TypeRelated) != 0) {
			buf.append("TypeRelated + "); //$NON-NLS-1$
		}
		if ((id & IProblem.FieldRelated) != 0) {
			buf.append("FieldRelated + "); //$NON-NLS-1$
		}
		if ((id & IProblem.ConstructorRelated) != 0) {
			buf.append("ConstructorRelated + "); //$NON-NLS-1$
		}
		if ((id & IProblem.MethodRelated) != 0) {
			buf.append("MethodRelated + "); //$NON-NLS-1$
		}
		if ((id & IProblem.ImportRelated) != 0) {
			buf.append("ImportRelated + "); //$NON-NLS-1$
		}
		if ((id & IProblem.Internal) != 0) {
			buf.append("Internal + "); //$NON-NLS-1$
		}
		if ((id & IProblem.Syntax) != 0) {
			buf.append("Syntax + "); //$NON-NLS-1$
		}
		if ((id & IProblem.Javadoc) != 0) {
			buf.append("Javadoc + "); //$NON-NLS-1$
		}
		buf.append(id & IProblem.IgnoreCategoriesMask);

		buf.append(" = 0x").append(Integer.toHexString(id)).append(" = ")
				.append(id);

		System.out.println(buf);

		return buf.toString();
	}

	private String getImportPackageName(ASTNode astNode, IProblem problem,
			BuildContext context) {
		String packageName = "";

		ASTNode node = astNode.getParent();

		while (node != null) {
			if (node instanceof ImportDeclaration) {
				System.out.println("ImportDelcaration Node");
				String nodeString = node.toString();
				System.out.println("nodeString : " + nodeString);
				String importPrefix = "import ";
				packageName = nodeString.substring(importPrefix.length(),
						nodeString.indexOf(";"));
			}

			node = node.getParent();
		}

		return packageName;
	}

	private void generateMissedClassFile(String packageName) {
		String[] packageSplit = packageName.split("\\.");

		IProject project = selectedProject.getProject();

		IPath destFilePath = project.getLocation().append("src");

		for (int i = 0; i < packageSplit.length - 1; i++) {
			destFilePath = destFilePath.append(packageSplit[i]);
		}

		destFilePath = destFilePath
				.append(packageSplit[packageSplit.length - 1] + ".java");

		File file = new File(destFilePath.toOSString());
		file.getParentFile().mkdirs();
		try {
			file.createNewFile();
		} catch (IOException e) {
			System.out.println("Failed create " + destFilePath.toOSString());
			e.printStackTrace();
		}

		try {
			project.refreshLocal(IResource.DEPTH_INFINITE, null);
		} catch (CoreException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	// give error message when build project
	@SuppressWarnings("deprecation")
	@Override
	public void buildStarting(BuildContext[] files, boolean isBatch) {
		for (BuildContext context : files) {
			CompilationUnit ast = (CompilationUnit) createAstFromFile(context
					.getFile());
			IProblem[] problems = ast.getProblems();
			for (IProblem problem : problems) {
				if (problem.isError()) {
					// String args[] = problem.getArguments();
					// int source = problem.getSourceStart();

					// getConstantName(problem);

					// getErrorLabel(problem);

					ASTNode astNode = NodeFinder.perform(ast.getRoot(),
							problem.getSourceStart(), 0);
					astNode.getParent().getNodeType();
					int nodeType = astNode.getNodeType();
					System.out.println("Problem Node Type is : " + nodeType);

					// import related package extract
					if ((problem.getID() & IProblem.ImportRelated) != 0) {
						String packageName = getImportPackageName(astNode,
								problem, context);
						System.out.println("Miss pcakge name is : "
								+ packageName);

						// miss import class copy from mayloon SDK
						// generateMissedClassFile(packageName);
						boolean retVal = ProjectUtil
								.AddMissedAndroidClass2UserApp(packageName,
										selectedProject.getProject());

					}
				}
				try {
					selectedProject.getProject().refreshLocal(
							IResource.DEPTH_INFINITE, null);
				} catch (CoreException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

	}

	private void getAndroidStubPackage(Set<String> stubClassSet) {

		String mayloonSDKPath = MayloonSDK.getSdkLocation();

		File packageNameFile = new File(mayloonSDKPath + MptConstants.WS_ROOT
				+ MptConstants.ANDROID_RUNTIME_STUB_CLASS);
		JSONParser parser = new JSONParser();

		BufferedReader input;
		try {
			input = new BufferedReader(new FileReader(packageNameFile));
			try {

				Object obj = parser.parse(input);

				JSONArray jsonArray = (JSONArray) obj;
				Iterator<?> iterator = jsonArray.iterator();
				while (iterator.hasNext()) {
					stubClassSet.add(iterator.next().toString());
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
	private List<MptUnsupportedProblems> createProblems(final String fileName,
			final CompilationUnit ast) {
		final List<MptUnsupportedProblems> problems = new ArrayList<MptUnsupportedProblems>();

		ast.accept(new ASTVisitor() {
			@Override
			public boolean visit(MethodInvocation node) {
				MptUnsupportedProblems prom = new MptUnsupportedProblems(
						IStatus.ERROR, node.getName().toString(), fileName);
				int start = node.getStartPosition();
				prom.setSourceStart(start);
				prom.setSourceEnd(start + node.getLength());
				prom.setSourceLineNumber(ast.getLineNumber(start));
				problems.add(prom);
				return false;
			}
		});
		return problems;
	}

}
