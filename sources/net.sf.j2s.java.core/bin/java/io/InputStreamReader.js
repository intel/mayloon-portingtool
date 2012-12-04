$_L(["java.io.Reader"],"java.io.InputStreamReader",["java.io.IOException"],function(){
c$=$_C(function(){
this.$in=null;
$_Z(this,arguments);
},java.io,"InputStreamReader",java.io.Reader);
$_K(c$,
function($in){
this.construct($in,"utf-8");
},"java.io.InputStream");
$_K(c$,
function($in,enc){
$_R(this,java.io.InputStreamReader,[$in]);
this.$in=$in;
},"java.io.InputStream,~S");
$_K(c$,
function($in,dec){
$_R(this,java.io.InputStreamReader,[$in]);
this.$in=$in;
},"java.io.InputStream,java.nio.charset.CharsetDecoder");
$_K(c$,
function($in,charset){
$_R(this,java.io.InputStreamReader,[$in]);
this.$in=$in;
},"java.io.InputStream,java.nio.charset.Charset");
$_V(c$,"close",
function(){
});
$_M(c$,"read",
function(){
{
if(!this.isOpen()){
throw new java.io.IOException("InputStreamReader is closed");
}var buf=$_A(1,'\0');
return this.read(buf,0,1)!=-1?buf[0]:-1;
}});
$_M(c$,"read",
function(buffer,offset,length){
var data=$_A(length,0);
var res=this.$in.read(data,offset,length);
System.arraycopy(data,0,buffer,0,res);
return res;
},"~A,~N,~N");
$_M(c$,"isOpen",
($fz=function(){
return this.$in!=null;
},$fz.isPrivate=true,$fz));
$_V(c$,"ready",
function(){
return this.$in!=null;
});
});
