import * as Internal from '@app/internal/index.ts'

/**
 * Compute hyperbolic sine of each element.
 * @description Applies the hyperbolic sine across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Hyperbolic sine values matching the input shape
 */
export default function sinh(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.sinh)
}
