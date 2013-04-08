Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
Clazz.load (["net.sf.j2s.core.astvisitors.AbstractPluginVisitor", "java.util.ArrayList"], "net.sf.j2s.core.astvisitors.ASTVariableVisitor", ["java.lang.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.v$ = null;
this.isFinalSensible = true;
this.normalVars = null;
this.visitedVars = null;
this.toCompileVariableName = true;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "ASTVariableVisitor", net.sf.j2s.core.astvisitors.AbstractPluginVisitor);
Clazz.prepareFields (c$, function () {
this.v$ =  new java.util.ArrayList ();
this.normalVars =  new java.util.ArrayList ();
this.visitedVars =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "isToCompileVariableName", 
function () {
return this.toCompileVariableName;
});
Clazz.defineMethod (c$, "setToCompileVariableName", 
function (toCompileVariableName) {
this.toCompileVariableName = toCompileVariableName;
}, "~B");
Clazz.defineMethod (c$, "getVariableName", 
function (name) {
for (var i = this.normalVars.size () - 1; i >= 0; i--) {
var $var = this.normalVars.get (i);
if (name.equals ($var.variableName)) {
return $var.toVariableName;
}}
return name;
}, "~S");
Clazz.defineMethod (c$, "getIndexedVarName", 
function (name, i) {
if (!this.toCompileVariableName) {
return name;
}var newName = null;
while (true) {
if (i < 26) {
newName = String.valueOf (String.fromCharCode ((('a').charCodeAt (0) + i)));
} else if (i < 52) {
newName = String.valueOf (String.fromCharCode ((('A').charCodeAt (0) + (i - 26))));
} else {
var h = Math.floor (i / 26);
var l = i % 26;
newName = String.valueOf (String.fromCharCode ((('a').charCodeAt (0) + h))) + String.valueOf (String.fromCharCode ((('a').charCodeAt (0) + l)));
}for (var iter = this.v$.iterator (); iter.hasNext (); ) {
var f = iter.next ();
if (newName.equals (f.toVariableName)) {
newName = null;
i++;
break;
}}
if (newName != null) {
for (var iter = this.normalVars.iterator (); iter.hasNext (); ) {
var f = iter.next ();
if (newName.equals (f.toVariableName)) {
newName = null;
i++;
break;
}}
}if (newName != null) {
break;
}}
return newName;
}, "~S,~N");
Clazz.defineMethod (c$, "listFinalVariables", 
function (list, seperator, scope) {
if (list.size () == 0) {
return "null";
}var buf =  new StringBuffer ();
buf.append ("Clazz.cloneFinals (");
for (var iter = list.iterator (); iter.hasNext (); ) {
var fv = iter.next ();
var name = fv.variableName;
if (fv.toVariableName != null) {
name = fv.toVariableName;
}buf.append ("\"");
buf.append (name);
buf.append ("\", ");
var methodScope = fv.methodScope;
if (methodScope == null && scope == null) {
buf.append (name);
} else if (methodScope == null || scope == null) {
buf.append ("this.f$." + name);
} else if (methodScope.equals (scope)) {
buf.append (name);
} else {
buf.append ("this.f$." + name);
}if (iter.hasNext ()) {
buf.append (seperator);
}}
buf.append (")");
return buf.toString ();
}, "java.util.List,~S,~S");
Clazz.defineMethod (c$, "checkConstantValue", 
function (node) {
var constValue = node.resolveConstantExpressionValue ();
if (constValue != null && (Clazz.instanceOf (constValue, Number) || Clazz.instanceOf (constValue, Character) || Clazz.instanceOf (constValue, Boolean))) {
var buffer =  new StringBuffer ();
if (Clazz.instanceOf (constValue, Character)) {
buffer.append ('\'');
var charValue = (constValue).charValue ();
if ((charValue).charCodeAt (0) < 32 || (charValue).charCodeAt (0) > 127) {
buffer.append ("\\u");
var hexStr = Integer.toHexString (charValue.charCodeAt (0));
var zeroLen = 4 - hexStr.length;
for (var i = 0; i < zeroLen; i++) {
buffer.append ('0');
}
buffer.append (hexStr);
} else {
buffer.append (constValue);
}buffer.append ('\'');
} else {
buffer.append (constValue);
}return buffer.toString ();
}if (constValue != null && (Clazz.instanceOf (constValue, String))) {
var buffer =  new StringBuffer ();
var str = constValue;
var length = str.length;
buffer.append ("\"");
for (var i = 0; i < length; i++) {
var c = str.charAt (i);
if ((c).charCodeAt (0) == ('\\').charCodeAt (0) || (c).charCodeAt (0) == ('\'').charCodeAt (0) || (c).charCodeAt (0) == ('\"').charCodeAt (0)) {
buffer.append ('\\');
buffer.append (c);
} else if ((c).charCodeAt (0) == ('\r').charCodeAt (0)) {
buffer.append ("\\r");
} else if ((c).charCodeAt (0) == ('\n').charCodeAt (0)) {
buffer.append ("\\n");
} else if ((c).charCodeAt (0) == ('\t').charCodeAt (0)) {
buffer.append ("\\t");
} else if ((c).charCodeAt (0) == ('\f').charCodeAt (0)) {
buffer.append ("\\f");
} else if ((c).charCodeAt (0) < 32 || (c).charCodeAt (0) > 127) {
buffer.append ("\\u");
var hexStr = Integer.toHexString (c.charCodeAt (0));
var zeroLen = 4 - hexStr.length;
for (var k = 0; k < zeroLen; k++) {
buffer.append ('0');
}
buffer.append (hexStr);
} else {
buffer.append (c);
}}
buffer.append ("\"");
return buffer.toString ();
}return null;
}, "org.eclipse.jdt.core.dom.Expression");
});
