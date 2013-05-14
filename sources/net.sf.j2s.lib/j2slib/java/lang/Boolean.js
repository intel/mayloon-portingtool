c$=$_C(function(){
this.value=false;
$_Z(this,arguments);
},java.lang,"Boolean",null,[java.io.Serializable,Comparable]);
$_K(c$,
function(string){
this.construct(Boolean.parseBoolean(string));
},"~S");
$_K(c$,
function(value){
this.value=value;
},"~B");
$_M(c$,"booleanValue",
function(){
return this.value;
});
$_V(c$,"equals",
function(o){
return(o===this)||(($_O(o,Boolean))&&(this.value==(o).value));
},"~O");
$_V(c$,"compareTo",
function(that){
return this.value==that.value?0:this.value?1:-1;
},"Boolean");
$_V(c$,"hashCode",
function(){
return this.value?1231:1237;
});
$_M(c$,"toString",
function(){
return String.valueOf(this.value);
});
c$.getBoolean=$_M(c$,"getBoolean",
function(string){
if(string==null||string.length==0){
return false;
}return(Boolean.parseBoolean(System.getProperty(string)));
},"~S");
c$.parseBoolean=$_M(c$,"parseBoolean",
function(s){
return"true".equalsIgnoreCase(s);
},"~S");
c$.toString=$_M(c$,"toString",
function(value){
return String.valueOf(value);
},"~B");
c$.$valueOf=$_M(c$,"$valueOf",
function(string){
return Boolean.parseBoolean(string)?Boolean.TRUE:Boolean.FALSE;
},"~S");
c$.$valueOf=$_M(c$,"$valueOf",
function(b){
return b?Boolean.TRUE:Boolean.FALSE;
},"~B");
$_S(c$,
"TYPE",null);
c$.TRUE=c$.prototype.TRUE=new Boolean(true);
c$.FALSE=c$.prototype.FALSE=new Boolean(false);
