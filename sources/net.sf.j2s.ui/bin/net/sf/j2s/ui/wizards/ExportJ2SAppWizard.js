Clazz.declarePackage ("net.sf.j2s.ui.wizards");
Clazz.load (["org.eclipse.jface.wizard.Wizard", "org.eclipse.ui.IExportWizard"], "net.sf.j2s.ui.wizards.ExportJ2SAppWizard", ["net.sf.j2s.ui.wizards.SelectAppWizardPage"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selection = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.ui.wizards, "ExportJ2SAppWizard", org.eclipse.jface.wizard.Wizard, org.eclipse.ui.IExportWizard);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, net.sf.j2s.ui.wizards.ExportJ2SAppWizard);
this.addPage ( new net.sf.j2s.ui.wizards.SelectAppWizardPage ("Select Application"));
});
Clazz.overrideMethod (c$, "performFinish", 
function () {
return false;
});
Clazz.overrideMethod (c$, "init", 
function (workbench, selection) {
this.selection = selection;
this.setWindowTitle ("Java2Script Export");
}, "org.eclipse.ui.IWorkbench,org.eclipse.jface.viewers.IStructuredSelection");
});
