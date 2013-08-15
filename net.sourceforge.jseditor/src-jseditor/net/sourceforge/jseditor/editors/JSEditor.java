/*
 * $RCSfile: JSEditor.java,v $
 *
 * Copyright 2002
 * CH-1700 Fribourg, Switzerland
 * All rights reserved.
 *
 *========================================================================
 * Modifications history
 *========================================================================
 * $Log: JSEditor.java,v $
 * Revision 1.5  2003/08/14 15:14:15  agfitzp
 * Removed thread hack from automatic update
 *
 * Revision 1.4  2003/07/04 17:26:56  agfitzp
 * New hack, update in a new thread only if we're not already in the middle of updating
 *
 * Revision 1.3  2003/06/21 03:48:51  agfitzp
 * fixed global variables as functions bug
 * fixed length calculation of instance variables
 * Automatic outlining is now a preference
 *
 * Revision 1.2  2003/05/28 20:47:58  agfitzp
 * Outline the document, not the file.
 *
 * Revision 1.1  2003/05/28 15:17:12  agfitzp
 * net.sourceforge.jseditor 0.0.1 code base
 *
 *========================================================================
 */

package net.sourceforge.jseditor.editors;

import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.ITypedRegion;
import org.eclipse.jface.text.TextPresentation;
import org.eclipse.jface.viewers.ISelectionChangedListener;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.viewers.SelectionChangedEvent;
import org.eclipse.swt.custom.StyleRange;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.editors.text.TextEditor;
import org.eclipse.ui.views.contentoutline.IContentOutlinePage;

import net.sourceforge.jseditor.utility.JSConstant;
import net.sourceforge.jseditor.views.JSOutlinePage;

/**
 * DOCUMENT ME!
 * 
 * @version $Revision: 1.5 $
 * @author $Author: agfitzp $, $Date: 2003/08/14 15:14:15 $
 */
public class JSEditor extends TextEditor implements ISelectionChangedListener {
	protected JSColorManager colorManager = new JSColorManager();
	protected JSOutlinePage outlinePage;
	protected JSConfiguration configuration;

	protected boolean updating = false;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.eclipse.ui.texteditor.AbstractTextEditor#handleCursorPositionChanged
	 * ()
	 */
	// when the cursor moves,call the function

	@Override
	protected void handleCursorPositionChanged() {
		// TODO Auto-generated method stub
		super.handleCursorPositionChanged();
		JSDoubleClickStrategy jsdc = new JSDoubleClickStrategy(true);
		jsdc.doubleClicked(getSourceViewer());

	}

	/**
	 * Constructor for SampleEditor.
	 */
	public JSEditor() {
		super();
		configuration = new JSConfiguration(colorManager);
		setSourceViewerConfiguration(configuration);
		setDocumentProvider(new JSDocumentProvider());
	}

	/**
	 * Method declared on IEditorPart
	 * 
	 * @param monitor
	 */
	public void doSave(IProgressMonitor monitor) {
		super.doSave(monitor);

	}

	/**
	 *
	 */
	public void dispose() {
		colorManager.dispose();
		super.dispose();
	}

	/**
	 * Method declared on IAdaptable
	 * 
	 * @param key
	 * 
	 * @return
	 */
	/***
	 * in getAdapter()，we connect the jseditor with the outline view in
	 * getAdapter() ，when the parameter is IContentOutlinePage ， it means
	 * Outline view search jsEditor for pages ，when return is not null，the
	 * outline view will show the result
	 */

	public Object getAdapter(Class adapter) {
		if (IContentOutlinePage.class.equals(adapter)) {
			if (outlinePage == null) {
				outlinePage = new JSOutlinePage();
				outlinePage.setInput(getDocumentProvider().getDocument(
						getEditorInput()));
				// outline page will be notified about changes of the caret
				// position
				outlinePage
						.addSelectionChangedListener(new ISelectionChangedListener() {
							// overstackflow mistake
							@Override
							public void selectionChanged(
									SelectionChangedEvent event) {
								IStructuredSelection selection = (IStructuredSelection) event
										.getSelection();

								// 此处有内存泄漏，selectAndReveal和setHighlightRange只能同时有一个执行
								// it leads to dead cycle if
								// setHighlightRange()and selectAndReveal()
								// be used together
								if (!selection.isEmpty()) {
									// show and highlight the selected text
									// region
									ITypedRegion region = (ITypedRegion) selection
											.getFirstElement();
									try {
										// JSConstant.stringOffsetLength ,the
										// default value is 200
										String text = getSourceViewer()
												.getDocument()
												.get(region.getOffset(),
														JSConstant.stringOffsetLength);
										if (text.startsWith("declarePackage")) {
											String tag1 = "\"";
											String tag2 = "\"";
											clickOutline(region.getOffset(),
													tag1, tag2, text);
										} else if (text.startsWith("load")) {
											// in case that,user have type a lot
											// of tabs or space...
											int m = text.indexOf("]");
											int d = text.indexOf(",", m);
											int beginIdx = text
													.indexOf("\"", d) + 1;
											int endIdx = text.indexOf("\"",
													beginIdx);
											if (text.indexOf(
													"\"",
													text.indexOf(",",
															text.indexOf("]"))) != -1
													&& endIdx != -1) {
												int x = region.getOffset()
														+ beginIdx;
												int y = endIdx - beginIdx;
												setHighlightRange(x, y, true);
												getSourceViewer()
														.setSelectedRange(x, y);
											} else
												setHighlightRange(
														region.getOffset(), 10,
														true);
										} else if (text
												.startsWith("declareType")) {
											String tag1 = "\"";
											String tag2 = "\"";
											clickOutline(region.getOffset(),
													tag1, tag2, text);
											setHighlightRange(424, 15, true);
										} else if (text
												.startsWith("makeConstructor")) {
											setHighlightRange(
													region.getOffset(),
													region.getLength(), true);
											getSourceViewer().setSelectedRange(
													region.getOffset(),
													region.getLength());
										} else if (text
												.startsWith("defineMethod")
												|| text.startsWith("overrideMethod")) {
											String tag1 = "\"";
											String tag2 = "\"";
											clickOutline(region.getOffset(),
													tag1, tag2, text);
										} else
											setHighlightRange(
													region.getOffset(),
													region.getLength(), true);
									} catch (BadLocationException e) {
									}

								}

							}

						});
			}
			return outlinePage;
		}
		return super.getAdapter(adapter);

	}

	private void clickOutline(int offset, String tag1, String tag2, String text) {
		int tag1Index = text.indexOf(tag1);
		int beginIdx = tag1Index + tag1.length();
		int endIdx = text.indexOf(tag2, beginIdx);
		if (tag1Index != -1 && endIdx != -1) {
			int x = offset + beginIdx;
			int y = endIdx - beginIdx;
			setHighlightRange(x, y, true);
			getSourceViewer().setSelectedRange(x, y);

		} else
			setHighlightRange(offset, 10, true);
	}

	/**
	 * @see org.eclipse.jface.viewers.ISelectionChangedListener#selectionChanged(SelectionChangedEvent)
	 */
	public void selectionChanged(SelectionChangedEvent event) {
		if (null != event) {
			if (event.getSelection() instanceof IStructuredSelection) {
				IStructuredSelection sel = (IStructuredSelection) event
						.getSelection();
				if (null != sel) {
					JSElement fe = (JSElement) sel.getFirstElement();
					if (null != fe) {
						selectAndReveal(fe.getStart(), fe.getLength());
					}
				}
			}
		}
	}

	/**
	 * Updates all content dependent actions.
	 * 
	 * This might be a hack: We're trapping this update to ensure that the
	 * outline is always up to date.
	 */
	protected void updateContentDependentActions() {
	}
}