﻿$_J("net.sf.j2s.ajax");
$_L(["org.eclipse.core.runtime.Plugin"],"net.sf.j2s.ajax.AjaxPlugin",null,function(){
c$=$_T(net.sf.j2s.ajax,"AjaxPlugin",org.eclipse.core.runtime.Plugin);
$_K(c$,
function(){
$_R(this,net.sf.j2s.ajax.AjaxPlugin,[]);
($t$=net.sf.j2s.ajax.AjaxPlugin.plugin=this,net.sf.j2s.ajax.AjaxPlugin.prototype.plugin=net.sf.j2s.ajax.AjaxPlugin.plugin,$t$);
});
$_M(c$,"stop",
function(context){
$_U(this,net.sf.j2s.ajax.AjaxPlugin,"stop",[context]);
($t$=net.sf.j2s.ajax.AjaxPlugin.plugin=null,net.sf.j2s.ajax.AjaxPlugin.prototype.plugin=net.sf.j2s.ajax.AjaxPlugin.plugin,$t$);
},"org.osgi.framework.BundleContext");
c$.getDefault=$_M(c$,"getDefault",
function(){
return net.sf.j2s.ajax.AjaxPlugin.plugin;
});
$_S(c$,
"plugin",null);
});