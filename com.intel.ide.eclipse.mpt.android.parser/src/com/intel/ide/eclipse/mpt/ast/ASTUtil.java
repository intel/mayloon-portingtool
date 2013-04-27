package com.intel.ide.eclipse.mpt.ast;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.ExpressionStatement;
import org.eclipse.jdt.core.dom.ImportDeclaration;
import org.eclipse.jdt.core.dom.InfixExpression;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.StringLiteral;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.internal.corext.dom.ASTNodeFactory;

/**
 * Utitility class.
 * 
 */
public class ASTUtil {
	/**
	 * Hidden. Call the static methods.
	 */
	private ASTUtil() {
	}

	/**
	 * Finds the parent {@link Block} of a {@link Statement}.
	 * 
	 * @param s
	 *            the {@link Statement} to find the its parent {@link Block} for
	 * @return the parent block of {@code s}
	 */
	public static Block getParentBlock(Statement s) {
		ASTNode node = s;
		while (!(node instanceof Block)) {
			node = node.getParent();
		}
		return (Block) node;
	}

	/**
	 * Get the short (unqualified) class name from a fully qualified one.
	 * 
	 * @param cTypeFull
	 * @return 2
	 */
	public static String getShortClassName(String cTypeFull) {
		return cTypeFull.replaceAll("\\w*\\.", "");
	}

	/**
	 * 
	 * 
	 */
	public static MethodDeclaration generateStubMethodBody(AST ast, String methodName, Type returnType, int modifiers, List parameters) {

		MethodDeclaration md = ast.newMethodDeclaration();
		
		// comment
		Javadoc javadoc= ast.newJavadoc();
		final TagElement tagCommentJ2SNative = ast.newTagElement();
		TextElement text = ast.newTextElement();
		text.setText("@j2sNative");
		tagCommentJ2SNative.fragments().add(text);
		
		final TagElement tagCommentAlert = ast.newTagElement();
		text = ast.newTextElement();
		text.setText("alert(\"Missing method: " + methodName + "\");");
		tagCommentAlert.fragments().add(text);

		javadoc.tags().add(tagCommentJ2SNative);
		javadoc.tags().add(tagCommentAlert);
		
		md.setJavadoc(javadoc);
		
		// method name
        md.setName(ast.newSimpleName(methodName));
        md.setConstructor(false);
        
        // modifier
        md.modifiers().addAll(ASTNodeFactory.newModifiers(ast, modifiers));
        
        // return type
        if (returnType != null) {
        	if (returnType.isPrimitiveType()) {
            	PrimitiveType primitiveType = (PrimitiveType)returnType;
            	md.setReturnType2(ast.newPrimitiveType(primitiveType.getPrimitiveTypeCode()));
            }else if(returnType.isSimpleType()){
            	md.setReturnType2(ast.newSimpleType(ast.newSimpleName(returnType.toString())));
            }else if(returnType.isArrayType()){
            	md.setReturnType2(generateArrayType(ast, returnType));	
            }else if(returnType.isParameterizedType()){
            	md.setReturnType2(generateParameterizedType(ast, returnType));
            }else {
            	md.setReturnType2(returnType);
            }
        }      
        
        // ARGUMENTS
        List mdParameters = md.parameters();
 		for (int i = 0; i < parameters.size(); i++) {

 			SingleVariableDeclaration hashCodeParam= ast.newSingleVariableDeclaration();
 			SingleVariableDeclaration para = (SingleVariableDeclaration) parameters.get(i);
 			
 			if (para.getType().isPrimitiveType()) {
 				PrimitiveType primitiveType = (PrimitiveType)para.getType();
 				hashCodeParam.setType(ast.newPrimitiveType(primitiveType.getPrimitiveTypeCode()));
 			} else if (para.getType().isArrayType()) {
 				hashCodeParam.setType(generateArrayType(ast, para.getType()));
 			} else if(para.getType().isSimpleType()){
 				String simpleName = para.getType().toString();
 	    		if (simpleName.contains(".")) {
 	    			String[] simpleNameArray = simpleName.split("\\.");
 	    			QualifiedName name = ast.newQualifiedName(ast.newSimpleName(simpleNameArray[0]),
 	    					ast.newSimpleName(simpleNameArray[1]));
 	    			hashCodeParam.setType(ast.newSimpleType(name));
 	    		} else {
 	    			hashCodeParam.setType(ast.newSimpleType(ast.newSimpleName(para.getType().toString())));
 	    		}
 			} else if(para.getType().isParameterizedType()){
 				hashCodeParam.setType(generateParameterizedType(ast, para.getType()));
 			} else {
 				hashCodeParam.setType(para.getType());
 			}
 			hashCodeParam.setName(ast.newSimpleName(para.getName().toString()));
 			mdParameters.add(hashCodeParam);
 		}
 		
 		// Stub method Body
        Block block = ast.newBlock();
		
        // needed import
		ImportDeclaration importDeclaration = ast.newImportDeclaration();
		QualifiedName name = ast.newQualifiedName(ast.newSimpleName("java"),
				ast.newSimpleName("util"));
		importDeclaration.setName(name);
		importDeclaration.setOnDemand(true);

		// System.out.println
		MethodInvocation methodInvocation = ast.newMethodInvocation();
		name = ast.newQualifiedName(ast.newSimpleName("System"),
				ast.newSimpleName("out"));
		methodInvocation.setExpression(name);
		methodInvocation.setName(ast.newSimpleName("println"));
		InfixExpression infixExpression = ast.newInfixExpression();
		infixExpression.setOperator(InfixExpression.Operator.PLUS);
		StringLiteral literal = ast.newStringLiteral();
		literal.setLiteralValue("Stub");
		infixExpression.setLeftOperand(literal);
		literal = ast.newStringLiteral();
		literal.setLiteralValue(" Function : " + methodName);
		infixExpression.setRightOperand(literal);
		methodInvocation.arguments().add(infixExpression);
		ExpressionStatement expressionStatement = ast
				.newExpressionStatement(methodInvocation);
		block.statements().add(expressionStatement);
		
		// Stub method END Return
		ReturnStatement endReturn= ast.newReturnStatement();
		if (returnType != null) {
			if (returnType.isPrimitiveType()) {
	        	PrimitiveType primitiveType = (PrimitiveType)returnType;
	        	if (primitiveType.getPrimitiveTypeCode().equals(PrimitiveType.VOID)) {
	        		endReturn.setExpression(null);
	        	} else if (primitiveType.getPrimitiveTypeCode().equals(PrimitiveType.BOOLEAN)) {
	        		endReturn.setExpression(ast.newBooleanLiteral(true));
	        	} else {
	        		endReturn.setExpression(ast.newNumberLiteral("0"));
	        	}
	        } else {
	        	endReturn.setExpression(ast.newNullLiteral());
	        }
		}
		
		block.statements().add(endReturn);
		
		md.setBody(block);

		return md;
	}

	/**
	 * generate ArrayType to satisfy the SetType demand
	 * 
	 * @param ast
	 * @param originalType
	 * @return
	 */
	public static ArrayType generateArrayType(AST ast, Type originalType) {
		ArrayType arrayType = (ArrayType)originalType;
		ArrayType generateType;
		if(arrayType.getComponentType().isArrayType()){
			ArrayType componentType = generateArrayType(ast, arrayType.getComponentType());
			generateType = ast.newArrayType(componentType);
		}else if(arrayType.getComponentType().isSimpleType()){
    		String simpleName = arrayType.getComponentType().toString();
    		if (simpleName.contains(".")) {
    			String[] simpleNameArray = simpleName.split("\\.");
    			QualifiedName name = ast.newQualifiedName(ast.newSimpleName(simpleNameArray[0]),
    					ast.newSimpleName(simpleNameArray[1]));
    			generateType = ast.newArrayType(ast.newSimpleType(name));
    		} else {
    			generateType = ast.newArrayType(ast.newSimpleType(ast.newSimpleName(simpleName)));
    		}
    	}else if(arrayType.getComponentType().isPrimitiveType()){
    		PrimitiveType primitiveType = (PrimitiveType)arrayType.getComponentType();
    		generateType = ast.newArrayType(ast.newPrimitiveType(primitiveType.getPrimitiveTypeCode()));
    	}else {
    		generateType = arrayType;
    	}
		
    	return generateType;
	}
	
	public static ParameterizedType generateParameterizedType(AST ast, Type originalType){
		ParameterizedType parameterizedType = (ParameterizedType) originalType;
		ParameterizedType generateType;
		if(parameterizedType.getType().isSimpleType()){
			String parameterizedTypeName = parameterizedType.getType().toString();
			generateType = ast.newParameterizedType(ast.newSimpleType(ast.newSimpleName(parameterizedTypeName)));
		}else{
			generateType = parameterizedType;
		}
		
		List<Type> arguments = parameterizedType.typeArguments();
		for (int i = 0; i != arguments.size(); i++) {
			Type argumentType;
			if(arguments.get(i).isSimpleType()) {
				String simpleName = arguments.get(i).toString();
				argumentType = ast.newSimpleType(ast.newSimpleName(simpleName));
			} else if(arguments.get(i).isParameterizedType()) {
				argumentType = generateParameterizedType(ast, arguments.get(i));			
			} else if (arguments.get(i).isArrayType()) {
				argumentType = ast.newArrayType(ast.newSimpleType(ast.newSimpleName(arguments.get(i).toString())));
			} else if (arguments.get(i).isParameterizedType()) {
				argumentType = ast.newParameterizedType(arguments.get(i));
			} else if (arguments.get(i).isQualifiedType()) {
				String simpleName = arguments.get(i).toString();
				if (simpleName.contains(".")) {
	    			String[] simpleNameArray = simpleName.split("\\.");
	    			QualifiedName name = ast.newQualifiedName(ast.newSimpleName(simpleNameArray[0]),
	    					ast.newSimpleName(simpleNameArray[1]));
	    			argumentType = ast.newSimpleType(name);
				} else {
					argumentType = ast.newSimpleType(ast.newSimpleName(simpleName));
				}
			} else if (arguments.get(i).isWildcardType()) {
				argumentType = ast.newWildcardType();
			} else {
				String simpleName = arguments.get(i).toString();
				argumentType = ast.newSimpleType(ast.newSimpleName(simpleName));
			}
			generateType.typeArguments().add(argumentType);
		}
		return generateType;
	}
}
