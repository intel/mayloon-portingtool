$_L(["$wt.widgets.Composite"],"$wt.widgets.Combo",["java.util.Date","$wt.graphics.Color","$.Point","$.Rectangle","$wt.internal.ResizeSystem","$.RunnableCompatibility","$wt.internal.browser.OS","$.Popup","$wt.internal.dnd.HTMLEventWrapper","$wt.widgets.Event","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Combo", ".combo-default {\npadding: 0;\nborder-style:none;\n/*overflow:hidden;*/\nposition:absolute;\nborder-width:2px;\nborder-style:inset;\nborder-color:gray;\n}\n.combo-input-box {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nborder-style:none;\npadding-left:1px;\nbackground-color:white;\n}\n@media all and (min-width:0px){/* opera and safari */\n.combo-input-box {\nmargin-top:-1px;\n}\nhtml:first-child .combo-input-box {\nmargin-top:-2px !important;\n}\n}\n.combo-default button {\n/*float:right;*/\nposition:absolute;\nright:0;\ntop:0;\nheight:100%;\nwidth:16px;\nline-height:0;\npadding:0;\nfont-size:0;\nmargin:0;\n}\n* html .combo-default button {\nright:-2px;\n}\n.combo-button-arrow-down {\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid solid none solid;\nborder-color:transparent;\nborder-top-color:black !important;\nborder-bottom-width:0;\n}\n* html .combo-button-arrow-down {\nborder-color:buttonface;\n}\n.combo-disabled .combo-button-arrow-down {\nborder-top-color:gray !important;\n}\n.combo-disabled .combo-input-box {\nbackground-color:buttonface !important;\n}\n.combo-select-box-invisible {\npadding-left:1px;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\ndisplay:none;\n}\n.combo-select-box-visible {\npadding-left:1px;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\ndisplay:block;\n}\n.combo-select-box-notsimple {\npadding-left:1px;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nposition:absolute;\n}\n.swt-widgets-combo {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.noSelection = true;
this.ignoreModify = false;
this.ignoreCharacter = false;
this.visibleCount = 5;
this.dropDownButton = null;
this.textInput = null;
this.selectInput = null;
this.lastBlurred = -1;
this.currentIndex = 0;
this.selectShown = false;
this.visibleCountIsSet = false;
this.isSimple = false;
this.itemCount = 0;
this.maxWidth = 0;
$_Z (this, arguments);
}, $wt.widgets, "Combo", $wt.widgets.Composite);
$_M (c$, "add", 
function (string) {
if (this.selectInput != null) {
this.selectInput.options[this.itemCount] =  new Option (string, string);
}this.itemCount++;
if (!this.visibleCountIsSet) this.visibleCount = Math.max (this.itemCount, 5);
this.maxWidth = Math.max (this.maxWidth, O$.getStringStyledWidth (string, "combo-input-box", null));
}, "~S");
$_M(c$,"add",
function(string,index){
var count=this.itemCount;
if(this.selectInput!=null){
this.selectInput.options[index]=new Option(string,string);
}if(!this.visibleCountIsSet)this.visibleCount=Math.max(this.itemCount,5);
},"~S,~N");
$_M(c$,"addModifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(24,typedListener);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(25,typedListener);
},"$wt.events.VerifyListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style&=-2049;
style&=-769;
style=$wt.widgets.Widget.checkBits(style,4,64,0,0,0,0);
if((style&64)!=0)return style&-9;
return style;
},"~N");
$_M(c$,"clearSelection",
function(){
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
if(wHint==-1){
width=64;
}if(hHint==-1){
if((this.style&64)!=0){
height=this.computeSelectHeight();
}}if(width==0)width=64;
if(height==0)height=64;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
if((this.style&8)!=0){
width+=8;
}else{
width+=4;
}if((this.style&64)==0){
width+=19;
height=21;
}else{
var border=2;
width+=16+border*2;
var textHeight=O$.getStringStyledHeight("M","combo-input-box",null);
if((this.style&4)!=0){
height=textHeight+6;
}else{
height+=textHeight+10;
}}return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"computeSelectHeight",
($fz=function(){
return this.getItemHeight()*this.visibleCount;
},$fz.isPrivate=true,$fz));
$_M(c$,"copy",
function(){
});
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.Combo,"createHandle",[]);
this.state&=-3;
this.isSimple=(this.style&64)!=0;
this.handle.className+=" combo-default";
this.dropDownButton=d$.createElement("BUTTON");
this.handle.appendChild(this.dropDownButton);
var btnArrow=d$.createElement("DIV");
btnArrow.className="combo-button-arrow-down";
this.dropDownButton.appendChild(btnArrow);
this.textInput=d$.createElement("INPUT");
this.textInput.type="text";
this.textInput.className="combo-input-box";
this.textInput.readOnly=(this.style&8)!=0;
var wrapper=d$.createElement("DIV");
wrapper.style.overflow="hidden";
this.handle.appendChild(wrapper);
wrapper.appendChild(this.textInput);
this.textInput.ondblclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$1")){
$_H();
c$=$_W($wt.widgets,"Combo$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Combo"].isSimple&&this.b$["$wt.widgets.Combo"].itemCount>0){
this.b$["$wt.widgets.Combo"].show();
}});
c$=$_P();
}
return $_N($wt.widgets.Combo$1,i$,v$);
})(this,null));
this.textInput.onkeyup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$2")){
$_H();
c$=$_W($wt.widgets,"Combo$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=this.getEvent();
var items=this.b$["$wt.widgets.Combo"].getItems();
if(items.length==0){
return;
}switch(e.keyCode){
case 38:
this.b$["$wt.widgets.Combo"].selectInput.selectedIndex=this.b$["$wt.widgets.Combo"].currentIndex;
this.b$["$wt.widgets.Combo"].noSelection=false;
this.b$["$wt.widgets.Combo"].updateSelection();
this.b$["$wt.widgets.Combo"].noSelection=true;
if(this.b$["$wt.widgets.Combo"].currentIndex>0){
this.b$["$wt.widgets.Combo"].currentIndex--;
}if(this.b$["$wt.widgets.Combo"].currentIndex>=items.length){
this.b$["$wt.widgets.Combo"].currentIndex=items.length-1;
}this.toReturn(false);
break;
case 40:
this.b$["$wt.widgets.Combo"].selectInput.selectedIndex=this.b$["$wt.widgets.Combo"].currentIndex;
this.b$["$wt.widgets.Combo"].noSelection=false;
this.b$["$wt.widgets.Combo"].updateSelection();
this.b$["$wt.widgets.Combo"].noSelection=true;
if(this.b$["$wt.widgets.Combo"].currentIndex<items.length){
this.b$["$wt.widgets.Combo"].currentIndex++;
}if(this.b$["$wt.widgets.Combo"].currentIndex>=items.length){
this.b$["$wt.widgets.Combo"].currentIndex=items.length-1;
}this.toReturn(false);
break;
}
});
c$=$_P();
}
return $_N($wt.widgets.Combo$2,i$,v$);
})(this,null));
this.dropDownButton.onclick=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$3")){
$_H();
c$=$_W($wt.widgets,"Combo$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var now=new java.util.Date().getTime();
if(now-this.b$["$wt.widgets.Combo"].lastBlurred<200){
return;
}if(!this.b$["$wt.widgets.Combo"].isSimple&&this.b$["$wt.widgets.Combo"].itemCount>0){
if(!this.b$["$wt.widgets.Combo"].selectShown){
this.b$["$wt.widgets.Combo"].show();
}else{
this.b$["$wt.widgets.Combo"].hide();
}}});
c$=$_P();
}
return $_N($wt.widgets.Combo$3,i$,v$);
})(this,null));
this.createSelect();
this.configureSelect();
});
$_M(c$,"createSelect",
function(){
this.selectInput=d$.createElement("SELECT");
this.selectInput.style.top=this.height+"px";
this.selectInput.style.left=this.textInput.style.left;
this.selectInput.size=this.visibleCount;
this.handle.appendChild(this.selectInput);
if(this.isSimple){
this.selectInput.className="combo-select-box-visible";
}else{
this.selectInput.style.position="absolute";
this.selectInput.className="combo-select-box-invisible combo-select-box-notsimple";
$wt.internal.ResizeSystem.register(this.getShell(),0);
}});
$_M(c$,"configureSelect",
function(){
this.selectInput.onchange=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$4")){
$_H();
c$=$_W($wt.widgets,"Combo$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Combo"].noSelection=false;
this.b$["$wt.widgets.Combo"].updateSelection();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$4,i$,v$);
})(this,null));
this.selectInput.onblur=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$5")){
$_H();
c$=$_W($wt.widgets,"Combo$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Combo"].lastBlurred=new java.util.Date().getTime();
if(!this.b$["$wt.widgets.Combo"].isSimple&&this.b$["$wt.widgets.Combo"].itemCount>0)this.b$["$wt.widgets.Combo"].hide();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$5,i$,v$);
})(this,null));
this.selectInput.onmouseup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$6")){
$_H();
c$=$_W($wt.widgets,"Combo$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Combo"].noSelection=false;
this.b$["$wt.widgets.Combo"].updateSelection();
if(!this.b$["$wt.widgets.Combo"].isSimple&&this.b$["$wt.widgets.Combo"].itemCount>0){
var el=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent()).target;
if(O$.isIE||O$.isSafari||(el!=null&&el.nodeName==="OPTION")){
if(O$.isIE){
this.b$["$wt.widgets.Combo"].getDisplay().timerExec(50,(function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$6$7")){
$_H();
c$=$_W($wt.widgets,"Combo$6$7",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Combo"].hide();
});
c$=$_P();
}
return $_N($wt.widgets.Combo$6$7,i$,v$);
})(this,null));
}else{
this.b$["$wt.widgets.Combo"].hide();
}}}});
c$=$_P();
}
return $_N($wt.widgets.Combo$6,i$,v$);
})(this,null));
this.selectInput.onkeyup=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Combo$8")){
$_H();
c$=$_W($wt.widgets,"Combo$8",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var evt=this.getEvent();
var keyCode=evt.keyCode;
if(keyCode==27||keyCode==13||keyCode==10){
this.b$["$wt.widgets.Combo"].hide();
}});
c$=$_P();
}
return $_N($wt.widgets.Combo$8,i$,v$);
})(this,null));
});
$_M(c$,"hide",
function(){
if(!this.selectShown){
return;
}this.selectShown=false;
try{
d$.body.removeChild(this.selectInput);
this.handle.appendChild(this.selectInput);
}catch(e){
if($_O(e,Throwable)){
}else{
throw e;
}
}
this.selectInput.className="combo-select-box-invisible"+(this.isSimple?"" : "combo-select-box-notsimple");
O$.SetFocus(this.dropDownButton);
});
$_M(c$,"show",
function(){
var coordinate=O$.calcuateRelativePosition(this.handle,d$.body);
if(this.selectInput.style.overflow==="scroll"){
this.selectInput.style.overflow="auto";
this.selectInput.style.height="auto";
}this.selectInput.style.left="";
this.selectInput.style.top="";
this.selectInput.style.width="";
this.selectInput.style.height="";
this.selectInput.size=this.visibleCount;
var w=Math.max(this.maxWidth,O$.getContainerWidth(this.handle));
this.selectInput.style.display="none";
var h=O$.getContainerHeight(this.handle);
this.selectInput.style.display="";
if(O$.isFirefox){
h+=1;
}else if(O$.isIE){
coordinate.x-=1;
coordinate.y-=2;
}this.selectShown=true;
w$.currentTopZIndex=w$.currentTopZIndex+1;
this.selectInput.style.zIndex=w$.currentTopZIndex+4;
this.selectInput.className="combo-select-box-visible"+(this.isSimple?"" : "combo-select-box-notsimple");
var height=O$.getContainerHeight(this.selectInput);
var bounds=$wt.internal.browser.Popup.popupList(this.getMonitor().getClientArea(),new $wt.graphics.Rectangle(coordinate.x,coordinate.y,w,h),height);
if(O$.isIE){
this.selectInput.style.left=(bounds.x+1)+"px";
}else{
this.selectInput.style.left=bounds.x+"px";
}this.selectInput.style.top=bounds.y+"px";
if(bounds.height!=height){
this.selectInput.style.overflow="scroll";
this.selectInput.style.height=bounds.height+"px";
}this.selectInput.style.width=bounds.width+"px";
try{
this.handle.removeChild(this.selectInput);
d$.body.appendChild(this.selectInput);
}catch(e){
if($_O(e,Throwable)){
}else{
throw e;
}
}
O$.SetFocus(this.selectInput);
});
$_M(c$,"updateSelection",
function(){
var i=this.getSelectionIndex();
if(i<0)return;
this.textInput.value=this.selectInput.options[i].value;
this.setText(this.getItem(i));
this.sendEvent(13);
});
$_M(c$,"cut",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"deselect",
function(index){
this.selectInput.selectedIndex=-1;
this.sendEvent(24);
},"~N");
$_M(c$,"deselectAll",
function(){
this.selectInput.selectedIndex=-1;
this.setText("",false);
this.sendEvent(24);
});
$_M(c$,"getItem",
function(index){
return this.selectInput.options[index].value;
},"~N");
$_M(c$,"getItemCount",
function(){
return this.itemCount;
});
$_M(c$,"getItemHeight",
function(){
return O$.getStringStyledHeight("A","combo-input-box",null)+1;
});
$_M(c$,"getItems",
function(){
var count=this.getItemCount();
var result=new Array(count);
for(var i=0;i<count;i++)result[i]=this.getItem(i);

return result;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getOrientation",
function(){
return this.style&(100663296);
});
$_M(c$,"getSelection",
function(){
return new $wt.graphics.Point(0,0);
});
$_M(c$,"getSelectionIndex",
function(){
if(this.noSelection)return-1;
return this.selectInput.selectedIndex;
});
$_M(c$,"getText",
function(){
return this.textInput.value;
});
$_M(c$,"getTextHeight",
function(){
return O$.getStringStyledHeight("A","combo-input-box",null)+6;
});
$_M(c$,"getTextLimit",
function(){
return this.textInput.size;
});
$_M(c$,"getVisibleItemCount",
function(){
return this.visibleCount;
});
$_V(c$,"hasFocus",
function(){
return false;
});
$_M(c$,"indexOf",
function(string){
return this.indexOf(string,0);
},"~S");
$_M(c$,"indexOf",
function(string,start){
if(string.length==0){
var count=this.getItemCount();
for(var i=start;i<count;i++){
if(string.equals(this.getItem(i)))return i;
}
return-1;
}return-1;
},"~S,~N");
$_M(c$,"paste",
function(){
if((this.style&8)!=0)return;
});
$_M(c$,"remove",
function(index){
var oldOptions=this.selectInput.options;
if(this.selectInput.selectedIndex==index){
this.noSelection=true;
}var newOptions=new Array(oldOptions.length-1);
System.arraycopy(oldOptions,0,newOptions,0,index);
System.arraycopy(oldOptions,index+1,newOptions,index,oldOptions.length-index-1);
this.selectInput.options=newOptions;
this.itemCount--;
if(!this.visibleCountIsSet)this.visibleCount=Math.max(this.itemCount,5);
},"~N");
$_M(c$,"remove",
function(start,end){
if(start>end)return;
var oldOptions=this.selectInput.options;
if(start<=this.selectInput.selectedIndex&&this.selectInput.selectedIndex<=end){
this.noSelection=true;
}var newOptions=new Array(oldOptions.length-(end-start+1));
System.arraycopy(oldOptions,0,newOptions,0,start);
System.arraycopy(oldOptions,end+1,newOptions,start,oldOptions.length-end-1);
this.selectInput.options=newOptions;
this.itemCount-=(end-start+1);
if(!this.visibleCountIsSet)this.visibleCount=Math.max(5,this.itemCount);
},"~N,~N");
$_M(c$,"remove",
function(string){
var index=this.indexOf(string,0);
if(this.selectInput.selectedIndex==index){
this.noSelection=true;
}this.remove(index);
},"~S");
$_M(c$,"removeAll",
function(){
{
this.selectInput.options.length=0;
}this.noSelection=true;
this.itemCount=0;
this.textInput.value="";
this.sendEvent(24);
this.itemCount=0;
if(!this.visibleCountIsSet)this.visibleCount=5;
});
$_M(c$,"removeModifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(24,listener);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(25,listener);
},"$wt.events.VerifyListener");
$_M(c$,"select",
function(index){
if(index>=0&&index<this.itemCount){
this.noSelection=false;
this.selectInput.selectedIndex=index;
this.setText(this.getItem(index));
}},"~N");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
var buttonHeight=this.getTextHeight();
var buttonWidth=O$.getContainerHeight(this.dropDownButton);
if(!this.isSimple){
$_U(this,$wt.widgets.Combo,"setBounds",[x,y,width,height,flags]);
this.textInput.style.height=Math.min(height,buttonHeight)+"px";
this.dropDownButton.style.width=buttonWidth+"px";
this.textInput.style.width=Math.max(0,width-buttonWidth-5)+"px";
this.selectInput.style.width=width+"px";
}else{
$_U(this,$wt.widgets.Combo,"setBounds",[x,y,width,height,flags]);
this.selectInput.style.height=(Math.max(0,height-buttonHeight))+"px";
this.textInput.style.height=(buttonHeight-2)+"px";
this.dropDownButton.style.display="none";
this.textInput.style.width=width+"px";
this.selectInput.style.marginLeft="-3px";
if(O$.isIE){
this.selectInput.style.marginTop="-2px";
this.selectInput.style.width=(width+3)+"px";
}else{
this.selectInput.style.width=width+"px";
}}},"~N,~N,~N,~N,~N");
$_V(c$,"setForeground",
function(color){
if(color!=null){
this.textInput.style.color=color.getCSSHandle();
}else{
this.textInput.style.color="";
}},"$wt.graphics.Color");
$_V(c$,"setBackground",
function(color){
if(color!=null){
this.textInput.style.backgroundColor=color.getCSSHandle();
}else{
this.textInput.style.backgroundColor="";
}},"$wt.graphics.Color");
$_V(c$,"getBackground",
function(){
var bg=this.textInput.style.backgroundColor;
if(bg==null||(""+bg).length==0){
return new $wt.graphics.Color(this.display,"white");
}return new $wt.graphics.Color(this.display,bg);
});
$_V(c$,"getForeground",
function(){
var fg=this.textInput.style.color;
if(fg==null||(""+fg).length==0){
return new $wt.graphics.Color(this.display,"black");
}return new $wt.graphics.Color(this.display,this.handle.style.color);
});
$_M(c$,"setItem",
function(index,string){
this.remove(index);
if(this.isDisposed())return;
this.add(string,index);
},"~N,~S");
$_M(c$,"setItems",
function(items){
for(var i=0;i<items.length;i++){
}
for(var i=0;i<items.length;i++){
var string=items[i];
this.add(string);
}
this.sendEvent(24);
},"~A");
$_M(c$,"setOrientation",
function(orientation){
},"~N");
$_M(c$,"setSelection",
function(selection){
},"$wt.graphics.Point");
$_M(c$,"setText",
function(string){
this.setText(string,true);
},"~S");
$_M(c$,"setText",
function(string,modify){
if((this.style&8)!=0){
var index=this.indexOf(string);
if(index!=-1&&this.selectInput.selectedIndex!=index){
this.select(index);
}}this.textInput.readOnly=false;
this.textInput.value=string;
this.textInput.readOnly=(this.style&8)!=0;
if(modify){
this.sendEvent(24);
}},"~S,~B");
$_M(c$,"setTextLimit",
function(limit){
this.textInput.size=limit;
},"~N");
$_M(c$,"setVisibleItemCount",
function(count){
if(count<0)return;
this.visibleCount=count;
this.visibleCountIsSet=true;
this.selectInput.size=count;
if((this.style&4)!=0){
this.forceResize();
}},"~N");
$_M(c$,"traverseEscape",
function(){
if((this.style&4)!=0){
}return $_U(this,$wt.widgets.Combo,"traverseEscape",[]);
});
$_M(c$,"verifyText",
function(string,start,end,keyEvent){
var event=new $wt.widgets.Event();
event.text=string;
event.start=start;
event.end=end;
if(keyEvent!=null){
event.character=keyEvent.character;
event.keyCode=keyEvent.keyCode;
event.stateMask=keyEvent.stateMask;
}this.sendEvent(25,event);
if(!event.doit||this.isDisposed())return null;
return event.text;
},"~S,~N,~N,$wt.widgets.Event");
$_M(c$,"releaseHandle",
function(){
if(this.selectInput!=null){
O$.destroyHandle(this.selectInput);
this.selectInput=null;
}if(this.dropDownButton!=null){
O$.destroyHandle(this.dropDownButton);
this.dropDownButton=null;
}if(this.textInput!=null){
O$.destroyHandle(this.textInput);
this.textInput=null;
}$_U(this,$wt.widgets.Combo,"releaseHandle",[]);
});
$_M(c$,"enableWidget",
function(enabled){
$_U(this,$wt.widgets.Combo,"enableWidget",[enabled]);
this.textInput.disabled=!enabled;
this.dropDownButton.disabled=!enabled;
O$.updateCSSClass(this.handle,"combo-disabled",!enabled);
},"~B");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if(O$.isIE){
this.dropDownButton.style.height=(cy-4)+"px";
}if((this.style&67108864)!=0){
this.dropDownButton.style.left="1px";
this.dropDownButton.style.right="auto";
}O$.updateArrowSize(this.dropDownButton.childNodes[0],1024,16,cy);
var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx-4>0?cx-4:0)+"px";
el.style.height=(cy-4>0?cy-4:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_S(c$,
"LIMIT",0x7FFF);
});
