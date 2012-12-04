
java.lang.Number=Number;

Number.__CLASS_NAME__="Number";
Clazz.implementOf(Number,java.io.Serializable);
Number.equals=Clazz.innerFunctions.equals;
Number.getName=Clazz.innerFunctions.getName;

Number.serialVersionUID=Number.prototype.serialVersionUID=-8742448824652078965;

Clazz.defineMethod(Number,"shortValue",
function(){
return Math.round(this)&0xffff;
});

Clazz.defineMethod(Number,"byteValue",
function(){
return Math.round(this)&0xff;
});

Clazz.defineMethod(Number,"intValue",
function(){
return Math.round(this)&0xffffffff;
});

Clazz.defineMethod(Number,"longValue",
function(){
return Math.round(this);
});

Clazz.defineMethod(Number,"floatValue",
function(){
return this.valueOf();
});

Clazz.defineMethod(Number,"doubleValue",
function(){
return this.valueOf();
});

Clazz.defineMethod(Number,"hashCode",
function(){
return this.valueOf();
});

java.lang.Integer=Integer=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Integer,"Integer",Number,Comparable,null,true);
Integer.prototype.valueOf=function(){return 0;};
Integer.toString=Integer.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Integer){
return"class java.lang.Integer";
}
return""+this.valueOf();
};
Clazz.makeConstructor(Integer,
function(){
this.valueOf=function(){
return 0;
};
});
Clazz.makeConstructor(Integer,
function(value){
var v=Math.round(value)&0xffffffff;
this.valueOf=function(){
return v;
};
},"Number");
Clazz.makeConstructor(Integer,
function(s){
var value=Integer.parseInt(s,10);
this.valueOf=function(){
return value;
};
},"String");
Integer.serialVersionUID=Integer.prototype.serialVersionUID=1360826667806852920;
Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;
Integer.TYPE=Integer.prototype.TYPE=Integer;

Clazz.defineMethod(Integer,"parseInt",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
var integer=parseInt(s,radix);
if(isNaN(integer)){
throw new NumberFormatException("Not a Number : "+s);
}
return integer;
},"String, Number");
Integer.parseInt=Integer.prototype.parseInt;
Clazz.defineMethod(Integer,"parseInt",
function(s){
return Integer.parseInt(s,10);
},"String");

Integer.parseInt=Integer.prototype.parseInt;

Clazz.defineMethod(Integer,"$valueOf",
function(s){
return new Integer(Integer.parseInt(s,10));
},"String");

Clazz.defineMethod(Integer,"$valueOf",
function(s){
return new Integer(s);
},"Number");

Clazz.defineMethod(Integer,"$valueOf",
function(s,r){
return new Integer(Integer.parseInt(s,r));
},"String, Number");

Integer.$valueOf=Integer.prototype.$valueOf;
Clazz.defineMethod(Integer,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Integer)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Integer.toHexString=Integer.prototype.toHexString=function(i){
return i.toString(16);
};
Integer.toOctalString=Integer.prototype.toOctalString=function(i){
return i.toString(8);
};
Integer.toBinaryString=Integer.prototype.toBinaryString=function(i){
return i.toString(2);
};
Integer.decode=Clazz.defineMethod(Integer,"decode",
function(nm){
var radix=10;
var index=0;
var negative=false;
var result;
if(nm.startsWith("-")){
negative=true;
index++;
}if(nm.startsWith("0x",index)||nm.startsWith("0X",index)){
index+=2;
radix=16;
}else if(nm.startsWith("#",index)){
index++;
radix=16;
}else if(nm.startsWith("0",index)&&nm.length>1+index){
index++;
radix=8;
}if(nm.startsWith("-",index))throw new NumberFormatException("Negative sign in wrong position");
try{
result=Integer.$valueOf(nm.substring(index),radix);
result=negative?new Integer(-result.intValue()):result;
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
var constant=negative?String.instantialize("-"+nm.substring(index)):nm.substring(index);
result=Integer.$valueOf(constant,radix);
}else{
throw e;
}
}
return result;
},"~S");

java.lang.Long=Long=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Long,"Long",Number,Comparable,null,true);
Long.prototype.valueOf=function(){return 0;};
Long.toString=Long.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Long){
return"class java.lang.Long";
}
return""+this.valueOf();
};
Clazz.makeConstructor(Long,
function(){
this.valueOf=function(){
return 0;
};
});
Clazz.makeConstructor(Long,
function(value){
var v=Math.round(value);
this.valueOf=function(){
return v;
};
},"Number");
Clazz.makeConstructor(Long,
function(s){
var value=Long.parseLong(s,10);
this.valueOf=function(){
return value;
};
},"String");
Long.serialVersionUID=Long.prototype.serialVersionUID=4290774380558885855;
Long.MIN_VALUE=Long.prototype.MIN_VALUE=-0x8000000000000000;
Long.MAX_VALUE=Long.prototype.MAX_VALUE=0x7fffffffffffffff;
Long.TYPE=Long.prototype.TYPE=Long;

Clazz.defineMethod(Long,"parseLong",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
var longVal=parseInt(s,radix);
if(isNaN(longVal)){
throw new NumberFormatException("Not a Number : "+s);
}
return longVal;
},"String, Number");

Clazz.defineMethod(Long,"parseLong",
function(s){
return Long.parseLong(s,10);
},"String");

Long.parseLong=Long.prototype.parseLong;

Clazz.defineMethod(Long,"$valueOf",
function(s){
return new Long(Long.parseLong(s,10));
},"String");

Clazz.defineMethod(Long,"$valueOf",
function(s){
return new Long(s);
},"Number");

Clazz.defineMethod(Long,"$valueOf",
function(s,r){
return new Long(Long.parseLong(s,r));
},"String, Number");

Long.$valueOf=Long.prototype.$valueOf;
Clazz.defineMethod(Long,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Long)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Long.toHexString=Long.prototype.toHexString=function(i){
return i.toString(16);
};
Long.toOctalString=Long.prototype.toOctalString=function(i){
return i.toString(8);
};
Long.toBinaryString=Long.prototype.toBinaryString=function(i){
return i.toString(2);
};
Long.decode=Clazz.defineMethod(Long,"decode",
function(nm){
var radix=10;
var index=0;
var negative=false;
var result;
if(nm.startsWith("-")){
negative=true;
index++;
}if(nm.startsWith("0x",index)||nm.startsWith("0X",index)){
index+=2;
radix=16;
}else if(nm.startsWith("#",index)){
index++;
radix=16;
}else if(nm.startsWith("0",index)&&nm.length>1+index){
index++;
radix=8;
}if(nm.startsWith("-",index))throw new NumberFormatException("Negative sign in wrong position");
try{
result=Long.$valueOf(nm.substring(index),radix);
result=negative?new Long(-result.longValue()):result;
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
var constant=negative?String.instantialize("-"+nm.substring(index)):nm.substring(index);
result=Long.$valueOf(constant,radix);
}else{
throw e;
}
}
return result;
},"~S");

java.lang.Float=Float=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Float,"Float",Number,Comparable,null,true);
Float.prototype.valueOf=function(){return 0;};
Float.toString=Float.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Float){
return"class java.lang.Float";
}
return""+this.valueOf();
};
Clazz.makeConstructor(Float,
function(){
this.valueOf=function(){
return 0.0;
};
});
Clazz.makeConstructor(Float,
function(value){
this.valueOf=function(){
return value;
};
},"Number");
Clazz.makeConstructor(Float,
function(s){
var value=null;
if(s!=null){
value=Float.parseFloat(s);
}else{
value=0;
}
this.valueOf=function(){
return value;
};
},"String");
Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=3.4028235e+38;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=1.4e-45;
Float.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;
Float.TYPE=Float.prototype.TYPE=Float;

Clazz.defineMethod(Float,"parseFloat",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
var floatVal=parseFloat(s);
if(isNaN(floatVal)){
throw new NumberFormatException("Not a Number : "+s);
}
return floatVal;
},"String");
Float.parseFloat=Float.prototype.parseFloat;

Clazz.defineMethod(Float,"$valueOf",
function(s){
return new Float(Float.parseFloat(s,10));
},"String");

Clazz.defineMethod(Float,"$valueOf",
function(s){
return new Float(s);
},"Number");

Float.$valueOf=Float.prototype.$valueOf;
Clazz.defineMethod(Float,"isNaN",
function(num){
return isNaN(num);
},"Number");
Float.isNaN=Float.prototype.isNaN;
Clazz.defineMethod(Float,"isInfinite",
function(num){
return!isFinite(num);
},"Number");
Float.isInfinite=Float.prototype.isInfinite;

Clazz.defineMethod(Float,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");

java.lang.Double=Double=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Double,"Double",Number,Comparable,null,true);
Double.prototype.valueOf=function(){return 0;};
Double.toString=Double.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Double){
return"class java.lang.Double";
}
return""+this.valueOf();
};
Clazz.makeConstructor(Double,
function(){
this.valueOf=function(){
return 0.0;
};
});
Clazz.makeConstructor(Double,
function(value){
this.valueOf=function(){
return value;
};
},"Number");
Clazz.makeConstructor(Double,
function(s){
var value=Double.parseDouble(s);
this.valueOf=function(){
return value;
};
},"String");

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=4.9e-324;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.7976931348623157e+308;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;
Double.TYPE=Double.prototype.TYPE=Double;

Clazz.defineMethod(Double,"isNaN",
function(num){
return isNaN(num);
},"Number");
Double.isNaN=Double.prototype.isNaN;
Clazz.defineMethod(Double,"isInfinite",
function(num){
return!isFinite(num);
},"Number");
Double.isInfinite=Double.prototype.isInfinite;

Clazz.defineMethod(Double,"parseDouble",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
var doubleVal=parseFloat(s);
if(isNaN(doubleVal)){
throw new NumberFormatException("Not a Number : "+s);
}
return doubleVal;
},"String");
Double.parseDouble=Double.prototype.parseDouble;

Clazz.defineMethod(Double,"$valueOf",
function(s){
return new Double(this.parseDouble(s));
},"String");

Clazz.defineMethod(Double,"$valueOf",
function(v){
return new Double(v);
},"Number");

Double.$valueOf=Double.prototype.$valueOf;

Clazz.defineMethod(Double,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");

java.lang.Byte=Byte=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Byte,"Byte",Number,Comparable,null,true);
Byte.prototype.valueOf=function(){return 0;};
Byte.toString=Byte.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Byte){
return"class java.lang.Byte";
}
return""+this.valueOf();
};
Clazz.makeConstructor(Byte,
function(){
this.valueOf=function(){
return 0;
};
});
Clazz.makeConstructor(Byte,
function(value){
var v=Math.round(value)&0xffffffff;
this.valueOf=function(){
return v;
};
},"Number");
Clazz.makeConstructor(Byte,
function(s){
var value=Byte.parseByte(s,10);
this.valueOf=function(){
return value;
};
},"String");
Byte.serialVersionUID=Byte.prototype.serialVersionUID=-7183698231559129828;
Byte.MIN_VALUE=Byte.prototype.MIN_VALUE=-128;
Byte.MAX_VALUE=Byte.prototype.MAX_VALUE=127;
Byte.SIZE=Byte.prototype.SIZE=8;
Byte.TYPE=Byte.prototype.TYPE=Byte;

Clazz.defineMethod(Byte,"parseByte",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
var integer=parseInt(s,radix);
if(isNaN(integer)){
throw new NumberFormatException("Not a Number : "+s);
}
return integer;
},"String, Number");
Byte.parseByte=Byte.prototype.parseByte;
Clazz.defineMethod(Byte,"parseByte",
function(s){
return Byte.parseByte(s,10);
},"String");

Byte.parseByte=Byte.prototype.parseByte;

Clazz.defineMethod(Byte,"$valueOf",
function(s){
return new Byte(Byte.parseByte(s,10));
},"String");

Clazz.defineMethod(Byte,"$valueOf",
function(s){
return new Byte(s);
},"Number");

Clazz.defineMethod(Byte,"$valueOf",
function(s,r){
return new Byte(Byte.parseByte(s,r));
},"String, Number");

Byte.$valueOf=Byte.prototype.$valueOf;
Clazz.defineMethod(Byte,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Byte)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Byte.toHexString=Byte.prototype.toHexString=function(i){
return i.toString(16);
};
Byte.toOctalString=Byte.prototype.toOctalString=function(i){
return i.toString(8);
};
Byte.toBinaryString=Byte.prototype.toBinaryString=function(i){
return i.toString(2);
};
Byte.decode=Clazz.defineMethod(Byte,"decode",
function(nm){
var radix=10;
var index=0;
var negative=false;
var result;
if(nm.startsWith("-")){
negative=true;
index++;
}if(nm.startsWith("0x",index)||nm.startsWith("0X",index)){
index+=2;
radix=16;
}else if(nm.startsWith("#",index)){
index++;
radix=16;
}else if(nm.startsWith("0",index)&&nm.length>1+index){
index++;
radix=8;
}if(nm.startsWith("-",index))throw new NumberFormatException("Negative sign in wrong position");
try{
result=Byte.$valueOf(nm.substring(index),radix);
result=negative?new Byte(-result.byteValue()):result;
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
var constant=negative?String.instantialize("-"+nm.substring(index)):nm.substring(index);
result=Byte.$valueOf(constant,radix);
}else{
throw e;
}
}
return result;
},"~S");

java.lang.Boolean=Boolean;
Boolean.__CLASS_NAME__="Boolean";
Clazz.implementOf(Boolean,[java.io.Serializable,java.lang.Comparable]);
Boolean.equals=Clazz.innerFunctions.equals;
Boolean.getName=Clazz.innerFunctions.getName;
Boolean.serialVersionUID=Boolean.prototype.serialVersionUID=-3665804199014368530;

Clazz.makeConstructor(Boolean,
function(value){
this.valueOf=function(){
return value;
};
},"~B");
Clazz.makeConstructor(Boolean,
function(s){
this.valueOf=function(){
return Boolean.toBoolean(s);
};
},"~S");
Boolean.parseBoolean=Clazz.defineMethod(Boolean,"parseBoolean",
function(s){
return Boolean.toBoolean(s);
},"~S");
Clazz.defineMethod(Boolean,"booleanValue",
function(){
return this.value;
});
Boolean.$valueOf=Clazz.defineMethod(Boolean,"$valueOf",
function(b){
return(b?Boolean.TRUE:Boolean.FALSE);
},"~B");
Boolean.$valueOf=Clazz.defineMethod(Boolean,"$valueOf",
function(s){
return Boolean.toBoolean(s)?Boolean.TRUE:Boolean.FALSE;
},"~S");
Boolean.toString=Clazz.defineMethod(Boolean,"toString",
function(b){
return b?"true":"false";
},"~B");
Clazz.defineMethod(Boolean,"toString",
function(){
return this.valueOf()?"true":"false";
});
Clazz.overrideMethod(Boolean,"hashCode",
function(){
return this.valueOf()?1231:1237;
});
Clazz.overrideMethod(Boolean,"equals",
function(obj){
if(Clazz.instanceOf(obj,Boolean)){
return this.value==(obj).booleanValue();
}return false;
},"~O");
Boolean.getBoolean=Clazz.defineMethod(Boolean,"getBoolean",
function(name){
var result=false;
try{
result=Boolean.toBoolean(System.getProperty(name));
}catch(e){
if(Clazz.instanceOf(e,IllegalArgumentException)){
}else if(Clazz.instanceOf(e,NullPointerException)){
}else{
throw e;
}
}
return result;
},"~S");
Clazz.overrideMethod(Boolean,"compareTo",
function(b){
return(b.value==this.value?0:(this.value?1:-1));
},"Boolean");
Boolean.toBoolean=Clazz.defineMethod(Boolean,"toBoolean",
($fz=function(name){
return((name!=null)&&name.equalsIgnoreCase("true"));
},$fz.isPrivate=true,$fz),"~S");
Boolean.TRUE=Boolean.prototype.TRUE=new Boolean(true);
Boolean.FALSE=Boolean.prototype.FALSE=new Boolean(false);
Boolean.TYPE=Boolean.prototype.TYPE=Boolean;
Encoding=new Object();
Encoding.UTF8="utf-8";
Encoding.UTF16="utf-16";
Encoding.ASCII="ascii";


Encoding.guessEncoding=function(str){
if(str.charCodeAt(0)==0xEF&&str.charCodeAt(1)==0xBB&&str.charCodeAt(2)==0xBF){
return Encoding.UTF8;
}else if(str.charCodeAt(0)==0xFF&&str.charCodeAt(1)==0xFE){
return Encoding.UTF16;
}else{
return Encoding.ASCII;
}
};

Encoding.readUTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
startIdx=3;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}
var arrs=new Array();
for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[arrs.length]=str.charAt(i);
}else if(charCode>0xc0&&charCode<0xe0){
var c1=charCode&0x1f;
i++;
var c2=str.charCodeAt(i)&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>=0xe0){
var c1=charCode&0x0f;
i++;
var c2=str.charCodeAt(i)&0x3f;
i++;
var c3=str.charCodeAt(i)&0x3f;
var c=(c1<<12)+(c2<<6)+c3;
arrs[arrs.length]=String.fromCharCode(c);
}
}
return arrs.join('');
};

Encoding.convert2UTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
return str;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}

var offset=0;
var arrs=new Array(offset+str.length-startIdx);

for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[offset+i-startIdx]=str.charAt(i);
}else if(charCode<=0x07ff){
var c1=0xc0+((charCode&0x07c0)>>6);
var c2=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2);
}else{
var c1=0xe0+((charCode&0xf000)>>12);
var c2=0x80+((charCode&0x0fc0)>>6);
var c3=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2)+String.fromCharCode(c3);
}
}
return arrs.join('');
};
Encoding.base64Chars=new Array(
'A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P',
'Q','R','S','T','U','V','W','X',
'Y','Z','a','b','c','d','e','f',
'g','h','i','j','k','l','m','n',
'o','p','q','r','s','t','u','v',
'w','x','y','z','0','1','2','3',
'4','5','6','7','8','9','+','/'
);
Encoding.encodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2;
while(index<length){
c0=str.charCodeAt(index++);
buf[buf.length]=b64[c0>>2];
if(index<length){
c1=str.charCodeAt(index++);
buf[buf.length]=b64[((c0<<4)&0x30)|(c1>>4)];
if(index<length){
c2=str.charCodeAt(index++);
buf[buf.length]=b64[((c1<<2)&0x3c)|(c2>>6)];
buf[buf.length]=b64[c2&0x3F];
}else{
buf[buf.length]=b64[((c1<<2)&0x3c)];
buf[buf.length]='=';
}
}else{
buf[buf.length]=b64[(c0<<4)&0x30];
buf[buf.length]='=';
buf[buf.length]='=';
}
}
return buf.join('');
};
Encoding.decodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var xb64=Encoding.xBase64Chars;
if(Encoding.xBase64Chars==null){
xb64=new Object();
for(var i=0;i<b64.length;i++){
xb64[b64[i]]=i;
}
Encoding.xBase64Chars=xb64;
}
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2,c3;
var c=0;
while(index<length&&c++<60000){
c0=xb64[str.charAt(index++)];
c1=xb64[str.charAt(index++)];
c2=xb64[str.charAt(index++)];
c3=xb64[str.charAt(index++)];
buf[buf.length]=String.fromCharCode(((c0<<2)&0xff)|c1>>4);
if(c2!=null){
buf[buf.length]=String.fromCharCode(((c1<<4)&0xff)|c2>>2);
if(c3!=null){
buf[buf.length]=String.fromCharCode(((c2<<6)&0xff)|c3);
}
}
}
return buf.join('');
};

if(String.prototype.$replace==null){
java.lang.String=String;

Clazz.implementOf(String,[java.io.Serializable,CharSequence,Comparable]);

String.getName=Clazz.innerFunctions.getName;

String.serialVersionUID=String.prototype.serialVersionUID=-6849794470754667710;

String.prototype.$replace=function(c1,c2){

c1=c1.replace(/([\\\/\$\.\*\+\{\}\?\^\(\)\[\]])/g,function($0,$1){
return"\\"+$1;
});
var regExp=new RegExp(c1,"gm");
return this.replace(regExp,c2);
};
String.prototype.$generateExpFunction=function(str){
var arr=[];
var orders=[];
var idx=0;
arr[0]="";
var i=0;
for(;i<str.length;i++){
var ch=str.charAt(i);
if(i!=str.length-1&&ch=='\\'){
i++;
var c=str.charAt(i);
if(c=='\\'){
arr[idx]+='\\';
}
arr[idx]+=c;
}else if(i!=str.length-1&&ch=='$'){
i++;
orders[idx]=parseInt(str.charAt(i));
idx++;
arr[idx]="";
}else if(ch=='\r'){
arr[idx]+="\\r";
}else if(ch=='\n'){
arr[idx]+="\\n";
}else if(ch=='\t'){
arr[idx]+="\\t";
}else if(ch=='\"'){
arr[idx]+="\\\"";
}else{
arr[idx]+=ch;
}
}
var funStr="f = function (";
var max=Math.max.apply({},orders);
for(i=0;i<=max;i++){
funStr+="$"+i;
if(i!=max){
funStr+=", ";
}
}
funStr+=") { return ";
for(i=0;i<arr.length-1;i++){
funStr+="\""+arr[i]+"\" + $"+orders[i]+" + ";
}
funStr+="\""+arr[i]+"\"; }";
var f=null;
eval(funStr)
return f;
};

String.prototype.replaceAll=function(exp,str){
var regExp=new RegExp(exp,"gm");
return this.replace(regExp,this.$generateExpFunction(str));
};
String.prototype.replaceFirst=function(exp,str){
var regExp=new RegExp(exp,"m");
return this.replace(regExp,this.$generateExpFunction(str));
};
String.prototype.matches=function(exp){
if(exp!=null){
exp="^("+exp+")$";
}
var regExp=new RegExp(exp,"gm");
var m=this.match(regExp);
return m!=null&&m.length!=0;
};
String.prototype.regionMatches=function(ignoreCase,toffset,
other,ooffset,len){

if(typeof ignoreCase=="number"
||(ignoreCase!=true&&ignoreCase!=false)){
len=ooffset;
ooffset=other;
other=toffset;
toffset=ignoreCase;
ignoreCase=false;
}
var to=toffset;
var po=ooffset;

if((ooffset<0)||(toffset<0)||(toffset>this.length-len)||
(ooffset>other.length-len)){
return false;
}
var s1=this.substring(toffset,toffset+len);
var s2=other.substring(ooffset,ooffset+len);
if(ignoreCase){
s1=s1.toLowerCase();
s2=s2.toLowerCase();
}
return s1==s2;
};
String.prototype.$plit=function(regex,limit){

if(limit!=null&&limit>0){
if(limit==1){
return this;
}
var regExp=new RegExp("("+regex+")","gm");
var count=1;
var s=this.replace(regExp,function($0,$1){
count++;
if(count==limit){
return"@@_@@";
}else if(count>limit){
return $0;
}else{
return $0;
}
});
regExp=new RegExp(regex,"gm");
var arr=this.split(regExp);
if(arr.length>limit){
arr[limit-1]=s.substring(s.indexOf("@@_@@")+5);
arr.length=limit;
}
return arr;
}else{
var regExp=new RegExp(regex,"gm");
return this.split(regExp);
}
};

String.prototype.trim=function(){
var len=this.length;
var st=0;

while((st<len)&&(this.charAt(st)<=' ')){
st++;
}
while((st<len)&&(this.charAt(len-1)<=' ')){
len--;
}
return((st>0)||(len<len))?this.substring(st,len):this;
};

String.prototype.trim=function(){
return this.replace(/^\s+/g,'').replace (/\s+$/g, '');
};


String.prototype.startsWith_string_number=function(prefix,toffset){
var to=toffset;
var po=0;
var pc=prefix.length;

if((toffset<0)||(toffset>this.length-pc)){
return false;
}
while(--pc>=0){
if(this.charAt(to++)!=prefix.charAt(po++)){
return false;
}
}
return true;
};

String.prototype.startsWith=function(prefix){
if(arguments.length==1){
return this.startsWith_string_number(arguments[0],0);
}else if(arguments.length==2){
return this.startsWith_string_number(arguments[0],arguments[1]);
}else{
return false;
}
};

String.prototype.endsWith=function(suffix){
return this.startsWith(suffix,this.length-suffix.length);
};

String.prototype.equals=function(anObject){
return this.valueOf()==anObject;
};

String.prototype.equalsIgnoreCase=function(anotherString){
return(anotherString==null)?false:(this==anotherString
||this.toLowerCase()==anotherString.toLowerCase());
};


String.prototype.hash=0;

String.prototype.hashCode=function(){
var h=this.hash;
if(h==0){
var off=0;
var len=this.length;
for(var i=0;i<len;i++){
h=31*h+this.charCodeAt(off++);
h&=0xffffffff;
}
this.hash=h;
}
return h;
};

String.prototype.getBytes=function(){
if(arguments.length==4){
return this.getChars(arguments[0],arguments[1],arguments[2],arguments[3]);
}
var s=this;
if(arguments.length==1){
var cs=arguments[0].toString().toLowerCase();
var charset=[
"utf-8","UTF8","us-ascii","iso-8859-1","8859_1","gb2312","gb18030","gbk"
];
var existed=false;
for(var i=0;i<charset.length;i++){
if(charset[i]==cs){
existed=true;
break;
}
}
if(!existed){
throw new java.io.UnsupportedEncodingException();
}
if(cs=="utf-8"||cs=="utf8"){
s=Encoding.convert2UTF8(this);
}
}
var arrs=new Array(s.length);
var c=0,ii=0;
for(var i=0;i<s.length;i++){
c=s.charCodeAt(i);
if(c>255){
arrs[ii]=0x1a;
arrs[ii+1]=c&0xff;
arrs[ii+2]=(c&0xff00)>>8;
ii+=2;
}else{
arrs[ii]=c;
}
ii++;
}
return arrs;
};

String.prototype.compareTo=function(anotherString){
if(anotherString==null){
throw new java.lang.NullPointerException();
}
var len1=this.length;
var len2=anotherString.length;
var n=Math.min(len1,len2);
var k=0;
while(k<n){
var c1=this.charCodeAt(k);
var c2=anotherString.charCodeAt(k);
if(c1!=c2){
return c1-c2;
}
k++;
}
return len1-len2;
};

String.prototype.toCharArray=function(){
var result=new Array(this.length);
for(var i=0;i<this.length;i++){
result[i]=this.charAt(i);
}
return result;
};
String.value0f=String.valueOf;
String.valueOf=function(o){
if(o=="undefined"){
return String.value0f();
}
if(o instanceof Array){
if(arguments.length==1){
return o.join('');
}else{
var off=arguments[1];
var len=arguments[2];
var oo=new Array(len);
for(var i=0;i<len;i++){
oo[i]=o[off+i];
}
return oo.join('');
}
}
return""+o;
};

String.prototype.subSequence=function(beginIndex,endIndex){
return this.substring(beginIndex,endIndex);
};

String.prototype.compareToIgnoreCase=function(str){
if(str==null){
throw new NullPointerException();
}
var s1=this.toUpperCase();
var s2=str.toUpperCase();
if(s1==s2){
return 0;
}else{
var s1=this.toLowerCase();
var s2=str.toLowerCase();
if(s1==s2){
return 0;
}else if(s1>s2){
return 1;
}else{
return-1;
}
}
};

String.prototype.contentEquals=function(sb){
if(this.length!=sb.length()){
return false;
}
var v=sb.getValue();
var i=0;
var j=0;
var n=this.length;
while(n--!=0){
if(this.charCodeAt(i++)!=v[j++]){
return false;
}
}
return true;
};

String.prototype.getChars=function(srcBegin,srcEnd,dst,dstBegin){
if(srcBegin<0){
throw new StringIndexOutOfBoundsException(srcBegin);
}
if(srcEnd>this.length){
throw new StringIndexOutOfBoundsException(srcEnd);
}
if(srcBegin>srcEnd){
throw new StringIndexOutOfBoundsException(srcEnd-srcBegin);
}
if(dst==null){
throw new NullPointerException();
}
for(var i=0;i<srcEnd-srcBegin;i++){
dst[dstBegin+i]=this.charAt(srcBegin+i);
}
};
String.prototype.$concat=String.prototype.concat;
String.prototype.concat=function(s){
if(s==null){
throw new NullPointerException();
}
return this.$concat(s);
};

String.prototype.$lastIndexOf=String.prototype.lastIndexOf;
String.prototype.lastIndexOf=function(s,last){
if(last!=null&&last+this.length<=0){
return-1;
}
if(last!=null){
return this.$lastIndexOf(s,last);
}else{
return this.$lastIndexOf(s);
}
};

String.prototype.intern=function(){
return this.valueOf();
};
String.copyValueOf=String.prototype.copyValueOf=function(){
if(arguments.length==1){
return String.instantialize(arguments[0]);
}else{
return String.instantialize(arguments[0],arguments[1],arguments[2]);
}
};
String.indexOf=function(source,sourceOffset,sourceCount,
target,targetOffset,targetCount,fromIndex){
if(fromIndex>=sourceCount){
return(targetCount==0?sourceCount:-1);
}
if(fromIndex<0){
fromIndex=0;
}
if(targetCount==0){
return fromIndex;
}

var first=target[targetOffset];
var i=sourceOffset+fromIndex;
var max=sourceOffset+(sourceCount-targetCount);

startSearchForFirstChar:
while(true){

while(i<=max&&source[i]!=first){
i++;
}
if(i>max){
return-1;
}


var j=i+1;
var end=j+targetCount-1;
var k=targetOffset+1;
while(j<end){
if(source[j++]!=target[k++]){
i++;

continue startSearchForFirstChar;
}
}
return i-sourceOffset;
}
};

String.instantialize=function(){
if(arguments.length==0){
return new String();
}else if(arguments.length==1){
var x=arguments[0];
if(typeof x=="string"||x instanceof String){
return new String(x);
}else if(x instanceof Array){
if(x.length>0&&typeof x[0]=="number"){
var arr=new Array(x.length);
for(var i=0;i<x.length;i++){
arr[i]=String.fromCharCode(x[i]&0xff);
}
return Encoding.readUTF8(arr.join(''));
}
return x.join('');
}else if(x.__CLASS_NAME__=="StringBuffer"
||x.__CLASS_NAME__=="java.lang.StringBuffer"){
var value=x.shareValue();
var length=x.length();
var valueCopy=new Array(length);
for(var i=0;i<length;i++){
valueCopy[i]=value[i];
}
return valueCopy.join('')

}else{
return""+x;
}
}else if(arguments.length==2){
var x=arguments[0];
var hibyte=arguments[1];
if(typeof hibyte=="string"){
return String.instantialize(x,0,x.length,hibyte);
}else{
return String.instantialize(x,hibyte,0,x.length);
}
}else if(arguments.length==3){
var bytes=arguments[0];
var offset=arguments[1];
var length=arguments[2];
if(arguments[2]instanceof Array){
bytes=arguments[2];
offset=arguments[0];
length=arguments[1];
}
var arr=new Array(length);
if(offset<0||length+offset>bytes.length){
throw new IndexOutOfBoundsException();
}
if(length>0){
var isChar=(bytes[offset].length!=null);
if(isChar){
for(var i=0;i<length;i++){
arr[i]=bytes[offset+i];
}
}else{
for(var i=0;i<length;i++){
arr[i]=String.fromCharCode(bytes[offset+i]);
}
}
}
return arr.join('');
}else if(arguments.length==4){
var bytes=arguments[0];
var y=arguments[3];
if(typeof y=="string"||y instanceof String){
var offset=arguments[1];
var length=arguments[2];
var arr=new Array(length);
for(var i=0;i<length;i++){
arr[i]=bytes[offset+i];
if(typeof arr[i]=="number"){
arr[i]=String.fromCharCode(arr[i]&0xff);
}
}
var cs=y.toLowerCase();
if(cs=="utf-8"||cs=="utf8"){
return Encoding.readUTF8(arr.join(''));
}else{
return arr.join('');
}
}else{
var count=arguments[3];
var offset=arguments[2];
var hibyte=arguments[1];
var value=new Array(count);
if(hibyte==0){
for(var i=count;i-->0;){
value[i]=String.fromCharCode(bytes[i+offset]&0xff);
}
}else{
hibyte<<=8;
for(var i=count;i-->0;){
value[i]=String.fromCharCode(hibyte|(bytes[i+offset]&0xff));
}
}
return value.join('');
}
}else{
var s="";
for(var i=0;i<arguments.length;i++){
s+=arguments[i];
}
return s;
}
};

if(navigator.userAgent.toLowerCase().indexOf("chrome")!=-1){
String.prototype.toString=function(){
return this;
};
}

}
c$=$_C(function(){
this.value=0;
$_Z(this,arguments);
},java.lang,"Character",null,[java.io.Serializable,Comparable]);
$_K(c$,
function(value){
this.value=value;
},"~N");
$_M(c$,"charValue",
function(){
return this.value;
});
$_V(c$,"hashCode",
function(){
return(this.value).charCodeAt(0);
});
$_V(c$,"equals",
function(obj){
if($_O(obj,Character)){
return(this.value).charCodeAt(0)==((obj).charValue()).charCodeAt(0);
}return false;
},"~O");
$_V(c$,"compareTo",
function(c){
return(this.value).charCodeAt(0)-(c.value).charCodeAt(0);
},"Character");
c$.toLowerCase=$_M(c$,"toLowerCase",
function(c){
return(""+c).toLowerCase().charAt(0);
},"~N");
c$.toUpperCase=$_M(c$,"toUpperCase",
function(c){
return(""+c).toUpperCase().charAt(0);
},"~N");
c$.isDigit=$_M(c$,"isDigit",
function(c){
if(('0').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('9').charCodeAt(0))return true;
if((c).charCodeAt(0)<1632)return false;
return false;
},"~N");
c$.isUpperCase=$_M(c$,"isUpperCase",
function(c){
if(('A').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('Z').charCodeAt(0)){
return true;
}return false;
},"~N");
c$.isLowerCase=$_M(c$,"isLowerCase",
function(c){
if(('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt(0)){
return true;
}return false;
},"~N");
c$.isWhitespace=$_M(c$,"isWhitespace",
function(c){
if(((c).charCodeAt(0)>=0x1c&&(c).charCodeAt(0)<=0x20)||((c).charCodeAt(0)>=0x9&&(c).charCodeAt(0)<=0xd))return true;
if((c).charCodeAt(0)==0x1680)return true;
if((c).charCodeAt(0)<0x2000||(c).charCodeAt(0)==0x2007)return false;
return(c).charCodeAt(0)<=0x200b||(c).charCodeAt(0)==0x2028||(c).charCodeAt(0)==0x2029||(c).charCodeAt(0)==0x3000;
},"~N");
c$.isLetter=$_M(c$,"isLetter",
function(c){
if((('A').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('Z').charCodeAt (0)) || (('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt(0)))return true;
if((c).charCodeAt(0)<128)return false;
return false;
},"~N");
c$.isLetterOrDigit=$_M(c$,"isLetterOrDigit",
function(c){
return Character.isLetter(c)||Character.isDigit(c);
},"~N");
c$.isSpaceChar=$_M(c$,"isSpaceChar",
function(c){
if((c).charCodeAt(0)==0x20||(c).charCodeAt(0)==0xa0||(c).charCodeAt(0)==0x1680)return true;
if((c).charCodeAt(0)<0x2000)return false;
return(c).charCodeAt(0)<=0x200b||(c).charCodeAt(0)==0x2028||(c).charCodeAt(0)==0x2029||(c).charCodeAt(0)==0x202f||(c).charCodeAt(0)==0x3000;
},"~N");
c$.digit=$_M(c$,"digit",
function(c,radix){
if(radix>=2&&radix<=36){
if((c).charCodeAt(0)<128){
var result=-1;
if(('0').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('9').charCodeAt(0)){
result=(c).charCodeAt(0)-('0').charCodeAt(0);
}else if(('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt(0)){
result=(c).charCodeAt(0)-(87);
}else if(('A').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('Z').charCodeAt(0)){
result=(c).charCodeAt(0)-(55);
}return result<radix?result:-1;
}}return-1;
},"~N,~N");
$_M(c$,"toString",
function(){
var buf=[this.value];
return String.valueOf(buf);
});
c$.toString=$_M(c$,"toString",
function(c){
{
if(this===Charater){
return"class java.lang.Charater";
}
}return String.valueOf(c);
},"~N");
$_S(c$,
"MIN_VALUE",'\u0000',
"MAX_VALUE",'\uffff',
"MIN_RADIX",2,
"MAX_RADIX",36,
"TYPE",null);

java.lang.Character.TYPE=java.lang.Character.prototype.TYPE=java.lang.Character;
Array.getComponentType=function(){
return Object;
};c$=$_T(java.lang.reflect,"Array");
c$.newInstance=$_M(c$,"newInstance",
function(componentType,size){
return $_A(length);
},"Class,~N");

java.util.Date=Date;
Clazz.decorateAsType(java.util.Date,"java.util.Date",null,[java.io.Serializable,Cloneable,Comparable]);

Clazz.defineMethod(java.util.Date,"clone",
function(){
return new Date(this.getTime());
});

Clazz.defineMethod(java.util.Date,"before",
function(when){
return this.getTime()<when.getTime();
},"java.util.Date");
Clazz.defineMethod(java.util.Date,"after",
function(when){
return this.getTime()>when.getTime();
},"java.util.Date");
Clazz.defineMethod(java.util.Date,"equals",
function(obj){
return Clazz.instanceOf(obj,java.util.Date)&&this.getTime()==(obj).getTime();
},"Object");
Clazz.defineMethod(java.util.Date,"compareTo",
function(anotherDate){
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
},"java.util.Date");
Clazz.defineMethod(java.util.Date,"compareTo",
function(o){
return this.compareTo(o);
},"Object");
Clazz.defineMethod(java.util.Date,"hashCode",
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});

c$=$_C(function(){
this.source=null;
$_Z(this,arguments);
},java.util,"EventObject",null,java.io.Serializable);
$_K(c$,
function(source){
if(source!=null)this.source=source;
else throw new IllegalArgumentException();
},"~O");
$_M(c$,"getSource",
function(){
return this.source;
});
$_V(c$,"toString",
function(){
return this.getClass().getName()+"[source="+String.valueOf(this.source)+']';
});
$_I(java.util,"EventListener");

c$=$_C(function(){
this.listener=null;
$_Z(this,arguments);
},java.util,"EventListenerProxy",null,java.util.EventListener);
$_K(c$,
function(listener){
this.listener=listener;
},"java.util.EventListener");
$_M(c$,"getListener",
function(){
return this.listener;
});
$_I(java.util,"Iterator");

$_I(java.util,"ListIterator",java.util.Iterator);
$_I(java.util,"Enumeration");
$_I(java.util,"Collection",Iterable);

$_I(java.util,"Set",java.util.Collection);
$_I(java.util,"Map");
$_I(java.util.Map,"Entry");

$_I(java.util,"List",java.util.Collection);

$_I(java.util,"Queue",java.util.Collection);
$_I(java.util,"RandomAccess");
$_J("java.net");
c$=$_T(java.net,"URLEncoder");
c$.encode=$_M(c$,"encode",
function(s){
return encodeURIComponent(arguments[0]);
},"~S");
c$.encode=$_M(c$,"encode",
function(s,enc){
return encodeURIComponent(arguments[0]);
},"~S,~S");
$_S(c$,
"digits","0123456789ABCDEF");
$_J("java.net");
$_L(null,"java.net.URLDecoder",["java.lang.NullPointerException"],function(){
c$=$_T(java.net,"URLDecoder");
c$.decode=$_M(c$,"decode",
function(s){
return decodeURIComponent(arguments[0]);
},"~S");
c$.decode=$_M(c$,"decode",
function(s,enc){
if(enc==null){
throw new NullPointerException();
}{
return decodeURIComponent(arguments[0]);
}return null;
},"~S,~S");
});
Clazz.declarePackage("net.sf.j2s.ajax");
c$=Clazz.decorateAsClass(function(){
this.transport=null;
this.xssErrorHandler=null;
if(window.XMLHttpRequest){
this.transport=new XMLHttpRequest();
}else{
try{
this.transport=new ActiveXObject("Msxml2.XMLHTTP");
}catch(e){
this.transport=new ActiveXObject("Microsoft.XMLHTTP");
}
}
},net.sf.j2s.ajax,"HttpRequest");
c$.prototype.getReadyState=function(){
return this.transport.readyState;
};
c$.prototype.getResponseText=function(){
return this.transport.responseText;
};
c$.prototype.getResponseXML=function(){
return this.transport.responseXML;
};
c$.prototype.getStatus=function(){
return this.transport.status;
};
c$.prototype.getStatusText=function(){
return this.transport.statusText;
};
c$.prototype.registerOnReadyStateChange=function(handler){
this.xssErrorHandler=handler;
this.transport.onreadystatechange=(function(transport,handler){
return function(){
var state=transport.readyState;
if(handler!=null){
if(state==1){
handler.onOpen();
}else if(state==2){
handler.onSent();
}else if(state==3){
handler.onReceiving();
}else if(state==4){
handler.onLoaded();
transport.onreadystatechange=function(){};
}
}
};
})(this.transport,handler);
};
c$.prototype.setRequestHeader=function(key,value){
this.transport.setRequestHeader(key,value);
};
c$.prototype.getAllResponseHeaders=function(){
return this.transport.getAllResponseHeaders();
};
c$.prototype.getResponseHeader=function(key){
return this.transport.getResponseHeader(key);
};

c$.prototype.open=function(method,url,async,user,password){
this.transport.open(method,url,async,user,password);
try{
if(ClassLoader!=null&&ClassLoader.isGecko){
this.transport.setRequestHeader("User-Agent","Java2Script/2.0.0");
}
}catch(e){
}
try{
var l=window.location;
this.transport.setRequestHeader("Referer",
l.protocol+"//"+l.host+(l.port!="" ? ":" + l.port : "")+"/");
}catch(e){
}
if(method!=null&&method.toLowerCase()=="post"){
try{
this.transport.setRequestHeader("Content-type",
"application/x-www-form-urlencoded");
}catch(e){
}
}
};
c$.prototype.abort=function(){
this.transport.abort();
};

c$.prototype.send=function(str){
try{
this.transport.send(str);
}catch(e){

this.transport.onreadystatechange=function(){};
if(this.xssErrorHandler!=null){
this.xssErrorHandler.onLoaded();
}
this.xssErrorHandler=null;
}
};
$_J("net.sf.j2s.ajax");
c$=$_C(function(){
this.clazz=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"ARunnable",null,Runnable);
$_M(c$,"getClazz",
function(){
return this.clazz;
});
$_M(c$,"setClazz",
function(clazz){
this.clazz=clazz;
},"Class");
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"AClass");
c$.load=$_M(c$,"load",
function(clazzName,afterLoaded){
ClazzLoader.loadClass(clazzName,afterLoaded==null?null:function(){
if(afterLoaded!=null&&$_O(afterLoaded,net.sf.j2s.ajax.ARunnable)){
var clz=Clazz.evalType(clazzName);
afterLoaded.setClazz(clz);
}
if(afterLoaded!=null)afterLoaded.run();
},false,true);
},"~S,Runnable");
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.AClass"],"net.sf.j2s.ajax.ASWTClass",null,function(){
c$=$_T(net.sf.j2s.ajax,"ASWTClass",net.sf.j2s.ajax.AClass);
c$.swtLoad=$_M(c$,"swtLoad",
function(clazzName,afterLoaded){
var display=null;
{
}net.sf.j2s.ajax.ASWTClass.objectLoad(display,clazzName,afterLoaded);
},"~S,Runnable");
c$.objectLoad=$_M(c$,"objectLoad",
function(display,clazzName,afterLoaded){
ClazzLoader.loadClass(clazzName,afterLoaded==null?null:function(){
if(afterLoaded!=null&&$_O(afterLoaded,net.sf.j2s.ajax.ARunnable)){
var clz=Clazz.evalType(clazzName);
afterLoaded.setClazz(clz);
}
if(afterLoaded!=null)afterLoaded.run();
},false,true);
},"~O,~S,Runnable");
c$.displayLoad=$_M(c$,"displayLoad",
function(display,clazzName,afterLoaded){
net.sf.j2s.ajax.ASWTClass.objectLoad(display,clazzName,afterLoaded);
},"$wt.widgets.Display,~S,Runnable");
c$.shellLoad=$_M(c$,"shellLoad",
function(shell,clazzName,afterLoaded){
net.sf.j2s.ajax.ASWTClass.objectLoad(shell.getDisplay(),clazzName,afterLoaded);
},"$wt.widgets.Shell,~S,Runnable");
});
