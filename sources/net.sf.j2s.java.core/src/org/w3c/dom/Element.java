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

/**
 * The <code>Element</code> interface represents an element in an HTML or XML 
 * document. Elements may have attributes associated with them; since the 
 * <code>Element</code> interface inherits from <code>Node</code>, the 
 * generic <code>Node</code> interface attribute <code>attributes</code> may 
 * be used to retrieve the set of all attributes for an element. There are 
 * methods on the <code>Element</code> interface to retrieve either an 
 * <code>Attr</code> object by name or an attribute value by name. In XML, 
 * where an attribute value may contain entity references, an 
 * <code>Attr</code> object should be retrieved to examine the possibly 
 * fairly complex sub-tree representing the attribute value. On the other 
 * hand, in HTML, where all attributes have simple string values, methods to 
 * directly access an attribute value can safely be used as a convenience.
 * <p ><b>Note:</b> In DOM Level 2, the method <code>normalize</code> is 
 * inherited from the <code>Node</code> interface where it was moved.
 * <p>See also the <a href='http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407'>Document Object Model (DOM) Level 3 Core Specification</a>.
 */
public interface Element extends Node {

    public String getTagName();

    public String getAttribute(String name);

    public void setAttribute(String name, String value) throws DOMException;

    public void removeAttribute(String name) throws DOMException;

    public Attr getAttributeNode(String name);

    public Attr setAttributeNode(Attr newAttr) throws DOMException;

    public Attr removeAttributeNode(Attr oldAttr) throws DOMException;

    public NodeList getElementsByTagName(String name);

    public String getAttributeNS(String namespaceURI, String localName) throws DOMException;

    public void setAttributeNS(String namespaceURI, String qualifiedName, String value)
                               throws DOMException;

    public void removeAttributeNS(String namespaceURI, String localName) throws DOMException;

    public Attr getAttributeNodeNS(String namespaceURI, String localName) throws DOMException;

    public Attr setAttributeNodeNS(Attr newAttr) throws DOMException;

    public NodeList getElementsByTagNameNS(String namespaceURI, String localName)
                                           throws DOMException;

    public boolean hasAttribute(String name);

    public boolean hasAttributeNS(String namespaceURI, String localName)
                                  throws DOMException;

    public TypeInfo getSchemaTypeInfo();

    public void setIdAttribute(String name, boolean isId) throws DOMException;

    public void setIdAttributeNS(String namespaceURI, String localName, boolean isId)
                                 throws DOMException;

    public void setIdAttributeNode(Attr idAttr, boolean isId) throws DOMException;

}
