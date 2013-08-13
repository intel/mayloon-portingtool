package com.intel.ide.eclipse.mpt.popup.actions;

import java.io.File;
import java.util.ArrayList;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.ui.IEditorActionDelegate;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.IFileEditorInput;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.editors.text.TextEditor;

public class OpenJavaEditorViewAction implements IEditorActionDelegate {

	private TextEditor editor;
	String filePath = null;

	public OpenJavaEditorViewAction() {
	}

	@Override
	public void run(IAction action) {

		if (filePath != null) {
			if (EditJavaScriptUtil.openEditor4Java(filePath)) {
				return;
			}
		}
		EditJavaScriptUtil.popupError4Java();
		action.setEnabled(false);
	}

	@Override
	public void selectionChanged(IAction action, ISelection selection) {

	}
	
	

	@Override
	public void setActiveEditor(IAction action, IEditorPart targetEditor) {

		if (targetEditor instanceof TextEditor) {
			editor = (TextEditor) targetEditor;
			boolean enabled = false;

			IFileEditorInput input = (IFileEditorInput) editor.getEditorInput();
			IFile file = input.getFile();
			IProject activeProject = file.getProject();
			String pre = activeProject.getLocation().toString();
			String RelativePath = file.getProjectRelativePath().toString();
			// **bin/classes/android/core/Start.js
			int subPara_pre = RelativePath.indexOf("/",
					RelativePath.indexOf("/") + 1);
			int subPara_post = RelativePath.indexOf(".");
			//because any new editor pop out ,it will trigger the method
			if (subPara_pre == -1 || subPara_post == -1) {
				action.setEnabled(enabled);
				return;
			}
			String post_src = "/src"
					+ RelativePath.substring(subPara_pre, subPara_post)
					+ ".java";
			String post_gen = "/gen"
					+ RelativePath.substring(subPara_pre, subPara_post)
					+ ".java";

			if (EditJavaScriptUtil.isJavaExisted(pre + post_src))
				filePath = pre + post_src;
			else if (EditJavaScriptUtil.isJavaExisted(pre + post_gen))
				filePath = pre + post_gen;
			if (filePath != null)
				enabled = true;
			action.setEnabled(enabled);
		}
	}

}
