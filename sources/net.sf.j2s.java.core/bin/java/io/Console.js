$_L(["java.io.BufferedReader","$.Flushable","$.PrintWriter"],"java.io.Console",["java.io.IOError","$.InputStreamReader","java.lang.AssertionError","java.util.Formatter"],function(){
c$=$_C(function(){
this.$reader=null;
this.$writer=null;
$_Z(this,arguments);
},java.io,"Console",null,java.io.Flushable);
c$.getConsole=$_M(c$,"getConsole",
function(){
return java.io.Console.console;
});
c$.makeConsole=$_M(c$,"makeConsole",
($fz=function(){
if(!java.io.Console.isatty(0)||!java.io.Console.isatty(1)){
return null;
}try{
return new java.io.Console();
}catch(ex){
if($_O(ex,java.io.IOException)){
throw new AssertionError(ex);
}else{
throw ex;
}
}
},$fz.isPrivate=true,$fz));
$_K(c$,
($fz=function(){
this.$reader=new java.io.Console.ConsoleReader(System.$in);
this.$writer=new java.io.Console.ConsoleWriter(System.out);
},$fz.isPrivate=true,$fz));
$_V(c$,"flush",
function(){
this.$writer.flush();
});
$_M(c$,"format",
function(format,args){
var f=new java.util.Formatter(this.$writer);
f.format(format,[args]);
f.flush();
return this;
},"~S,~A");
$_M(c$,"printf",
function(format,args){
return this.format(format,[args]);
},"~S,~A");
$_M(c$,"reader",
function(){
return this.$reader;
});
$_M(c$,"readLine",
function(){
try{
return this.$reader.readLine();
}catch(e){
if($_O(e,java.io.IOException)){
throw new java.io.IOError(e);
}else{
throw e;
}
}
});
$_M(c$,"readLine",
function(format,args){
{
this.format(format,[args]);
return this.readLine();
}},"~S,~A");
$_M(c$,"readPassword",
function(){
{
var previousState=java.io.Console.setEcho(false,0);
try{
var password=this.readLine();
this.$writer.println();
return(password==null)?null:password.toCharArray();
}finally{
java.io.Console.setEcho(true,previousState);
}
}});
c$.setEcho=$_M(c$,"setEcho",
($fz=function(on,previousState){
try{
return java.io.Console.setEchoImpl(on,previousState);
}catch(ex){
if($_O(ex,java.io.IOException)){
throw new java.io.IOError(ex);
}else{
throw ex;
}
}
},$fz.isPrivate=true,$fz),"~B,~N");
$_M(c$,"readPassword",
function(format,args){
{
this.format(format,[args]);
return this.readPassword();
}},"~S,~A");
$_M(c$,"writer",
function(){
return this.$writer;
});
$_H();
c$=$_T(java.io.Console,"ConsoleReader",java.io.BufferedReader);
$_K(c$,
function($in){
$_R(this,java.io.Console.ConsoleReader,[new java.io.InputStreamReader($in,System.getProperty("file.encoding")),256]);
this.lock=java.io.Console.CONSOLE_LOCK;
},"java.io.InputStream");
$_V(c$,"close",
function(){
});
c$=$_P();
$_H();
c$=$_T(java.io.Console,"ConsoleWriter",java.io.PrintWriter);
$_K(c$,
function(out){
$_R(this,java.io.Console.ConsoleWriter,[out,true]);
this.lock=java.io.Console.CONSOLE_LOCK;
},"java.io.OutputStream");
$_V(c$,"close",
function(){
this.flush();
});
c$=$_P();
c$.CONSOLE_LOCK=c$.prototype.CONSOLE_LOCK=new JavaObject();
c$.console=c$.prototype.console=java.io.Console.makeConsole();
});
