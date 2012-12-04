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
