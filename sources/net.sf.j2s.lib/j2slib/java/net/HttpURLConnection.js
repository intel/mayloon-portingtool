Clazz.declarePackage ("java.net");
Clazz.load (["java.net.URLConnection"], "java.net.HttpURLConnection", ["java.io.IOException", "$.StringBufferInputStream", "java.lang.IllegalArgumentException", "$.IllegalStateException", "java.util.HashMap", "net.sf.j2s.ajax.HttpRequest"], function () {
c$ = Clazz.decorateAsClass (function () {
this.method = "GET";
this.responseCode = -1;
this.responseMessage = null;
this.instanceFollowRedirects = false;
this.chunkLength = -1;
this.fixedContentLength = -1;
this.requestProperties = null;
this.isBinary = false;
Clazz.instantialize (this, arguments);
}, java.net, "HttpURLConnection", java.net.URLConnection);
Clazz.prepareFields (c$, function () {
this.instanceFollowRedirects = java.net.HttpURLConnection.followRedirects;
});
Clazz.makeConstructor (c$, 
function (url) {
Clazz.superConstructor (this, java.net.HttpURLConnection, [url]);
this.requestProperties =  new java.util.HashMap ();
}, "java.net.URL");
Clazz.defineMethod (c$, "disconnect", 
function () {
});
Clazz.defineMethod (c$, "getErrorStream", 
function () {
return null;
});
c$.getFollowRedirects = Clazz.defineMethod (c$, "getFollowRedirects", 
function () {
return java.net.HttpURLConnection.followRedirects;
});
Clazz.overrideMethod (c$, "getPermission", 
function () {
var port = this.url.getPort ();
if (port < 0) {
port = 80;
}return null;
});
Clazz.defineMethod (c$, "getRequestMethod", 
function () {
return this.method;
});
Clazz.defineMethod (c$, "getResponseCode", 
function () {
this.getInputStream ();
var response = this.getHeaderField (0);
if (response == null) {
return -1;
}response = response.trim ();
var mark = response.indexOf (" ") + 1;
if (mark == 0) {
return -1;
}var last = mark + 3;
if (last > response.length) {
last = response.length;
}this.responseCode = Integer.parseInt (response.substring (mark, last));
if (last + 1 <= response.length) {
this.responseMessage = response.substring (last + 1);
}return this.responseCode;
});
Clazz.defineMethod (c$, "getResponseMessage", 
function () {
if (this.responseMessage != null) {
return this.responseMessage;
}this.getResponseCode ();
return this.responseMessage;
});
c$.setFollowRedirects = Clazz.defineMethod (c$, "setFollowRedirects", 
function (auto) {
var security = System.getSecurityManager ();
if (security != null) {
security.checkSetFactory ();
}($t$ = java.net.HttpURLConnection.followRedirects = auto, java.net.HttpURLConnection.prototype.followRedirects = java.net.HttpURLConnection.followRedirects, $t$);
}, "~B");
Clazz.defineMethod (c$, "setRequestMethod", 
function (method) {
if (this.connected) {
throw  new java.io.IOException ("Connection already established");
}for (var permittedUserMethod, $permittedUserMethod = 0, $$permittedUserMethod = java.net.HttpURLConnection.PERMITTED_USER_METHODS; $permittedUserMethod < $$permittedUserMethod.length && ((permittedUserMethod = $$permittedUserMethod[$permittedUserMethod]) || true); $permittedUserMethod++) {
if (permittedUserMethod.equals (method)) {
this.method = permittedUserMethod;
return ;
}}
}, "~S");
Clazz.overrideMethod (c$, "setRequestProperty", 
function (key, value) {
this.requestProperties.put (key, value);
if (key.equals ("responseType") && value.equals ("arraybuffer")) this.isBinary = true;
}, "~S,~S");
Clazz.defineMethod (c$, "usingProxy", 
function () {
return false;
});
Clazz.defineMethod (c$, "getInstanceFollowRedirects", 
function () {
return this.instanceFollowRedirects;
});
Clazz.defineMethod (c$, "setInstanceFollowRedirects", 
function (followRedirects) {
this.instanceFollowRedirects = followRedirects;
}, "~B");
Clazz.defineMethod (c$, "setFixedLengthStreamingMode", 
function (contentLength) {
if (this.connected) {
throw  new IllegalStateException ("Already connected");
}if (this.chunkLength > 0) {
throw  new IllegalStateException ("Already in chunked mode");
}if (contentLength < 0) {
throw  new IllegalArgumentException ("contentLength < 0");
}this.fixedContentLength = contentLength;
}, "~N");
Clazz.defineMethod (c$, "setChunkedStreamingMode", 
function (chunkLength) {
if (this.connected) {
throw  new IllegalStateException ("Already connected");
}if (this.fixedContentLength >= 0) {
throw  new IllegalStateException ("Already in fixed-length mode");
}if (chunkLength <= 0) {
this.chunkLength = 1024;
} else {
this.chunkLength = chunkLength;
}}, "~N");
Clazz.overrideMethod (c$, "connect", 
function () {
});
Clazz.overrideMethod (c$, "getInputStream", 
function () {
var text = this.getContent ();
var stream =  new java.io.StringBufferInputStream (text);
return stream;
});
Clazz.defineMethod (c$, "getContent", 
function () {
if (!this.connected) {
this.connect ();
}var request =  new net.sf.j2s.ajax.HttpRequest ();
request.open ("GET", this.url.getSpec (), true);
if (this.isBinary) {
request.setResponseType ("arraybuffer");
}request.send ();
while (request.getReadyState() != 4 || request.getStatus() !=200)
yield();
if (this.isBinary) return request.getResponse ();
var doc = request.getResponseXML ();
if (doc != null) {
return doc;
} else {
return request.getResponseText ();
}});
Clazz.defineStatics (c$,
"followRedirects", true,
"HTTP_ACCEPTED", 202,
"HTTP_BAD_GATEWAY", 502,
"HTTP_BAD_METHOD", 405,
"HTTP_BAD_REQUEST", 400,
"HTTP_CLIENT_TIMEOUT", 408,
"HTTP_CONFLICT", 409,
"HTTP_CREATED", 201,
"HTTP_ENTITY_TOO_LARGE", 413,
"HTTP_FORBIDDEN", 403,
"HTTP_GATEWAY_TIMEOUT", 504,
"HTTP_GONE", 410,
"HTTP_INTERNAL_ERROR", 500,
"HTTP_LENGTH_REQUIRED", 411,
"HTTP_MOVED_PERM", 301,
"HTTP_MOVED_TEMP", 302,
"HTTP_MULT_CHOICE", 300,
"HTTP_NO_CONTENT", 204,
"HTTP_NOT_ACCEPTABLE", 406,
"HTTP_NOT_AUTHORITATIVE", 203,
"HTTP_NOT_FOUND", 404,
"HTTP_NOT_IMPLEMENTED", 501,
"HTTP_NOT_MODIFIED", 304,
"HTTP_OK", 200,
"HTTP_PARTIAL", 206,
"HTTP_PAYMENT_REQUIRED", 402,
"HTTP_PRECON_FAILED", 412,
"HTTP_PROXY_AUTH", 407,
"HTTP_REQ_TOO_LONG", 414,
"HTTP_RESET", 205,
"HTTP_SEE_OTHER", 303,
"HTTP_SERVER_ERROR", 500,
"HTTP_USE_PROXY", 305,
"HTTP_UNAUTHORIZED", 401,
"HTTP_UNSUPPORTED_TYPE", 415,
"HTTP_UNAVAILABLE", 503,
"HTTP_VERSION", 505,
"OPTIONS", "OPTIONS",
"GET", "GET",
"HEAD", "HEAD",
"POST", "POST",
"PUT", "PUT",
"DELETE", "DELETE",
"TRACE", "TRACE",
"CONNECT", "CONNECT");
c$.PERMITTED_USER_METHODS = c$.prototype.PERMITTED_USER_METHODS = ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE"];
Clazz.defineStatics (c$,
"DEFAULT_CHUNK_LENGTH", 1024);
});
