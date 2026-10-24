import * as Internal from '@app/internal/index.ts'

/**
 * Compute the reciprocal of each element.
 * @description Divides one by every element in nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Reciprocals matching the input nesting shape
 */
export default function reciprocal(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => 1 / scalar)
}
