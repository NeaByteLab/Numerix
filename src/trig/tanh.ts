import * as Internal from '@app/internal/index.ts'

/**
 * Compute hyperbolic tangent of each element.
 * @description Applies the hyperbolic tangent across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Hyperbolic tangent values matching the input shape
 */
export default function tanh(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.tanh)
}
