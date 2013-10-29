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
var value = Math.round(arguments[0])%256;
if(value >= -128 && value <128){
return value;
}else if(value<-128){
return value + 256;
}else{
return value - 256;
}
};

Clazz.defineMethod (Number, "shortValue", function(){

var value = Math.round(this)%65536;
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
return Math.round (this) & 0xffffffff;
});

Clazz.defineMethod (Number, "longValue", 
function () {
return Math.round (this);
});

Clazz.defineMethod(Number, "floatValue", 
function() {
    var val = this.valueOf();
    if(val < Float.MIN_VALUE) {
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
