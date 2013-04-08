Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup"], "net.sf.j2s.ui.launching.J2SUnitTabGroup", ["net.sf.j2s.ui.launching.J2SArgumentsTab", "$.J2SClasspathOptionTab", "$.J2SConsoleOptionsTab", "$.J2SGenerateHTMLOptionsTab", "org.eclipse.jdt.internal.junit.launcher.AssertionVMArg", "org.eclipse.jdt.junit.launcher.JUnitLaunchConfigurationTab"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.launching, "J2SUnitTabGroup", org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup);
Clazz.overrideMethod (c$, "createTabs", 
function (dialog, mode) {
var tabs = [ new org.eclipse.jdt.junit.launcher.JUnitLaunchConfigurationTab (),  new net.sf.j2s.ui.launching.J2SArgumentsTab (),  new net.sf.j2s.ui.launching.J2SClasspathOptionTab (),  new net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab (),  new net.sf.j2s.ui.launching.J2SConsoleOptionsTab ()];
this.setTabs (tabs);
}, "org.eclipse.debug.ui.ILaunchConfigurationDialog,~S");
Clazz.defineMethod (c$, "setDefaults", 
function (config) {
Clazz.superCall (this, net.sf.j2s.ui.launching.J2SUnitTabGroup, "setDefaults", [config]);
org.eclipse.jdt.internal.junit.launcher.AssertionVMArg.setArgDefault (config);
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
});
