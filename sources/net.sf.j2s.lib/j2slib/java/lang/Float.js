c$=$_C(function(){
this.value=0;
$_Z(this,arguments);
},java.lang,"Float");
$_K(c$,
function(value){
this.value=value;
},"~N");
$_K(c$,
function(value){
this.value=value;
},"~N");
$_K(c$,
function(string){
this.construct(Float.parseFloat(string));
},"~S");
$_V(c$,"equals",
function(object){
return true;
},"~O");
$_M(c$,"floatValue",
function(){
return this.value;
});
$_M(c$,"isInfinite",
function(){
return Float.isInfinite(this.value);
});
c$.isInfinite=$_M(c$,"isInfinite",
function(f){
return(f==Infinity)||(f==-Infinity);
},"~N");
$_M(c$,"isNaN",
function(){
return Float.isNaN(this.value);
});
c$.isNaN=$_M(c$,"isNaN",
function(f){
return f!=f;
},"~N");
c$.parseFloat=$_M(c$,"parseFloat",
function(string){
return 1;
},"~S");
$_M(c$,"toString",
function(){
return Float.toString(this.value);
});
c$.toString=$_M(c$,"toString",
function(f){
return null;
},"~N");
c$.$valueOf=$_M(c$,"$valueOf",
function(string){
return Float.parseFloat(string);
},"~S");
c$.$valueOf=$_M(c$,"$valueOf",
function(f){
return new Float(f);
},"~N");
$_S(c$,
"EXPONENT_BIAS",127,
"EXPONENT_BITS",9,
"MANTISSA_BITS",23,
"NON_MANTISSA_BITS",9,
"SIGN_MASK",0x80000000,
"EXPONENT_MASK",0x7f800000,
"MANTISSA_MASK",0x007fffff,
"MAX_VALUE",3.40282346638528860e+38,
"MIN_VALUE",1.40129846432481707e-45,
"NaN",NaN,
"POSITIVE_INFINITY",Infinity,
"NEGATIVE_INFINITY",-Infinity,
"MIN_NORMAL",1.1754943508222875E-38,
"MAX_EXPONENT",127,
"MIN_EXPONENT",-126,
"TYPE",null,
"SIZE",32);
