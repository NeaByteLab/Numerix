import * as Internal from '@app/internal/index.ts'

/**
 * Compute the Heaviside step function.
 * @description Returns one above the threshold and zero below it.
 * @param value - Scalar, vector, or matrix input values
 * @param midpoint - Threshold separating the two output levels
 * @returns Step values matching the input nesting shape
 */
export default function heaviside(
  value: number | number[] | number[][],
  midpoint: number | number[] | number[][] = 0.5
): number | number[] | number[][] {
  if (typeof midpoint === 'number' && Internal.classify(value, true, true) === false) {
    if (typeof value === 'number') {
      return Number.isNaN(value) ? NaN : value < 0 ? 0 : value === 0 ? midpoint : 1
    }
    return Internal.mapper(
      value,
      (scalar) => (Number.isNaN(scalar) ? NaN : scalar < 0 ? 0 : scalar === 0 ? midpoint : 1)
    )
  }
  return Internal.broadcast(value, midpoint, (scalar, boundary) => {
    if (Number.isNaN(scalar)) {
      return NaN
    }
    if (scalar < 0) {
      return 0
    }
    if (scalar === 0) {
      return boundary
    }
    return 1
  })
}
