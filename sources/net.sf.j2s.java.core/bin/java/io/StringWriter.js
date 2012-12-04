$_L(["java.io.Writer"],"java.io.StringWriter",["java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","$.NullPointerException","$.StringBuffer"],function(){
c$=$_C(function(){
this.buf=null;
$_Z(this,arguments);
},java.io,"StringWriter",java.io.Writer);
$_K(c$,
function(){
$_R(this,java.io.StringWriter);
this.buf=new StringBuffer(16);
this.lock=this.buf;
});
$_K(c$,
function(initialSize){
$_R(this,java.io.StringWriter,[]);
if(initialSize<0){
throw new IllegalArgumentException();
}this.buf=new StringBuffer(initialSize);
this.lock=this.buf;
},"~N");
$_V(c$,"close",
function(){
});
$_V(c$,"flush",
function(){
});
$_M(c$,"getBuffer",
function(){
return this.buf;
});
$_V(c$,"toString",
function(){
return this.buf.toString();
});
$_M(c$,"write",
function(chars,offset,count){
if(chars==null){
throw new NullPointerException("chars==null");
}if((offset|count)<0||count>chars.length-offset){
throw new IndexOutOfBoundsException();
}if(count==0){
return;
}this.buf.append(chars,offset,count);
},"~A,~N,~N");
$_M(c$,"write",
function(oneChar){
this.buf.append(String.fromCharCode(oneChar));
},"~N");
$_M(c$,"write",
function(str){
this.buf.append(str);
},"~S");
$_M(c$,"write",
function(str,offset,count){
var sub=str.substring(offset,offset+count);
this.buf.append(sub);
},"~S,~N,~N");
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
csq="null";
}var output=csq.subSequence(start,end).toString();
this.write(output,0,output.length);
return this;
},"CharSequence,~N,~N");
});
