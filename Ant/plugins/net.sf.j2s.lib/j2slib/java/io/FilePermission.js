$_L(["java.security.Permission"],"java.io.FilePermission",["java.io.File","$.FilePermissionCollection","java.lang.IllegalArgumentException","$.NullPointerException","$.StringBuilder","java.security.AccessController","$.PrivilegedAction"],function(){
c$=$_C(function(){
this.canonPath=null;
this.actions=null;
this.mask=-1;
this.includeAll=false;
this.allDir=false;
this.allSubdir=false;
$_Z(this,arguments);
},java.io,"FilePermission",java.security.Permission,java.io.Serializable);
$_K(c$,
function(path,actions){
$_R(this,java.io.FilePermission,[path]);
this.init(path,actions);
},"~S,~S");
$_M(c$,"init",
($fz=function(path,pathActions){
if(pathActions==null||pathActions.isEmpty()){
throw new IllegalArgumentException("pathActions==null||pathActions.isEmpty()");
}this.actions=this.toCanonicalActionString(pathActions);
if(path==null){
throw new NullPointerException("path==null");
}if(path.equals("<<ALL FILES>>")){
this.includeAll=true;
}else{
this.canonPath=java.security.AccessController.doPrivileged((($_D("java.io.FilePermission$1")?0:java.io.FilePermission.$FilePermission$1$()),$_N(java.io.FilePermission$1,this,$_F("path",path))));
if(path.equals("*")||path.endsWith(java.io.File.separator+"*")){
this.allDir=true;
}if(path.equals("-")||path.endsWith(java.io.File.separator+"-")){
this.allSubdir=true;
}}},$fz.isPrivate=true,$fz),"~S,~S");
$_M(c$,"toCanonicalActionString",
($fz=function(action){
this.actions=action.trim().toLowerCase();
this.mask=this.getMask(this.actions);
var len=java.io.FilePermission.actionList.length;
var highestBitMask=1<<(len-1);
var result=new StringBuilder();
var addedItem=false;
for(var i=0;i<len;i++){
if((highestBitMask&this.mask)!=0){
if(addedItem){
result.append(",");
}result.append(java.io.FilePermission.actionList[i]);
addedItem=true;
}highestBitMask=highestBitMask>>1;
}
return result.toString();
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getMask",
($fz=function(actionNames){
var actionInt=0;
var head=0;
var tail=0;
do{
tail=actionNames.indexOf(",",head);
var action=tail>0?actionNames.substring(head,tail).trim():actionNames.substring(head).trim();
if(action.equals("read")){
actionInt|=8;
}else if(action.equals("write")){
actionInt|=4;
}else if(action.equals("execute")){
actionInt|=2;
}else if(action.equals("delete")){
actionInt|=1;
}else{
throw new IllegalArgumentException("Invalid action:"+action);
}head=tail+1;
}while(tail>0);
return actionInt;
},$fz.isPrivate=true,$fz),"~S");
$_V(c$,"getActions",
function(){
return this.actions;
});
$_V(c$,"equals",
function(obj){
if($_O(obj,java.io.FilePermission)){
var fp=obj;
if(fp.includeAll||this.includeAll){
return fp.includeAll==this.includeAll;
}return fp.canonPath.equals(this.canonPath);
}return false;
},"~O");
$_V(c$,"implies",
function(p){
var match=this.impliesMask(p);
return match!=0&&match==(p).mask;
},"java.security.Permission");
$_M(c$,"impliesMask",
function(p){
if(!($_O(p,java.io.FilePermission))){
return 0;
}var fp=p;
var matchedMask=this.mask&fp.mask;
if(matchedMask==0){
return 0;
}if(this.includeAll){
return matchedMask;
}if(fp.includeAll){
return 0;
}var thisLength=this.canonPath.length;
if(this.allSubdir&&thisLength==2&&!fp.canonPath.equals(java.io.File.separator)){
return matchedMask;
}if(fp.allSubdir&&!this.allSubdir){
return 0;
}if(fp.allDir&&!this.allSubdir&&!this.allDir){
return 0;
}var includeDir=false;
var pLength=fp.canonPath.length;
if(this.allDir||this.allSubdir){
thisLength--;
}if(fp.allDir||fp.allSubdir){
pLength--;
}for(var i=0;i<pLength;i++){
var pChar=fp.canonPath.charAt(i);
if(i>=thisLength){
if(i==thisLength){
if(this.allSubdir){
return matchedMask;
}if(this.allDir){
includeDir=true;
}}if(!includeDir){
return 0;
}if((pChar).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0)){
return 0;
}}else{
if((this.canonPath.charAt(i)).charCodeAt(0)!=(pChar).charCodeAt(0)){
return 0;
}}}
if(pLength==thisLength){
if(this.allSubdir){
return fp.allSubdir||fp.allDir?matchedMask:0;
}return this.allDir==fp.allDir?matchedMask:0;
}return includeDir?matchedMask:0;
},"java.security.Permission");
$_V(c$,"newPermissionCollection",
function(){
return new java.io.FilePermissionCollection();
});
$_V(c$,"hashCode",
function(){
return(this.canonPath==null?this.getName().hashCode():this.canonPath.hashCode())+this.mask;
});
c$.$FilePermission$1$=function(){
$_H();
c$=$_W(java.io,"FilePermission$1",null,java.security.PrivilegedAction);
$_V(c$,"run",
function(){
try{
return new java.io.File(this.f$.path).getCanonicalPath();
}catch(e){
if($_O(e,java.io.IOException)){
return this.f$.path;
}else{
throw e;
}
}
});
c$=$_P();
};
$_S(c$,
"actionList",["read","write","execute","delete"]);
});
