Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["net.sf.j2s.core.builder.ClasspathDirectory"], "net.sf.j2s.core.builder.ClasspathMultiDirectory", ["org.eclipse.jdt.core.compiler.CharOperation", "org.eclipse.jdt.internal.core.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sourceFolder = null;
this.inclusionPatterns = null;
this.exclusionPatterns = null;
this.hasIndependentOutputFolder = false;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "ClasspathMultiDirectory", net.sf.j2s.core.builder.ClasspathDirectory);
Clazz.makeConstructor (c$, 
function (sourceFolder, binaryFolder, inclusionPatterns, exclusionPatterns) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.ClasspathMultiDirectory, [binaryFolder, true, null]);
this.sourceFolder = sourceFolder;
this.inclusionPatterns = inclusionPatterns;
this.exclusionPatterns = exclusionPatterns;
this.hasIndependentOutputFolder = false;
if (this.inclusionPatterns != null && this.inclusionPatterns.length == 0) this.inclusionPatterns = null;
if (this.exclusionPatterns != null && this.exclusionPatterns.length == 0) this.exclusionPatterns = null;
}, "org.eclipse.core.resources.IContainer,org.eclipse.core.resources.IContainer,~A,~A");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (this === o) return true;
if (!(Clazz.instanceOf (o, net.sf.j2s.core.builder.ClasspathMultiDirectory))) return false;
var md = o;
return this.sourceFolder.equals (md.sourceFolder) && this.binaryFolder.equals (md.binaryFolder) && org.eclipse.jdt.core.compiler.CharOperation.equals (this.inclusionPatterns, md.inclusionPatterns) && org.eclipse.jdt.core.compiler.CharOperation.equals (this.exclusionPatterns, md.exclusionPatterns);
}, "~O");
Clazz.overrideMethod (c$, "isExcluded", 
function (resource) {
if (this.exclusionPatterns != null || this.inclusionPatterns != null) if (this.sourceFolder.equals (this.binaryFolder)) return org.eclipse.jdt.internal.core.util.Util.isExcluded (resource, this.inclusionPatterns, this.exclusionPatterns);
return false;
}, "org.eclipse.core.resources.IResource");
Clazz.defineMethod (c$, "toString", 
function () {
return "Source classpath directory " + this.sourceFolder.getFullPath ().toString () + " with " + Clazz.superCall (this, net.sf.j2s.core.builder.ClasspathMultiDirectory, "toString", []);
});
});
