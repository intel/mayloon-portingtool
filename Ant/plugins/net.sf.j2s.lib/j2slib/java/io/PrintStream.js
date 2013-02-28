$_L(["java.io.Closeable","$.FilterOutputStream","java.lang.Appendable"],"java.io.PrintStream",["java.io.File","$.FileOutputStream","$.UnsupportedEncodingException","java.lang.ArrayIndexOutOfBoundsException","$.NullPointerException","java.nio.charset.Charset","java.util.Formatter","$.Locale"],function(){
c$=$_C(function(){
this.ioError=false;
this.autoflush=false;
this.encoding=null;
this.lineSeparator="\n";
$_Z(this,arguments);
},java.io,"PrintStream",java.io.FilterOutputStream,[Appendable,java.io.Closeable]);
$_K(c$,
function(out){
$_R(this,java.io.PrintStream,[out]);
if(out==null){
throw new NullPointerException();
}},"java.io.OutputStream");
$_K(c$,
function(out,autoflush){
$_R(this,java.io.PrintStream,[out]);
if(out==null){
throw new NullPointerException();
}this.autoflush=autoflush;
},"java.io.OutputStream,~B");
$_K(c$,
function(out,autoflush,enc){
$_R(this,java.io.PrintStream,[out]);
if(out==null||enc==null){
throw new NullPointerException();
}this.autoflush=autoflush;
try{
if(!java.nio.charset.Charset.isSupported(enc)){
throw new java.io.UnsupportedEncodingException(enc);
}}catch(e){
if($_O(e,java.nio.charset.IllegalCharsetNameException)){
throw new java.io.UnsupportedEncodingException(enc);
}else{
throw e;
}
}
this.encoding=enc;
},"java.io.OutputStream,~B,~S");
$_K(c$,
function(file){
$_R(this,java.io.PrintStream,[new java.io.FileOutputStream(file)]);
},"java.io.File");
$_K(c$,
function(file,csn){
$_R(this,java.io.PrintStream,[new java.io.FileOutputStream(file)]);
if(csn==null){
throw new NullPointerException();
}if(!java.nio.charset.Charset.isSupported(csn)){
throw new java.io.UnsupportedEncodingException(csn);
}this.encoding=csn;
},"java.io.File,~S");
$_K(c$,
function(fileName){
this.construct(new java.io.File(fileName));
},"~S");
$_K(c$,
function(fileName,csn){
this.construct(new java.io.File(fileName),csn);
},"~S,~S");
$_M(c$,"checkError",
function(){
var delegate=this.out;
if(delegate==null){
return this.ioError;
}this.flush();
return this.ioError||delegate.checkError();
});
$_M(c$,"clearError",
function(){
this.ioError=false;
});
$_V(c$,"close",
function(){
this.flush();
if(this.out!=null){
try{
this.out.close();
this.out=null;
}catch(e){
if($_O(e,java.io.IOException)){
this.setError();
}else{
throw e;
}
}
}});
$_V(c$,"flush",
function(){
if(this.out!=null){
try{
this.out.flush();
return;
}catch(e){
if($_O(e,java.io.IOException)){
}else{
throw e;
}
}
}this.setError();
});
$_M(c$,"format",
function(format,args){
return this.format(java.util.Locale.getDefault(),format,[args]);
},"~S,~A");
$_M(c$,"format",
function(l,format,args){
if(format==null){
throw new NullPointerException("format==null");
}new java.util.Formatter(this,l).format(format,[args]);
return this;
},"java.util.Locale,~S,~A");
$_M(c$,"printf",
function(format,args){
return this.format(format,[args]);
},"~S,~A");
$_M(c$,"printf",
function(l,format,args){
return this.format(l,format,[args]);
},"java.util.Locale,~S,~A");
$_M(c$,"newline",
($fz=function(){
this.print("\n");
},$fz.isPrivate=true,$fz));
$_M(c$,"print",
function(charArray){
this.print(String.instantialize(charArray,0,charArray.length));
},"~A");
$_M(c$,"print",
function(ch){
this.print(String.valueOf(ch));
},"~N");
$_M(c$,"print",
function(dnum){
this.print(String.valueOf(dnum));
},"~N");
$_M(c$,"print",
function(fnum){
this.print(String.valueOf(fnum));
},"~N");
$_M(c$,"print",
function(inum){
this.print(String.valueOf(inum));
},"~N");
$_M(c$,"print",
function(lnum){
this.print(String.valueOf(lnum));
},"~N");
$_M(c$,"print",
function(obj){
this.print(String.valueOf(obj));
},"~O");
$_M(c$,"print",
function(str){
if(this.out==null){
this.setError();
return;
}if(str==null){
this.print("null");
return;
}try{
if(this.encoding==null){
this.write(str.getBytes());
}else{
this.write(str.getBytes(this.encoding));
}}catch(e){
if($_O(e,java.io.IOException)){
this.setError();
}else{
throw e;
}
}
},"~S");
$_M(c$,"print",
function(bool){
this.print(String.valueOf(bool));
},"~B");
$_M(c$,"println",
function(){
this.newline();
});
$_M(c$,"println",
function(charArray){
this.println(String.instantialize(charArray,0,charArray.length));
},"~A");
$_M(c$,"println",
function(ch){
this.println(String.valueOf(ch));
},"~N");
$_M(c$,"println",
function(dnum){
this.println(String.valueOf(dnum));
},"~N");
$_M(c$,"println",
function(fnum){
this.println(String.valueOf(fnum));
},"~N");
$_M(c$,"println",
function(inum){
this.println(String.valueOf(inum));
},"~N");
$_M(c$,"println",
function(lnum){
this.println(String.valueOf(lnum));
},"~N");
$_M(c$,"println",
function(obj){
this.println(String.valueOf(obj));
},"~O");
$_M(c$,"println",
function(str){
this.print(str);
this.newline();
},"~S");
$_M(c$,"println",
function(bool){
this.println(String.valueOf(bool));
},"~B");
$_M(c$,"setError",
function(){
this.ioError=true;
});
$_M(c$,"write",
function(buffer,offset,length){
if(offset>buffer.length||offset<0){
throw new ArrayIndexOutOfBoundsException("Offset out of bounds:"+offset);
}if(length<0||length>buffer.length-offset){
throw new ArrayIndexOutOfBoundsException("Length out of bounds:"+length);
}{
if(this.out==null){
this.setError();
return;
}try{
this.out.write(buffer,offset,length);
if(this.autoflush){
this.flush();
}}catch(e){
if($_O(e,java.io.IOException)){
this.setError();
}else{
throw e;
}
}
}},"~A,~N,~N");
$_M(c$,"write",
function(oneByte){
if(this.out==null){
this.setError();
return;
}try{
this.out.write(oneByte);
var b=oneByte&0xFF;
var isNewline=b==0x0A||b==0x15;
if(this.autoflush&&isNewline){
this.flush();
}}catch(e){
if($_O(e,java.io.IOException)){
this.setError();
}else{
throw e;
}
}
},"~N");
$_M(c$,"append",
function(c){
this.print(c);
return this;
},"~N");
$_M(c$,"append",
function(csq){
if(null==csq){
this.print("null");
}else{
this.print(csq.toString());
}return this;
},"CharSequence");
$_M(c$,"append",
function(csq,start,end){
if(null==csq){
this.print("null".substring(start,end));
}else{
this.print(csq.subSequence(start,end).toString());
}return this;
},"CharSequence,~N,~N");
$_S(c$,
"TOKEN_NULL","null");
});
