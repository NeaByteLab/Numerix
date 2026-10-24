import * as Internal from '@app/internal/index.ts'

/**
 * Compute inverse hyperbolic sine of elements.
 * @description Applies the inverse hyperbolic sine across nested inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Inverse hyperbolic sine values matching the input shape
 */
export default function asinh(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.asinh)
}
