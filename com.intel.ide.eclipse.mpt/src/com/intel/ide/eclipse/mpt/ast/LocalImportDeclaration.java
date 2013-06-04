package com.intel.ide.eclipse.mpt.ast;

import java.io.File;
import java.util.HashSet;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.ImportDeclaration;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.sdk.MayloonSDK;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

/**
 * This class looks for local declarations of local variables, their assignmetns
 * and the references to them. <i>It is an example for how to extend
 * {@link ASTVisitor}.</i>
 * 
 */
public class LocalImportDeclaration extends ASTVisitor {
	boolean AnnotationClassAddedFlag;
	IProject project;
	HashSet<String> mayloonJarClassSet;
	HashSet<String> visitedNodeNameSet;

	/**
	 * Visits {@link ImportDeclaration} AST nodes.
	 * 
	 * @param node
	 *            the node to visit
	 */
	public boolean visit(ImportDeclaration node) {
		// if node is demand import, output warning information
		if (node.isOnDemand()) {
			MptPluginConsole.warning(MptConstants.PARTIAL_CONVERSION_TAG,
					"The on demand import: '%1$s.*' is not supported in Partial Conversion mode",
					node.getName());
			return true;
		}

		String importNodeName = node.getName().toString();

		IPath templateFilePath = new Path(MayloonSDK.getSdkLocation()
				+ IPath.SEPARATOR
				+ MptConstants.MAYLOON_MISSCLASS_TEMPLATE_FILE);

		if(!isImportNodeExisted(importNodeName)){
			ProjectUtil.AddMissedClass2UserApp(templateFilePath,
					importNodeName, project);
			if(!AnnotationClassAddedFlag){
				ProjectUtil.AddAnnotationClass2UserApp(project);
				AnnotationClassAddedFlag = true;
			}
		}
		visitedNodeNameSet.add(importNodeName);
		return true;
	}
	
	private boolean isImportNodeExisted(String importNodeName){
		// check whether this node has been visited 
		if (visitedNodeNameSet.contains(importNodeName)){
			return true;
		}
		
		//check whether this import node's class file is in mayloon.jar 
		String importNodeClassName = importNodeName + MptConstants.CLASS_FILE_EXTENSION;
		if (mayloonJarClassSet.contains(importNodeClassName)){
			return true;
		}
		
		//check whether this import node's java file is in project src folder
		String[] packageSplit = importNodeName.split("\\.");
		String importNodeJavaName = packageSplit[packageSplit.length - 1] 
				+ MptConstants.JAVA_FILE_EXTENSION;			
		IPath packageFolderPath = ProjectUtil.GetPackageLocation(packageSplit, project);
		File nodeJavaFile = new File(packageFolderPath.toOSString(), importNodeJavaName);
		if (nodeJavaFile.exists()){
			return true;
		}
		return false;
	}

	/**
	 * Starts the process.
	 * 
	 * @param unit
	 *            the AST root node. Bindings have to have been resolved.
	 */
	public void process(CompilationUnit unit, IProject project,
			HashSet<String> mayloonJarClassSet) {
		this.AnnotationClassAddedFlag = false;
		this.project = project;
		this.mayloonJarClassSet = mayloonJarClassSet;
		this.visitedNodeNameSet = new HashSet<String>();
		unit.accept(this);
	}

}
