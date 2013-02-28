$_L(["java.io.Reader"],"java.io.CharArrayReader",["java.io.IOException","java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException"],function(){
c$=$_C(function(){
this.buf=null;
this.pos=0;
this.markedPos=-1;
this.count=0;
$_Z(this,arguments);
},java.io,"CharArrayReader",java.io.Reader);
$_K(c$,
function(buf){
$_R(this,java.io.CharArrayReader,[]);
this.buf=buf;
this.count=buf.length;
},"~A");
$_K(c$,
function(buf,offset,length){
$_R(this,java.io.CharArrayReader,[]);
if(offset<0||offset>buf.length||length<0||offset+length<0){
throw new IllegalArgumentException();
}this.buf=buf;
this.pos=offset;
this.markedPos=offset;
var bufferLength=buf.length;
this.count=offset+length<bufferLength?length:bufferLength;
},"~A,~N,~N");
$_V(c$,"close",
function(){
{
if(this.isOpen()){
this.buf=null;
}}});
$_M(c$,"isOpen",
($fz=function(){
return this.buf!=null;
},$fz.isPrivate=true,$fz));
$_M(c$,"isClosed",
($fz=function(){
return this.buf==null;
},$fz.isPrivate=true,$fz));
$_V(c$,"mark",
function(readLimit){
{
this.checkNotClosed();
this.markedPos=this.pos;
}},"~N");
$_M(c$,"checkNotClosed",
($fz=function(){
if(this.isClosed()){
throw new java.io.IOException("CharArrayReader is closed");
}},$fz.isPrivate=true,$fz));
$_V(c$,"markSupported",
function(){
return true;
});
$_M(c$,"read",
function(){
{
this.checkNotClosed();
if(this.pos==this.count){
return-1;
}return this.buf[this.pos++];
}});
$_M(c$,"read",
function(buffer,offset,len){
if(offset<0||offset>buffer.length){
throw new ArrayIndexOutOfBoundsException("Offset out of bounds:"+offset);
}if(len<0||len>buffer.length-offset){
throw new ArrayIndexOutOfBoundsException("Length out of bounds:"+len);
}{
this.checkNotClosed();
if(this.pos<this.count){
var bytesRead=this.pos+len>this.count?this.count-this.pos:len;
System.arraycopy(this.buf,this.pos,buffer,offset,bytesRead);
this.pos+=bytesRead;
return bytesRead;
}return-1;
}},"~A,~N,~N");
$_V(c$,"ready",
function(){
{
this.checkNotClosed();
return this.pos!=this.count;
}});
$_V(c$,"reset",
function(){
{
this.checkNotClosed();
this.pos=this.markedPos!=-1?this.markedPos:0;
}});
$_V(c$,"skip",
function(n){
{
this.checkNotClosed();
if(n<=0){
return 0;
}var skipped=0;
if(n<this.count-this.pos){
this.pos=this.pos+n;
skipped=n;
}else{
skipped=this.count-this.pos;
this.pos=this.count;
}return skipped;
}},"~N");
});
