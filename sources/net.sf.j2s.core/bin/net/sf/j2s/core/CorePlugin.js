Clazz.declarePackage ("net.sf.j2s.core");
Clazz.load (["org.eclipse.core.runtime.Plugin"], "net.sf.j2s.core.CorePlugin", ["net.sf.j2s.core.hotspot.InnerHotspotServer", "net.sf.j2s.core.utils.CorePluginConsole"], function () {
c$ = Clazz.declareType (net.sf.j2s.core, "CorePlugin", org.eclipse.core.runtime.Plugin);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.core.CorePlugin, []);
($t$ = net.sf.j2s.core.CorePlugin.plugin = this, net.sf.j2s.core.CorePlugin.prototype.plugin = net.sf.j2s.core.CorePlugin.plugin, $t$);
});
Clazz.defineMethod (c$, "start", 
function (context) {
Clazz.superCall (this, net.sf.j2s.core.CorePlugin, "start", [context]);
net.sf.j2s.core.utils.CorePluginConsole.initConsoleView ();
if (!net.sf.j2s.core.hotspot.InnerHotspotServer.isServerStarted ()) {
net.sf.j2s.core.hotspot.InnerHotspotServer.getSingletonServer ().startServer ();
}}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "stop", 
function (context) {
Clazz.superCall (this, net.sf.j2s.core.CorePlugin, "stop", [context]);
($t$ = net.sf.j2s.core.CorePlugin.plugin = null, net.sf.j2s.core.CorePlugin.prototype.plugin = net.sf.j2s.core.CorePlugin.plugin, $t$);
if (net.sf.j2s.core.hotspot.InnerHotspotServer.isServerStarted ()) {
net.sf.j2s.core.hotspot.InnerHotspotServer.getSingletonServer ().stopServer ();
}}, "org.osgi.framework.BundleContext");
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
return net.sf.j2s.core.CorePlugin.plugin;
});
Clazz.defineStatics (c$,
"plugin", null);
});
