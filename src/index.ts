/**
 *******************************************************************************
 * Copyright 2017-present Jonathan Barronville <jonathan@belairlabs.com>       *
 *                                                                             *
 * Licensed under the Apache License, Version 2.0 (the "License");             *
 * you may not use this file except in compliance with the License.            *
 * You may obtain a copy of the License at                                     *
 *                                                                             *
 *     http://www.apache.org/licenses/LICENSE-2.0                              *
 *                                                                             *
 * Unless required by applicable law or agreed to in writing, software         *
 * distributed under the License is distributed on an "AS IS" BASIS,           *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.    *
 * See the License for the specific language governing permissions and         *
 * limitations under the License.                                              *
 *******************************************************************************
 */

import Immutable = require('immutable')
import Objectz = require('objectz')

export type ImmutableQueue<T> = { list: Immutable.List<T>; }

export const clear = <T>(queue: ImmutableQueue<T>) => {
  return Objectz.createOwnNonEnumerableFrozenObject<ImmutableQueue<T>>({
    list: queue.list.clear()
  })
}

export const create = <T>() => {
  return Objectz.createOwnNonEnumerableFrozenObject<ImmutableQueue<T>>({
    list: Immutable.List<T>()
  })
}

export const createFrom = <T>(iterable: IterableIterator<T>) => {
  let queue = create<T>()
  for (let element of iterable) {
    queue = enqueue(queue, element)
  }
  return queue
}

export const createIterator = <T>(queue: ImmutableQueue<T>) => {
  return queue.list.values() as IterableIterator<T>
}

export const dequeue = <T>(queue: ImmutableQueue<T>) => {
  let element = queue.list.first() as (T | undefined)
  const newQueue = Objectz.createOwnNonEnumerableFrozenObject<ImmutableQueue<T>>({
    list: queue.list.shift()
  })
  return [newQueue, element] as [(typeof newQueue), (typeof element)]
}

export const enqueue = <T>(queue: ImmutableQueue<T>, element: T) => {
  return Objectz.createOwnNonEnumerableFrozenObject<ImmutableQueue<T>>({
    list: queue.list.push(element)
  })
}

export const isEmpty = <T>(queue: ImmutableQueue<T>) => queue.list.isEmpty()

export const size = <T>(queue: ImmutableQueue<T>) => queue.list.count()
