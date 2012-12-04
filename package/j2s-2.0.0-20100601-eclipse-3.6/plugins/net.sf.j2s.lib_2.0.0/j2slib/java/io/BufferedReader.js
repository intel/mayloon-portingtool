$_L(["java.io.Reader"],"java.io.BufferedReader",["java.io.IOException","java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","$.StringBuilder","org.apache.harmony.luni.util.Msg"],function(){
c$=$_C(function(){
this.$in=null;
this.buf=null;
this.marklimit=-1;
this.count=0;
this.markpos=-1;
this.pos=0;
$_Z(this,arguments);
},java.io,"BufferedReader",java.io.Reader);
$_K(c$,
function($in){
$_R(this,java.io.BufferedReader,[$in]);
this.$in=$in;
this.buf=$_A(8192,'\0');
},"java.io.Reader");
$_K(c$,
function($in,size){
$_R(this,java.io.BufferedReader,[$in]);
if(size>0){
this.$in=$in;
this.buf=$_A(size,'\0');
}else{
throw new IllegalArgumentException(org.apache.harmony.luni.util.Msg.getString("K0058"));
}},"java.io.Reader,~N");
$_M(c$,"close",
function(){
{
if(this.isOpen()){
this.$in.close();
this.buf=null;
}}});
$_M(c$,"fillbuf",
($fz=function(){
if(this.markpos==-1||(this.pos-this.markpos>=this.marklimit)){
var result=this.$in.read(this.buf,0,this.buf.length);
if(result>0){
this.markpos=-1;
this.pos=0;
this.count=result==-1?0:result;
}return result;
}if(this.markpos==0&&this.marklimit>this.buf.length){
var newLength=this.buf.length*2;
if(newLength>this.marklimit){
newLength=this.marklimit;
}var newbuf=$_A(newLength,'\0');
System.arraycopy(this.buf,0,newbuf,0,this.buf.length);
this.buf=newbuf;
}else if(this.markpos>0){
System.arraycopy(this.buf,this.markpos,this.buf,0,this.buf.length-this.markpos);
}this.pos-=this.markpos;
this.count=this.markpos=0;
var charsread=this.$in.read(this.buf,this.pos,this.buf.length-this.pos);
this.count=charsread==-1?this.pos:this.pos+charsread;
return charsread;
},$fz.isPrivate=true,$fz));
$_M(c$,"isOpen",
($fz=function(){
return this.buf!=null;
},$fz.isPrivate=true,$fz));
$_V(c$,"mark",
function(readlimit){
if(readlimit>=0){
{
if(this.isOpen()){
this.marklimit=readlimit;
this.markpos=this.pos;
}else{
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K005b"));
}}}else{
throw new IllegalArgumentException();
}},"~N");
$_V(c$,"markSupported",
function(){
return true;
});
$_M(c$,"read",
function(){
{
if(this.isOpen()){
if(this.pos<this.count||this.fillbuf()!=-1){
return this.buf[this.pos++];
}return-1;
}throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K005b"));
}});
$_M(c$,"read",
function(buffer,offset,length){
{
if(!this.isOpen()){
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K005b"));
}if(offset<0||offset>buffer.length-length||length<0){
throw new IndexOutOfBoundsException();
}if(length==0){
return 0;
}var required;
if(this.pos<this.count){
var copylength=this.count-this.pos>=length?length:this.count-this.pos;
System.arraycopy(this.buf,this.pos,buffer,offset,copylength);
this.pos+=copylength;
if(copylength==length||!this.$in.ready()){
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
}if(!this.$in.ready()){
return length-required;
}offset+=read;
}
}},"~A,~N,~N");
$_M(c$,"readLine",
function(){
{
if(this.isOpen()){
if((this.pos>=this.count)&&(this.fillbuf()==-1)){
return null;
}for(var charPos=this.pos;charPos<this.count;charPos++){
var ch=this.buf[charPos];
if((ch).charCodeAt(0)>('\r').charCodeAt (0)) continue ;if ((ch).charCodeAt (0) == ('\n').charCodeAt(0)){
var res=String.instantialize(this.buf,this.pos,charPos-this.pos);
this.pos=charPos+1;
return res;
}else if((ch).charCodeAt(0)==('\r').charCodeAt(0)){
var res=String.instantialize(this.buf,this.pos,charPos-this.pos);
this.pos=charPos+1;
if(((this.pos<this.count)||(this.fillbuf()!=-1))&&((this.buf[this.pos]).charCodeAt(0)==('\n').charCodeAt(0))){
this.pos++;
}return res;
}}
var eol='\0';
var result=new StringBuilder(80);
result.append(this.buf,this.pos,this.count-this.pos);
this.pos=this.count;
while(true){
if(this.pos>=this.count){
if((eol).charCodeAt(0)==('\n').charCodeAt(0)){
return result.toString();
}if(this.fillbuf()==-1){
return result.length()>0||(eol).charCodeAt(0)!=('\0').charCodeAt(0)?result.toString():null;
}}for(var charPos=this.pos;charPos<this.count;charPos++){
if((eol).charCodeAt(0)==('\0').charCodeAt(0)){
if(((this.buf[charPos]).charCodeAt(0)==('\n').charCodeAt (0) || (this.buf[charPos]).charCodeAt (0) == ('\r').charCodeAt(0))){
eol=this.buf[charPos];
}}else if((eol).charCodeAt(0)==('\r').charCodeAt (0) && ((this.buf[charPos]).charCodeAt (0) == ('\n').charCodeAt(0))){
if(charPos>this.pos){
result.append(this.buf,this.pos,charPos-this.pos-1);
}this.pos=charPos+1;
return result.toString();
}else if((eol).charCodeAt(0)!=('\0').charCodeAt(0)){
if(charPos>this.pos){
result.append(this.buf,this.pos,charPos-this.pos-1);
}this.pos=charPos;
return result.toString();
}}
if((eol).charCodeAt(0)==('\0').charCodeAt(0)){
result.append(this.buf,this.pos,this.count-this.pos);
}else{
result.append(this.buf,this.pos,this.count-this.pos-1);
}this.pos=this.count;
}
}throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K005b"));
}});
$_M(c$,"ready",
function(){
{
if(this.isOpen()){
return((this.count-this.pos)>0)||this.$in.ready();
}throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K005b"));
}});
$_V(c$,"reset",
function(){
{
if(this.isOpen()){
if(this.markpos!=-1){
this.pos=this.markpos;
}else{
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K005c"));
}}else{
throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K005b"));
}}});
$_V(c$,"skip",
function(amount){
if(amount>=0){
{
if(this.isOpen()){
if(amount<1){
return 0;
}if(this.count-this.pos>=amount){
this.pos+=amount;
return amount;
}var read=this.count-this.pos;
this.pos=this.count;
while(read<amount){
if(this.fillbuf()==-1){
return read;
}if(this.count-this.pos>=amount-read){
this.pos+=amount-read;
return amount;
}read+=(this.count-this.pos);
this.pos=this.count;
}
return amount;
}throw new java.io.IOException(org.apache.harmony.luni.util.Msg.getString("K005b"));
}}throw new IllegalArgumentException();
},"~N");
});
