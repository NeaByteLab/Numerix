import type * as Types from '@app/types.ts'

/**
 * Compute the peak to peak range.
 * @description Subtracts the minimum from the maximum.
 * @param values - Values whose range is computed
 * @param axis - Axis along which the range is taken
 * @returns Range of values for the requested axis
 */
export default function ptp(values: unknown[], axis?: number): number | number[] {
  if (!Array.isArray(values[0])) {
    return ptp1D(values as number[])
  }
  if (axis !== undefined) {
    const matrix = values as number[][]
    const rows = matrix.length
    if (axis === 1 || axis === -1) {
      const result = new Array<number>(rows)
      for (let row = 0; row < rows; row++) {
        result[row] = ptp1D(matrix[row] ?? [])
      }
      return result
    }
    const width = matrix[0]?.length ?? 0
    const result = new Array<number>(width)
    for (let column = 0; column < width; column++) {
      let lowest = Infinity
      let highest = -Infinity
      for (let row = 0; row < rows; row++) {
        const value = matrix[row]?.[column] ?? 0
        if (value < lowest) {
          lowest = value
        }
        if (value > highest) {
          highest = value
        }
      }
      result[column] = rows === 0 ? 0 : highest - lowest
    }
    return result
  }
  const bounds = { low: Infinity, high: -Infinity, count: 0 }
  boundsFlat(values, bounds)
  return bounds.count === 0 ? 0 : bounds.high - bounds.low
}

/**
 * Track the bounds of nested values.
 * @description Records the lowest and highest entries found.
 * @param values - Nested values to inspect
 * @param bounds - Tracks the bounds and entry count
 */
function boundsFlat(values: unknown[], bounds: Types.NumerixBounds): void {
  for (let index = 0; index < values.length; index++) {
    const entry = values[index]
    if (Array.isArray(entry)) {
      boundsFlat(entry, bounds)
    } else {
      const value = Number(entry ?? 0)
      bounds.count++
      if (value < bounds.low) {
        bounds.low = value
      }
      if (value > bounds.high) {
        bounds.high = value
      }
    }
  }
}

/**
 * Compute the range of a vector.
 * @description Subtracts the minimum from the maximum.
 * @param values - Vector whose range is computed
 * @returns Range of the vector entries
 */
function ptp1D(values: number[]): number {
  const length = values.length
  if (length === 0) {
    return 0
  }
  let lowest = Infinity
  let highest = -Infinity
  for (let index = 0; index < length; index++) {
    const value = values[index] ?? 0
    if (value < lowest) {
      lowest = value
    }
    if (value > highest) {
      highest = value
    }
  }
  return highest - lowest
}
