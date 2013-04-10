package com.intel.ide.eclipse.mpt.ast;

import org.eclipse.core.filebuffers.FileBuffers;
import org.eclipse.core.filebuffers.ITextFileBuffer;
import org.eclipse.core.filebuffers.ITextFileBufferManager;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.IDocument;
import org.eclipse.text.edits.MalformedTreeException;
import org.eclipse.text.edits.TextEdit;

/**
 * Helper class used to write the performed changes back to Java source.
 * 
 */
public class ManipulatorHelper {
	/**
	 * Hidden. Call the static methods.
	 */
	private ManipulatorHelper() {
	}

	/**
	 * Implementing classes provide a {@link TextEdit} object. The way to obtain
	 * such an instance differs when the AST is directly manipulated or changes
	 * are logged to an {@link ASTRewrite} instance. To avoid to write two save
	 * methods, this interface has been created.
	 * <p>
	 * Project page: <a target="_blank"
	 * href="http://sourceforge.net/projects/earticleast">http://sourceforge.net/projects/earticleast</a>
	 * </p>
	 *
	 * @author Thomas Kuhn
	 */
	public interface TextEditProvider {

		/**
		 * Provides a {@link TextEdit} document.
		 *
		 * @param document
		 *            the docuement the {@link TextEdit} object will be applied
		 *            to
		 * @return the {@link TextEdit} instance
		 */
		TextEdit getTextEdit(IDocument document);
	}

	/**
	 * Writes changes to Java source. This method does not distinguish how the
	 * AST was changed.
	 *
	 * @param unit
	 *            the AST node of the compilation unit that has been changed
	 * @param textEditProvider
	 *            provides the change information
	 * @throws CoreException
	 *             thrown if file paths cannot be connected or disconnected
	 */
	public static void save(CompilationUnit unit,
			TextEditProvider textEditProvider) throws CoreException {
		ITextFileBufferManager bufferManager = FileBuffers
				.getTextFileBufferManager();
		IPath path = unit.getJavaElement().getPath();
		try {
			// connect the path
			bufferManager.connect(path, null);

			ITextFileBuffer textFileBuffer = bufferManager.getTextFileBuffer(path);
			// retrieve the buffer
			IDocument document = textFileBuffer
					.getDocument();

			// ask the textEditProvider for the change information
			TextEdit edit = textEditProvider.getTextEdit(document);

			// apply the changes to the document
			edit.apply(document);

			// write the changes from the buffer to the file
			textFileBuffer
					.commit(null /* ProgressMonitor */, false /* Overwrite */);

		} catch (MalformedTreeException e) {
			e.printStackTrace();
		} catch (BadLocationException e) {
			e.printStackTrace();
		} finally {
			// disconnect the path
			bufferManager.disconnect(path, null);
		}
	}

	/**
	 * Convenience method that saves changes that have been made directly to an
	 * AST.
	 *
	 * @param unit
	 *            the unit that contains changes.
	 * @throws CoreException
	 *             forwards the exception from
	 *             {@link #save(CompilationUnit, net.sourceforge.earticleast.app.ManipulatorHelper.TextEditProvider)}
	 */
	public static void saveDirectlyModifiedUnit(final CompilationUnit unit)
			throws CoreException {
		save(unit, new TextEditProvider() {
			public TextEdit getTextEdit(IDocument document) {
				return unit.rewrite(document, null);
			}
		});
	}

	/**
	 * Convenience method that saves changes to an AST that have been recorded
	 * in by an instance of {@link ASTRewrite}.
	 *
	 * @param unit
	 *            the unit (in its origininal state)
	 * @param rewrite
	 *            contains the rewrite instructions
	 * @throws CoreException
	 *             forwards the exception from
	 *             {@link #save(CompilationUnit, net.sourceforge.earticleast.app.ManipulatorHelper.TextEditProvider)}
	 */
	public static void saveASTRewriteContents(CompilationUnit unit,
			final ASTRewrite rewrite) throws CoreException {
		save(unit, new TextEditProvider() {
			public TextEdit getTextEdit(IDocument document) {
				return rewrite.rewriteAST(document, null);
			}
		});

	}

}
