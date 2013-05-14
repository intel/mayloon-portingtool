$_L(["java.util.AbstractList"],"java.util.AbstractSequentialList",["java.lang.IndexOutOfBoundsException","$.NullPointerException"],function(){
c$=$_T(java.util,"AbstractSequentialList",java.util.AbstractList);
$_M(c$,"add",
function(location,object){
if(object==null){
throw new NullPointerException();
}this.listIterator(location).add(object);
},"~N,~O");
$_M(c$,"addAll",
function(location,collection){
if(collection==null){
throw new NullPointerException();
}var it=this.listIterator(location);
var colIt=collection.iterator();
var next=it.nextIndex();
while(colIt.hasNext()){
it.add(colIt.next());
}
return next!=it.nextIndex();
},"~N,java.util.Collection");
$_V(c$,"get",
function(location){
if(location<0||location>=this.size()){
throw new IndexOutOfBoundsException();
}return this.listIterator(location).next();
},"~N");
$_V(c$,"iterator",
function(){
return this.listIterator(0);
});
$_M(c$,"remove",
function(location){
if(location<0||location>=this.size()){
throw new IndexOutOfBoundsException();
}var it=this.listIterator(location);
var result=it.next();
it.remove();
return result;
},"~N");
$_V(c$,"set",
function(location,object){
if(location<0||(location>=this.size())){
throw new IndexOutOfBoundsException();
}var it=this.listIterator(location);
var result=it.next();
it.set(object);
return result;
},"~N,~O");
$_M(c$,"hashCode",
function(){
var result=1;
var it=this.iterator();
while(it.hasNext()){
var object=it.next();
result=(31*result)+(object==null?0:object.hashCode());
}
return result;
});
});
