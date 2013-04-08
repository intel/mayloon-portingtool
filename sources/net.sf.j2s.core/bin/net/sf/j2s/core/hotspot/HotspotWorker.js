Clazz.declarePackage ("net.sf.j2s.core.hotspot");
Clazz.load (null, "net.sf.j2s.core.hotspot.HotspotWorker", ["java.io.BufferedInputStream", "java.lang.Long", "$.StringBuffer", "java.util.Date", "net.sf.j2s.core.hotspot.InnerHotspotServer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buf = null;
this.s = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.hotspot, "HotspotWorker", null, Runnable);
Clazz.makeConstructor (c$, 
function () {
this.buf =  Clazz.newArray (2048, 0);
this.s = null;
});
Clazz.defineMethod (c$, "setSocket", 
function (s) {
this.s = s;
this.notify ();
}, "java.net.Socket");
Clazz.overrideMethod (c$, "run", 
function () {
while (true) {
if (this.s == null) {
try {
this.wait ();
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
continue ;} else {
throw e;
}
}
}try {
this.handleClient ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.s = null;
var pool = net.sf.j2s.core.hotspot.InnerHotspotServer.threads;
{
if (pool.size () >= 5) {
return ;
} else {
pool.addElement (this);
}}}
});
Clazz.defineMethod (c$, "handleClient", 
function () {
var is =  new java.io.BufferedInputStream (this.s.getInputStream ());
var ps =  new java.io.PrintStream (this.s.getOutputStream ());
this.s.setSoTimeout (5000);
this.s.setTcpNoDelay (true);
for (var i = 0; i < 2048; i++) {
this.buf[i] = 0;
}
try {
var nread = 0;
var r = 0;
outerloop : while (nread < 2048) {
r = is.read (this.buf, nread, 2048 - nread);
if (r == -1) {
return ;
}var i = nread;
nread += r;
for (; i < nread; i++) {
if (this.buf[i] == ('\n').charCodeAt (0) || this.buf[i] == ('\r').charCodeAt (0)) {
break outerloop;
}}
}
var doingGet;
var index;
if (this.buf[0] == ('G').charCodeAt (0) && this.buf[1] == ('E').charCodeAt (0) && this.buf[2] == ('T').charCodeAt (0) && this.buf[3] == (' ').charCodeAt (0)) {
doingGet = true;
index = 4;
} else if (this.buf[0] == ('H').charCodeAt (0) && this.buf[1] == ('E').charCodeAt (0) && this.buf[2] == ('A').charCodeAt (0) && this.buf[3] == ('D').charCodeAt (0) && this.buf[4] == (' ').charCodeAt (0)) {
doingGet = false;
index = 5;
} else {
ps.print ("HTTP/1.0 405 unsupported method type: ");
ps.write (this.buf, 0, 5);
ps.write (net.sf.j2s.core.hotspot.HotspotWorker.EOL);
ps.flush ();
this.s.close ();
return ;
}var i = 0;
for (i = index; i < nread; i++) {
if (this.buf[i] == (' ').charCodeAt (0)) {
break;
}}
var fname =  String.instantialize (this.buf, 0, index, i - index);
if (fname.startsWith ("/") || fname.startsWith ("\\")) {
fname = fname.substring (1);
}var idx = fname.indexOf ('.');
if (idx != -1) {
fname = fname.substring (0, idx);
}idx = fname.indexOf ('?');
if (idx != -1) {
fname = fname.substring (idx + 1);
}var sessionID = -1;
try {
sessionID = Long.parseLong (fname);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
ps.print ("HTTP/1.0 200 OK");
ps.write (net.sf.j2s.core.hotspot.HotspotWorker.EOL);
ps.print ("Server: Java2Script Hotspot Sever");
ps.write (net.sf.j2s.core.hotspot.HotspotWorker.EOL);
ps.print ("Date: " + ( new java.util.Date ()));
ps.write (net.sf.j2s.core.hotspot.HotspotWorker.EOL);
ps.print ("Last Modified: " + ( new java.util.Date ()));
ps.write (net.sf.j2s.core.hotspot.HotspotWorker.EOL);
ps.print ("Content-type: text/javascript");
ps.write (net.sf.j2s.core.hotspot.HotspotWorker.EOL);
ps.print ("Pragma: no-cache");
ps.write (net.sf.j2s.core.hotspot.HotspotWorker.EOL);
ps.print ("Cache-Control: no-cache");
ps.write (net.sf.j2s.core.hotspot.HotspotWorker.EOL);
if (doingGet) {
this.sendLatestHotspot (sessionID, ps);
}} finally {
this.s.close ();
}
});
Clazz.defineMethod (c$, "sendLatestHotspot", 
function (session, ps) {
ps.write (net.sf.j2s.core.hotspot.HotspotWorker.EOL);
var strBuf =  new StringBuffer ();
strBuf.append ("ClazzLoader.updateHotspot (");
var hotspotJS = net.sf.j2s.core.hotspot.InnerHotspotServer.getHotspotJavaScript (session);
if (hotspotJS.length != 0) {
strBuf.append ("\r\n");
strBuf.append (hotspotJS);
}strBuf.append ("null);");
ps.write (strBuf.toString ().getBytes ("utf-8"));
}, "~N,java.io.PrintStream");
Clazz.defineStatics (c$,
"BUF_SIZE", 2048,
"EOL", [('\r').charCodeAt (0), ('\n').charCodeAt (0)]);
});
