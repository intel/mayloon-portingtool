$_J("java.security");
$_L(null,"java.security.AccessControlContext",["java.lang.NullPointerException","java.security.AccessControlException","$.SecurityPermission","java.util.ArrayList"],function(){
c$=$_C(function(){
this.context=null;
this.combiner=null;
this.inherited=null;
$_Z(this,arguments);
},java.security,"AccessControlContext");
$_K(c$,
function(acc,combiner){
var sm=System.getSecurityManager();
if(sm!=null){
sm.checkPermission(new java.security.SecurityPermission("createAccessControlContext"));
}this.context=acc.context;
this.combiner=combiner;
},"java.security.AccessControlContext,java.security.DomainCombiner");
$_K(c$,
function(context){
if(context==null){
throw new NullPointerException("context can not be null");
}if(context.length!=0){
var a=new java.util.ArrayList();
for(var i=0;i<context.length;i++){
if(context[i]!=null&&!a.contains(context[i])){
a.add(context[i]);
}}
if(a.size()!=0){
this.context=new Array(a.size());
a.toArray(this.context);
}}if(this.context==null){
this.context=new Array(0);
}},"~A");
$_K(c$,
function(stack,inherited){
this.construct(stack);
this.inherited=inherited;
},"~A,java.security.AccessControlContext");
$_K(c$,
function(stack,combiner){
this.construct(stack);
this.combiner=combiner;
},"~A,java.security.DomainCombiner");
$_M(c$,"checkPermission",
function(perm){
if(perm==null){
throw new NullPointerException("Permission cannot be null");
}for(var i=0;i<this.context.length;i++){
if(!this.context[i].implies(perm)){
throw new java.security.AccessControlException("Permission check failed"+perm,perm);
}}
if(this.inherited!=null){
this.inherited.checkPermission(perm);
}},"java.security.Permission");
$_M(c$,"equals",
function(obj){
if(this===obj){
return true;
}if($_O(obj,java.security.AccessControlContext)){
var that=obj;
if(this.combiner!=null){
return this.combiner.equals(that.combiner);
}return that.combiner==null;
}return false;
},"~O");
$_M(c$,"getDomainCombiner",
function(){
var sm=System.getSecurityManager();
if(sm!=null){
sm.checkPermission(new java.security.SecurityPermission("getDomainCombiner"));
}return this.combiner;
});
$_M(c$,"hashCode",
function(){
var hash=0;
for(var i=0;i<this.context.length;i++){
hash^=this.context[i].hashCode();
}
return hash;
});
});
