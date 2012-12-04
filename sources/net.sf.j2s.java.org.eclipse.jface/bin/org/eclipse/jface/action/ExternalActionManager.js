Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.bindings.IBindingManagerListener", "java.util.HashMap", "$.HashSet", "$.ResourceBundle"], "org.eclipse.jface.action.ExternalActionManager", ["java.lang.Exception", "$.NullPointerException", "java.text.MessageFormat", "org.eclipse.core.commands.ICommandListener", "$.ParameterizedCommand", "org.eclipse.core.runtime.Status", "org.eclipse.jface.bindings.keys.KeySequence", "$.SWTKeySupport", "org.eclipse.jface.util.Policy", "$.PropertyChangeEvent", "$.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.callback = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "ExternalActionManager");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
if (org.eclipse.jface.action.ExternalActionManager.instance == null) ($t$ = org.eclipse.jface.action.ExternalActionManager.instance =  new org.eclipse.jface.action.ExternalActionManager (), org.eclipse.jface.action.ExternalActionManager.prototype.instance = org.eclipse.jface.action.ExternalActionManager.instance, $t$);
return org.eclipse.jface.action.ExternalActionManager.instance;
});
Clazz.makeConstructor (c$, 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getCallback", 
function () {
return this.callback;
});
Clazz.defineMethod (c$, "setCallback", 
function (callbackToUse) {
this.callback = callbackToUse;
}, "org.eclipse.jface.action.ExternalActionManager.ICallback");
Clazz.declareInterface (org.eclipse.jface.action.ExternalActionManager, "IActiveChecker");
Clazz.declareInterface (org.eclipse.jface.action.ExternalActionManager, "ICallback");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.activeChecker = null;
this.bindingManager = null;
this.bindingManagerListenerAttached = false;
this.commandManager = null;
this.loggedCommandIds = null;
this.registeredListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action.ExternalActionManager, "CommandCallback", null, [org.eclipse.jface.bindings.IBindingManagerListener, org.eclipse.jface.action.ExternalActionManager.ICallback]);
Clazz.prepareFields (c$, function () {
this.loggedCommandIds =  new java.util.HashSet ();
this.registeredListeners =  new java.util.HashMap ();
});
Clazz.makeConstructor (c$, 
function (bindingManager, commandManager) {
this.construct (bindingManager, commandManager, ((Clazz.isClassDefined ("org.eclipse.jface.action.ExternalActionManager$CommandCallback$1") ? 0 : org.eclipse.jface.action.ExternalActionManager.CommandCallback.$ExternalActionManager$CommandCallback$1$ ()), Clazz.innerTypeInstance (org.eclipse.jface.action.ExternalActionManager$CommandCallback$1, this, null)));
}, "org.eclipse.jface.bindings.BindingManager,org.eclipse.core.commands.CommandManager");
Clazz.makeConstructor (c$, 
function (bindingManager, commandManager, activeChecker) {
if (bindingManager == null) {
throw  new NullPointerException ("The callback needs a binding manager");
}if (commandManager == null) {
throw  new NullPointerException ("The callback needs a command manager");
}if (activeChecker == null) {
throw  new NullPointerException ("The callback needs an active callback");
}this.activeChecker = activeChecker;
this.bindingManager = bindingManager;
this.commandManager = commandManager;
}, "org.eclipse.jface.bindings.BindingManager,org.eclipse.core.commands.CommandManager,org.eclipse.jface.action.ExternalActionManager.IActiveChecker");
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (commandId, listener) {
this.registeredListeners.put (commandId, listener);
if (!this.bindingManagerListenerAttached) {
this.bindingManager.addBindingManagerListener (this);
this.bindingManagerListenerAttached = true;
}}, "~S,org.eclipse.jface.util.IPropertyChangeListener");
Clazz.overrideMethod (c$, "bindingManagerChanged", 
function (event) {
if (event.isActiveBindingsChanged ()) {
var listenerItr = this.registeredListeners.entrySet ().iterator ();
while (listenerItr.hasNext ()) {
var entry = listenerItr.next ();
var commandId = entry.getKey ();
var command = this.commandManager.getCommand (commandId);
var parameterizedCommand =  new org.eclipse.core.commands.ParameterizedCommand (command, null);
if (event.isActiveBindingsChangedFor (parameterizedCommand)) {
var listener = entry.getValue ();
listener.propertyChange ( new org.eclipse.jface.util.PropertyChangeEvent (event.getManager (), "text", null, null));
}}
}}, "org.eclipse.jface.bindings.BindingManagerEvent");
Clazz.overrideMethod (c$, "getAccelerator", 
function (commandId) {
var command = this.commandManager.getCommand (commandId);
var parameterizedCommand =  new org.eclipse.core.commands.ParameterizedCommand (command, null);
var activeBindings = this.bindingManager.getActiveBindingsFor (parameterizedCommand);
var activeBindingsCount = activeBindings.length;
var accelerator = null;
for (var i = 0; i < activeBindingsCount; i++) {
var triggerSequence = activeBindings[i];
var triggers = triggerSequence.getTriggers ();
if (triggers.length == 1) {
var trigger = triggers[0];
if (Clazz.instanceOf (trigger, org.eclipse.jface.bindings.keys.KeyStroke)) {
accelerator =  new Integer (org.eclipse.jface.bindings.keys.SWTKeySupport.convertKeyStrokeToAccelerator (trigger));
break;
}}}
return accelerator;
}, "~S");
Clazz.overrideMethod (c$, "getAcceleratorText", 
function (commandId) {
var command = this.commandManager.getCommand (commandId);
var parameterizedCommand =  new org.eclipse.core.commands.ParameterizedCommand (command, null);
var activeBindings = this.bindingManager.getActiveBindingsFor (parameterizedCommand);
var activeBindingsCount = activeBindings.length;
var acceleratorText = null;
for (var i = 0; i < activeBindingsCount; i++) {
var triggerSequence = activeBindings[i];
acceleratorText = triggerSequence.format ();
}
return acceleratorText;
}, "~S");
Clazz.overrideMethod (c$, "isAcceleratorInUse", 
function (accelerator) {
var keySequence = org.eclipse.jface.bindings.keys.KeySequence.getInstance (org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke (accelerator));
return this.bindingManager.isPerfectMatch (keySequence) || this.bindingManager.isPartialMatch (keySequence);
}, "~N");
Clazz.overrideMethod (c$, "isActive", 
function (commandId) {
if (commandId != null) {
var command = this.commandManager.getCommand (commandId);
if (!command.isDefined () && (!this.loggedCommandIds.contains (commandId))) {
var message = java.text.MessageFormat.format (org.eclipse.jface.util.Util.translateString (org.eclipse.jface.action.ExternalActionManager.CommandCallback.RESOURCE_BUNDLE, "undefinedCommand.WarningMessage", null), [[command.getId ()]]);
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.jface", 0, message,  new Exception ());
org.eclipse.jface.util.Policy.getLog ().log (status);
this.loggedCommandIds.add (commandId);
command.addCommandListener (((Clazz.isClassDefined ("org.eclipse.jface.action.ExternalActionManager$CommandCallback$2") ? 0 : org.eclipse.jface.action.ExternalActionManager.CommandCallback.$ExternalActionManager$CommandCallback$2$ ()), Clazz.innerTypeInstance (org.eclipse.jface.action.ExternalActionManager$CommandCallback$2, this, Clazz.cloneFinals ("command", command, "commandId", commandId))));
return true;
}return this.activeChecker.isActive (commandId);
}return true;
}, "~S");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (commandId, listener) {
var existingListener = this.registeredListeners.get (commandId);
if (existingListener === listener) {
this.registeredListeners.remove (commandId);
if (this.registeredListeners.isEmpty ()) {
this.bindingManager.removeBindingManagerListener (this);
this.bindingManagerListenerAttached = false;
}}}, "~S,org.eclipse.jface.util.IPropertyChangeListener");
c$.$ExternalActionManager$CommandCallback$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ExternalActionManager$CommandCallback$1", null, org.eclipse.jface.action.ExternalActionManager.IActiveChecker);
Clazz.defineMethod (c$, "isActive", 
function (commandId) {
return true;
}, "~S");
c$ = Clazz.p0p ();
};
c$.$ExternalActionManager$CommandCallback$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ExternalActionManager$CommandCallback$2", null, org.eclipse.core.commands.ICommandListener);
Clazz.overrideMethod (c$, "commandChanged", 
function (commandEvent) {
if (this.f$.command.isDefined ()) {
this.f$.command.removeCommandListener (this);
this.b$["org.eclipse.jface.action.ExternalActionManager.CommandCallback"].loggedCommandIds.remove (this.f$.commandId);
}}, "org.eclipse.core.commands.CommandEvent");
c$ = Clazz.p0p ();
};
c$.RESOURCE_BUNDLE = c$.prototype.RESOURCE_BUNDLE = java.util.ResourceBundle.getBundle (org.eclipse.jface.action.ExternalActionManager.getName ());
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"instance", null);
});
