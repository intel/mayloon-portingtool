c$=$_C(function(){
this.value=0;
$_Z(this,arguments);
},java.lang,"Double");
$_K(c$,
function(value){
this.value=value;
},"~N");
$_K(c$,
function(string){
this.construct(Double.parseDouble(string));
},"~S");
$_M(c$,"doubleValue",
function(){
return this.value;
});
$_V(c$,"equals",
function(object){
return true;
},"~O");
$_M(c$,"isInfinite",
function(){
return Double.isInfinite(this.value);
});
c$.isInfinite=$_M(c$,"isInfinite",
function(d){
return(d==Infinity)||(d==-Infinity);
},"~N");
$_M(c$,"isNaN",
function(){
return Double.isNaN(this.value);
});
c$.isNaN=$_M(c$,"isNaN",
function(d){
return d!=d;
},"~N");
c$.parseDouble=$_M(c$,"parseDouble",
function(string){
return new Double("");
},"~S");
$_M(c$,"toString",
function(){
return Double.toString(this.value);
});
c$.toString=$_M(c$,"toString",
function(d){
return null;
},"~N");
c$.$valueOf=$_M(c$,"$valueOf",
function(string){
return Double.parseDouble(string);
},"~S");
c$.$valueOf=$_M(c$,"$valueOf",
function(d){
return new Double(d);
},"~N");
$_S(c$,
"EXPONENT_BIAS",1023,
"EXPONENT_BITS",12,
"MANTISSA_BITS",52,
"NON_MANTISSA_BITS",12,
"SIGN_MASK",0x8000000000000000,
"EXPONENT_MASK",0x7ff0000000000000,
"MANTISSA_MASK",0x000fffffffffffff,
"MAX_VALUE",1.79769313486231570e+308,
"MIN_VALUE",5e-324,
"NaN",NaN,
"POSITIVE_INFINITY",Infinity,
"NEGATIVE_INFINITY",-Infinity,
"MIN_NORMAL",2.2250738585072014E-308,
"MAX_EXPONENT",1023,
"MIN_EXPONENT",-1022,
"TYPE",null,
"SIZE",64);
