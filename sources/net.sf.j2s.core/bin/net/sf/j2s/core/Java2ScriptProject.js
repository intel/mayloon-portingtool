Clazz.declarePackage ("net.sf.j2s.core");
c$ = Clazz.declareType (net.sf.j2s.core, "Java2ScriptProject");
c$.hasJava2ScriptNature = Clazz.defineMethod (c$, "hasJava2ScriptNature", 
function (project) {
try {
return project.hasNature ("net.sf.j2s.java2scriptnature");
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
if (" ".equals (project.getName ())) return true;
} else {
throw e;
}
}
return false;
}, "org.eclipse.core.resources.IProject");
