package com.intel.ide.eclipse.mpt.builder;

import java.util.Map;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jdt.core.JavaCore;

import com.intel.ide.eclipse.mpt.utils.ProjectUtil;

public class MayloonPropertiesBuilder extends IncrementalProjectBuilder {
	public static final String BUILDER_ID = "com.intel.ide.eclipse.kdt.KonaPropertiesBuilder";

	@SuppressWarnings("rawtypes")
	@Override
	protected IProject[] build(int kind, Map args, IProgressMonitor monitor) throws CoreException {
		IProject project = getProject();
		if(ProjectUtil.isLibraryProject(project)) {
			return project.getReferencedProjects();
		}
		AntPropertiesBuilder antPropertiesbuilder = new AntPropertiesBuilder(JavaCore.create(getProject()));
		antPropertiesbuilder.build();
		return project.getReferencedProjects();
	}

}
