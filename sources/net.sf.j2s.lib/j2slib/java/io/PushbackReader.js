$_L(["java.io.FilterReader"],"java.io.PushbackReader",["java.io.IOException","java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException","$.IndexOutOfBoundsException","$.NullPointerException"],function(){
c$=$_C(function(){
this.buf=null;
this.pos=0;
$_Z(this,arguments);
},java.io,"PushbackReader",java.io.FilterReader);
$_K(c$,
function($in){
$_R(this,java.io.PushbackReader,[$in]);
this.buf=$_A(1,'\0');
this.pos=1;
},"java.io.Reader");
$_K(c$,
function($in,size){
$_R(this,java.io.PushbackReader,[$in]);
if(size<=0){
throw new IllegalArgumentException("size<=0");
}this.buf=$_A(size,'\0');
this.pos=size;
},"java.io.Reader,~N");
$_V(c$,"close",
function(){
{
this.buf=null;
this.$in.close();
}});
$_V(c$,"mark",
function(readAheadLimit){
throw new java.io.IOException("mark/reset not supported");
},"~N");
$_V(c$,"markSupported",
function(){
return false;
});
$_M(c$,"read",
function(){
{
this.checkNotClosed();
if(this.pos<this.buf.length){
return this.buf[this.pos++];
}return this.$in.read();
}});
$_M(c$,"checkNotClosed",
($fz=function(){
if(this.buf==null){
throw new java.io.IOException("PushbackReader is closed");
}},$fz.isPrivate=true,$fz));
$_M(c$,"read",
function(buffer,offset,count){
{
this.checkNotClosed();
if(buffer==null){
throw new NullPointerException("buffer==null");
}if((offset|count)<0||offset>buffer.length-count){
throw new IndexOutOfBoundsException();
}var copiedChars=0;
var copyLength=0;
var newOffset=offset;
if(this.pos<this.buf.length){
copyLength=(this.buf.length-this.pos>=count)?count:this.buf.length-this.pos;
System.arraycopy(this.buf,this.pos,buffer,newOffset,copyLength);
newOffset+=copyLength;
copiedChars+=copyLength;
this.pos+=copyLength;
}if(copyLength==count){
return count;
}var inCopied=this.$in.read(buffer,newOffset,count-copiedChars);
if(inCopied>0){
return inCopied+copiedChars;
}if(copiedChars==0){
return inCopied;
}return copiedChars;
}},"~A,~N,~N");
$_V(c$,"ready",
function(){
{
if(this.buf==null){
throw new java.io.IOException("Reader is closed");
}return(this.buf.length-this.pos>0||this.$in.ready());
}});
$_V(c$,"reset",
function(){
throw new java.io.IOException("mark/reset not supported");
});
$_M(c$,"unread",
function(buffer){
this.unread(buffer,0,buffer.length);
},"~A");
$_M(c$,"unread",
function(buffer,offset,length){
{
this.checkNotClosed();
if(length>this.pos){
throw new java.io.IOException("Pushback buffer full");
}if(offset>buffer.length-length||offset<0){
throw new ArrayIndexOutOfBoundsException("Offset out of bounds:"+offset);
}if(length<0){
throw new ArrayIndexOutOfBoundsException("Length out of bounds:"+length);
}for(var i=offset+length-1;i>=offset;i--){
this.unread(buffer[i].charCodeAt(0));
}
}},"~A,~N,~N");
$_M(c$,"unread",
function(oneChar){
{
this.checkNotClosed();
if(this.pos==0){
throw new java.io.IOException("Pushback buffer full");
}this.buf[--this.pos]=String.fromCharCode(oneChar);
}},"~N");
$_V(c$,"skip",
function(count){
if(count<0){
throw new IllegalArgumentException();
}{
this.checkNotClosed();
if(count==0){
return 0;
}var inSkipped;
var availableFromBuffer=this.buf.length-this.pos;
if(availableFromBuffer>0){
var requiredFromIn=count-availableFromBuffer;
if(requiredFromIn<=0){
this.pos+=count;
return count;
}this.pos+=availableFromBuffer;
inSkipped=this.$in.skip(requiredFromIn);
}else{
inSkipped=this.$in.skip(count);
}return inSkipped+availableFromBuffer;
}},"~N");
});
