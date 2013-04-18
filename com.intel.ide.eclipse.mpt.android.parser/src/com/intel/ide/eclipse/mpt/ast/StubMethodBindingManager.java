package com.intel.ide.eclipse.mpt.ast;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.MethodDeclaration;


/**
 * A class that collects information about the declaration, the assignment of a
 * local variable and the first reference to a local variable.
 *
 */
public class StubMethodBindingManager {
	
	private final MethodDeclaration methodDeclarationNode;
	
	private int stubMethodLen = 0;
	
	private int stubMethodStartPosition = 0;

	/**
	 * Constructor.
	 *
	 * @param methodDeclarationNode
	 *            the method declaration of this manager
	 *            handles.
	 */
	public StubMethodBindingManager(MethodDeclaration methodDeclarationNode) {
		this.methodDeclarationNode = methodDeclarationNode;
		
		this.stubMethodLen = methodDeclarationNode.getLength();
		this.stubMethodStartPosition = methodDeclarationNode.getStartPosition();
		
		ASTNode astNode = methodDeclarationNode.getRoot();
		
		System.out.println("Stub Method, stubMethodLen = " + stubMethodLen + ", StubMethodStartPosition = " + stubMethodStartPosition);
	}

	/**
	 * Getter for the {@link methodDeclarationNode} provided as
	 * constructor parameter.
	 *
	 * @return the {@link methodDeclarationNode} of the method handled
	 *         by this manager
	 */
	public MethodDeclaration getStubMethodDeclarationNode() {
		return methodDeclarationNode;
	}

}
