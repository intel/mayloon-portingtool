Clazz.declarePackage ("java.net");
Clazz.load (["java.net.IXHRCallback"], "java.net.XHRCallbackAdapter", null, function () {
c$ = Clazz.declareType (java.net, "XHRCallbackAdapter", null, java.net.IXHRCallback);
Clazz.overrideMethod (c$, "onLoaded", 
function () {
});
Clazz.overrideMethod (c$, "onReceiving", 
function () {
});
Clazz.overrideMethod (c$, "onSent", 
function () {
});
Clazz.overrideMethod (c$, "onOpen", 
function () {
});
});
