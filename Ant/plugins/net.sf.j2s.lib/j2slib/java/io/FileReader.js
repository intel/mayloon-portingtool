$_L(["java.io.InputStreamReader"],"java.io.FileReader",["java.io.FileInputStream"],function(){
c$=$_T(java.io,"FileReader",java.io.InputStreamReader);
$_K(c$,
function(file){
$_R(this,java.io.FileReader,[new java.io.FileInputStream(file)]);
},"java.io.File");
$_K(c$,
function(fd){
$_R(this,java.io.FileReader,[new java.io.FileInputStream(fd)]);
},"java.io.FileDescriptor");
$_K(c$,
function(filename){
$_R(this,java.io.FileReader,[new java.io.FileInputStream(filename)]);
},"~S");
});
