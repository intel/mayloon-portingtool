Clazz.declarePackage ("net.sf.j2s.ui.console");
Clazz.load (["org.eclipse.ui.part.ViewPart"], "net.sf.j2s.ui.console.J2SConsoleView", ["java.io.File", "java.net.URL", "net.sf.j2s.ui.Java2ScriptUIPlugin", "net.sf.j2s.ui.console.J2SViewImages", "org.eclipse.jface.action.Action", "$.IMenuListener", "$.MenuManager", "$.Separator", "$wt.browser.Browser", "$.LocationAdapter", "$wt.events.KeyAdapter", "$.SelectionAdapter", "$wt.layout.GridData", "$.GridLayout", "$wt.program.Program", "$wt.widgets.Button", "$.Composite", "$.Label", "$.Text", "org.eclipse.ui.PlatformUI"], function () {
c$ = Clazz.decorateAsClass (function () {
this.browser = null;
this.actionReload = null;
this.actionStop = null;
this.actionForward = null;
this.actionBack = null;
this.showAddressBarAction = null;
this.showAddressBar = false;
this.lastURL = null;
this.urlText = null;
this.fDialogSettings = null;
this.addressBar = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.console, "J2SConsoleView", org.eclipse.ui.part.ViewPart);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.ui.console.J2SConsoleView, []);
this.fDialogSettings = net.sf.j2s.ui.Java2ScriptUIPlugin.getDefault ().getDialogSettings ();
this.showAddressBar = !this.fDialogSettings.getBoolean ("show.console.address.bar");
this.lastURL = this.fDialogSettings.get ("last.j2s.application.url");
});
Clazz.overrideMethod (c$, "createPartControl", 
function (parent) {
var outerComposite =  new $wt.widgets.Composite (parent, 0);
var gridLayout =  new $wt.layout.GridLayout ();
gridLayout.marginWidth = 0;
gridLayout.marginHeight = 0;
gridLayout.verticalSpacing = 2;
gridLayout.numColumns = 1;
outerComposite.setLayout (gridLayout);
outerComposite.setLayoutData ( new $wt.layout.GridData (1808));
this.addressBar =  new $wt.widgets.Composite (outerComposite, 0);
gridLayout =  new $wt.layout.GridLayout ();
gridLayout.marginWidth = 0;
gridLayout.marginHeight = 0;
gridLayout.verticalSpacing = 2;
gridLayout.numColumns = 4;
this.addressBar.setLayout (gridLayout);
var gridData =  new $wt.layout.GridData (768);
gridData.exclude = !this.showAddressBar;
this.addressBar.setLayoutData (gridData);
var urlLabel =  new $wt.widgets.Label (this.addressBar, 0);
var gd =  new $wt.layout.GridData ();
gd.exclude = true;
urlLabel.setLayoutData (gd);
urlLabel.setText ("URL:");
if (this.lastURL == null || this.lastURL.length == 0) {
urlLabel.setEnabled (false);
}var copyURLButton =  new $wt.widgets.Button (this.addressBar, 8);
if (this.lastURL == null || this.lastURL.length == 0) {
copyURLButton.setEnabled (false);
}copyURLButton.setText ("[Copy] URL");
copyURLButton.setToolTipText ("Copy URL into clipboard");
copyURLButton.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$1") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$1$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$1, this, null)));
this.urlText =  new $wt.widgets.Text (this.addressBar, 2048);
this.urlText.setLayoutData ( new $wt.layout.GridData (768));
if (this.lastURL == null || this.lastURL.length == 0) {
this.urlText.setEnabled (false);
} else {
this.urlText.setText (this.lastURL);
}this.urlText.addKeyListener (((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$2") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$2$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$2, this, null)));
var runButton =  new $wt.widgets.Button (this.addressBar, 8);
if (this.lastURL == null || this.lastURL.length == 0) {
runButton.setEnabled (false);
}runButton.setText ("Run");
runButton.setToolTipText ("Run J2S application in the below embedded browser");
runButton.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$3") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$3$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$3, this, null)));
var browserButton =  new $wt.widgets.Button (this.addressBar, 8);
if (this.lastURL == null || this.lastURL.length == 0) {
browserButton.setEnabled (false);
}browserButton.setText ("Run in External Browser");
browserButton.setToolTipText ("Lauch the URL in standalone browser");
browserButton.addSelectionListener (((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$4") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$4$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$4, this, null)));
this.addressBar.setVisible (this.showAddressBar);
this.browser =  new $wt.browser.Browser (outerComposite, 0);
gridData =  new $wt.layout.GridData (1808);
this.browser.setLayoutData (gridData);
this.makeActions ();
this.contributeToActionBars ();
this.browser.addLocationListener (((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$5") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$5$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$5, this, Clazz.cloneFinals ("urlLabel", urlLabel, "copyURLButton", copyURLButton, "runButton", runButton, "browserButton", browserButton))));
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "contributeToActionBars", 
($fz = function () {
var bars = this.getViewSite ().getActionBars ();
this.fillLocalPullDown (bars.getMenuManager ());
this.fillLocalToolBar (bars.getToolBarManager ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "fillLocalPullDown", 
($fz = function (manager) {
manager.add (this.actionReload);
manager.add ( new org.eclipse.jface.action.Separator ());
manager.add (this.showAddressBarAction);
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IMenuManager");
Clazz.defineMethod (c$, "fillContextMenu", 
($fz = function (manager) {
manager.add (this.actionReload);
manager.add ( new org.eclipse.jface.action.Separator ("additions"));
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IMenuManager");
Clazz.defineMethod (c$, "fillLocalToolBar", 
($fz = function (manager) {
manager.add (this.actionBack);
manager.add (this.actionForward);
manager.add (this.actionReload);
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IToolBarManager");
Clazz.defineMethod (c$, "makeActions", 
($fz = function () {
this.actionBack = ((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$7") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$7$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$7, this, null));
this.actionBack.setText ("Back");
this.actionBack.setToolTipText ("Go back to former J2S application");
this.actionBack.setImageDescriptor (org.eclipse.ui.PlatformUI.getWorkbench ().getSharedImages ().getImageDescriptor ("IMG_TOOL_BACK"));
this.actionBack.setEnabled (false);
this.actionForward = ((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$8") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$8$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$8, this, null));
this.actionForward.setText ("Forward");
this.actionForward.setToolTipText ("Go forward to next J2S application");
this.actionForward.setImageDescriptor (org.eclipse.ui.PlatformUI.getWorkbench ().getSharedImages ().getImageDescriptor ("IMG_TOOL_FORWARD"));
this.actionForward.setEnabled (false);
this.actionReload = ((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$9") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$9$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$9, this, null));
this.actionReload.setText ("History");
this.actionReload.setToolTipText ("Load Last J2S Application");
if (this.lastURL == null || this.lastURL.length == 0) {
this.actionReload.setEnabled (false);
}net.sf.j2s.ui.console.J2SViewImages.setImageDescriptors (this.actionReload, "refresh_nav.gif");
this.actionStop = ((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$10") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$10$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$10, this, null));
this.actionStop.setText ("Stop");
this.actionStop.setToolTipText ("Stop loading the rest");
this.actionStop.setImageDescriptor (org.eclipse.ui.PlatformUI.getWorkbench ().getSharedImages ().getImageDescriptor ("IMG_TOOL_DELETE"));
this.showAddressBarAction = ((Clazz.isClassDefined ("net.sf.j2s.ui.console.J2SConsoleView$11") ? 0 : net.sf.j2s.ui.console.J2SConsoleView.$J2SConsoleView$11$ ()), Clazz.innerTypeInstance (net.sf.j2s.ui.console.J2SConsoleView$11, this, null, "Show/Hide Address Bar", 2));
this.showAddressBarAction.setChecked (this.showAddressBar);
this.showAddressBarAction.setToolTipText ("Show or hide the address bar");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "performAddressBarAction", 
function () {
this.showAddressBar = this.showAddressBarAction.isChecked ();
this.fDialogSettings.put ("show.console.address.bar", !this.showAddressBar);
this.addressBar.setVisible (this.showAddressBar);
var gridData =  new $wt.layout.GridData (768);
gridData.exclude = !this.showAddressBar;
this.addressBar.setLayoutData (gridData);
this.addressBar.getParent ().layout (true);
});
Clazz.overrideMethod (c$, "setFocus", 
function () {
this.browser.setFocus ();
});
Clazz.defineMethod (c$, "browse", 
function (url) {
if (this.lastURL != null) {
this.actionReload.setText ("Reload");
this.actionReload.setToolTipText ("Refresh current J2S application");
this.browser.setUrl (url);
this.lastURL = null;
} else {
this.browser.setUrl (url);
this.fDialogSettings.put ("last.j2s.application.url", url);
}}, "~S");
Clazz.defineMethod (c$, "load", 
function (html) {
this.browser.setText (html);
}, "~S");
c$.$J2SConsoleView$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].urlText.selectAll ();
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].urlText.copy ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleView$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$2", $wt.events.KeyAdapter);
Clazz.overrideMethod (c$, "keyPressed", 
function (e) {
if ((e.character).charCodeAt (0) == ('\r').charCodeAt (0) || (e.character).charCodeAt (0) == ('\n').charCodeAt (0)) {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browse (this.b$["net.sf.j2s.ui.console.J2SConsoleView"].urlText.getText ());
}}, "$wt.events.KeyEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleView$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$3", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browse (this.b$["net.sf.j2s.ui.console.J2SConsoleView"].urlText.getText ());
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleView$4$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$4", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var url = this.b$["net.sf.j2s.ui.console.J2SConsoleView"].urlText.getText ();
if (url != null && url.length != 0) {
try {
var file =  new java.net.URL (url).getFile ();
var win32 = ((System.getProperty ("os.name").indexOf ("Windows") != -1) || (System.getProperty ("os.name").indexOf ("windows") != -1));
if (win32 && file.startsWith ("/")) {
file = file.substring (1);
}file = file.$replace ('/', java.io.File.separatorChar);
$wt.program.Program.launch (file);
} catch (e1) {
if (Clazz.instanceOf (e1, java.net.MalformedURLException)) {
e1.printStackTrace ();
} else {
throw e1;
}
}
}}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleView$5$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$5", $wt.browser.LocationAdapter);
Clazz.overrideMethod (c$, "changed", 
function (event) {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].actionBack.setEnabled (this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browser.isBackEnabled ());
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].actionForward.setEnabled (this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browser.isForwardEnabled ());
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].actionReload.setEnabled (true);
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].urlText.setText (this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browser.getUrl ());
this.f$.urlLabel.setEnabled (true);
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].urlText.setEnabled (true);
this.f$.copyURLButton.setEnabled (true);
this.f$.runButton.setEnabled (true);
this.f$.browserButton.setEnabled (true);
}, "$wt.browser.LocationEvent");
c$ = Clazz.p0p ();
};
c$.$J2SConsoleView$7$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$7", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browser.back ();
});
c$ = Clazz.p0p ();
};
c$.$J2SConsoleView$8$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$8", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browser.forward ();
});
c$ = Clazz.p0p ();
};
c$.$J2SConsoleView$9$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$9", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
if (this.b$["net.sf.j2s.ui.console.J2SConsoleView"].lastURL != null && this.b$["net.sf.j2s.ui.console.J2SConsoleView"].lastURL.length != 0) {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browse (this.b$["net.sf.j2s.ui.console.J2SConsoleView"].lastURL);
} else {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browser.refresh ();
}});
c$ = Clazz.p0p ();
};
c$.$J2SConsoleView$10$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$10", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].browser.stop ();
});
c$ = Clazz.p0p ();
};
c$.$J2SConsoleView$11$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (net.sf.j2s.ui.console, "J2SConsoleView$11", org.eclipse.jface.action.Action);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["net.sf.j2s.ui.console.J2SConsoleView"].performAddressBarAction ();
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"SHOW_CONSOLE_ADDRESS_BAR", "show.console.address.bar",
"LAST_J2S_APPICATION_URL", "last.j2s.application.url");
});
