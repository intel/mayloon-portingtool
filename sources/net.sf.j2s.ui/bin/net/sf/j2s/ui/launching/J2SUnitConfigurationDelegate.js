Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.debug.core.model.LaunchConfigurationDelegate"], "net.sf.j2s.ui.launching.J2SUnitConfigurationDelegate", ["java.io.File", "net.sf.j2s.ui.launching.J2SLaunchingUtil", "$.J2SProcess"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.launching, "J2SUnitConfigurationDelegate", org.eclipse.debug.core.model.LaunchConfigurationDelegate);
Clazz.overrideMethod (c$, "launch", 
function (configuration, mode, launch, monitor) {
if (configuration != null) {
try {
net.sf.j2s.ui.launching.J2SLaunchingUtil.launchingJ2SUnit (configuration, mode, "junit.html");
var mainType = net.sf.j2s.ui.launching.J2SLaunchingUtil.getMainType (configuration);
if (mainType != null) {
var workingDir = net.sf.j2s.ui.launching.J2SLaunchingUtil.getWorkingDirectory (configuration);
if (workingDir != null) {
launch.addProcess ( new net.sf.j2s.ui.launching.J2SProcess (launch,  new java.io.File (workingDir, mainType + ".junit.html").getAbsolutePath ()));
}}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}}, "org.eclipse.debug.core.ILaunchConfiguration,~S,org.eclipse.debug.core.ILaunch,org.eclipse.core.runtime.IProgressMonitor");
});
