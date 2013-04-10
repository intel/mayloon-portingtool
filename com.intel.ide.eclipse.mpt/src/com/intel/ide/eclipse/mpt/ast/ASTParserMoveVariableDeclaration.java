package com.intel.ide.eclipse.mpt.ast;

import java.util.Collection;
import java.util.Map;

import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.rewrite.ASTRewrite;

/**
 * Main class of the "Move a variable declaration" example of the article. It
 * moves local variable declarations as near as possible to their first
 * reference. For more details check out in the article the section "Example" or
 * have a look at <a target="_blank"
 * href="http://www.javapractices.com/Topic126.cjp">Java Practices</a>. The
 * process is initiated by calling {@link #run(ICompilationUnit)}.
 *
 */
public class ASTParserMoveVariableDeclaration extends AbstractASTParser {

	/*
	 * (non-Javadoc)
	 *
	 * @see net.sourceforge.earticleast.app.AbstractASTArticle#run(org.eclipse.jdt.core.ICompilationUnit)
	 */
	public void run(ICompilationUnit lwUnit) {
		CompilationUnit unit = parse(lwUnit);
		LocalVariableDetector localVariableDetector = new LocalVariableDetector();
		localVariableDetector.process(unit);
		rewrite(unit, localVariableDetector.getLocalVariableManagers());

	}

	/**
	 * After all information about the local variables has been collected, the
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
	 * @param localVariableManagers
	 *            collected information about the local variables
	 */
	private void rewrite(CompilationUnit unit,
			Map<IVariableBinding, VariableBindingManager> localVariableManagers) {
		Collection<VariableBindingManager> managers = localVariableManagers
				.values();

		// new ASTDirectManipulator().manipulate(unit, managers);
		new ASTRewriteBasedManipulator().manipulateVariable(unit, managers);

	}
}
