import type * as Types from '@app/types.ts'

/**
 * Describe array memory layout.
 * @description Reports strides and ordering for an array.
 * @param left - Array whose layout is inspected
 * @param right - Array compared against the first one
 * @returns Layout descriptor or a shared memory flag
 */
export default function memory(
  left: unknown,
  right?: unknown
): boolean | Types.NumerixLayout {
  if (right === undefined) {
    const shape: number[] = []
    let cursor = left
    while (Array.isArray(cursor)) {
      shape.push(cursor.length)
      cursor = cursor[0]
    }
    const dimensions = shape.length
    const strides = new Array<number>(dimensions)
    let stride = 8
    for (let index = dimensions - 1; index >= 0; index--) {
      strides[index] = stride
      stride *= shape[index] ?? 1
    }
    return {
      strides,
      cContiguous: true,
      fContiguous: dimensions <= 1,
      writable: !Object.isFrozen(left),
      aligned: true
    }
  }
  if (left === right) {
    return true
  }
  if (ArrayBuffer.isView(left) && ArrayBuffer.isView(right)) {
    if (left.buffer !== right.buffer) {
      return false
    }
    const leftOffset = left.byteOffset
    const leftStop = leftOffset + left.byteLength
    const rightOffset = right.byteOffset
    const rightStop = rightOffset + right.byteLength
    return leftOffset < rightStop && rightOffset < leftStop
  }
  return false
}
