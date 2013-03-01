$_L(["java.util.Calendar"],"java.util.GregorianCalendar",["java.lang.IllegalArgumentException","java.util.Date","$.Locale","$.TimeZone"],function(){
c$=$_C(function(){
this.$gregorianCutover=-12219292800000;
this.$changeYear=1582;
this.$julianSkew=0;
this.$isCached=false;
this.$cachedFields=null;
this.$nextMidnightMillis=0;
this.$lastMidnightMillis=0;
this.$currentYearSkew=10;
this.$lastYearSkew=0;
$_Z(this,arguments);
},java.util,"GregorianCalendar",java.util.Calendar);
$_Y(c$,function(){
this.$julianSkew=(Math.floor((this.$changeYear-2000)/ 400)) + this.julianError () - (Math.floor ((this.$changeYear - 2000) /100));
this.$cachedFields=[0,0,0,0,0,0,0,0,0,0];
});
$_K(c$,
function(){
this.construct(java.util.TimeZone.getDefault(),java.util.Locale.getDefault());
});
$_K(c$,
function(year,month,day){
$_R(this,java.util.GregorianCalendar,[java.util.TimeZone.getDefault(),java.util.Locale.getDefault()]);
this.set(year,month,day);
},"~N,~N,~N");
$_K(c$,
function(year,month,day,hour,minute){
$_R(this,java.util.GregorianCalendar,[java.util.TimeZone.getDefault(),java.util.Locale.getDefault()]);
this.set(year,month,day,hour,minute);
},"~N,~N,~N,~N,~N");
$_K(c$,
function(year,month,day,hour,minute,second){
$_R(this,java.util.GregorianCalendar,[java.util.TimeZone.getDefault(),java.util.Locale.getDefault()]);
this.set(year,month,day,hour,minute,second);
},"~N,~N,~N,~N,~N,~N");
$_K(c$,
function(milliseconds){
this.construct(false);
this.setTimeInMillis(milliseconds);
},"~N");
$_K(c$,
function(locale){
this.construct(java.util.TimeZone.getDefault(),locale);
},"java.util.Locale");
$_K(c$,
function(timezone){
this.construct(timezone,java.util.Locale.getDefault());
},"java.util.TimeZone");
$_K(c$,
function(timezone,locale){
$_R(this,java.util.GregorianCalendar,[timezone,locale]);
this.setTimeInMillis(System.currentTimeMillis());
},"java.util.TimeZone,java.util.Locale");
$_K(c$,
function(ignored){
$_R(this,java.util.GregorianCalendar,[java.util.TimeZone.getDefault()]);
this.setFirstDayOfWeek(1);
this.setMinimalDaysInFirstWeek(1);
},"~B");
$_V(c$,"add",
function(field,value){
if(value==0){
return;
}if(field<0||field>=15){
throw new IllegalArgumentException();
}this.$isCached=false;
if(field==0){
this.complete();
if(this.fields[0]==1){
if(value>=0){
return;
}this.set(0,0);
}else{
if(value<=0){
return;
}this.set(0,1);
}this.complete();
return;
}if(field==1||field==2){
this.complete();
if(field==2){
var month=this.fields[2]+value;
if(month<0){
value=Math.floor((month-11)/12);
month=12+(month%12);
}else{
value=Math.floor(month/12);
}this.set(2,month%12);
}this.set(1,this.fields[1]+value);
var days=this.daysInMonth(this.isLeapYear(this.fields[1]),this.fields[2]);
if(this.fields[5]>days){
this.set(5,days);
}this.complete();
return;
}var multiplier=0;
this.getTimeInMillis();
switch(field){
case 14:
this.time+=value;
break;
case 13:
this.time+=value*1000;
break;
case 12:
this.time+=value*60000;
break;
case 10:
case 11:
this.time+=value*3600000;
break;
case 9:
multiplier=43200000;
break;
case 5:
case 6:
case 7:
multiplier=86400000;
break;
case 3:
case 4:
case 8:
multiplier=604800000;
break;
}
if(multiplier>0){
var zoneOffset=this.getTimeZone().getRawOffset();
var offset=this.getOffset(this.time+zoneOffset);
this.time+=value*multiplier;
var newOffset=this.getOffset(this.time+zoneOffset);
if(newOffset!=offset){
this.time+=offset-newOffset;
}}this.areFieldsSet=false;
this.complete();
},"~N,~N");
$_M(c$,"clone",
function(){
var thisClone=$_U(this,java.util.GregorianCalendar,"clone",[]);
thisClone.$cachedFields=this.$cachedFields.clone();
return thisClone;
});
$_M(c$,"fullFieldsCalc",
($fz=function(timeVal,millis,zoneOffset){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
var days=Math.floor(timeVal/86400000);
if(millis<0){
millis+=86400000;
days--;
}millis+=zoneOffset;
while(millis<0){
millis+=86400000;
days--;
}
while(millis>=86400000){
millis-=86400000;
days++;
}
var dayOfYear=this.computeYearAndDay(days,timeVal+zoneOffset);
this.fields[6]=dayOfYear;
if(this.fields[1]==this.$changeYear&&this.$gregorianCutover<=timeVal+zoneOffset){
dayOfYear+=this.$currentYearSkew;
}var month=Math.floor(dayOfYear/32);
var leapYear=this.isLeapYear(this.fields[1]);
var date=dayOfYear-this.daysInYear(leapYear,month);
if(date>this.daysInMonth(leapYear,month)){
date-=this.daysInMonth(leapYear,month);
month++;
}this.fields[7]=this.mod7(days-3)+1;
var dstOffset=this.fields[1]<=0?0:this.getTimeZone().getOffset(1,this.fields[1],month,date,this.fields[7],millis);
if(this.fields[1]>0){
dstOffset-=zoneOffset;
}this.fields[16]=dstOffset;
if(dstOffset!=0){
var oldDays=days;
millis+=dstOffset;
if(millis<0){
millis+=86400000;
days--;
}else if(millis>=86400000){
millis-=86400000;
days++;
}if(oldDays!=days){
dayOfYear=this.computeYearAndDay(days,timeVal-zoneOffset+dstOffset);
this.fields[6]=dayOfYear;
if(this.fields[1]==this.$changeYear&&this.$gregorianCutover<=timeVal-zoneOffset+dstOffset){
dayOfYear+=this.$currentYearSkew;
}month=Math.floor(dayOfYear/32);
leapYear=this.isLeapYear(this.fields[1]);
date=dayOfYear-this.daysInYear(leapYear,month);
if(date>this.daysInMonth(leapYear,month)){
date-=this.daysInMonth(leapYear,month);
month++;
}this.fields[7]=this.mod7(days-3)+1;
}}this.fields[14]=(millis%1000);
millis/=1000;
this.fields[13]=(millis%60);
millis/=60;
this.fields[12]=(millis%60);
millis/=60;
this.fields[11]=(millis%24);
this.fields[9]=this.fields[11]>11?1:0;
this.fields[10]=this.fields[11]%12;
if(this.fields[1]<=0){
this.fields[0]=0;
this.fields[1]=-this.fields[1]+1;
}else{
this.fields[0]=1;
}this.fields[2]=month;
this.fields[5]=date;
this.fields[8]=Math.floor((date-1)/7)+1;
this.fields[4]=Math.floor((date-1+this.mod7(days-date-2-(this.getFirstDayOfWeek()-1)))/7)+1;
var daysFromStart=this.mod7(days-3-(this.fields[6]-1)-(this.getFirstDayOfWeek()-1));
var week=Math.floor((this.fields[6]-1+daysFromStart)/7)+(7-daysFromStart>=this.getMinimalDaysInFirstWeek()?1:0);
if(week==0){
this.fields[3]=7-this.mod7(daysFromStart-(this.isLeapYear(this.fields[1]-1)?2:1))>=this.getMinimalDaysInFirstWeek()?53:52;
}else if(this.fields[6]>=(leapYear?367:366)-this.mod7(daysFromStart+(leapYear?2:1))){
this.fields[3]=7-this.mod7(daysFromStart+(leapYear?2:1))>=this.getMinimalDaysInFirstWeek()?1:week;
}else{
this.fields[3]=week;
}},$fz.isPrivate=true,$fz),"~N,~N,~N");
$_M(c$,"cachedFieldsCheckAndGet",
($fz=function(timeVal,newTimeMillis,newTimeMillisAdjusted,millis,zoneOffset){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
var dstOffset=this.fields[16];
if(!this.$isCached||newTimeMillis>=this.$nextMidnightMillis||newTimeMillis<=this.$lastMidnightMillis||this.$cachedFields[4]!=zoneOffset||(dstOffset==0&&(newTimeMillisAdjusted>=this.$nextMidnightMillis))||(dstOffset!=0&&(newTimeMillisAdjusted<=this.$lastMidnightMillis))){
this.fullFieldsCalc(timeVal,millis,zoneOffset);
this.$isCached=false;
}else{
this.fields[1]=this.$cachedFields[0];
this.fields[2]=this.$cachedFields[1];
this.fields[5]=this.$cachedFields[2];
this.fields[7]=this.$cachedFields[3];
this.fields[0]=this.$cachedFields[5];
this.fields[3]=this.$cachedFields[6];
this.fields[4]=this.$cachedFields[7];
this.fields[6]=this.$cachedFields[8];
this.fields[8]=this.$cachedFields[9];
}},$fz.isPrivate=true,$fz),"~N,~N,~N,~N,~N");
$_V(c$,"computeFields",
function(){
var timeZone=this.getTimeZone();
var dstOffset=timeZone.inDaylightTime(new java.util.Date(this.time))?timeZone.getDSTSavings():0;
var zoneOffset=timeZone.getRawOffset();
this.fields[16]=dstOffset;
this.fields[15]=zoneOffset;
var millis=(this.time%86400000);
var savedMillis=millis;
var offset=zoneOffset+dstOffset;
var newTime=this.time+offset;
if(this.time>0&&newTime<0&&offset>0){
newTime=0x7fffffffffffffff;
}else if(this.time<0&&newTime>0&&offset<0){
newTime=0x8000000000000000;
}if(this.$isCached){
if(millis<0){
millis+=86400000;
}millis+=zoneOffset;
millis+=dstOffset;
if(millis<0){
millis+=86400000;
}else if(millis>=86400000){
millis-=86400000;
}this.fields[14]=(millis%1000);
millis/=1000;
this.fields[13]=(millis%60);
millis/=60;
this.fields[12]=(millis%60);
millis/=60;
this.fields[11]=(millis%24);
millis/=24;
this.fields[9]=this.fields[11]>11?1:0;
this.fields[10]=this.fields[11]%12;
var newTimeAdjusted=newTime;
if(timeZone.useDaylightTime()){
var dstSavings=timeZone.getDSTSavings();
newTimeAdjusted+=(dstOffset==0)?dstSavings:-dstSavings;
}if(newTime>0&&newTimeAdjusted<0&&dstOffset==0){
newTimeAdjusted=0x7fffffffffffffff;
}else if(newTime<0&&newTimeAdjusted>0&&dstOffset!=0){
newTimeAdjusted=0x8000000000000000;
}this.cachedFieldsCheckAndGet(this.time,newTime,newTimeAdjusted,savedMillis,zoneOffset);
}else{
this.fullFieldsCalc(this.time,savedMillis,zoneOffset);
}for(var i=0;i<17;i++){
this.$isSet[i]=true;
}
if(!this.$isCached&&newTime!=0x7fffffffffffffff&&newTime!=0x8000000000000000&&(!timeZone.useDaylightTime()||$_O(timeZone,java.util.SimpleTimeZone))){
var cacheMillis=0;
this.$cachedFields[0]=this.fields[1];
this.$cachedFields[1]=this.fields[2];
this.$cachedFields[2]=this.fields[5];
this.$cachedFields[3]=this.fields[7];
this.$cachedFields[4]=zoneOffset;
this.$cachedFields[5]=this.fields[0];
this.$cachedFields[6]=this.fields[3];
this.$cachedFields[7]=this.fields[4];
this.$cachedFields[8]=this.fields[6];
this.$cachedFields[9]=this.fields[8];
cacheMillis+=(23-this.fields[11])*60*60*1000;
cacheMillis+=(59-this.fields[12])*60*1000;
cacheMillis+=(59-this.fields[13])*1000;
this.$nextMidnightMillis=newTime+cacheMillis;
cacheMillis=this.fields[11]*60*60*1000;
cacheMillis+=this.fields[12]*60*1000;
cacheMillis+=this.fields[13]*1000;
this.$lastMidnightMillis=newTime-cacheMillis;
this.$isCached=true;
}});
$_V(c$,"computeTime",
function(){
if(!this.isLenient()){
if(this.$isSet[11]){
if(this.fields[11]<0||this.fields[11]>23){
throw new IllegalArgumentException();
}}else if(this.$isSet[10]&&(this.fields[10]<0||this.fields[10]>11)){
throw new IllegalArgumentException();
}if(this.$isSet[12]&&(this.fields[12]<0||this.fields[12]>59)){
throw new IllegalArgumentException();
}if(this.$isSet[13]&&(this.fields[13]<0||this.fields[13]>59)){
throw new IllegalArgumentException();
}if(this.$isSet[14]&&(this.fields[14]<0||this.fields[14]>999)){
throw new IllegalArgumentException();
}if(this.$isSet[3]&&(this.fields[3]<1||this.fields[3]>53)){
throw new IllegalArgumentException();
}if(this.$isSet[7]&&(this.fields[7]<1||this.fields[7]>7)){
throw new IllegalArgumentException();
}if(this.$isSet[8]&&(this.fields[8]<1||this.fields[8]>6)){
throw new IllegalArgumentException();
}if(this.$isSet[4]&&(this.fields[4]<1||this.fields[4]>6)){
throw new IllegalArgumentException();
}if(this.$isSet[9]&&this.fields[9]!=0&&this.fields[9]!=1){
throw new IllegalArgumentException();
}if(this.$isSet[10]&&(this.fields[10]<0||this.fields[10]>11)){
throw new IllegalArgumentException();
}if(this.$isSet[1]){
if(this.$isSet[0]&&this.fields[0]==0&&(this.fields[1]<1||this.fields[1]>292269054)){
throw new IllegalArgumentException();
}else if(this.fields[1]<1||this.fields[1]>292278994){
throw new IllegalArgumentException();
}}if(this.$isSet[2]&&(this.fields[2]<0||this.fields[2]>11)){
throw new IllegalArgumentException();
}}var timeVal;
var hour=0;
if(this.$isSet[11]&&this.lastTimeFieldSet!=10){
hour=this.fields[11];
}else if(this.$isSet[10]){
hour=(this.fields[9]*12)+this.fields[10];
}timeVal=hour*3600000;
if(this.$isSet[12]){
timeVal+=(this.fields[12])*60000;
}if(this.$isSet[13]){
timeVal+=(this.fields[13])*1000;
}if(this.$isSet[14]){
timeVal+=this.fields[14];
}var days;
var year=this.$isSet[1]?this.fields[1]:1970;
if(this.$isSet[0]){
if(this.fields[0]!=0&&this.fields[0]!=1){
throw new IllegalArgumentException();
}if(this.fields[0]==0){
year=1-year;
}}var weekMonthSet=this.$isSet[4]||this.$isSet[8];
var useMonth=(this.$isSet[5]||this.$isSet[2]||weekMonthSet)&&this.lastDateFieldSet!=6;
if(useMonth&&(this.lastDateFieldSet==7||this.lastDateFieldSet==3)){
if(this.$isSet[3]&&this.$isSet[7]){
useMonth=this.lastDateFieldSet!=3&&weekMonthSet&&this.$isSet[7];
}else if(this.$isSet[6]){
useMonth=this.$isSet[5]&&this.$isSet[2];
}}if(useMonth){
var month=this.fields[2];
year+=Math.floor(month/12);
month%=12;
if(month<0){
year--;
month+=12;
}var leapYear=this.isLeapYear(year);
days=this.daysFromBaseYear(year)+this.daysInYear(leapYear,month);
var useDate=this.$isSet[5];
if(useDate&&(this.lastDateFieldSet==7||this.lastDateFieldSet==4||this.lastDateFieldSet==8)){
useDate=!(this.$isSet[7]&&weekMonthSet);
}if(useDate){
if(!this.isLenient()&&(this.fields[5]<1||this.fields[5]>this.daysInMonth(leapYear,month))){
throw new IllegalArgumentException();
}days+=this.fields[5]-1;
}else{
var dayOfWeek;
if(this.$isSet[7]){
dayOfWeek=this.fields[7]-1;
}else{
dayOfWeek=this.getFirstDayOfWeek()-1;
}if(this.$isSet[4]&&this.lastDateFieldSet!=8){
var skew=this.mod7(days-3-(this.getFirstDayOfWeek()-1));
days+=(this.fields[4]-1)*7+this.mod7(skew+dayOfWeek-(days-3))-skew;
}else if(this.$isSet[8]){
if(this.fields[8]>=0){
days+=this.mod7(dayOfWeek-(days-3))+(this.fields[8]-1)*7;
}else{
days+=this.daysInMonth(leapYear,month)+this.mod7(dayOfWeek-(days+this.daysInMonth(leapYear,month)-3))+this.fields[8]*7;
}}else if(this.$isSet[7]){
var skew=this.mod7(days-3-(this.getFirstDayOfWeek()-1));
days+=this.mod7(this.mod7(skew+dayOfWeek-(days-3))-skew);
}}}else{
var useWeekYear=this.$isSet[3]&&this.lastDateFieldSet!=6;
if(useWeekYear&&this.$isSet[6]){
useWeekYear=this.$isSet[7];
}days=this.daysFromBaseYear(year);
if(useWeekYear){
var dayOfWeek;
if(this.$isSet[7]){
dayOfWeek=this.fields[7]-1;
}else{
dayOfWeek=this.getFirstDayOfWeek()-1;
}var skew=this.mod7(days-3-(this.getFirstDayOfWeek()-1));
days+=(this.fields[3]-1)*7+this.mod7(skew+dayOfWeek-(days-3))-skew;
if(7-skew<this.getMinimalDaysInFirstWeek()){
days+=7;
}}else if(this.$isSet[6]){
if(!this.isLenient()&&(this.fields[6]<1||this.fields[6]>(365+(this.isLeapYear(year)?1:0)))){
throw new IllegalArgumentException();
}days+=this.fields[6]-1;
}else if(this.$isSet[7]){
days+=this.mod7(this.fields[7]-1-(days-3));
}}this.lastDateFieldSet=0;
timeVal+=days*86400000;
if(year==this.$changeYear&&timeVal>=this.$gregorianCutover+this.julianError()*86400000){
timeVal-=this.julianError()*86400000;
}var timeValWithoutDST=timeVal-this.getOffset(timeVal)+this.getTimeZone().getRawOffset();
timeVal-=this.getOffset(timeValWithoutDST);
this.time=timeVal;
if(timeValWithoutDST!=timeVal){
this.computeFields();
this.areFieldsSet=true;
}});
$_M(c$,"computeYearAndDay",
($fz=function(dayCount,localTime){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
var year=1970;
var days=dayCount;
if(localTime<this.$gregorianCutover){
days-=this.$julianSkew;
}var approxYears;
while((approxYears=(Math.floor(days/365)))!=0){
year=year+approxYears;
days=dayCount-this.daysFromBaseYear(year);
if(days<365&&days>-365)break;
}
if(days<0){
year=year-1;
days=days+this.daysInYear(year);
}this.fields[1]=year;
return days+1;
},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"daysFromBaseYear",
($fz=function(iyear){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
var year=iyear;
if(year>=1970){
var days=(year-1970)*365+(Math.floor((year-1969)/4));
if(year>this.$changeYear){
days-=(Math.floor((year-1901)/ 100)) - (Math.floor ((year - 1601) /400));
}else{
if(year==this.$changeYear){
days+=this.$currentYearSkew;
}else if(year==this.$changeYear-1){
days+=this.$lastYearSkew;
}else{
days+=this.$julianSkew;
}}return days;
}else if(year<=this.$changeYear){
return(year-1970)*365+(Math.floor((year-1972)/4))+this.$julianSkew;
}return(year-1970)*365+(Math.floor((year-1972)/ 4)) - (Math.floor ((year - 2000) /100))+(Math.floor((year-2000)/400));
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"daysInMonth",
($fz=function(){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
return this.daysInMonth(this.isLeapYear(this.fields[1]),this.fields[2]);
},$fz.isPrivate=true,$fz));
$_M(c$,"daysInMonth",
($fz=function(leapYear,month){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
if(leapYear&&month==1){
return java.util.GregorianCalendar.$DaysInMonth[month]+1;
}return java.util.GregorianCalendar.$DaysInMonth[month];
},$fz.isPrivate=true,$fz),"~B,~N");
$_M(c$,"daysInYear",
($fz=function(year){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
var daysInYear=this.isLeapYear(year)?366:365;
if(year==this.$changeYear){
daysInYear-=this.$currentYearSkew;
}if(year==this.$changeYear-1){
daysInYear-=this.$lastYearSkew;
}return daysInYear;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"daysInYear",
($fz=function(leapYear,month){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
if(leapYear&&month>1){
return java.util.GregorianCalendar.$DaysInYear[month]+1;
}return java.util.GregorianCalendar.$DaysInYear[month];
},$fz.isPrivate=true,$fz),"~B,~N");
$_M(c$,"equals",
function(object){
if(!($_O(object,java.util.GregorianCalendar))){
return false;
}if(object===this){
return true;
}return $_U(this,java.util.GregorianCalendar,"equals",[object])&&this.$gregorianCutover==(object).$gregorianCutover;
},"~O");
$_V(c$,"getActualMaximum",
function(field){
var value;
if((value=java.util.GregorianCalendar.$maximums[field])==java.util.GregorianCalendar.$leastMaximums[field]){
return value;
}switch(field){
case 3:
case 4:
this.$isCached=false;
break;
}
this.complete();
var orgTime=this.time;
var result=0;
switch(field){
case 3:
this.set(5,31);
this.set(2,11);
result=this.get(3);
if(result==1){
this.set(5,24);
result=this.get(3);
}this.areFieldsSet=false;
break;
case 4:
this.set(5,this.daysInMonth());
result=this.get(4);
this.areFieldsSet=false;
break;
case 5:
return this.daysInMonth();
case 6:
return this.daysInYear(this.fields[1]);
case 8:
result=this.get(8)+(Math.floor((this.daysInMonth()-this.get(5))/7));
break;
case 1:
var clone=this.clone();
if(this.get(0)==1){
clone.setTimeInMillis(9223372036854775807);
}else{
clone.setTimeInMillis(-9223372036854775808);
}result=clone.get(1);
clone.set(1,this.get(1));
if(clone.before(this)){
result--;
}break;
case 16:
result=this.getMaximum(16);
break;
}
this.time=orgTime;
return result;
},"~N");
$_V(c$,"getActualMinimum",
function(field){
return this.getMinimum(field);
},"~N");
$_V(c$,"getGreatestMinimum",
function(field){
return java.util.GregorianCalendar.$minimums[field];
},"~N");
$_M(c$,"getGregorianChange",
function(){
return new java.util.Date(this.$gregorianCutover);
});
$_V(c$,"getLeastMaximum",
function(field){
if(this.$gregorianCutover!=-12219292800000&&field==3){
var currentTimeInMillis=this.time;
this.setTimeInMillis(this.$gregorianCutover);
var actual=this.getActualMaximum(field);
this.setTimeInMillis(currentTimeInMillis);
return actual;
}return java.util.GregorianCalendar.$leastMaximums[field];
},"~N");
$_V(c$,"getMaximum",
function(field){
return java.util.GregorianCalendar.$maximums[field];
},"~N");
$_V(c$,"getMinimum",
function(field){
return java.util.GregorianCalendar.$minimums[field];
},"~N");
$_M(c$,"getOffset",
($fz=function(localTime){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
var timeZone=this.getTimeZone();
if(!timeZone.useDaylightTime()){
return timeZone.getRawOffset();
}var dayCount=Math.floor(localTime/86400000);
var millis=(localTime%86400000);
if(millis<0){
millis+=86400000;
dayCount--;
}var year=1970;
var days=dayCount;
if(localTime<this.$gregorianCutover){
days-=this.$julianSkew;
}var approxYears;
while((approxYears=(Math.floor(days/365)))!=0){
year=year+approxYears;
days=dayCount-this.daysFromBaseYear(year);
}
if(days<0){
year=year-1;
days=days+365+(this.isLeapYear(year)?1:0);
if(year==this.$changeYear&&localTime<this.$gregorianCutover){
days-=this.julianError();
}}if(year<=0){
return timeZone.getRawOffset();
}var dayOfYear=days+1;
var month=Math.floor(dayOfYear/32);
var leapYear=this.isLeapYear(year);
var date=dayOfYear-this.daysInYear(leapYear,month);
if(date>this.daysInMonth(leapYear,month)){
date-=this.daysInMonth(leapYear,month);
month++;
}var dayOfWeek=this.mod7(dayCount-3)+1;
var offset=timeZone.getOffset(1,year,month,date,dayOfWeek,millis);
return offset;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"hashCode",
function(){
return $_U(this,java.util.GregorianCalendar,"hashCode",[])+((this.$gregorianCutover>>>32)^this.$gregorianCutover);
});
$_V(c$,"isLeapYear",
function(year){
if(year>this.$changeYear){
return year%4==0&&(year%100!=0||year%400==0);
}return year%4==0;
},"~N");
$_M(c$,"julianError",
($fz=function(){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
return Math.floor(this.$changeYear/ 100) - Math.floor (this.$changeYear /400)-2;
},$fz.isPrivate=true,$fz));
$_M(c$,"mod",
($fz=function(value,mod){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
var rem=value%mod;
if(value<0&&rem<0){
return rem+mod;
}return rem;
},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"mod7",
($fz=function(num1){
var $private=$_X(arguments);
if($private!=null){
return $private.apply(this,arguments);
}
var rem=(num1%7);
if(num1<0&&rem<0){
return rem+7;
}return rem;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"roll",
function(field,value){
if(value==0){
return;
}if(field<0||field>=15){
throw new IllegalArgumentException();
}this.$isCached=false;
this.complete();
var days;
var day;
var mod;
var maxWeeks;
var newWeek;
var max=-1;
switch(field){
case 1:
max=java.util.GregorianCalendar.$maximums[field];
break;
case 3:
days=this.daysInYear(this.fields[1]);
day=6;
mod=this.mod7(this.fields[7]-this.fields[day]-(this.getFirstDayOfWeek()-1));
maxWeeks=Math.floor((days-1+mod)/7)+1;
newWeek=this.mod(this.fields[field]-1+value,maxWeeks)+1;
if(newWeek==maxWeeks){
var addDays=(newWeek-this.fields[field])*7;
if(this.fields[day]>addDays&&this.fields[day]+addDays>days){
this.set(field,1);
}else{
this.set(field,newWeek-1);
}}else if(newWeek==1){
var week=Math.floor((this.fields[day]-(Math.floor((this.fields[day]-1)/ 7) * 7) - 1 + mod) /7)+1;
if(week>1){
this.set(field,1);
}else{
this.set(field,newWeek);
}}else{
this.set(field,newWeek);
}break;
case 4:
days=this.daysInMonth();
day=5;
mod=this.mod7(this.fields[7]-this.fields[day]-(this.getFirstDayOfWeek()-1));
maxWeeks=Math.floor((days-1+mod)/7)+1;
newWeek=this.mod(this.fields[field]-1+value,maxWeeks)+1;
if(newWeek==maxWeeks){
if(this.fields[day]+(newWeek-this.fields[field])*7>days){
this.set(day,days);
}else{
this.set(field,newWeek);
}}else if(newWeek==1){
var week=Math.floor((this.fields[day]-(Math.floor((this.fields[day]-1)/ 7) * 7) - 1 + mod) /7)+1;
if(week>1){
this.set(day,1);
}else{
this.set(field,newWeek);
}}else{
this.set(field,newWeek);
}break;
case 5:
max=this.daysInMonth();
break;
case 6:
max=this.daysInYear(this.fields[1]);
break;
case 7:
max=java.util.GregorianCalendar.$maximums[field];
this.lastDateFieldSet=4;
break;
case 8:
max=Math.floor((this.fields[5]+(Math.floor((this.daysInMonth()-this.fields[5])/ 7) * 7) - 1) /7)+1;
break;
case 0:
case 2:
case 9:
case 10:
case 11:
case 12:
case 13:
case 14:
this.set(field,this.mod(this.fields[field]+value,java.util.GregorianCalendar.$maximums[field]+1));
if(field==2&&this.fields[5]>this.daysInMonth()){
this.set(5,this.daysInMonth());
}else if(field==9){
this.lastTimeFieldSet=10;
}break;
}
if(max!=-1){
this.set(field,this.mod(this.fields[field]-1+value,max)+1);
}this.complete();
},"~N,~N");
$_M(c$,"roll",
function(field,increment){
this.roll(field,increment?1:-1);
},"~N,~B");
$_M(c$,"setGregorianChange",
function(date){
this.$gregorianCutover=date.getTime();
var cal=new java.util.GregorianCalendar(java.util.TimeZone.GMT);
cal.setTime(date);
this.$changeYear=cal.get(1);
if(cal.get(0)==0){
this.$changeYear=1-this.$changeYear;
}this.$julianSkew=(Math.floor((this.$changeYear-2000)/ 400)) + this.julianError () - (Math.floor ((this.$changeYear - 2000) /100));
this.$isCached=false;
var dayOfYear=cal.get(6);
if(dayOfYear<this.$julianSkew){
this.$currentYearSkew=dayOfYear-1;
this.$lastYearSkew=this.$julianSkew-dayOfYear+1;
}else{
this.$lastYearSkew=0;
this.$currentYearSkew=this.$julianSkew;
}this.$isCached=false;
},"java.util.Date");
$_M(c$,"setFirstDayOfWeek",
function(value){
$_U(this,java.util.GregorianCalendar,"setFirstDayOfWeek",[value]);
this.$isCached=false;
},"~N");
$_M(c$,"setMinimalDaysInFirstWeek",
function(value){
$_U(this,java.util.GregorianCalendar,"setMinimalDaysInFirstWeek",[value]);
this.$isCached=false;
},"~N");
$_S(c$,
"$BC",0,
"$AD",1,
"$defaultGregorianCutover",-12219292800000,
"$DaysInMonth",[31,28,31,30,31,30,31,31,30,31,30,31],
"$DaysInYear",[0,31,59,90,120,151,181,212,243,273,304,334],
"$maximums",[1,292278994,11,53,6,31,366,7,6,1,11,23,59,59,999,50400000,7200000],
"$minimums",[0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,-46800000,0],
"$leastMaximums",[1,292269054,11,50,3,28,355,7,3,1,11,23,59,59,999,50400000,1200000]);
});
