package com.intel.ide.eclipse.mpt.ast;

import java.util.Collection;
import java.util.Map;

import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.rewrite.ASTRewrite;

/**
 * Main class of the native method stub generator 
 *
 */
public class ASTParserRemoveNativeMethodDeclaration extends AbstractASTParser {

	/*
	 * (non-Javadoc)
	 *
	 */
	public void run(ICompilationUnit lwUnit) {
		CompilationUnit unit = parse(lwUnit);	
		LocalNativeMethodDetector localNativeMethod = new LocalNativeMethodDetector();
		localNativeMethod.process(unit);
		rewrite(unit, localNativeMethod.getNativeMethodBindingManagers());
		System.out.println("Remove done");
	}

	/**
	 * After all information about the native method has been collected, the
	 * compilation unit has to be modified. There are two ways to modify the
	 * compilation unit. Both of them lead to the same result. Switch betweeen
	 * one and the other by instantiating eiter
	 * {@link ASTRewriteBasedManipulator} or {@link ASTDirectManipulator}:
	 * <ol>
	 * <li>Using {@link ASTRewrite}: instantiate
	 * {@link ASTRewriteBasedManipulator}</li>
	 * <li>Directly modifying the node: instantiate
	 * {@link ASTDirectManipulator}</li>
	 * </ol>
	 *
	 * @param unit
	 *            AST root node that has to be modified
	 * @param localNativeMethodManagers
	 *            collected information about the native method
	 */
	private void rewrite(CompilationUnit unit,
			Map<IMethodBinding, NativeMethodBindingManager> localNativeMethodManagers) {
		Collection<NativeMethodBindingManager> managers = localNativeMethodManagers
				.values();

		// new ASTDirectManipulator().manipulate(unit, managers);
		new ASTRewriteBasedManipulator(unit).manipulateNativeMethod4Remove(unit, managers);
		
		//new ASTRewriteBasedManipulator().manipulateNativeMethod4Add(unit, managers);

	}
}
