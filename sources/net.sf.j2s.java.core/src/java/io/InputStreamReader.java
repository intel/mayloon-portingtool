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

import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;

/**
 * A class for turning a byte stream into a character stream. Data read from the
 * source input stream is converted into characters by either a default or a
 * provided character converter. The default encoding is taken from the
 * "file.encoding" system property. {@code InputStreamReader} contains a buffer
 * of bytes read from the source stream and converts these into characters as
 * needed. The buffer size is 8K.
 *
 * @see OutputStreamWriter
 */
public class InputStreamReader extends Reader {
    private InputStream in;

    /**
     * Constructs a new {@code InputStreamReader} on the {@link InputStream}
     * {@code in}. This constructor sets the character converter to the encoding
     * specified in the "file.encoding" property and falls back to ISO 8859_1
     * (ISO-Latin-1) if the property doesn't exist.
     *
     * @param in
     *            the input stream from which to read characters.
     */
    public InputStreamReader(InputStream in) {
        this(in,"utf-8");
        
    }

    /**
     * Constructs a new InputStreamReader on the InputStream {@code in}. The
     * character converter that is used to decode bytes into characters is
     * identified by name by {@code enc}. If the encoding cannot be found, an
     * UnsupportedEncodingException error is thrown.
     *
     * @param in
     *            the InputStream from which to read characters.
     * @param enc
     *            identifies the character converter to use.
     * @throws NullPointerException
     *             if {@code enc} is {@code null}.
     * @throws UnsupportedEncodingException
     *             if the encoding specified by {@code enc} cannot be found.
     */
    public InputStreamReader(InputStream in, final String enc)
           {
        super(in);
        this.in = in;
    }

    /**
     * Constructs a new InputStreamReader on the InputStream {@code in} and
     * CharsetDecoder {@code dec}.
     *
     * @param in
     *            the source InputStream from which to read characters.
     * @param dec
     *            the CharsetDecoder used by the character conversion.
     */
    public InputStreamReader(InputStream in, CharsetDecoder dec) {
        super(in);
        this.in = in;
    }

    /**
     * Constructs a new InputStreamReader on the InputStream {@code in} and
     * Charset {@code charset}.
     *
     * @param in
     *            the source InputStream from which to read characters.
     * @param charset
     *            the Charset that defines the character converter
     */
    public InputStreamReader(InputStream in, Charset charset) {
        super(in);
        this.in = in;
    }

    /**
     * Closes this reader. This implementation closes the source InputStream and
     * releases all local storage.
     *
     * @throws IOException
     *             if an error occurs attempting to close this reader.
     */
    @Override
    public void close() throws IOException {
    }

    /**
     * Returns the name of the encoding used to convert bytes into characters.
     * The value {@code null} is returned if this reader has been closed.
     *
     * @return the name of the character converter or {@code null} if this
     *         reader is closed.
     */
    /*public String getEncoding() {
        if (!isOpen()) {
            return null;
        }
        return HistoricalNamesUtil.getHistoricalName(decoder.charset().name());
    }*/

    /**
     * Reads a single character from this reader and returns it as an integer
     * with the two higher-order bytes set to 0. Returns -1 if the end of the
     * reader has been reached. The byte value is either obtained from
     * converting bytes in this reader's buffer or by first filling the buffer
     * from the source InputStream and then reading from the buffer.
     *
     * @return the character read or -1 if the end of the reader has been
     *         reached.
     * @throws IOException
     *             if this reader is closed or some other I/O error occurs.
     */
    @Override
    public int read() throws IOException {
        synchronized (lock) {
            if (!isOpen()) {
                throw new IOException("InputStreamReader is closed");
            }
            char[] buf = new char[1];
            return read(buf, 0, 1) != -1 ? buf[0] : -1;
        }
    }

    /**
     * Reads at most {@code length} characters from this reader and stores them
     * at position {@code offset} in the character array {@code buf}. Returns
     * the number of characters actually read or -1 if the end of the reader has
     * been reached. The bytes are either obtained from converting bytes in this
     * reader's buffer or by first filling the buffer from the source
     * InputStream and then reading from the buffer.
     *
     * @param buffer
     *            the array to store the characters read.
     * @param offset
     *            the initial position in {@code buf} to store the characters
     *            read from this reader.
     * @param length
     *            the maximum number of characters to read.
     * @return the number of characters read or -1 if the end of the reader has
     *         been reached.
     * @throws IndexOutOfBoundsException
     *             if {@code offset < 0} or {@code length < 0}, or if
     *             {@code offset + length} is greater than the length of
     *             {@code buf}.
     * @throws IOException
     *             if this reader is closed or some other I/O error occurs.
     */
    @Override
    public int read(char[] buffer, int offset, int length) throws IOException {
    	byte[] data = new byte[length];
    	int res = in.read(data, offset, length);
        if (res <= 0) {
            return res;
        }
    	System.arraycopy(data,0, buffer, 0, res);
    	return res;
    }

    private boolean isOpen() {
        return in != null;
    }

    /**
     * Indicates whether this reader is ready to be read without blocking. If
     * the result is {@code true}, the next {@code read()} will not block. If
     * the result is {@code false} then this reader may or may not block when
     * {@code read()} is called. This implementation returns {@code true} if
     * there are bytes available in the buffer or the source stream has bytes
     * available.
     *
     * @return {@code true} if the receiver will not block when {@code read()}
     *         is called, {@code false} if unknown or blocking will occur.
     * @throws IOException
     *             if this reader is closed or some other I/O error occurs.
     */
    @Override
    public boolean ready() throws IOException {
        return in!=null;
    }
}
