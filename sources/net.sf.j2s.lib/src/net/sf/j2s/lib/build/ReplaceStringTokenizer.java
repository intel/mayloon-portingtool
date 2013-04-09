
package net.sf.j2s.lib.build;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * replace "\t\n\r\f" to " \t\n\r\f" for StringTokenizer.js file
 */
public class ReplaceStringTokenizer {

    private static final String FILE_NAME = "StringTokenizer.js";
    private static final String REPLACE = "\"\\t\\n\\r\\f\"";
    private static final String TARGET = "\" \\t\\n\\r\\f\"";

    /**
     * @param args
     */
    public static void main(String[] args) {

        String filePath = "";
        if (args.length > 0) {
            filePath = args[0];
        }
        if (filePath.indexOf(FILE_NAME) < 0) {
            System.err.println("File path " + filePath + " not equals " + FILE_NAME + "");
            return;
        }
        // read file from filePath
        File src = new File(filePath);
        if (!src.exists()) {
            System.err.println("File path " + filePath + " not exists");
            return;
        }
        try {
            // read file
            FileInputStream instream = new FileInputStream(src);
            byte[] byteData = new byte[(int) src.length()];
            instream.read(byteData);
            instream.close();

            String strData = new String(byteData, "UTF-8");

            if (strData.indexOf(REPLACE) >= 0) {
                // replace "\t\n\r\f" to " \t\n\r\f"
                strData = strData.replace(REPLACE, TARGET);
            } else {
                // don't need to replace
                return;
            }
            // write file
            File dest = new File(filePath);
            FileOutputStream fos = new FileOutputStream(dest);
            fos.write(strData.getBytes("UTF-8"));
            fos.close();
            System.out.println("Already repalced StringTokenizer.js");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
