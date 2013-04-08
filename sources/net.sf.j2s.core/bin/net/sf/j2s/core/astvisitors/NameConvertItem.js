Clazz.declarePackage ("net.sf.j2s.core.astvisitors");
c$ = Clazz.decorateAsClass (function () {
this.className = null;
this.varName = null;
this.toVarName = null;
this.isMethod = false;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.astvisitors, "NameConvertItem");
Clazz.makeConstructor (c$, 
function (className, varName, toVarName, isMethod) {
this.className = className;
this.varName = varName;
this.toVarName = toVarName;
this.isMethod = isMethod;
}, "~S,~S,~S,~B");
