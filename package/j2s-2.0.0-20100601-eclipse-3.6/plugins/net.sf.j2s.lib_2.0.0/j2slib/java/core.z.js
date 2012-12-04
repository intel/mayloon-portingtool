
java.lang.Number=Number;
if(Clazz.supportsNativeObject){
for(var i=0;i<Clazz.extendedObjectMethods.length;i++){
var p=Clazz.extendedObjectMethods[i];
Number.prototype[p]=JavaObject.prototype[p];
}
}

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
if(Clazz.supportsNativeObject){
for(var i=0;i<Clazz.extendedObjectMethods.length;i++){
var p=Clazz.extendedObjectMethods[i];
Boolean.prototype[p]=JavaObject.prototype[p];
}
}
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
if(Clazz.supportsNativeObject){
for(var i=0;i<Clazz.extendedObjectMethods.length;i++){
var p=Clazz.extendedObjectMethods[i];
if("to$tring"==p||"toString"==p||"equals"==p||"hashCode"==p){
continue;
}
String.prototype[p]=JavaObject.prototype[p];
}
}

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
return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
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
c$=$_C(function(){
this.detailMessage=null;
this.cause=null;
this.stackTrace=null;
$_Z(this,arguments);
},java.lang,"Throwable",null,java.io.Serializable);
$_Y(c$,function(){
this.cause=this;
});
$_K(c$,
function(){
this.fillInStackTrace();
});
$_K(c$,
function(message){
this.fillInStackTrace();
this.detailMessage=message;
},"~S");
$_K(c$,
function(message,cause){
this.fillInStackTrace();
this.detailMessage=message;
this.cause=cause;
},"~S,Throwable");
$_K(c$,
function(cause){
this.fillInStackTrace();
this.detailMessage=(cause==null?null:cause.toString());
this.cause=cause;
},"Throwable");
$_M(c$,"getMessage",
function(){
{
if(typeof this.message!="undefined"){
return this.message;
}
}return this.detailMessage;
});
$_M(c$,"getLocalizedMessage",
function(){
return this.getMessage();
});
$_M(c$,"getCause",
function(){
return(this.cause===this?null:this.cause);
});
$_M(c$,"initCause",
function(cause){
if(this.cause!==this)throw new IllegalStateException("Can't overwrite cause");
if(cause===this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
},"Throwable");
$_V(c$,"toString",
function(){
var s=this.getClass().getName();
var message=this.getLocalizedMessage();
return(message!=null)?(s+": "+message):s;
});
$_M(c$,"printStackTrace",
function(){
System.err.println(this);
for(var i=0;i<this.stackTrace.length;i++){
var t=this.stackTrace[i];
var x=t.methodName.indexOf("(");
var n=t.methodName.substring(0,x).replace(/\s+/g,"");
if(n!="construct"||t.nativeClazz==null
||Clazz.getInheritedLevel(t.nativeClazz,Throwable)<0){
System.err.println(t);
}
}
});
$_M(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintStream");
$_M(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintWriter");
$_M(c$,"fillInStackTrace",
function(){
this.stackTrace=new Array();
var caller=arguments.callee.caller;
var superCaller=null;
var callerList=new Array();
var index=Clazz.callingStackTraces.length-1;
var noLooping=true;
while(index>-1||caller!=null){
var clazzName=null;
var nativeClazz=null;
if(!noLooping||caller==Clazz.tryToSearchAndExecute||caller==$_U||caller==null){
if(index<0){
break;
}
noLooping=true;
superCaller=Clazz.callingStackTraces[index].caller;
nativeClazz=Clazz.callingStackTraces[index].owner;
index--;
}else{
superCaller=caller;
if(superCaller.claxxOwner!=null){
nativeClazz=superCaller.claxxOwner;
}else if(superCaller.exClazz!=null){
nativeClazz=superCaller.exClazz;
}
}
var st=new StackTraceElement(
((nativeClazz!=null&&nativeClazz.__CLASS_NAME__.length!=0)?
nativeClazz.__CLASS_NAME__:"anonymous"),
((superCaller.exName==null)?"anonymous":superCaller.exName)
+" ("+Clazz.getParamsType(superCaller.arguments)+")",
null,-1);
st.nativeClazz=nativeClazz;
this.stackTrace[this.stackTrace.length]=st;
for(var i=0;i<callerList.length;i++){
if(callerList[i]==superCaller){

var st=new StackTraceElement("lost","missing",null,-3);
st.nativeClazz=null;
this.stackTrace[this.stackTrace.length]=st;
noLooping=false;

}
}
if(superCaller!=null){
callerList[callerList.length]=superCaller;
}
caller=superCaller.arguments.callee.caller;
}
Clazz.initializingException=false;
return this;
});
$_M(c$,"setStackTrace",
function(stackTrace){
var defensiveCopy=stackTrace.clone();
for(var i=0;i<defensiveCopy.length;i++)if(defensiveCopy[i]==null)throw new NullPointerException("stackTrace["+i+"]");

this.stackTrace=defensiveCopy;
},"~A");

c$=$_C(function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
$_Z(this,arguments);
},java.lang,"StackTraceElement",null,java.io.Serializable);
$_K(c$,
function(cls,method,file,line){
if(cls==null||method==null){
throw new NullPointerException();
}this.declaringClass=cls;
this.methodName=method;
this.fileName=file;
this.lineNumber=line;
},"~S,~S,~S,~N");
$_V(c$,"equals",
function(obj){
if(!($_O(obj,StackTraceElement))){
return false;
}var castObj=obj;
if((this.methodName==null)||(castObj.methodName==null)){
return false;
}if(!this.getMethodName().equals(castObj.getMethodName())){
return false;
}if(!this.getClassName().equals(castObj.getClassName())){
return false;
}var localFileName=this.getFileName();
if(localFileName==null){
if(castObj.getFileName()!=null){
return false;
}}else{
if(!localFileName.equals(castObj.getFileName())){
return false;
}}if(this.getLineNumber()!=castObj.getLineNumber()){
return false;
}return true;
},"~O");
$_M(c$,"getClassName",
function(){
return(this.declaringClass==null)?"<unknown class>":this.declaringClass;
});
$_M(c$,"getFileName",
function(){
return this.fileName;
});
$_M(c$,"getLineNumber",
function(){
return this.lineNumber;
});
$_M(c$,"getMethodName",
function(){
return(this.methodName==null)?"<unknown method>":this.methodName;
});
$_V(c$,"hashCode",
function(){
if(this.methodName==null){
return 0;
}return this.methodName.hashCode()^this.declaringClass.hashCode();
});
$_M(c$,"isNativeMethod",
function(){
return this.lineNumber==-2;
});
$_V(c$,"toString",
function(){
var buf=new StringBuilder(80);
buf.append(this.getClassName());
buf.append('.');
buf.append(this.getMethodName());
if(this.isNativeMethod()){
buf.append("(Native Method)");
}else{
var fName=this.getFileName();
if(fName==null){
buf.append("(Unknown Source)");
}else{
var lineNum=this.getLineNumber();
buf.append('(');
buf.append(fName);
if(lineNum>=0){
buf.append(':');
buf.append(lineNum);
}buf.append(')');
}}return buf.toString();
});

c$=$_T(java.lang,"Error",Throwable);

c$=$_T(java.lang,"LinkageError",Error);

c$=$_T(java.lang,"IncompatibleClassChangeError",LinkageError);

c$=$_T(java.lang,"AbstractMethodError",IncompatibleClassChangeError);

c$=$_T(java.lang,"AssertionError",Error);
$_K(c$,
function(detailMessage){
$_R(this,AssertionError,[String.valueOf(detailMessage),($_O(detailMessage,Throwable)?detailMessage:null)]);
},"~O");
$_K(c$,
function(detailMessage){
this.construct(String.valueOf(detailMessage));
},"~B");
$_K(c$,
function(detailMessage){
this.construct(String.valueOf(detailMessage));
},"~N");
$_K(c$,
function(detailMessage){
this.construct(Integer.toString(detailMessage));
},"~N");
$_K(c$,
function(detailMessage){
this.construct(Long.toString(detailMessage));
},"~N");
$_K(c$,
function(detailMessage){
this.construct(Float.toString(detailMessage));
},"~N");
$_K(c$,
function(detailMessage){
this.construct(Double.toString(detailMessage));
},"~N");

c$=$_T(java.lang,"ClassCircularityError",LinkageError);

c$=$_T(java.lang,"ClassFormatError",LinkageError);

c$=$_C(function(){
this.exception=null;
$_Z(this,arguments);
},java.lang,"ExceptionInInitializerError",LinkageError);
$_K(c$,
function(){
$_R(this,ExceptionInInitializerError);
this.initCause(null);
});
$_K(c$,
function(detailMessage){
$_R(this,ExceptionInInitializerError,[detailMessage]);
this.initCause(null);
},"~S");
$_K(c$,
function(exception){
$_R(this,ExceptionInInitializerError);
this.exception=exception;
this.initCause(exception);
},"Throwable");
$_M(c$,"getException",
function(){
return this.exception;
});
$_V(c$,"getCause",
function(){
return this.exception;
});

c$=$_T(java.lang,"IllegalAccessError",IncompatibleClassChangeError);

c$=$_T(java.lang,"InstantiationError",IncompatibleClassChangeError);

c$=$_T(java.lang,"VirtualMachineError",Error);

c$=$_T(java.lang,"InternalError",VirtualMachineError);

c$=$_T(java.lang,"NoClassDefFoundError",LinkageError);

c$=$_T(java.lang,"NoSuchFieldError",IncompatibleClassChangeError);

c$=$_T(java.lang,"NoSuchMethodError",IncompatibleClassChangeError);

c$=$_T(java.lang,"OutOfMemoryError",VirtualMachineError);

c$=$_T(java.lang,"StackOverflowError",VirtualMachineError);

c$=$_T(java.lang,"UnknownError",VirtualMachineError);

c$=$_T(java.lang,"UnsatisfiedLinkError",LinkageError);

c$=$_T(java.lang,"UnsupportedClassVersionError",ClassFormatError);

c$=$_T(java.lang,"VerifyError",LinkageError);

c$=$_T(java.lang,"ThreadDeath",Error);
$_K(c$,
function(){
$_R(this,ThreadDeath,[]);
});

c$=$_T(java.lang,"Exception",Throwable);

c$=$_T(java.lang,"RuntimeException",Exception);

c$=$_T(java.lang,"ArithmeticException",RuntimeException);

c$=$_T(java.lang,"IndexOutOfBoundsException",RuntimeException);

c$=$_T(java.lang,"ArrayIndexOutOfBoundsException",IndexOutOfBoundsException);
$_K(c$,
function(index){
$_R(this,ArrayIndexOutOfBoundsException,["Array index out of range: "+index]);
},"~N");

c$=$_T(java.lang,"ArrayStoreException",RuntimeException);

c$=$_T(java.lang,"ClassCastException",RuntimeException);

c$=$_C(function(){
this.ex=null;
$_Z(this,arguments);
},java.lang,"ClassNotFoundException",Exception);
$_K(c$,
function(){
$_R(this,ClassNotFoundException,[Clazz.castNullAs("Throwable")]);
});
$_K(c$,
function(detailMessage){
$_R(this,ClassNotFoundException,[detailMessage,null]);
},"~S");
$_K(c$,
function(detailMessage,exception){
$_R(this,ClassNotFoundException,[detailMessage]);
this.ex=exception;
},"~S,Throwable");
$_M(c$,"getException",
function(){
return this.ex;
});
$_V(c$,"getCause",
function(){
return this.ex;
});

c$=$_T(java.lang,"CloneNotSupportedException",Exception);

c$=$_T(java.lang,"IllegalAccessException",Exception);

c$=$_T(java.lang,"IllegalArgumentException",RuntimeException);
$_K(c$,
function(cause){
$_R(this,IllegalArgumentException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=$_T(java.lang,"IllegalMonitorStateException",RuntimeException);

c$=$_T(java.lang,"IllegalStateException",RuntimeException);
$_K(c$,
function(cause){
$_R(this,IllegalStateException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=$_T(java.lang,"IllegalThreadStateException",IllegalArgumentException);

c$=$_T(java.lang,"InstantiationException",Exception);

c$=$_T(java.lang,"InterruptedException",Exception);

c$=$_T(java.lang,"NegativeArraySizeException",RuntimeException);

c$=$_T(java.lang,"NoSuchFieldException",Exception);

c$=$_T(java.lang,"NoSuchMethodException",Exception);

c$=$_T(java.lang,"NullPointerException",RuntimeException);

c$=$_T(java.lang,"NumberFormatException",IllegalArgumentException);

c$=$_T(java.lang,"SecurityException",RuntimeException);
$_K(c$,
function(cause){
$_R(this,SecurityException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=$_T(java.lang,"StringIndexOutOfBoundsException",IndexOutOfBoundsException);
$_K(c$,
function(index){
$_R(this,StringIndexOutOfBoundsException,["String index out of range: "+index]);
},"~N");

c$=$_T(java.lang,"UnsupportedOperationException",RuntimeException);
$_K(c$,
function(){
$_R(this,UnsupportedOperationException,[]);
});
$_K(c$,
function(cause){
$_R(this,UnsupportedOperationException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=$_C(function(){
this.target=null;
$_Z(this,arguments);
},java.lang.reflect,"InvocationTargetException",Exception);
$_K(c$,
function(){
$_R(this,java.lang.reflect.InvocationTargetException,[Clazz.castNullAs("Throwable")]);
});
$_K(c$,
function(exception){
$_R(this,java.lang.reflect.InvocationTargetException,[null,exception]);
this.target=exception;
},"Throwable");
$_K(c$,
function(exception,detailMessage){
$_R(this,java.lang.reflect.InvocationTargetException,[detailMessage,exception]);
this.target=exception;
},"Throwable,~S");
$_M(c$,"getTargetException",
function(){
return this.target;
});
$_V(c$,"getCause",
function(){
return this.target;
});

c$=$_C(function(){
this.undeclaredThrowable=null;
$_Z(this,arguments);
},java.lang.reflect,"UndeclaredThrowableException",RuntimeException);
$_K(c$,
function(exception){
$_R(this,java.lang.reflect.UndeclaredThrowableException);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable");
$_K(c$,
function(exception,detailMessage){
$_R(this,java.lang.reflect.UndeclaredThrowableException,[detailMessage]);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable,~S");
$_M(c$,"getUndeclaredThrowable",
function(){
return this.undeclaredThrowable;
});
$_V(c$,"getCause",
function(){
return this.undeclaredThrowable;
});

c$=$_T(java.io,"IOException",Exception);

c$=$_T(java.io,"CharConversionException",java.io.IOException);

c$=$_T(java.io,"EOFException",java.io.IOException);

c$=$_T(java.io,"FileNotFoundException",java.io.IOException);

c$=$_C(function(){
this.bytesTransferred=0;
$_Z(this,arguments);
},java.io,"InterruptedIOException",java.io.IOException);

c$=$_T(java.io,"ObjectStreamException",java.io.IOException);

c$=$_C(function(){
this.classname=null;
$_Z(this,arguments);
},java.io,"InvalidClassException",java.io.ObjectStreamException);
$_K(c$,
function(className,detailMessage){
$_R(this,java.io.InvalidClassException,[detailMessage]);
this.classname=className;
},"~S,~S");
$_M(c$,"getMessage",
function(){
var msg=$_U(this,java.io.InvalidClassException,"getMessage",[]);
if(this.classname!=null){
msg=this.classname+';' + ' '+msg;
}return msg;
});

c$=$_T(java.io,"InvalidObjectException",java.io.ObjectStreamException);

c$=$_T(java.io,"NotActiveException",java.io.ObjectStreamException);

c$=$_T(java.io,"NotSerializableException",java.io.ObjectStreamException);

c$=$_C(function(){
this.eof=false;
this.length=0;
$_Z(this,arguments);
},java.io,"OptionalDataException",java.io.ObjectStreamException);

c$=$_T(java.io,"StreamCorruptedException",java.io.ObjectStreamException);

c$=$_T(java.io,"SyncFailedException",java.io.IOException);

c$=$_T(java.io,"UnsupportedEncodingException",java.io.IOException);

c$=$_T(java.io,"UTFDataFormatException",java.io.IOException);

c$=$_C(function(){
this.detail=null;
$_Z(this,arguments);
},java.io,"WriteAbortedException",java.io.ObjectStreamException);
$_K(c$,
function(detailMessage,rootCause){
$_R(this,java.io.WriteAbortedException,[detailMessage]);
this.detail=rootCause;
this.initCause(rootCause);
},"~S,Exception");
$_M(c$,"getMessage",
function(){
var msg=$_U(this,java.io.WriteAbortedException,"getMessage",[]);
if(this.detail!=null){
msg=msg+"; "+this.detail.toString();
}return msg;
});
$_V(c$,"getCause",
function(){
return this.detail;
});

c$=$_T(java.util,"ConcurrentModificationException",RuntimeException);
$_K(c$,
function(){
$_R(this,java.util.ConcurrentModificationException,[]);
});

c$=$_T(java.util,"EmptyStackException",RuntimeException);

c$=$_C(function(){
this.className=null;
this.key=null;
$_Z(this,arguments);
},java.util,"MissingResourceException",RuntimeException);
$_K(c$,
function(detailMessage,className,resourceName){
$_R(this,java.util.MissingResourceException,[detailMessage]);
this.className=className;
this.key=resourceName;
},"~S,~S,~S");
$_M(c$,"getClassName",
function(){
return this.className;
});
$_M(c$,"getKey",
function(){
return this.key;
});

c$=$_T(java.util,"NoSuchElementException",RuntimeException);

c$=$_T(java.util,"TooManyListenersException",Exception);

c$=$_T(java.lang,"Void");
$_S(c$,
"TYPE",null);
{
java.lang.Void.TYPE=java.lang.Void;
}$_I(java.lang.reflect,"GenericDeclaration");
$_I(java.lang.reflect,"AnnotatedElement");

c$=$_T(java.lang.reflect,"AccessibleObject",null,java.lang.reflect.AnnotatedElement);
$_K(c$,
function(){
});
$_M(c$,"isAccessible",
function(){
return false;
});
c$.setAccessible=$_M(c$,"setAccessible",
function(objects,flag){
return;
},"~A,~B");
$_M(c$,"setAccessible",
function(flag){
return;
},"~B");
$_V(c$,"isAnnotationPresent",
function(annotationType){
return false;
},"Class");
$_V(c$,"getDeclaredAnnotations",
function(){
return new Array(0);
});
$_V(c$,"getAnnotations",
function(){
return new Array(0);
});
$_V(c$,"getAnnotation",
function(annotationType){
return null;
},"Class");
c$.marshallArguments=$_M(c$,"marshallArguments",
function(parameterTypes,args){
return null;
},"~A,~A");
$_M(c$,"invokeV",
function(receiver,args){
return;
},"~O,~A");
$_M(c$,"invokeL",
function(receiver,args){
return null;
},"~O,~A");
$_M(c$,"invokeI",
function(receiver,args){
return 0;
},"~O,~A");
$_M(c$,"invokeJ",
function(receiver,args){
return 0;
},"~O,~A");
$_M(c$,"invokeF",
function(receiver,args){
return 0.0;
},"~O,~A");
$_M(c$,"invokeD",
function(receiver,args){
return 0.0;
},"~O,~A");
c$.emptyArgs=c$.prototype.emptyArgs=new Array(0);
$_I(java.lang.reflect,"InvocationHandler");
c$=$_I(java.lang.reflect,"Member");
$_S(c$,
"PUBLIC",0,
"DECLARED",1);

c$=$_T(java.lang.reflect,"Modifier");
$_K(c$,
function(){
});
c$.isAbstract=$_M(c$,"isAbstract",
function(modifiers){
return((modifiers&1024)!=0);
},"~N");
c$.isFinal=$_M(c$,"isFinal",
function(modifiers){
return((modifiers&16)!=0);
},"~N");
c$.isInterface=$_M(c$,"isInterface",
function(modifiers){
return((modifiers&512)!=0);
},"~N");
c$.isNative=$_M(c$,"isNative",
function(modifiers){
return((modifiers&256)!=0);
},"~N");
c$.isPrivate=$_M(c$,"isPrivate",
function(modifiers){
return((modifiers&2)!=0);
},"~N");
c$.isProtected=$_M(c$,"isProtected",
function(modifiers){
return((modifiers&4)!=0);
},"~N");
c$.isPublic=$_M(c$,"isPublic",
function(modifiers){
return((modifiers&1)!=0);
},"~N");
c$.isStatic=$_M(c$,"isStatic",
function(modifiers){
return((modifiers&8)!=0);
},"~N");
c$.isStrict=$_M(c$,"isStrict",
function(modifiers){
return((modifiers&2048)!=0);
},"~N");
c$.isSynchronized=$_M(c$,"isSynchronized",
function(modifiers){
return((modifiers&32)!=0);
},"~N");
c$.isTransient=$_M(c$,"isTransient",
function(modifiers){
return((modifiers&128)!=0);
},"~N");
c$.isVolatile=$_M(c$,"isVolatile",
function(modifiers){
return((modifiers&64)!=0);
},"~N");
c$.toString=$_M(c$,"toString",
function(modifiers){
var sb=new Array(0);
if(java.lang.reflect.Modifier.isPublic(modifiers))sb[sb.length]="public";
if(java.lang.reflect.Modifier.isProtected(modifiers))sb[sb.length]="protected";
if(java.lang.reflect.Modifier.isPrivate(modifiers))sb[sb.length]="private";
if(java.lang.reflect.Modifier.isAbstract(modifiers))sb[sb.length]="abstract";
if(java.lang.reflect.Modifier.isStatic(modifiers))sb[sb.length]="static";
if(java.lang.reflect.Modifier.isFinal(modifiers))sb[sb.length]="final";
if(java.lang.reflect.Modifier.isTransient(modifiers))sb[sb.length]="transient";
if(java.lang.reflect.Modifier.isVolatile(modifiers))sb[sb.length]="volatile";
if(java.lang.reflect.Modifier.isSynchronized(modifiers))sb[sb.length]="synchronized";
if(java.lang.reflect.Modifier.isNative(modifiers))sb[sb.length]="native";
if(java.lang.reflect.Modifier.isStrict(modifiers))sb[sb.length]="strictfp";
if(java.lang.reflect.Modifier.isInterface(modifiers))sb[sb.length]="interface";
if(sb.length>0){
return sb.join(" ");
}return"";
},"~N");
$_S(c$,
"PUBLIC",0x1,
"PRIVATE",0x2,
"PROTECTED",0x4,
"STATIC",0x8,
"FINAL",0x10,
"SYNCHRONIZED",0x20,
"VOLATILE",0x40,
"TRANSIENT",0x80,
"NATIVE",0x100,
"INTERFACE",0x200,
"ABSTRACT",0x400,
"STRICT",0x800,
"BRIDGE",0x40,
"VARARGS",0x80,
"SYNTHETIC",0x1000,
"ANNOTATION",0x2000,
"ENUM",0x4000);

c$=$_C(function(){
this.clazz=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
$_Z(this,arguments);
},java.lang.reflect,"Constructor",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
$_K(c$,
function(declaringClass,parameterTypes,checkedExceptions,modifiers){
$_R(this,java.lang.reflect.Constructor,[]);
this.clazz=declaringClass;
this.parameterTypes=parameterTypes;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~A,~A,~N");
$_V(c$,"getTypeParameters",
function(){
return null;
});
$_M(c$,"toGenericString",
function(){
return null;
});
$_M(c$,"getGenericParameterTypes",
function(){
return null;
});
$_M(c$,"getGenericExceptionTypes",
function(){
return null;
});
$_M(c$,"getParameterAnnotations",
function(){
return null;
});
$_M(c$,"isVarArgs",
function(){
return false;
});
$_V(c$,"isSynthetic",
function(){
return false;
});
$_V(c$,"equals",
function(object){
if(object!=null&&$_O(object,java.lang.reflect.Constructor)){
var other=object;
if(this.getDeclaringClass()===other.getDeclaringClass()){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
},"~O");
$_V(c$,"getDeclaringClass",
function(){
return this.clazz;
});
$_M(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
$_V(c$,"getModifiers",
function(){
return this.modifiers;
});
$_V(c$,"getName",
function(){
return this.getDeclaringClass().getName();
});
$_M(c$,"getParameterTypes",
function(){
return this.parameterTypes;
});
$_V(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode();
});
$_M(c$,"newInstance",
function(args){
var instance=new this.clazz($_G);
$_Z(instance,args);
return instance;
},"~A");
$_V(c$,"toString",
function(){
return null;
});

c$=$_T(java.lang.reflect,"Field",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
$_V(c$,"isSynthetic",
function(){
return false;
});
$_M(c$,"toGenericString",
function(){
return null;
});
$_M(c$,"isEnumConstant",
function(){
return false;
});
$_M(c$,"getGenericType",
function(){
return null;
});
$_V(c$,"equals",
function(object){
return false;
},"~O");
$_V(c$,"getDeclaringClass",
function(){
return null;
});
$_V(c$,"getName",
function(){
return null;
});
$_M(c$,"getType",
function(){
return null;
});
$_V(c$,"hashCode",
function(){
return 0;
});
$_V(c$,"toString",
function(){
return null;
});

c$=$_C(function(){
this.clazz=null;
this.name=null;
this.returnType=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
$_Z(this,arguments);
},java.lang.reflect,"Method",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
$_K(c$,
function(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers){
$_R(this,java.lang.reflect.Method,[]);
this.clazz=declaringClass;
this.name=name;
this.parameterTypes=parameterTypes;
this.returnType=returnType;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~S,~A,Class,~A,~N");
$_V(c$,"getTypeParameters",
function(){
return null;
});
$_M(c$,"toGenericString",
function(){
return null;
});
$_M(c$,"getGenericParameterTypes",
function(){
return null;
});
$_M(c$,"getGenericExceptionTypes",
function(){
return null;
});
$_M(c$,"getGenericReturnType",
function(){
return null;
});
$_M(c$,"getParameterAnnotations",
function(){
return null;
});
$_M(c$,"isVarArgs",
function(){
return false;
});
$_M(c$,"isBridge",
function(){
return false;
});
$_V(c$,"isSynthetic",
function(){
return false;
});
$_M(c$,"getDefaultValue",
function(){
return null;
});
$_V(c$,"equals",
function(object){
if(object!=null&&$_O(object,java.lang.reflect.Method)){
var other=object;
if((this.getDeclaringClass()===other.getDeclaringClass())&&(this.getName()===other.getName())){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
},"~O");
$_V(c$,"getDeclaringClass",
function(){
return this.clazz;
});
$_M(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
$_V(c$,"getModifiers",
function(){
return this.modifiers;
});
$_V(c$,"getName",
function(){
return this.name;
});
$_M(c$,"getParameterTypes",
function(){
return this.parameterTypes;
});
$_M(c$,"getReturnType",
function(){
return this.returnType;
});
$_V(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode()^this.getName().hashCode();
});
$_M(c$,"invoke",
function(receiver,args){
var m=this.clazz.prototype[this.getName()];
if(m==null){
m=this.clazz[this.getName()];
}
if(m!=null){
m.apply(receiver,args);
}else{

}
},"~O,~A");
$_V(c$,"toString",
function(){
return null;
});
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
transport.onreadystatechange=NullObject;
transport=null;
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
var l=window.location;
this.transport.setRequestHeader("Referer",
l.protocol+"//"+l.host+(l.port!=""?":"+l.port:"")+"/");
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

this.transport.onreadystatechange=NullObject;
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
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"IXHRCallback");
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SWTHelper");
c$.syncExec=$_M(c$,"syncExec",
function(disp,runnable){
if(disp==null||disp.isDisposed()){
runnable.run();
}else{
try{
disp.syncExec(runnable);
}catch(e){
if($_O(e,NullPointerException)){
runnable.run();
}else{
throw e;
}
}
}},"$wt.widgets.Display,Runnable");
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.IXHRCallback"],"net.sf.j2s.ajax.XHRCallbackAdapter",null,function(){
c$=$_T(net.sf.j2s.ajax,"XHRCallbackAdapter",null,net.sf.j2s.ajax.IXHRCallback);
$_V(c$,"onLoaded",
function(){
});
$_V(c$,"onReceiving",
function(){
});
$_V(c$,"onSent",
function(){
});
$_V(c$,"onOpen",
function(){
});
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.IXHRCallback"],"net.sf.j2s.ajax.XHRCallbackSWTAdapter",null,function(){
c$=$_T(net.sf.j2s.ajax,"XHRCallbackSWTAdapter",null,net.sf.j2s.ajax.IXHRCallback);
$_M(c$,"swtOnLoaded",
function(){
});
$_M(c$,"swtOnReceiving",
function(){
});
$_M(c$,"swtOnSent",
function(){
});
$_M(c$,"swtOnOpen",
function(){
});
$_V(c$,"onLoaded",
function(){
this.swtOnLoaded();
});
$_V(c$,"onReceiving",
function(){
this.swtOnReceiving();
});
$_V(c$,"onSent",
function(){
this.swtOnSent();
});
$_V(c$,"onOpen",
function(){
this.swtOnOpen();
});
});
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SimpleSerializable",null,Cloneable);
$_M(c$,"serialize",
function(){
var baseChar='B'.charCodeAt(0);
var buffer=[];
buffer[0]="WLL201";
var oClass=this.getClass();
var clazz=oClass;
var clazzName=clazz.getName();
var idx=-1;
while((idx=clazzName.lastIndexOf('$'))!=-1){
if(clazzName.length>idx+1){
var ch=clazzName.charCodeAt(idx+1);
if(ch<48||ch>=58){
break;
}
}
clazz=clazz.getSuperclass();
if(clazz==null){
break;
}
clazzName=clazz.getName();
}
buffer[1]=clazzName;
buffer[2]='#';
buffer[3]="00000000$"
var headSize=buffer.join('').length;
var fields=oClass.declared$Fields;
if(fields==null){
fields=[];
}
var filter=arguments[0];
var ignoring=(filter==null||filter.ignoreDefaultFields());
var fMap=this.fieldMapping();
for(var i=0;i<fields.length;i++){
var field=fields[i];
var name=field.name;
if(filter!=null&&!filter.accept(name))continue;
var fName=name;
if(fMap!=null&&fMap.length>1){
for(var j=0;j<fMap.length/2;j++){
if(name==fMap[j+j]){
var newName=fMap[j+j+1];
if(newName!=null&&newName.length>0){
fName=newName;
}
break;
}
}
}
var nameStr=String.fromCharCode(baseChar+fName.length)+fName;
var type=field.type;
if(type=='F' || type == 'D' || type == 'I' || type == 'L'
||type=='S' || type == 'B' || type == 'b'){
if(ignoring&&this[name]==0
&&(type=='F' || type == 'D' || type == 'I'
||type=='L' || type == 'S' || type == 'B')){
continue;
}
if(ignoring&&this[name]==false&&type=='b'){
continue;
}
buffer[buffer.length]=nameStr;
buffer[buffer.length]=type;
var value=null;
if(type=='b'){
value=(this[name]==true)?"1":"0";
}else{
value=""+this[name];
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(type=='C'){
if(ignoring&&this[name]==0||this[name]=='\0'){
continue;
}
buffer[buffer.length]=nameStr;
buffer[buffer.length]=type;
var value="";
if(typeof this[name]=='number'){
value+=this[name];
}else{
value+=this[name].charCodeAt(0);
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(type=='s'){
if(ignoring&&this[name]==null){
continue;
}
buffer[buffer.length]=nameStr;
this.serializeString(buffer,this[name]);
}else if(type.charAt(0)=='A'){
if(this[name]==null){
if(ignoring){
continue;
}
buffer[buffer.length]=nameStr;
buffer[buffer.length]=String.fromCharCode(baseChar-1);
}else{
buffer[buffer.length]=nameStr;
buffer[buffer.length]=type;
var l4=this[name].length;
if(l4>52){
if(l4>0x4000){
throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
}
buffer[buffer.length]=String.fromCharCode(baseChar-2);
var value=""+l4;
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=l4;
}else{
buffer[buffer.length]=String.fromCharCode(baseChar+l4);
}
var t=type.charAt(1);
var arr=this[name];
for(var j=0;j<arr.length;j++){
if(t=='F' || t == 'D' || t == 'I' || t == 'L'
||t=='S' || t == 'B' || t == 'b'){
var value=null;
if(type=='b'){
value=(arr[j]==true)?"1":"0";
}else{
value=""+arr[j];
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(t=='C'){
var value="";
if(typeof arr[j]=='number'){
value+=arr[j];
}else{
value+=arr[j].charCodeAt(0);
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(t=='X'){
this.serializeString(buffer,arr[j]);
}
}
}
}
}
var strBuf=buffer.join('');
var size=strBuf.length;
if(size>0x1000000){
throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
}
var sizeStr=""+(size-headSize);
strBuf=strBuf.substring(0,headSize-sizeStr.length-1)+sizeStr+strBuf.substring(headSize-1);
return strBuf;
});
$_M(c$,"serializeString",
($fz=function(buffer,s){
var baseChar='B'.charCodeAt(0);
if(s==null){
buffer[buffer.length]='s';
buffer[buffer.length]=String.fromCharCode(baseChar-1);
}else{
var normal=/^[\r\n\t\u0020-\u007e]*$/.test(s);
if(normal){
buffer[buffer.length]='s';
}else{
buffer[buffer.length]='u';
s=Encoding.encodeBase64(Encoding.convert2UTF8(s));
}
var l4=s.length;
if(l4>52){
buffer[buffer.length]=String.fromCharCode(baseChar-2);
var value=""+l4;
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=l4;
}else{
buffer[buffer.length]=String.fromCharCode(baseChar+l4);
}
buffer[buffer.length]=s;
}
},$fz.isPrivate=true,$fz),"StringBuffer,~S");
$_M(c$,"deserialize",
function(str){
var start=0;
if(arguments.length==2){
start=arguments[1];
}
var baseChar='B'.charCodeAt(0);
if(str==null||start<0)return false;
var length=str.length-start;
if(length<=7||str.substring(start,start+3)!="WLL")return false;
var index=str.indexOf('#',start);
if(index==-1)return false;
index++;
if(index>=length+start)return false;
var size=0;
var nextCharCode=str.charCodeAt(index);
if(nextCharCode>=48&&nextCharCode<=57){
var last=index;
index=str.indexOf('$',last);
if(index==-1)return false;
var sizeStr=str.substring(last+1,index);
sizeStr=sizeStr.replace(/^0+/,'');
if(sizeStr.length!=0){
try{
size=parseInt(sizeStr);
}catch(e){}
}

if(size==0)return true;
index++;
if(size>length+start-index)return false;
}
var fieldMap=[];
var fields=this.getClass().declared$Fields;
if(fields==null)return false;
for(var i=0;i<fields.length;i++){
var field=fields[i];
var name=field.name;
fieldMap[name]=true;
}
var end=index+size;
var fMap=this.fieldMapping();
while(index<start+length&&index<end){
var c1=str.charCodeAt(index++);
var l1=c1-baseChar;
if(l1<0)return true;
var fieldName=str.substring(index,index+l1);
if(fMap!=null&&fMap.length>1){
for(var i=0;i<fMap.length/2;i++){
if(fieldName==fMap[i+i+1]){
var trueName=fMap[i+i];
if(trueName!=null&&trueName.length>0){
fieldName=trueName;
}
break;
}
}
}
index+=l1;
var c2=str.charAt(index++);
if(c2=='A'){
var field=fieldMap[fieldName];
c2=str.charAt(index++);
var c3=str.charCodeAt(index++);
var l2=c3-baseChar;
if(l2<0&&l2!=-2){
if(!fieldMap[fieldName]){
continue;
}
this[fieldName]=null;
}else{
if(l2==-2){
var c4=str.charCodeAt(index++);
var l3=c4-baseChar;
if(l3<0)return true;
l2=parseInt(str.substring(index,index+l3));
if(l2>0x4000){
throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
}
index+=l3;
}
var arr=new Array(l2);
var type=c2;
for(var i=0;i<l2;i++){
var s=null;
var c4=str.charCodeAt(index++);
if(c2!='X'){
var l3=c4-baseChar;
if(l3>0){
s=str.substring(index,index+l3);
index+=l3;
}
}else{
var c5=str.charCodeAt(index++);
var l3=c5-baseChar;
if(l3>0){
s=str.substring(index,index+l3);
index+=l3;
}else if(l3==-2){
var c6=str.charCodeAt(index++);
var l4=c6-baseChar;
if(l4<0)return true;
var l5=parseInt(str.substring(index,index+l4));
if(l5<0)return true;
index+=l4;
s=str.substring(index,index+l5);
index+=l5;
}
if(c4==117){
s=Encoding.readUTF8(Encoding.decodeBase64(s));
}else if(c4==85){
s=Encoding.readUTF8(s);
}
}
if(type=='F' || type == 'D'){
arr[i]=parseFloat(s);
}else if(type=='I' || type == 'L'
||type=='S' || type == 'B'){
arr[i]=parseInt(s);
}else if(type=='C'){
arr[i]=String.fromCharCode(parseInt(s));
}else if(type=='b'){
arr[i]=(s.charAt(0)=='1' || s.charAt (0) == 't');
}else if(type=='X'){
arr[i]=s;
}
}
if(!fieldMap[fieldName]){
continue;
}
this[fieldName]=arr;
}
}else{
var c3=str.charCodeAt(index++);
var l2=c3-baseChar;
var s=null;
if(l2>0){
s=str.substring(index,index+l2);
index+=l2;
}else if(l2==-2){
var c4=str.charCodeAt(index++);
var l3=c4-baseChar;
if(l3<0)return true;
var l4=parseInt(str.substring(index,index+l3));
if(l4<0)return true;
index+=l3;
s=str.substring(index,index+l4);
index+=l4;
}
if(!fieldMap[fieldName]){
continue;
}
var type=c2;
if(type=='F' || type == 'D'){
this[fieldName]=parseFloat(s);
}else if(type=='I' || type == 'L'
||type=='S' || type == 'B'){
this[fieldName]=parseInt(s);
}else if(type=='C'){
this[fieldName]=String.fromCharCode(parseInt(s));
}else if(type=='b'){
this[fieldName]=(s.charAt(0)=='1' || s.charAt (0) == 't');
}else if(type=='s'){
this[fieldName]=s;
}else if(type=='u'){
this[fieldName]=Encoding.readUTF8(Encoding.decodeBase64(s));
}else if(type=='U'){
this[fieldName]=Encoding.readUTF8(s);
}
}
}
return true;
},"~S");
$_M(c$,"fieldMapping",
function(){
return null;
});
c$.parseInstance=$_M(c$,"parseInstance",
function(str){
var start=0;
if(arguments.length==2){
start=arguments[1];
}
if(str==null||start<0)return null;
var length=str.length-start;
if(length<=7||str.substring(start,start+3)!="WLL")return null;
var index=str.indexOf('#',start);
if(index==-1)return null;
var clazzName=str.substring(start+6,index);
clazzName=clazzName.replace(/\$/g,'.');
var runnableClass=null;
if($_D(clazzName)){
runnableClass=Clazz.evalType(clazzName);
}
if(runnableClass!=null){
var obj=new runnableClass($_G);
if(obj!=null&&$_O(obj,
net.sf.j2s.ajax.SimpleSerializable)){
return obj;
}
}
return null;
},"~S");
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"SimpleFilter");
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleSerializable"],"net.sf.j2s.ajax.SimpleRPCRunnable",null,function(){
c$=$_T(net.sf.j2s.ajax,"SimpleRPCRunnable",net.sf.j2s.ajax.SimpleSerializable);
$_M(c$,"getHttpURL",
function(){
return"simplerpc";
});
$_M(c$,"getHttpMethod",
function(){
return"POST";
});
$_M(c$,"ajaxIn",
function(){
});
$_M(c$,"ajaxOut",
function(){
});
$_M(c$,"ajaxFail",
function(){
});
});
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"ISimpleRequestInfoBinding");
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"ISimpleRequestInfo");
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"ISimpleGeoLocationBinding");
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"ISimpleGeoLocation");
$_J("net.sf.j2s.ajax");
$_L(null,"net.sf.j2s.ajax.SimpleRPCRequest",["java.net.URLEncoder","net.sf.j2s.ajax.HttpRequest","$.XHRCallbackAdapter"],function(){
c$=$_T(net.sf.j2s.ajax,"SimpleRPCRequest");
c$.getRequstMode=$_M(c$,"getRequstMode",
function(){
return net.sf.j2s.ajax.SimpleRPCRequest.runningMode;
});
c$.switchToAJAXMode=$_M(c$,"switchToAJAXMode",
function(){
($t$=net.sf.j2s.ajax.SimpleRPCRequest.runningMode=1,net.sf.j2s.ajax.SimpleRPCRequest.prototype.runningMode=net.sf.j2s.ajax.SimpleRPCRequest.runningMode,$t$);
});
c$.switchToLocalJavaThreadMode=$_M(c$,"switchToLocalJavaThreadMode",
function(){
($t$=net.sf.j2s.ajax.SimpleRPCRequest.runningMode=2,net.sf.j2s.ajax.SimpleRPCRequest.prototype.runningMode=net.sf.j2s.ajax.SimpleRPCRequest.runningMode,$t$);
});
c$.request=$_M(c$,"request",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimpleRPCRequest.ajaxRequest(runnable);
},"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.getClassNameURL=$_M(c$,"getClassNameURL",
function(runnable){
var oClass=runnable.getClass();
var name=oClass.getName();
while(name.indexOf('$')!=-1){
oClass=oClass.getSuperclass();
if(oClass==null){
return null;
}name=oClass.getName();
}
return name;
},"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.ajaxRequest=$_M(c$,"ajaxRequest",
($fz=function(runnable){
var url=runnable.getHttpURL();
if(url==null){
url="";
}var method=runnable.getHttpMethod();
var serialize=runnable.serialize();
if(method==null){
method="POST";
}if(net.sf.j2s.ajax.SimpleRPCRequest.checkXSS(url,serialize,runnable)){
return;
}var url2=net.sf.j2s.ajax.SimpleRPCRequest.adjustRequestURL(method,url,serialize);
if(url2!==url){
serialize=null;
}var request=new net.sf.j2s.ajax.HttpRequest();
request.open(method,url,true);
request.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimpleRPCRequest$2")?0:net.sf.j2s.ajax.SimpleRPCRequest.$SimpleRPCRequest$2$()),$_N(net.sf.j2s.ajax.SimpleRPCRequest$2,this,$_F("request",request,"runnable",runnable))));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.adjustRequestURL=$_M(c$,"adjustRequestURL",
function(method,url,serialize){
if("GET".equals(method.toUpperCase())){
try{
var query=java.net.URLEncoder.encode(serialize,"UTF-8");
if(url.indexOf('?')!=-1){
url+="&jzz="+query;
}else{
url+="?"+query;
}}catch(e){
if($_O(e,java.io.UnsupportedEncodingException)){
}else{
throw e;
}
}
}return url;
},"~S,~S,~S");
c$.isXSSMode=$_M(c$,"isXSSMode",
function(url){
if(url!=null&&(url.indexOf("http://")==0
||url.indexOf("https://")==0)){
var host=null;
var idx1=url.indexOf("//")+2;
var idx2=url.indexOf('/',9);
if(idx2!=-1){
host=url.substring(idx1,idx2);
}else{
host=url.substring(idx1);
}
var protocol=null;
var idx0=url.indexOf("://");
if(idx0!=-1){
protocol=url.substring(0,idx0+1);
}else{
protocol=window.location.protocol;
}
var port=null;
var idx3=host.indexOf(':');
if(idx3!=-1){
port=parseInt(host.substring(idx3+1));
host=host.substring(0,idx3);
}else{
if("http:"==protocol){
port=80;
}else if("https:"==protocol){
port=443;
}else{
port=window.location.port;
if(port!=""){
port=parseInt(port);
}
}
}
var loc=window.location;
var locPort=loc.port;
if(locPort==""){
if("http:"==loc.protocol){
locPort=80;
}else if("https:"==loc.protocol){
locPort=443;
}
}else{
locPort=parseInt(locPort);
}
var locHost=null;
try{
locHost=loc.host;
}catch(e){
if(arguments.length==2){
return false;
}
return true;
}
var idx4=locHost.indexOf(":");
if(idx4!=-1){
locHost=locHost.substring(0,idx4);
}
if(arguments.length==2){
return host.indexOf("."+locHost)!=-1&&locPort==port
&&loc.protocol==protocol&&loc.protocol!="file:";
}
return(locHost!=host||locPort!=port
||loc.protocol!=protocol||loc.protocol=="file:");
}
return false;
},"~S");
c$.isSubdomain=$_M(c$,"isSubdomain",
function(url){
return window["j2s.disable.subdomain.xss"]!=true
&&net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url,true);
},"~S");
c$.checkXSS=$_M(c$,"checkXSS",
function(url,serialize,runnable){
{
if(net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url)){
if(runnable.$fai13d$==true){
runnable.$fai13d$=false;
}
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(g.idSet==null){
g.idSet=new Object();
}
var rnd=null;
while(true){
var rnd=Math.random()+"0000000.*";
rnd=rnd.substring(2,8);
if(g.idSet["o"+rnd]==null){
g.idSet["o"+rnd]=runnable;
break;
}
}
var limit=7168;
if(window["script.get.url.limit"]!=null){
limit=window["script.get.url.limit"];
}
var ua=navigator.userAgent.toLowerCase();
if(ua.indexOf("msie")!=-1&&ua.indexOf("opera")==-1){
limit=2048-44;
}
limit-=url.length+36;
var contents=[];
var content=encodeURIComponent(serialize);
if(content.length>limit){
parts=Math.ceil(content.length/limit);
var lastEnd=0;
for(var i=0;i<parts;i++){
var end=(i+1)*limit;
if(end>content.length){
end=content.length;
}else{
for(var j=0;j<3;j++){
var ch=content.charAt(end-j);
if(ch=='%'){
end-=j;
break;
}
}
}
contents[i]=content.substring(lastEnd,end);
lastEnd=end;
}
}else{
contents[0]=content;
}
if(contents.length>1){
g.idSet["x"+rnd]=contents;
}


net.sf.j2s.ajax.SimpleRPCRequest.callByScript(rnd,contents.length,0,contents[0]);
contents[0]=null;
return true;
}
}return false;
},"~S,~S,net.sf.j2s.ajax.SimpleRPCRunnable");
c$.cleanUp=$_M(c$,"cleanUp",
function(scriptObj){
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
if(isIE){
if(scriptObj.onreadystatechange==null){
return false;
}
var done=false;
var state=""+scriptObj.readyState;
if(state=="loaded"||state=="complete"){
scriptObj.onreadystatechange=null;
done=true;
}
return done;
}else{
if(scriptObj.onerror==null){
return false;
}
scriptObj.onerror=null;
scriptObj.onload=null;
return true;
}
},"~O");
c$.generateCallback4Script=$_M(c$,"generateCallback4Script",
function(script,rnd,error){
return function(){
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(!g.cleanUp(script)){
return;
}
if(error){
var src=script.src;
var idx=src.indexOf("jzn=");
var rid=src.substring(idx+4,src.indexOf("&",idx));
net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(rid,null);
}
if(script.onerror!=null){
script.onerror=script.onload=null;
}else{
script.onreadystatechange=null;
}
document.getElementsByTagName("HEAD")[0].removeChild(script);
script=null;
};
},"~O,~S,~B");
c$.callByScript=$_M(c$,"callByScript",
function(rnd,length,i,content){
var g=net.sf.j2s.ajax.SimpleRPCRequest;
var runnable=g.idSet["o"+rnd];
if(runnable==null)return;
var url=runnable.getHttpURL();
var session=g.idSet["s"+rnd];
if(session!=null&&window["script.get.session.url"]!=false){
url+=";jsessionid="+session;
}
var script=document.createElement("SCRIPT");
script.type="text/javascript";
script.src=url+"?jzn="+rnd
+(length==1?"":("&jzp="+length+(i==0?"":"&jzc="+(i+1))))
+"&jzz="+content;
var okFun=g.generateCallback4Script(script,rnd,false);
var errFun=g.generateCallback4Script(script,rnd,true);
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
script.defer=true;
if(typeof(script.onreadystatechange)=="undefined"||!isIE){
script.onerror=errFun;
script.onload=okFun;
}else{
script.onreadystatechange=okFun;
}
var head=document.getElementsByTagName("HEAD")[0];
head.appendChild(script);
var timeout=30000;
if(window["j2s.ajax.reqeust.timeout"]!=null){
timeout=window["j2s.ajax.reqeust.timeout"];
}
if(timeout<1000){
timeout=1000;
}
g.idSet["h"+rnd]=window.setTimeout(errFun,timeout);
},"~S,~S,~S,~S");
c$.ieScriptCleanup=$_M(c$,"ieScriptCleanup",
function(){
var state=""+this.readyState;
if(state=="loaded"||state=="complete"){
this.onreadystatechange=null;
document.getElementsByTagName("HEAD")[0].removeChild(this);
}
});
c$.xssNotify=$_M(c$,"xssNotify",
function(nameID,response,session){
{
var ua=navigator.userAgent.toLowerCase();
if(response!=null&&ua.indexOf("msie")!=-1&&ua.indexOf("opera")==-1){
var ss=document.getElementsByTagName("SCRIPT");
for(var i=0;i<ss.length;i++){
var s=ss[i];
if(s.src!=null&&s.src.indexOf("jzn="+nameID)!=-1
&&s.readyState=="interactive"){
s.onreadystatechange=net.sf.j2s.ajax.SimpleRPCRequest.ieScriptCleanup;
}
}
}
var hKey="h"+nameID;
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(g.idSet[hKey]!=null){
window.clearTimeout(g.idSet[hKey]);
delete g.idSet[hKey];
}
}if(response==="continue"){
{
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(session!=null){
g.idSet["s"+nameID]=session;
}
var k="x"+nameID;
var xcontent=g.idSet[k];
if(xcontent!=null){

for(var i=0;i<xcontent.length;i++){
if(xcontent[i]!=null){
g.callByScript(nameID,xcontent.length,i,xcontent[i]);
xcontent[i]=null;
break;
}
}
var more=false;
for(var i=xcontent.length-1;i>=0;i--){
if(xcontent[i]!=null){
more=true;
break;
}
}
if(!more){
g.idSet[k]=null;
delete g.idSet[k];
}
}
}return;
}var runnable=null;
{
var g=net.sf.j2s.ajax.SimpleRPCRequest;
var oK="o"+nameID;
runnable=g.idSet[oK];
g.idSet[oK]=null;
delete g.idSet[oK];
var sK="s"+nameID;
if(g.idSet[sK]!=null){
g.idSet[sK]=null;
delete g.idSet[sK];
}
if(response==null&&runnable!=null){
runnable.$fai13d$=true;
runnable.ajaxFail();
return;
}
}if(response==="unsupported"||response==="exceedrequestlimit"||response==="error"){
var src=null;
{
var existed=false;
var ss=document.getElementsByTagName("SCRIPT");
for(var i=0;i<ss.length;i++){
var s=ss[i];
if(s.src!=null&&s.src.indexOf("jzn="+nameID)!=-1){
src=s.src;
existed=true;
s.onreadystatechange=null;
s.onerror=null;
s.onload=null;
document.getElementsByTagName("HEAD")[0].removeChild(s);
}
}
if(!existed&&runnable==null){
return;
}
}if(runnable!=null){
runnable.ajaxFail();
}else{
if(response==="error"){
System.err.println("[Java2Script] Sever error: URL \""+src+"\" is semantically incorrect!");
}else if(response==="unsupported"){
System.err.println("[Java2Script] Sever error: Cross site script is not supported!");
}else{
System.err.println("[Java2Script] Sever error: Exceed cross site script request limit!");
}}return;
}if(runnable!=null){
{
if(runnable.$fai13d$==true){
return;
}
}runnable.deserialize(response);
runnable.ajaxOut();
}},"~S,~S,~S");
c$.$SimpleRPCRequest$2$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCRequest$2",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
function(){
var responseText=this.f$.request.getResponseText();
if(responseText==null||responseText.length==0){
this.f$.runnable.ajaxFail();
return;
}this.f$.runnable.deserialize(responseText);
this.f$.runnable.ajaxOut();
});
c$=$_P();
};
$_S(c$,
"MODE_AJAX",1,
"MODE_LOCAL_JAVA_THREAD",2,
"runningMode",2);
{
var ajax=false;
{
ajax=true;
}if(ajax){
($t$=net.sf.j2s.ajax.SimpleRPCRequest.runningMode=1,net.sf.j2s.ajax.SimpleRPCRequest.prototype.runningMode=net.sf.j2s.ajax.SimpleRPCRequest.runningMode,$t$);
}}});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRequest"],"net.sf.j2s.ajax.SimpleRPCSWTRequest",["net.sf.j2s.ajax.HttpRequest","$.XHRCallbackSWTAdapter"],function(){
c$=$_T(net.sf.j2s.ajax,"SimpleRPCSWTRequest",net.sf.j2s.ajax.SimpleRPCRequest);
c$.swtRequest=$_M(c$,"swtRequest",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimpleRPCRequest.ajaxRequest(runnable);
},"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.swtAJAXRequest=$_M(c$,"swtAJAXRequest",
($fz=function(runnable){
var url=runnable.getHttpURL();
var method=runnable.getHttpMethod();
var serialize=runnable.serialize();
if(method==null){
method="POST";
}if(net.sf.j2s.ajax.SimpleRPCRequest.checkXSS(url,serialize,runnable)){
return;
}var url2=net.sf.j2s.ajax.SimpleRPCRequest.adjustRequestURL(method,url,serialize);
if(url2!==url){
serialize=null;
}var request=new net.sf.j2s.ajax.HttpRequest();
request.open(method,url,true);
request.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimpleRPCSWTRequest$3")?0:net.sf.j2s.ajax.SimpleRPCSWTRequest.$SimpleRPCSWTRequest$3$()),$_N(net.sf.j2s.ajax.SimpleRPCSWTRequest$3,this,$_F("request",request,"runnable",runnable))));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.$SimpleRPCSWTRequest$3$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCSWTRequest$3",net.sf.j2s.ajax.XHRCallbackSWTAdapter);
$_V(c$,"swtOnLoaded",
function(){
var responseText=this.f$.request.getResponseText();
if(responseText==null||responseText.length==0){
this.f$.runnable.ajaxFail();
return;
}this.f$.runnable.deserialize(responseText);
this.f$.runnable.ajaxOut();
});
c$=$_P();
};
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRunnable"],"net.sf.j2s.ajax.SimplePipeRunnable",["net.sf.j2s.ajax.SimplePipeHelper","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.pipeKey=null;
this.pipeAlive=false;
this.destroyed=false;
this.queryFailedRetries=0;
this.queryEnded=false;
this.lastPipeDataReceived=0;
$_Z(this,arguments);
},net.sf.j2s.ajax,"SimplePipeRunnable",net.sf.j2s.ajax.SimpleRPCRunnable);
$_M(c$,"getPipeURL",
function(){
return"simplepipe";
});
$_M(c$,"getPipeMethod",
function(){
return"GET";
});
$_V(c$,"ajaxIn",
function(){
this.pipeInit();
});
$_V(c$,"ajaxFail",
function(){
this.pipeFailed();
});
$_V(c$,"ajaxOut",
function(){
if(this.pipeAlive){
this.pipeCreated();
}else{
this.pipeFailed();
}});
$_M(c$,"pipeDestroy",
function(){
if(this.destroyed){
return false;
}this.pipeAlive=false;
this.destroyed=true;
if(this.pipeKey!=null){
net.sf.j2s.ajax.SimplePipeHelper.removePipe(this.pipeKey);
this.pipeKey=null;
}return true;
});
$_M(c$,"pipeInit",
function(){
this.queryFailedRetries=0;
this.lastPipeDataReceived=-1;
});
$_M(c$,"pipeCreated",
function(){
this.destroyed=false;
});
$_M(c$,"pipeFailed",
function(){
this.pipeDestroy();
});
$_M(c$,"pipeLost",
function(){
this.pipeDestroy();
});
$_M(c$,"pipeClosed",
function(){
this.pipeDestroy();
});
$_M(c$,"pipeReset",
function(){
this.destroyed=false;
});
$_M(c$,"isPipeLive",
function(){
return this.pipeAlive&&!this.destroyed&&this.pipeKey!=null;
});
$_M(c$,"keepPipeLive",
function(){
});
$_M(c$,"updateStatus",
function(live){
if(live){
this.keepPipeLive();
this.pipeAlive=true;
}else if(this.isPipeLive()){
this.pipeDestroy();
this.pipeAlive=false;
}},"~B");
$_M(c$,"deal",
function(ss){
try{
var clazz=ss.getClass();
if("net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())){
return true;
}var method=null;
var clzz=this.getClass();
var clazzName=clzz.getName();
var idx=-1;
while((idx=clazzName.lastIndexOf('$'))!=-1){
if(clazzName.length>idx+1){
var ch=clazzName.charAt(idx+1);
if((ch).charCodeAt(0)<('0').charCodeAt (0) || (ch).charCodeAt (0) > ('9').charCodeAt(0)){
break;
}}clzz=clzz.getSuperclass();
if(clzz==null){
break;
}clazzName=clzz.getName();
}
if(clzz!=null){
method=clzz.getMethod("deal",[clazz]);
if(method!=null){
var returnType=method.getReturnType();
if(returnType===Boolean){
var result=method.invoke(this,[ss]);
return(result).booleanValue();
}}}}catch(e){
if($_O(e,Exception)){
e.printStackTrace();
}else{
throw e;
}
}
return false;
},"net.sf.j2s.ajax.SimpleSerializable");
$_s(c$,"pipeKey","s","pipeAlive","b");
});
$_J("net.sf.j2s.ajax");
c$=$_I(net.sf.j2s.ajax,"ISimplePipePriority");
$_S(c$,
"IMPORTANT",32,
"NORMAL",8,
"TRIVIAL",1);
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SimplePipeHelper");
c$.registerPipe=$_M(c$,"registerPipe",
function(key,pipe){
if(key==null||pipe==null)return;
if(net.sf.j2s.ajax.SimplePipeHelper.pipes==null){
net.sf.j2s.ajax.SimplePipeHelper.pipes=new Object();
}
net.sf.j2s.ajax.SimplePipeHelper.pipes[key]=pipe;
},"~S,net.sf.j2s.ajax.SimplePipeRunnable");
c$.removePipe=$_M(c$,"removePipe",
function(key){
delete net.sf.j2s.ajax.SimplePipeHelper.pipes[key];
},"~S");
c$.getPipe=$_M(c$,"getPipe",
function(key){
var ps=net.sf.j2s.ajax.SimplePipeHelper.pipes;
if(ps==null||key==null)return null;
return ps[key];
},"~S");
$_I(net.sf.j2s.ajax.SimplePipeHelper,"IPipeThrough");
$_I(net.sf.j2s.ajax.SimplePipeHelper,"IPipeClosing");
$_S(c$,
"pipes",null);
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRequest"],"net.sf.j2s.ajax.SimplePipeRequest",["net.sf.j2s.ajax.HttpRequest","$.SimplePipeHelper","$.SimpleSerializable","$.XHRCallbackAdapter"],function(){
c$=$_T(net.sf.j2s.ajax,"SimplePipeRequest",net.sf.j2s.ajax.SimpleRPCRequest);
c$.getPipeMode=$_M(c$,"getPipeMode",
function(){
return net.sf.j2s.ajax.SimplePipeRequest.pipeMode;
});
c$.getQueryInterval=$_M(c$,"getQueryInterval",
function(){
return net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval;
});
c$.switchToQueryMode=$_M(c$,"switchToQueryMode",
function(){
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeMode=3,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeMode=net.sf.j2s.ajax.SimplePipeRequest.pipeMode,$t$);
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval=1000,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeQueryInterval=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval,$t$);
});
c$.switchToQueryMode=$_M(c$,"switchToQueryMode",
function(ms){
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeMode=3,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeMode=net.sf.j2s.ajax.SimplePipeRequest.pipeMode,$t$);
if(ms<0){
ms=1000;
}($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval=ms,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeQueryInterval=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval,$t$);
},"~N");
c$.switchToContinuumMode=$_M(c$,"switchToContinuumMode",
function(){
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeMode=4,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeMode=net.sf.j2s.ajax.SimplePipeRequest.pipeMode,$t$);
});
c$.constructRequest=$_M(c$,"constructRequest",
function(pipeKey,pipeRequestType,rand){
($t$=net.sf.j2s.ajax.SimplePipeRequest.reqCount++,net.sf.j2s.ajax.SimplePipeRequest.prototype.reqCount=net.sf.j2s.ajax.SimplePipeRequest.reqCount,$t$);
return"k"+"="+pipeKey+"&"+"t"+"="+pipeRequestType+(rand?"&"+"r"+"="+net.sf.j2s.ajax.SimplePipeRequest.reqCount:"");
},"~S,~S,~B");
c$.sendRequest=$_M(c$,"sendRequest",
function(request,method,url,data,async){
if("GET".equals(method.toUpperCase())){
request.open(method,url+(url.indexOf('?')!=-1?"&":"?")+data,async);
request.send(null);
}else{
request.open(method,url,async);
request.send(data);
}},"net.sf.j2s.ajax.HttpRequest,~S,~S,~S,~B");
c$.pipe=$_M(c$,"pipe",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimplePipeRequest.pipeRequest(runnable);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeRequest=$_M(c$,"pipeRequest",
($fz=function(runnable){
var url=runnable.getHttpURL();
var method=runnable.getHttpMethod();
var serialize=runnable.serialize();
if(method==null){
method="POST";
}var ajaxOut=null;
{
ajaxOut=runnable.ajaxOut;
if(ajaxOut.wrapped!=true){
runnable.ajaxOut=(function(aO,r){
return function(){
aO.apply(r,[]);
r.ajaxOut=aO;
net.sf.j2s.ajax.SimplePipeRequest.ajaxPipe(r);
};
})(ajaxOut,runnable);
runnable.ajaxOut.wrapped=true;
}
}if(net.sf.j2s.ajax.SimpleRPCRequest.checkXSS(url,serialize,runnable)){
return;
}{
runnable.ajaxOut=ajaxOut;
}var url2=net.sf.j2s.ajax.SimpleRPCRequest.adjustRequestURL(method,url,serialize);
if(url2!==url){
serialize=null;
}var request=new net.sf.j2s.ajax.HttpRequest();
request.open(method,url,true);
request.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimplePipeRequest$3")?0:net.sf.j2s.ajax.SimplePipeRequest.$SimplePipeRequest$3$()),$_N(net.sf.j2s.ajax.SimplePipeRequest$3,this,$_F("request",request,"runnable",runnable))));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimplePipeRunnable");
c$.updatePipeByURL=$_M(c$,"updatePipeByURL",
function(pipeID,url){
if(url==null||url.length==0){
return;
}
var map=net.sf.j2s.ajax.SimplePipeRequest.pipeScriptMap;
var pipe=map[url];
if(pipe!=null&&pipeID!=null&&pipeID.length>0){
var stillExistedRequest=false;
var idPrefix=pipeID;
var idx=pipeID.lastIndexOf("-");
if(idx!=-1){
idPrefix=pipeID.substring(0,idx);
}
var iframes=document.getElementsByTagName("IFRAME");
for(var i=0;i<iframes.length;i++){
var el=iframes[i];
if(el.id!=null&&el.id.indexOf(idPrefix)==0){
stillExistedRequest=true;
break;
}
}
if(!stillExistedRequest){
var scripts=document.getElementsByTagName("SCRIPT");
for(var i=0;i<scripts.length;i++){
var el=scripts[i];
if(el.id!=null&&el.id.indexOf(idPrefix)==0){
stillExistedRequest=true;
break;
}
}
}
pipe.queryEnded=!stillExistedRequest;
delete map[url];
}
},"~S,~S");
c$.generatePipeScriptCallback=$_M(c$,"generatePipeScriptCallback",
function(pipeID){
return function(){
if(pipeID!=null){
var pw=window.parent;
if(pw==null||pw["net"]==null)return;
if(!pw.net.sf.j2s.ajax.SimpleRPCRequest.cleanUp(this)){
return;
}
var url=this.url;
this.url=null;
document.getElementsByTagName("HEAD")[0].removeChild(this);
var iframe=pw.document.getElementById(pipeID);
if(iframe!=null){
iframe.parentNode.removeChild(iframe);
}
pw.net.sf.j2s.ajax.SimplePipeRequest.updatePipeByURL(pipeID,url);
}else{
if(window==null||window["net"]==null)return;
if(!net.sf.j2s.ajax.SimpleRPCRequest.cleanUp(this)){
return;
}
var url=this.url;
this.url=null;
document.getElementsByTagName("HEAD")[0].removeChild(this);
net.sf.j2s.ajax.SimplePipeRequest.updatePipeByURL(pipeID,url);
}
};
},"~S");
c$.loadPipeScript=$_M(c$,"loadPipeScript",
function(url){
var script=document.createElement("SCRIPT");
script.type="text/javascript";
script.src=url;
script.url=url;
var pipeID=arguments[1];
if(pipeID!=null&&pipeID.length>0){
script.id=pipeID;
}
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
var fun=net.sf.j2s.ajax.SimplePipeRequest.generatePipeScriptCallback(pipeID);
script.defer=true;
if(typeof(script.onreadystatechange)=="undefined"||!isIE){
script.onload=script.onerror=fun;
}else{
script.onreadystatechange=fun;
}
var head=document.getElementsByTagName("HEAD")[0];
head.appendChild(script);
},"~S");
c$.loadPipeIFrameScript=$_M(c$,"loadPipeIFrameScript",
function(pipeKey,url){
var iframe=document.createElement("IFRAME");
iframe.style.display="none";
var pipeID=null;
do{
pipeID="pipe-script-"+pipeKey+"-"+Math.round(10000000*Math.random());
}while(document.getElementById(pipeID)!=null);
iframe.id=pipeID;
document.body.appendChild(iframe);
var html="<html><head><title></title>";
html+="<script type=\"text/javascript\">\r\n";
html+="window[\"$p1p3p$\"] = function (string) {\r\n";
html+="		with (window.parent) {\r\n";
html+="				net.sf.j2s.ajax.SimplePipeRequest.parseReceived (string);\r\n";
html+="		};\r\n";
html+="};\r\n";
html+="window[\"$p1p3b$\"] = function (key, result) {\r\n";
html+="		with (window.parent) {\r\n";
html+="				net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack (key, result);\r\n";
html+="		};\r\n";
html+="};\r\n";
html+="</scr"+"ipt></head><body><script type=\"text/javascript\">\r\n";
if(ClassLoader.isOpera)
html+="window.setTimeout (function () {\r\n";
html+="net = { sf : { j2s : { ajax : { SimplePipeRequest : { generatePipeScriptCallback : "+net.sf.j2s.ajax.SimplePipeRequest.generatePipeScriptCallback+" } } } } };\r\n";
html+="("+net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript+") (";
html+="\""+url.replace(/"/g,"\\\"")+"\", \""+pipeID+"\"";
html+=");\r\n";
if(ClassLoader.isOpera)
html+="}, "+(net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval>>2)+");\r\n";
html+="</scr"+"ipt></body></html>";
net.sf.j2s.ajax.SimplePipeRequest.iframeDocumentWrite(iframe,html);
},"~S,~S");
c$.generateLazyIframeWriting=$_M(c$,"generateLazyIframeWriting",
function(handle,domain,html){
return function(){
try{
var doc=handle.contentWindow.document;
doc.open();
if(ClazzLoader.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
try{
doc.domain=domain;
}catch(e){}
}
doc.write(html);
doc.close();

document.title=document.title;
handle=null;
}catch(e){
window.setTimeout(arguments.callee,25);
}
};
},"~O,~S,~S");
c$.iframeDocumentWrite=$_M(c$,"iframeDocumentWrite",
function(handle,html){
var handle=arguments[0];
var html=arguments[1];
var domain=null;
try{
domain=document.domain;
}catch(e){}
if(ClazzLoader.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
document.domain=domain;
}
if(handle.contentWindow!=null){
if(ClazzLoader.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
handle.contentWindow.location="javascript:document.open();document.domain='"+domain+"';document.close();void(0);";
}else{
handle.contentWindow.location="about:blank";
}
}else{
handle.src="about:blank";
}
try{
var doc=handle.contentWindow.document;
doc.open();
if(ClazzLoader.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
doc.domain=domain;
}
doc.write(html);
doc.close();
}catch(e){
window.setTimeout(net.sf.j2s.ajax.SimplePipeRequest.generateLazyIframeWriting(handle,domain,html),25);
}
},"~O,~S");
c$.pipeScript=$_M(c$,"pipeScript",
function(runnable){
var url=runnable.getPipeURL();
var requestURL=url+(url.indexOf('?')!=-1?"&":"?")+net.sf.j2s.ajax.SimplePipeRequest.constructRequest(runnable.pipeKey,"x",true);
{
net.sf.j2s.ajax.SimplePipeRequest.pipeScriptMap[requestURL]=runnable;
}if(net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url)){
var ok4IFrameScript=true;
{
var domain=null;
try{
domain=document.domain;
}catch(e){
}
ok4IFrameScript=domain!=null&&domain.length>0;
}if(ok4IFrameScript){
net.sf.j2s.ajax.SimplePipeRequest.loadPipeIFrameScript(runnable.pipeKey,requestURL);
return;
}}{
var pipeID=null;
do{
pipeID="pipe-script-"+runnable.pipeKey+"-"+Math.round(10000000*Math.random());
}while(document.getElementById(pipeID)!=null);
net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript(requestURL,pipeID);
}},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeSubdomainQuery=$_M(c$,"pipeSubdomainQuery",
function(runnable,domain){
var pipeKey=runnable.pipeKey;
var spr=net.sf.j2s.ajax.SimplePipeRequest;
spr.pipeIFrameClean(pipeKey);
var ifr=document.createElement("IFRAME");
ifr.style.display="none";
var url=runnable.getPipeURL();
var src=url+(url.indexOf('?')!=-1?"&":"?")
+spr.constructRequest(pipeKey,spr.PIPE_TYPE_SUBDOMAIN_QUERY,true)
+"&"+spr.FORM_PIPE_DOMAIN+"="+domain;
ifr.id="pipe-"+pipeKey;
ifr.src=src;
document.body.appendChild(ifr);
},"net.sf.j2s.ajax.SimplePipeRunnable,~S");
c$.pipeNotify=$_M(c$,"pipeNotify",
function(runnable){
var url=runnable.getPipeURL();
net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript(url+(url.indexOf('?')!=-1?"&":"?")+net.sf.j2s.ajax.SimplePipeRequest.constructRequest(runnable.pipeKey,"n",true));
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeNotifyCallBack=$_M(c$,"pipeNotifyCallBack",
function(key,result){
if("l".equals(result)){
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(pipe!=null){
pipe.pipeAlive=false;
pipe.pipeLost();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
}}},"~S,~S");
c$.pipeQuery=$_M(c$,"pipeQuery",
function(runnable){
var pipeRequest=new net.sf.j2s.ajax.HttpRequest();
var pipeKey=runnable.pipeKey;
var pipeMethod=runnable.getPipeMethod();
var pipeURL=runnable.getPipeURL();
pipeRequest.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimplePipeRequest$4")?0:net.sf.j2s.ajax.SimplePipeRequest.$SimplePipeRequest$4$()),$_N(net.sf.j2s.ajax.SimplePipeRequest$4,this,$_F("pipeRequest",pipeRequest,"runnable",runnable))));
var pipeRequestData=net.sf.j2s.ajax.SimplePipeRequest.constructRequest(pipeKey,"q",true);
var async=false;
{
async=true;
var key="xhr."+pipeKey+"."+pipeRequestData;
net.sf.j2s.ajax.SimplePipeRequest.pipeQueryMap[key]=pipeRequest;
}net.sf.j2s.ajax.SimplePipeRequest.sendRequest(pipeRequest,pipeMethod,pipeURL,pipeRequestData,async);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeContinuum=$_M(c$,"pipeContinuum",
function(runnable){
var pipeKey=runnable.pipeKey;
var spr=net.sf.j2s.ajax.SimplePipeRequest;
spr.pipeIFrameClean(pipeKey);
var subdomain=arguments[1];
var pipeContinued=arguments[2];
(function(){
var ifr=document.createElement("IFRAME");
ifr.style.display="none";
ifr.id="pipe-"+pipeKey;
var url=runnable.getPipeURL();
if(subdomain==null){
document.domain=document.domain;
window["xss.domain.enabled"]=true;
}
ifr.src=url+(url.indexOf('?')!=-1?"&":"?")
+spr.constructRequest(pipeKey,spr.PIPE_TYPE_SCRIPT,true)
+(subdomain==null?""
:"&"+spr.FORM_PIPE_DOMAIN+"="+subdomain);
document.body.appendChild(ifr);
})();
if(pipeContinued==true){
return;
}
var fun=(function(key,created){
return function(){
var sph=net.sf.j2s.ajax.SimplePipeHelper;
var runnable=sph.getPipe(key);
if(runnable!=null){
var spr=net.sf.j2s.ajax.SimplePipeRequest;
var now=new Date().getTime();
var last=runnable.lastPipeDataReceived;
if(last==-1){
last=created;
}
if(now-last>3*spr.pipeLiveNotifyInterval){
runnable.pipeAlive=false;
runnable.pipeClosed();
sph.removePipe(key);
spr.pipeIFrameClean(key);
}else{
spr.pipeNotify(runnable);
window.setTimeout(arguments.callee,spr.pipeLiveNotifyInterval);
}
}
};
})(runnable.pipeKey,new Date().getTime());
window.setTimeout(fun,spr.pipeLiveNotifyInterval);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeIFrameClean=$_M(c$,"pipeIFrameClean",
function(pipeKey){
var urlSignature=net.sf.j2s.ajax.SimplePipeRequest.FORM_PIPE_KEY+"="+pipeKey+"&";
var iframes=document.getElementsByTagName("IFRAME");
for(var i=0;i<iframes.length;i++){
var el=iframes[i];
var url=null;
try{
url=el.src;
}catch(e){
}
if(url==null||url.length==0){
try{
url=el.contentWindow.location.toString();
}catch(e){
}
}
if(url!=null&&url.indexOf(urlSignature)==0){
el.parentNode.removeChild(el);
continue;
}
if(el.id==pipeKey||el.id=="pipe-"+pipeKey){
el.parentNode.removeChild(el);
continue;
}
}
},"~S");
c$.parseReceived=$_M(c$,"parseReceived",
function(string){
if(string==null){
return null;
}var ss=null;
var start=0;
while(string.length>start+6){
var destroyedKey="d";
var end=start+6;
if(destroyedKey.equals(string.substring(end,end+destroyedKey.length))){
var key=string.substring(start,end);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(pipe!=null){
pipe.pipeAlive=false;
pipe.pipeClosed();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
}return string.substring(end+destroyedKey.length);
}var okKey="o";
end=start+6;
if(okKey.equals(string.substring(end,end+okKey.length))){
var key=string.substring(start,end);
var runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(runnable!=null){
runnable.lastPipeDataReceived=System.currentTimeMillis();
}return string.substring(end+okKey.length);
}var isJavaScript=false;
{
isJavaScript=true;
}if(isJavaScript){
var continueKey="e";
end=start+6;
if(continueKey.equals(string.substring(end,end+continueKey.length))){
var key=string.substring(start,end);
var runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(runnable!=null){
runnable.lastPipeDataReceived=System.currentTimeMillis();
net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean(runnable.pipeKey);
var pipeURL=runnable.getPipeURL();
var isXSS=net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(pipeURL);
var isSubdomain=false;
if(isXSS){
isSubdomain=net.sf.j2s.ajax.SimpleRPCRequest.isSubdomain(pipeURL);
}var subdomain=net.sf.j2s.ajax.SimplePipeRequest.adjustSubdomain(isSubdomain);
{
net.sf.j2s.ajax.SimplePipeRequest.pipeContinuum(runnable,subdomain,true);
}}return string.substring(end+continueKey.length);
}}if((ss=net.sf.j2s.ajax.SimpleSerializable.parseInstance(string,end))==null||!ss.deserialize(string,end)){
break;
}var key=string.substring(start,end);
var runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(runnable!=null){
runnable.lastPipeDataReceived=System.currentTimeMillis();
runnable.deal(ss);
}start=net.sf.j2s.ajax.SimplePipeRequest.restStringIndex(string,start);
}
if(start!=0){
return string.substring(start);
}return string;
},"~S");
c$.restStringIndex=$_M(c$,"restStringIndex",
function(string,start){
var idx1=string.indexOf('#',start)+1;
var idx2=string.indexOf('$',idx1);
var sizeStr=string.substring(idx1,idx2);
sizeStr=sizeStr.replaceFirst("^0+","");
var size=0;
if(sizeStr.length!=0){
try{
size=Integer.parseInt(sizeStr);
}catch(e){
if($_O(e,NumberFormatException)){
}else{
throw e;
}
}
}var end=idx2+size+1;
if(end<=string.length){
return end;
}else{
return start;
}},"~S,~N");
c$.adjustSubdomain=$_M(c$,"adjustSubdomain",
function(isSubdomain){
var subdomain=null;
if(isSubdomain){
try{
subdomain=window.location.host;
}catch(e){}
if(subdomain!=null){
var idx=subdomain.indexOf(":");
if(idx!=-1){
subdomain=subdomain.substring(0,idx);
}
document.domain=subdomain;
window["xss.domain.enabled"]=true;
}
}
return subdomain;
},"~B");
c$.ajaxPipe=$_M(c$,"ajaxPipe",
function(runnable){
net.sf.j2s.ajax.SimplePipeHelper.registerPipe(runnable.pipeKey,runnable);
var pipeURL=runnable.getPipeURL();
var isXSS=net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(pipeURL);
var isSubdomain=false;
if(isXSS){
isSubdomain=net.sf.j2s.ajax.SimpleRPCRequest.isSubdomain(pipeURL);
}if((!isXSS||isSubdomain)&&net.sf.j2s.ajax.SimplePipeRequest.pipeMode==4){
var spr=net.sf.j2s.ajax.SimplePipeRequest;
var subdomain=spr.adjustSubdomain(isSubdomain);
spr.pipeContinuum(runnable,subdomain,false);
}else{
var spr=net.sf.j2s.ajax.SimplePipeRequest;
if(isXSS&&isSubdomain&&spr.isSubdomainXSSSupported()){
var subdomain=spr.adjustSubdomain(isSubdomain);
spr.pipeSubdomainQuery(runnable,subdomain);
return;
}
runnable.queryEnded=true;
(function(pipeFun,key,created,lastXHR){
return function(){
var sph=net.sf.j2s.ajax.SimplePipeHelper;
var runnable=sph.getPipe(key);
if(runnable!=null){
var spr=net.sf.j2s.ajax.SimplePipeRequest;
var now=new Date().getTime();
var last=runnable.lastPipeDataReceived;
if(last==-1){
last=created;
}
if((runnable.queryEnded||(now-last>=spr.pipeLiveNotifyInterval
&&(lastXHR==-1||now-lastXHR>=spr.pipeLiveNotifyInterval)))
&&runnable.queryFailedRetries<3){
runnable.queryEnded=false;
if(runnable.received==runnable.lastPipeDataReceived
&&runnable.retries==runnable.queryFailedRetries){
runnable.queryFailedRetries++;
}
pipeFun(runnable);
lastXHR=new Date().getTime();
}
runnable.retries=runnable.queryFailedRetries;
runnable.received=runnable.lastPipeDataReceived;
if(runnable.queryFailedRetries>=3
||now-last>3*spr.pipeLiveNotifyInterval){
runnable.pipeAlive=false;
runnable.pipeClosed();
sph.removePipe(key);
spr.pipeIFrameClean(key);
}else{
window.setTimeout(arguments.callee,spr.pipeQueryInterval);
}
}
};
})((!isXSS)?spr.pipeQuery:spr.pipeScript,runnable.pipeKey,new Date().getTime(),-1)();
}},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.isSubdomainXSSSupported=$_M(c$,"isSubdomainXSSSupported",
function(){
var ua=navigator.userAgent;
var name="Opera";
var idx=ua.indexOf(name);
if(idx!=-1){
return parseFloat(ua.substring(idx+name.length+1))>=9.6;
}
name="Firefox";
idx=ua.indexOf(name);
if(idx!=-1){
return parseFloat(ua.substring(idx+name.length+1))>=1.5;
}
name="MSIE";
idx=ua.indexOf(name);
if(idx!=-1){
return parseFloat(ua.substring(idx+name.length+1))>=6.0;
}
return true;
});
c$.subdomainInit=$_M(c$,"subdomainInit",
function(p){
if(window["NullObject"]==null){
window["NullObject"]=function(){};
}
p.initParameters=function(){
this.parentDomain=document.domain;
this.pipeQueryInterval=1000;
this.pipeLiveNotifyInterval=25000;
this.runnable=null;
this.lastXHR=-1;
var oThis=this;
with(window.parent){
var sph=net.sf.j2s.ajax.SimplePipeHelper;
var spr=net.sf.j2s.ajax.SimplePipeRequest;
this.runnable=sph.getPipe(this.key);
this.pipeQueryInterval=spr.getQueryInterval();
this.pipeLiveNotifyInterval=spr.pipeLiveNotifyInterval;
}
if(this.runnable==null){
eval("("+window.parent.net.sf.j2s.ajax.SimplePipeRequest.checkIFrameSrc+") ();");
}else{
this.runnable.queryEnded=true;
}
};
p.initHttpRequest=function(){
this.xhrHandle=null;
if(window.XMLHttpRequest){
this.xhrHandle=new XMLHttpRequest();
}else{
try{
this.xhrHandle=new ActiveXObject("Msxml2.XMLHTTP");
}catch(e){
this.xhrHandle=new ActiveXObject("Microsoft.XMLHTTP");
}
}
var oThis=this;
this.xhrHandle.onreadystatechange=function(){
if(oThis.xhrHandle==null){
oThis=null;
return;
}
var state=oThis.xhrHandle.readyState;
if(state==4){
var pipeData=oThis.xhrHandle.responseText;
oThis.xhrHandle.onreadystatechange=NullObject;
var pipe=oThis.runnable;
document.domain=oThis.parentDomain;
if(oThis.xhrHandle.status!=200){
pipe.queryFailedRetries++;
}else{
pipe.queryFailedRetries=0;
with(window.parent){
net.sf.j2s.ajax.SimplePipeRequest.parseReceived(pipeData);
oThis.runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(oThis.key);
}
}
pipe.queryEnded=true;
var xhrHandle=oThis.xhrHandle;
with(window.parent){
var pqMap=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryMap;
for(var key in pqMap){
if(typeof key=="string"&&key.indexOf("xhr."+pipe.pipeKey+".")==0){
if(pqMap[key]==null||pqMap[key]===xhrHandle){
delete pqMap[key];
}else{
delete pqMap[key];
pipe.queryEnded=false;
}
}
}
}
oThis.xhrHandle=null;
oThis=null;
}
};
};
p.pipeXHRQuery=function(request,method,url,data){
if("GET"==method.toUpperCase()){
request.open(method,url+(url.indexOf('?')!=-1?"&":"?")+data,true,null,null);
data=null;
}else{
request.open(method,url,true,null,null);
}
if(method!=null&&method.toLowerCase()=="post"){
try{
request.setRequestHeader("Content-type",
"application/x-www-form-urlencoded");
}catch(e){

}







}
request.send(data);
};
p.initParameters();
},"~O");
c$.subdomainLoopQuery=$_M(c$,"subdomainLoopQuery",
function(p){
var created=new Date().getTime();
return function(){
var runnable=p.runnable;
if(runnable!=null){
if(runnable.pipeKey!=p.key){
var key=p.key;
with(window.parent){
try{
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean(key);
return;
}catch(e){
}
}
}
var now=new Date().getTime();
var last=runnable.lastPipeDataReceived;
if(last==-1){
last=created;
}
if((runnable.queryEnded||(now-last>=p.pipeLiveNotifyInterval
&&(p.lastXHR==-1||now-p.lastXHR>=p.pipeLiveNotifyInterval)))
&&runnable.queryFailedRetries<3){
runnable.queryEnded=false;
var method=null;
var url=null;
var data=null;
var key=p.key;
with(window.parent){
try{
method=runnable.getPipeMethod();
url=runnable.getPipeURL();
var spr=net.sf.j2s.ajax.SimplePipeRequest;
data=spr.constructRequest(key,spr.PIPE_TYPE_QUERY,true);
}catch(e){
}
}
try{
document.domain=p.originalDomain;
}catch(e){};
try{
p.initHttpRequest();
}catch(e){};
var xhrHandle=p.xhrHandle;
try{
with(window.parent){
spr.pipeQueryMap["xhr."+key+"."+data]=xhrHandle;
}
}catch(e){
}
try{
p.pipeXHRQuery(p.xhrHandle,method,url,data);
p.lastXHR=new Date().getTime();
}catch(e){
p.xhrHandle.onreadystatechange=NullObject;
p.xhrHandle=null;
document.domain=p.parentDomain;
runnable.queryEnded=true;
runnable.queryFailedRetries++;
}
}
if(runnable.queryFailedRetries>=3
||now-last>3*p.pipeLiveNotifyInterval){
document.domain=p.parentDomain;
var key=p.key;
with(window.parent){
runnable.pipeAlive=false;
runnable.pipeClosed();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean(key);
}
}else{
window.setTimeout(arguments.callee,p.pipeQueryInterval);
}
}
};
},"~O");
c$.checkIFrameSrc=$_M(c$,"checkIFrameSrc",
function(){
try{
var curLoc=""+window.location;
var existed=false;
with(window.parent){
var iframes=document.getElementsByTagName("IFRAME");
for(var i=0;i<iframes.length;i++){
if(iframes[i].src==curLoc){
existed=true;
break;
}
}
}
if(!existed){
var idx=curLoc.indexOf("?");
if(idx!=-1){
var urlPrefix=curLoc.substring(0,idx);
var goalURL=null;
with(window.parent){
var iframes=document.getElementsByTagName("IFRAME");
for(var i=0;i<iframes.length;i++){
if(iframes[i].src.indexOf(urlPrefix)==0){
goalURL=iframes[i].src;
break;
}
}
}
if(goalURL!=null){
window.location.replace(goalURL);
}
}
}
}catch(e){}
$$=$;
$=function(s){
$$(s);
try{
var length=document.body.childNodes.length;
for(var i=length-1;i>=0;i--){
var child=document.body.childNodes[i];
child.parentNode.removeChild(child);
}
}catch(e){}
}
});
c$.$SimplePipeRequest$3$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimplePipeRequest$3",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
function(){
var responseText=this.f$.request.getResponseText();
if(responseText==null||responseText.length==0){
this.f$.runnable.ajaxFail();
return;
}this.f$.runnable.deserialize(responseText);
this.f$.runnable.ajaxOut();
net.sf.j2s.ajax.SimplePipeRequest.ajaxPipe(this.f$.runnable);
});
c$=$_P();
};
c$.$SimplePipeRequest$4$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimplePipeRequest$4",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
function(){
{
if(window==null||window["net"]==null)return;
}if(this.f$.pipeRequest.getStatus()!=200){
this.f$.runnable.queryFailedRetries++;
}else{
this.f$.runnable.queryFailedRetries=0;
net.sf.j2s.ajax.SimplePipeRequest.parseReceived(this.f$.pipeRequest.getResponseText());
}this.f$.runnable.queryEnded=true;
{
var pqMap=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryMap;
for(var key in pqMap){
if(typeof key=="string"&&key.indexOf("xhr."+this.f$.runnable.pipeKey+".")==0){
if(pqMap[key]==null||pqMap[key]===this.f$.pipeRequest){
delete pqMap[key];
}else{
delete pqMap[key];
this.f$.runnable.queryEnded=false;
}
}
}
}});
c$=$_P();
};
$_S(c$,
"PIPE_STATUS_OK","o",
"PIPE_STATUS_DESTROYED","d",
"PIPE_STATUS_CONTINUE","e",
"PIPE_STATUS_LOST","l",
"PIPE_TYPE_QUERY","q",
"PIPE_TYPE_SUBDOMAIN_QUERY","u",
"PIPE_TYPE_NOTIFY","n",
"PIPE_TYPE_SCRIPT","s",
"PIPE_TYPE_XSS","x",
"PIPE_TYPE_CONTINUUM","c",
"FORM_PIPE_KEY","k",
"FORM_PIPE_TYPE","t",
"FORM_PIPE_DOMAIN","d",
"FORM_PIPE_RANDOM","r",
"PIPE_KEY_LENGTH",6,
"MODE_PIPE_QUERY",3,
"MODE_PIPE_CONTINUUM",4,
"pipeMode",4,
"pipeQueryInterval",1000,
"pipeLiveNotifyInterval",25000,
"reqCount",0);
c$.pipeScriptMap=c$.prototype.pipeScriptMap=new JavaObject();
c$.pipeQueryMap=c$.prototype.pipeQueryMap=new JavaObject();

window["$p1p3p$"]=net.sf.j2s.ajax.SimplePipeRequest.parseReceived;
window["$p1p3b$"]=net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack;
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.SimplePipeSWTRequest",null,function(){
c$=$_T(net.sf.j2s.ajax,"SimplePipeSWTRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.swtPipe=$_M(c$,"swtPipe",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimplePipeRequest.pipeRequest(runnable);
},"net.sf.j2s.ajax.SimplePipeRunnable");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleSerializable"],"net.sf.j2s.ajax.CompoundSerializable",null,function(){
c$=$_C(function(){
this.session=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundSerializable",net.sf.j2s.ajax.SimpleSerializable);
$_s(c$,"session","s");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.CompoundSerializable","$.SimplePipeRunnable"],"net.sf.j2s.ajax.CompoundPipeSession",["net.sf.j2s.ajax.SimplePipeHelper","$.SimplePipeRequest","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.session=null;
this.parent=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundPipeSession",net.sf.j2s.ajax.SimplePipeRunnable);
$_M(c$,"isPipeLive",
function(){
return $_U(this,net.sf.j2s.ajax.CompoundPipeSession,"isPipeLive",[])&&this.session!=null;
});
$_M(c$,"pipeCreated",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeSession,"pipeCreated",[]);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var cp=pipe;
if(cp.status<3){
cp.status=3;
}this.updateStatus(true);
}});
$_M(c$,"pipeDestroy",
function(){
if(this.destroyed){
return false;
}this.pipeAlive=false;
this.destroyed=true;
{
}var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if(pipe==null){
pipe=this.parent;
}if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var cp=pipe;
if(cp.status<3){
cp.status=3;
}cp.unweave(this);
}this.session=null;
this.pipeKey=null;
return true;
});
$_M(c$,"deal",
function(ss){
if($_O(ss,net.sf.j2s.ajax.CompoundSerializable)){
var cs=ss;
if(cs.session==null||!cs.session.equals(this.session)){
return false;
}return $_U(this,net.sf.j2s.ajax.CompoundPipeSession,"deal",[cs]);
}return false;
},"net.sf.j2s.ajax.SimpleSerializable");
$_M(c$,"deal",
function(evt){
if(net.sf.j2s.ajax.SimplePipeRequest.getRequstMode()==2){
this.pipeClosed();
return true;
}this.updateStatus(false);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if(pipe==null){
pipe=this.parent;
}if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var p=pipe;
if(p.pipes!=null){
for(var i=0;i<p.pipes.length;i++){
var s=p.pipes[i];
if(s!=null&&s.session.equals(evt.session)){
p.pipes[i]=null;
break;
}}
}}if(pipe!=null&&!pipe.isPipeLive()){
var pipeKey=this.pipeKey;
pipe.pipeDestroy();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(pipeKey);
}this.pipeClosed();
return true;
},"net.sf.j2s.ajax.CompoundPipeSession.PipeSessionClosedEvent");
$_V(c$,"getHttpURL",
function(){
return this.parent.getHttpURL();
});
$_V(c$,"getHttpMethod",
function(){
return this.parent.getHttpMethod();
});
$_V(c$,"getPipeURL",
function(){
return this.parent.getPipeURL();
});
$_V(c$,"getPipeMethod",
function(){
return this.parent.getHttpMethod();
});
$_H();
c$=$_T(net.sf.j2s.ajax.CompoundPipeSession,"PipeSessionClosedEvent",net.sf.j2s.ajax.CompoundSerializable);
c$=$_P();
$_s(c$,"session","s");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRunnable"],"net.sf.j2s.ajax.CompoundPipeRunnable",["net.sf.j2s.ajax.SimplePipeRequest","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.pipes=null;
this.status=0;
this.id=null;
this.pipeMethod=null;
this.rpcMethod=null;
this.pipeURL=null;
this.rpcURL=null;
this.setupFailedRetries=0;
this.lastSetupRetried=0;
this.lastSetup=0;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundPipeRunnable",net.sf.j2s.ajax.SimplePipeRunnable);
c$.nextSessionKey=$_M(c$,"nextSessionKey",
($fz=function(){
var hexStr="0123456789abcdef";
var key="";
for(var i=0;i<4;i++){
var hex=Math.round(15*Math.random());
key+=""+hexStr.charAt(hex);
}
return key;
},$fz.isPrivate=true,$fz));
$_K(c$,
function(){
$_R(this,net.sf.j2s.ajax.CompoundPipeRunnable,[]);
this.pipes=new Array(4);
this.status=0;
this.setupFailedRetries=0;
this.lastSetupRetried=0;
this.pipeMethod="GET";
this.rpcMethod="POST";
this.pipeURL="simplepipe";
this.rpcURL="piperpc";
this.lastSetup=System.currentTimeMillis();
});
$_M(c$,"getSession",
function(session){
if(session==null){
return null;
}for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&session.equals(this.pipes[i].session)){
return this.pipes[i];
}}
return null;
},"~S");
$_M(c$,"pipeDestroy",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeDestroy();
}}
this.status=0;
return $_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeDestroy",[]);
});
$_M(c$,"pipeInit",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeInit",[]);
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeInit();
}}
});
$_M(c$,"isPipeLive",
function(){
if(this.pipeAlive&&this.status<3){
return true;
}if(this.status==3&&System.currentTimeMillis()-this.lastSetup<=3*net.sf.j2s.ajax.SimplePipeRequest.pipeLiveNotifyInterval){
return true;
}if($_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"isPipeLive",[])){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&this.pipes[i].isPipeLive()){
return true;
}}
}return false;
});
$_M(c$,"pipeClosed",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
if(this.pipes[i].closer!=null){
this.pipes[i].closer.helpClosing(this.pipes[i]);
}else{
this.pipes[i].pipeClosed();
}this.pipes[i]=null;
}}
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeClosed",[]);
});
$_M(c$,"pipeLost",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeLost();
this.pipes[i]=null;
}}
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeLost",[]);
});
$_M(c$,"keepPipeLive",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&this.pipes[i].isPipeLive()){
this.pipes[i].keepPipeLive();
}}
});
$_M(c$,"updateStatus",
function(live){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].updateStatus(live);
}}
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"updateStatus",[live]);
},"~B");
$_M(c$,"weave",
function(pipe){
pipe.pipeReset();
{
for(var i=0;i<this.pipes.length;i++){
if(pipe===this.pipes[i]){
pipe.pipeKey=this.pipeKey;
pipe.parent=this;
this.initPipeSession(pipe);
return false;
}}
for(var i=0;i<this.pipes.length;i++){
if(pipe.session!=null&&this.pipes[i]!=null&&pipe.session.equals(this.pipes[i].session)){
if(this.pipes[i].isPipeLive()){
System.out.println("pipe session "+this.pipes[i].session+" is still live!!");
}this.pipes[i]=pipe;
this.lastSetup=System.currentTimeMillis();
pipe.pipeKey=this.pipeKey;
pipe.parent=this;
return true;
}}
var added=false;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]==null){
this.pipes[i]=pipe;
added=true;
break;
}}
if(!added){
var newPipes=new Array(this.pipes.length+4);
System.arraycopy(this.pipes,0,newPipes,0,this.pipes.length);
newPipes[this.pipes.length]=pipe;
this.lastSetup=System.currentTimeMillis();
}}pipe.pipeKey=this.pipeKey;
pipe.parent=this;
this.initPipeSession(pipe);
return true;
},"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"initPipeSession",
($fz=function(pipe){
while(pipe.session==null){
var key=net.sf.j2s.ajax.CompoundPipeRunnable.nextSessionKey();
var isKeyOK=true;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&key.equals(this.pipes[i].session)){
isKeyOK=false;
break;
}}
if(isKeyOK){
pipe.session=key;
break;
}}
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"unweave",
function(pipe){
for(var i=0;i<this.pipes.length;i++){
if(pipe===this.pipes[i]||(pipe.session!=null&&this.pipes[i]!=null&&pipe.session.equals(this.pipes[i].session))){
this.pipes[i]=null;
this.lastSetup=System.currentTimeMillis();
pipe.pipeKey=null;
return true;
}}
return false;
},"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"getActivePipeSessionCount",
function(){
var count=0;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
count++;
}}
return count;
});
$_M(c$,"isEmpty",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
return false;
}}
return true;
});
$_V(c$,"deal",
function(ss){
if($_O(ss,net.sf.j2s.ajax.CompoundSerializable)){
var cs=ss;
var clazz=cs.getClass();
if("net.sf.j2s.ajax.CompoundSerializable".equals(clazz.getName())){
return true;
}for(var i=0;i<this.pipes.length;i++){
var p=this.pipes[i];
if(p!=null&&p.session!=null&&p.session.equals(cs.session)&&p.deal(cs)){
return true;
}}
}return false;
},"net.sf.j2s.ajax.SimpleSerializable");
$_V(c$,"getHttpURL",
function(){
return this.rpcURL;
});
$_V(c$,"getHttpMethod",
function(){
return this.rpcMethod;
});
$_V(c$,"getPipeURL",
function(){
return this.pipeURL;
});
$_V(c$,"getPipeMethod",
function(){
return this.pipeMethod;
});
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.CompoundPipeRequest",["net.sf.j2s.ajax.CompoundPipeRunnable","$.SimpleRPCRequest"],function(){
c$=$_T(net.sf.j2s.ajax,"CompoundPipeRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.weave=$_M(c$,"weave",
function(id,p){
var pipe=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,true);
if(pipe.status==0||!pipe.isPipeLive()){
pipe.weave(p);
pipe.updateStatus(true);
if(pipe.status==0){
pipe.status=1;
pipe.pipeKey=null;
net.sf.j2s.ajax.SimplePipeRequest.pipe(pipe);
}}else{
if(!pipe.weave(p)&&p.isPipeLive()){
return;
}p.pipeKey=pipe.pipeKey;
net.sf.j2s.ajax.SimpleRPCRequest.request(p);
if(pipe.status<2){
pipe.status=2;
}}},"~S,net.sf.j2s.ajax.CompoundPipeSession");
c$.pipeFailed=$_M(c$,"pipeFailed",
function(pipe){
var now=System.currentTimeMillis();
if(now-pipe.lastSetupRetried>300000){
pipe.setupFailedRetries=0;
}pipe.setupFailedRetries++;
if(pipe.setupFailedRetries<=3){
pipe.updateStatus(true);
pipe.lastSetupRetried=now;
net.sf.j2s.ajax.SimplePipeRequest.pipe(pipe);
}else{
for(var i=0;i<pipe.pipes.length;i++){
if(pipe.pipes[i]!=null){
pipe.pipes[i].pipeFailed();
}}
pipe.setupFailedRetries=0;
pipe.status=0;
pipe.lastSetupRetried=0;
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.configure=$_M(c$,"configure",
function(id,pipeURL,pipeMethod,rpcURL,rpcMethod){
var cfg=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,true);
if(pipeURL!=null){
cfg.pipeURL=pipeURL;
}if(pipeMethod!=null){
cfg.pipeMethod=pipeMethod;
}if(rpcURL!=null){
cfg.rpcURL=rpcURL;
}if(rpcMethod!=null){
cfg.rpcMethod=rpcMethod;
}},"~S,~S,~S,~S,~S");
c$.retrievePipe=$_M(c$,"retrievePipe",
function(id,createNew){
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
{
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]!=null&&allPipes[i].id.equals(id)){
return allPipes[i];
}}
if(!createNew){
return null;
}var pipe=net.sf.j2s.ajax.CompoundPipeRequest.createPipe(id);
net.sf.j2s.ajax.CompoundPipeRequest.addPipe(pipe);
return pipe;
}},"~S,~B");
c$.createPipe=$_M(c$,"createPipe",
($fz=function(id){
var pipe=(($_D("net.sf.j2s.ajax.CompoundPipeRequest$1")?0:net.sf.j2s.ajax.CompoundPipeRequest.$CompoundPipeRequest$1$()),$_N(net.sf.j2s.ajax.CompoundPipeRequest$1,this,null));
pipe.id=id;
return pipe;
},$fz.isPrivate=true,$fz),"~S");
c$.addPipe=$_M(c$,"addPipe",
($fz=function(pipe){
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]==null){
allPipes[i]=pipe;
return;
}}
var newPipes=new Array(allPipes.length+100);
System.arraycopy(allPipes,0,newPipes,0,allPipes.length);
newPipes[allPipes.length]=pipe;
($t$=net.sf.j2s.ajax.CompoundPipeRequest.pipes=newPipes,net.sf.j2s.ajax.CompoundPipeRequest.prototype.pipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes,$t$);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.registerPipe=$_M(c$,"registerPipe",
function(pipe){
if(pipe==null)return null;
var id=pipe.id;
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
{
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]!=null&&allPipes[i].id.equals(id)){
return allPipes[i];
}}
net.sf.j2s.ajax.CompoundPipeRequest.addPipe(pipe);
return pipe;
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.unregisterPipe=$_M(c$,"unregisterPipe",
function(id){
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
{
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]!=null&&allPipes[i].id.equals(id)){
var pipe=allPipes[i];
allPipes[i]=null;
return pipe;
}}
return null;
}},"~S");
c$.$CompoundPipeRequest$1$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"CompoundPipeRequest$1",net.sf.j2s.ajax.CompoundPipeRunnable);
$_M(c$,"ajaxOut",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeRequest$1,"ajaxOut",[]);
if(!this.pipeAlive){
net.sf.j2s.ajax.CompoundPipeRequest.pipeFailed(this);
return;
}for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeKey=this.pipeKey;
net.sf.j2s.ajax.SimpleRPCRequest.request(this.pipes[i]);
if(this.status<2){
this.status=2;
}}}
});
$_V(c$,"ajaxFail",
function(){
net.sf.j2s.ajax.CompoundPipeRequest.pipeFailed(this);
});
c$=$_P();
};
c$.pipes=c$.prototype.pipes=new Array(3);
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.CompoundPipeSWTRequest",["net.sf.j2s.ajax.CompoundPipeRequest","$.CompoundPipeRunnable","$.SimplePipeSWTRequest","$.SimpleRPCSWTRequest"],function(){
c$=$_T(net.sf.j2s.ajax,"CompoundPipeSWTRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.swtWeave=$_M(c$,"swtWeave",
function(id,p){
{
}var pipe=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,false);
if(pipe==null){
pipe=net.sf.j2s.ajax.CompoundPipeRequest.registerPipe(net.sf.j2s.ajax.CompoundPipeSWTRequest.createSWTWrappedPipe(id));
}if(pipe.status==0||!pipe.isPipeLive()){
pipe.weave(p);
pipe.updateStatus(true);
if(pipe.status==0){
pipe.status=1;
pipe.pipeKey=null;
p.pipeKey=null;
net.sf.j2s.ajax.SimplePipeSWTRequest.swtPipe(pipe);
}}else{
if(!pipe.weave(p)&&p.isPipeLive()){
return;
}p.pipeKey=pipe.pipeKey;
net.sf.j2s.ajax.SimpleRPCSWTRequest.swtRequest(p);
if(pipe.status<2){
pipe.status=2;
}}},"~S,net.sf.j2s.ajax.CompoundPipeSession");
c$.createSWTWrappedPipe=$_M(c$,"createSWTWrappedPipe",
($fz=function(id){
var pipe=(($_D("net.sf.j2s.ajax.CompoundPipeSWTRequest$2")?0:net.sf.j2s.ajax.CompoundPipeSWTRequest.$CompoundPipeSWTRequest$2$()),$_N(net.sf.j2s.ajax.CompoundPipeSWTRequest$2,this,null));
pipe.id=id;
return pipe;
},$fz.isPrivate=true,$fz),"~S");
c$.pipeFailed=$_M(c$,"pipeFailed",
function(pipe){
var now=System.currentTimeMillis();
if(now-pipe.lastSetupRetried>300000){
pipe.setupFailedRetries=0;
}pipe.setupFailedRetries++;
if(pipe.setupFailedRetries<=3){
pipe.updateStatus(true);
pipe.lastSetupRetried=now;
net.sf.j2s.ajax.SimplePipeSWTRequest.swtPipe(pipe);
}else{
for(var i=0;i<pipe.pipes.length;i++){
if(pipe.pipes[i]!=null){
pipe.pipes[i].pipeFailed();
}}
pipe.setupFailedRetries=0;
pipe.status=0;
pipe.lastSetupRetried=0;
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.configure=$_M(c$,"configure",
function(id,pipeURL,pipeMethod,rpcURL,rpcMethod){
var pipe=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,false);
if(pipe==null){
pipe=net.sf.j2s.ajax.CompoundPipeRequest.registerPipe(net.sf.j2s.ajax.CompoundPipeSWTRequest.createSWTWrappedPipe(id));
}if(pipeURL!=null){
pipe.pipeURL=pipeURL;
}if(pipeMethod!=null){
pipe.pipeMethod=pipeMethod;
}if(rpcURL!=null){
pipe.rpcURL=rpcURL;
}if(rpcMethod!=null){
pipe.rpcMethod=rpcMethod;
}},"~S,~S,~S,~S,~S");
c$.$CompoundPipeSWTRequest$2$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"CompoundPipeSWTRequest$2",net.sf.j2s.ajax.CompoundPipeRunnable);
$_M(c$,"ajaxOut",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeSWTRequest$2,"ajaxOut",[]);
if(!this.pipeAlive){
net.sf.j2s.ajax.CompoundPipeSWTRequest.pipeFailed(this);
return;
}for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeKey=this.pipeKey;
net.sf.j2s.ajax.SimpleRPCSWTRequest.swtRequest(this.pipes[i]);
if(this.status<2){
this.status=2;
}}}
});
$_V(c$,"ajaxFail",
function(){
net.sf.j2s.ajax.CompoundPipeSWTRequest.pipeFailed(this);
});
c$=$_P();
};
});
$_J("net.sf.j2s.store");
$_I(net.sf.j2s.store,"IStore");
$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore"],"net.sf.j2s.store.CookieStore",null,function(){
c$=$_T(net.sf.j2s.store,"CookieStore",null,net.sf.j2s.store.IStore);
$_V(c$,"getProperty",
function(name){
var prefix=name+"=";
var allCookies=document.cookie.split(';');
for(var i=0;i<allCookies.length;i++){
var item=allCookies[i].replace(/^\s*/,"");
if(item.indexOf(prefix)==0){
return item.substring(prefix.length,item.length);
}
}
return null;
},"~S");
$_V(c$,"setProperty",
function(name,value){
var toExpire=new Date();
if(value==null){
value="";
toExpire.setTime(new Date().getTime()-24*3600*1000);
}else{
toExpire.setTime(new Date().getTime()+365*24*3600*1000);
}
document.cookie=name+"="+value
+"; expires="+toExpire.toGMTString()
+"; path=/";
},"~S,~S");
$_V(c$,"isReady",
function(){
return true;
});
});
$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore"],"net.sf.j2s.store.XSSCookieStore",null,function(){
c$=$_C(function(){
this.url=null;
$_Z(this,arguments);
},net.sf.j2s.store,"XSSCookieStore",null,net.sf.j2s.store.IStore);
$_K(c$,
function(url){
if(url==null){
url="http://cookie.java2script.org/xss-cookie.html";
}this.url=url;
net.sf.j2s.store.XSSCookieStore.initialize(url);
},"~S");
c$.initialize=$_M(c$,"initialize",
($fz=function(url){
var ua=navigator.userAgent.toLowerCase();
try{
document.domain=document.domain;
window["xss.domain.enabled"]=true;
}catch(e){}
var xssIfr=document.getElementById("xss-cookie");
if(xssIfr!=null){
return;
}
net.sf.j2s.store.XSSCookieStore.initializeCallback();
var xssIfr=document.createElement("IFRAME");
xssIfr.id="xss-cookie";
xssIfr.src=url;
xssIfr.style.display="none";
document.body.appendChild(xssIfr);
},$fz.isPrivate=true,$fz),"~S");
c$.initializeCallback=$_M(c$,"initializeCallback",
function(){
window.xssCookieReadyCallback=function(){
net.sf.j2s.store.XSSCookieStore.initialized=true;
};
});
$_V(c$,"getProperty",
function(name){
if(!net.sf.j2s.store.XSSCookieStore.initialized){
return null;
}
var xssIfr=document.getElementById("xss-cookie");
if(xssIfr==null){
return null;
}
try{
return xssIfr.contentWindow.readCookie(name);
}catch(e){
return null;
}
},"~S");
$_V(c$,"setProperty",
function(name,value){
if(!net.sf.j2s.store.XSSCookieStore.initialized){
return;
}
var xssIfr=document.getElementById("xss-cookie");
if(xssIfr==null){
return;
}
try{
if(value==null){
xssIfr.contentWindow.createCookie(name,value,-1);
}else{
xssIfr.contentWindow.createCookie(name,value,365);
}
}catch(e){}
},"~S,~S");
$_V(c$,"isReady",
function(){
return net.sf.j2s.store.XSSCookieStore.initialized;
});
$_S(c$,
"initialized",false);

var ua=navigator.userAgent.toLowerCase();
var isOldIE=ua.indexOf("msie 5.5")!=-1||ua.indexOf("msie 5.0")!=-1;
var xssCookieURL=window["j2s.xss.cookie.url"];
var isLocal=false;
try{
isLocal=window.location.protocol=="file:"
||window.location.host.toLowerCase().indexOf("localhost")!=-1;
}catch(e){
isLocal=true;
}
if(!isLocal&&xssCookieURL!=null&&!isOldIE){
net.sf.j2s.store.XSSCookieStore.initialize(xssCookieURL);
}
});
$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore","$.CookieStore","$.XSSCookieStore"],"net.sf.j2s.store.SimpleStore",null,function(){
c$=$_C(function(){
this.store=null;
$_Z(this,arguments);
},net.sf.j2s.store,"SimpleStore",null,net.sf.j2s.store.IStore);
$_K(c$,
($fz=function(){
{
var ua=navigator.userAgent.toLowerCase();
var isOldIE=ua.indexOf("msie 5.5")!=-1||ua.indexOf("msie 5.0")!=-1;
var cookieURL=window["j2s.xss.cookie.url"];
var isLocal=false;
try{
isLocal=window.location.protocol=="file:"
||window.location.host.toLowerCase().indexOf("localhost")!=-1;
}catch(e){
isLocal=true;
}
if(!isLocal&&cookieURL!=null&&!isOldIE){
this.store=new net.sf.j2s.store.XSSCookieStore(cookieURL);
}else{
this.store=new net.sf.j2s.store.CookieStore();
}
}},$fz.isPrivate=true,$fz));
c$.getDefault=$_M(c$,"getDefault",
function(){
if(net.sf.j2s.store.SimpleStore.singleton==null){
($t$=net.sf.j2s.store.SimpleStore.singleton=new net.sf.j2s.store.SimpleStore(),net.sf.j2s.store.SimpleStore.prototype.singleton=net.sf.j2s.store.SimpleStore.singleton,$t$);
}return net.sf.j2s.store.SimpleStore.singleton;
});
$_M(c$,"getProperty",
function(name){
return this.store.getProperty(name);
},"~S");
$_M(c$,"setProperty",
function(name,value){
this.store.setProperty(name,value);
},"~S,~S");
$_M(c$,"isReady",
function(){
return this.store.isReady();
});
$_M(c$,"execute",
function(runnable){
if($_O(this.store,net.sf.j2s.store.XSSCookieStore)&&!this.store.isReady()){
{
window.xssCookieReadyCallback=(function(r){
return function(){
net.sf.j2s.store.XSSCookieStore.initialized=true;
r.run();
};
})(runnable);
}return;
}runnable.run();
},"Runnable");
$_S(c$,
"singleton",null);
});
