$_L(null,"java.lang.Long",["java.lang.Character","$.NumberFormatException"],function(){
c$=$_C(function(){
this.value=0;
$_Z(this,arguments);
},java.lang,"Long");
$_K(c$,
function(value){
this.value=value;
},"~N");
$_K(c$,
function(string){
this.construct(Long.parseLong(string));
},"~S");
$_M(c$,"compareTo",
function(object){
var thisValue=this.value;
var thatValue=object.value;
return thisValue<thatValue?-1:(thisValue==thatValue?0:1);
},"Long");
c$.decode=$_M(c$,"decode",
function(string){
var length=string.length;
var i=0;
if(length==0){
throw new NumberFormatException();
}var firstDigit=string.charAt(i);
var negative=(firstDigit).charCodeAt(0)==('-').charCodeAt(0);
if(negative){
if(length==1){
throw new NumberFormatException(string);
}firstDigit=string.charAt(++i);
}var base=10;
if((firstDigit).charCodeAt(0)==('0').charCodeAt(0)){
if(++i==length){
return Long.$valueOf(0);
}if(((firstDigit=string.charAt(i))).charCodeAt(0)==('x').charCodeAt (0) || (firstDigit).charCodeAt (0) == ('X').charCodeAt(0)){
if(i==length){
throw new NumberFormatException(string);
}i++;
base=16;
}else{
base=8;
}}else if((firstDigit).charCodeAt(0)==('#').charCodeAt(0)){
if(i==length){
throw new NumberFormatException(string);
}i++;
base=16;
}var result=Long.parse(string,i,base,negative);
return Long.$valueOf(result);
},"~S");
$_V(c$,"equals",
function(o){
return $_O(o,Long)&&(o).value==this.value;
},"~O");
c$.parseLong=$_M(c$,"parseLong",
function(string){
return Long.parseLong(string,10);
},"~S");
c$.parseLong=$_M(c$,"parseLong",
function(string,radix){
if(string==null||radix<2||radix>36){
throw new NumberFormatException();
}var length=string.length;
var i=0;
if(length==0){
throw new NumberFormatException(string);
}var negative=(string.charAt(i)).charCodeAt(0)==('-').charCodeAt(0);
if(negative&&++i==length){
throw new NumberFormatException(string);
}return Long.parse(string,i,radix,negative);
},"~S,~N");
c$.parse=$_M(c$,"parse",
($fz=function(string,offset,radix,negative){
var max=Math.floor(-9223372036854775808/radix);
var result=0;
var length=string.length;
while(offset<length){
var digit=Character.digit(string.charAt(offset++),radix);
if(digit==-1){
throw new NumberFormatException(string);
}if(max>result){
throw new NumberFormatException(string);
}var next=result*radix-digit;
if(next>result){
throw new NumberFormatException(string);
}result=next;
}
if(!negative){
result=-result;
if(result<0){
throw new NumberFormatException(string);
}}return result;
},$fz.isPrivate=true,$fz),"~S,~N,~N,~B");
c$.toBinaryString=$_M(c$,"toBinaryString",
function(v){
return null;
},"~N");
c$.toHexString=$_M(c$,"toHexString",
function(v){
return null;
},"~N");
c$.toOctalString=$_M(c$,"toOctalString",
function(v){
return null;
},"~N");
$_M(c$,"toString",
function(){
return Long.toString(this.value);
});
c$.toString=$_M(c$,"toString",
function(n){
return null;
},"~N");
c$.toString=$_M(c$,"toString",
function(v,radix){
return null;
},"~N,~N");
c$.$valueOf=$_M(c$,"$valueOf",
function(string){
return Long.$valueOf(Long.parseLong(string));
},"~S");
c$.$valueOf=$_M(c$,"$valueOf",
function(string,radix){
return Long.$valueOf(Long.parseLong(string,radix));
},"~S,~N");
c$.highestOneBit=$_M(c$,"highestOneBit",
function(v){
v|=(v>>1);
v|=(v>>2);
v|=(v>>4);
v|=(v>>8);
v|=(v>>16);
v|=(v>>32);
return v-(v>>>1);
},"~N");
c$.lowestOneBit=$_M(c$,"lowestOneBit",
function(v){
return v&-v;
},"~N");
c$.numberOfLeadingZeros=$_M(c$,"numberOfLeadingZeros",
function(v){
if(v<0){
return 0;
}if(v==0){
return 64;
}var n=1;
var i=(v>>>32);
if(i==0){
n+=32;
i=v;
}if(i>>>16==0){
n+=16;
i<<=16;
}if(i>>>24==0){
n+=8;
i<<=8;
}if(i>>>28==0){
n+=4;
i<<=4;
}if(i>>>30==0){
n+=2;
i<<=2;
}return n-(i>>>31);
},"~N");
c$.numberOfTrailingZeros=$_M(c$,"numberOfTrailingZeros",
function(v){
var low=v;
return low!=0?Integer.numberOfTrailingZeros(low):32+Integer.numberOfTrailingZeros((v>>>32));
},"~N");
c$.bitCount=$_M(c$,"bitCount",
function(v){
v-=(v>>>1)&0x5555555555555555;
v=(v&0x3333333333333333)+((v>>>2)&0x3333333333333333);
var i=((v>>>32))+v;
i=(i&0x0F0F0F0F)+((i>>>4)&0x0F0F0F0F);
i+=i>>>8;
i+=i>>>16;
return i&0x0000007F;
},"~N");
c$.rotateLeft=$_M(c$,"rotateLeft",
function(v,distance){
return(v<<distance)|(v>>>-distance);
},"~N,~N");
c$.rotateRight=$_M(c$,"rotateRight",
function(v,distance){
return(v>>>distance)|(v<<-distance);
},"~N,~N");
c$.reverseBytes=$_M(c$,"reverseBytes",
function(v){
v=((v>>>8)&0x00FF00FF00FF00FF)|((v&0x00FF00FF00FF00FF)<<8);
v=((v>>>16)&0x0000FFFF0000FFFF)|((v&0x0000FFFF0000FFFF)<<16);
return((v>>>32))|((v)<<32);
},"~N");
c$.reverse=$_M(c$,"reverse",
function(v){
v=((v>>>1)&0x5555555555555555)|((v&0x5555555555555555)<<1);
v=((v>>>2)&0x3333333333333333)|((v&0x3333333333333333)<<2);
v=((v>>>4)&0x0F0F0F0F0F0F0F0F)|((v&0x0F0F0F0F0F0F0F0F)<<4);
v=((v>>>8)&0x00FF00FF00FF00FF)|((v&0x00FF00FF00FF00FF)<<8);
v=((v>>>16)&0x0000FFFF0000FFFF)|((v&0x0000FFFF0000FFFF)<<16);
return((v>>>32))|((v)<<32);
},"~N");
c$.signum=$_M(c$,"signum",
function(v){
return v<0?-1:(v==0?0:1);
},"~N");
c$.$valueOf=$_M(c$,"$valueOf",
function(v){
return v>=128||v<-128?new Long(v):Long.SMALL_VALUES[(v)+128];
},"~N");
$_S(c$,
"MAX_VALUE",0x7FFFFFFFFFFFFFFF,
"MIN_VALUE",0x8000000000000000,
"TYPE",null,
"SIZE",64);
c$.SMALL_VALUES=c$.prototype.SMALL_VALUES=new Array(256);
{
for(var i=-128;i<128;i++){
Long.SMALL_VALUES[i+128]=new Long(i);
}
}});
