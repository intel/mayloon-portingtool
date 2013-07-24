package com.intel.ide.eclipse.mpt.compressor;

public class CompressException extends Exception {
	private static final long serialVersionUID = 3786980635158017772L;

	public CompressException(){
		super();
	}
	
	public CompressException(String message){
		super(message);
	}
	
	public CompressException(String format, Object ...args){
		super(String.format(format, args));
	}
}
