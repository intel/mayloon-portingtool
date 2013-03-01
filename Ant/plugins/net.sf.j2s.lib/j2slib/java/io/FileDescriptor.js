c$=$_C(function(){
this.descriptor=-1;
this.readOnly=false;
this.bts=null;
this.path=null;
this.readPos=0;
$_Z(this,arguments);
},java.io,"FileDescriptor");
$_K(c$,
function(){
});
$_M(c$,"setBytes",
function(iBts){
this.bts=iBts;
},"~A");
$_M(c$,"getBytes",
function(){
return this.bts;
});
$_M(c$,"sync",
function(){
if(!this.readOnly){
this.syncImpl();
}});
$_M(c$,"syncImpl",
($fz=function(){

},$fz.isPrivate=true,$fz));
$_M(c$,"valid",
function(){
return this.descriptor!=-1;
});
$_V(c$,"toString",
function(){
return"FileDescriptor["+this.descriptor+"]";
});
$_M(c$,"setPath",
function(path){
this.path=path;
},"~S");
$_M(c$,"getPath",
function(){
return this.path;
});
$_M(c$,"getReadPos",
function(){
return this.readPos;
});
$_M(c$,"setReadPos",
function(pos){
this.readPos=pos;
},"~N");
c$.$in=c$.prototype.$in=new java.io.FileDescriptor();
c$.out=c$.prototype.out=new java.io.FileDescriptor();
c$.err=c$.prototype.err=new java.io.FileDescriptor();
{
java.io.FileDescriptor.$in.descriptor=0;
java.io.FileDescriptor.out.descriptor=1;
java.io.FileDescriptor.err.descriptor=2;
}