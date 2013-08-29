/*
 * $RCSfile: JSPartitionScanner.java,v $
 *
 * Copyright 2002
 * CH-1700 Fribourg, Switzerland
 * All rights reserved.
 *
 *========================================================================
 * Modifications history
 *========================================================================
 * $Log: JSPartitionScanner.java,v $
 * Revision 1.4  2004/04/05 20:50:48  rdclark
 * Updated for Eclipse 3.0M8
 *
 * Revision 1.3  2003/05/30 20:53:09  agfitzp
 * 0.0.2 : Outlining is now done as the user types. Some other bug fixes.
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

import java.util.ArrayList;
import java.util.List;

//import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.rules.*;
/**
 * 
 *
 * @author $Author: rdclark $, $Date: 2004/04/05 20:50:48 $
 *
 * @version $Revision: 1.4 $
 */
public class JSPartitionScanner extends RuleBasedPartitionScanner {
	//three classes of outline//此处一定要写“__dftl_partition_content_type”
	public final static String JS_DEFAULT = "__dftl_partition_content_type";
	public final static String JS_COMMENT = "__js_comment";
	public final static String JS_KEYWORD = "__js_keyword";
	public final static String JS_STRING = "__js_string";
	//three classes of outline
	public final static String JS_OUTlINE_1 = "__js_outline_1";
	public final static String JS_OUTlINE_2 = "__js_outline_2";
	public final static String JS_OUTlINE_3 = "__js_outline_3";
	
	public final static String[] LEGAL_CONTENT_TYPES = {JS_DEFAULT, JS_COMMENT, JS_KEYWORD, JS_STRING,JS_OUTlINE_1,JS_OUTlINE_2,JS_OUTlINE_3};

	
	public final static IToken TOKEN_STRING = new Token(JS_STRING);
	public final static IToken TOKEN_COMMENT = new Token(JS_COMMENT);
	public final static IToken TOKEN_DEFAULT = new Token(JS_DEFAULT);
	public final static IToken TOKEN_KEYWORD = new Token(JS_KEYWORD);
	public final static IToken TOKEN_OUTLINE_1 = new Token(JS_OUTlINE_1);
	public final static IToken TOKEN_OUTLINE_2 = new Token(JS_OUTlINE_2);
	public final static IToken TOKEN_OUTLINE_3 = new Token(JS_OUTlINE_3);
	/**
	 * Array of keyword token strings.
	 */
	private static String[] keywordTokens= {
		"break", 
		"case", "catch", "continue", 
		"default", "do", 
		"else", 
		"for","function",
		"goto", 
		"if", "in", 
		"new", "System",
		"return",
		"switch",
		"this", "throw", "try",
		"var", "void",
		"while", "with","Clazz"
		
	};

	/**
	 * Array of constant token strings.
	 */
	private static String[] constantTokens= { "false", "null", "true" };

	/**
	 * Creates a new JSPartitionScanner object.
	 */
	//-----------------------------------
	//attention ，此处的数字不能大也不能小
	//the number must be the right number
	//public final static int NUMBER_OF_RULES = 7;
	public JSPartitionScanner() {
		List rules = new ArrayList();
		//patternrule的规则必须放前面,匹配是默认匹配的，前面的匹配就不会匹配后面
		//attention:declarePackage
		//同一个token可以有多个patternrule
		
		rules.add(new PatternRule("Clazz.declarePackag", "e", TOKEN_OUTLINE_1, (char) 0, true));
		rules.add(new PatternRule("Clazz.defineMetho", "d", TOKEN_OUTLINE_2, (char) 0, true));
		rules.add(new PatternRule("Clazz.overrideMetho", "d", TOKEN_OUTLINE_2, (char) 0, true));
		
		rules.add(new PatternRule("Clazz.makeConstructo", "r", TOKEN_OUTLINE_3, (char) 0, true));
		rules.add(new PatternRule("Clazz.loa", "d", TOKEN_OUTLINE_1, (char) 0, true));
		rules.add(new PatternRule("Clazz.declareTyp", "e", TOKEN_OUTLINE_1, (char) 0, true));
		rules.add(new PatternRule("Clazz.instantializ", "e", TOKEN_OUTLINE_1, (char) 0, true));
		
		rules.add(new MultiLineRule("/*", "*/", TOKEN_COMMENT));
		rules.add(new EndOfLineRule("//", TOKEN_COMMENT));
		rules.add(new SingleLineRule("\"", "\"", TOKEN_STRING, '\\'));
		rules.add(new SingleLineRule("'", "'", TOKEN_STRING, '\\'));
		PredicateWordRule keywordRule = new PredicateWordRule(new JSWordDetector(), TOKEN_DEFAULT, keywordTokens, TOKEN_KEYWORD);
		keywordRule.addWords(constantTokens, TOKEN_KEYWORD);
		rules.add(keywordRule);
		
		//outline rule,3 levels

		
		IPredicateRule[] result = new IPredicateRule[rules.size()];
		rules.toArray(result);
		setPredicateRules(result);
	}


//	private void setRuleList(List rules)
//	{
//		IPredicateRule[] result = new IPredicateRule[rules.size()];
//		rules.toArray(result);
//		setPredicateRules(result);
//	}
}
