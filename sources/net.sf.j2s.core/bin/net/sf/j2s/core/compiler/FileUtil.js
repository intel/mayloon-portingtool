Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (null, "net.sf.j2s.core.compiler.FileUtil", ["java.io.FileReader", "java.lang.StringBuffer"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.compiler, "FileUtil");
c$.readSource = Clazz.defineMethod (c$, "readSource", 
function (f) {
var sb =  new StringBuffer ();
try {
var reader =  new java.io.FileReader (f);
var buf =  Clazz.newArray (1024, '\0');
var read = reader.read (buf);
while (read != -1) {
sb.append (buf, 0, read);
read = reader.read (buf);
}
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.io.FileNotFoundException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
return sb.toString ();
}, "java.io.File");
});
