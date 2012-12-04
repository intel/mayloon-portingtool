$_J("net.sf.j2s.ajax");
$_L(["org.eclipse.jdt.core.ClasspathVariableInitializer"],"net.sf.j2s.ajax.AJAXVariableInitializer",["java.io.File","net.sf.j2s.ajax.AjaxPlugin","org.eclipse.core.resources.ResourcesPlugin","org.eclipse.core.runtime.FileLocator","$.NullProgressMonitor","$.Path","$.Status","org.eclipse.jdt.core.JavaCore"],function(){
c$=$_C(function(){
this.fMonitor=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"AJAXVariableInitializer",org.eclipse.jdt.core.ClasspathVariableInitializer);
$_V(c$,"initialize",
function(variable){
var newPath=null;
var starterURL=net.sf.j2s.ajax.AjaxPlugin.getDefault().getBundle().getEntry(java.io.File.separator);
var root=".";
try{
root=org.eclipse.core.runtime.FileLocator.toFileURL(starterURL).getFile();
}catch(e1){
if($_O(e1,java.io.IOException)){
e1.printStackTrace();
}else{
throw e1;
}
}
if("AJAX_CORE".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxcore.jar");
}else if("AJAX_SWT".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxswt.jar");
}else if("AJAX_RPC".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxrpc.jar");
}else if("AJAX_PIPE".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxpipe.jar");
}else if("AJAX_STORE".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxstore.jar");
}else if("J2S_ANNOTATION".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/j2stag.jar");
}else if("AJAX_CORE_SRC".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxcoresrc.zip");
}else if("AJAX_SWT_SRC".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxswtsrc.zip");
}else if("AJAX_RPC_SRC".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxrpcsrc.zip");
}else if("AJAX_PIPE_SRC".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxpipesrc.zip");
}else if("AJAX_STORE_SRC".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/ajaxstoresrc.zip");
}else if("J2S_ANNOTATION_SRC".equals(variable)){
newPath=org.eclipse.core.runtime.Path.fromPortableString(root+"/j2stagsrc.zip");
}if(newPath==null){
return;
}var workspace=org.eclipse.core.resources.ResourcesPlugin.getWorkspace();
var wsDescription=workspace.getDescription();
var wasAutobuild=wsDescription.isAutoBuilding();
try{
this.setAutobuild(workspace,false);
this.setJREVariable(newPath,variable);
}catch(ce){
if($_O(ce,org.eclipse.core.runtime.CoreException)){
net.sf.j2s.ajax.AjaxPlugin.getDefault().getLog().log(new org.eclipse.core.runtime.Status(4,"net.sf.j2s.ajax",4,ce.getMessage(),ce));
return;
}else{
throw ce;
}
}finally{
try{
this.setAutobuild(workspace,wasAutobuild);
}catch(ce){
if($_O(ce,org.eclipse.core.runtime.CoreException)){
net.sf.j2s.ajax.AjaxPlugin.getDefault().getLog().log(new org.eclipse.core.runtime.Status(4,"net.sf.j2s.ajax",4,ce.getMessage(),ce));
}else{
throw ce;
}
}
}
},"~S");
$_M(c$,"setJREVariable",
($fz=function(newPath,$var){
org.eclipse.jdt.core.JavaCore.setClasspathVariable($var,newPath,this.getMonitor());
},$fz.isPrivate=true,$fz),"org.eclipse.core.runtime.IPath,~S");
$_M(c$,"setAutobuild",
($fz=function(ws,newState){
var wsDescription=ws.getDescription();
var oldState=wsDescription.isAutoBuilding();
if(oldState!=newState){
wsDescription.setAutoBuilding(newState);
ws.setDescription(wsDescription);
}return oldState;
},$fz.isPrivate=true,$fz),"org.eclipse.core.resources.IWorkspace,~B");
$_M(c$,"getMonitor",
function(){
if(this.fMonitor==null){
return new org.eclipse.core.runtime.NullProgressMonitor();
}return this.fMonitor;
});
});
