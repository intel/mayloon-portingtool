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
