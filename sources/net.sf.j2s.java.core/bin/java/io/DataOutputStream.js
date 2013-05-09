$_L(["java.io.DataOutput","$.FilterOutputStream"],"java.io.DataOutputStream",["java.io.UTFDataFormatException","java.lang.NullPointerException"],function(){
c$=$_C(function(){
this.written=0;
this.buff=null;
$_Z(this,arguments);
},java.io,"DataOutputStream",java.io.FilterOutputStream,java.io.DataOutput);
$_K(c$,
function(out){
$_R(this,java.io.DataOutputStream,[out]);
this.buff=$_A(8,0);
},"java.io.OutputStream");
$_M(c$,"size",
function(){
if(this.written<0){
this.written=2147483647;
}return this.written;
});
$_M(c$,"write",
function(buffer,offset,count){
if(buffer==null){
throw new NullPointerException("buffer==null");
}this.out.write(buffer,offset,count);
this.written+=count;
},"~A,~N,~N");
$_M(c$,"write",
function(oneByte){
this.out.write(oneByte);
this.written++;
},"~N");
$_V(c$,"writeBoolean",
function(val){
this.out.write(val?1:0);
this.written++;
},"~B");
$_V(c$,"writeByte",
function(val){
this.out.write(val);
this.written++;
},"~N");
$_V(c$,"writeBytes",
function(str){
if(str.length==0){
return;
}var bytes=$_A(str.length,0);
for(var index=0;index<str.length;index++){
bytes[index]=(str.charAt(index)).charCodeAt(0);
}
this.out.write(bytes);
this.written+=bytes.length;
},"~S");
$_V(c$,"writeChar",
function(val){
this.buff[0]=(val>>8);
this.buff[1]=val;
this.out.write(this.buff,0,2);
this.written+=2;
},"~N");
$_V(c$,"writeChars",
function(str){
var newBytes=$_A(str.length*2,0);
for(var index=0;index<str.length;index++){
var newIndex=index==0?index:index*2;
newBytes[newIndex]=((str.charAt(index)).charCodeAt(0)>>8);
newBytes[newIndex+1]=(str.charAt(index)).charCodeAt(0);
}
this.out.write(newBytes);
this.written+=newBytes.length;
},"~S");
$_V(c$,"writeDouble",
function(val){
},"~N");
$_V(c$,"writeFloat",
function(val){
},"~N");
$_V(c$,"writeInt",
function(val){
this.buff[0]=(val>>24);
this.buff[1]=(val>>16);
this.buff[2]=(val>>8);
this.buff[3]=val;
this.out.write(this.buff,0,4);
this.written+=4;
},"~N");
$_V(c$,"writeLong",
function(val){
this.buff[0]=(val>>56);
this.buff[1]=(val>>48);
this.buff[2]=(val>>40);
this.buff[3]=(val>>32);
this.buff[4]=(val>>24);
this.buff[5]=(val>>16);
this.buff[6]=(val>>8);
this.buff[7]=val;
this.out.write(this.buff,0,8);
this.written+=8;
},"~N");
$_M(c$,"writeLongToBuffer",
function(val,buffer,offset){
buffer[offset++]=(val>>56);
buffer[offset++]=(val>>48);
buffer[offset++]=(val>>40);
buffer[offset++]=(val>>32);
buffer[offset++]=(val>>24);
buffer[offset++]=(val>>16);
buffer[offset++]=(val>>8);
buffer[offset++]=val;
return offset;
},"~N,~A,~N");
$_V(c$,"writeShort",
function(val){
this.buff[0]=(val>>8);
this.buff[1]=val;
this.out.write(this.buff,0,2);
this.written+=2;
},"~N");
$_M(c$,"writeShortToBuffer",
function(val,buffer,offset){
buffer[offset++]=(val>>8);
buffer[offset++]=val;
return offset;
},"~N,~A,~N");
$_V(c$,"writeUTF",
function(str){
var utfCount=this.countUTFBytes(str);
if(utfCount>65535){
throw new java.io.UTFDataFormatException("String more than 65535 UTF bytes long");
}var buffer=$_A(utfCount+2,0);
var offset=0;
offset=this.writeShortToBuffer(utfCount,buffer,offset);
offset=this.writeUTFBytesToBuffer(str,buffer,offset);
this.write(buffer,0,offset);
},"~S");
$_M(c$,"countUTFBytes",
function(str){
var utfCount=0;
var length=str.length;
for(var i=0;i<length;i++){
var charValue=(str.charAt(i)).charCodeAt(0);
if(charValue>0&&charValue<=127){
utfCount++;
}else if(charValue<=2047){
utfCount+=2;
}else{
utfCount+=3;
}}
return utfCount;
},"~S");
$_M(c$,"writeUTFBytesToBuffer",
function(str,buffer,offset){
var length=str.length;
for(var i=0;i<length;i++){
var charValue=(str.charAt(i)).charCodeAt(0);
if(charValue>0&&charValue<=127){
buffer[offset++]=charValue;
}else if(charValue<=2047){
buffer[offset++]=(0xc0|(0x1f&(charValue>>6)));
buffer[offset++]=(0x80|(0x3f&charValue));
}else{
buffer[offset++]=(0xe0|(0x0f&(charValue>>12)));
buffer[offset++]=(0x80|(0x3f&(charValue>>6)));
buffer[offset++]=(0x80|(0x3f&charValue));
}}
return offset;
},"~S,~A,~N");
});
