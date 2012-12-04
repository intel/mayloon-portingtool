$_L(["java.io.Closeable"],"java.io.InputStream",["java.io.IOException","java.lang.ArrayIndexOutOfBoundsException"],function(){
c$=$_T(java.io,"InputStream",null,java.io.Closeable);
$_K(c$,
function(){
});
$_M(c$,"available",
function(){
return 0;
});
$_V(c$,"close",
function(){
});
$_M(c$,"mark",
function(readlimit){
},"~N");
$_M(c$,"markSupported",
function(){
return false;
});
$_M(c$,"read",
function(b){
return this.read(b,0,b.length);
},"~A");
$_M(c$,"read",
function(b,offset,length){
if(offset<=b.length&&0<=offset&&0<=length&&length<=b.length-offset){
for(var i=0;i<length;i++){
var c;
try{
if((c=this.read())==-1)return i==0?-1:i;
}catch(e){
if($_O(e,java.io.IOException)){
if(i!=0)return i;
throw e;
}else{
throw e;
}
}
b[offset+i]=c;
}
return length;
}throw new ArrayIndexOutOfBoundsException();
},"~A,~N,~N");
$_M(c$,"reset",
function(){
throw new java.io.IOException();
});
$_M(c$,"skip",
function(n){
if(n<=0)return 0;
var skipped=0;
var toRead=n<4096?n:4096;
if(java.io.InputStream.skipBuf==null||java.io.InputStream.skipBuf.length<toRead)($t$=java.io.InputStream.skipBuf=$_A(toRead,0),java.io.InputStream.prototype.skipBuf=java.io.InputStream.skipBuf,$t$);
while(skipped<n){
var read=this.read(java.io.InputStream.skipBuf,0,toRead);
if(read==-1)return skipped;
skipped+=read;
if(read<toRead)return skipped;
if(n-skipped<toRead)toRead=(n-skipped);
}
return skipped;
},"~N");
$_S(c$,
"skipBuf",null);
});
