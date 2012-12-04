$_L(["java.io.FilterInputStream"],"java.io.PushbackInputStream",["java.io.IOException","java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException"],function(){
c$=$_C(function(){
this.buf=null;
this.pos=0;
$_Z(this,arguments);
},java.io,"PushbackInputStream",java.io.FilterInputStream);
$_K(c$,
function($in){
$_R(this,java.io.PushbackInputStream,[$in]);
this.buf=($in==null)?null:$_A(1,0);
this.pos=1;
},"java.io.InputStream");
$_K(c$,
function($in,size){
$_R(this,java.io.PushbackInputStream,[$in]);
if(size<=0){
throw new IllegalArgumentException("size<=0");
}this.buf=($in==null)?null:$_A(size,0);
this.pos=size;
},"java.io.InputStream,~N");
$_V(c$,"available",
function(){
if(this.buf==null){
throw new java.io.IOException();
}return this.buf.length-this.pos+this.$in.available();
});
$_V(c$,"close",
function(){
if(this.$in!=null){
this.$in.close();
this.$in=null;
this.buf=null;
}});
$_V(c$,"markSupported",
function(){
return false;
});
$_M(c$,"read",
function(){
if(this.buf==null){
throw new java.io.IOException();
}if(this.pos<this.buf.length){
return(this.buf[this.pos++]&0xFF);
}return this.$in.read();
});
$_M(c$,"read",
function(buffer,offset,length){
if(this.buf==null){
throw this.streamClosed();
}if(offset>buffer.length||offset<0){
throw new ArrayIndexOutOfBoundsException("Offset out of bounds:"+offset);
}if(length<0||length>buffer.length-offset){
throw new ArrayIndexOutOfBoundsException("Length out of bounds:"+length);
}var copiedBytes=0;
var copyLength=0;
var newOffset=offset;
if(this.pos<this.buf.length){
copyLength=(this.buf.length-this.pos>=length)?length:this.buf.length-this.pos;
System.arraycopy(this.buf,this.pos,buffer,newOffset,copyLength);
newOffset+=copyLength;
copiedBytes+=copyLength;
this.pos+=copyLength;
}if(copyLength==length){
return length;
}var inCopied=this.$in.read(buffer,newOffset,length-copiedBytes);
if(inCopied>0){
return inCopied+copiedBytes;
}if(copiedBytes==0){
return inCopied;
}return copiedBytes;
},"~A,~N,~N");
$_M(c$,"streamClosed",
($fz=function(){
throw new java.io.IOException("PushbackInputStream is closed");
},$fz.isPrivate=true,$fz));
$_V(c$,"skip",
function(count){
if(this.$in==null){
throw this.streamClosed();
}if(count<=0){
return 0;
}var numSkipped=0;
if(this.pos<this.buf.length){
numSkipped+=(count<this.buf.length-this.pos)?count:this.buf.length-this.pos;
this.pos+=numSkipped;
}if(numSkipped<count){
numSkipped+=this.$in.skip(count-numSkipped);
}return numSkipped;
},"~N");
$_M(c$,"unread",
function(buffer){
this.unread(buffer,0,buffer.length);
},"~A");
$_M(c$,"unread",
function(buffer,offset,length){
if(length>this.pos){
throw new java.io.IOException("Pushback buffer full");
}if(offset>buffer.length||offset<0){
throw new ArrayIndexOutOfBoundsException("Offset out of bounds:"+offset);
}if(length<0||length>buffer.length-offset){
throw new ArrayIndexOutOfBoundsException("Length out of bounds:"+length);
}if(this.buf==null){
throw this.streamClosed();
}System.arraycopy(buffer,offset,this.buf,this.pos-length,length);
this.pos=this.pos-length;
},"~A,~N,~N");
$_M(c$,"unread",
function(oneByte){
if(this.buf==null){
throw new java.io.IOException();
}if(this.pos==0){
throw new java.io.IOException("Pushback buffer full");
}this.buf[--this.pos]=oneByte;
},"~N");
$_V(c$,"mark",
function(readlimit){
return;
},"~N");
$_V(c$,"reset",
function(){
throw new java.io.IOException();
});
});
