$_L(null,"java.util.TimeZone",["java.lang.AssertionError","$.Character","$.IllegalArgumentException","$.NullPointerException","$.StringBuilder","java.util.Date","$.Locale"],function(){
c$=$_C(function(){
this.ID=null;
$_Z(this,arguments);
},java.util,"TimeZone",null,[java.io.Serializable,Cloneable]);
$_K(c$,
function(){
});
$_M(c$,"clone",
function(){
try{
return $_U(this,java.util.TimeZone,"clone",[]);
}catch(e){
if($_O(e,CloneNotSupportedException)){
throw new AssertionError(e);
}else{
throw e;
}
}
});
c$.getDefault=$_M(c$,"getDefault",
function(){
return java.util.TimeZone.defaultTimeZone.clone();
});
$_M(c$,"getDisplayName",
function(){
return this.getDisplayName(false,1,java.util.Locale.getDefault());
});
$_M(c$,"getDisplayName",
function(locale){
return this.getDisplayName(false,1,locale);
},"java.util.Locale");
$_M(c$,"getDisplayName",
function(daylightTime,style){
return this.getDisplayName(daylightTime,style,java.util.Locale.getDefault());
},"~B,~N");
$_M(c$,"getDisplayName",
function(daylightTime,style,locale){
if(style!=0&&style!=1){
throw new IllegalArgumentException();
}var useDaylight=daylightTime&&this.useDaylightTime();
var offset=this.getRawOffset();
if(useDaylight&&$_O(this,java.util.SimpleTimeZone)){
offset+=this.getDSTSavings();
}offset/=60000;
var sign='+';
if(offset<0){
sign='-';
offset=-offset;
}var builder=new StringBuilder(9);
builder.append("GMT");
builder.append(sign);
this.appendNumber(builder,2,Math.floor(offset/60));
builder.append(':');
this.appendNumber(builder,2,offset%60);
return builder.toString();
},"~B,~N,java.util.Locale");
$_M(c$,"appendNumber",
($fz=function(builder,count,value){
var string=Integer.toString(value);
for(var i=0;i<count-string.length;i++){
builder.append('0');
}
builder.append(string);
},$fz.isPrivate=true,$fz),"StringBuilder,~N,~N");
$_M(c$,"getID",
function(){
return this.ID;
});
$_M(c$,"getDSTSavings",
function(){
return this.useDaylightTime()?3600000:0;
});
$_M(c$,"getOffset",
function(time){
if(this.inDaylightTime(new java.util.Date(time))){
return this.getRawOffset()+this.getDSTSavings();
}return this.getRawOffset();
},"~N");
$_M(c$,"getOffset",
function(era,year,month,day,dayOfWeek,timeOfDayMillis){
return 0;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"getRawOffset",
function(){
return 0;
});
c$.getTimeZone=$_M(c$,"getTimeZone",
function(id){
return new java.util.SimpleTimeZone(0,id);
},"~S");
c$.formatTimeZoneName=$_M(c$,"formatTimeZoneName",
($fz=function(name,offset){
var buf=new StringBuilder();
var index=offset;
var length=name.length;
buf.append(name.substring(0,offset));
while(index<length){
if(Character.digit(name.charAt(index),10)!=-1){
buf.append(name.charAt(index));
if((length-(index+1))==2){
buf.append(':');
}}else if((name.charAt(index)).charCodeAt(0)==(':').charCodeAt(0)){
buf.append(':');
}index++;
}
if(buf.toString().indexOf(":")==-1){
buf.append(':');
buf.append("00");
}if(buf.toString().indexOf(":")==5){
buf.insert(4,'0');
}return buf.toString();
},$fz.isPrivate=true,$fz),"~S,~N");
$_M(c$,"hasSameRules",
function(timeZone){
if(timeZone==null){
return false;
}return this.getRawOffset()==timeZone.getRawOffset();
},"java.util.TimeZone");
$_M(c$,"inDaylightTime",
function(time){
return false;
},"java.util.Date");
c$.parseNumber=$_M(c$,"parseNumber",
($fz=function(string,offset,position){
var index=offset;
var length=string.length;
var digit;
var result=0;
while(index<length&&(digit=Character.digit(string.charAt(index),10))!=-1){
index++;
result=result*10+digit;
}
position[0]=index==offset?-1:index;
return result;
},$fz.isPrivate=true,$fz),"~S,~N,~A");
c$.setDefault=$_M(c$,"setDefault",
function(timeZone){
($t$=java.util.TimeZone.defaultTimeZone=timeZone!=null?timeZone.clone():null,java.util.TimeZone.prototype.defaultTimeZone=java.util.TimeZone.defaultTimeZone,$t$);
},"java.util.TimeZone");
$_M(c$,"setID",
function(id){
if(id==null){
throw new NullPointerException();
}this.ID=id;
},"~S");
$_M(c$,"setRawOffset",
function(offsetMillis){
},"~N");
$_M(c$,"useDaylightTime",
function(){
return false;
});
$_S(c$,
"SHORT",0,
"LONG",1);
c$.defaultTimeZone=c$.prototype.defaultTimeZone=new java.util.TimeZone();
c$.GMT=c$.prototype.GMT=new java.util.TimeZone();
});
