$_L(["java.io.BufferedReader"],"java.io.LineNumberReader",["java.lang.IllegalArgumentException"],function(){
c$=$_C(function(){
this.lineNumber=0;
this.markedLineNumber=-1;
this.lastWasCR=false;
this.markedLastWasCR=false;
$_Z(this,arguments);
},java.io,"LineNumberReader",java.io.BufferedReader);
$_M(c$,"getLineNumber",
function(){
{
return this.lineNumber;
}});
$_M(c$,"mark",
function(readlimit){
{
$_U(this,java.io.LineNumberReader,"mark",[readlimit]);
this.markedLineNumber=this.lineNumber;
this.markedLastWasCR=this.lastWasCR;
}},"~N");
$_M(c$,"read",
function(){
{
var ch=$_U(this,java.io.LineNumberReader,"read",[]);
if(ch==('\n').charCodeAt(0)&&this.lastWasCR){
ch=$_U(this,java.io.LineNumberReader,"read",[]);
}this.lastWasCR=false;
switch(ch){
case'\r':
ch=('\n').charCodeAt(0);
this.lastWasCR=true;
case'\n':
this.lineNumber++;
}
return ch;
}});
$_M(c$,"read",
function(buffer,offset,count){
{
var read=$_U(this,java.io.LineNumberReader,"read",[buffer,offset,count]);
if(read==-1){
return-1;
}for(var i=0;i<read;i++){
var ch=buffer[offset+i];
if((ch).charCodeAt(0)==('\r').charCodeAt(0)){
this.lineNumber++;
this.lastWasCR=true;
}else if((ch).charCodeAt(0)==('\n').charCodeAt(0)){
if(!this.lastWasCR){
this.lineNumber++;
}this.lastWasCR=false;
}else{
this.lastWasCR=false;
}}
return read;
}},"~A,~N,~N");
$_M(c$,"readLine",
function(){
{
if(this.lastWasCR){
this.chompNewline();
this.lastWasCR=false;
}var result=$_U(this,java.io.LineNumberReader,"readLine",[]);
if(result!=null){
this.lineNumber++;
}return result;
}});
$_M(c$,"reset",
function(){
{
$_U(this,java.io.LineNumberReader,"reset",[]);
this.lineNumber=this.markedLineNumber;
this.lastWasCR=this.markedLastWasCR;
}});
$_M(c$,"setLineNumber",
function(lineNumber){
{
this.lineNumber=lineNumber;
}},"~N");
$_V(c$,"skip",
function(count){
if(count<0){
throw new IllegalArgumentException();
}{
for(var i=0;i<count;i++){
if(this.read()==-1){
return i;
}}
return count;
}},"~N");
});
