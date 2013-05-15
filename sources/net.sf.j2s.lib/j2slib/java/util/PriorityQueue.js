Clazz.load (["java.util.AbstractQueue", "$.Iterator"], "java.util.PriorityQueue", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.IllegalStateException", "$.NullPointerException", "$.OutOfMemoryError", "java.util.ArrayDeque", "$.Arrays", "$.ConcurrentModificationException", "$.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.queue = null;
this.$size = 0;
this.$comparator = null;
this.modCount = 0;
if (!Clazz.isClassDefined ("java.util.PriorityQueue.Itr")) {
java.util.PriorityQueue.$PriorityQueue$Itr$ ();
}
Clazz.instantialize (this, arguments);
}, java.util, "PriorityQueue", java.util.AbstractQueue, java.io.Serializable);
Clazz.makeConstructor (c$, 
function () {
this.construct (11, null);
});
Clazz.makeConstructor (c$, 
function (initialCapacity) {
this.construct (initialCapacity, null);
}, "~N");
Clazz.makeConstructor (c$, 
function (initialCapacity, comparator) {
Clazz.superConstructor (this, java.util.PriorityQueue, []);
if (initialCapacity < 1) throw  new IllegalArgumentException ();
this.queue =  new Array (initialCapacity);
this.$comparator = comparator;
}, "~N,java.util.Comparator");
Clazz.makeConstructor (c$, 
function (c) {
Clazz.superConstructor (this, java.util.PriorityQueue, []);
this.initFromCollection (c);
if (Clazz.instanceOf (c, java.util.SortedSet)) this.$comparator = (c).comparator ();
 else if (Clazz.instanceOf (c, java.util.PriorityQueue)) this.$comparator = (c).comparator ();
 else {
this.$comparator = null;
this.heapify ();
}}, "java.util.Collection");
Clazz.makeConstructor (c$, 
function (c) {
Clazz.superConstructor (this, java.util.PriorityQueue, []);
this.$comparator = c.comparator ();
this.initFromCollection (c);
}, "java.util.PriorityQueue");
Clazz.makeConstructor (c$, 
function (c) {
Clazz.superConstructor (this, java.util.PriorityQueue, []);
this.$comparator = c.comparator ();
this.initFromCollection (c);
}, "java.util.SortedSet");
Clazz.defineMethod (c$, "initFromCollection", 
($fz = function (c) {
var a = c.toArray ();
if (a.getClass () !== Array) a = java.util.Arrays.copyOf (a, a.length, Array);
this.queue = a;
this.$size = a.length;
}, $fz.isPrivate = true, $fz), "java.util.Collection");
Clazz.defineMethod (c$, "grow", 
($fz = function (minCapacity) {
if (minCapacity < 0) throw  new OutOfMemoryError ();
var oldCapacity = this.queue.length;
var newCapacity = ((oldCapacity < 64) ? ((oldCapacity + 1) * 2) : ((Math.floor (oldCapacity / 2)) * 3));
if (newCapacity < 0) newCapacity = 2147483647;
if (newCapacity < minCapacity) newCapacity = minCapacity;
this.queue = java.util.Arrays.copyOf (this.queue, newCapacity);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.overrideMethod (c$, "add", 
function (e) {
return this.offer (e);
}, "~O");
Clazz.overrideMethod (c$, "offer", 
function (e) {
if (e == null) throw  new NullPointerException ();
this.modCount++;
var i = this.$size;
if (i >= this.queue.length) this.grow (i + 1);
this.$size = i + 1;
if (i == 0) this.queue[0] = e;
 else this.siftUp (i, e);
return true;
}, "~O");
Clazz.overrideMethod (c$, "peek", 
function () {
if (this.$size == 0) return null;
return this.queue[0];
});
Clazz.defineMethod (c$, "indexOf", 
($fz = function (o) {
if (o != null) {
for (var i = 0; i < this.$size; i++) if (o.equals (this.queue[i])) return i;

}return -1;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "remove", 
function (o) {
var i = this.indexOf (o);
if (i == -1) return false;
 else {
this.removeAt (i);
return true;
}}, "~O");
Clazz.defineMethod (c$, "removeEq", 
function (o) {
for (var i = 0; i < this.$size; i++) {
if (o === this.queue[i]) {
this.removeAt (i);
return true;
}}
return false;
}, "~O");
Clazz.overrideMethod (c$, "contains", 
function (o) {
return this.indexOf (o) != -1;
}, "~O");
Clazz.defineMethod (c$, "toArray", 
function () {
return java.util.Arrays.copyOf (this.queue, this.$size);
});
Clazz.defineMethod (c$, "toArray", 
function (a) {
if (a.length < this.$size) return java.util.Arrays.copyOf (this.queue, this.$size, a.getClass ());
System.arraycopy (this.queue, 0, a, 0, this.$size);
if (a.length > this.$size) a[this.$size] = null;
return a;
}, "~A");
Clazz.overrideMethod (c$, "iterator", 
function () {
return Clazz.innerTypeInstance (java.util.PriorityQueue.Itr, this, null);
});
Clazz.overrideMethod (c$, "size", 
function () {
return this.$size;
});
Clazz.overrideMethod (c$, "clear", 
function () {
this.modCount++;
for (var i = 0; i < this.$size; i++) this.queue[i] = null;

this.$size = 0;
});
Clazz.overrideMethod (c$, "poll", 
function () {
if (this.$size == 0) return null;
var s = --this.$size;
this.modCount++;
var result = this.queue[0];
var x = this.queue[s];
this.queue[s] = null;
if (s != 0) this.siftDown (0, x);
return result;
});
Clazz.defineMethod (c$, "removeAt", 
($fz = function (i) {
this.modCount++;
var s = --this.$size;
if (s == i) this.queue[i] = null;
 else {
var moved = this.queue[s];
this.queue[s] = null;
this.siftDown (i, moved);
if (this.queue[i] === moved) {
this.siftUp (i, moved);
if (this.queue[i] !== moved) return moved;
}}return null;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "siftUp", 
($fz = function (k, x) {
if (this.$comparator != null) this.siftUpUsingComparator (k, x);
 else this.siftUpComparable (k, x);
}, $fz.isPrivate = true, $fz), "~N,~O");
Clazz.defineMethod (c$, "siftUpComparable", 
($fz = function (k, x) {
var key = x;
while (k > 0) {
var parent = (k - 1) >>> 1;
var e = this.queue[parent];
if (key.compareTo (e) >= 0) break;
this.queue[k] = e;
k = parent;
}
this.queue[k] = key;
}, $fz.isPrivate = true, $fz), "~N,~O");
Clazz.defineMethod (c$, "siftUpUsingComparator", 
($fz = function (k, x) {
while (k > 0) {
var parent = (k - 1) >>> 1;
var e = this.queue[parent];
if (this.$comparator.compare (x, e) >= 0) break;
this.queue[k] = e;
k = parent;
}
this.queue[k] = x;
}, $fz.isPrivate = true, $fz), "~N,~O");
Clazz.defineMethod (c$, "siftDown", 
($fz = function (k, x) {
if (this.$comparator != null) this.siftDownUsingComparator (k, x);
 else this.siftDownComparable (k, x);
}, $fz.isPrivate = true, $fz), "~N,~O");
Clazz.defineMethod (c$, "siftDownComparable", 
($fz = function (k, x) {
var key = x;
var half = this.$size >>> 1;
while (k < half) {
var child = (k << 1) + 1;
var c = this.queue[child];
var right = child + 1;
if (right < this.$size && (c).compareTo (this.queue[right]) > 0) c = this.queue[child = right];
if (key.compareTo (c) <= 0) break;
this.queue[k] = c;
k = child;
}
this.queue[k] = key;
}, $fz.isPrivate = true, $fz), "~N,~O");
Clazz.defineMethod (c$, "siftDownUsingComparator", 
($fz = function (k, x) {
var half = this.$size >>> 1;
while (k < half) {
var child = (k << 1) + 1;
var c = this.queue[child];
var right = child + 1;
if (right < this.$size && this.$comparator.compare (c, this.queue[right]) > 0) c = this.queue[child = right];
if (this.$comparator.compare (x, c) <= 0) break;
this.queue[k] = c;
k = child;
}
this.queue[k] = x;
}, $fz.isPrivate = true, $fz), "~N,~O");
Clazz.defineMethod (c$, "heapify", 
($fz = function () {
for (var i = (this.$size >>> 1) - 1; i >= 0; i--) this.siftDown (i, this.queue[i]);

}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "comparator", 
function () {
return this.$comparator;
});
c$.$PriorityQueue$Itr$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.cursor = 0;
this.lastRet = -1;
this.forgetMeNot = null;
this.lastRetElt = null;
this.expectedModCount = 0;
Clazz.instantialize (this, arguments);
}, java.util.PriorityQueue, "Itr", null, java.util.Iterator);
Clazz.prepareFields (c$, function () {
this.expectedModCount = this.b$["java.util.PriorityQueue"].modCount;
});
Clazz.overrideMethod (c$, "hasNext", 
function () {
return this.cursor < this.b$["java.util.PriorityQueue"].$size || (this.forgetMeNot != null && !this.forgetMeNot.isEmpty ());
});
Clazz.overrideMethod (c$, "next", 
function () {
if (this.expectedModCount != this.b$["java.util.PriorityQueue"].modCount) throw  new java.util.ConcurrentModificationException ();
if (this.cursor < this.b$["java.util.PriorityQueue"].$size) return this.b$["java.util.PriorityQueue"].queue[this.lastRet = this.cursor++];
if (this.forgetMeNot != null) {
this.lastRet = -1;
this.lastRetElt = this.forgetMeNot.poll ();
if (this.lastRetElt != null) return this.lastRetElt;
}throw  new java.util.NoSuchElementException ();
});
Clazz.overrideMethod (c$, "remove", 
function () {
if (this.expectedModCount != this.b$["java.util.PriorityQueue"].modCount) throw  new java.util.ConcurrentModificationException ();
if (this.lastRet != -1) {
var a = this.b$["java.util.PriorityQueue"].removeAt (this.lastRet);
this.lastRet = -1;
if (a == null) this.cursor--;
 else {
if (this.forgetMeNot == null) this.forgetMeNot =  new java.util.ArrayDeque ();
this.forgetMeNot.add (a);
}} else if (this.lastRetElt != null) {
this.b$["java.util.PriorityQueue"].removeEq (this.lastRetElt);
this.lastRetElt = null;
} else {
throw  new IllegalStateException ();
}this.expectedModCount = this.b$["java.util.PriorityQueue"].modCount;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"DEFAULT_INITIAL_CAPACITY", 11);
});
