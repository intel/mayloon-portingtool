package com.intel.ide.eclipse.mpt.ast;

import java.util.HashSet;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.ImportDeclaration;

import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

/**
 * This class looks for local declarations of local variables, their assignmetns
 * and the references to them. <i>It is an example for how to extend
 * {@link ASTVisitor}.</i>
 *
 */
public class LocalImportDeclaration extends ASTVisitor {
	IProject project;
	HashSet<String> mayloonStubClassSet;
	
	/**
	 * Visits {@link ImportDeclaration} AST nodes. 
	 *
	 * @param node
	 *            the node to visit
	 */
	public boolean visit(ImportDeclaration node) {
		
		String importNodeName = node.getName().toString();
		
		IPath templateFilePath = new Path(MayloonSDK.getSdkLocation() + IPath.SEPARATOR + "MissClassTemplate.java");
		
		if (mayloonStubClassSet.contains(importNodeName)) {
			ProjectUtil.AddMissedClass2UserApp(templateFilePath, importNodeName, project);
		}

		return true;
	}


	/**
	 * Starts the process.
	 *
	 * @param unit
	 *            the AST root node. Bindings have to have been resolved.
	 */
	public void process(CompilationUnit unit, IProject project, HashSet<String> mayloonStubClassSet) {
		this.project = project;
		this.mayloonStubClassSet = mayloonStubClassSet;
		unit.accept(this);
	}

}
