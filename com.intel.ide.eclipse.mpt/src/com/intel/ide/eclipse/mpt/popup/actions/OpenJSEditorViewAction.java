package com.intel.ide.eclipse.mpt.popup.actions;

import org.eclipse.core.resources.IResource;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.internal.ui.actions.SelectionConverter;
import org.eclipse.jdt.internal.ui.javaeditor.CompilationUnitEditor;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.ui.IEditorActionDelegate;
import org.eclipse.ui.IEditorPart;


public class OpenJSEditorViewAction implements IEditorActionDelegate {
	
	private CompilationUnitEditor editor;
	private static boolean isFirstTime = true;

	public OpenJSEditorViewAction() {
	}

	@Override
	public void run(IAction action) {
		ICompilationUnit unit = SelectionConverter.getInputAsCompilationUnit(editor);
		if (isFirstTime) {
			isFirstTime = false;
			if (!EditJavaScriptUtil.isJSExisted(unit)) {
				EditJavaScriptUtil.popupError4JS();
				action.setEnabled(false);
				return ;
			}
		}
		if (unit != null) {
			if (EditJavaScriptUtil.openEditor4JS(unit)) {
				return ;
			}
		}
		EditJavaScriptUtil.popupError4JS();
		action.setEnabled(false);
	}

	@Override
	public void selectionChanged(IAction action, ISelection selection) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setActiveEditor(IAction action, IEditorPart targetEditor) {
		if (targetEditor instanceof CompilationUnitEditor) {
			editor = (CompilationUnitEditor) targetEditor;
			ICompilationUnit unit = SelectionConverter.getInputAsCompilationUnit(editor);
			boolean enabled = false;
			if (unit != null) {
				IJavaModel javaModel = unit.getJavaModel();
				if (javaModel == null) {
					return; 
				}
				IResource resource = javaModel.getResource();
				if (resource == null){
					return;
				}
				enabled = EditJavaScriptUtil.isJSExisted(unit);
			}
			if (!enabled) {
				if (isFirstTime) {
					enabled = true;
				}
			}
			action.setEnabled(enabled);
		}
	}

}
