package com.intel.ide.eclipse.mpt.popup.actions;

import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;

public class EditJSAction implements IObjectActionDelegate {
	
	private ICompilationUnit unit;
	private static boolean isFirstTime = true;

	public EditJSAction() {
		super();
	}

	@Override
	public void run(IAction action) {
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
		unit = null;
		if (selection instanceof IStructuredSelection) {
			IStructuredSelection structSelection = (IStructuredSelection) selection;
			Object firstElement = structSelection.getFirstElement();
			if (firstElement instanceof ICompilationUnit) {
				unit = (ICompilationUnit) firstElement;
			}
		} else if (selection instanceof ICompilationUnit) {
			unit = (ICompilationUnit) selection;
		}
		boolean enabled = false;
		if (unit != null) {
			enabled = EditJavaScriptUtil.isJSExisted(unit);
		}
		if (!enabled) {
			if (isFirstTime) {
				enabled = true;
			}
		}
		action.setEnabled(enabled);
	}

	@Override
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
		// TODO Auto-generated method stub

	}

}
