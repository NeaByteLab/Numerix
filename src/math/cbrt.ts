import * as Internal from '@app/internal/index.ts'

/**
 * Compute the cube root per element.
 * @description Applies the cube root across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Cube roots matching the input nesting shape
 */
export default function cbrt(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.cbrt)
}
