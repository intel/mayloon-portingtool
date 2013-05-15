Clazz.declarePackage ("java.net");
Clazz.load (["java.util.Hashtable"], "java.net.URLConnection", ["java.io.IOException", "java.lang.Character", "$.IllegalArgumentException", "$.IllegalStateException", "$.NullPointerException", "$.StringBuilder", "java.security.AllPermission", "java.util.Collections", "$.Date"], function () {
c$ = Clazz.decorateAsClass (function () {
this.url = null;
this.contentType = null;
this.lastModified = -1;
this.ifModifiedSince = 0;
this.useCaches = false;
this.connected = false;
this.doOutput = false;
this.doInput = true;
this.allowUserInteraction = false;
this.readTimeout = 0;
this.connectTimeout = 0;
Clazz.instantialize (this, arguments);
}, java.net, "URLConnection");
Clazz.prepareFields (c$, function () {
this.useCaches = java.net.URLConnection.defaultUseCaches;
this.allowUserInteraction = java.net.URLConnection.defaultAllowUserInteraction;
});
Clazz.makeConstructor (c$, 
function (url) {
this.url = url;
}, "java.net.URL");
Clazz.defineMethod (c$, "getAllowUserInteraction", 
function () {
return this.allowUserInteraction;
});
Clazz.defineMethod (c$, "getContent", 
function () {
if (!this.connected) {
this.connect ();
}return null;
});
Clazz.defineMethod (c$, "getContent", 
function (types) {
if (!this.connected) {
this.connect ();
}return null;
}, "~A");
Clazz.defineMethod (c$, "getContentEncoding", 
function () {
return this.getHeaderField ("Content-Encoding");
});
Clazz.defineMethod (c$, "getContentLength", 
function () {
return this.getHeaderFieldInt ("Content-Length", -1);
});
Clazz.defineMethod (c$, "getContentType", 
function () {
return this.getHeaderField ("Content-Type");
});
Clazz.defineMethod (c$, "getDate", 
function () {
return this.getHeaderFieldDate ("Date", 0);
});
c$.getDefaultAllowUserInteraction = Clazz.defineMethod (c$, "getDefaultAllowUserInteraction", 
function () {
return java.net.URLConnection.defaultAllowUserInteraction;
});
c$.getDefaultRequestProperty = Clazz.defineMethod (c$, "getDefaultRequestProperty", 
function (field) {
return null;
}, "~S");
Clazz.defineMethod (c$, "getDefaultUseCaches", 
function () {
return java.net.URLConnection.defaultUseCaches;
});
Clazz.defineMethod (c$, "getDoInput", 
function () {
return this.doInput;
});
Clazz.defineMethod (c$, "getDoOutput", 
function () {
return this.doOutput;
});
Clazz.defineMethod (c$, "getExpiration", 
function () {
return this.getHeaderFieldDate ("Expires", 0);
});
Clazz.defineMethod (c$, "getHeaderField", 
function (pos) {
return null;
}, "~N");
Clazz.defineMethod (c$, "getHeaderFields", 
function () {
return java.util.Collections.emptyMap ();
});
Clazz.defineMethod (c$, "getRequestProperties", 
function () {
this.checkNotConnected ();
return java.util.Collections.emptyMap ();
});
Clazz.defineMethod (c$, "checkNotConnected", 
($fz = function () {
if (this.connected) {
throw  new IllegalStateException ("Already connected");
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "addRequestProperty", 
function (field, newValue) {
this.checkNotConnected ();
if (field == null) {
throw  new NullPointerException ("field == null");
}}, "~S,~S");
Clazz.defineMethod (c$, "getHeaderField", 
function (key) {
return null;
}, "~S");
Clazz.defineMethod (c$, "getHeaderFieldDate", 
function (field, defaultValue) {
var date = this.getHeaderField (field);
if (date == null) {
return defaultValue;
}try {
return java.util.Date.parse (date);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
return defaultValue;
} else {
throw e;
}
}
}, "~S,~N");
Clazz.defineMethod (c$, "getHeaderFieldInt", 
function (field, defaultValue) {
try {
return Integer.parseInt (this.getHeaderField (field));
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
return defaultValue;
} else {
throw e;
}
}
}, "~S,~N");
Clazz.defineMethod (c$, "getHeaderFieldKey", 
function (posn) {
return null;
}, "~N");
Clazz.defineMethod (c$, "getIfModifiedSince", 
function () {
return this.ifModifiedSince;
});
Clazz.defineMethod (c$, "getInputStream", 
function () {
throw  new java.io.IOException ("Does not support writing to the input stream");
});
Clazz.defineMethod (c$, "getLastModified", 
function () {
if (this.lastModified != -1) {
return this.lastModified;
}return this.lastModified = this.getHeaderFieldDate ("Last-Modified", 0);
});
Clazz.defineMethod (c$, "getOutputStream", 
function () {
throw  new java.io.IOException ("Does not support writing to the output stream");
});
Clazz.defineMethod (c$, "getPermission", 
function () {
return  new java.security.AllPermission ();
});
Clazz.defineMethod (c$, "getRequestProperty", 
function (field) {
this.checkNotConnected ();
return null;
}, "~S");
Clazz.defineMethod (c$, "getURL", 
function () {
return this.url;
});
Clazz.defineMethod (c$, "getUseCaches", 
function () {
return this.useCaches;
});
c$.guessContentTypeFromStream = Clazz.defineMethod (c$, "guessContentTypeFromStream", 
function (is) {
if (!is.markSupported ()) {
return null;
}is.mark (64);
var bytes =  Clazz.newArray (64, 0);
var length = is.read (bytes);
is.reset ();
if (length == -1) {
return null;
}var encoding = "US-ASCII";
var start = 0;
if (length > 1) {
if ((bytes[0] == 0xFF) && (bytes[1] == 0xFE)) {
encoding = "UTF-16LE";
start = 2;
length -= length & 1;
}if ((bytes[0] == 0xFE) && (bytes[1] == 0xFF)) {
encoding = "UTF-16BE";
start = 2;
length -= length & 1;
}if (length > 2) {
if ((bytes[0] == 0xEF) && (bytes[1] == 0xBB) && (bytes[2] == 0xBF)) {
encoding = "UTF-8";
start = 3;
}if (length > 3) {
if ((bytes[0] == 0x00) && (bytes[1] == 0x00) && (bytes[2] == 0xFE) && (bytes[3] == 0xFF)) {
encoding = "UTF-32BE";
start = 4;
length -= length & 3;
}if ((bytes[0] == 0xFF) && (bytes[1] == 0xFE) && (bytes[2] == 0x00) && (bytes[3] == 0x00)) {
encoding = "UTF-32LE";
start = 4;
length -= length & 3;
}}}}var header =  String.instantialize (bytes, start, length - start, encoding);
if (header.startsWith ("PK")) {
return "application/zip";
}if (header.startsWith ("GI")) {
return "image/gif";
}var textHeader = header.trim ().toUpperCase ();
if (textHeader.startsWith ("<!DOCTYPE HTML") || textHeader.startsWith ("<HTML") || textHeader.startsWith ("<HEAD") || textHeader.startsWith ("<BODY") || textHeader.startsWith ("<HEAD")) {
return "text/html";
}if (textHeader.startsWith ("<?XML")) {
return "application/xml";
}return null;
}, "java.io.InputStream");
Clazz.defineMethod (c$, "setAllowUserInteraction", 
function (newValue) {
this.checkNotConnected ();
this.allowUserInteraction = newValue;
}, "~B");
c$.setDefaultAllowUserInteraction = Clazz.defineMethod (c$, "setDefaultAllowUserInteraction", 
function (allows) {
($t$ = java.net.URLConnection.defaultAllowUserInteraction = allows, java.net.URLConnection.prototype.defaultAllowUserInteraction = java.net.URLConnection.defaultAllowUserInteraction, $t$);
}, "~B");
c$.setDefaultRequestProperty = Clazz.defineMethod (c$, "setDefaultRequestProperty", 
function (field, value) {
}, "~S,~S");
Clazz.defineMethod (c$, "setDefaultUseCaches", 
function (newValue) {
($t$ = java.net.URLConnection.defaultUseCaches = newValue, java.net.URLConnection.prototype.defaultUseCaches = java.net.URLConnection.defaultUseCaches, $t$);
}, "~B");
Clazz.defineMethod (c$, "setDoInput", 
function (newValue) {
this.checkNotConnected ();
this.doInput = newValue;
}, "~B");
Clazz.defineMethod (c$, "setDoOutput", 
function (newValue) {
this.checkNotConnected ();
this.doOutput = newValue;
}, "~B");
Clazz.defineMethod (c$, "setIfModifiedSince", 
function (newValue) {
this.checkNotConnected ();
this.ifModifiedSince = newValue;
}, "~N");
Clazz.defineMethod (c$, "setRequestProperty", 
function (field, newValue) {
this.checkNotConnected ();
if (field == null) {
throw  new NullPointerException ("field == null");
}}, "~S,~S");
Clazz.defineMethod (c$, "setUseCaches", 
function (newValue) {
this.checkNotConnected ();
this.useCaches = newValue;
}, "~B");
Clazz.defineMethod (c$, "setConnectTimeout", 
function (timeout) {
if (timeout < 0) {
throw  new IllegalArgumentException ("timeout < 0");
}this.connectTimeout = timeout;
}, "~N");
Clazz.defineMethod (c$, "getConnectTimeout", 
function () {
return this.connectTimeout;
});
Clazz.defineMethod (c$, "setReadTimeout", 
function (timeout) {
if (timeout < 0) {
throw  new IllegalArgumentException ("timeout < 0");
}this.readTimeout = timeout;
}, "~N");
Clazz.defineMethod (c$, "getReadTimeout", 
function () {
return this.readTimeout;
});
Clazz.defineMethod (c$, "toString", 
function () {
return this.getClass ().getName () + ":" + this.url.toString ();
});
Clazz.defineStatics (c$,
"defaultAllowUserInteraction", false,
"defaultUseCaches", true);
c$.contentHandlers = c$.prototype.contentHandlers =  new java.util.Hashtable ();
});
