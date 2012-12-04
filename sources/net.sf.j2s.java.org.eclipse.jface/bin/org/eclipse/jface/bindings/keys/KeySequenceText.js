Clazz.declarePackage ("org.eclipse.jface.bindings.keys");
Clazz.load (["$wt.events.FocusListener", "$.ModifyListener", "$wt.widgets.Listener", "org.eclipse.jface.bindings.keys.KeySequence"], "org.eclipse.jface.bindings.keys.KeySequenceText", ["java.lang.IllegalArgumentException", "java.util.ArrayList", "$.Collections", "$.TreeSet", "org.eclipse.jface.bindings.keys.KeyStroke", "$.SWTKeySupport", "$wt.SWT", "$wt.events.DisposeListener", "$wt.graphics.Font", "$wt.widgets.Display", "$.Event"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText.KeyTrapListener")) {
org.eclipse.jface.bindings.keys.KeySequenceText.$KeySequenceText$KeyTrapListener$ ();
}
if (!Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText.TraversalFilter")) {
org.eclipse.jface.bindings.keys.KeySequenceText.$KeySequenceText$TraversalFilter$ ();
}
if (!Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText.TraversalFilterManager")) {
org.eclipse.jface.bindings.keys.KeySequenceText.$KeySequenceText$TraversalFilterManager$ ();
}
if (!Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText.UpdateSequenceListener")) {
org.eclipse.jface.bindings.keys.KeySequenceText.$KeySequenceText$UpdateSequenceListener$ ();
}
this.keyFilter = null;
this.keySequence = null;
this.maxStrokes = -1;
this.text = null;
this.updateSequenceListener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys, "KeySequenceText");
Clazz.prepareFields (c$, function () {
this.keyFilter = Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText.KeyTrapListener, this, null);
this.keySequence = org.eclipse.jface.bindings.keys.KeySequence.getInstance ();
this.updateSequenceListener = Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText.UpdateSequenceListener, this, null);
});
Clazz.makeConstructor (c$, 
function (wrappedText) {
this.text = wrappedText;
if ("carbon".equals ($WT.getPlatform ())) {
var font =  new $wt.graphics.Font (this.text.getDisplay (), "Lucida Grande", 13, 0);
this.text.setFont (font);
this.text.addDisposeListener (((Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText$1") ? 0 : org.eclipse.jface.bindings.keys.KeySequenceText.$KeySequenceText$1$ ()), Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText$1, this, Clazz.cloneFinals ("font", font))));
}this.text.addListener (2, this.keyFilter);
this.text.addListener (1, this.keyFilter);
this.text.addFocusListener (Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText.TraversalFilterManager, this, null));
this.text.addModifyListener (this.updateSequenceListener);
}, "$wt.widgets.Text");
Clazz.defineMethod (c$, "clear", 
function () {
this.keySequence = org.eclipse.jface.bindings.keys.KeySequence.getInstance ();
this.text.setText ("");
});
Clazz.defineMethod (c$, "deleteSelection", 
($fz = function (keyStrokes, allowIncomplete, deletedKeyStrokes) {
var selection = this.text.getSelection ();
var start = selection.x;
var end = selection.y;
var string =  String.instantialize ();
var currentStrokes =  new java.util.ArrayList ();
var startTextIndex = 0;
var keyStrokesLength = keyStrokes.length;
var i;
for (i = 0; (i < keyStrokesLength) && (string.length < start); i++) {
startTextIndex = string.length;
currentStrokes.add (keyStrokes[i]);
string = org.eclipse.jface.bindings.keys.KeySequence.getInstance (currentStrokes).format ();
}
var startStrokeIndex;
if (string.length == start) {
startStrokeIndex = currentStrokes.size ();
} else {
startStrokeIndex = currentStrokes.size () - 1;
}var endStrokeIndex;
if (start == end) {
return startStrokeIndex;
}for (; (i < keyStrokesLength) && (string.length < end); i++) {
currentStrokes.add (keyStrokes[i]);
string = org.eclipse.jface.bindings.keys.KeySequence.getInstance (currentStrokes).format ();
}
endStrokeIndex = currentStrokes.size () - 1;
if (endStrokeIndex < 0) {
endStrokeIndex = 0;
}var newLength = endStrokeIndex - startStrokeIndex + 1;
deletedKeyStrokes[0] =  new Array (newLength);
var startStroke = keyStrokes[startStrokeIndex];
System.arraycopy (keyStrokes, 0, keyStrokes, 0, newLength);
if (allowIncomplete) {
var modifierKeys = startStroke.getModifierKeys ();
var incompleteStroke = org.eclipse.jface.bindings.keys.KeyStroke.getInstance (modifierKeys, 0);
var incompleteStrokeLength = incompleteStroke.format ().length;
if ((startTextIndex + incompleteStrokeLength) <= start) {
var added =  new Array (newLength + 1);
System.arraycopy (deletedKeyStrokes[0], 0, added, 0, startStrokeIndex);
added[startStrokeIndex] = incompleteStroke;
System.arraycopy (deletedKeyStrokes[0], startStrokeIndex, added, startStrokeIndex + 1, newLength);
deletedKeyStrokes[0] = added;
}}return startStrokeIndex;
}, $fz.isPrivate = true, $fz), "~A,~B,~A");
Clazz.defineMethod (c$, "getKeySequence", 
function () {
return this.keySequence;
});
Clazz.defineMethod (c$, "getText", 
($fz = function () {
return this.text.getText ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hasIncompleteStroke", 
($fz = function () {
return !this.keySequence.isComplete ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hasSelection", 
($fz = function () {
return (this.text.getSelectionCount () > 0);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "insert", 
function (stroke) {
if (!stroke.isComplete ()) {
return ;
}var keySequence = this.getKeySequence ();
var oldKeyStrokes = keySequence.getKeyStrokes ();
var newKeyStrokes;
if ((this.hasIncompleteStroke ()) && (!keySequence.isEmpty ())) {
var newKeyStrokesLength = oldKeyStrokes.length - 1;
newKeyStrokes =  new Array (newKeyStrokesLength);
System.arraycopy (oldKeyStrokes, 0, newKeyStrokes, 0, newKeyStrokesLength);
} else {
newKeyStrokes = oldKeyStrokes;
}var deletedKeyStrokes =  new Array (1);
var index = this.deleteSelection (newKeyStrokes, false, deletedKeyStrokes);
if (index == -1) {
index = 0;
}var strokes = (deletedKeyStrokes[0] == null) ?  new Array (0) : deletedKeyStrokes[0];
var keyStrokes = this.insertStrokeAt (strokes, stroke, index);
this.keyFilter.clearInsertionIndex ();
this.setKeySequence (org.eclipse.jface.bindings.keys.KeySequence.getInstance (keyStrokes));
}, "org.eclipse.jface.bindings.keys.KeyStroke");
Clazz.defineMethod (c$, "insertStrokeAt", 
($fz = function (keyStrokes, stroke, index) {
var keyStrokesLength = keyStrokes.length;
var currentStroke = (index >= keyStrokesLength) ? null : keyStrokes[index];
if ((currentStroke != null) && (!currentStroke.isComplete ())) {
var modifierKeys = currentStroke.getModifierKeys ();
var naturalKey = stroke.getNaturalKey ();
modifierKeys |= stroke.getModifierKeys ();
keyStrokes[index] = org.eclipse.jface.bindings.keys.KeyStroke.getInstance (modifierKeys, naturalKey);
return keyStrokes;
}var newKeyStrokes =  new Array (keyStrokesLength + 1);
System.arraycopy (keyStrokes, 0, newKeyStrokes, 0, index);
newKeyStrokes[index] = stroke;
if (index < keyStrokesLength) {
System.arraycopy (keyStrokes, index, newKeyStrokes, index + 1, keyStrokesLength);
}return newKeyStrokes;
}, $fz.isPrivate = true, $fz), "~A,org.eclipse.jface.bindings.keys.KeyStroke,~N");
Clazz.defineMethod (c$, "isCursorInLastPosition", 
($fz = function () {
return (this.text.getSelection ().y >= this.getText ().length);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setKeySequence", 
function (newKeySequence) {
this.keySequence = newKeySequence;
if (this.maxStrokes != -1) {
var oldKeyStrokes = this.keySequence.getKeyStrokes ();
if (this.maxStrokes < oldKeyStrokes.length) {
var newKeyStrokes =  new Array (this.maxStrokes);
System.arraycopy (oldKeyStrokes, 0, newKeyStrokes, 0, this.maxStrokes);
this.keySequence = org.eclipse.jface.bindings.keys.KeySequence.getInstance (newKeyStrokes);
}}var currentString = this.getText ();
var newString = this.keySequence.format ();
if (!currentString.equals (newString)) {
this.text.removeModifyListener (this.updateSequenceListener);
this.text.setText (this.keySequence.format ());
this.text.addModifyListener (this.updateSequenceListener);
this.text.setSelection (this.getText ().length);
}}, "org.eclipse.jface.bindings.keys.KeySequence");
Clazz.defineMethod (c$, "getKeyStrokeLimit", 
function () {
return this.maxStrokes;
});
Clazz.defineMethod (c$, "setKeyStrokeLimit", 
function (keyStrokeLimit) {
if (keyStrokeLimit > 0 || keyStrokeLimit == -1) this.maxStrokes = keyStrokeLimit;
 else throw  new IllegalArgumentException ();
this.setKeySequence (this.getKeySequence ());
}, "~N");
c$.$KeySequenceText$KeyTrapListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.insertionIndex = -1;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys.KeySequenceText, "KeyTrapListener", null, $wt.widgets.Listener);
Clazz.defineMethod (c$, "clearInsertionIndex", 
function () {
this.insertionIndex = -1;
});
Clazz.defineMethod (c$, "deleteKeyStroke", 
($fz = function (keyStrokes) {
this.clearInsertionIndex ();
if (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasSelection ()) {
var deletedKeyStrokes =  new Array (1);
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].deleteSelection (keyStrokes, false, deletedKeyStrokes);
return deletedKeyStrokes[0];
}if (keyStrokes.length > 0) {
var newKeyStrokesLength = keyStrokes.length - 1;
var newKeyStrokes =  new Array (newKeyStrokesLength);
System.arraycopy (keyStrokes, 0, newKeyStrokes, 0, newKeyStrokesLength);
return newKeyStrokes;
}return keyStrokes;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.overrideMethod (c$, "handleEvent", 
function (event) {
var keyStrokes = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getKeySequence ().getKeyStrokes ();
if (event.type == 1) {
keyStrokes = this.handleKeyDown (event, keyStrokes);
} else if (event.type == 2) {
keyStrokes = this.handleKeyUp (event, keyStrokes);
}this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (org.eclipse.jface.bindings.keys.KeySequence.getInstance (keyStrokes));
event.doit = false;
}, "$wt.widgets.Event");
Clazz.defineMethod (c$, "handleKeyDown", 
($fz = function (event, keyStrokes) {
if (((event.character).charCodeAt (0) == ('\u0008').charCodeAt (0)) && (event.stateMask == 0)) {
return this.deleteKeyStroke (keyStrokes);
}return this.insertKeyStroke (event, keyStrokes);
}, $fz.isPrivate = true, $fz), "$wt.widgets.Event,~A");
Clazz.defineMethod (c$, "handleKeyUp", 
($fz = function (event, keyStrokes) {
if (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasIncompleteStroke ()) {
var mockEvent =  new $wt.widgets.Event ();
if ((event.keyCode & $WT.MODIFIER_MASK) != 0) {
mockEvent.stateMask = event.stateMask - event.keyCode;
} else {
mockEvent.stateMask = event.stateMask;
}var key = org.eclipse.jface.bindings.keys.SWTKeySupport.convertEventToUnmodifiedAccelerator (mockEvent);
var remainingStroke = org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke (key);
var keyStrokesLength = keyStrokes.length;
var newKeyStrokes;
if ((keyStrokesLength > 0) && (remainingStroke.getModifierKeys () != 0)) {
newKeyStrokes =  new Array (keyStrokesLength);
System.arraycopy (keyStrokes, 0, newKeyStrokes, 0, keyStrokesLength - 1);
newKeyStrokes[keyStrokesLength - 1] = remainingStroke;
} else if (keyStrokesLength > 0) {
newKeyStrokes =  new Array (keyStrokesLength - 1);
System.arraycopy (keyStrokes, 0, newKeyStrokes, 0, keyStrokesLength - 1);
} else if (remainingStroke.getModifierKeys () != 0) {
newKeyStrokes =  new Array (keyStrokesLength + 1);
System.arraycopy (keyStrokes, 0, newKeyStrokes, 0, keyStrokesLength);
newKeyStrokes[keyStrokesLength] = remainingStroke;
} else {
newKeyStrokes = keyStrokes;
}return newKeyStrokes;
}return keyStrokes;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Event,~A");
Clazz.defineMethod (c$, "insertKeyStroke", 
($fz = function (event, keyStrokes) {
var key = org.eclipse.jface.bindings.keys.SWTKeySupport.convertEventToUnmodifiedAccelerator (event);
var stroke = org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke (key);
if ((16777299 == stroke.getNaturalKey ()) || (16777298 == stroke.getNaturalKey ()) || (16777300 == stroke.getNaturalKey ())) {
return keyStrokes;
}if (this.insertionIndex != -1) {
if (stroke.isComplete ()) {
keyStrokes = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].insertStrokeAt (keyStrokes, stroke, this.insertionIndex);
this.clearInsertionIndex ();
}} else if (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasSelection ()) {
var deletedKeyStrokes =  new Array (1);
this.insertionIndex = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].deleteSelection (keyStrokes, stroke.isComplete (), deletedKeyStrokes);
keyStrokes = deletedKeyStrokes[0];
if ((stroke.isComplete ()) || (this.insertionIndex >= keyStrokes.length)) {
keyStrokes = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].insertStrokeAt (keyStrokes, stroke, this.insertionIndex);
this.clearInsertionIndex ();
}} else {
if ((this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasIncompleteStroke ()) && (keyStrokes.length > 0)) {
var newKeyStrokes =  new Array (keyStrokes.length - 1);
System.arraycopy (keyStrokes, 0, newKeyStrokes, 0, keyStrokes.length - 1);
keyStrokes = newKeyStrokes;
}if ((keyStrokes.length == 0) || (this.insertionIndex >= keyStrokes.length) || (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].isCursorInLastPosition ())) {
keyStrokes = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].insertStrokeAt (keyStrokes, stroke, keyStrokes.length);
this.clearInsertionIndex ();
} else {
var deletedKeyStrokes =  new Array (1);
this.insertionIndex = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].deleteSelection (keyStrokes, stroke.isComplete (), deletedKeyStrokes);
keyStrokes = deletedKeyStrokes[0];
if (stroke.isComplete ()) {
keyStrokes = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].insertStrokeAt (keyStrokes, stroke, this.insertionIndex);
this.clearInsertionIndex ();
}}}return keyStrokes;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Event,~A");
c$ = Clazz.p0p ();
};
c$.$KeySequenceText$TraversalFilter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys.KeySequenceText, "TraversalFilter", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (event) {
switch (event.detail) {
case 2:
case 128:
case 0:
case 512:
case 256:
case 4:
event.type = 0;
event.doit = false;
break;
case 16:
case 8:
if ((event.stateMask & ($WT.MODIFIER_MASK ^ 131072)) != 0) {
event.type = 0;
event.doit = false;
break;
}case 64:
case 32:
default:
if (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasIncompleteStroke ()) {
var oldKeyStrokes = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getKeySequence ().getKeyStrokes ();
var newKeyStrokesLength = oldKeyStrokes.length - 1;
if (newKeyStrokesLength >= 1) {
var newKeyStrokes =  new Array (newKeyStrokesLength);
System.arraycopy (oldKeyStrokes, 0, newKeyStrokes, 0, newKeyStrokesLength);
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (org.eclipse.jface.bindings.keys.KeySequence.getInstance (newKeyStrokes));
} else {
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (org.eclipse.jface.bindings.keys.KeySequence.getInstance ());
}}}
}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
};
c$.$KeySequenceText$TraversalFilterManager$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.filter = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys.KeySequenceText, "TraversalFilterManager", null, $wt.events.FocusListener);
Clazz.prepareFields (c$, function () {
this.filter = Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText.TraversalFilter, this, null);
});
Clazz.overrideMethod (c$, "focusGained", 
function (event) {
$wt.widgets.Display.getCurrent ().addFilter (31, this.filter);
}, "$wt.events.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (event) {
$wt.widgets.Display.getCurrent ().removeFilter (31, this.filter);
}, "$wt.events.FocusEvent");
c$ = Clazz.p0p ();
};
c$.$KeySequenceText$UpdateSequenceListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys.KeySequenceText, "UpdateSequenceListener", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (event) {
try {
var originalSequence = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getKeySequence ();
var contents = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getText ();
var newSequence = org.eclipse.jface.bindings.keys.KeySequence.getInstance (contents);
if (!originalSequence.equals (newSequence)) {
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (newSequence);
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.bindings.keys.ParseException)) {
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getKeySequence ());
} else {
throw e;
}
}
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
};
c$.$KeySequenceText$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.bindings.keys, "KeySequenceText$1", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (e) {
this.f$.font.dispose ();
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
};
{
var trappedKeys =  new java.util.TreeSet ();
trappedKeys.add (org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke ('\u0009'.charCodeAt (0)));
trappedKeys.add (org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke (131081));
trappedKeys.add (org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke ('\u0008'.charCodeAt (0)));
var trappedKeyList =  new java.util.ArrayList (trappedKeys);
($t$ = org.eclipse.jface.bindings.keys.KeySequenceText.TRAPPED_KEYS = java.util.Collections.unmodifiableList (trappedKeyList), org.eclipse.jface.bindings.keys.KeySequenceText.prototype.TRAPPED_KEYS = org.eclipse.jface.bindings.keys.KeySequenceText.TRAPPED_KEYS, $t$);
}Clazz.defineStatics (c$,
"EMPTY_STRING", "",
"INFINITE", -1,
"TRAPPED_KEYS", null);
});
