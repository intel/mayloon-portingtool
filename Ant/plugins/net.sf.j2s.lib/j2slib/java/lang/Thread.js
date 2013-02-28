c$=$_C(function(){
this.group=null;
this.target=null;
this.worker=null;
this.name=null;
$_Z(this,arguments);
},java.lang,"Thread",null,Runnable);
$_M(c$,"getThreadGroup",
function(){
return this.group;
});
c$.currentThread=$_M(c$,"currentThread",
function(){
return null;
});
$_K(c$,
function(){
this.name=this.getClass().getName();
});
$_K(c$,
function(target){
this.name=this.getClass().getName();
this.target=target;
},"Runnable");
$_K(c$,
function(name){
this.name=name;
},"~S");
$_K(c$,
function(group,name){
this.name=name;
},"ThreadGroup,~S");
$_K(c$,
function(target,name){
this.name=name;
this.target=target;
},"Runnable,~S");
c$.sleep=$_M(c$,"sleep",
function(millis){
},"~N");
$_M(c$,"run",
function(){
if(this.target!=null){
this.target.run();
}});
$_M(c$,"start",
function(){
obj_this=this;
function do_run(){
var datas;
if(!obj_this.target){
datas=obj_this.run.toString().replace(new RegExp("this","gm"),"this.obj_this");
}else{
datas=obj_this.target.run.toString().replace(new RegExp("this","gm"),"this.obj_this");
}
datas=eval("("+datas+")");
obj_this.worker=Concurrent.Thread.create(datas);
console.log("thread starts successfully...");
}
console.log('thread starts...');
do_run();
});
$_M(c$,"stop",
function(){
throw new Exception("please use\n/**\n@j2sNative\ntry{\nConcurrent.Thread.stop();\n}catch(e){}\n*\/{}\n to stop itsself instead of<instance>.stop().For stopping an instance.Consider using kill()\n");
});
$_M(c$,"join",
function(){
throw new Exception("please use\n/**\n@j2sNative\n<instance>.worker.join()\n*\/{}\n instead of<instance>.join()");
});
$_M(c$,"join",
function(millis){
throw new Exception("please use\n/**\n@j2sNative\n<instance>.worker.join()\n*\/{}\n instead of<instance>.join()");
},"~N");
$_M(c$,"join",
function(millis,nanos){
throw new Exception("please use\n/**\n@j2sNative\n<instance>.worker.join()\n*\/{}\n instead of<instance>.join()");
},"~N,~N");
$_M(c$,"kill",
function(){
throw new Exception("please use\n/**\n@j2sNative\n<instance>.worker.kill()\n*\/{}\n instead of<instance>.kill().\nWARNING:kill()is not a safe method!");
});
c$.yield=$_M(c$,"yield",
function(){
throw new Exception("please use\n/**\n@j2sNative\nConcurrent.Thread.yield();\n*\/{}\n instead of Thread.yield()");
});
$_M(c$,"setName",
function(name){
this.name=name;
},"~S");
$_M(c$,"getName",
function(){
return String.valueOf(this.name);
});
$_V(c$,"toString",
function(){
return this.name;
});
$_M(c$,"setPriority",
function(newPriority){
},"~N");
$_M(c$,"destroy",
function(){
});
$_M(c$,"isAlive",
function(){
if(this.worker==null){
return false;
}throw new Exception("Can't determine whether the thread is alive or not!Please avoid to use this method");
return true;
});
$_S(c$,
"MIN_PRIORITY",1,
"NORM_PRIORITY",5,
"MAX_PRIORITY",10);
