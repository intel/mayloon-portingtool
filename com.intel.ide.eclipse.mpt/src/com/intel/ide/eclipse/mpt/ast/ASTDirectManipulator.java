package com.intel.ide.eclipse.mpt.ast;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;

/**
 * Changes a compilation unit by directly modifying the AST.
 *
 * <p>
 * Project page: <a target="_blank"
 * href="http://sourceforge.net/projects/earticleast">http://sourceforge.net/projects/earticleast</a>
 * </p>
 *
 * @author Thomas Kuhn
 */
public class ASTDirectManipulator extends AbstractManipulator {
	/*
	 * (non-Javadoc)
	 *
	 * @see net.sourceforge.earticleast.app.AbstractManipulator#beforeManipulate(org.eclipse.jdt.core.dom.CompilationUnit)
	 */
	@Override
	protected void beforeManipulate(CompilationUnit unit) {
		super.beforeManipulate(unit);
		unit.recordModifications(); // turn on recording
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see net.sourceforge.earticleast.app.AbstractManipulator#deleteOldVariableDeclaration(net.sourceforge.earticleast.app.VariableBindingManager)
	 */
	@Override
	protected void deleteOldVariableDeclaration(VariableBindingManager manager) {
		VariableDeclarationFragment fragment = manager
				.getVariableDeclarationFragment();
		VariableDeclarationStatement statement = (VariableDeclarationStatement) fragment
				.getParent();
		fragment.delete();
		if (statement.fragments().size() == 0) {
			statement.delete();
		}
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see net.sourceforge.earticleast.app.AbstractManipulator#addNewVariableDeclaration(net.sourceforge.earticleast.app.VariableBindingManager)
	 */
	@Override
	protected void addNewVariableDeclaration(VariableBindingManager manager) {
		AST ast = manager.getFirstReference().getAST();
		VariableDeclarationStatement statement = createNewVariableDeclarationStatement(
				manager, ast);
		int firstReferenceIndex = getFirstReferenceListIndex(manager);
		Block block = ASTUtil.getParentBlock(manager.getFirstReference());
		block.statements().add(firstReferenceIndex, statement);
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see net.sourceforge.earticleast.app.AbstractManipulator#afterManipulate(org.eclipse.jdt.core.dom.CompilationUnit)
	 */
	@Override
	protected void afterManipulate(CompilationUnit unit) {
		super.afterManipulate(unit);
		try {
			// write changes back to Java source code
			ManipulatorHelper.saveDirectlyModifiedUnit(unit);
		} catch (CoreException e) {
			e.printStackTrace();
		}
	}

	@Override
	protected void addNewNativeMethodDeclaration(
			NativeMethodBindingManager manager) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void deleteOldNativeMethodDeclaration(
			NativeMethodBindingManager manager) {
		// TODO Auto-generated method stub
		
	}
}
