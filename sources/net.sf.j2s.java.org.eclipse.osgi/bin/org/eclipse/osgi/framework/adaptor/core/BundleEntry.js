Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (null, "org.eclipse.osgi.framework.adaptor.core.BundleEntry", ["java.net.URL", "org.eclipse.osgi.framework.adaptor.core.BundleFile"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.adaptor.core, "BundleEntry");
Clazz.overrideMethod (c$, "toString", 
function () {
return (this.getName ());
});
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.zipEntry = null;
this.bundleFile = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.BundleEntry, "ZipBundleEntry", org.eclipse.osgi.framework.adaptor.core.BundleEntry);
Clazz.makeConstructor (c$, 
function (entry, bundleFile) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.BundleEntry.ZipBundleEntry, []);
this.zipEntry = entry;
this.bundleFile = bundleFile;
}, "java.util.zip.ZipEntry,org.eclipse.osgi.framework.adaptor.core.BundleFile");
Clazz.overrideMethod (c$, "getInputStream", 
function () {
return (this.bundleFile).getZipFile ().getInputStream (this.zipEntry);
});
Clazz.overrideMethod (c$, "getSize", 
function () {
return this.zipEntry.getSize ();
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.zipEntry.getName ();
});
Clazz.overrideMethod (c$, "getTime", 
function () {
return this.zipEntry.getTime ();
});
Clazz.overrideMethod (c$, "getLocalURL", 
function () {
try {
return  new java.net.URL ("jar:file:" + this.bundleFile.basefile.getAbsolutePath () + "!/" + this.zipEntry.getName ());
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getFileURL", 
function () {
try {
var file = this.bundleFile.getFile (this.zipEntry.getName ());
if (file != null) return file.toURL ();
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
return null;
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.file = null;
this.name = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.BundleEntry, "FileBundleEntry", org.eclipse.osgi.framework.adaptor.core.BundleEntry);
Clazz.makeConstructor (c$, 
function (file, name) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.BundleEntry.FileBundleEntry, []);
this.file = file;
this.name = name;
}, "java.io.File,~S");
Clazz.overrideMethod (c$, "getInputStream", 
function () {
return org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.getFileInputStream (this.file);
});
Clazz.overrideMethod (c$, "getSize", 
function () {
return org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.length (this.file);
});
Clazz.overrideMethod (c$, "getName", 
function () {
return (this.name);
});
Clazz.overrideMethod (c$, "getTime", 
function () {
return org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.lastModified (this.file);
});
Clazz.overrideMethod (c$, "getLocalURL", 
function () {
return this.getFileURL ();
});
Clazz.overrideMethod (c$, "getFileURL", 
function () {
try {
return this.file.toURL ();
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.bundleFile = null;
this.name = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.BundleEntry, "DirZipBundleEntry", org.eclipse.osgi.framework.adaptor.core.BundleEntry);
Clazz.makeConstructor (c$, 
function (bundleFile, name) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.BundleEntry.DirZipBundleEntry, []);
this.name = (name.length > 0 && (name.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) ? name.substring (1) : name;
this.bundleFile = bundleFile;
}, "org.eclipse.osgi.framework.adaptor.core.BundleFile.ZipBundleFile,~S");
Clazz.overrideMethod (c$, "getInputStream", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getSize", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "getTime", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getLocalURL", 
function () {
try {
return  new java.net.URL ("jar:file:" + this.bundleFile.basefile.getAbsolutePath () + "!/" + this.name);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getFileURL", 
function () {
try {
return this.bundleFile.extractDirectory (this.name).toURL ();
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
});
c$ = Clazz.p0p ();
});
