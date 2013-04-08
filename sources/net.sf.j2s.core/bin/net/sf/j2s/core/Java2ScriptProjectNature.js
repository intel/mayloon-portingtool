Clazz.declarePackage ("net.sf.j2s.core");
Clazz.load (["org.eclipse.core.resources.IProjectNature"], "net.sf.j2s.core.Java2ScriptProjectNature", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.project = null;
Clazz.instantialize (this, arguments);
}, net.sf.j2s.core, "Java2ScriptProjectNature", null, org.eclipse.core.resources.IProjectNature);
Clazz.overrideMethod (c$, "configure", 
function () {
this.addToBuildSpec ("net.sf.j2s.core.java2scriptbuilder");
this.removeFromBuildSpec ("org.eclipse.jdt.core.javabuilder");
});
Clazz.overrideMethod (c$, "deconfigure", 
function () {
this.removeFromBuildSpec ("net.sf.j2s.core.java2scriptbuilder");
this.addToBuildSpec ("org.eclipse.jdt.core.javabuilder");
});
Clazz.overrideMethod (c$, "getProject", 
function () {
return this.project;
});
Clazz.overrideMethod (c$, "setProject", 
function (project) {
this.project = project;
}, "org.eclipse.core.resources.IProject");
Clazz.defineMethod (c$, "hasNature", 
function () {
try {
var description = this.project.getDescription ();
var javaCommandIndex = net.sf.j2s.core.Java2ScriptProjectNature.getJava2ScriptCommandIndex (description.getBuildSpec ());
return (javaCommandIndex != -1);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
return false;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "addToBuildSpec", 
function (builderID) {
if ("net.sf.j2s.core.java2scriptbuilder".equals (builderID)) {
var description = this.project.getDescription ();
var javaCommandIndex = net.sf.j2s.core.Java2ScriptProjectNature.getJava2ScriptCommandIndex (description.getBuildSpec ());
if (javaCommandIndex == -1) {
var command = description.newCommand ();
command.setBuilderName (builderID);
this.setJava2ScriptCommand (description, command);
}return ;
}var description = this.project.getDescription ();
var javaCommandIndex = net.sf.j2s.core.Java2ScriptProjectNature.getJavaCommandIndex (description.getBuildSpec ());
if (javaCommandIndex == -1) {
var command = description.newCommand ();
command.setBuilderName (builderID);
this.setJavaCommand (description, command);
}}, "~S");
Clazz.defineMethod (c$, "setJava2ScriptCommand", 
($fz = function (description, newCommand) {
var oldBuildSpec = description.getBuildSpec ();
var oldJavaCommandIndex = net.sf.j2s.core.Java2ScriptProjectNature.getJavaCommandIndex (oldBuildSpec);
var newCommands;
if (oldJavaCommandIndex == -1) {
newCommands =  new Array (oldBuildSpec.length + 1);
System.arraycopy (oldBuildSpec, 0, newCommands, 1, oldBuildSpec.length);
newCommands[0] = newCommand;
} else {
oldBuildSpec[oldJavaCommandIndex] = newCommand;
newCommands = oldBuildSpec;
}description.setBuildSpec (newCommands);
this.project.setDescription (description, null);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.resources.IProjectDescription,org.eclipse.core.resources.ICommand");
Clazz.defineMethod (c$, "setJavaCommand", 
($fz = function (description, newCommand) {
var oldBuildSpec = description.getBuildSpec ();
var oldJavaCommandIndex = net.sf.j2s.core.Java2ScriptProjectNature.getJava2ScriptCommandIndex (oldBuildSpec);
var newCommands;
if (oldJavaCommandIndex == -1) {
newCommands =  new Array (oldBuildSpec.length + 1);
System.arraycopy (oldBuildSpec, 0, newCommands, 1, oldBuildSpec.length);
newCommands[0] = newCommand;
} else {
oldBuildSpec[oldJavaCommandIndex] = newCommand;
newCommands = oldBuildSpec;
}description.setBuildSpec (newCommands);
this.project.setDescription (description, null);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.resources.IProjectDescription,org.eclipse.core.resources.ICommand");
c$.getJavaCommandIndex = Clazz.defineMethod (c$, "getJavaCommandIndex", 
($fz = function (buildSpec) {
for (var i = 0; i < buildSpec.length; ++i) {
if (buildSpec[i].getBuilderName ().equals ("org.eclipse.jdt.core.javabuilder")) {
return i;
}}
return -1;
}, $fz.isPrivate = true, $fz), "~A");
c$.getJava2ScriptCommandIndex = Clazz.defineMethod (c$, "getJava2ScriptCommandIndex", 
($fz = function (buildSpec) {
for (var i = 0; i < buildSpec.length; ++i) {
if (buildSpec[i].getBuilderName ().equals ("net.sf.j2s.core.java2scriptbuilder")) {
return i;
}}
return -1;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "removeFromBuildSpec", 
function (builderID) {
var description = this.project.getDescription ();
var commands = description.getBuildSpec ();
for (var i = 0; i < commands.length; ++i) {
if (commands[i].getBuilderName ().equals (builderID)) {
var newCommands =  new Array (commands.length - 1);
System.arraycopy (commands, 0, newCommands, 0, i);
System.arraycopy (commands, i + 1, newCommands, i, commands.length - i - 1);
description.setBuildSpec (newCommands);
this.project.setDescription (description, null);
return ;
}}
}, "~S");
c$.hasJavaBuilder = Clazz.defineMethod (c$, "hasJavaBuilder", 
function (project) {
try {
var description = project.getDescription ();
var javaCommandIndex = net.sf.j2s.core.Java2ScriptProjectNature.getJavaCommandIndex (description.getBuildSpec ());
return javaCommandIndex != -1;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return false;
}, "org.eclipse.core.resources.IProject");
c$.removeJavaBuilder = Clazz.defineMethod (c$, "removeJavaBuilder", 
function (project) {
var removed = false;
try {
var description = project.getDescription ();
var commands = description.getBuildSpec ();
for (var i = 0; i < commands.length; ++i) {
if (commands[i].getBuilderName ().equals ("org.eclipse.jdt.core.javabuilder")) {
var newCommands =  new Array (commands.length - 1);
System.arraycopy (commands, 0, newCommands, 0, i);
System.arraycopy (commands, i + 1, newCommands, i, commands.length - i - 1);
description.setBuildSpec (newCommands);
project.setDescription (description, null);
removed = true;
break;
}}
if (removed) {
for (var i = 0; i < commands.length; ++i) {
if (commands[i].getBuilderName ().equals ("net.sf.j2s.core.java2scriptbuilder")) {
var newCommands =  new Array (commands.length - 1);
System.arraycopy (commands, 0, newCommands, 0, i);
System.arraycopy (commands, i + 1, newCommands, i, commands.length - i - 1);
description.setBuildSpec (newCommands);
project.setDescription (description, null);
break;
}}
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
var pn =  new net.sf.j2s.core.Java2ScriptProjectNature ();
pn.setProject (project);
try {
pn.configure ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
e.printStackTrace ();
} else {
throw e;
}
}
return removed;
}, "org.eclipse.core.resources.IProject");
});
