$_L(["java.io.DataInput","$.FilterInputStream"],"java.io.DataInputStream",["java.io.EOFException","$.PushbackInputStream","java.lang.Double","$.Float","$.IndexOutOfBoundsException","$.NullPointerException","$.StringBuilder"],function(){
c$=$_C(function(){
this.buff=null;
$_Z(this,arguments);
},java.io,"DataInputStream",java.io.FilterInputStream,java.io.DataInput);
$_K(c$,
function($in){
$_R(this,java.io.DataInputStream,[$in]);
this.buff=$_A(8,0);
},"java.io.InputStream");
$_M(c$,"read",
function(buffer){
return this.$in.read(buffer,0,buffer.length);
},"~A");
$_M(c$,"read",
function(buffer,offset,length){
return this.$in.read(buffer,offset,length);
},"~A,~N,~N");
$_V(c$,"readBoolean",
function(){
var temp=this.$in.read();
if(temp<0){
throw new java.io.EOFException();
}return temp!=0;
});
$_V(c$,"readByte",
function(){
var temp=this.$in.read();
if(temp<0){
throw new java.io.EOFException();
}return temp;
});
$_V(c$,"readChar",
function(){
if(this.readToBuff(2)<0){
throw new java.io.EOFException();
}return String.fromCharCode((((this.buff[0]&0xff)<<8)|(this.buff[1]&0xff)));
});
$_M(c$,"readToBuff",
($fz=function(count){
var offset=0;
while(offset<count){
var bytesRead=this.$in.read(this.buff,offset,count-offset);
if(bytesRead==-1)return bytesRead;
offset+=bytesRead;
}
return offset;
},$fz.isPrivate=true,$fz),"~N");
$_V(c$,"readDouble",
function(){
return Double.longBitsToDouble(this.readLong());
});
$_V(c$,"readFloat",
function(){
return Float.intBitsToFloat(this.readInt());
});
$_M(c$,"readFully",
function(buffer){
this.readFully(buffer,0,buffer.length);
},"~A");
$_M(c$,"readFully",
function(buffer,offset,length){
if(length==0){
return;
}if(this.$in==null){
throw new NullPointerException("in==null");
}if(buffer==null){
throw new NullPointerException("buffer==null");
}if((offset|length)<0||offset>buffer.length-length){
throw new IndexOutOfBoundsException();
}while(length>0){
var result=this.$in.read(buffer,offset,length);
if(result<0){
throw new java.io.EOFException();
}offset+=result;
length-=result;
}
},"~A,~N,~N");
$_V(c$,"readInt",
function(){
if(this.readToBuff(4)<0){
throw new java.io.EOFException();
}return((this.buff[0]&0xff)<<24)|((this.buff[1]&0xff)<<16)|((this.buff[2]&0xff)<<8)|(this.buff[3]&0xff);
});
$_V(c$,"readLine",
function(){
var line=new StringBuilder(80);
var foundTerminator=false;
while(true){
var nextByte=this.$in.read();
switch(nextByte){
case-1:
if(line.length()==0&&!foundTerminator){
return null;
}return line.toString();
case('\r').charCodeAt(0):
if(foundTerminator){
(this.$in).unread(nextByte);
return line.toString();
}foundTerminator=true;
if(!(this.$in.getClass()===java.io.PushbackInputStream)){
this.$in=new java.io.PushbackInputStream(this.$in);
}break;
case('\n').charCodeAt(0):
return line.toString();
default:
if(foundTerminator){
(this.$in).unread(nextByte);
return line.toString();
}line.append(String.fromCharCode(nextByte));
}
}
});
$_V(c$,"readLong",
function(){
if(this.readToBuff(8)<0){
throw new java.io.EOFException();
}var i1=((this.buff[0]&0xff)<<24)|((this.buff[1]&0xff)<<16)|((this.buff[2]&0xff)<<8)|(this.buff[3]&0xff);
var i2=((this.buff[4]&0xff)<<24)|((this.buff[5]&0xff)<<16)|((this.buff[6]&0xff)<<8)|(this.buff[7]&0xff);
return((i1&0xffffffff)<<32)|(i2&0xffffffff);
});
$_V(c$,"readShort",
function(){
if(this.readToBuff(2)<0){
throw new java.io.EOFException();
}return(((this.buff[0]&0xff)<<8)|(this.buff[1]&0xff));
});
$_V(c$,"readUnsignedByte",
function(){
var temp=this.$in.read();
if(temp<0){
throw new java.io.EOFException();
}return temp;
});
$_V(c$,"readUnsignedShort",
function(){
if(this.readToBuff(2)<0){
throw new java.io.EOFException();
}return String.fromCharCode((((this.buff[0]&0xff)<<8)|(this.buff[1]&0xff)));
});
$_V(c$,"readUTF",
function(){
return this.decodeUTF(this.readUnsignedShort());
});
$_M(c$,"decodeUTF",
function(utfSize){
return java.io.DataInputStream.decodeUTF(utfSize,this);
},"~N");
c$.decodeUTF=$_M(c$,"decodeUTF",
($fz=function(utfSize,$in){
var buf=$_A(utfSize,0);
$in.readFully(buf,0,utfSize);
return null;
},$fz.isPrivate=true,$fz),"~N,java.io.DataInput");
$_V(c$,"skipBytes",
function(count){
var skipped=0;
var skip;
while(skipped<count&&(skip=this.$in.skip(count-skipped))!=0){
skipped+=skip;
}
return skipped;
},"~N");
});
