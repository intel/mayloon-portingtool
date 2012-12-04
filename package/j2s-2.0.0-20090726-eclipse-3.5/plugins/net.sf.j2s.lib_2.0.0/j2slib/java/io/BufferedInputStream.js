$_L(["java.io.FilterInputStream"],"java.io.BufferedInputStream",["java.io.IOException","java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","org.apache.harmony.luni.util.Msg"],function(){
c$=$_C(function(){
this.buf=null;
this.count=0;
this.marklimit=0;
this.markpos=-1;
this.pos=0;
this.closed=false;
$_Z(this,arguments);
},java.io,"BufferedInputStream",java.io.FilterInputStream);
$_K(c$,
function($in){
$_R(this,java.io.BufferedInputStream,[$in]);
this.buf=($in==null)?null:$_A(8192,0);
},"java.io.InputStream");
$_K(c$,
function($in,size){
$_R(this,java.io.BufferedInputStream,[$in]);
if(size<=0){
throw new IllegalArgumentException(org.apache.harmony.luni.util.Msg.getString("K0058"));
}this.buf=($in==null)?null:$_A(size,0);
},"java.io.InputStream,~N");
$_V(c$,"available",
function(){
if(this.buf==null){
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K0059"));
}return this.count-this.pos+this.$in.available();
});
$_M(c$,"close",
function(){
if(null!=this.$in){
$_U(this,java.io.BufferedInputStream,"close",[]);
this.$in=null;
}this.buf=null;
this.closed=true;
});
$_M(c$,"fillbuf",
($fz=function(){
if(this.markpos==-1||(this.pos-this.markpos>=this.marklimit)){
var result=this.$in.read(this.buf);
if(result>0){
this.markpos=-1;
this.pos=0;
this.count=result==-1?0:result;
}return result;
}if(this.markpos==0&&this.marklimit>this.buf.length){
var newLength=this.buf.length*2;
if(newLength>this.marklimit){
newLength=this.marklimit;
}var newbuf=$_A(newLength,0);
System.arraycopy(this.buf,0,newbuf,0,this.buf.length);
this.buf=newbuf;
}else if(this.markpos>0){
System.arraycopy(this.buf,this.markpos,this.buf,0,this.buf.length-this.markpos);
}this.pos-=this.markpos;
this.count=this.markpos=0;
var bytesread=this.$in.read(this.buf,this.pos,this.buf.length-this.pos);
this.count=bytesread<=0?this.pos:this.pos+bytesread;
return bytesread;
},$fz.isPrivate=true,$fz));
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
if(this.buf==null){
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K0059"));
}if(this.pos>=this.count&&this.fillbuf()==-1){
return-1;
}if(this.count-this.pos>0){
return this.buf[this.pos++]&0xFF;
}return-1;
});
$_M(c$,"read",
function(buffer,offset,length){
if(this.closed){
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K0059"));
}if(offset>buffer.length-length||offset<0||length<0){
throw new IndexOutOfBoundsException();
}if(length==0){
return 0;
}if(null==this.buf){
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K0059"));
}var required;
if(this.pos<this.count){
var copylength=this.count-this.pos>=length?length:this.count-this.pos;
System.arraycopy(this.buf,this.pos,buffer,offset,copylength);
this.pos+=copylength;
if(copylength==length||this.$in.available()==0){
return copylength;
}offset+=copylength;
required=length-copylength;
}else{
required=length;
}while(true){
var read;
if(this.markpos==-1&&required>=this.buf.length){
read=this.$in.read(buffer,offset,required);
if(read==-1){
return required==length?-1:length-required;
}}else{
if(this.fillbuf()==-1){
return required==length?-1:length-required;
}read=this.count-this.pos>=required?required:this.count-this.pos;
System.arraycopy(this.buf,this.pos,buffer,offset,read);
this.pos+=read;
}required-=read;
if(required==0){
return length;
}if(this.$in.available()==0){
return length-required;
}offset+=read;
}
},"~A,~N,~N");
$_V(c$,"reset",
function(){
if(this.closed){
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K0059"));
}if(-1==this.markpos){
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K005a"));
}this.pos=this.markpos;
});
$_V(c$,"skip",
function(amount){
if(null==this.$in){
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K0059"));
}if(amount<1){
return 0;
}if(this.count-this.pos>=amount){
this.pos+=amount;
return amount;
}var read=this.count-this.pos;
this.pos=this.count;
if(this.markpos!=-1){
if(amount<=this.marklimit){
if(this.fillbuf()==-1){
return read;
}if(this.count-this.pos>=amount-read){
this.pos+=amount-read;
return amount;
}read+=(this.count-this.pos);
this.pos=this.count;
return read;
}this.markpos=-1;
}return read+this.$in.skip(amount-read);
},"~N");
});
