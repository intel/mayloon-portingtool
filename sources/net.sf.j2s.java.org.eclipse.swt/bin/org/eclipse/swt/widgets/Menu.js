$_L(["$wt.widgets.Widget"],"$wt.widgets.Menu",["java.util.Date","$wt.graphics.Rectangle","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.Decorations","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Menu"); c$ = $_C (function () {
this.x = 0;
this.y = 0;
this.hwndCB = 0;
this.id0 = 0;
this.id1 = 0;
this.hasLocation = false;
this.cascade = null;
this.parent = null;
this.imageList = null;
this.items = null;
this.defaultItem = null;
this.btnFocus = null;
this.currentIndex = 0;
this.lastFocusdTime = 0;
this.acceleratorTable = null;
this.hMenuKeyDown = null;
this.hMenuBlur = null;
this.hMenuFocus = null;
this.hMenuMouseDown = null;
$_Z (this, arguments);
}, $wt.widgets, "Menu", $wt.widgets.Widget);
$_K (c$, 
function (parent) {
this.construct ($wt.widgets.Menu.checkNull (parent).menuShell (), 8);
}, "$wt.widgets.Control");
$_K(c$,
function(parent,style){
this.construct(parent,$wt.widgets.Menu.checkStyle(style),null);
},"$wt.widgets.Decorations,~N");
$_K(c$,
function(parentMenu){
this.construct($wt.widgets.Menu.checkNull(parentMenu).parent,4);
},"$wt.widgets.Menu");
$_K(c$,
function(parentItem){
this.construct($wt.widgets.Menu.checkNull(parentItem).parent);
},"$wt.widgets.MenuItem");
$_K(c$,
function(parent,style,handle){
$_R(this,$wt.widgets.Menu,[parent,$wt.widgets.Menu.checkStyle(style)]);
this.parent=parent;
this.handle=handle;
this.checkOrientation(parent);
this.createWidget();
},"$wt.widgets.Decorations,~N,Element");
$_M(c$,"_setVisible",
function(visible){
if((this.style&(6))!=0)return;
var style=this.handle.style;
if(visible){
var clientArea=this.getDisplay().getPrimaryMonitor().getClientArea();
style.zIndex=w$.currentTopZIndex+1000;
style.display="block";
this.handle.style.height="";
var height=O$.getContainerHeight(this.handle);
if(O$.isIE||O$.isOpera){
var maxWidth=0;
var hasImage=false;
var hasSelection=false;
var children=this.getItems();
for(var i=0;i<children.length;i++){
var item=children[i];
var width=O$.getStringStyledWidth(item.getText(),"menu-item-text",null);
if(item.getImage()!=null){
hasImage=true;
}if((item.getStyle()&(48))!=0){
hasImage=true;
}maxWidth=Math.max(maxWidth,width);
}
this.handle.style.width=(maxWidth+(hasImage?18:0)+(hasSelection?18:0)+32)+"px";
}else{
this.handle.style.width="";
var width=O$.getContainerWidth(this.handle);
this.handle.style.width=(width+32)+"px";
}this.handle.style.height=height+"px";
var width=O$.getContainerWidth(this.handle);
var left=this.x;
var top=this.y;
if(this.y+height>clientArea.y+clientArea.height){
if(this.y+height-clientArea.y-clientArea.height>height-this.y){
top=this.y-height;
}}if(this.x+width>clientArea.x+clientArea.width){
if(this.x+width-clientArea.x-clientArea.width>width-this.x){
left=this.x-width;
}}style.left=left+"px";
style.top=top+"px";
O$.SetFocus(this.btnFocus);
if(this.hooks(22))this.sendEvent(22);
}else{
style.display="none";
style.width="";
if(this.hooks(23))this.sendEvent(23);
}},"~B");
$_M(c$,"addHelpListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(28,typedListener);
},"$wt.events.HelpListener");
$_M(c$,"addMenuListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(23,typedListener);
this.addListener(22,typedListener);
},"$wt.events.MenuListener");
c$.checkNull=$_M(c$,"checkNull",
function(control){
return control;
},"$wt.widgets.Control");
c$.checkNull=$_M(c$,"checkNull",
function(menu){
return menu;
},"$wt.widgets.Menu");
c$.checkNull=$_M(c$,"checkNull",
function(item){
return item;
},"$wt.widgets.MenuItem");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
return $wt.widgets.Widget.checkBits(style,8,2,4,0,0,0);
},"~N");
$_M(c$,"nextMenuItemIndex",
function(dir){
var index=this.currentIndex;
var menuItems=this.items;
var tested=0;
var length=menuItems.length;
if(index==-1){
index=dir<0?length-1:0;
while(tested<length&&(menuItems[index].style&2)!=0){
tested++;
index+=dir;
}
return index;
}else{
index+=dir;
if(index==-1||index==length){
index=dir<0?length-1:0;
}while(tested<length&&(menuItems[index].style&2)!=0){
tested++;
index+=dir;
}
}if(index==length){
index=-1;
}return index;
},"~N");
$_M(c$,"createHandle",
function(){
this.items=new Array(0);
this.currentIndex=-1;
this.lastFocusdTime=-1;
if(this.handle!=null)return;
this.handle=d$.createElement("DIV");
if((this.style&2)!=0){
this.handle.className="menu-bar";
O$.addCSSClass(this.parent.handle,"shell-menu-bar");
var top=3;
if(this.parent.titleBar!=null){
top=3+O$.getContainerHeight(this.parent.titleBar);
}this.handle.style.top=top+"px";
this.parent.handle.appendChild(this.handle);
this.parent.shellMenuBar=this.handle;
}else{
d$.body.appendChild(this.handle);
this.handle.className="menu-default";
var supportShadow=false;
supportShadow=window["swt.disable.shadow"]!=true;
if(supportShadow){
$wt.widgets.Decorations.createNarrowShadowHandles(this.handle);
}}this.btnFocus=d$.createElement("BUTTON");
this.btnFocus.className="menu-focus";
this.handle.appendChild(this.btnFocus);
this.hMenuKeyDown=$_Q((($_D("$wt.widgets.Menu$1")?0:org.eclipse.swt.widgets.Menu.$Menu$1$()),$_N($wt.widgets.Menu$1,this,null)));
Clazz.addEvent(this.btnFocus,"keydown",this.hMenuKeyDown);
this.hMenuBlur=$_Q((($_D("$wt.widgets.Menu$2")?0:org.eclipse.swt.widgets.Menu.$Menu$2$()),$_N($wt.widgets.Menu$2,this,null)));
Clazz.addEvent(this.btnFocus,"blur",this.hMenuBlur);
this.hMenuFocus=$_Q((($_D("$wt.widgets.Menu$3")?0:org.eclipse.swt.widgets.Menu.$Menu$3$()),$_N($wt.widgets.Menu$3,this,null)));
Clazz.addEvent(this.btnFocus,"focus",this.hMenuFocus);
this.hMenuMouseDown=$_Q((($_D("$wt.widgets.Menu$4")?0:org.eclipse.swt.widgets.Menu.$Menu$4$()),$_N($wt.widgets.Menu$4,this,null)));
Clazz.addEvent(this.handle,"mousedown",this.hMenuMouseDown);
if((this.style&2)!=0){
}else{
}});
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
for(var i=0;i<this.items.length;i++){
if(this.items[i]===item){
return;
}}
this.items[this.items.length]=item;
this.display.addMenuItem(item);
item.handle=d$.createElement("DIV");
item.handle.className=((this.style&2)!=0)?"menu-bar-item":"menu-item";
this.handle.appendChild(item.handle);
if((item.style&2)==0){
if((item.style&(48))!=0){
O$.addCSSClass(this.handle,"menu-enable-status");
}if((this.style&2)==0){
var el=d$.createElement("DIV");
el.className="menu-item-status";
item.handle.appendChild(el);
item.statusEl=el;
el=d$.createElement("DIV");
el.className="menu-item-image";
item.handle.appendChild(el);
item.imageEl=el;
el=d$.createElement("DIV");
el.className="menu-item-text";
item.handle.appendChild(el);
item.textEl=el;
el=d$.createElement("DIV");
el.className="menu-item-arrow";
item.handle.appendChild(el);
item.arrowEl=el;
if((item.style&64)!=0){
el=d$.createElement("DIV");
el.className="menu-item-arrow-right";
item.arrowEl.appendChild(el);
}}}else{
item.handle.className+="menu-item-seperator";
}this.redraw();
},"$wt.widgets.MenuItem,~N");
$_M(c$,"createWidget",
function(){
this.createHandle();
this.parent.addMenu(this);
});
$_M(c$,"destroyAccelerators",
function(){
this.parent.destroyAccelerators();
});
$_M(c$,"registerAccelerator",
function(accelerator,item){
if(this.acceleratorTable==null){
this.acceleratorTable=new Array(0);
}var size=this.acceleratorTable.length;
this.acceleratorTable[size]=new Integer(accelerator);
this.acceleratorTable[size+1]=item;
},"~N,$wt.widgets.MenuItem");
$_M(c$,"isAccelerated",
function(keyEvent){
var size=this.acceleratorTable.length;
for(var i=0;i<size;i+=2){
var acclCode=(this.acceleratorTable[i]).intValue();
if((((acclCode&262144)!=0&&keyEvent.ctrlKey)||((acclCode&262144)==0))&&(((acclCode&65536)!=0&&keyEvent.altKey)||((acclCode&65536)==0))&&((acclCode&131072)!=0&&keyEvent.shiftKey)||((acclCode&131072)==0)){
acclCode&=-458753;
if(acclCode==keyEvent.keyCode){
var item=this.acceleratorTable[i+1];
try{
item.handle.click();
}catch(e){
try{
var clickEvent=document.createEvent("MouseEvents");
clickEvent.initEvent("click",true,true);
item.handle.dispatchEvent(clickEvent);
}catch(e){
}
}
}}}
return false;
},"HTMLEvent");
$_M(c$,"destroyItem",
function(item){
this.redraw();
},"$wt.widgets.MenuItem");
$_V(c$,"destroyWidget",
function(){
this.releaseHandle();
if(this.handle!=null){
O$.destroyHandle(this.handle);
this.handle=null;
}});
$_M(c$,"fixMenus",
function(newParent){
var items=this.getItems();
for(var i=0;i<items.length;i++){
items[i].fixMenus(newParent);
}
this.parent.removeMenu(this);
newParent.addMenu(this);
this.parent=newParent;
},"$wt.widgets.Decorations");
$_M(c$,"getBounds",
function(){
if((this.style&2)!=0){
if(this.parent.menuBar!==this){
return new $wt.graphics.Rectangle(0,0,0,0);
}}else{
var count=this.items.length;
if(count!=0){
var x;
var y;
var w;
var h;
var hdl1=this.items[0].handle;
var pt1=O$.calcuateRelativePosition(hdl1,d$.body);
x=pt1.x;
y=pt1.y;
var textWidth=0;
var accelWidth=0;
for(var i=0;i<count;i++){
var text=this.items[i].text;
if(text==null){
continue;}var idx=text.indexOf('\t');
var normalText=text;
var accelText=null;
if(idx!=-1){
normalText=text.substring(0,idx);
accelText=text.substring(idx+1);
}if(accelText!=null&&accelText.length!=0){
var width=O$.getStringStyledWidth(accelText,"menu-item-text",null);
if(width>accelWidth){
accelWidth=width;
}}var width=O$.getStringStyledWidth(normalText,"menu-item-text",null);
if(width>textWidth){
textWidth=width;
}}
w=16+textWidth+16+accelWidth+16+8;
if(this.handle.className.indexOf("menu-enable-status")!=-1&&this.handle.className.indexOf("menu-enable-image")!=-1){
w+=16;
}if(count==1){
h=O$.getContainerHeight(hdl1);
}else{
var hdl2=this.items[count-1].handle;
var pt2=O$.calcuateRelativePosition(hdl2,d$.body);
h=pt2.y-pt1.y+O$.getContainerHeight(hdl2);
}return new $wt.graphics.Rectangle(x-2,y-2,w+4,h+4);
}}return new $wt.graphics.Rectangle(0,0,0,0);
});
$_M(c$,"getDefaultItem",
function(){
return this.defaultItem;
});
$_M(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
var count=this.items.length;
var result=new Array(count);
System.arraycopy(this.items,0,result,0,count);
return result;
});
$_V(c$,"getNameText",
function(){
var result="";
var items=this.getItems();
var length=items.length;
if(length>0){
for(var i=0;i<length-1;i++){
result=result+items[i].getNameText()+",";
}
result=result+items[length-1].getNameText();
}return result;
});
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getParentItem",
function(){
return this.cascade;
});
$_M(c$,"getParentMenu",
function(){
if(this.cascade!=null)return this.cascade.parent;
return null;
});
$_M(c$,"getShell",
function(){
return this.parent.getShell();
});
$_M(c$,"getVisible",
function(){
if((this.style&2)!=0){
return this===this.parent.menuShell().menuBar;
}if((this.style&8)!=0){
var popups=this.display.popups;
if(popups==null)return false;
for(var i=0;i<popups.length;i++){
if(popups[i]===this)return true;
}
}var shell=this.getShell();
var menu=shell.activeMenu;
while(menu!=null&&menu!==this){
menu=menu.getParentMenu();
}
return this===menu;
});
$_M(c$,"imageIndex",
function(image){
var index=this.imageList.indexOf(image);
if(index==-1){
index=this.imageList.add(image);
}else{
this.imageList.put(index,image);
}return index;
},"$wt.graphics.Image");
$_M(c$,"indexOf",
function(item){
if(item.parent!==this)return-1;
for(var i=0;i<this.items.length;i++){
if(this.items[i]===item){
return i;
}}
return-1;
},"$wt.widgets.MenuItem");
$_M(c$,"isEnabled",
function(){
var parentMenu=this.getParentMenu();
if(parentMenu==null)return this.getEnabled();
return this.getEnabled()&&parentMenu.isEnabled();
});
$_M(c$,"isVisible",
function(){
return this.getVisible();
});
$_M(c$,"redraw",
function(){
if(!this.isVisible())return;
if((this.style&2)!=0){
this.display.addBar(this);
}else{
this.update();
}});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.Menu,"releaseChild",[]);
if(this.cascade!=null)this.cascade.releaseMenu();
if((this.style&2)!=0){
this.display.removeBar(this);
if(this===this.parent.menuBar){
this.parent.setMenuBar(null);
}}else{
if((this.style&8)!=0){
this.display.removePopup(this);
}}});
$_M(c$,"releaseHandle",
function(){
if(this.btnFocus!=null){
if(this.hMenuKeyDown!=null){
Clazz.removeEvent(this.btnFocus,"keydown",this.hMenuKeyDown);
this.hMenuKeyDown=null;
}if(this.hMenuBlur!=null){
Clazz.removeEvent(this.btnFocus,"blur",this.hMenuBlur);
this.hMenuBlur=null;
}if(this.hMenuFocus!=null){
Clazz.removeEvent(this.btnFocus,"focus",this.hMenuFocus);
this.hMenuFocus=null;
}O$.destroyHandle(this.btnFocus);
this.btnFocus=null;
}if(this.handle!=null){
if(this.hMenuMouseDown!=null){
Clazz.removeEvent(this.handle,"mousedown",this.hMenuMouseDown);
this.hMenuMouseDown=null;
}O$.destroyHandle(this.handle);
this.handle=null;
}$_U(this,$wt.widgets.Menu,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(!item.isDisposed()){
item.releaseResources();
}this.items[i]=null;
}
this.items=new Array(0);
$_U(this,$wt.widgets.Menu,"releaseWidget",[]);
if(this.parent!=null)this.parent.removeMenu(this);
this.parent=null;
this.cascade=null;
});
$_M(c$,"removeHelpListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(28,listener);
},"$wt.events.HelpListener");
$_M(c$,"removeMenuListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(23,listener);
this.eventTable.unhook(22,listener);
},"$wt.events.MenuListener");
$_M(c$,"setDefaultItem",
function(item){
this.defaultItem=item;
this.redraw();
},"$wt.widgets.MenuItem");
$_M(c$,"setEnabled",
function(enabled){
this.state&=-9;
if(!enabled)this.state|=8;
},"~B");
$_M(c$,"setLocation",
function(x,y){
if((this.style&(6))!=0)return;
this.x=x;
this.y=y;
this.hasLocation=true;
},"~N,~N");
$_M(c$,"setLocation",
function(location){
this.setLocation(location.x,location.y);
},"$wt.graphics.Point");
$_M(c$,"setVisible",
function(visible){
if((this.style&(6))!=0)return;
if(visible){
this.display.addPopup(this);
}else{
this.display.removePopup(this);
this._setVisible(false);
}},"~B");
$_M(c$,"update",
function(){
var hasCheck=false;
var hasImage=false;
var items=this.getItems();
for(var i=0;i<items.length;i++){
var item=items[i];
if(item.image!=null){
if((hasImage=true)&&hasCheck)break;
}if((item.style&(48))!=0){
if((hasCheck=true)&&hasImage)break;
}}
});
c$.$Menu$1$=function(){
$_H();
c$=$_W($wt.widgets,"Menu$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
var menuItems=this.b$["$wt.widgets.Menu"].items;
var index=this.b$["$wt.widgets.Menu"].currentIndex;
if(evt.keyCode==13||evt.keyCode==10){
if(index!=-1){
var i=menuItems[index];
var target=menuItems[index].handle;
if(i.isEnabled()){
try{
target.click();
}catch(e){
try{
var clickEvent=document.createEvent("MouseEvents");
clickEvent.initEvent("click",true,true);
target.dispatchEvent(clickEvent);
}catch(e){
}
}
}}}else if(evt.keyCode==38||evt.keyCode==104){
if(index==-1){
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(-1);
var i=menuItems[index];
i.hItemMouseEnter();
}else{
var i=menuItems[index];
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(-1);
var i1=menuItems[index];
i.hItemMouseExit();
i1.hItemMouseEnter();
}}else if(evt.keyCode==40||evt.keyCode==98){
if(index==-1){
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(1);
var i=menuItems[index];
i.hItemMouseEnter();
}else{
var i=menuItems[index];
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(1);
var i1=menuItems[index];
i.hItemMouseExit();
i1.hItemMouseEnter();
}}else if(evt.keyCode==37||evt.keyCode==100){
if((this.b$["$wt.widgets.Menu"].style&2)!=0){
if(index==-1){
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(-1);
var i=menuItems[index];
i.hItemMouseEnter();
}else{
var i=menuItems[index];
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(-1);
var i1=menuItems[index];
i.hItemMouseExit();
i1.hItemMouseEnter();
}}}else if(evt.keyCode==39||evt.keyCode==102){
if((this.b$["$wt.widgets.Menu"].style&2)!=0){
if(index==-1){
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(1);
var i=menuItems[index];
i.hItemMouseEnter();
}else{
var i=menuItems[index];
index=this.b$["$wt.widgets.Menu"].nextMenuItemIndex(1);
var i1=menuItems[index];
i.hItemMouseExit();
i1.hItemMouseEnter();
}}}else{
for(var i=0;i<menuItems.length;i++){
if(menuItems[i]!=null&&menuItems[i].mnemonicChar==evt.keyCode){
var target=menuItems[i].handle;
if(menuItems[i].isEnabled()){
try{
target.click();
}catch(e){
try{
var clickEvent=document.createEvent("MouseEvents");
clickEvent.initEvent("click",true,true);
target.dispatchEvent(clickEvent);
}catch(e){
}
}
}break;
}}
}this.b$["$wt.widgets.Menu"].currentIndex=index;
});
c$=$_P();
};
c$.$Menu$2$=function(){
$_H();
c$=$_W($wt.widgets,"Menu$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var time=new java.util.Date().getTime();
if(time-this.b$["$wt.widgets.Menu"].lastFocusdTime>20){
if((this.b$["$wt.widgets.Menu"].style&2)==0){
this.b$["$wt.widgets.Menu"].handle.style.display="none";
this.b$["$wt.widgets.Menu"].sendEvent(23);
}else{
}}});
c$=$_P();
};
c$.$Menu$3$=function(){
$_H();
c$=$_W($wt.widgets,"Menu$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Menu"].lastFocusdTime=new java.util.Date().getTime();
});
c$=$_P();
};
c$.$Menu$4$=function(){
$_H();
c$=$_W($wt.widgets,"Menu$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Menu"].lastFocusdTime=new java.util.Date().getTime();
});
c$=$_P();
};
$_S(c$,
"ID_PPC",100,
"ID_SPMM",102,
"ID_SPBM",103,
"ID_SPMB",104,
"ID_SPBB",105,
"ID_SPSOFTKEY0",106,
"ID_SPSOFTKEY1",107,
"GROWTH_RATE",5);
});
