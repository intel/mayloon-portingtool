package net.sourceforge.jseditor.editors;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.ITextViewer;
import org.eclipse.jface.text.contentassist.CompletionProposal;
import org.eclipse.jface.text.contentassist.ContextInformation;
import org.eclipse.jface.text.contentassist.ContextInformationValidator;
import org.eclipse.jface.text.contentassist.ICompletionProposal;
import org.eclipse.jface.text.contentassist.IContentAssistProcessor;
import org.eclipse.jface.text.contentassist.IContextInformation;
import org.eclipse.jface.text.contentassist.IContextInformationValidator;
import org.eclipse.swt.graphics.Point;

public class JsContentAssistProcessor implements IContentAssistProcessor {
	// Proposal part before cursor
	private final static String[] STRUCTTAGS1 = new String[] {
			"Clazz.getClassName(clazzHost)",
			"Clazz.getClass(clazzHost)",
			"Clazz.implementOf(clazzThis, interfacez)",
			"Clazz.instanceOf(obj, clazz)",
			"Clazz.superCall(objThis, clazzThis, funName, funParams)",
			"Clazz.superConstructor(objThis, clazzThis, funParams)",
			"Clazz.castNullAs(asClazz)",
			"Clazz.overrideMethod(clazzThis, funName, funBody, funParams)",
			"Clazz.defineMethod(clazzThis, funName, funBody, funParams)",
			"Clazz.makeConstructor(clazzThis, funBody, funParams)",
			"Clazz.isClassUnloaded(clzz)",
			"Clazz.declarePackage(pkgName)",
			"Clazz.defineType(qClazzName, clazzFun, clazzParent, interfacez)",
			"Clazz.declareType(prefix, name, clazzParent, interfacez, ",
			"Clazz.declareAnonymous(prefix, name, clazzParent, interfacez, ",
			"Clazz.innerTypeInstance(clazzInner, objThis, finalVars)",
			"Clazz.isClassDefined = Clazz.isDefinedClass(clazzName)",
			"Clazz.defineEnumConstant(clazzEnum, enumName, enumOrdinal, initialParams, clazzEnumExt)",
			"Clazz.newArray ()", "Clazz.makeFunction(jsr)",
			"Clazz.registerSerializableFields(clazz)",
			"Clazz.checkprivateMethod(args)", "Clazz.intCast(n) ",
			"Clazz.shortCast(s) ", "Clazz.byteCast(b) ", "Clazz.charCast(c) ",
			"Clazz.floatCast(f) ", "Clazz.longLeftShift(l, o) ",
			"Clazz.intLeftShift(n, o) ", "Clazz.longRightShift(l, o) ",
			"Clazz.intRightShift(n, o) ", "Clazz.long0RightShift(l, o) ",
			"Clazz.int0RightShift(n, o) ", "Clazz.forName(clazzName)",
			"Clazz.unloadClass(qClazzName)",
			"Clazz.addEvent(element, type, handler)",
			"Clazz.removeEvent(element, type, handler)",
			"ClazzLoader.addBinaryFolder(bin)",
			"ClazzLoader.removeBinaryFolder(bin)",
			"ClazzLoader.setPrimaryFolder(bin)",
			"ClazzLoader.setLoadingMode(mode, timeLag)",
			"ClazzLoader.packageClasspath(pkg, base, index)",
			"ClazzLoader.jarClasspath(jar, clazzes)",
			"ClazzLoader.registerPackages(prefix, pkgs)",
			"ClazzLoader.getClasspathFor(clazz, forRoot, ext)",
			"ClazzLoader.ignore()",
			"ClazzLoader.loadClass(name, optionalsLoaded, forced, async)",
			"ClazzLoader.loadJ2SApp(clazz, args, loaded)",
			"ClazzLoader.loadJUnit(clazz, args)",
			"ClazzLoader.loadZJar(zjarPath, keyClazz)",
			"ClazzLoader.updateHotspot()", "clpm.initialize(parent)",
			"clpm.showStatus(msg, fading)", "Console.clear()",
			"window.popup = window.alert;", "window.alert(s)",
			"window.error(s)", "window.log(s)", "window.assert()",
			"System.arraycopy(src, srcPos, dest, destPos, length)",
			"System.out = new JavaObject ();", "System.out.print(s) ",
			"System.out.println(s)", "System.err.print(s) ",
			"System.err.println(s)"

	};
	// Proposal part after cursor,

	private final static String[] STRUCTTAGS2 = new String[] { "", "", "", "",
			"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "", "", ""

	};

	private final static String[] STRUCTTAGS3 = new String[] { "Clazz" };
	private final static String[] STRUCTTAGS4 = new String[] { "Clazz.declarePackage()" };

	private final static String[] STYLETAGS = new String[] { "b", "i", "code",
			"strong" };
	private final static String[] STYLELABELS = new String[] { "bold",
			"italic", "code", "strong" };

	@Override
	public ICompletionProposal[] computeCompletionProposals(ITextViewer viewer,
			int offset) {
		// TODO Auto-generated method stub
		// Retrieve current document
		IDocument doc = viewer.getDocument();
		// Retrieve current selection range
		Point selectedRange = viewer.getSelectedRange();

		List propList = new ArrayList();

		if (selectedRange.y > 0) {
			try {
				// Retrieve selected text
				String text = doc.get(selectedRange.x, selectedRange.y);
				// Compute completion proposals
				computeStyleProposals(text, selectedRange, propList);
			} catch (BadLocationException e) {
			}
		} else {// Retrieve qualifier
			String qualifier = getQualifier(doc, offset);
			// Compute completion proposals
			computeStructureProposals(qualifier, offset, propList);
		}

		// Create completion proposal array
		ICompletionProposal[] proposals = new ICompletionProposal[propList
				.size()];
		// and fill with list elements
		propList.toArray(proposals);
		// Return the proposals
		return proposals;
	}

	private void computeStyleProposals(String selectedText,
			Point selectedRange, List propList) {
		// Loop through all styles
		for (int i = 0; i < STYLETAGS.length; i++) {
			String tag = STYLETAGS[i];
			// Compute replacement text
			String replacement = "<" + tag + ">" + selectedText + "</" + tag
					+ ">";
			// Derive cursor position
			int cursor = tag.length() + 2;
			// Compute a suitable context information
			IContextInformation contextInfo = new ContextInformation(null,
					STYLELABELS[i] + " Style");
			// Construct proposal
			CompletionProposal proposal = new CompletionProposal(replacement,
					selectedRange.x, selectedRange.y, cursor, null,
					STYLELABELS[i], contextInfo, replacement);
			// and add to result list
			propList.add(proposal);
		}
	}

	// pre
	private String getQualifier(IDocument doc, int documentOffset) {
		// Use string buffer to collect characters
		StringBuffer buf = new StringBuffer();
		while (true) {
			try {
				// Read character backwards
				// --------------debug------------------
				//String Sc = doc.get();
				// System.out.println("debug--sc"+Sc);
				while(true)
				{
					char c = doc.getChar(--documentOffset);
					if (c==' ')
						break;
						buf.append(c);
					
				}
				
				//System.out.println("doc.getpartition----"
				//		+ doc.getPartition(documentOffset).toString());

//				System.out.println("debug--" + c);
//				// This was not the start of a tag
//				if (c == '>' || Character.isWhitespace(c))
//					return "";
//				// Collect character
//				buf.append(c);
//				// Start of tag. Return qualifier
//				if (c == '<')
//					return buf.reverse().toString();
//				if (c == 'C') 
//					System.out.println("debug------");
//					System.out.println(buf.reverse().toString());
					return buf.reverse().toString();
				


			} catch (BadLocationException e) {
				// Document start reached, no tag found
				return "";
			}
		}
	}

	private void computeStructureProposals(String qualifier,
			int documentOffset, List propList) {
		int qlen = qualifier.length();
		// Loop through all proposals
		for (int i = 0; i < STRUCTTAGS1.length; i++) {
			String startTag = STRUCTTAGS1[i];
			// Check if proposal matches qualifier
			if (startTag.startsWith(qualifier)) {
				// Yes -- compute whole proposal text
				String text = startTag + STRUCTTAGS2[i];
				// Derive cursor position
				int cursor = startTag.length();
				// Construct proposal
				CompletionProposal proposal = new CompletionProposal(text,
						documentOffset - qlen, qlen, cursor);
				// and add to result list
				propList.add(proposal);
			}
		}
	}

	@Override
	public IContextInformation[] computeContextInformation(ITextViewer viewer,
			int offset) {
		// TODO Auto-generated method stub

		// Retrieve selected range
		Point selectedRange = viewer.getSelectedRange();
		if (selectedRange.y > 0) {
			// Text is selected. Create a context information array.
			ContextInformation[] contextInfos = new ContextInformation[STYLELABELS.length];
			// Create one context information item for each style
			for (int i = 0; i < STYLELABELS.length; i++)
				contextInfos[i] = new ContextInformation("<" + STYLETAGS[i]
						+ ">", STYLELABELS[i] + " Style");
			return contextInfos;
		}
		return new ContextInformation[0];
	}

	@Override
	public char[] getCompletionProposalAutoActivationCharacters() {
		// TODO Auto-generated method stub
		return new char[] { '.' };
	}

	@Override
	public char[] getContextInformationAutoActivationCharacters() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getErrorMessage() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IContextInformationValidator getContextInformationValidator() {
		// TODO Auto-generated method stub
		return new ContextInformationValidator(this);
	}

}
