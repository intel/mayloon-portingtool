$_L(["java.io.InputStream"],"java.io.FilterInputStream",null,function(){
c$=$_C(function(){
this.$in=null;
$_Z(this,arguments);
},java.io,"FilterInputStream",java.io.InputStream);
$_K(c$,
function($in){
$_R(this,java.io.FilterInputStream);
this.$in=$in;
},"java.io.InputStream");
$_M(c$,"available",
function(){
return this.$in.available();
});
$_M(c$,"close",
function(){
this.$in.close();
});
$_M(c$,"mark",
function(readlimit){
this.$in.mark(readlimit);
},"~N");
$_M(c$,"markSupported",
function(){
return this.$in.markSupported();
});
$_M(c$,"read",
function(){
return this.$in.read();
});
$_M(c$,"read",
function(buffer){
return this.read(buffer,0,buffer.length);
},"~A");
$_M(c$,"read",
function(buffer,offset,count){
return this.$in.read(buffer,offset,count);
},"~A,~N,~N");
$_M(c$,"reset",
function(){
this.$in.reset();
});
$_M(c$,"skip",
function(count){
return this.$in.skip(count);
},"~N");
});
