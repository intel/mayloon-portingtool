package com.intel.ide.eclipse.mpt.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MayloonStubAnnotation {
    String infoAnnotation() default "MayloonStubAnnotation";
}
