var path = ClazzLoader.getClasspathFor ("net.sf.j2s.core.astvisitors.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "DependencyASTVisitor.js", [
"net.sf.j2s.core.astvisitors.DependencyASTVisitor",
"$.QNTypeBinding"]);
