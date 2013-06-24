package com.intel.ide.eclipse.mpt.wizards.convert;

import java.awt.Desktop;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jface.viewers.ListViewer;
import org.eclipse.jface.wizard.IWizardPage;
import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.FormAttachment;
import org.eclipse.swt.layout.FormData;
import org.eclipse.swt.layout.FormLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.List;


/**
 * Page for listing partial conversion info
 * 
 */
public class PartialConversionInfoPage extends WizardPage{
	private ArrayList<String> stubClassInfo = null;
	private ArrayList<String> stubMethodInfo = null;
	
	private static final int infoCompositeWidth = 550;
	private static final int infoCompositeHeight = 100;	
	private static final int formOffset = 10;	
	
	private static final String[] listName = {
		"Stub classes:",
		"Stub methods:"
	};	
	
	protected PartialConversionInfoPage() {
		super("PartialConversionInfo");
		this.setTitle("Conversion Report");
		this.setDescription("Stub classes or methods added automatically");
		
		this.stubClassInfo = new ArrayList<String>();
		this.stubMethodInfo = new ArrayList<String>();
	}
	
	@Override
	public IWizardPage getPreviousPage(){
		return null;	//disable "Back" button
	}

	@Override
	public void createControl(Composite parent) {
		Composite composite = new Composite(parent, SWT.NONE);
		composite.setLayout(new FormLayout());
		composite.setLayoutData(new FormData());
		
		this.createComponent(composite);
        this.setPageComplete(false);
        this.setControl(composite);
        
        ConvertWizardDialog dialog = ((ConvertWizards)this.getWizard()).getWizardDialog();
        dialog.enableCancel(false);
	}
	
	@Override
	public void dispose(){
		super.dispose();
		setControl(null);
	}

	private void createComponent(Composite composite){
		Composite stubClassInfoComp = new Composite(composite, SWT.NONE);
		Composite stubMethodInfoComp = new Composite(composite, SWT.NONE);
		stubClassInfoComp.setLayout(new FormLayout());
		stubMethodInfoComp.setLayout(new FormLayout());
		
		if (!this.stubClassInfo.isEmpty() || !this.stubMethodInfo.isEmpty()){
			this.setMessage("Stub information shows below. All stub classes and methods shall be implemented manually.");
			stubClassInfoComp.setBounds(0, 0, infoCompositeWidth, infoCompositeHeight);
			this.createInfoComponent(stubClassInfoComp, new FormAttachment(), 0);
			
			stubMethodInfoComp.setBounds(0, 0, infoCompositeWidth, infoCompositeHeight);
			FormData formData = new FormData();
			formData.top = new FormAttachment(stubClassInfoComp, formOffset);
			stubMethodInfoComp.setLayoutData(formData);
			this.createInfoComponent(stubMethodInfoComp, formData.top, 1);
			
			final Button btnShowReport = new Button(composite, SWT.BUTTON1);
			FormData btnData = new FormData();
			btnData.top = new FormAttachment(stubMethodInfoComp, formOffset);
			btnShowReport.setLayoutData(btnData);
			btnShowReport.setText("View Report");
			final IProject project = ((ConvertWizards)this.getWizard()).getProject();
			btnShowReport.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(SelectionEvent e) {
					IPath filePath = project.getLocation().append(project.getName() + "-ConversionReport.html");
					File outputFile = filePath.toFile();
					try {
						outputFile.createNewFile();
						
						String content = "<h1 align=\"center\">Report of Partial Conversion</h1><p align=\"justify\"><span style=\"font-size:18px;\">Several stub classes or methods are generated. All stub classes and methods shall be implemented manually.</span></p><p>&nbsp;</p>";
						if (!stubClassInfo.isEmpty()){
							content += "<p\"><span style=\"font-size:18px;\">Stub classes:</span></p><table style=\"width:100%;\" border=\"2\" cellspacing=\"0\" bordercolor=\"#000000\" cellpadding=\"2\"><tbody>";
									
							Object[] stubClasses = stubClassInfo.toArray();
							for (int i = 0;i < stubClasses.length;i ++){
								content += "<tr><td>&nbsp;" + stubClasses[i].toString() + "</td></tr>";
							}
							content += "</tbody></table><p>&nbsp;</p>";
						}
						if (!stubMethodInfo.isEmpty()){
							content += "<p><span style=\"font-size:18px;\">Stub methods:</span><table style=\"width:100%;\" border=\"2\" cellspacing=\"0\" bordercolor=\"#000000\" cellpadding=\"2\"><tbody>";
							
							Object[] stubMethods = stubMethodInfo.toArray();
							for (int i = 0;i < stubMethods.length;i ++){
								content += "<tr><td>&nbsp;" + stubMethods[i].toString() + "</td></tr>";
							}
							content += "</tbody></table><p>&nbsp;</p>";
						}
						
						FileWriter fw = new FileWriter(outputFile);
						fw.write(content);
						fw.flush();fw.close();
						
						URI uri = outputFile.toURI();
						Desktop.getDesktop().browse(uri);
					} catch (IOException e1) {
						e1.printStackTrace();
					}
				}
			});
		}
		else {
			this.setMessage("No stub classes or methods created.");
		}
	}
	
	private void createInfoComponent(Composite composite, FormAttachment top, int flag){
		Label infoLabel = new Label(composite, SWT.WRAP);
		FormData labelData = new FormData();
		labelData.top = top;
		infoLabel.setText(listName[flag]);
		infoLabel.setLayoutData(labelData);
		
		ListViewer infoListViewer = new ListViewer(composite, SWT.FULL_SELECTION | SWT.BORDER|SWT.V_SCROLL|SWT.H_SCROLL);
		List list = infoListViewer.getList();
		FormData listData = new FormData();
		listData.top = new FormAttachment(infoLabel, 0);
		listData.width = composite.getBounds().width;
		listData.height = composite.getBounds().height - infoLabel.getBounds().height;
		list.setLayoutData(listData);
		switch (flag){
			case 0:
				Collections.sort(stubClassInfo);
				infoListViewer.add(stubClassInfo.toArray());break;
			case 1:
				Collections.sort(stubMethodInfo);
				infoListViewer.add(stubMethodInfo.toArray());break;
			default:
				break;	
		}
	}
	
	public void addStubClassInfo(ArrayList<String> info){
		if (info == null || info.size() <= 0){
			return;
		}
		this.stubClassInfo.addAll(info);
	}
	
	public void addStubMethodInfo(ArrayList<String> info){
		if (info == null || info.size() <= 0){
			return;
		}
		this.stubMethodInfo.addAll(info);
	}
}
