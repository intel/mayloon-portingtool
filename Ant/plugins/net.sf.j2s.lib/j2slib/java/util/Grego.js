c$=$_T(java.util,"Grego");
c$.isLeapYear=$_M(c$,"isLeapYear",
function(year){
return((year&0x3)==0)&&((year%100!=0)||(year%400==0));
},"~N");
c$.monthLength=$_M(c$,"monthLength",
function(year,month){
return java.util.Grego.MONTH_LENGTH[month+(java.util.Grego.isLeapYear(year)?12:0)];
},"~N,~N");
c$.previousMonthLength=$_M(c$,"previousMonthLength",
function(year,month){
return(month>0)?java.util.Grego.monthLength(year,month-1):31;
},"~N,~N");
c$.fieldsToDay=$_M(c$,"fieldsToDay",
function(year,month,dom){
var y=year-1;
var julian=365*y+java.util.Grego.floorDivide(y,4)+(1721423)+java.util.Grego.floorDivide(y,400)-java.util.Grego.floorDivide(y,100)+2+java.util.Grego.DAYS_BEFORE[month+(java.util.Grego.isLeapYear(year)?12:0)]+dom;
return julian-2440588;
},"~N,~N,~N");
c$.dayOfWeek=$_M(c$,"dayOfWeek",
function(day){
var remainder=$_A(1,0);
java.util.Grego.floorDivide(day+5,7,remainder);
var dayOfWeek=remainder[0];
dayOfWeek=(dayOfWeek==0)?7:dayOfWeek;
return dayOfWeek;
},"~N");
c$.dayToFields=$_M(c$,"dayToFields",
function(day,fields){
if(fields==null||fields.length<5){
fields=$_A(5,0);
}day+=719162;
var rem=$_A(1,0);
var n400=java.util.Grego.floorDivide(day,146097,rem);
var n100=java.util.Grego.floorDivide(rem[0],36524,rem);
var n4=java.util.Grego.floorDivide(rem[0],1461,rem);
var n1=java.util.Grego.floorDivide(rem[0],365,rem);
var year=(400*n400+100*n100+4*n4+n1);
var dayOfYear=rem[0];
if(n100==4||n1==4){
dayOfYear=365;
}else{
++year;
}var isLeap=java.util.Grego.isLeapYear(year);
var correction=0;
var march1=isLeap?60:59;
if(dayOfYear>=march1){
correction=isLeap?1:2;
}var month=Math.floor((12*(dayOfYear+correction)+6)/367);
var dayOfMonth=dayOfYear-java.util.Grego.DAYS_BEFORE[isLeap?month+12:month]+1;
var dayOfWeek=((day+2)%7);
if(dayOfWeek<1){
dayOfWeek+=7;
}dayOfYear++;
fields[0]=year;
fields[1]=month;
fields[2]=dayOfMonth;
fields[3]=dayOfWeek;
fields[4]=dayOfYear;
return fields;
},"~N,~A");
c$.timeToFields=$_M(c$,"timeToFields",
function(time,fields){
if(fields==null||fields.length<6){
fields=$_A(6,0);
}var remainder=$_A(1,0);
var day=java.util.Grego.floorDivide(time,86400000,remainder);
java.util.Grego.dayToFields(day,fields);
fields[5]=remainder[0];
return fields;
},"~N,~A");
c$.floorDivide=$_M(c$,"floorDivide",
function(numerator,denominator){
return(numerator>=0)?Math.floor(numerator/ denominator) : (Math.floor ((numerator + 1) /denominator))-1;
},"~N,~N");
c$.floorDivide=$_M(c$,"floorDivide",
($fz=function(numerator,denominator,remainder){
if(numerator>=0){
remainder[0]=numerator%denominator;
return Math.floor(numerator/denominator);
}var quotient=(Math.floor((numerator+1)/denominator))-1;
remainder[0]=numerator-(quotient*denominator);
return quotient;
},$fz.isPrivate=true,$fz),"~N,~N,~A");
c$.getDayOfWeekInMonth=$_M(c$,"getDayOfWeekInMonth",
function(year,month,dayOfMonth){
var weekInMonth=Math.floor((dayOfMonth+6)/7);
if(weekInMonth==4){
if(dayOfMonth+7>java.util.Grego.monthLength(year,month)){
weekInMonth=-1;
}}else if(weekInMonth==5){
weekInMonth=-1;
}return weekInMonth;
},"~N,~N,~N");
$_S(c$,
"MIN_MILLIS",-184303902528000000,
"MAX_MILLIS",183882168921600000,
"MILLIS_PER_SECOND",1000,
"MILLIS_PER_MINUTE",60000,
"MILLIS_PER_HOUR",3600000,
"MILLIS_PER_DAY",86400000,
"JULIAN_1_CE",1721426,
"JULIAN_1970_CE",2440588,
"MONTH_LENGTH",[31,28,31,30,31,30,31,31,30,31,30,31,31,29,31,30,31,30,31,31,30,31,30,31],
"DAYS_BEFORE",[0,31,59,90,120,151,181,212,243,273,304,334,0,31,60,91,121,152,182,213,244,274,305,335]);
