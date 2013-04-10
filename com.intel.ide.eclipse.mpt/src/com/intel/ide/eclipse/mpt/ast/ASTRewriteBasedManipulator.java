package com.intel.ide.eclipse.mpt.ast;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IPackageFragmentRoot;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.jdt.core.dom.rewrite.ListRewrite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.text.edits.MalformedTreeException;

/**
 * Records changes to an AST using {@link ASTRewrite}.
 *
 */
public class ASTRewriteBasedManipulator extends AbstractManipulator {
	private ASTRewrite mRewrite;
	private AST mAST;
	private CompilationUnit mUnit;

	/*
	 * (non-Javadoc)
	 *
	 * @see net.sourceforge.earticleast.app.AbstractManipulator#beforeManipulate(org.eclipse.jdt.core.dom.CompilationUnit)
	 */
	@Override
	protected void beforeManipulate(CompilationUnit unit) {
		super.beforeManipulate(unit);
		// create the rewrite instance for "unit"
		mAST = unit.getAST();
		mRewrite = ASTRewrite.create(mAST);
		mUnit = unit;
	}

	/*
	 * (non-Javadoc)
	 *
	 */
	@Override
	protected void addNewVariableDeclaration(VariableBindingManager manager) {
		VariableDeclarationFragment fragment = manager
				.getVariableDeclarationFragment();
		VariableDeclarationStatement statement = (VariableDeclarationStatement) fragment
				.getParent();
		// add a remove command to the protocol
		mRewrite.remove(fragment, null);
		ListRewrite fragmentsListRewrite = mRewrite.getListRewrite(statement,
				VariableDeclarationStatement.FRAGMENTS_PROPERTY);
		if (fragmentsListRewrite.getRewrittenList().size() == 0) {
			// add a remove command to the protocol
			mRewrite.remove(statement, null);
		}
	}

	/*
	 * (non-Javadoc)
	 *
	 */
	@Override
	protected void deleteOldVariableDeclaration(VariableBindingManager manager) {
		AST ast = manager.getFirstReference().getAST();
		VariableDeclarationStatement statement = createNewVariableDeclarationStatement(
				manager, ast);
		int firstReferenceIndex = getFirstReferenceListIndex(manager);
		Block block = ASTUtil.getParentBlock(manager.getFirstReference());
		// get the list rewriter for the statments list
		ListRewrite statementsListRewrite = mRewrite.getListRewrite(block,
				Block.STATEMENTS_PROPERTY);
		// add insert-at command to the protocol
		statementsListRewrite.insertAt(statement, firstReferenceIndex, null);
	}

	/*
	 * (non-Javadoc)
	 *
	 */
	@Override
	protected void afterManipulate(CompilationUnit unit) {
		super.afterManipulate(unit);
		try {
			// write changes back to Java source code
			ManipulatorHelper.saveASTRewriteContents(unit, mRewrite);
		} catch (CoreException e) {
			e.printStackTrace();
		}
	}
	
	/*
	 * (non-Javadoc)
	 *
	 */
	@Override
	protected void addNewNativeMethodDeclaration(NativeMethodBindingManager manager) {
		
		MethodDeclaration methodDecl = manager.getNativeMethodDeclarationNode();		
		
		MethodDeclaration methodStub = createNewMethodDeclaration(
				manager, mAST, mRewrite);
		
		ListRewrite listRewrite  = mRewrite.getListRewrite(methodDecl, MethodDeclaration.MODIFIERS2_PROPERTY);
		
		listRewrite.insertAt(methodStub, 0, null);
	}

	/*
	 * (non-Javadoc)
	 *
	 */
	@Override
	protected void deleteOldNativeMethodDeclaration(NativeMethodBindingManager manager) {		
		mRewrite.remove(manager.getNativeMethodDeclarationNode(), null);	
	}
	
}
