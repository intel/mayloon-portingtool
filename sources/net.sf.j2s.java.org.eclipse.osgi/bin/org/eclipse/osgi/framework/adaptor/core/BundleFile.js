Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (["org.eclipse.osgi.framework.util.SecureAction"], "org.eclipse.osgi.framework.adaptor.core.BundleFile", ["java.io.File", "$.IOException", "java.lang.Long", "$.NullPointerException", "$.StringBuffer", "java.util.Enumeration", "$.NoSuchElementException", "$.Vector", "org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor", "$.AdaptorMsg", "$.BundleEntry", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.protocol.bundleresource.Handler", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.basefile = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "BundleFile");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (basefile) {
this.basefile = basefile;
}, "java.io.File");
Clazz.defineMethod (c$, "getResourceURL", 
function (path, hostBundleID) {
return this.getResourceURL (path, hostBundleID, 0);
}, "~S,~N");
Clazz.defineMethod (c$, "getResourceURL", 
function (path, hostBundleID, index) {
var bundleEntry = this.getEntry (path);
if (bundleEntry == null) return null;
if (path.length == 0 || (path.charAt (0)).charCodeAt (0) != ('/').charCodeAt (0)) path = '/' + path;
try {
return org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.getURL ("bundleresource", Long.toString (hostBundleID), index, path,  new org.eclipse.osgi.framework.internal.protocol.bundleresource.Handler (bundleEntry));
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
}, "~S,~N,~N");
Clazz.defineMethod (c$, "getBaseFile", 
function () {
return this.basefile;
});
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.bundledata = null;
this.zipFile = null;
this.closed = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.BundleFile, "ZipBundleFile", org.eclipse.osgi.framework.adaptor.core.BundleFile);
Clazz.makeConstructor (c$, 
function (basefile, bundledata) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.BundleFile.ZipBundleFile, [basefile]);
if (!org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (basefile)) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTER_FILEEXIST_EXCEPTION, basefile));
this.bundledata = bundledata;
this.closed = true;
}, "java.io.File,org.eclipse.osgi.framework.adaptor.BundleData");
Clazz.defineMethod (c$, "checkedOpen", 
function () {
try {
return this.getZipFile () != null;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var abstractData = this.bundledata;
abstractData.getAdaptor ().getEventPublisher ().publishFrameworkEvent (2, abstractData.getBundle (), e);
return false;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "basicOpen", 
function () {
return org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.getZipFile (this.basefile);
});
Clazz.defineMethod (c$, "getZipFile", 
function () {
if (this.closed) {
this.zipFile = this.basicOpen ();
this.closed = false;
}return this.zipFile;
});
Clazz.defineMethod (c$, "getZipEntry", 
($fz = function (path) {
if (path.length > 0 && (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) path = path.substring (1);
var entry = this.zipFile.getEntry (path);
if (entry != null && entry.getSize () == 0 && !entry.isDirectory ()) {
var dirEntry = this.zipFile.getEntry (path + '/');
if (dirEntry != null) entry = dirEntry;
}return entry;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "extractDirectory", 
function (dirName) {
if (!this.checkedOpen ()) return null;
var entries = this.zipFile.entries ();
while (entries.hasMoreElements ()) {
var entryPath = (entries.nextElement ()).getName ();
if (entryPath.startsWith (dirName) && !entryPath.endsWith ("/")) this.getFile (entryPath);
}
return this.getExtractFile (dirName);
}, "~S");
Clazz.defineMethod (c$, "getExtractFile", 
($fz = function (entryName) {
if (!(Clazz.instanceOf (this.bundledata, org.eclipse.osgi.framework.adaptor.core.AbstractBundleData))) return null;
var path = ".cp";
var name = entryName.$replace ('/', java.io.File.separatorChar);
if ((name.length > 1) && ((name.charAt (0)).charCodeAt (0) == (java.io.File.separatorChar).charCodeAt (0))) path = path.concat (name);
 else path = path + java.io.File.separator + name;
var childGenDir = (this.bundledata).getGenerationDir ();
if (childGenDir != null) {
var childPath =  new java.io.File (childGenDir, path);
if (childPath.exists ()) return childPath;
}var parentGenDir = (this.bundledata).getParentGenerationDir ();
if (parentGenDir != null) {
var parentPath =  new java.io.File (parentGenDir, path);
if (parentPath.exists ()) return parentPath;
}var bundleGenerationDir = (this.bundledata).createGenerationDir ();
if (bundleGenerationDir != null && bundleGenerationDir.exists ()) return  new java.io.File (bundleGenerationDir, path);
return null;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "getFile", 
function (entry) {
if (!this.checkedOpen ()) return null;
var zipEntry = this.getZipEntry (entry);
if (zipEntry == null) {
return null;
}try {
var nested = this.getExtractFile (zipEntry.getName ());
if (nested != null) {
if (nested.exists ()) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("File already present: " + nested.getPath ());
}} else {
if (zipEntry.getName ().endsWith ("/")) {
if (!nested.mkdirs ()) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to create directory: " + nested.getPath ());
}throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_CREATE_EXCEPTION, nested.getAbsolutePath ()));
}this.extractDirectory (zipEntry.getName ());
} else {
var $in = this.zipFile.getInputStream (zipEntry);
if ($in == null) return null;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Creating file: " + nested.getPath ());
}var dir =  new java.io.File (nested.getParent ());
if (!dir.exists () && !dir.mkdirs ()) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to create directory: " + dir.getPath ());
}throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_CREATE_EXCEPTION, dir.getAbsolutePath ()));
}org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.readFile ($in, nested);
}}return nested;
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}} else {
throw e;
}
}
return null;
}, "~S");
Clazz.overrideMethod (c$, "containsDir", 
function (dir) {
if (!this.checkedOpen ()) return false;
if (dir == null) return false;
if (dir.length == 0) return true;
if ((dir.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) {
if (dir.length == 1) return true;
dir = dir.substring (1);
}if (dir.length > 0 && (dir.charAt (dir.length - 1)).charCodeAt (0) != ('/').charCodeAt (0)) dir = dir + '/';
var entries = this.zipFile.entries ();
var zipEntry;
var entryPath;
while (entries.hasMoreElements ()) {
zipEntry = entries.nextElement ();
entryPath = zipEntry.getName ();
if (entryPath.startsWith (dir)) {
return true;
}}
return false;
}, "~S");
Clazz.overrideMethod (c$, "getEntry", 
function (path) {
if (!this.checkedOpen ()) return null;
var zipEntry = this.getZipEntry (path);
if (zipEntry == null) {
if (path.length == 0 || (path.charAt (path.length - 1)).charCodeAt (0) == ('/').charCodeAt (0)) {
if (this.containsDir (path)) return  new org.eclipse.osgi.framework.adaptor.core.BundleEntry.DirZipBundleEntry (this, path);
}return null;
}return  new org.eclipse.osgi.framework.adaptor.core.BundleEntry.ZipBundleEntry (zipEntry, this);
}, "~S");
Clazz.overrideMethod (c$, "getEntryPaths", 
function (path) {
if (!this.checkedOpen ()) return null;
if (path == null) {
throw  new NullPointerException ();
}if (path.length > 0 && (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) {
path = path.substring (1);
}if (path.length > 0 && (path.charAt (path.length - 1)).charCodeAt (0) != ('/').charCodeAt (0)) {
path =  new StringBuffer (path).append ("/").toString ();
}var vEntries =  new java.util.Vector ();
var entries = this.zipFile.entries ();
while (entries.hasMoreElements ()) {
var zipEntry = entries.nextElement ();
var entryPath = zipEntry.getName ();
if (entryPath.startsWith (path)) {
if (path.length < entryPath.length) {
if (entryPath.lastIndexOf ('/') < path.length) {
vEntries.add (entryPath);
} else {
entryPath = entryPath.substring (path.length);
var slash = entryPath.indexOf ('/');
entryPath = path + entryPath.substring (0, slash + 1);
if (!vEntries.contains (entryPath)) {
vEntries.add (entryPath);
}}}}}
return vEntries.size () == 0 ? null : vEntries.elements ();
}, "~S");
Clazz.overrideMethod (c$, "close", 
function () {
if (!this.closed) {
this.closed = true;
this.zipFile.close ();
}});
Clazz.overrideMethod (c$, "open", 
function () {
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.osgi.framework.adaptor.core.BundleFile, "DirBundleFile", org.eclipse.osgi.framework.adaptor.core.BundleFile);
Clazz.makeConstructor (c$, 
function (basefile) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.BundleFile.DirBundleFile, [basefile]);
if (!org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (basefile) || !org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.isDirectory (basefile)) {
throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_EXCEPTION, basefile));
}}, "java.io.File");
Clazz.overrideMethod (c$, "getFile", 
function (path) {
var filePath =  new java.io.File (this.basefile, path);
if (org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (filePath)) {
return filePath;
}return null;
}, "~S");
Clazz.overrideMethod (c$, "getEntry", 
function (path) {
var filePath =  new java.io.File (this.basefile, path);
if (!org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (filePath)) {
return null;
}return  new org.eclipse.osgi.framework.adaptor.core.BundleEntry.FileBundleEntry (filePath, path);
}, "~S");
Clazz.overrideMethod (c$, "containsDir", 
function (dir) {
var dirPath =  new java.io.File (this.basefile, dir);
return org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (dirPath) && org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.isDirectory (dirPath);
}, "~S");
Clazz.overrideMethod (c$, "getEntryPaths", 
function (path) {
var pathFile =  new java.io.File (this.basefile, path);
if (!org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.exists (pathFile)) return null;
if (org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.isDirectory (pathFile)) {
var fileList = org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.list (pathFile);
if (fileList == null || fileList.length == 0) return null;
var dirPath = path.length == 0 || (path.charAt (path.length - 1)).charCodeAt (0) == ('/').charCodeAt (0) ? path : path + '/';
return ((Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.BundleFile$DirBundleFile$1") ? 0 : org.eclipse.osgi.framework.adaptor.core.BundleFile.DirBundleFile.$BundleFile$DirBundleFile$1$ ()), Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.BundleFile$DirBundleFile$1, this, Clazz.cloneFinals ("fileList", fileList, "pathFile", pathFile, "dirPath", dirPath)));
}return ((Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.BundleFile$DirBundleFile$2") ? 0 : org.eclipse.osgi.framework.adaptor.core.BundleFile.DirBundleFile.$BundleFile$DirBundleFile$2$ ()), Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.BundleFile$DirBundleFile$2, this, Clazz.cloneFinals ("path", path)));
}, "~S");
Clazz.overrideMethod (c$, "close", 
function () {
});
Clazz.overrideMethod (c$, "open", 
function () {
});
c$.$BundleFile$DirBundleFile$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.cur = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "BundleFile$DirBundleFile$1", null, java.util.Enumeration);
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return this.f$.fileList != null && this.cur < this.f$.fileList.length;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
if (!this.hasMoreElements ()) {
throw  new java.util.NoSuchElementException ();
}var childFile =  new java.io.File (this.f$.pathFile, this.f$.fileList[this.cur]);
var sb =  new StringBuffer (this.f$.dirPath).append (this.f$.fileList[this.cur++]);
if (org.eclipse.osgi.framework.adaptor.core.BundleFile.secureAction.isDirectory (childFile)) {
sb.append ("/");
}return sb.toString ();
});
c$ = Clazz.p0p ();
};
c$.$BundleFile$DirBundleFile$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.cur = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "BundleFile$DirBundleFile$2", null, java.util.Enumeration);
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return this.cur < 1;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
if (this.cur == 0) {
this.cur = 1;
return this.f$.path;
}throw  new java.util.NoSuchElementException ();
});
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.baseBundleFile = null;
this.cp = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core.BundleFile, "NestedDirBundleFile", org.eclipse.osgi.framework.adaptor.core.BundleFile);
Clazz.makeConstructor (c$, 
function (baseBundlefile, cp) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.BundleFile.NestedDirBundleFile, [baseBundlefile.basefile]);
this.baseBundleFile = baseBundlefile;
this.cp = cp;
if ((cp.charAt (cp.length - 1)).charCodeAt (0) != ('/').charCodeAt (0)) {
this.cp = this.cp + '/';
}}, "org.eclipse.osgi.framework.adaptor.core.BundleFile,~S");
Clazz.overrideMethod (c$, "close", 
function () {
});
Clazz.defineMethod (c$, "getEntry", 
function (path) {
if (path.length > 0 && (path.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) path = path.substring (1);
var newpath =  new StringBuffer (this.cp).append (path).toString ();
return this.baseBundleFile.getEntry (newpath);
}, "~S");
Clazz.defineMethod (c$, "containsDir", 
function (dir) {
if (dir == null) return false;
if (dir.length > 0 && (dir.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) dir = dir.substring (1);
var newdir =  new StringBuffer (this.cp).append (dir).toString ();
return this.baseBundleFile.containsDir (newdir);
}, "~S");
Clazz.overrideMethod (c$, "getEntryPaths", 
function (path) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getFile", 
function (entry) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "open", 
function () {
});
c$ = Clazz.p0p ();
c$.secureAction = c$.prototype.secureAction =  new org.eclipse.osgi.framework.util.SecureAction ();
});
