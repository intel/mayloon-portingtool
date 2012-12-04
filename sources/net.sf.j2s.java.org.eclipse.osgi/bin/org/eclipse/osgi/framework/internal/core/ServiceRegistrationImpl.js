Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.util.Headers", "org.osgi.framework.ServiceRegistration"], "org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl", ["java.lang.IllegalStateException", "$.Long", "$.StringBuffer", "java.lang.reflect.Array", "java.util.ArrayList", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.Msg", "$.ServiceReferenceImpl", "$.ServiceUse"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reference = null;
this.framework = null;
this.context = null;
this.bundle = null;
this.contextsUsing = null;
this.clazzes = null;
this.service = null;
this.properties = null;
this.serviceid = 0;
this.serviceranking = 0;
this.registrationLock = null;
this.state = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ServiceRegistrationImpl", null, org.osgi.framework.ServiceRegistration);
Clazz.prepareFields (c$, function () {
this.registrationLock =  new JavaObject ();
});
Clazz.makeConstructor (c$, 
function (context, clazzes, service, properties) {
this.context = context;
this.bundle = context.bundle;
this.framework = context.framework;
this.clazzes = clazzes;
this.service = service;
this.contextsUsing = null;
this.reference =  new org.eclipse.osgi.framework.internal.core.ServiceReferenceImpl (this);
{
this.serviceid = this.framework.getNextServiceId ();
this.properties = this.createProperties (properties);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("registerService[" + this.bundle + "](" + this + ")");
}this.framework.serviceRegistry.publishService (context, this);
}this.framework.publishServiceEvent (1, this.reference);
}, "org.eclipse.osgi.framework.internal.core.BundleContextImpl,~A,~O,java.util.Dictionary");
Clazz.overrideMethod (c$, "unregister", 
function () {
{
if (this.state != 0) {
throw  new IllegalStateException (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_ALREADY_UNREGISTERED_EXCEPTION);
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("unregisterService[" + this.bundle + "](" + this + ")");
}{
this.framework.serviceRegistry.unpublishService (this.context, this);
}this.state = 1;
}this.framework.publishServiceEvent (4, this.reference);
this.service = null;
this.state = 2;
var size = 0;
var users = null;
{
if (this.contextsUsing != null) {
size = this.contextsUsing.size ();
if (size > 0) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("unregisterService: releasing users");
}users = this.contextsUsing.toArray ( new Array (size));
}}}for (var i = 0; i < size; i++) {
this.releaseService (users[i]);
}
this.contextsUsing = null;
this.reference = null;
this.context = null;
});
Clazz.overrideMethod (c$, "getReference", 
function () {
if (this.reference == null) {
throw  new IllegalStateException (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_ALREADY_UNREGISTERED_EXCEPTION);
}return (this.reference);
});
Clazz.overrideMethod (c$, "setProperties", 
function (props) {
{
if (this.state != 0) {
throw  new IllegalStateException (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_ALREADY_UNREGISTERED_EXCEPTION);
}this.properties = this.createProperties (props);
}this.framework.publishServiceEvent (2, this.reference);
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "createProperties", 
function (props) {
var properties =  new org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl.Properties (props);
properties.setProperty ("objectClass", null);
properties.setProperty ("objectClass", this.clazzes);
properties.setProperty ("service.id", null);
properties.setProperty ("service.id",  new Long (this.serviceid));
var ranking = properties.getProperty ("service.ranking");
this.serviceranking = (Clazz.instanceOf (ranking, Integer)) ? (ranking).intValue () : 0;
return (properties);
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "getProperty", 
function (key) {
{
return (this.properties.getProperty (key));
}}, "~S");
Clazz.defineMethod (c$, "getPropertyKeys", 
function () {
{
return (this.properties.getPropertyKeys ());
}});
Clazz.defineMethod (c$, "getBundle", 
function () {
if (this.reference == null) {
return (null);
}return (this.bundle);
});
Clazz.defineMethod (c$, "getService", 
function (user) {
{
if (this.state == 2) {
return (null);
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("getService[" + user.bundle + "](" + this + ")");
}var servicesInUse = user.servicesInUse;
var use = servicesInUse.get (this.reference);
if (use == null) {
use =  new org.eclipse.osgi.framework.internal.core.ServiceUse (user, this);
var service = use.getService ();
if (service != null) {
servicesInUse.put (this.reference, use);
if (this.contextsUsing == null) {
this.contextsUsing =  new java.util.ArrayList (10);
}this.contextsUsing.add (user);
}return (service);
} else {
return (use.getService ());
}}}, "org.eclipse.osgi.framework.internal.core.BundleContextImpl");
Clazz.defineMethod (c$, "ungetService", 
function (user) {
{
if (this.state == 2) {
return (false);
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
var bundle = (user.bundle == null) ? "" : user.bundle.toString ();
org.eclipse.osgi.framework.debug.Debug.println ("ungetService[" + bundle + "](" + this + ")");
}var servicesInUse = user.servicesInUse;
if (servicesInUse != null) {
var use = servicesInUse.get (this.reference);
if (use != null) {
if (use.ungetService ()) {
servicesInUse.remove (this.reference);
this.contextsUsing.remove (user);
}return (true);
}}return (false);
}}, "org.eclipse.osgi.framework.internal.core.BundleContextImpl");
Clazz.defineMethod (c$, "releaseService", 
function (user) {
{
if (this.reference == null) {
return ;
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
var bundle = (user.bundle == null) ? "" : user.bundle.toString ();
org.eclipse.osgi.framework.debug.Debug.println ("releaseService[" + bundle + "](" + this + ")");
}var servicesInUse = user.servicesInUse;
if (servicesInUse != null) {
var use = servicesInUse.remove (this.reference);
if (use != null) {
use.releaseService ();
this.contextsUsing.remove (user);
}}}}, "org.eclipse.osgi.framework.internal.core.BundleContextImpl");
Clazz.defineMethod (c$, "getUsingBundles", 
function () {
{
if (this.state == 2) return (null);
if (this.contextsUsing == null) return (null);
var size = this.contextsUsing.size ();
if (size == 0) return (null);
var bundles =  new Array (size);
for (var i = 0; i < size; i++) bundles[i] = (this.contextsUsing.get (i)).bundle;

return (bundles);
}});
Clazz.overrideMethod (c$, "toString", 
function () {
var clazzes = this.clazzes;
var size = clazzes.length;
var sb =  new StringBuffer (50 * size);
sb.append ('{');
for (var i = 0; i < size; i++) {
if (i > 0) {
sb.append (", ");
}sb.append (clazzes[i]);
}
sb.append ("}=");
sb.append (this.properties);
return (sb.toString ());
});
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl, "Properties", org.eclipse.osgi.framework.util.Headers);
Clazz.makeConstructor (c$, 
($fz = function (size, props) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl.Properties, [(size << 1) + 1]);
if (props != null) {
{
var keysEnum = props.keys ();
while (keysEnum.hasMoreElements ()) {
var key = keysEnum.nextElement ();
if (Clazz.instanceOf (key, String)) {
var header = key;
this.setProperty (header, props.get (header));
}}
}}}, $fz.isPrivate = true, $fz), "~N,java.util.Dictionary");
Clazz.makeConstructor (c$, 
function (props) {
this.construct ((props == null) ? 2 : Math.max (2, props.size ()), props);
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "getProperty", 
function (key) {
return (org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl.Properties.cloneValue (this.get (key)));
}, "~S");
Clazz.defineMethod (c$, "getPropertyKeys", 
function () {
var size = this.size ();
var keynames =  new Array (size);
var keysEnum = this.keys ();
for (var i = 0; i < size; i++) {
keynames[i] = keysEnum.nextElement ();
}
return (keynames);
});
Clazz.defineMethod (c$, "setProperty", 
function (key, value) {
return (this.set (key, org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl.Properties.cloneValue (value)));
}, "~S,~O");
c$.cloneValue = Clazz.defineMethod (c$, "cloneValue", 
function (value) {
if (value == null) return null;
if (Clazz.instanceOf (value, String)) return (value);
var clazz = value.getClass ();
if (clazz.isArray ()) {
var type = clazz.getComponentType ();
var len = java.lang.reflect.Array.getLength (value);
var clonedArray = java.lang.reflect.Array.newInstance (type, len);
System.arraycopy (value, 0, clonedArray, 0, len);
return clonedArray;
}try {
return (clazz.getMethod ("clone", [null]).invoke (value, [null]));
} catch (e$$) {
if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, Error)) {
var e = e$$;
{
if (Clazz.instanceOf (value, java.util.Vector)) return ((value).clone ());
if (Clazz.instanceOf (value, java.util.Hashtable)) return ((value).clone ());
}
} else {
throw e$$;
}
}
return (value);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
var keys = this.getPropertyKeys ();
var size = keys.length;
var sb =  new StringBuffer (20 * size);
sb.append ('{');
var n = 0;
for (var i = 0; i < size; i++) {
var key = keys[i];
if (!key.equals ("objectClass")) {
if (n > 0) {
sb.append (", ");
}sb.append (key);
sb.append ('=');
sb.append (this.get (key));
n++;
}}
sb.append ('}');
return (sb.toString ());
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"REGISTERED", 0x00,
"UNREGISTERING", 0x01,
"UNREGISTERED", 0x02);
});
