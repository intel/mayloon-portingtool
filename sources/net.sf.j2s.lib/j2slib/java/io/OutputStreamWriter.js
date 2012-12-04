$_L(["java.io.Writer"],"java.io.OutputStreamWriter",["java.lang.NullPointerException"],function(){
c$=$_C(function(){
this.out=null;
$_Z(this,arguments);
},java.io,"OutputStreamWriter",java.io.Writer);
$_K(c$,
function(out){
this.construct(out,"utf-8");
},"java.io.OutputStream");
$_K(c$,
function(out,enc){
$_R(this,java.io.OutputStreamWriter,[out]);
if(enc==null){
throw new NullPointerException();
}this.out=out;
},"java.io.OutputStream,~S");
$_V(c$,"close",
function(){
{
this.flush();
this.out.flush();
this.out.close();
}});
$_V(c$,"flush",
function(){
});
$_M(c$,"getEncoding",
function(){
return"utf-8";
});
$_M(c$,"write",
function(buffer,offset,count){
var data=$_A(count,0);
System.arraycopy(buffer,offset,data,0,count);
this.out.write(data,offset,count);
},"~A,~N,~N");
$_M(c$,"write",
function(oneChar){
var data=oneChar;
var cnt=$_A(1,0);
cnt[0]=data;
this.out.write(cnt,0,1);
},"~N");
$_M(c$,"write",
function(str,offset,count){
var chars=str.toCharArray();
var buffer=$_A(chars.length,0);
System.arraycopy(chars,0,buffer,0,chars.length);
this.out.write(buffer,offset,count);
},"~S,~N,~N");
$_V(c$,"checkError",
function(){
return this.out.checkError();
});
});
