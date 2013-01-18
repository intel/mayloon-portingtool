package com.intel.ide.eclipse.mpt.popup.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.internal.ui.actions.SelectionConverter;
import org.eclipse.jdt.internal.ui.javaeditor.CompilationUnitEditor;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IEditorActionDelegate;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.IFileEditorInput;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.editors.text.TextEditor;

import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.MptPluginLogger;
import com.intel.ide.eclipse.mpt.builder.MayloonPropertiesBuilder;
import com.intel.ide.eclipse.mpt.nature.MayloonNature;
import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

public class OpenJavaEditorViewAction implements IEditorActionDelegate {

	private TextEditor editor;
	private static boolean isFirstTime = true;

	public OpenJavaEditorViewAction() {
	}

	@Override
	public void run(IAction action) {
		IFileEditorInput input = (IFileEditorInput)editor.getEditorInput() ;
	    IFile file = input.getFile();
	    IProject activeProject = file.getProject();
	    String activeProjectName = activeProject.getName();
	    //... use activeProjectName 
	    IJavaProject javaProject = JavaCore.create(activeProject);
	    
	    String filePath = getJavaFileFromJS(javaProject);

		
		if (isFirstTime) {
			isFirstTime = false;
			if (!EditJavaScriptUtil.isJavaExisted(filePath)) {
				EditJavaScriptUtil.popupError4Java();
				action.setEnabled(false);
				return ;
			}
		}
		if (filePath != null) {
			if (EditJavaScriptUtil.openEditor4Java(filePath)) {
				return ;
			}
		}
		EditJavaScriptUtil.popupError4Java();
		action.setEnabled(false);
	}

	private IFile getCurrentJSFile() {
		
		IWorkbenchWindow win = PlatformUI.getWorkbench()
				.getActiveWorkbenchWindow();

		IWorkbenchPage page = win.getActivePage();
		if (page != null) {
			IEditorPart editor = page.getActiveEditor();
			if (editor != null) {
				IEditorInput input = editor.getEditorInput();
				if (input instanceof IFileEditorInput) {
					IFile jsFile = ((IFileEditorInput) input).getFile();				
					return jsFile;
				}
			}
		}
		return null;
	}
	
//	private String getJavaFilePath(String jsPath) {
//		String fileName = null;
//		
//		IWorkbenchWindow win = PlatformUI.getWorkbench()
//				.getActiveWorkbenchWindow();
//
//		IWorkbenchPage page = win.getActivePage();
//		if (page != null) {
//			IEditorPart editor = page.getActiveEditor();
//			if (editor != null) {
//				IEditorInput input = editor.getEditorInput();
//				if (input instanceof IFileEditorInput) {
//					String fullPath = ((IFileEditorInput) input).getFile().getLocation().toOSString();						
//					return fullPath;
//				}
//			}
//		}
//		return null;
//	}

	private String getJavaFileFromJS(IJavaProject javaProject) {
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		ArrayList<File> sources = new ArrayList<File>();
		
		try {
			for(IClasspathEntry entry : javaProject.getRawClasspath()) {
				IPath path = entry.getPath();
				IResource resource = root.findMember(path);
				switch(entry.getEntryKind()){
				case IClasspathEntry.CPE_SOURCE: 
					if(resource != null) {
						sources.add(resource.getLocation().toFile().getAbsoluteFile());
					}else if(path.toFile().exists()){
						sources.add(path.toFile().getAbsoluteFile());
					}else{
						IFolder folder = root.getFolder(path);
						sources.add(folder.getLocation().toFile().getAbsoluteFile());
					}
					break;
				}
			}
			
			IFile jsFile = getCurrentJSFile();
			// /home/luq/runtime-EclipseApplication/Linpack/bin/mayloon/android/core/Start.js
			String jsFileFullPath = jsFile.getLocation().toOSString();
			
			// /Linpack/bin/mayloon
			String outputLocation = javaProject.getOutputLocation().toOSString();
			
			int beginIndex = jsFileFullPath.lastIndexOf(outputLocation) + outputLocation.length();
			int endIndex = jsFileFullPath.lastIndexOf("/");
			
			String packagePath = jsFileFullPath.substring(beginIndex, endIndex + 1);
			
			
			String jsFileName = jsFile.getName();
			
			if (jsFileName != null) {
				String javaFileName = jsFileName.substring(0, jsFileName
						.lastIndexOf('.')) + ".java";
				
				for (File folder : sources) {
					String javaFullPath = folder.getAbsolutePath() + packagePath + javaFileName;
					return javaFullPath;
//					for (File f: folder.listFiles()) {
//				        if (f.isDirectory()) {
////				            IFolder newFolder = destFolder.getFolder(new Path(f.getName()));
////				            newFolder.create(true, true, null);
////				            copyFiles(f, newDest);
//				        } else {
////				            IFile newFile = project.getFile(new Path(f.getName())));
////				            newFile.create(new FileInputStream(f), true, null);
//				        }
//				    }
					
					
//					if (file.getName().compareTo(javaFileName) == 0) {
//						return file.getAbsolutePath();
//					}
				}
				
			}
			
			
			
		} catch (JavaModelException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}

	@Override
	public void selectionChanged(IAction action, ISelection selection) {
	}

	@Override
	public void setActiveEditor(IAction action, IEditorPart targetEditor) {
		
		if (targetEditor instanceof TextEditor) {
			editor = (TextEditor) targetEditor;
			boolean enabled = false;

		    IFileEditorInput input = (IFileEditorInput)targetEditor.getEditorInput() ;
		    IFile file = input.getFile();
		    IProject activeProject = file.getProject();
		    String activeProjectName = activeProject.getName();
		    //... use activeProjectName 
		    IJavaProject javaProject = JavaCore.create(activeProject);
		    
		    String filePath = getJavaFileFromJS(javaProject);

			enabled = EditJavaScriptUtil.isJavaExisted(filePath);
			
			if (!enabled) {
				if (isFirstTime) {
					enabled = true;
				}
			}
			action.setEnabled(enabled);
		}
	}

}
