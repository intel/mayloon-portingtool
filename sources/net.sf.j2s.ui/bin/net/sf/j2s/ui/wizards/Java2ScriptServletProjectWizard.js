Clazz.declarePackage ("net.sf.j2s.ui.wizards");
Clazz.load (["net.sf.j2s.ui.wizards.Java2ScriptProjectWizard"], "net.sf.j2s.ui.wizards.Java2ScriptServletProjectWizard", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "java.lang.StringBuffer", "java.util.ArrayList", "net.sf.j2s.ajax.AjaxPlugin", "net.sf.j2s.ui.launching.J2SLaunchingUtil", "$.JavaRuntime", "net.sf.j2s.ui.property.FileUtil", "org.eclipse.core.runtime.Path", "$.Platform", "org.eclipse.jdt.core.JavaCore"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.wizards, "Java2ScriptServletProjectWizard", net.sf.j2s.ui.wizards.Java2ScriptProjectWizard);
Clazz.overrideMethod (c$, "updateJava2ScriptWizardTitle", 
function () {
this.setWindowTitle (this.getWindowTitle () + " with Java2Script AJAX and SWT Enabled");
});
Clazz.overrideMethod (c$, "updateJava2ScriptLibraries", 
function (classpathModel, j2sLibPath) {
var entry = net.sf.j2s.ui.launching.JavaRuntime.newArchiveRuntimeClasspathEntry (j2sLibPath + "/swt.j2x");
if (entry != null) {
(entry).setAbsolute (true);
classpathModel.addResource (entry);
}}, "net.sf.j2s.ui.property.J2SClasspathModel,~S");
Clazz.defineMethod (c$, "updateJavaLibraries", 
function (defaultEntries) {
var list =  new java.util.ArrayList ();
for (var i = 0; i < defaultEntries.length; i++) {
list.add (i, defaultEntries[i]);
}
list.add (org.eclipse.jdt.core.JavaCore.newVariableEntry ( new org.eclipse.core.runtime.Path ("ECLIPSE_SWT"), null, null));
list.add (org.eclipse.jdt.core.JavaCore.newVariableEntry ( new org.eclipse.core.runtime.Path ("AJAX_SWT"),  new org.eclipse.core.runtime.Path ("AJAX_SWT_SRC"), null));
list.add (org.eclipse.jdt.core.JavaCore.newVariableEntry ( new org.eclipse.core.runtime.Path ("AJAX_RPC"),  new org.eclipse.core.runtime.Path ("AJAX_RPC_SRC"), null));
list.add (org.eclipse.jdt.core.JavaCore.newVariableEntry ( new org.eclipse.core.runtime.Path ("AJAX_PIPE"),  new org.eclipse.core.runtime.Path ("AJAX_PIPE_SRC"), null));
return Clazz.superCall (this, net.sf.j2s.ui.wizards.Java2ScriptServletProjectWizard, "updateJavaLibraries", [list.toArray ( new Array (list.size ()))]);
}, "~A");
Clazz.overrideMethod (c$, "updateJava2ScriptProject", 
function (prjFolder, binRelative) {
try {
var cpFile =  new java.io.File (prjFolder, ".classpath");
var fis =  new java.io.FileInputStream (cpFile);
var classpath = net.sf.j2s.ui.launching.J2SLaunchingUtil.readAFile (fis);
if (classpath != null) {
var needUpdate = false;
if (classpath.indexOf ("ECLIPSE_SWT") == -1 && classpath.indexOf ("SWT_LIBRARY") == -1 && classpath.indexOf ("eclipse.swt") == -1) {
var idx = classpath.lastIndexOf ("<");
classpath = classpath.substring (0, idx) + "\t<classpathentry kind=\"var\" path=\"ECLIPSE_SWT\"/>\r\n" + classpath.substring (idx);
needUpdate = true;
}if (classpath.indexOf ("AJAX_SWT") == -1 && classpath.indexOf ("ajaxswt.jar") == -1) {
var idx = classpath.lastIndexOf ("<");
classpath = classpath.substring (0, idx) + "\t<classpathentry sourcepath=\"AJAX_SWT_SRC\" kind=\"var\" path=\"AJAX_SWT\"/>\r\n" + classpath.substring (idx);
needUpdate = true;
}if (classpath.indexOf ("AJAX_RPC") == -1 && classpath.indexOf ("ajaxrpc.jar") == -1) {
var idx = classpath.lastIndexOf ("<");
classpath = classpath.substring (0, idx) + "\t<classpathentry sourcepath=\"AJAX_RPC_SRC\" kind=\"var\" path=\"AJAX_RPC\"/>\r\n" + classpath.substring (idx);
needUpdate = true;
}if (classpath.indexOf ("AJAX_PIPE") == -1 && classpath.indexOf ("ajaxpipe.jar") == -1) {
var idx = classpath.lastIndexOf ("<");
classpath = classpath.substring (0, idx) + "\t<classpathentry sourcepath=\"AJAX_PIPE_SRC\" kind=\"var\" path=\"AJAX_PIPE\"/>\r\n" + classpath.substring (idx);
needUpdate = true;
}if (needUpdate) {
try {
var fos =  new java.io.FileOutputStream (cpFile);
fos.write (classpath.getBytes ("utf-8"));
fos.close ();
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
}}var webinf =  new java.io.File (prjFolder, "WEB-INF");
webinf.mkdir ();
 new java.io.File (webinf, "classes").mkdir ();
var lib =  new java.io.File (webinf, "lib");
lib.mkdir ();
var newPath = null;
var starterURL = net.sf.j2s.ajax.AjaxPlugin.getDefault ().getBundle ().getEntry (java.io.File.separator);
var root = ".";
try {
root = org.eclipse.core.runtime.Platform.asLocalURL (starterURL).getFile ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
newPath = org.eclipse.core.runtime.Path.fromPortableString (root + "/ajaxrpc.jar");
var rpcFile =  new java.io.File (newPath.toOSString ());
try {
var is =  new java.io.FileInputStream (rpcFile);
var os =  new java.io.FileOutputStream ( new java.io.File (lib, "ajaxrpc.jar"));
var buf =  Clazz.newArray (1024, 0);
var read = -1;
while ((read = is.read (buf)) != -1) {
os.write (buf, 0, read);
}
os.close ();
is.close ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
newPath = org.eclipse.core.runtime.Path.fromPortableString (root + "/ajaxpipe.jar");
var pipeFile =  new java.io.File (newPath.toOSString ());
try {
var is =  new java.io.FileInputStream (pipeFile);
var os =  new java.io.FileOutputStream ( new java.io.File (lib, "ajaxpipe.jar"));
var buf =  Clazz.newArray (1024, 0);
var read = -1;
while ((read = is.read (buf)) != -1) {
os.write (buf, 0, read);
}
os.close ();
is.close ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
var buildxml =  new StringBuffer ();
buildxml.append ("<?xml version=\"1.0\"?>\r\n");
buildxml.append ("<project name=\"java2script.servlet.pack\" default=\"pack.war\" basedir=\".\">\r\n");
buildxml.append ("    <description>Pack Java2Script Servlet Application</description>\r\n");
buildxml.append ("\r\n");
var name =  new java.io.File (prjFolder).getName ();
buildxml.append ("	<property name=\"java2script.app.name\" value=\"" + name + "\"/>\r\n");
buildxml.append ("	<property name=\"bin.folder\" value=\"${basedir}/../" + binRelative + "\"/>\r\n");
buildxml.append ("\r\n");
buildxml.append ("    <target name=\"pack.war\" depends=\"pack.jar\">\r\n");
buildxml.append ("        <tstamp>\r\n");
buildxml.append ("            <format property=\"now\" pattern=\"yyyy-MM-dd-HH-mm-ss\"/>\r\n");
buildxml.append ("        </tstamp>\r\n");
buildxml.append ("        <delete file=\"${basedir}/../${java2script.app.name}.war\" quiet=\"true\"/>\r\n");
buildxml.append ("        <zip destfile=\"${basedir}/../${java2script.app.name}.${now}.war\">\r\n");
buildxml.append ("            <fileset dir=\"${basedir}/../\">\r\n");
buildxml.append ("                <exclude name=\"src/**\"/>\r\n");
buildxml.append ("                <exclude name=\"META-INF/**\"/>\r\n");
buildxml.append ("                <exclude name=\"WEB-INF/**\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.java\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.class\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.swp\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.swo\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.jar\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.war\"/>\r\n");
buildxml.append ("                <exclude name=\".classpath\"/>\r\n");
buildxml.append ("                <exclude name=\".project\"/>\r\n");
buildxml.append ("                <exclude name=\".j2s\"/>\r\n");
buildxml.append ("                <exclude name=\"web.xml\"/>\r\n");
buildxml.append ("                <exclude name=\"build.xml\"/>\r\n");
buildxml.append ("                <exclude name=\"build.properties\"/>\r\n");
buildxml.append ("                <exclude name=\"plugin.xml\"/>\r\n");
buildxml.append ("                <exclude name=\"plugin.properties\"/>\r\n");
buildxml.append ("            </fileset>\r\n");
buildxml.append ("            <fileset dir=\"${basedir}/..\">\r\n");
buildxml.append ("                <include name=\"WEB-INF/**\"/>\r\n");
buildxml.append ("                <exclude name=\"WEB-INF/build.xml\"/>\r\n");
buildxml.append ("            </fileset>\r\n");
buildxml.append ("        </zip>\r\n");
buildxml.append ("        <copy file=\"${basedir}/../${java2script.app.name}.${now}.war\"\r\n");
buildxml.append ("                tofile=\"${basedir}/../${java2script.app.name}.war\"/>\r\n");
buildxml.append ("    </target>\r\n");
buildxml.append ("\r\n");
buildxml.append ("    <target name=\"pack.jar\">\r\n");
buildxml.append ("        <delete file=\"${basedir}/lib/${java2script.app.name}.jar\" quiet=\"true\"/>\r\n");
buildxml.append ("        <zip destfile=\"${basedir}/lib/${java2script.app.name}.jar\">\r\n");
buildxml.append ("            <fileset dir=\"${bin.folder}\">\r\n");
buildxml.append ("                <exclude name=\"WEB-INF/**\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.html\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.js\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.css\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.bmp\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.gif\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.png\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.jpg\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.jpeg\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.swp\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.swo\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.jar\"/>\r\n");
buildxml.append ("                <exclude name=\"**/*.war\"/>\r\n");
buildxml.append ("                <exclude name=\".classpath\"/>\r\n");
buildxml.append ("                <exclude name=\".project\"/>\r\n");
buildxml.append ("                <exclude name=\".j2s\"/>\r\n");
buildxml.append ("                <exclude name=\"web.xml\"/>\r\n");
buildxml.append ("                <exclude name=\"build.xml\"/>\r\n");
buildxml.append ("                <exclude name=\"build.properties\"/>\r\n");
buildxml.append ("                <exclude name=\"plugin.xml\"/>\r\n");
buildxml.append ("                <exclude name=\"plugin.properties\"/>\r\n");
buildxml.append ("            </fileset>\r\n");
buildxml.append ("        </zip>\r\n");
buildxml.append ("    </target>\r\n");
buildxml.append ("\r\n");
starterURL = net.sf.j2s.ajax.AjaxPlugin.getDefault ().getBundle ().getEntry (java.io.File.separator);
root = ".";
try {
root = org.eclipse.core.runtime.Platform.asLocalURL (starterURL).getFile ();
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.IOException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
newPath = org.eclipse.core.runtime.Path.fromPortableString (root);
var ajaxPath = newPath.toOSString ();
var key = "net.sf.j2s.ajax";
var idx = ajaxPath.lastIndexOf (key);
if (idx != -1) {
ajaxPath = ajaxPath.substring (0, idx) + "net.sf.j2s.lib" + ajaxPath.substring (idx + key.length);
}var libFile =  new java.io.File (ajaxPath);
var j2sRelativePath = net.sf.j2s.ui.property.FileUtil.toRelativePath (libFile.getAbsolutePath (), webinf.getAbsolutePath ());
if (j2sRelativePath.length > 0 && !j2sRelativePath.endsWith ("/")) {
j2sRelativePath += "/";
}var slashIndex = j2sRelativePath.lastIndexOf ('/', j2sRelativePath.length - 2);
var pluginPath = j2sRelativePath.substring (0, slashIndex);
var libPluginPath = j2sRelativePath.substring (slashIndex + 1, j2sRelativePath.length - 1);
buildxml.append ("    <target name=\"pack.plugins.j2slib.war\">\r\n");
buildxml.append ("        <delete file=\"${basedir}/../plugins.war\" quiet=\"true\"/>\r\n");
buildxml.append ("        <zip destfile=\"${basedir}/../plugins.war\">\r\n");
buildxml.append ("            <fileset dir=\"${basedir}/" + pluginPath + "/\">\r\n");
buildxml.append ("                <include name=\"" + libPluginPath + "/**\"/>\r\n");
buildxml.append ("                <exclude name=\"" + libPluginPath + "/library.jar\"/>\r\n");
buildxml.append ("                <exclude name=\"" + libPluginPath + "/plugin.xml\"/>\r\n");
buildxml.append ("                <exclude name=\"" + libPluginPath + "/META-INF/**\"/>\r\n");
buildxml.append ("            </fileset>\r\n");
buildxml.append ("        </zip>\r\n");
buildxml.append ("    </target>\r\n");
buildxml.append ("\r\n");
buildxml.append ("</project>\r\n");
try {
var fos =  new java.io.FileOutputStream ( new java.io.File (webinf, "build.xml"));
fos.write (buildxml.toString ().getBytes ());
fos.close ();
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
var webxml =  new StringBuffer ();
webxml.append ("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\r\n");
webxml.append ("<!DOCTYPE web-app\r\n");
webxml.append ("    PUBLIC \"-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN\"\r\n");
webxml.append ("    \"http://java.sun.com/dtd/web-app_2_3.dtd\">\r\n");
webxml.append ("<web-app>\r\n");
webxml.append ("    <display-name>Java2Script</display-name>\r\n");
webxml.append ("    <description>Java2Script application</description>\r\n");
webxml.append (this.genereateServlet ("simplerpc", "net.sf.j2s.ajax.SimpleRPCHttpServlet"));
webxml.append (this.genereateServlet ("piperpc", "net.sf.j2s.ajax.CompoundPipeRPCHttpServlet"));
webxml.append ("    <servlet>\r\n");
webxml.append ("        <servlet-name>simplepipe</servlet-name>\r\n");
webxml.append ("        <servlet-class>net.sf.j2s.ajax.SimplePipeHttpServlet</servlet-class>\r\n");
webxml.append ("        <init-param>\r\n");
webxml.append ("            <param-name>simple.pipe.query.timeout</param-name>\r\n");
webxml.append ("            <param-value>20000</param-value>\r\n");
webxml.append ("        </init-param>\r\n");
webxml.append ("        <init-param>\r\n");
webxml.append ("            <param-name>simple.pipe.script.breakout</param-name>\r\n");
webxml.append ("            <param-value>1200000</param-value>\r\n");
webxml.append ("        </init-param>\r\n");
webxml.append ("        <init-param>\r\n");
webxml.append ("            <param-name>simple.pipe.max.items.per.query</param-name>\r\n");
webxml.append ("            <param-value>60</param-value>\r\n");
webxml.append ("        </init-param>\r\n");
webxml.append ("    </servlet>\r\n");
webxml.append ("    <servlet-mapping>\r\n");
webxml.append ("        <servlet-name>simplerpc</servlet-name>\r\n");
webxml.append ("        <url-pattern>/simplerpc</url-pattern>\r\n");
webxml.append ("    </servlet-mapping>\r\n");
webxml.append ("    <servlet-mapping>\r\n");
webxml.append ("        <servlet-name>piperpc</servlet-name>\r\n");
webxml.append ("        <url-pattern>/piperpc</url-pattern>\r\n");
webxml.append ("    </servlet-mapping>\r\n");
webxml.append ("    <servlet-mapping>\r\n");
webxml.append ("        <servlet-name>simplepipe</servlet-name>\r\n");
webxml.append ("        <url-pattern>/simplepipe</url-pattern>\r\n");
webxml.append ("    </servlet-mapping>\r\n");
webxml.append ("</web-app>\r\n");
try {
var fos =  new java.io.FileOutputStream ( new java.io.File (webinf, "web.xml"));
fos.write (webxml.toString ().getBytes ());
fos.close ();
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
} catch (e1) {
if (Clazz.instanceOf (e1, java.io.FileNotFoundException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
}, "~S,~S");
Clazz.defineMethod (c$, "genereateServlet", 
($fz = function (name, clazz) {
var webxml =  new StringBuffer ();
webxml.append ("    <servlet>\r\n");
webxml.append ("        <servlet-name>" + name + "</servlet-name>\r\n");
webxml.append ("        <servlet-class>" + clazz + "</servlet-class>\r\n");
webxml.append ("	       <init-param>\r\n");
webxml.append ("            <param-name>simple.rpc.runnables</param-name>\r\n");
webxml.append ("            <!--\r\n");
webxml.append ("              Qualified names of inherited net.sf.j2s.ajax.SimpleRPCRunnable\r\n");
webxml.append ("              classes, seperated by \";\".\r\n");
webxml.append ("            -->\r\n");
webxml.append ("            <param-value>\r\n");
webxml.append ("            </param-value>\r\n");
webxml.append ("        </init-param>\r\n");
webxml.append ("        <init-param>\r\n");
webxml.append ("            <param-name>simple.rpc.xss.support</param-name>\r\n");
webxml.append ("            <param-value>true</param-value>\r\n");
webxml.append ("        </init-param>\r\n");
webxml.append ("        <!--\r\n");
webxml.append ("        <init-param>\r\n");
webxml.append ("            <param-name>simple.rpc.post.limit</param-name>\r\n");
webxml.append ("            <param-value>16777216</param-value>\r\n");
webxml.append ("        </init-param>\r\n");
webxml.append ("        <init-param>\r\n");
webxml.append ("            <param-name>simple.rpc.xss.max.parts</param-name>\r\n");
webxml.append ("            <param-value>8</param-value>\r\n");
webxml.append ("        </init-param>\r\n");
webxml.append ("        <init-param>\r\n");
webxml.append ("            <param-name>simple.rpc.xss.max.latency</param-name>\r\n");
webxml.append ("            <param-value>6000</param-value>\r\n");
webxml.append ("        </init-param>\r\n");
webxml.append ("        <init-param>\r\n");
webxml.append ("            <param-name>simple.pipe.managable</param-name>\r\n");
webxml.append ("            <param-value>true</param-value>\r\n");
webxml.append ("        </init-param>\r\n");
webxml.append ("        -->\r\n");
webxml.append ("    </servlet>\r\n");
return webxml.toString ();
}, $fz.isPrivate = true, $fz), "~S,~S");
});
