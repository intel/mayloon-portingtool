$_L(["java.io.OutputStreamWriter"],"java.io.FileWriter",["java.io.File","$.FileOutputStream"],function(){
c$=$_T(java.io,"FileWriter",java.io.OutputStreamWriter);
$_K(c$,
function(file){
$_R(this,java.io.FileWriter,[new java.io.FileOutputStream(file)]);
},"java.io.File");
$_K(c$,
function(file,append){
$_R(this,java.io.FileWriter,[new java.io.FileOutputStream(file,append)]);
},"java.io.File,~B");
$_K(c$,
function(fd){
$_R(this,java.io.FileWriter,[new java.io.FileOutputStream(fd)]);
},"java.io.FileDescriptor");
$_K(c$,
function(filename){
$_R(this,java.io.FileWriter,[new java.io.FileOutputStream(new java.io.File(filename))]);
},"~S");
$_K(c$,
function(filename,append){
$_R(this,java.io.FileWriter,[new java.io.FileOutputStream(filename,append)]);
},"~S,~B");
});
