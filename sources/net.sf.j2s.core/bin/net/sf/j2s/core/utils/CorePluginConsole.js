Clazz.declarePackage ("net.sf.j2s.core.utils");
Clazz.load (null, "net.sf.j2s.core.utils.CorePluginConsole", ["java.io.PrintWriter", "$.StringWriter", "java.lang.StringBuffer", "java.util.Calendar", "java.util.logging.Formatter", "$.Level", "$.LogRecord", "net.sf.j2s.core.utils.MptMessages", "$wt.graphics.Color", "org.eclipse.ui.console.ConsolePlugin"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.utils, "CorePluginConsole");
c$.initConsoleView = Clazz.defineMethod (c$, "initConsoleView", 
function () {
var consoleManager = org.eclipse.ui.console.ConsolePlugin.getDefault ().getConsoleManager ();
var IConsole = consoleManager.getConsoles ();
for (var i = 0; i != IConsole.length; i++) {
if (IConsole[i].getName ().equals (net.sf.j2s.core.utils.MptMessages.Mayloon_Console_Name)) {
($t$ = net.sf.j2s.core.utils.CorePluginConsole.sConsole = IConsole[i], net.sf.j2s.core.utils.CorePluginConsole.prototype.sConsole = net.sf.j2s.core.utils.CorePluginConsole.sConsole, $t$);
}}
($t$ = net.sf.j2s.core.utils.CorePluginConsole.sSuccessStream = net.sf.j2s.core.utils.CorePluginConsole.sConsole.newMessageStream (), net.sf.j2s.core.utils.CorePluginConsole.prototype.sSuccessStream = net.sf.j2s.core.utils.CorePluginConsole.sSuccessStream, $t$);
($t$ = net.sf.j2s.core.utils.CorePluginConsole.sNormalStream = net.sf.j2s.core.utils.CorePluginConsole.sConsole.newMessageStream (), net.sf.j2s.core.utils.CorePluginConsole.prototype.sNormalStream = net.sf.j2s.core.utils.CorePluginConsole.sNormalStream, $t$);
($t$ = net.sf.j2s.core.utils.CorePluginConsole.sErrorStream = net.sf.j2s.core.utils.CorePluginConsole.sConsole.newMessageStream (), net.sf.j2s.core.utils.CorePluginConsole.prototype.sErrorStream = net.sf.j2s.core.utils.CorePluginConsole.sErrorStream, $t$);
var display = org.eclipse.ui.console.ConsolePlugin.getDefault ().getWorkbench ().getDisplay ();
($t$ = net.sf.j2s.core.utils.CorePluginConsole.sColorRed =  new $wt.graphics.Color (display, 0xFF, 0x00, 0x00), net.sf.j2s.core.utils.CorePluginConsole.prototype.sColorRed = net.sf.j2s.core.utils.CorePluginConsole.sColorRed, $t$);
($t$ = net.sf.j2s.core.utils.CorePluginConsole.sColorGreen =  new $wt.graphics.Color (display, 0x00, 0xFF, 0x00), net.sf.j2s.core.utils.CorePluginConsole.prototype.sColorGreen = net.sf.j2s.core.utils.CorePluginConsole.sColorGreen, $t$);
display.asyncExec (((Clazz.isClassDefined ("net.sf.j2s.core.utils.CorePluginConsole$1") ? 0 : net.sf.j2s.core.utils.CorePluginConsole.$CorePluginConsole$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.core.utils.CorePluginConsole$1, this, null)));
($t$ = net.sf.j2s.core.utils.CorePluginConsole.sFormatter = ((Clazz.isClassDefined ("net.sf.j2s.core.utils.CorePluginConsole$2") ? 0 : net.sf.j2s.core.utils.CorePluginConsole.$CorePluginConsole$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.core.utils.CorePluginConsole$2, this, null)), net.sf.j2s.core.utils.CorePluginConsole.prototype.sFormatter = net.sf.j2s.core.utils.CorePluginConsole.sFormatter, $t$);
});
c$.general = Clazz.defineMethod (c$, "general", 
function (tag, format, args) {
var record =  new java.util.logging.LogRecord (java.util.logging.Level.INFO, String.format (format, [args]));
record.setLoggerName (tag);
net.sf.j2s.core.utils.CorePluginConsole.sNormalStream.print (net.sf.j2s.core.utils.CorePluginConsole.sFormatter.format (record));
org.eclipse.ui.console.ConsolePlugin.getDefault ().getConsoleManager ().showConsoleView (net.sf.j2s.core.utils.CorePluginConsole.sConsole);
}, "~S,~S,~A");
c$.success = Clazz.defineMethod (c$, "success", 
function (tag, format, args) {
var record =  new java.util.logging.LogRecord (java.util.logging.Level.INFO, String.format (format, [args]));
record.setLoggerName (tag);
net.sf.j2s.core.utils.CorePluginConsole.sSuccessStream.print (net.sf.j2s.core.utils.CorePluginConsole.sFormatter.format (record));
org.eclipse.ui.console.ConsolePlugin.getDefault ().getConsoleManager ().showConsoleView (net.sf.j2s.core.utils.CorePluginConsole.sConsole);
}, "~S,~S,~A");
c$.warning = Clazz.defineMethod (c$, "warning", 
function (tag, format, args) {
var record =  new java.util.logging.LogRecord (java.util.logging.Level.WARNING, String.format (format, [args]));
record.setLoggerName (tag);
net.sf.j2s.core.utils.CorePluginConsole.sErrorStream.print (net.sf.j2s.core.utils.CorePluginConsole.sFormatter.format (record));
org.eclipse.ui.console.ConsolePlugin.getDefault ().getConsoleManager ().showConsoleView (net.sf.j2s.core.utils.CorePluginConsole.sConsole);
}, "~S,~S,~A");
c$.error = Clazz.defineMethod (c$, "error", 
function (tag, format, args) {
var record =  new java.util.logging.LogRecord (java.util.logging.Level.SEVERE, String.format (format, [args]));
record.setLoggerName (tag);
net.sf.j2s.core.utils.CorePluginConsole.sErrorStream.print (net.sf.j2s.core.utils.CorePluginConsole.sFormatter.format (record));
org.eclipse.ui.console.ConsolePlugin.getDefault ().getConsoleManager ().showConsoleView (net.sf.j2s.core.utils.CorePluginConsole.sConsole);
}, "~S,~S,~A");
c$.getNormalStream = Clazz.defineMethod (c$, "getNormalStream", 
function () {
return net.sf.j2s.core.utils.CorePluginConsole.sNormalStream;
});
c$.getErrorStream = Clazz.defineMethod (c$, "getErrorStream", 
function () {
return net.sf.j2s.core.utils.CorePluginConsole.sErrorStream;
});
c$.getsSuccessStream = Clazz.defineMethod (c$, "getsSuccessStream", 
function () {
return net.sf.j2s.core.utils.CorePluginConsole.sSuccessStream;
});
c$.getFormatter = Clazz.defineMethod (c$, "getFormatter", 
function () {
return net.sf.j2s.core.utils.CorePluginConsole.sFormatter;
});
c$.destroy = Clazz.defineMethod (c$, "destroy", 
function () {
net.sf.j2s.core.utils.CorePluginConsole.sColorRed.dispose ();
net.sf.j2s.core.utils.CorePluginConsole.sColorGreen.dispose ();
try {
net.sf.j2s.core.utils.CorePluginConsole.sNormalStream.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
try {
net.sf.j2s.core.utils.CorePluginConsole.sErrorStream.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
try {
net.sf.j2s.core.utils.CorePluginConsole.sSuccessStream.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
});
c$.$CorePluginConsole$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.core.utils, "CorePluginConsole$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
net.sf.j2s.core.utils.CorePluginConsole.sErrorStream.setColor (net.sf.j2s.core.utils.CorePluginConsole.sColorRed);
net.sf.j2s.core.utils.CorePluginConsole.sSuccessStream.setColor (net.sf.j2s.core.utils.CorePluginConsole.sColorGreen);
});
c$ = Clazz.p0p ();
};
c$.$CorePluginConsole$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.core.utils, "CorePluginConsole$2", java.util.logging.Formatter);
Clazz.defineMethod (c$, "format", 
function (record) {
var buffer =  new StringBuffer ();
buffer.append (String.format ("[%1$tF_%1$tT:%1$tL] [%2$s] [%3$s] %4$s\n", [java.util.Calendar.getInstance (), record.getLevel (), record.getLoggerName (), record.getMessage ()]));
if (record.getThrown () != null) {
var writer =  new java.io.StringWriter ();
record.getThrown ().printStackTrace ( new java.io.PrintWriter (writer));
buffer.append (writer.toString ());
}return buffer.toString ();
}, "java.util.logging.LogRecord");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"sConsole", null,
"sSuccessStream", null,
"sNormalStream", null,
"sErrorStream", null,
"sColorRed", null,
"sColorGreen", null,
"sFormatter", null);
});
