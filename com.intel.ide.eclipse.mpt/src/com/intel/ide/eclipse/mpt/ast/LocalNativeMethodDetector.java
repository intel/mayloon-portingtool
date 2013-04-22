package com.intel.ide.eclipse.mpt.ast;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeParameter;

/**
 * This class looks for local declarations of local variables, their assignmetns
 * and the references to them. <i>It is an example for how to extend
 * {@link ASTVisitor}.</i>
 *
 */
public class LocalNativeMethodDetector extends ASTVisitor {
	Map<IMethodBinding, NativeMethodBindingManager> localNativeMethodManagers = new HashMap<IMethodBinding, NativeMethodBindingManager>();
	
	/**
	 * Visits {@link MethodDeclaration} AST nodes. 
	 *
	 * @param node
	 *            the node to visit
	 */
	public boolean visit(MethodDeclaration node) {
		List<TypeParameter> listTypeParameters = node.typeParameters();
		
		Type returnType = node.getReturnType2();
		
		int iModifier = node.getModifiers();
		
		if (isMethodNativeIgnored(iModifier)) {
			// save to localNativeMethodManagers
			
			IMethodBinding methodBinding = node.resolveBinding();
			NativeMethodBindingManager nativeMethodManager = new NativeMethodBindingManager(node);
			localNativeMethodManagers.put(methodBinding, nativeMethodManager);
		}
		
		return true;
	}

	/**
	 * Getter for the resulting map.
	 *
	 * @return a map with Method bindings as keys and
	 *         {@link NativeMethodBindingManager} as values
	 */
	public Map<IMethodBinding, NativeMethodBindingManager> getNativeMethodBindingManagers() {
		return localNativeMethodManagers;
	}

	/**
	 * Starts the process.
	 *
	 * @param unit
	 *            the AST root node. Bindings have to have been resolved.
	 */
	public void process(CompilationUnit unit) {
		unit.accept(this);
	}
	
	/**
	 * Check the Method whether is native method
	 * 
	 * @param modifiers
	 * @return
	 */
	protected boolean isMethodNativeIgnored(int modifiers) {
		if ((modifiers & Modifier.NATIVE) == Modifier.NATIVE) {
			return true;
		}
		return false;
	}

}
