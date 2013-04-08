Clazz.declarePackage ("net.sf.j2s.core.builder");
c$ = Clazz.declareType (net.sf.j2s.core.builder, "ClasspathLocation");
c$.forSourceFolder = Clazz.defineMethod (c$, "forSourceFolder", 
function (sourceFolder, outputFolder, inclusionPatterns, exclusionPatterns) {
return  new net.sf.j2s.core.builder.ClasspathMultiDirectory (sourceFolder, outputFolder, inclusionPatterns, exclusionPatterns);
}, "org.eclipse.core.resources.IContainer,org.eclipse.core.resources.IContainer,~A,~A");
c$.forBinaryFolder = Clazz.defineMethod (c$, "forBinaryFolder", 
function (binaryFolder, isOutputFolder, accessRuleSet) {
return  new net.sf.j2s.core.builder.ClasspathDirectory (binaryFolder, isOutputFolder, accessRuleSet);
}, "org.eclipse.core.resources.IContainer,~B,org.eclipse.jdt.internal.compiler.env.AccessRuleSet");
c$.forLibrary = Clazz.defineMethod (c$, "forLibrary", 
function (libraryPathname, lastModified, accessRuleSet) {
return  new net.sf.j2s.core.builder.ClasspathJar (libraryPathname, lastModified, accessRuleSet);
}, "~S,~N,org.eclipse.jdt.internal.compiler.env.AccessRuleSet");
c$.forLibrary = Clazz.defineMethod (c$, "forLibrary", 
function (libraryPathname, accessRuleSet) {
return net.sf.j2s.core.builder.ClasspathLocation.forLibrary (libraryPathname, 0, accessRuleSet);
}, "~S,org.eclipse.jdt.internal.compiler.env.AccessRuleSet");
c$.forLibrary = Clazz.defineMethod (c$, "forLibrary", 
function (library, accessRuleSet) {
return  new net.sf.j2s.core.builder.ClasspathJar (library, accessRuleSet);
}, "org.eclipse.core.resources.IFile,org.eclipse.jdt.internal.compiler.env.AccessRuleSet");
Clazz.defineMethod (c$, "isOutputFolder", 
function () {
return false;
});
Clazz.defineMethod (c$, "cleanup", 
function () {
});
Clazz.defineMethod (c$, "reset", 
function () {
});
