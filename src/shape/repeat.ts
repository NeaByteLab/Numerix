import * as Internal from '@app/internal/index.ts'
import flatten from '@app/shape/flatten.ts'

/**
 * Repeat matrix entries.
 * @description Repeats the whole matrix or each entry separately.
 * @template T - Type of the matrix values
 * @param input - Matrix whose entries are repeated
 * @param repeats - Repetition count per entry or for the matrix
 * @param times - When true, repeats the whole matrix, or specifies the axis
 * @param level - Optional axis when repeating a matrix
 * @returns Array or matrix containing the repeated entries
 */
export default function repeat<T>(
  input: T[][],
  repeats: number | number[],
  times?: number | boolean,
  level?: number | boolean
): T[] | T[][]
/**
 * Repeat vector entries.
 * @description Repeats the whole vector or each entry separately.
 * @template T - Type of the vector values
 * @param input - Vector whose entries are repeated
 * @param repeats - Repetition count per entry or for the vector
 * @param times - When true, repeats the whole vector instead
 * @param level - Optional tile flag when an axis is passed
 * @returns Vector or matrix containing the repeated entries
 */
export default function repeat<T>(
  input: T[],
  repeats: number | number[],
  times?: boolean | number,
  level?: number | boolean
): T[] | T[][]
/**
 * Repeat array entries.
 * @description Repeats the whole array or each entry separately.
 * @param input - Array whose entries are repeated
 * @param repeats - Repetition count per entry or for the array
 * @param times - When true, repeats the whole array, or specifies the axis
 * @param level - Optional axis when repeating a matrix or tile flag
 * @returns Array containing the repeated entries
 */
export default function repeat(
  input: unknown[],
  repeats: number | number[],
  times?: boolean | number,
  level?: number | boolean
): unknown[] {
  const target = typeof times === 'number' ? times : typeof level === 'number' ? level : undefined
  const tiled = typeof times === 'boolean' ? times : typeof level === 'boolean' ? level : false
  let result: unknown[]
  if (
    Array.isArray(input[0]) &&
    target !== undefined &&
    !tiled &&
    (target < 0 ? target + 2 : target) === 1
  ) {
    result = (input as unknown[][]).map((entry) => repeat(entry, repeats))
  } else {
    if (target !== undefined && !tiled) {
      if (
        (Array.isArray(input[0])
          ? (target < 0 ? target + 2 : target)
          : (target < 0 ? target + 1 : target)) !== 0
      ) {
        throw new RangeError('axis out of bounds')
      }
    }
    if (tiled && (Array.isArray(input[0]) || (Array.isArray(repeats) && repeats.length === 2))) {
      const paired = Array.isArray(repeats) && repeats.length === 2
      const first = paired ? (repeats[0] ?? 0) : 1
      const second = paired
        ? (repeats[1] ?? 0)
        : (typeof repeats === 'number' ? repeats : repeats[0] ?? 1)
      if (first < 0 || second < 0) {
        throw new RangeError('negative dimensions are not allowed')
      }
      const matrix = Array.isArray(input[0]) ? (input as unknown[][]) : [input]
      result = Array.from(
        { length: matrix.length * Math.trunc(first) },
        (_outer, offset) => repeat(matrix[offset % matrix.length] ?? [], Math.trunc(second), true)
      )
    } else {
      const flattened = Array.isArray(input[0]) && target === undefined
        ? flatten<unknown>(input)
        : input
      if (tiled) {
        const count = typeof repeats === 'number' ? repeats : repeats[0] ?? 1
        if (count < 0) {
          throw new RangeError('negative dimensions are not allowed')
        }
        result = Array.from(
          { length: count * flattened.length },
          (_outer, index) => flattened[index % flattened.length]
        )
      } else {
        const counts = Array.isArray(repeats) ? repeats : [repeats]
        if (counts.length !== 1 && counts.length !== flattened.length) {
          throw new RangeError('repeats length must match axis length')
        }
        result = []
        for (let index = 0; index < flattened.length; index++) {
          const count = Math.trunc(counts.length === 1 ? (counts[0] ?? 0) : (counts[index] ?? 0))
          if (count < 0) {
            throw new RangeError('repeats may not contain negative values')
          }
          const entry = flattened[index]
          for (let round = 0; round < count; round++) {
            result.push(Array.isArray(entry) ? entry.slice() : entry)
          }
        }
      }
    }
  }
  return Internal.classify(input, true, true) === true
    ? (Internal.nested(result) as unknown[])
    : result
}
