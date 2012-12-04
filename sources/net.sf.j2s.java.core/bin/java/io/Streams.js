$_L(["java.util.concurrent.atomic.AtomicReference"],"java.io.Streams",null,function(){
c$=$_T(java.io,"Streams");
c$.skipAll=$_M(c$,"skipAll",
function($in){
do{
$in.skip(9223372036854775807);
}while($in.read()!=-1);
},"java.io.InputStream");
c$.skipByReading=$_M(c$,"skipByReading",
function($in,byteCount){
var buffer=java.io.Streams.skipBuffer.getAndSet(null);
if(buffer==null){
buffer=$_A(4096,0);
}var skipped=0;
while(skipped<byteCount){
var toRead=Math.min(byteCount-skipped,buffer.length);
var read=$in.read(buffer,0,toRead);
if(read==-1){
break;
}skipped+=read;
if(read<toRead){
break;
}}
java.io.Streams.skipBuffer.set(buffer);
return skipped;
},"java.io.InputStream,~N");
c$.skipBuffer=c$.prototype.skipBuffer=new java.util.concurrent.atomic.AtomicReference();
});
