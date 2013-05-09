$_L(null,"java.lang.Short",["java.lang.NumberFormatException"],function(){
c$=$_C(function(){
this.value=0;
$_Z(this,arguments);
},java.lang,"Short");
$_K(c$,
function(string){
this.construct(Short.parseShort(string));
},"~S");
$_K(c$,
function(value){
this.value=value;
},"~N");
c$.decode=$_M(c$,"decode",
function(string){
return null;
},"~S");
$_V(c$,"equals",
function(object){
return($_O(object,Short))&&(this.value==(object).value);
},"~O");
c$.parseShort=$_M(c$,"parseShort",
function(string){
return Short.parseShort(string,10);
},"~S");
c$.parseShort=$_M(c$,"parseShort",
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
return Short.$valueOf(Short.parseShort(string));
},"~S");
c$.$valueOf=$_M(c$,"$valueOf",
function(string,radix){
return Short.$valueOf(Short.parseShort(string,radix));
},"~S,~N");
c$.$valueOf=$_M(c$,"$valueOf",
function(s){
return s<-128||s>=128?new Short(s):Short.SMALL_VALUES[s+128];
},"~N");
$_S(c$,
"MAX_VALUE",0x7FFF,
"MIN_VALUE",0x8000,
"SIZE",16,
"TYPE",null);
c$.SMALL_VALUES=c$.prototype.SMALL_VALUES=new Array(256);
{
for(var i=-128;i<128;i++){
Short.SMALL_VALUES[i+128]=new Short(i);
}
}});
