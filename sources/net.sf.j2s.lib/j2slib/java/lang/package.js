var path = ClazzLoader.getClasspathFor ("java.lang.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "System.js", [
"java.lang.SystemProperties",
"$.System"]);
ClazzLoader.jarClasspath (path + "ClassLoader.js", [
"java.lang.TwoEnumerationsInOne",
"$.BootClassLoader",
"$.ClassLoader"]);
