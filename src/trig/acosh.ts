import * as Internal from '@app/internal/index.ts'

/**
 * Compute inverse hyperbolic cosine of elements.
 * @description Applies the inverse hyperbolic cosine across nested inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Inverse hyperbolic cosine values matching the input shape
 */
export default function acosh(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.acosh)
}
