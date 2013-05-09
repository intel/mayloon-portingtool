$_L(null,"java.lang.String",["java.lang.Character","$.Double","$.Float","$.Long","$.NullPointerException","$.StringBuilder","$.StringIndexOutOfBoundsException","java.nio.ByteBuffer","java.nio.charset.Charset","java.util.regex.Pattern"],function(){
c$=$_C(function(){
this.value=null;
this.offset=0;
this.count=0;
this.$hashCode=0;
$_Z(this,arguments);
},java.lang,"String",null,[java.io.Serializable,Comparable,CharSequence]);
$_K(c$,
function(){
this.value=String.EMPTY_CHAR_ARRAY;
this.offset=0;
this.count=0;
});
$_K(c$,
function(data){
this.construct(data,0,data.length);
},"~A");
$_K(c$,
function(data,high){
this.construct(data,high,0,data.length);
},"~A,~N");
$_K(c$,
function(data,start,length){
if(start>=0&&0<=length&&length<=data.length-start){
var cb=java.nio.charset.Charset.defaultCharset().decode(java.nio.ByteBuffer.wrap(data,start,length));
this.count=cb.length();
this.offset=0;
if(this.count>0){
this.value=cb.array();
}else{
this.value=String.EMPTY_CHAR_ARRAY;
}}else{
throw new StringIndexOutOfBoundsException();
}},"~A,~N,~N");
$_K(c$,
function(data,high,start,length){
if(data!=null){
if(start>=0&&0<=length&&length<=data.length-start){
this.offset=0;
this.value=$_A(length,'\0');
this.count=length;
high<<=8;
for(var i=0;i<this.count;i++){
this.value[i]=String.fromCharCode((high+(data[start++]&0xff)));
}
}else{
throw new StringIndexOutOfBoundsException();
}}else{
throw new NullPointerException();
}},"~A,~N,~N,~N");
$_K(c$,
function(data,start,length,charsetName){
this.construct(data,start,length,java.nio.charset.Charset.forName(charsetName));
},"~A,~N,~N,~S");
$_K(c$,
function(data,charsetName){
this.construct(data,0,data.length,java.nio.charset.Charset.forName(charsetName));
},"~A,~S");
$_K(c$,
function(data,start,length,charset){
if(start<0||length<0||length>data.length-start){
throw new StringIndexOutOfBoundsException();
}var canonicalCharsetName=charset.name();
if(canonicalCharsetName.equals("UTF-8")){
var d=data;
var v=$_A(length,'\0');
var idx=start;
var last=start+length;
var s=0;
outer:while(idx<last){
var b0=d[idx++];
if((b0&0x80)==0){
var val=b0&0xff;
v[s++]=String.fromCharCode(val);
}else if(((b0&0xe0)==0xc0)||((b0&0xf0)==0xe0)||((b0&0xf8)==0xf0)||((b0&0xfc)==0xf8)||((b0&0xfe)==0xfc)){
var utfCount=1;
if((b0&0xf0)==0xe0)utfCount=2;
else if((b0&0xf8)==0xf0)utfCount=3;
else if((b0&0xfc)==0xf8)utfCount=4;
else if((b0&0xfe)==0xfc)utfCount=5;
if(idx+utfCount>last){
v[s++]='\ufffd';
break;
}var val=b0&(0x1f>>(utfCount-1));
for(var i=0;i<utfCount;i++){
var b=d[idx++];
if((b&0xC0)!=0x80){
v[s++]='\ufffd';
idx--;
continue outer;}val<<=6;
val|=b&0x3f;
}
if((utfCount!=2)&&(val>=0xD800)&&(val<=0xDFFF)){
v[s++]='\ufffd';
continue;}if(val>0x10FFFF){
v[s++]='\ufffd';
continue;}if(val<0x10000){
v[s++]=String.fromCharCode(val);
}else{
var x=val&0xffff;
var u=(val>>16)&0x1f;
var w=(u-1)&0xffff;
var hi=0xd800|(w<<6)|(x>>10);
var lo=0xdc00|(x&0x3ff);
v[s++]=String.fromCharCode(hi);
v[s++]=String.fromCharCode(lo);
}}else{
v[s++]='\ufffd';
}}
if(s==length){
this.offset=0;
this.value=v;
this.count=s;
}else{
this.offset=0;
this.value=$_A(s,'\0');
this.count=s;
System.arraycopy(v,0,this.value,0,s);
}}else if(canonicalCharsetName.equals("ISO-8859-1")){
this.offset=0;
this.value=$_A(length,'\0');
this.count=length;
}else if(canonicalCharsetName.equals("US-ASCII")){
this.offset=0;
this.value=$_A(length,'\0');
this.count=length;
}else{
var cb=charset.decode(java.nio.ByteBuffer.wrap(data,start,length));
this.offset=0;
this.count=cb.length();
if(this.count>0){
this.value=$_A(this.count,'\0');
System.arraycopy(cb.array(),0,this.value,0,this.count);
}else{
this.value=String.EMPTY_CHAR_ARRAY;
}}},"~A,~N,~N,java.nio.charset.Charset");
$_K(c$,
function(data,charset){
this.construct(data,0,data.length,charset);
},"~A,java.nio.charset.Charset");
$_K(c$,
function(data){
this.construct(data,0,data.length);
},"~A");
$_K(c$,
function(data,start,length){
if(start>=0&&0<=length&&length<=data.length-start){
this.offset=0;
this.value=$_A(length,'\0');
this.count=length;
System.arraycopy(data,start,this.value,0,this.count);
}else{
throw new StringIndexOutOfBoundsException();
}},"~A,~N,~N");
$_K(c$,
function(start,length,data){
this.value=data;
this.offset=start;
this.count=length;
},"~N,~N,~A");
$_K(c$,
function(toCopy){
this.value=toCopy.value;
this.offset=0;
this.count=this.value.length;
},"~S");
$_K(c$,
function(stringbuffer){
this.offset=0;
{
this.value=stringbuffer.shareValue();
this.count=stringbuffer.length();
}},"StringBuffer");
$_K(c$,
function(codePoints,offset,count){
if(codePoints==null){
throw new NullPointerException();
}if(offset<0||count<0||offset+count>codePoints.length){
throw new StringIndexOutOfBoundsException();
}this.offset=0;
this.value=$_A(count*2,'\0');
var end=offset+count;
var c=0;
this.count=c;
},"~A,~N,~N");
$_K(c$,
function(sb){
if(sb==null){
throw new NullPointerException();
}this.offset=0;
this.count=sb.length();
this.value=$_A(this.count,'\0');
sb.getChars(0,this.count,this.value,0);
},"StringBuilder");
$_V(c$,"charAt",
function(index){
if(0<=index&&index<this.count){
return this.value[this.offset+index];
}throw new StringIndexOutOfBoundsException();
},"~N");
$_M(c$,"compareValue",
($fz=function(ch){
if((ch).charCodeAt(0)<128){
if(('A').charCodeAt (0) <= (ch).charCodeAt (0) && (ch).charCodeAt (0) <= ('Z').charCodeAt(0)){
return String.fromCharCode(((ch).charCodeAt(0)+(32)));
}return ch;
}return Character.toLowerCase(Character.toUpperCase(ch));
},$fz.isPrivate=true,$fz),"~N");
$_V(c$,"compareTo",
function(string){
var o1=this.offset;
var o2=string.offset;
var result;
var end=this.offset+(this.count<string.count?this.count:string.count);
var target=string.value;
while(o1<end){
if((result=(this.value[o1++]).charCodeAt(0)-(target[o2++]).charCodeAt(0))!=0){
return result;
}}
return this.count-string.count;
},"~S");
$_M(c$,"compareToIgnoreCase",
function(string){
var o1=this.offset;
var o2=string.offset;
var result;
var end=this.offset+(this.count<string.count?this.count:string.count);
var c1;
var c2;
var target=string.value;
while(o1<end){
if(((c1=this.value[o1++])).charCodeAt(0)==((c2=target[o2++])).charCodeAt(0)){
continue;}c1=this.compareValue(c1);
c2=this.compareValue(c2);
if((result=(c1).charCodeAt(0)-(c2).charCodeAt(0))!=0){
return result;
}}
return this.count-string.count;
},"~S");
$_M(c$,"concat",
function(string){
if(string.count>0&&this.count>0){
var buffer=$_A(this.count+string.count,'\0');
System.arraycopy(this.value,this.offset,buffer,0,this.count);
System.arraycopy(string.value,string.offset,buffer,this.count,string.count);
return String.instantialize(0,buffer.length,buffer);
}return this.count==0?string:this;
},"~S");
c$.copyValueOf=$_M(c$,"copyValueOf",
function(data){
return String.instantialize(data,0,data.length);
},"~A");
c$.copyValueOf=$_M(c$,"copyValueOf",
function(data,start,length){
return String.instantialize(data,start,length);
},"~A,~N,~N");
$_M(c$,"endsWith",
function(suffix){
return this.regionMatches(this.count-suffix.count,suffix,0,suffix.count);
},"~S");
$_V(c$,"equals",
function(object){
if(object===this){
return true;
}if($_O(object,String)){
var s=object;
var hashCode1=this.$hashCode;
var hashCode2=s.$hashCode;
if(this.count!=s.count||(hashCode1!=hashCode2&&hashCode1!=0&&hashCode2!=0)){
return false;
}var o1=this.offset;
var o2=s.offset;
var value1=this.value;
var value2=s.value;
for(var i=0;i<this.count;++i){
if((value1[o1+i]).charCodeAt(0)!=(value2[o2+i]).charCodeAt(0)){
return false;
}}
return true;
}return false;
},"~O");
$_M(c$,"equalsIgnoreCase",
function(string){
if(string===this){
return true;
}if(string==null||this.count!=string.count){
return false;
}var o1=this.offset;
var o2=string.offset;
var end=this.offset+this.count;
var c1;
var c2;
var target=string.value;
while(o1<end){
if(((c1=this.value[o1++])).charCodeAt(0)!=((c2=target[o2++])).charCodeAt(0)&&(Character.toUpperCase(c1)).charCodeAt(0)!=(Character.toUpperCase(c2)).charCodeAt(0)&&(Character.toLowerCase(c1)).charCodeAt(0)!=(Character.toLowerCase(c2)).charCodeAt(0)){
return false;
}}
return true;
},"~S");
$_M(c$,"getBytes",
function(start,end,data,index){
if(0<=start&&start<=end&&end<=this.count){
end+=this.offset;
try{
for(var i=this.offset+start;i<end;i++){
data[index++]=(this.value[i]).charCodeAt(0);
}
}catch(e){
if($_O(e,ArrayIndexOutOfBoundsException)){
throw new StringIndexOutOfBoundsException();
}else{
throw e;
}
}
}else{
throw new StringIndexOutOfBoundsException();
}},"~N,~N,~A,~N");
$_M(c$,"getBytes",
function(){
return this.getBytes(java.nio.charset.Charset.defaultCharset());
});
$_M(c$,"getBytes",
function(charsetName){
return null;
},"~S");
$_M(c$,"getBytes",
function(charset){
return null;
},"java.nio.charset.Charset");
$_M(c$,"getChars",
function(start,end,buffer,index){
if(0<=start&&start<=end&&end<=this.count){
System.arraycopy(this.value,start+this.offset,buffer,index,end-start);
}else{
throw new StringIndexOutOfBoundsException();
}},"~N,~N,~A,~N");
$_M(c$,"_getChars",
function(start,end,buffer,index){
System.arraycopy(this.value,start+this.offset,buffer,index,end-start);
},"~N,~N,~A,~N");
$_V(c$,"hashCode",
function(){
var hash=this.$hashCode;
if(hash==0){
var multiplier=1;
var _offset=this.offset;
var _count=this.count;
var _value=this.value;
for(var i=_offset+_count-1;i>=_offset;i--){
hash+=(_value[i]).charCodeAt(0)*multiplier;
var shifted=multiplier<<5;
multiplier=shifted-multiplier;
}
this.$hashCode=hash;
}return hash;
});
$_M(c$,"indexOf",
function(c){
if(c>0xffff){
return this.indexOfSupplementary(c,0);
}return this.fastIndexOf(c,0);
},"~N");
$_M(c$,"indexOf",
function(c,start){
if(c>0xffff){
return this.indexOfSupplementary(c,start);
}return this.fastIndexOf(c,start);
},"~N,~N");
$_M(c$,"fastIndexOf",
($fz=function(c,start){
var _count=this.count;
if(start<_count){
if(start<0){
start=0;
}var _offset=this.offset;
var last=_offset+this.count;
var _value=this.value;
for(var i=_offset+start;i<last;i++){
if((_value[i]).charCodeAt(0)==c){
return i-_offset;
}}
}return-1;
},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"indexOfSupplementary",
($fz=function(c,start){
return 0;
},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"indexOf",
function(string){
var start=0;
var subCount=string.count;
var _count=this.count;
if(subCount>0){
if(subCount>_count){
return-1;
}var target=string.value;
var subOffset=string.offset;
var firstChar=target[subOffset];
var end=subOffset+subCount;
while(true){
var i=this.indexOf(firstChar,start);
if(i==-1||subCount+i>_count){
return-1;
}var o1=this.offset+i;
var o2=subOffset;
var _value=this.value;
while(++o2<end&&(_value[++o1]).charCodeAt(0)==(target[o2]).charCodeAt(0)){
}
if(o2==end){
return i;
}start=i+1;
}
}return start<_count?start:_count;
},"~S");
$_M(c$,"indexOf",
function(subString,start){
if(start<0){
start=0;
}var subCount=subString.count;
var _count=this.count;
if(subCount>0){
if(subCount+start>_count){
return-1;
}var target=subString.value;
var subOffset=subString.offset;
var firstChar=target[subOffset];
var end=subOffset+subCount;
while(true){
var i=this.indexOf(firstChar,start);
if(i==-1||subCount+i>_count){
return-1;
}var o1=this.offset+i;
var o2=subOffset;
var _value=this.value;
while(++o2<end&&(_value[++o1]).charCodeAt(0)==(target[o2]).charCodeAt(0)){
}
if(o2==end){
return i;
}start=i+1;
}
}return start<_count?start:_count;
},"~S,~N");
$_M(c$,"isEmpty",
function(){
return this.count==0;
});
$_M(c$,"lastIndexOf",
function(c){
if(c>0xffff){
return this.lastIndexOfSupplementary(c,2147483647);
}var _count=this.count;
var _offset=this.offset;
var _value=this.value;
for(var i=_offset+_count-1;i>=_offset;--i){
if((_value[i]).charCodeAt(0)==c){
return i-_offset;
}}
return-1;
},"~N");
$_M(c$,"lastIndexOf",
function(c,start){
if(c>0xffff){
return this.lastIndexOfSupplementary(c,start);
}var _count=this.count;
var _offset=this.offset;
var _value=this.value;
if(start>=0){
if(start>=_count){
start=_count-1;
}for(var i=_offset+start;i>=_offset;--i){
if((_value[i]).charCodeAt(0)==c){
return i-_offset;
}}
}return-1;
},"~N,~N");
$_M(c$,"lastIndexOfSupplementary",
($fz=function(c,start){
return 0;
},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"lastIndexOf",
function(string){
return this.lastIndexOf(string,this.count);
},"~S");
$_M(c$,"lastIndexOf",
function(subString,start){
var subCount=subString.count;
if(subCount<=this.count&&start>=0){
if(subCount>0){
if(start>this.count-subCount){
start=this.count-subCount;
}var target=subString.value;
var subOffset=subString.offset;
var firstChar=target[subOffset];
var end=subOffset+subCount;
while(true){
var i=this.lastIndexOf(firstChar,start);
if(i==-1){
return-1;
}var o1=this.offset+i;
var o2=subOffset;
while(++o2<end&&(this.value[++o1]).charCodeAt(0)==(target[o2]).charCodeAt(0)){
}
if(o2==end){
return i;
}start=i-1;
}
}return start<this.count?start:this.count;
}return-1;
},"~S,~N");
$_M(c$,"length",
function(){
return this.count;
});
$_M(c$,"regionMatches",
function(thisStart,string,start,length){
if(string==null){
throw new NullPointerException();
}if(start<0||string.count-start<length){
return false;
}if(thisStart<0||this.count-thisStart<length){
return false;
}if(length<=0){
return true;
}var o1=this.offset+thisStart;
var o2=string.offset+start;
var value1=this.value;
var value2=string.value;
for(var i=0;i<length;++i){
if((value1[o1+i]).charCodeAt(0)!=(value2[o2+i]).charCodeAt(0)){
return false;
}}
return true;
},"~N,~S,~N,~N");
$_M(c$,"regionMatches",
function(ignoreCase,thisStart,string,start,length){
if(!ignoreCase){
return this.regionMatches(thisStart,string,start,length);
}if(string!=null){
if(thisStart<0||length>this.count-thisStart){
return false;
}if(start<0||length>string.count-start){
return false;
}thisStart+=this.offset;
start+=string.offset;
var end=thisStart+length;
var c1;
var c2;
var target=string.value;
while(thisStart<end){
if(((c1=this.value[thisStart++])).charCodeAt(0)!=((c2=target[start++])).charCodeAt(0)&&(Character.toUpperCase(c1)).charCodeAt(0)!=(Character.toUpperCase(c2)).charCodeAt(0)&&(Character.toLowerCase(c1)).charCodeAt(0)!=(Character.toLowerCase(c2)).charCodeAt(0)){
return false;
}}
return true;
}throw new NullPointerException();
},"~B,~N,~S,~N,~N");
$_M(c$,"replace",
function(oldChar,newChar){
var buffer=this.value;
var _offset=this.offset;
var _count=this.count;
var idx=_offset;
var last=_offset+_count;
var copied=false;
while(idx<last){
if((buffer[idx]).charCodeAt(0)==(oldChar).charCodeAt(0)){
if(!copied){
var newBuffer=$_A(_count,'\0');
System.arraycopy(buffer,_offset,newBuffer,0,_count);
buffer=newBuffer;
idx-=_offset;
last-=_offset;
copied=true;
}buffer[idx]=newChar;
}idx++;
}
return copied?String.instantialize(0,this.count,buffer):this;
},"~N,~N");
$_M(c$,"replace",
function(target,replacement){
if(target==null){
throw new NullPointerException("target==null");
}if(replacement==null){
throw new NullPointerException("replacement==null");
}var targetString=target.toString();
var matchStart=this.indexOf(targetString,0);
if(matchStart==-1){
return this;
}var replacementString=replacement.toString();
var targetLength=targetString.length;
if(targetLength==0){
var resultLength=(this.count+2)*replacementString.length;
var result=new StringBuilder(resultLength);
result.append(replacementString);
for(var i=this.offset;i<this.count;++i){
result.append(this.value[i]);
result.append(replacementString);
}
return result.toString();
}var result=new StringBuilder(this.count);
var searchStart=0;
do{
result.append(this.value,this.offset+searchStart,matchStart-searchStart);
result.append(replacementString);
searchStart=matchStart+targetLength;
}while((matchStart=this.indexOf(targetString,searchStart))!=-1);
result.append(this.value,this.offset+searchStart,this.count-searchStart);
return result.toString();
},"CharSequence,CharSequence");
$_M(c$,"startsWith",
function(prefix){
return this.startsWith(prefix,0);
},"~S");
$_M(c$,"startsWith",
function(prefix,start){
return this.regionMatches(start,prefix,0,prefix.count);
},"~S,~N");
$_M(c$,"substring",
function(start){
if(start==0){
return this;
}if(0<=start&&start<=this.count){
return String.instantialize(this.offset+start,this.count-start,this.value);
}throw new StringIndexOutOfBoundsException(start);
},"~N");
$_M(c$,"substring",
function(start,end){
if(start==0&&end==this.count){
return this;
}if(0<=start&&start<=end&&end<=this.count){
return String.instantialize(this.offset+start,end-start,this.value);
}throw new StringIndexOutOfBoundsException();
},"~N,~N");
$_M(c$,"toCharArray",
function(){
var buffer=$_A(this.count,'\0');
System.arraycopy(this.value,this.offset,buffer,0,this.count);
return buffer;
});
$_M(c$,"toLowerCase",
function(){
return this;
});
$_M(c$,"toLowerCase",
function(locale){
return this;
},"java.util.Locale");
$_M(c$,"toString",
function(){
return this;
});
$_M(c$,"toUpperCase",
function(){
return this;
});
$_M(c$,"toUpperCase",
function(locale){
return this;
},"java.util.Locale");
$_M(c$,"trim",
function(){
var start=this.offset;
var last=this.offset+this.count-1;
var end=last;
while((start<=end)&&((this.value[start]).charCodeAt(0)<=(' ').charCodeAt(0))){
start++;
}
while((end>=start)&&((this.value[end]).charCodeAt(0)<=(' ').charCodeAt(0))){
end--;
}
if(start==this.offset&&end==last){
return this;
}return String.instantialize(start,end-start+1,this.value);
});
c$.valueOf=$_M(c$,"$valueOf",
function(data){
return String.instantialize(data,0,data.length);
},"~A");
c$.valueOf=$_M(c$,"$valueOf",
function(data,start,length){
return String.instantialize(data,start,length);
},"~A,~N,~N");
c$.valueOf=$_M(c$,"$valueOf",
function(value){
var s;
if((value).charCodeAt(0)<128){
s=String.instantialize(value.charCodeAt(0),1,String.ASCII);
}else{
s=String.instantialize(0,1,[value]);
}s.$hashCode=(value).charCodeAt(0);
return s;
},"~N");
c$.valueOf=$_M(c$,"$valueOf",
function(value){
return Double.toString(value);
},"~N");
c$.valueOf=$_M(c$,"$valueOf",
function(value){
return Float.toString(value);
},"~N");
c$.valueOf=$_M(c$,"$valueOf",
function(value){
return Integer.toString(value);
},"~N");
c$.valueOf=$_M(c$,"$valueOf",
function(value){
return Long.toString(value);
},"~N");
c$.valueOf=$_M(c$,"$valueOf",
function(value){
return value!=null?value.toString():"null";
},"~O");
c$.valueOf=$_M(c$,"$valueOf",
function(value){
return value?"true":"false";
},"~B");
$_M(c$,"contentEquals",
function(strbuf){
{
var size=strbuf.length();
if(this.count!=size){
return false;
}return this.regionMatches(0,String.instantialize(0,size,strbuf.getValue()),0,size);
}},"StringBuffer");
$_M(c$,"contentEquals",
function(cs){
if(cs==null){
throw new NullPointerException();
}var len=cs.length();
if(len!=this.count){
return false;
}if(len==0&&this.count==0){
return true;
}return this.regionMatches(0,cs.toString(),0,len);
},"CharSequence");
$_M(c$,"matches",
function(regularExpression){
return java.util.regex.Pattern.matches(regularExpression,this);
},"~S");
$_M(c$,"replaceAll",
function(regularExpression,replacement){
return java.util.regex.Pattern.compile(regularExpression).matcher(this).replaceAll(replacement);
},"~S,~S");
$_M(c$,"replaceFirst",
function(regularExpression,replacement){
return java.util.regex.Pattern.compile(regularExpression).matcher(this).replaceFirst(replacement);
},"~S,~S");
$_M(c$,"split",
function(regularExpression){
return $plit(regularExpression,0);
},"~S");
$_M(c$,"split",
function(regularExpression,limit){
return null;
},"~S,~N");
$_V(c$,"subSequence",
function(start,end){
return this.substring(start,end);
},"~N,~N");
$_M(c$,"contains",
function(cs){
if(cs==null){
throw new NullPointerException();
}return this.indexOf(cs.toString())>=0;
},"CharSequence");
$_H();
c$=$_T(String,"CaseInsensitiveComparator",null,[java.util.Comparator,java.io.Serializable]);
$_V(c$,"compare",
function(a,b){
return a.compareToIgnoreCase(b);
},"~S,~S");
c$=$_P();
$_S(c$,
"REPLACEMENT_CHAR",String.fromCharCode(0xfffd));
c$.CASE_INSENSITIVE_ORDER=c$.prototype.CASE_INSENSITIVE_ORDER=new String.CaseInsensitiveComparator();
$_S(c$,
"EMPTY_CHAR_ARRAY",$_A(0,'\0'),
"ASCII",null);
{
($t$=String.ASCII=$_A(128,'\0'),String.prototype.ASCII=String.ASCII,$t$);
for(var i=0;i<String.ASCII.length;++i){
String.ASCII[i]=String.fromCharCode(i);
}
}});
