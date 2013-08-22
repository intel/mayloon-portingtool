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

public interface Node {
    // NodeType
    /**
     * The node is an <code>Element</code>.
     */
    public static final short ELEMENT_NODE              = 1;
    /**
     * The node is an <code>Attr</code>.
     */
    public static final short ATTRIBUTE_NODE            = 2;
    /**
     * The node is a <code>Text</code> node.
     */
    public static final short TEXT_NODE                 = 3;
    /**
     * The node is a <code>CDATASection</code>.
     */
    public static final short CDATA_SECTION_NODE        = 4;
    /**
     * The node is an <code>EntityReference</code>.
     */
    public static final short ENTITY_REFERENCE_NODE     = 5;
    /**
     * The node is an <code>Entity</code>.
     */
    public static final short ENTITY_NODE               = 6;
    /**
     * The node is a <code>ProcessingInstruction</code>.
     */
    public static final short PROCESSING_INSTRUCTION_NODE = 7;
    /**
     * The node is a <code>Comment</code>.
     */
    public static final short COMMENT_NODE              = 8;
    /**
     * The node is a <code>Document</code>.
     */
    public static final short DOCUMENT_NODE             = 9;
    /**
     * The node is a <code>DocumentType</code>.
     */
    public static final short DOCUMENT_TYPE_NODE        = 10;
    /**
     * The node is a <code>DocumentFragment</code>.
     */
    public static final short DOCUMENT_FRAGMENT_NODE    = 11;
    /**
     * The node is a <code>Notation</code>.
     */
    public static final short NOTATION_NODE             = 12;

    /**
     * The name of this node, depending on its type; see the table above.
     */
    public String getNodeName();

    public String getNodeValue()
                              throws DOMException;

    public void setNodeValue(String nodeValue)
                              throws DOMException;

    public short getNodeType();

    public Node getParentNode();

    public NodeList getChildNodes();

    public Node getFirstChild();

    public Node getLastChild();

    public Node getPreviousSibling();

    public Node getNextSibling();

/*    public NamedNodeMap getAttributes();*/

    public Document getOwnerDocument();

    public Node insertBefore(Node newChild,
                             Node refChild)
                             throws DOMException;

    public Node replaceChild(Node newChild,
                             Node oldChild)
                             throws DOMException;

    public Node removeChild(Node oldChild)
                            throws DOMException;

    public Node appendChild(Node newChild)
                            throws DOMException;

    public boolean hasChildNodes();

    public Node cloneNode(boolean deep);

    public void normalize();

    public boolean isSupported(String feature,
                               String version);

    public String getNamespaceURI();

    public String getPrefix();

    public void setPrefix(String prefix)
                               throws DOMException;

    public String getLocalName();

    public boolean hasAttributes();

    public String getBaseURI();

    // DocumentPosition
    /**
     * The two nodes are disconnected. Order between disconnected nodes is
     * always implementation-specific.
     */
    public static final short DOCUMENT_POSITION_DISCONNECTED = 0x01;
    /**
     * The second node precedes the reference node.
     */
    public static final short DOCUMENT_POSITION_PRECEDING = 0x02;
    /**
     * The node follows the reference node.
     */
    public static final short DOCUMENT_POSITION_FOLLOWING = 0x04;
    /**
     * The node contains the reference node. A node which contains is always
     * preceding, too.
     */
    public static final short DOCUMENT_POSITION_CONTAINS = 0x08;
    /**
     * The node is contained by the reference node. A node which is contained
     * is always following, too.
     */
    public static final short DOCUMENT_POSITION_CONTAINED_BY = 0x10;
    /**
     * The determination of preceding versus following is
     * implementation-specific.
     */
    public static final short DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;

    public short compareDocumentPosition(Node other) throws DOMException;

    public String getTextContent() throws DOMException;

    public void setTextContent(String textContent) throws DOMException;

    public boolean isSameNode(Node other);

    public String lookupPrefix(String namespaceURI);

    public boolean isDefaultNamespace(String namespaceURI);

    public String lookupNamespaceURI(String prefix);

    public boolean isEqualNode(Node arg);

    public Object getFeature(String feature,
                             String version);

    public Object setUserData(String key,
                              Object data,
                              UserDataHandler handler);

    public Object getUserData(String key);

}
