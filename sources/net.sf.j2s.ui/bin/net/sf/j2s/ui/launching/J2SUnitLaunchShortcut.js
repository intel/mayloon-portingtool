Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.jdt.junit.launcher.JUnitLaunchShortcut"], "net.sf.j2s.ui.launching.J2SUnitLaunchShortcut", null, function () {
c$ = Clazz.declareType (net.sf.j2s.ui.launching, "J2SUnitLaunchShortcut", org.eclipse.jdt.junit.launcher.JUnitLaunchShortcut);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.ui.launching.J2SUnitLaunchShortcut, []);
});
Clazz.overrideMethod (c$, "getLaunchConfigurationTypeId", 
function () {
return "net.sf.j2s.ui.launching.j2sUnit";
});
});
