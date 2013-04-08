Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup"], "net.sf.j2s.ui.launching.J2SLaunchingTabGroup", ["net.sf.j2s.ui.launching.J2SArgumentsTab", "$.J2SClasspathOptionTab", "$.J2SConsoleOptionsTab", "$.J2SGenerateHTMLOptionsTab", "org.eclipse.jdt.debug.ui.launchConfigurations.JavaMainTab"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.launching, "J2SLaunchingTabGroup", org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup);
Clazz.overrideMethod (c$, "createTabs", 
function (dialog, mode) {
var tabs = [ new org.eclipse.jdt.debug.ui.launchConfigurations.JavaMainTab (),  new net.sf.j2s.ui.launching.J2SArgumentsTab (),  new net.sf.j2s.ui.launching.J2SClasspathOptionTab (),  new net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab (),  new net.sf.j2s.ui.launching.J2SConsoleOptionsTab ()];
this.setTabs (tabs);
}, "org.eclipse.debug.ui.ILaunchConfigurationDialog,~S");
});
