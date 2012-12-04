$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"IXHRCallback");
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SWTHelper");
c$.syncExec=$_M(c$,"syncExec",
function(disp,runnable){
if(disp==null||disp.isDisposed()){
runnable.run();
}else{
try{
disp.syncExec(runnable);
}catch(e){
if($_O(e,NullPointerException)){
runnable.run();
}else{
throw e;
}
}
}},"$wt.widgets.Display,Runnable");
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.IXHRCallback"],"net.sf.j2s.ajax.XHRCallbackAdapter",null,function(){
c$=$_T(net.sf.j2s.ajax,"XHRCallbackAdapter",null,net.sf.j2s.ajax.IXHRCallback);
$_V(c$,"onLoaded",
function(){
});
$_V(c$,"onReceiving",
function(){
});
$_V(c$,"onSent",
function(){
});
$_V(c$,"onOpen",
function(){
});
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.IXHRCallback"],"net.sf.j2s.ajax.XHRCallbackSWTAdapter",null,function(){
c$=$_T(net.sf.j2s.ajax,"XHRCallbackSWTAdapter",null,net.sf.j2s.ajax.IXHRCallback);
$_M(c$,"swtOnLoaded",
function(){
});
$_M(c$,"swtOnReceiving",
function(){
});
$_M(c$,"swtOnSent",
function(){
});
$_M(c$,"swtOnOpen",
function(){
});
$_V(c$,"onLoaded",
function(){
this.swtOnLoaded();
});
$_V(c$,"onReceiving",
function(){
this.swtOnReceiving();
});
$_V(c$,"onSent",
function(){
this.swtOnSent();
});
$_V(c$,"onOpen",
function(){
this.swtOnOpen();
});
});
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SimpleSerializable",null,Cloneable);
$_M(c$,"serialize",
function(){
var baseChar='B'.charCodeAt(0);
var buffer=[];
buffer[0]="WLL201";
var oClass=this.getClass();
var clazz=oClass;
var clazzName=clazz.getName();
var idx=-1;
while((idx=clazzName.lastIndexOf('$'))!=-1){
if(clazzName.length>idx+1){
var ch=clazzName.charCodeAt(idx+1);
if(ch<48||ch>=58){
break;
}
}
clazz=clazz.getSuperclass();
if(clazz==null){
break;
}
clazzName=clazz.getName();
}
buffer[1]=clazzName;
buffer[2]='#';
buffer[3]="00000000$"
var headSize=buffer.join('').length;
var fields=oClass.declared$Fields;
if(fields==null){
fields=[];
}
var filter=arguments[0];
var ignoring=(filter==null||filter.ignoreDefaultFields());
var fMap=this.fieldMapping();
for(var i=0;i<fields.length;i++){
var field=fields[i];
var name=field.name;
if(filter!=null&&!filter.accept(name))continue;
var fName=name;
if(fMap!=null&&fMap.length>1){
for(var j=0;j<fMap.length/2;j++){
if(name==fMap[j+j]){
var newName=fMap[j+j+1];
if(newName!=null&&newName.length>0){
fName=newName;
}
break;
}
}
}
var nameStr=String.fromCharCode(baseChar+fName.length)+fName;
var type=field.type;
if(type=='F' || type == 'D' || type == 'I' || type == 'L'
||type=='S' || type == 'B' || type == 'b'){
if(ignoring&&this[name]==0
&&(type=='F' || type == 'D' || type == 'I'
||type=='L' || type == 'S' || type == 'B')){
continue;
}
if(ignoring&&this[name]==false&&type=='b'){
continue;
}
buffer[buffer.length]=nameStr;
buffer[buffer.length]=type;
var value=null;
if(type=='b'){
value=(this[name]==true)?"1":"0";
}else{
value=""+this[name];
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(type=='C'){
if(ignoring&&this[name]==0||this[name]=='\0'){
continue;
}
buffer[buffer.length]=nameStr;
buffer[buffer.length]=type;
var value="";
if(typeof this[name]=='number'){
value+=this[name];
}else{
value+=this[name].charCodeAt(0);
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(type=='s'){
if(ignoring&&this[name]==null){
continue;
}
buffer[buffer.length]=nameStr;
this.serializeString(buffer,this[name]);
}else if(type.charAt(0)=='A'){
if(this[name]==null){
if(ignoring){
continue;
}
buffer[buffer.length]=nameStr;
buffer[buffer.length]=String.fromCharCode(baseChar-1);
}else{
buffer[buffer.length]=nameStr;
buffer[buffer.length]=type;
var l4=this[name].length;
if(l4>52){
if(l4>0x4000){
throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
}
buffer[buffer.length]=String.fromCharCode(baseChar-2);
var value=""+l4;
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=l4;
}else{
buffer[buffer.length]=String.fromCharCode(baseChar+l4);
}
var t=type.charAt(1);
var arr=this[name];
for(var j=0;j<arr.length;j++){
if(t=='F' || t == 'D' || t == 'I' || t == 'L'
||t=='S' || t == 'B' || t == 'b'){
var value=null;
if(type=='b'){
value=(arr[j]==true)?"1":"0";
}else{
value=""+arr[j];
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(t=='C'){
var value="";
if(typeof arr[j]=='number'){
value+=arr[j];
}else{
value+=arr[j].charCodeAt(0);
}
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=value;
}else if(t=='X'){
this.serializeString(buffer,arr[j]);
}
}
}
}
}
var strBuf=buffer.join('');
var size=strBuf.length;
if(size>0x1000000){
throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
}
var sizeStr=""+(size-headSize);
strBuf=strBuf.substring(0,headSize-sizeStr.length-1)+sizeStr+strBuf.substring(headSize-1);
return strBuf;
});
$_M(c$,"serializeString",
($fz=function(buffer,s){
var baseChar='B'.charCodeAt(0);
if(s==null){
buffer[buffer.length]='s';
buffer[buffer.length]=String.fromCharCode(baseChar-1);
}else{
var normal=/^[\r\n\t\u0020-\u007e]*$/.test(s);
if(normal){
buffer[buffer.length]='s';
}else{
buffer[buffer.length]='u';
s=Encoding.encodeBase64(Encoding.convert2UTF8(s));
}
var l4=s.length;
if(l4>52){
buffer[buffer.length]=String.fromCharCode(baseChar-2);
var value=""+l4;
buffer[buffer.length]=String.fromCharCode(baseChar+value.length);
buffer[buffer.length]=l4;
}else{
buffer[buffer.length]=String.fromCharCode(baseChar+l4);
}
buffer[buffer.length]=s;
}
},$fz.isPrivate=true,$fz),"StringBuffer,~S");
$_M(c$,"deserialize",
function(str){
var start=0;
if(arguments.length==2){
start=arguments[1];
}
var baseChar='B'.charCodeAt(0);
if(str==null||start<0)return false;
var length=str.length-start;
if(length<=7||str.substring(start,start+3)!="WLL")return false;
var index=str.indexOf('#',start);
if(index==-1)return false;
index++;
if(index>=length+start)return false;
var size=0;
var nextCharCode=str.charCodeAt(index);
if(nextCharCode>=48&&nextCharCode<=57){
var last=index;
index=str.indexOf('$',last);
if(index==-1)return false;
var sizeStr=str.substring(last+1,index);
sizeStr=sizeStr.replace(/^0+/,'');
if(sizeStr.length!=0){
try{
size=parseInt(sizeStr);
}catch(e){}
}

if(size==0)return true;
index++;
if(size>length+start-index)return false;
}
var fieldMap=[];
var fields=this.getClass().declared$Fields;
if(fields==null)return false;
for(var i=0;i<fields.length;i++){
var field=fields[i];
var name=field.name;
fieldMap[name]=true;
}
var end=index+size;
var fMap=this.fieldMapping();
while(index<start+length&&index<end){
var c1=str.charCodeAt(index++);
var l1=c1-baseChar;
if(l1<0)return true;
var fieldName=str.substring(index,index+l1);
if(fMap!=null&&fMap.length>1){
for(var i=0;i<fMap.length/2;i++){
if(fieldName==fMap[i+i+1]){
var trueName=fMap[i+i];
if(trueName!=null&&trueName.length>0){
fieldName=trueName;
}
break;
}
}
}
index+=l1;
var c2=str.charAt(index++);
if(c2=='A'){
var field=fieldMap[fieldName];
c2=str.charAt(index++);
var c3=str.charCodeAt(index++);
var l2=c3-baseChar;
if(l2<0&&l2!=-2){
if(!fieldMap[fieldName]){
continue;
}
this[fieldName]=null;
}else{
if(l2==-2){
var c4=str.charCodeAt(index++);
var l3=c4-baseChar;
if(l3<0)return true;
l2=parseInt(str.substring(index,index+l3));
if(l2>0x4000){
throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
}
index+=l3;
}
var arr=new Array(l2);
var type=c2;
for(var i=0;i<l2;i++){
var s=null;
var c4=str.charCodeAt(index++);
if(c2!='X'){
var l3=c4-baseChar;
if(l3>0){
s=str.substring(index,index+l3);
index+=l3;
}
}else{
var c5=str.charCodeAt(index++);
var l3=c5-baseChar;
if(l3>0){
s=str.substring(index,index+l3);
index+=l3;
}else if(l3==-2){
var c6=str.charCodeAt(index++);
var l4=c6-baseChar;
if(l4<0)return true;
var l5=parseInt(str.substring(index,index+l4));
if(l5<0)return true;
index+=l4;
s=str.substring(index,index+l5);
index+=l5;
}
if(c4==117){
s=Encoding.readUTF8(Encoding.decodeBase64(s));
}else if(c4==85){
s=Encoding.readUTF8(s);
}
}
if(type=='F' || type == 'D'){
arr[i]=parseFloat(s);
}else if(type=='I' || type == 'L'
||type=='S' || type == 'B'){
arr[i]=parseInt(s);
}else if(type=='C'){
arr[i]=String.fromCharCode(parseInt(s));
}else if(type=='b'){
arr[i]=(s.charAt(0)=='1' || s.charAt (0) == 't');
}else if(type=='X'){
arr[i]=s;
}
}
if(!fieldMap[fieldName]){
continue;
}
this[fieldName]=arr;
}
}else{
var c3=str.charCodeAt(index++);
var l2=c3-baseChar;
var s=null;
if(l2>0){
s=str.substring(index,index+l2);
index+=l2;
}else if(l2==-2){
var c4=str.charCodeAt(index++);
var l3=c4-baseChar;
if(l3<0)return true;
var l4=parseInt(str.substring(index,index+l3));
if(l4<0)return true;
index+=l3;
s=str.substring(index,index+l4);
index+=l4;
}
if(!fieldMap[fieldName]){
continue;
}
var type=c2;
if(type=='F' || type == 'D'){
this[fieldName]=parseFloat(s);
}else if(type=='I' || type == 'L'
||type=='S' || type == 'B'){
this[fieldName]=parseInt(s);
}else if(type=='C'){
this[fieldName]=String.fromCharCode(parseInt(s));
}else if(type=='b'){
this[fieldName]=(s.charAt(0)=='1' || s.charAt (0) == 't');
}else if(type=='s'){
this[fieldName]=s;
}else if(type=='u'){
this[fieldName]=Encoding.readUTF8(Encoding.decodeBase64(s));
}else if(type=='U'){
this[fieldName]=Encoding.readUTF8(s);
}
}
}
return true;
},"~S");
$_M(c$,"fieldMapping",
function(){
return null;
});
c$.parseInstance=$_M(c$,"parseInstance",
function(str){
var start=0;
if(arguments.length==2){
start=arguments[1];
}
if(str==null||start<0)return null;
var length=str.length-start;
if(length<=7||str.substring(start,start+3)!="WLL")return null;
var index=str.indexOf('#',start);
if(index==-1)return null;
var clazzName=str.substring(start+6,index);
clazzName=clazzName.replace(/\$/g,'.');
var runnableClass=null;
if($_D(clazzName)){
runnableClass=Clazz.evalType(clazzName);
}
if(runnableClass!=null){
var obj=new runnableClass($_G);
if(obj!=null&&$_O(obj,
net.sf.j2s.ajax.SimpleSerializable)){
return obj;
}
}
return null;
},"~S");
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"SimpleFilter");
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleSerializable"],"net.sf.j2s.ajax.SimpleRPCRunnable",null,function(){
c$=$_T(net.sf.j2s.ajax,"SimpleRPCRunnable",net.sf.j2s.ajax.SimpleSerializable);
$_M(c$,"getHttpURL",
function(){
return"simplerpc";
});
$_M(c$,"getHttpMethod",
function(){
return"POST";
});
$_M(c$,"ajaxIn",
function(){
});
$_M(c$,"ajaxOut",
function(){
});
$_M(c$,"ajaxFail",
function(){
});
});
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"ISimpleRequestInfoBinding");
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"ISimpleRequestInfo");
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"ISimpleGeoLocationBinding");
$_J("net.sf.j2s.ajax");
$_I(net.sf.j2s.ajax,"ISimpleGeoLocation");
$_J("net.sf.j2s.ajax");
$_L(null,"net.sf.j2s.ajax.SimpleRPCRequest",["java.net.URLEncoder","net.sf.j2s.ajax.HttpRequest","$.XHRCallbackAdapter"],function(){
c$=$_T(net.sf.j2s.ajax,"SimpleRPCRequest");
c$.getRequstMode=$_M(c$,"getRequstMode",
function(){
return net.sf.j2s.ajax.SimpleRPCRequest.runningMode;
});
c$.switchToAJAXMode=$_M(c$,"switchToAJAXMode",
function(){
($t$=net.sf.j2s.ajax.SimpleRPCRequest.runningMode=1,net.sf.j2s.ajax.SimpleRPCRequest.prototype.runningMode=net.sf.j2s.ajax.SimpleRPCRequest.runningMode,$t$);
});
c$.switchToLocalJavaThreadMode=$_M(c$,"switchToLocalJavaThreadMode",
function(){
($t$=net.sf.j2s.ajax.SimpleRPCRequest.runningMode=2,net.sf.j2s.ajax.SimpleRPCRequest.prototype.runningMode=net.sf.j2s.ajax.SimpleRPCRequest.runningMode,$t$);
});
c$.request=$_M(c$,"request",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimpleRPCRequest.ajaxRequest(runnable);
},"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.getClassNameURL=$_M(c$,"getClassNameURL",
function(runnable){
var oClass=runnable.getClass();
var name=oClass.getName();
while(name.indexOf('$')!=-1){
oClass=oClass.getSuperclass();
if(oClass==null){
return null;
}name=oClass.getName();
}
return name;
},"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.ajaxRequest=$_M(c$,"ajaxRequest",
($fz=function(runnable){
var url=runnable.getHttpURL();
if(url==null){
url="";
}var method=runnable.getHttpMethod();
var serialize=runnable.serialize();
if(method==null){
method="POST";
}if(net.sf.j2s.ajax.SimpleRPCRequest.checkXSS(url,serialize,runnable)){
return;
}var url2=net.sf.j2s.ajax.SimpleRPCRequest.adjustRequestURL(method,url,serialize);
if(url2!==url){
serialize=null;
}var request=new net.sf.j2s.ajax.HttpRequest();
request.open(method,url,true);
request.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimpleRPCRequest$2")?0:net.sf.j2s.ajax.SimpleRPCRequest.$SimpleRPCRequest$2$()),$_N(net.sf.j2s.ajax.SimpleRPCRequest$2,this,$_F("request",request,"runnable",runnable))));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.adjustRequestURL=$_M(c$,"adjustRequestURL",
function(method,url,serialize){
if("GET".equals(method.toUpperCase())){
try{
var query=java.net.URLEncoder.encode(serialize,"UTF-8");
if(url.indexOf('?')!=-1){
url+="&jzz="+query;
}else{
url+="?"+query;
}}catch(e){
if($_O(e,java.io.UnsupportedEncodingException)){
}else{
throw e;
}
}
}return url;
},"~S,~S,~S");
c$.isXSSMode=$_M(c$,"isXSSMode",
function(url){
if(url!=null&&(url.indexOf("http://")==0
||url.indexOf("https://")==0)){
var host=null;
var idx1=url.indexOf("//")+2;
var idx2=url.indexOf('/',9);
if(idx2!=-1){
host=url.substring(idx1,idx2);
}else{
host=url.substring(idx1);
}
var protocol=null;
var idx0=url.indexOf("://");
if(idx0!=-1){
protocol=url.substring(0,idx0+1);
}else{
protocol=window.location.protocol;
}
var port=null;
var idx3=host.indexOf(':');
if(idx3!=-1){
port=parseInt(host.substring(idx3+1));
host=host.substring(0,idx3);
}else{
if("http:"==protocol){
port=80;
}else if("https:"==protocol){
port=443;
}else{
port=window.location.port;
if(port!=""){
port=parseInt(port);
}
}
}
var loc=window.location;
var locPort=loc.port;
if(locPort==""){
if("http:"==loc.protocol){
locPort=80;
}else if("https:"==loc.protocol){
locPort=443;
}
}else{
locPort=parseInt(locPort);
}
var locHost=null;
try{
locHost=loc.host;
}catch(e){
if(arguments.length==2){
return false;
}
return true;
}
var idx4=locHost.indexOf(":");
if(idx4!=-1){
locHost=locHost.substring(0,idx4);
}
if(arguments.length==2){
return host.indexOf("."+locHost)!=-1&&locPort==port
&&loc.protocol==protocol&&loc.protocol!="file:";
}
return(locHost!=host||locPort!=port
||loc.protocol!=protocol||loc.protocol=="file:");
}
return false;
},"~S");
c$.isSubdomain=$_M(c$,"isSubdomain",
function(url){
return window["j2s.disable.subdomain.xss"]!=true
&&net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url,true);
},"~S");
c$.checkXSS=$_M(c$,"checkXSS",
function(url,serialize,runnable){
{
if(net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url)){
if(runnable.$fai13d$==true){
runnable.$fai13d$=false;
}
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(g.idSet==null){
g.idSet=new Object();
}
var rnd=null;
while(true){
var rnd=Math.random()+"0000000.*";
rnd=rnd.substring(2,8);
if(g.idSet["o"+rnd]==null){
g.idSet["o"+rnd]=runnable;
break;
}
}
var limit=7168;
if(window["script.get.url.limit"]!=null){
limit=window["script.get.url.limit"];
}
var ua=navigator.userAgent.toLowerCase();
if(ua.indexOf("msie")!=-1&&ua.indexOf("opera")==-1){
limit=2048-44;
}
limit-=url.length+36;
var contents=[];
var content=encodeURIComponent(serialize);
if(content.length>limit){
parts=Math.ceil(content.length/limit);
var lastEnd=0;
for(var i=0;i<parts;i++){
var end=(i+1)*limit;
if(end>content.length){
end=content.length;
}else{
for(var j=0;j<3;j++){
var ch=content.charAt(end-j);
if(ch=='%'){
end-=j;
break;
}
}
}
contents[i]=content.substring(lastEnd,end);
lastEnd=end;
}
}else{
contents[0]=content;
}
if(contents.length>1){
g.idSet["x"+rnd]=contents;
}


net.sf.j2s.ajax.SimpleRPCRequest.callByScript(rnd,contents.length,0,contents[0]);
contents[0]=null;
return true;
}
}return false;
},"~S,~S,net.sf.j2s.ajax.SimpleRPCRunnable");
c$.cleanUp=$_M(c$,"cleanUp",
function(scriptObj){
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
if(isIE){
if(scriptObj.onreadystatechange==null){
return false;
}
var done=false;
var state=""+scriptObj.readyState;
if(state=="loaded"||state=="complete"){
scriptObj.onreadystatechange=null;
done=true;
}
return done;
}else{
if(scriptObj.onerror==null){
return false;
}
scriptObj.onerror=null;
scriptObj.onload=null;
return true;
}
},"~O");
c$.generateCallback4Script=$_M(c$,"generateCallback4Script",
function(script,rnd,error){
return function(){
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(!g.cleanUp(script)){
return;
}
if(error){
var src=script.src;
var idx=src.indexOf("jzn=");
var rid=src.substring(idx+4,src.indexOf("&",idx));
net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(rid,null);
}
if(script.onerror!=null){
script.onerror=script.onload=null;
}else{
script.onreadystatechange=null;
}
document.getElementsByTagName("HEAD")[0].removeChild(script);
script=null;
};
},"~O,~S,~B");
c$.callByScript=$_M(c$,"callByScript",
function(rnd,length,i,content){
var g=net.sf.j2s.ajax.SimpleRPCRequest;
var runnable=g.idSet["o"+rnd];
if(runnable==null)return;
var url=runnable.getHttpURL();
var session=g.idSet["s"+rnd];
if(session!=null&&window["script.get.session.url"]!=false){
url+=";jsessionid="+session;
}
var script=document.createElement("SCRIPT");
script.type="text/javascript";
script.src=url+"?jzn="+rnd
+(length==1?"":("&jzp="+length+(i==0?"":"&jzc="+(i+1))))
+"&jzz="+content;
var okFun=g.generateCallback4Script(script,rnd,false);
var errFun=g.generateCallback4Script(script,rnd,true);
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
script.defer=true;
if(typeof(script.onreadystatechange)=="undefined"||!isIE){
script.onerror=errFun;
script.onload=okFun;
}else{
script.onreadystatechange=okFun;
}
var head=document.getElementsByTagName("HEAD")[0];
head.appendChild(script);
var timeout=30000;
if(window["j2s.ajax.reqeust.timeout"]!=null){
timeout=window["j2s.ajax.reqeust.timeout"];
}
if(timeout<1000){
timeout=1000;
}
g.idSet["h"+rnd]=window.setTimeout(errFun,timeout);
},"~S,~S,~S,~S");
c$.ieScriptCleanup=$_M(c$,"ieScriptCleanup",
function(){
var state=""+this.readyState;
if(state=="loaded"||state=="complete"){
this.onreadystatechange=null;
document.getElementsByTagName("HEAD")[0].removeChild(this);
}
});
c$.xssNotify=$_M(c$,"xssNotify",
function(nameID,response,session){
{
var ua=navigator.userAgent.toLowerCase();
if(response!=null&&ua.indexOf("msie")!=-1&&ua.indexOf("opera")==-1){
var ss=document.getElementsByTagName("SCRIPT");
for(var i=0;i<ss.length;i++){
var s=ss[i];
if(s.src!=null&&s.src.indexOf("jzn="+nameID)!=-1
&&s.readyState=="interactive"){
s.onreadystatechange=net.sf.j2s.ajax.SimpleRPCRequest.ieScriptCleanup;
}
}
}
var hKey="h"+nameID;
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(g.idSet[hKey]!=null){
window.clearTimeout(g.idSet[hKey]);
delete g.idSet[hKey];
}
}if(response==="continue"){
{
var g=net.sf.j2s.ajax.SimpleRPCRequest;
if(session!=null){
g.idSet["s"+nameID]=session;
}
var k="x"+nameID;
var xcontent=g.idSet[k];
if(xcontent!=null){

for(var i=0;i<xcontent.length;i++){
if(xcontent[i]!=null){
g.callByScript(nameID,xcontent.length,i,xcontent[i]);
xcontent[i]=null;
break;
}
}
var more=false;
for(var i=xcontent.length-1;i>=0;i--){
if(xcontent[i]!=null){
more=true;
break;
}
}
if(!more){
g.idSet[k]=null;
delete g.idSet[k];
}
}
}return;
}var runnable=null;
{
var g=net.sf.j2s.ajax.SimpleRPCRequest;
var oK="o"+nameID;
runnable=g.idSet[oK];
g.idSet[oK]=null;
delete g.idSet[oK];
var sK="s"+nameID;
if(g.idSet[sK]!=null){
g.idSet[sK]=null;
delete g.idSet[sK];
}
if(response==null&&runnable!=null){
runnable.$fai13d$=true;
runnable.ajaxFail();
return;
}
}if(response==="unsupported"||response==="exceedrequestlimit"||response==="error"){
var src=null;
{
var existed=false;
var ss=document.getElementsByTagName("SCRIPT");
for(var i=0;i<ss.length;i++){
var s=ss[i];
if(s.src!=null&&s.src.indexOf("jzn="+nameID)!=-1){
src=s.src;
existed=true;
s.onreadystatechange=null;
s.onerror=null;
s.onload=null;
document.getElementsByTagName("HEAD")[0].removeChild(s);
}
}
if(!existed&&runnable==null){
return;
}
}if(runnable!=null){
runnable.ajaxFail();
}else{
if(response==="error"){
System.err.println("[Java2Script] Sever error: URL \""+src+"\" is semantically incorrect!");
}else if(response==="unsupported"){
System.err.println("[Java2Script] Sever error: Cross site script is not supported!");
}else{
System.err.println("[Java2Script] Sever error: Exceed cross site script request limit!");
}}return;
}if(runnable!=null){
{
if(runnable.$fai13d$==true){
return;
}
}runnable.deserialize(response);
runnable.ajaxOut();
}},"~S,~S,~S");
c$.$SimpleRPCRequest$2$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCRequest$2",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
function(){
var responseText=this.f$.request.getResponseText();
if(responseText==null||responseText.length==0){
this.f$.runnable.ajaxFail();
return;
}this.f$.runnable.deserialize(responseText);
this.f$.runnable.ajaxOut();
});
c$=$_P();
};
$_S(c$,
"MODE_AJAX",1,
"MODE_LOCAL_JAVA_THREAD",2,
"runningMode",2);
{
var ajax=false;
{
ajax=true;
}if(ajax){
($t$=net.sf.j2s.ajax.SimpleRPCRequest.runningMode=1,net.sf.j2s.ajax.SimpleRPCRequest.prototype.runningMode=net.sf.j2s.ajax.SimpleRPCRequest.runningMode,$t$);
}}});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRequest"],"net.sf.j2s.ajax.SimpleRPCSWTRequest",["net.sf.j2s.ajax.HttpRequest","$.XHRCallbackSWTAdapter"],function(){
c$=$_T(net.sf.j2s.ajax,"SimpleRPCSWTRequest",net.sf.j2s.ajax.SimpleRPCRequest);
c$.swtRequest=$_M(c$,"swtRequest",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimpleRPCRequest.ajaxRequest(runnable);
},"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.swtAJAXRequest=$_M(c$,"swtAJAXRequest",
($fz=function(runnable){
var url=runnable.getHttpURL();
var method=runnable.getHttpMethod();
var serialize=runnable.serialize();
if(method==null){
method="POST";
}if(net.sf.j2s.ajax.SimpleRPCRequest.checkXSS(url,serialize,runnable)){
return;
}var url2=net.sf.j2s.ajax.SimpleRPCRequest.adjustRequestURL(method,url,serialize);
if(url2!==url){
serialize=null;
}var request=new net.sf.j2s.ajax.HttpRequest();
request.open(method,url,true);
request.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimpleRPCSWTRequest$3")?0:net.sf.j2s.ajax.SimpleRPCSWTRequest.$SimpleRPCSWTRequest$3$()),$_N(net.sf.j2s.ajax.SimpleRPCSWTRequest$3,this,$_F("request",request,"runnable",runnable))));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimpleRPCRunnable");
c$.$SimpleRPCSWTRequest$3$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimpleRPCSWTRequest$3",net.sf.j2s.ajax.XHRCallbackSWTAdapter);
$_V(c$,"swtOnLoaded",
function(){
var responseText=this.f$.request.getResponseText();
if(responseText==null||responseText.length==0){
this.f$.runnable.ajaxFail();
return;
}this.f$.runnable.deserialize(responseText);
this.f$.runnable.ajaxOut();
});
c$=$_P();
};
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleRPCRunnable"],"net.sf.j2s.ajax.SimplePipeRunnable",["net.sf.j2s.ajax.SimplePipeHelper","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.pipeKey=null;
this.pipeAlive=false;
this.destroyed=false;
this.queryFailedRetries=0;
this.queryEnded=false;
this.lastPipeDataReceived=0;
$_Z(this,arguments);
},net.sf.j2s.ajax,"SimplePipeRunnable",net.sf.j2s.ajax.SimpleRPCRunnable);
$_M(c$,"getPipeURL",
function(){
return"simplepipe";
});
$_M(c$,"getPipeMethod",
function(){
return"GET";
});
$_V(c$,"ajaxIn",
function(){
this.pipeInit();
});
$_V(c$,"ajaxFail",
function(){
this.pipeFailed();
});
$_V(c$,"ajaxOut",
function(){
if(this.pipeAlive){
this.pipeCreated();
}else{
this.pipeFailed();
}});
$_M(c$,"pipeDestroy",
function(){
if(this.destroyed){
return false;
}this.pipeAlive=false;
this.destroyed=true;
if(this.pipeKey!=null){
net.sf.j2s.ajax.SimplePipeHelper.removePipe(this.pipeKey);
this.pipeKey=null;
}return true;
});
$_M(c$,"pipeInit",
function(){
this.queryFailedRetries=0;
this.lastPipeDataReceived=-1;
});
$_M(c$,"pipeCreated",
function(){
this.destroyed=false;
});
$_M(c$,"pipeFailed",
function(){
this.pipeDestroy();
});
$_M(c$,"pipeLost",
function(){
this.pipeDestroy();
});
$_M(c$,"pipeClosed",
function(){
this.pipeDestroy();
});
$_M(c$,"pipeReset",
function(){
this.destroyed=false;
});
$_M(c$,"isPipeLive",
function(){
return this.pipeAlive&&!this.destroyed&&this.pipeKey!=null;
});
$_M(c$,"keepPipeLive",
function(){
});
$_M(c$,"updateStatus",
function(live){
if(live){
this.keepPipeLive();
this.pipeAlive=true;
}else if(this.isPipeLive()){
this.pipeDestroy();
this.pipeAlive=false;
}},"~B");
$_M(c$,"deal",
function(ss){
try{
var clazz=ss.getClass();
if("net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())){
return true;
}var method=null;
var clzz=this.getClass();
var clazzName=clzz.getName();
var idx=-1;
while((idx=clazzName.lastIndexOf('$'))!=-1){
if(clazzName.length>idx+1){
var ch=clazzName.charAt(idx+1);
if((ch).charCodeAt(0)<('0').charCodeAt (0) || (ch).charCodeAt (0) > ('9').charCodeAt(0)){
break;
}}clzz=clzz.getSuperclass();
if(clzz==null){
break;
}clazzName=clzz.getName();
}
if(clzz!=null){
method=clzz.getMethod("deal",[clazz]);
if(method!=null){
var returnType=method.getReturnType();
if(returnType===Boolean){
var result=method.invoke(this,[ss]);
return(result).booleanValue();
}}}}catch(e){
if($_O(e,Exception)){
e.printStackTrace();
}else{
throw e;
}
}
return false;
},"net.sf.j2s.ajax.SimpleSerializable");
$_s(c$,"pipeKey","s","pipeAlive","b");
});
$_J("net.sf.j2s.ajax");
c$=$_I(net.sf.j2s.ajax,"ISimplePipePriority");
$_S(c$,
"IMPORTANT",32,
"NORMAL",8,
"TRIVIAL",1);
$_J("net.sf.j2s.ajax");
c$=$_T(net.sf.j2s.ajax,"SimplePipeHelper");
$_I(net.sf.j2s.ajax.SimplePipeHelper,"IPipeThrough");
$_I(net.sf.j2s.ajax.SimplePipeHelper,"IPipeClosing");
c$.registerPipe=$_M(c$,"registerPipe",
function(key,pipe){
if(key==null||pipe==null)return;
if(net.sf.j2s.ajax.SimplePipeHelper.pipes==null){
net.sf.j2s.ajax.SimplePipeHelper.pipes=new Object();
}
net.sf.j2s.ajax.SimplePipeHelper.pipes[key]=pipe;
},"~S,net.sf.j2s.ajax.SimplePipeRunnable");
c$.removePipe=$_M(c$,"removePipe",
function(key){
delete net.sf.j2s.ajax.SimplePipeHelper.pipes[key];
},"~S");
c$.getPipe=$_M(c$,"getPipe",
function(key){
var ps=net.sf.j2s.ajax.SimplePipeHelper.pipes;
if(ps==null||key==null)return null;
return ps[key];
},"~S");
$_S(c$,
"pipes",null);
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
request.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimplePipeRequest$3")?0:net.sf.j2s.ajax.SimplePipeRequest.$SimplePipeRequest$3$()),$_N(net.sf.j2s.ajax.SimplePipeRequest$3,this,$_F("request",request,"runnable",runnable))));
request.send(serialize);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.SimplePipeRunnable");
c$.updatePipeByURL=$_M(c$,"updatePipeByURL",
function(pipeID,url){
if(url==null||url.length==0){
return;
}
var map=net.sf.j2s.ajax.SimplePipeRequest.pipeScriptMap;
var pipe=map[url];
if(pipe!=null&&pipeID!=null&&pipeID.length>0){
var stillExistedRequest=false;
var idPrefix=pipeID;
var idx=pipeID.lastIndexOf("-");
if(idx!=-1){
idPrefix=pipeID.substring(0,idx);
}
var iframes=document.getElementsByTagName("IFRAME");
for(var i=0;i<iframes.length;i++){
var el=iframes[i];
if(el.id!=null&&el.id.indexOf(idPrefix)==0){
stillExistedRequest=true;
break;
}
}
if(!stillExistedRequest){
var scripts=document.getElementsByTagName("SCRIPT");
for(var i=0;i<scripts.length;i++){
var el=scripts[i];
if(el.id!=null&&el.id.indexOf(idPrefix)==0){
stillExistedRequest=true;
break;
}
}
}
pipe.queryEnded=!stillExistedRequest;
delete map[url];
}
},"~S,~S");
c$.generatePipeScriptCallback=$_M(c$,"generatePipeScriptCallback",
function(pipeID){
return function(){
if(pipeID!=null){
var pw=window.parent;
if(pw==null||pw["net"]==null)return;
if(!pw.net.sf.j2s.ajax.SimpleRPCRequest.cleanUp(this)){
return;
}
var url=this.url;
this.url=null;
document.getElementsByTagName("HEAD")[0].removeChild(this);
var iframe=pw.document.getElementById(pipeID);
if(iframe!=null){
iframe.parentNode.removeChild(iframe);
}
pw.net.sf.j2s.ajax.SimplePipeRequest.updatePipeByURL(pipeID,url);
}else{
if(window==null||window["net"]==null)return;
if(!net.sf.j2s.ajax.SimpleRPCRequest.cleanUp(this)){
return;
}
var url=this.url;
this.url=null;
document.getElementsByTagName("HEAD")[0].removeChild(this);
net.sf.j2s.ajax.SimplePipeRequest.updatePipeByURL(pipeID,url);
}
};
},"~S");
c$.loadPipeScript=$_M(c$,"loadPipeScript",
function(url){
var script=document.createElement("SCRIPT");
script.type="text/javascript";
script.src=url;
script.url=url;
var pipeID=arguments[1];
if(pipeID!=null&&pipeID.length>0){
script.id=pipeID;
}
var userAgent=navigator.userAgent.toLowerCase();
var isOpera=(userAgent.indexOf("opera")!=-1);
var isIE=(userAgent.indexOf("msie")!=-1)&&!isOpera;
var fun=net.sf.j2s.ajax.SimplePipeRequest.generatePipeScriptCallback(pipeID);
script.defer=true;
if(typeof(script.onreadystatechange)=="undefined"||!isIE){
script.onload=script.onerror=fun;
}else{
script.onreadystatechange=fun;
}
var head=document.getElementsByTagName("HEAD")[0];
head.appendChild(script);
},"~S");
c$.loadPipeIFrameScript=$_M(c$,"loadPipeIFrameScript",
function(pipeKey,url){
var iframe=document.createElement("IFRAME");
iframe.style.display="none";
var pipeID=null;
do{
pipeID="pipe-script-"+pipeKey+"-"+Math.round(10000000*Math.random());
}while(document.getElementById(pipeID)!=null);
iframe.id=pipeID;
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
html+="net = { sf : { j2s : { ajax : { SimplePipeRequest : { generatePipeScriptCallback : "+net.sf.j2s.ajax.SimplePipeRequest.generatePipeScriptCallback+" } } } } };\r\n";
html+="("+net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript+") (";
html+="\""+url.replace(/"/g,"\\\"")+"\", \""+pipeID+"\"";
html+=");\r\n";
if(ClassLoader.isOpera)
html+="}, "+(net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval>>2)+");\r\n";
html+="</scr"+"ipt></body></html>";
net.sf.j2s.ajax.SimplePipeRequest.iframeDocumentWrite(iframe,html);
},"~S,~S");
c$.generateLazyIframeWriting=$_M(c$,"generateLazyIframeWriting",
function(handle,domain,html){
return function(){
try{
var doc=handle.contentWindow.document;
doc.open();
if(ClazzLoader.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
try{
doc.domain=domain;
}catch(e){}
}
doc.write(html);
doc.close();

document.title=document.title;
handle=null;
}catch(e){
window.setTimeout(arguments.callee,25);
}
};
},"~O,~S,~S");
c$.iframeDocumentWrite=$_M(c$,"iframeDocumentWrite",
function(handle,html){
var handle=arguments[0];
var html=arguments[1];
var domain=null;
try{
domain=document.domain;
}catch(e){}
if(ClazzLoader.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
document.domain=domain;
}
if(handle.contentWindow!=null){
if(ClazzLoader.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
handle.contentWindow.location="javascript:document.open();document.domain='"+domain+"';document.close();void(0);";
}else{
handle.contentWindow.location="about:blank";
}
}else{
handle.src="about:blank";
}
try{
var doc=handle.contentWindow.document;
doc.open();
if(ClazzLoader.isIE&&window["xss.domain.enabled"]==true
&&domain!=null&&domain.length>0){
doc.domain=domain;
}
doc.write(html);
doc.close();
}catch(e){
window.setTimeout(net.sf.j2s.ajax.SimplePipeRequest.generateLazyIframeWriting(handle,domain,html),25);
}
},"~O,~S");
c$.pipeScript=$_M(c$,"pipeScript",
function(runnable){
var url=runnable.getPipeURL();
var requestURL=url+(url.indexOf('?')!=-1?"&":"?")+net.sf.j2s.ajax.SimplePipeRequest.constructRequest(runnable.pipeKey,"x",true);
{
net.sf.j2s.ajax.SimplePipeRequest.pipeScriptMap[requestURL]=runnable;
}if(net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url)){
var ok4IFrameScript=true;
{
var domain=null;
try{
domain=document.domain;
}catch(e){
}
ok4IFrameScript=domain!=null&&domain.length>0;
}if(ok4IFrameScript){
net.sf.j2s.ajax.SimplePipeRequest.loadPipeIFrameScript(runnable.pipeKey,requestURL);
return;
}}{
var pipeID=null;
do{
pipeID="pipe-script-"+runnable.pipeKey+"-"+Math.round(10000000*Math.random());
}while(document.getElementById(pipeID)!=null);
net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript(requestURL,pipeID);
}},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeSubdomainQuery=$_M(c$,"pipeSubdomainQuery",
function(runnable,domain){
var pipeKey=runnable.pipeKey;
var spr=net.sf.j2s.ajax.SimplePipeRequest;
spr.pipeIFrameClean(pipeKey);
var ifr=document.createElement("IFRAME");
ifr.style.display="none";
var url=runnable.getPipeURL();
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
pipeRequest.registerOnReadyStateChange((($_D("net.sf.j2s.ajax.SimplePipeRequest$4")?0:net.sf.j2s.ajax.SimplePipeRequest.$SimplePipeRequest$4$()),$_N(net.sf.j2s.ajax.SimplePipeRequest$4,this,$_F("pipeRequest",pipeRequest,"runnable",runnable))));
var pipeRequestData=net.sf.j2s.ajax.SimplePipeRequest.constructRequest(pipeKey,"q",true);
var async=false;
{
async=true;
var key="xhr."+pipeKey+"."+pipeRequestData;
net.sf.j2s.ajax.SimplePipeRequest.pipeQueryMap[key]=pipeRequest;
}net.sf.j2s.ajax.SimplePipeRequest.sendRequest(pipeRequest,pipeMethod,pipeURL,pipeRequestData,async);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeContinuum=$_M(c$,"pipeContinuum",
function(runnable){
var pipeKey=runnable.pipeKey;
var spr=net.sf.j2s.ajax.SimplePipeRequest;
spr.pipeIFrameClean(pipeKey);
var subdomain=arguments[1];
var pipeContinued=arguments[2];
(function(){
var ifr=document.createElement("IFRAME");
ifr.style.display="none";
ifr.id="pipe-"+pipeKey;
var url=runnable.getPipeURL();
if(subdomain==null){
document.domain=document.domain;
window["xss.domain.enabled"]=true;
}
ifr.src=url+(url.indexOf('?')!=-1?"&":"?")
+spr.constructRequest(pipeKey,spr.PIPE_TYPE_SCRIPT,true)
+(subdomain==null?""
:"&"+spr.FORM_PIPE_DOMAIN+"="+subdomain);
document.body.appendChild(ifr);
})();
if(pipeContinued==true){
return;
}
var fun=(function(key,created){
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
if(now-last>3*spr.pipeLiveNotifyInterval){
runnable.pipeAlive=false;
runnable.pipeClosed();
sph.removePipe(key);
spr.pipeIFrameClean(key);
}else{
spr.pipeNotify(runnable);
window.setTimeout(arguments.callee,spr.pipeLiveNotifyInterval);
}
}
};
})(runnable.pipeKey,new Date().getTime());
window.setTimeout(fun,spr.pipeLiveNotifyInterval);
},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.pipeIFrameClean=$_M(c$,"pipeIFrameClean",
function(pipeKey){
var urlSignature=net.sf.j2s.ajax.SimplePipeRequest.FORM_PIPE_KEY+"="+pipeKey+"&";
var iframes=document.getElementsByTagName("IFRAME");
for(var i=0;i<iframes.length;i++){
var el=iframes[i];
var url=null;
try{
url=el.src;
}catch(e){
}
if(url==null||url.length==0){
try{
url=el.contentWindow.location.toString();
}catch(e){
}
}
if(url!=null&&url.indexOf(urlSignature)==0){
el.parentNode.removeChild(el);
continue;
}
if(el.id==pipeKey||el.id=="pipe-"+pipeKey){
el.parentNode.removeChild(el);
continue;
}
}
},"~S");
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
net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean(runnable.pipeKey);
var pipeURL=runnable.getPipeURL();
var isXSS=net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(pipeURL);
var isSubdomain=false;
if(isXSS){
isSubdomain=net.sf.j2s.ajax.SimpleRPCRequest.isSubdomain(pipeURL);
}var subdomain=net.sf.j2s.ajax.SimplePipeRequest.adjustSubdomain(isSubdomain);
{
net.sf.j2s.ajax.SimplePipeRequest.pipeContinuum(runnable,subdomain,true);
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
try{
subdomain=window.location.host;
}catch(e){}
if(subdomain!=null){
var idx=subdomain.indexOf(":");
if(idx!=-1){
subdomain=subdomain.substring(0,idx);
}
document.domain=subdomain;
window["xss.domain.enabled"]=true;
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
spr.pipeContinuum(runnable,subdomain,false);
}else{
var spr=net.sf.j2s.ajax.SimplePipeRequest;
if(isXSS&&isSubdomain&&spr.isSubdomainXSSSupported()){
var subdomain=spr.adjustSubdomain(isSubdomain);
spr.pipeSubdomainQuery(runnable,subdomain);
return;
}
runnable.queryEnded=true;
(function(pipeFun,key,created,lastXHR){
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
if((runnable.queryEnded||(now-last>=spr.pipeLiveNotifyInterval
&&(lastXHR==-1||now-lastXHR>=spr.pipeLiveNotifyInterval)))
&&runnable.queryFailedRetries<3){
runnable.queryEnded=false;
if(runnable.received==runnable.lastPipeDataReceived
&&runnable.retries==runnable.queryFailedRetries){
runnable.queryFailedRetries++;
}
pipeFun(runnable);
lastXHR=new Date().getTime();
}
runnable.retries=runnable.queryFailedRetries;
runnable.received=runnable.lastPipeDataReceived;
if(runnable.queryFailedRetries>=3
||now-last>3*spr.pipeLiveNotifyInterval){
runnable.pipeAlive=false;
runnable.pipeClosed();
sph.removePipe(key);
spr.pipeIFrameClean(key);
}else{
window.setTimeout(arguments.callee,spr.pipeQueryInterval);
}
}
};
})((!isXSS)?spr.pipeQuery:spr.pipeScript,runnable.pipeKey,new Date().getTime(),-1)();
}},"net.sf.j2s.ajax.SimplePipeRunnable");
c$.isSubdomainXSSSupported=$_M(c$,"isSubdomainXSSSupported",
function(){
var ua=navigator.userAgent;
var name="Opera";
var idx=ua.indexOf(name);
if(idx!=-1){
return parseFloat(ua.substring(idx+name.length+1))>=9.6;
}
name="Firefox";
idx=ua.indexOf(name);
if(idx!=-1){
return parseFloat(ua.substring(idx+name.length+1))>=1.5;
}
name="MSIE";
idx=ua.indexOf(name);
if(idx!=-1){
return parseFloat(ua.substring(idx+name.length+1))>=6.0;
}
return true;
});
c$.subdomainInit=$_M(c$,"subdomainInit",
function(p){
if(window["NullObject"]==null){
window["NullObject"]=function(){};
}
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
oThis=null;
return;
}
var state=oThis.xhrHandle.readyState;
if(state==4){
var pipeData=oThis.xhrHandle.responseText;
oThis.xhrHandle.onreadystatechange=NullObject;
var pipe=oThis.runnable;
document.domain=oThis.parentDomain;
if(oThis.xhrHandle.status!=200){
pipe.queryFailedRetries++;
}else{
pipe.queryFailedRetries=0;
with(window.parent){
net.sf.j2s.ajax.SimplePipeRequest.parseReceived(pipeData);
oThis.runnable=net.sf.j2s.ajax.SimplePipeHelper.getPipe(oThis.key);
}
}
pipe.queryEnded=true;
var xhrHandle=oThis.xhrHandle;
with(window.parent){
var pqMap=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryMap;
for(var key in pqMap){
if(typeof key=="string"&&key.indexOf("xhr."+pipe.pipeKey+".")==0){
if(pqMap[key]==null||pqMap[key]===xhrHandle){
delete pqMap[key];
}else{
delete pqMap[key];
pipe.queryEnded=false;
}
}
}
}
oThis.xhrHandle=null;
oThis=null;
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
if(method!=null&&method.toLowerCase()=="post"){
try{
request.setRequestHeader("Content-type",
"application/x-www-form-urlencoded");
}catch(e){

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
var key=p.key;
with(window.parent){
try{
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean(key);
return;
}catch(e){
}
}
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
var key=p.key;
with(window.parent){
try{
method=runnable.getPipeMethod();
url=runnable.getPipeURL();
var spr=net.sf.j2s.ajax.SimplePipeRequest;
data=spr.constructRequest(key,spr.PIPE_TYPE_QUERY,true);
}catch(e){
}
}
try{
document.domain=p.originalDomain;
}catch(e){};
try{
p.initHttpRequest();
}catch(e){};
var xhrHandle=p.xhrHandle;
try{
with(window.parent){
spr.pipeQueryMap["xhr."+key+"."+data]=xhrHandle;
}
}catch(e){
}
try{
p.pipeXHRQuery(p.xhrHandle,method,url,data);
p.lastXHR=new Date().getTime();
}catch(e){
p.xhrHandle.onreadystatechange=NullObject;
p.xhrHandle=null;
document.domain=p.parentDomain;
runnable.queryEnded=true;
runnable.queryFailedRetries++;
}
}
if(runnable.queryFailedRetries>=3
||now-last>3*p.pipeLiveNotifyInterval){
document.domain=p.parentDomain;
var key=p.key;
with(window.parent){
runnable.pipeAlive=false;
runnable.pipeClosed();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean(key);
}
}else{
window.setTimeout(arguments.callee,p.pipeQueryInterval);
}
}
};
},"~O");
c$.checkIFrameSrc=$_M(c$,"checkIFrameSrc",
function(){
try{
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
}catch(e){}
$$=$;
$=function(s){
$$(s);
try{
var length=document.body.childNodes.length;
for(var i=length-1;i>=0;i--){
var child=document.body.childNodes[i];
child.parentNode.removeChild(child);
}
}catch(e){}
}
});
c$.$SimplePipeRequest$3$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimplePipeRequest$3",net.sf.j2s.ajax.XHRCallbackAdapter);
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
};
c$.$SimplePipeRequest$4$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"SimplePipeRequest$4",net.sf.j2s.ajax.XHRCallbackAdapter);
$_V(c$,"onLoaded",
function(){
{
if(window==null||window["net"]==null)return;
}if(this.f$.pipeRequest.getStatus()!=200){
this.f$.runnable.queryFailedRetries++;
}else{
this.f$.runnable.queryFailedRetries=0;
net.sf.j2s.ajax.SimplePipeRequest.parseReceived(this.f$.pipeRequest.getResponseText());
}this.f$.runnable.queryEnded=true;
{
var pqMap=net.sf.j2s.ajax.SimplePipeRequest.pipeQueryMap;
for(var key in pqMap){
if(typeof key=="string"&&key.indexOf("xhr."+this.f$.runnable.pipeKey+".")==0){
if(pqMap[key]==null||pqMap[key]===this.f$.pipeRequest){
delete pqMap[key];
}else{
delete pqMap[key];
this.f$.runnable.queryEnded=false;
}
}
}
}});
c$=$_P();
};
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
c$.pipeScriptMap=c$.prototype.pipeScriptMap=new JavaObject();
c$.pipeQueryMap=c$.prototype.pipeQueryMap=new JavaObject();

window["$p1p3p$"]=net.sf.j2s.ajax.SimplePipeRequest.parseReceived;
window["$p1p3b$"]=net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack;
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.SimplePipeSWTRequest",null,function(){
c$=$_T(net.sf.j2s.ajax,"SimplePipeSWTRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.swtPipe=$_M(c$,"swtPipe",
function(runnable){
runnable.ajaxIn();
net.sf.j2s.ajax.SimplePipeRequest.pipeRequest(runnable);
},"net.sf.j2s.ajax.SimplePipeRunnable");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimpleSerializable"],"net.sf.j2s.ajax.CompoundSerializable",null,function(){
c$=$_C(function(){
this.session=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundSerializable",net.sf.j2s.ajax.SimpleSerializable);
$_s(c$,"session","s");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.CompoundSerializable","$.SimplePipeRunnable"],"net.sf.j2s.ajax.CompoundPipeSession",["net.sf.j2s.ajax.SimplePipeHelper","$.SimplePipeRequest","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.session=null;
this.parent=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundPipeSession",net.sf.j2s.ajax.SimplePipeRunnable);
$_H();
c$=$_T(net.sf.j2s.ajax.CompoundPipeSession,"PipeSessionClosedEvent",net.sf.j2s.ajax.CompoundSerializable);
c$=$_P();
$_M(c$,"isPipeLive",
function(){
return $_U(this,net.sf.j2s.ajax.CompoundPipeSession,"isPipeLive",[])&&this.session!=null;
});
$_M(c$,"pipeCreated",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeSession,"pipeCreated",[]);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var cp=pipe;
if(cp.status<3){
cp.status=3;
}this.updateStatus(true);
}});
$_M(c$,"pipeDestroy",
function(){
if(this.destroyed){
return false;
}this.pipeAlive=false;
this.destroyed=true;
{
}var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if(pipe==null){
pipe=this.parent;
}if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var cp=pipe;
if(cp.status<3){
cp.status=3;
}cp.unweave(this);
}this.session=null;
this.pipeKey=null;
return true;
});
$_M(c$,"deal",
function(ss){
if($_O(ss,net.sf.j2s.ajax.CompoundSerializable)){
var cs=ss;
if(cs.session==null||!cs.session.equals(this.session)){
return false;
}return $_U(this,net.sf.j2s.ajax.CompoundPipeSession,"deal",[cs]);
}return false;
},"net.sf.j2s.ajax.SimpleSerializable");
$_M(c$,"deal",
function(evt){
if(net.sf.j2s.ajax.SimplePipeRequest.getRequstMode()==2){
this.pipeClosed();
return true;
}this.updateStatus(false);
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(this.pipeKey);
if(pipe==null){
pipe=this.parent;
}if($_O(pipe,net.sf.j2s.ajax.CompoundPipeRunnable)){
var p=pipe;
if(p.pipes!=null){
for(var i=0;i<p.pipes.length;i++){
var s=p.pipes[i];
if(s!=null&&s.session.equals(evt.session)){
p.pipes[i]=null;
break;
}}
}}if(pipe!=null&&!pipe.isPipeLive()){
var pipeKey=this.pipeKey;
pipe.pipeDestroy();
net.sf.j2s.ajax.SimplePipeHelper.removePipe(pipeKey);
}return true;
},"net.sf.j2s.ajax.CompoundPipeSession.PipeSessionClosedEvent");
$_V(c$,"getHttpURL",
function(){
return this.parent.getHttpURL();
});
$_V(c$,"getHttpMethod",
function(){
return this.parent.getHttpMethod();
});
$_V(c$,"getPipeURL",
function(){
return this.parent.getPipeURL();
});
$_V(c$,"getPipeMethod",
function(){
return this.parent.getHttpMethod();
});
$_s(c$,"session","s");
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRunnable"],"net.sf.j2s.ajax.CompoundPipeRunnable",["net.sf.j2s.ajax.SimplePipeRequest","$.SimpleSerializable"],function(){
c$=$_C(function(){
this.pipes=null;
this.status=0;
this.id=null;
this.pipeMethod=null;
this.rpcMethod=null;
this.pipeURL=null;
this.rpcURL=null;
this.setupFailedRetries=0;
this.lastSetupRetried=0;
this.lastSetup=0;
$_Z(this,arguments);
},net.sf.j2s.ajax,"CompoundPipeRunnable",net.sf.j2s.ajax.SimplePipeRunnable);
c$.nextSessionKey=$_M(c$,"nextSessionKey",
($fz=function(){
var hexStr="0123456789abcdef";
var key="";
for(var i=0;i<4;i++){
var hex=Math.round(15*Math.random());
key+=""+hexStr.charAt(hex);
}
return key;
},$fz.isPrivate=true,$fz));
$_K(c$,
function(){
$_R(this,net.sf.j2s.ajax.CompoundPipeRunnable,[]);
this.pipes=new Array(4);
this.status=0;
this.setupFailedRetries=0;
this.lastSetupRetried=0;
this.pipeMethod="GET";
this.rpcMethod="POST";
this.pipeURL="simplepipe";
this.rpcURL="piperpc";
this.lastSetup=System.currentTimeMillis();
});
$_M(c$,"getSession",
function(session){
if(session==null){
return null;
}for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&session.equals(this.pipes[i].session)){
return this.pipes[i];
}}
return null;
},"~S");
$_M(c$,"pipeDestroy",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeDestroy();
}}
this.status=0;
return $_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeDestroy",[]);
});
$_M(c$,"pipeInit",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeInit",[]);
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeInit();
}}
});
$_M(c$,"isPipeLive",
function(){
if(this.pipeAlive&&this.status<3){
return true;
}if(this.status==3&&System.currentTimeMillis()-this.lastSetup<=3*net.sf.j2s.ajax.SimplePipeRequest.pipeLiveNotifyInterval){
return true;
}if($_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"isPipeLive",[])){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&this.pipes[i].isPipeLive()){
return true;
}}
}return false;
});
$_M(c$,"pipeClosed",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
if(this.pipes[i].closer!=null){
this.pipes[i].closer.helpClosing(this.pipes[i]);
}else{
this.pipes[i].pipeClosed();
}this.pipes[i]=null;
}}
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeClosed",[]);
});
$_M(c$,"pipeLost",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeLost();
this.pipes[i]=null;
}}
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"pipeLost",[]);
});
$_M(c$,"keepPipeLive",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&this.pipes[i].isPipeLive()){
this.pipes[i].keepPipeLive();
}}
});
$_M(c$,"updateStatus",
function(live){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].updateStatus(live);
}}
$_U(this,net.sf.j2s.ajax.CompoundPipeRunnable,"updateStatus",[live]);
},"~B");
$_M(c$,"weave",
function(pipe){
pipe.pipeReset();
{
for(var i=0;i<this.pipes.length;i++){
if(pipe===this.pipes[i]){
pipe.pipeKey=this.pipeKey;
pipe.parent=this;
this.initPipeSession(pipe);
return false;
}}
for(var i=0;i<this.pipes.length;i++){
if(pipe.session!=null&&this.pipes[i]!=null&&pipe.session.equals(this.pipes[i].session)){
if(this.pipes[i].isPipeLive()){
System.out.println("pipe session "+this.pipes[i].session+" is still live!!");
}this.pipes[i]=pipe;
this.lastSetup=System.currentTimeMillis();
pipe.pipeKey=this.pipeKey;
pipe.parent=this;
return true;
}}
var added=false;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]==null){
this.pipes[i]=pipe;
added=true;
break;
}}
if(!added){
var newPipes=new Array(this.pipes.length+4);
System.arraycopy(this.pipes,0,newPipes,0,this.pipes.length);
newPipes[this.pipes.length]=pipe;
this.lastSetup=System.currentTimeMillis();
}}pipe.pipeKey=this.pipeKey;
pipe.parent=this;
this.initPipeSession(pipe);
return true;
},"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"initPipeSession",
($fz=function(pipe){
while(pipe.session==null){
var key=net.sf.j2s.ajax.CompoundPipeRunnable.nextSessionKey();
var isKeyOK=true;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null&&key.equals(this.pipes[i].session)){
isKeyOK=false;
break;
}}
if(isKeyOK){
pipe.session=key;
break;
}}
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"unweave",
function(pipe){
for(var i=0;i<this.pipes.length;i++){
if(pipe===this.pipes[i]||(pipe.session!=null&&this.pipes[i]!=null&&pipe.session.equals(this.pipes[i].session))){
this.pipes[i]=null;
this.lastSetup=System.currentTimeMillis();
pipe.pipeKey=null;
return true;
}}
return false;
},"net.sf.j2s.ajax.CompoundPipeSession");
$_M(c$,"getActivePipeSessionCount",
function(){
var count=0;
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
count++;
}}
return count;
});
$_M(c$,"isEmpty",
function(){
for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
return false;
}}
return true;
});
$_V(c$,"deal",
function(ss){
if($_O(ss,net.sf.j2s.ajax.CompoundSerializable)){
var cs=ss;
var clazz=cs.getClass();
if("net.sf.j2s.ajax.CompoundSerializable".equals(clazz.getName())){
return true;
}for(var i=0;i<this.pipes.length;i++){
var p=this.pipes[i];
if(p!=null&&p.session!=null&&p.session.equals(cs.session)&&p.deal(cs)){
return true;
}}
}return false;
},"net.sf.j2s.ajax.SimpleSerializable");
$_V(c$,"getHttpURL",
function(){
return this.rpcURL;
});
$_V(c$,"getHttpMethod",
function(){
return this.rpcMethod;
});
$_V(c$,"getPipeURL",
function(){
return this.pipeURL;
});
$_V(c$,"getPipeMethod",
function(){
return this.pipeMethod;
});
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.CompoundPipeRequest",["net.sf.j2s.ajax.CompoundPipeRunnable","$.SimpleRPCRequest"],function(){
c$=$_T(net.sf.j2s.ajax,"CompoundPipeRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.weave=$_M(c$,"weave",
function(id,p){
var pipe=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,true);
if(pipe.status==0||!pipe.isPipeLive()){
pipe.weave(p);
pipe.updateStatus(true);
if(pipe.status==0){
pipe.status=1;
pipe.pipeKey=null;
net.sf.j2s.ajax.SimplePipeRequest.pipe(pipe);
}}else{
if(!pipe.weave(p)&&p.isPipeLive()){
return;
}p.pipeKey=pipe.pipeKey;
net.sf.j2s.ajax.SimpleRPCRequest.request(p);
if(pipe.status<2){
pipe.status=2;
}}},"~S,net.sf.j2s.ajax.CompoundPipeSession");
c$.pipeFailed=$_M(c$,"pipeFailed",
function(pipe){
var now=System.currentTimeMillis();
if(now-pipe.lastSetupRetried>300000){
pipe.setupFailedRetries=0;
}pipe.setupFailedRetries++;
if(pipe.setupFailedRetries<=3){
pipe.updateStatus(true);
pipe.lastSetupRetried=now;
net.sf.j2s.ajax.SimplePipeRequest.pipe(pipe);
}else{
for(var i=0;i<pipe.pipes.length;i++){
if(pipe.pipes[i]!=null){
pipe.pipes[i].pipeFailed();
}}
pipe.setupFailedRetries=0;
pipe.status=0;
pipe.lastSetupRetried=0;
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.configure=$_M(c$,"configure",
function(id,pipeURL,pipeMethod,rpcURL,rpcMethod){
var cfg=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,true);
if(pipeURL!=null){
cfg.pipeURL=pipeURL;
}if(pipeMethod!=null){
cfg.pipeMethod=pipeMethod;
}if(rpcURL!=null){
cfg.rpcURL=rpcURL;
}if(rpcMethod!=null){
cfg.rpcMethod=rpcMethod;
}},"~S,~S,~S,~S,~S");
c$.retrievePipe=$_M(c$,"retrievePipe",
function(id,createNew){
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
{
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]!=null&&allPipes[i].id.equals(id)){
return allPipes[i];
}}
if(!createNew){
return null;
}var pipe=net.sf.j2s.ajax.CompoundPipeRequest.createPipe(id);
net.sf.j2s.ajax.CompoundPipeRequest.addPipe(pipe);
return pipe;
}},"~S,~B");
c$.createPipe=$_M(c$,"createPipe",
($fz=function(id){
var pipe=(($_D("net.sf.j2s.ajax.CompoundPipeRequest$1")?0:net.sf.j2s.ajax.CompoundPipeRequest.$CompoundPipeRequest$1$()),$_N(net.sf.j2s.ajax.CompoundPipeRequest$1,this,null));
pipe.id=id;
return pipe;
},$fz.isPrivate=true,$fz),"~S");
c$.addPipe=$_M(c$,"addPipe",
($fz=function(pipe){
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]==null){
allPipes[i]=pipe;
return;
}}
var newPipes=new Array(allPipes.length+100);
System.arraycopy(allPipes,0,newPipes,0,allPipes.length);
newPipes[allPipes.length]=pipe;
($t$=net.sf.j2s.ajax.CompoundPipeRequest.pipes=newPipes,net.sf.j2s.ajax.CompoundPipeRequest.prototype.pipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes,$t$);
},$fz.isPrivate=true,$fz),"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.registerPipe=$_M(c$,"registerPipe",
function(pipe){
if(pipe==null)return null;
var id=pipe.id;
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
{
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]!=null&&allPipes[i].id.equals(id)){
return allPipes[i];
}}
net.sf.j2s.ajax.CompoundPipeRequest.addPipe(pipe);
return pipe;
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.unregisterPipe=$_M(c$,"unregisterPipe",
function(id){
var allPipes=net.sf.j2s.ajax.CompoundPipeRequest.pipes;
{
for(var i=0;i<allPipes.length;i++){
if(allPipes[i]!=null&&allPipes[i].id.equals(id)){
var pipe=allPipes[i];
allPipes[i]=null;
return pipe;
}}
return null;
}},"~S");
c$.$CompoundPipeRequest$1$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"CompoundPipeRequest$1",net.sf.j2s.ajax.CompoundPipeRunnable);
$_M(c$,"ajaxOut",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeRequest$1,"ajaxOut",[]);
if(!this.pipeAlive){
net.sf.j2s.ajax.CompoundPipeRequest.pipeFailed(this);
return;
}for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeKey=this.pipeKey;
net.sf.j2s.ajax.SimpleRPCRequest.request(this.pipes[i]);
if(this.status<2){
this.status=2;
}}}
});
$_V(c$,"ajaxFail",
function(){
net.sf.j2s.ajax.CompoundPipeRequest.pipeFailed(this);
});
c$=$_P();
};
c$.pipes=c$.prototype.pipes=new Array(3);
});
$_J("net.sf.j2s.ajax");
$_L(["net.sf.j2s.ajax.SimplePipeRequest"],"net.sf.j2s.ajax.CompoundPipeSWTRequest",["net.sf.j2s.ajax.CompoundPipeRequest","$.CompoundPipeRunnable","$.SimplePipeSWTRequest","$.SimpleRPCSWTRequest"],function(){
c$=$_T(net.sf.j2s.ajax,"CompoundPipeSWTRequest",net.sf.j2s.ajax.SimplePipeRequest);
c$.swtWeave=$_M(c$,"swtWeave",
function(id,p){
{
}var pipe=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,false);
if(pipe==null){
pipe=net.sf.j2s.ajax.CompoundPipeRequest.registerPipe(net.sf.j2s.ajax.CompoundPipeSWTRequest.createSWTWrappedPipe(id));
}if(pipe.status==0||!pipe.isPipeLive()){
pipe.weave(p);
pipe.updateStatus(true);
if(pipe.status==0){
pipe.status=1;
pipe.pipeKey=null;
p.pipeKey=null;
net.sf.j2s.ajax.SimplePipeSWTRequest.swtPipe(pipe);
}}else{
if(!pipe.weave(p)&&p.isPipeLive()){
return;
}p.pipeKey=pipe.pipeKey;
net.sf.j2s.ajax.SimpleRPCSWTRequest.swtRequest(p);
if(pipe.status<2){
pipe.status=2;
}}},"~S,net.sf.j2s.ajax.CompoundPipeSession");
c$.createSWTWrappedPipe=$_M(c$,"createSWTWrappedPipe",
($fz=function(id){
var pipe=(($_D("net.sf.j2s.ajax.CompoundPipeSWTRequest$2")?0:net.sf.j2s.ajax.CompoundPipeSWTRequest.$CompoundPipeSWTRequest$2$()),$_N(net.sf.j2s.ajax.CompoundPipeSWTRequest$2,this,null));
pipe.id=id;
return pipe;
},$fz.isPrivate=true,$fz),"~S");
c$.pipeFailed=$_M(c$,"pipeFailed",
function(pipe){
var now=System.currentTimeMillis();
if(now-pipe.lastSetupRetried>300000){
pipe.setupFailedRetries=0;
}pipe.setupFailedRetries++;
if(pipe.setupFailedRetries<=3){
pipe.updateStatus(true);
pipe.lastSetupRetried=now;
net.sf.j2s.ajax.SimplePipeSWTRequest.swtPipe(pipe);
}else{
for(var i=0;i<pipe.pipes.length;i++){
if(pipe.pipes[i]!=null){
pipe.pipes[i].pipeFailed();
}}
pipe.setupFailedRetries=0;
pipe.status=0;
pipe.lastSetupRetried=0;
}},"net.sf.j2s.ajax.CompoundPipeRunnable");
c$.configure=$_M(c$,"configure",
function(id,pipeURL,pipeMethod,rpcURL,rpcMethod){
var pipe=net.sf.j2s.ajax.CompoundPipeRequest.retrievePipe(id,false);
if(pipe==null){
pipe=net.sf.j2s.ajax.CompoundPipeRequest.registerPipe(net.sf.j2s.ajax.CompoundPipeSWTRequest.createSWTWrappedPipe(id));
}if(pipeURL!=null){
pipe.pipeURL=pipeURL;
}if(pipeMethod!=null){
pipe.pipeMethod=pipeMethod;
}if(rpcURL!=null){
pipe.rpcURL=rpcURL;
}if(rpcMethod!=null){
pipe.rpcMethod=rpcMethod;
}},"~S,~S,~S,~S,~S");
c$.$CompoundPipeSWTRequest$2$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"CompoundPipeSWTRequest$2",net.sf.j2s.ajax.CompoundPipeRunnable);
$_M(c$,"ajaxOut",
function(){
$_U(this,net.sf.j2s.ajax.CompoundPipeSWTRequest$2,"ajaxOut",[]);
if(!this.pipeAlive){
net.sf.j2s.ajax.CompoundPipeSWTRequest.pipeFailed(this);
return;
}for(var i=0;i<this.pipes.length;i++){
if(this.pipes[i]!=null){
this.pipes[i].pipeKey=this.pipeKey;
net.sf.j2s.ajax.SimpleRPCSWTRequest.swtRequest(this.pipes[i]);
if(this.status<2){
this.status=2;
}}}
});
$_V(c$,"ajaxFail",
function(){
net.sf.j2s.ajax.CompoundPipeSWTRequest.pipeFailed(this);
});
c$=$_P();
};
});
