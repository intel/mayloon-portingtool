/*
 * $RCSfile: JSDocumentProvider.java,v $
 *
 * Copyright 2002
 * CH-1700 Fribourg, Switzerland
 * All rights reserved.
 *
 *========================================================================
 * Modifications history
 *========================================================================
 * $Log: JSDocumentProvider.java,v $
 * Revision 1.1  2003/05/28 15:17:11  agfitzp
 * net.sourceforge.jseditor 0.0.1 code base
 *
 *========================================================================
*/

package net.sourceforge.jseditor.editors;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IDocumentPartitioner;
import org.eclipse.jface.text.rules.DefaultPartitioner;
import org.eclipse.jface.text.rules.FastPartitioner;
import org.eclipse.ui.editors.text.FileDocumentProvider;

/**
 * 
 *
 * @author $Author: agfitzp $, $Date: 2003/05/28 15:17:11 $
 *
 * @version $Revision: 1.1 $
 */
public class JSDocumentProvider extends FileDocumentProvider {

	/**
	 * Array of constant token types that will be color hilighted.
	 */
	private static String[] colorTokens= { 
		JSPartitionScanner.JS_COMMENT,
		JSPartitionScanner.JS_STRING, 
		JSPartitionScanner.JS_KEYWORD 
	};

	/**
	 * Constructor for JSDocumentProvider.
	 */
	public JSDocumentProvider() {
		super();
	}

	/**
	 * @param element 
	 *
	 * @return 
	 *
	 * @throws CoreException 
	 */
	/*
	 * 文档分割（Document Partition）。 Editor编辑的内容封装在IDocument类中，对于编辑内容的遍历、定位都是在IDocument基础上来实现。 
	 * 文档的分割信息以及其它原数据信息有Editor保存，定位信息封装在Position 类中。
	 * 打开一个文档的时候编辑器 自动进行分割处理得到各种不同内容类型（content type ）的互不重叠的文本块。
	 * 分割器的设置是在 IDocument的createDocument（）方法中设置(non-Javadoc)
	 * @see org.eclipse.ui.editors.text.StorageDocumentProvider#createDocument(java.lang.Object)
	 */
	protected IDocument createDocument(Object element) throws CoreException {
		IDocument document = super.createDocument(element);

		//这是早期的做法
//		if (document != null) {
//			IDocumentPartitioner partitioner =
//				new DefaultPartitioner(new JSPartitionScanner(), colorTokens);
//			//将文档对象与IDocumentPartitioner实例关联起来
//			partitioner.connect(document);
//			document.setDocumentPartitioner(partitioner);
//		}
		
		if (document != null) {
			IDocumentPartitioner partitioner = 
			new FastPartitioner(new JSPartitionScanner(), JSPartitionScanner.LEGAL_CONTENT_TYPES);
			
//			if(partitioner==null)
//				System.out.println("partitioner=null");
//			else System.out.println("partitioner=not null");
			// connect it with document
			partitioner.connect(document);
			document.setDocumentPartitioner(partitioner);
		}

		return document;
	}
}