Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["java.util.ArrayList", "$.HashMap"], "org.eclipse.osgi.internal.resolver.ComputeNodeOrder", ["java.lang.IllegalArgumentException", "java.util.Arrays"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.internal.resolver, "ComputeNodeOrder");
c$.computeNodeOrder = Clazz.defineMethod (c$, "computeNodeOrder", 
function (objects, references) {
var g1 =  new org.eclipse.osgi.internal.resolver.ComputeNodeOrder.Digraph ();
for (var i = 0; i < objects.length; i++) g1.addVertex (objects[i]);

for (var i = 0; i < references.length; i++) g1.addEdge (references[i][1], references[i][0]);

g1.freeze ();
var g2 =  new org.eclipse.osgi.internal.resolver.ComputeNodeOrder.Digraph ();
var resortedVertexes = g1.idsByDFSFinishTime (false);
for (var it = resortedVertexes.iterator (); it.hasNext (); ) g2.addVertex (it.next ());

for (var i = 0; i < references.length; i++) g2.addEdge (references[i][0], references[i][1]);

g2.freeze ();
var sortedProjectList = g2.idsByDFSFinishTime (true);
var orderedNodes =  new Array (sortedProjectList.size ());
sortedProjectList.toArray (orderedNodes);
var knots;
var hasCycles = g2.containsCycles ();
if (hasCycles) {
var knotList = g2.nonTrivialComponents ();
knots = knotList.toArray ( new Array (knotList.size ()));
} else {
knots =  new Array (0);
}for (var i = 0; i < orderedNodes.length; i++) objects[i] = orderedNodes[i];

return knots;
}, "~A,~A");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.vertexList = null;
this.vertexMap = null;
this.time = 0;
this.initialized = false;
this.cycles = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver.ComputeNodeOrder, "Digraph");
Clazz.prepareFields (c$, function () {
this.vertexList =  new java.util.ArrayList (100);
this.vertexMap =  new java.util.HashMap (100);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "freeze", 
function () {
if (!this.initialized) {
this.initialized = true;
this.DFS ();
}});
Clazz.defineMethod (c$, "addVertex", 
function (id) {
if (this.initialized) {
throw  new IllegalArgumentException ();
}var vertex =  new org.eclipse.osgi.internal.resolver.ComputeNodeOrder.Digraph.Vertex (id);
var existing = this.vertexMap.put (id, vertex);
if (existing != null) {
throw  new IllegalArgumentException ();
}this.vertexList.add (vertex);
}, "~O");
Clazz.defineMethod (c$, "addEdge", 
function (fromId, toId) {
if (this.initialized) {
throw  new IllegalArgumentException ();
}var fromVertex = this.vertexMap.get (fromId);
var toVertex = this.vertexMap.get (toId);
if (fromVertex == null || toVertex == null) return ;
fromVertex.adjacent.add (toVertex);
}, "~O,~O");
Clazz.defineMethod (c$, "idsByDFSFinishTime", 
function (increasing) {
if (!this.initialized) {
throw  new IllegalArgumentException ();
}var len = this.vertexList.size ();
var r =  new Array (len);
for (var allV = this.vertexList.iterator (); allV.hasNext (); ) {
var vertex = allV.next ();
var f = vertex.finishTime;
if (increasing) {
r[f - 1] = vertex.id;
} else {
r[len - f] = vertex.id;
}}
return java.util.Arrays.asList (r);
}, "~B");
Clazz.defineMethod (c$, "containsCycles", 
function () {
if (!this.initialized) {
throw  new IllegalArgumentException ();
}return this.cycles;
});
Clazz.defineMethod (c$, "nonTrivialComponents", 
function () {
if (!this.initialized) {
throw  new IllegalArgumentException ();
}var components =  new java.util.HashMap ();
for (var it = this.vertexList.iterator (); it.hasNext (); ) {
var vertex = it.next ();
if (vertex.predecessor == null) {
} else {
var root = vertex;
while (root.predecessor != null) {
root = root.predecessor;
}
var component = components.get (root);
if (component == null) {
component =  new java.util.ArrayList (2);
component.add (root.id);
components.put (root, component);
}component.add (vertex.id);
}}
var result =  new java.util.ArrayList (components.size ());
for (var it = components.values ().iterator (); it.hasNext (); ) {
var component = it.next ();
if (component.size () > 1) {
result.add (component.toArray ());
}}
return result;
});
Clazz.defineMethod (c$, "DFS", 
($fz = function () {
var state;
var NEXT_VERTEX = 1;
var START_DFS_VISIT = 2;
var NEXT_ADJACENT = 3;
var AFTER_NEXTED_DFS_VISIT = 4;
var NEXT_VERTEX_OBJECT =  new Integer (1);
var AFTER_NEXTED_DFS_VISIT_OBJECT =  new Integer (4);
this.time = 0;
var stack =  new java.util.ArrayList (Math.max (1, this.vertexList.size ()));
var allAdjacent = null;
var vertex = null;
var allV = this.vertexList.iterator ();
state = 1;
nextStateLoop : while (true) {
switch (state) {
case 1:
if (!allV.hasNext ()) {
break nextStateLoop;
}var nextVertex = allV.next ();
if (nextVertex.color === "white") {
stack.add (NEXT_VERTEX_OBJECT);
vertex = nextVertex;
state = 2;
continue nextStateLoop;} else {
state = 1;
continue nextStateLoop;}case 2:
vertex.color = "grey";
allAdjacent = vertex.adjacent.iterator ();
state = 3;
continue nextStateLoop;case 3:
if (allAdjacent.hasNext ()) {
var adjVertex = allAdjacent.next ();
if (adjVertex.color === "white") {
adjVertex.predecessor = vertex;
stack.add (allAdjacent);
stack.add (vertex);
stack.add (AFTER_NEXTED_DFS_VISIT_OBJECT);
vertex = adjVertex;
state = 2;
continue nextStateLoop;}if (adjVertex.color === "grey") {
this.cycles = true;
}state = 3;
continue nextStateLoop;} else {
vertex.color = "black";
this.time++;
vertex.finishTime = this.time;
state = (stack.remove (stack.size () - 1)).intValue ();
continue nextStateLoop;}case 4:
vertex = stack.remove (stack.size () - 1);
allAdjacent = stack.remove (stack.size () - 1);
state = 3;
continue nextStateLoop;}
}
}, $fz.isPrivate = true, $fz));
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.color = "white";
this.predecessor = null;
this.finishTime = 0;
this.id = null;
this.adjacent = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver.ComputeNodeOrder.Digraph, "Vertex");
Clazz.prepareFields (c$, function () {
this.adjacent =  new java.util.ArrayList (3);
});
Clazz.makeConstructor (c$, 
function (id) {
this.id = id;
}, "~O");
Clazz.defineStatics (c$,
"WHITE", "white",
"GREY", "grey",
"BLACK", "black");
c$ = Clazz.p0p ();
c$ = Clazz.p0p ();
});
