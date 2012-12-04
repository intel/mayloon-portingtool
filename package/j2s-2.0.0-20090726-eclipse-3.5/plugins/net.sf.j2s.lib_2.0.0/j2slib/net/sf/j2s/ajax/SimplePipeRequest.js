$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRequest"],"net.sf.j2s.ajax.SimplePipeRequest",["net.sf.j2s.ajax.HttpRequest","$.SimplePipeHelper","$.SimpleSerializable","$.XHRCallbackAdapter"],function(){
c$=$_T(net.sf.j2s.ajax,"SimplePipeRequest",net.sf.j2s.ajax.SimpleRPCRequest);
c$.getPipeMode=$_M(c$,"getPipeMode",
function(){
return net.sf.j2s.ajax.SimplePipeRequest.pipeMode;
});
c$.getQueryInterval=$_M(c$,"getQueryInterval",
function(){
return net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval;
});
c$.switchToQueryMode=$_M(c$,"switchToQueryMode",
function(){
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeMode=3,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeMode=net.sf.j2s.ajax.SimplePipeRequest.pipeMode,$t$);
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval=1000,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeQueryInterval=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval,$t$);
});
c$.switchToQueryMode=$_M(c$,"switchToQueryMode",
function(ms){
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeMode=3,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeMode=net.sf.j2s.ajax.SimplePipeRequest.pipeMode,$t$);
if(ms<0){
ms=1000;
}($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval=ms,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeQueryInterval=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval,$t$);
},"~N");
c$.switchToContinuumMode=$_M(c$,"switchToContinuumMode",
function(){
($t$=net.sf.j2s.ajax.SimplePipeRequest.pipeMode=4,net.sf.j2s.ajax.SimplePipeRequest.prototype.pipeMode=net.sf.j2s.ajax.SimplePipeRequest.pipeMode,$t$);
});
c$.constructRequest=$_M(c$,"constructRequest",
function(pipeKey,pipeRequestType,rand){
($t$=net.sf.j2s.ajax.SimplePipeRequest.reqCount++,net.sf.j2s.ajax.SimplePipeRequest.prototype.reqCount=net.sf.j2s.ajax.SimplePipeRequest.reqCount,$t$);
return"k"+"="+pipeKey+"&"+"t"+"="+pipeRequestType+(rand?"&"+"r"+"="+net.sf.j2s.ajax.SimplePipeRequest.reqCount:"");
},"~S,~S,~B");
c$.sendRequest=$_M(c$,"sendRequest",
function(request,method,url,data,async){
if("GET".equals(method.toUpperCase())){
request.open(method,url+(url.indexOf('?')!=-1?"&":"?")+data,async);
request.send(null);
}else{
request.open(method,url,async);
request.send(data);
}},"net.sf.j2s.ajax.HttpRequest,~S,~S,~S,~B");
c$.pipe=$_M(c$,"pipe",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimplePipeRequest.pipeRequest(runnable);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeRequest=$_M(c$,"pipeRequest",
($fz=function(runnable){
var url=runnable.getHttpURL();
var method=runnable.getHttpMethod();
var serialize=runnable.serialize();
if(method==null){
method="POST";
}var ajaxOut=null;
{
ajaxOut=runnable.ajaxOut;
if(ajaxOut.wrapped!=true){
runnable.ajaxOut=(function(aO,r){
return function(){
aO.apply(r,[]);
r.ajaxOut=aO;
net.sf.j2s.ajax.SimplePipeRequest.ajaxPipe(r);
};
})(ajaxOut,runnable);
runnable.ajaxOut.wrapped=true;
}
}if(net.sf.j2s.ajax.SimpleRPCRequest.checkXSS(url,serialize,runnable)){
return;
}{
runnable.ajaxOut=ajaxOut;
}var url2=net.sf.j2s.ajax.SimpleRPCRequest.adjustRequestURL(method,url,serialize);
if(url2!==url){
serialize=null;
}var request=new net.sf.j2s.ajax.HttpRequest();
request.open(method,url,true);
request.registerOnReadyStateChange((function(i$,v$){
if(!$_D("net.sf.j2s.ajax.SimplePipeRequest$1")){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimplePipeRequest$1",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
function(){
var responseText=this.f$.request.getResponseText();
if(responseText==null||responseText.length==0){
this.f$.runnable.ajaxFail();
return;
}this.f$.runnable.deserialize(responseText);
this.f$.runnable.ajaxOut();
net.sf.j2s.ajax.SimplePipeRequest.ajaxPipe(this.f$.runnable);
});
c$=$_P();
}
return $_N(net.sf.j2s.ajax.SimplePipeRequest$1,i$,v$);
})(this,$_F("request",request,"runnable",runnable)));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimplePipeRunnable");
c$.updatePipeByURL=$_M(c$,"updatePipeByURL",
function(url){
var map=net.sf.j2s.ajax.SimplePipeRequest.pipeScriptMap;
var pipe=map[url];
if(pipe!=null){
pipe.queryEnded=true;
delete map[url];
}
},"~S");
c$.loadPipeScript=$_M(c$,"loadPipeScript",
function(url){
var script=document.createElement("SCRIPT");
script.type="text/javascript";
script.src=url;
script.url=url;
var iframeID=arguments[1];
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
var fun=function(){
if(iframeID!=null){
if(window.parent==null||window.parent["net"]==null)return;
if(!window.parent.net.sf.j2s.ajax.SimpleRPCRequest.cleanUp(this)){
return;
}
window.parent.net.sf.j2s.ajax.SimplePipeRequest.updatePipeByURL(this.url);
document.getElementsByTagName("HEAD")[0].removeChild(this);
var iframe=window.parent.document.getElementById(iframeID);
if(iframe!=null){
iframe.parentNode.removeChild(iframe);
}
}else{
if(window==null||window["net"]==null)return;
if(!net.sf.j2s.ajax.SimpleRPCRequest.cleanUp(this)){
return;
}
net.sf.j2s.ajax.SimplePipeRequest.updatePipeByURL(this.url);
document.getElementsByTagName("HEAD")[0].removeChild(this);
}
};
if(typeof(script.onreadystatechange)=="undefined"||!isIE){
script.onload=script.onerror=fun;
}else{
script.defer=true;
script.onreadystatechange=fun;
}
var head=document.getElementsByTagName("HEAD")[0];
head.appendChild(script);
},"~S");
c$.loadPipeIFrameScript=$_M(c$,"loadPipeIFrameScript",
function(url){
var iframe=document.createElement("IFRAME");
iframe.style.display="none";
var iframeID=null;
do{
iframeID="pipe-script-"+Math.round(10000000*Math.random());
}while(document.getElementById(iframeID)!=null);
iframe.id=iframeID;
document.body.appendChild(iframe);
var html="<html><head><title></title>";
html+="<script type=\"text/javascript\">\r\n";
html+="window[\"$p1p3p$\"] = function (string) {\r\n";
html+="		with (window.parent) {\r\n";
html+="				net.sf.j2s.ajax.SimplePipeRequest.parseReceived (string);\r\n";
html+="		};\r\n";
html+="};\r\n";
html+="window[\"$p1p3b$\"] = function (key, result) {\r\n";
html+="		with (window.parent) {\r\n";
html+="				net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack (key, result);\r\n";
html+="		};\r\n";
html+="};\r\n";
html+="</scr"+"ipt></head><body><script type=\"text/javascript\">\r\n";
if(ClassLoader.isOpera)
html+="window.setTimeout (function () {\r\n";
html+="("+net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript+") (";
html+="\""+url.replace(/"/g,"\\\"")+"\", \""+iframeID+"\"";
html+=");\r\n";
if(ClassLoader.isOpera)
html+="}, "+(net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval>>2)+");\r\n";
html+="</scr"+"ipt></body></html>";
net.sf.j2s.ajax.SimplePipeRequest.iframeDocumentWrite(iframe,html);
},"~S");
c$.iframeDocumentWrite=$_M(c$,"iframeDocumentWrite",
function(handle,html){
var handle=arguments[0];
var html=arguments[1];
if(handle.contentWindow!=null){
handle.contentWindow.location="about:blank";
}else{
handle.src="about:blank";
}
try{
var doc=handle.contentWindow.document;
doc.open();
doc.write(html);
doc.close();

document.title=document.title;
}catch(e){
window.setTimeout((function(handle,html){
return function(){
var doc=handle.contentWindow.document;
doc.open();
doc.write(html);
doc.close();

document.title=document.title;
};
})(handle,html),25);
}
},"~O,~S");
c$.pipeScript=$_M(c$,"pipeScript",
function(runnable){
var url=runnable.getPipeURL();
var requestURL=url+(url.indexOf('?')!=-1?"&":"?")+net.sf.j2s.ajax.SimplePipeRequest.constructRequest(runnable.pipeKey,"x",true);
{
net.sf.j2s.ajax.SimplePipeRequest.pipeScriptMap[requestURL]=runnable;
}if(net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url)){
net.sf.j2s.ajax.SimplePipeRequest.loadPipeIFrameScript(requestURL);
return;
}net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript(requestURL);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeSubdomainQuery=$_M(c$,"pipeSubdomainQuery",
function(runnable,domain){
var pipeKey=runnable.pipeKey;
var spr=net.sf.j2s.ajax.SimplePipeRequest;
var url=runnable.getPipeURL();
spr.pipeIFrameClean(pipeKey,url);
var ifr=document.createElement("IFRAME");
ifr.style.display="none";
var src=url+(url.indexOf('?')!=-1?"&":"?")
+spr.constructRequest(pipeKey,spr.PIPE_TYPE_SUBDOMAIN_QUERY,true)
+"&"+spr.FORM_PIPE_DOMAIN+"="+domain;
ifr.id="pipe-"+pipeKey;
ifr.src=src;
document.body.appendChild(ifr);
},"net.sf.j2s.ajax.SimplePipeRunnable,~S");
c$.pipeNotify=$_M(c$,"pipeNotify",
function(runnable){
var url=runnable.getPipeURL();
net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript(url+(url.indexOf('?')!=-1?"&":"?")+net.sf.j2s.ajax.SimplePipeRequest.constructRequest(runnable.pipeKey,"n",true));
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeNotifyCallBack=$_M(c$,"pipeNotifyCallBack",
function(key,result){
if("l".equals(result)){
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(pipe!=null){
pipe.pipeAlive=false;
pipe.pipeLost();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
}}},"~S,~S");
c$.pipeQuery=$_M(c$,"pipeQuery",
function(runnable){
var pipeRequest=new net.sf.j2s.ajax.HttpRequest();
var pipeKey=runnable.pipeKey;
var pipeMethod=runnable.getPipeMethod();
var pipeURL=runnable.getPipeURL();
pipeRequest.registerOnReadyStateChange((function(i$,v$){
if(!$_D("net.sf.j2s.ajax.SimplePipeRequest$2")){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimplePipeRequest$2",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
function(){
{
if(window==null||window["net"]==null)return;
}if(this.f$.pipeRequest.getStatus()!=200){
this.f$.runnable.queryFailedRetries++;
this.f$.runnable.queryEnded=true;
return;
}this.f$.runnable.queryFailedRetries=0;
net.sf.j2s.ajax.SimplePipeRequest.parseReceived(this.f$.pipeRequest.getResponseText());
this.f$.runnable.queryEnded=true;
});
c$=$_P();
}
return $_N(net.sf.j2s.ajax.SimplePipeRequest$2,i$,v$);
})(this,$_F("pipeRequest",pipeRequest,"runnable",runnable)));
var async=false;
{
async=true;
}var pipeRequestData=net.sf.j2s.ajax.SimplePipeRequest.constructRequest(pipeKey,"q",true);
net.sf.j2s.ajax.SimplePipeRequest.sendRequest(pipeRequest,pipeMethod,pipeURL,pipeRequestData,async);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeContinuum=$_M(c$,"pipeContinuum",
function(runnable){
var ifr=document.createElement("IFRAME");
ifr.style.display="none";
var pipeKey=runnable.pipeKey;
var spr=net.sf.j2s.ajax.SimplePipeRequest;
var url=runnable.getPipeURL();
var subdomain=arguments[1];
ifr.id="pipe-"+pipeKey;
ifr.src=url+(url.indexOf('?')!=-1?"&":"?")
+spr.constructRequest(pipeKey,spr.PIPE_TYPE_SCRIPT,true)
+(subdomain==null?""
:"&"+spr.FORM_PIPE_DOMAIN+"="+subdomain);
document.body.appendChild(ifr);
var fun=(function(key,pipeURL,created){
return function(){
var sph=net.sf.j2s.ajax.SimplePipeHelper;
var runnable=sph.getPipe(key);
if(runnable!=null){
var spr=net.sf.j2s.ajax.SimplePipeRequest;
var now=new Date().getTime();
var last=runnable.lastPipeDataReceived;
if(last==-1){
last=created;
}
if(now-last>4*spr.pipeLiveNotifyInterval){
runnable.pipeAlive=false;
runnable.pipeClosed();
sph.removePipe(key);
spr.pipeIFrameClean(key,pipeURL);
}else{
spr.pipeNotify(runnable);
window.setTimeout(arguments.callee,spr.pipeLiveNotifyInterval);
}
}
};
})(runnable.pipeKey,runnable.getPipeURL(),new Date().getTime());
window.setTimeout(fun,spr.pipeLiveNotifyInterval);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeIFrameClean=$_M(c$,"pipeIFrameClean",
function(pipeKey,urlPrefix){
var iframes=document.getElementsByTagName("IFRAME");
for(var i=0;i<iframes.length;i++){
var el=iframes[i];
if(urlPrefix!=null){
var url=null;
try{
url=el.url;
}catch(e){}
if(url!=null&&url.indexOf(urlPrefix)==0){
el.parentNode.removeChild(el);
continue;
}
}
if(el.id==pipeKey||el.id=="pipe-"+pipeKey){
el.parentNode.removeChild(el);
continue;
}
}
},"~S,~S");
c$.parseReceived=$_M(c$,"parseReceived",
function(string){
if(string==null){
return null;
}var ss=null;
var start=0;
while(string.length>start+6){
var destroyedKey="d";
var end=start+6;
if(destroyedKey.equals(string.substring(end,end+destroyedKey.length))){
var key=string.substring(start,end);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(pipe!=null){
pipe.pipeAlive=false;
pipe.pipeClosed();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
}return string.substring(end+destroyedKey.length);
}var okKey="o";
end=start+6;
if(okKey.equals(string.substring(end,end+okKey.length))){
var key=string.substring(start,end);
var runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(runnable!=null){
runnable.lastPipeDataReceived=System.currentTimeMillis();
}return string.substring(end+okKey.length);
}var isJavaScript=false;
{
isJavaScript=true;
}if(isJavaScript){
var continueKey="e";
end=start+6;
if(continueKey.equals(string.substring(end,end+continueKey.length))){
var key=string.substring(start,end);
var runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(runnable!=null){
runnable.lastPipeDataReceived=System.currentTimeMillis();
net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean(runnable.pipeKey,runnable.getPipeURL());
var pipeURL=runnable.getPipeURL();
var isXSS=net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(pipeURL);
var isSubdomain=false;
if(isXSS){
isSubdomain=net.sf.j2s.ajax.SimpleRPCRequest.isSubdomain(pipeURL);
}var subdomain=net.sf.j2s.ajax.SimplePipeRequest.adjustSubdomain(isSubdomain);
{
net.sf.j2s.ajax.SimplePipeRequest.pipeContinuum(runnable,subdomain);
}}return string.substring(end+continueKey.length);
}}if((ss=net.sf.j2s.ajax.SimpleSerializable.parseInstance(string,end))==null||!ss.deserialize(string,end)){
break;
}var key=string.substring(start,end);
var runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(runnable!=null){
runnable.lastPipeDataReceived=System.currentTimeMillis();
runnable.deal(ss);
}start=net.sf.j2s.ajax.SimplePipeRequest.restStringIndex(string,start);
}
if(start!=0){
return string.substring(start);
}return string;
},"~S");
c$.restStringIndex=$_M(c$,"restStringIndex",
function(string,start){
var idx1=string.indexOf('#',start)+1;
var idx2=string.indexOf('$',idx1);
var sizeStr=string.substring(idx1,idx2);
sizeStr=sizeStr.replaceFirst("^0+","");
var size=0;
if(sizeStr.length!=0){
try{
size=Integer.parseInt(sizeStr);
}catch(e){
if($_O(e,NumberFormatException)){
}else{
throw e;
}
}
}var end=idx2+size+1;
if(end<=string.length){
return end;
}else{
return start;
}},"~S,~N");
c$.adjustSubdomain=$_M(c$,"adjustSubdomain",
function(isSubdomain){
var subdomain=null;
if(isSubdomain){
subdomain=window.location.host;
if(subdomain!=null){
var idx=subdomain.indexOf(":");
if(idx!=-1){
subdomain=subdomain.substring(0,idx);
}
document.domain=subdomain;
}
}
return subdomain;
},"~B");
c$.ajaxPipe=$_M(c$,"ajaxPipe",
function(runnable){
net.sf.j2s.ajax.SimplePipeHelper.registerPipe(runnable.pipeKey,runnable);
var pipeURL=runnable.getPipeURL();
var isXSS=net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(pipeURL);
var isSubdomain=false;
if(isXSS){
isSubdomain=net.sf.j2s.ajax.SimpleRPCRequest.isSubdomain(pipeURL);
}if((!isXSS||isSubdomain)&&net.sf.j2s.ajax.SimplePipeRequest.pipeMode==4){
var spr=net.sf.j2s.ajax.SimplePipeRequest;
var subdomain=spr.adjustSubdomain(isSubdomain);
spr.pipeContinuum(runnable,subdomain);
}else{
var spr=net.sf.j2s.ajax.SimplePipeRequest;
if(isXSS&&isSubdomain&&spr.isSubdomainXSSSupported()){
var subdomain=spr.adjustSubdomain(isSubdomain);
spr.pipeSubdomainQuery(runnable,subdomain);
return;
}
runnable.queryEnded=true;
(function(pipeFun,key,pipeURL,created){
return function(){
var sph=net.sf.j2s.ajax.SimplePipeHelper;
var runnable=sph.getPipe(key);
if(runnable!=null){
var spr=net.sf.j2s.ajax.SimplePipeRequest;
var now=new Date().getTime();
var last=runnable.lastPipeDataReceived;
if(last==-1){
last=created;
}
if((runnable.queryEnded||now-last>=spr.pipeLiveNotifyInterval)
&&runnable.queryFailedRetries<3){
runnable.queryEnded=false;
if(runnable.received==runnable.lastPipeDataReceived
&&runnable.retries==runnable.queryFailedRetries){
runnable.queryFailedRetries++;
}
pipeFun(runnable);
}
runnable.retries=runnable.queryFailedRetries;
runnable.received=runnable.lastPipeDataReceived;
if(runnable.queryFailedRetries>=3
||now-last>3*spr.pipeLiveNotifyInterval){
runnable.pipeAlive=false;
runnable.pipeClosed();
sph.removePipe(key);
spr.pipeIFrameClean(key,pipeURL);
}else{
window.setTimeout(arguments.callee,spr.pipeQueryInterval);
}
}
};
})((!isXSS)?spr.pipeQuery:spr.pipeScript,runnable.pipeKey,
runnable.getPipeURL(),new Date().getTime())();
}},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.isSubdomainXSSSupported=$_M(c$,"isSubdomainXSSSupported",
function(){
var dua=navigator.userAgent;
var dav=navigator.appVersion;
if(dua.indexOf("Opera")!=-1&&parseFloat(dav)<9.6){
return false;
}
if(dua.indexOf("Firefox")!=-1&&parseFloat(dav)<1.5){
return false;
}
if(dua.indexOf("MSIE")!=-1&&parseFloat(dav)<6.0){
return false;
}
return true;
});
c$.subdomainInit=$_M(c$,"subdomainInit",
function(p){
p.initParameters=function(){
this.parentDomain=document.domain;
this.pipeQueryInterval=1000;
this.pipeLiveNotifyInterval=25000;
this.runnable=null;
this.lastXHR=-1;
var oThis=this;
with(window.parent){
var sph=net.sf.j2s.ajax.SimplePipeHelper;
var spr=net.sf.j2s.ajax.SimplePipeRequest;
this.runnable=sph.getPipe(this.key);
this.pipeQueryInterval=spr.getQueryInterval();
this.pipeLiveNotifyInterval=spr.pipeLiveNotifyInterval;
}
if(this.runnable==null){
eval("("+window.parent.net.sf.j2s.ajax.SimplePipeRequest.checkIFrameSrc+") ();");
}else{
this.runnable.queryEnded=true;
}
if(this.runnable!=null){
this.pipeURL=this.runnable.getPipeURL();
}
};
p.initHttpRequest=function(){
this.xhrHandle=null;
if(window.XMLHttpRequest){
this.xhrHandle=new XMLHttpRequest();
}else{
try{
this.xhrHandle=new ActiveXObject("Msxml2.XMLHTTP");
}catch(e){
this.xhrHandle=new ActiveXObject("Microsoft.XMLHTTP");
}
}
var oThis=this;
this.xhrHandle.onreadystatechange=function(){
if(oThis.xhrHandle==null){
return;
}
var state=oThis.xhrHandle.readyState;
if(state==4){
var pipeData=oThis.xhrHandle.responseText;
oThis.xhrHandle.onreadystatechange=function(){};
var pipe=oThis.runnable;
if(oThis.xhrHandle.status!=200&&pipe!=null){
oThis.xhrHandle=null;
document.domain=oThis.parentDomain;
with(window.parent){
pipe.queryFailedRetries++;
pipe.queryEnded=true;
}
return;
}
pipe.queryFailedRetries=0;
oThis.xhrHandle=null;
document.domain=oThis.parentDomain;
pipe.queryEnded=true;
with(window.parent){
net.sf.j2s.ajax.SimplePipeRequest.parseReceived(pipeData);
oThis.runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(oThis.key);
}
}
};
};
p.pipeXHRQuery=function(request,method,url,data){
if("GET"==method.toUpperCase()){
request.open(method,url+(url.indexOf('?')!=-1?"&":"?")+data,true,null,null);
data=null;
}else{
request.open(method,url,true,null,null);
}
try{
if(ClassLoader!=null&&ClassLoader.isGecko){
request.setRequestHeader("User-Agent","Java2Script/2.0.0");
}
}catch(e){

}
if(method!=null&&method.toLowerCase()=="post"){
try{
request.setRequestHeader("Content-type",
"application/x-www-form-urlencoded");
}catch(e){

}
if(request.overrideMimeType){
try{

}catch(e){

}
}
}
request.send(data);
};
p.initParameters();
},"~O");
c$.subdomainLoopQuery=$_M(c$,"subdomainLoopQuery",
function(p){
var created=new Date().getTime();
return function(){
var runnable=p.runnable;
if(runnable!=null){
if(runnable.pipeKey!=p.key){
net.sf.j2s.ajax.SimplePipeHelper.removePipe(p.key);
net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean(p.key,p.pipeURL);
return;
}
var now=new Date().getTime();
var last=runnable.lastPipeDataReceived;
if(last==-1){
last=created;
}
if((runnable.queryEnded||(now-last>=p.pipeLiveNotifyInterval
&&(p.lastXHR==-1||now-p.lastXHR>=p.pipeLiveNotifyInterval)))
&&runnable.queryFailedRetries<3){
runnable.queryEnded=false;
var method=null;
var url=null;
var data=null;
with(window.parent){
try{
method=runnable.getPipeMethod();
url=runnable.getPipeURL();
var spr=net.sf.j2s.ajax.SimplePipeRequest;
data=spr.constructRequest(p.key,spr.PIPE_TYPE_QUERY,true);
}catch(e){
}
}
try{
document.domain=p.originalDomain;
}catch(e){};
try{
p.initHttpRequest();
}catch(e){};
try{
p.pipeXHRQuery(p.xhrHandle,method,url,data);
p.lastXHR=new Date().getTime();
}catch(e){
p.xhrHandle.onreadystatechange=function(){};
p.xhrHandle=null;
document.domain=p.parentDomain;
runnable.queryEnded=true;
runnable.queryFailedRetries++;
}
}
if(runnable.queryFailedRetries>=3
||now-last>3*p.pipeLiveNotifyInterval){
document.domain=p.parentDomain;
with(window.parent){
runnable.pipeAlive=false;
runnable.pipeClosed();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(p.key);
net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean(p.key,p.pipeURL);
}
}else{
window.setTimeout(arguments.callee,p.pipeQueryInterval);
}
}
};
},"~O");
c$.checkIFrameSrc=$_M(c$,"checkIFrameSrc",
function(){
var curLoc=""+window.location;
var existed=false;
with(window.parent){
var iframes=document.getElementsByTagName("IFRAME");
for(var i=0;i<iframes.length;i++){
if(iframes[i].src==curLoc){
existed=true;
break;
}
}
}
if(!existed){
var idx=curLoc.indexOf("?");
if(idx!=-1){
var urlPrefix=curLoc.substring(0,idx);
var goalURL=null;
with(window.parent){
var iframes=document.getElementsByTagName("IFRAME");
for(var i=0;i<iframes.length;i++){
if(iframes[i].src.indexOf(urlPrefix)==0){
goalURL=iframes[i].src;
break;
}
}
}
if(goalURL!=null){
window.location.replace(goalURL);
}
}
}
});
$_S(c$,
"PIPE_STATUS_OK","o",
"PIPE_STATUS_DESTROYED","d",
"PIPE_STATUS_CONTINUE","e",
"PIPE_STATUS_LOST","l",
"PIPE_TYPE_QUERY","q",
"PIPE_TYPE_SUBDOMAIN_QUERY","u",
"PIPE_TYPE_NOTIFY","n",
"PIPE_TYPE_SCRIPT","s",
"PIPE_TYPE_XSS","x",
"PIPE_TYPE_CONTINUUM","c",
"FORM_PIPE_KEY","k",
"FORM_PIPE_TYPE","t",
"FORM_PIPE_DOMAIN","d",
"FORM_PIPE_RANDOM","r",
"PIPE_KEY_LENGTH",6,
"MODE_PIPE_QUERY",3,
"MODE_PIPE_CONTINUUM",4,
"pipeMode",4,
"pipeQueryInterval",1000,
"pipeLiveNotifyInterval",25000,
"reqCount",0);
c$.pipeScriptMap=c$.prototype.pipeScriptMap=new Object();

window["$p1p3p$"]=net.sf.j2s.ajax.SimplePipeRequest.parseReceived;
window["$p1p3b$"]=net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack;
});
