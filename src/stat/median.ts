import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Compute the median value.
 * @description Selects the middle value of sorted entries.
 * @param values - Values whose median is computed
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the median is taken
 * @returns Median for the requested axis
 */
export default function median(
  values: unknown[],
  nan: boolean | number = false,
  axis?: number
): number | number[] {
  const { skip, target } = Internal.nanarg(nan, axis)
  if (target !== undefined && Array.isArray(values[0])) {
    const matrix = values as number[][]
    const rows = matrix.length
    if (target === 1 || target === -1) {
      const result = new Array<number>(rows)
      for (let row = 0; row < rows; row++) {
        result[row] = median1D(matrix[row] ?? [], skip)
      }
      return result
    }
    if (target === 0 || target === -2) {
      const columns = matrix[0]?.length ?? 0
      const result = new Array<number>(columns)
      const buffer = new Array<number>(rows)
      for (let column = 0; column < columns; column++) {
        result[column] = median1D(
          Internal.column(matrix, rows, column, buffer, 0),
          skip
        )
      }
      return result
    }
  }
  const flat = Array.isArray(values[0]) ? Shape.flatten<number>(values) : (values as number[])
  return median1D(flat, skip)
}

/**
 * Compute the median of a vector.
 * @description Selects the middle value of sorted entries.
 * @param values - Vector whose median is computed
 * @param skip - Whether invalid entries are skipped
 * @returns Median of the vector entries
 */
function median1D(values: number[], skip: boolean): number {
  const length = values.length
  if (length === 0) {
    return NaN
  }
  const buffer = new Float64Array(length)
  let count = 0
  for (let index = 0; index < length; index++) {
    const value = values[index] ?? 0
    if (Number.isNaN(value)) {
      if (skip) {
        continue
      }
      return NaN
    }
    buffer[count++] = value
  }
  if (count === 0) {
    return NaN
  }
  const filtered = count === length ? buffer : buffer.subarray(0, count)
  filtered.sort()
  const midpoint = count >> 1
  const upper = filtered[midpoint] ?? 0
  return (count & 1) === 1 ? upper : 0.5 * ((filtered[midpoint - 1] ?? upper) + upper)
}
