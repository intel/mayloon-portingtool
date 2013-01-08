package com.intel.ide.eclipse.mpt.nature;

import java.util.LinkedList;

import org.eclipse.core.resources.ICommand;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.IProjectNature;
import org.eclipse.core.runtime.CoreException;
import com.intel.ide.eclipse.mpt.MptConstants;
import com.intel.ide.eclipse.mpt.MptPluginConsole;
import com.intel.ide.eclipse.mpt.builder.MayloonPackageBuilder;
import com.intel.ide.eclipse.mpt.builder.MayloonPropertiesBuilder;

public class MayloonNature implements IProjectNature {

	/**
	 * ID of this project nature
	 */
	public static final String NATURE_ID = "com.intel.ide.eclipse.mpt.MayloonNature"; //$NON-NLS-1$

	private IProject project;

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.core.resources.IProjectNature#configure()
	 */
	public void configure() throws CoreException {
		LinkedList<ICommand> commands = new LinkedList<ICommand>();
		boolean isPackageBuilderConfigured = false;
		boolean isPropertiesBuilderConfigured = false;
		
		IProjectDescription desc = project.getDescription();
		for(ICommand command : desc.getBuildSpec()) {
			if(command.getBuilderName().equals(MayloonPropertiesBuilder.BUILDER_ID)) {
				isPropertiesBuilderConfigured = true;
			}
			if(command.getBuilderName().equals(MayloonPackageBuilder.BUILDER_ID)) {
				isPackageBuilderConfigured = true;
			}
			commands.add(command);
		}
		
		if(!isPropertiesBuilderConfigured) {
			ICommand newCommand = desc.newCommand();
			newCommand.setBuilderName(MayloonPropertiesBuilder.BUILDER_ID);
			commands.addFirst(newCommand);
		}
		if(!isPackageBuilderConfigured) {
			ICommand newCommand = desc.newCommand();
			newCommand.setBuilderName(MayloonPackageBuilder.BUILDER_ID);
			commands.addLast(newCommand);
		}
		
		desc.setBuildSpec((ICommand[])commands.toArray(new ICommand[commands.size()]));
		project.setDescription(desc, null);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.core.resources.IProjectNature#deconfigure()
	 */
	public void deconfigure() throws CoreException {
		LinkedList<ICommand> commands = new LinkedList<ICommand>();
		
		IProjectDescription desc = project.getDescription();
		for(ICommand command : desc.getBuildSpec()) {
			if(command.getBuilderName().equals(MayloonPropertiesBuilder.BUILDER_ID)) {
				continue;
			}
			if(command.getBuilderName().equals(MayloonPackageBuilder.BUILDER_ID)) {
				continue;
			}
			commands.add(command);
		}
		
		desc.setBuildSpec((ICommand[])commands.toArray(new ICommand[commands.size()]));
		project.setDescription(desc, null);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.core.resources.IProjectNature#getProject()
	 */
	public IProject getProject() {
		return project;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.core.resources.IProjectNature#setProject(org.eclipse.core.resources.IProject)
	 */
	public void setProject(IProject project) {
		this.project = project;
	}

	public static void addProjectNature(IProject project) throws CoreException {
		if (project == null || !project.isOpen()) return;
		if (!project.hasNature(MayloonNature.NATURE_ID)) {
            IProjectDescription description = project.getDescription();
            String[] natures = description.getNatureIds();
            String[] newNatures = new String[natures.length + 1];

            System.arraycopy(natures, 0, newNatures, 0, natures.length);
            newNatures[natures.length] = MayloonNature.NATURE_ID;

            description.setNatureIds(newNatures);
            project.setDescription(description, null);
            MptPluginConsole.general(MptConstants.CONVERT_TAG, "Project '%1$s' has been configured with MayloonNature", project.getName());
		}
	}

}
