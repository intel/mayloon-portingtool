package com.intel.ide.eclipse.mpt.ast;

import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;

public abstract class AbstractASTParser {
	/**
	 * Called from {@link ASTArticleActionDelegate}.
	 *
	 * @param lwUnit
	 *            the Java Model handle to the compilation unit that has to be
	 *            processed
	 */
	public abstract void run(ICompilationUnit lwUnit);

	/**
	 * Parses source code.
	 *
	 * @param lwUnit
	 *            the Java Model handle for the compilation unit
	 * @return the root AST node of the parsed source
	 */
	protected CompilationUnit parse(ICompilationUnit lwUnit) {
		ASTParser parser = ASTParser.newParser(AST.JLS3);
		parser.setKind(ASTParser.K_COMPILATION_UNIT);
		parser.setSource(lwUnit); // set source
		parser.setResolveBindings(true); // we need bindings later on
		return (CompilationUnit) parser.createAST(null /* IProgressMonitor */); // parse
	}

}
