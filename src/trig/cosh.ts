import * as Internal from '@app/internal/index.ts'

/**
 * Compute hyperbolic cosine of each element.
 * @description Applies the hyperbolic cosine across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Hyperbolic cosine values matching the input shape
 */
export default function cosh(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.cosh)
}
