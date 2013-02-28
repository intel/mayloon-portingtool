$_L(null,"java.io.File",["java.io.IOException","java.lang.IllegalArgumentException","$.InternalError","$.NullPointerException","$.StringBuilder","java.util.ArrayList","$.Random"],function(){
c$=$_C(function(){
this.path=null;
this.absolutePath=null;
$_Z(this,arguments);
},java.io,"File",null,[java.io.Serializable,Comparable]);
$_K(c$,
function(dir,name){
this.construct(dir==null?null:dir.getPath(),name);
},"java.io.File,~S");
$_K(c$,
function(path){
this.init(path);
},"~S");
$_K(c$,
function(dirPath,name){
if(name==null){
throw new NullPointerException();
}if(dirPath==null||dirPath.isEmpty()){
this.init(name);
}else if(name.isEmpty()){
this.init(dirPath);
}else{
this.init(this.join(dirPath,name));
}},"~S,~S");
$_M(c$,"init",
($fz=function(dirtyPath){
var cleanPath=this.fixSlashes(dirtyPath);
var isAbsolute=cleanPath.length>0&&(cleanPath.charAt(0)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0);
if(isAbsolute){
this.path=this.absolutePath=cleanPath;
}else{
var userDir=String.instantialize("");
this.absolutePath=cleanPath.isEmpty()?userDir:this.join(userDir,cleanPath);
this.path=this.absolutePath.substring(this.absolutePath.length-cleanPath.length);
}},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"fixSlashes",
($fz=function(origPath){
var lastWasSlash=false;
var newPath=origPath.toCharArray();
var length=newPath.length;
var newLength=0;
for(var i=0;i<length;++i){
var ch=newPath[i];
if((ch).charCodeAt(0)==('/').charCodeAt(0)){
if(!lastWasSlash){
newPath[newLength++]=java.io.File.separatorChar;
lastWasSlash=true;
}}else{
newPath[newLength++]=ch;
lastWasSlash=false;
}}
if(lastWasSlash&&newLength>1){
newLength--;
}return(newLength!=length)?String.instantialize(newPath,0,newLength):origPath;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"join",
($fz=function(prefix,suffix){
var prefixLength=prefix.length;
var haveSlash=(prefixLength>0&&(prefix.charAt(prefixLength-1)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0));
if(!haveSlash){
haveSlash=(suffix.length>0&&(suffix.charAt(0)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0));
}return haveSlash?(prefix+suffix):(prefix+java.io.File.separatorChar+suffix);
},$fz.isPrivate=true,$fz),"~S,~S");
c$.listRoots=$_M(c$,"listRoots",
function(){
return[new java.io.File("/")];
});
$_M(c$,"canExecute",
function(){
if(this.path.isEmpty()){
return false;
}return java.io.File.canExecuteImpl(this.absolutePath);
});
c$.canExecuteImpl=$_M(c$,"canExecuteImpl",
($fz=function(path){
return false;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"canRead",
function(){
if(this.path.isEmpty()){
return false;
}return java.io.File.canReadImpl(this.absolutePath);
});
c$.canReadImpl=$_M(c$,"canReadImpl",
($fz=function(path){
return java.io.File.existsImpl(path)?true:false;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"canWrite",
function(){
if(this.path.isEmpty()){
return false;
}return java.io.File.canWriteImpl(this.absolutePath);
});
c$.canWriteImpl=$_M(c$,"canWriteImpl",
($fz=function(path){
return java.io.File.existsImpl(path)?true:false;
},$fz.isPrivate=true,$fz),"~S");
$_V(c$,"compareTo",
function(another){
return this.getPath().compareTo(another.getPath());
},"java.io.File");
$_M(c$,"$delete",
function(){
if(this.path.isEmpty()){
return false;
}return java.io.File.deleteImpl(this.absolutePath);
});
c$.deleteImpl=$_M(c$,"deleteImpl",
($fz=function(path){
var file=new W3CFile(path);
if(file.exist())return file.remove();
var folder=new W3CFolder(path);
if(folder.exist())return folder.remove(true);
return true;
},$fz.isPrivate=true,$fz),"~S");
$_V(c$,"equals",
function(obj){
if(!($_O(obj,java.io.File))){
return false;
}return this.path.equals((obj).getPath());
},"~O");
$_M(c$,"exists",
function(){
if(this.path.isEmpty()){
return false;
}return java.io.File.existsImpl(this.absolutePath);
});
c$.existsImpl=$_M(c$,"existsImpl",
($fz=function(path){
var file=new W3CFile(path);
if(file.exist())return true;
else{
var folder=new W3CFolder(path);
if(folder.exist())return true;
}
return false;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getAbsolutePath",
function(){
return this.absolutePath;
});
$_M(c$,"getAbsoluteFile",
function(){
return new java.io.File(this.getAbsolutePath());
});
$_M(c$,"getCanonicalPath",
function(){
var result=this.absolutePath;
if((java.io.File.separatorChar).charCodeAt(0)==('/').charCodeAt(0)){
result=java.io.File.resolveLink(result,result.length,false);
result=java.io.File.resolve(result);
}var numSeparators=1;
for(var i=0;i<result.length;++i){
if((result.charAt(i)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0)){
numSeparators++;
}}
var sepLocations=$_A(numSeparators,0);
var rootLoc=0;
if((java.io.File.separatorChar).charCodeAt(0)!=('/').charCodeAt(0)){
if((result.charAt(0)).charCodeAt(0)==('\\').charCodeAt(0)){
rootLoc=(result.length>1&&(result.charAt(1)).charCodeAt(0)==('\\').charCodeAt(0))?1:0;
}else{
rootLoc=2;
}}var newResult=$_A(result.length+1,'\0');
var newLength=0;
var lastSlash=0;
var foundDots=0;
sepLocations[lastSlash]=rootLoc;
for(var i=0;i<=result.length;++i){
if(i<rootLoc){
newResult[newLength++]=result.charAt(i);
}else{
if(i==result.length||(result.charAt(i)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0)){
if(i==result.length&&foundDots==0){
break;
}if(foundDots==1){
foundDots=0;
continue;}if(foundDots>1){
lastSlash=lastSlash>(foundDots-1)?lastSlash-(foundDots-1):0;
newLength=sepLocations[lastSlash]+1;
foundDots=0;
continue;}sepLocations[++lastSlash]=newLength;
newResult[newLength++]=java.io.File.separatorChar;
continue;}if((result.charAt(i)).charCodeAt(0)==('.').charCodeAt(0)){
foundDots++;
continue;}if(foundDots>0){
for(var j=0;j<foundDots;j++){
newResult[newLength++]='.';
}
}newResult[newLength++]=result.charAt(i);
foundDots=0;
}}
if(newLength>(rootLoc+1)&&(newResult[newLength-1]).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0)){
newLength--;
}return String.instantialize(newResult,0,newLength);
});
c$.resolve=$_M(c$,"resolve",
($fz=function(path){
var last=1;
var linkPath=path;
var bytes;
var done;
for(var i=1;i<=path.length;i++){
if(i==path.length||(path.charAt(i)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0)){
done=i>=path.length-1;
if(done&&linkPath.length==1){
return path;
}var inPlace=false;
if(linkPath.equals(path)){
bytes=path;
if(!done){
inPlace=true;
path=path.substring(0,i);
}}else{
var nextSize=i-last+1;
var linkSize=linkPath.length;
if((linkPath.charAt(linkSize-1)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0)){
linkSize--;
}bytes=linkPath.substring(0,linkSize)+path.substring(last-1,last-1+nextSize);
}if(done){
return bytes;
}linkPath=java.io.File.resolveLink(bytes,inPlace?i:bytes.length,true);
if(inPlace){
path=path.substring(0,i)+'/'+(i+1<path.length?path.substring(i+1):"");
}last=i+1;
}}
throw new InternalError();
},$fz.isPrivate=true,$fz),"~S");
c$.resolveLink=$_M(c$,"resolveLink",
($fz=function(path,length,resolveAbsolute){
var restart=false;
do{
var fragment=path.substring(0,length);
var target=java.io.File.readlink(fragment);
if(target.equals(fragment)){
break;
}if((target.charAt(0)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0)){
restart=resolveAbsolute;
path=target+path.substring(length);
}else{
path=path.substring(0,path.lastIndexOf(java.io.File.separatorChar,length-1)+1)+target;
}length=path.length;
}while(java.io.File.existsImpl(path));
if(restart){
return java.io.File.resolve(path);
}return path;
},$fz.isPrivate=true,$fz),"~S,~N,~B");
c$.readlink=$_M(c$,"readlink",
($fz=function(filePath){
return filePath;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getCanonicalFile",
function(){
return new java.io.File(this.getCanonicalPath());
});
$_M(c$,"getName",
function(){
var separatorIndex=this.path.lastIndexOf(java.io.File.separator);
return(separatorIndex<0)?this.path:this.path.substring(separatorIndex+1,this.path.length);
});
$_M(c$,"getParent",
function(){
var length=this.path.length;
var firstInPath=0;
if((java.io.File.separatorChar).charCodeAt(0)==('\\').charCodeAt (0) && length > 2 && (this.path.charAt (1)).charCodeAt (0) == (':').charCodeAt(0)){
firstInPath=2;
}var index=this.path.lastIndexOf(java.io.File.separatorChar);
if(index==-1&&firstInPath>0){
index=2;
}if(index==-1||(this.path.charAt(length-1)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0)){
return null;
}if(this.path.indexOf(java.io.File.separatorChar)==index&&(this.path.charAt(firstInPath)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0)){
return this.path.substring(0,index+1);
}return this.path.substring(0,index);
});
$_M(c$,"getParentFile",
function(){
var tempParent=this.getParent();
if(tempParent==null){
return null;
}return new java.io.File(tempParent);
});
$_M(c$,"getPath",
function(){
return this.path;
});
$_V(c$,"hashCode",
function(){
return this.getPath().hashCode()^1234321;
});
$_M(c$,"isAbsolute",
function(){
return this.path.length>0&&(this.path.charAt(0)).charCodeAt(0)==(java.io.File.separatorChar).charCodeAt(0);
});
$_M(c$,"isDirectory",
function(){
if(this.path.isEmpty()){
return false;
}return java.io.File.isDirectoryImpl(this.absolutePath);
});
c$.isDirectoryImpl=$_M(c$,"isDirectoryImpl",
($fz=function(path){
var folder=new W3CFolder(path);
if(folder.exist())return true;
return false;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"isFile",
function(){
if(this.path.isEmpty()){
return false;
}return java.io.File.isFileImpl(this.absolutePath);
});
c$.isFileImpl=$_M(c$,"isFileImpl",
($fz=function(path){
var file=new W3CFile(path);
if(file.exist())return true;
return false;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"isHidden",
function(){
if(this.path.isEmpty()){
return false;
}return this.getName().startsWith(".");
});
$_M(c$,"lastModified",
function(){
if(this.path.isEmpty()){
return 0;
}return java.io.File.lastModifiedImpl(this.absolutePath);
});
c$.lastModifiedImpl=$_M(c$,"lastModifiedImpl",
($fz=function(path){
var file=new W3CFile(path);
if(file.exist())return file.lastModified();
var folder=new W3CFolder(path);
if(folder.exist())return folder.lastModified();
return-1;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"setLastModified",
function(time){
if(this.path.isEmpty()){
return false;
}if(time<0){
throw new IllegalArgumentException("time<0");
}return java.io.File.setLastModifiedImpl(this.absolutePath,time);
},"~N");
c$.setLastModifiedImpl=$_M(c$,"setLastModifiedImpl",
($fz=function(path,time){
return java.io.File.existsImpl(path)?true:false;
},$fz.isPrivate=true,$fz),"~S,~N");
$_M(c$,"setReadOnly",
function(){
return this.setWritable(false,false);
});
$_M(c$,"setExecutable",
function(executable,ownerOnly){
if(this.path.isEmpty()){
return false;
}return java.io.File.setExecutableImpl(this.absolutePath,executable,ownerOnly);
},"~B,~B");
$_M(c$,"setExecutable",
function(executable){
return this.setExecutable(executable,true);
},"~B");
c$.setExecutableImpl=$_M(c$,"setExecutableImpl",
($fz=function(path,executable,ownerOnly){
return false;
},$fz.isPrivate=true,$fz),"~S,~B,~B");
$_M(c$,"setReadable",
function(readable,ownerOnly){
if(this.path.isEmpty()){
return false;
}return java.io.File.setReadableImpl(this.absolutePath,readable,ownerOnly);
},"~B,~B");
$_M(c$,"setReadable",
function(readable){
return this.setReadable(readable,true);
},"~B");
c$.setReadableImpl=$_M(c$,"setReadableImpl",
($fz=function(path,readable,ownerOnly){
return java.io.File.existsImpl(path)?true:false;
},$fz.isPrivate=true,$fz),"~S,~B,~B");
$_M(c$,"setWritable",
function(writable,ownerOnly){
if(this.path.isEmpty()){
return false;
}return java.io.File.setWritableImpl(this.absolutePath,writable,ownerOnly);
},"~B,~B");
$_M(c$,"setWritable",
function(writable){
return this.setWritable(writable,true);
},"~B");
c$.setWritableImpl=$_M(c$,"setWritableImpl",
($fz=function(path,writable,ownerOnly){
return java.io.File.existsImpl(path)?true:false;
},$fz.isPrivate=true,$fz),"~S,~B,~B");
$_M(c$,"length",
function(){
return java.io.File.lengthImpl(this.absolutePath);
});
c$.lengthImpl=$_M(c$,"lengthImpl",
($fz=function(path){
var file=new W3CFile(path);
if(file.exist())return file.length();
return 0;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"list",
function(){
if(this.path.isEmpty()){
return null;
}return java.io.File.listImpl(this.absolutePath);
});
c$.listImpl=$_M(c$,"listImpl",
($fz=function(path){
if(java.io.File.isDirectoryImpl(path)){
var folder=new W3CFolder(path);
var list=folder.list();
var result=new Array();
for(var i=0;i<list.length;i++){
result[i]=new String(list[i]);
}
return result;
}return new Array(0);
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"list",
function(filter){
var filenames=this.list();
if(filter==null||filenames==null){
return filenames;
}var result=new java.util.ArrayList(filenames.length);
for(var filename,$filename=0,$$filename=filenames;$filename<$$filename.length&&((filename=$$filename[$filename])||true);$filename++){
if(filter.accept(this,filename)){
result.add(filename);
}}
return result.toArray(new Array(result.size()));
},"java.io.FilenameFilter");
$_M(c$,"listFiles",
function(){
return this.filenamesToFiles(this.list());
});
$_M(c$,"listFiles",
function(filter){
return this.filenamesToFiles(this.list(filter));
},"java.io.FilenameFilter");
$_M(c$,"listFiles",
function(filter){
var files=this.listFiles();
if(filter==null||files==null){
return files;
}var result=new java.util.ArrayList(files.length);
for(var file,$file=0,$$file=files;$file<$$file.length&&((file=$$file[$file])||true);$file++){
if(filter.accept(file)){
result.add(file);
}}
return result.toArray(new Array(result.size()));
},"java.io.FileFilter");
$_M(c$,"filenamesToFiles",
($fz=function(filenames){
if(filenames==null){
return null;
}var count=filenames.length;
var result=new Array(count);
for(var i=0;i<count;++i){
result[i]=new java.io.File(this,filenames[i]);
}
return result;
},$fz.isPrivate=true,$fz),"~A");
$_M(c$,"mkdir",
function(){
return java.io.File.mkdirImpl(this.absolutePath);
});
c$.mkdirImpl=$_M(c$,"mkdirImpl",
($fz=function(path){
if(!path.isEmpty()){
var folder=new W3CFolder(path);
return folder.open(true);
}return false;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"mkdirs",
function(){
if(this.exists()){
return false;
}if(this.mkdir()){
return true;
}var parentDir=this.getParent();
if(parentDir==null){
return false;
}return(new java.io.File(parentDir).mkdirs()&&this.mkdir());
});
$_M(c$,"createNewFile",
function(){
if(this.path.isEmpty()){
throw new java.io.IOException("No such file or directory");
}return java.io.File.createNewFileImpl(this.absolutePath);
});
c$.createNewFileImpl=$_M(c$,"createNewFileImpl",
($fz=function(path){
var result=false;
var file=new W3CFile(path);
result=file.open(true,false);
return result;
},$fz.isPrivate=true,$fz),"~S");
c$.createTempFile=$_M(c$,"createTempFile",
function(prefix,suffix){
return java.io.File.createTempFile(prefix,suffix,null);
},"~S,~S");
c$.createTempFile=$_M(c$,"createTempFile",
function(prefix,suffix,directory){
if(prefix.length<3){
throw new IllegalArgumentException("prefix must be at least 3 characters");
}if(suffix==null){
suffix=".tmp";
}var tmpDirFile=directory;
if(tmpDirFile==null){
var tmpDir=String.instantialize("");
tmpDirFile=new java.io.File(tmpDir);
}var result;
do{
result=new java.io.File(tmpDirFile,prefix+new java.util.Random().nextInt()+suffix);
}while(!result.createNewFile());
return result;
},"~S,~S,java.io.File");
$_M(c$,"renameTo",
function(newPath){
if(this.path.isEmpty()||newPath.path.isEmpty()){
return false;
}return java.io.File.renameToImpl(this.absolutePath,newPath.absolutePath);
},"java.io.File");
c$.renameToImpl=$_M(c$,"renameToImpl",
($fz=function(oldPath,newPath){
var folder=null;
var name=newPath;
var index=newPath.lastIndexOf(java.io.File.separator);
if(index!=-1){
folder=newPath.substring(0,index);
name=newPath.substring(index);
}var result=false;
var file=new W3CFile(oldPath);
if(!folder){
folder=file.getParent();
}
result=file.moveTo(folder,name);
return result;
},$fz.isPrivate=true,$fz),"~S,~S");
$_V(c$,"toString",
function(){
return this.path;
});
$_M(c$,"getTotalSpace",
function(){
return java.io.File.getTotalSpaceImpl(this.absolutePath);
});
c$.getTotalSpaceImpl=$_M(c$,"getTotalSpaceImpl",
($fz=function(path){
return 9223372036854775807;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getUsableSpace",
function(){
return java.io.File.getUsableSpaceImpl(this.absolutePath);
});
c$.getUsableSpaceImpl=$_M(c$,"getUsableSpaceImpl",
($fz=function(path){
return 9223372036854775807;
},$fz.isPrivate=true,$fz),"~S");
$_M(c$,"getFreeSpace",
function(){
return java.io.File.getFreeSpaceImpl(this.absolutePath);
});
c$.getFreeSpaceImpl=$_M(c$,"getFreeSpaceImpl",
($fz=function(path){
return 9223372036854775807;
},$fz.isPrivate=true,$fz),"~S");
$_S(c$,
"separatorChar",'\0',
"separator",null,
"pathSeparatorChar",'\0',
"pathSeparator",null);
{
($t$=java.io.File.separatorChar=System.getProperty("file.separator","/").charAt(0),java.io.File.prototype.separatorChar=java.io.File.separatorChar,$t$);
($t$=java.io.File.pathSeparatorChar=System.getProperty("path.separator",":").charAt(0),java.io.File.prototype.pathSeparatorChar=java.io.File.pathSeparatorChar,$t$);
($t$=java.io.File.separator=String.valueOf(java.io.File.separatorChar),java.io.File.prototype.separator=java.io.File.separator,$t$);
($t$=java.io.File.pathSeparator=String.valueOf(java.io.File.pathSeparatorChar),java.io.File.prototype.pathSeparator=java.io.File.pathSeparator,$t$);
}});
