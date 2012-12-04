$_L(["$wt.widgets.Canvas","java.util.Hashtable","$.Vector","$wt.graphics.Point"],"$wt.custom.StyledText",["java.lang.Character","$.StringBuffer","$wt.SWT","$wt.accessibility.AccessibleAdapter","$.AccessibleControlAdapter","$.AccessibleTextAdapter","$wt.custom.DefaultContent","$.DefaultLineStyler","$.DisplayRenderer","$.PrintRenderer","$.StyleRange","$.StyledTextEvent","$.StyledTextListener","$.StyledTextPrintOptions","$.TextChangeListener","$.WrappedContent","$wt.dnd.Clipboard","$.RTFTransfer","$.TextTransfer","$wt.graphics.Color","$.Cursor","$.Font","$.GC","$.Image","$.Rectangle","$.TextLayout","$wt.internal.Compatibility","$wt.printing.Printer","$wt.widgets.Caret","$.Event","$.Listener","$.TypedListener"],function(){
c$=$_C(function(){
this.selectionBackground=null;
this.selectionForeground=null;
this.logicalContent=null;
this.content=null;
this.renderer=null;
this.listener=null;
this.textChangeListener=null;
this.defaultLineStyler=null;
this.lineCache=null;
this.userLineStyle=false;
this.userLineBackground=false;
this.verticalScrollOffset=0;
this.horizontalScrollOffset=0;
this.topIndex=0;
this.lastPaintTopIndex=-1;
this.topOffset=0;
this.clientAreaHeight=0;
this.clientAreaWidth=0;
this.lineHeight=0;
this.tabLength=4;
this.leftMargin=0;
this.topMargin=0;
this.rightMargin=0;
this.bottomMargin=0;
this.ibeamCursor=null;
this.columnX=0;
this.caretOffset=0;
this.selection=null;
this.clipboardSelection=null;
this.selectionAnchor=0;
this.doubleClickSelection=null;
this.editable=true;
this.wordWrap=false;
this.doubleClickEnabled=true;
this.overwrite=false;
this.textLimit=-1;
this.keyActionMap=null;
this.$background=null;
this.$foreground=null;
this.clipboard=null;
this.mouseDown=false;
this.mouseDoubleClick=false;
this.autoScrollDirection=0;
this.autoScrollDistance=0;
this.lastTextChangeStart=0;
this.lastTextChangeNewLineCount=0;
this.lastTextChangeNewCharCount=0;
this.lastTextChangeReplaceLineCount=0;
this.lastTextChangeReplaceCharCount=0;
this.$isMirrored=false;
this.bidiColoring=false;
this.leftCaretBitmap=null;
this.rightCaretBitmap=null;
this.caretDirection=0;
this.advancing=true;
this.defaultCaret=null;
this.updateCaretDirection=true;
if(!$_D("org.eclipse.swt.custom.StyledText.RTFWriter")){
org.eclipse.swt.custom.StyledText.$StyledText$RTFWriter$();
}
if(!$_D("org.eclipse.swt.custom.StyledText.TextWriter")){
org.eclipse.swt.custom.StyledText.$StyledText$TextWriter$();
}
if(!$_D("org.eclipse.swt.custom.StyledText.ContentWidthCache")){
org.eclipse.swt.custom.StyledText.$StyledText$ContentWidthCache$();
}
if(!$_D("org.eclipse.swt.custom.StyledText.WordWrapCache")){
org.eclipse.swt.custom.StyledText.$StyledText$WordWrapCache$();
}
$_Z(this,arguments);
},$wt.custom,"StyledText",$wt.widgets.Canvas);
$_Y(c$,function(){
this.selection=new $wt.graphics.Point(0,0);
this.keyActionMap=new java.util.Hashtable();
});
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.StyledText,[parent,$wt.custom.StyledText.checkStyle(style|1048576|262144)]);
$_U(this,$wt.custom.StyledText,"setForeground",[this.getForeground()]);
$_U(this,$wt.custom.StyledText,"setBackground",[this.getBackground()]);
var display=this.getDisplay();
this.$isMirrored=($_U(this,$wt.custom.StyledText,"getStyle",[])&134217728)!=0;
if((style&8)!=0){
this.setEditable(false);
}this.leftMargin=this.rightMargin=this.isBidiCaret()?2:0;
if((style&4)!=0&&(style&2048)!=0){
this.leftMargin=this.topMargin=this.rightMargin=this.bottomMargin=2;
}this.clipboard=new $wt.dnd.Clipboard(display);
this.installDefaultContent();
this.initializeRenderer();
if((style&64)!=0){
this.setWordWrap(true);
}else{
this.lineCache=$_N($wt.custom.StyledText.ContentWidthCache,this,null,this,this.content);
}this.defaultCaret=new $wt.widgets.Caret(this,0);
if(this.isBidiCaret()){
this.createCaretBitmaps();
}this.setCaret(this.defaultCaret);
this.calculateScrollBars();
this.createKeyBindings();
this.ibeamCursor=new $wt.graphics.Cursor(display,19);
this.setCursor(this.ibeamCursor);
this.installListeners();
this.installDefaultLineStyler();
this.initializeAccessible();
},"$wt.widgets.Composite,~N");
$_M(c$,"addExtendedModifyListener",
function(extendedModifyListener){
var typedListener=new $wt.custom.StyledTextListener(extendedModifyListener);
this.addListener(3000,typedListener);
},"$wt.custom.ExtendedModifyListener");
$_M(c$,"setKeyBinding",
function(key,action){
var keyValue=key&16842751;
var modifierValue=key&$WT.MODIFIER_MASK;
var keyChar=String.fromCharCode(keyValue);
if($wt.internal.Compatibility.isLetter(keyChar)){
var ch=Character.toUpperCase(keyChar);
var newKey=(ch).charCodeAt(0)|modifierValue;
if(action==0){
this.keyActionMap.remove(new Integer(newKey));
}else{
this.keyActionMap.put(new Integer(newKey),new Integer(action));
}ch=Character.toLowerCase(keyChar);
newKey=(ch).charCodeAt(0)|modifierValue;
if(action==0){
this.keyActionMap.remove(new Integer(newKey));
}else{
this.keyActionMap.put(new Integer(newKey),new Integer(action));
}}else{
if(action==0){
this.keyActionMap.remove(new Integer(key));
}else{
this.keyActionMap.put(new Integer(key),new Integer(action));
}}},"~N,~N");
$_M(c$,"addBidiSegmentListener",
function(listener){
var typedListener=new $wt.custom.StyledTextListener(listener);
this.addListener(3007,typedListener);
},"$wt.custom.BidiSegmentListener");
$_M(c$,"addLineBackgroundListener",
function(listener){
if(this.userLineBackground==false){
this.removeLineBackgroundListener(this.defaultLineStyler);
this.defaultLineStyler.setLineBackground(0,this.logicalContent.getLineCount(),null);
this.userLineBackground=true;
}var typedListener=new $wt.custom.StyledTextListener(listener);
this.addListener(3001,typedListener);
},"$wt.custom.LineBackgroundListener");
$_M(c$,"addLineStyleListener",
function(listener){
if(this.userLineStyle==false){
this.removeLineStyleListener(this.defaultLineStyler);
this.defaultLineStyler.setStyleRange(null);
this.userLineStyle=true;
}var typedListener=new $wt.custom.StyledTextListener(listener);
this.addListener(3002,typedListener);
},"$wt.custom.LineStyleListener");
$_M(c$,"addModifyListener",
function(modifyListener){
var typedListener=new $wt.widgets.TypedListener(modifyListener);
this.addListener(24,typedListener);
},"$wt.events.ModifyListener");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
},"$wt.events.SelectionListener");
$_M(c$,"addVerifyKeyListener",
function(listener){
var typedListener=new $wt.custom.StyledTextListener(listener);
this.addListener(3005,typedListener);
},"$wt.custom.VerifyKeyListener");
$_M(c$,"addVerifyListener",
function(verifyListener){
var typedListener=new $wt.widgets.TypedListener(verifyListener);
this.addListener(25,typedListener);
},"$wt.events.VerifyListener");
$_M(c$,"append",
function(string){
var lastChar=Math.max(this.getCharCount(),0);
this.replaceTextRange(lastChar,0,string);
},"~S");
$_M(c$,"calculateContentWidth",
function(){
this.lineCache=this.getLineCache(this.content);
this.lineCache.calculate(this.topIndex,this.getPartialBottomIndex()-this.topIndex+1);
});
$_M(c$,"calculateScrollBars",
function(){
var horizontalBar=this.getHorizontalBar();
var verticalBar=this.getVerticalBar();
this.setScrollBars();
if(verticalBar!=null){
verticalBar.setIncrement(this.getVerticalIncrement());
}if(horizontalBar!=null){
horizontalBar.setIncrement(this.getHorizontalIncrement());
}});
$_M(c$,"calculateTopIndex",
function(){
var oldTopIndex=this.topIndex;
var verticalIncrement=this.getVerticalIncrement();
var clientAreaHeight=this.getClientArea().height;
if(verticalIncrement==0){
return;
}this.topIndex=$wt.internal.Compatibility.ceil(this.verticalScrollOffset,verticalIncrement);
if(this.topIndex>0){
if(clientAreaHeight>0){
var bottomPixel=this.verticalScrollOffset+clientAreaHeight;
var fullLineTopPixel=this.topIndex*verticalIncrement;
var fullLineVisibleHeight=bottomPixel-fullLineTopPixel;
if(fullLineVisibleHeight<verticalIncrement){
this.topIndex--;
}}else if(this.topIndex>=this.content.getLineCount()){
this.topIndex=this.content.getLineCount()-1;
}}if(this.topIndex!=oldTopIndex){
this.topOffset=this.content.getOffsetAtLine(this.topIndex);
this.lineCache.calculate(this.topIndex,this.getPartialBottomIndex()-this.topIndex+1);
this.setHorizontalScrollBar();
}});
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
if((style&4)!=0){
style&=-835;
}else{
style|=2;
if((style&64)!=0){
style&=-257;
}}return style;
},"~N");
$_M(c$,"claimBottomFreeSpace",
function(){
var newVerticalOffset=Math.max(0,this.content.getLineCount()*this.lineHeight-this.getClientArea().height);
if(newVerticalOffset<this.verticalScrollOffset){
this.setVerticalScrollOffset(newVerticalOffset,true);
}});
$_M(c$,"claimRightFreeSpace",
function(){
var newHorizontalOffset=Math.max(0,this.lineCache.getWidth()-(this.getClientArea().width-this.leftMargin-this.rightMargin));
if(newHorizontalOffset<this.horizontalScrollOffset){
this.scrollHorizontalBar(newHorizontalOffset-this.horizontalScrollOffset);
}});
$_M(c$,"clearMargin",
function(gc,background,clientArea,y){
gc.setBackground(background);
if(this.topMargin>0){
gc.fillRectangle(0,-y,clientArea.width,this.topMargin);
}if(this.bottomMargin>0){
gc.fillRectangle(0,clientArea.height-this.bottomMargin-y,clientArea.width,this.bottomMargin);
}if(this.leftMargin>0){
gc.fillRectangle(0,-y,this.leftMargin,clientArea.height);
}if(this.rightMargin>0){
gc.fillRectangle(clientArea.width-this.rightMargin,-y,this.rightMargin,clientArea.height);
}},"$wt.graphics.GC,$wt.graphics.Color,$wt.graphics.Rectangle,~N");
$_M(c$,"clearSelection",
function(sendEvent){
var selectionStart=this.selection.x;
var selectionEnd=this.selection.y;
var length=this.content.getCharCount();
this.resetSelection();
if(selectionEnd-selectionStart>0){
var redrawStart=Math.min(selectionStart,length);
var redrawEnd=Math.min(selectionEnd,length);
if(redrawEnd-redrawStart>0){
this.internalRedrawRange(redrawStart,redrawEnd-redrawStart,true);
}if(sendEvent==true){
this.sendSelectionEvent();
}}},"~B");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var count;
var width;
var height;
var singleLine=(this.getStyle()&4)!=0;
if(singleLine){
count=1;
}else{
count=this.content.getLineCount();
}if(wHint!=-1){
width=wHint;
}else{
width=64;
}if(wHint==-1){
var computeLineCache=this.lineCache;
if(this.wordWrap){
computeLineCache=$_N($wt.custom.StyledText.ContentWidthCache,this,null,this,this.logicalContent);
if(singleLine==false){
count=this.logicalContent.getLineCount();
}}var visibleCount=Math.min(count,Math.floor(this.getDisplay().getBounds().height/this.lineHeight));
computeLineCache.calculate(0,visibleCount);
width=computeLineCache.getWidth()+this.leftMargin+this.rightMargin;
}else if(this.wordWrap&&singleLine==false){
var wrappedContent=new $wt.custom.WrappedContent(this.renderer,this.logicalContent);
wrappedContent.wrapLines(width);
count=wrappedContent.getLineCount();
}if(hHint!=-1){
height=hHint;
}else{
height=count*this.lineHeight+this.topMargin+this.bottomMargin;
}if(width==0){
width=64;
}if(height==0){
if(singleLine){
height=this.lineHeight;
}else{
height=64;
}}var rect=this.computeTrim(0,0,width,height);
return new $wt.graphics.Point(rect.width,rect.height);
},"~N,~N,~B");
$_M(c$,"copy",
function(){
this.copy(1);
});
$_M(c$,"copy",
function(clipboardType){
if(clipboardType!=1&&clipboardType!=2)return;
var length=this.selection.y-this.selection.x;
if(length>0){
try{
this.setClipboardContent(this.selection.x,length,clipboardType);
}catch(error){
if($_O(error,$wt.SWTError)){
if(error.code!=2002){
throw error;
}}else{
throw error;
}
}
}},"~N");
$_M(c$,"getModelDelimitedText",
function(text){
var convertedText;
var delimiter=this.getLineDelimiter();
var length=text.length;
var crIndex=0;
var lfIndex=0;
var i=0;
if(length==0){
return text;
}convertedText=new StringBuffer(length);
while(i<length){
if(crIndex!=-1){
crIndex=text.indexOf('\u000d',i);
}if(lfIndex!=-1){
lfIndex=text.indexOf('\u000a',i);
}if(lfIndex==-1&&crIndex==-1){
break;
}else if((crIndex<lfIndex&&crIndex!=-1)||lfIndex==-1){
convertedText.append(text.substring(i,crIndex));
if(lfIndex==crIndex+1){
i=lfIndex+1;
}else{
i=crIndex+1;
}}else{
convertedText.append(text.substring(i,lfIndex));
i=lfIndex+1;
}if(this.isSingleLine()){
break;
}convertedText.append(delimiter);
}
if(i<length&&(this.isSingleLine()==false||convertedText.length()==0)){
convertedText.append(text.substring(i));
}return convertedText.toString();
},"~S");
$_M(c$,"createKeyBindings",
function(){
this.setKeyBinding(16777217,16777217);
this.setKeyBinding(16777218,16777218);
this.setKeyBinding(16777223,16777223);
this.setKeyBinding(16777224,16777224);
this.setKeyBinding(16777221,16777221);
this.setKeyBinding(16777222,16777222);
this.setKeyBinding(16777223|$WT.MOD1,17039367);
this.setKeyBinding(16777224|$WT.MOD1,17039368);
this.setKeyBinding(16777221|$WT.MOD1,17039365);
this.setKeyBinding(16777222|$WT.MOD1,17039366);
if(this.isMirrored()){
this.setKeyBinding(16777219,16777220);
this.setKeyBinding(16777220,16777219);
this.setKeyBinding(16777219|$WT.MOD1,17039364);
this.setKeyBinding(16777220|$WT.MOD1,17039363);
}else{
this.setKeyBinding(16777219,16777219);
this.setKeyBinding(16777220,16777220);
this.setKeyBinding(16777219|$WT.MOD1,17039363);
this.setKeyBinding(16777220|$WT.MOD1,17039364);
}this.setKeyBinding(16777217|$WT.MOD2,16908289);
this.setKeyBinding(16777218|$WT.MOD2,16908290);
this.setKeyBinding(16777223|$WT.MOD2,16908295);
this.setKeyBinding(16777224|$WT.MOD2,16908296);
this.setKeyBinding(16777221|$WT.MOD2,16908293);
this.setKeyBinding(16777222|$WT.MOD2,16908294);
this.setKeyBinding(16777223|$WT.MOD1|$WT.MOD2,17170439);
this.setKeyBinding(16777224|$WT.MOD1|$WT.MOD2,17170440);
this.setKeyBinding(16777221|$WT.MOD1|$WT.MOD2,17170437);
this.setKeyBinding(16777222|$WT.MOD1|$WT.MOD2,17170438);
if(this.isMirrored()){
this.setKeyBinding(16777219|$WT.MOD2,16908292);
this.setKeyBinding(16777220|$WT.MOD2,16908291);
this.setKeyBinding(16777219|$WT.MOD1|$WT.MOD2,17170436);
this.setKeyBinding(16777220|$WT.MOD1|$WT.MOD2,17170435);
}else{
this.setKeyBinding(16777219|$WT.MOD2,16908291);
this.setKeyBinding(16777220|$WT.MOD2,16908292);
this.setKeyBinding(16777219|$WT.MOD1|$WT.MOD2,17170435);
this.setKeyBinding(16777220|$WT.MOD1|$WT.MOD2,17170436);
}this.setKeyBinding(('X').charCodeAt(0)|$WT.MOD1,131199);
this.setKeyBinding(('C').charCodeAt(0)|$WT.MOD1,17039369);
this.setKeyBinding(('V').charCodeAt(0)|$WT.MOD1,16908297);
this.setKeyBinding(('').charCodeAt(0)|$WT.MOD2,131199);
this.setKeyBinding(16777225|$WT.MOD1,17039369);
this.setKeyBinding(16777225|$WT.MOD2,16908297);
this.setKeyBinding(('\u0008').charCodeAt(0)|$WT.MOD2,8);
this.setKeyBinding('\u0008'.charCodeAt(0),8);
this.setKeyBinding(''.charCodeAt(0),127);
this.setKeyBinding(('\u0008').charCodeAt(0)|$WT.MOD1,262152);
this.setKeyBinding(('').charCodeAt(0)|$WT.MOD1,262271);
this.setKeyBinding(16777225,16777225);
});
$_M(c$,"createCaretBitmaps",
function(){
var caretWidth=3;
var display=this.getDisplay();
if(this.leftCaretBitmap!=null){
if(this.defaultCaret!=null&&this.leftCaretBitmap.equals(this.defaultCaret.getImage())){
this.defaultCaret.setImage(null);
}this.leftCaretBitmap.dispose();
}this.leftCaretBitmap=new $wt.graphics.Image(display,caretWidth,this.lineHeight);
var gc=new $wt.graphics.GC(this.leftCaretBitmap);
gc.setBackground(display.getSystemColor(2));
gc.fillRectangle(0,0,caretWidth,this.lineHeight);
gc.setForeground(display.getSystemColor(1));
gc.drawLine(0,0,0,this.lineHeight);
gc.drawLine(0,0,caretWidth-1,0);
gc.drawLine(0,1,1,1);
gc.dispose();
if(this.rightCaretBitmap!=null){
if(this.defaultCaret!=null&&this.rightCaretBitmap.equals(this.defaultCaret.getImage())){
this.defaultCaret.setImage(null);
}this.rightCaretBitmap.dispose();
}this.rightCaretBitmap=new $wt.graphics.Image(display,caretWidth,this.lineHeight);
gc=new $wt.graphics.GC(this.rightCaretBitmap);
gc.setBackground(display.getSystemColor(2));
gc.fillRectangle(0,0,caretWidth,this.lineHeight);
gc.setForeground(display.getSystemColor(1));
gc.drawLine(caretWidth-1,0,caretWidth-1,this.lineHeight);
gc.drawLine(0,0,caretWidth-1,0);
gc.drawLine(caretWidth-1,1,1,1);
gc.dispose();
});
$_M(c$,"cut",
function(){
var length=this.selection.y-this.selection.x;
if(length>0){
try{
this.setClipboardContent(this.selection.x,length,1);
}catch(error){
if($_O(error,$wt.SWTError)){
if(error.code!=2002){
throw error;
}return;
}else{
throw error;
}
}
this.doDelete();
}});
$_M(c$,"doAutoScroll",
function(event){
var area=this.getClientArea();
if(event.y>area.height){
this.doAutoScroll(1024,event.y-area.height);
}else if(event.y<0){
this.doAutoScroll(128,-event.y);
}else if(event.x<this.leftMargin&&this.wordWrap==false){
this.doAutoScroll(16777219,this.leftMargin-event.x);
}else if(event.x>area.width-this.leftMargin-this.rightMargin&&this.wordWrap==false){
this.doAutoScroll(16777220,event.x-(area.width-this.leftMargin-this.rightMargin));
}else{
this.endAutoScroll();
}},"$wt.widgets.Event");
$_M(c$,"doAutoScroll",
function(direction,distance){
var timer=null;
var TIMER_INTERVAL=50;
this.autoScrollDistance=distance;
if(this.autoScrollDirection==direction){
return;
}var display=this.getDisplay();
if(direction==128){
timer=(($_D("$wt.custom.StyledText$1")?0:org.eclipse.swt.custom.StyledText.$StyledText$1$()),$_N($wt.custom.StyledText$1,this,$_F("display",display)));
}else if(direction==1024){
timer=(($_D("$wt.custom.StyledText$2")?0:org.eclipse.swt.custom.StyledText.$StyledText$2$()),$_N($wt.custom.StyledText$2,this,$_F("display",display)));
}else if(direction==16777220){
timer=(($_D("$wt.custom.StyledText$3")?0:org.eclipse.swt.custom.StyledText.$StyledText$3$()),$_N($wt.custom.StyledText$3,this,$_F("display",display)));
}else if(direction==16777219){
timer=(($_D("$wt.custom.StyledText$4")?0:org.eclipse.swt.custom.StyledText.$StyledText$4$()),$_N($wt.custom.StyledText$4,this,$_F("display",display)));
}if(timer!=null){
this.autoScrollDirection=direction;
display.timerExec(50,timer);
}},"~N,~N");
$_M(c$,"doBackspace",
function(){
var event=new $wt.widgets.Event();
event.text="";
if(this.selection.x!=this.selection.y){
event.start=this.selection.x;
event.end=this.selection.y;
this.sendKeyEvent(event);
}else if(this.caretOffset>0){
var line=this.content.getLineAtOffset(this.caretOffset);
var lineOffset=this.content.getOffsetAtLine(line);
if(this.caretOffset==lineOffset){
lineOffset=this.content.getOffsetAtLine(line-1);
event.start=lineOffset+this.content.getLine(line-1).length;
event.end=this.caretOffset;
}else{
var lineText=this.content.getLine(line);
var layout=this.renderer.getTextLayout(lineText,lineOffset);
var start=layout.getPreviousOffset(this.caretOffset-lineOffset,1);
this.renderer.disposeTextLayout(layout);
event.start=start+lineOffset;
event.end=this.caretOffset;
}this.sendKeyEvent(event);
}});
$_M(c$,"doContent",
function(key){
var event;
if(this.textLimit>0&&this.content.getCharCount()-(this.selection.y-this.selection.x)>=this.textLimit){
return;
}event=new $wt.widgets.Event();
event.start=this.selection.x;
event.end=this.selection.y;
if((key).charCodeAt(0)==('\u000d').charCodeAt (0) || (key).charCodeAt (0) == ('\u000a').charCodeAt(0)){
if(this.isSingleLine()==false){
event.text=this.getLineDelimiter();
}}else if(this.selection.x==this.selection.y&&this.overwrite==true&&(key).charCodeAt(0)!=('\u0009').charCodeAt(0)){
var lineIndex=this.content.getLineAtOffset(event.end);
var lineOffset=this.content.getOffsetAtLine(lineIndex);
var line=this.content.getLine(lineIndex);
if(event.end<lineOffset+line.length){
event.end++;
}event.text=String.instantialize([key]);
}else{
event.text=String.instantialize([key]);
}if(event.text!=null){
this.sendKeyEvent(event);
}},"~N");
$_M(c$,"doContentEnd",
function(){
if(this.isSingleLine()){
this.doLineEnd();
}else{
var length=this.content.getCharCount();
if(this.caretOffset<length){
this.caretOffset=length;
this.showCaret();
}}});
$_M(c$,"doContentStart",
function(){
if(this.caretOffset>0){
this.caretOffset=0;
this.showCaret();
}});
$_M(c$,"doCursorPrevious",
function(){
this.advancing=false;
if(this.selection.y-this.selection.x>0){
var caretLine;
this.caretOffset=this.selection.x;
caretLine=this.getCaretLine();
this.showCaret(caretLine);
}else{
this.doSelectionCursorPrevious();
}});
$_M(c$,"doCursorNext",
function(){
this.advancing=true;
if(this.selection.y-this.selection.x>0){
var caretLine;
this.caretOffset=this.selection.y;
caretLine=this.getCaretLine();
this.showCaret(caretLine);
}else{
this.doSelectionCursorNext();
}});
$_M(c$,"doDelete",
function(){
var event=new $wt.widgets.Event();
event.text="";
if(this.selection.x!=this.selection.y){
event.start=this.selection.x;
event.end=this.selection.y;
this.sendKeyEvent(event);
}else if(this.caretOffset<this.content.getCharCount()){
var line=this.content.getLineAtOffset(this.caretOffset);
var lineOffset=this.content.getOffsetAtLine(line);
var lineLength=this.content.getLine(line).length;
if(this.caretOffset==lineOffset+lineLength){
event.start=this.caretOffset;
event.end=this.content.getOffsetAtLine(line+1);
}else{
event.start=this.caretOffset;
event.end=this.getClusterNext(this.caretOffset,line);
}this.sendKeyEvent(event);
}});
$_M(c$,"doDeleteWordNext",
function(){
if(this.selection.x!=this.selection.y){
this.doDelete();
}else{
var event=new $wt.widgets.Event();
event.text="";
event.start=this.caretOffset;
event.end=this.getWordEnd(this.caretOffset);
this.sendKeyEvent(event);
}});
$_M(c$,"doDeleteWordPrevious",
function(){
if(this.selection.x!=this.selection.y){
this.doBackspace();
}else{
var event=new $wt.widgets.Event();
event.text="";
event.start=this.getWordStart(this.caretOffset);
event.end=this.caretOffset;
this.sendKeyEvent(event);
}});
$_M(c$,"doLineDown",
function(){
if(this.isSingleLine()){
return 0;
}var caretLine=this.getCaretLine();
if(caretLine<this.content.getLineCount()-1){
caretLine++;
this.caretOffset=this.getOffsetAtMouseLocation(this.columnX,caretLine);
}return caretLine;
});
$_M(c$,"doLineEnd",
function(){
var caretLine=this.getCaretLine();
var lineOffset=this.content.getOffsetAtLine(caretLine);
var lineLength=this.content.getLine(caretLine).length;
var lineEndOffset=lineOffset+lineLength;
if(this.caretOffset<lineEndOffset){
this.caretOffset=lineEndOffset;
this.showCaret();
}});
$_M(c$,"doLineStart",
function(){
var caretLine=this.getCaretLine();
var lineOffset=this.content.getOffsetAtLine(caretLine);
if(this.caretOffset>lineOffset){
this.caretOffset=lineOffset;
this.showCaret(caretLine);
}});
$_M(c$,"doLineUp",
function(){
var caretLine=this.getCaretLine();
if(caretLine>0){
caretLine--;
this.caretOffset=this.getOffsetAtMouseLocation(this.columnX,caretLine);
}return caretLine;
});
$_M(c$,"doMouseLocationChange",
function(x,y,select){
var line=Math.floor((y+this.verticalScrollOffset)/this.lineHeight);
var lineCount=this.content.getLineCount();
var newCaretOffset;
var newCaretLine;
var oldAdvancing=this.advancing;
this.updateCaretDirection=true;
if(line>lineCount-1){
line=lineCount-1;
}if(line<0||(this.isSingleLine()&&line>0)){
return;
}newCaretOffset=this.getOffsetAtMouseLocation(x,line);
if(this.mouseDoubleClick){
newCaretOffset=this.doMouseWordSelect(x,newCaretOffset,line);
}newCaretLine=this.content.getLineAtOffset(newCaretOffset);
if(y>=0&&y<this.getClientArea().height&&(x>=0&&x<this.getClientArea().width||this.wordWrap||newCaretLine!=this.content.getLineAtOffset(this.caretOffset))){
if(newCaretOffset!=this.caretOffset||this.advancing!=oldAdvancing){
this.caretOffset=newCaretOffset;
if(select){
this.doMouseSelection();
}this.showCaret();
}}if(select==false){
this.caretOffset=newCaretOffset;
this.clearSelection(true);
}},"~N,~N,~B");
$_M(c$,"doMouseSelection",
function(){
if(this.caretOffset<=this.selection.x||(this.caretOffset>this.selection.x&&this.caretOffset<this.selection.y&&this.selectionAnchor==this.selection.x)){
this.doSelection(16777219);
}else{
this.doSelection(16777220);
}});
$_M(c$,"doMouseWordSelect",
function(x,newCaretOffset,line){
var wordOffset;
if(newCaretOffset<this.selectionAnchor&&this.selectionAnchor==this.selection.x){
this.selectionAnchor=this.doubleClickSelection.y;
}else if(newCaretOffset>this.selectionAnchor&&this.selectionAnchor==this.selection.y){
this.selectionAnchor=this.doubleClickSelection.x;
}if(x>=0&&x<this.getClientArea().width){
if(this.caretOffset==this.selection.x){
wordOffset=this.getWordStart(newCaretOffset);
}else{
wordOffset=this.getWordEndNoSpaces(newCaretOffset);
}if(this.content.getLineAtOffset(wordOffset)==line){
newCaretOffset=wordOffset;
}}return newCaretOffset;
},"~N,~N,~N");
$_M(c$,"doPageDown",
function(select,lines){
var lineCount=this.content.getLineCount();
var oldColumnX=this.columnX;
var oldHScrollOffset=this.horizontalScrollOffset;
var caretLine;
if(this.isSingleLine()){
return;
}caretLine=this.getCaretLine();
if(caretLine<lineCount-1){
var verticalMaximum=lineCount*this.getVerticalIncrement();
var pageSize=this.getClientArea().height;
var scrollLines=Math.min(lineCount-caretLine-1,lines);
var scrollOffset;
scrollLines=Math.max(1,scrollLines);
caretLine+=scrollLines;
this.caretOffset=this.getOffsetAtMouseLocation(this.columnX,caretLine);
if(select){
this.doSelection(16777220);
}scrollOffset=this.verticalScrollOffset+scrollLines*this.getVerticalIncrement();
if(scrollOffset+pageSize>verticalMaximum){
scrollOffset=verticalMaximum-pageSize;
}if(scrollOffset>this.verticalScrollOffset){
this.setVerticalScrollOffset(scrollOffset,true);
}}this.showCaret(caretLine);
var hScrollChange=oldHScrollOffset-this.horizontalScrollOffset;
this.columnX=oldColumnX+hScrollChange;
},"~B,~N");
$_M(c$,"doPageEnd",
function(){
if(this.isSingleLine()){
this.doLineEnd();
}else{
var line=this.getBottomIndex();
var bottomCaretOffset=this.content.getOffsetAtLine(line)+this.content.getLine(line).length;
if(this.caretOffset<bottomCaretOffset){
this.caretOffset=bottomCaretOffset;
this.showCaret();
}}});
$_M(c$,"doPageStart",
function(){
var topCaretOffset=this.content.getOffsetAtLine(this.topIndex);
if(this.caretOffset>topCaretOffset){
this.caretOffset=topCaretOffset;
this.showCaret(this.topIndex);
}});
$_M(c$,"doPageUp",
function(select,lines){
var oldColumnX=this.columnX;
var oldHScrollOffset=this.horizontalScrollOffset;
var caretLine=this.getCaretLine();
if(caretLine>0){
var scrollLines=Math.max(1,Math.min(caretLine,lines));
var scrollOffset;
caretLine-=scrollLines;
this.caretOffset=this.getOffsetAtMouseLocation(this.columnX,caretLine);
if(select){
this.doSelection(16777219);
}scrollOffset=Math.max(0,this.verticalScrollOffset-scrollLines*this.getVerticalIncrement());
if(scrollOffset<this.verticalScrollOffset){
this.setVerticalScrollOffset(scrollOffset,true);
}}this.showCaret(caretLine);
var hScrollChange=oldHScrollOffset-this.horizontalScrollOffset;
this.columnX=oldColumnX+hScrollChange;
},"~B,~N");
$_M(c$,"doSelection",
function(direction){
var redrawStart=-1;
var redrawEnd=-1;
if(this.selectionAnchor==-1){
this.selectionAnchor=this.selection.x;
}if(direction==16777219){
if(this.caretOffset<this.selection.x){
redrawEnd=this.selection.x;
redrawStart=this.selection.x=this.caretOffset;
if(this.selection.y!=this.selectionAnchor){
redrawEnd=this.selection.y;
this.selection.y=this.selectionAnchor;
}}else if(this.selectionAnchor==this.selection.x&&this.caretOffset<this.selection.y){
redrawEnd=this.selection.y;
redrawStart=this.selection.y=this.caretOffset;
}}else{
if(this.caretOffset>this.selection.y){
redrawStart=this.selection.y;
redrawEnd=this.selection.y=this.caretOffset;
if(this.selection.x!=this.selectionAnchor){
redrawStart=this.selection.x;
this.selection.x=this.selectionAnchor;
}}else if(this.selectionAnchor==this.selection.y&&this.caretOffset>this.selection.x){
redrawStart=this.selection.x;
redrawEnd=this.selection.x=this.caretOffset;
}}if(redrawStart!=-1&&redrawEnd!=-1){
this.internalRedrawRange(redrawStart,redrawEnd-redrawStart,true);
this.sendSelectionEvent();
}},"~N");
$_M(c$,"doSelectionCursorNext",
function(){
var caretLine=this.getCaretLine();
var lineOffset=this.content.getOffsetAtLine(caretLine);
var offsetInLine=this.caretOffset-lineOffset;
this.advancing=true;
if(offsetInLine<this.content.getLine(caretLine).length){
this.caretOffset=this.getClusterNext(this.caretOffset,caretLine);
this.showCaret();
}else if(caretLine<this.content.getLineCount()-1&&this.isSingleLine()==false){
caretLine++;
this.caretOffset=this.content.getOffsetAtLine(caretLine);
this.showCaret(caretLine);
}});
$_M(c$,"doSelectionCursorPrevious",
function(){
var caretLine=this.getCaretLine();
var lineOffset=this.content.getOffsetAtLine(caretLine);
var offsetInLine=this.caretOffset-lineOffset;
this.advancing=false;
if(offsetInLine>0){
this.caretOffset=this.getClusterPrevious(this.caretOffset,caretLine);
this.showCaret(caretLine);
}else if(caretLine>0){
caretLine--;
lineOffset=this.content.getOffsetAtLine(caretLine);
this.caretOffset=lineOffset+this.content.getLine(caretLine).length;
this.showCaret();
}});
$_M(c$,"doSelectionLineDown",
function(){
var oldColumnX;
var caretLine;
var lineStartOffset;
if(this.isSingleLine()){
return;
}caretLine=this.getCaretLine();
lineStartOffset=this.content.getOffsetAtLine(caretLine);
oldColumnX=this.columnX=this.getXAtOffset(this.content.getLine(caretLine),caretLine,this.caretOffset-lineStartOffset);
if(caretLine==this.content.getLineCount()-1){
this.caretOffset=this.content.getCharCount();
}else{
caretLine=this.doLineDown();
}this.setMouseWordSelectionAnchor();
this.doSelection(16777220);
this.showCaret(caretLine);
this.columnX=oldColumnX;
});
$_M(c$,"doSelectionLineUp",
function(){
var oldColumnX;
var caretLine=this.getCaretLine();
var lineStartOffset=this.content.getOffsetAtLine(caretLine);
oldColumnX=this.columnX=this.getXAtOffset(this.content.getLine(caretLine),caretLine,this.caretOffset-lineStartOffset);
if(caretLine==0){
this.caretOffset=0;
}else{
caretLine=this.doLineUp();
}this.setMouseWordSelectionAnchor();
this.showCaret(caretLine);
this.doSelection(16777219);
this.columnX=oldColumnX;
});
$_M(c$,"doSelectionPageDown",
function(lines){
var oldColumnX;
var caretLine=this.getCaretLine();
var lineStartOffset=this.content.getOffsetAtLine(caretLine);
oldColumnX=this.columnX=this.getXAtOffset(this.content.getLine(caretLine),caretLine,this.caretOffset-lineStartOffset);
this.doPageDown(true,lines);
this.columnX=oldColumnX;
},"~N");
$_M(c$,"doSelectionPageUp",
function(lines){
var oldColumnX;
var caretLine=this.getCaretLine();
var lineStartOffset=this.content.getOffsetAtLine(caretLine);
oldColumnX=this.columnX=this.getXAtOffset(this.content.getLine(caretLine),caretLine,this.caretOffset-lineStartOffset);
this.doPageUp(true,lines);
this.columnX=oldColumnX;
},"~N");
$_M(c$,"doSelectionWordNext",
function(){
var newCaretOffset=this.getWordEnd(this.caretOffset);
this.advancing=false;
if(this.isSingleLine()==false||this.content.getLineAtOffset(this.caretOffset)==this.content.getLineAtOffset(newCaretOffset)){
this.caretOffset=newCaretOffset;
this.showCaret();
}});
$_M(c$,"doSelectionWordPrevious",
function(){
var caretLine;
this.advancing=false;
this.caretOffset=this.getWordStart(this.caretOffset);
caretLine=this.content.getLineAtOffset(this.caretOffset);
if(this.wordWrap&&caretLine<this.content.getLineCount()-1&&this.caretOffset==this.content.getOffsetAtLine(caretLine+1)){
caretLine++;
}this.showCaret(caretLine);
});
$_M(c$,"doVisualPrevious",
function(){
this.caretOffset=this.getClusterPrevious(this.caretOffset,this.getCaretLine());
this.showCaret();
});
$_M(c$,"doVisualNext",
function(){
this.caretOffset=this.getClusterNext(this.caretOffset,this.getCaretLine());
this.showCaret();
});
$_M(c$,"doWordNext",
function(){
if(this.selection.y-this.selection.x>0){
var caretLine;
this.caretOffset=this.selection.y;
caretLine=this.getCaretLine();
this.showCaret(caretLine);
}else{
this.doSelectionWordNext();
}});
$_M(c$,"doWordPrevious",
function(){
if(this.selection.y-this.selection.x>0){
var caretLine;
this.caretOffset=this.selection.x;
caretLine=this.getCaretLine();
this.showCaret(caretLine);
}else{
this.doSelectionWordPrevious();
}});
$_M(c$,"draw",
function(x,y,width,height,clearBackground){
if(clearBackground){
this.redraw(x+this.leftMargin,y+this.topMargin,width,height,true);
}else{
var startLine=Math.floor((y+this.verticalScrollOffset)/this.lineHeight);
var endY=y+height;
var paintYFromTopLine=(startLine-this.topIndex)*this.lineHeight;
var topLineOffset=(this.topIndex*this.lineHeight-this.verticalScrollOffset);
var paintY=paintYFromTopLine+topLineOffset+this.topMargin;
var lineCount=this.content.getLineCount();
var background=this.getBackground();
var foreground=this.getForeground();
var gc=this.getGC();
if(this.isSingleLine()){
lineCount=1;
}for(var i=startLine;paintY<endY&&i<lineCount;i++,paintY+=this.lineHeight){
var line=this.content.getLine(i);
this.renderer.drawLine(line,i,paintY,gc,background,foreground,clearBackground);
}
gc.dispose();
}},"~N,~N,~N,~N,~B");
$_M(c$,"endAutoScroll",
function(){
this.autoScrollDirection=0;
});
$_V(c$,"getBackground",
function(){
if(this.$background==null){
return this.getDisplay().getSystemColor(25);
}return this.$background;
});
$_M(c$,"getBaseline",
function(){
return this.renderer.getBaseline();
});
$_M(c$,"getBidiColoring",
function(){
return this.bidiColoring;
});
$_M(c$,"getBottomIndex",
function(){
var lineCount=1;
if(this.lineHeight!=0){
var partialTopLineHeight=this.topIndex*this.lineHeight-this.verticalScrollOffset;
lineCount=Math.floor((this.getClientArea().height-partialTopLineHeight)/this.lineHeight);
}return Math.min(this.content.getLineCount()-1,this.topIndex+Math.max(0,lineCount-1));
});
$_M(c$,"getCaretOffset",
function(){
return this.caretOffset;
});
$_M(c$,"getOffsetAtX",
function(line,lineOffset,lineXOffset){
var x=lineXOffset-this.leftMargin+this.horizontalScrollOffset;
var layout=this.renderer.getTextLayout(line,lineOffset);
var trailing=$_A(1,0);
var offsetInLine=layout.getOffset(x,0,trailing);
this.advancing=false;
if(trailing[0]!=0){
var lineLength=line.length;
if(offsetInLine+trailing[0]>=lineLength){
offsetInLine=lineLength;
this.advancing=true;
}else{
var level;
var offset=offsetInLine;
while(offset>0&&Character.isDigit(line.charAt(offset)))offset--;

if(offset==0&&Character.isDigit(line.charAt(offset))){
level=this.isMirrored()?1:0;
}else{
level=layout.getLevel(offset)&0x1;
}offsetInLine+=trailing[0];
var trailingLevel=layout.getLevel(offsetInLine)&0x1;
this.advancing=(level^trailingLevel)!=0;
}}this.renderer.disposeTextLayout(layout);
return offsetInLine;
},"~S,~N,~N");
$_M(c$,"getCaretWidth",
function(){
var caret=this.getCaret();
if(caret==null)return 0;
return caret.getSize().x;
});
$_M(c$,"getClipboardContent",
function(clipboardType){
var plainTextTransfer=$wt.dnd.TextTransfer.getInstance();
return this.clipboard.getContents(plainTextTransfer,clipboardType);
},"~N");
$_M(c$,"getClusterNext",
function(offset,lineIndex){
var line=this.content.getLine(lineIndex);
var lineOffset=this.content.getOffsetAtLine(lineIndex);
var layout=this.renderer.getTextLayout(line,lineOffset);
offset-=lineOffset;
offset=layout.getNextOffset(offset,2);
offset+=lineOffset;
this.renderer.disposeTextLayout(layout);
return offset;
},"~N,~N");
$_M(c$,"getClusterPrevious",
function(offset,lineIndex){
var line=this.content.getLine(lineIndex);
var lineOffset=this.content.getOffsetAtLine(lineIndex);
var layout=this.renderer.getTextLayout(line,lineOffset);
offset-=lineOffset;
offset=layout.getPreviousOffset(offset,2);
offset+=lineOffset;
this.renderer.disposeTextLayout(layout);
return offset;
},"~N,~N");
$_M(c$,"getContent",
function(){
return this.logicalContent;
});
$_M(c$,"getDoubleClickEnabled",
function(){
return this.doubleClickEnabled;
});
$_M(c$,"getEditable",
function(){
return this.editable;
});
$_V(c$,"getForeground",
function(){
if(this.$foreground==null){
return this.getDisplay().getSystemColor(24);
}return this.$foreground;
});
$_M(c$,"getGC",
function(){
return new $wt.graphics.GC(this);
});
$_M(c$,"getHorizontalIncrement",
function(){
var gc=this.getGC();
var increment=gc.getFontMetrics().getAverageCharWidth();
gc.dispose();
return increment;
});
$_M(c$,"getHorizontalIndex",
function(){
return Math.floor(this.horizontalScrollOffset/this.getHorizontalIncrement());
});
$_M(c$,"getHorizontalPixel",
function(){
return this.horizontalScrollOffset;
});
$_M(c$,"getKeyBinding",
function(key){
var action=this.keyActionMap.get(new Integer(key));
var intAction;
if(action==null){
intAction=0;
}else{
intAction=action.intValue();
}return intAction;
},"~N");
$_M(c$,"getCharCount",
function(){
return this.content.getCharCount();
});
$_M(c$,"getLineBackground",
function(index){
var lineBackground=null;
if(this.userLineBackground==false){
lineBackground=this.defaultLineStyler.getLineBackground(index);
}return lineBackground;
},"~N");
$_M(c$,"getLineBackgroundData",
function(lineOffset,line){
return this.sendLineEvent(3001,lineOffset,line);
},"~N,~S");
$_M(c$,"getLineCount",
function(){
return this.getLineAtOffset(this.getCharCount())+1;
});
$_M(c$,"getLineCountWhole",
function(){
var lineCount;
if(this.lineHeight!=0){
lineCount=Math.floor(this.getClientArea().height/this.lineHeight);
}else{
lineCount=1;
}return lineCount;
});
$_M(c$,"getLineAtOffset",
function(offset){
return this.logicalContent.getLineAtOffset(offset);
},"~N");
$_M(c$,"getLineDelimiter",
function(){
return this.content.getLineDelimiter();
});
$_M(c$,"sendLineEvent",
function(eventType,lineOffset,line){
var event=null;
if(this.isListening(eventType)){
event=new $wt.custom.StyledTextEvent(this.logicalContent);
if(this.wordWrap){
var lineIndex=this.logicalContent.getLineAtOffset(lineOffset);
event.detail=this.logicalContent.getOffsetAtLine(lineIndex);
event.text=this.logicalContent.getLine(lineIndex);
}else{
event.detail=lineOffset;
event.text=line;
}this.notifyListeners(eventType,event);
}return event;
},"~N,~N,~S");
$_M(c$,"getLineHeight",
function(){
return this.lineHeight;
});
$_M(c$,"getLineCache",
function(content){
var lineCache;
if(this.wordWrap){
lineCache=$_N($wt.custom.StyledText.WordWrapCache,this,null,this,content);
}else{
lineCache=$_N($wt.custom.StyledText.ContentWidthCache,this,null,this,content);
}return lineCache;
},"$wt.custom.StyledTextContent");
$_M(c$,"getLineStyleData",
function(lineOffset,line){
return this.sendLineEvent(3002,lineOffset,line);
},"~N,~S");
$_M(c$,"getLocationAtOffset",
function(offset){
var line=this.content.getLineAtOffset(offset);
var lineOffset=this.content.getOffsetAtLine(line);
var lineContent=this.content.getLine(line);
var x=this.getXAtOffset(lineContent,line,offset-lineOffset);
var y=line*this.lineHeight-this.verticalScrollOffset;
return new $wt.graphics.Point(x,y);
},"~N");
$_M(c$,"getOffsetAtLine",
function(lineIndex){
return this.logicalContent.getOffsetAtLine(lineIndex);
},"~N");
$_M(c$,"getOffsetAtLocation",
function(point){
var layout;
var line;
var lineOffset;
var offsetInLine;
var lineText;
line=Math.floor((this.getTopPixel()+point.y)/this.lineHeight);
lineText=this.content.getLine(line);
lineOffset=this.content.getOffsetAtLine(line);
var x=point.x-this.leftMargin+this.horizontalScrollOffset;
layout=this.renderer.getTextLayout(lineText,lineOffset);
var rect=layout.getLineBounds(0);
if(x>rect.x+rect.width){
this.renderer.disposeTextLayout(layout);
$WT.error(5);
}var trailing=$_A(1,0);
offsetInLine=layout.getOffset(x,0,trailing);
if(offsetInLine!=lineText.length-1){
offsetInLine=Math.min(lineText.length,offsetInLine+trailing[0]);
}this.renderer.disposeTextLayout(layout);
return lineOffset+offsetInLine;
},"$wt.graphics.Point");
$_M(c$,"getOffsetAtMouseLocation",
function(x,line){
var lineText=this.content.getLine(line);
var lineOffset=this.content.getOffsetAtLine(line);
return this.getOffsetAtX(lineText,lineOffset,x)+lineOffset;
},"~N,~N");
$_M(c$,"getOrientation",
function(){
return this.isMirrored()?67108864:33554432;
});
$_M(c$,"getPartialBottomIndex",
function(){
var partialLineCount=$wt.internal.Compatibility.ceil(this.getClientArea().height,this.lineHeight);
return Math.min(this.content.getLineCount(),this.topIndex+partialLineCount)-1;
});
$_M(c$,"getPlatformDelimitedText",
function(writer){
var end=writer.getStart()+writer.getCharCount();
var startLine=this.logicalContent.getLineAtOffset(writer.getStart());
var endLine=this.logicalContent.getLineAtOffset(end);
var endLineText=this.logicalContent.getLine(endLine);
var endLineOffset=this.logicalContent.getOffsetAtLine(endLine);
for(var i=startLine;i<=endLine;i++){
writer.writeLine(this.logicalContent.getLine(i),this.logicalContent.getOffsetAtLine(i));
if(i<endLine){
writer.writeLineDelimiter($wt.custom.StyledText.PlatformLineDelimiter);
}}
if(end>endLineOffset+endLineText.length){
writer.writeLineDelimiter($wt.custom.StyledText.PlatformLineDelimiter);
}writer.close();
return writer.toString();
},"$wt.custom.StyledText.TextWriter");
$_M(c$,"getSelection",
function(){
return new $wt.graphics.Point(this.selection.x,this.selection.y);
});
$_M(c$,"getSelectionRange",
function(){
return new $wt.graphics.Point(this.selection.x,this.selection.y-this.selection.x);
});
$_M(c$,"getSelectionBackground",
function(){
if(this.selectionBackground==null){
return this.getDisplay().getSystemColor(26);
}return this.selectionBackground;
});
$_M(c$,"getSelectionCount",
function(){
return this.getSelectionRange().y;
});
$_M(c$,"getSelectionForeground",
function(){
if(this.selectionForeground==null){
return this.getDisplay().getSystemColor(27);
}return this.selectionForeground;
});
$_M(c$,"getSelectionText",
function(){
return this.content.getTextRange(this.selection.x,this.selection.y-this.selection.x);
});
$_M(c$,"getStyle",
function(){
var style=$_U(this,$wt.custom.StyledText,"getStyle",[]);
style&=-234881025;
if(this.isMirrored()){
style|=201326592;
}else{
style|=33554432;
}return style;
});
$_M(c$,"getBidiSegments",
function(lineOffset,line){
if(this.isListening(3007)==false){
return this.getBidiSegmentsCompatibility(line,lineOffset);
}var event=this.sendLineEvent(3007,lineOffset,line);
var lineLength=line.length;
var segments;
if(event==null||event.segments==null||event.segments.length==0){
segments=[0,lineLength];
}else{
var segmentCount=event.segments.length;
for(var i=1;i<segmentCount;i++){
}
if(event.segments[segmentCount-1]!=lineLength){
segments=$_A(segmentCount+1,0);
System.arraycopy(event.segments,0,segments,0,segmentCount);
segments[segmentCount]=lineLength;
}else{
segments=event.segments;
}}return segments;
},"~N,~S");
$_M(c$,"getBidiSegmentsCompatibility",
function(line,lineOffset){
var event;
var styles=new Array(0);
var lineLength=line.length;
if(this.bidiColoring==false){
return[0,lineLength];
}event=this.renderer.getLineStyleData(lineOffset,line);
if(event!=null){
styles=event.styles;
}if(styles.length==0){
return[0,lineLength];
}var k=0;
var count=1;
while(k<styles.length&&styles[k].start==0&&styles[k].length==lineLength){
k++;
}
var offsets=$_A((styles.length-k)*2+2,0);
for(var i=k;i<styles.length;i++){
var style=styles[i];
var styleLineStart=Math.max(style.start-lineOffset,0);
var styleLineEnd=Math.max(style.start+style.length-lineOffset,styleLineStart);
styleLineEnd=Math.min(styleLineEnd,line.length);
if(i>0&&count>1&&((styleLineStart>=offsets[count-2]&&styleLineStart<=offsets[count-1])||(styleLineEnd>=offsets[count-2]&&styleLineEnd<=offsets[count-1]))&&style.similarTo(styles[i-1])){
offsets[count-2]=Math.min(offsets[count-2],styleLineStart);
offsets[count-1]=Math.max(offsets[count-1],styleLineEnd);
}else{
if(styleLineStart>offsets[count-1]){
offsets[count]=styleLineStart;
count++;
}offsets[count]=styleLineEnd;
count++;
}}
if(lineLength>offsets[count-1]){
offsets[count]=lineLength;
count++;
}if(count==offsets.length){
return offsets;
}var result=$_A(count,0);
System.arraycopy(offsets,0,result,0,count);
return result;
},"~S,~N");
$_M(c$,"getStyleRangeAtOffset",
function(offset){
if(this.userLineStyle==false){
return this.defaultLineStyler.getStyleRangeAtOffset(offset);
}return null;
},"~N");
$_M(c$,"getStyleRanges",
function(){
var styles;
if(this.userLineStyle==false){
styles=this.defaultLineStyler.getStyleRanges();
}else{
styles=new Array(0);
}return styles;
});
$_M(c$,"getStyleRanges",
function(start,length){
var contentLength=this.getCharCount();
var end=start+length;
var styles;
if(this.userLineStyle==false){
styles=this.defaultLineStyler.getStyleRangesFor(start,length);
if(styles==null)return new Array(0);
if(styles.length==1){
var style=styles[0];
if(style.start<start){
var newStyle=styles[0].clone();
newStyle.length=newStyle.length-(start-newStyle.start);
newStyle.start=start;
styles[0]=newStyle;
}if(style.start+style.length>(start+length)){
var newStyle=styles[0].clone();
newStyle.length=start+length-newStyle.start;
styles[0]=newStyle;
}}else if(styles.length>1){
var style=styles[0];
if(style.start<start){
var newStyle=styles[0].clone();
newStyle.length=newStyle.length-(start-newStyle.start);
newStyle.start=start;
styles[0]=newStyle;
}style=styles[styles.length-1];
if(style.start+style.length>(start+length)){
var newStyle=styles[styles.length-1].clone();
newStyle.length=start+length-newStyle.start;
styles[styles.length-1]=newStyle;
}}}else{
styles=new Array(0);
}return styles;
},"~N,~N");
$_M(c$,"getTabs",
function(){
return this.tabLength;
});
$_M(c$,"getText",
function(){
return this.content.getTextRange(0,this.getCharCount());
});
$_M(c$,"getText",
function(start,end){
var contentLength=this.getCharCount();
return this.content.getTextRange(start,end-start+1);
},"~N,~N");
$_M(c$,"getTextBounds",
function(start,end){
var contentLength=this.getCharCount();
var lineStart=this.content.getLineAtOffset(start);
var lineEnd=this.content.getLineAtOffset(end);
var rect;
var y=lineStart*this.lineHeight;
var height=(lineEnd+1)*this.lineHeight-y;
var left=0x7fffffff;
var right=0;
for(var i=lineStart;i<=lineEnd;i++){
var lineOffset=this.content.getOffsetAtLine(i);
var line=this.content.getLine(i);
var layout=this.renderer.getTextLayout(line,lineOffset);
if(i==lineStart&&i==lineEnd){
rect=layout.getBounds(start-lineOffset,end-lineOffset);
}else if(i==lineStart){
rect=layout.getBounds(start-lineOffset,line.length);
}else if(i==lineEnd){
rect=layout.getBounds(0,end-lineOffset);
}else{
rect=layout.getLineBounds(0);
}left=Math.min(left,rect.x);
right=Math.max(right,rect.x+rect.width);
this.renderer.disposeTextLayout(layout);
}
rect=new $wt.graphics.Rectangle(left,y,right-left,height);
rect.x+=this.leftMargin-this.horizontalScrollOffset;
rect.y-=this.verticalScrollOffset;
return rect;
},"~N,~N");
$_M(c$,"getTextRange",
function(start,length){
var contentLength=this.getCharCount();
var end=start+length;
return this.content.getTextRange(start,length);
},"~N,~N");
$_M(c$,"getTextLimit",
function(){
return this.textLimit;
});
$_M(c$,"getTopIndex",
function(){
var logicalTopIndex=this.topIndex;
if(this.wordWrap){
var visualLineOffset=this.content.getOffsetAtLine(this.topIndex);
logicalTopIndex=this.logicalContent.getLineAtOffset(visualLineOffset);
}return logicalTopIndex;
});
$_M(c$,"getTopPixel",
function(){
return this.verticalScrollOffset;
});
$_M(c$,"getVerticalIncrement",
function(){
return this.lineHeight;
});
$_M(c$,"getCaretDirection",
function(){
if(!this.isBidiCaret())return-1;
if(!this.updateCaretDirection&&this.caretDirection!=0)return this.caretDirection;
this.updateCaretDirection=false;
var caretLine=this.getCaretLine();
var lineOffset=this.content.getOffsetAtLine(caretLine);
var line=this.content.getLine(caretLine);
var offset=this.caretOffset-lineOffset;
var lineLength=line.length;
if(lineLength==0)return this.isMirrored()?131072:16384;
if(this.advancing&&offset>0)offset--;
if(offset==lineLength&&offset>0)offset--;
while(offset>0&&Character.isDigit(line.charAt(offset)))offset--;

if(offset==0&&Character.isDigit(line.charAt(offset))){
return this.isMirrored()?131072:16384;
}var layout=this.renderer.getTextLayout(line,lineOffset);
var level=layout.getLevel(offset);
this.renderer.disposeTextLayout(layout);
return((level&1)!=0)?131072:16384;
});
$_M(c$,"getCaretLine",
function(){
var caretLine=this.content.getLineAtOffset(this.caretOffset);
var leftColumnX=this.leftMargin;
if(this.wordWrap&&this.columnX<=leftColumnX&&caretLine<this.content.getLineCount()-1&&this.caretOffset==this.content.getOffsetAtLine(caretLine+1)){
caretLine++;
}return caretLine;
});
$_M(c$,"getWordEnd",
function(offset){
var line=this.logicalContent.getLineAtOffset(offset);
var lineOffset=this.logicalContent.getOffsetAtLine(line);
var lineText=this.logicalContent.getLine(line);
var lineLength=lineText.length;
if(offset>=this.getCharCount()){
return offset;
}if(offset==lineOffset+lineLength){
line++;
offset=this.logicalContent.getOffsetAtLine(line);
}else{
var layout=this.renderer.getTextLayout(lineText,lineOffset);
offset-=lineOffset;
offset=layout.getNextOffset(offset,4);
offset+=lineOffset;
this.renderer.disposeTextLayout(layout);
}return offset;
},"~N");
$_M(c$,"getWordEndNoSpaces",
function(offset){
var line=this.logicalContent.getLineAtOffset(offset);
var lineOffset=this.logicalContent.getOffsetAtLine(line);
var lineText=this.logicalContent.getLine(line);
var lineLength=lineText.length;
if(offset>=this.getCharCount()){
return offset;
}if(offset==lineOffset+lineLength){
line++;
offset=this.logicalContent.getOffsetAtLine(line);
}else{
offset-=lineOffset;
var ch=lineText.charAt(offset);
var letterOrDigit=$wt.internal.Compatibility.isLetterOrDigit(ch);
while(offset<lineLength-1&&$wt.internal.Compatibility.isLetterOrDigit(ch)==letterOrDigit&&$wt.internal.Compatibility.isSpaceChar(ch)==false){
offset++;
ch=lineText.charAt(offset);
}
if(offset==lineLength-1&&$wt.internal.Compatibility.isLetterOrDigit(ch)==letterOrDigit&&$wt.internal.Compatibility.isSpaceChar(ch)==false){
offset++;
}offset+=lineOffset;
}return offset;
},"~N");
$_M(c$,"getWordStart",
function(offset){
var line=this.logicalContent.getLineAtOffset(offset);
var lineOffset=this.logicalContent.getOffsetAtLine(line);
var lineText=this.logicalContent.getLine(line);
if(offset<=0){
return offset;
}if(offset==lineOffset){
line--;
lineText=this.logicalContent.getLine(line);
offset=this.logicalContent.getOffsetAtLine(line)+lineText.length;
}else{
var layout=this.renderer.getTextLayout(lineText,lineOffset);
offset-=lineOffset;
offset=layout.getPreviousOffset(offset,4);
offset+=lineOffset;
this.renderer.disposeTextLayout(layout);
}return offset;
},"~N");
$_M(c$,"getWordWrap",
function(){
return this.wordWrap;
});
$_M(c$,"getXAtOffset",
function(line,lineIndex,offsetInLine){
var x=0;
var lineLength=line.length;
if(lineIndex<this.content.getLineCount()-1){
var endLineOffset=this.content.getOffsetAtLine(lineIndex+1)-1;
if(lineLength<offsetInLine&&offsetInLine<=endLineOffset){
offsetInLine=lineLength;
}}if(lineLength!=0&&offsetInLine<=lineLength){
var lineOffset=this.content.getOffsetAtLine(lineIndex);
var layout=this.renderer.getTextLayout(line,lineOffset);
if(!this.advancing||offsetInLine==0){
x=layout.getLocation(offsetInLine,false).x;
}else{
x=layout.getLocation(offsetInLine-1,true).x;
}this.renderer.disposeTextLayout(layout);
}return x+this.leftMargin-this.horizontalScrollOffset;
},"~S,~N,~N");
$_M(c$,"insert",
function(string){
var sel=this.getSelectionRange();
this.replaceTextRange(sel.x,sel.y,string);
},"~S");
$_M(c$,"installDefaultContent",
function(){
this.textChangeListener=(($_D("$wt.custom.StyledText$5")?0:org.eclipse.swt.custom.StyledText.$StyledText$5$()),$_N($wt.custom.StyledText$5,this,null));
this.logicalContent=this.content=new $wt.custom.DefaultContent();
this.content.addTextChangeListener(this.textChangeListener);
});
$_M(c$,"installDefaultLineStyler",
function(){
this.defaultLineStyler=new $wt.custom.DefaultLineStyler(this.logicalContent);
var typedListener=new $wt.custom.StyledTextListener(this.defaultLineStyler);
if(this.userLineStyle==false){
this.addListener(3002,typedListener);
}if(this.userLineBackground==false){
this.addListener(3001,typedListener);
}});
$_M(c$,"installListeners",
function(){
var verticalBar=this.getVerticalBar();
var horizontalBar=this.getHorizontalBar();
this.listener=(($_D("$wt.custom.StyledText$6")?0:org.eclipse.swt.custom.StyledText.$StyledText$6$()),$_N($wt.custom.StyledText$6,this,null));
this.addListener(12,this.listener);
this.addListener(1,this.listener);
this.addListener(2,this.listener);
this.addListener(3,this.listener);
this.addListener(4,this.listener);
this.addListener(8,this.listener);
this.addListener(5,this.listener);
this.addListener(9,this.listener);
this.addListener(11,this.listener);
this.addListener(31,this.listener);
if(verticalBar!=null){
verticalBar.addListener(13,(($_D("$wt.custom.StyledText$7")?0:org.eclipse.swt.custom.StyledText.$StyledText$7$()),$_N($wt.custom.StyledText$7,this,null)));
}if(horizontalBar!=null){
horizontalBar.addListener(13,(($_D("$wt.custom.StyledText$8")?0:org.eclipse.swt.custom.StyledText.$StyledText$8$()),$_N($wt.custom.StyledText$8,this,null)));
}});
$_M(c$,"internalGetContent",
function(){
return this.content;
});
$_M(c$,"internalGetHorizontalPixel",
function(){
return this.horizontalScrollOffset;
});
$_M(c$,"internalGetLineCache",
function(){
return this.lineCache;
});
$_M(c$,"internalGetSelection",
function(){
return this.selection;
});
$_M(c$,"internalGetWordWrap",
function(){
return this.wordWrap;
});
$_M(c$,"internalRedraw",
function(){
$_U(this,$wt.custom.StyledText,"redraw",[]);
});
$_M(c$,"internalRedrawRange",
function(start,length,clearBackground){
var end=start+length;
var firstLine=this.content.getLineAtOffset(start);
var lastLine=this.content.getLineAtOffset(end);
var offsetInFirstLine;
var partialBottomIndex=this.getPartialBottomIndex();
var partialTopIndex=Math.floor(this.verticalScrollOffset/this.lineHeight);
if(firstLine>partialBottomIndex||lastLine<partialTopIndex){
return;
}if(partialTopIndex>firstLine){
firstLine=partialTopIndex;
offsetInFirstLine=0;
}else{
offsetInFirstLine=start-this.content.getOffsetAtLine(firstLine);
}if(partialBottomIndex+1<lastLine){
lastLine=partialBottomIndex+1;
end=this.content.getOffsetAtLine(lastLine);
}this.redrawLines(firstLine,offsetInFirstLine,lastLine,end,clearBackground);
if(lastLine-firstLine>1){
var clientArea=this.getClientArea();
var redrawStopY=lastLine*this.lineHeight-this.verticalScrollOffset;
var redrawY=(firstLine+1)*this.lineHeight-this.verticalScrollOffset;
this.draw(0,redrawY,clientArea.width,redrawStopY-redrawY,clearBackground);
}},"~N,~N,~B");
$_M(c$,"getRtf",
function(){
var rtfWriter=$_N($wt.custom.StyledText.RTFWriter,this,null,0,this.getCharCount());
return this.getPlatformDelimitedText(rtfWriter);
});
$_M(c$,"handleDispose",
function(event){
this.removeListener(12,this.listener);
this.notifyListeners(12,event);
event.type=0;
this.clipboard.dispose();
this.ibeamCursor.dispose();
if(this.renderer!=null){
this.renderer.dispose();
this.renderer=null;
}if(this.content!=null){
this.content.removeTextChangeListener(this.textChangeListener);
this.content=null;
}if(this.defaultCaret!=null){
this.defaultCaret.dispose();
this.defaultCaret=null;
}if(this.leftCaretBitmap!=null){
this.leftCaretBitmap.dispose();
this.leftCaretBitmap=null;
}if(this.rightCaretBitmap!=null){
this.rightCaretBitmap.dispose();
this.rightCaretBitmap=null;
}if(this.defaultLineStyler!=null){
this.defaultLineStyler.release();
this.defaultLineStyler=null;
}this.selectionBackground=null;
this.selectionForeground=null;
this.logicalContent=null;
this.textChangeListener=null;
this.lineCache=null;
this.ibeamCursor=null;
this.selection=null;
this.doubleClickSelection=null;
this.keyActionMap=null;
this.$background=null;
this.$foreground=null;
this.clipboard=null;
},"$wt.widgets.Event");
$_M(c$,"handleHorizontalScroll",
function(event){
var scrollPixel=this.getHorizontalBar().getSelection()-this.horizontalScrollOffset;
this.scrollHorizontal(scrollPixel);
},"$wt.widgets.Event");
$_M(c$,"handleKey",
function(event){
var action;
this.advancing=true;
if(event.keyCode!=0){
action=this.getKeyBinding(event.keyCode|event.stateMask);
}else{
action=this.getKeyBinding((event.character).charCodeAt(0)|event.stateMask);
if(action==0){
if((event.stateMask&262144)!=0&&((event.character).charCodeAt(0)>=0)&&(event.character).charCodeAt(0)<=31){
var c=(event.character).charCodeAt(0)+64;
action=this.getKeyBinding(c|event.stateMask);
}}}if(action==0){
var ignore=false;
if($wt.custom.StyledText.IS_CARBON){
ignore=(event.stateMask^4194304)==0||(event.stateMask^(4325376))==0;
}else if($wt.custom.StyledText.IS_MOTIF){
ignore=(event.stateMask^262144)==0||(event.stateMask^(393216))==0;
}else{
ignore=(event.stateMask^65536)==0||(event.stateMask^262144)==0||(event.stateMask^(196608))==0||(event.stateMask^(393216))==0;
}if(!ignore&&(event.character).charCodeAt(0)>31&&(event.character).charCodeAt(0)!=('').charCodeAt (0) || (event.character).charCodeAt (0) == ('\u000d').charCodeAt (0) || (event.character).charCodeAt (0) == ('\u000a').charCodeAt (0) || (event.character).charCodeAt (0) == ('\u0009').charCodeAt(0)){
this.doContent(event.character);
}}else{
this.invokeAction(action);
}},"$wt.widgets.Event");
$_M(c$,"handleKeyDown",
function(event){
if(this.clipboardSelection==null){
this.clipboardSelection=new $wt.graphics.Point(this.selection.x,this.selection.y);
}var verifyEvent=new $wt.widgets.Event();
verifyEvent.character=event.character;
verifyEvent.keyCode=event.keyCode;
verifyEvent.stateMask=event.stateMask;
verifyEvent.doit=true;
this.notifyListeners(3005,verifyEvent);
if(verifyEvent.doit==true){
this.handleKey(event);
}},"$wt.widgets.Event");
$_M(c$,"handleKeyUp",
function(event){
if(this.clipboardSelection!=null){
if(this.clipboardSelection.x!=this.selection.x||this.clipboardSelection.y!=this.selection.y){
try{
if(this.selection.y-this.selection.x>0){
this.setClipboardContent(this.selection.x,this.selection.y-this.selection.x,2);
}}catch(error){
if($_O(error,$wt.SWTError)){
if(error.code!=2002){
throw error;
}}else{
throw error;
}
}
}}this.clipboardSelection=null;
},"$wt.widgets.Event");
$_M(c$,"handleMouseDoubleClick",
function(event){
if(event.button!=1||this.doubleClickEnabled==false){
return;
}event.y-=this.topMargin;
this.mouseDoubleClick=true;
this.caretOffset=this.getWordStart(this.caretOffset);
this.resetSelection();
this.caretOffset=this.getWordEndNoSpaces(this.caretOffset);
this.showCaret();
this.doMouseSelection();
this.doubleClickSelection=new $wt.graphics.Point(this.selection.x,this.selection.y);
},"$wt.widgets.Event");
$_M(c$,"handleMouseDown",
function(event){
this.mouseDown=true;
this.mouseDoubleClick=false;
if(event.button==2){
var text=this.getClipboardContent(2);
if(text!=null&&text.length>0){
var x=event.x;
var y=event.y-this.topMargin;
this.doMouseLocationChange(x,y,false);
var e=new $wt.widgets.Event();
e.start=this.selection.x;
e.end=this.selection.y;
e.text=this.getModelDelimitedText(text);
this.sendKeyEvent(e);
}}if((event.button!=1)||($wt.custom.StyledText.IS_CARBON&&(event.stateMask&$WT.MOD4)!=0)){
return;
}var select=(event.stateMask&$WT.MOD2)!=0;
event.y-=this.topMargin;
this.doMouseLocationChange(event.x,event.y,select);
},"$wt.widgets.Event");
$_M(c$,"handleMouseMove",
function(event){
if(!this.mouseDown)return;
if((event.stateMask&524288)==0){
return;
}event.y-=this.topMargin;
this.doMouseLocationChange(event.x,event.y,true);
this.update();
this.doAutoScroll(event);
},"$wt.widgets.Event");
$_M(c$,"handleMouseUp",
function(event){
this.mouseDown=false;
this.mouseDoubleClick=false;
event.y-=this.topMargin;
this.endAutoScroll();
if(event.button==1){
try{
if(this.selection.y-this.selection.x>0){
this.setClipboardContent(this.selection.x,this.selection.y-this.selection.x,2);
}}catch(error){
if($_O(error,$wt.SWTError)){
if(error.code!=2002){
throw error;
}}else{
throw error;
}
}
}},"$wt.widgets.Event");
$_M(c$,"handlePaint",
function(event){
var startLine=Math.max(0,Math.floor((event.y-this.topMargin+this.verticalScrollOffset)/this.lineHeight));
var paintYFromTopLine=(startLine-this.topIndex)*this.lineHeight;
var topLineOffset=this.topIndex*this.lineHeight-this.verticalScrollOffset;
var startY=paintYFromTopLine+topLineOffset+this.topMargin;
var renderHeight=event.y+event.height-startY;
if(event.height==0){
return;
}this.performPaint(event.gc,startLine,startY,renderHeight);
},"$wt.widgets.Event");
$_M(c$,"handleResize",
function(event){
var oldHeight=this.clientAreaHeight;
var oldWidth=this.clientAreaWidth;
var clientArea=this.getClientArea();
this.clientAreaHeight=clientArea.height;
this.clientAreaWidth=clientArea.width;
if(oldWidth!=this.clientAreaWidth){
if(this.rightMargin>0){
var x=(oldWidth<this.clientAreaWidth?oldWidth:this.clientAreaWidth)-this.rightMargin;
this.redraw(x,0,this.rightMargin,oldHeight,false);
}}if(oldHeight!=this.clientAreaHeight){
if(this.bottomMargin>0){
var y=(oldHeight<this.clientAreaHeight?oldHeight:this.clientAreaHeight)-this.bottomMargin;
this.redraw(0,y,oldWidth,this.bottomMargin,false);
}}if(this.wordWrap){
if(oldWidth!=this.clientAreaWidth){
this.wordWrapResize(oldWidth);
}}else if(this.clientAreaHeight>oldHeight){
var lineCount=this.content.getLineCount();
var oldBottomIndex=this.topIndex+Math.floor(oldHeight/this.lineHeight);
var newItemCount=$wt.internal.Compatibility.ceil(this.clientAreaHeight-oldHeight,this.lineHeight);
oldBottomIndex=Math.min(oldBottomIndex,lineCount);
newItemCount=Math.min(newItemCount,lineCount-oldBottomIndex);
this.lineCache.calculate(oldBottomIndex,newItemCount);
}this.setScrollBars();
this.claimBottomFreeSpace();
this.claimRightFreeSpace();
if(oldHeight!=this.clientAreaHeight){
this.calculateTopIndex();
}},"$wt.widgets.Event");
$_M(c$,"handleTextChanged",
function(event){
this.lineCache.textChanged(this.lastTextChangeStart,this.lastTextChangeNewLineCount,this.lastTextChangeReplaceLineCount,this.lastTextChangeNewCharCount,this.lastTextChangeReplaceCharCount);
this.setScrollBars();
this.updateSelection(this.lastTextChangeStart,this.lastTextChangeReplaceCharCount,this.lastTextChangeNewCharCount);
if(this.lastTextChangeReplaceLineCount>0){
this.claimBottomFreeSpace();
}if(this.lastTextChangeReplaceCharCount>0){
this.claimRightFreeSpace();
}if(this.lastTextChangeNewLineCount==0&&this.lastTextChangeReplaceLineCount==0){
var startLine=this.content.getLineAtOffset(this.lastTextChangeStart);
var startY=startLine*this.lineHeight-this.verticalScrollOffset+this.topMargin;
if($wt.custom.StyledText.DOUBLE_BUFFER){
var gc=this.getGC();
var caret=this.getCaret();
var caretVisible=false;
if(caret!=null){
caretVisible=caret.getVisible();
caret.setVisible(false);
}this.performPaint(gc,startLine,startY,this.lineHeight);
if(caret!=null){
caret.setVisible(caretVisible);
}gc.dispose();
}else{
this.redraw(0,startY,this.getClientArea().width,this.lineHeight,false);
this.update();
}}},"$wt.custom.TextChangedEvent");
$_M(c$,"handleTextChanging",
function(event){
var firstLine;
var textChangeY;
var isMultiLineChange=event.replaceLineCount>0||event.newLineCount>0;
if(event.replaceCharCount<0){
event.start+=event.replaceCharCount;
event.replaceCharCount*=-1;
}this.lastTextChangeStart=event.start;
this.lastTextChangeNewLineCount=event.newLineCount;
this.lastTextChangeNewCharCount=event.newCharCount;
this.lastTextChangeReplaceLineCount=event.replaceLineCount;
this.lastTextChangeReplaceCharCount=event.replaceCharCount;
firstLine=this.content.getLineAtOffset(event.start);
textChangeY=firstLine*this.lineHeight-this.verticalScrollOffset+this.topMargin;
if(isMultiLineChange){
this.redrawMultiLineChange(textChangeY,event.newLineCount,event.replaceLineCount);
}if(this.defaultLineStyler!=null){
this.defaultLineStyler.textChanging(event);
}var newEndOfText=this.content.getCharCount()-event.replaceCharCount+event.newCharCount;
if(this.caretOffset>newEndOfText)this.caretOffset=newEndOfText;
},"$wt.custom.TextChangingEvent");
$_M(c$,"handleTextSet",
function(event){
this.reset();
},"$wt.custom.TextChangedEvent");
$_M(c$,"handleTraverse",
function(event){
switch(event.detail){
case 2:
case 512:
case 256:
event.doit=true;
break;
case 4:
case 16:
case 8:
if((this.getStyle()&4)!=0){
event.doit=true;
}else{
if(!this.editable||(event.stateMask&$WT.MODIFIER_MASK)!=0){
event.doit=true;
}}break;
}
},"$wt.widgets.Event");
$_M(c$,"handleVerticalScroll",
function(event){
this.setVerticalScrollOffset(this.getVerticalBar().getSelection(),false);
},"$wt.widgets.Event");
$_M(c$,"initializeAccessible",
function(){
var accessible=this.getAccessible();
accessible.addAccessibleListener((($_D("$wt.custom.StyledText$9")?0:org.eclipse.swt.custom.StyledText.$StyledText$9$()),$_N($wt.custom.StyledText$9,this,null)));
accessible.addAccessibleTextListener((($_D("$wt.custom.StyledText$10")?0:org.eclipse.swt.custom.StyledText.$StyledText$10$()),$_N($wt.custom.StyledText$10,this,null)));
accessible.addAccessibleControlListener((($_D("$wt.custom.StyledText$11")?0:org.eclipse.swt.custom.StyledText.$StyledText$11$()),$_N($wt.custom.StyledText$11,this,null)));
this.addListener(15,(($_D("$wt.custom.StyledText$12")?0:org.eclipse.swt.custom.StyledText.$StyledText$12$()),$_N($wt.custom.StyledText$12,this,$_F("accessible",accessible))));
});
$_M(c$,"initializeRenderer",
function(){
if(this.renderer!=null){
this.renderer.dispose();
}this.renderer=new $wt.custom.DisplayRenderer(this.getDisplay(),this.getFont(),this,this.tabLength);
this.lineHeight=this.renderer.getLineHeight();
if(this.wordWrap){
this.content=new $wt.custom.WrappedContent(this.renderer,this.logicalContent);
}});
$_M(c$,"invokeAction",
function(action){
var oldColumnX;
var oldHScrollOffset;
var hScrollChange;
var caretLine;
this.updateCaretDirection=true;
switch(action){
case 16777217:
caretLine=this.doLineUp();
oldColumnX=this.columnX;
oldHScrollOffset=this.horizontalScrollOffset;
this.showCaret(caretLine);
hScrollChange=oldHScrollOffset-this.horizontalScrollOffset;
this.columnX=oldColumnX+hScrollChange;
this.clearSelection(true);
break;
case 16777218:
caretLine=this.doLineDown();
oldColumnX=this.columnX;
oldHScrollOffset=this.horizontalScrollOffset;
this.showCaret(caretLine);
hScrollChange=oldHScrollOffset-this.horizontalScrollOffset;
this.columnX=oldColumnX+hScrollChange;
this.clearSelection(true);
break;
case 16777223:
this.doLineStart();
this.clearSelection(true);
break;
case 16777224:
this.doLineEnd();
this.clearSelection(true);
break;
case 16777219:
this.doCursorPrevious();
this.clearSelection(true);
break;
case 16777220:
this.doCursorNext();
this.clearSelection(true);
break;
case 16777221:
this.doPageUp(false,this.getLineCountWhole());
this.clearSelection(true);
break;
case 16777222:
this.doPageDown(false,this.getLineCountWhole());
this.clearSelection(true);
break;
case 17039363:
this.doWordPrevious();
this.clearSelection(true);
break;
case 17039364:
this.doWordNext();
this.clearSelection(true);
break;
case 17039367:
this.doContentStart();
this.clearSelection(true);
break;
case 17039368:
this.doContentEnd();
this.clearSelection(true);
break;
case 17039365:
this.doPageStart();
this.clearSelection(true);
break;
case 17039366:
this.doPageEnd();
this.clearSelection(true);
break;
case 16908289:
this.doSelectionLineUp();
break;
case 262209:
this.selectAll();
break;
case 16908290:
this.doSelectionLineDown();
break;
case 16908295:
this.doLineStart();
this.doSelection(16777219);
break;
case 16908296:
this.doLineEnd();
this.doSelection(16777220);
break;
case 16908291:
this.doSelectionCursorPrevious();
this.doSelection(16777219);
break;
case 16908292:
this.doSelectionCursorNext();
this.doSelection(16777220);
break;
case 16908293:
this.doSelectionPageUp(this.getLineCountWhole());
break;
case 16908294:
this.doSelectionPageDown(this.getLineCountWhole());
break;
case 17170435:
this.doSelectionWordPrevious();
this.doSelection(16777219);
break;
case 17170436:
this.doSelectionWordNext();
this.doSelection(16777220);
break;
case 17170439:
this.doContentStart();
this.doSelection(16777219);
break;
case 17170440:
this.doContentEnd();
this.doSelection(16777220);
break;
case 17170437:
this.doPageStart();
this.doSelection(16777219);
break;
case 17170438:
this.doPageEnd();
this.doSelection(16777220);
break;
case 131199:
this.cut();
break;
case 17039369:
this.copy();
break;
case 16908297:
this.paste();
break;
case 8:
this.doBackspace();
break;
case 127:
this.doDelete();
break;
case 262152:
this.doDeleteWordPrevious();
break;
case 262271:
this.doDeleteWordNext();
break;
case 16777225:
this.overwrite=!this.overwrite;
break;
}
},"~N");
$_M(c$,"isBidi",
function(){
return false;
});
$_M(c$,"isLineDelimiter",
function(offset){
var line=this.content.getLineAtOffset(offset);
var lineOffset=this.content.getOffsetAtLine(line);
var offsetInLine=offset-lineOffset;
return offsetInLine>this.content.getLine(line).length;
},"~N");
$_M(c$,"isMirrored",
function(){
return this.$isMirrored;
});
$_M(c$,"isAreaVisible",
function(firstLine,lastLine){
var partialBottomIndex=this.getPartialBottomIndex();
var partialTopIndex=Math.floor(this.verticalScrollOffset/this.lineHeight);
var notVisible=firstLine>partialBottomIndex||lastLine<partialTopIndex;
return!notVisible;
},"~N,~N");
$_M(c$,"isSingleLine",
function(){
return(this.getStyle()&4)!=0;
});
$_M(c$,"modifyContent",
function(event,updateCaret){
event.doit=true;
this.notifyListeners(25,event);
if(event.doit){
var styledTextEvent=null;
var replacedLength=event.end-event.start;
if(this.isListening(3000)){
styledTextEvent=new $wt.custom.StyledTextEvent(this.logicalContent);
styledTextEvent.start=event.start;
styledTextEvent.end=event.start+event.text.length;
styledTextEvent.text=this.content.getTextRange(event.start,replacedLength);
}if(updateCaret){
if(event.text.length==0){
var lineIndex=this.content.getLineAtOffset(event.start);
var lineOffset=this.content.getOffsetAtLine(lineIndex);
var lineText=this.content.getLine(lineIndex);
var layout=this.renderer.getTextLayout(lineText,lineOffset);
var levelStart=layout.getLevel(event.start-lineOffset);
var lineIndexEnd=this.content.getLineAtOffset(event.end);
if(lineIndex!=lineIndexEnd){
this.renderer.disposeTextLayout(layout);
lineOffset=this.content.getOffsetAtLine(lineIndexEnd);
lineText=this.content.getLine(lineIndexEnd);
layout=this.renderer.getTextLayout(lineText,lineOffset);
}var levelEnd=layout.getLevel(event.end-lineOffset);
this.renderer.disposeTextLayout(layout);
this.advancing=levelStart!=levelEnd;
}}this.content.replaceTextRange(event.start,replacedLength,event.text);
if(updateCaret){
this.internalSetSelection(event.start+event.text.length,0,true);
this.showCaret();
}this.sendModifyEvent(event);
if(this.isListening(3000)){
this.notifyListeners(3000,styledTextEvent);
}}},"$wt.widgets.Event,~B");
$_M(c$,"paste",
function(){
var text;
text=this.getClipboardContent(1);
if(text!=null&&text.length>0){
var event=new $wt.widgets.Event();
event.start=this.selection.x;
event.end=this.selection.y;
event.text=this.getModelDelimitedText(text);
this.sendKeyEvent(event);
}});
$_M(c$,"performPaint",
function(gc,startLine,startY,renderHeight){
var clientArea=this.getClientArea();
var background=this.getBackground();
if(clientArea.width==0){
return;
}if(renderHeight>0){
var foreground=this.getForeground();
var lineCount=this.content.getLineCount();
var gcStyle=this.isMirrored()?67108864:33554432;
if(this.isSingleLine()){
lineCount=1;
}var paintY;
var paintHeight;
var lineBuffer;
var lineGC;
var doubleBuffer=$wt.custom.StyledText.DOUBLE_BUFFER&&this.lastPaintTopIndex==this.topIndex;
this.lastPaintTopIndex=this.topIndex;
if(doubleBuffer){
paintY=0;
paintHeight=renderHeight;
lineBuffer=new $wt.graphics.Image(this.getDisplay(),clientArea.width,renderHeight);
lineGC=new $wt.graphics.GC(lineBuffer,gcStyle);
lineGC.setFont(this.getFont());
lineGC.setForeground(foreground);
lineGC.setBackground(background);
}else{
paintY=startY;
paintHeight=startY+renderHeight;
lineBuffer=null;
lineGC=gc;
}for(var i=startLine;paintY<paintHeight&&i<lineCount;i++,paintY+=this.lineHeight){
var line=this.content.getLine(i);
this.renderer.drawLine(line,i,paintY,lineGC,background,foreground,true);
}
if(paintY<paintHeight){
lineGC.setBackground(background);
lineGC.fillRectangle(0,paintY,clientArea.width,paintHeight-paintY);
}if(doubleBuffer){
this.clearMargin(lineGC,background,clientArea,startY);
gc.drawImage(lineBuffer,0,startY);
lineGC.dispose();
lineBuffer.dispose();
}}this.clearMargin(gc,background,clientArea,0);
},"$wt.graphics.GC,~N,~N,~N");
$_M(c$,"print",
function(){
var printer=new $wt.printing.Printer();
var options=new $wt.custom.StyledTextPrintOptions();
options.printTextForeground=true;
options.printTextBackground=true;
options.printTextFontStyle=true;
options.printLineBackground=true;
new $wt.custom.StyledText.Printing(this,printer,options).run();
printer.dispose();
});
$_M(c$,"print",
function(printer){
var options=new $wt.custom.StyledTextPrintOptions();
options.printTextForeground=true;
options.printTextBackground=true;
options.printTextFontStyle=true;
options.printLineBackground=true;
return this.print(printer,options);
},"$wt.printing.Printer");
$_M(c$,"print",
function(printer,options){
return new $wt.custom.StyledText.Printing(this,printer,options);
},"$wt.printing.Printer,$wt.custom.StyledTextPrintOptions");
$_M(c$,"redraw",
function(){
var itemCount;
$_U(this,$wt.custom.StyledText,"redraw",[]);
itemCount=this.getPartialBottomIndex()-this.topIndex+1;
this.lineCache.redrawReset(this.topIndex,itemCount,true);
this.lineCache.calculate(this.topIndex,itemCount);
this.setHorizontalScrollBar();
});
$_M(c$,"redraw",
function(x,y,width,height,all){
$_U(this,$wt.custom.StyledText,"redraw",[x,y,width,height,all]);
if(height>0){
var lineCount=this.content.getLineCount();
var startLine=Math.floor((this.getTopPixel()+y)/this.lineHeight);
var endLine=startLine+$wt.internal.Compatibility.ceil(height,this.lineHeight);
var itemCount;
startLine=Math.min(startLine,lineCount);
itemCount=Math.min(endLine,lineCount)-startLine;
this.lineCache.reset(startLine,itemCount,true);
itemCount=this.getPartialBottomIndex()-this.topIndex+1;
this.lineCache.calculate(this.topIndex,itemCount);
this.setHorizontalScrollBar();
}},"~N,~N,~N,~N,~B");
$_M(c$,"redrawLine",
function(line,offset){
var redrawX=0;
if(offset>0){
var lineText=this.content.getLine(line);
redrawX=this.getXAtOffset(lineText,line,offset);
}var redrawY=line*this.lineHeight-this.verticalScrollOffset;
$_U(this,$wt.custom.StyledText,"redraw",[redrawX+this.leftMargin,redrawY+this.topMargin,this.getClientArea().width-this.leftMargin-this.rightMargin,this.lineHeight,true]);
},"~N,~N");
$_M(c$,"redrawLines",
function(firstLine,offsetInFirstLine,lastLine,endOffset,clearBackground){
var line=this.content.getLine(firstLine);
var lineCount=lastLine-firstLine+1;
var redrawY;
var redrawWidth;
var lineOffset=this.content.getOffsetAtLine(firstLine);
var fullLineRedraw;
var clientArea=this.getClientArea();
fullLineRedraw=((this.getStyle()&65536)!=0&&lastLine>firstLine);
if(clearBackground&&endOffset-lineOffset>=line.length){
fullLineRedraw=true;
}var layout=this.renderer.getTextLayout(line,lineOffset);
var rect=layout.getBounds(offsetInFirstLine,Math.min(endOffset,line.length)-1);
this.renderer.disposeTextLayout(layout);
rect.x-=this.horizontalScrollOffset;
rect.intersect(clientArea);
redrawY=firstLine*this.lineHeight-this.verticalScrollOffset;
redrawWidth=fullLineRedraw?clientArea.width-this.leftMargin-this.rightMargin:rect.width;
this.draw(rect.x,redrawY,redrawWidth,this.lineHeight,clearBackground);
if(lineCount>1){
lineOffset=this.content.getOffsetAtLine(lastLine);
var offsetInLastLine=endOffset-lineOffset;
if(offsetInLastLine>0){
line=this.content.getLine(lastLine);
if(clearBackground&&offsetInLastLine>=line.length){
fullLineRedraw=true;
}line=this.content.getLine(lastLine);
layout=this.renderer.getTextLayout(line,lineOffset);
rect=layout.getBounds(0,offsetInLastLine-1);
this.renderer.disposeTextLayout(layout);
rect.x-=this.horizontalScrollOffset;
rect.intersect(clientArea);
redrawY=lastLine*this.lineHeight-this.verticalScrollOffset;
redrawWidth=fullLineRedraw?clientArea.width-this.leftMargin-this.rightMargin:rect.width;
this.draw(rect.x,redrawY,redrawWidth,this.lineHeight,clearBackground);
}}},"~N,~N,~N,~N,~B");
$_M(c$,"redrawMultiLineChange",
function(y,newLineCount,replacedLineCount){
var clientArea=this.getClientArea();
var lineCount=newLineCount-replacedLineCount;
var sourceY;
var destinationY;
if(lineCount>0){
sourceY=Math.max(0,y+this.lineHeight);
destinationY=sourceY+lineCount*this.lineHeight;
}else{
destinationY=Math.max(0,y+this.lineHeight);
sourceY=destinationY-lineCount*this.lineHeight;
}this.scroll(0,destinationY,0,sourceY,clientArea.width,clientArea.height,true);
if(y+this.lineHeight>0&&y<=clientArea.height){
$_U(this,$wt.custom.StyledText,"redraw",[0,y,clientArea.width,this.lineHeight,true]);
}if(newLineCount>0){
var redrawStartY=y+this.lineHeight;
var redrawHeight=newLineCount*this.lineHeight;
if(redrawStartY+redrawHeight>0&&redrawStartY<=clientArea.height){
$_U(this,$wt.custom.StyledText,"redraw",[0,redrawStartY,clientArea.width,redrawHeight,true]);
}}},"~N,~N,~N");
$_M(c$,"redrawRange",
function(start,length,clearBackground){
var end=start+length;
var contentLength=this.content.getCharCount();
var firstLine;
var lastLine;
firstLine=this.content.getLineAtOffset(start);
lastLine=this.content.getLineAtOffset(end);
this.lineCache.reset(firstLine,lastLine-firstLine+1,true);
this.internalRedrawRange(start,length,clearBackground);
},"~N,~N,~B");
$_M(c$,"removeBidiSegmentListener",
function(listener){
this.removeListener(3007,listener);
},"$wt.custom.BidiSegmentListener");
$_M(c$,"removeExtendedModifyListener",
function(extendedModifyListener){
this.removeListener(3000,extendedModifyListener);
},"$wt.custom.ExtendedModifyListener");
$_M(c$,"removeLineBackgroundListener",
function(listener){
this.removeListener(3001,listener);
if(this.isListening(3001)==false&&this.userLineBackground){
var typedListener=new $wt.custom.StyledTextListener(this.defaultLineStyler);
this.addListener(3001,typedListener);
this.userLineBackground=false;
}},"$wt.custom.LineBackgroundListener");
$_M(c$,"removeLineStyleListener",
function(listener){
this.removeListener(3002,listener);
if(this.isListening(3002)==false&&this.userLineStyle){
var typedListener=new $wt.custom.StyledTextListener(this.defaultLineStyler);
this.addListener(3002,typedListener);
this.userLineStyle=false;
}},"$wt.custom.LineStyleListener");
$_M(c$,"removeModifyListener",
function(modifyListener){
this.removeListener(24,modifyListener);
},"$wt.events.ModifyListener");
$_M(c$,"removeSelectionListener",
function(listener){
this.removeListener(13,listener);
},"$wt.events.SelectionListener");
$_M(c$,"removeVerifyListener",
function(verifyListener){
this.removeListener(25,verifyListener);
},"$wt.events.VerifyListener");
$_M(c$,"removeVerifyKeyListener",
function(listener){
this.removeListener(3005,listener);
},"$wt.custom.VerifyKeyListener");
$_M(c$,"replaceStyleRanges",
function(start,length,ranges){
if(this.userLineStyle){
return;
}if(ranges.length==0){
this.setStyleRange(new $wt.custom.StyleRange(start,length,null,null));
return;
}var end=start+length;
var firstLine=this.content.getLineAtOffset(start);
var lastLine=this.content.getLineAtOffset(end);
this.defaultLineStyler.replaceStyleRanges(start,length,ranges);
this.lineCache.reset(firstLine,lastLine-firstLine+1,true);
if(this.isAreaVisible(firstLine,lastLine)){
var redrawY=firstLine*this.lineHeight-this.verticalScrollOffset;
var redrawStopY=(lastLine+1)*this.lineHeight-this.verticalScrollOffset;
this.draw(0,redrawY,this.getClientArea().width,redrawStopY-redrawY,true);
}this.setCaretLocation();
},"~N,~N,~A");
$_M(c$,"replaceTextRange",
function(start,length,text){
var contentLength=this.getCharCount();
var end=start+length;
var event=new $wt.widgets.Event();
event.start=start;
event.end=end;
event.text=text;
this.modifyContent(event,false);
},"~N,~N,~S");
$_M(c$,"reset",
function(){
var verticalBar=this.getVerticalBar();
var horizontalBar=this.getHorizontalBar();
this.caretOffset=0;
this.topIndex=0;
this.topOffset=0;
this.verticalScrollOffset=0;
this.horizontalScrollOffset=0;
this.resetSelection();
if(this.defaultLineStyler!=null){
this.removeLineBackgroundListener(this.defaultLineStyler);
this.removeLineStyleListener(this.defaultLineStyler);
this.installDefaultLineStyler();
}this.calculateContentWidth();
if(verticalBar!=null){
verticalBar.setSelection(0);
}if(horizontalBar!=null){
horizontalBar.setSelection(0);
}this.setScrollBars();
this.setCaretLocation();
$_U(this,$wt.custom.StyledText,"redraw",[]);
});
$_M(c$,"resetSelection",
function(){
this.selection.x=this.selection.y=this.caretOffset;
this.selectionAnchor=-1;
});
$_M(c$,"scrollHorizontal",
function(pixels){
var clientArea;
if(pixels==0){
return;
}clientArea=this.getClientArea();
if(pixels>0){
var sourceX=this.leftMargin+pixels;
var scrollWidth=clientArea.width-sourceX-this.rightMargin;
var scrollHeight=clientArea.height-this.topMargin-this.bottomMargin;
this.scroll(this.leftMargin,this.topMargin,sourceX,this.topMargin,scrollWidth,scrollHeight,true);
if(sourceX>scrollWidth){
$_U(this,$wt.custom.StyledText,"redraw",[this.leftMargin+scrollWidth,this.topMargin,pixels-scrollWidth,scrollHeight,true]);
}}else{
var destinationX=this.leftMargin-pixels;
var scrollWidth=clientArea.width-destinationX-this.rightMargin;
var scrollHeight=clientArea.height-this.topMargin-this.bottomMargin;
this.scroll(destinationX,this.topMargin,this.leftMargin,this.topMargin,scrollWidth,scrollHeight,true);
if(destinationX>scrollWidth){
$_U(this,$wt.custom.StyledText,"redraw",[this.leftMargin+scrollWidth,this.topMargin,-pixels-scrollWidth,scrollHeight,true]);
}}this.horizontalScrollOffset+=pixels;
var oldColumnX=this.columnX-pixels;
this.setCaretLocation();
this.columnX=oldColumnX;
},"~N");
$_M(c$,"scrollHorizontalBar",
function(pixels){
if(pixels==0){
return false;
}var horizontalBar=this.getHorizontalBar();
if(horizontalBar!=null){
horizontalBar.setSelection(this.horizontalScrollOffset+pixels);
}this.scrollHorizontal(pixels);
return true;
},"~N");
$_M(c$,"selectAll",
function(){
this.setSelection(0,Math.max(this.getCharCount(),0));
});
$_M(c$,"sendKeyEvent",
function(event){
if(this.editable==false){
return;
}this.modifyContent(event,true);
},"$wt.widgets.Event");
$_M(c$,"sendModifyEvent",
function(event){
var accessible=this.getAccessible();
if(event.text.length==0){
accessible.textChanged(1,event.start,event.end-event.start);
}else{
if(event.start==event.end){
accessible.textChanged(0,event.start,event.text.length);
}else{
accessible.textChanged(1,event.start,event.end-event.start);
accessible.textChanged(0,event.start,event.text.length);
}}this.notifyListeners(24,event);
},"$wt.widgets.Event");
$_M(c$,"sendSelectionEvent",
function(){
this.getAccessible().textSelectionChanged();
var event=new $wt.widgets.Event();
event.x=this.selection.x;
event.y=this.selection.y;
this.notifyListeners(13,event);
});
$_M(c$,"setWordWrap",
function(wrap){
if((this.getStyle()&4)!=0)return;
if(wrap!=this.wordWrap){
var horizontalBar=this.getHorizontalBar();
this.wordWrap=wrap;
if(this.wordWrap){
this.logicalContent=this.content;
this.content=new $wt.custom.WrappedContent(this.renderer,this.logicalContent);
}else{
this.content=this.logicalContent;
}this.calculateContentWidth();
this.horizontalScrollOffset=0;
if(horizontalBar!=null){
horizontalBar.setVisible(!this.wordWrap);
}this.setScrollBars();
this.setCaretLocation();
$_U(this,$wt.custom.StyledText,"redraw",[]);
}},"~B");
$_M(c$,"setCaret",
function(caret){
$_U(this,$wt.custom.StyledText,"setCaret",[caret]);
this.caretDirection=0;
if(caret!=null){
this.setCaretLocation();
}},"$wt.widgets.Caret");
$_M(c$,"setBackground",
function(color){
this.$background=color;
$_U(this,$wt.custom.StyledText,"setBackground",[this.getBackground()]);
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setBidiColoring",
function(mode){
this.bidiColoring=mode;
},"~B");
$_M(c$,"setCaretLocation",
function(newCaretX,line,direction){
var caret=this.getCaret();
if(caret!=null){
var updateImage=caret===this.defaultCaret;
var imageDirection=direction;
if(this.isMirrored()){
if(imageDirection==16384){
imageDirection=131072;
}else if(imageDirection==131072){
imageDirection=16384;
}}if(updateImage&&imageDirection==131072){
newCaretX-=(caret.getSize().x-1);
}var newCaretY=line*this.lineHeight-this.verticalScrollOffset+this.topMargin;
caret.setLocation(newCaretX,newCaretY);
this.getAccessible().textCaretMoved(this.getCaretOffset());
if(direction!=this.caretDirection){
this.caretDirection=direction;
if(updateImage){
if(imageDirection==-1){
this.defaultCaret.setImage(null);
}else if(imageDirection==16384){
this.defaultCaret.setImage(this.leftCaretBitmap);
}else if(imageDirection==131072){
this.defaultCaret.setImage(this.rightCaretBitmap);
}}caret.setSize(caret.getSize().x,this.lineHeight);
}}this.columnX=newCaretX;
},"~N,~N,~N");
$_M(c$,"setCaretLocation",
function(){
var lineIndex=this.getCaretLine();
var line=this.content.getLine(lineIndex);
var lineOffset=this.content.getOffsetAtLine(lineIndex);
var offsetInLine=this.caretOffset-lineOffset;
var newCaretX=this.getXAtOffset(line,lineIndex,offsetInLine);
this.setCaretLocation(newCaretX,lineIndex,this.getCaretDirection());
});
$_M(c$,"setCaretOffset",
function(offset){
var length=this.getCharCount();
if(length>0&&offset!=this.caretOffset){
if(offset<0){
this.caretOffset=0;
}else if(offset>length){
this.caretOffset=length;
}else{
this.caretOffset=offset;
}this.clearSelection(false);
}this.setCaretLocation();
},"~N");
$_M(c$,"setClipboardContent",
function(start,length,clipboardType){
if(clipboardType==2&&!($wt.custom.StyledText.IS_MOTIF||$wt.custom.StyledText.IS_GTK))return;
var plainTextTransfer=$wt.dnd.TextTransfer.getInstance();
var plainTextWriter=$_N($wt.custom.StyledText.TextWriter,this,null,start,length);
var plainText=this.getPlatformDelimitedText(plainTextWriter);
var data;
var types;
if(clipboardType==2){
data=[plainText];
types=[plainTextTransfer];
}else{
var rtfTransfer=$wt.dnd.RTFTransfer.getInstance();
var rtfWriter=$_N($wt.custom.StyledText.RTFWriter,this,null,start,length);
var rtfText=this.getPlatformDelimitedText(rtfWriter);
data=[rtfText,plainText];
types=[rtfTransfer,plainTextTransfer];
}this.clipboard.setContents(data,types,clipboardType);
},"~N,~N,~N");
$_M(c$,"setContent",
function(newContent){
if(this.content!=null){
this.content.removeTextChangeListener(this.textChangeListener);
}this.logicalContent=newContent;
if(this.wordWrap){
this.content=new $wt.custom.WrappedContent(this.renderer,this.logicalContent);
}else{
this.content=this.logicalContent;
}this.content.addTextChangeListener(this.textChangeListener);
this.reset();
},"$wt.custom.StyledTextContent");
$_M(c$,"setCursor",
function(cursor){
if(cursor==null){
$_U(this,$wt.custom.StyledText,"setCursor",[this.ibeamCursor]);
}else{
$_U(this,$wt.custom.StyledText,"setCursor",[cursor]);
}},"$wt.graphics.Cursor");
$_M(c$,"setDoubleClickEnabled",
function(enable){
this.doubleClickEnabled=enable;
},"~B");
$_M(c$,"setEditable",
function(editable){
this.editable=editable;
},"~B");
$_M(c$,"setFont",
function(font){
var oldLineHeight=this.lineHeight;
$_U(this,$wt.custom.StyledText,"setFont",[font]);
this.initializeRenderer();
if(this.lineHeight!=oldLineHeight){
this.setVerticalScrollOffset(Math.floor(this.verticalScrollOffset*this.lineHeight/oldLineHeight),true);
this.claimBottomFreeSpace();
}this.calculateContentWidth();
this.calculateScrollBars();
if(this.isBidiCaret())this.createCaretBitmaps();
this.caretDirection=0;
this.setCaretLocation();
$_U(this,$wt.custom.StyledText,"redraw",[]);
},"$wt.graphics.Font");
$_M(c$,"setForeground",
function(color){
this.$foreground=color;
$_U(this,$wt.custom.StyledText,"setForeground",[this.getForeground()]);
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setHorizontalIndex",
function(offset){
var clientAreaWidth=this.getClientArea().width;
if(this.getCharCount()==0){
return;
}if(offset<0){
offset=0;
}offset*=this.getHorizontalIncrement();
if(clientAreaWidth>0){
var width=this.lineCache.getWidth();
if(offset>width-clientAreaWidth){
offset=Math.max(0,width-clientAreaWidth);
}}this.scrollHorizontalBar(offset-this.horizontalScrollOffset);
},"~N");
$_M(c$,"setHorizontalPixel",
function(pixel){
var clientAreaWidth=this.getClientArea().width;
if(this.getCharCount()==0){
return;
}if(pixel<0){
pixel=0;
}if(clientAreaWidth>0){
var width=this.lineCache.getWidth();
if(pixel>width-clientAreaWidth){
pixel=Math.max(0,width-clientAreaWidth);
}}this.scrollHorizontalBar(pixel-this.horizontalScrollOffset);
},"~N");
$_M(c$,"setHorizontalScrollBar",
function(){
var horizontalBar=this.getHorizontalBar();
if(horizontalBar!=null&&horizontalBar.getVisible()){
var INACTIVE=1;
var clientArea=this.getClientArea();
if(clientArea.width<this.lineCache.getWidth()){
horizontalBar.setValues(horizontalBar.getSelection(),horizontalBar.getMinimum(),this.lineCache.getWidth(),clientArea.width-this.leftMargin-this.rightMargin,horizontalBar.getIncrement(),clientArea.width-this.leftMargin-this.rightMargin);
}else if(horizontalBar.getThumb()!=1||horizontalBar.getMaximum()!=1){
horizontalBar.setValues(horizontalBar.getSelection(),horizontalBar.getMinimum(),1,1,horizontalBar.getIncrement(),1);
}}});
$_M(c$,"setLineBackground",
function(startLine,lineCount,background){
var partialBottomIndex=this.getPartialBottomIndex();
if(this.userLineBackground){
return;
}this.defaultLineStyler.setLineBackground(startLine,lineCount,background);
if(startLine>partialBottomIndex||startLine+lineCount-1<this.topIndex){
return;
}if(startLine<this.topIndex){
lineCount-=this.topIndex-startLine;
startLine=this.topIndex;
}if(startLine+lineCount-1>partialBottomIndex){
lineCount=partialBottomIndex-startLine+1;
}startLine-=this.topIndex;
$_U(this,$wt.custom.StyledText,"redraw",[this.leftMargin,startLine*this.lineHeight+this.topMargin,this.getClientArea().width-this.leftMargin-this.rightMargin,lineCount*this.lineHeight,true]);
},"~N,~N,$wt.graphics.Color");
$_M(c$,"setMouseWordSelectionAnchor",
function(){
if(this.mouseDoubleClick==false){
return;
}if(this.caretOffset<this.doubleClickSelection.x){
this.selectionAnchor=this.doubleClickSelection.y;
}else if(this.caretOffset>this.doubleClickSelection.y){
this.selectionAnchor=this.doubleClickSelection.x;
}});
$_M(c$,"setOrientation",
function(orientation){
if((orientation&(100663296))==0){
return;
}if((orientation&67108864)!=0&&(orientation&33554432)!=0){
return;
}if((orientation&67108864)!=0&&this.isMirrored()){
return;
}if((orientation&33554432)!=0&&this.isMirrored()==false){
return;
}this.$isMirrored=(orientation&67108864)!=0;
this.initializeRenderer();
this.caretDirection=0;
this.setCaretLocation();
this.keyActionMap.clear();
this.createKeyBindings();
$_U(this,$wt.custom.StyledText,"redraw",[]);
},"~N");
$_M(c$,"setScrollBars",
function(){
var verticalBar=this.getVerticalBar();
if(verticalBar!=null){
var clientArea=this.getClientArea();
var INACTIVE=1;
var maximum=this.content.getLineCount()*this.getVerticalIncrement();
if(clientArea.height<maximum){
verticalBar.setValues(verticalBar.getSelection(),verticalBar.getMinimum(),maximum,clientArea.height,verticalBar.getIncrement(),clientArea.height);
}else if(verticalBar.getThumb()!=1||verticalBar.getMaximum()!=1){
verticalBar.setValues(verticalBar.getSelection(),verticalBar.getMinimum(),1,1,verticalBar.getIncrement(),1);
}}this.setHorizontalScrollBar();
});
$_M(c$,"setSelection",
function(start){
this.setSelection(start,start);
},"~N");
$_M(c$,"setSelection",
function(point){
this.setSelection(point.x,point.y);
},"$wt.graphics.Point");
$_M(c$,"setSelectionBackground",
function(color){
if(color!=null){
}this.selectionBackground=color;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setSelectionForeground",
function(color){
if(color!=null){
}this.selectionForeground=color;
this.redraw();
},"$wt.graphics.Color");
$_M(c$,"setSelection",
function(start,end){
this.setSelectionRange(start,end-start);
this.showSelection();
},"~N,~N");
$_M(c$,"setSelectionRange",
function(start,length){
var contentLength=this.getCharCount();
start=Math.max(0,Math.min(start,contentLength));
var end=start+length;
if(end<0){
length=-start;
}else{
if(end>contentLength)length=contentLength-start;
}this.internalSetSelection(start,length,false);
this.setCaretLocation();
},"~N,~N");
$_M(c$,"internalSetSelection",
function(start,length,sendEvent){
var end=start+length;
if(start>end){
var temp=end;
end=start;
start=temp;
}if(this.selection.x!=start||this.selection.y!=end||(length>0&&this.selectionAnchor!=this.selection.x)||(length<0&&this.selectionAnchor!=this.selection.y)){
this.clearSelection(sendEvent);
if(length<0){
this.selectionAnchor=this.selection.y=end;
this.caretOffset=this.selection.x=start;
}else{
this.selectionAnchor=this.selection.x=start;
this.caretOffset=this.selection.y=end;
}this.internalRedrawRange(this.selection.x,this.selection.y-this.selection.x,true);
}},"~N,~N,~B");
$_M(c$,"setStyleRange",
function(range){
if(this.userLineStyle){
return;
}this.defaultLineStyler.setStyleRange(range);
if(range!=null){
var firstLine=this.content.getLineAtOffset(range.start);
var lastLine=this.content.getLineAtOffset(range.start+range.length);
this.lineCache.reset(firstLine,lastLine-firstLine+1,true);
if(this.isAreaVisible(firstLine,lastLine)){
var redrawY=firstLine*this.lineHeight-this.verticalScrollOffset;
var redrawStopY=(lastLine+1)*this.lineHeight-this.verticalScrollOffset;
this.draw(0,redrawY,this.getClientArea().width,redrawStopY-redrawY,true);
}}else{
this.lineCache.reset(0,this.content.getLineCount(),false);
this.redraw();
}this.setCaretLocation();
},"$wt.custom.StyleRange");
$_M(c$,"setStyleRanges",
function(ranges){
if(this.userLineStyle){
return;
}if(ranges.length!=0){
var last=ranges[ranges.length-1];
var lastEnd=last.start+last.length;
var firstLine=this.content.getLineAtOffset(ranges[0].start);
var lastLine;
lastLine=this.content.getLineAtOffset(lastEnd);
this.lineCache.reset(firstLine,lastLine-firstLine+1,true);
}else{
this.lineCache.reset(0,this.content.getLineCount(),false);
}this.defaultLineStyler.setStyleRanges(ranges);
this.redraw();
this.setCaretLocation();
},"~A");
$_M(c$,"setTabs",
function(tabs){
this.tabLength=tabs;
this.renderer.setTabLength(this.tabLength);
if(this.caretOffset>0){
this.caretOffset=0;
this.showCaret();
this.clearSelection(false);
}this.lineCache.reset(0,this.content.getLineCount(),false);
this.redraw();
},"~N");
$_M(c$,"setText",
function(text){
var event=new $wt.widgets.Event();
event.start=0;
event.end=this.getCharCount();
event.text=text;
event.doit=true;
this.notifyListeners(25,event);
if(event.doit){
var styledTextEvent=null;
if(this.isListening(3000)){
styledTextEvent=new $wt.custom.StyledTextEvent(this.logicalContent);
styledTextEvent.start=event.start;
styledTextEvent.end=event.start+event.text.length;
styledTextEvent.text=this.content.getTextRange(event.start,event.end-event.start);
}this.content.setText(event.text);
this.sendModifyEvent(event);
if(styledTextEvent!=null){
this.notifyListeners(3000,styledTextEvent);
}}},"~S");
$_M(c$,"setTextLimit",
function(limit){
this.textLimit=limit;
},"~N");
$_M(c$,"setTopIndex",
function(topIndex){
var lineCount=this.logicalContent.getLineCount();
var pageSize=Math.max(1,Math.min(lineCount,this.getLineCountWhole()));
if(this.getCharCount()==0){
return;
}if(topIndex<0){
topIndex=0;
}else if(topIndex>lineCount-pageSize){
topIndex=lineCount-pageSize;
}if(this.wordWrap){
var logicalLineOffset=this.logicalContent.getOffsetAtLine(topIndex);
topIndex=this.content.getLineAtOffset(logicalLineOffset);
}this.setVerticalScrollOffset(topIndex*this.getVerticalIncrement(),true);
},"~N");
$_M(c$,"setTopPixel",
function(pixel){
var lineCount=this.content.getLineCount();
var height=this.getClientArea().height;
var maxTopPixel=Math.max(0,lineCount*this.getVerticalIncrement()-height);
if(this.getCharCount()==0){
return;
}if(pixel<0){
pixel=0;
}else if(pixel>maxTopPixel){
pixel=maxTopPixel;
}this.setVerticalScrollOffset(pixel,true);
},"~N");
$_M(c$,"setVerticalScrollOffset",
function(pixelOffset,adjustScrollBar){
var clientArea;
var verticalBar=this.getVerticalBar();
if(pixelOffset==this.verticalScrollOffset){
return false;
}if(verticalBar!=null&&adjustScrollBar){
verticalBar.setSelection(pixelOffset);
}clientArea=this.getClientArea();
this.scroll(0,0,0,pixelOffset-this.verticalScrollOffset,clientArea.width,clientArea.height,true);
this.verticalScrollOffset=pixelOffset;
this.calculateTopIndex();
var oldColumnX=this.columnX;
this.setCaretLocation();
this.columnX=oldColumnX;
return true;
},"~N,~B");
$_M(c$,"showLocation",
function(x,line){
var clientAreaWidth=this.getClientArea().width-this.leftMargin;
var verticalIncrement=this.getVerticalIncrement();
var horizontalIncrement=Math.floor(clientAreaWidth/4);
var scrolled=false;
if(x<this.leftMargin){
x=Math.max(this.horizontalScrollOffset*-1,x-horizontalIncrement);
scrolled=this.scrollHorizontalBar(x);
}else if(x>=clientAreaWidth){
x=Math.min(this.lineCache.getWidth()-this.horizontalScrollOffset,x+horizontalIncrement);
scrolled=this.scrollHorizontalBar(x-clientAreaWidth);
}if(line<this.topIndex){
scrolled=this.setVerticalScrollOffset(line*verticalIncrement,true);
}else if(line>this.getBottomIndex()){
scrolled=this.setVerticalScrollOffset((line+1)*verticalIncrement-this.getClientArea().height,true);
}return scrolled;
},"~N,~N");
$_M(c$,"showCaret",
function(){
var caretLine=this.content.getLineAtOffset(this.caretOffset);
this.showCaret(caretLine);
});
$_M(c$,"showCaret",
function(caretLine){
var lineOffset=this.content.getOffsetAtLine(caretLine);
var line=this.content.getLine(caretLine);
var offsetInLine=this.caretOffset-lineOffset;
var newCaretX=this.getXAtOffset(line,caretLine,offsetInLine);
var scrolled=this.showLocation(newCaretX,caretLine);
var setWrapCaretLocation=false;
var caret=this.getCaret();
if(this.wordWrap&&caret!=null){
var caretY=caret.getLocation().y;
if(Math.floor((caretY+this.verticalScrollOffset)/this.getVerticalIncrement())-1!=caretLine){
setWrapCaretLocation=true;
}}if(scrolled==false||setWrapCaretLocation){
this.setCaretLocation(newCaretX,caretLine,this.getCaretDirection());
}},"~N");
$_M(c$,"showOffset",
function(offset){
var line=this.content.getLineAtOffset(offset);
var lineOffset=this.content.getOffsetAtLine(line);
var offsetInLine=offset-lineOffset;
var lineText=this.content.getLine(line);
var xAtOffset=this.getXAtOffset(lineText,line,offsetInLine);
this.showLocation(xAtOffset,line);
},"~N");
$_M(c$,"showSelection",
function(){
var selectionFits;
var startOffset;
var startLine;
var startX;
var endOffset;
var endLine;
var endX;
var offsetInLine;
var rightToLeft=this.caretOffset==this.selection.x;
if(rightToLeft){
startOffset=this.selection.y;
endOffset=this.selection.x;
}else{
startOffset=this.selection.x;
endOffset=this.selection.y;
}startLine=this.content.getLineAtOffset(startOffset);
offsetInLine=startOffset-this.content.getOffsetAtLine(startLine);
startX=this.getXAtOffset(this.content.getLine(startLine),startLine,offsetInLine);
endLine=this.content.getLineAtOffset(endOffset);
offsetInLine=endOffset-this.content.getOffsetAtLine(endLine);
endX=this.getXAtOffset(this.content.getLine(endLine),endLine,offsetInLine);
var w=this.getClientArea().width;
if(rightToLeft){
selectionFits=startX-endX<=w;
}else{
selectionFits=endX-startX<=w;
}if(selectionFits){
this.showLocation(startX,startLine);
endX=this.getXAtOffset(this.content.getLine(endLine),endLine,offsetInLine);
this.showLocation(endX,endLine);
}else{
this.showLocation(endX,endLine);
}});
$_M(c$,"isBidiCaret",
function(){
return true;
});
$_M(c$,"updateSelection",
function(startOffset,replacedLength,newLength){
if(this.selection.y<=startOffset){
return;
}if(this.selection.x<startOffset){
this.internalRedrawRange(this.selection.x,startOffset-this.selection.x,true);
}if(this.selection.y>startOffset+replacedLength&&this.selection.x<startOffset+replacedLength){
var netNewLength=newLength-replacedLength;
var redrawStart=startOffset+newLength;
this.internalRedrawRange(redrawStart,this.selection.y+netNewLength-redrawStart,true);
}if(this.selection.y>startOffset&&this.selection.x<startOffset+replacedLength){
this.internalSetSelection(startOffset+newLength,0,true);
this.setCaretLocation();
}else{
this.internalSetSelection(this.selection.x+newLength-replacedLength,this.selection.y-this.selection.x,true);
this.setCaretLocation();
}},"~N,~N,~N");
$_M(c$,"wordWrapResize",
function(oldClientAreaWidth){
var wrappedContent=this.content;
var newTopIndex;
if(oldClientAreaWidth!=0&&this.clientAreaWidth>oldClientAreaWidth&&wrappedContent.getLineCount()==this.logicalContent.getLineCount()){
return;
}wrappedContent.wrapLines();
newTopIndex=this.content.getLineAtOffset(this.topOffset);
if(newTopIndex<this.content.getLineCount()-1&&this.topOffset==this.content.getOffsetAtLine(newTopIndex+1)){
newTopIndex++;
}if(newTopIndex!=this.topIndex){
var verticalBar=this.getVerticalBar();
this.verticalScrollOffset+=(newTopIndex-this.topIndex)*this.getVerticalIncrement();
if(this.verticalScrollOffset<0){
this.verticalScrollOffset=0;
}this.topIndex=newTopIndex;
this.topOffset=this.content.getOffsetAtLine(this.topIndex);
if(verticalBar!=null){
verticalBar.setSelection(this.verticalScrollOffset);
}}this.setCaretLocation();
$_U(this,$wt.custom.StyledText,"redraw",[]);
},"~N");
$_V(c$,"useNativeScrollBar",
function(){
return true;
});
c$.$StyledText$RTFWriter$=function(){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.colorTable=null;
this.WriteUnicode=false;
$_Z(this,arguments);
},$wt.custom.StyledText,"RTFWriter",$wt.custom.StyledText.TextWriter,null,$_N($wt.custom.StyledText.TextWriter,this,null,$_G));
$_Y(c$,function(){
this.colorTable=new java.util.Vector();
});
$_K(c$,
function(start,length){
$_R(this,$wt.custom.StyledText.RTFWriter,[start,length]);
this.colorTable.addElement(this.b$["$wt.custom.StyledText"].getForeground());
this.colorTable.addElement(this.b$["$wt.custom.StyledText"].getBackground());
this.setUnicode();
},"~N,~N");
$_M(c$,"close",
function(){
if(this.isClosed()==false){
this.writeHeader();
this.write("\n}}\0");
$_U(this,$wt.custom.StyledText.RTFWriter,"close",[]);
}});
$_M(c$,"getColorIndex",
function(color,defaultIndex){
var index;
if(color==null){
index=defaultIndex;
}else{
index=this.colorTable.indexOf(color);
if(index==-1){
index=this.colorTable.size();
this.colorTable.addElement(color);
}}return index;
},"$wt.graphics.Color,~N");
$_M(c$,"setUnicode",
function(){
var Win95="windows 95";
var Win98="windows 98";
var WinME="windows me";
var WinNT="windows nt";
var osName=System.getProperty("os.name").toLowerCase();
var osVersion=System.getProperty("os.version");
var majorVersion=0;
if(osName.startsWith("windows nt")&&osVersion!=null){
var majorIndex=osVersion.indexOf('.');
if(majorIndex!=-1){
osVersion=osVersion.substring(0,majorIndex);
try{
majorVersion=Integer.parseInt(osVersion);
}catch(exception){
if($_O(exception,NumberFormatException)){
}else{
throw exception;
}
}
}}if(osName.startsWith("windows 95")==false&&osName.startsWith("windows 98")==false&&osName.startsWith("windows me")==false&&(osName.startsWith("windows nt")==false||majorVersion>4)){
this.WriteUnicode=true;
}else{
this.WriteUnicode=false;
}});
$_M(c$,"write",
function(string,start,end){
for(var index=start;index<end;index++){
var ch=string.charAt(index);
if((ch).charCodeAt(0)>0xFF&&this.WriteUnicode){
if(index>start){
this.write(string.substring(start,index));
}this.write("\\u");
this.write(Integer.toString((ch).charCodeAt(0)));
this.write(' ');
start=index+1;
}else if((ch).charCodeAt(0)==('}').charCodeAt (0) || (ch).charCodeAt (0) == ('{').charCodeAt (0) || (ch).charCodeAt (0) == ('\\').charCodeAt(0)){
if(index>start){
this.write(string.substring(start,index));
}this.write('\\');
this.write(ch);
start=index+1;
}}
if(start<end){
this.write(string.substring(start,end));
}},"~S,~N,~N");
$_M(c$,"writeHeader",
function(){
var header=new StringBuffer();
var fontData=this.b$["$wt.custom.StyledText"].getFont().getFontData()[0];
header.append("{\\rtf1\\ansi");
var cpg=System.getProperty("file.encoding").toLowerCase();
if(cpg.startsWith("cp")||cpg.startsWith("ms")){
cpg=cpg.substring(2,cpg.length);
header.append("\\ansicpg");
header.append(cpg);
}header.append("\\uc0\\deff0{\\fonttbl{\\f0\\fnil");
header.append(fontData.getName());
header.append(";}}\n{\\colortbl");
for(var i=0;i<this.colorTable.size();i++){
var color=this.colorTable.elementAt(i);
header.append("\\red");
header.append(color.getRed());
header.append("\\green");
header.append(color.getGreen());
header.append("\\blue");
header.append(color.getBlue());
header.append(";");
}
header.append("}\n{\\f0\\fs");
header.append(fontData.getHeight()*2);
header.append(" ");
this.write(header.toString(),0);
});
$_V(c$,"writeLine",
function(line,lineOffset){
var styles=new Array(0);
var lineBackground=null;
var event;
event=this.b$["$wt.custom.StyledText"].renderer.getLineStyleData(lineOffset,line);
if(event!=null){
styles=event.styles;
}event=this.b$["$wt.custom.StyledText"].renderer.getLineBackgroundData(lineOffset,line);
if(event!=null){
lineBackground=event.lineBackground;
}if(lineBackground==null){
lineBackground=this.b$["$wt.custom.StyledText"].getBackground();
}this.writeStyledLine(line,lineOffset,styles,lineBackground);
},"~S,~N");
$_V(c$,"writeLineDelimiter",
function(lineDelimiter){
this.write(lineDelimiter,0,lineDelimiter.length);
this.write("\\par");
},"~S");
$_M(c$,"writeStyledLine",
function(line,lineOffset,styles,lineBackground){
var lineLength=line.length;
var lineIndex;
var copyEnd;
var startOffset=this.getStart();
var endOffset=startOffset+$_U(this,$wt.custom.StyledText.RTFWriter,"getCharCount",[]);
var lineEndOffset=Math.min(lineLength,endOffset-lineOffset);
var writeOffset=startOffset-lineOffset;
if(writeOffset>=line.length){
return;
}else if(writeOffset>0){
lineIndex=writeOffset;
}else{
lineIndex=0;
}if(lineBackground!=null){
this.write("{\\highlight");
this.write(this.getColorIndex(lineBackground,1));
this.write(" ");
}for(var i=0;i<styles.length;i++){
var style=styles[i];
var start=style.start-lineOffset;
var end=start+style.length;
var colorIndex;
if(end<writeOffset){
continue;}if(start>=lineEndOffset){
break;
}if(lineIndex<start){
this.write(line,lineIndex,start);
lineIndex=start;
}colorIndex=this.getColorIndex(style.background,1);
this.write("{\\cf");
this.write(this.getColorIndex(style.foreground,0));
if(colorIndex!=1){
this.write("\\highlight");
this.write(colorIndex);
}if((style.fontStyle&1)!=0){
this.write("\\b");
}if((style.fontStyle&2)!=0){
this.write("\\i");
}if(style.underline){
this.write("\\ul");
}if(style.strikeout){
this.write("\\strike");
}this.write(" ");
copyEnd=Math.min(end,lineEndOffset);
copyEnd=Math.max(copyEnd,lineIndex);
this.write(line,lineIndex,copyEnd);
if((style.fontStyle&1)!=0){
this.write("\\b0");
}if((style.fontStyle&2)!=0){
this.write("\\i0");
}if(style.underline){
this.write("\\ul0");
}if(style.strikeout){
this.write("\\strike0");
}this.write("}");
lineIndex=copyEnd;
}
if(lineIndex<lineEndOffset){
this.write(line,lineIndex,lineEndOffset);
}if(lineBackground!=null){
this.write("}");
}},"~S,~N,~A,$wt.graphics.Color");
$_S(c$,
"DEFAULT_FOREGROUND",0,
"DEFAULT_BACKGROUND",1);
c$=$_P();
};
c$.$StyledText$TextWriter$=function(){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.buffer=null;
this.startOffset=0;
this.endOffset=0;
this.$isClosed=false;
$_Z(this,arguments);
},$wt.custom.StyledText,"TextWriter");
$_K(c$,
function(start,length){
this.buffer=new StringBuffer(length);
this.startOffset=start;
this.endOffset=start+length;
},"~N,~N");
$_M(c$,"close",
function(){
if(this.$isClosed==false){
this.$isClosed=true;
}});
$_M(c$,"getCharCount",
function(){
return this.endOffset-this.startOffset;
});
$_M(c$,"getStart",
function(){
return this.startOffset;
});
$_M(c$,"isClosed",
function(){
return this.$isClosed;
});
$_V(c$,"toString",
function(){
return this.buffer.toString();
});
$_M(c$,"write",
function(string){
this.buffer.append(string);
},"~S");
$_M(c$,"write",
function(string,offset){
if(offset<0||offset>this.buffer.length()){
return;
}this.buffer.insert(offset,string);
},"~S,~N");
$_M(c$,"write",
function(i){
this.buffer.append(i);
},"~N");
$_M(c$,"write",
function(i){
this.buffer.append(i);
},"~N");
$_M(c$,"writeLine",
function(line,lineOffset){
var lineLength=line.length;
var lineIndex;
var copyEnd;
var writeOffset=this.startOffset-lineOffset;
if(writeOffset>=lineLength){
return;
}else if(writeOffset>0){
lineIndex=writeOffset;
}else{
lineIndex=0;
}copyEnd=Math.min(lineLength,this.endOffset-lineOffset);
if(lineIndex<copyEnd){
this.write(line.substring(lineIndex,copyEnd));
}},"~S,~N");
$_M(c$,"writeLineDelimiter",
function(lineDelimiter){
this.write(lineDelimiter);
},"~S");
c$=$_P();
};
c$.$StyledText$ContentWidthCache$=function(){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.parent=null;
this.lineWidth=null;
this.content=null;
this.lineCount=0;
this.maxWidth=0;
this.maxWidthLineIndex=0;
$_Z(this,arguments);
},$wt.custom.StyledText,"ContentWidthCache",null,$wt.custom.StyledText.LineCache);
$_K(c$,
function(parent,content){
this.parent=parent;
this.content=content;
this.lineCount=content.getLineCount();
this.lineWidth=$_A(this.lineCount,0);
this.reset(0,this.lineCount,false);
},"$wt.custom.StyledText,$wt.custom.StyledTextContent");
$_V(c$,"calculate",
function(startLine,lineCount){
var caretWidth=0;
var endLine=startLine+lineCount;
if(startLine<0||endLine>this.lineWidth.length){
return;
}caretWidth=this.b$["$wt.custom.StyledText"].getCaretWidth();
for(var i=startLine;i<endLine;i++){
if(this.lineWidth[i]==-1){
var line=this.content.getLine(i);
var lineOffset=this.content.getOffsetAtLine(i);
this.lineWidth[i]=this.contentWidth(line,lineOffset)+caretWidth;
}if(this.lineWidth[i]>this.maxWidth){
this.maxWidth=this.lineWidth[i];
this.maxWidthLineIndex=i;
}}
},"~N,~N");
$_M(c$,"calculateVisible",
function(startLine,newLineCount){
var topIndex=this.parent.getTopIndex();
var bottomLine=Math.min(this.b$["$wt.custom.StyledText"].getPartialBottomIndex(),startLine+newLineCount);
startLine=Math.max(startLine,topIndex);
this.calculate(startLine,bottomLine-startLine+1);
},"~N,~N");
$_M(c$,"contentWidth",
function(line,lineOffset){
var layout=this.b$["$wt.custom.StyledText"].renderer.getTextLayout(line,lineOffset);
var rect=layout.getLineBounds(0);
this.b$["$wt.custom.StyledText"].renderer.disposeTextLayout(layout);
return rect.x+rect.width+this.b$["$wt.custom.StyledText"].leftMargin+this.b$["$wt.custom.StyledText"].rightMargin;
},"~S,~N");
$_M(c$,"expandLines",
function(numLines){
var size=this.lineWidth.length;
if(size-this.lineCount>=numLines){
return;
}var newLines=$_A(Math.max(size*2,size+numLines),0);
System.arraycopy(this.lineWidth,0,newLines,0,size);
this.lineWidth=newLines;
this.reset(size,this.lineWidth.length-size,false);
},"~N");
$_V(c$,"getWidth",
function(){
return this.maxWidth;
});
$_M(c$,"linesChanged",
function(startLine,delta){
var inserting=delta>0;
if(delta==0){
return;
}if(inserting){
this.expandLines(delta);
for(var i=this.lineCount-1;i>=startLine;i--){
this.lineWidth[i+delta]=this.lineWidth[i];
}
for(var i=startLine+1;i<=startLine+delta&&i<this.lineWidth.length;i++){
this.lineWidth[i]=-1;
}
if(this.maxWidthLineIndex>=startLine){
this.maxWidthLineIndex+=delta;
}}else{
for(var i=startLine-delta;i<this.lineCount;i++){
this.lineWidth[i+delta]=this.lineWidth[i];
}
if(this.maxWidthLineIndex>startLine&&this.maxWidthLineIndex<=startLine-delta){
this.maxWidth=0;
this.maxWidthLineIndex=-1;
}else if(this.maxWidthLineIndex>=startLine-delta){
this.maxWidthLineIndex+=delta;
}}this.lineCount+=delta;
},"~N,~N");
$_V(c$,"redrawReset",
function(startLine,lineCount,calculateMaxWidth){
this.reset(startLine,lineCount,calculateMaxWidth);
},"~N,~N,~B");
$_V(c$,"reset",
function(startLine,lineCount,calculateMaxWidth){
var endLine=startLine+lineCount;
if(startLine<0||endLine>this.lineWidth.length){
return;
}for(var i=startLine;i<endLine;i++){
this.lineWidth[i]=-1;
}
if(this.maxWidthLineIndex>=startLine&&this.maxWidthLineIndex<endLine){
this.maxWidth=0;
this.maxWidthLineIndex=-1;
if(calculateMaxWidth){
for(var i=0;i<lineCount;i++){
if(this.lineWidth[i]>this.maxWidth){
this.maxWidth=this.lineWidth[i];
this.maxWidthLineIndex=i;
}}
}}},"~N,~N,~B");
$_V(c$,"textChanged",
function(startOffset,newLineCount,replaceLineCount,newCharCount,replaceCharCount){
var startLine=this.parent.getLineAtOffset(startOffset);
var removedMaxLine=(this.maxWidthLineIndex>startLine&&this.maxWidthLineIndex<=startLine+replaceLineCount);
if(startLine==0&&replaceLineCount==this.lineCount){
this.lineCount=newLineCount;
this.lineWidth=$_A(this.lineCount,0);
this.reset(0,this.lineCount,false);
this.maxWidth=0;
}else{
this.linesChanged(startLine,-replaceLineCount);
this.linesChanged(startLine,newLineCount);
this.lineWidth[startLine]=-1;
}this.calculateVisible(startLine,newLineCount);
if(removedMaxLine||(this.maxWidthLineIndex!=-1&&this.lineWidth[this.maxWidthLineIndex]<this.maxWidth)){
this.maxWidth=0;
for(var i=0;i<this.lineCount;i++){
if(this.lineWidth[i]>this.maxWidth){
this.maxWidth=this.lineWidth[i];
this.maxWidthLineIndex=i;
}}
}},"~N,~N,~N,~N,~N");
c$=$_P();
};
c$.$StyledText$WordWrapCache$=function(){
$_H();
c$=$_C(function(){
$_B(this,arguments);
this.parent=null;
this.visualContent=null;
$_Z(this,arguments);
},$wt.custom.StyledText,"WordWrapCache",null,$wt.custom.StyledText.LineCache);
$_K(c$,
function(parent,content){
this.parent=parent;
this.visualContent=content;
this.visualContent.wrapLines();
},"$wt.custom.StyledText,$wt.custom.WrappedContent");
$_V(c$,"calculate",
function(startLine,lineCount){
},"~N,~N");
$_V(c$,"getWidth",
function(){
return this.parent.getClientArea().width;
});
$_V(c$,"redrawReset",
function(startLine,lineCount,calculateMaxWidth){
if(lineCount==this.visualContent.getLineCount()){
this.visualContent.wrapLines();
}else{
this.visualContent.reset(startLine,lineCount);
}},"~N,~N,~B");
$_V(c$,"reset",
function(startLine,lineCount,calculateMaxWidth){
var itemCount=this.b$["$wt.custom.StyledText"].getPartialBottomIndex()-this.b$["$wt.custom.StyledText"].topIndex+1;
var oldLineOffsets=$_A(itemCount,0);
for(var i=0;i<itemCount;i++){
oldLineOffsets[i]=this.visualContent.getOffsetAtLine(i+this.b$["$wt.custom.StyledText"].topIndex);
}
this.redrawReset(startLine,lineCount,calculateMaxWidth);
if(this.b$["$wt.custom.StyledText"].getPartialBottomIndex()-this.b$["$wt.custom.StyledText"].topIndex+1!=itemCount){
this.parent.internalRedraw();
}else{
for(var i=0;i<itemCount;i++){
if(this.visualContent.getOffsetAtLine(i+this.b$["$wt.custom.StyledText"].topIndex)!=oldLineOffsets[i]){
this.parent.internalRedraw();
break;
}}
}},"~N,~N,~B");
$_V(c$,"textChanged",
function(startOffset,newLineCount,replaceLineCount,newCharCount,replaceCharCount){
var startLine=this.visualContent.getLineAtOffset(startOffset);
this.visualContent.textChanged(startOffset,newLineCount,replaceLineCount,newCharCount,replaceCharCount);
if(this.b$["$wt.custom.StyledText"].wordWrap){
var lineCount=this.b$["$wt.custom.StyledText"].content.getLineCount();
if(startLine>=lineCount)startLine=lineCount-1;
}if(startLine<=this.b$["$wt.custom.StyledText"].getPartialBottomIndex()){
this.parent.internalRedraw();
}},"~N,~N,~N,~N,~N");
c$=$_P();
};
c$.$StyledText$1$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$1",null,Runnable);
$_V(c$,"run",
function(){
if(this.b$["$wt.custom.StyledText"].autoScrollDirection==128){
var lines=(Math.floor(this.b$["$wt.custom.StyledText"].autoScrollDistance/this.b$["$wt.custom.StyledText"].getLineHeight()))+1;
this.b$["$wt.custom.StyledText"].doSelectionPageUp(lines);
this.f$.display.timerExec(50,this);
}});
c$=$_P();
};
c$.$StyledText$2$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$2",null,Runnable);
$_V(c$,"run",
function(){
if(this.b$["$wt.custom.StyledText"].autoScrollDirection==1024){
var lines=(Math.floor(this.b$["$wt.custom.StyledText"].autoScrollDistance/this.b$["$wt.custom.StyledText"].getLineHeight()))+1;
this.b$["$wt.custom.StyledText"].doSelectionPageDown(lines);
this.f$.display.timerExec(50,this);
}});
c$=$_P();
};
c$.$StyledText$3$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$3",null,Runnable);
$_V(c$,"run",
function(){
if(this.b$["$wt.custom.StyledText"].autoScrollDirection==16777220){
this.b$["$wt.custom.StyledText"].doVisualNext();
this.b$["$wt.custom.StyledText"].setMouseWordSelectionAnchor();
this.b$["$wt.custom.StyledText"].doMouseSelection();
this.f$.display.timerExec(50,this);
}});
c$=$_P();
};
c$.$StyledText$4$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$4",null,Runnable);
$_V(c$,"run",
function(){
if(this.b$["$wt.custom.StyledText"].autoScrollDirection==16777219){
this.b$["$wt.custom.StyledText"].doVisualPrevious();
this.b$["$wt.custom.StyledText"].setMouseWordSelectionAnchor();
this.b$["$wt.custom.StyledText"].doMouseSelection();
this.f$.display.timerExec(50,this);
}});
c$=$_P();
};
c$.$StyledText$5$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$5",null,$wt.custom.TextChangeListener);
$_V(c$,"textChanging",
function(event){
this.b$["$wt.custom.StyledText"].handleTextChanging(event);
},"$wt.custom.TextChangingEvent");
$_V(c$,"textChanged",
function(event){
this.b$["$wt.custom.StyledText"].handleTextChanged(event);
},"$wt.custom.TextChangedEvent");
$_V(c$,"textSet",
function(event){
this.b$["$wt.custom.StyledText"].handleTextSet(event);
},"$wt.custom.TextChangedEvent");
c$=$_P();
};
c$.$StyledText$6$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$6",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
switch(event.type){
case 12:
this.b$["$wt.custom.StyledText"].handleDispose(event);
break;
case 1:
this.b$["$wt.custom.StyledText"].handleKeyDown(event);
break;
case 2:
this.b$["$wt.custom.StyledText"].handleKeyUp(event);
break;
case 3:
this.b$["$wt.custom.StyledText"].handleMouseDown(event);
break;
case 4:
this.b$["$wt.custom.StyledText"].handleMouseUp(event);
break;
case 8:
this.b$["$wt.custom.StyledText"].handleMouseDoubleClick(event);
break;
case 5:
this.b$["$wt.custom.StyledText"].handleMouseMove(event);
break;
case 9:
this.b$["$wt.custom.StyledText"].handlePaint(event);
break;
case 11:
this.b$["$wt.custom.StyledText"].handleResize(event);
break;
case 31:
this.b$["$wt.custom.StyledText"].handleTraverse(event);
break;
}
},"$wt.widgets.Event");
c$=$_P();
};
c$.$StyledText$7$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$7",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.b$["$wt.custom.StyledText"].handleVerticalScroll(event);
},"$wt.widgets.Event");
c$=$_P();
};
c$.$StyledText$8$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$8",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.b$["$wt.custom.StyledText"].handleHorizontalScroll(event);
},"$wt.widgets.Event");
c$=$_P();
};
c$.$StyledText$9$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$9",$wt.accessibility.AccessibleAdapter);
$_V(c$,"getHelp",
function(e){
e.result=this.b$["$wt.custom.StyledText"].getToolTipText();
},"$wt.accessibility.AccessibleEvent");
c$=$_P();
};
c$.$StyledText$10$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$10",$wt.accessibility.AccessibleTextAdapter);
$_V(c$,"getCaretOffset",
function(e){
e.offset=this.b$["$wt.custom.StyledText"].getCaretOffset();
},"$wt.accessibility.AccessibleTextEvent");
$_V(c$,"getSelectionRange",
function(e){
var selection=this.b$["$wt.custom.StyledText"].getSelectionRange();
e.offset=selection.x;
e.length=selection.y;
},"$wt.accessibility.AccessibleTextEvent");
c$=$_P();
};
c$.$StyledText$11$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$11",$wt.accessibility.AccessibleControlAdapter);
$_V(c$,"getRole",
function(e){
e.detail=42;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getState",
function(e){
var state=0;
if(this.b$["$wt.custom.StyledText"].isEnabled())state|=1048576;
if(this.b$["$wt.custom.StyledText"].isFocusControl())state|=4;
if(this.b$["$wt.custom.StyledText"].isVisible()==false)state|=32768;
if(this.b$["$wt.custom.StyledText"].getEditable()==false)state|=64;
e.detail=state;
},"$wt.accessibility.AccessibleControlEvent");
$_V(c$,"getValue",
function(e){
e.result=this.b$["$wt.custom.StyledText"].getText();
},"$wt.accessibility.AccessibleControlEvent");
c$=$_P();
};
c$.$StyledText$12$=function(){
$_H();
c$=$_W($wt.custom,"StyledText$12",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
this.f$.accessible.setFocus(-1);
},"$wt.widgets.Event");
c$=$_P();
};
$_H();
c$=$_C(function(){
this.parent=null;
this.printer=null;
this.renderer=null;
this.printOptions=null;
this.printerContent=null;
this.clientArea=null;
this.printerFont=null;
this.displayFontData=null;
this.printerColors=null;
this.lineBackgrounds=null;
this.lineStyles=null;
this.bidiSegments=null;
this.gc=null;
this.pageWidth=0;
this.$startPage=0;
this.$endPage=0;
this.pageSize=0;
this.startLine=0;
this.endLine=0;
this.singleLine=false;
this.selection=null;
this.mirrored=false;
$_Z(this,arguments);
},$wt.custom.StyledText,"Printing",null,Runnable);
$_Y(c$,function(){
this.lineBackgrounds=new java.util.Hashtable();
this.lineStyles=new java.util.Hashtable();
this.bidiSegments=new java.util.Hashtable();
});
$_K(c$,
function(parent,printer,printOptions){
var data=printer.getPrinterData();
this.parent=parent;
this.printer=printer;
this.printOptions=printOptions;
this.mirrored=(parent.getStyle()&134217728)!=0;
this.singleLine=parent.isSingleLine();
this.$startPage=1;
this.$endPage=2147483647;
if(data.scope==1){
this.$startPage=data.startPage;
this.$endPage=data.endPage;
if(this.$endPage<this.$startPage){
var temp=this.$endPage;
this.$endPage=this.$startPage;
this.$startPage=temp;
}}else if(data.scope==2){
this.selection=parent.getSelectionRange();
}this.displayFontData=parent.getFont().getFontData()[0];
this.copyContent(parent.getContent());
this.cacheLineData(this.printerContent);
},"$wt.custom.StyledText,$wt.printing.Printer,$wt.custom.StyledTextPrintOptions");
$_M(c$,"cacheBidiSegments",
function(lineOffset,line){
var segments=this.parent.getBidiSegments(lineOffset,line);
if(segments!=null){
this.bidiSegments.put(new Integer(lineOffset),segments);
}},"~N,~S");
$_M(c$,"cacheLineBackground",
function(lineOffset,line){
var event=this.parent.getLineBackgroundData(lineOffset,line);
if(event!=null){
this.lineBackgrounds.put(new Integer(lineOffset),event);
}},"~N,~S");
$_M(c$,"cacheLineData",
function(printerContent){
for(var i=0;i<printerContent.getLineCount();i++){
var lineOffset=printerContent.getOffsetAtLine(i);
var line=printerContent.getLine(i);
if(this.printOptions.printLineBackground){
this.cacheLineBackground(lineOffset,line);
}if(this.printOptions.printTextBackground||this.printOptions.printTextForeground||this.printOptions.printTextFontStyle){
this.cacheLineStyle(lineOffset,line);
}if(this.parent.isBidi()){
this.cacheBidiSegments(lineOffset,line);
}}
},"$wt.custom.StyledTextContent");
$_M(c$,"cacheLineStyle",
function(lineOffset,line){
var event=this.parent.getLineStyleData(lineOffset,line);
if(event!=null){
var styles=event.styles;
for(var i=0;i<styles.length;i++){
var styleCopy=null;
if(this.printOptions.printTextBackground==false&&styles[i].background!=null){
styleCopy=styles[i].clone();
styleCopy.background=null;
}if(this.printOptions.printTextForeground==false&&styles[i].foreground!=null){
if(styleCopy==null){
styleCopy=styles[i].clone();
}styleCopy.foreground=null;
}if(this.printOptions.printTextFontStyle==false&&styles[i].fontStyle!=0){
if(styleCopy==null){
styleCopy=styles[i].clone();
}styleCopy.fontStyle=0;
}if(styleCopy!=null){
styles[i]=styleCopy;
}}
this.lineStyles.put(new Integer(lineOffset),event);
}},"~N,~S");
$_M(c$,"copyContent",
function(original){
var insertOffset=0;
this.printerContent=new $wt.custom.DefaultContent();
for(var i=0;i<original.getLineCount();i++){
var insertEndOffset;
if(i<original.getLineCount()-1){
insertEndOffset=original.getOffsetAtLine(i+1);
}else{
insertEndOffset=original.getCharCount();
}this.printerContent.replaceTextRange(insertOffset,0,original.getTextRange(insertOffset,insertEndOffset-insertOffset));
insertOffset=insertEndOffset;
}
},"$wt.custom.StyledTextContent");
$_M(c$,"createPrinterColors",
function(){
var values=this.lineBackgrounds.elements();
this.printerColors=new java.util.Hashtable();
while(values.hasMoreElements()){
var event=values.nextElement();
event.lineBackground=this.getPrinterColor(event.lineBackground);
}
values=this.lineStyles.elements();
while(values.hasMoreElements()){
var event=values.nextElement();
for(var i=0;i<event.styles.length;i++){
var style=event.styles[i];
var printerBackground=this.getPrinterColor(style.background);
var printerForeground=this.getPrinterColor(style.foreground);
if(printerBackground!==style.background||printerForeground!==style.foreground){
style=style.clone();
style.background=printerBackground;
style.foreground=printerForeground;
event.styles[i]=style;
}}
}
});
$_M(c$,"dispose",
function(){
if(this.printerColors!=null){
var colors=this.printerColors.elements();
while(colors.hasMoreElements()){
var color=colors.nextElement();
color.dispose();
}
this.printerColors=null;
}if(this.gc!=null){
this.gc.dispose();
this.gc=null;
}if(this.printerFont!=null){
this.printerFont.dispose();
this.printerFont=null;
}if(this.renderer!=null){
this.renderer.dispose();
this.renderer=null;
}});
$_M(c$,"endPage",
function(page){
this.printDecoration(page,false);
this.printer.endPage();
},"~N");
$_M(c$,"initializeRenderer",
function(){
var trim=this.printer.computeTrim(0,0,0,0);
var dpi=this.printer.getDPI();
this.printerFont=new $wt.graphics.Font(this.printer,this.displayFontData.getName(),this.displayFontData.getHeight(),0);
this.clientArea=this.printer.getClientArea();
this.pageWidth=this.clientArea.width;
this.clientArea.x=dpi.x+trim.x;
this.clientArea.y=dpi.y+trim.y;
this.clientArea.width-=(this.clientArea.x+trim.width);
this.clientArea.height-=(this.clientArea.y+trim.height);
var style=this.mirrored?67108864:33554432;
this.gc=new $wt.graphics.GC(this.printer,style);
this.gc.setFont(this.printerFont);
this.renderer=new $wt.custom.PrintRenderer(this.printer,this.printerFont,this.gc,this.printerContent,this.lineBackgrounds,this.lineStyles,this.bidiSegments,this.parent.tabLength,this.clientArea);
if(this.printOptions.header!=null){
var lineHeight=this.renderer.getLineHeight();
this.clientArea.y+=lineHeight*2;
this.clientArea.height-=lineHeight*2;
}if(this.printOptions.footer!=null){
this.clientArea.height-=this.renderer.getLineHeight()*2;
}this.pageSize=Math.floor(this.clientArea.height/this.renderer.getLineHeight());
var content=this.renderer.getContent();
this.startLine=0;
if(this.singleLine){
this.endLine=0;
}else{
this.endLine=content.getLineCount()-1;
}var data=this.printer.getPrinterData();
if(data.scope==1){
this.startLine=(this.$startPage-1)*this.pageSize;
}else if(data.scope==2){
this.startLine=content.getLineAtOffset(this.selection.x);
if(this.selection.y>0){
this.endLine=content.getLineAtOffset(this.selection.x+this.selection.y-1);
}else{
this.endLine=this.startLine-1;
}}});
$_M(c$,"getPrinterColor",
function(color){
var printerColor=null;
if(color!=null){
printerColor=this.printerColors.get(color);
if(printerColor==null){
printerColor=new $wt.graphics.Color(this.printer,color.getRGB());
this.printerColors.put(color,printerColor);
}}return printerColor;
},"$wt.graphics.Color");
$_M(c$,"print",
function(){
var content=this.renderer.getContent();
var background=this.gc.getBackground();
var foreground=this.gc.getForeground();
var lineHeight=this.renderer.getLineHeight();
var paintY=this.clientArea.y;
var page=this.$startPage;
for(var i=this.startLine;i<=this.endLine&&page<=this.$endPage;i++,paintY+=lineHeight){
var line=content.getLine(i);
if(paintY==this.clientArea.y){
this.startPage(page);
}this.renderer.drawLine(line,i,paintY,this.gc,background,foreground,true);
if(paintY+lineHeight*2>this.clientArea.y+this.clientArea.height){
this.endPage(page);
paintY=this.clientArea.y-lineHeight;
page++;
}}
if(paintY>this.clientArea.y){
this.endPage(page);
}});
$_M(c$,"printDecoration",
function(page,header){
var lastSegmentIndex=0;
var SegmentCount=3;
var text;
if(header){
text=this.printOptions.header;
}else{
text=this.printOptions.footer;
}if(text==null){
return;
}for(var i=0;i<3;i++){
var segmentIndex=text.indexOf("\t",lastSegmentIndex);
var segment;
if(segmentIndex==-1){
segment=text.substring(lastSegmentIndex);
this.printDecorationSegment(segment,i,page,header);
break;
}else{
segment=text.substring(lastSegmentIndex,segmentIndex);
this.printDecorationSegment(segment,i,page,header);
lastSegmentIndex=segmentIndex+"\t".length;
}}
},"~N,~B");
$_M(c$,"printDecorationSegment",
function(segment,alignment,page,header){
var pageIndex=segment.indexOf("<page>");
if(pageIndex!=-1){
var PageTagLength="<page>".length;
var buffer=new StringBuffer(segment.substring(0,pageIndex));
buffer.append(page);
buffer.append(segment.substring(pageIndex+PageTagLength));
segment=buffer.toString();
}if(segment.length>0){
var segmentWidth;
var drawX=0;
var drawY=0;
var layout=new $wt.graphics.TextLayout(this.printer);
layout.setText(segment);
layout.setFont(this.printerFont);
segmentWidth=layout.getLineBounds(0).width;
if(header){
drawY=this.clientArea.y-this.renderer.getLineHeight()*2;
}else{
drawY=this.clientArea.y+this.clientArea.height+this.renderer.getLineHeight();
}if(alignment==0){
drawX=this.clientArea.x;
}else if(alignment==1){
drawX=Math.floor((this.pageWidth-segmentWidth)/2);
}else if(alignment==2){
drawX=this.clientArea.x+this.clientArea.width-segmentWidth;
}layout.draw(this.gc,drawX,drawY);
layout.dispose();
}},"~S,~N,~N,~B");
$_V(c$,"run",
function(){
var jobName=this.printOptions.jobName;
if(jobName==null){
jobName="Printing";
}if(this.printer.startJob(jobName)){
this.createPrinterColors();
this.initializeRenderer();
this.print();
this.dispose();
this.printer.endJob();
}});
$_M(c$,"startPage",
function(page){
this.printer.startPage();
this.printDecoration(page,true);
},"~N");
$_S(c$,
"LEFT",0,
"CENTER",1,
"RIGHT",2);
c$=$_P();
$_I($wt.custom.StyledText,"LineCache");
$_S(c$,
"TAB",'\t');
c$.PlatformLineDelimiter=c$.prototype.PlatformLineDelimiter=System.getProperty("line.separator");
$_S(c$,
"BIDI_CARET_WIDTH",3,
"$DEFAULT_WIDTH",64,
"$DEFAULT_HEIGHT",64,
"ExtendedModify",3000,
"LineGetBackground",3001,
"LineGetStyle",3002,
"TextChanging",3003,
"TextSet",3004,
"VerifyKey",3005,
"TextChanged",3006,
"LineGetSegments",3007,
"IS_CARBON",false,
"IS_GTK",false,
"IS_MOTIF",false,
"DOUBLE_BUFFER",false);
{
var platform=$WT.getPlatform();
($t$=$wt.custom.StyledText.IS_CARBON="carbon".equals(platform),$wt.custom.StyledText.prototype.IS_CARBON=$wt.custom.StyledText.IS_CARBON,$t$);
($t$=$wt.custom.StyledText.IS_GTK="gtk".equals(platform),$wt.custom.StyledText.prototype.IS_GTK=$wt.custom.StyledText.IS_GTK,$t$);
($t$=$wt.custom.StyledText.IS_MOTIF="motif".equals(platform),$wt.custom.StyledText.prototype.IS_MOTIF=$wt.custom.StyledText.IS_MOTIF,$t$);
($t$=$wt.custom.StyledText.DOUBLE_BUFFER=!$wt.custom.StyledText.IS_CARBON,$wt.custom.StyledText.prototype.DOUBLE_BUFFER=$wt.custom.StyledText.DOUBLE_BUFFER,$t$);
}});
