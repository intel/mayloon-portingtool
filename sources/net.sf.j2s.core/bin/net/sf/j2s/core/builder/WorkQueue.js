Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (null, "net.sf.j2s.core.builder.WorkQueue", ["org.eclipse.jdt.internal.compiler.util.SimpleSet"], function () {
c$ = Clazz.decorateAsClass (function () {
this.needsCompileList = null;
this.compiledList = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "WorkQueue");
Clazz.makeConstructor (c$, 
function () {
this.needsCompileList =  new org.eclipse.jdt.internal.compiler.util.SimpleSet ();
this.compiledList =  new org.eclipse.jdt.internal.compiler.util.SimpleSet ();
});
Clazz.defineMethod (c$, "add", 
function (element) {
this.needsCompileList.add (element);
}, "net.sf.j2s.core.builder.SourceFile");
Clazz.defineMethod (c$, "addAll", 
function (elements) {
for (var i = 0, l = elements.length; i < l; i++) this.add (elements[i]);

}, "~A");
Clazz.defineMethod (c$, "clear", 
function () {
this.needsCompileList.clear ();
this.compiledList.clear ();
});
Clazz.defineMethod (c$, "finished", 
function (element) {
this.needsCompileList.remove (element);
this.compiledList.add (element);
}, "net.sf.j2s.core.builder.SourceFile");
Clazz.defineMethod (c$, "isCompiled", 
function (element) {
return this.compiledList.includes (element);
}, "net.sf.j2s.core.builder.SourceFile");
Clazz.defineMethod (c$, "isWaiting", 
function (element) {
return this.needsCompileList.includes (element);
}, "net.sf.j2s.core.builder.SourceFile");
Clazz.overrideMethod (c$, "toString", 
function () {
return "WorkQueue: " + this.needsCompileList;
});
});
