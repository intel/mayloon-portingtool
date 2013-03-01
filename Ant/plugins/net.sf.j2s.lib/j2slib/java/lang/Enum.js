$_L(null,"java.lang.Enum",["java.lang.CloneNotSupportedException","$.IllegalArgumentException","$.NullPointerException","org.apache.harmony.luni.util.Msg"],function(){
c$=$_C(function(){
this.$name=null;
this.$ordinal=0;
$_Z(this,arguments);
},java.lang,"Enum",null,[java.io.Serializable,Comparable]);
$_K(c$,
function(name,ordinal){
this.$name=name;
this.$ordinal=ordinal;
},"~S,~N");
$_M(c$,"name",
function(){
return this.$name;
});
$_M(c$,"ordinal",
function(){
return this.$ordinal;
});
$_V(c$,"toString",
function(){
return this.$name;
});
$_V(c$,"equals",
function(other){
return this===other;
},"~O");
$_V(c$,"hashCode",
function(){
return this.$ordinal+(this.$name==null?0:this.$name.hashCode());
});
$_V(c$,"clone",
function(){
throw new CloneNotSupportedException(org.apache.harmony.luni.util.Msg.getString("KA004"));
});
$_V(c$,"compareTo",
function(o){
return this.$ordinal-o.$ordinal;
},"~O");
$_M(c$,"getDeclaringClass",
function(){
var myClass=this.getClass();
var mySuperClass=myClass.getSuperclass();
if(Enum===mySuperClass){
return myClass;
}return mySuperClass;
});
c$.$valueOf=$_M(c$,"$valueOf",
function(enumType,name){
if((enumType==null)||(name==null)){
throw new NullPointerException(org.apache.harmony.luni.util.Msg.getString("KA001"));
}var values=Enum.getValues(enumType);
if(values==null){
throw new IllegalArgumentException(org.apache.harmony.luni.util.Msg.getString("KA005",enumType));
}for(var enumConst,$enumConst=0,$$enumConst=values;$enumConst<$$enumConst.length&&((enumConst=$$enumConst[$enumConst])||true);$enumConst++){
if(enumConst.$name.equals(name)){
return enumConst;
}}
throw new IllegalArgumentException(org.apache.harmony.luni.util.Msg.getString("KA006",name,enumType));
},"Class,~S");
c$.getValues=$_M(c$,"getValues",
function(enumType){
try{
var values=enumType.getMethod("values",[null]);
values.setAccessible(true);
return values.invoke(enumType,Clazz.castNullAs("Array"));
}catch(e){
if($_O(e,Exception)){
return null;
}else{
throw e;
}
}
},"Class");
});
