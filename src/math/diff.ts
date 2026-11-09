import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Compute differences of a matrix.
 * @description Repeats finite differencing to reach the requested order.
 * @param values - Matrix of input values
 * @param order - Number of differencing passes to apply
 * @param level - Axis along which differences are computed
 * @param prepend - Optional values prepended before differencing
 * @param append - Optional values appended before differencing
 * @returns Matrix of differences
 */
export default function diff(
  values: number[][],
  order?: number,
  level?: number,
  prepend?: number | number[] | number[][],
  append?: number | number[] | number[][]
): number[][]
/**
 * Compute flattened matrix differences.
 * @description Flattens the matrix before repeating finite differencing.
 * @param values - Matrix of input values
 * @param order - Number of differencing passes to apply
 * @param level - Flat mode selector
 * @param prepend - Optional values prepended before differencing
 * @param append - Optional values appended before differencing
 * @returns Flattened vector of differences
 */
export default function diff(
  values: number[][],
  order: number,
  level: 'flat' | null,
  prepend?: number | number[],
  append?: number | number[]
): number[]
/**
 * Compute differences of a vector.
 * @description Repeats finite differencing to reach the requested order.
 * @param values - Vector of input values
 * @param order - Number of differencing passes to apply
 * @param level - Axis selector or values prepended before differencing
 * @param prepend - Optional values prepended before differencing
 * @param append - Optional values appended before differencing
 * @returns Vector of differences
 */
export default function diff(
  values: number[],
  order?: number,
  level?: number | 'flat' | null | number[],
  prepend?: number | number[],
  append?: number | number[]
): number[]
/**
 * Compute complex finite differences.
 * @description Repeats finite differencing to reach the requested order.
 * @param values - Complex vector or matrix of input values
 * @param order - Number of differencing passes to apply
 * @param level - Axis along which differences are computed
 * @param prepend - Optional values prepended before differencing
 * @param append - Optional values appended before differencing
 * @returns Complex differences matching the input shape
 */
export default function diff(
  values:
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  order?: number,
  level?:
    | number
    | 'flat'
    | null
    | number[]
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[],
  prepend?: Types.NumerixValue,
  append?: Types.NumerixValue
): Types.NumerixComplex[] | Types.NumerixComplex[][]
/**
 * Compute differences between adjacent elements.
 * @description Repeats finite differencing to reach the requested order.
 * @param values - Vector or matrix of input values
 * @param order - Number of differencing passes to apply
 * @param level - Axis along which differences are computed, or values prepended before differencing
 * @param prepend - Optional values prepended before differencing
 * @param append - Optional values appended before differencing
 * @returns Differences matching the shape of the input
 */
export default function diff(
  values:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  order = 1,
  level:
    | number
    | 'flat'
    | null
    | number[]
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[] = -1,
  prepend?: Types.NumerixValue,
  append?: Types.NumerixValue
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (order < 0) {
    throw new RangeError('order must be non-negative')
  }
  if (order === 0) {
    prepend = undefined
    append = undefined
    if (Array.isArray(level)) {
      level = -1
    }
  }
  const promote = Internal.classify(values, true, true) === true ||
    Internal.classify(prepend, true, true) === true ||
    Internal.classify(append, true, true) === true ||
    (Array.isArray(level) && Internal.classify(level, true, true) === true)
  if (Array.isArray(values[0])) {
    if (level === 'flat' || level === null) {
      return diff(
        Shape.flatten(values) as number[],
        order,
        0,
        prepend as number,
        append as number
      )
    }
    const chosen = typeof level === 'number' ? level : -1
    const matrix = values as unknown[][]
    const width = matrix[0]?.length ?? 0
    const shifted = chosen < 0 ? 2 + chosen : chosen
    if (shifted !== 0 && shifted !== 1) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    if (shifted === 0) {
      const extended: unknown[][] = []
      for (const extra of [prepend, matrix, append]) {
        if (extra === undefined) {
          continue
        }
        if (extra === matrix) {
          for (let cursor = 0; cursor < matrix.length; cursor++) {
            extended.push(matrix[cursor] ?? [])
          }
          continue
        }
        if (!Array.isArray(extra)) {
          extended.push(new Array<unknown>(width).fill(extra))
          continue
        }
        const block = (Array.isArray(extra[0]) ? extra : [extra]) as unknown[][]
        for (let cursor = 0; cursor < block.length; cursor++) {
          const entry = block[cursor]
          if ((entry?.length ?? 0) !== width) {
            throw new RangeError(
              'all the input array dimensions except for the concatenation axis must match exactly'
            )
          }
          extended.push(entry ?? [])
        }
      }
      if (order >= extended.length) {
        return []
      }
      if (width === 0) {
        return Array.from({ length: extended.length - order }, () => [])
      }
      const height = extended.length
      if (!promote) {
        const working = Array.from(
          { length: height },
          (_outer, outer) =>
            Array.from(
              { length: width },
              (_inner, column) => Number(extended[outer]?.[column] ?? 0)
            )
        )
        for (let stage = 0; stage < order; stage++) {
          for (let outer = 0; outer < height - 1 - stage; outer++) {
            const current = working[outer]!
            const after = working[outer + 1]!
            for (let column = 0; column < width; column++) {
              current[column] = (after[column] ?? 0) - (current[column] ?? 0)
            }
          }
        }
        working.length = height - order
        return working
      }
      const working = Internal.nested(extended) as Types.NumerixComplex[][]
      for (let stage = 0; stage < order; stage++) {
        for (let outer = 0; outer < height - 1 - stage; outer++) {
          const current = working[outer]!
          const after = working[outer + 1]!
          for (let column = 0; column < width; column++) {
            const prior = current[column]!
            const later = after[column]!
            prior.re = later.re - prior.re
            prior.im = later.im - prior.im
          }
        }
      }
      working.length = height - order
      return working
    }
    for (const extra of [prepend, append]) {
      if (Array.isArray(extra) && extra.length !== matrix.length) {
        throw new RangeError(
          'all the input array dimensions except for the concatenation axis must match exactly'
        )
      }
    }
    if (!promote && prepend === undefined && append === undefined) {
      return matrix.map((slice) => {
        const items = (slice ?? []) as number[]
        const length = items.length
        if (order === 0) {
          return items.slice()
        }
        if (order >= length) {
          return []
        }
        const working = items.slice()
        for (let stage = 0; stage < order; stage++) {
          for (let index = 0; index < length - 1 - stage; index++) {
            working[index] = (working[index + 1] ?? 0) - (working[index] ?? 0)
          }
        }
        working.length = length - order
        return working
      })
    }
    const result = matrix.map((slice, outer) =>
      diff(
        (slice ?? []) as number[] | Types.NumerixComplex[],
        order,
        0,
        (!Array.isArray(prepend)
          ? prepend
          : Array.isArray(prepend[0])
          ? ((prepend as unknown[][])[outer] ?? [])
          : ((prepend as unknown[])[outer] ?? 0)) as number,
        (!Array.isArray(append)
          ? append
          : Array.isArray(append[0])
          ? ((append as unknown[][])[outer] ?? [])
          : ((append as unknown[])[outer] ?? 0)) as number
      )
    )
    return (
      promote ? Internal.nested(result) : result
    ) as number[][] | Types.NumerixComplex[][]
  }
  if (typeof level === 'number' && level !== 0 && level !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const prefix = Array.isArray(level) ? level : prepend
  const suffix = Array.isArray(level) ? prepend : append
  const items = prefix === undefined && suffix === undefined
    ? (values as unknown[])
    : ([] as unknown[]).concat(
      prefix === undefined ? [] : Array.isArray(prefix) ? prefix : [prefix],
      values as unknown[],
      suffix === undefined ? [] : Array.isArray(suffix) ? suffix : [suffix]
    )
  const length = items.length
  if (order <= 0) {
    return (promote ? Internal.nested(items) : items.slice()) as
      | number[]
      | Types.NumerixComplex[]
  }
  if (order >= length) {
    return []
  }
  if (!promote) {
    const working = Array.from({ length }, (_unused, index) => Number(items[index] ?? 0))
    for (let stage = 0; stage < order; stage++) {
      for (let index = 0; index < length - 1 - stage; index++) {
        working[index] = (working[index + 1] ?? 0) - (working[index] ?? 0)
      }
    }
    working.length = length - order
    return working
  }
  const working = Internal.nested(items) as Types.NumerixComplex[]
  for (let stage = 0; stage < order; stage++) {
    for (let index = 0; index < length - 1 - stage; index++) {
      const after = working[index + 1]!
      const prior = working[index]!
      prior.re = after.re - prior.re
      prior.im = after.im - prior.im
    }
  }
  working.length = length - order
  return working
}
