Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Double", null, function () {
java.lang.Double = Double = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Double, "Double", Number, Comparable, null, true);
Double.prototype.valueOf = function () { return 0; };
Double.toString = Double.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Double) {
		return "class java.lang.Double"; // Double.class.toString
	}
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Double, 
function () {
this.valueOf = function () {
	return 0.0;
};
});
Clazz.makeConstructor (Double, 
function (value) {
this.valueOf = function () {
	return value;
};
}, "Number");
Clazz.makeConstructor (Double, 
function (s) {
var value = Double.parseDouble (s);
this.valueOf = function () {
	return value;
};
}, "String");

Double.serialVersionUID = Double.prototype.serialVersionUID = -9172774392245257468;
Double.MIN_VALUE = Double.prototype.MIN_VALUE = 4.9e-324;
Double.MAX_VALUE = Double.prototype.MAX_VALUE = 1.7976931348623157e+308;
Double.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Double.NaN = Number.NaN;
Double.TYPE = Double.prototype.TYPE = Double;

Clazz.defineMethod (Double, "isNaN", 
function (num) {
return isNaN (num);
}, "Number");
Double.isNaN = Double.prototype.isNaN;
Clazz.defineMethod (Double, "isInfinite", 
function (num) {
return !isFinite (num);
}, "Number");
Double.isInfinite = Double.prototype.isInfinite;

Clazz.defineMethod (Double, "parseDouble", 
function (s) {
    if (s == null) 
        throw new NullPointerException();//sgurin . if s==null a NPE should be thrown and not NumberFormatException because isNaN(null)==true
    s = s.trim();
    if (s == "NaN" || s == "+NaN" || s == "-NaN") {
        return Number.NaN;
    }
    if (isNaN(s) || s.length == 0) {
        throw new NumberFormatException("Not a Number : " + s);
    }
    var doubleVal = parseFloat (s);
    return doubleVal;
}, "String");
Double.parseDouble = Double.prototype.parseDouble;

Clazz.defineMethod (Double, "compare", 
function (double1, double2) {
    if (double1 > double2) {
        return 1;
    }
    if (double2 > double1) {
        return -1;
    }
    if (double1 == double2){
        return 0;
    }
    // NaNs are equal to other NaNs and larger than any other double
    if (isNaN(double1)) {
        if (isNaN(double2)) {
            return 0;
        }
        return 1;
    } else if (isNaN(double2)) {
        return -1;
    }
    return 0;
}, "~N,~N");
Double.compare=Double.prototype.compare;

Clazz.defineMethod (Double, "compareTo", 
function (object) {
    return Double.compare (this.valueOf(), object.valueOf());
}, "Double");

Clazz.defineMethod (Double, "hashCode", 
function () {
    return this.valueOf();
});

Clazz.defineMethod (Double, "intValue", 
function () {
    var va = this.valueOf();
    if (va > Integer.MAX_VALUE) {
        return Integer.MAX_VALUE;
    }
    if (va < Integer.MIN_VALUE) {
        return Integer.MIN_VALUE;
    }
    return Math.round(this) & 0xffffffff;
});

Clazz.defineMethod (Double, "isInfinite", 
function () {
    return Double.isInfinite(this.valueOf());
});

Clazz.defineMethod (Double, "isNaN", 
function () {
    return Double.isNaN(this.valueOf());
});

Clazz.defineMethod (Double, "$valueOf", 
function (s) {
return new Double(this.parseDouble(s));
}, "String");

Clazz.defineMethod (Double, "$valueOf", 
function (v) {
return new Double(v);
}, "Number");

Double.$valueOf = Double.prototype.$valueOf;

Clazz.defineMethod (Double, "equals", 
function (s) {
if(s == null || ! Clazz.instanceOf(s, Double) ){
    return false;
}
return Double.compare(s.valueOf(), this.valueOf()) == 0;
}, "Object");
});

