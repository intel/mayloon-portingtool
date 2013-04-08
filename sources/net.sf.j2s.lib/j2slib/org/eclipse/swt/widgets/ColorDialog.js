$_L(["$wt.widgets.Dialog"],"$wt.widgets.ColorDialog",["$wt.graphics.RGB","$wt.internal.ResizeSystem","$.RunnableCompatibility","$wt.internal.browser.OS","$wt.internal.dnd.DragAdapter","$.DragAndDrop","$.HTMLEventWrapper","$wt.layout.GridData","$.GridLayout","$wt.widgets.Composite","$.Shell"],function(){
$WTC$$.registerCSS ("$wt.widgets.ColorDialog", ".color-dialog {\nposition:absolute;\nfont-size:0;\nwidth:200px;\nheight:280px;\nbackground-color:buttonface;\noverflow:hidden;\n}\n.color-dialog-custom {\nwidth:480px;\n}\n.color-dialog-label {\nclear:both;\nwhite-space:nowrap;\ncursor:default;\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\noverflow:hidden;\ncolor:black;\n}\n.basic-panel {\nposition:absolute;\nleft:0;\ntop:0;\nwidth:200px;\n}\n.custom-panel {\nposition:absolute;\nright:0;\ntop:0;\nwidth:250px;\npadding:0 4px;\ndisplay:none;\n}\n.color-dialog-custom .custom-panel {\ndisplay:block;\n}\n.color-diaglog button {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\noverflow:hidden;\ncolor:black;\n}\n.define-custom-colors-button, .color-dialog-button, .add-to-custom-colors-button {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\noverflow:hidden;\ncolor:black;\nmargin:2px;\nheight:22px;\npadding-bottom:2px;\n}\n@media all and (min-width:0px){/* opera */\n.define-custom-colors-button, .color-dialog-button, .add-to-custom-colors-button {\nborder-width:2px;\nborder-style:solid;\nbackground-color:buttonface;\nborder-color:#f0f0f0 #303030 #303030 #f0f0f0;\n}\n}\n.define-custom-colors-button {\nwidth:196px;\n}\n.add-to-custom-colors-button {\nwidth:240px;\nmargin:2px 0;\n}\n.color-dialog-button {\nwidth:56px;\n}\n.color-dialog-label span {\ntext-decoration:underline;\n}\n.color-dialog button span {\ntext-decoration:underline;\n}\n.basic-colors-grid {\nwidth:200px;\n_width:201px;\nheight:120px;\nmargin-top:2px;\nmargin-bottom:22px;\n_margin-bottom:16px;\n}\n.custom-colors-grid {\nwidth:200px;\n_width:201px;\nheight:32px;\nmargin-top:2px;\nmargin-bottom:20px;\n_margin-bottom:16px;\n}\n.box-focus {\nfloat:left;\nmargin:1px;\nborder:1px solid buttonface;\nwidth:21px;\nheight:16px;\n}\n.box-select {\nborder:1px solid buttonface;\nwidth:19px;\nheight:14px;\n}\n.box-focus:hover {\nborder:1px dotted black;\n}\n.color-selected {\nborder:1px solid black;\n}\n.color-box {\nborder-style:solid;\nborder-color:#666 #ddd #ddd #666;\nborder-width:2px;\nwidth:15px;\nheight:10px;\nbackground-color:white;\n}\n.color-picker-panel {\nwidth:250px;\nheight:180px;\n}\n.color-hs-block {\nposition:absolute;\nleft:4px;\nwidth:198px;\nheight:172px;\nbackground-image:url(\'images/color-dialog.png\');\nbackground-position:left top;\nbackground-repeat:no-repeat;\nborder:1px inset white;\noverflow:hidden;\n}\n.color-cross-picker {\nposition:absolute;\nleft:30px;\ntop:30px;\n}\n.color-cross-picker div {\nposition:absolute;\nbackground-color:black;\nfont-size:0;\nwidth:3px;\nheight:3px;\n}\ndiv.color-cross-top {\ntop:-10px;\nleft:-1px;\nheight:5px;\n}\ndiv.color-cross-bottom {\nleft:-1px;\ntop:5px;\nheight:5px;\n}\ndiv.color-cross-left {\nleft:-10px;\ntop:-1px;\nwidth:5px;\n}\ndiv.color-cross-right {\nleft:5px;\ntop:-1px;\nwidth:5px;\n}\n.color-l-picker {\nposition:absolute;\nright:0px;\nheight:172px;\nwidth:32px;\n}\n.color-strip {\nposition:absolute;\ntop:0;\nright:16px;\nborder:1px inset white;\nwidth:24px;\nheight:172px;\nbackground-color:navy;\noverflow:hidden;\n}\n.color-strip div {\nfont-size:0;\nwidth:100%;\nheight:6px;\nbackground-color:gray;\n}\n.color-slider {\nposition:absolute;\ntop:0;\nright:8px;\nmargin:auto;\nheight:0;\nwidth:0;\nfont-size:0;\nline-height:0;\nborder-style:solid solid solid none;\nborder-color:buttonface;\nborder-right-color:black;\nborder-width:5px;\nborder-left-width:0;\n}\n.color-selector-panel {\nmargin:2px 0;\nheight:68px;\n_height:66px;\noverflow:hidden;\n}\n.color-preview {\nposition:relative;\nwidth:70px;\nheight:54px;\nfloat:left;\n}\n.color-preview-block {\nwidth:60px;\nheight:39px;\nborder:1px inset white;\nmargin:2px 0;\nbackground-color:blue;\n}\n.color-hsl-selector {\nposition:relative;\nwidth:85px;\nheight:54px;\nfloat:left;\n}\n.color-rgb-selector {\nposition:relative;\nwidth:85px;\nheight:54px;\nfloat:left;\n}\n.color-dialog-selector {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\nwidth:22px;\n_width:20px;\nheight:9pt;\nfloat:right;\nmargin:2px;\n}\n.color-hsl-selector .color-dialog-label {\nwidth:46px;\ntext-align:right;\nfloat:left;\nmargin:2px;\nheight:19px;\n}\n.color-rgb-selector .color-dialog-label {\nwidth:46px;\ntext-align:right;\nfloat:left;\nmargin:4px 2px 2px 2px;\nheight:17px;\n_height:16px;\n}\n.swt-widgets-colordialog {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.rgb = null;
this.selectedCustomIndex = 0;
this.customButton = null;
this.addToCustomButton = null;
this.okButton = null;
this.cancelButton = null;
this.hText = null;
this.lText = null;
this.sText = null;
this.rText = null;
this.gText = null;
this.bText = null;
this.basicColorBoxes = null;
this.customColorBoxes = null;
this.colorStrips = null;
this.previewBlock = null;
this.colorBlock = null;
this.hsPicker = null;
this.stripBlock = null;
this.lPicker = null;
this.updateRGBRunnable = null;
this.updateHSLRunnable = null;
this.hColorBlockClick = null;
this.hStripBlockClick = null;
this.hAdd2CustomClick = null;
this.hCustomClick = null;
this.hOKClick = null;
this.hCancelClick = null;
this.basicColorBoxClicks = null;
this.customColorBoxClicks = null;
this.dnd = null;
$_Z (this, arguments);
}, $wt.widgets, "ColorDialog", $wt.widgets.Dialog);
$_K (c$, 
function (parent) {
this.construct (parent, 32768);
}, "$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.ColorDialog,[parent,style]);
},"$wt.widgets.Shell,~N");
$_M(c$,"getRGB",
function(){
return this.rgb;
});
$_M(c$,"releaseHandles",
function(){
if(this.dnd!=null){
this.dnd.unbind();
this.dnd=null;
}var hsl=[this.hText,this.sText,this.lText];
for(var i=0;i<hsl.length;i++){
if(hsl[i]!=null){
Clazz.removeEvent(hsl[i],"change",this.updateRGBRunnable);
Clazz.removeEvent(hsl[i],"keyup",this.updateRGBRunnable);
O$.destroyHandle(hsl[i]);
}}
var rgb=[this.rText,this.gText,this.bText];
for(var i=0;i<rgb.length;i++){
if(rgb[i]!=null){
Clazz.removeEvent(rgb[i],"change",this.updateHSLRunnable);
Clazz.removeEvent(rgb[i],"keyup",this.updateHSLRunnable);
O$.destroyHandle(rgb[i]);
}}
this.hText=null;
this.sText=null;
this.lText=null;
this.rText=null;
this.gText=null;
this.bText=null;
this.updateHSLRunnable=null;
this.updateRGBRunnable=null;
if(this.customButton!=null){
O$.destroyHandle(this.customButton);
this.customButton=null;
}if(this.addToCustomButton!=null){
O$.destroyHandle(this.addToCustomButton);
this.addToCustomButton=null;
}if(this.okButton!=null){
O$.destroyHandle(this.okButton);
this.okButton=null;
}if(this.cancelButton!=null){
O$.destroyHandle(this.cancelButton);
this.cancelButton=null;
}if(this.hsPicker!=null){
O$.destroyHandle(this.hsPicker);
this.hsPicker=null;
}if(this.lPicker!=null){
O$.destroyHandle(this.lPicker);
this.lPicker=null;
}if(this.stripBlock!=null){
O$.destroyHandle(this.stripBlock);
this.stripBlock=null;
}if(this.colorBlock!=null){
O$.destroyHandle(this.colorBlock);
this.colorBlock=null;
}for(var i=0;i<this.basicColorBoxes.length;i++){
if(this.basicColorBoxes[i]!=null){
if(this.basicColorBoxClicks[i]!=null){
Clazz.removeEvent(this.basicColorBoxes[i],"click",this.basicColorBoxClicks[i]);
this.basicColorBoxClicks[i]=null;
}O$.destroyHandle(this.basicColorBoxes[i]);
this.basicColorBoxes[i]=null;
}}
for(var i=0;i<this.customColorBoxes.length;i++){
if(this.customColorBoxes[i]!=null){
if(this.customColorBoxClicks[i]!=null){
Clazz.removeEvent(this.customColorBoxes[i],"click",this.customColorBoxClicks[i]);
this.customColorBoxClicks[i]=null;
}O$.destroyHandle(this.customColorBoxes[i]);
this.customColorBoxes[i]=null;
}}
});
$_M(c$,"open",
function(){
if(this.rgb==null){
if($wt.widgets.ColorDialog.lastSelectedColor!=null){
this.rgb=$wt.widgets.ColorDialog.lastSelectedColor;
}else{
this.rgb=new $wt.graphics.RGB(0,0,0);
}}this.dialogShell=(($_D("$wt.widgets.ColorDialog$1")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$1$()),$_N($wt.widgets.ColorDialog$1,this,null,this.parent.display,this.style|64|65536));
this.dialogShell.setLayout(new $wt.layout.GridLayout());
var composite=new $wt.widgets.Composite(this.dialogShell,0);
var buf=new Array(0);
buf[buf.length]="<div class=\"color-dialog\">";
buf[buf.length]="<div class=\"basic-panel\">";
buf[buf.length]="<div class=\"color-dialog-label\"><span>B</span>asic colors:</div>";
buf[buf.length]="<div class=\"basic-colors-grid\">";
var map=new JavaObject();
var colorMap=new JavaObject();
var colors=null;
colors=[
"apple green",128,255,0,
"aqua",0,255,255,
"black",0,0,0,
"blue",0,0,255,
"blueviolet",128,0,255,
"chocolate",128,64,64,
"dark blueviolet",64,0,128,
"dark brown",64,0,0,
"dark forest green",0,64,0,
"dark olive",128,128,64,
"dark orange",255,128,0,
"dark purple",64,0,64,
"dark purple",64,0,64,
"dark red",128,0,0,
"dark teal",0,64,64,
"dark turquoise",0,64,128,
"deep sky blue",0,128,255,
"green",0,128,0,
"grey",128,128,128,
"light green",0,255,64,
"light grey",192,192,192,
"light teal",64,128,128,
"lime",0,255,0,
"magenta",255,0,255,
"maroon",128,0,64,
"medium blue",0,0,160,
"medium slate blue",128,128,255,
"midnight blue",0,0,64,
"navy",0,0,128,
"olive",128,128,0,
"pale green",128,255,128,
"pale rose",255,128,192,
"pale slate blue",128,128,192,
"pale turquoise",128,255,255,
"pale yellow",255,255,128,
"pink",255,128,255,
"pumpkin",255,128,64,
"purple",128,0,128,
"red",255,0,0,
"rose",255,0,128,
"saddle brown",128,64,0,
"salmon",255,128,128,
"sea green",0,128,64,
"spring green",0,255,128,
"teal",0,128,128,
"turquoise",0,128,192,
"white",255,255,255,
"yellow",255,255,0
];
for(var i=0;i<48;i++){
var i4=i+i+i+i;
var arr=[colors[i4+1],colors[i4+2],colors[i4+3]];
colorMap[colors[i4]]=arr;
map[colors[i4]]=arr.join(',');
}
var colorMatrix=["salmon","pale yellow","pale green","spring green","pale turquoise","deep sky blue","pale rose","pink","red","yellow","apple green","light green","aqua","turquoise","pale slate blue","magenta","chocolate","pumpkin","lime","teal","dark turquoise","medium slate blue","maroon","rose","dark red","dark orange","green","sea green","blue","medium blue","purple","blueviolet","dark brown","saddle brown","dark forest green","dark teal","navy","midnight blue","dark purple","dark blueviolet","black","olive","dark olive","grey","light teal","light grey","dark purple","white"];
var selected=false;
for(var i=0;i<48;i++){
buf[buf.length]="<div class=\"box-focus\"><div class=\"box-select";
if(!selected){
var rgbColor=null;
rgbColor=colorMap[colorMatrix[i]];
if(this.rgb.red==rgbColor[0]&&this.rgb.green==rgbColor[1]&&this.rgb.blue==rgbColor[2]){
buf[buf.length]="color-selected";
selected=true;
}}buf[buf.length]="\"><div class=\"color-box\"style=\"background-color:rgb(";
buf[buf.length]=map[colorMatrix[i]];
buf[buf.length]=");\"";
buf[buf.length]="></div></div></div>";
}
buf[buf.length]="</div>";
buf[buf.length]="<div class=\"color-dialog-label\"><span>C</span>ustom colors:</div>";
buf[buf.length]="<div class=\"custom-colors-grid\">";
for(var i=0;i<16;i++){
buf[buf.length]="<div class=\"box-focus\"><div class=\"box-select\"><div class=\"color-box\"></div></div></div>";
}
buf[buf.length]="</div>";
buf[buf.length]="<button class=\"define-custom-colors-button\"><span>D</span>efine Custom Colors &gt;&gt;</button>";
buf[buf.length]="<div class=\"color-dialog-button-panel\">";
buf[buf.length]="<button class=\"color-dialog-button ok-button\">OK</button>";
buf[buf.length]="<button class=\"color-dialog-button cancel-button\">Cancel</button>";
buf[buf.length]="</div>";
buf[buf.length]="</div>";
buf[buf.length]="<div class=\"custom-panel\">";
buf[buf.length]="<div class=\"color-picker-panel\">";
buf[buf.length]="<div class=\"color-hs-block\">";
buf[buf.length]="<div class=\"color-cross-picker\">";
buf[buf.length]="<div class=\"color-cross-top\"></div>";
buf[buf.length]="<div class=\"color-cross-right\"></div>";
buf[buf.length]="<div class=\"color-cross-bottom\"></div>";
buf[buf.length]="<div class=\"color-cross-left\"></div>";
buf[buf.length]="</div>";
buf[buf.length]="</div>";
buf[buf.length]="<div class=\"color-l-picker\">";
buf[buf.length]="<div class=\"color-strip\">";
for(var i=0;i<29;i++){
buf[buf.length]="<div></div>";
}
buf[buf.length]="</div>";
buf[buf.length]="<div class=\"color-slider\"></div>";
buf[buf.length]="</div>";
buf[buf.length]="</div>";
buf[buf.length]="<div class=\"color-selector-panel\">";
buf[buf.length]="<div class=\"color-preview\">";
buf[buf.length]="<div class=\"color-preview-block\"></div>";
buf[buf.length]="<div class=\"color-dialog-label\">Color|Soli<span>d</span></div>";
buf[buf.length]="</div>";
buf[buf.length]="<div class=\"color-hsl-selector\">";
buf[buf.length]="<div class=\"color-dialog-label\">Hu<span>e</span>:</div>";
buf[buf.length]="<input class=\"color-dialog-selector\"value=\"0\"/>";
buf[buf.length]="<div class=\"color-dialog-label\"><span>S</span>at:</div>";
buf[buf.length]="<input class=\"color-dialog-selector\"value=\"0\"/>";
buf[buf.length]="<div class=\"color-dialog-label\"><span>L</span>um:</div>";
buf[buf.length]="<input class=\"color-dialog-selector\"value=\"0\"/>";
buf[buf.length]="<div class=\"color-dialog-label\"></div>";
buf[buf.length]="</div>";
buf[buf.length]="<div class=\"color-rgb-selector\">";
buf[buf.length]="<div class=\"color-dialog-label\"><span>R</span>ed:</div>";
buf[buf.length]="<input class=\"color-dialog-selector\"value=\"0\"/>";
buf[buf.length]="<div class=\"color-dialog-label\"><span>G</span>reen:</div>";
buf[buf.length]="<input class=\"color-dialog-selector\"value=\"0\"/>";
buf[buf.length]="<div class=\"color-dialog-label\">Bl<span>u</span>e:</div>";
buf[buf.length]="<input class=\"color-dialog-selector\"value=\"0\"/>";
buf[buf.length]="<div class=\"color-dialog-label\"></div>";
buf[buf.length]="</div>";
buf[buf.length]="</div>";
buf[buf.length]="<button class=\"add-to-custom-colors-button\"><span>A</span>dd to Custom Colors</button>";
buf[buf.length]="</div>";
buf[buf.length]="</div>";
var tmpStr=null;
tmpStr=buf.join('');
var containerHandle=composite.containerHandle();
containerHandle.innerHTML=tmpStr;
composite.setLayoutData(new $wt.layout.GridData(200,280));
var btns=containerHandle.getElementsByTagName("BUTTON");
for(var i=0;i<btns.length;i++){
var btn=btns[i];
var cssClass=btns[i].className;
if(cssClass==="define-custom-colors-button"){
this.customButton=btn;
}else if(cssClass==="add-to-custom-colors-button"){
this.addToCustomButton=btn;
}else if(cssClass.indexOf("ok-button")!=-1){
this.okButton=btn;
}else if(cssClass.indexOf("cancel-button")!=-1){
this.cancelButton=btn;
}}
var dialogEl=containerHandle.childNodes[0];
this.hCustomClick=$_Q((($_D("$wt.widgets.ColorDialog$2")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$2$()),$_N($wt.widgets.ColorDialog$2,this,$_F("composite",composite,"containerHandle",containerHandle))));
Clazz.addEvent(this.customButton,"click",this.hCustomClick);
this.hOKClick=$_Q((($_D("$wt.widgets.ColorDialog$3")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$3$()),$_N($wt.widgets.ColorDialog$3,this,null)));
Clazz.addEvent(this.okButton,"click",this.hOKClick);
this.hCancelClick=$_Q((($_D("$wt.widgets.ColorDialog$4")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$4$()),$_N($wt.widgets.ColorDialog$4,this,null)));
Clazz.addEvent(this.cancelButton,"click",this.hCancelClick);
var inputs=containerHandle.getElementsByTagName("INPUT");
this.hText=inputs[0];
this.lText=inputs[1];
this.sText=inputs[2];
this.rText=inputs[3];
this.gText=inputs[4];
this.bText=inputs[5];
var customEl=dialogEl.childNodes[1];
this.previewBlock=customEl.childNodes[1].childNodes[0].childNodes[0];
var colorPanel=customEl.childNodes[0];
this.hsPicker=colorPanel.childNodes[0].childNodes[0];
this.colorBlock=colorPanel.childNodes[0];
this.stripBlock=colorPanel.childNodes[1].childNodes[0];
this.lPicker=colorPanel.childNodes[1].childNodes[1];
var basicEl=dialogEl.childNodes[0];
this.basicColorBoxes=this.copyChildNodes(basicEl.childNodes[1]);
this.customColorBoxes=this.copyChildNodes(basicEl.childNodes[3]);
this.colorStrips=this.copyChildNodes(colorPanel.childNodes[1].childNodes[0]);
this.basicColorBoxClicks=new Array(this.basicColorBoxes.length);
this.customColorBoxClicks=new Array(this.customColorBoxes.length);
for(var i=0;i<this.basicColorBoxes.length;i++){
var index=i;
this.basicColorBoxClicks[i]=$_Q((($_D("$wt.widgets.ColorDialog$5")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$5$()),$_N($wt.widgets.ColorDialog$5,this,$_F("index",index,"colorMap",colorMap,"colorMatrix",colorMatrix))));
Clazz.addEvent(this.basicColorBoxes[i],"click",this.basicColorBoxClicks[i]);
}
for(var i=0;i<this.customColorBoxes.length;i++){
var index=i;
this.customColorBoxClicks[i]=$_Q((($_D("$wt.widgets.ColorDialog$6")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$6$()),$_N($wt.widgets.ColorDialog$6,this,$_F("index",index))));
Clazz.addEvent(this.customColorBoxes[i],"click",this.customColorBoxClicks[i]);
if($wt.widgets.ColorDialog.customColors[i]!=null){
var color=$wt.widgets.ColorDialog.customColors[i];
this.customColorBoxes[i].childNodes[0].childNodes[0].style.backgroundColor="rgb("+color.red+","+color.green+","+color.blue+")";
}}
this.updateFromRGB(this.rgb.red,this.rgb.green,this.rgb.blue);
var h=this.constrain(this.hText,239);
var s=this.constrain(this.sText,240);
var l=this.constrain(this.lText,240);
this.updateFromHSL(h,s,l);
this.dialogShell.setText((this.title==null||this.title.length==0)?"Color":this.title);
this.dialogShell.pack();
this.dialogShell.open();
var size=this.dialogShell.getSize();
var y=Math.floor((this.dialogShell.getMonitor().clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}this.dialogShell.setLocation(Math.floor((this.dialogShell.getMonitor().clientWidth-size.x)/2),y);
$wt.internal.ResizeSystem.register(this.dialogShell,16777216);
var display=this.parent.getDisplay();
Sync2Async.block(this.dialogShell,this,function(){
return this.rgb;
});
return;
});
$_M(c$,"configureCustomPanel",
function(){
this.hAdd2CustomClick=$_Q((($_D("$wt.widgets.ColorDialog$7")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$7$()),$_N($wt.widgets.ColorDialog$7,this,null)));
Clazz.addEvent(this.addToCustomButton,"click",this.hAdd2CustomClick);
this.dnd=new $wt.internal.dnd.DragAndDrop();
this.dnd.addDragListener((($_D("$wt.widgets.ColorDialog$8")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$8$()),$_N($wt.widgets.ColorDialog$8,this,null)));
this.dnd.bind(this.lPicker);
this.hColorBlockClick=$_Q((($_D("$wt.widgets.ColorDialog$9")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$9$()),$_N($wt.widgets.ColorDialog$9,this,null)));
Clazz.addEvent(this.colorBlock,"click",this.hColorBlockClick);
this.hStripBlockClick=$_Q((($_D("$wt.widgets.ColorDialog$10")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$10$()),$_N($wt.widgets.ColorDialog$10,this,null)));
Clazz.addEvent(this.hStripBlockClick,"click",this.hStripBlockClick);
this.updateRGBRunnable=$_Q((($_D("$wt.widgets.ColorDialog$11")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$11$()),$_N($wt.widgets.ColorDialog$11,this,null)));
this.updateHSLRunnable=$_Q((($_D("$wt.widgets.ColorDialog$12")?0:org.eclipse.swt.widgets.ColorDialog.$ColorDialog$12$()),$_N($wt.widgets.ColorDialog$12,this,null)));
var hsl=[this.hText,this.sText,this.lText];
for(var i=0;i<hsl.length;i++){
Clazz.addEvent(hsl[i],"change",this.updateRGBRunnable);
Clazz.addEvent(hsl[i],"keyup",this.updateRGBRunnable);
}
var rgb=[this.rText,this.gText,this.bText];
for(var i=0;i<rgb.length;i++){
Clazz.addEvent(rgb[i],"change",this.updateHSLRunnable);
Clazz.addEvent(rgb[i],"keyup",this.updateHSLRunnable);
}
});
$_M(c$,"constrain",
function(el,max){
var textEl=el;
var val=Integer.parseInt(textEl.value);
if(val<0){
val=0;
textEl.value="0";
textEl.select();
}else if(val>max){
val=max;
textEl.value=""+max;
textEl.select();
}return val;
},"~O,~N");
$_M(c$,"setRGB",
function(rgb){
this.rgb=rgb;
},"$wt.graphics.RGB");
$_M(c$,"updateFromHSL",
function(h,s,l){
var rgb=new $wt.widgets.ColorDialog.HSL(h,s,l).toRGB();
this.rText.value=""+rgb.red;
this.gText.value=""+rgb.green;
this.bText.value=""+rgb.blue;
this.previewBlock.style.backgroundColor="rgb("+rgb.red+","+rgb.green+","+rgb.blue+")";
this.hsPicker.style.left=Math.floor(h*198/239)+"px";
this.hsPicker.style.top=Math.floor((240-s)*172/240)+"px";
this.lPicker.style.top=Math.floor((240-l-5)*172/240)+"px";
this.updateColorStrip(h,s);
},"~N,~N,~N");
$_M(c$,"updateFromRGB",
function(r,g,b){
var hsl=new $wt.widgets.ColorDialog.HSL(0,0,0);
hsl.fromRGB(new $wt.graphics.RGB(r,g,b));
this.hText.value=""+hsl.h;
this.sText.value=""+hsl.s;
this.lText.value=""+hsl.l;
this.previewBlock.style.backgroundColor="rgb("+r+","+g+","+b+")";
this.hsPicker.style.left=Math.floor(hsl.h*198/239)+"px";
this.hsPicker.style.top=Math.floor((240-hsl.s)*172/240)+"px";
this.lPicker.style.top=Math.floor((240-hsl.l-5)*172/240)+"px";
this.updateColorStrip(hsl.h,hsl.s);
},"~N,~N,~N");
$_M(c$,"updateColorStrip",
function(h,s){
for(var i=0;i<this.colorStrips.length;i++){
var l=240-Math.floor(i*240/29);
var rgb=new $wt.widgets.ColorDialog.HSL(h,s,l).toRGB();
this.colorStrips[i].style.backgroundColor="rgb("+rgb.red+","+rgb.green+","+rgb.blue+")";
}
},"~N,~N");
$_M(c$,"switchColorBox",
function(index){
if(index>48){
for(var i=0;i<this.basicColorBoxes.length;i++){
O$.removeCSSClass(this.basicColorBoxes[i].childNodes[0],"color-selected");
}
for(var i=0;i<this.customColorBoxes.length;i++){
O$.updateCSSClass(this.customColorBoxes[i].childNodes[0],"color-selected",i==index-48);
}
}else{
for(var i=0;i<this.basicColorBoxes.length;i++){
O$.updateCSSClass(this.basicColorBoxes[i].childNodes[0],"color-selected",i==index);
}
for(var i=0;i<this.customColorBoxes.length;i++){
O$.removeCSSClass(this.customColorBoxes[i].childNodes[0],"color-selected");
}
}},"~N");
$_M(c$,"copyChildNodes",
function(o){
var el=o;
var length=el.childNodes.length;
var childNodes=new Array(length);
for(var i=0;i<length;i++){
childNodes[i]=el.childNodes[i];
}
return childNodes;
},"~O");
c$.$ColorDialog$1$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$1",$wt.widgets.Shell);
$_M(c$,"releaseHandle",
function(){
this.b$["$wt.widgets.ColorDialog"].releaseHandles();
$_U(this,$wt.widgets.ColorDialog$1,"releaseHandle",[]);
});
c$=$_P();
};
c$.$ColorDialog$2$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.f$.composite.setLayoutData(new $wt.layout.GridData(480,280));
this.b$["$wt.widgets.ColorDialog"].dialogShell.pack();
this.b$["$wt.widgets.ColorDialog"].customButton.disabled=true;
this.b$["$wt.widgets.ColorDialog"].customButton.style.color="gray";
this.b$["$wt.widgets.ColorDialog"].configureCustomPanel();
O$.addCSSClass(this.f$.containerHandle.childNodes[0],"color-dialog-custom");
});
c$=$_P();
};
c$.$ColorDialog$3$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var r=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].rText,255);
var g=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].gText,255);
var b=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].bText,255);
($t$=$wt.widgets.ColorDialog.lastSelectedColor=this.b$["$wt.widgets.ColorDialog"].rgb=new $wt.graphics.RGB(r,g,b),$wt.widgets.ColorDialog.prototype.lastSelectedColor=$wt.widgets.ColorDialog.lastSelectedColor,$t$);
this.b$["$wt.widgets.ColorDialog"].dialogReturn=this.b$["$wt.widgets.ColorDialog"].rgb;
this.b$["$wt.widgets.ColorDialog"].dialogShell.close();
});
c$=$_P();
};
c$.$ColorDialog$4$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$4",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.ColorDialog"].dialogShell.close();
});
c$=$_P();
};
c$.$ColorDialog$5$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$5",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var i=this.f$.index;
var rgbColor=null;
var map=this.f$.colorMap;
var matrix=this.f$.colorMatrix;
rgbColor=colorMap[matrix[i]];
var hsl=new $wt.widgets.ColorDialog.HSL(0,0,0);
hsl.fromRGB(new $wt.graphics.RGB(rgbColor[0],rgbColor[1],rgbColor[2]));
this.b$["$wt.widgets.ColorDialog"].updateFromHSL(hsl.h,hsl.s,hsl.l);
this.b$["$wt.widgets.ColorDialog"].updateFromRGB(rgbColor[0],rgbColor[1],rgbColor[2]);
this.b$["$wt.widgets.ColorDialog"].switchColorBox(i);
});
c$=$_P();
};
c$.$ColorDialog$6$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$6",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var rgb=$wt.widgets.ColorDialog.customColors[this.f$.index];
if(rgb==null){
rgb=new $wt.graphics.RGB(255,255,255);
}var hsl=new $wt.widgets.ColorDialog.HSL(0,0,0);
hsl.fromRGB(rgb);
this.b$["$wt.widgets.ColorDialog"].updateFromHSL(hsl.h,hsl.s,hsl.l);
this.b$["$wt.widgets.ColorDialog"].selectedCustomIndex=this.f$.index;
this.b$["$wt.widgets.ColorDialog"].updateFromRGB(rgb.red,rgb.green,rgb.blue);
this.b$["$wt.widgets.ColorDialog"].switchColorBox(this.f$.index+48);
});
c$=$_P();
};
c$.$ColorDialog$7$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$7",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var r=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].rText,255);
var g=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].gText,255);
var b=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].bText,255);
$wt.widgets.ColorDialog.customColors[this.b$["$wt.widgets.ColorDialog"].selectedCustomIndex%16]=new $wt.graphics.RGB(r,g,b);
this.b$["$wt.widgets.ColorDialog"].customColorBoxes[this.b$["$wt.widgets.ColorDialog"].selectedCustomIndex%16].childNodes[0].childNodes[0].style.backgroundColor="rgb("+r+","+g+","+b+")";
this.b$["$wt.widgets.ColorDialog"].selectedCustomIndex=(this.b$["$wt.widgets.ColorDialog"].selectedCustomIndex+1)%16;
});
c$=$_P();
};
c$.$ColorDialog$8$=function(){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.originalTop=0;
$_Z(this,arguments);
},$wt.widgets,"ColorDialog$8",$wt.internal.dnd.DragAdapter);
$_V(c$,"dragging",
function(e){
var top=this.originalTop+e.deltaY();
var l=240-Math.floor(top*240/172);
if(l<0&&this.b$["$wt.widgets.ColorDialog"].lText.value==="0")return true;
if(l>240&&this.b$["$wt.widgets.ColorDialog"].lText.value==="240")return true;
this.b$["$wt.widgets.ColorDialog"].lText.value=""+l;
var h=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].hText,239);
var s=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].sText,240);
l=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].lText,240);
this.b$["$wt.widgets.ColorDialog"].updateFromHSL(h,s,l);
l=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].lText,240);
e.sourceElement.style.top=(172-Math.floor(l*172/240)-5)+"px";
return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragBegan",
function(e){
var style=e.sourceElement.style;
this.originalTop=style.top.length>0?Integer.parseInt(style.top):0;
return true;
},"$wt.internal.dnd.DragEvent");
c$=$_P();
};
c$.$ColorDialog$9$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$9",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var pt=O$.calcuateRelativePosition(this.b$["$wt.widgets.ColorDialog"].colorBlock,d$.body);
var h=Math.floor((e.x-pt.x)*239/198);
var s=240-Math.floor((e.y-pt.y)*240/172);
this.b$["$wt.widgets.ColorDialog"].hText.value=""+h;
this.b$["$wt.widgets.ColorDialog"].sText.value=""+s;
h=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].hText,239);
s=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].sText,240);
var l=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].lText,240);
this.b$["$wt.widgets.ColorDialog"].updateFromHSL(h,s,l);
});
c$=$_P();
};
c$.$ColorDialog$10$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$10",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var e=new $wt.internal.dnd.HTMLEventWrapper(this.getEvent());
var pt=O$.calcuateRelativePosition(this.b$["$wt.widgets.ColorDialog"].stripBlock,d$.body);
var l=240-Math.floor((e.y-pt.y)*240/172);
this.b$["$wt.widgets.ColorDialog"].lText.value=""+l;
var h=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].hText,239);
var s=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].sText,240);
l=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].lText,240);
this.b$["$wt.widgets.ColorDialog"].updateFromHSL(h,s,l);
});
c$=$_P();
};
c$.$ColorDialog$11$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$11",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var h=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].hText,239);
var s=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].sText,240);
var l=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].lText,240);
this.b$["$wt.widgets.ColorDialog"].updateFromHSL(h,s,l);
});
c$=$_P();
};
c$.$ColorDialog$12$=function(){
$_H();
c$=$_W($wt.widgets,"ColorDialog$12",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var r=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].rText,255);
var g=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].gText,255);
var b=this.b$["$wt.widgets.ColorDialog"].constrain(this.b$["$wt.widgets.ColorDialog"].bText,255);
this.b$["$wt.widgets.ColorDialog"].updateFromRGB(r,g,b);
});
c$=$_P();
};
$_H();
c$=$_C(function(){
this.h=0;
this.s=0;
this.l=0;
$_Z(this,arguments);
},$wt.widgets.ColorDialog,"HSL");
$_K(c$,
function(h,s,l){
this.h=h;
this.s=s;
this.l=l;
},"~N,~N,~N");
$_M(c$,"toRGB",
function(){
var r=0;
var g=0;
var b=0;
var temp1;
var temp2;
var H=this.h/240;
var S=this.s/240;
var L=this.l/240;
if(L==0){
r=g=b=0;
}else{
if(S==0){
r=g=b=L;
}else{
temp2=((L<=0.5)?L*(1.0+S):L+S-(L*S));
temp1=2.0*L-temp2;
var t3=[H+0.3333333333333333,H,H-0.3333333333333333];
var clr=[0,0,0];
for(var i=0;i<3;i++){
if(t3[i]<0)t3[i]+=1.0;
if(t3[i]>1)t3[i]-=1.0;
if(6.0*t3[i]<1.0)clr[i]=temp1+(temp2-temp1)*t3[i]*6.0;
else if(2.0*t3[i]<1.0)clr[i]=temp2;
else if(3.0*t3[i]<2.0)clr[i]=(temp1+(temp2-temp1)*((0.6666666666666666)-t3[i])*6.0);
else clr[i]=temp1;
}
r=clr[0];
g=clr[1];
b=clr[2];
}}return new $wt.graphics.RGB(Math.round((255*r)),Math.round((255*g)),Math.round((255*b)));
});
$_M(c$,"fromRGB",
function(rgb){
var var_R=(rgb.red/255);
var var_G=(rgb.green/255);
var var_B=(rgb.blue/255);
var var_Min;
var var_Max;
var del_Max;
if(var_R>var_G){
var_Min=var_G;
var_Max=var_R;
}else{
var_Min=var_R;
var_Max=var_G;
}if(var_B>var_Max)var_Max=var_B;
if(var_B<var_Min)var_Min=var_B;
del_Max=var_Max-var_Min;
var H=0;
var S;
var L;
L=(var_Max+var_Min)/2;
if(del_Max==0){
H=0;
S=0;
}else{
if(L<0.5)S=del_Max/(var_Max+var_Min);
else S=del_Max/(2-var_Max-var_Min);
var del_R=(((var_Max-var_R)/ 6) + (del_Max /2))/del_Max;
var del_G=(((var_Max-var_G)/ 6) + (del_Max /2))/del_Max;
var del_B=(((var_Max-var_B)/ 6) + (del_Max /2))/del_Max;
if(var_R==var_Max)H=del_B-del_G;
else if(var_G==var_Max)H=(0.33333334)+del_R-del_B;
else if(var_B==var_Max)H=(0.6666667)+del_G-del_R;
if(H<0)H+=1;
if(H>1)H-=1;
}this.h=Math.round((240*H));
this.s=Math.round((S*240));
this.l=Math.round((L*240));
},"$wt.graphics.RGB");
c$=$_P();
c$.customColors=c$.prototype.customColors=new Array(16);
$_S(c$,
"lastSelectedColor",null);
});
