Clazz.load (["java.lang.CharSequence", "$.Comparable", "java.io.Serializable", "java.util.Comparator"], "java.lang.String", null, function () {
if (String.prototype.$replace == null) { // not defined yet! ClazzLoader may try to load this twice!
java.lang.String = String;
if (Clazz.supportsNativeObject) {
	for (var i = 0; i < Clazz.extendedObjectMethods.length; i++) {
		var p = Clazz.extendedObjectMethods[i];
		if ("to$tring" == p || "toString" == p || "equals" == p || "hashCode" == p) {
			continue;
		}
		String.prototype[p] = JavaObject.prototype[p];
	}
}
//Clazz.decorateAsType (String, "String", null, [java.io.Serializable, CharSequence, Comparable]);
Clazz.implementOf (String, [java.io.Serializable, CharSequence, Comparable]);
//Number.equals = Clazz.innerFunctions.equals;
String.getName = Clazz.innerFunctions.getName;

String.serialVersionUID = String.prototype.serialVersionUID = -6849794470754667710;

c$ = Clazz.declareType (String, "CaseInsensitiveComparator", null, [java.util.Comparator, java.io.Serializable]);
Clazz.overrideMethod (c$, "compare",
function (str1, str2) {
    return str1.compareToIgnoreCase (str2);
}, "~S,~S");

String.CASE_INSENSITIVE_ORDER = String.prototype.CASE_INSENSITIVE_ORDER =  new String.CaseInsensitiveComparator ();

String.prototype.$replace = function (c1, c2) {
	/*
	var sp = "\\$.*+{}?^()[]";
	if (sp.indexOf (c1) != -1) {
		c1 = "\\" + c1;
	}
	*/
	c1 = c1.replace (/([\\\/\$\.\*\+\{\}\?\^\(\)\[\]])/g, function ($0, $1) {
		return "\\" + $1;
	});
	var regExp = new RegExp (c1, "gm");
	return this.replace (regExp, c2);
};
String.prototype.$generateExpFunction = function (str) {
	var arr = [];
	var orders = [];
	var idx = 0;
	arr[0] = "";
	var i = 0;
	for (; i < str.length; i++) {
		var ch = str.charAt (i);
		if (i != str.length - 1 && ch == '\\') {
			i++;
			var c = str.charAt (i);
			if (c == '\\') {
				arr[idx] += '\\';
			}
			arr[idx] += c;
		} else if (i != str.length - 1 && ch == '$') {
			i++;
			orders[idx] = parseInt (str.charAt (i));
			idx++;
			arr[idx] = "";
		} else if (ch == '\r') {
			arr[idx] += "\\r";
		} else if (ch == '\n') {
			arr[idx] += "\\n";
		} else if (ch == '\t') {
			arr[idx] += "\\t";
		} else if (ch == '\"') {
			arr[idx] += "\\\"";
		} else {
			arr[idx] += ch;
		}
	}
	var funStr = "f = function (";
	var max = Math.max.apply({},orders);
	for (i = 0; i <= max; i++) {
		funStr += "$" + i;
		if (i != max) {
			funStr += ", ";
		}
	}
	funStr += ") { return ";
	for (i = 0; i < arr.length - 1; i++) {
		funStr += "\"" + arr[i] + "\" + $" + orders[i] + " + ";
	}
	funStr += "\"" + arr[i] + "\"; }";
	var f = null;
	eval (funStr);
	return f;
};

/* 
* Copyright (c) 2007-2013 Alexandru Marasteanu <hello at alexei dot ro> | 3 clause BSD license
* The methods strRepeat and format is implemented based on that link as bellow:
* https://github.com/alexei/sprintf.js/blob/master/src/sprintf.js
*/
String.strRepeat = String.prototype.strRepeat = function(input, multiplier) {
    for (var output = []; multiplier > 0; output[--multiplier] = input) {}
    return output.join('');
};

String.format = String.prototype.format = function(){
    var i = 0, arg, fmt = arguments[i++], output = [], match, pad, padded, c, x, s = '';
    var args = arguments[i];
    args.unshift(fmt);
    while (fmt) {
        if (match = /^[^\x25]+/.exec(fmt)) {
            output.push(match[0]);
        } else if (match = /^\x25{2}/.exec(fmt)) {
            output.push('%');
        } else if (match = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(fmt)) {
            if (((arg = args[match[1] || i++]) == null) || (arg == undefined)) {
                throw('Too few arguments.');
            }
            //needs get the number if the type of object arg is java.lang.Integer or java.lang.Float and so on.
            if (typeof(arg.valueOf()) == 'number') {
                arg = arg.valueOf();
            }
            if (/[^s]/.test(match[7]) && (typeof(arg) != 'number')) {
                throw('Expecting number but found ' + typeof(arg));
            }
            switch (match[7]) {
                case 'b': arg = arg.toString(2); break;
                case 'c': arg = String.fromCharCode(arg); break;
                case 'd': arg = parseInt(arg); break;
                case 'e': arg = match[6] ? arg.toExponential(match[6]) : arg.toExponential(); break;
                case 'f': arg = match[6] ? parseFloat(arg).toFixed(match[6]) : parseFloat(arg); break;
                case 'o': arg = arg.toString(8); break;
                case 's': arg = ((arg = String(arg)) && match[6] ? arg.substring(0, match[6]) : arg); break;
                case 'u': arg = Math.abs(arg); break;
                case 'x': arg = arg.toString(16); break;
                case 'X': arg = arg.toString(16).toUpperCase(); break;
            }
            arg = (/[def]/.test(match[7]) && match[2] && arg>= 0 ? '+'+ arg : arg);
            c = match[3] ? match[3] == '0' ? '0' : match[3].charAt(1) : ' ';
            x = match[5] - String(arg).length - s.length;
            pad = match[5] ? this.strRepeat(c, x) : '';
            //needs to put the '-' to first position when the arg is negative.
            padded = pad + arg;
            if (typeof(arg) == "number" && arg < 0) {
                padded = '-'+(pad + Math.abs(arg));
            }
            output.push(s + (match[4] ? arg + pad : padded));
        }
        else {
            throw('Error!');
        }
        fmt = fmt.substring(match[0].length);
    }
    return output.join('');
};

String.prototype.replaceAll = function (exp, str) {
	var regExp = new RegExp (exp, "gm");
	return this.replace (regExp, this.$generateExpFunction (str));
};
String.prototype.replaceFirst = function (exp, str) {
	var regExp = new RegExp (exp, "m");
	return this.replace (regExp, this.$generateExpFunction (str));
};
String.prototype.matches = function (exp) {
	if (exp != null) {
		exp = "^(" + exp + ")$";
	}
	var regExp = new RegExp (exp, "gm");
	var m = this.match (regExp);
	return m != null && m.length != 0;
};
String.prototype.regionMatches = function (ignoreCase, toffset,
		other, ooffset, len) {
	/*
	 * Support different method signatures
	 */
	if (typeof ignoreCase == "number"
			|| (ignoreCase != true && ignoreCase != false)) {
		len = ooffset;
		ooffset = other;
		other = toffset;
		toffset = ignoreCase;
		ignoreCase = false;
	}
	var to = toffset;
	var po = ooffset;
	// Note: toffset, ooffset, or len might be near -1>>>1.
	if ((ooffset < 0) || (toffset < 0) || (toffset > this.length - len) ||
			(ooffset > other.length - len)) {
		return false;
	}
	var s1 = this.substring (toffset, toffset + len);
	var s2 = other.substring (ooffset, ooffset + len);
	if (ignoreCase) {
		s1 = s1.toLowerCase ();
		s2 = s2.toLowerCase ();
	}
	return s1 == s2;
};
String.prototype.$plit = function (regex, limit) {
	/*
	 * Support different method signatures
	 */
	if (limit != null && limit > 0) {
		if (limit == 1) {
			return this;
		}
		var regExp = new RegExp ("(" + regex + ")", "gm");
		var count = 1;
		var s = this.replace (regExp, function ($0, $1) {
			count++;
			if (count == limit) {
				return "@@_@@";
			} else if (count > limit) {
				return $0;
			} else {
				return $0;
			}
		});
		regExp = new RegExp (regex, "gm");
		var arr = this.split (regExp);
		if (arr.length > limit) {
			arr[limit - 1] = s.substring (s.indexOf ("@@_@@") + 5);
			arr.length = limit;
		}
		return arr;
	} else {
		var regExp = new RegExp (regex, "gm");
		return this.split (regExp);
	}
};

String.prototype.trim = function () {
	var len = this.length;
	var st = 0;

	while ((st < len) && (this.charAt (st) <= ' ')) {
	    st++;
	}
	while ((st < len) && (this.charAt (len - 1) <= ' ')) {
	    len--;
	}
	return ((st > 0) || (len < len)) ? this.substring (st, len) : this;
};

String.prototype.trim = function () {
	return this.replace (/^\s+/g, '').replace (/\s+$/g, '');
};

/* private */
String.prototype.startsWith_string_number = function (prefix, toffset) {
	var to = toffset;
	var po = 0;
	var pc = prefix.length;
	// Note: toffset might be near -1>>>1.
	if ((toffset < 0) || (toffset > this.length - pc)) {
	    return false;
	}
	while (--pc >= 0) {
	    if (this.charAt (to++) != prefix.charAt (po++)) {
	        return false;
	    }
	}
	return true;
};

String.prototype.startsWith = function (prefix) { /* prefix, toffset */
	if (arguments.length == 1) {
		return this.startsWith_string_number (arguments[0], 0);
	} else if (arguments.length == 2) {
		return this.startsWith_string_number (arguments[0], arguments[1]);
	} else {
		return false;
	}
};

String.prototype.endsWith = function (suffix) {
	return this.startsWith (suffix, this.length - suffix.length);
};

String.prototype.equals = function (anObject) {
	return this.valueOf () == anObject;
};

String.prototype.equalsIgnoreCase = function (anotherString) {
	return (anotherString == null) ? false : (this == anotherString 
			|| this.toLowerCase () == anotherString.toLowerCase ());
};

/* private */
String.prototype.hash = 0;

String.prototype.hashCode = function () {
	var h = this.hash;
	if (h == 0) {
		var off = 0;
		var len = this.length;
		for (var i = 0; i < len; i++) {
			h = 31*h + this.charCodeAt (off++);
			h &= 0xffffffff;
		}
		this.hash = h;
	}
    return h;
};

String.prototype.isEmpty = function() {
    return this.length == 0 ? true : false;
};

String.prototype.contains = function(anotherString) {
    return this.indexOf(anotherString) > -1 ? true : false;
};

String.prototype.getBytes = function () {
	if (arguments.length == 4) {
		return this.getChars (arguments[0], arguments[1], arguments[2], arguments[3]);
	}
	var s = this;
	if (arguments.length == 1) {
		var cs = arguments[0].toString().toLowerCase ();
		var charset = [
			"utf-8", "UTF8", "us-ascii", "iso-8859-1", "8859_1", "gb2312", "gb18030", "gbk"
		];
		var existed = false;
		for (var i = 0; i < charset.length; i++) {
			if (charset[i] == cs) {
				existed = true;
				break;
			}
		}
		if (!existed) {
			throw new java.io.UnsupportedEncodingException ();
		}
		if (cs == "utf-8" || cs == "utf8") {
			s = Encoding.convert2UTF8 (this);
		}
	}
	var arrs = new Array (s.length);
	var c = 0, ii = 0;
	for (var i = 0; i < s.length; i++) {
		c = s.charCodeAt (i);
		if (c > 255) {
			arrs[ii] = 0x1a;
			arrs[ii + 1] = c & 0xff;
			arrs[ii + 2] = (c & 0xff00) >> 8;
			ii+=2;
		} else {
			arrs[ii] = c;
		}
		ii++;
	}
	return arrs;
};

String.prototype.compareTo = function (anotherString) {
	if (anotherString == null) {
		throw new java.lang.NullPointerException ();
	}
	var len1 = this.length;
	var len2 = anotherString.length;
	var n = Math.min (len1, len2);
	var k = 0;
    while (k < n) {
		var c1 = this.charCodeAt (k);
		var c2 = anotherString.charCodeAt (k);
		if (c1 != c2) {
			return c1 - c2;
		}
		k++;
	}
	return len1 - len2;
};

String.prototype.toCharArray = function () {
	var result = new Array (this.length);
	for (var i = 0; i < this.length; i++) {
		result[i] = this.charAt (i);
	}
	return result;
};
String.value0f = String.valueOf;
String.valueOf = function (o) {
	if (o == "undefined") {
		return String.value0f ();
	}
	if (o instanceof Array) {
		if (arguments.length == 1) {
			return o.join ('');
		} else {
			var off = arguments[1];
			var len = arguments[2];			
			//sgurin : check for IndexOutOfBoundsException
			if(off<0 || len<0 || off+len>arguments[0].length)
				throw new java.lang.IndexOutOfBoundsException();
			var oo = new Array (len);
			for (var i = 0; i < len; i++) {
				oo[i] = o[off + i];
			}
			return oo.join ('');
		}
	}
	return "" + o;
};

String.prototype.subSequence = function (beginIndex, endIndex) {
	return this.substring(beginIndex, endIndex);
};

String.prototype.compareToIgnoreCase = function (str) {
	if (str == null) {
		throw new NullPointerException ();
	}
	var s1 = this.toUpperCase ();
	var s2 = str.toUpperCase ();
	if (s1 == s2) {
		return 0;
	} else {
		var s1 = this.toLowerCase ();
		var s2 = str.toLowerCase ();
		if (s1 == s2) {
			return 0;
		} else if (s1 > s2) {
			return 1;
		} else {
			return -1;
		}
	}
};

String.prototype.contentEquals = function (sb) {
	var sbLength;
	if(typeof sb.length == 'function') { 
		sbLength = sb.length();
	} else {
		sbLength = sb.length;
	}

	if (this.length != sbLength) {
		return false;
	}
	var v = sb.toString ();
	var i = 0;
	var j = 0;
	var n = this.length;
	while (n-- != 0) {
		if (this.charCodeAt (i++) != v.charCodeAt (j++)) {
			return false;
		}
	}
	return true;
};

String.prototype.getChars = function (srcBegin, srcEnd, dst, dstBegin) {
	if (srcBegin < 0) {
		throw new StringIndexOutOfBoundsException(srcBegin);
	}
	if (srcEnd > this.length) {
		throw new StringIndexOutOfBoundsException(srcEnd);
	}
	if (srcBegin > srcEnd) {
		throw new StringIndexOutOfBoundsException(srcEnd - srcBegin);
	}
	if (dst == null) {
		throw new NullPointerException ();
	}
	for (var i = 0; i < srcEnd - srcBegin; i++) {
		dst[dstBegin + i] = this.charAt (srcBegin + i);
	}
};
String.prototype.$concat = String.prototype.concat;
String.prototype.concat = function (s) {
	if (s == null) {
		throw new NullPointerException ();
	}
	return this.$concat (s);
};

String.prototype.$lastIndexOf = String.prototype.lastIndexOf;
String.prototype.lastIndexOf = function (s, last) {
	if (last != null && last + this.length <= 0) {	
		return -1;
	}
	if (last != null) {
		return this.$lastIndexOf (s, last);
	} else {
		return this.$lastIndexOf (s);
	}
};

String.prototype.intern = function () {
	return this.valueOf ();
};
String.copyValueOf = String.prototype.copyValueOf = function () {
	if (arguments.length == 1) {
		return String.instantialize (arguments[0]);
	} else {
		return String.instantialize (arguments[0], arguments[1], arguments[2]);
	}
};
String.indexOf = function (source, sourceOffset, sourceCount,
		target, targetOffset, targetCount, fromIndex) {
	if (fromIndex >= sourceCount) {
		return (targetCount == 0 ? sourceCount : -1);
	}
	if (fromIndex < 0) {
		fromIndex = 0;
	}
	if (targetCount == 0) {
		return fromIndex;
	}

	var first  = target[targetOffset];
	var i = sourceOffset + fromIndex;
	var max = sourceOffset + (sourceCount - targetCount);

	startSearchForFirstChar:
	while (true) {
		/* Look for first character. */
		while (i <= max && source[i] != first) {
			i++;
		}
		if (i > max) {
			return -1;
		}

		/* Found first character, now look at the rest of v2 */
		var j = i + 1;
		var end = j + targetCount - 1;
		var k = targetOffset + 1;
		while (j < end) {
			if (source[j++] != target[k++]) {
				i++;
				/* Look for str's first char again. */
				continue startSearchForFirstChar;
			}
		}
		return i - sourceOffset;	/* Found whole string. */
	}
};

String.instantialize = function () {
	if (arguments.length == 0) {
		return new String ();
	} else if (arguments.length == 1) {
		var x = arguments[0];
		if (typeof x == "string" || x instanceof String) {
			return new String (x);
		} else if (x instanceof Array) {
			if (x.length > 0 && typeof x[0] == "number") {
				var arr = new Array (x.length);
				for (var i = 0; i < x.length; i++) {
					arr[i] = String.fromCharCode (x[i] & 0xff);
				}
				return Encoding.readUTF8 (arr.join (''));
			}
			return x.join ('');
		} else if (x.__CLASS_NAME__ == "StringBuffer" 
				|| x.__CLASS_NAME__ == "java.lang.StringBuffer") {
			var value = x.shareValue();
			var length = x.length ();
			var valueCopy = new Array (length);
			for (var i = 0; i < length; i++) {
				valueCopy[i] = value[i];
			}
			return valueCopy.join ('')
			//return x.value.join ('');
		} else {
			return "" + x;
		}
	} else if (arguments.length == 2) {
		var x = arguments[0];
		var hibyte=arguments[1];
		if (typeof hibyte == "string") {
			return String.instantialize(x,0,x.length, hibyte);
		} else {
			return String.instantialize(x,hibyte,0,x.length);
		}
	} else if (arguments.length == 3) {
		var bytes = arguments[0];
		var offset = arguments[1];
		var length = arguments[2];
		if (arguments[2] instanceof Array) {
			bytes = arguments[2];
			offset = arguments[0];
			length = arguments[1];
		}
		var arr = new Array (length);
		if (offset < 0 || length + offset > bytes.length) {
			throw new IndexOutOfBoundsException ();
		}
		if (length > 0) {
			var isChar = (bytes[offset].length != null);
			if (isChar) {
				for (var i = 0; i < length; i++) {
					arr[i] = bytes[offset + i];
				}
			} else {
				for (var i = 0; i < length; i++) {
					arr[i]=String.fromCharCode (bytes[offset+i]);
				}
			}
		}
		return arr.join ('');
	} else if (arguments.length == 4) {
		var bytes = arguments[0];
		var y = arguments[3];
		if (typeof y == "string" || y instanceof String) {
			var offset = arguments[1];
			var length = arguments[2];
			var arr = new Array (length);
			for (var i = 0; i < length; i++) {
				arr[i] = bytes[offset + i];
				if (typeof arr[i] == "number") {
					arr[i] = String.fromCharCode (arr[i] & 0xff);
				}
			}
			var cs = y.toLowerCase ();
			if (cs == "utf-8" || cs == "utf8") {
				return Encoding.readUTF8 (arr.join (''));
			} else {
				return arr.join ('');
			}
		} else {
			var count = arguments[3];
			var offset = arguments[2];
			var hibyte = arguments[1];
			var value = new Array (count);
			if (hibyte == 0) {
				for (var i = count ; i-- > 0 ;) {
					value[i] = String.fromCharCode (bytes[i + offset] & 0xff);
				}
			} else {
				hibyte <<= 8;
				for (var i = count ; i-- > 0 ;) {
					value[i] = String.fromCharCode (hibyte | (bytes[i + offset] & 0xff));
				}
			}
			return value.join ('');
		}
	} else {
		var s = "";
		for (var i = 0; i < arguments.length; i++) {
		s += arguments[i];
		}
		return s;
	}
};

if (navigator.userAgent.toLowerCase ().indexOf ("chrome") != -1) { // Google Chrome's bug
	String.prototype.toString = function () {
		return this;
	};
}

} // end of String.prototype.$replace
});
