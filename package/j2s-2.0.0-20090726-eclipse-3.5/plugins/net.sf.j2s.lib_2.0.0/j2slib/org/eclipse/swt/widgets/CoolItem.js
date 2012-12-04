$_L(["$wt.widgets.Item"],"$wt.widgets.CoolItem",["$wt.graphics.Point","$.Rectangle","$wt.internal.browser.OS","$wt.widgets.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.control=null;
this.id=0;
this.ideal=false;
this.minimum=false;
this.contentHandle=null;
this.moreHandle=null;
this.idealWidth=0;
this.idealHeight=0;
this.minimumWidth=0;
this.minimumHeight=0;
this.preferredWidth=0;
this.preferredHeight=0;
this.lastCachedWidth=0;
this.lastCachedHeight=0;
this.wrap=false;
$_Z(this,arguments);
},$wt.widgets,"CoolItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.CoolItem,[parent,style]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
},"$wt.widgets.CoolBar,~N");
$_K(c$,
function(parent,style,index){
$_R(this,$wt.widgets.CoolItem,[parent,style]);
this.parent=parent;
parent.createItem(this,index);
},"$wt.widgets.CoolBar,~N,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"computeSize",
function(wHint,hHint){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Point(0,0);
var width=wHint;
var height=hHint;
if(wHint==-1)width=32;
if(hHint==-1)height=32;
width+=this.parent.getMargin(index);
return new $wt.graphics.Point(width,height);
},"~N,~N");
$_M(c$,"getBounds",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Rectangle(0,0,0,0);
var size=this.getSize();
var pos=this.getPosition();
return new $wt.graphics.Rectangle(pos.x,pos.y,size.x,size.y);
});
$_M(c$,"getPosition",
function(){
var index=this.parent.indexOf(this);
var x=0;
var y=0;
var rowHeight=0;
for(var i=0;i<=index;i++){
if(i!=index){
x+=this.parent.items[i].lastCachedWidth;
}if(this.parent.items[i].wrap){
if(i!=index){
x=this.parent.items[i].lastCachedWidth;
}else{
x=0;
}y+=rowHeight+2;
rowHeight=0;
}if(this.parent.items[i].control==null){
rowHeight=Math.max(rowHeight,this.parent.items[i].lastCachedHeight-4);
}else{
rowHeight=Math.max(rowHeight,this.parent.items[i].lastCachedHeight);
}}
return new $wt.graphics.Point(x,y);
});
$_M(c$,"getClientArea",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Rectangle(0,0,0,0);
return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getControl",
function(){
return this.control;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.CoolItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.CoolItem,"releaseWidget",[]);
this.control=null;
this.parent=null;
});
$_M(c$,"setControl",
function(control){
if(control!=null){
}var index=this.parent.indexOf(this);
if(index==-1)return;
if(this.control!=null&&this.control.isDisposed()){
this.control=null;
}var oldControl=this.control;
var newControl=control;
this.control=newControl;
O$.clearChildren(this.contentHandle);
if(newControl!=null){
this.contentHandle.appendChild(newControl.handle);
}},"$wt.widgets.Control");
$_M(c$,"getPreferredSize",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Point(0,0);
if(this.preferredWidth!=0||this.preferredHeight!=0){
return new $wt.graphics.Point(this.preferredWidth,this.preferredHeight);
}else{
return new $wt.graphics.Point(this.parent.getMargin(index)+(this.minimum?this.minimumWidth+(this.minimumWidth!=0?2:0):0),(this.minimum?this.minimumHeight:0));
}});
$_M(c$,"setPreferredSize",
function(width,height){
var index=this.parent.indexOf(this);
if(index==-1)return;
width=Math.max(0,width);
height=Math.max(0,height);
this.ideal=true;
this.idealWidth=Math.max(0,width-9);
this.idealHeight=height;
this.preferredWidth=width;
this.preferredHeight=height;
},"~N,~N");
$_M(c$,"setPreferredSize",
function(size){
this.setPreferredSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setText",
function(string){
if((this.style&2)!=0)return;
$_U(this,$wt.widgets.CoolItem,"setText",[string]);
O$.clearChildren(this.contentHandle);
this.contentHandle.appendChild(d$.createTextNode(string));
},"~S");
$_M(c$,"getSize",
function(){
var index=this.parent.indexOf(this);
if(index==-1)new $wt.graphics.Point(0,0);
var width=0;
var height=0;
height=this.idealHeight;
if(this.ideal){
height=this.idealHeight;
if(this.control==null){
height=4;
}}else if(this.control!=null){
height=0;
}else{
height=4;
}if(!this.parent.isLastItemOfRow(this.parent.indexOf(this))){
if(this.minimumWidth!=0){
width=9+Math.max(this.idealWidth,this.minimumWidth+4)+2;
}else if(!this.ideal){
width=15;
}else{
width=9+this.idealWidth+2;
}}else{
width=this.parent.width-2*this.parent.getBorderWidth()-this.getPosition().x;
}this.lastCachedWidth=width;
this.lastCachedHeight=height;
return new $wt.graphics.Point(width,height);
});
$_M(c$,"setSize",
function(width,height){
var index=this.parent.indexOf(this);
if(index==-1)return;
width=Math.max(0,width);
height=Math.max(0,height);
if(!this.ideal)this.idealWidth=Math.max(0,width-this.parent.getMargin(index));
if(!this.minimum)this.idealHeight=height;
if(this.control!=null){
var location=this.control.getLocation();
this.control.setBounds(11,location.y,width-this.parent.getMargin(index),height);
}},"~N,~N");
$_M(c$,"setSize",
function(size){
this.setSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"getMinimumSize",
function(){
var index=this.parent.indexOf(this);
if(index==-1)return new $wt.graphics.Point(0,0);
if(this.minimum){
return new $wt.graphics.Point(this.minimumWidth,this.minimumHeight);
}else{
return new $wt.graphics.Point(0,0);
}});
$_M(c$,"setMinimumSize",
function(width,height){
var index=this.parent.indexOf(this);
if(index==-1)return;
width=Math.max(0,width);
height=Math.max(0,height);
this.minimum=true;
this.minimumWidth=width;
this.minimumHeight=height;
if(!this.ideal){
this.ideal=true;
this.idealWidth=width;
this.idealHeight=height;
}},"~N,~N");
$_M(c$,"setMinimumSize",
function(size){
this.setMinimumSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"getWrap",
function(){
return this.wrap;
});
$_M(c$,"setWrap",
function(wrap){
this.wrap=wrap;
},"~B");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
});
