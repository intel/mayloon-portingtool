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

package java.util;


/**
 * AbstractSequentialList is an abstract implementation of the List interface.
 * This implementation does not support adding. A subclass must implement the
 * abstract method listIterator().
 * @since 1.2
 */
public abstract class AbstractSequentialList<E> extends AbstractList<E> {

	/**
	 * Constructs a new instance of this AbstractSequentialList.
	 */
	protected AbstractSequentialList() {
		super();
	}

	/**
	 * Inserts the specified object into this List at the specified location.
	 * The object is inserted before any previous element at the specified
	 * location. If the location is equal to the size of this List, the object
	 * is added at the end.
	 * 
	 * @param location
	 *            the index at which to insert
	 * @param object
	 *            the object to add
	 * 
	 * @exception UnsupportedOperationException
	 *                when adding to this List is not supported
	 * @exception ClassCastException
	 *                when the class of the object is inappropriate for this
	 *                List
	 * @exception IllegalArgumentException
	 *                when the object cannot be added to this List
	 * @exception IndexOutOfBoundsException
	 *                when <code>location < 0 || >= size()</code>
	 * @exception NullPointerException
	 *                when the object is null and this List does not support
	 *                null elements
	 */
	@Override
    public void add(int location, E object) {
        if(object == null) {
            throw new NullPointerException();
        }
		listIterator(location).add(object);
	}

	/**
	 * Inserts the objects in the specified Collection at the specified location
	 * in this List. The objects are added in the order they are returned from
	 * the Collection iterator.
	 * 
	 * @param location
	 *            the index at which to insert
	 * @param collection
	 *            the Collection of objects
	 * @return true if this List is modified, false otherwise
	 * 
	 * @exception UnsupportedOperationException
	 *                when adding to this List is not supported
	 * @exception ClassCastException
	 *                when the class of an object is inappropriate for this List
	 * @exception IllegalArgumentException
	 *                when an object cannot be added to this List
	 * @exception IndexOutOfBoundsException
	 *                when <code>location < 0 || >= size()</code>
	 */
	@Override
    public boolean addAll(int location, Collection<? extends E> collection) {
        if(collection == null) {
            throw new NullPointerException();
        }
		ListIterator<E> it = listIterator(location);
		Iterator<? extends E> colIt = collection.iterator();
		int next = it.nextIndex();
		while (colIt.hasNext()) {
			it.add(colIt.next());
		}
		return next != it.nextIndex();
	}

	/**
	 * Answers the element at the specified location in this List.
	 * 
	 * @param location
	 *            the index of the element to return
	 * @return the element at the specified location
	 * 
	 * @exception IndexOutOfBoundsException
	 *                when <code>location < 0 || >= size()</code>
	 */
	@Override
    public E get(int location) {
        if(location < 0 || location >= size()) {
            throw new IndexOutOfBoundsException();
        }
        return listIterator(location).next();
	}

	/**
	 * Answers an Iterator on the elements of this List. The elements are
	 * iterated in the same order that they occur in the List.
	 * 
	 * @return an Iterator on the elements of this List
	 * 
	 * @see Iterator
	 */
	@Override
    public Iterator<E> iterator() {
		return listIterator(0);
	}

	/**
	 * Answers a ListIterator on the elements of this List. The elements are
	 * iterated in the same order that they occur in the List. The iteration
	 * starts at the specified location.
	 * 
	 * @param location
	 *            the index at which to start the iteration
	 * @return a ListIterator on the elements of this List
	 * 
	 * @exception IndexOutOfBoundsException
	 *                when <code>location < 0 || >= size()</code>
	 * 
	 * @see ListIterator
	 */
	@Override
    public abstract ListIterator<E> listIterator(int location);

	/**
	 * Removes the object at the specified location from this List.
	 * 
	 * @param location
	 *            the index of the object to remove
	 * @return the removed object
	 * 
	 * @exception UnsupportedOperationException
	 *                when removing from this List is not supported
	 * @exception IndexOutOfBoundsException
	 *                when <code>location < 0 || >= size()</code>
	 */
	@Override
    public E remove(int location) {
        if(location < 0 || location >= size()) {
            throw new IndexOutOfBoundsException();
        }

        ListIterator<E> it = listIterator(location);
        E result = it.next();
        it.remove();
        return result;
	}

	/**
	 * Replaces the element at the specified location in this List with the
	 * specified object.
	 * 
	 * @param location
	 *            the index at which to put the specified object
	 * @param object
	 *            the object to add
	 * @return the previous element at the index
	 * 
	 * @exception UnsupportedOperationException
	 *                when replacing elements in this List is not supported
	 * @exception ClassCastException
	 *                when the class of an object is inappropriate for this List
	 * @exception IllegalArgumentException
	 *                when an object cannot be added to this List
	 * @exception IndexOutOfBoundsException
	 *                when <code>location < 0 || >= size()</code>
	 */
	@Override
    public E set(int location, E object) {
        if(location < 0 || (location >= size())) {
            throw new IndexOutOfBoundsException();
        }

		ListIterator<E> it = listIterator(location);
		E result = it.next();
		it.set(object);
		return result;
	}

    @Override
    public int hashCode() {
        int result = 1;
        Iterator<?> it = iterator();
        while (it.hasNext()) {
            Object object = it.next();
            result = (31 * result) + (object == null ? 0 : object.hashCode());
        }
        return result;
    }
}
