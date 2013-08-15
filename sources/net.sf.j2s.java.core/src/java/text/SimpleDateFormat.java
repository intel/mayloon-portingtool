package java.text;

import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;
import java.util.regex.Pattern;


public class SimpleDateFormat extends DateFormat {
    
    
    private String pattern;

    private String dayNames[] = {"Sunday", "Monday", "Tuesday", "Wednesday", 
                                    "Thursday", "Friday", "Saturday"};
    private String monthNames[] = {"January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"};

    public SimpleDateFormat(String pattern) {
        this.pattern = pattern;
    }

    /**
     * Constructs a <code>SimpleDateFormat</code> using the given pattern and
     * the default date format symbols for the given locale.
     * <b>Note:</b> This constructor may not support all locales.
     * For full coverage, use the factory methods in the {@link DateFormat}
     * class.
     *
     * @param pattern the pattern describing the date and time format
     * @param locale the locale whose date format symbols should be used
     * @exception NullPointerException if the given pattern or locale is null
     * @exception IllegalArgumentException if the given pattern is invalid
     */
    public SimpleDateFormat(String pattern, Locale locale) {

    }

    private String padZero(String str, int len) {
        while (str.length() < len) {
            str = "0" + str;
        }
        return str;
    }

    public String format(Date date) {

        String format = this.pattern;
        if (format == null || "".equals(format)) {
            return date.toLocaleString();
        }
        padZero("", 2);
        /**
         * @j2sNative
         * var regex = /y+|M+|d+|H+|h+|m+|s+|S+|E+|a+/;
         * var res;
         * var returnData = "";
         * var rowData = "";
         * while (res = regex.exec(format)) {
         *     var match = res[0];
         *     switch(match.charAt(0)) {
         *         case "y" :
         *             var year = date.getFullYear()+"";
         *             rowData = match.length < 4 ? year.substr(2) : year;
         *             break;
         *         case "M" :
         *              if(match.length < 3){
         *                  rowData = this.padZero(date.getMonth()+1+"", match.length);
         *              } else {
         *                  rowData = this.monthNames[date.getMonth()].substring(0, 3);
         *              }
         *              break;
         *         case "d" :
         *             rowData = date.getDate()+"";
         *             break;
         *         case "H" :
         *             rowData = this.padZero(date.getHours()+"", match.length);
         *             break;
         *         case "h" :
         *             rowData = this.padZero((date.getHours() % 12 || 12)+"", match.length);	
         *             break;
         *         case "m" :
         *             rowData = this.padZero(date.getMinutes()+"", match.length);
         *             break;
         *         case "s" :
         *             rowData = this.padZero(date.getSeconds()+"", match.length);				
         *             break;
         *         case "S" :
         *             rowData = this.padZero(date.getMilliseconds()+"", 3);
         *             break;
         *         case "E" :
         *             rowData = this.dayNames[date.getDay()].substring(0, 3);
         *             break;
         *         case "a" :
         *             rowData = (date.getHours() >= 12) ? "PM" : "AM";
         *             break;
         *      }
         *      format = format.replace(match, rowData);
         *      returnData += format.substring(0, res.index + rowData.length);
         *      format = format.substr(res.index + rowData.length);
         *  }
         *  return returnData;
         * */{}
        return date.toLocaleString();
    }

    @Override
    public StringBuffer format(Object obj, StringBuffer toAppendTo, FieldPosition pos) {
        return null;
    }

    @Override
    public Date parse(String source) {
        return new Date(source);
    }

    @Override
    public Date parse(String source, ParsePosition pos) {
         return parse(source);
    }
}
