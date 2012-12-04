/* http://j2s.sf.net/ */$_J("net.sf.j2s.ajax");
$_L(null,"net.sf.j2s.ajax.AWindowDelegate",["$wt.events.DisposeListener","$wt.widgets.Display"],function(){
c$=$_C(function(){
this.win=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"AWindowDelegate");
$_K(c$,
function(win){
this.win=win;
},"org.eclipse.jface.window.Window");
c$.open=$_M(c$,"open",
function(win,runnable){
win.setBlockOnOpen(false);
new net.sf.j2s.ajax.AWindowDelegate(win).nonBlockOpen(null,runnable);
},"org.eclipse.jface.window.Window,net.sf.j2s.ajax.AWindowRunnable");
c$.asyncOpen=$_M(c$,"asyncOpen",
function(win,oThis,runnable){
win.setBlockOnOpen(false);
new net.sf.j2s.ajax.AWindowDelegate(win).nonBlockOpen(oThis,runnable);
},"org.eclipse.jface.window.Window,~O,net.sf.j2s.ajax.AWindowRunnable");
$_M(c$,"nonBlockOpen",
function(oThis,runnable){
if($_O(runnable,net.sf.j2s.ajax.AWindowRunnable)){
runnable.setWindow(this.win);
}var isJ2SEnv=false;
{
isJ2SEnv=true;
}if(isJ2SEnv){
{
this.win.open();
}((($_D("net.sf.j2s.ajax.AWindowDelegate$1")?0:net.sf.j2s.ajax.AWindowDelegate.$AWindowDelegate$1$()),$_N(net.sf.j2s.ajax.AWindowDelegate$1,this,$_F("oThis",oThis,"runnable",runnable)))).run();
}else{
}},"~O,net.sf.j2s.ajax.AWindowRunnable");
$_M(c$,"getActiveDisplay",
function(){
var display=null;
var shell=this.win.getShell();
if(shell!=null){
display=shell.getDisplay();
}if(display==null){
display=$wt.widgets.Display.getCurrent();
}if(display==null){
display=$wt.widgets.Display.getDefault();
}return display;
});
c$.$AWindowDelegate$1$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"AWindowDelegate$1",null,Runnable);
$_M(c$,"run",
function(){
var shell=this.b$["net.sf.j2s.ajax.AWindowDelegate"].win.getShell();
if(shell==null){
this.b$["net.sf.j2s.ajax.AWindowDelegate"].getActiveDisplay().timerExec(10,this);
return;
}shell.addDisposeListener((($_D("net.sf.j2s.ajax.AWindowDelegate$1$1")?0:net.sf.j2s.ajax.AWindowDelegate.$AWindowDelegate$1$1$()),$_N(net.sf.j2s.ajax.AWindowDelegate$1$1,this,$_F("oThis",this.f$.oThis,"runnable",this.f$.runnable))));
shell.getDisplay().readAndDispatch();
});
c$=$_P();
};
c$.$AWindowDelegate$1$1$=function(){
$_H();
c$=$_W(net.sf.j2s.ajax,"AWindowDelegate$1$1",null,$wt.events.DisposeListener);
$_V(c$,"widgetDisposed",
function(e){
e.display.update();
if(this.f$.oThis==null){
e.display.timerExec(5,this.f$.runnable);
}else{
var $runnable=this.f$.runnable;
var $oThis=this.f$.oThis;
window.setTimeout(function(){
$runnable.apply($oThis);
},0);
}},"$wt.events.DisposeEvent");
c$=$_P();
};
});
$_J("net.sf.j2s.ajax");
c$=$_C(function(){
this.win=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"AWindowRunnable",null,Runnable);
$_M(c$,"setWindow",
function(win){
this.win=win;
},"org.eclipse.jface.window.Window");
$_M(c$,"getWindow",
function(){
return this.win;
});
$_M(c$,"getReturnCode",
function(){
return this.win.getReturnCode();
});
Clazz.declarePackage("org.eclipse.jface.operation");
Clazz.declareInterface(org.eclipse.jface.operation,"IRunnableContext");
Clazz.declarePackage("org.eclipse.jface.operation");
Clazz.declareInterface(org.eclipse.jface.operation,"IRunnableWithProgress");
Clazz.declarePackage("org.eclipse.jface.operation");
Clazz.declareInterface(org.eclipse.jface.operation,"IThreadListener");
Clazz.declarePackage("org.eclipse.jface.window");
Clazz.declareInterface(org.eclipse.jface.window,"IShellProvider");
Clazz.declarePackage("org.eclipse.jface.window");
Clazz.load(["org.eclipse.jface.window.IShellProvider"],"org.eclipse.jface.window.SameShellProvider",null,function(){
c$=Clazz.decorateAsClass(function(){
this.targetControl=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.window,"SameShellProvider",null,org.eclipse.jface.window.IShellProvider);
Clazz.makeConstructor(c$,
function(targetControl){
this.targetControl=targetControl;
},"$wt.widgets.Control");
Clazz.overrideMethod(c$,"getShell",
function(){
if(Clazz.instanceOf(this.targetControl,$wt.widgets.Shell)){
return this.targetControl;
}return this.targetControl==null?null:this.targetControl.getShell();
});
});
Clazz.declarePackage("org.eclipse.jface.window");
Clazz.load(["java.util.ArrayList"],"org.eclipse.jface.window.WindowManager",null,function(){
c$=Clazz.decorateAsClass(function(){
this.windows=null;
this.subManagers=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.window,"WindowManager");
Clazz.prepareFields(c$,function(){
this.windows=new java.util.ArrayList();
});
Clazz.makeConstructor(c$,
function(){
});
Clazz.makeConstructor(c$,
function(parent){
;
parent.addWindowManager(this);
},"org.eclipse.jface.window.WindowManager");
Clazz.defineMethod(c$,"add",
function(window){
if(!this.windows.contains(window)){
this.windows.add(window);
window.setWindowManager(this);
}},"org.eclipse.jface.window.Window");
Clazz.defineMethod(c$,"addWindowManager",
($fz=function(wm){
if(this.subManagers==null)this.subManagers=new java.util.ArrayList();
if(!this.subManagers.contains(wm)){
this.subManagers.add(wm);
}},$fz.isPrivate=true,$fz),"org.eclipse.jface.window.WindowManager");
Clazz.defineMethod(c$,"close",
function(){
var t=this.windows.clone();
var e=t.iterator();
while(e.hasNext()){
var window=e.next();
var closed=window.close();
if(!closed)return false;
}
if(this.subManagers!=null){
e=this.subManagers.iterator();
while(e.hasNext()){
var wm=e.next();
var closed=wm.close();
if(!closed)return false;
}
}return true;
});
Clazz.defineMethod(c$,"getWindowCount",
function(){
return this.windows.size();
});
Clazz.defineMethod(c$,"getWindows",
function(){
var bs=new Array(this.windows.size());
this.windows.toArray(bs);
return bs;
});
Clazz.defineMethod(c$,"remove",
function(window){
if(this.windows.contains(window)){
this.windows.remove(window);
window.setWindowManager(null);
}},"org.eclipse.jface.window.Window");
});
Clazz.declarePackage("org.eclipse.jface.window");
Clazz.load(["org.eclipse.jface.util.IPropertyChangeListener","org.eclipse.jface.window.IShellProvider","net.sf.j2s.ajax.AWindowDelegate","$wt.widgets.Display"],"org.eclipse.jface.window.Window",["java.util.ArrayList","org.eclipse.jface.resource.JFaceResources","org.eclipse.jface.util.Geometry","org.eclipse.jface.window.SameShellProvider","$wt.events.ShellAdapter","$wt.graphics.Point","$.Rectangle","$wt.layout.GridLayout","$wt.widgets.Composite","$.Listener","$.Shell"],function(){
c$=Clazz.decorateAsClass(function(){
this.parentShell=null;
this.shellStyle=1264;
this.windowManager=null;
this.shell=null;
this.contents=null;
this.returnCode=0;
this.block=false;
if(!Clazz.isClassDefined("org.eclipse.jface.window.Window.FontChangeListener")){
org.eclipse.jface.window.Window.$Window$FontChangeListener$();
}
this.fontChangeListener=null;
this.resizeHasOccurred=false;
this.resizeListener=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.window,"Window",null,org.eclipse.jface.window.IShellProvider);
Clazz.makeConstructor(c$,
function(parentShell){
this.construct(new org.eclipse.jface.window.SameShellProvider(parentShell));
if(parentShell==null)this.setShellStyle(this.getShellStyle()|org.eclipse.jface.window.Window.getDefaultOrientation());
},"$wt.widgets.Shell");
Clazz.makeConstructor(c$,
function(shellProvider){
if(shellProvider==null){
this.parentShell=new org.eclipse.jface.window.SameShellProvider(null);
this.setShellStyle(this.getShellStyle()|org.eclipse.jface.window.Window.getDefaultOrientation());
return;
};
this.parentShell=shellProvider;
},"org.eclipse.jface.window.IShellProvider");
Clazz.defineMethod(c$,"canHandleShellCloseEvent",
function(){
return true;
});
Clazz.defineMethod(c$,"close",
function(){
if(this.shell==null||this.shell.isDisposed())return true;
if(this.fontChangeListener!=null){
org.eclipse.jface.resource.JFaceResources.getFontRegistry().removeListener(this.fontChangeListener);
this.fontChangeListener=null;
}this.shell.dispose();
this.shell=null;
this.contents=null;
if(this.windowManager!=null){
this.windowManager.remove(this);
this.windowManager=null;
}return true;
});
Clazz.defineMethod(c$,"configureShell",
function(newShell){
if(org.eclipse.jface.window.Window.defaultImages!=null&&org.eclipse.jface.window.Window.defaultImages.length>0){
var nonDisposedImages=new java.util.ArrayList(org.eclipse.jface.window.Window.defaultImages.length);
for(var i=0;i<org.eclipse.jface.window.Window.defaultImages.length;++i)if(org.eclipse.jface.window.Window.defaultImages[i]!=null&&!org.eclipse.jface.window.Window.defaultImages[i].isDisposed())nonDisposedImages.add(org.eclipse.jface.window.Window.defaultImages[i]);

if(nonDisposedImages.size()<=0)System.err.println("Window.configureShell: images disposed");
else{
var array=new Array(nonDisposedImages.size());
nonDisposedImages.toArray(array);
newShell.setImages(array);
}}var layout=this.getLayout();
if(layout!=null)newShell.setLayout(layout);
},"$wt.widgets.Shell");
Clazz.defineMethod(c$,"getLayout",
function(){
var layout=new $wt.layout.GridLayout();
layout.marginHeight=0;
layout.marginWidth=0;
return layout;
});
Clazz.defineMethod(c$,"constrainShellSize",
function(){
var bounds=this.shell.getBounds();
var constrained=this.getConstrainedShellBounds(bounds);
if(!bounds.equals(constrained)){
this.shell.setBounds(constrained);
}});
Clazz.defineMethod(c$,"create",
function(){
this.shell=this.createShell();
this.contents=this.createContents(this.shell);
this.initializeBounds();
});
Clazz.defineMethod(c$,"createContents",
function(parent){
return new $wt.widgets.Composite(parent,0);
},"$wt.widgets.Composite");
Clazz.defineMethod(c$,"createShell",
function(){
var newParent=this.getParentShell();
if(newParent!=null&&newParent.isDisposed()){
this.parentShell=new org.eclipse.jface.window.SameShellProvider(null);
newParent=this.getParentShell();
}var newShell=null;
if(newParent!=null){
newShell=new $wt.widgets.Shell(newParent,this.getShellStyle());
}else{
newShell=new $wt.widgets.Shell(Clazz.castNullAs("org.eclipse.swt.widgets.Shell"),this.getShellStyle());
}this.resizeListener=((Clazz.isClassDefined("org.eclipse.jface.window.Window$2")?0:org.eclipse.jface.window.Window.$Window$2$()),Clazz.innerTypeInstance(org.eclipse.jface.window.Window$2,this,null));
newShell.addListener(11,this.resizeListener);
newShell.setData(this);
newShell.addShellListener(this.getShellListener());
this.configureShell(newShell);
if(this.fontChangeListener==null){
this.fontChangeListener=Clazz.innerTypeInstance(org.eclipse.jface.window.Window.FontChangeListener,this,null);
}org.eclipse.jface.resource.JFaceResources.getFontRegistry().addListener(this.fontChangeListener);
return newShell;
});
Clazz.defineMethod(c$,"getContents",
function(){
return this.contents;
});
c$.getDefaultImage=Clazz.defineMethod(c$,"getDefaultImage",
function(){
return(org.eclipse.jface.window.Window.defaultImages==null||org.eclipse.jface.window.Window.defaultImages.length<1)?null:org.eclipse.jface.window.Window.defaultImages[0];
});
c$.getDefaultImages=Clazz.defineMethod(c$,"getDefaultImages",
function(){
return(org.eclipse.jface.window.Window.defaultImages==null?new Array(0):org.eclipse.jface.window.Window.defaultImages);
});
Clazz.defineMethod(c$,"getInitialLocation",
function(initialSize){
var parent=this.shell.getParent();
var monitor=this.shell.getDisplay().getPrimaryMonitor();
if(parent!=null){
monitor=parent.getMonitor();
}var monitorBounds=monitor.getClientArea();
var centerPoint;
if(parent!=null){
centerPoint=org.eclipse.jface.util.Geometry.centerPoint(parent.getBounds());
}else{
centerPoint=org.eclipse.jface.util.Geometry.centerPoint(monitorBounds);
}return new $wt.graphics.Point(centerPoint.x-(Math.floor(initialSize.x/ 2)), Math.max (monitorBounds.y, Math.min (centerPoint.y - (Math.floor (initialSize.y * 2 /3)),monitorBounds.y+monitorBounds.height-initialSize.y)));
},"$wt.graphics.Point");
Clazz.defineMethod(c$,"getInitialSize",
function(){
return this.shell.computeSize(-1,-1,true);
});
c$.getModalChild=Clazz.defineMethod(c$,"getModalChild",
($fz=function(toSearch){
var modal=229376;
for(var i=toSearch.length-1;i>=0;i--){
var shell=toSearch[i];
var children=shell.getShells();
var modalChild=org.eclipse.jface.window.Window.getModalChild(children);
if(modalChild!=null){
return modalChild;
}if(shell.isVisible()&&(shell.getStyle()&modal)!=0){
return shell;
}}
return null;
},$fz.isPrivate=true,$fz),"~A");
Clazz.defineMethod(c$,"getParentShell",
function(){
var parent=this.parentShell.getShell();
var modal=229376;
if((this.getShellStyle()&modal)!=0){
if(parent==null){
parent=org.eclipse.jface.window.Window.defaultModalParent.getShell();
}}return parent;
});
Clazz.defineMethod(c$,"getReturnCode",
function(){
return this.returnCode;
});
Clazz.defineMethod(c$,"getShell",
function(){
return this.shell;
});
Clazz.defineMethod(c$,"getShellListener",
function(){
return((Clazz.isClassDefined("org.eclipse.jface.window.Window$3")?0:org.eclipse.jface.window.Window.$Window$3$()),Clazz.innerTypeInstance(org.eclipse.jface.window.Window$3,this,null));
});
Clazz.defineMethod(c$,"getShellStyle",
function(){
return this.shellStyle;
});
Clazz.defineMethod(c$,"getWindowManager",
function(){
return this.windowManager;
});
Clazz.defineMethod(c$,"handleFontChange",
function(event){
},"org.eclipse.jface.util.PropertyChangeEvent");
Clazz.defineMethod(c$,"handleShellCloseEvent",
function(){
this.setReturnCode(1);
this.close();
});
Clazz.defineMethod(c$,"initializeBounds",
function(){
if(this.resizeListener!=null){
this.shell.removeListener(11,this.resizeListener);
}if(this.resizeHasOccurred){
return;
}var size=this.getInitialSize();
var location=this.getInitialLocation(size);
this.shell.setBounds(this.getConstrainedShellBounds(new $wt.graphics.Rectangle(location.x,location.y,size.x,size.y)));
});
Clazz.defineMethod(c$,"open",
function(){
if(this.shell==null||this.shell.isDisposed()){
this.shell=null;
this.create();
}this.constrainShellSize();
this.shell.open();
if(this.block)this.runEventLoop(this.shell);
return this.returnCode;
});
Clazz.defineMethod(c$,"runEventLoop",
($fz=function(loopShell){
var display;
if(this.shell==null)display=$wt.widgets.Display.getCurrent();
else display=loopShell.getDisplay();
while(loopShell!=null&&!loopShell.isDisposed()){
try{
if(!display.readAndDispatch())display.sleep();
}catch(e){
if(Clazz.instanceOf(e,Throwable)){
org.eclipse.jface.window.Window.exceptionHandler.handleException(e);
}else{
throw e;
}
}
}
display.update();
},$fz.isPrivate=true,$fz),"$wt.widgets.Shell");
Clazz.defineMethod(c$,"setBlockOnOpen",
function(shouldBlock){
this.block=shouldBlock;
},"~B");
c$.setDefaultImage=Clazz.defineMethod(c$,"setDefaultImage",
function(image){
($t$=org.eclipse.jface.window.Window.defaultImages=image==null?null:[image],org.eclipse.jface.window.Window.prototype.defaultImages=org.eclipse.jface.window.Window.defaultImages,$t$);
},"$wt.graphics.Image");
c$.setDefaultImages=Clazz.defineMethod(c$,"setDefaultImages",
function(images){
var newArray=new Array(images.length);
System.arraycopy(images,0,newArray,0,newArray.length);
($t$=org.eclipse.jface.window.Window.defaultImages=newArray,org.eclipse.jface.window.Window.prototype.defaultImages=org.eclipse.jface.window.Window.defaultImages,$t$);
},"~A");
Clazz.defineMethod(c$,"setParentShell",
function(newParentShell){
;
this.parentShell=new org.eclipse.jface.window.SameShellProvider(newParentShell);
},"$wt.widgets.Shell");
Clazz.defineMethod(c$,"setReturnCode",
function(code){
this.returnCode=code;
},"~N");
c$.getClosestMonitor=Clazz.defineMethod(c$,"getClosestMonitor",
($fz=function(toSearch,toFind){
var closest=2147483647;
var monitors=toSearch.getMonitors();
var result=monitors[0];
for(var idx=0;idx<monitors.length;idx++){
var current=monitors[idx];
var clientArea=current.getClientArea();
if(clientArea.contains(toFind)){
return current;
}var distance=org.eclipse.jface.util.Geometry.distanceSquared(org.eclipse.jface.util.Geometry.centerPoint(clientArea),toFind);
if(distance<closest){
closest=distance;
result=current;
}}
return result;
},$fz.isPrivate=true,$fz),"$wt.widgets.Display,$wt.graphics.Point");
Clazz.defineMethod(c$,"getConstrainedShellBounds",
function(preferredSize){
var result=new $wt.graphics.Rectangle(preferredSize.x,preferredSize.y,preferredSize.width,preferredSize.height);
var mon=org.eclipse.jface.window.Window.getClosestMonitor(this.getShell().getDisplay(),org.eclipse.jface.util.Geometry.centerPoint(result));
var bounds=mon.getClientArea();
if(result.height>bounds.height){
result.height=bounds.height;
}if(result.width>bounds.width){
result.width=bounds.width;
}result.x=Math.max(bounds.x,Math.min(result.x,bounds.x+bounds.width-result.width));
result.y=Math.max(bounds.y,Math.min(result.y,bounds.y+bounds.height-result.height));
return result;
},"$wt.graphics.Rectangle");
Clazz.defineMethod(c$,"setShellStyle",
function(newShellStyle){
this.shellStyle=newShellStyle;
},"~N");
Clazz.defineMethod(c$,"setWindowManager",
function(manager){
this.windowManager=manager;
if(manager!=null){
var windows=manager.getWindows();
for(var i=0;i<windows.length;i++){
if(windows[i]===this)return;
}
manager.add(this);
}},"org.eclipse.jface.window.WindowManager");
c$.setExceptionHandler=Clazz.defineMethod(c$,"setExceptionHandler",
function(handler){
if(Clazz.instanceOf(org.eclipse.jface.window.Window.exceptionHandler,org.eclipse.jface.window.Window.DefaultExceptionHandler))($t$=org.eclipse.jface.window.Window.exceptionHandler=handler,org.eclipse.jface.window.Window.prototype.exceptionHandler=org.eclipse.jface.window.Window.exceptionHandler,$t$);
},"org.eclipse.jface.window.Window.IExceptionHandler");
c$.setDefaultModalParent=Clazz.defineMethod(c$,"setDefaultModalParent",
function(provider){
($t$=org.eclipse.jface.window.Window.defaultModalParent=provider,org.eclipse.jface.window.Window.prototype.defaultModalParent=org.eclipse.jface.window.Window.defaultModalParent,$t$);
},"org.eclipse.jface.window.IShellProvider");
c$.getDefaultOrientation=Clazz.defineMethod(c$,"getDefaultOrientation",
function(){
return org.eclipse.jface.window.Window.orientation;
});
c$.setDefaultOrientation=Clazz.defineMethod(c$,"setDefaultOrientation",
function(defaultOrientation){
($t$=org.eclipse.jface.window.Window.orientation=defaultOrientation,org.eclipse.jface.window.Window.prototype.orientation=org.eclipse.jface.window.Window.orientation,$t$);
},"~N");
c$.$Window$FontChangeListener$=function(){
Clazz.pu$h();
c$=Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this,arguments);
Clazz.instantialize(this,arguments);
},org.eclipse.jface.window.Window,"FontChangeListener",null,org.eclipse.jface.util.IPropertyChangeListener);
Clazz.overrideMethod(c$,"propertyChange",
function(a){
this.b$["org.eclipse.jface.window.Window"].handleFontChange(a);
},"org.eclipse.jface.util.PropertyChangeEvent");
c$=Clazz.p0p();
};
c$.$Window$2$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.window,"Window$2",null,$wt.widgets.Listener);
Clazz.overrideMethod(c$,"handleEvent",
function(e){
this.b$["org.eclipse.jface.window.Window"].resizeHasOccurred=true;
},"$wt.widgets.Event");
c$=Clazz.p0p();
};
c$.$Window$3$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.window,"Window$3",$wt.events.ShellAdapter);
Clazz.overrideMethod(c$,"shellClosed",
function(event){
event.doit=false;
if(this.b$["org.eclipse.jface.window.Window"].canHandleShellCloseEvent())this.b$["org.eclipse.jface.window.Window"].handleShellCloseEvent();
},"$wt.events.ShellEvent");
c$=Clazz.p0p();
};
c$.$Window$1$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.window,"Window$1",null,org.eclipse.jface.window.IShellProvider);
Clazz.defineMethod(c$,"getShell",
function(){
var d=$wt.widgets.Display.getCurrent();
if(d==null){
return null;
}var parent=d.getActiveShell();
if(parent==null){
parent=org.eclipse.jface.window.Window.getModalChild($wt.widgets.Display.getCurrent().getShells());
}else{
var modalChild=org.eclipse.jface.window.Window.getModalChild(parent.getShells());
if(modalChild!=null){
parent=modalChild;
}}return parent;
});
c$=Clazz.p0p();
};
Clazz.declareInterface(org.eclipse.jface.window.Window,"IExceptionHandler");
Clazz.pu$h();
c$=Clazz.declareType(org.eclipse.jface.window.Window,"DefaultExceptionHandler",null,org.eclipse.jface.window.Window.IExceptionHandler);
Clazz.overrideMethod(c$,"handleException",
function(a){
if(Clazz.instanceOf(a,ThreadDeath))throw a;
a.printStackTrace();
},"Throwable");
c$=Clazz.p0p();
Clazz.defineStatics(c$,
"OK",0,
"CANCEL",1,
"defaultImages",null);
c$.exceptionHandler=c$.prototype.exceptionHandler=new org.eclipse.jface.window.Window.DefaultExceptionHandler();
Clazz.defineStatics(c$,
"orientation",0);
c$.defaultModalParent=c$.prototype.defaultModalParent=((Clazz.isClassDefined("org.eclipse.jface.window.Window$1")?0:org.eclipse.jface.window.Window.$Window$1$()),Clazz.innerTypeInstance(org.eclipse.jface.window.Window$1,this,null));
});
