import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'
import svd from '@app/linalg/svd.ts'

/**
 * Compute a vector or matrix norm.
 * @description Measures magnitude using the requested order.
 * @param input - Vector or matrix whose norm is computed
 * @param order - Norm order or named variant
 * @returns Magnitude of the input
 */
export default function norm(
  input: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  order?: number | 'fro' | 'nuc' | 'inf' | '-inf'
): number
/**
 * Compute norms along a matrix axis.
 * @description Measures slice magnitudes along the given axis.
 * @param input - Matrix whose axis norms are computed
 * @param order - Norm order or named variant
 * @param level - Axis along which norms are computed
 * @returns Vector of norms along the axis
 */
export default function norm(
  input: number[][] | Types.NumerixComplex[][],
  order: number | 'fro' | 'nuc' | 'inf' | '-inf' | undefined,
  level: number
): number[]
/**
 * Compute a matrix norm over axes.
 * @description Measures matrix magnitude over the specified row and column axes.
 * @param input - Matrix whose norm is computed
 * @param order - Norm order or named variant
 * @param level - Two-element tuple of axes
 * @returns Scalar matrix norm
 */
export default function norm(
  input: number[][] | Types.NumerixComplex[][],
  order: number | 'fro' | 'nuc' | 'inf' | '-inf' | undefined,
  level: number[]
): number
/**
 * Compute a vector or matrix norm.
 * @description Measures magnitude using the requested order and axis.
 * @param input - Vector or matrix whose norm is computed
 * @param order - Norm order or named variant
 * @param level - Optional axis or two-element tuple of axes along which norms are computed
 * @returns Magnitude or vector of magnitudes
 */
export default function norm(
  input: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  order?: number | 'fro' | 'nuc' | 'inf' | '-inf',
  level?: number | number[]
): number | number[] {
  if (Array.isArray(input[0])) {
    const matrix = input as unknown[][]
    const height = matrix.length
    const extent = matrix[0]?.length ?? 0
    if (Array.isArray(level)) {
      if (level.length !== 2) {
        throw new RangeError('Improper number of dimensions to norm.')
      }
      const first = level[0] ?? 0
      const second = level[1] ?? 1
      const primary = first < 0 ? 2 + first : first
      const secondary = second < 0 ? 2 + second : second
      if (primary === secondary || primary < 0 || primary > 1 || secondary < 0 || secondary > 1) {
        throw new RangeError('Duplicate or out-of-bounds axes given.')
      }
      return norm(
        primary === 1 ? Shape.transpose(matrix as number[][]) : (matrix as number[][]),
        order
      )
    }
    if (level !== undefined) {
      const chosen = level < 0 ? 2 + level : level
      if (chosen !== 0 && chosen !== 1) {
        throw new RangeError('axis is out of bounds for array of dimension 2')
      }
      if (chosen === 1) {
        return matrix.map((slice) => norm((slice ?? []) as number[], order) as number)
      }
      const buffer = new Array<unknown>(height)
      return Array.from(
        { length: extent },
        (_unused, inner) =>
          norm(Internal.column(matrix, height, inner, buffer, 0) as number[], order) as number
      )
    }
    if (order === 2 || order === -2 || order === 'nuc') {
      if (order === -2 && (height === 0 || extent === 0)) {
        throw new RangeError('zero-size array to reduction operation minimum which has no identity')
      }
      if (height === 0 || extent === 0) {
        return 0
      }
      const singular = svd(matrix as number[][], true) as number[]
      if (order === 2) {
        return singular[0] ?? 0
      }
      if (order === -2) {
        return singular[singular.length - 1] ?? 0
      }
      let total = 0
      for (let index = 0; index < singular.length; index++) {
        total += singular[index] ?? 0
      }
      return total
    }
    if (order === 1 || order === -1) {
      const maximize = order === 1
      if (extent === 0) {
        if (!maximize) {
          throw new RangeError(
            'zero-size array to reduction operation minimum which has no identity'
          )
        }
        return 0
      }
      let result = maximize ? -Infinity : Infinity
      for (let column = 0; column < extent; column++) {
        let current = 0
        for (let outer = 0; outer < height; outer++) {
          const entry = matrix[outer]?.[column]
          current += Internal.shape(entry)
            ? Math.hypot(entry.re, entry.im)
            : Math.abs(Number(entry ?? 0))
        }
        if (Number.isNaN(current)) {
          return NaN
        }
        result = maximize ? Math.max(result, current) : Math.min(result, current)
      }
      return result
    }
    if (order === 'inf' || order === Infinity || order === '-inf' || order === -Infinity) {
      const maximize = order === 'inf' || order === Infinity
      if (height === 0 || (height === 1 && extent === 0)) {
        if (!maximize) {
          throw new RangeError(
            'zero-size array to reduction operation minimum which has no identity'
          )
        }
        return 0
      }
      let result = maximize ? -Infinity : Infinity
      for (let outer = 0; outer < height; outer++) {
        const current = norm((matrix[outer] ?? []) as number[], 1)
        if (Number.isNaN(current)) {
          return NaN
        }
        result = maximize ? Math.max(result, current) : Math.min(result, current)
      }
      return result
    }
    if (order !== undefined && order !== 'fro') {
      throw new RangeError(`Invalid norm order '${String(order)}' for matrices`)
    }
    let total = 0
    for (let outer = 0; outer < height; outer++) {
      const slice = matrix[outer] ?? []
      for (let column = 0; column < slice.length; column++) {
        const entry = slice[column]
        total += typeof entry === 'number'
          ? entry * entry
          : Internal.shape(entry)
          ? entry.re * entry.re + entry.im * entry.im
          : Number(entry ?? 0) ** 2
      }
    }
    return Math.sqrt(total)
  }
  if (level !== undefined && (Array.isArray(level) || (level !== 0 && level !== -1))) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const vector = input as unknown[]
  if (order === 'fro' || order === 'nuc') {
    throw new RangeError(`Invalid norm order '${order}' for vectors`)
  }
  if (order === undefined || order === 2) {
    let total = 0
    for (let index = 0; index < vector.length; index++) {
      const entry = vector[index]
      total += typeof entry === 'number'
        ? entry * entry
        : Internal.shape(entry)
        ? entry.re * entry.re + entry.im * entry.im
        : Number(entry ?? 0) ** 2
    }
    return Math.sqrt(total)
  }
  if (order === 'inf' || order === Infinity || order === '-inf' || order === -Infinity) {
    const maximize = order === 'inf' || order === Infinity
    if (vector.length === 0) {
      if (!maximize) {
        throw new RangeError('zero-size array to reduction operation minimum which has no identity')
      }
      return 0
    }
    let result = maximize ? -Infinity : Infinity
    for (let index = 0; index < vector.length; index++) {
      const entry = vector[index]
      const current = Internal.shape(entry)
        ? Math.hypot(entry.re, entry.im)
        : Math.abs(Number(entry ?? 0))
      if (Number.isNaN(current)) {
        return NaN
      }
      result = maximize ? Math.max(result, current) : Math.min(result, current)
    }
    return result
  }
  if (order === 0) {
    let tally = 0
    for (let index = 0; index < vector.length; index++) {
      const entry = vector[index]
      if (Internal.shape(entry) ? entry.re !== 0 || entry.im !== 0 : Number(entry ?? 0) !== 0) {
        tally++
      }
    }
    return tally
  }
  if (order === 1) {
    let total = 0
    for (let index = 0; index < vector.length; index++) {
      const entry = vector[index]
      total += typeof entry === 'number'
        ? Math.abs(entry)
        : Internal.shape(entry)
        ? Math.hypot(entry.re, entry.im)
        : Math.abs(Number(entry ?? 0))
    }
    return total
  }
  if (typeof order !== 'number') {
    throw new RangeError(`Invalid norm order '${String(order)}' for vectors`)
  }
  let total = 0
  for (let index = 0; index < vector.length; index++) {
    const entry = vector[index]
    total += Math.pow(
      Internal.shape(entry) ? Math.hypot(entry.re, entry.im) : Math.abs(Number(entry ?? 0)),
      order
    )
  }
  return Math.pow(total, 1 / order)
}
