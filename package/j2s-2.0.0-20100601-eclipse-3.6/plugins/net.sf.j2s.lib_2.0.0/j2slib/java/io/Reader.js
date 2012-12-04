$_L(["java.io.Closeable","java.lang.Readable"],"java.io.Reader",["java.io.IOException","java.lang.IllegalArgumentException","$.NullPointerException"],function(){
c$=$_C(function(){
this.lock=null;
$_Z(this,arguments);
},java.io,"Reader",null,[Readable,java.io.Closeable]);
$_K(c$,
function(){
this.lock=this;
});
$_K(c$,
function(lock){
if(lock!=null)this.lock=lock;
else throw new NullPointerException();
},"~O");
$_M(c$,"mark",
function(readLimit){
throw new java.io.IOException();
},"~N");
$_M(c$,"markSupported",
function(){
return false;
});
$_M(c$,"read",
function(){
{
var charArray=$_A(1,'\0');
if(this.read(charArray,0,1)!=-1)return charArray[0];
return-1;
}});
$_M(c$,"read",
function(buf){
return this.read(buf,0,buf.length);
},"~A");
$_M(c$,"ready",
function(){
return false;
});
$_M(c$,"reset",
function(){
throw new java.io.IOException();
});
$_M(c$,"skip",
function(count){
if(count>=0){
{
var skipped=0;
var toRead=count<512?count:512;
var charsSkipped=$_A(toRead,'\0');
while(skipped<count){
var read=this.read(charsSkipped,0,toRead);
if(read==-1){
return skipped;
}skipped+=read;
if(read<toRead){
return skipped;
}if(count-skipped<toRead){
toRead=(count-skipped);
}}
return skipped;
}}throw new IllegalArgumentException();
},"~N");
$_M(c$,"read",
function(target){
if(null==target){
throw new NullPointerException();
}var length=target.length();
var buf=$_A(length,'\0');
length=Math.min(length,this.read(buf));
if(length>0){
target.put(buf,0,length);
}return length;
},"java.nio.CharBuffer");
});
