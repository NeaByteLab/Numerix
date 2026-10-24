import * as Internal from '@app/internal/index.ts'

/**
 * Compute inverse hyperbolic tangent of elements.
 * @description Applies the inverse hyperbolic tangent across nested inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Inverse hyperbolic tangent values matching the input shape
 */
export default function atanh(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.atanh)
}
