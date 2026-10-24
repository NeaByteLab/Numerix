import type * as Types from '@app/types.ts'
import flatten from '@app/shape/flatten.ts'

/**
 * Build a reshaped nested array.
 * @description Places flat values into the target dimensions.
 * @param flat - Flat values to distribute
 * @param target - Target shape of the result
 * @param last - Index of the last target dimension
 * @param dimension - Dimension currently being built
 * @param state - Tracks the next read position
 * @returns Reshaped value for the current dimension
 */
function buildReshaped(
  flat: unknown[],
  target: number[],
  last: number,
  dimension: number,
  state: Types.NumerixOffset
): unknown {
  const length = target[dimension] ?? 0
  if (dimension === last) {
    const slice = flat.slice(state.offset, state.offset + length)
    state.offset += length
    return slice
  }
  const result = new Array<unknown>(length)
  for (let index = 0; index < length; index++) {
    result[index] = buildReshaped(flat, target, last, dimension + 1, state)
  }
  return result
}

/**
 * Reshape a nested array.
 * @description Rearranges flattened values into the target shape.
 * @param input - Nested array to reshape
 * @param shape - Target shape of the reshaped result
 * @returns Array with the requested shape
 */
export default function reshape(input: unknown[], shape: number[]): unknown {
  const flat = Array.isArray(input[0]) ? flatten<unknown>(input) : input
  const total = flat.length
  const count = shape.length
  const target = new Array<number>(count)
  let inferred = -1
  let fixed = 1
  for (let index = 0; index < count; index++) {
    const size = shape[index] ?? 0
    target[index] = size
    if (size === -1) {
      inferred = index
    } else {
      fixed *= size
    }
  }
  if (inferred !== -1) {
    target[inferred] = Math.floor(total / fixed)
  }
  if (count === 1) {
    return flat.slice(0, target[0] ?? 0)
  }
  if (count === 2) {
    const rows = target[0] ?? 0
    const columns = target[1] ?? 0
    const result = new Array<unknown[]>(rows)
    for (let row = 0; row < rows; row++) {
      const start = row * columns
      result[row] = flat.slice(start, start + columns)
    }
    return result
  }
  return buildReshaped(flat, target, count - 1, 0, { offset: 0 })
}
