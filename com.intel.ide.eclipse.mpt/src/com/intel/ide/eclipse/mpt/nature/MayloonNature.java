package com.intel.ide.eclipse.mpt.nature;

import java.util.LinkedList;
import org.eclipse.core.resources.ICommand;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.IProjectNature;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.JavaCore;
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
		
//		addToBuildSpec(MptConstants.MAYLOON_J2S_BUILDER);
//		removeFromBuildSpec(project, JavaCore.BUILDER_ID);
		removeFromBuildSpec(project, "com.android.ide.eclipse.adt.PreCompilerBuilder");
		removeFromBuildSpec(project, "com.android.ide.eclipse.adt.ApkBuilder");
		removeFromBuildSpec(project, "com.android.ide.eclipse.adt.ResourceManagerBuilder");
		removeFromNatures(project, "com.android.ide.eclipse.adt.AndroidNature");
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
		
		removeFromBuildSpec(project, MptConstants.MAYLOON_J2S_BUILDER);
		addToBuildSpec(JavaCore.BUILDER_ID);
		addToBuildSpec("com.android.ide.eclipse.adt.PreCompilerBuilder");
		addToBuildSpec("com.android.ide.eclipse.adt.ApkBuilder");
		addToBuildSpec("com.android.ide.eclipse.adt.ResourceManagerBuilder");
		addToBuildSpec("com.android.ide.eclipse.adt.AndroidNature");
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
            
//            removeFromBuildSpec(project, JavaCore.BUILDER_ID);
    		removeFromBuildSpec(project, "com.android.ide.eclipse.adt.PreCompilerBuilder");
    		removeFromBuildSpec(project, "com.android.ide.eclipse.adt.ApkBuilder");
    		removeFromBuildSpec(project, "com.android.ide.eclipse.adt.ResourceManagerBuilder");
    		removeFromNatures(project, "com.android.ide.eclipse.adt.AndroidNature");
            
		}
	}
	
	public static void addMaloonProjectBuilder(IProject project) throws CoreException {
		if (project == null || !project.isOpen()) return;
		if (project.hasNature(MayloonNature.NATURE_ID)) {
//            IProjectDescription description = project.getDescription();
//            String[] natures = description.getNatureIds();
//            String[] newNatures = new String[natures.length + 1];
//
//            System.arraycopy(natures, 0, newNatures, 0, natures.length);
//            newNatures[natures.length] = MayloonNature.NATURE_ID;
//
//            description.setNatureIds(newNatures);
//            project.setDescription(description, null);
//            MptPluginConsole.general(MptConstants.CONVERT_TAG, "Project '%1$s' has been configured with MayloonNature", project.getName());
            
            removeFromBuildSpec(project, JavaCore.BUILDER_ID);
    		addMayloonToBuildSpec(MptConstants.MAYLOON_J2S_BUILDER, project);
            
		}
	}
	
	/**
	 * Adds a builder to the build spec for the given project.
	 */
	public static void addMayloonToBuildSpec(String builderID, IProject project) throws CoreException {
		if (MptConstants.MAYLOON_J2S_BUILDER.equals(builderID)) {
			IProjectDescription description = project.getDescription();
			int javaCommandIndex = getJava2ScriptCommandIndex(description.getBuildSpec());

			if (javaCommandIndex == -1) {

				// Add a Java command to the build spec
				ICommand command = description.newCommand();
				command.setBuilderName(builderID);
				setJava2ScriptCommand(description, command, project);
			}
			return;
		}

		IProjectDescription description = project.getDescription();
		int javaCommandIndex = getJavaCommandIndex(description.getBuildSpec());

		if (javaCommandIndex == -1) {

			// Add a Java command to the build spec
			ICommand command = description.newCommand();
			command.setBuilderName(builderID);
			setJavaCommand(description, command, project);
		}
	}
	
	
	/**
	 * Adds a builder to the build spec for the given project.
	 */
	public void addToBuildSpec(String builderID) throws CoreException {
		if (MptConstants.MAYLOON_J2S_BUILDER.equals(builderID)) {
			IProjectDescription description = this.project.getDescription();
			int javaCommandIndex = getJava2ScriptCommandIndex(description.getBuildSpec());

			if (javaCommandIndex == -1) {

				// Add a Java command to the build spec
				ICommand command = description.newCommand();
				command.setBuilderName(builderID);
				setJava2ScriptCommand(description, command, project);
			}
			return;
		}

		IProjectDescription description = this.project.getDescription();
		int javaCommandIndex = getJavaCommandIndex(description.getBuildSpec());

		if (javaCommandIndex == -1) {

			// Add a Java command to the build spec
			ICommand command = description.newCommand();
			command.setBuilderName(builderID);
			setJavaCommand(description, command, project);
		}
	}
	
	/**
	 * Update the Java command in the build spec (replace existing one if present,
	 * add one first if none).
	 */
	private static void setJava2ScriptCommand(
		IProjectDescription description,
		ICommand newCommand, IProject project)
		throws CoreException {

		ICommand[] oldBuildSpec = description.getBuildSpec();
		int oldJavaCommandIndex = getJavaCommandIndex(oldBuildSpec);
		ICommand[] newCommands;

		if (oldJavaCommandIndex == -1) {
			// Add a Java build spec before other builders (1FWJK7I)
			newCommands = new ICommand[oldBuildSpec.length + 1];
			System.arraycopy(oldBuildSpec, 0, newCommands, 1, oldBuildSpec.length);
			newCommands[0] = newCommand;
		} else {
		    oldBuildSpec[oldJavaCommandIndex] = newCommand;
			newCommands = oldBuildSpec;
		}

		// Commit the spec change into the project
		description.setBuildSpec(newCommands);
		project.setDescription(description, null);
	}
	
	/**
	 * Update the Java command in the build spec (replace existing one if present,
	 * add one first if none).
	 */
	private static void setJavaCommand(
		IProjectDescription description,
		ICommand newCommand, IProject project)
		throws CoreException {

		ICommand[] oldBuildSpec = description.getBuildSpec();
		int oldJavaCommandIndex = getJava2ScriptCommandIndex(oldBuildSpec);
		ICommand[] newCommands;

		if (oldJavaCommandIndex == -1) {
			// Add a Java build spec before other builders (1FWJK7I)
			newCommands = new ICommand[oldBuildSpec.length + 1];
			System.arraycopy(oldBuildSpec, 0, newCommands, 1, oldBuildSpec.length);
			newCommands[0] = newCommand;
		} else {
		    oldBuildSpec[oldJavaCommandIndex] = newCommand;
			newCommands = oldBuildSpec;
		}

		// Commit the spec change into the project
		description.setBuildSpec(newCommands);
		project.setDescription(description, null);
	}

	/**
	 * Find the specific Java command amongst the given build spec
	 * and return its index or -1 if not found.
	 */
	private static int getJavaCommandIndex(ICommand[] buildSpec) {

		for (int i = 0; i < buildSpec.length; ++i) {
			if (buildSpec[i].getBuilderName().equals(JavaCore.BUILDER_ID)) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * Find the specific Java2Script command amongst the given build spec
	 * and return its index or -1 if not found.
	 */
	private static int getJava2ScriptCommandIndex(ICommand[] buildSpec) {

		for (int i = 0; i < buildSpec.length; ++i) {
			if (buildSpec[i].getBuilderName().equals(MptConstants.MAYLOON_J2S_BUILDER)) {
				return i;
			}
		}
		return -1;
	}
	/**
	 * Removes the given builder from the natures for the given project.
	 */
	public static void removeFromNatures(IProject project, String builderID) throws CoreException {

		IProjectDescription description = project.getDescription();
        String[] natures = description.getNatureIds();
		
		for (int i = 0; i < natures.length; ++i) {
			if (natures[i].equals(builderID)) {
				String[] newNatures = new String[natures.length - 1];
				System.arraycopy(natures, 0, newNatures, 0, i);
				System.arraycopy(natures, i + 1, newNatures, i, natures.length - i - 1);
				description.setNatureIds(newNatures);
				project.setDescription(description, null);
				return;
			}
		}
	}
	/**
	 * Removes the given builder from the build spec for the given project.
	 */
	public static void removeFromBuildSpec(IProject project, String builderID) throws CoreException {

		IProjectDescription description = project.getDescription();
		ICommand[] commands = description.getBuildSpec();
		for (int i = 0; i < commands.length; ++i) {
			if (commands[i].getBuilderName().equals(builderID)) {
				ICommand[] newCommands = new ICommand[commands.length - 1];
				System.arraycopy(commands, 0, newCommands, 0, i);
				System.arraycopy(commands, i + 1, newCommands, i, commands.length - i - 1);
				description.setBuildSpec(newCommands);
				project.setDescription(description, null);
				return;
			}
		}
	}
	
	public static boolean hasJavaBuilder(IProject project) {
		try {
			IProjectDescription description = project.getDescription();
			int javaCommandIndex = getJavaCommandIndex(description.getBuildSpec());
			return javaCommandIndex != -1;
		} catch (CoreException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public static boolean removeJavaBuilder(IProject project) {
		boolean removed = false;
		try {
			IProjectDescription description = project.getDescription();
			ICommand[] commands = description.getBuildSpec();
			for (int i = 0; i < commands.length; ++i) {
				if (commands[i].getBuilderName().equals(JavaCore.BUILDER_ID)) {
					ICommand[] newCommands = new ICommand[commands.length - 1];
					System.arraycopy(commands, 0, newCommands, 0, i);
					System.arraycopy(commands, i + 1, newCommands, i, commands.length - i - 1);
					description.setBuildSpec(newCommands);
					project.setDescription(description, null);
					removed = true;
					break;
				}
			}
			if (removed) { // remove java2script builder, so later the builder can be the first builder
				for (int i = 0; i < commands.length; ++i) {
					if (commands[i].getBuilderName().equals("net.sf.j2s.core.java2scriptbuilder")) {
						ICommand[] newCommands = new ICommand[commands.length - 1];
						System.arraycopy(commands, 0, newCommands, 0, i);
						System.arraycopy(commands, i + 1, newCommands, i, commands.length - i - 1);
						description.setBuildSpec(newCommands);
						project.setDescription(description, null);
						break;
					}
				}
			}
		} catch (CoreException e) {
			e.printStackTrace();
		}
		MayloonNature pn = new MayloonNature();
		pn.setProject(project);
		try {
			pn.configure();
		} catch (CoreException e) {
			e.printStackTrace();
		}
		return removed;
	}

}
