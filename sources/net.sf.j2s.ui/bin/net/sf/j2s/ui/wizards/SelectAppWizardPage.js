Clazz.declarePackage ("net.sf.j2s.ui.wizards");
Clazz.load (["org.eclipse.jface.wizard.WizardPage"], "net.sf.j2s.ui.wizards.SelectAppWizardPage", ["$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite"], function () {
c$ = Clazz.declareType (net.sf.j2s.ui.wizards, "SelectAppWizardPage", org.eclipse.jface.wizard.WizardPage);
Clazz.overrideMethod (c$, "createControl", 
function (parent) {
var composite =  new $wt.widgets.Composite (parent, 0);
composite.setLayout ( new $wt.layout.GridLayout ());
composite.setLayoutData ( new $wt.layout.GridData (1808));
this.setControl (composite);
}, "$wt.widgets.Composite");
});
