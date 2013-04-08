Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["net.sf.j2s.core.builder.ClasspathLocation"], "net.sf.j2s.core.builder.ClasspathDirectory", ["org.eclipse.core.runtime.Path", "org.eclipse.jdt.internal.compiler.env.NameEnvironmentAnswer", "org.eclipse.jdt.internal.compiler.util.SimpleLookupTable", "$.SuffixConstants", "$.Util", "org.eclipse.jdt.internal.core.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.binaryFolder = null;
this.$isOutputFolder = false;
this.directoryCache = null;
this.missingPackageHolder = null;
this.accessRuleSet = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "ClasspathDirectory", net.sf.j2s.core.builder.ClasspathLocation);
Clazz.prepareFields (c$, function () {
this.missingPackageHolder =  new Array (1);
});
Clazz.makeConstructor (c$, 
function (binaryFolder, isOutputFolder, accessRuleSet) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.ClasspathDirectory, []);
this.binaryFolder = binaryFolder;
this.$isOutputFolder = isOutputFolder || binaryFolder.getProjectRelativePath ().isEmpty ();
this.directoryCache =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (5);
this.accessRuleSet = accessRuleSet;
}, "org.eclipse.core.resources.IContainer,~B,org.eclipse.jdt.internal.compiler.env.AccessRuleSet");
Clazz.overrideMethod (c$, "cleanup", 
function () {
this.directoryCache = null;
});
Clazz.defineMethod (c$, "directoryList", 
function (qualifiedPackageName) {
var dirList = this.directoryCache.get (qualifiedPackageName);
if (dirList === this.missingPackageHolder) return null;
if (dirList != null) return dirList;
try {
var container = this.binaryFolder.findMember (qualifiedPackageName);
if (Clazz.instanceOf (container, org.eclipse.core.resources.IContainer)) {
var members = (container).members ();
dirList =  new Array (members.length);
var index = 0;
for (var i = 0, l = members.length; i < l; i++) {
var m = members[i];
if (m.getType () == 1 && org.eclipse.jdt.internal.compiler.util.Util.isClassFileName (m.getName ())) dirList[index++] = m.getName ();
}
if (index < dirList.length) System.arraycopy (dirList, 0, dirList =  new Array (index), 0, index);
this.directoryCache.put (qualifiedPackageName, dirList);
return dirList;
}} catch (ignored) {
if (Clazz.instanceOf (ignored, org.eclipse.core.runtime.CoreException)) {
} else {
throw ignored;
}
}
this.directoryCache.put (qualifiedPackageName, this.missingPackageHolder);
return null;
}, "~S");
Clazz.defineMethod (c$, "doesFileExist", 
function (fileName, qualifiedPackageName, qualifiedFullName) {
var dirList = this.directoryList (qualifiedPackageName);
if (dirList == null) return false;
for (var i = dirList.length; --i >= 0; ) if (fileName.equals (dirList[i])) return true;

return false;
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (this === o) return true;
if (!(Clazz.instanceOf (o, net.sf.j2s.core.builder.ClasspathDirectory))) return false;
var dir = o;
if (this.accessRuleSet !== dir.accessRuleSet) if (this.accessRuleSet == null || !this.accessRuleSet.equals (dir.accessRuleSet)) return false;
return this.binaryFolder.equals (dir.binaryFolder);
}, "~O");
Clazz.overrideMethod (c$, "findClass", 
function (binaryFileName, qualifiedPackageName, qualifiedBinaryFileName) {
if (!this.doesFileExist (binaryFileName, qualifiedPackageName, qualifiedBinaryFileName)) return null;
var reader = null;
try {
reader = org.eclipse.jdt.internal.core.util.Util.newClassFileReader (this.binaryFolder.getFile ( new org.eclipse.core.runtime.Path (qualifiedBinaryFileName)));
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.CoreException)) {
var e = e$$;
{
return null;
}
} else if (Clazz.instanceOf (e$$, org.eclipse.jdt.internal.compiler.classfmt.ClassFormatException)) {
var e = e$$;
{
return null;
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
return null;
}
} else {
throw e$$;
}
}
if (reader != null) {
if (this.accessRuleSet == null) return  new org.eclipse.jdt.internal.compiler.env.NameEnvironmentAnswer (reader, null);
var fileNameWithoutExtension = qualifiedBinaryFileName.substring (0, qualifiedBinaryFileName.length - org.eclipse.jdt.internal.compiler.util.SuffixConstants.SUFFIX_CLASS.length);
return  new org.eclipse.jdt.internal.compiler.env.NameEnvironmentAnswer (reader, this.accessRuleSet.getViolatedRestriction (fileNameWithoutExtension.toCharArray ()));
}return null;
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "getProjectRelativePath", 
function () {
return this.binaryFolder.getProjectRelativePath ();
});
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.binaryFolder == null ? Clazz.superCall (this, net.sf.j2s.core.builder.ClasspathDirectory, "hashCode", []) : this.binaryFolder.hashCode ();
});
Clazz.defineMethod (c$, "isExcluded", 
function (resource) {
return false;
}, "org.eclipse.core.resources.IResource");
Clazz.overrideMethod (c$, "isOutputFolder", 
function () {
return this.$isOutputFolder;
});
Clazz.overrideMethod (c$, "isPackage", 
function (qualifiedPackageName) {
return this.directoryList (qualifiedPackageName) != null;
}, "~S");
Clazz.overrideMethod (c$, "reset", 
function () {
this.directoryCache =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable (5);
});
Clazz.overrideMethod (c$, "toString", 
function () {
var start = "Binary classpath directory " + this.binaryFolder.getFullPath ().toString ();
if (this.accessRuleSet == null) return start;
return start + " with " + this.accessRuleSet;
});
Clazz.overrideMethod (c$, "debugPathString", 
function () {
return this.binaryFolder.getFullPath ().toString ();
});
});
