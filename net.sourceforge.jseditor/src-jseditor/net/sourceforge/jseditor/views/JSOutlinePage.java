/*
 * $RCSfile: JSOutlinePage.java,v $
 *
 * Copyright 2002
 * CH-1700 Fribourg, Switzerland
 * All rights reserved.
 *
 *========================================================================
 * Modifications history
 *========================================================================
 * $Log: JSOutlinePage.java,v $
 * Revision 1.3  2003/05/30 20:53:08  agfitzp
 * 0.0.2 : Outlining is now done as the user types. Some other bug fixes.
 *
 * Revision 1.2  2003/05/28 20:47:57  agfitzp
 * Outline the document, not the file.
 *
 * Revision 1.1  2003/05/28 15:17:11  agfitzp
 * net.sourceforge.jseditor 0.0.1 code base
 *
 *========================================================================
 */

package net.sourceforge.jseditor.views;

import java.util.Stack;

import net.sourceforge.jseditor.editors.JSElement;
import net.sourceforge.jseditor.utility.JSConstant;

import org.eclipse.ui.part.EditorPart;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.ITextInputListener;
import org.eclipse.jface.text.ITypedRegion;
import org.eclipse.jface.viewers.ISelectionChangedListener;
import org.eclipse.jface.viewers.LabelProvider;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.swt.custom.CaretEvent;
import org.eclipse.swt.custom.CaretListener;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.model.WorkbenchContentProvider;
import org.eclipse.ui.model.WorkbenchLabelProvider;
import org.eclipse.ui.views.contentoutline.ContentOutlinePage;

/**
 * DOCUMENT ME!
 * 
 * @author Addi To change this generated comment edit the template variable
 *         "typecomment": Window>Preferences>Java>Templates. To enable and
 *         disable the creation of type comments go to
 *         Window>Preferences>Java>Code Generation.
 */
public class JSOutlinePage extends ContentOutlinePage implements
		ITextInputListener, CaretListener, ISelectionChangedListener {
	private IDocument input;
	private static final String ERROR = "!ERROR";

	public JSOutlinePage() {
		super();
	}

	/**
	 * Creates a new JSOutlinePage.
	 * 
	 * @param input
	 */
	public JSOutlinePage(IDocument input) {
		super();
		this.input = input;
		
	}

	/**
	 * Creates the control and registers the popup menu for this outlinePage
	 * Menu id "org.eclipse.ui.examples.readmetool.outline"
	 * 
	 * @param parent
	 */
	/***
	 * 大纲页面中的树型控件所展现的为 JS 文档的数据结点， 我们为 TreeViewer 提供 ContentProvider 和
	 * LabelProvider，用于遍历结点元素和显示结点的名称。
	 */
	public void createControl(Composite parent) {
		super.createControl(parent);
		TreeViewer treeViewer = getTreeViewer();
		treeViewer.setContentProvider(new JSSyntaxContentProvider());
		
		treeViewer.setLabelProvider(new SimpleLabelProvider());
		treeViewer.setInput(this.input);

		// we must look for selections in the tree viewer so that we can show
		// properties
		// of the selected node
		getSite().setSelectionProvider(treeViewer);
		//expand all levels of the outline,not just the first level
		treeViewer.expandAll();

	}

	/***
	 * 
	 * @author zhihaoguo
	 * Copyright 2013
	 * 
	 */
	// this method is use to show the outline item
	private class SimpleLabelProvider extends LabelProvider {
		String nameOfClass = null;

		@Override
		public String getText(Object element) {
			if (element instanceof ITypedRegion) {
				ITypedRegion region = (ITypedRegion) element;
				int offset = region.getOffset();

				try {
					//"\r"means carriage return,in eclipse,it seems just '\n' is not line feed
					//JSConstant.stringOffsetLength ,the default value is 200
					String text = input.get(region.getOffset(), JSConstant.stringOffsetLength)
							.replaceAll("\t*\n*\b*\r* *", "");
					if (text.startsWith("declarePackage")) {
						String tag1 = "(\"";
						String tag2 = "\")";
						return subString(tag1, tag2, text);
					} else if (text.startsWith("load")) {
						String tag1 = "],\"";
						String tag2 = "\",";
						nameOfClass = subString(tag1, tag2, text);
						if (nameOfClass.equals(ERROR)) {
							String tag3 = "null,\"";
							String tag4 = "\",";
							nameOfClass = subString(tag3, tag4, text);
						}
						return nameOfClass;

					} else if (text.startsWith("makeConstructor")) {
						return nameOfClass.substring(nameOfClass
								.lastIndexOf(".") + 1)
								+ '('
								+ paramList(offset) + ')';

					} else if (text.startsWith("defineMethod")||text.startsWith("overrideMethod")) {
						String tag1 = ",\"";
						String tag2 = "\",";
						return subString(tag1, tag2, text) + '('
								+ paramList(offset) + ')';
					}
					return input.get(region.getOffset(), region.getLength());
				} catch (BadLocationException e) {
				}
			}
			return super.getText(element);
		}
	}

	private String subString(String tag1, String tag2, String text) {
		int beginIdx = text.indexOf(tag1) + tag1.length();
		int endIdx = text.indexOf(tag2, beginIdx);
		if (text.indexOf(tag1) != -1 && endIdx != -1)
			return text.substring(beginIdx, endIdx);
		else
			return ERROR;

	}

	// return the string of function's parameter list
	private String paramList(int offset) {
		int n = 0;
		try {
			Stack stack = new Stack();
			Character c1 = input.getChar(offset + n++);

			while (!c1.equals('('))
				c1 = input.getChar(offset + n++);
			stack.push(c1);

			while (!stack.isEmpty()) {
				c1 = (Character) stack.peek();
				Character c2 = input.getChar(offset + n++);
				if (c2.equals(')') | c2.equals('(')) {
					if (c1.equals('(') && c2.equals(')'))
						stack.pop();
					else {
						stack.push(c2);
					}
				}

			}
			String bodyText = input.get(offset, n).replaceAll("\t*\n* *", "");
			String tag1 = "},\"";
			String tag2 = "\")";

			int beginIdx = bodyText.indexOf(tag1) + tag1.length();
			int endIdx = bodyText.indexOf(tag2, beginIdx);
			if (bodyText.indexOf(tag1) != -1 && endIdx != -1)
				return Parameter_types(bodyText.substring(beginIdx, endIdx));
			else
				return " ";

		} catch (BadLocationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		return ERROR;

	}

	private String Parameter_types(String paramters_before) {
		String paramters[] = paramters_before.split(",");
		for (int i = 0; i < paramters.length; i++) {
			if (paramters[i].equals("~N")) {

				paramters[i] = "Number";

			} else if (paramters[i].equals("~B")) {

				paramters[i] = "Boolean";

			} else if (paramters[i].equals("~S")) {

				paramters[i] = "String";

			} else if (paramters[i].equals("~O")) {

				paramters[i] = "Object";

			} else if (paramters[i].equals("~A")) {

				paramters[i] = "Array";

			}

		}
		String parameters_changeType = paramters[paramters.length - 1];
		for (int i = paramters.length - 2; i >= 0; i--) {
			parameters_changeType = paramters[i] + ", " + parameters_changeType;
		}
		return parameters_changeType;

	}

	public void setInput(IDocument element) {
		this.input = element;
		if (getTreeViewer() != null) {
			getTreeViewer().setInput(element);
		}
	}

	/**
	 * Gets the content outline for a given input element. Returns the outline
	 * or null if the outline could not be generated.
	 * 
	 * @param input
	 * 
	 * @return
	 */
	private IAdaptable getContentOutline(IDocument input) {
		return JSSyntaxModelFactory.getInstance().getContentOutline(input);
	}

	@Override
	public void caretMoved(CaretEvent event) {
		try {
			ITypedRegion region = input.getPartition(event.caretOffset);

			if (getTreeViewer() != null) {
				getTreeViewer().setSelection(new StructuredSelection(region));
				getTreeViewer().reveal(region);
				getTreeViewer().expandToLevel(region, TreeViewer.ALL_LEVELS);
			}

		} catch (BadLocationException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void inputDocumentAboutToBeChanged(IDocument oldInput,
			IDocument newInput) {
		// TODO Auto-generated method stub

	}

	@Override
	public void inputDocumentChanged(IDocument oldInput, IDocument newInput) {
		// TODO Auto-generated method stub

	}

	/**
	 * Forces the outlinePage to update its contents.
	 * 
	 * //aborted public void update() {
	 * 
	 * }
	 */

}
