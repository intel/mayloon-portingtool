package com.intel.ide.eclipse.mpt.popup.actions;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.internal.ui.actions.SelectionConverter;
import org.eclipse.jdt.internal.ui.javaeditor.CompilationUnitEditor;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IEditorActionDelegate;
import org.eclipse.ui.IEditorPart;

public class OpenJSEditorViewAction implements IEditorActionDelegate {

	private IFile unit;

	public OpenJSEditorViewAction() {
	}

	@Override
	public void run(IAction action) {
		if (unit != null) {
			if (EditJavaScriptUtil.openEditor4JS(unit)) {
				return;
			}
		}
		EditJavaScriptUtil.popupError4JS();
		action.setEnabled(false);

	}

	@Override
	public void selectionChanged(IAction action, ISelection selection) {
		unit = null;
		if (selection instanceof IStructuredSelection) {
			IStructuredSelection structSelection = (IStructuredSelection) selection;
			unit = (IFile)structSelection.getFirstElement();
			
		}
		boolean enabled = false;
		if (unit != null) {
			enabled = EditJavaScriptUtil.isJSExisted(unit);
		}
		action.setEnabled(enabled);
		
	}

	@Override
	public void setActiveEditor(IAction action, IEditorPart targetEditor) {

	}

}
