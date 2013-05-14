$_L(["java.util.HashMap"],"java.util.LinkedHashMap",["java.lang.IllegalStateException","java.util.AbstractCollection","$.AbstractSet","java.util.MapEntry.Type","java.util.NoSuchElementException"],function(){
c$=$_C(function(){
this.accessOrder=false;
this.head=null;
this.tail=null;
$_Z(this,arguments);
},java.util,"LinkedHashMap",java.util.HashMap);
$_K(c$,
function(){
$_R(this,java.util.LinkedHashMap);
this.accessOrder=false;
this.head=null;
});
$_K(c$,
function(s){
$_R(this,java.util.LinkedHashMap,[s]);
this.accessOrder=false;
this.head=null;
},"~N");
$_K(c$,
function(s,lf){
$_R(this,java.util.LinkedHashMap,[s,lf]);
this.accessOrder=false;
this.head=null;
this.tail=null;
},"~N,~N");
$_K(c$,
function(s,lf,order){
$_R(this,java.util.LinkedHashMap,[s,lf]);
this.accessOrder=order;
this.head=null;
this.tail=null;
},"~N,~N,~B");
$_K(c$,
function(m){
$_R(this,java.util.LinkedHashMap,[]);
this.accessOrder=false;
this.head=null;
this.tail=null;
this.putAll(m);
},"java.util.Map");
$_V(c$,"newElementArray",
function(s){
return new Array(s);
},"~N");
$_V(c$,"get",
function(key){
var m=this.getEntry(key);
if(m==null){
return null;
}if(this.accessOrder&&this.tail!==m){
var p=m.chainBackward;
var n=m.chainForward;
n.chainBackward=p;
if(p!=null){
p.chainForward=n;
}else{
this.head=n;
}m.chainForward=null;
m.chainBackward=this.tail;
this.tail.chainForward=m;
this.tail=m;
}return m.value;
},"~O");
$_V(c$,"createEntry",
function(key,index,value){
var m=new java.util.LinkedHashMap.LinkedHashMapEntry(key,value);
m.next=this.elementData[index];
this.elementData[index]=m;
this.linkEntry(m);
return m;
},"~O,~N,~O");
$_V(c$,"put",
function(key,value){
return this.putEntry(key,value);
},"~O,~O");
$_M(c$,"putEntry",
($fz=function(key,value){
var index=this.getModuloHash(key);
var m=this.findEntry(key,index);
if(m==null){
this.modCount++;
if(++this.elementCount>this.threshold){
this.rehash();
index=key==null?0:(key.hashCode()&0x7FFFFFFF)%this.elementData.length;
}m=this.createEntry(key,index,null);
}else{
this.linkEntry(m);
}var result=m.value;
m.value=value;
if(this.removeEldestEntry(this.head)){
this.remove(this.head.key);
}return result;
},$fz.isPrivate=true,$fz),"~O,~O");
$_M(c$,"linkEntry",
function(m){
if(this.tail===m){
return;
}if(this.head==null){
this.head=this.tail=m;
return;
}var p=m.chainBackward;
var n=m.chainForward;
if(p==null){
if(n!=null){
if(this.accessOrder){
this.head=n;
n.chainBackward=null;
m.chainBackward=this.tail;
m.chainForward=null;
this.tail.chainForward=m;
this.tail=m;
}}else{
m.chainBackward=this.tail;
m.chainForward=null;
this.tail.chainForward=m;
this.tail=m;
}return;
}if(n==null){
return;
}if(this.accessOrder){
p.chainForward=n;
n.chainBackward=p;
m.chainForward=null;
m.chainBackward=this.tail;
this.tail.chainForward=m;
this.tail=m;
}},"java.util.LinkedHashMap.LinkedHashMapEntry");
$_V(c$,"entrySet",
function(){
return new java.util.LinkedHashMap.LinkedHashMapEntrySet(this);
});
$_V(c$,"keySet",
function(){
if(this.$keySet==null){
this.$keySet=(($_D("java.util.LinkedHashMap$1")?0:java.util.LinkedHashMap.$LinkedHashMap$1$()),$_N(java.util.LinkedHashMap$1,this,null));
}return this.$keySet;
});
$_V(c$,"values",
function(){
if(this.valuesCollection==null){
this.valuesCollection=(($_D("java.util.LinkedHashMap$2")?0:java.util.LinkedHashMap.$LinkedHashMap$2$()),$_N(java.util.LinkedHashMap$2,this,null));
}return this.valuesCollection;
});
$_V(c$,"remove",
function(key){
var m=this.removeEntry(key);
if(m==null){
return null;
}var p=m.chainBackward;
var n=m.chainForward;
if(p!=null){
p.chainForward=n;
}else{
this.head=n;
}if(n!=null){
n.chainBackward=p;
}else{
this.tail=p;
}return m.value;
},"~O");
$_M(c$,"removeEldestEntry",
function(eldest){
return false;
},"java.util.Map.Entry");
$_M(c$,"clear",
function(){
$_U(this,java.util.LinkedHashMap,"clear",[]);
this.head=this.tail=null;
this.valuesCollection=null;
this.$keySet=null;
});
$_M(c$,"clone",
function(){
var map=$_U(this,java.util.LinkedHashMap,"clone",[]);
map.clear();
for(var entry,$entry=this.entrySet().iterator();$entry.hasNext()&&((entry=$entry.next())||true);){
map.putEntry(entry.getKey(),entry.getValue());
}
return map;
});
c$.$LinkedHashMap$1$=function(){
$_H();
c$=$_W(java.util,"LinkedHashMap$1",java.util.AbstractSet);
$_V(c$,"contains",
function(object){
return this.b$["java.util.LinkedHashMap"].containsKey(object);
},"~O");
$_V(c$,"size",
function(){
return this.b$["java.util.LinkedHashMap"].size();
});
$_V(c$,"clear",
function(){
this.b$["java.util.LinkedHashMap"].clear();
});
$_V(c$,"remove",
function(key){
if(this.b$["java.util.LinkedHashMap"].containsKey(key)){
this.b$["java.util.LinkedHashMap"].remove(key);
return true;
}return false;
},"~O");
$_V(c$,"iterator",
function(){
return new java.util.LinkedHashMap.LinkedHashIterator((($_D("java.util.LinkedHashMap$1$1")?0:java.util.LinkedHashMap.$LinkedHashMap$1$1$()),$_N(java.util.LinkedHashMap$1$1,this,null)),this.b$["java.util.LinkedHashMap"]);
});
c$=$_P();
};
c$.$LinkedHashMap$1$1$=function(){
$_H();
c$=$_W(java.util,"LinkedHashMap$1$1",null,java.util.MapEntry.Type);
$_V(c$,"get",
function(entry){
return entry.key;
},"java.util.MapEntry");
c$=$_P();
};
c$.$LinkedHashMap$2$=function(){
$_H();
c$=$_W(java.util,"LinkedHashMap$2",java.util.AbstractCollection);
$_V(c$,"contains",
function(object){
return this.b$["java.util.LinkedHashMap"].containsValue(object);
},"~O");
$_V(c$,"size",
function(){
return this.b$["java.util.LinkedHashMap"].size();
});
$_V(c$,"clear",
function(){
this.b$["java.util.LinkedHashMap"].clear();
});
$_V(c$,"iterator",
function(){
return new java.util.LinkedHashMap.LinkedHashIterator((($_D("java.util.LinkedHashMap$2$1")?0:java.util.LinkedHashMap.$LinkedHashMap$2$1$()),$_N(java.util.LinkedHashMap$2$1,this,null)),this.b$["java.util.LinkedHashMap"]);
});
c$=$_P();
};
c$.$LinkedHashMap$2$1$=function(){
$_H();
c$=$_W(java.util,"LinkedHashMap$2$1",null,java.util.MapEntry.Type);
$_V(c$,"get",
function(entry){
return entry.value;
},"java.util.MapEntry");
c$=$_P();
};
$_H();
c$=$_T(java.util.LinkedHashMap,"LinkedHashIterator",java.util.HashMap.HashMapIterator);
$_K(c$,
function(value,hm){
$_R(this,java.util.LinkedHashMap.LinkedHashIterator,[value,hm]);
this.entry=hm.head;
},"java.util.MapEntry.Type,java.util.LinkedHashMap");
$_V(c$,"hasNext",
function(){
return(this.entry!=null);
});
$_V(c$,"next",
function(){
this.checkConcurrentMod();
if(!this.hasNext()){
throw new java.util.NoSuchElementException();
}var result=this.type.get(this.entry);
this.lastEntry=this.entry;
this.entry=(this.entry).chainForward;
this.canRemove=true;
return result;
});
$_V(c$,"remove",
function(){
this.checkConcurrentMod();
if(!this.canRemove){
throw new IllegalStateException();
}this.canRemove=false;
this.associatedMap.modCount++;
var index=this.associatedMap.getModuloHash(this.lastEntry.key);
var m=this.associatedMap.elementData[index];
if(m===this.lastEntry){
this.associatedMap.elementData[index]=this.lastEntry.next;
}else{
while(m.next!=null){
if(m.next===this.lastEntry){
break;
}m=m.next;
}
m.next=this.lastEntry.next;
}var lhme=this.lastEntry;
var p=lhme.chainBackward;
var n=lhme.chainForward;
var lhm=this.associatedMap;
if(p!=null){
p.chainForward=n;
if(n!=null){
n.chainBackward=p;
}else{
lhm.tail=p;
}}else{
lhm.head=n;
if(n!=null){
n.chainBackward=null;
}else{
lhm.tail=null;
}}this.associatedMap.elementCount--;
this.expectedModCount++;
});
c$=$_P();
$_H();
c$=$_T(java.util.LinkedHashMap,"LinkedHashMapEntrySet",java.util.HashMap.HashMapEntrySet);
$_V(c$,"iterator",
function(){
return new java.util.LinkedHashMap.LinkedHashIterator((($_D("java.util.LinkedHashMap$LinkedHashMapEntrySet$1")?0:java.util.LinkedHashMap.LinkedHashMapEntrySet.$LinkedHashMap$LinkedHashMapEntrySet$1$()),$_N(java.util.LinkedHashMap$LinkedHashMapEntrySet$1,this,null)),this.hashMap());
});
c$.$LinkedHashMap$LinkedHashMapEntrySet$1$=function(){
$_H();
c$=$_W(java.util,"LinkedHashMap$LinkedHashMapEntrySet$1",null,java.util.MapEntry.Type);
$_V(c$,"get",
function(entry){
return entry;
},"java.util.MapEntry");
c$=$_P();
};
c$=$_P();
$_H();
c$=$_C(function(){
this.chainForward=null;
this.chainBackward=null;
$_Z(this,arguments);
},java.util.LinkedHashMap,"LinkedHashMapEntry",java.util.HashMap.Entry);
$_K(c$,
function(theKey,theValue){
$_R(this,java.util.LinkedHashMap.LinkedHashMapEntry,[theKey,theValue]);
this.chainForward=null;
this.chainBackward=null;
},"~O,~O");
$_M(c$,"clone",
function(){
var entry=$_U(this,java.util.LinkedHashMap.LinkedHashMapEntry,"clone",[]);
entry.chainBackward=this.chainBackward;
entry.chainForward=this.chainForward;
var lnext=entry.next;
if(lnext!=null){
entry.next=lnext.clone();
}return entry;
});
c$=$_P();
});
