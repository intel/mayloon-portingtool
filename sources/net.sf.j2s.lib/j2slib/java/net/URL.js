Clazz.declarePackage ("java.net");
Clazz.load (null, "java.net.URL", ["java.io.IOException", "java.lang.NullPointerException", "java.net.HttpURLConnection", "$.MalformedURLException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$hashCode = 0;
this.spec = null;
this.file = null;
this.protocol = null;
this.host = null;
this.port = -1;
this.authority = null;
this.userInfo = null;
this.path = null;
this.query = null;
this.ref = null;
Clazz.instantialize (this, arguments);
}, java.net, "URL", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function (spec) {
this.construct (Clazz.castNullAs ("java.net.URL"), spec);
}, "~S");
Clazz.makeConstructor (c$, 
function (context, spec) {
if (spec == null) {
throw  new java.net.MalformedURLException ();
}spec = spec.trim ();
this.spec = spec;
var index;
try {
index = spec.indexOf (':');
} catch (e) {
if (Clazz.instanceOf (e, NullPointerException)) {
throw  new java.net.MalformedURLException (e.toString ());
} else {
throw e;
}
}
var startIPv6Addr = spec.indexOf ('[');
if (index >= 0) {
if ((startIPv6Addr == -1) || (index < startIPv6Addr)) {
this.protocol = spec.substring (0, index);
var c = this.protocol.charAt (0);
var valid = (('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt (0)) || (('A').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('Z').charCodeAt (0));
for (var i = 1; valid && (i < this.protocol.length); i++) {
c = this.protocol.charAt (i);
valid = (('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt (0)) || (('A').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('Z').charCodeAt (0)) || (('0').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('9').charCodeAt (0)) || ((c).charCodeAt (0) == ('+').charCodeAt (0)) || ((c).charCodeAt (0) == ('-').charCodeAt (0)) || ((c).charCodeAt (0) == ('.').charCodeAt (0));
}
if (!valid) {
this.protocol = null;
index = -1;
} else {
this.protocol = this.protocol.toLowerCase ();
}}}if (this.protocol != null) {
if (context != null && this.protocol.equals (context.getProtocol ())) {
var cPath = context.getPath ();
if (cPath != null && cPath.startsWith ("/")) {
this.set (this.protocol, context.getHost (), context.getPort (), context.getAuthority (), context.getUserInfo (), cPath, context.getQuery (), null);
}}} else {
if (context == null) {
throw  new java.net.MalformedURLException ("Protocol not found: " + spec);
}this.set (context.getProtocol (), context.getHost (), context.getPort (), context.getAuthority (), context.getUserInfo (), context.getPath (), context.getQuery (), null);
}if (this.port < -1) {
throw  new java.net.MalformedURLException ("Port out of range: " + this.port);
}}, "java.net.URL,~S");
Clazz.makeConstructor (c$, 
function (protocol, host, port, file) {
if (port < -1) {
throw  new java.io.IOException ("Port out of range: " + port);
}if (host != null && host.indexOf (":") != -1 && (host.charAt (0)).charCodeAt (0) != ('[').charCodeAt (0)) {
host = "[" + host + "]";
}if (protocol == null) {
throw  new NullPointerException ("Unknown protocol: null");
}this.protocol = protocol;
this.host = host;
this.port = port;
var index = -1;
index = file.indexOf ("#", file.lastIndexOf ("/"));
if (index >= 0) {
this.file = file.substring (0, index);
this.ref = file.substring (index + 1);
} else {
this.file = file;
}this.fixURL (false);
}, "~S,~S,~N,~S");
Clazz.defineMethod (c$, "fixURL", 
function (fixHost) {
var index;
if (this.host != null && this.host.length > 0) {
this.authority = this.host;
if (this.port != -1) {
this.authority = this.authority + ":" + this.port;
}}if (fixHost) {
if (this.host != null && (index = this.host.lastIndexOf ('@')) > -1) {
this.userInfo = this.host.substring (0, index);
this.host = this.host.substring (index + 1);
} else {
this.userInfo = null;
}}if (this.file != null && (index = this.file.indexOf ('?')) > -1) {
this.query = this.file.substring (index + 1);
this.path = this.file.substring (0, index);
} else {
this.query = null;
this.path = this.file;
}}, "~B");
Clazz.defineMethod (c$, "set", 
function (protocol, host, port, file, ref) {
if (this.protocol == null) {
this.protocol = protocol;
}this.host = host;
this.file = file;
this.port = port;
this.ref = ref;
this.$hashCode = 0;
this.fixURL (true);
}, "~S,~S,~N,~S,~S");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (o == null) {
return false;
}if (this === o) {
return true;
}if (this.getClass () !== o.getClass ()) {
return false;
}return false;
}, "~O");
Clazz.defineMethod (c$, "getContent", 
function () {
return this.openConnection ().getContent ();
});
Clazz.defineMethod (c$, "getContent", 
function (types) {
return this.openConnection ().getContent (types);
}, "~A");
Clazz.defineMethod (c$, "openStream", 
function () {
return this.openConnection ().getInputStream ();
});
Clazz.defineMethod (c$, "openConnection", 
function () {
return  new java.net.HttpURLConnection (this);
});
Clazz.defineMethod (c$, "getFile", 
function () {
return this.file;
});
Clazz.defineMethod (c$, "getHost", 
function () {
return this.host;
});
Clazz.defineMethod (c$, "getPort", 
function () {
return this.port;
});
Clazz.defineMethod (c$, "getProtocol", 
function () {
return this.protocol;
});
Clazz.defineMethod (c$, "getRef", 
function () {
return this.ref;
});
Clazz.defineMethod (c$, "getQuery", 
function () {
return this.query;
});
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getUserInfo", 
function () {
return this.userInfo;
});
Clazz.defineMethod (c$, "getSpec", 
function () {
return this.spec;
});
Clazz.defineMethod (c$, "toExternalForm", 
function () {
return this.spec;
});
Clazz.defineMethod (c$, "getAuthority", 
function () {
return this.authority;
});
Clazz.defineMethod (c$, "set", 
function (protocol, host, port, authority, userInfo, path, query, ref) {
var filePart = path;
if (query != null && !query.isEmpty ()) {
if (filePart != null) {
filePart = filePart + "?" + query;
} else {
filePart = "?" + query;
}}this.set (protocol, host, port, filePart, ref);
this.authority = authority;
this.userInfo = userInfo;
this.path = path;
this.query = query;
}, "~S,~S,~N,~S,~S,~S,~S,~S");
Clazz.defineMethod (c$, "getDefaultPort", 
function () {
if (this.protocol.equals ("http")) return 80;
return -1;
});
});
