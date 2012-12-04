$_L(["java.io.Reader"],"java.io.FilterReader",null,function(){
c$=$_C(function(){
this.$in=null;
$_Z(this,arguments);
},java.io,"FilterReader",java.io.Reader);
$_K(c$,
function($in){
$_R(this,java.io.FilterReader,[$in]);
this.$in=$in;
},"java.io.Reader");
$_M(c$,"close",
function(){
{
this.$in.close();
}});
$_M(c$,"mark",
function(readlimit){
{
this.$in.mark(readlimit);
}},"~N");
$_M(c$,"markSupported",
function(){
{
return this.$in.markSupported();
}});
$_M(c$,"read",
function(){
{
return this.$in.read();
}});
$_M(c$,"read",
function(buffer,offset,count){
{
return this.$in.read(buffer,offset,count);
}},"~A,~N,~N");
$_M(c$,"ready",
function(){
{
return this.$in.ready();
}});
$_M(c$,"reset",
function(){
{
this.$in.reset();
}});
$_M(c$,"skip",
function(count){
{
return this.$in.skip(count);
}},"~N");
});
