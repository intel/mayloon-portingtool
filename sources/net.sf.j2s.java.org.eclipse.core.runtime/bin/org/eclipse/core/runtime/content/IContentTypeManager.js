Clazz.declarePackage ("org.eclipse.core.runtime.content");
Clazz.load (["java.util.EventObject", "org.eclipse.core.runtime.content.IContentTypeMatcher"], "org.eclipse.core.runtime.content.IContentTypeManager", null, function () {
c$ = Clazz.declareInterface (org.eclipse.core.runtime.content, "IContentTypeManager", org.eclipse.core.runtime.content.IContentTypeMatcher);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.context = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.content.IContentTypeManager, "ContentTypeChangeEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, context) {
Clazz.superConstructor (this, org.eclipse.core.runtime.content.IContentTypeManager.ContentTypeChangeEvent, [source]);
this.context = context;
}, "org.eclipse.core.runtime.content.IContentType,org.eclipse.core.runtime.preferences.IScopeContext");
Clazz.defineMethod (c$, "getContentType", 
function () {
return this.source;
});
Clazz.defineMethod (c$, "getContext", 
function () {
return this.context;
});
c$ = Clazz.p0p ();
Clazz.declareInterface (org.eclipse.core.runtime.content.IContentTypeManager, "IContentTypeChangeListener");
Clazz.declareInterface (org.eclipse.core.runtime.content.IContentTypeManager, "ISelectionPolicy");
Clazz.defineStatics (c$,
"CT_TEXT", "org.eclipse.core.runtime.text");
});
