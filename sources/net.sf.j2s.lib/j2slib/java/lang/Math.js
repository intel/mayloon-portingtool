$_L(null,"java.lang.Math",["java.lang.Double","$.Float","java.util.Random"],function(){
c$=$_T(java.lang,"Math");
c$.abs=$_M(c$,"abs",
function(d){
return 0.0;
},"~N");
c$.abs=$_M(c$,"abs",
function(f){
return 0;
},"~N");
c$.abs=$_M(c$,"abs",
function(i){
return i>=0?i:-i;
},"~N");
c$.abs=$_M(c$,"abs",
function(l){
return l>=0?l:-l;
},"~N");
c$.max=$_M(c$,"max",
function(d1,d2){
if(d1>d2){
return d1;
}if(d1<d2){
return d2;
}if(d1!=d2){
return NaN;
}return 0.0;
},"~N,~N");
c$.max=$_M(c$,"max",
function(f1,f2){
if(f1>f2){
return f1;
}if(f1<f2){
return f2;
}if(f1!=f2){
return NaN;
}return 0.0;
},"~N,~N");
c$.max=$_M(c$,"max",
function(i1,i2){
return i1>i2?i1:i2;
},"~N,~N");
c$.max=$_M(c$,"max",
function(l1,l2){
return l1>l2?l1:l2;
},"~N,~N");
c$.min=$_M(c$,"min",
function(d1,d2){
if(d1>d2){
return d2;
}if(d1<d2){
return d1;
}if(d1!=d2){
return NaN;
}return d2;
},"~N,~N");
c$.min=$_M(c$,"min",
function(f1,f2){
if(f1>f2){
return f2;
}if(f1<f2){
return f1;
}if(f1!=f2){
return NaN;
}return f2;
},"~N,~N");
c$.min=$_M(c$,"min",
function(i1,i2){
return i1<i2?i1:i2;
},"~N,~N");
c$.min=$_M(c$,"min",
function(l1,l2){
return l1<l2?l1:l2;
},"~N,~N");
c$.round=$_M(c$,"round",
function(d){
if(d!=d){
return 0;
}return Math.round(Math.floor(d+0.5));
},"~N");
c$.round=$_M(c$,"round",
function(f){
if(f!=f){
return 0;
}return Math.round(Math.floor(f+0.5));
},"~N");
c$.signum=$_M(c$,"signum",
function(d){
if(Double.isNaN(d)){
return NaN;
}var sig=d;
if(d>0){
sig=1.0;
}else if(d<0){
sig=-1.0;
}return sig;
},"~N");
c$.signum=$_M(c$,"signum",
function(f){
if(Float.isNaN(f)){
return NaN;
}var sig=f;
if(f>0){
sig=1.0;
}else if(f<0){
sig=-1.0;
}return sig;
},"~N");
c$.random=$_M(c$,"random",
function(){
if(Math.$random==null){
($t$=Math.$random=new java.util.Random(),Math.prototype.$random=Math.$random,$t$);
}return Math.$random.nextDouble();
});
c$.toRadians=$_M(c$,"toRadians",
function(angdeg){
return angdeg/180*3.141592653589793;
},"~N");
c$.toDegrees=$_M(c$,"toDegrees",
function(angrad){
return angrad*180/3.141592653589793;
},"~N");
$_S(c$,
"E",2.718281828459045,
"PI",3.141592653589793,
"$random",null);
});
