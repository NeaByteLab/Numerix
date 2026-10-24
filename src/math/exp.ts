import * as Internal from '@app/internal/index.ts'

/**
 * Compute the exponential of each element.
 * @description Applies an exponential variant across nested inputs.
 * @param value - Scalar, vector, or matrix input values
 * @param mode - Exponential variant to apply to each element
 * @returns Exponentials matching the input nesting shape
 */
export default function exp(
  value: number | number[] | number[][],
  mode: 'e' | '2' | 'm1' = 'e'
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => {
    if (mode === '2') {
      return Math.pow(2, scalar)
    }
    if (mode === 'm1') {
      return Math.expm1(scalar)
    }
    return Math.exp(scalar)
  })
}
