$_L(["java.io.Closeable","$.Flushable","java.lang.Appendable"],"java.io.Writer",["java.lang.NullPointerException","$.StringIndexOutOfBoundsException"],function(){
c$=$_C(function(){
this.lock=null;
$_Z(this,arguments);
},java.io,"Writer",null,[Appendable,java.io.Closeable,java.io.Flushable]);
$_K(c$,
function(){
this.lock=this;
});
$_K(c$,
function(lock){
if(lock==null){
throw new NullPointerException();
}this.lock=lock;
},"~O");
$_M(c$,"write",
function(buf){
this.write(buf,0,buf.length);
},"~A");
$_M(c$,"write",
function(oneChar){
{
var oneCharArray=$_A(1,'\0');
oneCharArray[0]=String.fromCharCode(oneChar);
this.write(oneCharArray);
}},"~N");
$_M(c$,"write",
function(str){
this.write(str,0,str.length);
},"~S");
$_M(c$,"write",
function(str,offset,count){
if(count<0){
throw new StringIndexOutOfBoundsException();
}var buf=$_A(count,'\0');
str.getChars(offset,offset+count,buf,0);
System.out.println("writer:"+buf+",origin:"+str);
{
this.write(buf,0,buf.length);
}},"~S,~N,~N");
$_M(c$,"append",
function(c){
this.write(c.charCodeAt(0));
return this;
},"~N");
$_M(c$,"append",
function(csq){
if(null==csq){
this.write("null");
}else{
this.write(csq.toString());
}return this;
},"CharSequence");
$_M(c$,"append",
function(csq,start,end){
if(null==csq){
this.write("null".substring(start,end));
}else{
this.write(csq.subSequence(start,end).toString());
}return this;
},"CharSequence,~N,~N");
$_M(c$,"checkError",
function(){
return false;
});
$_S(c$,
"TOKEN_NULL","null");
});
