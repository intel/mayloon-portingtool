$_L(["java.io.Closeable","$.InputStream","$.JSFileSystem"],"java.io.FileInputStream",["java.io.File","$.IOException","java.lang.AssertionError","$.IndexOutOfBoundsException","$.NullPointerException"],function(){
c$=$_C(function(){
this.fd=null;
this.channel=null;
this.innerFD=false;
this.fileSystem=null;
this.repositioningLock=null;
$_Z(this,arguments);
},java.io,"FileInputStream",java.io.InputStream,java.io.Closeable);
$_Y(c$,function(){
this.fileSystem=java.io.JSFileSystem.getJSFileSystem();
this.repositioningLock=new java.io.FileInputStream.RepositioningLock();
});
$_K(c$,
function(file){
$_R(this,java.io.FileInputStream);
if(file==null){
throw new NullPointerException("file==null");
}this.fd=this.fileSystem.open(file.getAbsolutePath(),0);
this.fd.readOnly=true;
this.innerFD=true;
},"java.io.File");
$_K(c$,
function(fd){
$_R(this,java.io.FileInputStream);
if(fd==null){
throw new NullPointerException("fd==null");
}this.fd=fd;
this.innerFD=false;
},"java.io.FileDescriptor");
$_K(c$,
function(fileName){
this.construct(null==fileName?null:new java.io.File(fileName));
},"~S");
$_V(c$,"available",
function(){
this.openCheck();
return this.fileSystem.ioctlAvailable(this.fd);
});
$_V(c$,"close",
function(){
{
if(this.channel!=null&&this.channel.isOpen()){
this.channel.close();
this.channel=null;
}if(this.fd!=null&&this.fd.valid()&&this.innerFD){
this.fileSystem.close(this.fd.descriptor);
}}});
$_M(c$,"finalize",
function(){
try{
this.close();
}finally{
try{
$_U(this,java.io.FileInputStream,"finalize",[]);
}catch(t){
throw new AssertionError(t);
}
}
});
$_M(c$,"getFD",
function(){
return this.fd;
});
$_M(c$,"read",
function(){
var readed=$_A(1,0);
var result=this.read(readed,0,1);
return result==-1?-1:readed[0]&0xff;
});
$_M(c$,"read",
function(buffer){
return this.read(buffer,0,buffer.length);
},"~A");
$_M(c$,"read",
function(buffer,offset,count){
if(buffer==null){
throw new NullPointerException("buffer==null");
}if((count|offset)<0||count>buffer.length-offset){
throw new IndexOutOfBoundsException();
}if(0==count){
return 0;
}this.openCheck();
{
return this.fileSystem.read(this.fd.descriptor,buffer,offset,count);
}},"~A,~N,~N");
$_V(c$,"skip",
function(count){
this.openCheck();
if(count==0){
return 0;
}if(count<0){
throw new java.io.IOException("count<0");
}{
this.fileSystem.seek(this.fd.descriptor,count,2);
return count;
}},"~N");
$_M(c$,"openCheck",
($fz=function(){
if(this.fd.descriptor<0){
throw new java.io.IOException();
}},$fz.isPrivate=true,$fz));
$_H();
c$=$_T(java.io.FileInputStream,"RepositioningLock");
c$=$_P();
});
