Clazz.declarePackage ("net.sf.j2s.ui.launching");
Clazz.load (["java.util.HashSet"], "net.sf.j2s.ui.launching.J2SCyclicProjectUtils", null, function () {
c$ = Clazz.declareType (net.sf.j2s.ui.launching, "J2SCyclicProjectUtils");
c$.emptyTracks = Clazz.defineMethod (c$, "emptyTracks", 
function () {
net.sf.j2s.ui.launching.J2SCyclicProjectUtils.tracks.clear ();
});
c$.visit = Clazz.defineMethod (c$, "visit", 
function (obj) {
if (net.sf.j2s.ui.launching.J2SCyclicProjectUtils.tracks.contains (obj)) {
return false;
}net.sf.j2s.ui.launching.J2SCyclicProjectUtils.tracks.add (obj);
return true;
}, "~O");
c$.tracks = c$.prototype.tracks =  new java.util.HashSet ();
});
