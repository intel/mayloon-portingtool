$_L(["$wt.widgets.Item"],"$wt.widgets.TrayItem",["java.util.Date","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Event","$.TypedListener"],function(){
c$=$_C(function(){
this.parent=null;
this.id=0;
this.toolTipText=null;
this.visible=true;
this.$handle=null;
$_Z(this,arguments);
},$wt.widgets,"TrayItem",$wt.widgets.Item);
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.TrayItem,[parent,style]);
this.parent=parent;
parent.createItem(this,parent.getItemCount());
this.createWidget();
},"$wt.widgets.Tray,~N");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addMenuDetectListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(35,typedListener);
},"$wt.events.MenuDetectListener");
$_M(c$,"createWidget",
function(){
this.$handle=this.parent.addTrayItem();
this.$handle.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TrayItem$1")){
$_H();
c$=$_W($wt.widgets,"TrayItem$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.TrayItem"].postEvent(13);
if(this.b$["$wt.widgets.TrayItem"].display.trayCorner!=null){
this.b$["$wt.widgets.TrayItem"].display.trayCorner.bringToTop(-1);
}});
c$=$_P();
}
return $_N($wt.widgets.TrayItem$1,i$,v$);
})(this,null));
this.$handle.oncontextmenu=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TrayItem$2")){
$_H();
c$=$_W($wt.widgets,"TrayItem$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var ev=new $wt.widgets.Event();
ev.type=35;
ev.widget=this.b$["$wt.widgets.TrayItem"];
ev.display=this.b$["$wt.widgets.TrayItem"].display;
ev.time=this.b$["$wt.widgets.TrayItem"].display.getLastEventTime();
var evt=this.getEvent();
if(evt!=null){
var evtHTML=new $wt.internal.dnd.HTMLEventWrapper(evt);
ev.x=evtHTML.x;
ev.y=evtHTML.y;
this.b$["$wt.widgets.TrayItem"].sendEvent(ev);
evtHTML.preventDefault();
this.toReturn(false);
return;
}this.b$["$wt.widgets.TrayItem"].sendEvent(ev);
this.toReturn(false);
if(this.b$["$wt.widgets.TrayItem"].display.trayCorner!=null){
this.b$["$wt.widgets.TrayItem"].display.trayCorner.bringToTop(-1);
}});
c$=$_P();
}
return $_N($wt.widgets.TrayItem$2,i$,v$);
})(this,null));
if(O$.isOpera){
this.$handle.onmouseup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TrayItem$3")){
$_H();
c$=$_W($wt.widgets,"TrayItem$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
if(evt!=null&&(evt).ctrlKey){
var evtHTML=new $wt.internal.dnd.HTMLEventWrapper(evt);
var ev=new $wt.widgets.Event();
ev.type=35;
ev.widget=this.b$["$wt.widgets.TrayItem"];
ev.display=this.b$["$wt.widgets.TrayItem"].display;
ev.time=this.b$["$wt.widgets.TrayItem"].display.getLastEventTime();
ev.x=evtHTML.x;
ev.y=evtHTML.y;
this.b$["$wt.widgets.TrayItem"].sendEvent(ev);
evtHTML.preventDefault();
this.toReturn(false);
if(this.b$["$wt.widgets.TrayItem"].display.trayCorner!=null){
this.b$["$wt.widgets.TrayItem"].display.trayCorner.bringToTop(-1);
}}});
c$=$_P();
}
return $_N($wt.widgets.TrayItem$3,i$,v$);
})(this,null));
}});
$_M(c$,"keepAutoHide",
function(){
var trayCorner=this.display.trayCorner;
if(trayCorner!=null&&trayCorner.isAutoHide){
var createdTime=new java.util.Date().getTime();
trayCorner.lastUpdated=createdTime;
this.display.timerExec(2000,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.TrayItem$4")){
$_H();
c$=$_W($wt.widgets,"TrayItem$4",null,Runnable);
$_V(c$,"run",
function(){
var trayCorner=this.b$["$wt.widgets.TrayItem"].display.trayCorner;
if(trayCorner.lastUpdated==this.f$.createdTime){
trayCorner.setMinimized(trayCorner.isAutoHide);
}});
c$=$_P();
}
return $_N($wt.widgets.TrayItem$4,i$,v$);
})(this,$_F("createdTime",createdTime)));
}});
$_M(c$,"getToolTipText",
function(){
return this.toolTipText;
});
$_M(c$,"getVisible",
function(){
return this.visible;
});
$_M(c$,"recreate",
function(){
this.createWidget();
if(!this.visible)this.setVisible(false);
if(this.text.length!=0)this.setText(this.text);
if(this.image!=null)this.setImage(this.image);
if(this.toolTipText!=null)this.setToolTipText(this.toolTipText);
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.TrayItem,"releaseChild",[]);
this.parent.destroyItem(this);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.TrayItem,"releaseWidget",[]);
this.toolTipText=null;
if(this.$handle!=null){
this.parent.removeTrayItem(this.$handle);
O$.destroyHandle(this.$handle);
this.$handle=null;
}});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeMenuDetectListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(35,listener);
},"$wt.events.MenuDetectListener");
$_M(c$,"setImage",
function(image){
$_U(this,$wt.widgets.TrayItem,"setImage",[image]);
if(image==null){
this.$handle.style.backgroundImage="";
if(O$.isIENeedPNGFix&&this.$handle.style.filter!=null){
this.$handle.style.filter="";
}}else{
var handleStyle=this.$handle.style;
if(O$.isIENeedPNGFix&&image.url!=null&&image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.backgroundImage="";
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+this.image.url+"\", sizingMethod=\"image\")";
}else{
if(O$.isIENeedPNGFix&&handleStyle.filter!=null)handleStyle.filter="";
handleStyle.backgroundImage="url(\""+this.image.url+"\")";
}}this.keepAutoHide();
},"$wt.graphics.Image");
$_M(c$,"setToolTipText",
function(value){
this.toolTipText=value;
this.$handle.title=value;
},"~S");
$_M(c$,"setVisible",
function(visible){
if(this.visible==visible)return;
if(visible){
this.sendEvent(22);
if(this.isDisposed())return;
}this.visible=visible;
if(!visible)this.sendEvent(23);
},"~B");
});
