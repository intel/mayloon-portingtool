
package java.text;

import java.io.Serializable;

public abstract class Format implements Serializable, Cloneable {
    /**
     * Sole constructor.  (For invocation by subclass constructors, typically
     * implicit.)
     */
    protected Format() {
    }
    
    /**
     * Creates and returns a copy of this object.
     *
     * @return a clone of this instance.
     */
    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }

    
    /**
     * Formats an object to produce a string. This is equivalent to
     * <blockquote>
     * {@link #format(Object, StringBuffer, FieldPosition) format}<code>(obj,
     *         new StringBuffer(), new FieldPosition(0)).toString();</code>
     * </blockquote>
     *
     * @param obj    The object to format
     * @return       Formatted string.
     * @exception IllegalArgumentException if the Format cannot format the given
     *            object
     */
    public final String format (Object obj) {
        return format(obj, new StringBuffer(), new FieldPosition(0)).toString();
    }
    
    /**
     * Formats an object and appends the resulting text to a given string
     * buffer.
     * If the <code>pos</code> argument identifies a field used by the format,
     * then its indices are set to the beginning and end of the first such
     * field encountered.
     *
     * @param obj    The object to format
     * @param toAppendTo    where the text is to be appended
     * @param pos    A <code>FieldPosition</code> identifying a field
     *               in the formatted text
     * @return       the string buffer passed in as <code>toAppendTo</code>,
     *               with formatted text appended
     * @exception NullPointerException if <code>toAppendTo</code> or
     *            <code>pos</code> is null
     * @exception IllegalArgumentException if the Format cannot format the given
     *            object
     */
    public abstract StringBuffer format(Object obj,
                    StringBuffer toAppendTo,
                    FieldPosition pos);
}
