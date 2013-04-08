Clazz.declarePackage ("net.sf.j2s.ui.preferences");
Clazz.load (["org.eclipse.jface.preference.FieldEditorPreferencePage", "org.eclipse.ui.IWorkbenchPreferencePage"], "net.sf.j2s.ui.preferences.Java2ScriptPreferencePage", ["net.sf.j2s.ui.Java2ScriptUIPlugin", "org.eclipse.jface.preference.BooleanFieldEditor", "$.RadioGroupFieldEditor"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.preferences, "Java2ScriptPreferencePage", org.eclipse.jface.preference.FieldEditorPreferencePage, org.eclipse.ui.IWorkbenchPreferencePage);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.ui.preferences.Java2ScriptPreferencePage, [1]);
this.setPreferenceStore (net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getPreferenceStore ());
this.setDescription ("Java2Script's default options");
});
Clazz.overrideMethod (c$, "createFieldEditors", 
function () {
this.addField ( new org.eclipse.jface.preference.RadioGroupFieldEditor ("open-j2s-app-in-inner-console", "Console", 1, [["Inner J2S Console", "true"], ["Registered external browsers, like Firefox, IE", "false"]], this.getFieldEditorParent (), true));
this.addField ( new org.eclipse.jface.preference.BooleanFieldEditor ("with-mozilla-addon-compatiable", "Generate Java2Script applications with Mozilla Add-on supports", this.getFieldEditorParent ()));
});
Clazz.overrideMethod (c$, "init", 
function (workbench) {
}, "org.eclipse.ui.IWorkbench");
});
