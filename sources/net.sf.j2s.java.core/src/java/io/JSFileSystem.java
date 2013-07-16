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

// BEGIN android-note
// address length was changed from long to int for performance reasons.
// END android-note

package java.io;

import java.io.FileDescriptor;
import java.io.FileNotFoundException;
import java.io.IOException;

class JSFileSystem{

    public static final int SHARED_LOCK_TYPE = 1;

    public static final int EXCLUSIVE_LOCK_TYPE = 2;

    public static final int SEEK_SET = 1;

    public static final int SEEK_CUR = 2;

    public static final int SEEK_END = 4;

    public static final int O_RDONLY = 0x00000000;

    public static final int O_WRONLY = 0x00000001;

    public static final int O_RDWR = 0x00000010;

    public static final int O_RDWRSYNC = 0x00000020;

    public static final int O_APPEND = 0x00000100;

    public static final int O_CREAT = 0x00001000;

    public final int O_EXCL = 0x00010000;

    public final int O_NOCTTY = 0x00100000;

    public final int O_NONBLOCK = 0x01000000;

    public final int O_TRUNC = 0x10000000;
    
    private static final JSFileSystem singleton = new JSFileSystem();
    
    private FileDescriptor[] fds = new FileDescriptor[256];
    
    {
    	fds[0] = FileDescriptor.in;
    	fds[1] = FileDescriptor.out;
    	fds[2] = FileDescriptor.err;
    }
    public static JSFileSystem getJSFileSystem() {
        return singleton;
    }

    private JSFileSystem() {
    }
    /**
     * Returns the granularity for virtual memory allocation.
     * Note that this value for Windows differs from the one for the
     * page size (64K and 4K respectively).
     */
    public native int getAllocGranularity();

    public native long length(int fd);

    private native void unlockImpl(int fd, long start, long length) throws IOException;


    public native void fsync(int fd, boolean metadata) throws IOException;

    /*
     * File position seeking.
     */
    public native long seek(int fd, long offset, int whence) throws IOException;

    /*
     * Direct read/write APIs work on addresses.
     */
    public native long readDirect(int fd, int address, int offset, int length);

    public native long writeDirect(int fd, int address, int offset, int length);

    /*
     * Indirect read/writes work on byte[]'s
     */
    public long read(int fd, byte[] bytes, int offset, int length) throws IOException
    {
    	if (!fds[fd].valid())
    	{
    		throw new IOException();
    	}
    	byte[] bts = fds[fd].getBytes();
    	if (null == bts||bts.equals("")) return -1;
    	int readPos = fds[fd].getReadPos();
    	if(readPos>=bts.length){
    		return -1;
    	}
    	int i = 0;
    	for (; (i < length)&&(i + readPos < bts.length); i++)
    	{
    		bytes[i + offset] = bts[i + readPos];
    	}
    	fds[fd].setReadPos(readPos+i);
    	if(i==0) i =-1;
    	return i;
    }

    public long write(int fd, byte[] bytes, int offset, int length){
    	byte[] data = new byte[length];
    	int i=0;
    	for(;i<length&&(i+offset)<bytes.length;i++){
    		data[i] = bytes[i+offset];
    	}
    	if (!fds[fd].valid())
    	{
    		return -1;
    	}
    	String cnt = new String(data);
    	String path = fds[fd].getPath();
        return 0;
    }

    /*
     * Scatter/gather calls.
     */
    public native long readv(int fd, int[] addresses, int[] offsets, int[] lengths, int size)
            throws IOException;

    public native long writev(int fd, int[] addresses, int[] offsets, int[] lengths, int size)
            throws IOException;

    public native void truncate(int fd, long size) throws IOException;

    public FileDescriptor open(String path, int mode) throws FileNotFoundException
    {
        byte[] bts = null;
        bts = new byte[0];
		int i=-1;
		if(mode==O_RDONLY||mode==O_CREAT||mode==O_TRUNC){
			i=0;			
		}else if(mode==O_WRONLY||mode==O_APPEND||mode==O_RDWR){
			i=1;
		}
		if(i==-1){
			for (i=0; i < fds.length; i++){	
				fds[i].descriptor = i;
				fds[i].setBytes(bts);
				fds[i].setPath(path);
			}
		}else{
			if (!fds[i].valid()) {
				fds[i].descriptor = i;
			}
			fds[i].setBytes(bts);
			fds[i].setPath(path);
		}
    	return fds[i];
    }
    
    public int close(int fd) throws FileNotFoundException
    {
    	if (fds[fd].valid())
    	{
    		fds[fd].descriptor = -1;
    		fds[fd].setBytes(null);
    	}
    	return 0;
    }

    public native long transfer(int fd, FileDescriptor sd, long offset, long count)
            throws IOException;

    public native int ioctlAvailable(FileDescriptor fileDescriptor) throws IOException;
}
