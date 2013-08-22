/*
 * Copyright (c) 2004 World Wide Web Consortium,
 *
 * (Massachusetts Institute of Technology, European Research Consortium for
 * Informatics and Mathematics, Keio University). All Rights Reserved. This
 * work is distributed under the W3C(r) Software License [1] in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * [1] http://www.w3.org/Consortium/Legal/2002/copyright-software-20021231
 */

package org.w3c.dom;

public interface CharacterData extends Node {

    public String getData() throws DOMException;

    public void setData(String data) throws DOMException;

    public int getLength();

    public String substringData(int offset, int count)
                                throws DOMException;

    public void appendData(String arg) throws DOMException;

    public void insertData(int offset, String arg)
                           throws DOMException;

    public void deleteData(int offset, int count)
                           throws DOMException;

    public void replaceData(int offset, int count, String arg)
                            throws DOMException;

}
