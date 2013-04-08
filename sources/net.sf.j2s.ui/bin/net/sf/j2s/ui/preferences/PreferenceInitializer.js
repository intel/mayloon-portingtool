Clazz.declarePackage ("net.sf.j2s.ui.preferences");
Clazz.load (["org.eclipse.core.runtime.preferences.AbstractPreferenceInitializer"], "net.sf.j2s.ui.preferences.PreferenceInitializer", ["net.sf.j2s.ui.Java2ScriptUIPlugin"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.preferences, "PreferenceInitializer", org.eclipse.core.runtime.preferences.AbstractPreferenceInitializer);
Clazz.overrideMethod (c$, "initializeDefaultPreferences", 
function () {
var store = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getPreferenceStore ();
store.setDefault ("open-j2s-app-in-inner-console", true);
store.setDefault ("with-mozilla-addon-compatiable", true);
});
});
