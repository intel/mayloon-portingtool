Clazz.declarePackage ("net.sf.j2s.core.builder");
Clazz.load (["net.sf.j2s.core.builder.ClasspathLocation", "org.eclipse.jdt.internal.compiler.util.SimpleLookupTable"], "net.sf.j2s.core.builder.ClasspathJar", ["java.io.File", "java.lang.Thread", "java.util.Date", "java.util.zip.ZipFile", "org.eclipse.jdt.internal.compiler.classfmt.ClassFileReader", "org.eclipse.jdt.internal.compiler.env.NameEnvironmentAnswer", "org.eclipse.jdt.internal.compiler.util.SimpleSet", "$.SuffixConstants", "org.eclipse.jdt.internal.core.JavaModelManager", "org.eclipse.jdt.internal.core.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.zipFilename = null;
this.resource = null;
this.zipFile = null;
this.$lastModified = 0;
this.closeZipFileAtEnd = false;
this.knownPackageNames = null;
this.accessRuleSet = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder, "ClasspathJar", net.sf.j2s.core.builder.ClasspathLocation);
c$.findPackageSet = Clazz.defineMethod (c$, "findPackageSet", 
function (jar) {
var zipFileName = jar.zipFilename;
var lastModified = jar.lastModified ();
var fileSize =  new java.io.File (zipFileName).length ();
var cacheEntry = net.sf.j2s.core.builder.ClasspathJar.PackageCache.get (zipFileName);
if (cacheEntry != null && cacheEntry.lastModified == lastModified && cacheEntry.fileSize == fileSize) return cacheEntry.packageSet;
var packageSet =  new org.eclipse.jdt.internal.compiler.util.SimpleSet (41);
packageSet.add ("");
nextEntry : for (var e = jar.zipFile.entries (); e.hasMoreElements (); ) {
var fileName = (e.nextElement ()).getName ();
var last = fileName.lastIndexOf ('/');
while (last > 0) {
var packageName = fileName.substring (0, last);
if (packageSet.addIfNotIncluded (packageName) == null) continue nextEntry;last = packageName.lastIndexOf ('/');
}
}
net.sf.j2s.core.builder.ClasspathJar.PackageCache.put (zipFileName,  new net.sf.j2s.core.builder.ClasspathJar.PackageCacheEntry (lastModified, fileSize, packageSet));
return packageSet;
}, "net.sf.j2s.core.builder.ClasspathJar");
Clazz.makeConstructor (c$, 
function (resource, accessRuleSet) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.ClasspathJar, []);
this.resource = resource;
try {
var location = resource.getLocationURI ();
if (location == null) {
this.zipFilename = "";
} else {
var localFile = org.eclipse.jdt.internal.core.util.Util.toLocalFile (location, null);
this.zipFilename = localFile.getPath ();
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
this.zipFile = null;
this.knownPackageNames = null;
this.accessRuleSet = accessRuleSet;
}, "org.eclipse.core.resources.IFile,org.eclipse.jdt.internal.compiler.env.AccessRuleSet");
Clazz.makeConstructor (c$, 
function (zipFilename, lastModified, accessRuleSet) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.ClasspathJar, []);
this.zipFilename = zipFilename;
this.$lastModified = lastModified;
this.zipFile = null;
this.knownPackageNames = null;
this.accessRuleSet = accessRuleSet;
}, "~S,~N,org.eclipse.jdt.internal.compiler.env.AccessRuleSet");
Clazz.makeConstructor (c$, 
function (zipFile, accessRuleSet) {
Clazz.superConstructor (this, net.sf.j2s.core.builder.ClasspathJar, []);
this.zipFilename = zipFile.getName ();
this.zipFile = zipFile;
this.closeZipFileAtEnd = false;
this.knownPackageNames = null;
this.accessRuleSet = accessRuleSet;
}, "java.util.zip.ZipFile,org.eclipse.jdt.internal.compiler.env.AccessRuleSet");
Clazz.overrideMethod (c$, "cleanup", 
function () {
if (this.zipFile != null && this.closeZipFileAtEnd) {
try {
this.zipFile.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.zipFile = null;
}this.knownPackageNames = null;
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (this === o) return true;
if (!(Clazz.instanceOf (o, net.sf.j2s.core.builder.ClasspathJar))) return false;
var jar = o;
if (this.accessRuleSet !== jar.accessRuleSet) if (this.accessRuleSet == null || !this.accessRuleSet.equals (jar.accessRuleSet)) return false;
return this.zipFilename.equals (jar.zipFilename) && this.lastModified () == jar.lastModified ();
}, "~O");
Clazz.overrideMethod (c$, "findClass", 
function (binaryFileName, qualifiedPackageName, qualifiedBinaryFileName) {
if (!this.isPackage (qualifiedPackageName)) return null;
try {
var reader = org.eclipse.jdt.internal.compiler.classfmt.ClassFileReader.read (this.zipFile, qualifiedBinaryFileName);
if (reader != null) {
if (this.accessRuleSet == null) return  new org.eclipse.jdt.internal.compiler.env.NameEnvironmentAnswer (reader, null);
var fileNameWithoutExtension = qualifiedBinaryFileName.substring (0, qualifiedBinaryFileName.length - org.eclipse.jdt.internal.compiler.util.SuffixConstants.SUFFIX_CLASS.length);
return  new org.eclipse.jdt.internal.compiler.env.NameEnvironmentAnswer (reader, this.accessRuleSet.getViolatedRestriction (fileNameWithoutExtension.toCharArray ()));
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
return null;
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "getProjectRelativePath", 
function () {
if (this.resource == null) return null;
return this.resource.getProjectRelativePath ();
});
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.zipFilename == null ? Clazz.superCall (this, net.sf.j2s.core.builder.ClasspathJar, "hashCode", []) : this.zipFilename.hashCode ();
});
Clazz.overrideMethod (c$, "isPackage", 
function (qualifiedPackageName) {
if (this.knownPackageNames != null) return this.knownPackageNames.includes (qualifiedPackageName);
try {
if (this.zipFile == null) {
if (org.eclipse.jdt.internal.core.JavaModelManager.ZIP_ACCESS_VERBOSE) {
System.out.println ("(" + Thread.currentThread () + ") [ClasspathJar.isPackage(String)] Creating ZipFile on " + this.zipFilename);
}this.zipFile =  new java.util.zip.ZipFile (this.zipFilename);
this.closeZipFileAtEnd = true;
}this.knownPackageNames = net.sf.j2s.core.builder.ClasspathJar.findPackageSet (this);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.knownPackageNames =  new org.eclipse.jdt.internal.compiler.util.SimpleSet ();
} else {
throw e;
}
}
return this.knownPackageNames.includes (qualifiedPackageName);
}, "~S");
Clazz.defineMethod (c$, "lastModified", 
function () {
if (this.$lastModified == 0) this.$lastModified =  new java.io.File (this.zipFilename).lastModified ();
return this.$lastModified;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var start = "Classpath jar file " + this.zipFilename;
if (this.accessRuleSet == null) return start;
return start + " with " + this.accessRuleSet;
});
Clazz.overrideMethod (c$, "debugPathString", 
function () {
var time = this.lastModified ();
if (time == 0) return this.zipFilename;
return this.zipFilename + '(' + ( new java.util.Date (time)) + " : " + time + ')';
});
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.lastModified = 0;
this.fileSize = 0;
this.packageSet = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.builder.ClasspathJar, "PackageCacheEntry");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.lastModified = a;
this.fileSize = b;
this.packageSet = c;
}, "~N,~N,org.eclipse.jdt.internal.compiler.util.SimpleSet");
c$ = Clazz.p0p ();
c$.PackageCache = c$.prototype.PackageCache =  new org.eclipse.jdt.internal.compiler.util.SimpleLookupTable ();
});
