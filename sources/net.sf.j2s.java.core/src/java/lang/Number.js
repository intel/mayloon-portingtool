Clazz.load (["java.io.Serializable"], "java.lang.Number", null, function () {
java.lang.Number = Number;
if (Clazz.supportsNativeObject) {
	for (var i = 0; i < Clazz.extendedObjectMethods.length; i++) {
		var p = Clazz.extendedObjectMethods[i];
		Number.prototype[p] = JavaObject.prototype[p];
	}
}
//Clazz.decorateAsType (Number, "Number", null, java.io.Serializable, null, true);
Number.__CLASS_NAME__ = "Number";
Clazz.implementOf (Number, java.io.Serializable);
Number.equals = Clazz.innerFunctions.equals;
Number.getName = Clazz.innerFunctions.getName;

Number.serialVersionUID = Number.prototype.serialVersionUID = -8742448824652078965;

Number.toByteValue=Number.prototype.toByteValue=function(){
var value = parseInt(arguments[0])%256;
if(value >= -128 && value <128){
return value;
}else if(value<-128){
return value + 256;
}else{
return value - 256;
}
};

Clazz.defineMethod (Number, "shortValue", function(){

var value = parseInt(this) % 65536;
if(value >= -32768 && value <32768){
return value;
}else if(value<-32768){
return value + 65536;
}else{
return value - 65536;
}
});


Clazz.defineMethod(Number,"byteValue",function(){
return Number.toByteValue(this);
});

Clazz.defineMethod (Number, "intValue", 
function () {
    if (this > Integer.MAX_VALUE) {
        return Integer.MAX_VALUE;
    }
    if (this < Integer.MIN_VALUE) {
        return Integer.MIN_VALUE;
    }
    return parseInt(this) & 0xffffffff;
});

Clazz.defineMethod (Number, "longValue", 
function () {
return parseInt (this);
});

Clazz.defineMethod(Number, "floatValue", 
function() {
    var val = this.valueOf();
    if(val < -Float.MAX_VALUE) {
        return Number.NEGATIVE_INFINITY;
    }
    if (val > Float.MAX_VALUE) {
        return Number.POSITIVE_INFINITY;
    }
    return val;
});

Clazz.defineMethod (Number, "doubleValue", 
function () {
return this.valueOf();
});

Clazz.defineMethod (Number, "isInfinite", 
function () {
    return !isFinite (this.valueOf());
});

Clazz.defineMethod (Number, "isNaN", 
function () {
    return isNaN (this.valueOf());
});


Clazz.defineMethod (Number, "compare", 
function (num1, num2) {
    if (num1 > num2) {
        return 1;
    }
    if (num2 > num1) {
        return -1;
    }
    if (num1 == num2){
        return 0;
    }
    // NaNs are equal to other NaNs and larger than any other double
    if (isNaN(num1)) {
        if (isNaN(num2)) {
            return 0;
        }
        return 1;
    } else if (isNaN(num2)) {
        return -1;
    }
    return 0;
}, "~N,~N");

Number.compare=Number.prototype.compare;

Clazz.defineMethod (Number, "compareTo", 
function (object) {
    return Number.compare (this.valueOf(), object.valueOf());
}, "Number");

/*
* this method will be override the original toString of Number in javascript.
* lead to method toString(radix) of Number in javascript doesn't work.
* so need remove it keeps the method in javascript is ok.
*/
//sgurin : added this because if not, a native number in native code will print as [Object Number] instead printing the number value... 
/*Clazz.defineMethod (Number, "toString", 
function () {
return this.valueOf()+"";
});*/

Clazz.defineMethod (Number, "hashCode", 
function () {
return this.valueOf ();
});
});
