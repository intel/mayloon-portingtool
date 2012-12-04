Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.ContributionItem"], "org.eclipse.jface.action.AbstractGroupMarker", null, function () {
c$ = Clazz.declareType (org.eclipse.jface.action, "AbstractGroupMarker", org.eclipse.jface.action.ContributionItem);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.action.AbstractGroupMarker, []);
});
Clazz.makeConstructor (c$, 
function (groupName) {
Clazz.superConstructor (this, org.eclipse.jface.action.AbstractGroupMarker, [groupName]);
;
}, "~S");
Clazz.defineMethod (c$, "getGroupName", 
function () {
return this.getId ();
});
Clazz.overrideMethod (c$, "isGroupMarker", 
function () {
return this.getId () != null;
});
});
