$_L(["java.util.Properties"],["java.lang.SystemProperties","$.System"],["java.io.FileDescriptor","$.FileInputStream","$.FileOutputStream","java.lang.IllegalArgumentException","$.NullPointerException","$.Runtime","java.util.PropertyPermission"],function(){
c$=$_T(java.lang,"System");
c$.setOut=$_M(c$,"setOut",
function(newOut){
var secMgr=System.getSecurityManager();
},"java.io.PrintStream");
c$.setErr=$_M(c$,"setErr",
function(newErr){
var secMgr=System.getSecurityManager();
},"java.io.PrintStream");
c$.exit=$_M(c$,"exit",
function(code){
Runtime.getRuntime().exit(code);
},"~N");
c$.gc=$_M(c$,"gc",
function(){
Runtime.getRuntime().gc();
});
c$.getProperties=$_M(c$,"getProperties",
function(){
var secMgr=System.getSecurityManager();
if(secMgr!=null){
secMgr.checkPropertiesAccess();
}return System.internalGetProperties();
});
c$.internalGetProperties=$_M(c$,"internalGetProperties",
function(){
if(System.systemProperties==null){
var props=new SystemProperties();
props.preInit();
props.postInit();
($t$=System.systemProperties=props,System.prototype.systemProperties=System.systemProperties,$t$);
}return System.systemProperties;
});
c$.getProperty=$_M(c$,"getProperty",
function(propertyName){
return System.getProperty(propertyName,null);
},"~S");
c$.getProperty=$_M(c$,"getProperty",
function(prop,defaultValue){
if(prop.length==0){
throw new IllegalArgumentException();
}var secMgr=System.getSecurityManager();
if(secMgr!=null){
secMgr.checkPropertyAccess(prop);
}return System.internalGetProperties().getProperty(prop,defaultValue);
},"~S,~S");
c$.setProperty=$_M(c$,"setProperty",
function(prop,value){
if(prop.length==0){
throw new IllegalArgumentException();
}var secMgr=System.getSecurityManager();
if(secMgr!=null){
secMgr.checkPermission(new java.util.PropertyPermission(prop,"write"));
}return System.internalGetProperties().setProperty(prop,value);
},"~S,~S");
c$.clearProperty=$_M(c$,"clearProperty",
function(key){
if(key==null){
throw new NullPointerException();
}if(key.length==0){
throw new IllegalArgumentException();
}var secMgr=System.getSecurityManager();
if(secMgr!=null){
secMgr.checkPermission(new java.util.PropertyPermission(key,"write"));
}return System.internalGetProperties().remove(key);
},"~S");
c$.getSecurityManager=$_M(c$,"getSecurityManager",
function(){
return null;
});
c$.load=$_M(c$,"load",
function(pathName){
var smngr=System.getSecurityManager();
if(smngr!=null){
smngr.checkLink(pathName);
}},"~S");
c$.loadLibrary=$_M(c$,"loadLibrary",
function(libName){
var smngr=System.getSecurityManager();
if(smngr!=null){
smngr.checkLink(libName);
}},"~S");
c$.runFinalization=$_M(c$,"runFinalization",
function(){
Runtime.getRuntime().runFinalization();
});
c$.runFinalizersOnExit=$_M(c$,"runFinalizersOnExit",
function(flag){
Runtime.runFinalizersOnExit(flag);
},"~B");
c$.setProperties=$_M(c$,"setProperties",
function(p){
var secMgr=System.getSecurityManager();
if(secMgr!=null){
secMgr.checkPropertiesAccess();
}($t$=System.systemProperties=p,System.prototype.systemProperties=System.systemProperties,$t$);
},"java.util.Properties");
$_S(c$,
"$in",null,
"out",null,
"err",null,
"systemProperties",null);
{
($t$=System.err=new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.err)),System.prototype.err=System.err,$t$);
($t$=System.out=new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.out)),System.prototype.out=System.out,$t$);
($t$=System.$in=new java.io.FileInputStream(java.io.FileDescriptor.$in),System.prototype.$in=System.$in,$t$);
}c$=$_T(java.lang,"SystemProperties",java.util.Properties);
});
