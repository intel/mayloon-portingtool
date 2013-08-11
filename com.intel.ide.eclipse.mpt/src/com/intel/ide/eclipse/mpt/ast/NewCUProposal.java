package com.intel.ide.eclipse.mpt.ast;

import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.internal.ui.text.correction.proposals.LinkedCorrectionProposal;

public class NewCUProposal extends LinkedCorrectionProposal {

    public static final int K_CLASS = 1;
    public static final int K_INTERFACE = 2;
    public static final int K_ENUM = 3;
    private Name node;
    private int kClass;
    private IJavaElement enclosing;

    public NewCUProposal(ICompilationUnit cu, Name node, int kClass, IJavaElement enclosing,
            int image) {
        super("NewCUProposal", cu, null, image, null);
        
        this.node = node;
        this.kClass = kClass;
        this.enclosing = enclosing;
    }

    public Name getNode(){
        return node;
    }
    
    public int getKind(){
        return kClass;
    }
    
    public boolean isInnerType(){
        return (enclosing instanceof IType);
    }
}
