$_L(["java.io.Reader"],"java.io.StringReader",["java.io.IOException","java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException"],function(){
c$=$_C(function(){
this.str=null;
this.markpos=-1;
this.pos=0;
this.count=0;
$_Z(this,arguments);
},java.io,"StringReader",java.io.Reader);
$_K(c$,
function(str){
$_R(this,java.io.StringReader);
this.str=str;
this.count=str.length;
},"~S");
$_V(c$,"close",
function(){
this.str=null;
});
$_M(c$,"isClosed",
($fz=function(){
return this.str==null;
},$fz.isPrivate=true,$fz));
$_V(c$,"mark",
function(readLimit){
if(readLimit<0){
throw new IllegalArgumentException();
}{
this.checkNotClosed();
this.markpos=this.pos;
}},"~N");
$_M(c$,"checkNotClosed",
($fz=function(){
if(this.isClosed()){
throw new java.io.IOException("StringReader is closed");
}},$fz.isPrivate=true,$fz));
$_V(c$,"markSupported",
function(){
return true;
});
$_M(c$,"read",
function(){
{
this.checkNotClosed();
if(this.pos!=this.count){
return this.str.charAt(this.pos++);
}return-1;
}});
$_M(c$,"read",
function(buf,offset,len){
{
this.checkNotClosed();
if(offset<0||offset>buf.length){
throw new ArrayIndexOutOfBoundsException("Offset out of bounds:"+offset);
}if(len<0||len>buf.length-offset){
throw new ArrayIndexOutOfBoundsException("Length out of bounds:"+len);
}if(len==0){
return 0;
}if(this.pos==this.count){
return-1;
}var end=this.pos+len>this.count?this.count:this.pos+len;
this.str.getChars(this.pos,end,buf,offset);
var read=end-this.pos;
this.pos=end;
return read;
}},"~A,~N,~N");
$_V(c$,"ready",
function(){
{
this.checkNotClosed();
return true;
}});
$_V(c$,"reset",
function(){
{
this.checkNotClosed();
this.pos=this.markpos!=-1?this.markpos:0;
}});
$_V(c$,"skip",
function(ns){
{
this.checkNotClosed();
var minSkip=-this.pos;
var maxSkip=this.count-this.pos;
if(maxSkip==0||ns>maxSkip){
ns=maxSkip;
}else if(ns<minSkip){
ns=minSkip;
}this.pos+=ns;
return ns;
}},"~N");
});
