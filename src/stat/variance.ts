import * as Internal from '@app/internal/index.ts'

/**
 * Compute the variance of values.
 * @description Measures the spread around the mean.
 * @param left - Values whose variance is computed
 * @param freedom - Degrees of freedom used in the divisor
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the variance is taken
 * @returns Variance for the requested axis
 */
export default function variance(
  left: unknown[],
  freedom: number | boolean = 0,
  nan: boolean | number = false,
  axis?: number
): number | number[] {
  const resolved = typeof freedom === 'number' ? freedom : (typeof nan === 'number' ? nan : 0)
  const skip = typeof freedom === 'boolean' ? freedom : (typeof nan === 'boolean' ? nan : false)
  if (!Array.isArray(left[0])) {
    return var1D(left as number[], resolved, skip)
  }
  if (axis !== undefined) {
    const matrix = left as number[][]
    const rows = matrix.length
    if (axis === 1 || axis === -1) {
      const result = new Array<number>(rows)
      for (let row = 0; row < rows; row++) {
        result[row] = var1D(matrix[row] ?? [], resolved, skip)
      }
      return result
    }
    if (axis === 0 || axis === -2) {
      const columns = matrix[0]?.length ?? 0
      const result = new Array<number>(columns)
      const buffer = new Array<number>(rows)
      for (let column = 0; column < columns; column++) {
        result[column] = var1D(
          Internal.column(matrix, rows, column, buffer, 0),
          resolved,
          skip
        )
      }
      return result
    }
  }
  const accumulator = { sum: 0, count: 0 }
  Internal.tally(left, skip, accumulator)
  if (accumulator.count <= resolved) {
    return NaN
  }
  const mean = accumulator.sum / accumulator.count
  return diffFlat(left, mean, skip) / (accumulator.count - resolved)
}

/**
 * Compute the squared deviation of values.
 * @description Measures the spread of nested arrays around a mean.
 * @param values - Nested values to inspect
 * @param mean - Mean the values are compared against
 * @param skip - Whether invalid entries are skipped
 * @returns Sum of the squared deviations
 */
function diffFlat(values: unknown[], mean: number, skip: boolean): number {
  let squared = 0
  for (let index = 0; index < values.length; index++) {
    const entry = values[index]
    if (Array.isArray(entry)) {
      squared += diffFlat(entry, mean, skip)
    } else {
      const value = Number(entry ?? 0)
      if (skip && Number.isNaN(value)) {
        continue
      }
      const deviation = value - mean
      squared += deviation * deviation
    }
  }
  return squared
}

/**
 * Compute the variance of a vector.
 * @description Measures the spread of a total vector.
 * @param values - Vector whose variance is computed
 * @param freedom - Degrees of freedom used in the divisor
 * @param skip - Whether invalid entries are skipped
 * @returns Variance of the vector entries
 */
function var1D(values: number[], freedom: number, skip: boolean): number {
  const length = values.length
  const accumulator = { sum: 0, count: 0 }
  Internal.total(values, skip, accumulator)
  const { sum, count } = accumulator
  if (count <= freedom) {
    return NaN
  }
  const mean = sum / count
  let squared = 0
  for (let index = 0; index < length; index++) {
    const value = values[index] ?? 0
    if (skip && Number.isNaN(value)) {
      continue
    }
    const deviation = value - mean
    squared += deviation * deviation
  }
  return squared / (count - freedom)
}
