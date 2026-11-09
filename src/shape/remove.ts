import * as Internal from '@app/internal/index.ts'
import flatten from '@app/shape/flatten.ts'

/**
 * Remove entries from a matrix.
 * @description Drops rows or columns at the given positions.
 * @template T - Type of the matrix values
 * @param input - Matrix from which entries are removed
 * @param indices - Position or positions to remove
 * @param level - Axis along which entries are removed
 * @returns Matrix without the removed entries
 */
export default function remove<T>(
  input: T[][],
  indices: number | number[] | boolean[],
  level: number
): T[][]
/**
 * Remove entries from an array.
 * @description Drops entries at the given positions from the flattened array.
 * @template T - Type of the array values
 * @param input - Array from which entries are removed
 * @param index - Position or positions to remove
 * @param level - Null axis indicating a flattened array
 * @returns Vector without the removed entries
 */
export default function remove<T>(
  input: T[] | T[][],
  index: number | number[] | boolean[],
  level?: null
): T[]
/**
 * Remove entries from an array.
 * @description Drops the entries at the given positions.
 * @template T - Type of the array values
 * @param input - Array from which entries are removed
 * @param indices - Position or positions to remove
 * @param level - Optional axis along which entries are removed
 * @returns Array without the removed entries
 */
export default function remove<T>(
  input: T[] | T[][],
  indices: number | number[] | boolean[],
  level?: number | null
): T[] | T[][] {
  const vector = !Array.isArray(input[0])
  if (vector && level !== undefined && level !== null && level !== 0 && level !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const normalized = vector || level === undefined || level === null
    ? 1
    : level < 0
    ? 2 + level
    : level
  if (normalized !== 0 && normalized !== 1) {
    throw new RangeError('axis is out of bounds for array of dimension 2')
  }
  if (!vector) {
    if (level === undefined || level === null) {
      return remove(flatten<T>(input), indices)
    }
    if (normalized === 1) {
      return (input as T[][]).map((slice) => remove(slice ?? [], indices))
    }
  }
  const length = input.length
  const pruned: unknown[] = []
  let masked = false
  if (Array.isArray(indices)) {
    for (let index = 0; index < indices.length; index++) {
      if (typeof indices[index] === 'boolean') {
        masked = true
        break
      }
    }
  }
  if (masked && Array.isArray(indices)) {
    if (indices.length !== length) {
      throw new RangeError(
        `boolean array argument obj to delete must be one dimensional and match the axis length of ${length}`
      )
    }
    for (let index = 0; index < length; index++) {
      if (!indices[index]) {
        pruned.push((input as unknown[])[index])
      }
    }
  } else {
    const targets = typeof indices === 'number' ? [indices] : (indices as number[])
    const removed = new Set<number>()
    for (let index = 0; index < targets.length; index++) {
      const entry = targets[index] ?? 0
      const locus = entry < 0 ? length + entry : entry
      if (locus < 0 || locus >= length) {
        throw new RangeError('index is out of bounds for axis with size ' + length)
      }
      removed.add(locus)
    }
    for (let index = 0; index < length; index++) {
      if (!removed.has(index)) {
        pruned.push((input as unknown[])[index])
      }
    }
  }
  return (
    Internal.classify(input, true, true) === true
      ? Internal.nested(pruned)
      : (vector ? (pruned as T[]) : pruned.map((entry) => ((entry as T[]) ?? []).slice()))
  ) as unknown as T[] | T[][]
}
