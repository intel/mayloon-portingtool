Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.jdt.debug.ui.launchConfigurations.JavaApplicationLaunchShortcut"], "net.sf.j2s.ui.launching.J2SApplicationLaunchShortcut", ["org.eclipse.debug.core.DebugPlugin"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.launching, "J2SApplicationLaunchShortcut", org.eclipse.jdt.debug.ui.launchConfigurations.JavaApplicationLaunchShortcut);
Clazz.overrideMethod (c$, "getConfigurationType", 
function () {
return this.getLaunchManager ().getLaunchConfigurationType ("net.sf.j2s.ui.launching.j2sApplication");
});
Clazz.defineMethod (c$, "getLaunchManager", 
($fz = function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
return org.eclipse.debug.core.DebugPlugin.getDefault ().getLaunchManager ();
}, $fz.isPrivate = true, $fz));
});
