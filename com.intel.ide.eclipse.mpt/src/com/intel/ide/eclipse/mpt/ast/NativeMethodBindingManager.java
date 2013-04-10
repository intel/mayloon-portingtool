package com.intel.ide.eclipse.mpt.ast;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.rewrite.ListRewrite;


/**
 * A class that collects information about the declaration, the assignment of a
 * local variable and the first reference to a local variable.
 *
 */
public class NativeMethodBindingManager {
	
	private final MethodDeclaration methodDeclarationNode;
	
	private int nativeMethodLen = 0;
	
	private int nativeMethodStartPosition = 0;

	/**
	 * Constructor.
	 *
	 * @param methodDeclarationNode
	 *            the method declaration of this manager
	 *            handles.
	 */
	public NativeMethodBindingManager(MethodDeclaration methodDeclarationNode) {
		this.methodDeclarationNode = methodDeclarationNode;
		
		this.nativeMethodLen = methodDeclarationNode.getLength();
		this.nativeMethodStartPosition = methodDeclarationNode.getStartPosition();
		
		ASTNode astNode = methodDeclarationNode.getRoot();
		
		System.out.println("Native Method, nativeMethodLen = " + nativeMethodLen + ", nativeMethodStartPosition = " + nativeMethodStartPosition);
	}

	/**
	 * Getter for the {@link methodDeclarationNode} provided as
	 * constructor parameter.
	 *
	 * @return the {@link methodDeclarationNode} of the method handled
	 *         by this manager
	 */
	public MethodDeclaration getNativeMethodDeclarationNode() {
		return methodDeclarationNode;
	}

}
