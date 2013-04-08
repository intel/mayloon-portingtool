Clazz.declarePackage ("net.sf.j2s.ui");
Clazz.load (["org.eclipse.ui.plugin.AbstractUIPlugin"], "net.sf.j2s.ui.Java2ScriptUIPlugin", null, function () {
c$ = Clazz.declareType (net.sf.j2s.ui, "Java2ScriptUIPlugin", org.eclipse.ui.plugin.AbstractUIPlugin);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.ui.Java2ScriptUIPlugin, []);
($t$ = net.sf.j2s.ui.Java2ScriptUIPlugin.plugin = this, net.sf.j2s.ui.Java2ScriptUIPlugin.prototype.plugin = net.sf.j2s.ui.Java2ScriptUIPlugin.plugin, $t$);
});
Clazz.defineMethod (c$, "stop", 
function (context) {
Clazz.superCall (this, net.sf.j2s.ui.Java2ScriptUIPlugin, "stop", [context]);
($t$ = net.sf.j2s.ui.Java2ScriptUIPlugin.plugin = null, net.sf.j2s.ui.Java2ScriptUIPlugin.prototype.plugin = net.sf.j2s.ui.Java2ScriptUIPlugin.plugin, $t$);
}, "org.osgi.framework.BundleContext");
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
return net.sf.j2s.ui.Java2ScriptUIPlugin.plugin;
});
c$.getImageDescriptor = Clazz.defineMethod (c$, "getImageDescriptor", 
function (path) {
return org.eclipse.ui.plugin.AbstractUIPlugin.imageDescriptorFromPlugin ("net.sf.j2s.ui", path);
}, "~S");
Clazz.defineStatics (c$,
"plugin", null);
});
