package com.intel.ide.eclipse.mpt.wizards.convert;

import java.util.ArrayList;
import java.util.Collections;

import org.eclipse.jface.viewers.ListViewer;
import org.eclipse.jface.wizard.IWizardPage;
import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.FormAttachment;
import org.eclipse.swt.layout.FormData;
import org.eclipse.swt.layout.FormLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.List;


/**
 * Page for listing partial conversion info
 * 
 */
public class PartialConversionInfoPage extends WizardPage {
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
