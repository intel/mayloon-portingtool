/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// $Id: DocumentBuilderFactory.java 884950 2009-11-27 18:46:18Z mrglavas $

package javax.xml.parsers;

/**
 * Defines a factory API that enables applications to obtain a
 * parser that produces DOM object trees from XML documents.
 *
 * @author <a href="Jeff.Suttor@Sun.com">Jeff Suttor</a>
 * @version $Revision: 884950 $, $Date: 2009-11-27 10:46:18 -0800 (Fri, 27 Nov 2009) $
 */

public class DocumentBuilderFactory {

    private boolean validating = false;
    private boolean namespaceAware = false;
    private boolean whitespace = false;
    private boolean expandEntityRef = true;
    private boolean ignoreComments = false;
    private boolean coalescing = false;
    
    private static final String NAMESPACES =
            "http://xml.org/sax/features/namespaces";

    private static final String VALIDATION =
            "http://xml.org/sax/features/validation";

    protected DocumentBuilderFactory () {
    }

    /**
     * Returns Android's implementation of {@code DocumentBuilderFactory}.
     * Unlike other Java implementations, this method does not consult system
     * properties, property files, or the services API.
     *
     * @return a new DocumentBuilderFactory.
     */
    public static DocumentBuilderFactory newInstance() {
        // instantiate the class directly rather than using reflection
        return new DocumentBuilderFactory();
    }

    /**
     * Returns an instance of the named implementation of {@code DocumentBuilderFactory}.
     *
     * @throws FactoryConfigurationError if {@code factoryClassName} is not available or cannot be
     *     instantiated.
     * @since 1.6
     */
    /*public static DocumentBuilderFactory newInstance(String factoryClassName,
            ClassLoader classLoader) {
        if (factoryClassName == null) {
            throw new FactoryConfigurationError("factoryClassName == null");
        }
        try {
            Class<?> type = classLoader != null
                    ? classLoader.loadClass(factoryClassName)
                    : Class.forName(factoryClassName);
            return (DocumentBuilderFactory) type.newInstance();
        } catch (ClassNotFoundException e) {
            throw new FactoryConfigurationError(e);
        } catch (InstantiationException e) {
            throw new FactoryConfigurationError(e);
        } catch (IllegalAccessException e) {
            throw new FactoryConfigurationError(e);
        }
    }*/

    /**
     * Creates a new instance of a {@link javax.xml.parsers.DocumentBuilder}
     * using the currently configured parameters.
     *
     * @exception ParserConfigurationException if a DocumentBuilder
     * cannot be created which satisfies the configuration requested.
     * @return A new instance of a DocumentBuilder.
     */

    public DocumentBuilder newDocumentBuilder()
        throws ParserConfigurationException {
        return new DocumentBuilder();
    }


    /**
     * Specifies that the parser produced by this code will
     * provide support for XML namespaces. By default the value of this is set
     * to <code>false</code>
     *
     * @param awareness true if the parser produced will provide support
     *                  for XML namespaces; false otherwise.
     */

    public void setNamespaceAware(boolean awareness) {
        this.namespaceAware = awareness;
    }

    /**
     * Specifies that the parser produced by this code will
     * validate documents as they are parsed. By default the value of this
     * is set to <code>false</code>.
     *
     * <p>
     * Note that "the validation" here means
     * <a href="http://www.w3.org/TR/REC-xml#proc-types">a validating
     * parser</a> as defined in the XML recommendation.
     * In other words, it essentially just controls the DTD validation.
     * (except the legacy two properties defined in JAXP 1.2.
     * See <a href="#validationCompatibility">here</a> for more details.)
     * </p>
     *
     * <p>
     * To use modern schema languages such as W3C XML Schema or
     * RELAX NG instead of DTD, you can configure your parser to be
     * a non-validating parser by leaving the {@link #setValidating(boolean)}
     * method <tt>false</tt>, then use the {@link #setSchema(Schema)}
     * method to associate a schema to a parser.
     * </p>
     *
     * @param validating true if the parser produced will validate documents
     *                   as they are parsed; false otherwise.
     */

    public void setValidating(boolean validating) {
        this.validating = validating;
    }

    /**
     * Specifies that the parsers created by this  factory must eliminate
     * whitespace in element content (sometimes known loosely as
     * 'ignorable whitespace') when parsing XML documents (see XML Rec
     * 2.10). Note that only whitespace which is directly contained within
     * element content that has an element only content model (see XML
     * Rec 3.2.1) will be eliminated. Due to reliance on the content model
     * this setting requires the parser to be in validating mode. By default
     * the value of this is set to <code>false</code>.
     *
     * @param whitespace true if the parser created must eliminate whitespace
     *                   in the element content when parsing XML documents;
     *                   false otherwise.
     */

    public void setIgnoringElementContentWhitespace(boolean whitespace) {
        this.whitespace = whitespace;
    }

    /**
     * Specifies that the parser produced by this code will
     * expand entity reference nodes. By default the value of this is set to
     * <code>true</code>
     *
     * @param expandEntityRef true if the parser produced will expand entity
     *                        reference nodes; false otherwise.
     */

    public void setExpandEntityReferences(boolean expandEntityRef) {
        this.expandEntityRef = expandEntityRef;
    }

    /**
     * <p>Specifies that the parser produced by this code will
     * ignore comments. By default the value of this is set to <code>false
     * </code>.</p>
     *
     * @param ignoreComments <code>boolean</code> value to ignore comments during processing
     */

    public void setIgnoringComments(boolean ignoreComments) {
        this.ignoreComments = ignoreComments;
    }

    /**
     * Specifies that the parser produced by this code will
     * convert CDATA nodes to Text nodes and append it to the
     * adjacent (if any) text node. By default the value of this is set to
     * <code>false</code>
     *
     * @param coalescing  true if the parser produced will convert CDATA nodes
     *                    to Text nodes and append it to the adjacent (if any)
     *                    text node; false otherwise.
     */

    public void setCoalescing(boolean coalescing) {
        this.coalescing = coalescing;
    }

    /**
     * Indicates whether or not the factory is configured to produce
     * parsers which are namespace aware.
     *
     * @return  true if the factory is configured to produce parsers which
     *          are namespace aware; false otherwise.
     */

    public boolean isNamespaceAware() {
        return namespaceAware;
    }

    /**
     * Indicates whether or not the factory is configured to produce
     * parsers which validate the XML content during parse.
     *
     * @return  true if the factory is configured to produce parsers
     *          which validate the XML content during parse; false otherwise.
     */

    public boolean isValidating() {
        return validating;
    }

    /**
     * Indicates whether or not the factory is configured to produce
     * parsers which ignore ignorable whitespace in element content.
     *
     * @return  true if the factory is configured to produce parsers
     *          which ignore ignorable whitespace in element content;
     *          false otherwise.
     */

    public boolean isIgnoringElementContentWhitespace() {
        return whitespace;
    }

    /**
     * Indicates whether or not the factory is configured to produce
     * parsers which expand entity reference nodes.
     *
     * @return  true if the factory is configured to produce parsers
     *          which expand entity reference nodes; false otherwise.
     */

    public boolean isExpandEntityReferences() {
        return expandEntityRef;
    }

    /**
     * Indicates whether or not the factory is configured to produce
     * parsers which ignores comments.
     *
     * @return  true if the factory is configured to produce parsers
     *          which ignores comments; false otherwise.
     */

    public boolean isIgnoringComments() {
        return ignoreComments;
    }

    /**
     * Indicates whether or not the factory is configured to produce
     * parsers which converts CDATA nodes to Text nodes and appends it to
     * the adjacent (if any) Text node.
     *
     * @return  true if the factory is configured to produce parsers
     *          which converts CDATA nodes to Text nodes and appends it to
     *          the adjacent (if any) Text node; false otherwise.
     */

    public boolean isCoalescing() {
        return coalescing;
    }

    /**
     * Allows the user to set specific attributes on the underlying
     * implementation.
     * @param name The name of the attribute.
     * @param value The value of the attribute.
     * @exception IllegalArgumentException thrown if the underlying
     * implementation doesn't recognize the attribute.
     */
    public void setAttribute(String name, Object value)
                throws IllegalArgumentException {
        throw new IllegalArgumentException(name);
    }

    /**
     * Allows the user to retrieve specific attributes on the underlying
     * implementation.
     * @param name The name of the attribute.
     * @return value The value of the attribute.
     * @exception IllegalArgumentException thrown if the underlying
     * implementation doesn't recognize the attribute.
     */
    public Object getAttribute(String name)
                throws IllegalArgumentException {
        throw new IllegalArgumentException(name);
    }

    /**
     * <p>Set a feature for this <code>DocumentBuilderFactory</code> and <code>DocumentBuilder</code>s created by this factory.</p>
     *
     * <p>
     * Feature names are fully qualified {@link java.net.URI}s.
     * Implementations may define their own features.
     * An {@link ParserConfigurationException} is thrown if this <code>DocumentBuilderFactory</code> or the
     * <code>DocumentBuilder</code>s it creates cannot support the feature.
     * It is possible for an <code>DocumentBuilderFactory</code> to expose a feature value but be unable to change its state.
     * </p>
     *
     * <p>
     * All implementations are required to support the {@link javax.xml.XMLConstants#FEATURE_SECURE_PROCESSING} feature.
     * When the feature is:</p>
     * <ul>
     *   <li>
     *     <code>true</code>: the implementation will limit XML processing to conform to implementation limits.
     *     Examples include entity expansion limits and XML Schema constructs that would consume large amounts of resources.
     *     If XML processing is limited for security reasons, it will be reported via a call to the registered
     *    {@link org.xml.sax.ErrorHandler#fatalError(SAXParseException exception)}.
     *     See {@link  DocumentBuilder#setErrorHandler(org.xml.sax.ErrorHandler errorHandler)}.
     *   </li>
     *   <li>
     *     <code>false</code>: the implementation will processing XML according to the XML specifications without
     *     regard to possible implementation limits.
     *   </li>
     * </ul>
     *
     * @param name Feature name.
     * @param value Is feature state <code>true</code> or <code>false</code>.
     *
     * @throws ParserConfigurationException if this <code>DocumentBuilderFactory</code> or the <code>DocumentBuilder</code>s
     *   it creates cannot support this feature.
     * @throws NullPointerException If the <code>name</code> parameter is null.
     */
    public void setFeature(String name, boolean value)
        throws ParserConfigurationException {
        if (name == null) {
            throw new NullPointerException();
        }

        if (NAMESPACES.equals(name)) {
            setNamespaceAware(value);
        } else if (VALIDATION.equals(name)) {
            setValidating(value);
        } else {
            throw new ParserConfigurationException(name);
        }
    }

    /**
     * <p>Get the state of the named feature.</p>
     *
     * <p>
     * Feature names are fully qualified {@link java.net.URI}s.
     * Implementations may define their own features.
     * An {@link ParserConfigurationException} is thrown if this <code>DocumentBuilderFactory</code> or the
     * <code>DocumentBuilder</code>s it creates cannot support the feature.
     * It is possible for an <code>DocumentBuilderFactory</code> to expose a feature value but be unable to change its state.
     * </p>
     *
     * @param name Feature name.
     *
     * @return State of the named feature.
     *
     * @throws ParserConfigurationException if this <code>DocumentBuilderFactory</code>
     *   or the <code>DocumentBuilder</code>s it creates cannot support this feature.
     */
    public boolean getFeature(String name)
        throws ParserConfigurationException {
        if (name == null) {
            throw new NullPointerException();
        }

        if (NAMESPACES.equals(name)) {
            return isNamespaceAware();
        } else if (VALIDATION.equals(name)) {
            return isValidating();
        } else {
            throw new ParserConfigurationException(name);
        }
    }

}
