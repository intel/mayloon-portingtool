package com.intel.ide.eclipse.mpt.ast;

import java.util.Collection;
import java.util.List;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.rewrite.ASTRewrite;

/**
 * The base class of the two AST manipulators. The implementations are
 * {@link ASTDirectManipulator} and {@link ASTRewriteBasedManipulator}. Both
 * subclasses lead to the same result, using different methods to change an AST.
 * 
 */
public abstract class AbstractManipulator {
	
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
	 * {@link #addNewNativeMethodDeclaration(StubMethodBindingManager)}.
	 *
	 * @param manager
	 *            the variable binding manager
	 */
	protected abstract void deleteOldNativeMethodDeclaration(
			NativeMethodBindingManager manager);
	
	/**
	 * The implementing class has to create and add a stub method declaration
	 * statement at the position before the first declaration of the method
	 * managed by the native mathod binding manager.
	 *
	 * @param manager
	 *            the variable binding manager
	 */
	protected abstract void addNewStubMethodDeclaration(
			StubMethodBindingManager manager);

	/**
	 * The implementing class has to delete the old, unsupported stub method
	 * declaration statment. A new statement will be added by
	 * {@link #addNewStubMethodDeclaration(StubMethodBindingManager)}.
	 *
	 * @param manager
	 *            the variable binding manager
	 */
	protected abstract void deleteOldStubMethodDeclaration(
			StubMethodBindingManager manager);

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
	 * {@link #deleteOldStubMethodDeclaration(StubMethodBindingManager)} and
	 * {@link #addNewStubMethodDeclaration(StubMethodBindingManager)}. 
	 *
	 * @param unit
	 *            the compilation unit that has to be manipulated
	 * @param managers
	 *            all variable binding managers for {@code unit}
	 */
	public void manipulateStubMethod4Remove(final CompilationUnit unit,
			Collection<StubMethodBindingManager> managers) {
		// pre-processing
		beforeManipulate(unit);

		for (StubMethodBindingManager manager : managers) {
			
			deleteOldStubMethodDeclaration(manager);
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
	 * Calls for every local stub method handled by managers the methods
	 * {@link #addNewStubMethodDeclaration(StubMethodBindingManager)}. 
	 *
	 * @param unit
	 *            the compilation unit that has to be manipulated
	 * @param managers
	 *            all variable binding managers for {@code unit}
	 */
	public void manipulateStubMethod4Add(final CompilationUnit unit,
			Collection<StubMethodBindingManager> managers) {
		// pre-processing
		beforeManipulate(unit);

		for (StubMethodBindingManager manager : managers) {
			addNewStubMethodDeclaration(manager);
		}

		// post-processing
		afterManipulate(unit);
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
	protected MethodDeclaration createNewMethodDeclaration(
			NativeMethodBindingManager manager, AST ast, ASTRewrite rewrite) {

		String methodName = manager.getNativeMethodDeclarationNode().getName().toString();
		
		Type fullType = manager.getNativeMethodDeclarationNode().getReturnType2();
		
		int modifier = manager.getNativeMethodDeclarationNode().getModifiers();
		
		// remove NATIVE
		int modifierWithoutNative = modifier & ~Modifier.NATIVE;
		
		List<?> parameters = manager.getNativeMethodDeclarationNode().parameters();
		
        return ASTUtil.generateStubMethodBody(rewrite.getAST(), methodName, fullType, modifierWithoutNative, parameters);
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
	protected MethodDeclaration createNewMethodDeclaration4Normal(
			StubMethodBindingManager manager, AST ast, ASTRewrite rewrite) {

		String methodName = manager.getStubMethodDeclarationNode().getName().toString();
		
		Type fullType = manager.getStubMethodDeclarationNode().getReturnType2();
		
		int modifier = manager.getStubMethodDeclarationNode().getModifiers();
		// remove NATIVE
//		int modifierWithoutNative = modifier & ~Modifier.NATIVE;
		
		List parameters = manager.getStubMethodDeclarationNode().parameters();
		
//        return ASTUtil.generateStubMethodBody(rewrite.getAST(), methodName, fullType, modifierWithoutNative, parameters);
        return ASTUtil.generateStubMethodBody(rewrite.getAST(), methodName, fullType, modifier, parameters);
	}
	
}