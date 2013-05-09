$_L(["java.lang.reflect.Type"],"java.lang.Class",["java.lang.NoSuchMethodException","$.StringBuilder"],function(){
c$=$_C(function(){
this.pd=null;
this.name=null;
$_Z(this,arguments);
},java.lang,"Class",null,[java.io.Serializable,java.lang.reflect.Type]);
c$.forName=$_M(c$,"forName",
function(className){
return null;
},"~S");
c$.forName=$_M(c$,"forName",
function(className,initializeBoolean,classLoader){
var result;
try{
result=Class.classForName(className,initializeBoolean,classLoader);
}catch(e){
if($_O(e,ClassNotFoundException)){
var cause=e.getCause();
if($_O(cause,ExceptionInInitializerError)){
throw cause;
}throw e;
}else{
throw e;
}
}
return result;
},"~S,~B,ClassLoader");
$_M(c$,"getClassLoader",
function(){
var smgr=System.getSecurityManager();
var loader=this.getClassLoaderImpl();
return loader;
});
$_M(c$,"getClassLoaderImpl",
function(){
return null;
});
$_M(c$,"getConstructor",
function(parameterTypes){
this.checkPublicMemberAccess();
return this.getMatchingConstructor(Class.getDeclaredConstructors(this,true),parameterTypes);
},"~A");
$_M(c$,"getMatchingConstructor",
($fz=function(list,parameterTypes){
var sb=new StringBuilder();
sb.append('(');
var first=true;
if(parameterTypes!=null){
for(var p,$p=0,$$p=parameterTypes;$p<$$p.length&&((p=$$p[$p])||true);$p++){
if(!first){
sb.append(',');
}first=false;
}
}sb.append(')');
throw new NoSuchMethodException(sb.toString());
},$fz.isPrivate=true,$fz),"~A,~A");
$_M(c$,"getDeclaredMethod",
function(name,parameterTypes){
return null;
},"~S,~A");
$_M(c$,"getDeclaredMethods",
function(){
return null;
});
$_M(c$,"getMethod",
function(name,parameterTypes){
this.checkPublicMemberAccess();
return null;
},"~S,~A");
$_M(c$,"getMethods",
function(){
this.checkPublicMemberAccess();
return null;
});
$_M(c$,"checkPublicMemberAccess",
function(){
var smgr=System.getSecurityManager();
});
$_M(c$,"getModifiers",
function(){
return Class.getModifiers(this,false);
});
$_M(c$,"getName",
function(){
var result=this.name;
return(result==null)?(this.name=this.getNameNative()):result;
});
$_M(c$,"getResourceAsStream",
function(resName){
if(resName.startsWith("/")){
resName=resName.substring(1);
}else{
var pkg=this.getName();
var dot=pkg.lastIndexOf('.');
if(dot!=-1){
pkg=pkg.substring(0,dot).$replace('.', '/');
}else{
pkg="";
}resName=pkg+"/"+resName;
}var loader=this.getClassLoader();
if(loader!=null){
return loader.getResourceAsStream(resName);
}else{
return null;
}},"~S");
$_M(c$,"isArray",
function(){
return false;
});
$_M(c$,"newInstance",
function(){
this.checkPublicMemberAccess();
return this.newInstanceImpl();
});
$_V(c$,"toString",
function(){
return this.getName();
});
c$.getStackClasses=$_M(c$,"getStackClasses",
function(maxDepth,stopAtPrivileged){
return null;
},"~N,~B");
});
