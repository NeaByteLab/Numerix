import * as Internal from '@app/internal/index.ts'

/**
 * Compute the arithmetic mean.
 * @description Averages values along the requested axis.
 * @param left - Values whose mean is computed
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the mean is taken
 * @returns Mean for the requested axis
 */
export default function mean(
  left: unknown[],
  nan: boolean | number = false,
  axis?: number
): number | number[] {
  const { skip, target } = Internal.nanarg(nan, axis)
  if (!Array.isArray(left[0])) {
    return mean1D(left as number[], skip)
  }
  if (target !== undefined) {
    const matrix = left as number[][]
    const rows = matrix.length
    if (target === 1 || target === -1) {
      const result = new Array<number>(rows)
      for (let row = 0; row < rows; row++) {
        result[row] = mean1D(matrix[row] ?? [], skip)
      }
      return result
    }
    if (target === 0 || target === -2) {
      const width = matrix[0]?.length ?? 0
      const result = new Array<number>(width)
      for (let column = 0; column < width; column++) {
        let sum = 0
        let count = 0
        for (let row = 0; row < rows; row++) {
          const value = matrix[row]?.[column] ?? 0
          if (skip && Number.isNaN(value)) {
            continue
          }
          sum += value
          count++
        }
        result[column] = count === 0 ? NaN : sum / count
      }
      return result
    }
  }
  const accumulator = { sum: 0, count: 0 }
  Internal.tally(left, skip, accumulator)
  return accumulator.count === 0 ? NaN : accumulator.sum / accumulator.count
}

/**
 * Compute the mean of a vector.
 * @description Averages the entries of a total vector.
 * @param values - Vector whose mean is computed
 * @param skip - Whether invalid entries are skipped
 * @returns Mean of the vector entries
 */
function mean1D(values: number[], skip: boolean): number {
  const accumulator = { sum: 0, count: 0 }
  Internal.total(values, skip, accumulator)
  const { sum, count } = accumulator
  return count === 0 ? NaN : sum / count
}
