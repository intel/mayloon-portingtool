package com.intel.ide.eclipse.mpt.compressor;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.nio.charset.Charset;

import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;

import com.yahoo.platform.yui.compressor.CssCompressor;
import com.yahoo.platform.yui.compressor.JavaScriptCompressor;

public class Compressor {
	
	public Compressor(){
	}
	
	public static void compress(String file_src, String file_dst) throws CompressException{
			execYUICompress(false, "utf-8", "js", -1, true, false, false, file_src, file_dst);
	}
    
	/**
	 * execYUICompress(false, "utf-8", "js", -1, true, false, false, &InputFileName, &OutputFileName)
	 * @param verbose
	 * @param charset
	 * @param type
	 * @param linebreakpos
	 * @param munge
	 * @param preserveAllSemiColons
	 * @param disableOptimizations
	 * @param inputFilename
	 * @param outputFilename
	 * @throws CompressException
	 */
    private static void execYUICompress(boolean verbose, String charset, String type, int linebreakpos,
    		boolean munge, boolean preserveAllSemiColons, boolean disableOptimizations,
    		String inputFilename, String outputFilename)
    		throws CompressException {	

        Reader in = null;
        Writer out = null;

        try {
            if (charset == null || !Charset.isSupported(charset)) {
                charset = System.getProperty("file.encoding");
                if (charset == null) {
                    charset = "UTF-8";
                }
                if (verbose) {
                    System.err.println("\n[INFO] Using charset " + charset);
                }
            }

            if (type != null && !type.equalsIgnoreCase("js") && !type.equalsIgnoreCase("css")) {
            }

            if (type == null) {
                int idx = inputFilename.lastIndexOf('.');
                if (idx >= 0 && idx < inputFilename.length() - 1) {
                    type = inputFilename.substring(idx + 1);
                }
            }

            if (type == null || !type.equalsIgnoreCase("js") && !type.equalsIgnoreCase("css")) {
            }

            in = new InputStreamReader(new FileInputStream(inputFilename), charset);

            if (type.equalsIgnoreCase("js")) {

                try {
                    JavaScriptCompressor compressor = new JavaScriptCompressor(in, new ErrorReporter() {

                        public void warning(String message, String sourceName,
                                int line, String lineSource, int lineOffset) {
                        }

                        public void error(String message, String sourceName,
                                int line, String lineSource, int lineOffset) {
                        }

                        public EvaluatorException runtimeError(String message, String sourceName,
                                int line, String lineSource, int lineOffset) {
                            error(message, sourceName, line, lineSource, lineOffset);
                            return new EvaluatorException(message);
                        }
                    });

                    // Close the input stream first, and then open the output stream,
                    // in case the output file should override the input file.
                    in.close(); in = null;

                    if (outputFilename == null) {
                        out = new OutputStreamWriter(System.out, charset);
                    } else {
                        out = new OutputStreamWriter(new FileOutputStream(outputFilename), charset);
                    }

                    compressor.compress(out, linebreakpos, true, verbose,
                            preserveAllSemiColons, disableOptimizations);

                } catch (EvaluatorException e) {
                	if (in != null) in.close();
                	if (out != null) out.close();
                	throw new CompressException("Could not compress this file.");
                }

            } else if (type.equalsIgnoreCase("css")) {

                CssCompressor compressor = new CssCompressor(in);

                // Close the input stream first, and then open the output stream,
                // in case the output file should override the input file.
                in.close(); in = null;

                if (outputFilename == null) {
                    out = new OutputStreamWriter(System.out, charset);
                } else {
                    out = new OutputStreamWriter(new FileOutputStream(outputFilename), charset);
                }

                compressor.compress(out, linebreakpos);
            }
        } catch (IOException e) {
        } finally {

            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                }
            }

            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                }
            }
        }
    }
}
