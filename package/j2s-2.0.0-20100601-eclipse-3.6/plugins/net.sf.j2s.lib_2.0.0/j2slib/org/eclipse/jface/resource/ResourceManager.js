Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (null, "org.eclipse.jface.resource.ResourceManager", ["org.eclipse.jface.resource.RGBColorDescriptor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.disposeExecs = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "ResourceManager");
Clazz.defineMethod (c$, "createImage", 
function (descriptor) {
return this.create (descriptor);
}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "createImageWithDefault", 
function (descriptor) {
if (descriptor == null) {
return this.getDefaultImage ();
}try {
return this.create (descriptor);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.resource.DeviceResourceException)) {
return this.getDefaultImage ();
} else {
throw e;
}
}
}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "destroyImage", 
function (descriptor) {
this.destroy (descriptor);
}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "createColor", 
function (descriptor) {
return this.create (descriptor);
}, "org.eclipse.jface.resource.ColorDescriptor");
Clazz.defineMethod (c$, "createColor", 
function (descriptor) {
return this.createColor ( new org.eclipse.jface.resource.RGBColorDescriptor (descriptor));
}, "$wt.graphics.RGB");
Clazz.defineMethod (c$, "destroyColor", 
function (descriptor) {
this.destroyColor ( new org.eclipse.jface.resource.RGBColorDescriptor (descriptor));
}, "$wt.graphics.RGB");
Clazz.defineMethod (c$, "destroyColor", 
function (descriptor) {
this.destroy (descriptor);
}, "org.eclipse.jface.resource.ColorDescriptor");
Clazz.defineMethod (c$, "createFont", 
function (descriptor) {
return this.create (descriptor);
}, "org.eclipse.jface.resource.FontDescriptor");
Clazz.defineMethod (c$, "destroyFont", 
function (descriptor) {
this.destroy (descriptor);
}, "org.eclipse.jface.resource.FontDescriptor");
Clazz.defineMethod (c$, "dispose", 
function () {
if (this.disposeExecs == null) {
return ;
}var foundException = null;
var execs = this.disposeExecs.toArray ( new Array (this.disposeExecs.size ()));
for (var i = 0; i < execs.length; i++) {
var exec = execs[i];
try {
exec.run ();
} catch (e) {
if (Clazz.instanceOf (e, RuntimeException)) {
foundException = e;
} else {
throw e;
}
}
}
if (foundException != null) {
throw foundException;
}});
Clazz.defineMethod (c$, "disposeExec", 
function (r) {
;
if (this.disposeExecs == null) {
this.disposeExecs = new Array ();
}{
this.disposeExecs[this.disposeExecs.length] = r;
}}, "Runnable");
Clazz.defineMethod (c$, "cancelDisposeExec", 
function (r) {
;
if (this.disposeExecs == null) {
return ;
}{
var empty = true;
var removed = false;
var length = this.disposeExecs.length;
for (var i = 0; i < length; i++) {
if (this.disposeExecs[i] === r) {
this.disposeExecs[i] = null;
removed = true;
if (!empty) {
break;
}
}
if (this.disposeExecs[i] != null) {
empty = false;
if (removed) {
break;
}
}
}
if (empty) {
this.disposeExecs = null;
}
}}, "Runnable");
});
