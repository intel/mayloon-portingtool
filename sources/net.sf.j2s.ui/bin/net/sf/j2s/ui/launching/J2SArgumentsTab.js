Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.jdt.debug.ui.launchConfigurations.JavaLaunchTab"], "net.sf.j2s.ui.launching.J2SArgumentsTab", ["org.eclipse.debug.ui.StringVariableSelectionDialog", "org.eclipse.jdt.internal.debug.ui.IJavaDebugHelpContextIds", "$.JDIDebugUIPlugin", "$.JavaDebugImages", "org.eclipse.jdt.internal.debug.ui.actions.ControlAccessibleListener", "org.eclipse.jdt.internal.debug.ui.launcher.JavaWorkingDirectoryBlock", "$.LauncherMessages", "org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants", "$wt.events.ModifyListener", "$.SelectionAdapter", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite", "$.Group", "$.Text", "org.eclipse.ui.PlatformUI"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fPrgmArgumentsLabel = null;
this.fPrgmArgumentsText = null;
this.fWorkingDirectoryBlock = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.launching, "J2SArgumentsTab", org.eclipse.jdt.debug.ui.launchConfigurations.JavaLaunchTab);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.ui.launching.J2SArgumentsTab, []);
this.fWorkingDirectoryBlock = this.createWorkingDirBlock ();
});
Clazz.defineMethod (c$, "createWorkingDirBlock", 
function () {
return  new org.eclipse.jdt.internal.debug.ui.launcher.JavaWorkingDirectoryBlock ();
});
Clazz.overrideMethod (c$, "createControl", 
function (parent) {
var font = parent.getFont ();
var comp =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout (1, true);
comp.setLayout (layout);
comp.setFont (font);
var gd =  new $wt.layout.GridData (1808);
comp.setLayoutData (gd);
this.setControl (comp);
this.setHelpContextId ();
var group =  new $wt.widgets.Group (comp, 0);
group.setFont (font);
layout =  new $wt.layout.GridLayout ();
group.setLayout (layout);
group.setLayoutData ( new $wt.layout.GridData (1808));
var controlName = (org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages.JavaArgumentsTab__Program_arguments__5);
group.setText (controlName);
this.fPrgmArgumentsText =  new $wt.widgets.Text (group, 2626);
gd =  new $wt.layout.GridData (1808);
gd.heightHint = 40;
gd.widthHint = 100;
this.fPrgmArgumentsText.setLayoutData (gd);
this.fPrgmArgumentsText.setFont (font);
this.fPrgmArgumentsText.addModifyListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SArgumentsTab$1") ? 0 : net.sf.j2s.ui.launching.J2SArgumentsTab.$J2SArgumentsTab$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SArgumentsTab$1, this, null)));
org.eclipse.jdt.internal.debug.ui.actions.ControlAccessibleListener.addListener (this.fPrgmArgumentsText, group.getText ());
var buttonLabel = org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages.JavaArgumentsTab_5;
var pgrmArgVariableButton = this.createPushButton (group, buttonLabel, null);
pgrmArgVariableButton.setLayoutData ( new $wt.layout.GridData (128));
pgrmArgVariableButton.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SArgumentsTab$2") ? 0 : net.sf.j2s.ui.launching.J2SArgumentsTab.$J2SArgumentsTab$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SArgumentsTab$2, this, null)));
this.fWorkingDirectoryBlock.createControl (comp);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "setHelpContextId", 
function () {
org.eclipse.ui.PlatformUI.getWorkbench ().getHelpSystem ().setHelp (this.getControl (), org.eclipse.jdt.internal.debug.ui.IJavaDebugHelpContextIds.LAUNCH_CONFIGURATION_DIALOG_ARGUMENTS_TAB);
});
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.overrideMethod (c$, "isValid", 
function (config) {
return this.fWorkingDirectoryBlock.isValid (config);
}, "org.eclipse.debug.core.ILaunchConfiguration");
Clazz.overrideMethod (c$, "setDefaults", 
function (config) {
config.setAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, Clazz.castNullAs ("String"));
this.fWorkingDirectoryBlock.setDefaults (config);
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.overrideMethod (c$, "initializeFrom", 
function (configuration) {
try {
this.fPrgmArgumentsText.setText (configuration.getAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, ""));
this.fWorkingDirectoryBlock.initializeFrom (configuration);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
this.setErrorMessage (org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages.JavaArgumentsTab_Exception_occurred_reading_configuration___15 + e.getStatus ().getMessage ());
org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin.log (e);
} else {
throw e;
}
}
}, "org.eclipse.debug.core.ILaunchConfiguration");
Clazz.overrideMethod (c$, "performApply", 
function (configuration) {
configuration.setAttribute (org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, this.getAttributeValueFrom (this.fPrgmArgumentsText));
this.fWorkingDirectoryBlock.performApply (configuration);
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.defineMethod (c$, "getAttributeValueFrom", 
function (text) {
var content = text.getText ().trim ();
if (content.length > 0) {
return content;
}return null;
}, "$wt.widgets.Text");
Clazz.overrideMethod (c$, "getName", 
function () {
return org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages.JavaArgumentsTab__Arguments_16;
});
Clazz.defineMethod (c$, "setLaunchConfigurationDialog", 
function (dialog) {
Clazz.superCall (this, net.sf.j2s.ui.launching.J2SArgumentsTab, "setLaunchConfigurationDialog", [dialog]);
this.fWorkingDirectoryBlock.setLaunchConfigurationDialog (dialog);
}, "org.eclipse.debug.ui.ILaunchConfigurationDialog");
Clazz.defineMethod (c$, "getErrorMessage", 
function () {
var m = Clazz.superCall (this, net.sf.j2s.ui.launching.J2SArgumentsTab, "getErrorMessage", []);
if (m == null) {
return this.fWorkingDirectoryBlock.getErrorMessage ();
}return m;
});
Clazz.defineMethod (c$, "getMessage", 
function () {
var m = Clazz.superCall (this, net.sf.j2s.ui.launching.J2SArgumentsTab, "getMessage", []);
if (m == null) {
return this.fWorkingDirectoryBlock.getMessage ();
}return m;
});
Clazz.overrideMethod (c$, "getImage", 
function () {
return org.eclipse.jdt.internal.debug.ui.JavaDebugImages.get ("IMG_VIEW_ARGUMENTS_TAB");
});
Clazz.overrideMethod (c$, "getId", 
function () {
return "org.eclipse.jdt.debug.ui.javaArgumentsTab";
});
Clazz.overrideMethod (c$, "activated", 
function (workingCopy) {
this.fWorkingDirectoryBlock.initializeFrom (workingCopy);
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.overrideMethod (c$, "deactivated", 
function (workingCopy) {
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
c$.$J2SArgumentsTab$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SArgumentsTab$1", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (evt) {
this.b$["net.sf.j2s.ui.launching.J2SArgumentsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
};
c$.$J2SArgumentsTab$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SArgumentsTab$2", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var dialog =  new org.eclipse.debug.ui.StringVariableSelectionDialog (this.b$["net.sf.j2s.ui.launching.J2SArgumentsTab"].getShell ());
net.sf.j2s.ajax.AWindowDelegate.asyncOpen (dialog, this, function () {
dialog.getReturnCode ();
var variable = dialog.getVariableExpression ();
if (variable != null) {
this.b$["net.sf.j2s.ui.launching.J2SArgumentsTab"].fPrgmArgumentsText.insert (variable);
}});
return;
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"EMPTY_STRING", "");
});
