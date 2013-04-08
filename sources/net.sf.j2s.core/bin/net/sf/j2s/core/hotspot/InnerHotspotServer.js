Clazz.declarePackage ("net.sf.j2s.core.hotspot");
Clazz.load (["java.util.Vector"], "net.sf.j2s.core.hotspot.InnerHotspotServer", ["java.lang.Exception", "$.StringBuffer", "$.Thread", "java.net.ServerSocket", "java.util.ArrayList", "$.Date", "net.sf.j2s.core.hotspot.HotspotWorker", "$.Java2ScriptCompiledItem"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ss = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core.hotspot, "InnerHotspotServer");
Clazz.makeConstructor (c$, 
($fz = function () {
}, $fz.isPrivate = true, $fz));
c$.getSingletonServer = Clazz.defineMethod (c$, "getSingletonServer", 
function () {
if (net.sf.j2s.core.hotspot.InnerHotspotServer.server == null) {
($t$ = net.sf.j2s.core.hotspot.InnerHotspotServer.server =  new net.sf.j2s.core.hotspot.InnerHotspotServer (), net.sf.j2s.core.hotspot.InnerHotspotServer.prototype.server = net.sf.j2s.core.hotspot.InnerHotspotServer.server, $t$);
}return net.sf.j2s.core.hotspot.InnerHotspotServer.server;
});
c$.isServerStarted = Clazz.defineMethod (c$, "isServerStarted", 
function () {
return net.sf.j2s.core.hotspot.InnerHotspotServer.serverStarted;
});
c$.getHotspotPort = Clazz.defineMethod (c$, "getHotspotPort", 
function () {
if (net.sf.j2s.core.hotspot.InnerHotspotServer.port == -1) {
return net.sf.j2s.core.hotspot.InnerHotspotServer.getSingletonServer ().startServer ();
}return net.sf.j2s.core.hotspot.InnerHotspotServer.port;
});
c$.addCompiledItem = Clazz.defineMethod (c$, "addCompiledItem", 
function (name) {
if (!net.sf.j2s.core.hotspot.InnerHotspotServer.serverStarted) return ;
var item =  new net.sf.j2s.core.hotspot.Java2ScriptCompiledItem ( new java.util.Date ().getTime (), net.sf.j2s.core.hotspot.InnerHotspotServer.latestSessionID, name);
($t$ = net.sf.j2s.core.hotspot.InnerHotspotServer.latestSessionID ++, net.sf.j2s.core.hotspot.InnerHotspotServer.prototype.latestSessionID = net.sf.j2s.core.hotspot.InnerHotspotServer.latestSessionID, $t$);
{
var toRemoveList =  new java.util.ArrayList ();
var now =  new java.util.Date ().getTime ();
for (var iterator = net.sf.j2s.core.hotspot.InnerHotspotServer.hotspotItems.iterator (); iterator.hasNext (); ) {
var i = iterator.next ();
if (i.getTime () < now - 10000) {
toRemoveList.add (i);
}}
if (toRemoveList.size () > 0) {
net.sf.j2s.core.hotspot.InnerHotspotServer.hotspotItems.removeAll (toRemoveList);
}net.sf.j2s.core.hotspot.InnerHotspotServer.hotspotItems.add (item);
}}, "~S");
c$.getHotspotJavaScript = Clazz.defineMethod (c$, "getHotspotJavaScript", 
function (session) {
var buf =  new StringBuffer ();
var now =  new java.util.Date ().getTime ();
{
for (var iterator = net.sf.j2s.core.hotspot.InnerHotspotServer.hotspotItems.iterator (); iterator.hasNext (); ) {
var item = iterator.next ();
if ((session > 0 && item.getId () > session) || (session <= 0 && item.getTime () >= now - 10000)) {
buf.append (item.getTime ());
buf.append (", ");
buf.append (item.getId ());
buf.append (", \"");
buf.append (item.getName ());
buf.append ("\",\r\n");
}}
}return buf.toString ();
}, "~N");
Clazz.defineMethod (c$, "startServer", 
function () {
if (!net.sf.j2s.core.hotspot.InnerHotspotServer.serverStarted) {
($t$ = net.sf.j2s.core.hotspot.InnerHotspotServer.serverStarted = true, net.sf.j2s.core.hotspot.InnerHotspotServer.prototype.serverStarted = net.sf.j2s.core.hotspot.InnerHotspotServer.serverStarted, $t$);
try {
($t$ = net.sf.j2s.core.hotspot.InnerHotspotServer.port = this.tryToGetAPort (), net.sf.j2s.core.hotspot.InnerHotspotServer.prototype.port = net.sf.j2s.core.hotspot.InnerHotspotServer.port, $t$);
} catch (e1) {
if (Clazz.instanceOf (e1, Exception)) {
e1.printStackTrace ();
return -1;
} else {
throw e1;
}
}
System.out.println ("Listening on port " + net.sf.j2s.core.hotspot.InnerHotspotServer.port + " ...");
 new Thread (((Clazz.isClassDefined ("net.sf.j2s.core.hotspot.InnerHotspotServer$1") ? 0 : net.sf.j2s.core.hotspot.InnerHotspotServer.$InnerHotspotServer$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.core.hotspot.InnerHotspotServer$1, this, null))).start ();
return net.sf.j2s.core.hotspot.InnerHotspotServer.port;
}return 0;
});
Clazz.defineMethod (c$, "stopServer", 
function () {
try {
this.ss.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.ss = null;
{
net.sf.j2s.core.hotspot.InnerHotspotServer.threads.clear ();
}($t$ = net.sf.j2s.core.hotspot.InnerHotspotServer.serverStarted = false, net.sf.j2s.core.hotspot.InnerHotspotServer.prototype.serverStarted = net.sf.j2s.core.hotspot.InnerHotspotServer.serverStarted, $t$);
{
net.sf.j2s.core.hotspot.InnerHotspotServer.hotspotItems.clear ();
}});
Clazz.defineMethod (c$, "serverLoop", 
($fz = function () {
net.sf.j2s.core.hotspot.InnerHotspotServer.threads.clear ();
for (var i = 0; i < 5; ++i) {
var w =  new net.sf.j2s.core.hotspot.HotspotWorker ();
( new Thread (w, "worker #" + i)).start ();
net.sf.j2s.core.hotspot.InnerHotspotServer.threads.addElement (w);
}
while (this.ss != null) {
var s = null;
try {
s = this.ss.accept ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (s == null) continue ;var w = null;
{
if (net.sf.j2s.core.hotspot.InnerHotspotServer.threads.isEmpty ()) {
var ws =  new net.sf.j2s.core.hotspot.HotspotWorker ();
ws.setSocket (s);
( new Thread (ws, "additional worker")).start ();
} else {
w = net.sf.j2s.core.hotspot.InnerHotspotServer.threads.elementAt (0);
net.sf.j2s.core.hotspot.InnerHotspotServer.threads.removeElementAt (0);
w.setSocket (s);
}}}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "tryToGetAPort", 
($fz = function () {
var port = 1725;
var maxTryTimes = 200;
var failedPortList =  new java.util.ArrayList ();
this.ss = null;
var triedTimes = 0;
while (triedTimes < maxTryTimes) {
triedTimes++;
try {
this.ss =  new java.net.ServerSocket (port);
break;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
while (true) {
port = 1024 + Math.round (Math.random () * (64511));
var integerPort =  new Integer (port);
if (!failedPortList.contains (integerPort)) {
break;
}}
} else {
throw e;
}
}
}
if (triedTimes >= maxTryTimes) {
throw  new Exception ("Failed to setup inner Java2Script hotspot HTTP Server!");
}return port;
}, $fz.isPrivate = true, $fz));
c$.$InnerHotspotServer$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.core.hotspot, "InnerHotspotServer$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
try {
this.b$["net.sf.j2s.core.hotspot.InnerHotspotServer"].serverLoop ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
c$ = Clazz.p0p ();
};
c$.threads = c$.prototype.threads =  new java.util.Vector ();
c$.hotspotItems = c$.prototype.hotspotItems =  new java.util.Vector ();
Clazz.defineStatics (c$,
"latestSessionID", 1,
"serverStarted", false,
"port", -1,
"server", null);
});
