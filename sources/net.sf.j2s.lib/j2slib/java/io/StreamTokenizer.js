$_L(null,"java.io.StreamTokenizer",["java.lang.Double","$.NullPointerException","$.StringBuilder"],function(){
c$=$_C(function(){
this.nval=0;
this.sval=null;
this.ttype=-4;
this.tokenTypes=null;
this.lineNumber=1;
this.forceLowercase=false;
this.isEOLSignificant=false;
this.$slashStarComments=false;
this.$slashSlashComments=false;
this.pushBackToken=false;
this.lastCr=false;
this.inStream=null;
this.inReader=null;
this.peekChar=-2;
$_Z(this,arguments);
},java.io,"StreamTokenizer");
$_Y(c$,function(){
this.tokenTypes=$_A(256,0);
});
$_K(c$,
($fz=function(){
this.wordChars('A'.charCodeAt (0), 'Z'.charCodeAt(0));
this.wordChars('a'.charCodeAt (0), 'z'.charCodeAt(0));
this.wordChars(160,255);
this.whitespaceChars(0,32);
this.commentChar('/'.charCodeAt(0));
this.quoteChar('"'.charCodeAt(0));
this.quoteChar('\''.charCodeAt(0));
this.parseNumbers();
},$fz.isPrivate=true,$fz));
$_K(c$,
function(is){
this.construct();
if(is==null){
throw new NullPointerException();
}this.inStream=is;
},"java.io.InputStream");
$_K(c$,
function(r){
this.construct();
if(r==null){
throw new NullPointerException();
}this.inReader=r;
},"java.io.Reader");
$_M(c$,"commentChar",
function(ch){
if(0<=ch&&ch<this.tokenTypes.length){
this.tokenTypes[ch]=1;
}},"~N");
$_M(c$,"eolIsSignificant",
function(flag){
this.isEOLSignificant=flag;
},"~B");
$_M(c$,"lineno",
function(){
return this.lineNumber;
});
$_M(c$,"lowerCaseMode",
function(flag){
this.forceLowercase=flag;
},"~B");
$_M(c$,"nextToken",
function(){
if(this.pushBackToken){
this.pushBackToken=false;
if(this.ttype!=-4){
return this.ttype;
}}this.sval=null;
var currentChar=this.peekChar==-2?this.read():this.peekChar;
if(this.lastCr&&currentChar==('\n').charCodeAt(0)){
this.lastCr=false;
currentChar=this.read();
}if(currentChar==-1){
return(this.ttype=-1);
}var currentType=currentChar>255?8:this.tokenTypes[currentChar];
while((currentType&4)!=0){
if(currentChar==('\r').charCodeAt(0)){
this.lineNumber++;
if(this.isEOLSignificant){
this.lastCr=true;
this.peekChar=-2;
return(this.ttype=10);
}if((currentChar=this.read())==('\n').charCodeAt(0)){
currentChar=this.read();
}}else if(currentChar==('\n').charCodeAt(0)){
this.lineNumber++;
if(this.isEOLSignificant){
this.peekChar=-2;
return(this.ttype=10);
}currentChar=this.read();
}else{
currentChar=this.read();
}if(currentChar==-1){
return(this.ttype=-1);
}currentType=currentChar>255?8:this.tokenTypes[currentChar];
}
if((currentType&16)!=0){
var digits=new StringBuilder(20);
var haveDecimal=false;
var checkJustNegative=currentChar==('-').charCodeAt(0);
while(true){
if(currentChar==('.').charCodeAt(0)){
haveDecimal=true;
}digits.append(String.fromCharCode(currentChar));
currentChar=this.read();
if((currentChar<('0').charCodeAt (0) || currentChar > ('9').charCodeAt (0)) && (haveDecimal || currentChar != ('.').charCodeAt(0))){
break;
}}
this.peekChar=currentChar;
if(checkJustNegative&&digits.length()==1){
return(this.ttype=('-').charCodeAt(0));
}try{
this.nval=Double.$valueOf(digits.toString()).doubleValue();
}catch(e){
if($_O(e,NumberFormatException)){
this.nval=0;
}else{
throw e;
}
}
return(this.ttype=-2);
}if((currentType&8)!=0){
var word=new StringBuilder(20);
while(true){
word.append(String.fromCharCode(currentChar));
currentChar=this.read();
if(currentChar==-1||(currentChar<256&&(this.tokenTypes[currentChar]&(24))==0)){
break;
}}
this.peekChar=currentChar;
this.sval=this.forceLowercase?word.toString().toLowerCase():word.toString();
return(this.ttype=-3);
}if(currentType==2){
var matchQuote=currentChar;
var quoteString=new StringBuilder();
var peekOne=this.read();
while(peekOne>=0&&peekOne!=matchQuote&&peekOne!=('\r').charCodeAt (0) && peekOne != ('\n').charCodeAt(0)){
var readPeek=true;
if(peekOne==('\\').charCodeAt(0)){
var c1=this.read();
if(c1<=('7').charCodeAt (0) && c1 >= ('0').charCodeAt(0)){
var digitValue=c1-('0').charCodeAt(0);
c1=this.read();
if(c1>('7').charCodeAt (0) || c1 < ('0').charCodeAt(0)){
readPeek=false;
}else{
digitValue=digitValue*8+(c1-('0').charCodeAt(0));
c1=this.read();
if(digitValue>037||c1>('7').charCodeAt (0) || c1 < ('0').charCodeAt(0)){
readPeek=false;
}else{
digitValue=digitValue*8+(c1-('0').charCodeAt(0));
}}if(!readPeek){
quoteString.append(String.fromCharCode(digitValue));
peekOne=c1;
}else{
peekOne=digitValue;
}}else{
switch(c1){
case'a':
peekOne=0x7;
break;
case'b':
peekOne=0x8;
break;
case'f':
peekOne=0xc;
break;
case'n':
peekOne=0xA;
break;
case'r':
peekOne=0xD;
break;
case't':
peekOne=0x9;
break;
case'v':
peekOne=0xB;
break;
default:
peekOne=c1;
}
}}if(readPeek){
quoteString.append(String.fromCharCode(peekOne));
peekOne=this.read();
}}
if(peekOne==matchQuote){
peekOne=this.read();
}this.peekChar=peekOne;
this.ttype=matchQuote;
this.sval=quoteString.toString();
return this.ttype;
}if(currentChar==('/').charCodeAt(0)&&(this.$slashSlashComments||this.$slashStarComments)){
if((currentChar=this.read())==('*').charCodeAt(0)&&this.$slashStarComments){
var peekOne=this.read();
while(true){
currentChar=peekOne;
peekOne=this.read();
if(currentChar==-1){
this.peekChar=-1;
return(this.ttype=-1);
}if(currentChar==('\r').charCodeAt(0)){
if(peekOne==('\n').charCodeAt(0)){
peekOne=this.read();
}this.lineNumber++;
}else if(currentChar==('\n').charCodeAt(0)){
this.lineNumber++;
}else if(currentChar==('*').charCodeAt (0) && peekOne == ('/').charCodeAt(0)){
this.peekChar=this.read();
return this.nextToken();
}}
}else if(currentChar==('/').charCodeAt(0)&&this.$slashSlashComments){
while((currentChar=this.read())>=0&&currentChar!=('\r').charCodeAt (0) && currentChar != ('\n').charCodeAt(0)){
}
this.peekChar=currentChar;
return this.nextToken();
}else if(currentType!=1){
this.peekChar=currentChar;
return(this.ttype=('/').charCodeAt(0));
}}if(currentType==1){
while((currentChar=this.read())>=0&&currentChar!=('\r').charCodeAt (0) && currentChar != ('\n').charCodeAt(0)){
}
this.peekChar=currentChar;
return this.nextToken();
}this.peekChar=this.read();
return(this.ttype=currentChar);
});
$_M(c$,"ordinaryChar",
function(ch){
if(0<=ch&&ch<this.tokenTypes.length){
this.tokenTypes[ch]=0;
}},"~N");
$_M(c$,"ordinaryChars",
function(low,hi){
if(low<0){
low=0;
}if(hi>this.tokenTypes.length){
hi=this.tokenTypes.length-1;
}for(var i=low;i<=hi;i++){
this.tokenTypes[i]=0;
}
},"~N,~N");
$_M(c$,"parseNumbers",
function(){
for(var i=('0').charCodeAt (0); i <= ('9').charCodeAt(0);i++){
this.tokenTypes[i]|=16;
}
this.tokenTypes['.'.charCodeAt(0)]|=16;
this.tokenTypes['-'.charCodeAt(0)]|=16;
});
$_M(c$,"pushBack",
function(){
this.pushBackToken=true;
});
$_M(c$,"quoteChar",
function(ch){
if(0<=ch&&ch<this.tokenTypes.length){
this.tokenTypes[ch]=2;
}},"~N");
$_M(c$,"read",
($fz=function(){
if(this.inStream==null){
return this.inReader.read();
}return this.inStream.read();
},$fz.isPrivate=true,$fz));
$_M(c$,"resetSyntax",
function(){
for(var i=0;i<256;i++){
this.tokenTypes[i]=0;
}
});
$_M(c$,"slashSlashComments",
function(flag){
this.$slashSlashComments=flag;
},"~B");
$_M(c$,"slashStarComments",
function(flag){
this.$slashStarComments=flag;
},"~B");
$_V(c$,"toString",
function(){
var result=new StringBuilder();
result.append("Token[");
switch(this.ttype){
case-1:
result.append("EOF");
break;
case 10:
result.append("EOL");
break;
case-2:
result.append("n=");
result.append(this.nval);
break;
case-3:
result.append(this.sval);
break;
default:
if(this.ttype==-4||this.tokenTypes[this.ttype]==2){
result.append(this.sval);
}else{
result.append('\'');
result.append(String.fromCharCode(this.ttype));
result.append('\'');
}}
result.append("],line");
result.append(this.lineNumber);
return result.toString();
});
$_M(c$,"whitespaceChars",
function(low,hi){
if(low<0){
low=0;
}if(hi>this.tokenTypes.length){
hi=this.tokenTypes.length-1;
}for(var i=low;i<=hi;i++){
this.tokenTypes[i]=4;
}
},"~N,~N");
$_M(c$,"wordChars",
function(low,hi){
if(low<0){
low=0;
}if(hi>this.tokenTypes.length){
hi=this.tokenTypes.length-1;
}for(var i=low;i<=hi;i++){
this.tokenTypes[i]|=8;
}
},"~N,~N");
$_S(c$,
"TT_EOF",-1,
"TT_EOL",'\n',
"TT_NUMBER",-2,
"TT_WORD",-3,
"TT_UNKNOWN",-4,
"TOKEN_COMMENT",1,
"TOKEN_QUOTE",2,
"TOKEN_WHITE",4,
"TOKEN_WORD",8,
"TOKEN_DIGIT",16);
});
