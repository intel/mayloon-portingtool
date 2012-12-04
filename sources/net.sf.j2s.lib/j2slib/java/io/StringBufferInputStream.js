$_L(["java.io.InputStream"],"java.io.StringBufferInputStream",["java.lang.ArrayIndexOutOfBoundsException","$.NullPointerException"],function(){
c$=$_C(function(){
this.buffer=null;
this.count=0;
this.pos=0;
$_Z(this,arguments);
},java.io,"StringBufferInputStream",java.io.InputStream);
$_K(c$,
function(str){
$_R(this,java.io.StringBufferInputStream,[]);
if(str==null){
throw new NullPointerException();
}this.buffer=str;
this.count=str.length;
},"~S");
$_V(c$,"available",
function(){
return this.count-this.pos;
});
$_M(c$,"read",
function(){
return this.pos<this.count?(this.buffer.charAt(this.pos++)).charCodeAt(0)&0xFF:-1;
});
$_M(c$,"read",
function(buffer,offset,length){
if(this.pos>=this.count){
return-1;
}if(buffer==null){
throw new NullPointerException("buffer==null");
}if(offset<0||offset>buffer.length){
throw new ArrayIndexOutOfBoundsException("Offset out of bounds:"+offset);
}if(length<0||length>buffer.length-offset){
throw new ArrayIndexOutOfBoundsException("Length out of bounds:"+length);
}if(length==0){
return 0;
}var copylen=this.count-this.pos<length?this.count-this.pos:length;
for(var i=0;i<copylen;i++){
buffer[offset+i]=(this.buffer.charAt(this.pos+i)).charCodeAt(0);
}
this.pos+=copylen;
return copylen;
},"~A,~N,~N");
$_V(c$,"reset",
function(){
this.pos=0;
});
$_V(c$,"skip",
function(n){
if(n<=0){
return 0;
}var numskipped;
if(this.count-this.pos<n){
numskipped=this.count-this.pos;
this.pos=this.count;
}else{
numskipped=n;
this.pos+=n;
}return numskipped;
},"~N");
});
