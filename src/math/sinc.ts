import * as Internal from '@app/internal/index.ts'

/**
 * Compute the normalized sinc function.
 * @description Evaluates sin(x)/x across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Sinc values matching the input nesting shape
 */
export default function sinc(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => {
    if (scalar === 0) {
      return 1
    }
    const scaled = Math.PI * scalar
    return Math.sin(scaled) / scaled
  })
}
