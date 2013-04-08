Clazz.declarePackage ("net.sf.j2s.core.compiler");
Clazz.load (null, "net.sf.j2s.core.compiler.RegExCompress", ["java.lang.StringBuffer", "java.util.regex.Pattern"], function () {
c$ = Clazz.declareType (net.sf.j2s.core.compiler, "RegExCompress");
c$.mk = Clazz.defineMethod (c$, "mk", 
function (str, regex, replacement) {
var matcher = java.util.regex.Pattern.compile (regex).matcher (str);
matcher.reset ();
var result = matcher.find ();
if (result) {
var sb =  new StringBuffer ();
do {
if (matcher.group (10) != null) {
matcher.appendReplacement (sb, "$11 $12");
} else if (matcher.group (13) != null) {
matcher.appendReplacement (sb, "$14 $15");
} else {
matcher.appendReplacement (sb, replacement);
}result = matcher.find ();
} while (result);
matcher.appendTail (sb);
return sb.toString ();
}return str;
}, "~S,~S,~S");
c$.regexCompress = Clazz.defineMethod (c$, "regexCompress", 
function (str) {
str = str.replaceAll ("(\r([^\n]))|(([^\r])\n)", "$4\r\n$2");
var ignoreCSS = false;
var cssCodes = null;
var idx1 = str.indexOf ("$WTC$$.registerCSS");
var idx2 = -1;
var idx = idx1;
while (idx != -1) {
var index = str.indexOf ("\");\r\n", idx);
if (index != -1) {
idx2 = index + 5;
ignoreCSS = true;
idx = str.indexOf ("$WTC$$.registerCSS", idx2);
} else {
break;
}}
var specialFunKey = "@324@();\r\n";
if (ignoreCSS) {
cssCodes = str.substring (idx1, idx2);
str = str.substring (0, idx1) + specialFunKey + str.substring (idx2);
}var regEx = "(\'\'|\'[^\\n\\r]*[^\\\\]\')|(\"\"|\"([^\\n\\r\\\"]|\\\\\\\")*[^\\\\]\")|(\\/\\/[^\\n\\r]*[\\n\\r])|(\\/\\*[^*]*\\*+([^\\/][^*]*\\*+)*\\/)|(\\s+(\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*))|([^\\w\\x24\\/\'\"*)\\?:]\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*)";
str = net.sf.j2s.core.compiler.RegExCompress.mk (str, regEx + "|((\\b|\\x24)\\s+(\\b|\\x24))|" + "(([+\\-])\\s+([+\\-]))|" + "(\\s+)", "$1$2$8$9");
if (ignoreCSS) {
idx = str.indexOf (specialFunKey);
if (idx != -1) {
str = str.substring (0, idx) + cssCodes + str.substring (idx + specialFunKey.length);
} else {
System.err.println ("Error! Fail to ignore CSS codes!");
}}return str;
}, "~S");
c$.regexCompress2 = Clazz.defineMethod (c$, "regexCompress2", 
function (str) {
str = str.replaceAll ("(\r([^\n]))|(([^\r])\n)", "$4\r\n$2");
var ignoreCSS = false;
var cssCodes = null;
var idx1 = str.indexOf ("$WTC$$.registerCSS");
var idx2 = -1;
var idx = idx1;
while (idx != -1) {
var index = str.indexOf ("\");\r\n", idx);
if (index != -1) {
idx2 = index + 5;
ignoreCSS = true;
idx = str.indexOf ("$WTC$$.registerCSS", idx2);
} else {
break;
}}
var specialFunKey = "@324@();\r\n";
if (ignoreCSS) {
cssCodes = str.substring (idx1, idx2);
str = str.substring (0, idx1) + specialFunKey + str.substring (idx2);
}var whiteSpace = "[ \\f\\t\\v]";
var regEx = "(\'\'|\'[^\\n\\r]*[^\\\\]\')|(\"\"|\"([^\\n\\r\\\"]\")*[^\\\\]\")|(\\/\\/[^\\n\\r]*[\\n\\r])|(\\/\\*[^*]*\\*+([^\\/][^*]*\\*+)*\\/)|(" + whiteSpace + "+(\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*))|" + "([^\\w\\x24\\/'\"*)\\?:]\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*)";
str = net.sf.j2s.core.compiler.RegExCompress.mk (str, regEx + "|((\\b|\\x24)" + whiteSpace + "+(\\b|\\x24))|" + "(([+\\-])" + whiteSpace + "+([+\\-]))|" + "(" + whiteSpace + "+)", "$1$2$8$9");
if (ignoreCSS) {
idx = str.indexOf (specialFunKey);
if (idx != -1) {
str = str.substring (0, idx) + cssCodes + str.substring (idx + specialFunKey.length);
} else {
System.err.println ("Error! Fail to ignore CSS codes!");
}}return str;
}, "~S");
});
