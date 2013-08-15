/*
 * %W% %E%
 *
 * Copyright (c) 2006, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

/*
 * (C) Copyright Taligent, Inc. 1996 - All Rights Reserved
 * (C) Copyright IBM Corp. 1996 - All Rights Reserved
 *
 *   The original version of this source code and documentation is copyrighted
 * and owned by Taligent, Inc., a wholly-owned subsidiary of IBM. These
 * materials are provided under terms of a License Agreement between Taligent
 * and Sun. This technology is protected by multiple US and International
 * patents. This notice and attribution to Taligent may not be removed.
 *   Taligent is a registered trademark of Taligent, Inc.
 *
 */

package java.text;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;


public abstract class DateFormat extends Format {
    /**
     * The calendar that <code>DateFormat</code> uses to produce the time field
     * values needed to implement date and time formatting.  Subclasses should
     * initialize this to a calendar appropriate for the locale associated with
     * this <code>DateFormat</code>.
     * @serial
     */
    protected Calendar calendar;

    /**
     * Formats a Date into a date/time string.
     * @param date the time value to be formatted into a time string.
     * @return the formatted time string.
     */
    public abstract String format(Date date);

    /**
     * Gets the time formatter with the default formatting style
     * for the default locale.
     * @return a time formatter.
     */
    public final static DateFormat getTimeInstance() {
        return new SimpleDateFormat("M/d/yy h:mm a");
    }

    /**
     * Gets the time formatter with the given formatting style
     * for the default locale.
     * @param style the given formatting style. For example,
     * SHORT for "h:mm a" in the US locale.
     * @return a time formatter.
     */
    public final static DateFormat getTimeInstance(int style) {
        return getTimeInstance();
    }
    
    /**
     * Parses text from the beginning of the given string to produce a date.
     * The method may not use the entire text of the given string.
     * <p>
     * See the {@link #parse(String, ParsePosition)} method for more information
     * on date parsing.
     *
     * @param source A <code>String</code> whose beginning should be parsed.
     * @return A <code>Date</code> parsed from the string.
     */
    public Date parse(String source) {
        ParsePosition pos = new ParsePosition(0);
        Date result = parse(source, pos);
        return result;
    }

    /**
     * Parse a date/time string according to the given parse position.  For
     * example, a time text "07/10/96 4:5 PM, PDT" will be parsed into a Date
     * that is equivalent to Date(837039928046).
     *
     * <p> By default, parsing is lenient: If the input is not in the form used
     * by this object's format method but can still be parsed as a date, then
     * the parse succeeds.  Clients may insist on strict adherence to the
     * format by calling setLenient(false).
     *
     * @see java.text.DateFormat#setLenient(boolean)
     *
     * @param source  The date/time string to be parsed
     *
     * @param pos   On input, the position at which to start parsing; on
     *              output, the position at which parsing terminated, or the
     *              start position if the parse failed.
     *
     * @return      A Date, or null if the input could not be parsed
     */
    public abstract Date parse(String source, ParsePosition pos);

    /**
     * Sets the time zone for the calendar of this DateFormat object.
     * @param zone the given new time zone.
     */
    public void setTimeZone(TimeZone zone) {
        calendar.setTimeZone(zone);
    }

    /**
     * Set the calendar to be used by this date format.  Initially, the default
     * calendar for the specified or default locale is used.
     * @param newCalendar the new Calendar to be used by the date format
     */
    public void setCalendar(Calendar newCalendar) {
        this.calendar = newCalendar;
    }

    /**
     * Gets the calendar associated with this date/time formatter.
     * @return the calendar associated with this date/time formatter.
     */
    public Calendar getCalendar() {
        return calendar;
    }

    /**
     * Gets the date/time formatter with the default formatting style
     * for the default locale.
     * @return a date/time formatter.
     */
    public final static DateFormat getDateTimeInstance() {
        return new SimpleDateFormat("M/d/yy h:mm a");
    }
}
