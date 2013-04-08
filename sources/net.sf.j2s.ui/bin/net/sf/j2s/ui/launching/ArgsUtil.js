Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (null, "net.sf.j2s.ui.launching.ArgsUtil", ["java.lang.StringBuffer", "java.util.ArrayList"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.launching, "ArgsUtil");
c$.splitArguments = Clazz.defineMethod (c$, "splitArguments", 
function (s) {
if (s == null || s.trim ().length == 0) {
return  new Array (0);
}s = s.trim ();
var list =  new java.util.ArrayList ();
var lastIndex = 0;
var index = 0;
var length = s.length;
while (index < length) {
var buffer =  new StringBuffer ();
var isInString = false;
var lastInStringConcat = false;
var lastChar = String.fromCharCode (0);
while (index < length) {
var ch = s.charAt (index++);
if (!isInString) {
if ((ch).charCodeAt (0) == (' ').charCodeAt (0) || (ch).charCodeAt (0) == ('\r').charCodeAt (0) || (ch).charCodeAt (0) == ('\n').charCodeAt (0) || (ch).charCodeAt (0) == ('\t').charCodeAt (0)) {
lastChar = ch;
if (index == lastIndex + 1) {
lastIndex = index;
continue ;}break;
} else if ((ch).charCodeAt (0) == ('\"').charCodeAt (0)) {
if ((lastChar).charCodeAt (0) != ('\\').charCodeAt (0)) {
isInString = true;
lastChar = ch;
lastInStringConcat = index != lastIndex + 1;
continue ;} else {
buffer.deleteCharAt (buffer.length () - 1);
}}lastChar = ch;
} else {
if ((ch).charCodeAt (0) == ('\"').charCodeAt (0)) {
if ((lastChar).charCodeAt (0) != ('\\').charCodeAt (0)) {
isInString = false;
if (lastInStringConcat) {
continue ;} else {
break;
}} else {
buffer.deleteCharAt (buffer.length () - 1);
}}}buffer.append (ch);
lastChar = ch;
}
lastIndex = index;
if (buffer.length () != 0) {
list.add (buffer.toString ());
}}
return list.toArray ( new Array (0));
}, "~S");
c$.outputString = Clazz.defineMethod (c$, "outputString", 
function (s) {
if (s == null || s.length == 0) {
return s;
}var buffer =  new StringBuffer ();
for (var i = 0; i < s.length; i++) {
var ch = s.charAt (i);
if ((ch).charCodeAt (0) == ('\r').charCodeAt (0) || (ch).charCodeAt (0) == ('\n').charCodeAt (0) || (ch).charCodeAt (0) == ('\f').charCodeAt (0) || (ch).charCodeAt (0) == ('\t').charCodeAt (0) || (ch).charCodeAt (0) == ('\\').charCodeAt (0) || (ch).charCodeAt (0) == ('\"').charCodeAt (0) || (ch).charCodeAt (0) == ('\'').charCodeAt (0)) {
buffer.append ('\\');
switch (ch) {
case '\r':
buffer.append ('r');
break;
case '\n':
buffer.append ('n');
break;
case '\f':
buffer.append ('f');
break;
case '\t':
buffer.append ('t');
break;
case '\\':
buffer.append ('\\');
break;
case '\'':
buffer.append ('\'');
break;
case '\"':
buffer.append ('\"');
break;
}
continue ;}buffer.append (ch);
}
return buffer.toString ();
}, "~S");
c$.wrapAsArgumentArray = Clazz.defineMethod (c$, "wrapAsArgumentArray", 
function (s, whitespace) {
var args = net.sf.j2s.ui.launching.ArgsUtil.splitArguments (s);
var buffer =  new StringBuffer ();
buffer.append ('[');
for (var i = 0; i < args.length; i++) {
buffer.append ('\"');
buffer.append (net.sf.j2s.ui.launching.ArgsUtil.outputString (args[i]));
buffer.append ('\"');
if (i != args.length - 1) {
buffer.append (",");
if (whitespace) {
buffer.append (" ");
}}}
buffer.append (']');
return buffer.toString ();
}, "~S,~B");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
System.out.println (args.length);
for (var i = 0; i < args.length; i++) {
System.out.println (args[i]);
}
}, "~A");
});
