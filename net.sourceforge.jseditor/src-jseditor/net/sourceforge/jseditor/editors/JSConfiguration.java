/*
 * $RCSfile: JSConfiguration.java,v $
 *
 * Copyright 2002
 * CH-1700 Fribourg, Switzerland
 * All rights reserved.
 *
 *========================================================================
 * Modifications history
 *========================================================================
 * $Log: JSConfiguration.java,v $
 * Revision 1.3  2003/12/10 20:19:16  agfitzp
 * 3.0 port
 *
 * Revision 1.2  2003/06/21 03:48:51  agfitzp
 * fixed global variables as functions bug
 * fixed length calculation of instance variables
 * Automatic outlining is now a preference
 *
 * Revision 1.1  2003/05/28 15:17:12  agfitzp
 * net.sourceforge.jseditor 0.0.1 code base
 *
 *========================================================================
 */

package net.sourceforge.jseditor.editors;

import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.StyleRange;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.jface.resource.StringConverter;
import org.eclipse.jface.text.DefaultInformationControl;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IInformationControl;
import org.eclipse.jface.text.IInformationControlCreator;
import org.eclipse.jface.text.ITextDoubleClickStrategy;
import org.eclipse.jface.text.TextAttribute;
import org.eclipse.jface.text.TextPresentation;
import org.eclipse.jface.text.contentassist.ContentAssistant;
import org.eclipse.jface.text.contentassist.IContentAssistProcessor;
import org.eclipse.jface.text.contentassist.IContentAssistant;
import org.eclipse.jface.text.presentation.IPresentationReconciler;
import org.eclipse.jface.text.presentation.PresentationReconciler;
import org.eclipse.jface.text.rules.DefaultDamagerRepairer;
import org.eclipse.jface.text.rules.Token;
import org.eclipse.jface.text.source.ISourceViewer;
import org.eclipse.jface.text.source.SourceViewerConfiguration;
import org.eclipse.jface.preference.IPreferenceStore;

import net.sourceforge.jseditor.JSEditorPlugin;
import net.sourceforge.jseditor.preferences.PreferenceNames;

/**
 * 
 * 
 * @author $Author: agfitzp $, $Date: 2003/12/10 20:19:16 $
 * 
 * @version $Revision: 1.3 $
 */

// 提到Text Editor,就不得不提到与之密切相关的SourceViewerConfiguration类,
// Text Editor的许多功能都是通过该类配置上去的,还有一个是IDocumentProvider接口,
// Text Editor所要编辑的文件对象就是通过该接口提供的.
//

public class JSConfiguration extends SourceViewerConfiguration {
	private JSDoubleClickStrategy doubleClickStrategy;
	private JSStringScanner stringScanner;
	private JSScanner scanner;
	private JSColorManager colorManager;
	private IPreferenceStore preferences;

	/**
	 * Creates a new JSConfiguration object.
	 * 
	 * @param colorManager
	 */
	public JSConfiguration(JSColorManager colorManager) {
		this.colorManager = colorManager;
		this.preferences = JSEditorPlugin.getDefault().getPreferenceStore();
	}

	public boolean getAutomaticOutliningPreference() {
		return preferences.getBoolean(PreferenceNames.P_AUTO_OUTLINE);
	}

	protected RGB getColorPreference(String categoryColor) {
		String rgbString = preferences.getString(categoryColor);

		if (rgbString.length() <= 0) {
			rgbString = preferences.getDefaultString(categoryColor);
			if (rgbString.length() <= 0) {
				rgbString = "0,0,0";
			}
		}
		return StringConverter.asRGB(rgbString);
	}

	public Color getContentColor(String categoryColor) {
		return colorManager.getColor(getColorPreference(categoryColor));
	}

	/**
	 * 
	 * 
	 * @param sourceViewer
	 * 
	 * @return
	 */
	public String[] getConfiguredContentTypes(ISourceViewer sourceViewer) {
		return new String[] { IDocument.DEFAULT_CONTENT_TYPE,
				JSPartitionScanner.JS_COMMENT, JSPartitionScanner.JS_KEYWORD,
				JSPartitionScanner.JS_DEFAULT,

				JSPartitionScanner.JS_STRING };
	}

	/***
	 * contentassistant
	 */

	@Override
	public IContentAssistant getContentAssistant(ISourceViewer sourceViewer) {
		// TODO Auto-generated method stub
		//
		ContentAssistant assistant = new ContentAssistant();
		IContentAssistProcessor JsContentAssistProcessor = new JsContentAssistProcessor();

		// Set this processor for each supported content type
		assistant.setContentAssistProcessor(JsContentAssistProcessor,
				JSPartitionScanner.JS_COMMENT);
		assistant.setContentAssistProcessor(JsContentAssistProcessor,
				JSPartitionScanner.JS_DEFAULT);
		assistant.setContentAssistProcessor(JsContentAssistProcessor,
				JSPartitionScanner.JS_KEYWORD);
		assistant.setContentAssistProcessor(JsContentAssistProcessor,
				JSPartitionScanner.JS_STRING);

		assistant.setContentAssistProcessor(JsContentAssistProcessor,
				IDocument.DEFAULT_CONTENT_TYPE);

		assistant
				.setInformationControlCreator(getInformationControlCreator(sourceViewer));
		assistant.enableAutoActivation(true);
		assistant.setAutoActivationDelay(250);

		Color bgColor = colorManager.getColor(new RGB(230, 255, 230));
		assistant.setProposalSelectorBackground(bgColor);
		
		return assistant;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.jface.text.source.SourceViewerConfiguration#
	 * getInformationControlCreator(org.eclipse.jface.text.source.ISourceViewer)
	 */
	@Override
	public IInformationControlCreator getInformationControlCreator(
			ISourceViewer sourceViewer) {
		return new IInformationControlCreator() {
			public IInformationControl createInformationControl(Shell parent) {
				return new DefaultInformationControl(parent, presenter);
			}
		};
	}

	// The presenter instance for the information window
	private static final DefaultInformationControl.IInformationPresenter presenter = new DefaultInformationControl.IInformationPresenter() {
		public String updatePresentation(Display display, String infoText,
				TextPresentation presentation, int maxWidth, int maxHeight) {
			int start = -1;
			// Loop over all characters of information text
			for (int i = 0; i < infoText.length(); i++) {
				switch (infoText.charAt(i)) {
				case '<':
					// Remember start of tag
					start = i;
					break;
				case 'C':
					// Remember start of tag
					start = i;
					break;
				case '>':
					if (start >= 0) {
						// We have found a tag and create a new style range
						StyleRange range = new StyleRange(start, i - start + 1,
								null, null, SWT.BOLD);
						// Add this style range to the presentation
						presentation.addStyleRange(range);
						// Reset tag start indicator
						start = -1;
					}
					break;
				}
			}
			// Return the information text
			return infoText;
		}
	};

	/**
	 * 
	 * 
	 * @param sourceViewer
	 * @param contentType
	 * 
	 * @return
	 */
	public ITextDoubleClickStrategy getDoubleClickStrategy(
			ISourceViewer sourceViewer, String contentType) {
		if (doubleClickStrategy == null) {
			doubleClickStrategy = new JSDoubleClickStrategy();

		}

		return doubleClickStrategy;
	}

	/**
	 * 
	 * 
	 * @return
	 */
	protected JSScanner getJSScanner() {
		if (scanner == null) {
			Color defaultColor = getContentColor(PreferenceNames.P_DEFAULT_COLOR);
			scanner = new JSScanner(defaultColor);
			scanner.setDefaultReturnToken(new Token(new TextAttribute(
					defaultColor)));
		}

		return scanner;
	}

	/**
	 * 
	 * 
	 * @return
	 */
	protected JSStringScanner getJSStringScanner() {
		if (stringScanner == null) {
			Color stringColor = getContentColor(PreferenceNames.P_STRING_COLOR);
			stringScanner = new JSStringScanner(stringColor);
			stringScanner.setDefaultReturnToken(new Token(new TextAttribute(
					stringColor)));
		}

		return stringScanner;
	}

	/**
	 * 
	 * 
	 * @param sourceViewer
	 * 
	 * @return
	 */
	// getPresentationReconciler()方法来给指定的内容类型添加语法高亮的特性
	public IPresentationReconciler getPresentationReconciler(
			ISourceViewer sourceViewer) {
		// IPresentationReconciler实例,他是用来监听底层的IDocument实例的变动
		PresentationReconciler reconciler = new PresentationReconciler();

		DefaultDamagerRepairer dr = new DefaultDamagerRepairer(getJSScanner());
		reconciler.setDamager(dr, IDocument.DEFAULT_CONTENT_TYPE);
		reconciler.setRepairer(dr, IDocument.DEFAULT_CONTENT_TYPE);

		//something about comment
		NonRuleBasedDamagerRepairer commentRepairer = new NonRuleBasedDamagerRepairer(
				new TextAttribute(JSTextColorConstants.JS_COMMENT));
		reconciler.setDamager(commentRepairer, JSPartitionScanner.JS_COMMENT);
		reconciler.setRepairer(commentRepairer, JSPartitionScanner.JS_COMMENT);

		NonRuleBasedDamagerRepairer stringRepairer = new NonRuleBasedDamagerRepairer(
				new TextAttribute(
						getContentColor(PreferenceNames.P_STRING_COLOR)));
		reconciler.setDamager(stringRepairer, JSPartitionScanner.JS_STRING);
		reconciler.setRepairer(stringRepairer, JSPartitionScanner.JS_STRING);

		NonRuleBasedDamagerRepairer keywordRepairer = new NonRuleBasedDamagerRepairer(
				new TextAttribute(
						getContentColor(PreferenceNames.P_KEYWORD_COLOR), null,
						SWT.BOLD));
		reconciler.setDamager(keywordRepairer, JSPartitionScanner.JS_KEYWORD);
		reconciler.setRepairer(keywordRepairer, JSPartitionScanner.JS_KEYWORD);

		//3 levels about outline
		NonRuleBasedDamagerRepairer outlineRepairer =new NonRuleBasedDamagerRepairer(
				new TextAttribute(JSTextColorConstants.JS_OUTLINE));
		reconciler.setDamager(outlineRepairer, JSPartitionScanner.JS_OUTlINE_1);
		reconciler.setRepairer(outlineRepairer, JSPartitionScanner.JS_OUTlINE_1);
		reconciler.setDamager(outlineRepairer, JSPartitionScanner.JS_OUTlINE_2);
		reconciler.setRepairer(outlineRepairer, JSPartitionScanner.JS_OUTlINE_2);
		reconciler.setDamager(outlineRepairer, JSPartitionScanner.JS_OUTlINE_3);
		reconciler.setRepairer(outlineRepairer, JSPartitionScanner.JS_OUTlINE_3);
		
		return reconciler;
	}

	/**
	 * @return
	 */
	public IPreferenceStore getPreferences() {
		return preferences;
	}

	/**
	 * @param store
	 */
	public void setPreferences(IPreferenceStore store) {
		preferences = store;
	}

}