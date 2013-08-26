/**
 * Code copied from org.eclipse.jdt.ui.
 */
package com.intel.ide.eclipse.mpt.ast;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.internal.corext.dom.Bindings;
import org.eclipse.jdt.internal.corext.util.Messages;
import org.eclipse.jdt.internal.ui.text.correction.ASTResolving;
import org.eclipse.jdt.internal.ui.text.correction.CorrectionMessages;
import org.eclipse.jdt.internal.ui.text.correction.proposals.LinkedCorrectionProposal;
import org.eclipse.jdt.internal.ui.text.correction.proposals.NewDefiningMethodProposal;
import org.eclipse.jdt.internal.ui.viewsupport.BasicElementLabels;
import org.eclipse.jdt.ui.text.java.IInvocationContext;

/**
 * @author xsun12
 *
 */
public class QuickAssistProcessor {

    public static boolean getCreateInSuperClassProposals(IInvocationContext context, ASTNode node, Map<String, Map> missingMethodsMap) throws CoreException {
        if (!(node instanceof SimpleName) || !(node.getParent() instanceof MethodDeclaration)) {
            return false;
        }
        MethodDeclaration decl= (MethodDeclaration) node.getParent();
        if (decl.getName() != node || decl.resolveBinding() == null || Modifier.isPrivate(decl.getModifiers())) {
            return false;
        }

        ICompilationUnit cu= context.getCompilationUnit();
        CompilationUnit astRoot= context.getASTRoot();

        IMethodBinding binding= decl.resolveBinding();
        ITypeBinding[] paramTypes= binding.getParameterTypes();

		if(!checkParameterTypes(paramTypes, missingMethodsMap))
		    return false;

        ITypeBinding[] superTypes= getAllSuperTypes(binding.getDeclaringClass());

        List<SingleVariableDeclaration> params= decl.parameters();
        String[] paramNames= new String[paramTypes.length];
        for (int i = 0; i < params.size(); i++) {
            SingleVariableDeclaration param= params.get(i);
            paramNames[i]= param.getName().getIdentifier();
        }

		String sig= ASTResolving.getMethodSignature(binding.getName(), paramTypes, false);
		
        for (int i= 0; i < superTypes.length; i++) {
            ITypeBinding curr= superTypes[i];
            if (curr.isFromSource()) {
                IMethodBinding method= Bindings.findOverriddenMethodInType(curr, binding);
                if (method == null) {
                    ITypeBinding typeDecl= curr.getTypeDeclaration();
                    ICompilationUnit targetCU= ASTResolving.findCompilationUnitForBinding(cu, astRoot, typeDecl);
                    if (targetCU != null) {
                        String fqName = targetCU.findPrimaryType().getFullyQualifiedName();
                        Map<String, LinkedCorrectionProposal> proposalsMap = missingMethodsMap.get(fqName);
                        
                        if (proposalsMap == null){
                             continue;
                        }
                        String label= Messages.format(CorrectionMessages.QuickAssistProcessor_createmethodinsuper_description, new String[] { BasicElementLabels.getJavaElementName(curr.getName()), BasicElementLabels.getJavaElementName(binding.getName()) });
                        proposalsMap.put(sig, new NewDefiningMethodProposal(label, targetCU, astRoot, typeDecl, binding, paramNames, IProposalRelevance.CREATE_METHOD_IN_SUPER));
                        break;
                    }
                }
            }
        }
        return true;
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

    /**
     * Returns all super types (classes and interfaces) for the given type in inheritance order.
     * @param type The type to get the supertypes of.
     * @return all super types (excluding <code>type</code>)
     */
    public static ITypeBinding[] getAllSuperTypes(ITypeBinding type) {
        ArrayList<ITypeBinding> result= new ArrayList<ITypeBinding>();

        collectSuperTypes(type, result);
        
        for(int i=0; i< result.size(); i++){
            type = result.get(i);
            collectSuperTypes(type, result);
        }

//        result.remove(type);
        return result.toArray(new ITypeBinding[result.size()]);
    }

    private static void collectSuperTypes(ITypeBinding curr, ArrayList<ITypeBinding> list) {
        ITypeBinding superClass= curr.getSuperclass();
        if (superClass != null) {
            list.add(superClass);
        }
        
        ITypeBinding[] interfaces = curr.getInterfaces();
        for (int i = 0; i < interfaces.length; i++) {
            list.add(interfaces[i]);
        }
    }

}
