import * as Internal from '@app/internal/index.ts'

/**
 * Compute the square root per element.
 * @description Applies the square root across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Square roots matching the input nesting shape
 */
export default function sqrt(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.sqrt)
}
