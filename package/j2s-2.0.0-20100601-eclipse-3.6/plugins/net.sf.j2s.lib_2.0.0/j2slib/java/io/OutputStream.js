$_L(["java.io.Closeable","$.Flushable"],"java.io.OutputStream",["java.lang.IndexOutOfBoundsException","org.apache.harmony.luni.util.Msg"],function(){
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
if(offset<=buffer.length&&0<=offset&&0<=count&&count<=buffer.length-offset){
for(var i=offset;i<offset+count;i++)this.write(buffer[i]);

}else throw new IndexOutOfBoundsException(org.apache.harmony.luni.util.Msg.getString("K002f"));
},"~A,~N,~N");
});
