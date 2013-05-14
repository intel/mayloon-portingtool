$_L(["java.util.AbstractList","$.RandomAccess"],"java.util.Arrays",["java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException","$.NullPointerException","$.StringBuilder","java.lang.reflect.Array"],function(){
c$=$_T(java.util,"Arrays");
c$.sort=$_M(c$,"sort",
function(a){
var aux=a.sort(function(o1,o2){
if(typeof o1=="string"||o1 instanceof Comparable){
return o1.compareTo(o2);
}
return o1-o2;
});
for(var i=0;i<a.length;i++){
a[i]=aux[i];
}
},"~A");
c$.sort=$_M(c$,"sort",
function(a,fromIndex,toIndex){
this.rangeCheck(a.length,fromIndex,toIndex);
var aux=new Array();
for(var i=fromIndex;i<toIndex;i++){
aux[i-fromIndex]=a[i];
}
aux=aux.sort(function(o1,o2){
if(typeof o1=="string"||o1 instanceof Comparable){
return o1.compareTo(o2);
}
return o1-o2;
});
for(var i=fromIndex;i<toIndex;i++){
a[i]=aux[i-fromIndex];
}
},"~A,~N,~N");
c$.sort=$_M(c$,"sort",
function(a,c){
var aux=a.sort(function(o1,o2){
if(c!=null){
return c.compare(o1,o2);
}else if(typeof o1=="string"||o1 instanceof Comparable){
return o1.compareTo(o2);
}
return o1-o2;
});
for(var i=0;i<a.length;i++){
a[i]=aux[i];
}
},"~A,java.util.Comparator");
c$.sort=$_M(c$,"sort",
function(a,fromIndex,toIndex,c){
this.rangeCheck(a.length,fromIndex,toIndex);
var aux=new Array();
for(var i=fromIndex;i<toIndex;i++){
aux[i-fromIndex]=a[i];
}
aux=aux.sort(function(o1,o2){
if(c!=null){
return c.compare(o1,o2);
}else if(typeof o1=="string"||o1 instanceof Comparable){
return o1.compareTo(o2);
}
return o1-o2;
});
for(var i=fromIndex;i<toIndex;i++){
a[i]=aux[i-fromIndex];
}
},"~A,~N,~N,java.util.Comparator");
c$.rangeCheck=$_M(c$,"rangeCheck",
($fz=function(arrayLen,fromIndex,toIndex){
if(fromIndex>toIndex)throw new IllegalArgumentException("fromIndex("+fromIndex+")>toIndex("+toIndex+")");
if(fromIndex<0)throw new ArrayIndexOutOfBoundsException(fromIndex);
if(toIndex>arrayLen)throw new ArrayIndexOutOfBoundsException(toIndex);
},$fz.isPrivate=true,$fz),"~N,~N,~N");
c$.binarySearch=$_M(c$,"binarySearch",
function(a,key){
var low=0;
var high=a.length-1;
while(low<=high){
var mid=(low+high)>>1;
var midVal=a[mid];
if(midVal<key)low=mid+1;
else if(midVal>key)high=mid-1;
else return mid;
}
return-(low+1);
},"~A,~N");
c$.binarySearch=$_M(c$,"binarySearch",
function(a,key){
var low=0;
var high=a.length-1;
while(low<=high){
var mid=(low+high)>>1;
var midVal=a[mid];
var cmp=(midVal).compareTo(key);
if(cmp<0)low=mid+1;
else if(cmp>0)high=mid-1;
else return mid;
}
return-(low+1);
},"~A,~O");
c$.binarySearch=$_M(c$,"binarySearch",
function(a,key,c){
if(c==null)return java.util.Arrays.binarySearch(a,key);
var low=0;
var high=a.length-1;
while(low<=high){
var mid=(low+high)>>1;
var midVal=a[mid];
var cmp=c.compare(midVal,key);
if(cmp<0)low=mid+1;
else if(cmp>0)high=mid-1;
else return mid;
}
return-(low+1);
},"~A,~O,java.util.Comparator");
c$.equals=$_M(c$,"equals",
function(a,a2){
if(a===a2)return true;
if(a==null||a2==null)return false;
var length=a.length;
if(a2.length!=length)return false;
for(var i=0;i<length;i++){
var o1=a[i];
var o2=a2[i];
if(!(o1==null?o2==null:(o1.equals==null?o1==o2:o1.equals(o2))))return false;
}
return true;
},"~A,~A");
c$.fill=$_M(c$,"fill",
function(a,val){
java.util.Arrays.fill(a,0,a.length,val);
},"~A,~O");
c$.fill=$_M(c$,"fill",
function(a,fromIndex,toIndex,val){
java.util.Arrays.rangeCheck(a.length,fromIndex,toIndex);
for(var i=fromIndex;i<toIndex;i++)a[i]=val;

},"~A,~N,~N,~O");
c$.asList=$_M(c$,"asList",
function(a){
return new java.util.Arrays.ArrayList(a);
},"~A");
c$.copyOfRange=$_M(c$,"copyOfRange",
function(original,start,end){
if(start>end){
throw new IllegalArgumentException();
}if(original==null){
throw new NullPointerException();
}var originalLength=original.length;
if(start<0||start>originalLength){
throw new ArrayIndexOutOfBoundsException();
}var resultLength=end-start;
var copyLength=Math.min(resultLength,originalLength-start);
var result=java.lang.reflect.Array.newInstance(JavaObject,resultLength);
System.arraycopy(original,start,result,0,copyLength);
return result;
},"~A,~N,~N");
c$.toString=$_M(c$,"toString",
function(array){
if(array==null){
return"null";
}if(array.length==0){
return"[]";
}var sb=new StringBuilder();
sb.append('[');
sb.append(array[0]);
for(var i=1;i<array.length;i++){
sb.append(",");
sb.append(array[i]);
}
sb.append(']');
return sb.toString();
},"~A");
$_H();
c$=$_C(function(){
this.a=null;
$_Z(this,arguments);
},java.util.Arrays,"ArrayList",java.util.AbstractList,[java.util.RandomAccess,java.io.Serializable]);
$_K(c$,
function(array){
$_R(this,java.util.Arrays.ArrayList,[]);
if(array==null)throw new NullPointerException();
this.a=array;
},"~A");
$_V(c$,"size",
function(){
return this.a.length;
});
$_M(c$,"toArray",
function(){
return this.a.clone();
});
$_V(c$,"get",
function(index){
return this.a[index];
},"~N");
$_V(c$,"set",
function(index,element){
var oldValue=this.a[index];
this.a[index]=element;
return oldValue;
},"~N,~O");
$_V(c$,"indexOf",
function(o){
if(o==null){
for(var i=0;i<this.a.length;i++)if(this.a[i]==null)return i;

}else{
for(var i=0;i<this.a.length;i++)if(o.equals(this.a[i]))return i;

}return-1;
},"~O");
$_V(c$,"contains",
function(o){
return this.indexOf(o)!=-1;
},"~O");
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
c$=$_P();
$_S(c$,
"INSERTIONSORT_THRESHOLD",7);
});
