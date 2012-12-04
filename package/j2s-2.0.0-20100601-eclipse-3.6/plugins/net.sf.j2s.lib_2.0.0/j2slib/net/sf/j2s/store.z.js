$_J("net.sf.j2s.store");
$_I(net.sf.j2s.store,"IStore");
$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore"],"net.sf.j2s.store.CookieStore",null,function(){
c$=$_T(net.sf.j2s.store,"CookieStore",null,net.sf.j2s.store.IStore);
$_V(c$,"getProperty",
function(name){
var prefix=name+"=";
var allCookies=document.cookie.split(';');
for(var i=0;i<allCookies.length;i++){
var item=allCookies[i].replace(/^\s*/,"");
if(item.indexOf(prefix)==0){
return item.substring(prefix.length,item.length);
}
}
return null;
},"~S");
$_V(c$,"setProperty",
function(name,value){
var toExpire=new Date();
if(value==null){
value="";
toExpire.setTime(new Date().getTime()-24*3600*1000);
}else{
toExpire.setTime(new Date().getTime()+365*24*3600*1000);
}
document.cookie=name+"="+value
+"; expires="+toExpire.toGMTString()
+"; path=/";
},"~S,~S");
$_V(c$,"isReady",
function(){
return true;
});
});
$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore"],"net.sf.j2s.store.XSSCookieStore",null,function(){
c$=$_C(function(){
this.url=null;
$_Z(this,arguments);
},net.sf.j2s.store,"XSSCookieStore",null,net.sf.j2s.store.IStore);
$_K(c$,
function(url){
if(url==null){
url="http://cookie.java2script.org/xss-cookie.html";
}this.url=url;
net.sf.j2s.store.XSSCookieStore.initialize(url);
},"~S");
c$.initialize=$_M(c$,"initialize",
($fz=function(url){
var ua=navigator.userAgent.toLowerCase();
try{
document.domain=document.domain;
window["xss.domain.enabled"]=true;
}catch(e){}
var xssIfr=document.getElementById("xss-cookie");
if(xssIfr!=null){
return;
}
net.sf.j2s.store.XSSCookieStore.initializeCallback();
var xssIfr=document.createElement("IFRAME");
xssIfr.id="xss-cookie";
xssIfr.src=url;
xssIfr.style.display="none";
document.body.appendChild(xssIfr);
},$fz.isPrivate=true,$fz),"~S");
c$.initializeCallback=$_M(c$,"initializeCallback",
function(){
window.xssCookieReadyCallback=function(){
net.sf.j2s.store.XSSCookieStore.initialized=true;
};
});
$_V(c$,"getProperty",
function(name){
if(!net.sf.j2s.store.XSSCookieStore.initialized){
return null;
}
var xssIfr=document.getElementById("xss-cookie");
if(xssIfr==null){
return null;
}
try{
return xssIfr.contentWindow.readCookie(name);
}catch(e){
return null;
}
},"~S");
$_V(c$,"setProperty",
function(name,value){
if(!net.sf.j2s.store.XSSCookieStore.initialized){
return;
}
var xssIfr=document.getElementById("xss-cookie");
if(xssIfr==null){
return;
}
try{
if(value==null){
xssIfr.contentWindow.createCookie(name,value,-1);
}else{
xssIfr.contentWindow.createCookie(name,value,365);
}
}catch(e){}
},"~S,~S");
$_V(c$,"isReady",
function(){
return net.sf.j2s.store.XSSCookieStore.initialized;
});
$_S(c$,
"initialized",false);

var ua=navigator.userAgent.toLowerCase();
var isOldIE=ua.indexOf("msie 5.5")!=-1||ua.indexOf("msie 5.0")!=-1;
var xssCookieURL=window["j2s.xss.cookie.url"];
var isLocal=false;
try{
isLocal=window.location.protocol=="file:"
||window.location.host.toLowerCase().indexOf("localhost")!=-1;
}catch(e){
isLocal=true;
}
if(!isLocal&&xssCookieURL!=null&&!isOldIE){
net.sf.j2s.store.XSSCookieStore.initialize(xssCookieURL);
}
});
$_J("net.sf.j2s.store");
$_L(["net.sf.j2s.store.IStore","$.CookieStore","$.XSSCookieStore"],"net.sf.j2s.store.SimpleStore",null,function(){
c$=$_C(function(){
this.store=null;
$_Z(this,arguments);
},net.sf.j2s.store,"SimpleStore",null,net.sf.j2s.store.IStore);
$_K(c$,
($fz=function(){
{
var ua=navigator.userAgent.toLowerCase();
var isOldIE=ua.indexOf("msie 5.5")!=-1||ua.indexOf("msie 5.0")!=-1;
var cookieURL=window["j2s.xss.cookie.url"];
var isLocal=false;
try{
isLocal=window.location.protocol=="file:"
||window.location.host.toLowerCase().indexOf("localhost")!=-1;
}catch(e){
isLocal=true;
}
if(!isLocal&&cookieURL!=null&&!isOldIE){
this.store=new net.sf.j2s.store.XSSCookieStore(cookieURL);
}else{
this.store=new net.sf.j2s.store.CookieStore();
}
}},$fz.isPrivate=true,$fz));
c$.getDefault=$_M(c$,"getDefault",
function(){
if(net.sf.j2s.store.SimpleStore.singleton==null){
($t$=net.sf.j2s.store.SimpleStore.singleton=new net.sf.j2s.store.SimpleStore(),net.sf.j2s.store.SimpleStore.prototype.singleton=net.sf.j2s.store.SimpleStore.singleton,$t$);
}return net.sf.j2s.store.SimpleStore.singleton;
});
$_M(c$,"getProperty",
function(name){
return this.store.getProperty(name);
},"~S");
$_M(c$,"setProperty",
function(name,value){
this.store.setProperty(name,value);
},"~S,~S");
$_M(c$,"isReady",
function(){
return this.store.isReady();
});
$_M(c$,"execute",
function(runnable){
if($_O(this.store,net.sf.j2s.store.XSSCookieStore)&&!this.store.isReady()){
{
window.xssCookieReadyCallback=(function(r){
return function(){
net.sf.j2s.store.XSSCookieStore.initialized=true;
r.run();
};
})(runnable);
}return;
}runnable.run();
},"Runnable");
$_S(c$,
"singleton",null);
});
