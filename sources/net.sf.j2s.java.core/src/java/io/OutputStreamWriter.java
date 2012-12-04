/*
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package java.io;


/**
 * A class for turning a character stream into a byte stream. Data written to
 * the target input stream is converted into bytes by either a default or a
 * provided character converter. The default encoding is taken from the
 * "file.encoding" system property. {@code OutputStreamWriter} contains a buffer
 * of bytes to be written to target stream and converts these into characters as
 * needed. The buffer size is 8K.
 *
 * @see InputStreamReader
 */
public class OutputStreamWriter extends Writer {

    private final OutputStream out;

    /**
     * Constructs a new OutputStreamWriter using {@code out} as the target
     * stream to write converted characters to. The default character encoding
     * is used.
     *
     * @param out
     *            the non-null target stream to write converted bytes to.
     */
    public OutputStreamWriter(OutputStream out) {
        this(out,"utf-8");
    }

    /**
     * Constructs a new OutputStreamWriter using {@code out} as the target
     * stream to write converted characters to and {@code enc} as the character
     * encoding. If the encoding cannot be found, an
     * UnsupportedEncodingException error is thrown.
     *
     * @param out
     *            the target stream to write converted bytes to.
     * @param enc
     *            the string describing the desired character encoding.
     * @throws NullPointerException
     *             if {@code enc} is {@code null}.
     * @throws UnsupportedEncodingException
     *             if the encoding specified by {@code enc} cannot be found.
     */
    public OutputStreamWriter(OutputStream out, final String enc){
        super(out);
        if (enc == null) {
            throw new NullPointerException();
        }
        this.out = out;
    }

    /**
     * Constructs a new OutputStreamWriter using {@code out} as the target
     * stream to write converted characters to and {@code cs} as the character
     * encoding.
     *
     * @param out
     *            the target stream to write converted bytes to.
     * @param cs
     *            the {@code Charset} that specifies the character encoding.
     */
//    public OutputStreamWriter(OutputStream out, Charset cs) {
//        super(out);
//        this.out = out;
//        encoder = cs.newEncoder();
//        encoder.onMalformedInput(CodingErrorAction.REPLACE);
//        encoder.onUnmappableCharacter(CodingErrorAction.REPLACE);
//    }

    /**
     * Constructs a new OutputStreamWriter using {@code out} as the target
     * stream to write converted characters to and {@code enc} as the character
     * encoder.
     *
     * @param out
     *            the target stream to write converted bytes to.
     * @param enc
     *            the character encoder used for character conversion.
     */
//    public OutputStreamWriter(OutputStream out, CharsetEncoder enc) {
//        super(out);
//        enc.charset();
//        this.out = out;
//        encoder = enc;
//    }

    /**
     * Closes this writer. This implementation flushes the buffer as well as the
     * target stream. The target stream is then closed and the resources for the
     * buffer and converter are released.
     * <p>
     * Only the first invocation of this method has any effect. Subsequent calls
     * do nothing.
     *
     * @throws IOException
     *             if an error occurs while closing this writer.
     */
    @Override
    public void close() throws IOException {
        synchronized (lock) {
            flush();
            out.flush();
            out.close();
        }
    }

    /**
     * Flushes this writer. This implementation ensures that all buffered bytes
     * are written to the target stream. After writing the bytes, the target
     * stream is flushed as well.
     *
     * @throws IOException
     *             if an error occurs while flushing this writer.
     */
    @Override
    public void flush() throws IOException {
        
    }

    /**
     * Gets the name of the encoding that is used to convert characters to
     * bytes.
     *
     * @return the string describing the converter or {@code null} if this
     *         writer is closed.
     */
    public String getEncoding() {
        return "utf-8";
        //return HistoricalNamesUtil.getHistoricalName(encoder.charset().name());
    }

    /**
     * Writes {@code count} characters starting at {@code offset} in {@code buf}
     * to this writer. The characters are immediately converted to bytes by the
     * character converter and stored in a local buffer. If the buffer gets full
     * as a result of the conversion, this writer is flushed.
     *
     * @param buffer
     *            the array containing characters to write.
     * @param offset
     *            the index of the first character in {@code buf} to write.
     * @param count
     *            the maximum number of characters to write.
     * @throws IndexOutOfBoundsException
     *             if {@code offset < 0} or {@code count < 0}, or if
     *             {@code offset + count} is greater than the size of
     *             {@code buf}.
     * @throws IOException
     *             if this writer has already been closed or another I/O error
     *             occurs.
     */
    @Override
    public void write(char[] buffer, int offset, int count) throws IOException {
    	byte[] data = new byte[count];
    	System.arraycopy(buffer, offset, data, 0, count);
    	out.write(data, offset, count);
    }

    /**
     * Writes the character {@code oneChar} to this writer. The lowest two bytes
     * of the integer {@code oneChar} are immediately converted to bytes by the
     * character converter and stored in a local buffer. If the buffer gets full
     * by converting this character, this writer is flushed.
     *
     * @param oneChar
     *            the character to write.
     * @throws IOException
     *             if this writer is closed or another I/O error occurs.
     */
    @Override
    public void write(int oneChar) throws IOException {
        byte data = (byte) oneChar;
        byte[] cnt = new byte[1];
        cnt[0] = data;
        out.write(cnt, 0, 1);
    }

    /**
     * Writes {@code count} characters starting at {@code offset} in {@code str}
     * to this writer. The characters are immediately converted to bytes by the
     * character converter and stored in a local buffer. If the buffer gets full
     * as a result of the conversion, this writer is flushed.
     *
     * @param str
     *            the string containing characters to write.
     * @param offset
     *            the start position in {@code str} for retrieving characters.
     * @param count
     *            the maximum number of characters to write.
     * @throws IOException
     *             if this writer has already been closed or another I/O error
     *             occurs.
     * @throws IndexOutOfBoundsException
     *             if {@code offset < 0} or {@code count < 0}, or if
     *             {@code offset + count} is bigger than the length of
     *             {@code str}.
     */
    @Override
    public void write(String str, int offset, int count) throws IOException {
    	char[] chars = str.toCharArray();
    	byte[] buffer = new byte[chars.length];
    	System.arraycopy(chars, 0, buffer, 0, chars.length); 	
//        /**
//         * @j2sNative
//         * console.log('outputStream writer:'+buffer+',origin is:'+str);
//         */{}
    	out.write(buffer, offset, count);
    }

    @Override boolean checkError() {
        return out.checkError();
    }
}
