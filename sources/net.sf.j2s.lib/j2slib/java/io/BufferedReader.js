$_L(["java.io.Reader"],"java.io.BufferedReader",["java.io.IOException","java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","$.StringBuilder"],function(){
c$=$_C(function(){
this.$in=null;
this.buf=null;
this.pos=0;
this.end=0;
this.$mark=-1;
this.markLimit=-1;
$_Z(this,arguments);
},java.io,"BufferedReader",java.io.Reader);
$_K(c$,
function($in){
this.construct($in,8192);
},"java.io.Reader");
$_K(c$,
function($in,size){
$_R(this,java.io.BufferedReader,[$in]);
if(size<=0){
throw new IllegalArgumentException("size<=0");
}this.$in=$in;
this.buf=$_A(size,'\0');
},"java.io.Reader,~N");
$_M(c$,"close",
function(){
{
if(!this.isClosed()){
this.$in.close();
this.buf=null;
}}});
$_M(c$,"fillBuf",
($fz=function(){
if(this.$mark==-1||(this.pos-this.$mark>=this.markLimit)){
var result=this.$in.read(this.buf,0,this.buf.length);
if(result>0){
this.$mark=-1;
this.pos=0;
this.end=result;
}return result;
}if(this.$mark==0&&this.markLimit>this.buf.length){
var newLength=this.buf.length*2;
if(newLength>this.markLimit){
newLength=this.markLimit;
}var newbuf=$_A(newLength,'\0');
System.arraycopy(this.buf,0,newbuf,0,this.buf.length);
this.buf=newbuf;
}else if(this.$mark>0){
System.arraycopy(this.buf,this.$mark,this.buf,0,this.buf.length-this.$mark);
this.pos-=this.$mark;
this.end-=this.$mark;
this.$mark=0;
}var count=this.$in.read(this.buf,this.pos,this.buf.length-this.pos);
if(count!=-1){
this.end+=count;
}return count;
},$fz.isPrivate=true,$fz));
$_M(c$,"isClosed",
($fz=function(){
return this.buf==null;
},$fz.isPrivate=true,$fz));
$_V(c$,"mark",
function(markLimit){
if(markLimit<0){
throw new IllegalArgumentException();
}{
this.checkNotClosed();
this.markLimit=markLimit;
this.$mark=this.pos;
}},"~N");
$_M(c$,"checkNotClosed",
($fz=function(){
if(this.isClosed()){
throw new java.io.IOException("BufferedReader is closed");
}},$fz.isPrivate=true,$fz));
$_V(c$,"markSupported",
function(){
return true;
});
$_M(c$,"read",
function(){
{
this.checkNotClosed();
if(this.pos<this.end||this.fillBuf()!=-1){
return this.buf[this.pos++];
}return-1;
}});
$_M(c$,"read",
function(buffer,offset,length){
{
this.checkNotClosed();
if(offset<0||offset>buffer.length-length||length<0){
throw new IndexOutOfBoundsException();
}var outstanding=length;
while(outstanding>0){
var available=this.end-this.pos;
if(available>0){
var count=available>=outstanding?outstanding:available;
System.arraycopy(this.buf,this.pos,buffer,offset,count);
this.pos+=count;
offset+=count;
outstanding-=count;
}if(outstanding==0||(outstanding<length&&!this.$in.ready())){
break;
}if((this.$mark==-1||(this.pos-this.$mark>=this.markLimit))&&outstanding>=this.buf.length){
var count=this.$in.read(buffer,offset,outstanding);
if(count>0){
offset+=count;
outstanding-=count;
this.$mark=-1;
}break;
}if(this.fillBuf()==-1){
break;
}}
var count=length-outstanding;
return(count>0||count==length)?count:-1;
}},"~A,~N,~N");
$_M(c$,"chompNewline",
function(){
if((this.pos!=this.end||this.fillBuf()!=-1)&&(this.buf[this.pos]).charCodeAt(0)==('\n').charCodeAt(0)){
this.pos++;
}});
$_M(c$,"readLine",
function(){
{
this.checkNotClosed();
if(this.pos==this.end&&this.fillBuf()==-1){
return null;
}for(var charPos=this.pos;charPos<this.end;charPos++){
var ch=this.buf[charPos];
if((ch).charCodeAt(0)>('\r').charCodeAt(0)){
continue;}if((ch).charCodeAt(0)==('\n').charCodeAt(0)){
var res=String.instantialize(this.buf,this.pos,charPos-this.pos);
this.pos=charPos+1;
return res;
}else if((ch).charCodeAt(0)==('\r').charCodeAt(0)){
var res=String.instantialize(this.buf,this.pos,charPos-this.pos);
this.pos=charPos+1;
if(((this.pos<this.end)||(this.fillBuf()!=-1))&&((this.buf[this.pos]).charCodeAt(0)==('\n').charCodeAt(0))){
this.pos++;
}return res;
}}
var eol='\0';
var result=new StringBuilder(80);
result.append(this.buf,this.pos,this.end-this.pos);
while(true){
this.pos=this.end;
if((eol).charCodeAt(0)==('\n').charCodeAt(0)){
return result.toString();
}if(this.fillBuf()==-1){
return result.length()>0||(eol).charCodeAt(0)!=('\0').charCodeAt(0)?result.toString():null;
}for(var charPos=this.pos;charPos<this.end;charPos++){
var c=this.buf[charPos];
if((eol).charCodeAt(0)==('\0').charCodeAt(0)){
if(((c).charCodeAt(0)==('\n').charCodeAt (0) || (c).charCodeAt (0) == ('\r').charCodeAt(0))){
eol=c;
}}else if((eol).charCodeAt(0)==('\r').charCodeAt (0) && (c).charCodeAt (0) == ('\n').charCodeAt(0)){
if(charPos>this.pos){
result.append(this.buf,this.pos,charPos-this.pos-1);
}this.pos=charPos+1;
return result.toString();
}else{
if(charPos>this.pos){
result.append(this.buf,this.pos,charPos-this.pos-1);
}this.pos=charPos;
return result.toString();
}}
if((eol).charCodeAt(0)==('\0').charCodeAt(0)){
result.append(this.buf,this.pos,this.end-this.pos);
}else{
result.append(this.buf,this.pos,this.end-this.pos-1);
}}
}});
$_M(c$,"ready",
function(){
{
this.checkNotClosed();
return((this.end-this.pos)>0)||this.$in.ready();
}});
$_V(c$,"reset",
function(){
{
this.checkNotClosed();
if(this.$mark==-1){
throw new java.io.IOException("Invalid mark");
}this.pos=this.$mark;
}});
$_V(c$,"skip",
function(amount){
if(amount<0){
throw new IllegalArgumentException();
}{
this.checkNotClosed();
if(amount<1){
return 0;
}if(this.end-this.pos>=amount){
this.pos+=amount;
return amount;
}var read=this.end-this.pos;
this.pos=this.end;
while(read<amount){
if(this.fillBuf()==-1){
return read;
}if(this.end-this.pos>=amount-read){
this.pos+=amount-read;
return amount;
}read+=(this.end-this.pos);
this.pos=this.end;
}
return amount;
}},"~N");
});
