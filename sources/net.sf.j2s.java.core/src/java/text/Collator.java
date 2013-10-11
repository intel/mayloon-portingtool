package java.text;

import java.util.Comparator;

public class Collator implements Comparator<Object>, Cloneable {

    public static Collator getInstance() {
        return new Collator();
    }

    public int compare(String source, String target) {
        /**
         * @j2sNative
         * return source.localeCompare(target);
         **/{}
         return -1;
    }

    public boolean equals(String source, String target) {
        return (compare(source, target) == 0);
    }

    public int compare(Object object1, Object object2) {
        return compare((String)object1, (String)object2);
    }
}
