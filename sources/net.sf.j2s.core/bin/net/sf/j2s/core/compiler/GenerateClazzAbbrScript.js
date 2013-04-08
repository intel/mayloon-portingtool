Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (null, "net.sf.j2s.core.compiler.GenerateClazzAbbrScript", ["java.lang.StringBuffer", "net.sf.j2s.core.compiler.Java2ScriptCompiler"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.compiler, "GenerateClazzAbbrScript");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var clazzAbbrMap = net.sf.j2s.core.compiler.Java2ScriptCompiler.getClazzAbbrMap ();
var buf =  new StringBuffer ();
for (var i = 0; i < Math.floor (clazzAbbrMap.length / 2); i++) {
buf.append ("$_" + clazzAbbrMap[i + i + 1] + "=" + clazzAbbrMap[i + i] + ";");
}
System.out.println (buf.toString ());
}, "~A");
});
