/* http://j2s.sf.net/ */Clazz.declarePackage("org.eclipse.jface.util");
Clazz.load(null,"org.eclipse.jface.util.Geometry",["$wt.graphics.Point","$.Rectangle"],function(){
c$=Clazz.declareType(org.eclipse.jface.util,"Geometry");
c$.distanceSquared=Clazz.defineMethod(c$,"distanceSquared",
function(p1,p2){
var term1=p1.x-p2.x;
var term2=p1.y-p2.y;
return term1*term1+term2*term2;
},"$wt.graphics.Point,$wt.graphics.Point");
c$.magnitude=Clazz.defineMethod(c$,"magnitude",
function(p){
return Math.sqrt(org.eclipse.jface.util.Geometry.magnitudeSquared(p));
},"$wt.graphics.Point");
c$.magnitudeSquared=Clazz.defineMethod(c$,"magnitudeSquared",
function(p){
return p.x*p.x+p.y*p.y;
},"$wt.graphics.Point");
c$.dotProduct=Clazz.defineMethod(c$,"dotProduct",
function(p1,p2){
return p1.x*p2.x+p1.y*p2.y;
},"$wt.graphics.Point,$wt.graphics.Point");
c$.min=Clazz.defineMethod(c$,"min",
function(p1,p2){
return new $wt.graphics.Point(Math.min(p1.x,p2.x),Math.min(p1.y,p2.y));
},"$wt.graphics.Point,$wt.graphics.Point");
c$.max=Clazz.defineMethod(c$,"max",
function(p1,p2){
return new $wt.graphics.Point(Math.max(p1.x,p2.x),Math.max(p1.y,p2.y));
},"$wt.graphics.Point,$wt.graphics.Point");
c$.getDirectionVector=Clazz.defineMethod(c$,"getDirectionVector",
function(distance,direction){
switch(direction){
case 128:
return new $wt.graphics.Point(0,-distance);
case 1024:
return new $wt.graphics.Point(0,distance);
case 16384:
return new $wt.graphics.Point(-distance,0);
case 131072:
return new $wt.graphics.Point(distance,0);
}
return new $wt.graphics.Point(0,0);
},"~N,~N");
c$.centerPoint=Clazz.defineMethod(c$,"centerPoint",
function(rect){
return new $wt.graphics.Point(rect.x+Math.floor(rect.width/ 2), rect.y + Math.floor (rect.height /2));
},"$wt.graphics.Rectangle");
c$.copy=Clazz.defineMethod(c$,"copy",
function(toCopy){
return new $wt.graphics.Point(toCopy.x,toCopy.y);
},"$wt.graphics.Point");
c$.set=Clazz.defineMethod(c$,"set",
function(result,toCopy){
result.x=toCopy.x;
result.y=toCopy.y;
},"$wt.graphics.Point,$wt.graphics.Point");
c$.set=Clazz.defineMethod(c$,"set",
function(result,toCopy){
result.x=toCopy.x;
result.y=toCopy.y;
result.width=toCopy.width;
result.height=toCopy.height;
},"$wt.graphics.Rectangle,$wt.graphics.Rectangle");
c$.add=Clazz.defineMethod(c$,"add",
function(point1,point2){
return new $wt.graphics.Point(point1.x+point2.x,point1.y+point2.y);
},"$wt.graphics.Point,$wt.graphics.Point");
c$.divide=Clazz.defineMethod(c$,"divide",
function(toDivide,scalar){
return new $wt.graphics.Point(Math.floor(toDivide.x/ scalar), Math.floor (toDivide.y /scalar));
},"$wt.graphics.Point,~N");
c$.subtract=Clazz.defineMethod(c$,"subtract",
function(point1,point2){
return new $wt.graphics.Point(point1.x-point2.x,point1.y-point2.y);
},"$wt.graphics.Point,$wt.graphics.Point");
c$.flipXY=Clazz.defineMethod(c$,"flipXY",
function(toFlip){
var temp=toFlip.x;
toFlip.x=toFlip.y;
toFlip.y=temp;
},"$wt.graphics.Point");
c$.flipXY=Clazz.defineMethod(c$,"flipXY",
function(toFlip){
var temp=toFlip.x;
toFlip.x=toFlip.y;
toFlip.y=temp;
temp=toFlip.width;
toFlip.width=toFlip.height;
toFlip.height=temp;
},"$wt.graphics.Rectangle");
c$.getDimension=Clazz.defineMethod(c$,"getDimension",
function(toMeasure,width){
if(width){
return toMeasure.width;
}else{
return toMeasure.height;
}},"$wt.graphics.Rectangle,~B");
c$.getCoordinate=Clazz.defineMethod(c$,"getCoordinate",
function(toMeasure,width){
return width?toMeasure.x:toMeasure.y;
},"$wt.graphics.Point,~B");
c$.getCoordinate=Clazz.defineMethod(c$,"getCoordinate",
function(toMeasure,width){
return width?toMeasure.x:toMeasure.y;
},"$wt.graphics.Rectangle,~B");
c$.setDimension=Clazz.defineMethod(c$,"setDimension",
function(toSet,width,newCoordinate){
if(width){
toSet.width=newCoordinate;
}else{
toSet.height=newCoordinate;
}},"$wt.graphics.Rectangle,~B,~N");
c$.setCoordinate=Clazz.defineMethod(c$,"setCoordinate",
function(toSet,width,newCoordinate){
if(width){
toSet.x=newCoordinate;
}else{
toSet.y=newCoordinate;
}},"$wt.graphics.Rectangle,~B,~N");
c$.setCoordinate=Clazz.defineMethod(c$,"setCoordinate",
function(toSet,width,newCoordinate){
if(width){
toSet.x=newCoordinate;
}else{
toSet.y=newCoordinate;
}},"$wt.graphics.Point,~B,~N");
c$.getDistanceFromEdge=Clazz.defineMethod(c$,"getDistanceFromEdge",
function(rectangle,testPoint,edgeOfInterest){
switch(edgeOfInterest){
case 128:
return testPoint.y-rectangle.y;
case 1024:
return rectangle.y+rectangle.height-testPoint.y;
case 16384:
return testPoint.x-rectangle.x;
case 131072:
return rectangle.x+rectangle.width-testPoint.x;
}
return 0;
},"$wt.graphics.Rectangle,$wt.graphics.Point,~N");
c$.getExtrudedEdge=Clazz.defineMethod(c$,"getExtrudedEdge",
function(toExtrude,size,orientation){
var bounds=new $wt.graphics.Rectangle(toExtrude.x,toExtrude.y,toExtrude.width,toExtrude.height);
if(!org.eclipse.jface.util.Geometry.isHorizontal(orientation)){
bounds.width=size;
}else{
bounds.height=size;
}switch(orientation){
case 131072:
bounds.x=toExtrude.x+toExtrude.width-bounds.width;
break;
case 1024:
bounds.y=toExtrude.y+toExtrude.height-bounds.height;
break;
}
org.eclipse.jface.util.Geometry.normalize(bounds);
return bounds;
},"$wt.graphics.Rectangle,~N,~N");
c$.getOppositeSide=Clazz.defineMethod(c$,"getOppositeSide",
function(swtDirectionConstant){
switch(swtDirectionConstant){
case 128:
return 1024;
case 1024:
return 128;
case 16384:
return 131072;
case 131072:
return 16384;
}
return swtDirectionConstant;
},"~N");
c$.getSwtHorizontalOrVerticalConstant=Clazz.defineMethod(c$,"getSwtHorizontalOrVerticalConstant",
function(horizontal){
if(horizontal){
return 256;
}else{
return 512;
}},"~B");
c$.isHorizontal=Clazz.defineMethod(c$,"isHorizontal",
function(swtSideConstant){
return!(swtSideConstant==16384||swtSideConstant==131072);
},"~N");
c$.moveRectangle=Clazz.defineMethod(c$,"moveRectangle",
function(rect,delta){
rect.x+=delta.x;
rect.y+=delta.y;
},"$wt.graphics.Rectangle,$wt.graphics.Point");
c$.expand=Clazz.defineMethod(c$,"expand",
function(rect,left,right,top,bottom){
rect.x-=left;
rect.width=Math.max(0,rect.width+left+right);
rect.y-=top;
rect.height=Math.max(0,rect.height+top+bottom);
},"$wt.graphics.Rectangle,~N,~N,~N,~N");
c$.normalize=Clazz.defineMethod(c$,"normalize",
function(rect){
if(rect.width<0){
rect.width=-rect.width;
rect.x-=rect.width;
}if(rect.height<0){
rect.height=-rect.height;
rect.y-=rect.height;
}},"$wt.graphics.Rectangle");
c$.toControl=Clazz.defineMethod(c$,"toControl",
function(coordinateSystem,toConvert){
return(coordinateSystem.getDisplay().map(null,coordinateSystem,toConvert));
},"$wt.widgets.Control,$wt.graphics.Rectangle");
c$.toDisplay=Clazz.defineMethod(c$,"toDisplay",
function(coordinateSystem,toConvert){
return(coordinateSystem.getDisplay().map(coordinateSystem,null,toConvert));
},"$wt.widgets.Control,$wt.graphics.Rectangle");
c$.getRelativePosition=Clazz.defineMethod(c$,"getRelativePosition",
function(boundary,toTest){
var result=0;
if(toTest.x<boundary.x){
result|=16384;
}else if(toTest.x>=boundary.x+boundary.width){
result|=131072;
}if(toTest.y<boundary.y){
result|=128;
}else if(toTest.y>=boundary.y+boundary.height){
result|=1024;
}return result;
},"$wt.graphics.Rectangle,$wt.graphics.Point");
c$.getDistanceFrom=Clazz.defineMethod(c$,"getDistanceFrom",
function(boundary,toTest){
var side=org.eclipse.jface.util.Geometry.getClosestSide(boundary,toTest);
return org.eclipse.jface.util.Geometry.getDistanceFromEdge(boundary,toTest,side);
},"$wt.graphics.Rectangle,$wt.graphics.Point");
c$.getClosestSide=Clazz.defineMethod(c$,"getClosestSide",
function(boundary,toTest){
var sides=[16384,131072,128,1024];
var closestSide=16384;
var closestDistance=2147483647;
for(var idx=0;idx<sides.length;idx++){
var side=sides[idx];
var distance=org.eclipse.jface.util.Geometry.getDistanceFromEdge(boundary,toTest,side);
if(distance<closestDistance){
closestDistance=distance;
closestSide=side;
}}
return closestSide;
},"$wt.graphics.Rectangle,$wt.graphics.Point");
c$.copy=Clazz.defineMethod(c$,"copy",
function(toCopy){
return new $wt.graphics.Rectangle(toCopy.x,toCopy.y,toCopy.width,toCopy.height);
},"$wt.graphics.Rectangle");
c$.getSize=Clazz.defineMethod(c$,"getSize",
function(rectangle){
return new $wt.graphics.Point(rectangle.width,rectangle.height);
},"$wt.graphics.Rectangle");
c$.setSize=Clazz.defineMethod(c$,"setSize",
function(rectangle,newSize){
rectangle.width=newSize.x;
rectangle.height=newSize.y;
},"$wt.graphics.Rectangle,$wt.graphics.Point");
c$.setLocation=Clazz.defineMethod(c$,"setLocation",
function(rectangle,newSize){
rectangle.width=newSize.x;
rectangle.height=newSize.y;
},"$wt.graphics.Rectangle,$wt.graphics.Point");
c$.getLocation=Clazz.defineMethod(c$,"getLocation",
function(toQuery){
return new $wt.graphics.Point(toQuery.x,toQuery.y);
},"$wt.graphics.Rectangle");
c$.createRectangle=Clazz.defineMethod(c$,"createRectangle",
function(position,size){
return new $wt.graphics.Rectangle(position.x,position.y,size.x,size.y);
},"$wt.graphics.Point,$wt.graphics.Point");
});
Clazz.declarePackage("org.eclipse.jface.util");
Clazz.declareInterface(org.eclipse.jface.util,"ILogger");
Clazz.declarePackage("org.eclipse.jface.util");
Clazz.declareInterface(org.eclipse.jface.util,"IOpenEventListener");
Clazz.declarePackage("org.eclipse.jface.util");
Clazz.load(["java.util.EventListener"],"org.eclipse.jface.util.IPropertyChangeListener",null,function(){
Clazz.declareInterface(org.eclipse.jface.util,"IPropertyChangeListener",java.util.EventListener);
});
Clazz.declarePackage("org.eclipse.jface.util");
Clazz.declareInterface(org.eclipse.jface.util,"ISafeRunnableRunner");
Clazz.declarePackage("org.eclipse.jface.util");
c$=Clazz.decorateAsClass(function(){
this.capacity=0;
this.$size=0;
this.listeners=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.util,"ListenerList");
Clazz.makeConstructor(c$,
function(){
this.construct(1);
});
Clazz.makeConstructor(c$,
function(capacity){
;
this.capacity=capacity;
},"~N");
Clazz.defineMethod(c$,"add",
function(listener){
;
if(this.$size==0){
this.listeners=new Array(this.capacity);
}else{
for(var i=0;i<this.$size;++i){
if(this.listeners[i]===listener){
return;
}}
if(this.$size==this.listeners.length){
System.arraycopy(this.listeners,0,this.listeners=new Array(this.$size*2+1),0,this.$size);
}}this.listeners[this.$size]=listener;
this.$size++;
},"~O");
Clazz.defineMethod(c$,"clear",
function(){
this.$size=0;
this.listeners=null;
});
Clazz.defineMethod(c$,"getListeners",
function(){
if(this.$size==0)return org.eclipse.jface.util.ListenerList.EmptyArray;
var result=new Array(this.$size);
System.arraycopy(this.listeners,0,result,0,this.$size);
return result;
});
Clazz.defineMethod(c$,"isEmpty",
function(){
return this.$size==0;
});
Clazz.defineMethod(c$,"remove",
function(listener){
;
for(var i=0;i<this.$size;++i){
if(this.listeners[i]===listener){
if(this.$size==1){
this.listeners=null;
this.$size=0;
}else{
System.arraycopy(this.listeners,i+1,this.listeners,i,--this.$size-i);
this.listeners[this.$size]=null;
}return;
}}
},"~O");
Clazz.defineMethod(c$,"size",
function(){
return this.$size;
});
c$.EmptyArray=c$.prototype.EmptyArray=new Array(0);
Clazz.declarePackage("org.eclipse.jface.util");
Clazz.load(["org.eclipse.jface.util.ListenerList"],"org.eclipse.jface.util.OpenStrategy",["java.lang.IllegalArgumentException","$wt.events.SelectionEvent","$wt.graphics.Point","$wt.widgets.Listener"],function(){
c$=Clazz.decorateAsClass(function(){
this.eventHandler=null;
this.openEventListeners=null;
this.selectionEventListeners=null;
this.postSelectionEventListeners=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.util,"OpenStrategy");
Clazz.prepareFields(c$,function(){
this.openEventListeners=new org.eclipse.jface.util.ListenerList(1);
this.selectionEventListeners=new org.eclipse.jface.util.ListenerList(1);
this.postSelectionEventListeners=new org.eclipse.jface.util.ListenerList(1);
});
Clazz.makeConstructor(c$,
function(control){
this.initializeHandler(control.getDisplay());
this.addListener(control);
},"$wt.widgets.Control");
Clazz.defineMethod(c$,"addOpenListener",
function(listener){
this.openEventListeners.add(listener);
},"org.eclipse.jface.util.IOpenEventListener");
Clazz.defineMethod(c$,"removeOpenListener",
function(listener){
this.openEventListeners.remove(listener);
},"org.eclipse.jface.util.IOpenEventListener");
Clazz.defineMethod(c$,"addSelectionListener",
function(listener){
this.selectionEventListeners.add(listener);
},"$wt.events.SelectionListener");
Clazz.defineMethod(c$,"removeSelectionListener",
function(listener){
this.selectionEventListeners.remove(listener);
},"$wt.events.SelectionListener");
Clazz.defineMethod(c$,"addPostSelectionListener",
function(listener){
this.postSelectionEventListeners.add(listener);
},"$wt.events.SelectionListener");
Clazz.defineMethod(c$,"removePostSelectionListener",
function(listener){
this.postSelectionEventListeners.remove(listener);
},"$wt.events.SelectionListener");
c$.getOpenMethod=Clazz.defineMethod(c$,"getOpenMethod",
function(){
return org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD;
});
c$.setOpenMethod=Clazz.defineMethod(c$,"setOpenMethod",
function(method){
if(method==0){
($t$=org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD=method,org.eclipse.jface.util.OpenStrategy.prototype.CURRENT_METHOD=org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD,$t$);
return;
}if((method&1)==0)throw new IllegalArgumentException("Invalid open mode");
if((method&(7))==0)throw new IllegalArgumentException("Invalid open mode");
($t$=org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD=method,org.eclipse.jface.util.OpenStrategy.prototype.CURRENT_METHOD=org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD,$t$);
},"~N");
c$.activateOnOpen=Clazz.defineMethod(c$,"activateOnOpen",
function(){
return org.eclipse.jface.util.OpenStrategy.getOpenMethod()==0;
});
Clazz.defineMethod(c$,"addListener",
($fz=function(c){
c.addListener(6,this.eventHandler);
c.addListener(7,this.eventHandler);
c.addListener(5,this.eventHandler);
c.addListener(3,this.eventHandler);
c.addListener(4,this.eventHandler);
c.addListener(1,this.eventHandler);
c.addListener(13,this.eventHandler);
c.addListener(14,this.eventHandler);
c.addListener(18,this.eventHandler);
c.addListener(17,this.eventHandler);
},$fz.isPrivate=true,$fz),"$wt.widgets.Control");
Clazz.defineMethod(c$,"fireSelectionEvent",
($fz=function(e){
if(e.item!=null&&e.item.isDisposed())return;
var l=this.selectionEventListeners.getListeners();
for(var i=0;i<l.length;i++){
(l[i]).widgetSelected(e);
}
},$fz.isPrivate=true,$fz),"$wt.events.SelectionEvent");
Clazz.defineMethod(c$,"fireDefaultSelectionEvent",
($fz=function(e){
var l=this.selectionEventListeners.getListeners();
for(var i=0;i<l.length;i++){
(l[i]).widgetDefaultSelected(e);
}
},$fz.isPrivate=true,$fz),"$wt.events.SelectionEvent");
Clazz.defineMethod(c$,"firePostSelectionEvent",
($fz=function(e){
if(e.item!=null&&e.item.isDisposed())return;
var l=this.postSelectionEventListeners.getListeners();
for(var i=0;i<l.length;i++){
(l[i]).widgetSelected(e);
}
},$fz.isPrivate=true,$fz),"$wt.events.SelectionEvent");
Clazz.defineMethod(c$,"fireOpenEvent",
($fz=function(e){
if(e.item!=null&&e.item.isDisposed())return;
var l=this.openEventListeners.getListeners();
for(var i=0;i<l.length;i++){
(l[i]).handleOpen(e);
}
},$fz.isPrivate=true,$fz),"$wt.events.SelectionEvent");
Clazz.defineMethod(c$,"initializeHandler",
($fz=function(display){
this.eventHandler=((Clazz.isClassDefined("org.eclipse.jface.util.OpenStrategy$1")?0:org.eclipse.jface.util.OpenStrategy.$OpenStrategy$1$()),Clazz.innerTypeInstance(org.eclipse.jface.util.OpenStrategy$1,this,Clazz.cloneFinals("display",display)));
},$fz.isPrivate=true,$fz),"$wt.widgets.Display");
c$.$OpenStrategy$1$=function(){
Clazz.pu$h();
c$=Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this,arguments);
this.timerStarted=false;
this.mouseUpEvent=null;
this.mouseMoveEvent=null;
this.selectionPendent=null;
this.enterKeyDown=false;
this.defaultSelectionPendent=null;
this.arrowKeyDown=false;
this.count=null;
this.startTime=0;
this.collapseOccurred=false;
this.expandOccurred=false;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.util,"OpenStrategy$1",null,$wt.widgets.Listener);
Clazz.prepareFields(c$,function(){
this.count=Clazz.newArray(1,0);
this.startTime=System.currentTimeMillis();
});
Clazz.overrideMethod(c$,"handleEvent",
function(e){
if(e.type==14){
var event=new $wt.events.SelectionEvent(e);
this.b$["org.eclipse.jface.util.OpenStrategy"].fireDefaultSelectionEvent(event);
if(org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD==0){
this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent(event);
}else{
if(this.enterKeyDown){
this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent(event);
this.enterKeyDown=false;
this.defaultSelectionPendent=null;
}else{
this.defaultSelectionPendent=event;
}}return;
}switch(e.type){
case 6:
case 7:
this.mouseUpEvent=null;
this.mouseMoveEvent=null;
this.selectionPendent=null;
break;
case 5:
if((org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD&2)==0)return;
if(e.stateMask!=0)return;
if(e.widget.getDisplay().getFocusControl()!==e.widget)return;
this.mouseMoveEvent=e;
var runnable=new Array(1);
runnable[0]=((Clazz.isClassDefined("org.eclipse.jface.util.OpenStrategy$1$1")?0:org.eclipse.jface.util.OpenStrategy.$OpenStrategy$1$1$()),Clazz.innerTypeInstance(org.eclipse.jface.util.OpenStrategy$1$1,this,Clazz.cloneFinals("display",this.f$.display,"runnable",runnable)));
this.startTime=System.currentTimeMillis();
if(!this.timerStarted){
this.timerStarted=true;
this.f$.display.timerExec(333,runnable[0]);
}break;
case 3:
this.mouseUpEvent=null;
this.arrowKeyDown=false;
break;
case 17:
this.expandOccurred=true;
break;
case 18:
this.collapseOccurred=true;
break;
case 4:
this.mouseMoveEvent=null;
if((e.button!=1)||((e.stateMask&-524289)!=0))return;
if(this.selectionPendent!=null&&!(this.collapseOccurred||this.expandOccurred)){
this.mouseSelectItem(this.selectionPendent);
}else{
this.mouseUpEvent=e;
this.collapseOccurred=false;
this.expandOccurred=false;
}break;
case 1:
this.mouseMoveEvent=null;
this.mouseUpEvent=null;
this.arrowKeyDown=((e.keyCode==16777217)||(e.keyCode==16777218))&&e.stateMask==0;
if((e.character).charCodeAt(0)==('\u000d').charCodeAt(0)){
if(this.defaultSelectionPendent!=null){
this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent(new $wt.events.SelectionEvent(e));
this.enterKeyDown=false;
this.defaultSelectionPendent=null;
}else{
this.enterKeyDown=true;
}}break;
case 13:
var event=new $wt.events.SelectionEvent(e);
this.b$["org.eclipse.jface.util.OpenStrategy"].fireSelectionEvent(event);
this.mouseMoveEvent=null;
if(this.mouseUpEvent!=null)this.mouseSelectItem(event);
else this.selectionPendent=event;
this.count[0]++;
this.f$.display.asyncExec(((Clazz.isClassDefined("org.eclipse.jface.util.OpenStrategy$1$2")?0:org.eclipse.jface.util.OpenStrategy.$OpenStrategy$1$2$()),Clazz.innerTypeInstance(org.eclipse.jface.util.OpenStrategy$1$2,this,Clazz.cloneFinals("display",this.f$.display,"e",e))));
break;
}
},"$wt.widgets.Event");
Clazz.defineMethod(c$,"mouseSelectItem",
function(e){
if((org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD&1)!=0)this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent(e);
this.mouseUpEvent=null;
this.selectionPendent=null;
},"$wt.events.SelectionEvent");
Clazz.defineMethod(c$,"setSelection",
function(e){
if(e==null)return;
var w=e.widget;
if(w.isDisposed())return;
var selEvent=new $wt.events.SelectionEvent(e);
if(Clazz.instanceOf(w,$wt.widgets.Tree)){
var tree=w;
var item=tree.getItem(new $wt.graphics.Point(e.x,e.y));
if(item!=null)tree.setSelection([item]);
selEvent.item=item;
}else if(Clazz.instanceOf(w,$wt.widgets.Table)){
var table=w;
var item=table.getItem(new $wt.graphics.Point(e.x,e.y));
if(item!=null)table.setSelection([item]);
selEvent.item=item;
}else if(Clazz.instanceOf(w,$wt.custom.TableTree)){
var table=w;
var item=table.getItem(new $wt.graphics.Point(e.x,e.y));
if(item!=null)table.setSelection([item]);
selEvent.item=item;
}else{
return;
}if(selEvent.item==null)return;
this.b$["org.eclipse.jface.util.OpenStrategy"].fireSelectionEvent(selEvent);
this.b$["org.eclipse.jface.util.OpenStrategy"].firePostSelectionEvent(selEvent);
},"$wt.widgets.Event");
c$=Clazz.p0p();
};
c$.$OpenStrategy$1$1$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.util,"OpenStrategy$1$1",null,Runnable);
Clazz.overrideMethod(c$,"run",
function(){
var time=System.currentTimeMillis();
var diff=(time-this.b$["org.eclipse.jface.util.OpenStrategy$1"].startTime);
if(diff<=500){
this.f$.display.timerExec(Math.floor(diff*2/3),this.f$.runnable[0]);
}else{
this.b$["org.eclipse.jface.util.OpenStrategy$1"].timerStarted=false;
this.b$["org.eclipse.jface.util.OpenStrategy$1"].setSelection(this.b$["org.eclipse.jface.util.OpenStrategy$1"].mouseMoveEvent);
}});
c$=Clazz.p0p();
};
c$.$OpenStrategy$1$2$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.util,"OpenStrategy$1$2",null,Runnable);
Clazz.overrideMethod(c$,"run",
function(){
if(this.b$["org.eclipse.jface.util.OpenStrategy$1"].arrowKeyDown){
this.f$.display.timerExec(500,((Clazz.isClassDefined("org.eclipse.jface.util.OpenStrategy$1$2$1")?0:org.eclipse.jface.util.OpenStrategy.$OpenStrategy$1$2$1$()),Clazz.innerTypeInstance(org.eclipse.jface.util.OpenStrategy$1$2$1,this,Clazz.cloneFinals("e",this.f$.e))));
}else{
this.b$["org.eclipse.jface.util.OpenStrategy"].firePostSelectionEvent(new $wt.events.SelectionEvent(this.f$.e));
}});
c$=Clazz.p0p();
};
c$.$OpenStrategy$1$2$1$=function(){
Clazz.pu$h();
c$=Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this,arguments);
this.id=0;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.util,"OpenStrategy$1$2$1",null,Runnable);
Clazz.prepareFields(c$,function(){
this.id=this.b$["org.eclipse.jface.util.OpenStrategy$1"].count[0];
});
Clazz.overrideMethod(c$,"run",
function(){
if(this.id==this.b$["org.eclipse.jface.util.OpenStrategy$1"].count[0]){
this.b$["org.eclipse.jface.util.OpenStrategy"].firePostSelectionEvent(new $wt.events.SelectionEvent(this.f$.e));
if((org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD&4)!=0)this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent(new $wt.events.SelectionEvent(this.f$.e));
}});
c$=Clazz.p0p();
};
Clazz.defineStatics(c$,
"DOUBLE_CLICK",0,
"SINGLE_CLICK",1,
"SELECT_ON_HOVER",2,
"ARROW_KEYS_OPEN",4,
"NO_TIMER",1,
"FILE_EXPLORER",5,
"ACTIVE_DESKTOP",3,
"TIME",500,
"CURRENT_METHOD",0);
});
Clazz.declarePackage("org.eclipse.jface.util");
Clazz.load(null,"org.eclipse.jface.util.Policy",["org.eclipse.jface.util.ILogger"],function(){
c$=Clazz.declareType(org.eclipse.jface.util,"Policy");
c$.getDummyLog=Clazz.defineMethod(c$,"getDummyLog",
($fz=function(){
return((Clazz.isClassDefined("org.eclipse.jface.util.Policy$1")?0:org.eclipse.jface.util.Policy.$Policy$1$()),Clazz.innerTypeInstance(org.eclipse.jface.util.Policy$1,this,null));
},$fz.isPrivate=true,$fz));
c$.setLog=Clazz.defineMethod(c$,"setLog",
function(logger){
($t$=org.eclipse.jface.util.Policy.log=logger,org.eclipse.jface.util.Policy.prototype.log=org.eclipse.jface.util.Policy.log,$t$);
},"org.eclipse.jface.util.ILogger");
c$.getLog=Clazz.defineMethod(c$,"getLog",
function(){
if(org.eclipse.jface.util.Policy.log==null)($t$=org.eclipse.jface.util.Policy.log=org.eclipse.jface.util.Policy.getDummyLog(),org.eclipse.jface.util.Policy.prototype.log=org.eclipse.jface.util.Policy.log,$t$);
return org.eclipse.jface.util.Policy.log;
});
c$.$Policy$1$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.util,"Policy$1",null,org.eclipse.jface.util.ILogger);
Clazz.overrideMethod(c$,"log",
function(status){
System.err.println(status.getMessage());
},"org.eclipse.core.runtime.IStatus");
c$=Clazz.p0p();
};
Clazz.defineStatics(c$,
"DEFAULT",false,
"JFACE","org.eclipse.jface",
"log",null,
"DEBUG_DIALOG_NO_PARENT",false,
"TRACE_ACTIONS",false,
"TRACE_TOOLBAR",false);
});
Clazz.declarePackage("org.eclipse.jface.util");
Clazz.load(["java.util.EventObject"],"org.eclipse.jface.util.PropertyChangeEvent",null,function(){
c$=Clazz.decorateAsClass(function(){
this.propertyName=null;
this.oldValue=null;
this.newValue=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.util,"PropertyChangeEvent",java.util.EventObject);
Clazz.makeConstructor(c$,
function(source,property,oldValue,newValue){
Clazz.superConstructor(this,org.eclipse.jface.util.PropertyChangeEvent,[source]);
;
this.propertyName=property;
this.oldValue=oldValue;
this.newValue=newValue;
},"~O,~S,~O,~O");
Clazz.defineMethod(c$,"getNewValue",
function(){
return this.newValue;
});
Clazz.defineMethod(c$,"getOldValue",
function(){
return this.oldValue;
});
Clazz.defineMethod(c$,"getProperty",
function(){
return this.propertyName;
});
});
Clazz.declarePackage("org.eclipse.jface.util");
Clazz.load(["org.eclipse.core.runtime.ISafeRunnable"],"org.eclipse.jface.util.SafeRunnable",["org.eclipse.jface.dialogs.MessageDialog","org.eclipse.jface.resource.JFaceResources","org.eclipse.jface.util.ISafeRunnableRunner"],function(){
c$=Clazz.decorateAsClass(function(){
this.message=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.util,"SafeRunnable",null,org.eclipse.core.runtime.ISafeRunnable);
Clazz.makeConstructor(c$,
function(){
});
Clazz.makeConstructor(c$,
function(message){
this.message=message;
},"~S");
Clazz.defineMethod(c$,"handleException",
function(e){
if(!org.eclipse.jface.util.SafeRunnable.ignoreErrors){
if(this.message==null)this.message=org.eclipse.jface.resource.JFaceResources.getString("SafeRunnable.errorMessage");
org.eclipse.jface.dialogs.MessageDialog.openError(null,org.eclipse.jface.resource.JFaceResources.getString("Error"),this.message);
}},"Throwable");
c$.getIgnoreErrors=Clazz.defineMethod(c$,"getIgnoreErrors",
function(flag){
return org.eclipse.jface.util.SafeRunnable.ignoreErrors;
},"~B");
c$.getIgnoreErrors=Clazz.defineMethod(c$,"getIgnoreErrors",
function(){
return org.eclipse.jface.util.SafeRunnable.ignoreErrors;
});
c$.setIgnoreErrors=Clazz.defineMethod(c$,"setIgnoreErrors",
function(flag){
($t$=org.eclipse.jface.util.SafeRunnable.ignoreErrors=flag,org.eclipse.jface.util.SafeRunnable.prototype.ignoreErrors=org.eclipse.jface.util.SafeRunnable.ignoreErrors,$t$);
},"~B");
c$.getRunner=Clazz.defineMethod(c$,"getRunner",
function(){
if(org.eclipse.jface.util.SafeRunnable.runner==null){
($t$=org.eclipse.jface.util.SafeRunnable.runner=org.eclipse.jface.util.SafeRunnable.createDefaultRunner(),org.eclipse.jface.util.SafeRunnable.prototype.runner=org.eclipse.jface.util.SafeRunnable.runner,$t$);
}return org.eclipse.jface.util.SafeRunnable.runner;
});
c$.createDefaultRunner=Clazz.defineMethod(c$,"createDefaultRunner",
($fz=function(){
return((Clazz.isClassDefined("org.eclipse.jface.util.SafeRunnable$1")?0:org.eclipse.jface.util.SafeRunnable.$SafeRunnable$1$()),Clazz.innerTypeInstance(org.eclipse.jface.util.SafeRunnable$1,this,null));
},$fz.isPrivate=true,$fz));
c$.setRunner=Clazz.defineMethod(c$,"setRunner",
function(runner){
($t$=org.eclipse.jface.util.SafeRunnable.runner=runner,org.eclipse.jface.util.SafeRunnable.prototype.runner=org.eclipse.jface.util.SafeRunnable.runner,$t$);
},"org.eclipse.jface.util.ISafeRunnableRunner");
c$.run=Clazz.defineMethod(c$,"run",
function(runnable){
org.eclipse.jface.util.SafeRunnable.getRunner().run(runnable);
},"org.eclipse.core.runtime.ISafeRunnable");
c$.$SafeRunnable$1$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.util,"SafeRunnable$1",null,org.eclipse.jface.util.ISafeRunnableRunner);
Clazz.defineMethod(c$,"run",
function(code){
try{
code.run();
}catch(e$$){
if(Clazz.instanceOf(e$$,Exception)){
var e=e$$;
{
this.handleException(code,e);
}
}else if(Clazz.instanceOf(e$$,LinkageError)){
var e=e$$;
{
this.handleException(code,e);
}
}else{
throw e$$;
}
}
},"org.eclipse.core.runtime.ISafeRunnable");
Clazz.defineMethod(c$,"handleException",
($fz=function(code,e){
if(!(Clazz.instanceOf(e,org.eclipse.core.runtime.OperationCanceledException))){
e.printStackTrace();
}code.handleException(e);
},$fz.isPrivate=true,$fz),"org.eclipse.core.runtime.ISafeRunnable,Throwable");
c$=Clazz.p0p();
};
Clazz.defineStatics(c$,
"ignoreErrors",false,
"runner",null);
});
