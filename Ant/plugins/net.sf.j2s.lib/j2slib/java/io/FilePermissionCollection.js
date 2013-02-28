$_L(["java.security.PermissionCollection","java.util.Vector"],"java.io.FilePermissionCollection",["java.lang.IllegalArgumentException","$.IllegalStateException"],function(){
c$=$_C(function(){
this.permissions=null;
$_Z(this,arguments);
},java.io,"FilePermissionCollection",java.security.PermissionCollection,java.io.Serializable);
$_Y(c$,function(){
this.permissions=new java.util.Vector();
});
$_V(c$,"add",
function(permission){
if(this.isReadOnly()){
throw new IllegalStateException();
}if($_O(permission,java.io.FilePermission)){
this.permissions.addElement(permission);
}else{
throw new IllegalArgumentException(permission.toString());
}},"java.security.Permission");
$_V(c$,"elements",
function(){
return this.permissions.elements();
});
$_V(c$,"implies",
function(permission){
if($_O(permission,java.io.FilePermission)){
var fp=permission;
var matchedMask=0;
var i=0;
while(i<this.permissions.size()&&((matchedMask&fp.mask)!=fp.mask)){
matchedMask|=(this.permissions.elementAt(i)).impliesMask(permission);
i++;
}
return((matchedMask&fp.mask)==fp.mask);
}return false;
},"java.security.Permission");
});
