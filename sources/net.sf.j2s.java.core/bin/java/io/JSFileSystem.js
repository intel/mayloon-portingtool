$_L(null,"java.io.JSFileSystem",["java.io.FileDescriptor","$.IOException"],function(){
c$=$_C(function(){
this.O_EXCL=0x00010000;
this.O_NOCTTY=0x00100000;
this.O_NONBLOCK=0x01000000;
this.O_TRUNC=0x10000000;
this.fds=null;
$_Z(this,arguments);
},java.io,"JSFileSystem");
$_Y(c$,function(){
this.fds=new Array(256);
{
this.fds[0]=java.io.FileDescriptor.$in;
this.fds[1]=java.io.FileDescriptor.out;
this.fds[2]=java.io.FileDescriptor.err;
}});
c$.getJSFileSystem=$_M(c$,"getJSFileSystem",
function(){
return java.io.JSFileSystem.singleton;
});
$_K(c$,
($fz=function(){
},$fz.isPrivate=true,$fz));
$_M(c$,"read",
function(fd,bytes,offset,length){
if(!this.fds[fd].valid()){
throw new java.io.IOException();
}var bts=this.fds[fd].getBytes();
if(null==bts||bts.equals(""))return-1;
var readPos=this.fds[fd].getReadPos();
if(readPos>=bts.length){
return-1;
}var i=0;
for(;(i<length)&&(i+readPos<bts.length);i++){
bytes[i+offset]=bts[i+readPos];
}
this.fds[fd].setReadPos(readPos+i);
if(i==0)i=-1;
return i;
},"~N,~A,~N,~N");
$_M(c$,"write",
function(fd,bytes,offset,length){
var data=$_A(length,0);
var i=0;
for(;i<length&&(i+offset)<bytes.length;i++){
data[i]=bytes[i+offset];
}
if(!this.fds[fd].valid()){
return-1;
}var cnt=String.instantialize(data);
var path=this.fds[fd].getPath();
var file=new W3CFile(path);
file.open(true,false);
file.write(cnt,true);
return 0;
},"~N,~A,~N,~N");
$_M(c$,"open",
function(path,mode){
var bts=null;
var file=new W3CFile(path);
if(file.exist()){
bts=file.read();
}else{
file.open(true,false);
bts="";
}
var i=-1;
if(mode==0||mode==4096||mode==268435456){
i=0;
}else if(mode==1||mode==256||mode==16){
i=1;
}if(i==-1){
for(i=0;i<this.fds.length;i++){
this.fds[i].descriptor=i;
this.fds[i].setBytes(bts);
this.fds[i].setPath(path);
}
}else{
if(!this.fds[i].valid()){
this.fds[i].descriptor=i;
}this.fds[i].setBytes(bts);
this.fds[i].setPath(path);
}return this.fds[i];
},"~S,~N");
$_M(c$,"close",
function(fd){
if(this.fds[fd].valid()){
this.fds[fd].descriptor=-1;
this.fds[fd].setBytes(null);
}return 0;
},"~N");
$_S(c$,
"SHARED_LOCK_TYPE",1,
"EXCLUSIVE_LOCK_TYPE",2,
"SEEK_SET",1,
"SEEK_CUR",2,
"SEEK_END",4,
"O_RDONLY",0x00000000,
"O_WRONLY",0x00000001,
"O_RDWR",0x00000010,
"O_RDWRSYNC",0x00000020,
"O_APPEND",0x00000100,
"O_CREAT",0x00001000);
c$.singleton=c$.prototype.singleton=new java.io.JSFileSystem();
});
