import type * as Types from '@app/types.ts'
import * as Dtype from '@app/dtype/index.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Describe the memory layout of an array.
 * @description Reports strides and ordering for an array.
 * @param first - Array whose layout is inspected
 * @param second - Array compared against the first one
 * @returns Layout descriptor or a shared memory flag
 */
export default function memory(
  first: unknown,
  second?: unknown
): boolean | Types.NumerixLayout {
  if (second === undefined) {
    const details = Dtype.info(first)
    const strides = new Array<number>(details.ndim)
    let stride = details.itemSize
    let nontrivial = 0
    for (let index = details.ndim - 1; index >= 0; index--) {
      const length = details.shape[index] ?? 1
      strides[index] = stride
      stride *= length
      if (length > 1) {
        nontrivial++
      }
    }
    return {
      strides,
      cContiguous: true,
      fContiguous: details.ndim <= 1 || stride === 0 || nontrivial <= 1,
      writable: !Object.isFrozen(first),
      aligned: ArrayBuffer.isView(first) ? first.byteOffset % details.itemSize === 0 : true
    }
  }
  if (ArrayBuffer.isView(first) && ArrayBuffer.isView(second)) {
    if (first.byteLength === 0 || second.byteLength === 0 || first.buffer !== second.buffer) {
      return false
    }
    return first.byteOffset < second.byteOffset + second.byteLength &&
      second.byteOffset < first.byteOffset + first.byteLength
  }
  if (Array.isArray(first) && Array.isArray(second)) {
    const visited = new Set<object>()
    let pending: unknown[] = [first]
    while (pending.length > 0) {
      const current = pending.pop()
      if (Array.isArray(current)) {
        if (current.length > 0) {
          let populated = false
          for (let index = 0; index < current.length; index++) {
            const entry = current[index]
            if (Array.isArray(entry)) {
              if (entry.length > 0) {
                populated = true
                pending.push(entry)
              }
            } else if (entry !== undefined) {
              populated = true
              if (Internal.shape(entry)) {
                visited.add(entry)
              }
            }
          }
          if (populated) {
            visited.add(current)
          }
        }
      } else if (Internal.shape(current)) {
        visited.add(current)
      }
    }
    if (visited.size === 0) {
      return false
    }
    pending = [second]
    while (pending.length > 0) {
      const current = pending.pop()
      if (typeof current === 'object' && current !== null && visited.has(current)) {
        return true
      }
      if (Array.isArray(current)) {
        for (let index = 0; index < current.length; index++) {
          pending.push(current[index])
        }
      }
    }
    return false
  }
  return first === second
}
