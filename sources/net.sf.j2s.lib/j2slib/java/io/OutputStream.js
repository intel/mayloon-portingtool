$_L(["java.io.Closeable","$.Flushable"],"java.io.OutputStream",["java.lang.IndexOutOfBoundsException","$.NullPointerException"],function(){
c$=$_T(java.io,"OutputStream",null,[java.io.Closeable,java.io.Flushable]);
$_K(c$,
function(){
});
$_V(c$,"close",
function(){
});
$_V(c$,"flush",
function(){
});
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
}for(var i=offset;i<offset+count;i++){
this.write(buffer[i]);
}
},"~A,~N,~N");
$_M(c$,"checkError",
function(){
return false;
});
});
