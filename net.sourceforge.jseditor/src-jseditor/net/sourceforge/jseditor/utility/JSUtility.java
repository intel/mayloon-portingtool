package net.sourceforge.jseditor.utility;

import net.sourceforge.jseditor.editors.JSTextColorConstants;

import org.eclipse.jface.text.ITextViewer;
import org.eclipse.jface.text.TextPresentation;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.StyleRange;

public class JSUtility {
	public static String keywords[]={"Clazz"};
	public static void setKeywordTextColor(ITextViewer iTextView){
		String doc=iTextView.getDocument().get();
		for(int i=0;i<keywords.length;i++){
			int offset = doc.indexOf(keywords[i]);
			int length = keywords[i].length();
			while (offset != -1) {
				StyleRange range = new StyleRange();
				// The range of word
				range.foreground=JSTextColorConstants.JS_KEYWORD;
				range.borderColor=JSTextColorConstants.JS_KEYWORD;
				range.start = offset;
				range.length = length;
				range.fontStyle=SWT.BOLD;
				TextPresentation presentation = new TextPresentation();
				// set TextPresentation with the StyleRange parameter
				presentation.setDefaultStyleRange(range);
				iTextView.changeTextPresentation(presentation, true);
				offset = doc.indexOf(keywords[i], offset + length);
			}
		}
		
	}
	

}
