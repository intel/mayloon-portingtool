Clazz.declarePackage ("net.sf.j2s.lib.build");
Clazz.load (null, "net.sf.j2s.lib.build.SmartJSCompressor", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "java.lang.Boolean", "$.StringBuffer", "java.util.ArrayList", "$.HashMap", "net.sf.j2s.lib.build.RegExCompress"], function () {
c$ = Clazz.declareType (net.sf.j2s.lib.build, "SmartJSCompressor");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
if (args.length < 2) {
System.out.println ("Usage: \r\n... <source.js> <dest.js> [variable=true|false] ...");
return ;
}var src = args[0];
var dest = args[1];
var srcFile =  new java.io.File (src);
if (!srcFile.exists ()) {
System.err.println ("Error: source file " + srcFile.getAbsolutePath () + " does not exist!");
return ;
}var vals =  new java.util.HashMap ();
if (args.length > 2) {
for (var i = 2; i < args.length; i++) {
if (args[i].indexOf ("=") != -1) {
var split = args[i].$plit ("=");
vals.put (split[0].trim (),  new Boolean ("true".equals (split[1].trim ())));
}}
}var veb = vals.get ("verbose");
var isVerbose = veb != null && (Clazz.instanceOf (veb, Boolean)) && (veb).booleanValue ();
var source = net.sf.j2s.lib.build.RegExCompress.readFileAll ( new java.io.FileInputStream (srcFile));
if ("Class.js".equals (srcFile.getName ())) {
source += net.sf.j2s.lib.build.RegExCompress.readFileAll ( new java.io.FileInputStream ( new java.io.File (srcFile.getParentFile (), "ClassExt.js")));
}var sourceLength = source.length;
var blockInstructions =  new java.util.ArrayList ();
var idx1 = source.lastIndexOf ("#*/");
while (idx1 != -1) {
var idx2 = source.lastIndexOf ("/*#", idx1 - 1);
if (idx2 != -1) {
var comment = source.substring (idx2 + 3, idx1 - 1);
blockInstructions.add ( new net.sf.j2s.lib.build.SmartJSCompressor.BlockScope (idx2, idx1 + 3, comment));
} else {
break;
}idx1 = source.lastIndexOf ("#*/", idx2 - 1);
}
if (blockInstructions.size () > 0) {
var buffer =  new StringBuffer ();
var isScopeOpen = false;
var begin = 0;
var last = null;
var index1 = -1;
var index2 = -1;
for (var i = blockInstructions.size () - 1; i >= 0; i--) {
var bs = blockInstructions.get (i);
var index = 0;
if ((index = bs.command.indexOf (">>x")) != -1) {
index1 = index;
isScopeOpen = true;
last = bs;
} else if ((index = bs.command.indexOf ("x<<")) != -1) {
index2 = index;
if (isScopeOpen) {
isScopeOpen = false;
var instruction = last.command.substring (0, index1).trim ();
var isOK = false;
if (instruction.startsWith ("{$")) {
var cond = instruction.substring (2, instruction.length - 1);
var v = vals.get (cond);
isOK = v != null && (Clazz.instanceOf (v, Boolean)) && (v).booleanValue ();
} else {
isOK = true;
}if (isOK) {
buffer.append (source.substring (begin, last.begin));
begin = bs.end;
var ss = net.sf.j2s.lib.build.SmartJSCompressor.getCommentString (bs.command.substring (index2 + 3));
if (ss.length > 0) {
for (var j = 0; j < ss.length; j++) {
buffer.append (ss[j]);
buffer.append ("\r\n");
}
}}}}}
if (begin != 0) {
buffer.append (source.substring (begin));
source = buffer.toString ();
}}System.out.println (1.0 * source.length / sourceLength);
blockInstructions =  new java.util.ArrayList ();
idx1 = source.lastIndexOf ("#-*/");
while (idx1 != -1) {
var idx2 = source.lastIndexOf ("/*-#", idx1 - 1);
if (idx2 != -1) {
var comment = source.substring (idx2 + 4, idx1 - 1);
var commentLines = net.sf.j2s.lib.build.SmartJSCompressor.getCommentString (comment);
for (var i = 0; i < commentLines.length; i++) {
blockInstructions.add (commentLines[i]);
}
} else {
break;
}idx1 = source.lastIndexOf ("#-*/", idx2 - 1);
}
var lines = blockInstructions.toArray ( new Array (0));
for (var i = 0; i < lines.length; i++) {
var command = lines[i];
if (command.indexOf ("->") != -1) {
var split = command.$plit ("\\s*->\\s*");
var from = split[0].trim ().replaceAll ("(\\$|\\.|\\[|\\(|\\)|\\])", "\\\\$0");
var to = split[1].trim ().replaceAll ("\\$", "\\\\\\$");
if (isVerbose) {
System.out.println (from + "->" + to);
}source = source.replaceAll (from, to);
}}
var endBuffer =  new StringBuffer ();
for (var i = 0; i < lines.length; i++) {
var command = lines[i];
if (command.startsWith ("<<<")) {
endBuffer.append (command.substring (3).trim ());
endBuffer.append ("\r\n");
}}
if (endBuffer.length () != 0) {
source += endBuffer.toString ();
}System.out.println (1.0 * source.length / sourceLength);
var v = vals.get ("link.compress");
var isRegCompressOK = v != null && (Clazz.instanceOf (v, Boolean)) && (v).booleanValue ();
if (isRegCompressOK) {
source = net.sf.j2s.lib.build.RegExCompress.regexCompress (source);
} else {
source = net.sf.j2s.lib.build.RegExCompress.regexCompress2 (source);
}var fos =  new java.io.FileOutputStream (dest);
fos.write ([0xef, 0xbb, 0xbf]);
fos.write (source.getBytes ("utf-8"));
fos.close ();
System.out.println (1.0 * source.length / sourceLength);
}, "~A");
c$.getCommentString = Clazz.defineMethod (c$, "getCommentString", 
function (comment) {
var all =  new java.util.ArrayList ();
var split = comment.$plit ("\r\n|\r|\n");
var isAppending = false;
for (var i = 0; i < split.length; i++) {
split[i] = split[i].trim ();
if (split[i].startsWith ("#")) {
split[i] = split[i].substring (1).trim ();
}if (split[i].length != 0) {
if (split[i].indexOf ("->") != -1) {
all.add (split[i]);
} else if (split[i].startsWith ("<<<")) {
isAppending = true;
all.add (split[i]);
} else if (split[i].startsWith ("x<<")) {
isAppending = false;
all.add (split[i]);
} else {
if (isAppending) {
all.add ("<<< " + split[i]);
} else {
all.add (split[i]);
}}}}
return all.toArray ( new Array (0));
}, "~S");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.begin = 0;
this.end = 0;
this.command = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.lib.build.SmartJSCompressor, "BlockScope");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.begin = a;
this.end = b;
this.command = c;
}, "~N,~N,~S");
c$ = Clazz.p0p ();
});
