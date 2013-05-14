$_L(["java.io.Closeable","$.DataInput","$.DataOutput","$.JSFileSystem"],"java.io.RandomAccessFile",["java.io.EOFException","$.File","$.FileDescriptor","$.IOException","$.UTFDataFormatException","java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","$.NullPointerException","$.StringBuilder"],function(){
c$=$_C(function(){
this.fd=null;
this.syncMetadata=false;
this.channel=null;
this.fileSystem=null;
this.isReadOnly=false;
this.options=0;
$_Z(this,arguments);
},java.io,"RandomAccessFile",null,[java.io.DataInput,java.io.DataOutput,java.io.Closeable]);
$_Y(c$,function(){
this.fileSystem=java.io.JSFileSystem.getJSFileSystem();
});
$_K(c$,
function(file,mode){
this.options=0;
this.fd=new java.io.FileDescriptor();
if(mode.equals("r")){
this.isReadOnly=true;
this.fd.readOnly=true;
this.options=0;
}else if(mode.equals("rw")||mode.equals("rws")||mode.equals("rwd")){
this.isReadOnly=false;
this.options=16;
if(mode.equals("rws")){
this.syncMetadata=true;
}else if(mode.equals("rwd")){
this.options=32;
}}else{
throw new IllegalArgumentException("Invalid mode:"+mode);
}var security=System.getSecurityManager();
if(security!=null){
security.checkRead(file.getPath());
if(!this.isReadOnly){
security.checkWrite(file.getPath());
}}this.fd=this.fileSystem.open(file.getAbsolutePath(),this.options);
if(this.syncMetadata){
try{
this.fd.sync();
}catch(e){
if($_O(e,java.io.IOException)){
}else{
throw e;
}
}
}},"java.io.File,~S");
$_K(c$,
function(fileName,mode){
this.construct(new java.io.File(fileName),mode);
},"~S,~S");
$_V(c$,"close",
function(){
{
if(this.channel!=null&&this.channel.isOpen()){
this.channel.close();
this.channel=null;
}if(this.fd!=null&&this.fd.valid()){
this.fileSystem.close(this.fd.descriptor);
}}});
$_M(c$,"finalize",
function(){
try{
this.close();
}finally{
$_U(this,java.io.RandomAccessFile,"finalize",[]);
}
});
$_M(c$,"getFD",
function(){
return this.fd;
});
$_M(c$,"getFilePointer",
function(){
this.openCheck();
return this.fileSystem.seek(this.fd.descriptor,0,2);
});
$_M(c$,"openCheck",
($fz=function(){
if(this.fd.descriptor<0){
throw new java.io.IOException();
}},$fz.isPrivate=true,$fz));
$_M(c$,"length",
function(){
this.openCheck();
return this.fileSystem.length(this.fd.descriptor);
});
$_M(c$,"read",
function(){
this.openCheck();
var bytes=$_A(1,0);
var byteCount=this.fileSystem.read(this.fd.descriptor,bytes,0,1);
return byteCount==-1?-1:bytes[0]&0xff;
});
$_M(c$,"read",
function(buffer){
return this.read(buffer,0,buffer.length);
},"~A");
$_M(c$,"read",
function(buffer,offset,count){
if(buffer==null){
throw new NullPointerException("buffer==null");
}if((offset|count)<0||count>buffer.length-offset){
throw new IndexOutOfBoundsException();
}if(0==count){
return 0;
}this.openCheck();
return this.fileSystem.read(this.fd.descriptor,buffer,offset,count);
},"~A,~N,~N");
$_V(c$,"readBoolean",
function(){
var temp=this.read();
if(temp<0){
throw new java.io.EOFException();
}return temp!=0;
});
$_V(c$,"readByte",
function(){
var temp=this.read();
if(temp<0){
throw new java.io.EOFException();
}return temp;
});
$_V(c$,"readChar",
function(){
var buffer=$_A(2,0);
if(this.read(buffer,0,buffer.length)!=buffer.length){
throw new java.io.EOFException();
}return String.fromCharCode((((buffer[0]&0xff)<<8)+(buffer[1]&0xff)));
});
$_V(c$,"readDouble",
function(){
return 0.0;
});
$_V(c$,"readFloat",
function(){
return 0;
});
$_M(c$,"readFully",
function(buffer){
this.readFully(buffer,0,buffer.length);
},"~A");
$_M(c$,"readFully",
function(buffer,offset,count){
if(buffer==null){
throw new NullPointerException("buffer==null");
}if((offset|count)<0||count>buffer.length-offset){
throw new IndexOutOfBoundsException();
}while(count>0){
var result=this.read(buffer,offset,count);
if(result<0){
throw new java.io.EOFException();
}offset+=result;
count-=result;
}
},"~A,~N,~N");
$_V(c$,"readInt",
function(){
var buffer=$_A(4,0);
if(this.read(buffer,0,buffer.length)!=buffer.length){
throw new java.io.EOFException();
}return((buffer[0]&0xff)<<24)+((buffer[1]&0xff)<<16)+((buffer[2]&0xff)<<8)+(buffer[3]&0xff);
});
$_V(c$,"readLine",
function(){
var line=new StringBuilder(80);
var foundTerminator=false;
var unreadPosition=0;
while(true){
var nextByte=this.read();
switch(nextByte){
case-1:
return line.length()!=0?line.toString():null;
case('\r').charCodeAt(0):
if(foundTerminator){
this.seek(unreadPosition);
return line.toString();
}foundTerminator=true;
unreadPosition=this.getFilePointer();
break;
case('\n').charCodeAt(0):
return line.toString();
default:
if(foundTerminator){
this.seek(unreadPosition);
return line.toString();
}line.append(String.fromCharCode(nextByte));
}
}
});
$_V(c$,"readLong",
function(){
var buffer=$_A(8,0);
if(this.read(buffer,0,buffer.length)!=buffer.length){
throw new java.io.EOFException();
}return((((buffer[0]&0xff)<<24)+((buffer[1]&0xff)<<16)+((buffer[2]&0xff)<<8)+(buffer[3]&0xff))<<32)+((buffer[4]&0xff)<<24)+((buffer[5]&0xff)<<16)+((buffer[6]&0xff)<<8)+(buffer[7]&0xff);
});
$_V(c$,"readShort",
function(){
var buffer=$_A(2,0);
if(this.read(buffer,0,buffer.length)!=buffer.length){
throw new java.io.EOFException();
}return(((buffer[0]&0xff)<<8)+(buffer[1]&0xff));
});
$_V(c$,"readUnsignedByte",
function(){
var temp=this.read();
if(temp<0){
throw new java.io.EOFException();
}return temp;
});
$_V(c$,"readUnsignedShort",
function(){
var buffer=$_A(2,0);
if(this.read(buffer,0,buffer.length)!=buffer.length){
throw new java.io.EOFException();
}return((buffer[0]&0xff)<<8)+(buffer[1]&0xff);
});
$_V(c$,"readUTF",
function(){
var utfSize=this.readUnsignedShort();
if(utfSize==0){
return"";
}var buf=$_A(utfSize,0);
if(this.read(buf,0,buf.length)!=buf.length){
throw new java.io.EOFException();
}return null;
});
$_M(c$,"seek",
function(offset){
if(offset<0){
throw new java.io.IOException("offset<0");
}this.openCheck();
this.fileSystem.seek(this.fd.descriptor,offset,1);
},"~N");
$_M(c$,"setLength",
function(newLength){
this.openCheck();
if(newLength<0){
throw new IllegalArgumentException();
}this.fileSystem.truncate(this.fd.descriptor,newLength);
if(this.syncMetadata){
this.fd.sync();
}},"~N");
$_V(c$,"skipBytes",
function(count){
if(count>0){
var currentPos=this.getFilePointer();
var eof=this.length();
var newCount=((currentPos+count>eof)?eof-currentPos:count);
this.seek(currentPos+newCount);
return newCount;
}return 0;
},"~N");
$_M(c$,"write",
function(buffer){
this.write(buffer,0,buffer.length);
},"~A");
$_M(c$,"write",
function(buffer,offset,count){
if(buffer==null){
throw new NullPointerException("buffer==null");
}if((offset|count)<0||count>buffer.length-offset){
throw new IndexOutOfBoundsException();
}if(count==0){
return;
}this.openCheck();
this.fileSystem.write(this.fd.descriptor,buffer,offset,count);
if(this.syncMetadata){
this.fd.sync();
}},"~A,~N,~N");
$_M(c$,"write",
function(oneByte){
this.openCheck();
var bytes=$_A(1,0);
bytes[0]=(oneByte&0xff);
this.fileSystem.write(this.fd.descriptor,bytes,0,1);
if(this.syncMetadata){
this.fd.sync();
}},"~N");
$_V(c$,"writeBoolean",
function(val){
this.write(val?1:0);
},"~B");
$_V(c$,"writeByte",
function(val){
this.write(val&0xFF);
},"~N");
$_V(c$,"writeBytes",
function(str){
var bytes=$_A(str.length,0);
for(var index=0;index<str.length;index++){
bytes[index]=((str.charAt(index)).charCodeAt(0)&0xFF);
}
this.write(bytes);
},"~S");
$_V(c$,"writeChar",
function(val){
var buffer=$_A(2,0);
buffer[0]=(val>>8);
buffer[1]=val;
this.write(buffer,0,buffer.length);
},"~N");
$_V(c$,"writeChars",
function(str){
var newBytes=$_A(str.length*2,0);
for(var index=0;index<str.length;index++){
var newIndex=index==0?index:index*2;
newBytes[newIndex]=(((str.charAt(index)).charCodeAt(0)>>8)&0xFF);
newBytes[newIndex+1]=((str.charAt(index)).charCodeAt(0)&0xFF);
}
this.write(newBytes);
},"~S");
$_V(c$,"writeDouble",
function(val){
},"~N");
$_V(c$,"writeFloat",
function(val){
},"~N");
$_V(c$,"writeInt",
function(val){
var buffer=$_A(4,0);
buffer[0]=(val>>24);
buffer[1]=(val>>16);
buffer[2]=(val>>8);
buffer[3]=val;
this.write(buffer,0,buffer.length);
},"~N");
$_V(c$,"writeLong",
function(val){
var buffer=$_A(8,0);
var t=(val>>32);
buffer[0]=(t>>24);
buffer[1]=(t>>16);
buffer[2]=(t>>8);
buffer[3]=t;
buffer[4]=(val>>24);
buffer[5]=(val>>16);
buffer[6]=(val>>8);
buffer[7]=val;
this.write(buffer,0,buffer.length);
},"~N");
$_V(c$,"writeShort",
function(val){
this.writeChar(val);
},"~N");
$_V(c$,"writeUTF",
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
if(utfCount>65535){
throw new java.io.UTFDataFormatException("String more than 65535 UTF bytes long");
}var utfBytes=$_A(utfCount+2,0);
var utfIndex=2;
for(var i=0;i<length;i++){
var charValue=(str.charAt(i)).charCodeAt(0);
if(charValue>0&&charValue<=127){
utfBytes[utfIndex++]=charValue;
}else if(charValue<=2047){
utfBytes[utfIndex++]=(0xc0|(0x1f&(charValue>>6)));
utfBytes[utfIndex++]=(0x80|(0x3f&charValue));
}else{
utfBytes[utfIndex++]=(0xe0|(0x0f&(charValue>>12)));
utfBytes[utfIndex++]=(0x80|(0x3f&(charValue>>6)));
utfBytes[utfIndex++]=(0x80|(0x3f&charValue));
}}
utfBytes[0]=(utfCount>>8);
utfBytes[1]=utfCount;
this.write(utfBytes);
},"~S");
});
