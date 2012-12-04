Clazz.declarePackage ("org.eclipse.osgi.framework.eventmgr");
Clazz.load (["java.lang.Thread"], "org.eclipse.osgi.framework.eventmgr.EventManager", ["java.lang.IllegalStateException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.thread = null;
this.threadName = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.eventmgr, "EventManager");
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (threadName) {
this.thread = null;
this.threadName = threadName;
}, "~S");
Clazz.defineMethod (c$, "close", 
function () {
if (this.thread != null) {
this.thread.close ();
this.thread = null;
}});
Clazz.defineMethod (c$, "getEventThread", 
function () {
if (this.thread == null) {
if (this.threadName == null) {
this.thread =  new org.eclipse.osgi.framework.eventmgr.EventManager.EventThread ();
} else {
this.thread =  new org.eclipse.osgi.framework.eventmgr.EventManager.EventThread (this.threadName);
}this.thread.start ();
}return this.thread;
});
c$.dispatchEvent = Clazz.defineMethod (c$, "dispatchEvent", 
function (listeners, dispatcher, eventAction, eventObject) {
var size = listeners.length;
for (var i = 0; i < size; i++) {
var listener = listeners[i];
if (listener == null) {
break;
}try {
dispatcher.dispatchEvent (listener.primary, listener.companion, eventAction, eventObject);
} catch (t) {
if (false) {
System.out.println ("Exception in " + listener.primary);
t.printStackTrace ();
}}
}
}, "~A,org.eclipse.osgi.framework.eventmgr.EventDispatcher,~N,~O");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.head = null;
this.tail = null;
this.running = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.eventmgr.EventManager, "EventThread", Thread);
Clazz.makeConstructor (c$, 
function (threadName) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.eventmgr.EventManager.EventThread, [threadName]);
this.init ();
}, "~S");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.osgi.framework.eventmgr.EventManager.EventThread);
this.init ();
});
Clazz.defineMethod (c$, "init", 
($fz = function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
this.running = true;
this.head = null;
this.tail = null;
this.setDaemon (true);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "close", 
function () {
this.running = false;
this.interrupt ();
});
Clazz.overrideMethod (c$, "run", 
function () {
try {
while (true) {
var item = this.getNextEvent ();
if (item == null) {
return ;
}org.eclipse.osgi.framework.eventmgr.EventManager.dispatchEvent (item.listeners, item.dispatcher, item.action, item.object);
}
} catch (e$$) {
if (Clazz.instanceOf (e$$, RuntimeException)) {
var e = e$$;
{
if (false) {
e.printStackTrace ();
}throw e;
}
} else if (Clazz.instanceOf (e$$, Error)) {
var e = e$$;
{
if (false) {
e.printStackTrace ();
}throw e;
}
} else {
throw e$$;
}
}
});
Clazz.defineMethod (c$, "postEvent", 
function (l, d, a, o) {
if (!this.isAlive ()) {
throw  new IllegalStateException ();
}var item =  new org.eclipse.osgi.framework.eventmgr.EventManager.EventThread.Queued (l, d, a, o);
if (this.head == null) {
this.head = item;
this.tail = item;
} else {
this.tail.next = item;
this.tail = item;
}this.notify ();
}, "~A,org.eclipse.osgi.framework.eventmgr.EventDispatcher,~N,~O");
Clazz.defineMethod (c$, "getNextEvent", 
($fz = function () {
while (this.running && (this.head == null)) {
try {
this.wait ();
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
if (!this.running) {
return null;
}var item = this.head;
this.head = item.next;
if (this.head == null) {
this.tail = null;
}return item;
}, $fz.isPrivate = true, $fz));
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
this.dispatcher = null;
this.action = 0;
this.object = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.eventmgr.EventManager.EventThread, "Queued");
Clazz.makeConstructor (c$, 
function (l, d, a, o) {
this.listeners = l;
this.dispatcher = d;
this.action = a;
this.object = o;
this.next = null;
}, "~A,org.eclipse.osgi.framework.eventmgr.EventDispatcher,~N,~O");
c$ = Clazz.p0p ();
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"DEBUG", false);
});
