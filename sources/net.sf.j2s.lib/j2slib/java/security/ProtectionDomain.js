$_J("java.security");
$_L(null,"java.security.ProtectionDomain",["java.lang.StringBuilder"],function(){
c$=$_C(function(){
this.codeSource=null;
this.permissions=null;
this.classLoader=null;
this.principals=null;
this.dynamicPerms=false;
$_Z(this,arguments);
},java.security,"ProtectionDomain");
$_K(c$,
function(cs,permissions){
this.codeSource=cs;
if(permissions!=null){
permissions.setReadOnly();
}this.permissions=permissions;
},"java.security.CodeSource,java.security.PermissionCollection");
$_K(c$,
function(cs,permissions,cl,principals){
this.codeSource=cs;
if(permissions!=null){
permissions.setReadOnly();
}this.permissions=permissions;
this.classLoader=cl;
if(principals!=null){
this.principals=new Array(principals.length);
System.arraycopy(principals,0,this.principals,0,this.principals.length);
}this.dynamicPerms=true;
},"java.security.CodeSource,java.security.PermissionCollection,ClassLoader,~A");
$_M(c$,"getClassLoader",
function(){
return this.classLoader;
});
$_M(c$,"getCodeSource",
function(){
return this.codeSource;
});
$_M(c$,"getPermissions",
function(){
return this.permissions;
});
$_M(c$,"getPrincipals",
function(){
if(this.principals==null){
return new Array(0);
}var tmp=new Array(this.principals.length);
System.arraycopy(this.principals,0,tmp,0,tmp.length);
return tmp;
});
$_M(c$,"implies",
function(permission){
return this.permissions==null?false:this.permissions.implies(permission);
},"java.security.Permission");
$_M(c$,"toString",
function(){
var buf=new StringBuilder(200);
buf.append("ProtectionDomain\n");
buf.append("CodeSource=").append(this.codeSource==null?"<null>":this.codeSource.toString()).append("\n");
buf.append("ClassLoader=").append(this.classLoader==null?"<null>":this.classLoader.toString()).append("\n");
if(this.principals==null||this.principals.length==0){
buf.append("<no principals>\n");
}else{
buf.append("Principals:<\n");
for(var i=0;i<this.principals.length;i++){
buf.append("\t").append(this.principals[i]==null?"<null>":this.principals[i].toString()).append("\n");
}
buf.append(">");
}buf.append("Permissions:\n");
if(this.permissions==null){
buf.append("\t\t<no static permissions>\n");
}else{
buf.append("\t\tstatic:").append(this.permissions.toString()).append("\n");
}return buf.toString();
});
});
