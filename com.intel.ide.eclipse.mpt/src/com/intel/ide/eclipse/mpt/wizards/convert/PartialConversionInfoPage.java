package com.intel.ide.eclipse.mpt.wizards.convert;

import java.awt.Desktop;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map.Entry;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jface.viewers.IContentProvider;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.viewers.ILabelProviderListener;
import org.eclipse.jface.viewers.ITreeContentProvider;
import org.eclipse.jface.viewers.ListViewer;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.jface.wizard.IWizardPage;
import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.FormAttachment;
import org.eclipse.swt.layout.FormData;
import org.eclipse.swt.layout.FormLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.List;
import org.eclipse.swt.widgets.Tree;


/**
 * Page for listing partial conversion info
 * 
 */
public class PartialConversionInfoPage extends WizardPage{
	private ArrayList<String> stubMethodInfo = null;
	private HashMap<String, HashMap<String, ArrayList<String>>> stubClassInfo = null;
	
	private static final int infoCompositeWidth = 550;
	private static final int infoCompositeHeight = 100;	
	private static final int formOffset = 10;	
	
	private static final String[] listName = {
		"Stub classes (Click the label to see the details):",
		"Stub methods:"
	};	
	
	protected PartialConversionInfoPage() {
		super("PartialConversionInfo");
		this.setTitle("Conversion Report");
		this.setDescription("Stub classes or methods added automatically");
		
		this.stubMethodInfo = new ArrayList<String>();
		this.stubClassInfo = new HashMap<String, HashMap<String,ArrayList<String>>>();
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
			this.createStubClassInfoComponent(stubClassInfoComp);
			
			stubMethodInfoComp.setBounds(0, 0, infoCompositeWidth, infoCompositeHeight);
			FormData formData = new FormData();
			formData.top = new FormAttachment(stubClassInfoComp, formOffset);
			stubMethodInfoComp.setLayoutData(formData);
			this.createStubMethodInfoComponent(stubMethodInfoComp, formData.top);
			
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
							for(String className : stubClassInfo.keySet()){
							    content += "<tr><td>&nbsp;" + className + "<br>";
							    HashMap<String, ArrayList<String>> infoMap = stubClassInfo.get(className);
							    if(infoMap == null){
							        continue;
							    }
							    for(String type : infoMap.keySet()){
							        content += "&emsp;&emsp;" + type + "<br>";
							        ArrayList<String> infoList = infoMap.get(type);
							        if(infoList == null){
							            continue;
							        }
							        for(String info : infoList){
							            content += "&emsp;&emsp;&emsp;&emsp;" + info + "<br>";
							        }
							    }
							    content += "</td></tr>";
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
	
	private void createStubClassInfoComponent(Composite composite){
		Label infoLabel = new Label(composite, SWT.WRAP);
		FormData labelData = new FormData();
		labelData.top = new FormAttachment();
		infoLabel.setText(listName[0]);
		infoLabel.setLayoutData(labelData);
		
		TreeViewer infoTreeViewer = new TreeViewer(composite);
		Tree tree = infoTreeViewer.getTree();
		FormData treeData = new FormData();
		treeData.top = new FormAttachment(infoLabel, 0);
		treeData.width = composite.getBounds().width;
		treeData.height = composite.getBounds().height - infoLabel.getBounds().height;
		tree.setLayoutData(treeData);
		
		infoTreeViewer.setContentProvider(new ITreeContentProvider() {
		    
			@Override
			public Object[] getElements(Object inputElement) {
				if(inputElement instanceof HashMap<?,?>){
					HashMap elementMap = (HashMap) inputElement;
					return elementMap.entrySet() == null ? null :elementMap.entrySet().toArray();
				}
				return null;
			}
			
			@Override
			public Object[] getChildren(Object parentElement) {
				if(parentElement instanceof Entry<?, ?>){
					Entry parentElementEntry = (Entry) parentElement;
					Object childrenElement = parentElementEntry.getValue();
					if(childrenElement instanceof HashMap<?, ?>){
						HashMap childrenElementMap = (HashMap) childrenElement;
						return childrenElementMap.entrySet() == null ? null :childrenElementMap.entrySet().toArray();
					}else if(childrenElement instanceof ArrayList<?>){
						ArrayList childrenElementList = (ArrayList)childrenElement;
						return childrenElementList.toArray();
					}
				}
				return null;
			}
			
			@Override
			public boolean hasChildren(Object element) {
				if(element instanceof Entry<?, ?>){
					Entry elementEntry = (Entry) element;
					return elementEntry.getValue() == null ? false : true;
				}
				return false;
			}
			
			@Override
			public void inputChanged(Viewer viewer, Object oldInput, Object newInput) {
			}
			@Override
			public void dispose() {
			}
			@Override
			public Object getParent(Object element) {
				return null;
			}
		});
		
		infoTreeViewer.setLabelProvider(new ILabelProvider() {
			@Override
			public String getText(Object element) {
				if(element instanceof Entry<?, ?>){
					Entry<?, ?> elementEntry = (Entry)element;
					return (String)elementEntry.getKey();
				}else if(element instanceof String){
					return (String) element;
				}
				return null;
			}
			
			@Override
			public void removeListener(ILabelProviderListener listener) {
			}
			@Override
			public boolean isLabelProperty(Object element, String property) {
				return false;
			}
			@Override
			public void dispose() {
			}
			@Override
			public void addListener(ILabelProviderListener listener) {
			}
			@Override
			public Image getImage(Object element) {
				return null;
			}
		});
		
		infoTreeViewer.setInput(stubClassInfo);
	}
	
	private void createStubMethodInfoComponent(Composite composite, FormAttachment top){
		Label infoLabel = new Label(composite, SWT.WRAP);
		FormData labelData = new FormData();
		labelData.top = top;
		infoLabel.setText(listName[1]);
		infoLabel.setLayoutData(labelData);
		
		ListViewer infoListViewer = new ListViewer(composite, SWT.FULL_SELECTION | SWT.BORDER|SWT.V_SCROLL|SWT.H_SCROLL);
		List list = infoListViewer.getList();
		FormData listData = new FormData();
		listData.top = new FormAttachment(infoLabel, 0);
		listData.width = composite.getBounds().width;
		listData.height = composite.getBounds().height - infoLabel.getBounds().height;
		list.setLayoutData(listData);
		
		Collections.sort(stubMethodInfo);
		infoListViewer.add(stubMethodInfo.toArray());
		
	}
	
	public void addStubClassInfo(String className, String type, String info) {
		if (stubClassInfo.containsKey(className)) {
			if (stubClassInfo.get(className) == null) {
				stubClassInfo.put(className, new HashMap<String, ArrayList<String>>());
			}
			HashMap<String, ArrayList<String>> infoMap = stubClassInfo.get(className);
			if (infoMap.containsKey(type)) {
				ArrayList<String> infoList = infoMap.get(type);
				infoList.add(info);
			} else {
				ArrayList<String> infoList = new ArrayList<String>();
				infoList.add(info);
				infoMap.put(type, infoList);
			}
		} else {
			// just add the stub class name to stub class info
			if (type == null) {
				stubClassInfo.put(className, null);
				return;
			}
			ArrayList<String> infoList = new ArrayList<String>();
			infoList.add(info);
			HashMap<String, ArrayList<String>> infoMap = new HashMap<String, ArrayList<String>>();
			infoMap.put(type, infoList);
			stubClassInfo.put(className, infoMap);
		}
	}
	
	public void addStubMethodInfo(ArrayList<String> info){
		if (info == null || info.size() <= 0){
			return;
		}
		this.stubMethodInfo.addAll(info);
	}
}
