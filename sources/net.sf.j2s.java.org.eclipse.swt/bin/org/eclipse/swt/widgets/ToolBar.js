$_L(["$wt.widgets.Composite"],"$wt.widgets.ToolBar",["$wt.graphics.Point","$wt.internal.browser.OS"],function(){
$WTC$$.registerCSS ("$wt.widgets.ToolBar"); c$ = $_C (function () {
this.lastFocusId = 0;
this.items = null;
this.ignoreResize = false;
this.ignoreMouse = false;
this.imageList = null;
this.disabledImageList = null;
this.hotImageList = null;
this.btnFocus = null;
this.containsImage = false;
this.containsText = false;
this.imgMaxHeight = 0;
this.imgMaxWidth = 0;
this.txtMaxHeight = 0;
this.txtMaxWidth = 0;
this.cachedMaxItemWidth = 0;
$_Z (this, arguments);
}, $wt.widgets, "ToolBar", $wt.widgets.Composite);
$_K (c$, 
function (parent, style) {
$_R (this, $wt.widgets.ToolBar, [parent, $wt.widgets.ToolBar.checkStyle (style)]);
if ((style & 512) != 0) {
if (O$.existedCSSClass (this.handle, "tool-bar-horizontal")) {
O$.removeCSSClass (this.handle, "tool-bar-horizontal");
}this.style|=512;
O$.addCSSClass(this.handle,"tool-bar-vertical");
}else{
this.style|=256;
}},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&8388608)==0)style|=524288;
if((style&512)!=0)style&=-65;
return style&-769;
},"~N");
$_M(c$,"calculateImagesMaxSize",
function(){
if(!this.containsImage){
return new $wt.graphics.Point(0,0);
}var w=0;
var h=0;
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null&&this.items[i].image!=null){
var imageSize=O$.getImageSize(this.items[i].image);
w=Math.max(w,imageSize.x);
h=Math.max(h,imageSize.y);
}}
this.imgMaxHeight=h;
this.imgMaxWidth=w;
return new $wt.graphics.Point(w,h);
});
$_M(c$,"calculateTextsMaxSize",
function(){
if(!this.containsText){
return new $wt.graphics.Point(0,0);
}var w=0;
var h=0;
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&item.text!=null&&item.text.length!=0){
var textSize=O$.getStringStyledSize(item.text,"tool-item-text",null);
w=Math.max(w,textSize.x);
item.cachedTextWidth=textSize.x;
h=Math.max(h,textSize.y);
item.cachedTextHeight=textSize.y;
}}
this.txtMaxHeight=h;
this.txtMaxWidth=w;
return new $wt.graphics.Point(w,h);
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var width=0;
var height=0;
this.calculateImagesMaxSize();
this.calculateTextsMaxSize();
if((this.style&512)!=0){
var count=this.items.length;
this.cachedMaxItemWidth=0;
for(var i=0;i<count;i++){
var item=this.items[i];
item.isInnerBounds=true;
var rect=item.getBounds();
item.isInnerBounds=false;
if((item.style&2)!=0){
this.cachedMaxItemWidth=Math.max(this.cachedMaxItemWidth,rect.width-this.getBorderWidth()*2);
}else{
this.cachedMaxItemWidth=Math.max(this.cachedMaxItemWidth,rect.width);
}height+=rect.height;
if((item.style&2)!=0){
width=Math.max(width,24);
}else{
width=Math.max(width,rect.width);
}}
if((this.style&8388608)==0)height+=2;
}else{
var count=this.items.length;
for(var i=0;i<count;i++){
this.items[i].isInnerBounds=true;
var rect=this.items[i].getBounds();
this.items[i].isInnerBounds=false;
if((this.style&8388608)!=0){
height=Math.max(height,rect.height);
}else{
height=Math.max(height,rect.height+2);
}width+=rect.width;
}
}if(width==0)width=24;
if(height==0)height=22;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
var trim=this.computeTrim(0,0,width,height);
width=trim.width;
height=trim.height;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_M(c$,"computeTrim",
function(x,y,width,height){
var trim=$_U(this,$wt.widgets.ToolBar,"computeTrim",[x,y,width,height]);
if((this.style&8)!=0)trim.height+=2;
return trim;
},"~N,~N,~N,~N");
$_M(c$,"createHandle",
function(){
$_U(this,$wt.widgets.ToolBar,"createHandle",[]);
this.state&=-3;
this.items=new Array(0);
this.lastFocusId=-1;
var css=new Array(0);
css[0]="tool-bar-default";
if((this.style&512)!=0){
css[css.length]="tool-bar-vertical";
}else{
css[css.length]="tool-bar-horizontal";
}if((this.style&8388608)!=0){
css[css.length]="tool-bar-flat";
}if((this.style&8)!=0){
css[css.length]="tool-bar-shadow-out";
}if((this.style&64)!=0){
css[css.length]="tool-bar-wrap";
}if((this.style&131072)!=0){
css[css.length]="tool-bar-right";
}var s="";
s=css.join(" ");
this.handle.className+=s;
var shadow=d$.createElement("DIV");
shadow.className="tool-bar-shadow";
this.handle.appendChild(shadow);
this.btnFocus=d$.createElement("BUTTON");
this.btnFocus.className="tool-bar-focus";
this.handle.appendChild(shadow);
});
$_M(c$,"createItem",
function(item,index){
var count=this.items.length;
var id=this.items.length;
this.items[item.id=id]=item;
var cssName="tool-item-default";
var el=null;
if((item.style&2)!=0){
el=d$.createElement("DIV");
this.handle.appendChild(el);
cssName+="tool-item-seperator";
item.seperatorWidth=-1;
}else if((item.style&4)!=0){
el=d$.createElement("DIV");
this.handle.appendChild(el);
item.dropDownEl=d$.createElement("DIV");
item.dropDownEl.className="tool-item-drop-down-button";
el.appendChild(item.dropDownEl);
var btnArrow=d$.createElement("DIV");
btnArrow.className="tool-item-button-arrow-down";
item.dropDownEl.appendChild(btnArrow);
cssName+="tool-item-drop-down";
}else{
el=d$.createElement("DIV");
this.handle.appendChild(el);
}el.className=cssName;
item.handle=el;
if((this.style&512)!=0)this.setRowCount(count+1);
this.layoutItems();
},"$wt.widgets.ToolItem,~N");
$_M(c$,"destroyItem",
function(item){
item.releaseResources();
for(var i=0;i<this.items.length;i++){
if(this.items[i]===item){
this.items[i]=null;
}}
this.layoutItems();
},"$wt.widgets.ToolItem");
$_M(c$,"enableWidget",
function(enabled){
$_U(this,$wt.widgets.ToolBar,"enableWidget",[enabled]);
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null){
if((item.style&(48))!=0){
item.updateImages(enabled&&item.getEnabled());
}}}
O$.updateCSSClass(this.handle,"tool-bar-disabled",!enabled);
},"~B");
$_M(c$,"getDisabledImageList",
function(){
return this.disabledImageList;
});
$_M(c$,"getHotImageList",
function(){
return this.hotImageList;
});
$_M(c$,"getImageList",
function(){
return this.imageList;
});
$_M(c$,"getItem",
function(index){
var count=this.items.length;
return this.items[index];
},"~N");
$_M(c$,"getItem",
function(point){
var items=this.getItems();
for(var i=0;i<items.length;i++){
var rect=items[i].getBounds();
if(rect.contains(point))return items[i];
}
return null;
},"$wt.graphics.Point");
$_M(c$,"getItemCount",
function(){
return this.items.length;
});
$_M(c$,"getItems",
function(){
return this.items;
});
$_M(c$,"getRowCount",
function(){
return 1;
});
$_M(c$,"indexOf",
function(item){
var idx=-1;
for(var i=0;i<this.items.length;i++){
if(this.items[i]!=null){
idx++;
if(this.items[i]===item){
break;
}}}
return idx;
},"$wt.widgets.ToolItem");
$_M(c$,"layoutItems",
function(){
if((this.style&64)!=0){
try{
this.handle.style.whiteSpace="wrap";
}catch(e){
if($_O(e,Exception)){
}else{
throw e;
}
}
}if((this.style&512)!=0){
}for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null)item.resizeControl();
}
});
$_V(c$,"mnemonicHit",
function(ch){
return true;
},"~N");
$_V(c$,"mnemonicMatch",
function(ch){
return false;
},"~N");
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
item.releaseImages();
item.releaseResources();
}}
this.items=null;
if(this.btnFocus!=null){
O$.destroyHandle(this.btnFocus);
this.btnFocus=null;
}this.imageList=this.hotImageList=this.disabledImageList=null;
$_U(this,$wt.widgets.ToolBar,"releaseWidget",[]);
});
$_M(c$,"removeControl",
function(control){
$_U(this,$wt.widgets.ToolBar,"removeControl",[control]);
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&item.control===control){
item.setControl(null);
}}
},"$wt.widgets.Control");
$_M(c$,"setBounds",
function(x,y,width,height,flags){
if(this.parent.lpwp!=null){
}$_U(this,$wt.widgets.ToolBar,"setBounds",[x,y,width,height,flags]);
},"~N,~N,~N,~N,~N");
$_M(c$,"setDisabledImageList",
function(imageList){
if(this.disabledImageList===imageList)return;
},"$wt.widgets.ImageList");
$_M(c$,"setFont",
function(font){
$_U(this,$wt.widgets.ToolBar,"setFont",[font]);
var index=0;
var mask=60;
while(index<this.items.length){
var item=this.items[index];
if(item!=null&&(item.style&mask)!=0)break;
index++;
}
if(index==this.items.length){
}this.layoutItems();
},"$wt.graphics.Font");
$_M(c$,"setHotImageList",
function(imageList){
if(this.hotImageList===imageList)return;
},"$wt.widgets.ImageList");
$_M(c$,"setImageList",
function(imageList){
if(this.imageList===imageList)return;
},"$wt.widgets.ImageList");
$_M(c$,"setParent",
function(parent){
if(!$_U(this,$wt.widgets.ToolBar,"setParent",[parent]))return false;
return true;
},"$wt.widgets.Composite");
$_M(c$,"setRowCount",
function(count){
},"~N");
$_M(c$,"setTabItemFocus",
function(){
var index=0;
while(index<this.items.length){
var item=this.items[index];
if(item!=null&&(item.style&2)==0){
if(item.getEnabled())break;
}index++;
}
if(index==this.items.length)return false;
return $_U(this,$wt.widgets.ToolBar,"setTabItemFocus",[]);
});
$_M(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
var border=3;
if((this.style&8388608)!=0){
border=2;
}for(var i=0;i<this.items.length;i++){
var item=this.items[i];
var bounds=item.getBounds();
var w=bounds.width;
var h=bounds.height;
if((item.style&4)!=0){
w-=8+2+border;
}if((this.style&8388608)!=0){
h-=1;
if((item.style&2)==0){
w-=1;
}if((item.style&4)!=0){
w-=1;
}}item.updateItemBounds(w,h);
}
if($_O(this.parent,$wt.widgets.CoolBar)){
X=0;
Y=0;
}var set=$_U(this,$wt.widgets.ToolBar,"SetWindowPos",[hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags]);
return set;
},"~O,~O,~N,~N,~N,~N,~N");
$_S(c$,
"$DEFAULT_WIDTH",24,
"$DEFAULT_HEIGHT",22);
});
