$_L(["java.io.FilterInputStream"],"java.io.BufferedInputStream",["java.io.IOException","java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","$.NullPointerException"],function(){
c$=$_C(function(){
this.buf=null;
this.count=0;
this.marklimit=0;
this.markpos=-1;
this.pos=0;
$_Z(this,arguments);
},java.io,"BufferedInputStream",java.io.FilterInputStream);
$_K(c$,
function($in){
this.construct($in,8192);
},"java.io.InputStream");
$_K(c$,
function($in,size){
$_R(this,java.io.BufferedInputStream,[$in]);
if(size<=0){
throw new IllegalArgumentException("size<=0");
}this.buf=$_A(size,0);
},"java.io.InputStream,~N");
$_V(c$,"available",
function(){
var localIn=this.$in;
if(this.buf==null||localIn==null){
throw this.streamClosed();
}return this.count-this.pos+localIn.available();
});
$_M(c$,"streamClosed",
($fz=function(){
throw new java.io.IOException("BufferedInputStream is closed");
},$fz.isPrivate=true,$fz));
$_V(c$,"close",
function(){
this.buf=null;
var localIn=this.$in;
this.$in=null;
if(localIn!=null){
localIn.close();
}});
$_M(c$,"fillbuf",
($fz=function(localIn,localBuf){
if(this.markpos==-1||(this.pos-this.markpos>=this.marklimit)){
var result=localIn.read(localBuf);
if(result>0){
this.markpos=-1;
this.pos=0;
this.count=result==-1?0:result;
}return result;
}if(this.markpos==0&&this.marklimit>localBuf.length){
var newLength=localBuf.length*2;
if(newLength>this.marklimit){
newLength=this.marklimit;
}var newbuf=$_A(newLength,0);
System.arraycopy(localBuf,0,newbuf,0,localBuf.length);
localBuf=this.buf=newbuf;
}else if(this.markpos>0){
System.arraycopy(localBuf,this.markpos,localBuf,0,localBuf.length-this.markpos);
}this.pos-=this.markpos;
this.count=this.markpos=0;
var bytesread=localIn.read(localBuf,this.pos,localBuf.length-this.pos);
this.count=bytesread<=0?this.pos:this.pos+bytesread;
return bytesread;
},$fz.isPrivate=true,$fz),"java.io.InputStream,~A");
$_V(c$,"mark",
function(readlimit){
this.marklimit=readlimit;
this.markpos=this.pos;
},"~N");
$_V(c$,"markSupported",
function(){
return true;
});
$_M(c$,"read",
function(){
var localBuf=this.buf;
var localIn=this.$in;
if(localBuf==null||localIn==null){
throw this.streamClosed();
}if(this.pos>=this.count&&this.fillbuf(localIn,localBuf)==-1){
return-1;
}if(localBuf!==this.buf){
localBuf=this.buf;
if(localBuf==null){
throw this.streamClosed();
}}if(this.count-this.pos>0){
return localBuf[this.pos++]&0xFF;
}return-1;
});
$_M(c$,"read",
function(buffer,offset,length){
var localBuf=this.buf;
if(localBuf==null){
throw this.streamClosed();
}if(buffer==null){
throw new NullPointerException("buffer==null");
}if((offset|length)<0||offset>buffer.length-length){
throw new IndexOutOfBoundsException();
}if(length==0){
return 0;
}var localIn=this.$in;
if(localIn==null){
throw this.streamClosed();
}var required;
if(this.pos<this.count){
var copylength=this.count-this.pos>=length?length:this.count-this.pos;
System.arraycopy(localBuf,this.pos,buffer,offset,copylength);
this.pos+=copylength;
if(copylength==length||localIn.available()==0){
return copylength;
}offset+=copylength;
required=length-copylength;
}else{
required=length;
}while(true){
var read;
if(this.markpos==-1&&required>=localBuf.length){
read=localIn.read(buffer,offset,required);
if(read==-1){
return required==length?-1:length-required;
}}else{
if(this.fillbuf(localIn,localBuf)==-1){
return required==length?-1:length-required;
}if(localBuf!==this.buf){
localBuf=this.buf;
if(localBuf==null){
throw this.streamClosed();
}}read=this.count-this.pos>=required?required:this.count-this.pos;
System.arraycopy(localBuf,this.pos,buffer,offset,read);
this.pos+=read;
}required-=read;
if(required==0){
return length;
}if(localIn.available()==0){
return length-required;
}offset+=read;
}
},"~A,~N,~N");
$_V(c$,"reset",
function(){
if(this.buf==null){
throw new java.io.IOException("Stream is closed");
}if(-1==this.markpos){
throw new java.io.IOException("Mark has been invalidated.");
}this.pos=this.markpos;
});
$_V(c$,"skip",
function(amount){
var localBuf=this.buf;
var localIn=this.$in;
if(localBuf==null){
throw this.streamClosed();
}if(amount<1){
return 0;
}if(localIn==null){
throw this.streamClosed();
}if(this.count-this.pos>=amount){
this.pos+=amount;
return amount;
}var read=this.count-this.pos;
this.pos=this.count;
if(this.markpos!=-1){
if(amount<=this.marklimit){
if(this.fillbuf(localIn,localBuf)==-1){
return read;
}if(this.count-this.pos>=amount-read){
this.pos+=amount-read;
return amount;
}read+=(this.count-this.pos);
this.pos=this.count;
return read;
}}return read+localIn.skip(amount-read);
},"~N");
});
