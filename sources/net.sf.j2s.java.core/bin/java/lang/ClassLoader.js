$_L(["java.util.Enumeration","$.HashMap"],["java.lang.TwoEnumerationsInOne","$.BootClassLoader","$.ClassLoader"],["java.lang.ClassFormatError","$.ClassNotFoundException","$.IllegalArgumentException","$.NullPointerException","$.RuntimePermission"],function(){
c$=$_C(function(){
this.parent=null;
this.packages=null;
$_Z(this,arguments);
},java.lang,"ClassLoader");
$_Y(c$,function(){
this.packages=new java.util.HashMap();
});
c$.createSystemClassLoader=$_M(c$,"createSystemClassLoader",
($fz=function(){
var classPath=System.getProperty("java.class.path",".");
return null;
},$fz.isPrivate=true,$fz));
c$.getSystemClassLoader=$_M(c$,"getSystemClassLoader",
function(){
var smgr=System.getSecurityManager();
return ClassLoader.SystemClassLoader.loader;
});
c$.getSystemResource=$_M(c$,"getSystemResource",
function(resName){
return ClassLoader.SystemClassLoader.loader.getResource(resName);
},"~S");
c$.getSystemResources=$_M(c$,"getSystemResources",
function(resName){
return ClassLoader.SystemClassLoader.loader.getResources(resName);
},"~S");
c$.getSystemResourceAsStream=$_M(c$,"getSystemResourceAsStream",
function(resName){
return ClassLoader.SystemClassLoader.loader.getResourceAsStream(resName);
},"~S");
$_K(c$,
function(){
this.construct(ClassLoader.getSystemClassLoader(),false);
});
$_K(c$,
function(parentLoader){
this.construct(parentLoader,false);
},"ClassLoader");
$_K(c$,
function(parentLoader,nullAllowed){
var smgr=System.getSecurityManager();
if(smgr!=null){
smgr.checkCreateClassLoader();
}if(parentLoader==null&&!nullAllowed){
throw new NullPointerException("Parent ClassLoader may not be null");
}this.parent=parentLoader;
},"ClassLoader,~B");
$_M(c$,"defineClass",
function(classRep,offset,length){
return null;
},"~A,~N,~N");
$_M(c$,"defineClass",
function(className,classRep,offset,length){
return this.defineClass(className,classRep,offset,length,null);
},"~S,~A,~N,~N");
$_M(c$,"defineClass",
function(className,classRep,offset,length,protectionDomain){
return null;
},"~S,~A,~N,~N,java.security.ProtectionDomain");
$_M(c$,"defineClass",
function(name,b,protectionDomain){
var temp=$_A(b.remaining(),0);
b.get(temp);
return this.defineClass(name,temp,0,temp.length,protectionDomain);
},"~S,java.nio.ByteBuffer,java.security.ProtectionDomain");
$_M(c$,"findClass",
function(className){
throw new ClassNotFoundException(className);
},"~S");
$_M(c$,"findLoadedClass",
function(className){
var loader;
if(this===BootClassLoader.getInstance())loader=null;
else loader=this;
return null;
},"~S");
$_M(c$,"findSystemClass",
function(className){
return Class.forName(className,false,ClassLoader.getSystemClassLoader());
},"~S");
$_M(c$,"getParent",
function(){
var smgr=System.getSecurityManager();
if(smgr!=null){
smgr.checkPermission(new RuntimePermission("getClassLoader"));
}return this.parent;
});
$_M(c$,"getResource",
function(resName){
var resource=null;
resource=this.parent.getResource(resName);
if(resource==null){
resource=this.findResource(resName);
}return resource;
},"~S");
$_M(c$,"getResources",
function(resName){
var first=this.parent.getResources(resName);
var second=this.findResources(resName);
return new TwoEnumerationsInOne(first,second);
},"~S");
$_M(c$,"getResourceAsStream",
function(resName){
try{
var url=this.getResource(resName);
if(url!=null){
return url.openStream();
}}catch(ex){
if($_O(ex,java.io.IOException)){
}else{
throw ex;
}
}
return null;
},"~S");
$_M(c$,"loadClass",
function(className){
return this.loadClass(className,false);
},"~S");
$_M(c$,"loadClass",
function(className,resolve){
var clazz=this.findLoadedClass(className);
if(clazz==null){
try{
clazz=this.parent.loadClass(className,false);
}catch(e){
if($_O(e,ClassNotFoundException)){
}else{
throw e;
}
}
if(clazz==null){
clazz=this.findClass(className);
}}return clazz;
},"~S,~B");
$_M(c$,"resolveClass",
function(clazz){
},"Class");
$_M(c$,"isSystemClassLoader",
function(){
return false;
});
$_M(c$,"isAncestorOf",
function(child){
for(var current=child;current!=null;current=current.parent){
if(current===this){
return true;
}}
return false;
},"ClassLoader");
$_M(c$,"findResource",
function(resName){
return null;
},"~S");
$_M(c$,"findResources",
function(resName){
return null;
},"~S");
$_M(c$,"findLibrary",
function(libName){
return null;
},"~S");
$_M(c$,"getPackage",
function(name){
{
var p=this.packages.get(name);
return p;
}},"~S");
c$.getPackage=$_M(c$,"getPackage",
function(loader,name){
return loader.getPackage(name);
},"ClassLoader,~S");
$_M(c$,"getPackages",
function(){
{
var col=this.packages.values();
var result=new Array(col.size());
col.toArray(result);
return result;
}});
$_M(c$,"definePackage",
function(name,specTitle,specVersion,specVendor,implTitle,implVersion,implVendor,sealBase){
{
if(this.packages.containsKey(name)){
throw new IllegalArgumentException("Package"+name+"already defined");
}return null;
}},"~S,~S,~S,~S,~S,~S,~S,java.net.URL");
$_M(c$,"getSigners",
function(c){
return null;
},"Class");
$_M(c$,"setSigners",
function(c,signers){
return;
},"Class,~A");
c$.getStackClassLoader=$_M(c$,"getStackClassLoader",
function(depth){
return null;
},"~N");
c$.loadLibraryWithClassLoader=$_M(c$,"loadLibraryWithClassLoader",
function(libName,loader){
return;
},"~S,ClassLoader");
c$.loadLibraryWithPath=$_M(c$,"loadLibraryWithPath",
function(libName,loader,libraryPath){
return;
},"~S,ClassLoader,~S");
$_M(c$,"getClassAssertionStatus",
function(cname){
return false;
},"~S");
$_M(c$,"getPackageAssertionStatus",
function(pname){
return false;
},"~S");
$_M(c$,"getDefaultAssertionStatus",
function(){
return false;
});
$_H();
c$=$_T(ClassLoader,"SystemClassLoader");
c$.loader=c$.prototype.loader=ClassLoader.createSystemClassLoader();
c$=$_P();
c$=$_C(function(){
this.first=null;
this.second=null;
$_Z(this,arguments);
},java.lang,"TwoEnumerationsInOne",null,java.util.Enumeration);
$_K(c$,
function(first,second){
this.first=first;
this.second=second;
},"java.util.Enumeration,java.util.Enumeration");
$_M(c$,"hasMoreElements",
function(){
return this.first.hasMoreElements()||this.second.hasMoreElements();
});
$_M(c$,"nextElement",
function(){
if(this.first.hasMoreElements()){
return this.first.nextElement();
}else{
return this.second.nextElement();
}});
c$=$_T(java.lang,"BootClassLoader",ClassLoader);
c$.getInstance=$_M(c$,"getInstance",
function(){
if(BootClassLoader.instance==null){
($t$=BootClassLoader.instance=new BootClassLoader(),BootClassLoader.prototype.instance=BootClassLoader.instance,$t$);
}return BootClassLoader.instance;
});
$_K(c$,
function(){
$_R(this,BootClassLoader,[null,true]);
});
$_V(c$,"findClass",
function(name){
return null;
},"~S");
$_V(c$,"findResource",
function(name){
return null;
},"~S");
$_V(c$,"findResources",
function(resName){
return null;
},"~S");
$_M(c$,"getPackage",
function(name){
if(name!=null&&!name.isEmpty()){
{
var pack=$_U(this,BootClassLoader,"getPackage",[name]);
if(pack==null){
pack=this.definePackage(name,"Unknown","0.0","Unknown","Unknown","0.0","Unknown",null);
}return pack;
}}return null;
},"~S");
$_V(c$,"getResource",
function(resName){
return this.findResource(resName);
},"~S");
$_M(c$,"loadClass",
function(className,resolve){
var clazz=this.findLoadedClass(className);
if(clazz==null){
clazz=this.findClass(className);
}return clazz;
},"~S,~B");
$_V(c$,"getResources",
function(resName){
return this.findResources(resName);
},"~S");
$_S(c$,
"instance",null);
});
