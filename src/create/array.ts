import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Build an array from a source.
 * @description Reshapes binary, textual, or numeric sources.
 * @param source - Data used to populate the array
 * @param shape - Target dimensions or binary buffer
 * @param offset - Starting position within the source buffer
 * @returns Array holding the source values
 */
export default function array(
  source: unknown,
  shape: number | number[] | ArrayBufferView = 0,
  offset = 0
): unknown {
  if (typeof shape !== 'number') {
    const sizes = Array.isArray(source) ? (source as number[]) : [Number(source)]
    const items = ArrayBuffer.isView(shape) && !(shape instanceof DataView)
      ? Array.from(shape as unknown as ArrayLike<number>, (entry) => entry ?? 0)
      : (shape as number[])
    let total = 1
    for (let index = 0; index < sizes.length; index++) {
      total *= sizes[index] ?? 1
    }
    return Shape.reshape(
      offset === 0 && items.length === total ? items : items.slice(offset, offset + total),
      sizes
    )
  }
  let result = Internal.nested(source, (value) => {
    if (ArrayBuffer.isView(value) && !(value instanceof DataView)) {
      return Array.from(value as unknown as ArrayLike<number>, (entry) => entry ?? 0)
    }
    const numeric = typeof value === 'boolean' ? (value ? 1 : 0) : value
    if (Internal.shape(numeric)) {
      return { re: Number(numeric.re), im: Number(numeric.im) }
    }
    return Array.isArray(source) && Internal.classify(source, true, true) === true &&
        typeof numeric === 'number'
      ? { re: numeric, im: 0 }
      : numeric
  })
  for (let depth = Internal.depth(result); depth < shape; depth++) {
    result = [result]
  }
  return result
}
