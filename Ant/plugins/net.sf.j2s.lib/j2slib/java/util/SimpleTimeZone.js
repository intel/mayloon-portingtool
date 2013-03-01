$_L(["java.util.TimeZone","java.io.ObjectStreamField","java.lang.Boolean"],"java.util.SimpleTimeZone",["java.lang.IllegalArgumentException","java.util.Grego","$.GregorianCalendar"],function(){
c$=$_C(function(){
this.rawOffset=0;
this.startYear=0;
this.startMonth=0;
this.startDay=0;
this.startDayOfWeek=0;
this.startTime=0;
this.endMonth=0;
this.endDay=0;
this.endDayOfWeek=0;
this.endTime=0;
this.startMode=0;
this.endMode=0;
this.useDaylight=false;
this.dstSavings=3600000;
$_Z(this,arguments);
},java.util,"SimpleTimeZone",java.util.TimeZone);
$_K(c$,
function(offset,name){
$_R(this,java.util.SimpleTimeZone,[]);
this.setID(name);
this.rawOffset=offset;
},"~N,~S");
$_K(c$,
function(offset,name,startMonth,startDay,startDayOfWeek,startTime,endMonth,endDay,endDayOfWeek,endTime){
this.construct(offset,name,startMonth,startDay,startDayOfWeek,startTime,endMonth,endDay,endDayOfWeek,endTime,3600000);
},"~N,~S,~N,~N,~N,~N,~N,~N,~N,~N");
$_K(c$,
function(offset,name,startMonth,startDay,startDayOfWeek,startTime,endMonth,endDay,endDayOfWeek,endTime,daylightSavings){
this.construct(offset,name);
if(daylightSavings<=0){
throw new IllegalArgumentException("Invalid daylightSavings:"+daylightSavings);
}this.dstSavings=daylightSavings;
this.setStartRule(startMonth,startDay,startDayOfWeek,startTime);
this.setEndRule(endMonth,endDay,endDayOfWeek,endTime);
},"~N,~S,~N,~N,~N,~N,~N,~N,~N,~N,~N");
$_K(c$,
function(offset,name,startMonth,startDay,startDayOfWeek,startTime,startTimeMode,endMonth,endDay,endDayOfWeek,endTime,endTimeMode,daylightSavings){
this.construct(offset,name,startMonth,startDay,startDayOfWeek,startTime,endMonth,endDay,endDayOfWeek,endTime,daylightSavings);
this.startMode=startTimeMode;
this.endMode=endTimeMode;
},"~N,~S,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
$_M(c$,"clone",
function(){
var zone=$_U(this,java.util.SimpleTimeZone,"clone",[]);
return zone;
});
$_V(c$,"equals",
function(object){
if(!($_O(object,java.util.SimpleTimeZone))){
return false;
}var tz=object;
return this.getID().equals(tz.getID())&&this.rawOffset==tz.rawOffset&&this.useDaylight==tz.useDaylight&&(!this.useDaylight||(this.startYear==tz.startYear&&this.startMonth==tz.startMonth&&this.startDay==tz.startDay&&this.startMode==tz.startMode&&this.startDayOfWeek==tz.startDayOfWeek&&this.startTime==tz.startTime&&this.endMonth==tz.endMonth&&this.endDay==tz.endDay&&this.endDayOfWeek==tz.endDayOfWeek&&this.endTime==tz.endTime&&this.endMode==tz.endMode&&this.dstSavings==tz.dstSavings));
},"~O");
$_V(c$,"getDSTSavings",
function(){
if(!this.useDaylight){
return 0;
}return this.dstSavings;
});
$_M(c$,"getOffset",
function(era,year,month,day,dayOfWeek,time){
if(era!=0&&era!=1){
throw new IllegalArgumentException("Invalid era:"+era);
}this.checkRange(month,dayOfWeek,time);
if(month!=1||day!=29||!this.isLeapYear(year)){
this.checkDay(month,day);
}if(!this.useDaylightTime()||era!=1||year<this.startYear){
return this.rawOffset;
}if(this.endMonth<this.startMonth){
if(month>this.endMonth&&month<this.startMonth){
return this.rawOffset;
}}else{
if(month<this.startMonth||month>this.endMonth){
return this.rawOffset;
}}var ruleDay=0;
var daysInMonth;
var firstDayOfMonth=this.mod7(dayOfWeek-day);
if(month==this.startMonth){
switch(this.startMode){
case 1:
ruleDay=this.startDay;
break;
case 2:
if(this.startDay>=0){
ruleDay=this.mod7(this.startDayOfWeek-firstDayOfMonth)+1+(this.startDay-1)*7;
}else{
daysInMonth=java.util.GregorianCalendar.$DaysInMonth[this.startMonth];
if(this.startMonth==1&&this.isLeapYear(year)){
daysInMonth+=1;
}ruleDay=daysInMonth+1+this.mod7(this.startDayOfWeek-(firstDayOfMonth+daysInMonth))+this.startDay*7;
}break;
case 3:
ruleDay=this.startDay+this.mod7(this.startDayOfWeek-(firstDayOfMonth+this.startDay-1));
break;
case 4:
ruleDay=this.startDay+this.mod7(this.startDayOfWeek-(firstDayOfMonth+this.startDay-1));
if(ruleDay!=this.startDay){
ruleDay-=7;
}break;
}
if(ruleDay>day||ruleDay==day&&time<this.startTime){
return this.rawOffset;
}}var ruleTime=this.endTime-this.dstSavings;
var nextMonth=(month+1)%12;
if(month==this.endMonth||(ruleTime<0&&nextMonth==this.endMonth)){
switch(this.endMode){
case 1:
ruleDay=this.endDay;
break;
case 2:
if(this.endDay>=0){
ruleDay=this.mod7(this.endDayOfWeek-firstDayOfMonth)+1+(this.endDay-1)*7;
}else{
daysInMonth=java.util.GregorianCalendar.$DaysInMonth[this.endMonth];
if(this.endMonth==1&&this.isLeapYear(year)){
daysInMonth++;
}ruleDay=daysInMonth+1+this.mod7(this.endDayOfWeek-(firstDayOfMonth+daysInMonth))+this.endDay*7;
}break;
case 3:
ruleDay=this.endDay+this.mod7(this.endDayOfWeek-(firstDayOfMonth+this.endDay-1));
break;
case 4:
ruleDay=this.endDay+this.mod7(this.endDayOfWeek-(firstDayOfMonth+this.endDay-1));
if(ruleDay!=this.endDay){
ruleDay-=7;
}break;
}
var ruleMonth=this.endMonth;
if(ruleTime<0){
var changeDays=1-(Math.floor(ruleTime/86400000));
ruleTime=(ruleTime%86400000)+86400000;
ruleDay-=changeDays;
if(ruleDay<=0){
if(--ruleMonth<0){
ruleMonth=11;
}ruleDay+=java.util.GregorianCalendar.$DaysInMonth[ruleMonth];
if(ruleMonth==1&&this.isLeapYear(year)){
ruleDay++;
}}}if(month==ruleMonth){
if(ruleDay<day||ruleDay==day&&time>=ruleTime){
return this.rawOffset;
}}else if(nextMonth!=ruleMonth){
return this.rawOffset;
}}return this.rawOffset+this.dstSavings;
},"~N,~N,~N,~N,~N,~N");
$_M(c$,"getOffset",
function(time){
if(!this.useDaylightTime()){
return this.rawOffset;
}var fields=java.util.Grego.timeToFields(time+this.rawOffset,null);
return this.getOffset(1,fields[0],fields[1],fields[2],fields[3],fields[5]);
},"~N");
$_V(c$,"getRawOffset",
function(){
return this.rawOffset;
});
$_V(c$,"hashCode",
function(){
var hashCode=this.getID().hashCode()+this.rawOffset;
if(this.useDaylight){
hashCode+=this.startYear+this.startMonth+this.startDay+this.startDayOfWeek+this.startTime+this.startMode+this.endMonth+this.endDay+this.endDayOfWeek+this.endTime+this.endMode+this.dstSavings;
}return hashCode;
});
$_V(c$,"hasSameRules",
function(zone){
if(!($_O(zone,java.util.SimpleTimeZone))){
return false;
}var tz=zone;
if(this.useDaylight!=tz.useDaylight){
return false;
}if(!this.useDaylight){
return this.rawOffset==tz.rawOffset;
}return this.rawOffset==tz.rawOffset&&this.dstSavings==tz.dstSavings&&this.startYear==tz.startYear&&this.startMonth==tz.startMonth&&this.startDay==tz.startDay&&this.startMode==tz.startMode&&this.startDayOfWeek==tz.startDayOfWeek&&this.startTime==tz.startTime&&this.endMonth==tz.endMonth&&this.endDay==tz.endDay&&this.endDayOfWeek==tz.endDayOfWeek&&this.endTime==tz.endTime&&this.endMode==tz.endMode;
},"java.util.TimeZone");
$_V(c$,"inDaylightTime",
function(time){
return this.useDaylightTime()&&this.getOffset(time.getTime())!=this.rawOffset;
},"java.util.Date");
$_M(c$,"isLeapYear",
($fz=function(year){
if(year>1582){
return year%4==0&&(year%100!=0||year%400==0);
}return year%4==0;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"mod7",
($fz=function(num1){
var rem=num1%7;
return(num1<0&&rem<0)?7+rem:rem;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"setDSTSavings",
function(milliseconds){
if(milliseconds>0){
this.dstSavings=milliseconds;
}else{
throw new IllegalArgumentException();
}},"~N");
$_M(c$,"checkRange",
($fz=function(month,dayOfWeek,time){
if(month<0||month>11){
throw new IllegalArgumentException("Invalid month:"+month);
}if(dayOfWeek<1||dayOfWeek>7){
throw new IllegalArgumentException("Invalid day of week:"+dayOfWeek);
}if(time<0||time>=86400000){
throw new IllegalArgumentException("Invalid time:"+time);
}},$fz.isPrivate=true,$fz),"~N,~N,~N");
$_M(c$,"checkDay",
($fz=function(month,day){
if(day<=0||day>java.util.GregorianCalendar.$DaysInMonth[month]){
throw new IllegalArgumentException("Invalid day of month:"+day);
}},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"setEndMode",
($fz=function(){
if(this.endDayOfWeek==0){
this.endMode=1;
}else if(this.endDayOfWeek<0){
this.endDayOfWeek=-this.endDayOfWeek;
if(this.endDay<0){
this.endDay=-this.endDay;
this.endMode=4;
}else{
this.endMode=3;
}}else{
this.endMode=2;
}this.useDaylight=this.startDay!=0&&this.endDay!=0;
if(this.endDay!=0){
this.checkRange(this.endMonth,this.endMode==1?1:this.endDayOfWeek,this.endTime);
if(this.endMode!=2){
this.checkDay(this.endMonth,this.endDay);
}else{
if(this.endDay<-5||this.endDay>5){
throw new IllegalArgumentException("Day of week in month:"+this.endDay);
}}}if(this.endMode!=1){
this.endDayOfWeek--;
}},$fz.isPrivate=true,$fz));
$_M(c$,"setEndRule",
function(month,dayOfMonth,time){
this.endMonth=month;
this.endDay=dayOfMonth;
this.endDayOfWeek=0;
this.endTime=time;
this.setEndMode();
},"~N,~N,~N");
$_M(c$,"setEndRule",
function(month,day,dayOfWeek,time){
this.endMonth=month;
this.endDay=day;
this.endDayOfWeek=dayOfWeek;
this.endTime=time;
this.setEndMode();
},"~N,~N,~N,~N");
$_M(c$,"setEndRule",
function(month,day,dayOfWeek,time,after){
this.endMonth=month;
this.endDay=after?day:-day;
this.endDayOfWeek=-dayOfWeek;
this.endTime=time;
this.setEndMode();
},"~N,~N,~N,~N,~B");
$_V(c$,"setRawOffset",
function(offset){
this.rawOffset=offset;
},"~N");
$_M(c$,"setStartMode",
($fz=function(){
if(this.startDayOfWeek==0){
this.startMode=1;
}else if(this.startDayOfWeek<0){
this.startDayOfWeek=-this.startDayOfWeek;
if(this.startDay<0){
this.startDay=-this.startDay;
this.startMode=4;
}else{
this.startMode=3;
}}else{
this.startMode=2;
}this.useDaylight=this.startDay!=0&&this.endDay!=0;
if(this.startDay!=0){
this.checkRange(this.startMonth,this.startMode==1?1:this.startDayOfWeek,this.startTime);
if(this.startMode!=2){
this.checkDay(this.startMonth,this.startDay);
}else{
if(this.startDay<-5||this.startDay>5){
throw new IllegalArgumentException("Day of week in month:"+this.startDay);
}}}if(this.startMode!=1){
this.startDayOfWeek--;
}},$fz.isPrivate=true,$fz));
$_M(c$,"setStartRule",
function(month,dayOfMonth,time){
this.startMonth=month;
this.startDay=dayOfMonth;
this.startDayOfWeek=0;
this.startTime=time;
this.setStartMode();
},"~N,~N,~N");
$_M(c$,"setStartRule",
function(month,day,dayOfWeek,time){
this.startMonth=month;
this.startDay=day;
this.startDayOfWeek=dayOfWeek;
this.startTime=time;
this.setStartMode();
},"~N,~N,~N,~N");
$_M(c$,"setStartRule",
function(month,day,dayOfWeek,time,after){
this.startMonth=month;
this.startDay=after?day:-day;
this.startDayOfWeek=-dayOfWeek;
this.startTime=time;
this.setStartMode();
},"~N,~N,~N,~N,~B");
$_M(c$,"setStartYear",
function(year){
this.startYear=year;
this.useDaylight=true;
},"~N");
$_V(c$,"toString",
function(){
return this.getClass().getName()+"[id="+this.getID()+",offset="+this.rawOffset+",dstSavings="+this.dstSavings+",useDaylight="+this.useDaylight+",startYear="+this.startYear+",startMode="+this.startMode+",startMonth="+this.startMonth+",startDay="+this.startDay+",startDayOfWeek="+(this.useDaylight&&(this.startMode!=1)?this.startDayOfWeek+1:0)+",startTime="+this.startTime+",endMode="+this.endMode+",endMonth="+this.endMonth+",endDay="+this.endDay+",endDayOfWeek="+(this.useDaylight&&(this.endMode!=1)?this.endDayOfWeek+1:0)+",endTime="+this.endTime+"]";
});
$_V(c$,"useDaylightTime",
function(){
return this.useDaylight;
});
$_S(c$,
"DOM_MODE",1,
"DOW_IN_MONTH_MODE",2,
"DOW_GE_DOM_MODE",3,
"DOW_LE_DOM_MODE",4,
"UTC_TIME",2,
"STANDARD_TIME",1,
"WALL_TIME",0);
c$.serialPersistentFields=c$.prototype.serialPersistentFields=[new java.io.ObjectStreamField("dstSavings",Integer.TYPE),new java.io.ObjectStreamField("endDay",Integer.TYPE),new java.io.ObjectStreamField("endDayOfWeek",Integer.TYPE),new java.io.ObjectStreamField("endMode",Integer.TYPE),new java.io.ObjectStreamField("endMonth",Integer.TYPE),new java.io.ObjectStreamField("endTime",Integer.TYPE),new java.io.ObjectStreamField("monthLength",Array),new java.io.ObjectStreamField("rawOffset",Integer.TYPE),new java.io.ObjectStreamField("serialVersionOnStream",Integer.TYPE),new java.io.ObjectStreamField("startDay",Integer.TYPE),new java.io.ObjectStreamField("startDayOfWeek",Integer.TYPE),new java.io.ObjectStreamField("startMode",Integer.TYPE),new java.io.ObjectStreamField("startMonth",Integer.TYPE),new java.io.ObjectStreamField("startTime",Integer.TYPE),new java.io.ObjectStreamField("startYear",Integer.TYPE),new java.io.ObjectStreamField("useDaylight",Boolean.TYPE)];
});
