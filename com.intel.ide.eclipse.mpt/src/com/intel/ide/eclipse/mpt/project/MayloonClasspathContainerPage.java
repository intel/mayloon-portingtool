package com.intel.ide.eclipse.mpt.project;

import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.ui.wizards.IClasspathContainerPage;
import org.eclipse.jdt.ui.wizards.IClasspathContainerPageExtension;
import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Composite;

public class MayloonClasspathContainerPage extends WizardPage implements
		IClasspathContainerPage, IClasspathContainerPageExtension {
	
	// the project to set kona classpath
	private IJavaProject mCurrentProject;

	public MayloonClasspathContainerPage() {
		super("MayloonClasspathContainerPage"); //$NON-NLS-1$
		setTitle(MayloonProjectMessages.Mayloon_Framework_Library_Title);
		setDescription(MayloonProjectMessages.Mayloon_Framework_Library_Description);
	}

	@Override
	public boolean finish() {
		return true;
	}

	@Override
	public IClasspathEntry getSelection() {
		if (mCurrentProject == null) {
			return null;
		}
		
        IPath path = new Path(MayloonClasspathContainerInitializer.MAYLOON_CONTAINER_ID);

        return JavaCore.newContainerEntry(path);
	}

	@Override
	public void setSelection(IClasspathEntry containerEntry) {
		// TODO Auto-generated method stub
	}

	@Override
	public void initialize(IJavaProject project,
			IClasspathEntry[] currentEntries) {
		mCurrentProject = project;
		
	}

	@Override
	public void createControl(Composite parent) {
		// TODO Auto-generated method stub
		final Composite composite = new Composite(parent, SWT.NONE);
		this.setControl(composite);
	}

}
