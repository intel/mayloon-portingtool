Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
c$ = Clazz.decorateAsClass (function () {
this.blockLevel = 0;
this.methodScope = null;
this.variableName = null;
this.toVariableName = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "ASTFinalVariable");
Clazz.makeConstructor (c$, 
function (blockLevel, variableName, methodScope) {
this.blockLevel = blockLevel;
this.variableName = variableName;
this.methodScope = methodScope;
}, "~N,~S,~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.variableName + ":" + this.variableName;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
var prime = 31;
var result = 1;
result = 31 * result + this.blockLevel;
result = 31 * result + ((this.methodScope == null) ? 0 : this.methodScope.hashCode ());
result = 31 * result + ((this.toVariableName == null) ? 0 : this.toVariableName.hashCode ());
result = 31 * result + ((this.variableName == null) ? 0 : this.variableName.hashCode ());
return result;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) return true;
if (obj == null) return false;
if (this.getClass () !== obj.getClass ()) return false;
var other = obj;
if (this.blockLevel != other.blockLevel) return false;
if (this.methodScope == null) {
if (other.methodScope != null) return false;
} else if (!this.methodScope.equals (other.methodScope)) return false;
if (this.toVariableName == null) {
if (other.toVariableName != null) return false;
} else if (!this.toVariableName.equals (other.toVariableName)) return false;
if (this.variableName == null) {
if (other.variableName != null) return false;
} else if (!this.variableName.equals (other.variableName)) return false;
return true;
}, "~O");
