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

public interface Document extends Node {

    public DocumentType getDoctype();

    public DOMImplementation getImplementation();

    public Element getDocumentElement();

    public Element createElement(String tagName) throws DOMException;

    public DocumentFragment createDocumentFragment();

    public Text createTextNode(String data);

    public Comment createComment(String data);

    public Attr createAttribute(String name) throws DOMException;

    public NodeList getElementsByTagName(String tagname);

    public Node importNode(Node importedNode, boolean deep) throws DOMException;

    public Element createElementNS(String namespaceURI, String qualifiedName)
                                   throws DOMException;

    public Attr createAttributeNS(String namespaceURI, String qualifiedName)
                                  throws DOMException;

    public NodeList getElementsByTagNameNS(String namespaceURI, String localName);

    public Element getElementById(String elementId);

    public String getInputEncoding();

    public String getXmlEncoding();

    public boolean getXmlStandalone();

    public void setXmlStandalone(boolean xmlStandalone) throws DOMException;

    public String getXmlVersion();

    public void setXmlVersion(String xmlVersion) throws DOMException;

    public boolean getStrictErrorChecking();

    public void setStrictErrorChecking(boolean strictErrorChecking);

    public String getDocumentURI();

    public void setDocumentURI(String documentURI);

    public Node adoptNode(Node source) throws DOMException;

    public DOMConfiguration getDomConfig();

    public void normalizeDocument();

    public Node renameNode(Node n, String namespaceURI, String qualifiedName)
                           throws DOMException;

}
