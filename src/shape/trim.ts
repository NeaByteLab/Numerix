import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Remove zero entries from array ends.
 * @description Trims leading or trailing zero values.
 * @template T - Type of the array entries
 * @param input - Array to trim
 * @param method - Side or sides that are trimmed
 * @param chosen - Optional axis or axes along which to trim a two-dimensional array
 * @returns Trimmed array without the zero entries
 */
export default function trim<T = number>(
  input: T[],
  method?: 'fb' | 'bf' | 'f' | 'b',
  chosen?: number | number[]
): T[] | Types.NumerixComplex[]
/**
 * Remove zero slices from matrix ends.
 * @description Trims leading or trailing all-zero slices.
 * @template T - Type of the matrix entries
 * @param input - Matrix to trim
 * @param method - Side or sides that are trimmed
 * @param chosen - Optional axis or axes along which to trim
 * @returns Trimmed matrix without the zero slices
 */
export default function trim<T = number>(
  input: T[][],
  method?: 'fb' | 'bf' | 'f' | 'b',
  chosen?: number | number[]
): T[][] | Types.NumerixComplex[][]
/**
 * Remove zero entries from array ends.
 * @description Trims leading or trailing zero values or matrix slices.
 * @template T - Type of the array or matrix entries
 * @param input - Array or matrix to trim
 * @param method - Side or sides that are trimmed
 * @param chosen - Optional axis or axes along which to trim
 * @returns Trimmed array or matrix without the zero entries
 */
export default function trim<T = number>(
  input: T[] | T[][],
  method: 'fb' | 'bf' | 'f' | 'b' = 'fb',
  chosen?: number | number[]
): T[] | T[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  const policy = method.toLowerCase()
  if (policy !== 'fb' && policy !== 'bf' && policy !== 'f' && policy !== 'b') {
    throw new RangeError(`unexpected character(s) in trim '${method}'`)
  }
  const matrix = Array.isArray(input[0])
  const items = chosen === undefined
    ? (matrix ? [0, 1] : [0])
    : Array.isArray(chosen)
    ? chosen
    : [chosen]
  if (!matrix && items.length > 1) {
    throw new RangeError('repeated axis in `axis` argument')
  }
  const visited = new Set<number>()
  const depth = matrix ? 2 : 1
  for (let cursor = 0; cursor < items.length; cursor++) {
    const entry = items[cursor] ?? 0
    const resolved = entry < 0 ? entry + depth : entry
    if (resolved < 0 || resolved >= depth) {
      throw new RangeError('axis out of bounds')
    }
    if (visited.has(resolved)) {
      throw new RangeError('repeated axis in `axis` argument')
    }
    visited.add(resolved)
  }
  let current = input as unknown[]
  if (visited.has(0)) {
    let start = 0
    let ending = current.length
    if (policy !== 'b') {
      while (start < ending) {
        if (matrix) {
          const slice = current[start] as unknown[]
          let zeroes = true
          for (let index = 0; index < slice.length; index++) {
            if (!Internal.settle('all', slice[index])) {
              zeroes = false
              break
            }
          }
          if (!zeroes) {
            break
          }
        } else if (!Internal.settle('all', current[start])) {
          break
        }
        start++
      }
    }
    if (policy !== 'f') {
      while (ending > start) {
        if (matrix) {
          const slice = current[ending - 1] as unknown[]
          let zeroes = true
          for (let index = 0; index < slice.length; index++) {
            if (!Internal.settle('all', slice[index])) {
              zeroes = false
              break
            }
          }
          if (!zeroes) {
            break
          }
        } else if (!Internal.settle('all', current[ending - 1])) {
          break
        }
        ending--
      }
    }
    current = current.slice(start, ending)
  }
  let trimmed: unknown = current
  if (matrix && visited.has(1)) {
    const table = current as T[][]
    const height = table.length
    const width = table[0]?.length ?? 0
    if (width === 0) {
      trimmed = []
    } else {
      let start = 0
      let ending = width
      if (policy !== 'b') {
        while (start < ending) {
          let zeroes = true
          for (let outer = 0; outer < height; outer++) {
            if (!Internal.settle('all', table[outer]?.[start])) {
              zeroes = false
              break
            }
          }
          if (!zeroes) {
            break
          }
          start++
        }
      }
      if (policy !== 'f') {
        while (ending > start) {
          let zeroes = true
          for (let outer = 0; outer < height; outer++) {
            if (!Internal.settle('all', table[outer]?.[ending - 1])) {
              zeroes = false
              break
            }
          }
          if (!zeroes) {
            break
          }
          ending--
        }
      }
      trimmed = table.map((entry) => (entry ?? []).slice(start, ending))
    }
  }
  return (
    Internal.classify(input, true, true) === true
      ? Internal.nested(trimmed)
      : (matrix && !visited.has(1)
        ? (trimmed as T[][]).map((entry) => (entry ?? []).slice())
        : trimmed)
  ) as T[] | T[][] | Types.NumerixComplex[] | Types.NumerixComplex[][]
}
