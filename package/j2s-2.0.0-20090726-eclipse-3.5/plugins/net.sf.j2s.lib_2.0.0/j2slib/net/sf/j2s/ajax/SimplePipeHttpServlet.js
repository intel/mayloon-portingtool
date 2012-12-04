$_J("net.sf.j2s.ajax");
$_L(["javax.servlet.http.HttpServlet"],"net.sf.j2s.ajax.SimplePipeHttpServlet",["java.lang.Long","$.StringBuffer","$.Thread","net.sf.j2s.ajax.SimplePipeHelper"],function(){
c$=$_C(function(){
this.pipeQueryTimeout=5000;
this.pipeScriptBreakout=1200000;
this.pipeMaxItemsPerQuery=-1;
$_Z(this,arguments);
},net.sf.j2s.ajax,"SimplePipeHttpServlet",javax.servlet.http.HttpServlet);
$_M(c$,"init",
function(){
var timeoutStr=this.getInitParameter("simple.pipe.query.timeout");
if(timeoutStr!=null){
try{
this.pipeQueryTimeout=Long.parseLong(timeoutStr);
if(this.pipeQueryTimeout<0||this.pipeQueryTimeout>20000){
this.pipeQueryTimeout=20000;
}}catch(e){
if($_O(e,NumberFormatException)){
e.printStackTrace();
}else{
throw e;
}
}
}var breakoutStr=this.getInitParameter("simple.pipe.script.breakout");
if(breakoutStr!=null){
try{
this.pipeScriptBreakout=Long.parseLong(breakoutStr);
if(this.pipeScriptBreakout<=0||this.pipeScriptBreakout>1200000){
this.pipeScriptBreakout=1200000;
}else if(this.pipeScriptBreakout<=60000){
this.pipeScriptBreakout=60000;
}}catch(e){
if($_O(e,NumberFormatException)){
e.printStackTrace();
}else{
throw e;
}
}
}var perQueryStr=this.getInitParameter("simple.pipe.max.items.per.query");
if(perQueryStr!=null){
try{
this.pipeMaxItemsPerQuery=Integer.parseInt(perQueryStr);
if(this.pipeMaxItemsPerQuery<=0){
this.pipeMaxItemsPerQuery=-1;
}else if(this.pipeMaxItemsPerQuery<5){
this.pipeMaxItemsPerQuery=5;
}}catch(e){
if($_O(e,NumberFormatException)){
e.printStackTrace();
}else{
throw e;
}
}
}$_U(this,net.sf.j2s.ajax.SimplePipeHttpServlet,"init",[]);
});
$_V(c$,"doGet",
function(req,resp){
var key=req.getParameter("k");
if(key==null){
resp.sendError(400);
return;
}var type=req.getParameter("t");
if(type==null){
type="c";
}var domain=req.getParameter("d");
this.doPipe(resp,key,type,domain);
},"javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse");
$_M(c$,"doPipe",
function(resp,key,type,domain){
var writer=null;
resp.setHeader("Pragma","no-cache");
resp.setHeader("Cache-Control","no-cache");
resp.setDateHeader("Expires",0);
if("n".equals(type)){
var updated=net.sf.j2s.ajax.SimplePipeHelper.notifyPipeStatus(key,true);
resp.setContentType("text/plain; charset=utf-8");
writer=resp.getWriter();
writer.write("$p1p3b$ (\"");
writer.write(key);
writer.write("\", \"");
writer.write(updated?"o":"l");
writer.write("\");");
return;
}if("u".equals(type)){
resp.setContentType("text/html; charset=utf-8");
writer=resp.getWriter();
var buffer=new StringBuffer();
buffer.append("<html><head><title></title></head><body>\r\n");
buffer.append("<script type=\"text/javascript\">");
buffer.append("p = new Object ();\r\n");
buffer.append("window.onload = function () {\r\n");
buffer.append("p.originalDomain = document.domain;\r\n");
buffer.append("document.domain = \""+domain+"\";\r\n");
buffer.append("p.key = \""+key+"\";\r\n");
buffer.append("var spr = window.parent.net.sf.j2s.ajax.SimplePipeRequest;\r\n");
buffer.append("eval (\"(\" + spr.subdomainInit + \") (p);\");\r\n");
buffer.append("eval (\"((\" + spr.subdomainLoopQuery + \") (p)) ();\");\r\n");
buffer.append("};\r\n");
buffer.append("</script>\r\n");
buffer.append("</body></html>\r\n");
writer.write(buffer.toString());
return;
}if("c".equals(type)){
resp.setHeader("Transfer-Encoding","chunked");
}if("s".equals(type)){
resp.setContentType("text/html; charset=utf-8");
writer=resp.getWriter();
var buffer=new StringBuffer();
buffer.append("<html><head><title></title></head><body>\r\n");
buffer.append("<script type=\"text/javascript\">");
if(domain!=null){
buffer.append("document.domain = \""+domain+"\";\r\n");
}buffer.append("function $ (s) { if (window.parent) window.parent.net.sf.j2s.ajax.SimplePipeRequest.parseReceived (s); }");
buffer.append("if (window.parent) eval (\"(\" + window.parent.net.sf.j2s.ajax.SimplePipeRequest.checkIFrameSrc + \") ();\");\r\n");
buffer.append("</script>\r\n");
writer.write(buffer.toString());
writer.flush();
}else{
resp.setContentType("text/plain; charset=utf-8");
writer=resp.getWriter();
}var lastPipeDataWritten=-1;
var beforeLoop=System.currentTimeMillis();
if(net.sf.j2s.ajax.SimplePipeHelper.notifyPipeStatus(key,true)){
var vector=null;
var priority=0;
var lastLiveDetected=System.currentTimeMillis();
var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
var waitClosingInterval=5000;
if(pipe!=null){
waitClosingInterval=pipe.pipeWaitClosingInterval();
}var items=0;
while((vector=net.sf.j2s.ajax.SimplePipeHelper.getPipeVector(key))!=null&&!writer.checkError()){
if(!net.sf.j2s.ajax.SimplePipeHelper.isPipeLive(key)){
if(System.currentTimeMillis()-lastLiveDetected>waitClosingInterval){
break;
}else{
try{
Thread.sleep(1000);
}catch(e){
if($_O(e,InterruptedException)){
}else{
throw e;
}
}
continue;}}else{
lastLiveDetected=System.currentTimeMillis();
}var size=vector.size();
if(size>0){
for(var i=0;i<size;i++){
var ss=null;
{
if(vector.size()<=0)break;
ss=vector.remove(0);
}if(ss==null)break;
this.output(writer,type,key,ss.serialize());
items++;
if(this.pipeMaxItemsPerQuery>0&&items>=this.pipeMaxItemsPerQuery&&!"c".equals(type)){
break;
}lastPipeDataWritten=System.currentTimeMillis();
writer.flush();
if($_O(ss,net.sf.j2s.ajax.ISimplePipePriority)){
var spp=ss;
var p=spp.getPriority();
if(p<=0){
p=32;
}priority+=p;
}else{
priority+=32;
}}
}else{
writer.flush();
}var now=System.currentTimeMillis();
if((lastPipeDataWritten==-1&&now-beforeLoop>=this.pipeQueryTimeout)||(lastPipeDataWritten>0&&now-lastPipeDataWritten>=this.pipeQueryTimeout&&"c".equals(type))){
this.output(writer,type,key,"o");
lastPipeDataWritten=System.currentTimeMillis();
}now=System.currentTimeMillis();
if((vector=net.sf.j2s.ajax.SimplePipeHelper.getPipeVector(key))!=null&&(this.pipeMaxItemsPerQuery<=0||items<this.pipeMaxItemsPerQuery||"c".equals(type))&&("c".equals(type)||("s".equals(type)&&now-beforeLoop<this.pipeScriptBreakout)||(priority<32&&now-beforeLoop<this.pipeQueryTimeout))){
{
try{
vector.wait(1000);
}catch(e){
if($_O(e,InterruptedException)){
e.printStackTrace();
}else{
throw e;
}
}
}}else{
break;
}}
}if(net.sf.j2s.ajax.SimplePipeHelper.getPipeVector(key)==null||!net.sf.j2s.ajax.SimplePipeHelper.isPipeLive(key)){
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
try{
this.output(writer,type,key,"d");
lastPipeDataWritten=System.currentTimeMillis();
}catch(e){
if($_O(e,Exception)){
}else{
throw e;
}
}
}else if("s".equals(type)&&System.currentTimeMillis()-beforeLoop>=this.pipeScriptBreakout){
try{
this.output(writer,type,key,"e");
lastPipeDataWritten=System.currentTimeMillis();
}catch(e){
if($_O(e,Exception)){
}else{
throw e;
}
}
}if(lastPipeDataWritten==-1){
this.output(writer,type,key,"o");
}if("s".equals(type)){
try{
writer.write("</body></html>\r\n");
}catch(e){
if($_O(e,Exception)){
}else{
throw e;
}
}
}},"javax.servlet.http.HttpServletResponse,~S,~S,~S");
$_M(c$,"output",
function(writer,type,key,str){
var buffer=new StringBuffer();
if("s".equals(type)){
buffer.append("<script type=\"text/javascript\">$ (\"");
}else if("x".equals(type)){
buffer.append("$p1p3p$ (\"");
}buffer.append(key);
if("s".equals(type)||"x".equals(type)){
str=str.replaceAll("\\\\", "\\\\\\\\").replaceAll ("\r", "\\\\r").replaceAll ("\n", "\\\\n").replaceAll ("\"", "\\\\\"");
if("s".equals(type)){
str=str.replaceAll("<\\/script>","<\\/scr\" + \"ipt>");
}}buffer.append(str);
if("s".equals(type)){
buffer.append("\");</script>\r\n");
}else if("x".equals(type)){
buffer.append("\");\r\n");
}writer.write(buffer.toString());
},"java.io.PrintWriter,~S,~S,~S");
$_V(c$,"doPost",
function(req,resp){
this.doGet(req,resp);
},"javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse");
});
