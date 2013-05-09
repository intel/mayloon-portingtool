$_L(null,"java.lang.Integer",["java.lang.Character","$.NumberFormatException"],function(){
c$=$_C(function(){
this.value=0;
$_Z(this,arguments);
},java.lang,"Integer");
$_K(c$,
function(value){
this.value=value;
},"~N");
$_K(c$,
function(string){
this.construct(Integer.parseInt(string));
},"~S");
$_M(c$,"compareTo",
function(object){
var thisValue=this.value;
var thatValue=object.value;
return thisValue<thatValue?-1:(thisValue==thatValue?0:1);
},"Integer");
c$.decode=$_M(c$,"decode",
function(string){
var length=string.length;
var i=0;
if(length==0){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}var firstDigit=string.charAt(i);
var negative=(firstDigit).charCodeAt(0)==('-').charCodeAt(0);
if(negative){
if(length==1){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}firstDigit=string.charAt(++i);
}var base=10;
if((firstDigit).charCodeAt(0)==('0').charCodeAt(0)){
if(++i==length){
return Integer.$valueOf(0);
}if(((firstDigit=string.charAt(i))).charCodeAt(0)==('x').charCodeAt (0) || (firstDigit).charCodeAt (0) == ('X').charCodeAt(0)){
if(++i==length){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}base=16;
}else{
base=8;
}}else if((firstDigit).charCodeAt(0)==('#').charCodeAt(0)){
if(++i==length){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}base=16;
}var result=Integer.parse(string,i,base,negative);
return Integer.$valueOf(result);
},"~S");
$_V(c$,"equals",
function(o){
return $_O(o,Integer)&&(o).value==this.value;
},"~O");
c$.parseInt=$_M(c$,"parseInt",
function(string){
return Integer.parseInt(string,10);
},"~S");
c$.parseInt=$_M(c$,"parseInt",
function(string,radix){
if(string==null||radix<2||radix>36){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}var length=string.length;
var i=0;
if(length==0){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}var negative=(string.charAt(i)).charCodeAt(0)==('-').charCodeAt(0);
if(negative&&++i==length){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}return Integer.parse(string,i,radix,negative);
},"~S,~N");
c$.parse=$_M(c$,"parse",
($fz=function(string,offset,radix,negative){
var max=Math.floor(-2147483648/radix);
var result=0;
var length=string.length;
while(offset<length){
var digit=Character.digit(string.charAt(offset++),radix);
if(digit==-1){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}if(max>result){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}var next=result*radix-digit;
if(next>result){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}result=next;
}
if(!negative){
result=-result;
if(result<0){
throw new NumberFormatException("unable to parse'" + string + "'as integer");
}}return result;
},$fz.isPrivate=true,$fz),"~S,~N,~N,~B");
c$.toBinaryString=$_M(c$,"toBinaryString",
function(i){
return"";
},"~N");
c$.toHexString=$_M(c$,"toHexString",
function(i){
return"";
},"~N");
c$.toOctalString=$_M(c$,"toOctalString",
function(i){
return"";
},"~N");
$_M(c$,"toString",
function(){
return Integer.toString(this.value);
});
c$.toString=$_M(c$,"toString",
function(i){
return"";
},"~N");
c$.toString=$_M(c$,"toString",
function(i,radix){
return"";
},"~N,~N");
c$.$valueOf=$_M(c$,"$valueOf",
function(string){
return Integer.$valueOf(Integer.parseInt(string));
},"~S");
c$.$valueOf=$_M(c$,"$valueOf",
function(string,radix){
return Integer.$valueOf(Integer.parseInt(string,radix));
},"~S,~N");
c$.highestOneBit=$_M(c$,"highestOneBit",
function(i){
i|=(i>>1);
i|=(i>>2);
i|=(i>>4);
i|=(i>>8);
i|=(i>>16);
return i-(i>>>1);
},"~N");
c$.lowestOneBit=$_M(c$,"lowestOneBit",
function(i){
return i&-i;
},"~N");
c$.numberOfLeadingZeros=$_M(c$,"numberOfLeadingZeros",
function(i){
if(i<=0){
return(~i>>26)&32;
}var n=1;
if(i>>16==0){
n+=16;
i<<=16;
}if(i>>24==0){
n+=8;
i<<=8;
}if(i>>28==0){
n+=4;
i<<=4;
}if(i>>30==0){
n+=2;
i<<=2;
}return n-(i>>>31);
},"~N");
c$.numberOfTrailingZeros=$_M(c$,"numberOfTrailingZeros",
function(i){
i&=-i;
i=(i<<4)+i;
i=(i<<6)+i;
i=(i<<16)-i;
return Integer.NTZ_TABLE[i>>>26];
},"~N");
c$.bitCount=$_M(c$,"bitCount",
function(i){
i-=(i>>1)&0x55555555;
i=(i&0x33333333)+((i>>2)&0x33333333);
i=((i>>4)+i)&0x0F0F0F0F;
i+=i>>8;
i+=i>>16;
return i&0x0000003F;
},"~N");
c$.rotateLeft=$_M(c$,"rotateLeft",
function(i,distance){
return(i<<distance)|(i>>>-distance);
},"~N,~N");
c$.rotateRight=$_M(c$,"rotateRight",
function(i,distance){
return(i>>>distance)|(i<<-distance);
},"~N,~N");
c$.reverseBytes=$_M(c$,"reverseBytes",
function(i){
i=((i>>>8)&0x00FF00FF)|((i&0x00FF00FF)<<8);
return(i>>>16)|(i<<16);
},"~N");
c$.reverse=$_M(c$,"reverse",
function(i){
i=((i>>>1)&0x55555555)|((i&0x55555555)<<1);
i=((i>>>2)&0x33333333)|((i&0x33333333)<<2);
i=((i>>>4)&0x0F0F0F0F)|((i&0x0F0F0F0F)<<4);
i=((i>>>8)&0x00FF00FF)|((i&0x00FF00FF)<<8);
return((i>>>16))|((i)<<16);
},"~N");
c$.signum=$_M(c$,"signum",
function(i){
return(i>>31)|(-i>>>31);
},"~N");
c$.$valueOf=$_M(c$,"$valueOf",
function(i){
return i>=128||i<-128?new Integer(i):Integer.SMALL_VALUES[i+128];
},"~N");
$_S(c$,
"MAX_VALUE",0x7FFFFFFF,
"MIN_VALUE",0x80000000,
"SIZE",32,
"NTZ_TABLE",[32,0,1,12,2,6,-1,13,3,-1,7,-1,-1,-1,-1,14,10,4,-1,-1,8,-1,-1,25,-1,-1,-1,-1,-1,21,27,15,31,11,5,-1,-1,-1,-1,-1,9,-1,-1,24,-1,-1,20,26,30,-1,-1,-1,-1,23,-1,19,29,-1,22,18,28,17,16,-1],
"TYPE",null);
c$.SMALL_VALUES=c$.prototype.SMALL_VALUES=new Array(256);
{
for(var i=-128;i<128;i++){
Integer.SMALL_VALUES[i+128]=new Integer(i);
}
}});
