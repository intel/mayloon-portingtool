$_L(["java.io.InputStream"],"java.io.ByteArrayInputStream",["java.lang.ArrayIndexOutOfBoundsException","$.NullPointerException"],function(){
c$=$_C(function(){
this.buf=null;
this.pos=0;
this.$mark=0;
this.count=0;
$_Z(this,arguments);
},java.io,"ByteArrayInputStream",java.io.InputStream);
$_K(c$,
function(buf){
$_R(this,java.io.ByteArrayInputStream,[]);
this.$mark=0;
this.buf=buf;
this.count=buf.length;
},"~A");
$_K(c$,
function(buf,offset,length){
$_R(this,java.io.ByteArrayInputStream,[]);
this.buf=buf;
this.pos=offset>=buf.length?buf.length:offset;
this.$mark=this.pos;
this.count=length+this.pos>buf.length?buf.length:length+this.pos;
},"~A,~N,~N");
$_V(c$,"available",
function(){
return this.count-this.pos;
});
$_V(c$,"close",
function(){
});
$_V(c$,"mark",
function(readlimit){
this.$mark=this.pos;
},"~N");
$_V(c$,"markSupported",
function(){
return true;
});
$_M(c$,"read",
function(){
return this.pos<this.count?this.buf[this.pos++]&0xFF:-1;
});
$_M(c$,"read",
function(b,offset,length){
if(this.pos>=this.count){
return-1;
}if(b!=null){
if(0<=offset&&offset<=b.length&&0<=length&&length<=b.length-offset){
if(length==0){
return 0;
}var copylen=this.count-this.pos<length?this.count-this.pos:length;
System.arraycopy(this.buf,this.pos,b,offset,copylen);
this.pos+=copylen;
return copylen;
}throw new ArrayIndexOutOfBoundsException();
}throw new NullPointerException();
},"~A,~N,~N");
$_V(c$,"reset",
function(){
this.pos=this.$mark;
});
$_V(c$,"skip",
function(n){
if(n<=0){
return 0;
}var temp=this.pos;
this.pos=this.count-this.pos<n?this.count:(this.pos+n);
return this.pos-temp;
},"~N");
});
