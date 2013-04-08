Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["org.eclipse.debug.ui.AbstractLaunchConfigurationTab"], "net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab", ["$wt.events.ModifyListener", "$.SelectionAdapter", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Button", "$.Composite", "$.Label", "$.Text", "org.eclipse.ui.PlatformUI"], function () {
c$ = Clazz.decorateAsClass (function () {
this.btnUseXHTML = null;
this.headHeaderText = null;
this.tailHeaderText = null;
this.headBodyText = null;
this.tailBodyText = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.launching, "J2SGenerateHTMLOptionsTab", org.eclipse.debug.ui.AbstractLaunchConfigurationTab);
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
this.btnUseXHTML =  new $wt.widgets.Button (comp, 32);
this.btnUseXHTML.setText ("Use XHTML Header");
this.btnUseXHTML.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$1") ? 0 : net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab.$J2SGenerateHTMLOptionsTab$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$1, this, null)));
var separator =  new $wt.widgets.Label (comp, 258);
var gridData =  new $wt.layout.GridData ();
gridData.horizontalAlignment = 4;
gridData.grabExcessHorizontalSpace = true;
separator.setLayoutData (gridData);
 new $wt.widgets.Label (comp, 0).setText ("Header of Header:");
this.headHeaderText =  new $wt.widgets.Text (comp, 2626);
gd =  new $wt.layout.GridData (1808);
gd.heightHint = 40;
gd.widthHint = 100;
this.headHeaderText.setLayoutData (gd);
this.headHeaderText.setFont (font);
this.headHeaderText.addModifyListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$2") ? 0 : net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab.$J2SGenerateHTMLOptionsTab$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$2, this, null)));
 new $wt.widgets.Label (comp, 0).setText ("Tail of Header:");
this.tailHeaderText =  new $wt.widgets.Text (comp, 2626);
gd =  new $wt.layout.GridData (1808);
gd.heightHint = 40;
gd.widthHint = 100;
this.tailHeaderText.setLayoutData (gd);
this.tailHeaderText.setFont (font);
this.tailHeaderText.addModifyListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$3") ? 0 : net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab.$J2SGenerateHTMLOptionsTab$3$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$3, this, null)));
separator =  new $wt.widgets.Label (comp, 258);
gridData =  new $wt.layout.GridData ();
gridData.horizontalAlignment = 4;
gridData.grabExcessHorizontalSpace = true;
separator.setLayoutData (gridData);
 new $wt.widgets.Label (comp, 0).setText ("Header of Body:");
this.headBodyText =  new $wt.widgets.Text (comp, 2626);
gd =  new $wt.layout.GridData (1808);
gd.heightHint = 40;
gd.widthHint = 100;
this.headBodyText.setLayoutData (gd);
this.headBodyText.setFont (font);
this.headBodyText.addModifyListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$4") ? 0 : net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab.$J2SGenerateHTMLOptionsTab$4$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$4, this, null)));
 new $wt.widgets.Label (comp, 0).setText ("Tail of Body:");
this.tailBodyText =  new $wt.widgets.Text (comp, 2626);
gd =  new $wt.layout.GridData (1808);
gd.heightHint = 40;
gd.widthHint = 100;
this.tailBodyText.setLayoutData (gd);
this.tailBodyText.setFont (font);
this.tailBodyText.addModifyListener (((Clazz.isClassDefined ("net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$5") ? 0 : net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab.$J2SGenerateHTMLOptionsTab$5$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab$5, this, null)));
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "setDefaults", 
function (configuration) {
configuration.setAttribute ("use.xhtml.header", true);
configuration.setAttribute ("head.header.html", Clazz.castNullAs ("String"));
configuration.setAttribute ("tail.header.html", Clazz.castNullAs ("String"));
configuration.setAttribute ("head.body.html", Clazz.castNullAs ("String"));
configuration.setAttribute ("tail.body.html", Clazz.castNullAs ("String"));
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.overrideMethod (c$, "initializeFrom", 
function (configuration) {
try {
this.btnUseXHTML.setSelection (configuration.getAttribute ("use.xhtml.header", true));
this.headHeaderText.setText (configuration.getAttribute ("head.header.html", ""));
this.tailHeaderText.setText (configuration.getAttribute ("tail.header.html", ""));
this.headBodyText.setText (configuration.getAttribute ("head.body.html", ""));
this.tailBodyText.setText (configuration.getAttribute ("tail.body.html", ""));
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, "org.eclipse.debug.core.ILaunchConfiguration");
Clazz.overrideMethod (c$, "performApply", 
function (configuration) {
configuration.setAttribute ("use.xhtml.header", this.btnUseXHTML.getSelection ());
configuration.setAttribute ("head.header.html", this.getAttributeValueFrom (this.headHeaderText));
configuration.setAttribute ("tail.header.html", this.getAttributeValueFrom (this.tailHeaderText));
configuration.setAttribute ("head.body.html", this.getAttributeValueFrom (this.headBodyText));
configuration.setAttribute ("tail.body.html", this.getAttributeValueFrom (this.tailBodyText));
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
return "HTML";
});
Clazz.overrideMethod (c$, "getImage", 
function () {
return net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab.getClasspathImage ();
});
c$.getClasspathImage = Clazz.defineMethod (c$, "getClasspathImage", 
function () {
return org.eclipse.ui.PlatformUI.getWorkbench ().getSharedImages ().getImage ("IMG_OBJ_FILE");
});
Clazz.overrideMethod (c$, "activated", 
function (workingCopy) {
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
Clazz.overrideMethod (c$, "deactivated", 
function (workingCopy) {
}, "org.eclipse.debug.core.ILaunchConfigurationWorkingCopy");
c$.$J2SGenerateHTMLOptionsTab$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SGenerateHTMLOptionsTab$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SGenerateHTMLOptionsTab$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SGenerateHTMLOptionsTab$2", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (evt) {
this.b$["net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
};
c$.$J2SGenerateHTMLOptionsTab$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SGenerateHTMLOptionsTab$3", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (evt) {
this.b$["net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
};
c$.$J2SGenerateHTMLOptionsTab$4$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SGenerateHTMLOptionsTab$4", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (evt) {
this.b$["net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
};
c$.$J2SGenerateHTMLOptionsTab$5$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.launching, "J2SGenerateHTMLOptionsTab$5", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (evt) {
this.b$["net.sf.j2s.ui.launching.J2SGenerateHTMLOptionsTab"].updateLaunchConfigurationDialog ();
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
};
});
