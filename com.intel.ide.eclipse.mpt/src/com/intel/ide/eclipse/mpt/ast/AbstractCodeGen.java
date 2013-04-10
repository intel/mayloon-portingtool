package com.intel.ide.eclipse.mpt.ast;

import org.eclipse.jdt.core.ICompilationUnit;

public abstract class AbstractCodeGen {
	public abstract void run(ICompilationUnit lwUnit);
	
	protected void commentGen() {
		System.out.println("commentGen");
	}
}
