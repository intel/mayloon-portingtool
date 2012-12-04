$_L(["java.io.FilterInputStream"],"java.io.LineNumberInputStream",["java.lang.ArrayIndexOutOfBoundsException"],function(){
c$=$_C(function(){
this.lineNumber=0;
this.markedLineNumber=-1;
this.lastChar=-1;
this.markedLastChar=0;
$_Z(this,arguments);
},java.io,"LineNumberInputStream",java.io.FilterInputStream);
$_V(c$,"available",
function(){
return Math.floor(this.$in.available()/2)+(this.lastChar==-1?0:1);
});
$_M(c$,"getLineNumber",
function(){
return this.lineNumber;
});
$_V(c$,"mark",
function(readlimit){
this.$in.mark(readlimit);
this.markedLineNumber=this.lineNumber;
this.markedLastChar=this.lastChar;
},"~N");
$_M(c$,"read",
function(){
var currentChar=this.lastChar;
if(currentChar==-1){
currentChar=this.$in.read();
}else{
this.lastChar=-1;
}switch(currentChar){
case'\r':
currentChar=('\n').charCodeAt(0);
this.lastChar=this.$in.read();
if(this.lastChar==('\n').charCodeAt(0)){
this.lastChar=-1;
}case'\n':
this.lineNumber++;
}
return currentChar;
});
$_M(c$,"read",
function(buffer,offset,length){
if(offset>buffer.length||offset<0){
throw new ArrayIndexOutOfBoundsException("Offset out of bounds:"+offset);
}if(length<0||length>buffer.length-offset){
throw new ArrayIndexOutOfBoundsException("Length out of bounds:"+length);
}for(var i=0;i<length;i++){
var currentChar;
try{
currentChar=this.read();
}catch(e){
if($_O(e,java.io.IOException)){
if(i!=0){
return i;
}throw e;
}else{
throw e;
}
}
if(currentChar==-1){
return i==0?-1:i;
}buffer[offset+i]=currentChar;
}
return length;
},"~A,~N,~N");
$_V(c$,"reset",
function(){
this.$in.reset();
this.lineNumber=this.markedLineNumber;
this.lastChar=this.markedLastChar;
});
$_M(c$,"setLineNumber",
function(lineNumber){
this.lineNumber=lineNumber;
},"~N");
$_V(c$,"skip",
function(count){
if(count<=0){
return 0;
}for(var i=0;i<count;i++){
var currentChar=this.read();
if(currentChar==-1){
return i;
}}
return count;
},"~N");
});
