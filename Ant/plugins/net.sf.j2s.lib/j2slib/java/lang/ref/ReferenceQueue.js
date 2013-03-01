$_L(null,"java.lang.ref.ReferenceQueue",["java.lang.IllegalArgumentException"],function(){
c$=$_C(function(){
this.lock=null;
this.head=null;
this.queueLength=0;
$_Z(this,arguments);
},java.lang.ref,"ReferenceQueue");
$_Y(c$,function(){
this.lock=new java.lang.ref.ReferenceQueue.Lock();
});
$_K(c$,
function(){
});
$_M(c$,"enqueue",
function(r){
{
if(r.queue===java.lang.ref.ReferenceQueue.ENQUEUED)return false;
{
r.queue=java.lang.ref.ReferenceQueue.ENQUEUED;
r.next=(this.head==null)?r:this.head;
this.head=r;
this.queueLength++;
this.lock.notifyAll();
return true;
}}},"java.lang.ref.Reference");
$_M(c$,"reallyPoll",
($fz=function(){
if(this.head!=null){
var r=this.head;
this.head=(r.next===r)?null:r.next;
r.queue=java.lang.ref.ReferenceQueue.NULL;
r.next=r;
this.queueLength--;
return r;
}return null;
},$fz.isPrivate=true,$fz));
$_M(c$,"poll",
function(){
if(this.head==null)return null;
{
return this.reallyPoll();
}});
$_M(c$,"remove",
function(timeout){
if(timeout<0){
throw new IllegalArgumentException("Negative timeout value");
}{
var r=this.reallyPoll();
if(r!=null)return r;
for(;;){
this.lock.wait(timeout);
r=this.reallyPoll();
if(r!=null)return r;
if(timeout!=0)return null;
}
}},"~N");
$_M(c$,"remove",
function(){
return this.remove(0);
});
$_H();
c$=$_T(java.lang.ref.ReferenceQueue,"Null",java.lang.ref.ReferenceQueue);
$_V(c$,"enqueue",
function(a){
return false;
},"java.lang.ref.Reference");
c$=$_P();
$_H();
c$=$_T(java.lang.ref.ReferenceQueue,"Lock");
c$=$_P();
c$.NULL=c$.prototype.NULL=new java.lang.ref.ReferenceQueue.Null();
c$.ENQUEUED=c$.prototype.ENQUEUED=new java.lang.ref.ReferenceQueue.Null();
});
