import type * as Types from '@app/types.ts'
import flatten from '@app/shape/flatten.ts'

/**
 * Build a resized nested array.
 * @description Places flat values into the target dimensions.
 * @param flat - Flat values to distribute
 * @param size - Number of available flat values
 * @param shape - Target shape of the result
 * @param last - Index of the last target dimension
 * @param dimension - Dimension currently being built
 * @param state - Tracks the next read position
 * @returns Resized value for the current dimension
 */
function buildResized(
  flat: unknown[],
  size: number,
  shape: number[],
  last: number,
  dimension: number,
  state: Types.NumerixOffset
): unknown {
  const length = shape[dimension] ?? 0
  const result = new Array<unknown>(length)
  if (dimension === last) {
    for (let index = 0; index < length; index++) {
      result[index] = flat[state.offset % size]
      state.offset++
    }
    return result
  }
  for (let index = 0; index < length; index++) {
    result[index] = buildResized(flat, size, shape, last, dimension + 1, state)
  }
  return result
}

/**
 * Resize a nested array.
 * @description Truncates or pads values to fit the target shape.
 * @param input - Nested array to resize
 * @param shape - Target shape of the resized result
 * @returns Array with the requested shape
 */
export default function resize(input: unknown[], shape: number[]): unknown {
  const flat = Array.isArray(input[0]) ? flatten<unknown>(input) : input
  const size = flat.length
  let total = 1
  for (let index = 0; index < shape.length; index++) {
    total *= shape[index] ?? 0
  }
  if (size === 0 || total === 0) {
    return []
  }
  return buildResized(flat, size, shape, shape.length - 1, 0, { offset: 0 })
}
