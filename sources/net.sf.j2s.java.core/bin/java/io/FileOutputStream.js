$_L(["java.io.Closeable","$.OutputStream","$.JSFileSystem"],"java.io.FileOutputStream",["java.io.File","$.IOException","java.lang.AssertionError","$.IndexOutOfBoundsException","$.NullPointerException"],function(){
c$=$_C(function(){
this.fd=null;
this.innerFD=false;
this.channel=null;
this.fileSystem=null;
$_Z(this,arguments);
},java.io,"FileOutputStream",java.io.OutputStream,java.io.Closeable);
$_Y(c$,function(){
this.fileSystem=java.io.JSFileSystem.getJSFileSystem();
});
$_K(c$,
function(file){
this.construct(file,false);
},"java.io.File");
$_K(c$,
function(file,append){
$_R(this,java.io.FileOutputStream);
this.fd=this.fileSystem.open(file.getAbsolutePath(),append?256:1);
this.innerFD=true;
},"java.io.File,~B");
$_K(c$,
function(fd){
$_R(this,java.io.FileOutputStream);
if(fd==null){
throw new NullPointerException();
}this.fd=fd;
this.innerFD=false;
},"java.io.FileDescriptor");
$_K(c$,
function(filename){
this.construct(filename,false);
},"~S");
$_K(c$,
function(filename,append){
this.construct(new java.io.File(filename),append);
},"~S,~B");
$_V(c$,"close",
function(){
if(this.fd==null){
return;
}if(this.channel!=null){
{
if(this.channel.isOpen()&&this.fd.descriptor>=0){
this.channel.close();
}}}{
if(this.fd.valid()&&this.innerFD){
this.fileSystem.close(this.fd.descriptor);
}}});
$_M(c$,"finalize",
function(){
try{
this.close();
}finally{
try{
$_U(this,java.io.FileOutputStream,"finalize",[]);
}catch(t){
throw new AssertionError(t);
}
}
});
$_M(c$,"getChannel",
function(){
return this.channel;
});
$_M(c$,"getFD",
function(){
return this.fd;
});
$_M(c$,"write",
function(buffer){
this.write(buffer,0,buffer.length);
},"~A");
$_M(c$,"write",
function(buffer,offset,count){
if(buffer==null){
throw new NullPointerException("buffer==null");
}if((count|offset)<0||count>buffer.length-offset){
throw new IndexOutOfBoundsException();
}if(count==0){
return;
}this.openCheck();
this.fileSystem.write(this.fd.descriptor,buffer,offset,count);
},"~A,~N,~N");
$_M(c$,"write",
function(oneByte){
this.openCheck();
var byteArray=$_A(1,0);
byteArray[0]=oneByte;
this.fileSystem.write(this.fd.descriptor,byteArray,0,1);
},"~N");
$_M(c$,"openCheck",
($fz=function(){
if(this.fd.descriptor<0){
throw new java.io.IOException();
}},$fz.isPrivate=true,$fz));
});
