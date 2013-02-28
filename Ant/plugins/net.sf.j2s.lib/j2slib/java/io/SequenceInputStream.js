$_L(["java.io.InputStream"],"java.io.SequenceInputStream",["java.lang.IndexOutOfBoundsException","$.NullPointerException","java.util.Vector"],function(){
c$=$_C(function(){
this.e=null;
this.$in=null;
$_Z(this,arguments);
},java.io,"SequenceInputStream",java.io.InputStream);
$_K(c$,
function(s1,s2){
$_R(this,java.io.SequenceInputStream,[]);
if(s1==null){
throw new NullPointerException();
}var inVector=new java.util.Vector(1);
inVector.addElement(s2);
this.e=inVector.elements();
this.$in=s1;
},"java.io.InputStream,java.io.InputStream");
$_K(c$,
function(e){
$_R(this,java.io.SequenceInputStream,[]);
this.e=e;
if(e.hasMoreElements()){
this.$in=e.nextElement();
if(this.$in==null){
throw new NullPointerException();
}}},"java.util.Enumeration");
$_M(c$,"available",
function(){
if(this.e!=null&&this.$in!=null){
return this.$in.available();
}return 0;
});
$_M(c$,"close",
function(){
while(this.$in!=null){
this.nextStream();
}
this.e=null;
});
$_M(c$,"nextStream",
($fz=function(){
if(this.$in!=null){
this.$in.close();
}if(this.e.hasMoreElements()){
this.$in=this.e.nextElement();
if(this.$in==null){
throw new NullPointerException();
}}else{
this.$in=null;
}},$fz.isPrivate=true,$fz));
$_M(c$,"read",
function(){
while(this.$in!=null){
var result=this.$in.read();
if(result>=0){
return result;
}this.nextStream();
}
return-1;
});
$_M(c$,"read",
function(buffer,offset,count){
if(this.$in==null){
return-1;
}if(buffer==null){
throw new NullPointerException("buffer==null");
}if((offset|count)<0||offset>buffer.length-count){
throw new IndexOutOfBoundsException();
}while(this.$in!=null){
var result=this.$in.read(buffer,offset,count);
if(result>=0){
return result;
}this.nextStream();
}
return-1;
},"~A,~N,~N");
});
