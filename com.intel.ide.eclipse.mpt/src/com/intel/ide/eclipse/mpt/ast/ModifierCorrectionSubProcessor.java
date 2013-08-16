/**
 * Code copied from org.eclipse.jdt.ui.
 */
package com.intel.ide.eclipse.mpt.ast;

import java.util.List;
import java.util.Map;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.IExtendedModifier;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.ui.text.java.IInvocationContext;
import org.eclipse.jdt.ui.text.java.IProblemLocation;

/**
 * @author xsun12
 *
 */
public class ModifierCorrectionSubProcessor {
    public static void removeOverrideAnnotationProposal(IInvocationContext context, IProblemLocation problem, Map<String, Map> missingMethodsMap) throws CoreException {
        ASTNode selectedNode= problem.getCoveringNode(context.getASTRoot());
        if (!(selectedNode instanceof MethodDeclaration)) {
            return;
        }
        MethodDeclaration methodDecl= (MethodDeclaration) selectedNode;
        Annotation annot= findAnnotation("java.lang.Override", methodDecl.modifiers()); //$NON-NLS-1$
        if (annot != null) {
            QuickAssistProcessor.getCreateInSuperClassProposals(context, methodDecl.getName(), missingMethodsMap);
        }
    }
    

    private static Annotation findAnnotation(String qualifiedTypeName, List<IExtendedModifier> modifiers) {
        for (int i= 0; i < modifiers.size(); i++) {
            IExtendedModifier curr= modifiers.get(i);
            if (curr instanceof Annotation) {
                Annotation annot= (Annotation) curr;
                ITypeBinding binding= annot.getTypeName().resolveTypeBinding();
                if (binding != null && qualifiedTypeName.equals(binding.getQualifiedName())) {
                    return annot;
                }
            }
        }
        return null;
    }
}
