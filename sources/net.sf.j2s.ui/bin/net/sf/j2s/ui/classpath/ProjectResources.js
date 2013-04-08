Clazz.declarePackage ("net.sf.j2s.ui.classpath");
Clazz.load (["net.sf.j2s.ui.classpath.CompositeResources"], "net.sf.j2s.ui.classpath.ProjectResources", ["java.io.File"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.classpath, "ProjectResources", net.sf.j2s.ui.classpath.CompositeResources);
Clazz.overrideMethod (c$, "getAbsoluteFile", 
function () {
return  new java.io.File (this.getFolder (), this.getRelativePath ());
});
Clazz.overrideMethod (c$, "getName", 
function () {
var path = this.getRelativePath ();
return path.substring (1, path.indexOf ('/', 2));
});
Clazz.overrideMethod (c$, "exists", 
function () {
return  new java.io.File (this.getFolder (), this.getRelativePath ()).exists ();
});
Clazz.overrideMethod (c$, "getBinRelativePath", 
function () {
return this.getRelativePath ().substring (0, this.getRelativePath ().lastIndexOf ('/') + 1);
});
Clazz.overrideMethod (c$, "getType", 
function () {
return 1;
});
});
