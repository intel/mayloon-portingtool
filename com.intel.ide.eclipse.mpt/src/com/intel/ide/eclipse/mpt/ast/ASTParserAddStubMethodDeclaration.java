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
public class ASTParserAddStubMethodDeclaration extends AbstractASTParser {
	LocalStubMethodDetector localStubMethod = new LocalStubMethodDetector();
	CompilationUnit unit = null;
	ASTRewriteBasedManipulator astRewriteBasedManipulator = null;
	
	/*
	 * (non-Javadoc)
	 *
	 */
	public void run(ICompilationUnit lwUnit) {
		unit = parse(lwUnit);
		localStubMethod.process(unit);
		astRewriteBasedManipulator = new ASTRewriteBasedManipulator(unit);
	}
	
	/*
	 * Return LocalStubMethodDetector
	 *
	 */
	public LocalStubMethodDetector getLocalStubMethodDetector() {
		return localStubMethod;
	}
	
	/*
	 * Return CompilationUnit
	 *
	 */
	public CompilationUnit getCompilationUnit() {
		return unit;
	}
	
	/*
	 * Return ASTRewriteBasedManipulator
	 *
	 */
	public ASTRewriteBasedManipulator getASTRewriteBasedManipulator() {
		return astRewriteBasedManipulator;
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
	public void rewrite(CompilationUnit unit,
			Map<IMethodBinding, StubMethodBindingManager> localStubMethodManagers) {
		Collection<StubMethodBindingManager> managers = localStubMethodManagers
				.values();

		
		astRewriteBasedManipulator.manipulateStubMethod4Add(unit, managers);

	}
}
