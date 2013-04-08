Clazz.declarePackage ("net.sf.j2s.lib.build");
Clazz.load (null, "net.sf.j2s.lib.build.PackImage", ["java.awt.image.BufferedImage", "java.io.File", "java.util.ArrayList", "javax.imageio.ImageIO"], function () {
c$ = Clazz.declareType (net.sf.j2s.lib.build, "PackImage");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
if (args == null || args.length < 6) {
System.out.println ("Usage: PackImage <type> <margin> <path> <target> <image1> <image2> [...]");
return ;
}var type = args[0];
var margin = -1;
try {
margin = Integer.parseInt (args[1]);
} catch (e1) {
if (Clazz.instanceOf (e1, NumberFormatException)) {
e1.printStackTrace ();
return ;
} else {
throw e1;
}
}
if (margin < 0) {
System.out.println ("Margin should be greater than 0!");
return ;
}var path = args[2];
var target = args[3];
var images =  new java.util.ArrayList ();
for (var i = 4; i < args.length; i++) {
var file = args[i];
var f =  new java.io.File (path, file);
if (f.exists ()) {
try {
var image = javax.imageio.ImageIO.read (f);
if (image != null) {
images.add (image);
System.out.println ("\t\t\"" + f.getName () + "\",");
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}
var size = images.size ();
if (size < 2) {
System.out.println ("Warning: no need to pack image");
return ;
}var allImages = images.toArray ( new Array (size));
var maxWidth = 0;
var maxHeight = 0;
for (var i = 0; i < allImages.length; i++) {
var image = allImages[i];
var w = image.getWidth ();
if (w > maxWidth) {
maxWidth = w;
}var h = image.getHeight ();
if (h > maxHeight) {
maxHeight = h;
}}
var arraySize = Math.round (Math.ceil (Math.sqrt (allImages.length)));
var imageWidth = arraySize * maxWidth + margin * (arraySize + 1);
var imageHeight = arraySize * maxHeight + margin * (arraySize + 1);
var bigImage =  new java.awt.image.BufferedImage (imageWidth, imageHeight, 2);
var gfx = null;
try {
gfx = bigImage.createGraphics ();
for (var i = 0; i < allImages.length; i++) {
var image = allImages[i];
var ix = i % arraySize;
var x = ix * maxWidth + (ix + 1) * margin;
var iy = Math.floor (i / arraySize);
var y = iy * maxHeight + (iy + 1) * margin;
gfx.drawImage (image, x, y, null);
}
if ("gif".equals (type)) {
for (var i = 0; i < imageHeight; i++) {
for (var j = 0; j < imageWidth; j++) {
var rgb = bigImage.getRGB (j, i);
if ((rgb & 0x7f000000) == 0) {
bigImage.setRGB (j, i, -16725078);
}}
}
}javax.imageio.ImageIO.write (bigImage, type,  new java.io.File (path, target));
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
} finally {
if (gfx != null) {
gfx.dispose ();
}}
System.out.println ("Done!");
System.out.println ("margin=" + margin);
System.out.println ("width=" + maxWidth);
System.out.println ("height=" + maxHeight);
}, "~A");
});
