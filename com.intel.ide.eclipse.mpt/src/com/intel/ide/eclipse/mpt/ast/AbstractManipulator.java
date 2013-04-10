package com.intel.ide.eclipse.mpt.ast;

import java.util.Collection;
import java.util.List;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.jdt.core.dom.rewrite.ListRewrite;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.internal.corext.dom.ASTNodeFactory;

/**
 * The base class of the two AST manipulators. The implementations are
 * {@link ASTDirectManipulator} and {@link ASTRewriteBasedManipulator}. Both
 * subclasses lead to the same result, using different methods to change an AST.
 * 
 */
public abstract class AbstractManipulator {

	/**
	 * The implementing class has to create and add a variable declaration
	 * statement at the position before the first reference of the variable
	 * managed by the variable binding manager.
	 *
	 * @param manager
	 *            the variable binding manager
	 */
	protected abstract void addNewVariableDeclaration(
			VariableBindingManager manager);

	/**
	 * The implementing class has to delete the old, obselete variable
	 * declaration statment. A new statement will be added by
	 * {@link #addNewVariableDeclaration(VariableBindingManager)}.
	 *
	 * @param manager
	 *            the variable binding manager
	 */
	protected abstract void deleteOldVariableDeclaration(
			VariableBindingManager manager);
	
	/**
	 * The implementing class has to create and add a stub native method declaration
	 * statement at the position before the first declaration of the method
	 * managed by the native mathod binding manager.
	 *
	 * @param manager
	 *            the variable binding manager
	 */
	protected abstract void addNewNativeMethodDeclaration(
			NativeMethodBindingManager manager);

	/**
	 * The implementing class has to delete the old, unsupported native method
	 * declaration statment. A new statement will be added by
	 * {@link #addNewNativeMethodDeclaration(NativeMethodBindingManager)}.
	 *
	 * @param manager
	 *            the variable binding manager
	 */
	protected abstract void deleteOldNativeMethodDeclaration(
			NativeMethodBindingManager manager);

	/**
	 * Called from {@link #manipulate(CompilationUnit, Collection)} before any
	 * local variable is processed. While without effect in this class,
	 * subclasses may override and for pre-processing instructions.
	 *
	 * @param unit
	 *            the AST node that will be manipulated
	 */
	protected void afterManipulate(CompilationUnit unit) {
	}

	/**
	 * Called from {@link #manipulate(CompilationUnit, Collection)} after all
	 * local variables have been processed. While without effect in this class,
	 * subclasses may override and for post-processing instructions.
	 *
	 * @param unit
	 *            the AST node that has been manipulated
	 */
	protected void beforeManipulate(CompilationUnit unit) {
	}

	/**
	 * Calls for every local variable handled by managers the methods
	 * {@link #deleteOldVariableDeclaration(VariableBindingManager)} and
	 * {@link #addNewVariableDeclaration(VariableBindingManager)}. This "moves"
	 * the variable declaration statement to its intended place.
	 *
	 * @param unit
	 *            the compilation unit that has to be manipulated
	 * @param managers
	 *            all variable binding managers for {@code unit}
	 */
	public void manipulateVariable(final CompilationUnit unit,
			Collection<VariableBindingManager> managers) {
		// pre-processing
		beforeManipulate(unit);

		for (VariableBindingManager manager : managers) {
			if (manager.getFirstReference() == null) {
				// no reference found for variable -> leave definition as is
				continue;
			}
			deleteOldVariableDeclaration(manager);
			addNewVariableDeclaration(manager);
		}

		// post-processing
		afterManipulate(unit);
	}
	
	/**
	 * Calls for every local native method handled by managers the methods
	 * {@link #deleteOldNativeMethodDeclaration(NativeMethodBindingManager)} and
	 * {@link #addNewNativeMethodDeclaration(NativeMethodBindingManager)}. 
	 *
	 * @param unit
	 *            the compilation unit that has to be manipulated
	 * @param managers
	 *            all variable binding managers for {@code unit}
	 */
	public void manipulateNativeMethod4Remove(final CompilationUnit unit,
			Collection<NativeMethodBindingManager> managers) {
		// pre-processing
		beforeManipulate(unit);

		for (NativeMethodBindingManager manager : managers) {
			
			deleteOldNativeMethodDeclaration(manager);
//			addNewNativeMethodDeclaration(manager);
		}

		// post-processing
		afterManipulate(unit);
	}
	
	/**
	 * Calls for every local native method handled by managers the methods
	 * {@link #addNewNativeMethodDeclaration(NativeMethodBindingManager)}. 
	 *
	 * @param unit
	 *            the compilation unit that has to be manipulated
	 * @param managers
	 *            all variable binding managers for {@code unit}
	 */
	public void manipulateNativeMethod4Add(final CompilationUnit unit,
			Collection<NativeMethodBindingManager> managers) {
		// pre-processing
		beforeManipulate(unit);

		for (NativeMethodBindingManager manager : managers) {
			addNewNativeMethodDeclaration(manager);
		}

		// post-processing
		afterManipulate(unit);
	}

	/**
	 * Computes the index of the "first variable reference" (retrived from the
	 * variable binding manager) within the statement-list of its parent block.
	 *
	 * @param manager
	 *            the variable binding manager
	 * @return the index position within the statement list
	 */
	protected int getFirstReferenceListIndex(VariableBindingManager manager) {
		Block block = ASTUtil.getParentBlock(manager.getFirstReference());
		return block.statements().indexOf(manager.getFirstReference());
	}

	/**
	 * Creates a new {@link MethodDeclaration} with empty block.
	 *
	 * @param manager
	 *            the native method binding manager
	 * @param ast
	 *            used to create the new MethodDeclaration
	 * @return the created {@link MethodDeclaration}
	 */
	@SuppressWarnings("unchecked")
	protected MethodDeclaration createNewMethodDeclaration(
			NativeMethodBindingManager manager, AST ast, ASTRewrite rewrite) {

		String methodName = manager.getNativeMethodDeclarationNode().getName().toString();
		Type fullType = manager.getNativeMethodDeclarationNode().getReturnType2();
		int modifier = manager.getNativeMethodDeclarationNode().getModifiers();
		
		int modifierWithoutNative = modifier & ~Modifier.NATIVE;
		
		List parameters = manager.getNativeMethodDeclarationNode().parameters();
		
//        MethodDeclaration md = rewrite.getAST().newMethodDeclaration();
//        md.setName(rewrite.getAST().newSimpleName(methodName));
//        md.setConstructor(false);
//		  
//        md.modifiers().addAll(ASTNodeFactory.newModifiers(rewrite.getAST(),  ));
//        if (fullType.isPrimitiveType()) {
//        	System.out.println("returnType is : " + fullType.toString());
//        	PrimitiveType primitiveType = (PrimitiveType)fullType;
//        	//md.setReturnType2(rewrite.getAST().newPrimitiveType(PrimitiveType.INT));
//        	md.setReturnType2(rewrite.getAST().newPrimitiveType(primitiveType.getPrimitiveTypeCode()));
//        } else {
//        	md.setReturnType2(fullType);
//        }
//        
//        Block stubBlock = ast.newBlock();
//
//        md.setBody(stubBlock);

//        ListRewrite statements = rewrite.getListRewrite(md.getBody(),
//                Block.STATEMENTS_PROPERTY);
        
        return ASTUtil.generateStubMethodBody(rewrite.getAST(), methodName, fullType, modifierWithoutNative, parameters);
	}
	
	/**
	 * Creates a new {@link VariableDeclarationStatement}. As initializer
	 * figures a copy of the initializer retrieved from the variable binding
	 * manager. The variable name will be a copy of the variable declaration
	 * fragment name returned by the variable binding manager.
	 *
	 * @param manager
	 *            the variable binding manager
	 * @param ast
	 *            used to create the new statements
	 * @return the created {@link VariableDeclarationStatement}
	 */
	protected VariableDeclarationStatement createNewVariableDeclarationStatement(
			VariableBindingManager manager, AST ast) {
		// create an empty variable declaration fragment
		VariableDeclarationFragment fragment = ast
				.newVariableDeclarationFragment();

		// set the initilizer
		fragment.setInitializer((Expression) ASTNode.copySubtree(ast, manager
				.getInitializer()));

		// set the name
		fragment.setName((SimpleName) ASTNode.copySubtree(ast, manager
				.getVariableDeclarationFragment().getName()));

		// create a statement for the fragment
		VariableDeclarationStatement statement = ast
				.newVariableDeclarationStatement(fragment);

		// set the type of the variable declaration statement
		Type type = ((VariableDeclarationStatement) manager
				.getVariableDeclarationFragment().getParent()).getType();
		statement.setType((Type) ASTNode.copySubtree(ast, type));
		return statement;
	}
}