import * as Internal from '@app/internal/index.ts'

/**
 * Compute the Heaviside step function.
 * @description Returns one above the threshold and zero below it.
 * @param value - Scalar, vector, or matrix input values
 * @param half - Threshold separating the two output levels
 * @returns Step values matching the input nesting shape
 */
export default function heaviside(
  value: number | number[] | number[][],
  half = 0.5
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => {
    if (scalar < 0) {
      return 0
    }
    if (scalar === 0) {
      return half
    }
    return 1
  })
}
