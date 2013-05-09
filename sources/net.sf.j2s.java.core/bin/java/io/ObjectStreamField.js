$_L(null,"java.io.ObjectStreamField",["java.lang.Boolean","$.Byte","$.Character","$.Double","$.Float","$.Long","$.NullPointerException","$.Short","java.lang.ref.WeakReference","java.util.Arrays"],function(){
c$=$_C(function(){
this.name=null;
this.type=null;
this.offset=0;
this.typeString=null;
this.unshared=false;
this.isDeserialized=false;
this.assocFieldID=-1;
$_Z(this,arguments);
},java.io,"ObjectStreamField",null,Comparable);
$_K(c$,
function(name,cl){
if(name==null||cl==null){
throw new NullPointerException();
}this.name=name;
this.type=new java.lang.ref.WeakReference(cl);
},"~S,Class");
$_K(c$,
function(name,cl,unshared){
if(name==null||cl==null){
throw new NullPointerException();
}this.name=name;
this.type=(cl.getClassLoader()==null)?cl:new java.lang.ref.WeakReference(cl);
this.unshared=unshared;
},"~S,Class,~B");
$_K(c$,
function(signature,name){
if(name==null){
throw new NullPointerException();
}this.name=name;
this.typeString=signature.$replace('.', '/').intern();
this.defaultResolve();
this.isDeserialized=true;
},"~S,~S");
$_V(c$,"compareTo",
function(o){
var f=o;
var thisPrimitive=this.isPrimitive();
var fPrimitive=f.isPrimitive();
if(thisPrimitive!=fPrimitive){
return thisPrimitive?-1:1;
}return this.getName().compareTo(f.getName());
},"~O");
$_M(c$,"getName",
function(){
return this.name;
});
$_M(c$,"getOffset",
function(){
return this.offset;
});
$_M(c$,"getTypeInternal",
function(){
if($_O(this.type,java.lang.ref.WeakReference)){
return(this.type).get();
}return this.type;
});
$_M(c$,"getType",
function(){
var cl=this.getTypeInternal();
return cl;
});
$_M(c$,"getTypeCode",
function(){
var t=this.getTypeInternal();
if(t===Integer.TYPE){
return'I';
}if(t===Byte.TYPE){
return'B';
}if(t===Character.TYPE){
return'C';
}if(t===Short.TYPE){
return'S';
}if(t===Boolean.TYPE){
return'Z';
}if(t===Long.TYPE){
return'J';
}if(t===Float.TYPE){
return'F';
}if(t===Double.TYPE){
return'D';
}if(t.isArray()){
return'[';
}return'L';
});
$_M(c$,"getTypeString",
function(){
if(this.isPrimitive()){
return null;
}if(this.typeString==null){
var t=this.getTypeInternal();
var typeName=t.getName().$replace('.', '/');
var str=(t.isArray())?typeName:("L"+typeName+';');
this.typeString=str.intern();
}return this.typeString;
});
$_M(c$,"isPrimitive",
function(){
return true;
});
$_M(c$,"setOffset",
function(newValue){
this.offset=newValue;
},"~N");
$_V(c$,"toString",
function(){
return this.getClass().getName()+'(' + this.getName () + ':' + this.getTypeInternal () + ')';
});
c$.sortFields=$_M(c$,"sortFields",
function(fields){
if(fields.length>1){
var fieldDescComparator=(($_D("java.io.ObjectStreamField$1")?0:java.io.ObjectStreamField.$ObjectStreamField$1$()),$_N(java.io.ObjectStreamField$1,this,null));
java.util.Arrays.sort(fields,fieldDescComparator);
}},"~A");
$_M(c$,"resolve",
function(loader){
if(this.typeString==null&&this.isPrimitive()){
this.typeString=String.valueOf(this.getTypeCode());
}if(this.typeString.length==1){
if(this.defaultResolve()){
return;
}}var className=this.typeString.$replace('/', '.');
if((className.charAt(0)).charCodeAt(0)==('L').charCodeAt(0)){
className=className.substring(1,className.length-1);
}try{
var cl=Class.forName(className,false,loader);
this.type=(cl.getClassLoader()==null)?cl:new java.lang.ref.WeakReference(cl);
}catch(e){
if($_O(e,ClassNotFoundException)){
}else{
throw e;
}
}
},"ClassLoader");
$_M(c$,"isUnshared",
function(){
return this.unshared;
});
$_M(c$,"setUnshared",
function(unshared){
this.unshared=unshared;
},"~B");
$_M(c$,"defaultResolve",
($fz=function(){
switch(this.typeString.charAt(0)){
case'I':
this.type=Integer.TYPE;
return true;
case'B':
this.type=Byte.TYPE;
return true;
case'C':
this.type=Character.TYPE;
return true;
case'S':
this.type=Short.TYPE;
return true;
case'Z':
this.type=Boolean.TYPE;
return true;
case'J':
this.type=Long.TYPE;
return true;
case'F':
this.type=Float.TYPE;
return true;
case'D':
this.type=Double.TYPE;
return true;
default:
this.type=JavaObject;
return false;
}
},$fz.isPrivate=true,$fz));
c$.$ObjectStreamField$1$=function(){
$_H();
c$=$_W(java.io,"ObjectStreamField$1",null,java.util.Comparator);
$_V(c$,"compare",
function(f1,f2){
return f1.compareTo(f2);
},"java.io.ObjectStreamField,java.io.ObjectStreamField");
c$=$_P();
};
$_S(c$,
"FIELD_IS_NOT_RESOLVED",-1,
"FIELD_IS_ABSENT",-2);
});
