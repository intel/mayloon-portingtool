/* http://j2s.sf.net/ */Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["java.lang.IllegalArgumentException"],"org.eclipse.jface.resource.DataFormatException",null,function(){
c$=Clazz.declareType(org.eclipse.jface.resource,"DataFormatException",IllegalArgumentException);
});
Clazz.declarePackage("org.eclipse.jface.resource");
c$=Clazz.declareType(org.eclipse.jface.resource,"DeviceResourceDescriptor");
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.DeviceResourceDescriptor"],"org.eclipse.jface.resource.ColorDescriptor",null,function(){
c$=Clazz.declareType(org.eclipse.jface.resource,"ColorDescriptor",org.eclipse.jface.resource.DeviceResourceDescriptor);
c$.createFrom=Clazz.defineMethod(c$,"createFrom",
function(toCreate,originalDevice){
return new org.eclipse.jface.resource.RGBColorDescriptor(toCreate,originalDevice);
},"$wt.graphics.Color,$wt.graphics.Device");
c$.createFrom=Clazz.defineMethod(c$,"createFrom",
function(toCreate){
return new org.eclipse.jface.resource.RGBColorDescriptor(toCreate);
},"$wt.graphics.Color");
c$.createFrom=Clazz.defineMethod(c$,"createFrom",
function(toCreate){
return new org.eclipse.jface.resource.RGBColorDescriptor(toCreate);
},"$wt.graphics.RGB");
Clazz.overrideMethod(c$,"createResource",
function(device){
return this.createColor(device);
},"$wt.graphics.Device");
Clazz.overrideMethod(c$,"destroyResource",
function(previouslyCreatedObject){
this.destroyColor(previouslyCreatedObject);
},"~O");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["java.lang.Exception"],"org.eclipse.jface.resource.DeviceResourceException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.$cause=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"DeviceResourceException",Exception);
Clazz.makeConstructor(c$,
function(missingResource,cause){
Clazz.superConstructor(this,org.eclipse.jface.resource.DeviceResourceException,["Unable to create resource "+missingResource.toString()]);
this.$cause=cause;
},"org.eclipse.jface.resource.DeviceResourceDescriptor,Throwable");
Clazz.makeConstructor(c$,
function(missingResource){
this.construct(missingResource,null);
},"org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod(c$,"getCause",
function(){
return this.$cause;
});
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.DeviceResourceDescriptor"],"org.eclipse.jface.resource.FontDescriptor",["$wt.graphics.FontData"],function(){
c$=Clazz.declareType(org.eclipse.jface.resource,"FontDescriptor",org.eclipse.jface.resource.DeviceResourceDescriptor);
c$.createFrom=Clazz.defineMethod(c$,"createFrom",
function(font,originalDevice){
return new org.eclipse.jface.resource.ArrayFontDescriptor(font,originalDevice);
},"$wt.graphics.Font,$wt.graphics.Device");
c$.createFrom=Clazz.defineMethod(c$,"createFrom",
function(font){
return new org.eclipse.jface.resource.ArrayFontDescriptor(font);
},"$wt.graphics.Font");
c$.createFrom=Clazz.defineMethod(c$,"createFrom",
function(data){
return new org.eclipse.jface.resource.ArrayFontDescriptor(data);
},"~A");
c$.createFrom=Clazz.defineMethod(c$,"createFrom",
function(data){
return new org.eclipse.jface.resource.NamedFontDescriptor(data);
},"$wt.graphics.FontData");
c$.createFrom=Clazz.defineMethod(c$,"createFrom",
function(name,height,style){
return org.eclipse.jface.resource.FontDescriptor.createFrom(new $wt.graphics.FontData(name,height,style));
},"~S,~N,~N");
Clazz.overrideMethod(c$,"createResource",
function(device){
return this.createFont(device);
},"$wt.graphics.Device");
Clazz.overrideMethod(c$,"destroyResource",
function(previouslyCreatedObject){
this.destroyFont(previouslyCreatedObject);
},"~O");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.FontDescriptor"],"org.eclipse.jface.resource.ArrayFontDescriptor",["$wt.graphics.Font"],function(){
c$=Clazz.decorateAsClass(function(){
this.data=null;
this.originalFont=null;
this.originalDevice=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"ArrayFontDescriptor",org.eclipse.jface.resource.FontDescriptor);
Clazz.makeConstructor(c$,
function(data){
Clazz.superConstructor(this,org.eclipse.jface.resource.ArrayFontDescriptor,[]);
this.data=data;
},"~A");
Clazz.makeConstructor(c$,
function(originalFont){
this.construct(originalFont.getFontData());
this.originalFont=originalFont;
},"$wt.graphics.Font");
Clazz.makeConstructor(c$,
function(originalFont,originalDevice){
this.construct(originalFont);
this.originalDevice=originalDevice;
},"$wt.graphics.Font,$wt.graphics.Device");
Clazz.overrideMethod(c$,"createFont",
function(device){
if(this.originalFont!=null){
if(this.originalDevice==null){
var result=new $wt.graphics.Font(device,this.data);
if(result.equals(this.originalFont)){
result.dispose();
this.originalDevice=device;
return this.originalFont;
}return result;
}if(this.originalDevice===device){
return this.originalFont;
}}return new $wt.graphics.Font(device,this.data);
},"$wt.graphics.Device");
Clazz.overrideMethod(c$,"equals",
function(obj){
if((obj.getClass()===org.eclipse.jface.resource.ArrayFontDescriptor)){
var descr=obj;
if(descr.originalFont!==this.originalFont){
return false;
}if(this.originalFont!=null){
return true;
}if(this.data.length!=descr.data.length){
return false;
}for(var i=0;i<this.data.length;i++){
var fd=this.data[i];
var fd2=descr.data[i];
if(!fd.equals(fd2)){
return false;
}}
return true;
}return false;
},"~O");
Clazz.overrideMethod(c$,"hashCode",
function(){
if(this.originalFont!=null){
return this.originalFont.hashCode();
}var code=0;
for(var i=0;i<this.data.length;i++){
var fd=this.data[i];
code+=fd.hashCode();
}
return code;
});
Clazz.overrideMethod(c$,"destroyFont",
function(previouslyCreatedFont){
if(previouslyCreatedFont===this.originalFont){
return;
}previouslyCreatedFont.dispose();
},"$wt.graphics.Font");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.DeviceResourceDescriptor","$wt.graphics.ImageData","$.PaletteData","$.RGB"],"org.eclipse.jface.resource.ImageDescriptor",["org.eclipse.jface.resource.DeviceResourceException","$wt.graphics.Image","$wt.widgets.Display"],function(){
c$=Clazz.declareType(org.eclipse.jface.resource,"ImageDescriptor",org.eclipse.jface.resource.DeviceResourceDescriptor);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,org.eclipse.jface.resource.ImageDescriptor,[]);
});
c$.createFromFile=Clazz.defineMethod(c$,"createFromFile",
function(location,filename){
return new org.eclipse.jface.resource.FileImageDescriptor(location,filename);
},"Class,~S");
c$.createFromImageData=Clazz.defineMethod(c$,"createFromImageData",
function(data){
return new org.eclipse.jface.resource.ImageDataImageDescriptor(data);
},"$wt.graphics.ImageData");
c$.createFromImage=Clazz.defineMethod(c$,"createFromImage",
function(img){
return new org.eclipse.jface.resource.ImageDataImageDescriptor(img);
},"$wt.graphics.Image");
c$.createWithFlags=Clazz.defineMethod(c$,"createWithFlags",
function(originalImage,swtFlags){
return new org.eclipse.jface.resource.DerivedImageDescriptor(originalImage,swtFlags);
},"org.eclipse.jface.resource.ImageDescriptor,~N");
c$.createFromImage=Clazz.defineMethod(c$,"createFromImage",
function(img,theDevice){
return new org.eclipse.jface.resource.ImageDataImageDescriptor(img,theDevice);
},"$wt.graphics.Image,$wt.graphics.Device");
c$.createFromURL=Clazz.defineMethod(c$,"createFromURL",
function(url){
if(url==null){
return org.eclipse.jface.resource.ImageDescriptor.getMissingImageDescriptor();
}return new org.eclipse.jface.resource.URLImageDescriptor(url);
},"java.net.URL");
Clazz.overrideMethod(c$,"createResource",
function(device){
var result=this.createImage(false,device);
if(result==null){
throw new org.eclipse.jface.resource.DeviceResourceException(this);
}return result;
},"$wt.graphics.Device");
Clazz.overrideMethod(c$,"destroyResource",
function(previouslyCreatedObject){
(previouslyCreatedObject).dispose();
},"~O");
Clazz.defineMethod(c$,"createImage",
function(){
return this.createImage(true);
});
Clazz.defineMethod(c$,"createImage",
function(returnMissingImageOnError){
return this.createImage(returnMissingImageOnError,$wt.widgets.Display.getCurrent());
},"~B");
Clazz.defineMethod(c$,"createImage",
function(device){
return this.createImage(true,device);
},"$wt.graphics.Device");
Clazz.defineMethod(c$,"createImage",
function(returnMissingImageOnError,device){
var data=this.getImageData();
if(data==null){
if(!returnMissingImageOnError){
return null;
}data=org.eclipse.jface.resource.ImageDescriptor.DEFAULT_IMAGE_DATA;
}try{
if(data.transparentPixel>=0){
var maskData=data.getTransparencyMask();
return new $wt.graphics.Image(device,data,maskData);
}return new $wt.graphics.Image(device,data);
}catch(exception){
if(Clazz.instanceOf(exception,$wt.SWTException)){
if(returnMissingImageOnError){
try{
return new $wt.graphics.Image(device,org.eclipse.jface.resource.ImageDescriptor.DEFAULT_IMAGE_DATA);
}catch(nextException){
if(Clazz.instanceOf(nextException,$wt.SWTException)){
return null;
}else{
throw nextException;
}
}
}return null;
}else{
throw exception;
}
}
},"~B,$wt.graphics.Device");
c$.getMissingImageDescriptor=Clazz.defineMethod(c$,"getMissingImageDescriptor",
function(){
return org.eclipse.jface.resource.MissingImageDescriptor.getInstance();
});
c$.DEFAULT_IMAGE_DATA=c$.prototype.DEFAULT_IMAGE_DATA=new $wt.graphics.ImageData(6,6,1,new $wt.graphics.PaletteData([new $wt.graphics.RGB(255,0,0)]));
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ImageDescriptor"],"org.eclipse.jface.resource.ImageDataImageDescriptor",["org.eclipse.jface.resource.DeviceResourceException"],function(){
c$=Clazz.decorateAsClass(function(){
this.data=null;
this.originalImage=null;
this.originalDevice=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"ImageDataImageDescriptor",org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor(c$,
function(originalImage,originalDevice){
this.construct(originalImage.getImageData());
this.originalImage=originalImage;
this.originalDevice=originalDevice;
},"$wt.graphics.Image,$wt.graphics.Device");
Clazz.makeConstructor(c$,
function(originalImage){
this.construct(originalImage.getImageData());
this.originalImage=originalImage;
},"$wt.graphics.Image");
Clazz.makeConstructor(c$,
function(data){
Clazz.superConstructor(this,org.eclipse.jface.resource.ImageDataImageDescriptor,[]);
this.data=data;
},"$wt.graphics.ImageData");
Clazz.defineMethod(c$,"createResource",
function(device){
if(this.originalImage!=null){
if(this.originalDevice==null){
var result=this.createImage(false,device);
if(result==null){
throw new org.eclipse.jface.resource.DeviceResourceException(this);
}if(result.equals(this.originalImage)){
result.dispose();
this.originalDevice=device;
return this.originalImage;
}return result;
}if(this.originalDevice===device){
return this.originalImage;
}}return Clazz.superCall(this,org.eclipse.jface.resource.ImageDataImageDescriptor,"createResource",[device]);
},"$wt.graphics.Device");
Clazz.defineMethod(c$,"destroyResource",
function(previouslyCreatedObject){
if(previouslyCreatedObject===this.originalImage){
return;
}Clazz.superCall(this,org.eclipse.jface.resource.ImageDataImageDescriptor,"destroyResource",[previouslyCreatedObject]);
},"~O");
Clazz.overrideMethod(c$,"getImageData",
function(){
return this.data;
});
Clazz.defineMethod(c$,"hashCode",
function(){
return this.data.hashCode();
});
Clazz.defineMethod(c$,"equals",
function(obj){
if(!(Clazz.instanceOf(obj,org.eclipse.jface.resource.ImageDataImageDescriptor)))return false;
var imgWrap=obj;
if(this.originalImage!=null){
return imgWrap.originalImage===this.originalImage;
}return(imgWrap.originalImage==null&&this.data.equals(imgWrap.data));
},"~O");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ImageDescriptor"],"org.eclipse.jface.resource.FileImageDescriptor",["java.io.BufferedInputStream","$.FileInputStream","$wt.graphics.ImageData"],function(){
c$=Clazz.decorateAsClass(function(){
this.location=null;
this.name=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"FileImageDescriptor",org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor(c$,
function(clazz,filename){
Clazz.superConstructor(this,org.eclipse.jface.resource.FileImageDescriptor,[]);
this.location=clazz;
this.name=filename;
},"Class,~S");
Clazz.defineMethod(c$,"equals",
function(o){
if(!(Clazz.instanceOf(o,org.eclipse.jface.resource.FileImageDescriptor))){
return false;
}var other=o;
if(this.location!=null){
if(!this.location.equals(other.location)){
return false;
}}else{
if(other.location!=null){
return false;
}}return this.name.equals(other.name);
},"~O");
Clazz.overrideMethod(c$,"getImageData",
function(){
if(true)return new $wt.graphics.ImageData(this.name);
var $in=this.getStream();
var result=null;
if($in!=null){
try{
result=new $wt.graphics.ImageData($in);
}catch(e){
if(Clazz.instanceOf(e,$wt.SWTException)){
if(e.code!=40)throw e;
}else{
throw e;
}
}finally{
try{
$in.close();
}catch(e){
if(Clazz.instanceOf(e,java.io.IOException)){
}else{
throw e;
}
}
}
}return result;
});
Clazz.defineMethod(c$,"getStream",
($fz=function(){
var is=null;
if(this.location!=null){
is=this.location.getResourceAsStream(this.name);
}else{
try{
is=new java.io.FileInputStream(this.name);
}catch(e){
if(Clazz.instanceOf(e,java.io.FileNotFoundException)){
return null;
}else{
throw e;
}
}
}if(is==null)return null;
else return new java.io.BufferedInputStream(is);
},$fz.isPrivate=true,$fz));
Clazz.defineMethod(c$,"hashCode",
function(){
var code=this.name.hashCode();
if(this.location!=null){
code+=this.location.hashCode();
}return code;
});
Clazz.overrideMethod(c$,"toString",
function(){
return"FileImageDescriptor(location="+this.location+", name="+this.name+")";
});
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ImageDescriptor"],"org.eclipse.jface.resource.DerivedImageDescriptor",["org.eclipse.jface.resource.DeviceResourceException","$wt.graphics.Image","$wt.widgets.Display"],function(){
c$=Clazz.decorateAsClass(function(){
this.original=null;
this.flags=0;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"DerivedImageDescriptor",org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor(c$,
function(original,swtFlags){
Clazz.superConstructor(this,org.eclipse.jface.resource.DerivedImageDescriptor,[]);
this.original=original;
this.flags=swtFlags;
},"org.eclipse.jface.resource.ImageDescriptor,~N");
Clazz.overrideMethod(c$,"createResource",
function(device){
try{
return this.internalCreateImage(device);
}catch(e){
if(Clazz.instanceOf(e,$wt.SWTException)){
throw new org.eclipse.jface.resource.DeviceResourceException(this,e);
}else{
throw e;
}
}
},"$wt.graphics.Device");
Clazz.defineMethod(c$,"createImage",
function(device){
return this.internalCreateImage(device);
},"$wt.graphics.Device");
Clazz.defineMethod(c$,"hashCode",
function(){
return this.original.hashCode()+this.flags;
});
Clazz.overrideMethod(c$,"equals",
function(arg0){
if(Clazz.instanceOf(arg0,org.eclipse.jface.resource.DerivedImageDescriptor)){
var desc=arg0;
return desc.original===this.original&&this.flags==desc.flags;
}return false;
},"~O");
Clazz.defineMethod(c$,"internalCreateImage",
($fz=function(device){
var originalImage=this.original.createImage(device);
var result=new $wt.graphics.Image(device,originalImage,this.flags);
this.original.destroyResource(originalImage);
return result;
},$fz.isPrivate=true,$fz),"$wt.graphics.Device");
Clazz.overrideMethod(c$,"getImageData",
function(){
var image=this.internalCreateImage($wt.widgets.Display.getCurrent());
var result=image.getImageData();
image.dispose();
return result;
});
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ImageDescriptor"],"org.eclipse.jface.resource.CompositeImageDescriptor",["$wt.graphics.ImageData","$.PaletteData","$.RGB"],function(){
c$=Clazz.decorateAsClass(function(){
this.imageData=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"CompositeImageDescriptor",org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,org.eclipse.jface.resource.CompositeImageDescriptor,[]);
});
c$.alloc=Clazz.defineMethod(c$,"alloc",
($fz=function(map,red,green,blue){
var i;
var c;
for(i=1;i<map.length&&(c=map[i])!=null;i++)if(c.red==red&&c.green==green&&c.blue==blue)return i;

if(i<map.length-1){
map[i]=new $wt.graphics.RGB(red,green,blue);
return i;
}return 0;
},$fz.isPrivate=true,$fz),"~A,~N,~N,~N");
Clazz.defineMethod(c$,"drawImage",
function(src,ox,oy){
var out=this.imageData.getRGBs();
var palette=src.palette;
if(palette.isDirect){
var mask=src.getTransparencyMask();
for(var y=0;y<src.height;y++){
for(var x=0;x<src.width;x++){
if(mask.getPixel(x,y)!=0){
var xx=x+ox;
var yy=y+oy;
if(xx>=0&&xx<this.imageData.width&&yy>=0&&yy<this.imageData.height){
var pixel=src.getPixel(x,y);
var r=pixel&palette.redMask;
r=(palette.redShift<0)?r>>>-palette.redShift:r<<palette.redShift;
var g=pixel&palette.greenMask;
g=(palette.greenShift<0)?g>>>-palette.greenShift:g<<palette.greenShift;
var b=pixel&palette.blueMask;
b=(palette.blueShift<0)?b>>>-palette.blueShift:b<<palette.blueShift;
pixel=org.eclipse.jface.resource.CompositeImageDescriptor.alloc(out,r,g,b);
this.imageData.setPixel(xx,yy,pixel);
}}}
}
return;
}var map=Clazz.newArray(256,0);
for(var i=0;i<map.length;i++)map[i]=-1;

if(src.getTransparencyType()==2){
var mask=src.getTransparencyMask();
for(var y=0;y<src.height;y++){
for(var x=0;x<src.width;x++){
if(mask.getPixel(x,y)!=0){
var xx=x+ox;
var yy=y+oy;
if(xx>=0&&xx<this.imageData.width&&yy>=0&&yy<this.imageData.height){
var pixel=src.getPixel(x,y);
var newPixel=map[pixel];
if(newPixel<0){
var c=palette.getRGB(pixel);
map[pixel]=newPixel=org.eclipse.jface.resource.CompositeImageDescriptor.alloc(out,c.red,c.green,c.blue);
}this.imageData.setPixel(xx,yy,newPixel);
}}}
}
return;
}var maskPixel=src.transparentPixel;
for(var y=0;y<src.height;y++){
for(var x=0;x<src.width;x++){
var pixel=src.getPixel(x,y);
if(maskPixel<0||pixel!=maskPixel){
var xx=x+ox;
var yy=y+oy;
if(xx>=0&&xx<this.imageData.width&&yy>=0&&yy<this.imageData.height){
var newPixel=map[pixel];
if(newPixel<0){
var c=palette.getRGB(pixel);
map[pixel]=newPixel=org.eclipse.jface.resource.CompositeImageDescriptor.alloc(out,c.red,c.green,c.blue);
}this.imageData.setPixel(xx,yy,newPixel);
}}}
}
},"$wt.graphics.ImageData,~N,~N");
Clazz.overrideMethod(c$,"getImageData",
function(){
var size=this.getSize();
var black=new $wt.graphics.RGB(0,0,0);
var rgbs=new Array(256);
rgbs[0]=black;
rgbs[1]=black;
var dataPalette=new $wt.graphics.PaletteData(rgbs);
this.imageData=new $wt.graphics.ImageData(size.x,size.y,8,dataPalette);
this.imageData.transparentPixel=0;
this.drawCompositeImage(size.x,size.y);
for(var i=0;i<rgbs.length;i++)if(rgbs[i]==null)rgbs[i]=black;

return this.imageData;
});
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ImageDescriptor"],"org.eclipse.jface.resource.ImageRegistry",["java.lang.IllegalArgumentException","java.util.HashMap","org.eclipse.jface.resource.JFaceResources","$wt.widgets.Display"],function(){
c$=Clazz.decorateAsClass(function(){
this.display=null;
this.manager=null;
this.table=null;
this.disposeRunnable=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"ImageRegistry");
Clazz.prepareFields(c$,function(){
this.disposeRunnable=((Clazz.isClassDefined("org.eclipse.jface.resource.ImageRegistry$1")?0:org.eclipse.jface.resource.ImageRegistry.$ImageRegistry$1$()),Clazz.innerTypeInstance(org.eclipse.jface.resource.ImageRegistry$1,this,null));
});
Clazz.makeConstructor(c$,
function(){
this.construct($wt.widgets.Display.getCurrent());
});
Clazz.makeConstructor(c$,
function(manager){
;
var dev=manager.getDevice();
if(Clazz.instanceOf(dev,$wt.widgets.Display)){
this.display=dev;
}this.manager=manager;
manager.disposeExec(this.disposeRunnable);
},"org.eclipse.jface.resource.ResourceManager");
Clazz.makeConstructor(c$,
function(display){
this.construct(org.eclipse.jface.resource.JFaceResources.getResources(display));
},"$wt.widgets.Display");
Clazz.defineMethod(c$,"get",
function(key){
if(key==null){
return null;
}if(this.display!=null){
var swtKey=-1;
if(key.equals("dialog_info_imageg")){
swtKey=2;
}if(key.equals("dialog_question_image")){
swtKey=4;
}if(key.equals("dialog_warning_image")){
swtKey=8;
}if(key.equals("dialog_error_image")){
swtKey=1;
}if(swtKey!=-1){
var image=new Array(1);
var id=swtKey;
this.display.syncExec(((Clazz.isClassDefined("org.eclipse.jface.resource.ImageRegistry$2")?0:org.eclipse.jface.resource.ImageRegistry.$ImageRegistry$2$()),Clazz.innerTypeInstance(org.eclipse.jface.resource.ImageRegistry$2,this,Clazz.cloneFinals("image",image,"id",id))));
return image[0];
}}var entry=this.getEntry(key);
if(entry==null){
return null;
}if(entry.image==null){
entry.image=this.manager.createImageWithDefault(entry.descriptor);
}return entry.image;
},"~S");
Clazz.defineMethod(c$,"getDescriptor",
function(key){
var entry=this.getEntry(key);
if(entry==null){
return null;
}return entry.descriptor;
},"~S");
Clazz.defineMethod(c$,"put",
function(key,descriptor){
var entry=this.getEntry(key);
if(entry==null){
entry=new org.eclipse.jface.resource.ImageRegistry.Entry();
this.getTable().put(key,entry);
}if(entry.image!=null){
throw new IllegalArgumentException("ImageRegistry key already in use: "+key);
}entry.descriptor=descriptor;
},"~S,org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod(c$,"put",
function(key,image){
var entry=this.getEntry(key);
if(entry==null){
entry=new org.eclipse.jface.resource.ImageRegistry.Entry();
this.putEntry(key,entry);
}if(entry.image!=null||entry.descriptor!=null){
throw new IllegalArgumentException("ImageRegistry key already in use: "+key);
}entry.image=image;
entry.descriptor=new org.eclipse.jface.resource.ImageRegistry.OriginalImageDescriptor(image,this.manager.getDevice());
try{
this.manager.create(entry.descriptor);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DeviceResourceException)){
}else{
throw e;
}
}
},"~S,$wt.graphics.Image");
Clazz.defineMethod(c$,"remove",
function(key){
var descriptor=this.getDescriptor(key);
if(descriptor!=null){
this.manager.destroy(descriptor);
this.getTable().remove(key);
}},"~S");
Clazz.defineMethod(c$,"getEntry",
($fz=function(key){
return this.getTable().get(key);
},$fz.isPrivate=true,$fz),"~S");
Clazz.defineMethod(c$,"putEntry",
($fz=function(key,entry){
this.getTable().put(key,entry);
},$fz.isPrivate=true,$fz),"~S,org.eclipse.jface.resource.ImageRegistry.Entry");
Clazz.defineMethod(c$,"getTable",
($fz=function(){
if(this.table==null){
this.table=new java.util.HashMap(10);
}return this.table;
},$fz.isPrivate=true,$fz));
Clazz.defineMethod(c$,"dispose",
function(){
this.manager.cancelDisposeExec(this.disposeRunnable);
if(this.table!=null){
for(var i=this.table.values().iterator();i.hasNext();){
var entry=i.next();
if(entry.image!=null){
this.manager.destroyImage(entry.descriptor);
}}
this.table=null;
}this.display=null;
});
c$.$ImageRegistry$1$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.resource,"ImageRegistry$1",null,Runnable);
Clazz.overrideMethod(c$,"run",
function(){
this.b$["org.eclipse.jface.resource.ImageRegistry"].dispose();
});
c$=Clazz.p0p();
};
c$.$ImageRegistry$2$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.resource,"ImageRegistry$2",null,Runnable);
Clazz.overrideMethod(c$,"run",
function(){
this.f$.image[0]=this.b$["org.eclipse.jface.resource.ImageRegistry"].display.getSystemImage(this.f$.id);
});
c$=Clazz.p0p();
};
Clazz.pu$h();
c$=Clazz.decorateAsClass(function(){
this.image=null;
this.descriptor=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource.ImageRegistry,"Entry");
c$=Clazz.p0p();
Clazz.pu$h();
c$=Clazz.decorateAsClass(function(){
this.original=null;
this.refCount=0;
this.originalDisplay=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource.ImageRegistry,"OriginalImageDescriptor",org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor(c$,
function(a,b){
Clazz.superConstructor(this,org.eclipse.jface.resource.ImageRegistry.OriginalImageDescriptor,[]);
this.original=a;
this.originalDisplay=b;
},"$wt.graphics.Image,$wt.graphics.Device");
Clazz.defineMethod(c$,"createResource",
function(a){
if(a===this.originalDisplay){
this.refCount++;
return this.original;
}return Clazz.superCall(this,org.eclipse.jface.resource.ImageRegistry.OriginalImageDescriptor,"createResource",[a]);
},"$wt.graphics.Device");
Clazz.defineMethod(c$,"destroyResource",
function(a){
if(this.original===a){
this.refCount--;
if(this.refCount==0){
this.original.dispose();
this.original=null;
}}else{
Clazz.superCall(this,org.eclipse.jface.resource.ImageRegistry.OriginalImageDescriptor,"destroyResource",[a]);
}},"~O");
Clazz.overrideMethod(c$,"getImageData",
function(){
return this.original.getImageData();
});
c$=Clazz.p0p();
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["java.util.HashMap","$.ResourceBundle","org.eclipse.jface.resource.DeviceResourceManager","$.ImageRegistry"],"org.eclipse.jface.resource.JFaceResources",["java.text.MessageFormat","org.eclipse.jface.resource.ColorRegistry","$.FontRegistry","$wt.widgets.Display"],function(){
c$=Clazz.declareType(org.eclipse.jface.resource,"JFaceResources");
c$.format=Clazz.defineMethod(c$,"format",
function(key,args){
return java.text.MessageFormat.format(org.eclipse.jface.resource.JFaceResources.getString(key),args);
},"~S,~A");
c$.getBannerFont=Clazz.defineMethod(c$,"getBannerFont",
function(){
return org.eclipse.jface.resource.JFaceResources.getFontRegistry().get("org.eclipse.jface.bannerfont");
});
c$.getBundle=Clazz.defineMethod(c$,"getBundle",
function(){
return org.eclipse.jface.resource.JFaceResources.bundle;
});
c$.getColorRegistry=Clazz.defineMethod(c$,"getColorRegistry",
function(){
if(org.eclipse.jface.resource.JFaceResources.colorRegistry==null)($t$=org.eclipse.jface.resource.JFaceResources.colorRegistry=new org.eclipse.jface.resource.ColorRegistry(),org.eclipse.jface.resource.JFaceResources.prototype.colorRegistry=org.eclipse.jface.resource.JFaceResources.colorRegistry,$t$);
return org.eclipse.jface.resource.JFaceResources.colorRegistry;
});
c$.getResources=Clazz.defineMethod(c$,"getResources",
function(toQuery){
var reg=org.eclipse.jface.resource.JFaceResources.registries.get(toQuery);
if(reg==null){
var mgr=new org.eclipse.jface.resource.DeviceResourceManager(toQuery);
reg=mgr;
org.eclipse.jface.resource.JFaceResources.registries.put(toQuery,reg);
toQuery.disposeExec(((Clazz.isClassDefined("org.eclipse.jface.resource.JFaceResources$1")?0:org.eclipse.jface.resource.JFaceResources.$JFaceResources$1$()),Clazz.innerTypeInstance(org.eclipse.jface.resource.JFaceResources$1,this,Clazz.cloneFinals("mgr",mgr,"toQuery",toQuery))));
}return reg;
},"$wt.widgets.Display");
c$.getResources=Clazz.defineMethod(c$,"getResources",
function(){
return org.eclipse.jface.resource.JFaceResources.getResources($wt.widgets.Display.getCurrent());
});
c$.getDefaultFont=Clazz.defineMethod(c$,"getDefaultFont",
function(){
return org.eclipse.jface.resource.JFaceResources.getFontRegistry().defaultFont();
});
c$.getDialogFont=Clazz.defineMethod(c$,"getDialogFont",
function(){
return org.eclipse.jface.resource.JFaceResources.getFontRegistry().get("org.eclipse.jface.dialogfont");
});
c$.getFont=Clazz.defineMethod(c$,"getFont",
function(symbolicName){
return org.eclipse.jface.resource.JFaceResources.getFontRegistry().get(symbolicName);
},"~S");
c$.getFontRegistry=Clazz.defineMethod(c$,"getFontRegistry",
function(){
if(org.eclipse.jface.resource.JFaceResources.fontRegistry==null){
($t$=org.eclipse.jface.resource.JFaceResources.fontRegistry=new org.eclipse.jface.resource.FontRegistry("org.eclipse.jface.resource.jfacefonts"),org.eclipse.jface.resource.JFaceResources.prototype.fontRegistry=org.eclipse.jface.resource.JFaceResources.fontRegistry,$t$);
}return org.eclipse.jface.resource.JFaceResources.fontRegistry;
});
c$.getHeaderFont=Clazz.defineMethod(c$,"getHeaderFont",
function(){
return org.eclipse.jface.resource.JFaceResources.getFontRegistry().get("org.eclipse.jface.headerfont");
});
c$.getImage=Clazz.defineMethod(c$,"getImage",
function(key){
return org.eclipse.jface.resource.JFaceResources.getImageRegistry().get(key);
},"~S");
c$.getImageRegistry=Clazz.defineMethod(c$,"getImageRegistry",
function(){
if(org.eclipse.jface.resource.JFaceResources.imageRegistry==null)($t$=org.eclipse.jface.resource.JFaceResources.imageRegistry=new org.eclipse.jface.resource.ImageRegistry(org.eclipse.jface.resource.JFaceResources.getResources($wt.widgets.Display.getCurrent())),org.eclipse.jface.resource.JFaceResources.prototype.imageRegistry=org.eclipse.jface.resource.JFaceResources.imageRegistry,$t$);
return org.eclipse.jface.resource.JFaceResources.imageRegistry;
});
c$.getString=Clazz.defineMethod(c$,"getString",
function(key){
try{
return org.eclipse.jface.resource.JFaceResources.bundle.getString(key);
}catch(e){
if(Clazz.instanceOf(e,java.util.MissingResourceException)){
return key;
}else{
throw e;
}
}
},"~S");
c$.getStrings=Clazz.defineMethod(c$,"getStrings",
function(keys){
;
var length=keys.length;
var result=new Array(length);
for(var i=0;i<length;i++)result[i]=org.eclipse.jface.resource.JFaceResources.getString(keys[i]);

return result;
},"~A");
c$.getTextFont=Clazz.defineMethod(c$,"getTextFont",
function(){
return org.eclipse.jface.resource.JFaceResources.getFontRegistry().get("org.eclipse.jface.textfont");
});
c$.getViewerFont=Clazz.defineMethod(c$,"getViewerFont",
function(){
return org.eclipse.jface.resource.JFaceResources.getFontRegistry().get("org.eclipse.jface.viewerfont");
});
c$.setFontRegistry=Clazz.defineMethod(c$,"setFontRegistry",
function(registry){
;
($t$=org.eclipse.jface.resource.JFaceResources.fontRegistry=registry,org.eclipse.jface.resource.JFaceResources.prototype.fontRegistry=org.eclipse.jface.resource.JFaceResources.fontRegistry,$t$);
},"org.eclipse.jface.resource.FontRegistry");
c$.$JFaceResources$1$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.resource,"JFaceResources$1",null,Runnable);
Clazz.overrideMethod(c$,"run",
function(){
this.f$.mgr.dispose();
org.eclipse.jface.resource.JFaceResources.registries.remove(this.f$.toQuery);
});
c$=Clazz.p0p();
};
c$.registries=c$.prototype.registries=new java.util.HashMap();
Clazz.defineStatics(c$,
"BANNER_FONT","org.eclipse.jface.bannerfont");
c$.bundle=c$.prototype.bundle=java.util.ResourceBundle.getBundle("org.eclipse.jface.messages");
Clazz.defineStatics(c$,
"colorRegistry",null,
"DEFAULT_FONT","org.eclipse.jface.defaultfont",
"DIALOG_FONT","org.eclipse.jface.dialogfont",
"fontRegistry",null,
"HEADER_FONT","org.eclipse.jface.headerfont",
"imageRegistry",null,
"TEXT_FONT","org.eclipse.jface.textfont",
"VIEWER_FONT","org.eclipse.jface.viewerfont",
"WINDOW_FONT","org.eclipse.jface.windowfont");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(null,"org.eclipse.jface.resource.JFaceColors",["org.eclipse.jface.resource.JFaceResources"],function(){
c$=Clazz.declareType(org.eclipse.jface.resource,"JFaceColors");
c$.getBannerBackground=Clazz.defineMethod(c$,"getBannerBackground",
function(display){
return display.getSystemColor(25);
},"$wt.widgets.Display");
c$.getBannerForeground=Clazz.defineMethod(c$,"getBannerForeground",
function(display){
return display.getSystemColor(24);
},"$wt.widgets.Display");
c$.getErrorBackground=Clazz.defineMethod(c$,"getErrorBackground",
function(display){
return display.getSystemColor(22);
},"$wt.widgets.Display");
c$.getErrorBorder=Clazz.defineMethod(c$,"getErrorBorder",
function(display){
return display.getSystemColor(17);
},"$wt.widgets.Display");
c$.getErrorText=Clazz.defineMethod(c$,"getErrorText",
function(display){
return org.eclipse.jface.resource.JFaceResources.getColorRegistry().get("ERROR_COLOR");
},"$wt.widgets.Display");
c$.getHyperlinkText=Clazz.defineMethod(c$,"getHyperlinkText",
function(display){
return org.eclipse.jface.resource.JFaceResources.getColorRegistry().get("HYPERLINK_COLOR");
},"$wt.widgets.Display");
c$.getActiveHyperlinkText=Clazz.defineMethod(c$,"getActiveHyperlinkText",
function(display){
return org.eclipse.jface.resource.JFaceResources.getColorRegistry().get("ACTIVE_HYPERLINK_COLOR");
},"$wt.widgets.Display");
c$.clearColor=Clazz.defineMethod(c$,"clearColor",
function(colorName){
},"~S");
c$.disposeColors=Clazz.defineMethod(c$,"disposeColors",
function(){
});
c$.setColors=Clazz.defineMethod(c$,"setColors",
function(control,foreground,background){
if(foreground!=null)control.setForeground(foreground);
if(background!=null)control.setBackground(background);
},"$wt.widgets.Control,$wt.graphics.Color,$wt.graphics.Color");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ImageDescriptor"],"org.eclipse.jface.resource.MissingImageDescriptor",null,function(){
c$=Clazz.declareType(org.eclipse.jface.resource,"MissingImageDescriptor",org.eclipse.jface.resource.ImageDescriptor);
Clazz.overrideMethod(c$,"getImageData",
function(){
return org.eclipse.jface.resource.ImageDescriptor.DEFAULT_IMAGE_DATA;
});
c$.getInstance=Clazz.defineMethod(c$,"getInstance",
function(){
if(org.eclipse.jface.resource.MissingImageDescriptor.instance==null){
($t$=org.eclipse.jface.resource.MissingImageDescriptor.instance=new org.eclipse.jface.resource.MissingImageDescriptor(),org.eclipse.jface.resource.MissingImageDescriptor.prototype.instance=org.eclipse.jface.resource.MissingImageDescriptor.instance,$t$);
}return org.eclipse.jface.resource.MissingImageDescriptor.instance;
});
Clazz.defineStatics(c$,
"instance",null);
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.FontDescriptor"],"org.eclipse.jface.resource.NamedFontDescriptor",["$wt.graphics.Font"],function(){
c$=Clazz.decorateAsClass(function(){
this.data=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"NamedFontDescriptor",org.eclipse.jface.resource.FontDescriptor);
Clazz.makeConstructor(c$,
function(data){
Clazz.superConstructor(this,org.eclipse.jface.resource.NamedFontDescriptor,[]);
this.data=data;
},"$wt.graphics.FontData");
Clazz.overrideMethod(c$,"createFont",
function(device){
return new $wt.graphics.Font(device,this.data);
},"$wt.graphics.Device");
Clazz.defineMethod(c$,"equals",
function(obj){
if((obj.getClass()===org.eclipse.jface.resource.NamedFontDescriptor)){
var descr=obj;
return this.data.equals(descr.data);
}return Clazz.superCall(this,org.eclipse.jface.resource.NamedFontDescriptor,"equals",[obj]);
},"~O");
Clazz.overrideMethod(c$,"hashCode",
function(){
return this.data.hashCode();
});
Clazz.overrideMethod(c$,"destroyFont",
function(previouslyCreatedFont){
previouslyCreatedFont.dispose();
},"$wt.graphics.Font");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.util.ListenerList"],"org.eclipse.jface.resource.ResourceRegistry",["org.eclipse.jface.util.PropertyChangeEvent"],function(){
c$=Clazz.decorateAsClass(function(){
this.listeners=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"ResourceRegistry");
Clazz.prepareFields(c$,function(){
this.listeners=new org.eclipse.jface.util.ListenerList();
});
Clazz.defineMethod(c$,"addListener",
function(listener){
this.listeners.add(listener);
},"org.eclipse.jface.util.IPropertyChangeListener");
Clazz.defineMethod(c$,"fireMappingChanged",
function(name,oldValue,newValue){
var myListeners=this.listeners.getListeners();
if(myListeners.length>0){
var event=new org.eclipse.jface.util.PropertyChangeEvent(this,name,oldValue,newValue);
for(var i=0;i<myListeners.length;++i){
try{
(myListeners[i]).propertyChange(event);
}catch(e){
if(Clazz.instanceOf(e,Exception)){
}else{
throw e;
}
}
}
}},"~S,~O,~O");
Clazz.defineMethod(c$,"removeListener",
function(listener){
this.listeners.remove(listener);
},"org.eclipse.jface.util.IPropertyChangeListener");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ColorDescriptor"],"org.eclipse.jface.resource.RGBColorDescriptor",["$wt.graphics.Color"],function(){
c$=Clazz.decorateAsClass(function(){
this.color=null;
this.originalColor=null;
this.originalDevice=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"RGBColorDescriptor",org.eclipse.jface.resource.ColorDescriptor);
Clazz.makeConstructor(c$,
function(color){
Clazz.superConstructor(this,org.eclipse.jface.resource.RGBColorDescriptor,[]);
this.color=color;
},"$wt.graphics.RGB");
Clazz.makeConstructor(c$,
function(originalColor,originalDevice){
this.construct(originalColor.getRGB());
this.originalColor=originalColor;
this.originalDevice=originalDevice;
},"$wt.graphics.Color,$wt.graphics.Device");
Clazz.makeConstructor(c$,
function(originalColor){
this.construct(originalColor.getRGB());
this.originalColor=originalColor;
},"$wt.graphics.Color");
Clazz.overrideMethod(c$,"equals",
function(obj){
if(Clazz.instanceOf(obj,org.eclipse.jface.resource.RGBColorDescriptor)){
var other=obj;
return other.color.equals(this.color)&&other.originalColor===this.originalColor;
}return false;
},"~O");
Clazz.overrideMethod(c$,"hashCode",
function(){
return this.color.hashCode();
});
Clazz.overrideMethod(c$,"createColor",
function(device){
if(this.originalColor!=null){
if(this.originalDevice==null){
var result=new $wt.graphics.Color(device,this.color);
if(result.equals(this.originalColor)){
result.dispose();
this.originalDevice=device;
return this.originalColor;
}return result;
}if(this.originalDevice===device){
return this.originalColor;
}}return new $wt.graphics.Color(device,this.color);
},"$wt.graphics.Device");
Clazz.overrideMethod(c$,"destroyColor",
function(toDestroy){
if(toDestroy===this.originalColor){
return;
}toDestroy.dispose();
},"$wt.graphics.Color");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ResourceRegistry","java.util.ArrayList","$.HashMap"],"org.eclipse.jface.resource.ColorRegistry",["java.util.Collections","org.eclipse.jface.resource.ColorDescriptor","$wt.graphics.Color","$wt.widgets.Display"],function(){
c$=Clazz.decorateAsClass(function(){
this.display=null;
this.staleColors=null;
this.stringToColor=null;
this.stringToRGB=null;
this.displayRunnable=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"ColorRegistry",org.eclipse.jface.resource.ResourceRegistry);
Clazz.prepareFields(c$,function(){
this.staleColors=new java.util.ArrayList();
this.stringToColor=new java.util.HashMap(7);
this.stringToRGB=new java.util.HashMap(7);
this.displayRunnable=((Clazz.isClassDefined("org.eclipse.jface.resource.ColorRegistry$1")?0:org.eclipse.jface.resource.ColorRegistry.$ColorRegistry$1$()),Clazz.innerTypeInstance(org.eclipse.jface.resource.ColorRegistry$1,this,null));
});
Clazz.makeConstructor(c$,
function(){
this.construct($wt.widgets.Display.getCurrent(),true);
});
Clazz.makeConstructor(c$,
function(display){
this.construct(display,true);
},"$wt.widgets.Display");
Clazz.makeConstructor(c$,
function(display,cleanOnDisplayDisposal){
Clazz.superConstructor(this,org.eclipse.jface.resource.ColorRegistry,[]);
;
this.display=display;
if(cleanOnDisplayDisposal)this.hookDisplayDispose();
},"$wt.widgets.Display,~B");
Clazz.defineMethod(c$,"createColor",
($fz=function(rgb){
return new $wt.graphics.Color(this.display,rgb);
},$fz.isPrivate=true,$fz),"$wt.graphics.RGB");
Clazz.defineMethod(c$,"disposeColors",
($fz=function(iterator){
while(iterator.hasNext()){
var next=iterator.next();
(next).dispose();
}
},$fz.isPrivate=true,$fz),"java.util.Iterator");
Clazz.defineMethod(c$,"get",
function(symbolicName){
;
var result=this.stringToColor.get(symbolicName);
if(result!=null)return result;
var color=null;
result=this.stringToRGB.get(symbolicName);
if(result==null)return null;
color=this.createColor(result);
this.stringToColor.put(symbolicName,color);
return color;
},"~S");
Clazz.overrideMethod(c$,"getKeySet",
function(){
return java.util.Collections.unmodifiableSet(this.stringToRGB.keySet());
});
Clazz.defineMethod(c$,"getRGB",
function(symbolicName){
;
return this.stringToRGB.get(symbolicName);
},"~S");
Clazz.defineMethod(c$,"getColorDescriptor",
function(symbolicName){
return org.eclipse.jface.resource.ColorDescriptor.createFrom(this.getRGB(symbolicName));
},"~S");
Clazz.overrideMethod(c$,"clearCaches",
function(){
this.disposeColors(this.stringToColor.values().iterator());
this.disposeColors(this.staleColors.iterator());
this.stringToColor.clear();
this.staleColors.clear();
});
Clazz.overrideMethod(c$,"hasValueFor",
function(colorKey){
return this.stringToRGB.containsKey(colorKey);
},"~S");
Clazz.defineMethod(c$,"hookDisplayDispose",
($fz=function(){
this.display.disposeExec(this.displayRunnable);
},$fz.isPrivate=true,$fz));
Clazz.defineMethod(c$,"put",
function(symbolicName,colorData){
this.put(symbolicName,colorData,true);
},"~S,$wt.graphics.RGB");
Clazz.defineMethod(c$,"put",
($fz=function(symbolicName,colorData,update){
;
;
var existing=this.stringToRGB.get(symbolicName);
if(colorData.equals(existing))return;
var oldColor=this.stringToColor.remove(symbolicName);
this.stringToRGB.put(symbolicName,colorData);
if(update)this.fireMappingChanged(symbolicName,existing,colorData);
if(oldColor!=null)this.staleColors.add(oldColor);
},$fz.isPrivate=true,$fz),"~S,$wt.graphics.RGB,~B");
c$.$ColorRegistry$1$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.resource,"ColorRegistry$1",null,Runnable);
Clazz.overrideMethod(c$,"run",
function(){
this.b$["org.eclipse.jface.resource.ColorRegistry"].clearCaches();
});
c$=Clazz.p0p();
};
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ResourceRegistry","java.util.ArrayList","$.HashMap"],"org.eclipse.jface.resource.FontRegistry",["java.util.Arrays","$.Collections","$.MissingResourceException","$.ResourceBundle","org.eclipse.jface.resource.StringConverter","$wt.SWT","$wt.graphics.Font","$.FontData","$wt.widgets.Display","$.Shell"],function(){
c$=Clazz.decorateAsClass(function(){
if(!Clazz.isClassDefined("org.eclipse.jface.resource.FontRegistry.FontRecord")){
org.eclipse.jface.resource.FontRegistry.$FontRegistry$FontRecord$();
}
this.stringToFontRecord=null;
this.stringToFontData=null;
this.staleFonts=null;
this.displayRunnable=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"FontRegistry",org.eclipse.jface.resource.ResourceRegistry);
Clazz.prepareFields(c$,function(){
this.stringToFontRecord=new java.util.HashMap(7);
this.stringToFontData=new java.util.HashMap(7);
this.staleFonts=new java.util.ArrayList();
this.displayRunnable=((Clazz.isClassDefined("org.eclipse.jface.resource.FontRegistry$1")?0:org.eclipse.jface.resource.FontRegistry.$FontRegistry$1$()),Clazz.innerTypeInstance(org.eclipse.jface.resource.FontRegistry$1,this,null));
});
Clazz.makeConstructor(c$,
function(){
this.construct($wt.widgets.Display.getCurrent(),true);
});
Clazz.makeConstructor(c$,
function(location,loader){
Clazz.superConstructor(this,org.eclipse.jface.resource.FontRegistry,[]);
var display=$wt.widgets.Display.getCurrent();
;
this.readResourceBundle(location);
this.hookDisplayDispose(display);
},"~S,ClassLoader");
Clazz.makeConstructor(c$,
function(location){
this.construct(location,null);
},"~S");
Clazz.defineMethod(c$,"readResourceBundle",
($fz=function(location){
var osname=System.getProperty("os.name").trim();
var wsname=$WT.getPlatform();
osname=org.eclipse.jface.resource.StringConverter.removeWhiteSpaces(osname).toLowerCase();
wsname=org.eclipse.jface.resource.StringConverter.removeWhiteSpaces(wsname).toLowerCase();
var OSLocation=location;
var WSLocation=location;
var bundle=null;
if(osname!=null){
OSLocation=location+"_"+osname;
if(wsname!=null)WSLocation=OSLocation+"_"+wsname;
}try{
bundle=java.util.ResourceBundle.getBundle(WSLocation);
this.readResourceBundle(bundle,WSLocation);
}catch(wsException){
if(Clazz.instanceOf(wsException,java.util.MissingResourceException)){
try{
bundle=java.util.ResourceBundle.getBundle(OSLocation);
this.readResourceBundle(bundle,WSLocation);
}catch(osException){
if(Clazz.instanceOf(osException,java.util.MissingResourceException)){
if(location!==OSLocation){
bundle=java.util.ResourceBundle.getBundle(location);
this.readResourceBundle(bundle,WSLocation);
}else throw osException;
}else{
throw osException;
}
}
}else{
throw wsException;
}
}
},$fz.isPrivate=true,$fz),"~S");
Clazz.makeConstructor(c$,
function(display){
this.construct(display,true);
},"$wt.widgets.Display");
Clazz.makeConstructor(c$,
function(display,cleanOnDisplayDisposal){
Clazz.superConstructor(this,org.eclipse.jface.resource.FontRegistry,[]);
;
if(cleanOnDisplayDisposal)this.hookDisplayDispose(display);
},"$wt.widgets.Display,~B");
Clazz.defineMethod(c$,"bestData",
function(fonts,display){
for(var i=0;i<fonts.length;i++){
var fd=fonts[i];
if(fd==null)break;
var fixedFonts=display.getFontList(fd.getName(),false);
if(this.isFixedFont(fixedFonts,fd)){
return fd;
}var scalableFonts=display.getFontList(fd.getName(),true);
if(scalableFonts.length>0){
return fd;
}}
if(fonts.length>0)return fonts[0];
else return null;
},"~A,$wt.widgets.Display");
Clazz.defineMethod(c$,"bestDataArray",
function(fonts,display){
var bestData=this.bestData(fonts,display);
if(bestData==null)return null;
else{
var datas=new Array(1);
datas[0]=bestData;
return datas;
}},"~A,$wt.widgets.Display");
Clazz.defineMethod(c$,"filterData",
function(fonts,display){
var good=new java.util.ArrayList(fonts.length);
for(var i=0;i<fonts.length;i++){
var fd=fonts[i];
if(fd==null)continue;var fixedFonts=display.getFontList(fd.getName(),false);
if(this.isFixedFont(fixedFonts,fd)){
good.add(fd);
}var scalableFonts=display.getFontList(fd.getName(),true);
if(scalableFonts.length>0){
good.add(fd);
}}
if(good.isEmpty()&&fonts.length>0){
good.add(fonts[0]);
}else if(fonts.length==0){
return null;
}return good.toArray(new Array(good.size()));
},"~A,$wt.widgets.Display");
Clazz.defineMethod(c$,"createFont",
($fz=function(symbolicName,fonts){
var display=$wt.widgets.Display.getCurrent();
if(display==null)return null;
var validData=this.filterData(fonts,display);
if(validData.length==0){
return null;
}this.put(symbolicName,validData,false);
var newFont=new $wt.graphics.Font(display,validData);
return Clazz.innerTypeInstance(org.eclipse.jface.resource.FontRegistry.FontRecord,this,null,newFont,validData);
},$fz.isPrivate=true,$fz),"~S,~A");
Clazz.defineMethod(c$,"calculateDefaultFont",
function(){
var current=$wt.widgets.Display.getCurrent();
if(current==null){
var shell=new $wt.widgets.Shell();
var font=new $wt.graphics.Font(null,shell.getFont().getFontData());
shell.dispose();
return font;
}else return new $wt.graphics.Font(current,current.getSystemFont().getFontData());
});
Clazz.defineMethod(c$,"defaultFont",
function(){
return this.defaultFontRecord().getBaseFont();
});
Clazz.defineMethod(c$,"defaultFontRecord",
($fz=function(){
var record=this.stringToFontRecord.get("org.eclipse.jface.defaultfont");
if(record==null){
var defaultFont=this.calculateDefaultFont();
record=this.createFont("org.eclipse.jface.defaultfont",defaultFont.getFontData());
this.stringToFontRecord.put("org.eclipse.jface.defaultfont",record);
}return record;
},$fz.isPrivate=true,$fz));
Clazz.defineMethod(c$,"defaultFontData",
($fz=function(){
return this.defaultFontRecord().baseData;
},$fz.isPrivate=true,$fz));
Clazz.defineMethod(c$,"getFontData",
function(symbolicName){
;
var result=this.stringToFontData.get(symbolicName);
if(result==null)return this.defaultFontData();
return result;
},"~S");
Clazz.defineMethod(c$,"get",
function(symbolicName){
return this.getFontRecord(symbolicName).getBaseFont();
},"~S");
Clazz.defineMethod(c$,"getBold",
function(symbolicName){
return this.getFontRecord(symbolicName).getBoldFont();
},"~S");
Clazz.defineMethod(c$,"getItalic",
function(symbolicName){
return this.getFontRecord(symbolicName).getItalicFont();
},"~S");
Clazz.defineMethod(c$,"getFontRecord",
($fz=function(symbolicName){
;
var result=this.stringToFontRecord.get(symbolicName);
if(result!=null)return result;
result=this.stringToFontData.get(symbolicName);
var fontRecord;
if(result==null)fontRecord=this.defaultFontRecord();
else fontRecord=this.createFont(symbolicName,result);
if(fontRecord==null)fontRecord=this.defaultFontRecord();
this.stringToFontRecord.put(symbolicName,fontRecord);
return fontRecord;
},$fz.isPrivate=true,$fz),"~S");
Clazz.overrideMethod(c$,"getKeySet",
function(){
return java.util.Collections.unmodifiableSet(this.stringToFontData.keySet());
});
Clazz.overrideMethod(c$,"hasValueFor",
function(fontKey){
return this.stringToFontData.containsKey(fontKey);
},"~S");
Clazz.overrideMethod(c$,"clearCaches",
function(){
var iterator=this.stringToFontRecord.values().iterator();
while(iterator.hasNext()){
var next=iterator.next();
(next).dispose();
}
this.disposeFonts(this.staleFonts.iterator());
this.stringToFontRecord.clear();
this.staleFonts.clear();
});
Clazz.defineMethod(c$,"disposeFonts",
($fz=function(iterator){
while(iterator.hasNext()){
var next=iterator.next();
(next).dispose();
}
},$fz.isPrivate=true,$fz),"java.util.Iterator");
Clazz.defineMethod(c$,"hookDisplayDispose",
($fz=function(display){
display.disposeExec(this.displayRunnable);
},$fz.isPrivate=true,$fz),"$wt.widgets.Display");
Clazz.defineMethod(c$,"isFixedFont",
($fz=function(fixedFonts,fd){
var height=fd.getHeight();
var name=fd.getName();
for(var i=0;i<fixedFonts.length;i++){
var fixed=fixedFonts[i];
if(fixed.getHeight()==height&&fixed.getName().equals(name))return true;
}
return false;
},$fz.isPrivate=true,$fz),"~A,$wt.graphics.FontData");
Clazz.defineMethod(c$,"makeFontData",
($fz=function(value){
try{
return org.eclipse.jface.resource.StringConverter.asFontData(value.trim());
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
throw new java.util.MissingResourceException("Wrong font data format. Value is: \""+value+"\"",this.getClass().getName(),value);
}else{
throw e;
}
}
},$fz.isPrivate=true,$fz),"~S");
Clazz.defineMethod(c$,"put",
function(symbolicName,fontData){
this.put(symbolicName,fontData,true);
},"~S,~A");
Clazz.defineMethod(c$,"put",
($fz=function(symbolicName,fontData,update){
;
;
var existing=this.stringToFontData.get(symbolicName);
if(java.util.Arrays.equals(existing,fontData))return;
var oldFont=this.stringToFontRecord.remove(symbolicName);
this.stringToFontData.put(symbolicName,fontData);
if(update)this.fireMappingChanged(symbolicName,existing,fontData);
if(oldFont!=null)oldFont.addAllocatedFontsToStale(this.defaultFontRecord().getBaseFont());
},$fz.isPrivate=true,$fz),"~S,~A,~B");
Clazz.defineMethod(c$,"readResourceBundle",
($fz=function(bundle,bundleName){
var keys=bundle.getKeys();
while(keys.hasMoreElements()){
var key=keys.nextElement();
var pos=key.lastIndexOf('.');
if(pos==-1){
this.stringToFontData.put(key,[this.makeFontData(bundle.getString(key))]);
}else{
var name=key.substring(0,pos);
var i=0;
try{
i=Integer.parseInt(key.substring(pos+1));
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
throw new java.util.MissingResourceException("Wrong key format ",bundleName,key);
}else{
throw e;
}
}
var elements=this.stringToFontData.get(name);
if(elements==null){
elements=new Array(8);
this.stringToFontData.put(name,elements);
}if(i>elements.length){
var na=new Array(i+8);
System.arraycopy(elements,0,na,0,elements.length);
elements=na;
this.stringToFontData.put(name,elements);
}elements[i]=this.makeFontData(bundle.getString(key));
}}
},$fz.isPrivate=true,$fz),"java.util.ResourceBundle,~S");
c$.$FontRegistry$FontRecord$=function(){
Clazz.pu$h();
c$=Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this,arguments);
this.baseFont=null;
this.boldFont=null;
this.italicFont=null;
this.baseData=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource.FontRegistry,"FontRecord");
Clazz.makeConstructor(c$,
function(a,b){
this.baseFont=a;
this.baseData=b;
},"$wt.graphics.Font,~A");
Clazz.defineMethod(c$,"dispose",
function(){
this.baseFont.dispose();
if(this.boldFont!=null)this.boldFont.dispose();
if(this.italicFont!=null)this.italicFont.dispose();
});
Clazz.defineMethod(c$,"getBaseFont",
function(){
return this.baseFont;
});
Clazz.defineMethod(c$,"getBoldFont",
function(){
if(this.boldFont!=null)return this.boldFont;
var a=this.getModifiedFontData(1);
this.boldFont=new $wt.graphics.Font($wt.widgets.Display.getCurrent(),a);
return this.boldFont;
});
Clazz.defineMethod(c$,"getModifiedFontData",
($fz=function(a){
var b=new Array(this.baseData.length);
for(var c=0;c<b.length;c++){
var d=this.baseData[c];
b[c]=new $wt.graphics.FontData(d.getName(),d.getHeight(),d.getStyle()|a);
}
return b;
},$fz.isPrivate=true,$fz),"~N");
Clazz.defineMethod(c$,"getItalicFont",
function(){
if(this.italicFont!=null)return this.italicFont;
var a=this.getModifiedFontData(2);
this.italicFont=new $wt.graphics.Font($wt.widgets.Display.getCurrent(),a);
return this.italicFont;
});
Clazz.defineMethod(c$,"addAllocatedFontsToStale",
function(a){
if(a!==this.baseFont&&this.baseFont!=null)this.b$["org.eclipse.jface.resource.FontRegistry"].staleFonts.add(this.baseFont);
if(a!==this.boldFont&&this.boldFont!=null)this.b$["org.eclipse.jface.resource.FontRegistry"].staleFonts.add(this.boldFont);
if(a!==this.italicFont&&this.italicFont!=null)this.b$["org.eclipse.jface.resource.FontRegistry"].staleFonts.add(this.italicFont);
},"$wt.graphics.Font");
c$=Clazz.p0p();
};
c$.$FontRegistry$1$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.resource,"FontRegistry$1",null,Runnable);
Clazz.overrideMethod(c$,"run",
function(){
this.b$["org.eclipse.jface.resource.FontRegistry"].clearCaches();
});
c$=Clazz.p0p();
};
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(null,"org.eclipse.jface.resource.ResourceManager",["org.eclipse.jface.resource.RGBColorDescriptor"],function(){
c$=Clazz.decorateAsClass(function(){
this.disposeExecs=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"ResourceManager");
Clazz.defineMethod(c$,"createImage",
function(descriptor){
return this.create(descriptor);
},"org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod(c$,"createImageWithDefault",
function(descriptor){
if(descriptor==null){
return this.getDefaultImage();
}try{
return this.create(descriptor);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DeviceResourceException)){
return this.getDefaultImage();
}else{
throw e;
}
}
},"org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod(c$,"destroyImage",
function(descriptor){
this.destroy(descriptor);
},"org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod(c$,"createColor",
function(descriptor){
return this.create(descriptor);
},"org.eclipse.jface.resource.ColorDescriptor");
Clazz.defineMethod(c$,"createColor",
function(descriptor){
return this.createColor(new org.eclipse.jface.resource.RGBColorDescriptor(descriptor));
},"$wt.graphics.RGB");
Clazz.defineMethod(c$,"destroyColor",
function(descriptor){
this.destroyColor(new org.eclipse.jface.resource.RGBColorDescriptor(descriptor));
},"$wt.graphics.RGB");
Clazz.defineMethod(c$,"destroyColor",
function(descriptor){
this.destroy(descriptor);
},"org.eclipse.jface.resource.ColorDescriptor");
Clazz.defineMethod(c$,"createFont",
function(descriptor){
return this.create(descriptor);
},"org.eclipse.jface.resource.FontDescriptor");
Clazz.defineMethod(c$,"destroyFont",
function(descriptor){
this.destroy(descriptor);
},"org.eclipse.jface.resource.FontDescriptor");
Clazz.defineMethod(c$,"dispose",
function(){
if(this.disposeExecs==null){
return;
}var foundException=null;
var execs=this.disposeExecs.toArray(new Array(this.disposeExecs.size()));
for(var i=0;i<execs.length;i++){
var exec=execs[i];
try{
exec.run();
}catch(e){
if(Clazz.instanceOf(e,RuntimeException)){
foundException=e;
}else{
throw e;
}
}
}
if(foundException!=null){
throw foundException;
}});
Clazz.defineMethod(c$,"disposeExec",
function(r){
;
if(this.disposeExecs==null){
this.disposeExecs=new Array();
}{
this.disposeExecs[this.disposeExecs.length]=r;
}},"Runnable");
Clazz.defineMethod(c$,"cancelDisposeExec",
function(r){
;
if(this.disposeExecs==null){
return;
}{
var empty=true;
var removed=false;
var length=this.disposeExecs.length;
for(var i=0;i<length;i++){
if(this.disposeExecs[i]===r){
this.disposeExecs[i]=null;
removed=true;
if(!empty){
break;
}
}
if(this.disposeExecs[i]!=null){
empty=false;
if(removed){
break;
}
}
}
if(empty){
this.disposeExecs=null;
}
}},"Runnable");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ResourceManager"],"org.eclipse.jface.resource.AbstractResourceManager",["java.util.HashMap"],function(){
c$=Clazz.decorateAsClass(function(){
this.map=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"AbstractResourceManager",org.eclipse.jface.resource.ResourceManager);
Clazz.overrideMethod(c$,"create",
function(descriptor){
if(this.map==null){
this.map=new java.util.HashMap();
}var count=this.map.get(descriptor);
if(count!=null){
count.count++;
return count.resource;
}var resource=this.allocate(descriptor);
count=new org.eclipse.jface.resource.AbstractResourceManager.RefCount(resource);
this.map.put(descriptor,count);
return resource;
},"org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod(c$,"destroy",
function(descriptor){
if(this.map==null){
return;
}var count=this.map.get(descriptor);
if(count!=null){
count.count--;
if(count.count==0){
this.deallocate(count.resource,descriptor);
this.map.remove(descriptor);
}}if(this.map.isEmpty()){
this.map=null;
}},"org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.defineMethod(c$,"dispose",
function(){
Clazz.superCall(this,org.eclipse.jface.resource.AbstractResourceManager,"dispose",[]);
if(this.map==null){
return;
}var entries=this.map.entrySet();
for(var iter=entries.iterator();iter.hasNext();){
var next=iter.next();
var key=next.getKey();
var val=next.getValue();
this.deallocate(val.resource,key);
}
this.map=null;
});
Clazz.overrideMethod(c$,"find",
function(descriptor){
if(this.map==null){
return null;
}return this.map.get(descriptor);
},"org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.pu$h();
c$=Clazz.decorateAsClass(function(){
this.resource=null;
this.count=1;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource.AbstractResourceManager,"RefCount");
Clazz.makeConstructor(c$,
function(a){
this.resource=a;
},"~O");
c$=Clazz.p0p();
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.AbstractResourceManager"],"org.eclipse.jface.resource.DeviceResourceManager",["org.eclipse.jface.resource.ImageDescriptor"],function(){
c$=Clazz.decorateAsClass(function(){
this.device=null;
this.missingImage=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"DeviceResourceManager",org.eclipse.jface.resource.AbstractResourceManager);
Clazz.overrideMethod(c$,"getDevice",
function(){
return this.device;
});
Clazz.makeConstructor(c$,
function(device){
Clazz.superConstructor(this,org.eclipse.jface.resource.DeviceResourceManager,[]);
this.device=device;
},"$wt.graphics.Device");
Clazz.overrideMethod(c$,"allocate",
function(descriptor){
return descriptor.createResource(this.device);
},"org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod(c$,"deallocate",
function(resource,descriptor){
descriptor.destroyResource(resource);
},"~O,org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod(c$,"getDefaultImage",
function(){
if(this.missingImage==null){
this.missingImage=org.eclipse.jface.resource.ImageDescriptor.getMissingImageDescriptor().createImage();
}return this.missingImage;
});
Clazz.defineMethod(c$,"dispose",
function(){
Clazz.superCall(this,org.eclipse.jface.resource.DeviceResourceManager,"dispose",[]);
if(this.missingImage!=null){
this.missingImage.dispose();
this.missingImage=null;
}});
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.AbstractResourceManager"],"org.eclipse.jface.resource.LocalResourceManager",["$wt.events.DisposeListener"],function(){
c$=Clazz.decorateAsClass(function(){
this.parentRegistry=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"LocalResourceManager",org.eclipse.jface.resource.AbstractResourceManager);
Clazz.makeConstructor(c$,
function(parentRegistry){
Clazz.superConstructor(this,org.eclipse.jface.resource.LocalResourceManager,[]);
this.parentRegistry=parentRegistry;
},"org.eclipse.jface.resource.ResourceManager");
Clazz.makeConstructor(c$,
function(parentRegistry,owner){
this.construct(parentRegistry);
owner.addDisposeListener(((Clazz.isClassDefined("org.eclipse.jface.resource.LocalResourceManager$1")?0:org.eclipse.jface.resource.LocalResourceManager.$LocalResourceManager$1$()),Clazz.innerTypeInstance(org.eclipse.jface.resource.LocalResourceManager$1,this,null)));
},"org.eclipse.jface.resource.ResourceManager,$wt.widgets.Control");
Clazz.defineMethod(c$,"getDevice",
function(){
return this.parentRegistry.getDevice();
});
Clazz.overrideMethod(c$,"allocate",
function(descriptor){
return this.parentRegistry.create(descriptor);
},"org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod(c$,"deallocate",
function(resource,descriptor){
this.parentRegistry.destroy(descriptor);
},"~O,org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.defineMethod(c$,"getDefaultImage",
function(){
return this.parentRegistry.getDefaultImage();
});
c$.$LocalResourceManager$1$=function(){
Clazz.pu$h();
c$=Clazz.declareAnonymous(org.eclipse.jface.resource,"LocalResourceManager$1",null,$wt.events.DisposeListener);
Clazz.overrideMethod(c$,"widgetDisposed",
function(e){
this.b$["org.eclipse.jface.resource.LocalResourceManager"].dispose();
},"$wt.events.DisposeEvent");
c$=Clazz.p0p();
};
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(null,"org.eclipse.jface.resource.StringConverter",["java.lang.Character","$.Double","$.Float","$.Long","$.StringBuffer","java.util.ArrayList","$.StringTokenizer","org.eclipse.jface.resource.DataFormatException","$.JFaceResources","$wt.graphics.FontData","$.Point","$.RGB","$.Rectangle"],function(){
c$=Clazz.declareType(org.eclipse.jface.resource,"StringConverter");
c$.asArray=Clazz.defineMethod(c$,"asArray",
function(value){
var list=new java.util.ArrayList();
var stok=new java.util.StringTokenizer(value);
while(stok.hasMoreTokens()){
list.add(stok.nextToken());
}
var result=new Array(list.size());
list.toArray(result);
return result;
},"~S");
c$.asArray=Clazz.defineMethod(c$,"asArray",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asArray(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,~A");
c$.asBoolean=Clazz.defineMethod(c$,"asBoolean",
function(value){
var v=value.toLowerCase();
if(v.equals("t")||v.equals("true"))return true;
if(value.equals("f")||v.equals("false"))return false;
throw new org.eclipse.jface.resource.DataFormatException("Value "+value+"doesn't represent a boolean");
},"~S");
c$.asBoolean=Clazz.defineMethod(c$,"asBoolean",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asBoolean(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,~B");
c$.asDouble=Clazz.defineMethod(c$,"asDouble",
function(value){
try{
return(Double.$valueOf(value)).doubleValue();
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
throw new org.eclipse.jface.resource.DataFormatException(e.getMessage());
}else{
throw e;
}
}
},"~S");
c$.asDouble=Clazz.defineMethod(c$,"asDouble",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asDouble(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,~N");
c$.asFloat=Clazz.defineMethod(c$,"asFloat",
function(value){
try{
return(Float.$valueOf(value)).floatValue();
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
throw new org.eclipse.jface.resource.DataFormatException(e.getMessage());
}else{
throw e;
}
}
},"~S");
c$.asFloat=Clazz.defineMethod(c$,"asFloat",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asFloat(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,~N");
c$.asFontData=Clazz.defineMethod(c$,"asFontData",
function(value){
if(value==null)throw new org.eclipse.jface.resource.DataFormatException("Null doesn't represent a valid font data");
var name=null;
var height=0;
var style=0;
try{
var length=value.length;
var heightIndex=value.lastIndexOf('-');
if(heightIndex==-1)throw new org.eclipse.jface.resource.DataFormatException("No correct font data format \""+value+"\"");
height=org.eclipse.jface.resource.StringConverter.asInt(value.substring(heightIndex+1,length));
var faceIndex=value.lastIndexOf('-',heightIndex-1);
if(faceIndex==-1)throw new org.eclipse.jface.resource.DataFormatException("No correct font data format \""+value+"\"");
var s=value.substring(faceIndex+1,heightIndex);
if("bold italic".equals(s)){
style=3;
}else if("bold".equals(s)){
style=1;
}else if("italic".equals(s)){
style=2;
}else if("regular".equals(s)){
style=0;
}else{
throw new org.eclipse.jface.resource.DataFormatException("Unknown face name \""+s+"\"");
}name=value.substring(0,faceIndex);
}catch(e){
if(Clazz.instanceOf(e,java.util.NoSuchElementException)){
throw new org.eclipse.jface.resource.DataFormatException(e.getMessage());
}else{
throw e;
}
}
return new $wt.graphics.FontData(name,height,style);
},"~S");
c$.getArrayFromList=Clazz.defineMethod(c$,"getArrayFromList",
($fz=function(prop,separator){
if(prop==null||prop.trim().equals(""))return new Array(0);
var list=new java.util.ArrayList();
var tokens=new java.util.StringTokenizer(prop,separator);
while(tokens.hasMoreTokens()){
var token=tokens.nextToken().trim();
if(!token.equals(""))list.add(token);
}
return list.isEmpty()?new Array(0):list.toArray(new Array(list.size()));
},$fz.isPrivate=true,$fz),"~S,~S");
c$.asFontDataArray=Clazz.defineMethod(c$,"asFontDataArray",
function(value){
var strings=org.eclipse.jface.resource.StringConverter.getArrayFromList(value,";");
var data=new java.util.ArrayList(strings.length);
for(var i=0;i<strings.length;i++){
try{
data.add(org.eclipse.jface.resource.StringConverter.asFontData(strings[i]));
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
}else{
throw e;
}
}
}
return data.toArray(new Array(data.size()));
},"~S");
c$.asFontData=Clazz.defineMethod(c$,"asFontData",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asFontData(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,$wt.graphics.FontData");
c$.asInt=Clazz.defineMethod(c$,"asInt",
function(value){
try{
return Integer.parseInt(value);
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
throw new org.eclipse.jface.resource.DataFormatException(e.getMessage());
}else{
throw e;
}
}
},"~S");
c$.asInt=Clazz.defineMethod(c$,"asInt",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asInt(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,~N");
c$.asLong=Clazz.defineMethod(c$,"asLong",
function(value){
try{
return Long.parseLong(value);
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
throw new org.eclipse.jface.resource.DataFormatException(e.getMessage());
}else{
throw e;
}
}
},"~S");
c$.asLong=Clazz.defineMethod(c$,"asLong",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asLong(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,~N");
c$.asPoint=Clazz.defineMethod(c$,"asPoint",
function(value){
if(value==null)throw new org.eclipse.jface.resource.DataFormatException("Null doesn't represent a valid point");
var stok=new java.util.StringTokenizer(value,",");
var x=stok.nextToken();
var y=stok.nextToken();
var xval=0;
var yval=0;
try{
xval=Integer.parseInt(x);
yval=Integer.parseInt(y);
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
throw new org.eclipse.jface.resource.DataFormatException(e.getMessage());
}else{
throw e;
}
}
return new $wt.graphics.Point(xval,yval);
},"~S");
c$.asPoint=Clazz.defineMethod(c$,"asPoint",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asPoint(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,$wt.graphics.Point");
c$.asRectangle=Clazz.defineMethod(c$,"asRectangle",
function(value){
if(value==null)throw new org.eclipse.jface.resource.DataFormatException("Null doesn't represent a valid rectangle");
var stok=new java.util.StringTokenizer(value,",");
var x=stok.nextToken();
var y=stok.nextToken();
var width=stok.nextToken();
var height=stok.nextToken();
var xval=0;
var yval=0;
var wval=0;
var hval=0;
try{
xval=Integer.parseInt(x);
yval=Integer.parseInt(y);
wval=Integer.parseInt(width);
hval=Integer.parseInt(height);
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
throw new org.eclipse.jface.resource.DataFormatException(e.getMessage());
}else{
throw e;
}
}
return new $wt.graphics.Rectangle(xval,yval,wval,hval);
},"~S");
c$.asRectangle=Clazz.defineMethod(c$,"asRectangle",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asRectangle(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,$wt.graphics.Rectangle");
c$.asRGB=Clazz.defineMethod(c$,"asRGB",
function(value){
if(value==null)throw new org.eclipse.jface.resource.DataFormatException("Null doesn't represent a valid RGB");
var stok=new java.util.StringTokenizer(value,",");
try{
var red=stok.nextToken();
var green=stok.nextToken();
var blue=stok.nextToken();
var rval=0;
var gval=0;
var bval=0;
try{
rval=Integer.parseInt(red);
gval=Integer.parseInt(green);
bval=Integer.parseInt(blue);
}catch(e){
if(Clazz.instanceOf(e,NumberFormatException)){
throw new org.eclipse.jface.resource.DataFormatException(e.getMessage());
}else{
throw e;
}
}
return new $wt.graphics.RGB(rval,gval,bval);
}catch(e){
if(Clazz.instanceOf(e,java.util.NoSuchElementException)){
throw new org.eclipse.jface.resource.DataFormatException(e.getMessage());
}else{
throw e;
}
}
},"~S");
c$.asRGB=Clazz.defineMethod(c$,"asRGB",
function(value,dflt){
try{
return org.eclipse.jface.resource.StringConverter.asRGB(value);
}catch(e){
if(Clazz.instanceOf(e,org.eclipse.jface.resource.DataFormatException)){
return dflt;
}else{
throw e;
}
}
},"~S,$wt.graphics.RGB");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
return String.valueOf(value);
},"~N");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
return String.valueOf(value);
},"~N");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
return String.valueOf(value);
},"~N");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
return String.valueOf(value);
},"~N");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
;
return String.valueOf(value.booleanValue());
},"Boolean");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
;
return String.valueOf(value.doubleValue());
},"Double");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
;
return String.valueOf(value.floatValue());
},"Float");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
;
return String.valueOf(value.intValue());
},"Integer");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
;
return String.valueOf(value.longValue());
},"Long");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
var buffer=new StringBuffer();
for(var i=0;i<value.length;i++){
buffer.append(org.eclipse.jface.resource.StringConverter.asString(value[i]));
if(i!=value.length-1)buffer.append(";");
}
return buffer.toString();
},"~A");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
;
var buffer=new StringBuffer();
buffer.append(value.getName());
buffer.append('-');
var style=value.getStyle();
var bold=(style&1)==1;
var italic=(style&2)==2;
if(bold&&italic){
buffer.append("bold italic");
}else if(bold){
buffer.append("bold");
}else if(italic){
buffer.append("italic");
}else{
buffer.append("regular");
}buffer.append('-');
buffer.append(value.getHeight());
return buffer.toString();
},"$wt.graphics.FontData");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
;
var buffer=new StringBuffer();
buffer.append(value.x);
buffer.append(',');
buffer.append(value.y);
return buffer.toString();
},"$wt.graphics.Point");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
;
var buffer=new StringBuffer();
buffer.append(value.x);
buffer.append(',');
buffer.append(value.y);
buffer.append(',');
buffer.append(value.width);
buffer.append(',');
buffer.append(value.height);
return buffer.toString();
},"$wt.graphics.Rectangle");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
;
var buffer=new StringBuffer();
buffer.append(value.red);
buffer.append(',');
buffer.append(value.green);
buffer.append(',');
buffer.append(value.blue);
return buffer.toString();
},"$wt.graphics.RGB");
c$.asString=Clazz.defineMethod(c$,"asString",
function(value){
return String.valueOf(value);
},"~B");
c$.removeWhiteSpaces=Clazz.defineMethod(c$,"removeWhiteSpaces",
function(s){
var found=false;
var wsIndex=-1;
var size=s.length;
for(var i=0;i<size;i++){
found=Character.isWhitespace(s.charAt(i));
if(found){
wsIndex=i;
break;
}}
if(!found)return s;
var result=new StringBuffer(s.substring(0,wsIndex));
for(var i=wsIndex+1;i<size;i++){
var ch=s.charAt(i);
if(!Character.isWhitespace(ch))result.append(ch);
}
return result.toString();
},"~S");
c$.asDisplayableString=Clazz.defineMethod(c$,"asDisplayableString",
function(value){
;
var buffer=new StringBuffer();
buffer.append(value.getName());
buffer.append('-');
var style=value.getStyle();
var bold=(style&1)==1;
var italic=(style&2)==2;
if(bold&&italic){
buffer.append(org.eclipse.jface.resource.JFaceResources.getString("BoldItalicFont"));
}else if(bold){
buffer.append(org.eclipse.jface.resource.JFaceResources.getString("BoldFont"));
}else if(italic){
buffer.append(org.eclipse.jface.resource.JFaceResources.getString("ItalicFont"));
}else{
buffer.append(org.eclipse.jface.resource.JFaceResources.getString("RegularFont"));
}buffer.append('-');
buffer.append(value.getHeight());
return buffer.toString();
},"$wt.graphics.FontData");
Clazz.defineStatics(c$,
"REGULAR","regular",
"BOLD","bold",
"ITALIC","italic",
"BOLD_ITALIC","bold italic",
"SEPARATOR",'-',
"FONT_SEPARATOR",";");
});
Clazz.declarePackage("org.eclipse.jface.resource");
Clazz.load(["org.eclipse.jface.resource.ImageDescriptor"],"org.eclipse.jface.resource.URLImageDescriptor",["java.io.BufferedInputStream","$wt.graphics.ImageData"],function(){
c$=Clazz.decorateAsClass(function(){
this.url=null;
Clazz.instantialize(this,arguments);
},org.eclipse.jface.resource,"URLImageDescriptor",org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor(c$,
function(url){
Clazz.superConstructor(this,org.eclipse.jface.resource.URLImageDescriptor,[]);
this.url=url;
},"java.net.URL");
Clazz.overrideMethod(c$,"equals",
function(o){
if(!(Clazz.instanceOf(o,org.eclipse.jface.resource.URLImageDescriptor))){
return false;
}return(o).url.equals(this.url);
},"~O");
Clazz.overrideMethod(c$,"getImageData",
function(){
var result=null;
var $in=this.getStream();
if($in!=null){
try{
result=new $wt.graphics.ImageData($in);
}catch(e){
if(Clazz.instanceOf(e,$wt.SWTException)){
if(e.code!=40)throw e;
}else{
throw e;
}
}finally{
try{
$in.close();
}catch(e){
if(Clazz.instanceOf(e,java.io.IOException)){
}else{
throw e;
}
}
}
}return result;
});
Clazz.defineMethod(c$,"getStream",
function(){
try{
return new java.io.BufferedInputStream(this.url.openStream());
}catch(e){
if(Clazz.instanceOf(e,java.io.IOException)){
return null;
}else{
throw e;
}
}
});
Clazz.overrideMethod(c$,"hashCode",
function(){
return this.url.hashCode();
});
Clazz.overrideMethod(c$,"toString",
function(){
return"URLImageDescriptor("+this.url+")";
});
});
