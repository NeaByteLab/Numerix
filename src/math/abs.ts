import * as Internal from '@app/internal/index.ts'

/**
 * Compute the absolute value per element.
 * @description Applies the absolute value across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Magnitudes matching the input nesting shape
 */
export default function abs(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.abs)
}
