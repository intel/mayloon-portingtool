Clazz.declarePackage ("net.sf.j2s.lib");
Clazz.load (["org.eclipse.core.runtime.Plugin"], "net.sf.j2s.lib.LibPlugin", null, function () {
c$ = Clazz.declareType (net.sf.j2s.lib, "LibPlugin", org.eclipse.core.runtime.Plugin);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.lib.LibPlugin, []);
($t$ = net.sf.j2s.lib.LibPlugin.plugin = this, net.sf.j2s.lib.LibPlugin.prototype.plugin = net.sf.j2s.lib.LibPlugin.plugin, $t$);
});
Clazz.defineMethod (c$, "stop", 
function (context) {
Clazz.superCall (this, net.sf.j2s.lib.LibPlugin, "stop", [context]);
($t$ = net.sf.j2s.lib.LibPlugin.plugin = null, net.sf.j2s.lib.LibPlugin.prototype.plugin = net.sf.j2s.lib.LibPlugin.plugin, $t$);
}, "org.osgi.framework.BundleContext");
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
return net.sf.j2s.lib.LibPlugin.plugin;
});
Clazz.defineStatics (c$,
"plugin", null);
});
