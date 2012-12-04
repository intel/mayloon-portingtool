Clazz.declarePackage ("org.eclipse.core.runtime.preferences");
Clazz.load (["java.util.EventObject", "org.osgi.service.prefs.Preferences", "java.lang.IllegalArgumentException"], "org.eclipse.core.runtime.preferences.IEclipsePreferences", null, function () {
Clazz.declareInterface (org.eclipse.core.runtime.preferences, "IEclipsePreferences", org.osgi.service.prefs.Preferences);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.child = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.preferences.IEclipsePreferences, "NodeChangeEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (parent, child) {
Clazz.superConstructor (this, org.eclipse.core.runtime.preferences.IEclipsePreferences.NodeChangeEvent, [parent]);
this.child = child;
}, "org.osgi.service.prefs.Preferences,org.osgi.service.prefs.Preferences");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.getSource ();
});
Clazz.defineMethod (c$, "getChild", 
function () {
return this.child;
});
c$ = Clazz.p0p ();
Clazz.declareInterface (org.eclipse.core.runtime.preferences.IEclipsePreferences, "INodeChangeListener");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.key = null;
this.newValue = null;
this.oldValue = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.preferences.IEclipsePreferences, "PreferenceChangeEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (node, key, oldValue, newValue) {
Clazz.superConstructor (this, org.eclipse.core.runtime.preferences.IEclipsePreferences.PreferenceChangeEvent, [node]);
if (key == null || !(Clazz.instanceOf (node, org.osgi.service.prefs.Preferences))) throw  new IllegalArgumentException ();
this.key = key;
this.newValue = newValue;
this.oldValue = oldValue;
}, "~O,~S,~O,~O");
Clazz.defineMethod (c$, "getNode", 
function () {
return this.source;
});
Clazz.defineMethod (c$, "getKey", 
function () {
return this.key;
});
Clazz.defineMethod (c$, "getNewValue", 
function () {
return this.newValue;
});
Clazz.defineMethod (c$, "getOldValue", 
function () {
return this.oldValue;
});
c$ = Clazz.p0p ();
Clazz.declareInterface (org.eclipse.core.runtime.preferences.IEclipsePreferences, "IPreferenceChangeListener");
});
