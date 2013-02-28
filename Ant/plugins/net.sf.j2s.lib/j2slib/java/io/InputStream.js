$_L(["java.io.Closeable"],"java.io.InputStream",["java.io.IOException","$.Streams","java.lang.ArrayIndexOutOfBoundsException"],function(){
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
if(offset>b.length||offset<0){
throw new ArrayIndexOutOfBoundsException("Offset out of bounds:"+offset);
}if(length<0||length>b.length-offset){
throw new ArrayIndexOutOfBoundsException("Length out of bounds:"+length);
}for(var i=0;i<length;i++){
var c;
try{
if((c=this.read())==-1){
return i==0?-1:i;
}}catch(e){
if($_O(e,java.io.IOException)){
if(i!=0){
return i;
}throw e;
}else{
throw e;
}
}
b[offset+i]=c;
}
return length;
},"~A,~N,~N");
$_M(c$,"reset",
function(){
throw new java.io.IOException();
});
$_M(c$,"skip",
function(byteCount){
return java.io.Streams.skipByReading(this,byteCount);
},"~N");
});
