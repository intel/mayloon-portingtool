/*******************************************************************************
 * Copyright (c) 2000, 2013 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     Renaud Waldura &lt;renaud+eclipse@waldura.com&gt; - New class/interface with wizard
 *     Rabea Gransberger <rgransberger@gmx.de> - [quick fix] Fix several visibility issues - https://bugs.eclipse.org/394692
 *******************************************************************************/
package com.intel.ide.eclipse.mpt.ast;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.ITypeRoot;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.Signature;
import org.eclipse.jdt.core.dom.ASTMatcher;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.CastExpression;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.IPackageBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.ImportDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.ParenthesizedExpression;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.StructuralPropertyDescriptor;
import org.eclipse.jdt.core.dom.SuperConstructorInvocation;
import org.eclipse.jdt.core.dom.SuperFieldAccess;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
import org.eclipse.jdt.core.dom.SwitchCase;
import org.eclipse.jdt.core.dom.SwitchStatement;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.rewrite.ImportRewrite;
import org.eclipse.jdt.core.refactoring.CompilationUnitChange;
import org.eclipse.jdt.internal.corext.codemanipulation.StubUtility;
import org.eclipse.jdt.internal.corext.dom.ASTNodes;
import org.eclipse.jdt.internal.corext.dom.Bindings;
import org.eclipse.jdt.internal.corext.util.JavaModelUtil;
import org.eclipse.jdt.internal.corext.util.Messages;
import org.eclipse.jdt.internal.ui.JavaPluginImages;
import org.eclipse.jdt.internal.ui.text.correction.ASTResolving;
import org.eclipse.jdt.internal.ui.text.correction.CorrectionMessages;
import org.eclipse.jdt.internal.ui.text.correction.SimilarElementsRequestor;
import org.eclipse.jdt.internal.ui.text.correction.proposals.AddArgumentCorrectionProposal;
import org.eclipse.jdt.internal.ui.text.correction.proposals.CastCorrectionProposal;
import org.eclipse.jdt.internal.ui.text.correction.proposals.ChangeMethodSignatureProposal;
import org.eclipse.jdt.internal.ui.text.correction.proposals.ChangeMethodSignatureProposal.ChangeDescription;
import org.eclipse.jdt.internal.ui.text.correction.proposals.ChangeMethodSignatureProposal.EditDescription;
import org.eclipse.jdt.internal.ui.text.correction.proposals.ChangeMethodSignatureProposal.InsertDescription;
import org.eclipse.jdt.internal.ui.text.correction.proposals.ChangeMethodSignatureProposal.RemoveDescription;
import org.eclipse.jdt.internal.ui.text.correction.proposals.LinkedCorrectionProposal;
import org.eclipse.jdt.internal.ui.text.correction.proposals.NewMethodCorrectionProposal;
import org.eclipse.jdt.internal.ui.text.correction.proposals.NewVariableCorrectionProposal;
import org.eclipse.jdt.internal.ui.viewsupport.BasicElementLabels;
import org.eclipse.jdt.internal.ui.viewsupport.JavaElementImageProvider;
import org.eclipse.jdt.ui.JavaElementImageDescriptor;
import org.eclipse.jdt.ui.text.java.IInvocationContext;
import org.eclipse.jdt.ui.text.java.IProblemLocation;
import org.eclipse.swt.graphics.Image;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPluginConsole;

public class UnresolvedElementsSubProcessor {

	public static void getVariableProposals(IInvocationContext context, IProblemLocation problem, IVariableBinding resolvedField, Map<String, Map> proposals) throws CoreException {

		ICompilationUnit cu= context.getCompilationUnit();

		CompilationUnit astRoot= context.getASTRoot();
		ASTNode selectedNode= problem.getCoveredNode(astRoot);
		if (selectedNode == null) {
			return;
		}

		// type that defines the variable
		ITypeBinding binding= null;
		ITypeBinding declaringTypeBinding= Bindings.getBindingOfParentTypeContext(selectedNode);
		if (declaringTypeBinding == null) {
			return;
		}

		// possible type kind of the node
		boolean suggestVariableProposals= true;
		while (selectedNode instanceof ParenthesizedExpression) {
			selectedNode= ((ParenthesizedExpression) selectedNode).getExpression();
		}


		Name node= null;

		switch (selectedNode.getNodeType()) {
			case ASTNode.SIMPLE_NAME:
				node= (SimpleName) selectedNode;
				ASTNode parent= node.getParent();
				StructuralPropertyDescriptor locationInParent= node.getLocationInParent();
				if (locationInParent == MethodInvocation.EXPRESSION_PROPERTY) {
				} else if (locationInParent == FieldAccess.NAME_PROPERTY) {
					Expression expression= ((FieldAccess) parent).getExpression();
					if (expression != null) {
						binding= expression.resolveTypeBinding();
						if (binding == null) {
							node= null;
						}
					}
				} else if (parent instanceof SimpleType) {
					suggestVariableProposals= false;
				} else if (parent instanceof QualifiedName) {
					Name qualifier= ((QualifiedName) parent).getQualifier();
					if (qualifier != node) {
						binding= qualifier.resolveTypeBinding();
					} else {
					}
					ASTNode outerParent= parent.getParent();
					while (outerParent instanceof QualifiedName) {
						outerParent= outerParent.getParent();
					}
					if (outerParent instanceof SimpleType) {
						suggestVariableProposals= false;
					}
				} else if (locationInParent == SwitchCase.EXPRESSION_PROPERTY) {
					ITypeBinding switchExp= ((SwitchStatement) node.getParent().getParent()).getExpression().resolveTypeBinding();
					if (switchExp != null && switchExp.isEnum()) {
						binding= switchExp;
					}
				} else if (locationInParent == SuperFieldAccess.NAME_PROPERTY) {
					binding= declaringTypeBinding.getSuperclass();
				}
				break;
			case ASTNode.QUALIFIED_NAME:
				QualifiedName qualifierName= (QualifiedName) selectedNode;
				ITypeBinding qualifierBinding= qualifierName.getQualifier().resolveTypeBinding();
				if (qualifierBinding != null) {
					node= qualifierName.getName();
					binding= qualifierBinding;
				} else {
					node= qualifierName.getQualifier();
					suggestVariableProposals= node.isSimpleName();
				}
				if (selectedNode.getParent() instanceof SimpleType) {
					suggestVariableProposals= false;
				}
				break;
			case ASTNode.FIELD_ACCESS:
				FieldAccess access= (FieldAccess) selectedNode;
				Expression expression= access.getExpression();
				if (expression != null) {
					binding= expression.resolveTypeBinding();
					if (binding != null) {
						node= access.getName();
					}
				}
				break;
			case ASTNode.SUPER_FIELD_ACCESS:
				binding= declaringTypeBinding.getSuperclass();
				node= ((SuperFieldAccess) selectedNode).getName();
				break;
			default:
		}

		if (node == null) {
			return;
		}

		if (!suggestVariableProposals) {
			return;
		}

		SimpleName simpleName= node.isSimpleName() ? (SimpleName) node : ((QualifiedName) node).getName();
		boolean isWriteAccess= ASTResolving.isWriteAccess(node);

		if (resolvedField == null || binding == null || resolvedField.getDeclaringClass() != binding.getTypeDeclaration() && Modifier.isPrivate(resolvedField.getModifiers())) {

			// new fields
			addNewFieldProposals(cu, astRoot, binding, declaringTypeBinding, simpleName, isWriteAccess, proposals);
		}
	}

	private static void addNewFieldProposals(ICompilationUnit cu, CompilationUnit astRoot, ITypeBinding binding, ITypeBinding declaringTypeBinding, SimpleName simpleName, boolean isWriteAccess, Map<String, Map> proposals) throws JavaModelException {
		// new variables
		ICompilationUnit targetCU;
		ITypeBinding senderDeclBinding;
		if (binding != null) {
			senderDeclBinding= binding.getTypeDeclaration();
			targetCU= ASTResolving.findCompilationUnitForBinding(cu, astRoot, senderDeclBinding);
		} else { // binding is null for accesses without qualifier
			senderDeclBinding= declaringTypeBinding;
			targetCU= cu;
		}

		if (!senderDeclBinding.isFromSource() || targetCU == null) {
			return;
		}

		boolean mustBeConst= ASTResolving.isInsideModifiers(simpleName);

		addNewFieldForType(targetCU, binding, senderDeclBinding, simpleName, isWriteAccess, mustBeConst, proposals);

		if (binding == null && senderDeclBinding.isNested()) {
			ASTNode anonymDecl= astRoot.findDeclaringNode(senderDeclBinding);
			if (anonymDecl != null) {
				ITypeBinding bind= Bindings.getBindingOfParentType(anonymDecl.getParent());
				if (!bind.isAnonymous()) {
					addNewFieldForType(targetCU, bind, bind, simpleName, isWriteAccess, mustBeConst, proposals);
				}
			}
		}
	}

	private static void addNewFieldForType(final ICompilationUnit targetCU, ITypeBinding binding, ITypeBinding senderDeclBinding, SimpleName simpleName, boolean isWriteAccess, boolean mustBeConst, Map<String, Map> proposals) {
		String name= simpleName.getIdentifier();
		String nameLabel= BasicElementLabels.getJavaElementName(name);
		String label;
		Image image = null;
		String fqName = targetCU.findPrimaryType().getFullyQualifiedName();
		Map proposalMap = proposals.get(fqName);
		
		if (proposalMap == null){
		    MptPluginConsole.general(MptConstants.PARTIAL_CONVERSION_TAG, "Skip adding field for " + fqName);
		    return;
		}
		
		if (senderDeclBinding.isEnum() && !isWriteAccess) {
			label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_createenum_description, new Object[] { nameLabel, ASTResolving.getTypeSignature(senderDeclBinding) });
			NewVariableCorrectionProposal p = new NewVariableCorrectionProposal(label, targetCU, NewVariableCorrectionProposal.ENUM_CONST, simpleName, senderDeclBinding, 10, image);
			
			proposalMap.put(name, p);
		} else {
		    int fieldType = NewVariableCorrectionProposal.FIELD;
			if (!isWriteAccess && !senderDeclBinding.isAnonymous()) {
			     fieldType = NewVariableCorrectionProposal.CONST_FIELD;
			}
            if (binding == null) {
                label = Messages.format(
                        CorrectionMessages.UnresolvedElementsSubProcessor_createfield_description,
                        nameLabel);
                // image=
                // JavaPluginImages.get(JavaPluginImages.IMG_FIELD_PRIVATE);
            } else {
                label = Messages
                        .format(CorrectionMessages.UnresolvedElementsSubProcessor_createfield_other_description,
                                new Object[] {
                                        nameLabel, ASTResolving.getTypeSignature(senderDeclBinding)
                                });
                // image=
                // JavaPluginImages.get(JavaPluginImages.IMG_FIELD_PUBLIC);
            }
            int fieldRelevance = StubUtility.hasFieldName(targetCU.getJavaProject(), name) ? IProposalRelevance.CREATE_FIELD_PREFIX_OR_SUFFIX_MATCH
                    : IProposalRelevance.CREATE_FIELD;
            NewVariableCorrectionProposal p = new NewVariableCorrectionProposal(label, targetCU,
                    NewVariableCorrectionProposal.FIELD, simpleName, senderDeclBinding,
                    fieldRelevance, image);
            proposalMap.put(name, p);

		}
	}

	private static boolean canAssign(ITypeBinding returnType, ITypeBinding guessedType) {
		return returnType.isAssignmentCompatible(guessedType);
	}

	private static boolean hasMethodWithName(ITypeBinding typeBinding, String name) {
		IVariableBinding[] fields= typeBinding.getDeclaredFields();
		for (int i= 0; i < fields.length; i++) {
			if (fields[i].getName().equals(name)) {
				return true;
			}
		}
		ITypeBinding superclass= typeBinding.getSuperclass();
		if (superclass != null) {
			return hasMethodWithName(superclass, name);
		}
		return false;
	}

	private static int evauateTypeKind(ASTNode node, IJavaProject project) {
		int kind= ASTResolving.getPossibleTypeKinds(node, JavaModelUtil.is50OrHigher(project));
		return kind;
	}


	public static void getTypeProposals(IInvocationContext context, IProblemLocation problem, Map<String, LinkedCorrectionProposal> proposals) throws CoreException {
		ICompilationUnit cu= context.getCompilationUnit();

		ASTNode selectedNode= problem.getCoveringNode(context.getASTRoot());
		if (selectedNode == null) {
			return;
		}

		int kind= evauateTypeKind(selectedNode, cu.getJavaProject());

		while (selectedNode.getLocationInParent() == QualifiedName.NAME_PROPERTY) {
			selectedNode= selectedNode.getParent();
		}

		Name node= null;
		if (selectedNode instanceof SimpleType) {
			node= ((SimpleType) selectedNode).getName();
		} else if (selectedNode instanceof ArrayType) {
			Type elementType= ((ArrayType) selectedNode).getElementType();
			if (elementType.isSimpleType()) {
				node= ((SimpleType) elementType).getName();
			} else {
				return;
			}
		} else if (selectedNode instanceof Name) {
			node= (Name) selectedNode;
		} else {
			return;
		}

		while (node.getParent() instanceof QualifiedName) {
			node= (Name) node.getParent();
		}

		if (selectedNode != node) {
			kind= evauateTypeKind(node, cu.getJavaProject());
		}
		if ((kind & (SimilarElementsRequestor.CLASSES | SimilarElementsRequestor.INTERFACES)) != 0) {
			kind &= ~SimilarElementsRequestor.ANNOTATIONS; // only propose annotations when there are no other suggestions
		}
		addNewTypeProposals(cu, node, kind, IProposalRelevance.NEW_TYPE, proposals);
	}

	static CompilationUnitChange createAddImportChange(ICompilationUnit cu, Name name, String fullyQualifiedName) throws CoreException {
		String[] args= { BasicElementLabels.getJavaElementName(Signature.getSimpleName(fullyQualifiedName)),
				BasicElementLabels.getJavaElementName(Signature.getQualifier(fullyQualifiedName)) };
		String label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_importtype_description, args);

		CompilationUnitChange cuChange= new CompilationUnitChange(label, cu);
		ImportRewrite importRewrite= StubUtility.createImportRewrite((CompilationUnit) name.getRoot(), true);
		importRewrite.addImport(fullyQualifiedName);
		cuChange.setEdit(importRewrite.rewriteImports(null));
		return cuChange;
	}

	private static boolean isLikelyTypeName(String name) {
		return name.length() > 0 && Character.isUpperCase(name.charAt(0));
	}

	private static boolean isLikelyPackageName(String name) {
		if (name.length() != 0) {
			int i= 0;
			do {
				if (Character.isUpperCase(name.charAt(i))) {
					return false;
				}
				i= name.indexOf('.', i) + 1;
			} while (i != 0 && i < name.length());
		}
		return true;
	}

	private static boolean isLikelyTypeParameterName(String name) {
		return name.length() == 1 && Character.isUpperCase(name.charAt(0));
	}

	private static boolean isLikelyMethodTypeParameterName(String name) {
		if (name.length() == 1) {
			switch (name.charAt(0)) {
				case 'S':
				case 'T':
				case 'U':
					return true;
			}
		}
		return false;
	}

	public static void addNewTypeProposals(ICompilationUnit cu, Name refNode, int kind, int relevance, Map<String, LinkedCorrectionProposal> proposals) throws CoreException {
		Name node= refNode;
//		do {
			String typeName= ASTNodes.getSimpleNameIdentifier(node);
			Name qualifier= null;
			// only propose to create types for qualifiers when the name starts with upper case
			boolean isPossibleName= isLikelyTypeName(typeName) || node == refNode;
			if (isPossibleName) {
				IPackageFragment enclosingPackage= null;
				IType enclosingType= null;
				if (node.isSimpleName()) {
					enclosingPackage= (IPackageFragment) cu.getParent();
					return;
					// don't suggest member type, user can select it in wizard
				} else {
					Name qualifierName= ((QualifiedName) node).getQualifier();
					IBinding binding= qualifierName.resolveBinding();
					if (binding != null && binding.isRecovered()) {
						binding= null;
					}
					if (binding instanceof ITypeBinding) {
						enclosingType=(IType) binding.getJavaElement();
					} else if (binding instanceof IPackageBinding) {
						qualifier= qualifierName;
						enclosingPackage= (IPackageFragment) binding.getJavaElement();
					} else {
						IJavaElement[] res= cu.codeSelect(qualifierName.getStartPosition(), qualifierName.getLength());
						if (res!= null && res.length > 0 && res[0] instanceof IType) {
							enclosingType= (IType) res[0];
						} else {
							qualifier= qualifierName;
							enclosingPackage= JavaModelUtil.getPackageFragmentRoot(cu).getPackageFragment(ASTResolving.getFullName(qualifierName));
						}
					}
				}
				int rel= relevance;
				if (enclosingPackage != null && isLikelyPackageName(enclosingPackage.getElementName())) {
					rel += 3;
				}

				if (enclosingPackage != null && !enclosingPackage.getCompilationUnit(typeName + JavaModelUtil.DEFAULT_CU_SUFFIX).exists()
						|| enclosingType != null && !enclosingType.isReadOnly() && !enclosingType.getType(typeName).exists()) { // new member type
					IJavaElement enclosing= enclosingPackage != null ? (IJavaElement) enclosingPackage : enclosingType;

					String name = node.getFullyQualifiedName();
					
					if ((kind & SimilarElementsRequestor.CLASSES) != 0) {
						proposals.put(name, new NewCUProposal(cu, node, NewCUProposal.K_CLASS, enclosing, rel+3));
					}
					else if ((kind & SimilarElementsRequestor.INTERFACES) != 0) {
						proposals.put(name, new NewCUProposal(cu, node, NewCUProposal.K_INTERFACE, enclosing, rel+2));
					}
					else if ((kind & SimilarElementsRequestor.ENUMS) != 0) {
						proposals.put(name, new NewCUProposal(cu, node, NewCUProposal.K_ENUM, enclosing, rel));
					}
				}
			}
			node= qualifier;
//		} while (node != null);
	}

	public static void getMethodProposals(IInvocationContext context, IProblemLocation problem, boolean isOnlyParameterMismatch, Map<String, Map> missingMethodsMap) throws CoreException {

		ICompilationUnit cu= context.getCompilationUnit();

		CompilationUnit astRoot= context.getASTRoot();
		ASTNode selectedNode= problem.getCoveringNode(astRoot);

		if (!(selectedNode instanceof SimpleName)) {
			return;
		}
		SimpleName nameNode= (SimpleName) selectedNode;

		List<Expression> arguments;
		Expression sender;
		boolean isSuperInvocation;

		ASTNode invocationNode= nameNode.getParent();
		if (invocationNode instanceof MethodInvocation) {
			MethodInvocation methodImpl= (MethodInvocation) invocationNode;
			arguments= methodImpl.arguments();
			sender= methodImpl.getExpression();
			isSuperInvocation= false;
		} else if (invocationNode instanceof SuperMethodInvocation) {
			SuperMethodInvocation methodImpl= (SuperMethodInvocation) invocationNode;
			arguments= methodImpl.arguments();
			sender= methodImpl.getQualifier();
			isSuperInvocation= true;
		} else {
			return;
		}

		String methodName= nameNode.getIdentifier();

		// new method
		addNewMethodProposals(cu, astRoot, sender, arguments, isSuperInvocation, invocationNode, methodName, missingMethodsMap);

//		if (!isOnlyParameterMismatch && !isSuperInvocation && sender != null) {
//			addMissingCastParentsProposal(cu, (MethodInvocation) invocationNode, proposals);
//		}
	}
	
	private static void addNewMethodProposals(ICompilationUnit cu, CompilationUnit astRoot, Expression sender, List<Expression> arguments, boolean isSuperInvocation, ASTNode invocationNode, String methodName, Map<String, Map> missingMethodsMap) throws JavaModelException {
		ITypeBinding nodeParentType= Bindings.getBindingOfParentType(invocationNode);
		ITypeBinding binding= null;
		if (sender != null) {
			binding= sender.resolveTypeBinding();
		} else {
			binding= nodeParentType;
			if (isSuperInvocation && binding != null) {
				binding= binding.getSuperclass();
			}
		}
		if (binding != null && binding.isFromSource()) {
			ITypeBinding senderDeclBinding= binding.getTypeDeclaration();

			ICompilationUnit targetCU= ASTResolving.findCompilationUnitForBinding(cu, astRoot, senderDeclBinding);
			if (targetCU != null) {
			    String fqName = targetCU.findPrimaryType().getFullyQualifiedName();
			    Map<String, LinkedCorrectionProposal> proposalsMap = missingMethodsMap.get(fqName);
			    
			    if (proposalsMap == null){
			         MptPluginConsole.general(MptConstants.PARTIAL_CONVERSION_TAG, "Skip adding method for " + fqName);
			         return;
			    }
				String label;
				Image image = null;
				ITypeBinding[] parameterTypes= getParameterTypes(arguments);
				
				if(!checkParameterTypes(parameterTypes, missingMethodsMap))
				    return;
				if (parameterTypes != null) {
					String sig= ASTResolving.getMethodSignature(methodName, parameterTypes, false);

					if (ASTResolving.isUseableTypeInContext(parameterTypes, senderDeclBinding, false)) {
						if (nodeParentType == senderDeclBinding) {
							label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_createmethod_description, sig);
//							image= JavaPluginImages.get(JavaPluginImages.IMG_MISC_PRIVATE);
						} else {
							label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_createmethod_other_description, new Object[] { sig, BasicElementLabels.getJavaElementName(senderDeclBinding.getName()) } );
//							image= JavaPluginImages.get(JavaPluginImages.IMG_MISC_PUBLIC);
						}
						proposalsMap.put(sig, 
						        new NewMethodCorrectionProposal(label, targetCU, invocationNode, arguments, senderDeclBinding, IProposalRelevance.CREATE_METHOD, image));
					}
					if (senderDeclBinding.isNested() && cu.equals(targetCU) && sender == null && Bindings.findMethodInHierarchy(senderDeclBinding, methodName, (ITypeBinding[]) null) == null) { // no covering method
						ASTNode anonymDecl= astRoot.findDeclaringNode(senderDeclBinding);
						if (anonymDecl != null) {
							senderDeclBinding= Bindings.getBindingOfParentType(anonymDecl.getParent());
							if (!senderDeclBinding.isAnonymous() && ASTResolving.isUseableTypeInContext(parameterTypes, senderDeclBinding, false)) {
								String[] args= new String[] { sig, ASTResolving.getTypeSignature(senderDeclBinding) };
								label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_createmethod_other_description, args);
//								image= JavaPluginImages.get(JavaPluginImages.IMG_MISC_PROTECTED);
								proposalsMap.put(sig, new NewMethodCorrectionProposal(label, targetCU, invocationNode, arguments, senderDeclBinding, IProposalRelevance.CREATE_METHOD, image));
							}
						}
					}
				}
			}
		}
	}

	/**
     * @param parameterTypes Type bindings of the arguments
     * @param missingMethodsMap Missing methods map
     * @return If a method with the given argument types could be generated safely
     */
    private static boolean checkParameterTypes(ITypeBinding[] parameterTypes,
            Map<String, Map> missingMethodsMap) {
        if (parameterTypes == null)
            return false;

        for (int i = 0; i < parameterTypes.length; i++) {
            ITypeBinding binding = parameterTypes[i];
            if (binding.isFromSource() && !missingMethodsMap.containsKey(binding.getQualifiedName()))
                return false;
        }

        return true;
    }
    
    private static void addMissingCastParentsProposal(ICompilationUnit cu, MethodInvocation invocationNode, Collection<LinkedCorrectionProposal> proposals) {
		Expression sender= invocationNode.getExpression();
		if (sender instanceof ThisExpression) {
			return;
		}

		ITypeBinding senderBinding= sender.resolveTypeBinding();
		if (senderBinding == null || Modifier.isFinal(senderBinding.getModifiers())) {
			return;
		}

		if (sender instanceof Name && ((Name) sender).resolveBinding() instanceof ITypeBinding) {
			return; // static access
		}

		ASTNode parent= invocationNode.getParent();
		while (parent instanceof Expression && parent.getNodeType() != ASTNode.CAST_EXPRESSION) {
			parent= parent.getParent();
		}
		boolean hasCastProposal= false;
		if (parent instanceof CastExpression) {
			//	(TestCase) x.getName() -> ((TestCase) x).getName
//			hasCastProposal= useExistingParentCastProposal(cu, (CastExpression) parent, sender, invocationNode.getName(), getArgumentTypes(invocationNode.arguments()), proposals);
		}
		if (!hasCastProposal) {
			// x.getName() -> ((TestCase) x).getName

			Expression target= sender;
			while (target instanceof ParenthesizedExpression) {
				target= ((ParenthesizedExpression) target).getExpression();
			}

			String label;
			if (target.getNodeType() != ASTNode.CAST_EXPRESSION) {
				String targetName= null;
				if (target.getLength() <= 18) {
					targetName= ASTNodes.asString(target);
				}
				if (targetName == null) {
					label= CorrectionMessages.UnresolvedElementsSubProcessor_methodtargetcast_description;
				} else {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_methodtargetcast2_description, BasicElementLabels.getJavaCodeString(targetName));
				}
			} else {
				String targetName= null;
				if (target.getLength() <= 18) {
					targetName= ASTNodes.asString(((CastExpression)target).getExpression());
				}
				if (targetName == null) {
					label= CorrectionMessages.UnresolvedElementsSubProcessor_changemethodtargetcast_description;
				} else {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_changemethodtargetcast2_description, BasicElementLabels.getJavaCodeString(targetName));
				}
			}
			proposals.add(new CastCorrectionProposal(label, cu, target, (ITypeBinding) null, IProposalRelevance.CHANGE_CAST));
		}
	}

	private static void doMoreParameters(IInvocationContext context, ASTNode invocationNode, ITypeBinding[] argTypes, IMethodBinding methodBinding, Collection<LinkedCorrectionProposal> proposals) throws CoreException {
		ITypeBinding[] paramTypes= methodBinding.getParameterTypes();
		int k= 0, nSkipped= 0;
		int diff= paramTypes.length - argTypes.length;
		int[] indexSkipped= new int[diff];
		for (int i= 0; i < paramTypes.length; i++) {
			if (k < argTypes.length && canAssign(argTypes[k], paramTypes[i])) {
				k++; // match
			} else {
				if (nSkipped >= diff) {
					return; // too different
				}
				indexSkipped[nSkipped++]= i;
			}
		}
		ITypeBinding declaringType= methodBinding.getDeclaringClass();
		ICompilationUnit cu= context.getCompilationUnit();
		CompilationUnit astRoot= context.getASTRoot();

		// add arguments
		{
			String[] arg= new String[] { ASTResolving.getMethodSignature(methodBinding) };
			String label;
			if (diff == 1) {
				label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_addargument_description, arg);
			} else {
				label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_addarguments_description, arg);
			}
			AddArgumentCorrectionProposal proposal= new AddArgumentCorrectionProposal(label, context.getCompilationUnit(), invocationNode, indexSkipped, paramTypes, IProposalRelevance.ADD_ARGUMENTS);
			proposal.setImage(JavaPluginImages.get(JavaPluginImages.IMG_CORRECTION_ADD));
			proposals.add(proposal);
		}

		// remove parameters
		if (!declaringType.isFromSource()) {
			return;
		}

		ICompilationUnit targetCU= ASTResolving.findCompilationUnitForBinding(cu, astRoot, declaringType);
		if (targetCU != null) {
			IMethodBinding methodDecl= methodBinding.getMethodDeclaration();
			ITypeBinding[] declParameterTypes= methodDecl.getParameterTypes();

			ChangeDescription[] changeDesc= new ChangeDescription[declParameterTypes.length];
			ITypeBinding[] changedTypes= new ITypeBinding[diff];
			for (int i= diff - 1; i >= 0; i--) {
				int idx= indexSkipped[i];
				changeDesc[idx]= new RemoveDescription();
				changedTypes[i]= declParameterTypes[idx];
			}
			String[] arg= new String[] { ASTResolving.getMethodSignature(methodDecl), getTypeNames(changedTypes) };
			String label;
			if (methodDecl.isConstructor()) {
				if (diff == 1) {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_removeparam_constr_description, arg);
				} else {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_removeparams_constr_description, arg);
				}
			} else {
				if (diff == 1) {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_removeparam_description, arg);
				} else {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_removeparams_description, arg);
				}
			}

			Image image= JavaPluginImages.get(JavaPluginImages.IMG_CORRECTION_REMOVE);
			ChangeMethodSignatureProposal proposal= new ChangeMethodSignatureProposal(label, targetCU, invocationNode, methodDecl, changeDesc, null, IProposalRelevance.CHANGE_METHOD_REMOVE_PARAMETER, image);
			proposals.add(proposal);
		}
	}

	private static String getTypeNames(ITypeBinding[] types) {
		StringBuffer buf= new StringBuffer();
		for (int i= 0; i < types.length; i++) {
			if (i > 0) {
				buf.append(", "); //$NON-NLS-1$
			}
			buf.append(ASTResolving.getTypeSignature(types[i]));
		}
		return BasicElementLabels.getJavaElementName(buf.toString());
	}

	private static String getArgumentName(List<Expression> arguments, int index) {
		String def= String.valueOf(index + 1);

		ASTNode expr= arguments.get(index);
		if (expr.getLength() > 18) {
			return def;
		}
		ASTMatcher matcher= new ASTMatcher();
		for (int i= 0; i < arguments.size(); i++) {
			if (i != index && matcher.safeSubtreeMatch(expr, arguments.get(i))) {
				return def;
			}
		}
		return '\'' + BasicElementLabels.getJavaElementName(ASTNodes.asString(expr)) + '\'';
	}

	private static void doMoreArguments(IInvocationContext context, ASTNode invocationNode, List<Expression> arguments, ITypeBinding[] argTypes, IMethodBinding methodRef, Collection<LinkedCorrectionProposal> proposals) throws CoreException {
		ITypeBinding[] paramTypes= methodRef.getParameterTypes();
		int k= 0, nSkipped= 0;
		int diff= argTypes.length - paramTypes.length;
		int[] indexSkipped= new int[diff];
		for (int i= 0; i < argTypes.length; i++) {
			if (k < paramTypes.length && canAssign(argTypes[i], paramTypes[k])) {
				k++; // match
			} else {
				if (nSkipped >= diff) {
					return; // too different
				}
				indexSkipped[nSkipped++]= i;
			}
		}

		ICompilationUnit cu= context.getCompilationUnit();
		CompilationUnit astRoot= context.getASTRoot();

		IMethodBinding methodDecl= methodRef.getMethodDeclaration();
		ITypeBinding declaringType= methodDecl.getDeclaringClass();

		// add parameters
		if (!declaringType.isFromSource()) {
			return;
		}
		ICompilationUnit targetCU= ASTResolving.findCompilationUnitForBinding(cu, astRoot, declaringType);
		if (targetCU != null) {

			if (isImplicitConstructor(methodDecl)) {
				return;
			}

			ChangeDescription[] changeDesc= new ChangeDescription[argTypes.length];
			ITypeBinding[] changeTypes= new ITypeBinding[diff];
			for (int i= diff - 1; i >= 0; i--) {
				int idx= indexSkipped[i];
				Expression arg= arguments.get(idx);
				String name= getExpressionBaseName(arg);
				ITypeBinding newType= Bindings.normalizeTypeBinding(argTypes[idx]);
				if (newType == null) {
					newType= astRoot.getAST().resolveWellKnownType("java.lang.Object"); //$NON-NLS-1$
				}
				if (newType.isWildcardType()) {
					newType= ASTResolving.normalizeWildcardType(newType, true, astRoot.getAST());
				}
				if (!ASTResolving.isUseableTypeInContext(newType, methodDecl, false)) {
					return;
				}
				changeDesc[idx]= new InsertDescription(newType, name);
				changeTypes[i]= newType;
			}
			String[] arg= new String[] { ASTResolving.getMethodSignature(methodDecl), getTypeNames(changeTypes) };
			String label;
			if (methodDecl.isConstructor()) {
				if (diff == 1) {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_addparam_constr_description, arg);
				} else {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_addparams_constr_description, arg);
				}
			} else {
				if (diff == 1) {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_addparam_description, arg);
				} else {
					label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_addparams_description, arg);
				}
			}
			Image image= JavaPluginImages.get(JavaPluginImages.IMG_CORRECTION_ADD);
			ChangeMethodSignatureProposal proposal= new ChangeMethodSignatureProposal(label, targetCU, invocationNode, methodDecl, changeDesc, null, IProposalRelevance.CHANGE_METHOD_ADD_PARAMETER, image);
			proposals.add(proposal);
		}
	}

	private static boolean isImplicitConstructor(IMethodBinding meth) {
		return meth.isDefaultConstructor();
	}

	private static ITypeBinding[] getParameterTypes(List<Expression> args) {
		ITypeBinding[] params= new ITypeBinding[args.size()];
		for (int i= 0; i < args.size(); i++) {
			Expression expr= args.get(i);
			ITypeBinding curr= Bindings.normalizeTypeBinding(expr.resolveTypeBinding());
			if (curr != null && curr.isWildcardType()) {
				curr= ASTResolving.normalizeWildcardType(curr, true, expr.getAST());
			}
			if (curr == null) {
				curr= expr.getAST().resolveWellKnownType("java.lang.Object"); //$NON-NLS-1$
			}
			params[i]= curr;
		}
		return params;
	}

	private static ChangeDescription[] createSignatureChangeDescription(int[] indexOfDiff, int nDiffs, ITypeBinding[] paramTypes, List<Expression> arguments, ITypeBinding[] argTypes) {
		ChangeDescription[] changeDesc= new ChangeDescription[paramTypes.length];
		for (int i= 0; i < nDiffs; i++) {
			int diffIndex= indexOfDiff[i];
			Expression arg= arguments.get(diffIndex);
			String name= getExpressionBaseName(arg);
			ITypeBinding argType= argTypes[diffIndex];
			if (argType.isWildcardType()) {
				argType= ASTResolving.normalizeWildcardType(argType, true, arg.getAST());
				if (argType== null) {
					return null;
				}
			}
			changeDesc[diffIndex]= new EditDescription(argType, name);
		}
		return changeDesc;
	}

	private static String getExpressionBaseName(Expression expr) {
		IBinding argBinding= Bindings.resolveExpressionBinding(expr, true);
		if (argBinding instanceof IVariableBinding) {
			IJavaProject project= null;
			ASTNode root= expr.getRoot();
			if (root instanceof CompilationUnit) {
				ITypeRoot typeRoot= ((CompilationUnit) root).getTypeRoot();
				if (typeRoot != null)
					project= typeRoot.getJavaProject();
			}
			return StubUtility.getBaseName((IVariableBinding)argBinding, project);
		}
		if (expr instanceof SimpleName)
			return ((SimpleName) expr).getIdentifier();
		return null;
	}

	private static ITypeBinding[] getArgumentTypes(List<Expression> arguments) {
		ITypeBinding[] res= new ITypeBinding[arguments.size()];
		for (int i= 0; i < res.length; i++) {
			Expression expression= arguments.get(i);
			ITypeBinding curr= expression.resolveTypeBinding();
			if (curr == null) {
				return null;
			}
			if (!curr.isNullType()) {	// don't normalize null type
				curr= Bindings.normalizeTypeBinding(curr);
				if (curr == null) {
					curr= expression.getAST().resolveWellKnownType("java.lang.Object"); //$NON-NLS-1$
				}
			}
			res[i]= curr;
		}
		return res;
	}

	public static void getConstructorProposals(IInvocationContext context, IProblemLocation problem, Map<String, Map> missingConstructorsMap) throws CoreException {
		ICompilationUnit cu= context.getCompilationUnit();

		CompilationUnit astRoot= context.getASTRoot();
		ASTNode selectedNode= problem.getCoveringNode(astRoot);
		if (selectedNode == null) {
			return;
		}

		ITypeBinding targetBinding= null;
		List<Expression> arguments= null;
		IMethodBinding recursiveConstructor= null;

		int type= selectedNode.getNodeType();
		if (type == ASTNode.CLASS_INSTANCE_CREATION) {
			ClassInstanceCreation creation= (ClassInstanceCreation) selectedNode;

			IBinding binding= creation.getType().resolveBinding();
			if (binding instanceof ITypeBinding) {
				targetBinding= (ITypeBinding) binding;
				arguments= creation.arguments();
			}
		} else if (type == ASTNode.SUPER_CONSTRUCTOR_INVOCATION) {
			ITypeBinding typeBinding= Bindings.getBindingOfParentType(selectedNode);
			if (typeBinding != null && !typeBinding.isAnonymous()) {
				targetBinding= typeBinding.getSuperclass();
				arguments= ((SuperConstructorInvocation) selectedNode).arguments();
			}
		} else if (type == ASTNode.CONSTRUCTOR_INVOCATION) {
			ITypeBinding typeBinding= Bindings.getBindingOfParentType(selectedNode);
			if (typeBinding != null && !typeBinding.isAnonymous()) {
				targetBinding= typeBinding;
				arguments= ((ConstructorInvocation) selectedNode).arguments();
				recursiveConstructor= ASTResolving.findParentMethodDeclaration(selectedNode).resolveBinding();
			}
		}
		if (targetBinding == null) {
			return;
		}
		IMethodBinding[] methods= targetBinding.getDeclaredMethods();
		ArrayList<IMethodBinding> similarElements= new ArrayList<IMethodBinding>();
		for (int i= 0; i < methods.length; i++) {
			IMethodBinding curr= methods[i];
			if (curr.isConstructor() && recursiveConstructor != curr) {
				similarElements.add(curr); // similar elements can contain a implicit default constructor
			}
		}

		if (targetBinding.isFromSource()) {
			ITypeBinding targetDecl= targetBinding.getTypeDeclaration();
            
            Map<String, LinkedCorrectionProposal> map = missingConstructorsMap.get(targetDecl.getQualifiedName());
            if(map == null)
                return;
			ICompilationUnit targetCU= ASTResolving.findCompilationUnitForBinding(cu, astRoot, targetDecl);
			if (targetCU != null) {
				String[] args= new String[] { ASTResolving.getMethodSignature( ASTResolving.getTypeSignature(targetDecl), getParameterTypes(arguments), false) };
				String label= Messages.format(CorrectionMessages.UnresolvedElementsSubProcessor_createconstructor_description, args);
				Image image= JavaElementImageProvider.getDecoratedImage(JavaPluginImages.DESC_MISC_PUBLIC, JavaElementImageDescriptor.CONSTRUCTOR, JavaElementImageProvider.SMALL_SIZE);
				/**
				 * Make sure constructor of a certain signature is created only once. 
				 */
				String key = Arrays.toString(args);
				map.put(key, new NewMethodCorrectionProposal(label, targetCU, selectedNode, arguments, targetDecl, IProposalRelevance.CREATE_CONSTRUCTOR, image));
			}
		}
	}

    public static void importNotFoundProposals(IInvocationContext context, IProblemLocation problem, Map<String, LinkedCorrectionProposal> proposals) throws CoreException {
        ICompilationUnit cu= context.getCompilationUnit();

        ASTNode selectedNode= problem.getCoveringNode(context.getASTRoot());
        if (selectedNode == null) {
            return;
        }
        ImportDeclaration importDeclaration= (ImportDeclaration) ASTNodes.getParent(selectedNode, ASTNode.IMPORT_DECLARATION);
        if (importDeclaration == null) {
            return;
        }
        if (!importDeclaration.isOnDemand()) {
            Name name= importDeclaration.getName();
            if (importDeclaration.isStatic() && name.isQualifiedName()) {
                name= ((QualifiedName) name).getQualifier();
            }
            int kind= JavaModelUtil.is50OrHigher(cu.getJavaProject()) ? SimilarElementsRequestor.REF_TYPES : SimilarElementsRequestor.CLASSES | SimilarElementsRequestor.INTERFACES;
            UnresolvedElementsSubProcessor.addNewTypeProposals(cu, name, kind, IProposalRelevance.IMPORT_NOT_FOUND_NEW_TYPE, proposals);
        }
    }

}
