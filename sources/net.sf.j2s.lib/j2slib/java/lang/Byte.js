$_L(null,"java.lang.Byte",["java.lang.NumberFormatException"],function(){
c$=$_C(function(){
this.value=0;
$_Z(this,arguments);
},java.lang,"Byte");
$_K(c$,
function(value){
this.value=value;
},"~N");
$_K(c$,
function(string){
this.construct(Byte.parseByte(string));
},"~S");
$_M(c$,"byteValue",
function(){
return this.value;
});
c$.decode=$_M(c$,"decode",
function(string){
return null;
},"~S");
$_V(c$,"equals",
function(object){
return(object===this)||($_O(object,Byte))&&(this.value==(object).value);
},"~O");
c$.parseByte=$_M(c$,"parseByte",
function(string){
var intValue=Integer.parseInt(string);
var result=intValue;
if(result==intValue){
return result;
}throw new NumberFormatException();
},"~S");
c$.parseByte=$_M(c$,"parseByte",
function(string,radix){
var intValue=Integer.parseInt(string,radix);
var result=intValue;
if(result==intValue){
return result;
}throw new NumberFormatException();
},"~S,~N");
$_M(c$,"toString",
function(){
return Integer.toString(this.value);
});
c$.toString=$_M(c$,"toString",
function(value){
return Integer.toString(value);
},"~N");
c$.$valueOf=$_M(c$,"$valueOf",
function(string){
return Byte.$valueOf(Byte.parseByte(string));
},"~S");
c$.$valueOf=$_M(c$,"$valueOf",
function(string,radix){
return Byte.$valueOf(Byte.parseByte(string,radix));
},"~S,~N");
c$.$valueOf=$_M(c$,"$valueOf",
function(b){
return Byte.VALUES[b+128];
},"~N");
$_S(c$,
"MAX_VALUE",0x7F,
"MIN_VALUE",0x80,
"SIZE",8,
"TYPE",null);
c$.VALUES=c$.prototype.VALUES=new Array(256);
{
for(var i=-128;i<128;i++){
Byte.VALUES[i+128]=new Byte(i);
}
}});
