/*
 * %W% %E%
 *
 * Copyright (c) 2006, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

package java.lang;

import java.lang.annotation.Annotation;
import java.net.URL;

public class Package implements java.lang.reflect.AnnotatedElement {

    private final String pkgName;
    private final String specTitle;
    private final String specVersion;
    private final String specVendor;
    private final String implTitle;
    private final String implVersion;
    private final String implVendor;
    public String getName() {
        return pkgName;
    }

    public String getSpecificationTitle() {
        return specTitle;
    }

    public String getSpecificationVersion() {
        return specVersion;
    }

    public String getSpecificationVendor() {
        return specVendor;
    }

    public String getImplementationTitle() {
        return implTitle;
    }

    public String getImplementationVersion() {
        return implVersion;
    }

    public String getImplementationVendor() {
        return implVendor;
    }

    public static Package getPackage(String name) {
        return null;
    }

    public static void package2Array (Package pkgs, Package[] arrayPkg) {
        /**
         * @j2sNative
         * for(var n in pkgs) {
         *     if(pkgs[n].__PKG_NAME__) {
         *         arrayPkg.push(pkgs[n]);
         *         this.package2Array(pkgs[n], arrayPkg);
         *     }
         * }
         **/{}
        
    }

    public static Package[] getPackages() {
        /**
         * @j2sNative
         * var pkgs=[];
         * var allPkg = Clazz.allPackage;
         * this.package2Array(allPkg, pkgs);
         * return pkgs;
         **/{}
        return null;
    }

    public int hashCode(){
        return pkgName.hashCode();
    }

    public String toString() {
        return "package " + pkgName;
    }

    Package(String name,
        String spectitle, String specversion, String specvendor,
        String impltitle, String implversion, String implvendor,
        URL sealbase, ClassLoader loader)
    {
        pkgName = name;
        implTitle = impltitle;
        implVersion = implversion;
        implVendor = implvendor;
        specTitle = spectitle;
        specVersion = specversion;
        specVendor = specvendor;
    }

    public boolean isAnnotationPresent(java.lang.Class<? extends Annotation> annotationType) {
        // TODO Auto-generated method stub
        return false;
    }

    public <T extends Annotation> T getAnnotation(java.lang.Class<T> annotationType) {
        // TODO Auto-generated method stub
        return null;
    }

    public Annotation[] getAnnotations() {
        // TODO Auto-generated method stub
        return null;
    }

    public Annotation[] getDeclaredAnnotations() {
        // TODO Auto-generated method stub
        return null;
    }
}
