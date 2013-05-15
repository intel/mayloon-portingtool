Clazz.declarePackage ("java.net");
Clazz.load (["java.util.HashMap"], "java.net.HttpRequest", ["java.io.ByteArrayInputStream", "$.ByteArrayOutputStream", "$.DataOutputStream", "java.lang.Boolean", "$.StringBuffer", "$.Thread", "java.net.URL", "java.util.regex.Pattern", "javax.xml.parsers.DocumentBuilderFactory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.status = 0;
this.statusText = null;
this.readyState = 0;
this.responseText = null;
this.responseXML = null;
this.onreadystatechange = null;
this.receiving = null;
this.asynchronous = false;
this.connection = null;
this.url = null;
this.method = null;
this.user = null;
this.password = null;
this.headers = null;
this.content = null;
this.toAbort = false;
this.isDisconnected = false;
this.activeOS = null;
this.activeIS = null;
this.isCometConnection = false;
Clazz.instantialize (this, arguments);
}, java.net, "HttpRequest");
Clazz.prepareFields (c$, function () {
this.headers =  new java.util.HashMap ();
});
Clazz.defineMethod (c$, "getReadyState", 
function () {
return this.readyState;
});
Clazz.defineMethod (c$, "getResponseText", 
function () {
return this.responseText;
});
Clazz.defineMethod (c$, "getResponseXML", 
function () {
if (this.responseXML != null) {
return this.responseXML;
}var type = this.connection.getHeaderField ("Content-Type");
if (type != null && (type.indexOf ("/xml") != -1 || type.indexOf ("+xml") != -1)) {
if (this.responseText != null && this.responseText.length != 0) {
var dbf = javax.xml.parsers.DocumentBuilderFactory.newInstance ();
dbf.setNamespaceAware (true);
dbf.setAttribute ("http://xml.org/sax/features/namespaces", Boolean.TRUE);
try {
var db = dbf.newDocumentBuilder ();
var biStream =  new java.io.ByteArrayInputStream (this.responseText.getBytes ());
this.responseXML = db.parse (biStream);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
}return this.responseXML;
} else {
return null;
}});
Clazz.defineMethod (c$, "getStatus", 
function () {
return this.status;
});
Clazz.defineMethod (c$, "getStatusText", 
function () {
return this.statusText;
});
Clazz.defineMethod (c$, "registerOnReadyStateChange", 
function (onreadystatechange) {
this.onreadystatechange = onreadystatechange;
}, "java.net.IXHRCallback");
Clazz.defineMethod (c$, "initializeReceivingMonitor", 
function () {
return null;
});
Clazz.defineMethod (c$, "setRequestHeader", 
function (key, value) {
this.headers.put (key, value);
}, "~S,~S");
Clazz.defineMethod (c$, "getAllResponseHeaders", 
function () {
var buffer =  new StringBuffer ();
var i = 1;
while (true) {
var key = this.connection.getHeaderFieldKey (i);
if (key != null) {
var value = this.connection.getHeaderField (i);
buffer.append (key);
buffer.append (": ");
buffer.append (value);
buffer.append ("\r\n");
} else {
break;
}i++;
}
buffer.append ("\r\n");
return buffer.toString ();
});
Clazz.defineMethod (c$, "getResponseHeader", 
function (key) {
var headerFields = this.connection.getHeaderFields ();
var list = headerFields.get (key);
if (list == null) {
return null;
}if (list.size () == 0) {
return "";
}var headerValue = null;
for (var itr = list.iterator (); itr.hasNext (); ) {
var value = itr.next ();
if (value != null) {
if (headerValue == null) {
headerValue = value;
} else {
headerValue = value + "\r\n" + headerValue;
}}}
return headerValue;
}, "~S");
Clazz.defineMethod (c$, "open", 
function (method, url) {
this.open (method, url, false, null, null);
}, "~S,~S");
Clazz.defineMethod (c$, "open", 
function (method, url, async) {
this.open (method, url, async, null, null);
}, "~S,~S,~B");
Clazz.defineMethod (c$, "open", 
function (method, url, async, user) {
this.open (method, url, async, user, null);
}, "~S,~S,~B,~S");
Clazz.defineMethod (c$, "open", 
function (method, url, async, user, password) {
this.asynchronous = async;
this.method = method;
this.url = url;
this.user = user;
this.password = password;
this.responseText = null;
this.responseXML = null;
this.readyState = 1;
this.status = 200;
this.statusText = null;
this.toAbort = false;
if (this.onreadystatechange != null) {
this.onreadystatechange.onOpen ();
}}, "~S,~S,~B,~S,~S");
Clazz.defineMethod (c$, "send", 
function () {
this.send (null);
});
Clazz.defineMethod (c$, "send", 
function (str) {
this.content = str;
if (this.asynchronous) {
(((Clazz.isClassDefined ("java.net.HttpRequest$1") ? 0 : java.net.HttpRequest.$HttpRequest$1$ ()), Clazz.innerTypeInstance (java.net.HttpRequest$1, this, null, "Java2Script HTTP Request"))).start ();
} else {
this.request ();
}}, "~S");
Clazz.defineMethod (c$, "abort", 
function () {
this.toAbort = true;
this.isDisconnected = false;
this.checkAbort ();
});
Clazz.defineMethod (c$, "checkAbort", 
function () {
if (!this.toAbort) return false;
if (this.activeOS != null) {
try {
this.activeOS.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.activeOS = null;
}if (this.activeIS != null) {
try {
this.activeIS.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.activeIS = null;
}if (!this.isDisconnected && this.connection != null) {
this.connection.disconnect ();
this.isDisconnected = true;
}return true;
});
Clazz.defineMethod (c$, "request", 
($fz = function () {
try {
this.connection =  new java.net.URL (this.url).openConnection ();
if (this.isCometConnection) {
this.connection.setReadTimeout (0);
} else {
this.connection.setReadTimeout (30000);
}this.connection.setInstanceFollowRedirects (false);
this.connection.setDoInput (true);
this.connection.setRequestMethod (this.method);
this.connection.setRequestProperty ("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 GTB5");
if ("post".equalsIgnoreCase (this.method)) {
this.connection.setDoOutput (true);
this.connection.setRequestProperty ("Content-Type", "application/x-www-form-urlencoded");
}if (this.user != null) {
var auth = this.user + ":" + (this.password != null ? this.password : "");
var base64Auth = java.net.HttpRequest.Base64.byteArrayToBase64 (auth.getBytes ());
this.connection.setRequestProperty ("Authorization", "Basic " + base64Auth);
}for (var iter = this.headers.keySet ().iterator (); iter.hasNext (); ) {
var key = iter.next ();
this.connection.setRequestProperty (key, this.headers.get (key));
}
this.connection.setUseCaches (false);
if (this.checkAbort ()) return ;
if ("post".equalsIgnoreCase (this.method)) {
var dos =  new java.io.DataOutputStream (this.connection.getOutputStream ());
this.activeOS = dos;
if (this.content != null) {
dos.writeBytes (this.content);
}if (this.checkAbort ()) return ;
dos.flush ();
dos.close ();
this.activeOS = null;
}if (this.checkAbort ()) return ;
var is = null;
try {
is = this.connection.getInputStream ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (this.checkAbort ()) return ;
this.readyState = 4;
if (this.onreadystatechange != null) {
this.onreadystatechange.onLoaded ();
}this.connection = null;
this.readyState = 0;
return ;
} else {
throw e;
}
}
this.activeIS = is;
if (this.readyState < 2) {
this.readyState = 2;
this.status = this.connection.getResponseCode ();
this.statusText = this.connection.getResponseMessage ();
if (this.onreadystatechange != null) {
this.onreadystatechange.onSent ();
}}this.receiving = this.initializeReceivingMonitor ();
var baos =  new java.io.ByteArrayOutputStream (10240);
var buffer =  Clazz.newArray (10240, 0);
var read;
while (!this.toAbort && (read = is.read (buffer)) != -1) {
if (this.checkAbort ()) return ;
if (this.readyState != 3) {
this.readyState = 3;
if (this.onreadystatechange != null) {
this.onreadystatechange.onReceiving ();
}}var received = false;
if (this.receiving != null) {
received = this.receiving.receiving (baos, buffer, 0, read);
}if (!received) {
baos.write (buffer, 0, read);
}}
if (this.checkAbort ()) return ;
is.close ();
this.activeIS = null;
this.responseText = null;
var type = this.connection.getHeaderField ("Content-Type");
if (type != null) {
var charset = null;
var lowerType = type.toLowerCase ();
var idx = lowerType.indexOf ("charset=");
if (idx != -1) {
charset = type.substring (idx + 8);
} else {
idx = lowerType.indexOf ("/xml");
if (idx != -1) {
var tmp = baos.toString ();
var matcher = java.util.regex.Pattern.compile ("<\\?.*encoding\\s*=\\s*[\'\"]([^'\"]*)[\'\"].*\\?>", 8).matcher (tmp);
if (matcher.find ()) {
charset = matcher.group (1);
} else {
this.responseText = tmp;
}} else {
idx = lowerType.indexOf ("html");
if (idx != -1) {
var tmp = baos.toString ();
var matcher = java.util.regex.Pattern.compile ("<meta.*content\\s*=\\s*[\'\"][^'\"]*charset\\s*=\\s*([^'\"]*)\\s*[\'\"].*>", 10).matcher (tmp);
if (matcher.find ()) {
charset = matcher.group (1);
} else {
this.responseText = tmp;
}}}}if (charset != null) {
try {
this.responseText = baos.toString (charset);
} catch (e) {
if (Clazz.instanceOf (e, java.io.UnsupportedEncodingException)) {
} else {
throw e;
}
}
}}if (this.responseText == null) {
this.responseText = baos.toString ();
}this.readyState = 4;
if (this.onreadystatechange != null) {
this.onreadystatechange.onLoaded ();
}this.connection.disconnect ();
this.readyState = 0;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (this.checkAbort ()) return ;
this.readyState = 4;
if (this.onreadystatechange != null) {
this.onreadystatechange.onLoaded ();
}this.connection = null;
this.readyState = 0;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setCometConnection", 
function (isCometConnection) {
this.isCometConnection = isCometConnection;
}, "~B");
c$.$HttpRequest$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (java.net, "HttpRequest$1", Thread);
Clazz.overrideMethod (c$, "run", 
function () {
if (!this.b$["java.net.HttpRequest"].toAbort) {
this.b$["java.net.HttpRequest"].request ();
}});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (java.net.HttpRequest, "Base64");
c$.byteArrayToBase64 = Clazz.defineMethod (c$, "byteArrayToBase64", 
function (a) {
var b = a.length;
var c = Math.floor (b / 3);
var d = b - 3 * c;
var e = 4 * (Math.floor ((b + 2) / 3));
var f =  new StringBuffer (e);
var g = java.net.HttpRequest.Base64.intToBase64;
var h = 0;
for (var i = 0; i < c; i++) {
var j = a[h++] & 0xff;
var k = a[h++] & 0xff;
var l = a[h++] & 0xff;
f.append (g[j >> 2]);
f.append (g[(j << 4) & 0x3f | (k >> 4)]);
f.append (g[(k << 2) & 0x3f | (l >> 6)]);
f.append (g[l & 0x3f]);
}
if (d != 0) {
var j = a[h++] & 0xff;
f.append (g[j >> 2]);
if (d == 1) {
f.append (g[(j << 4) & 0x3f]);
f.append ("==");
} else {
var k = a[h++] & 0xff;
f.append (g[(j << 4) & 0x3f | (k >> 4)]);
f.append (g[(k << 2) & 0x3f]);
f.append ('=');
}}return f.toString ();
}, "~A");
Clazz.defineStatics (c$,
"intToBase64", ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/']);
c$ = Clazz.p0p ();
Clazz.declareInterface (java.net.HttpRequest, "IXHRReceiving");
});
