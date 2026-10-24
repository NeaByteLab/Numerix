import * as Internal from '@app/internal/index.ts'

/**
 * Limit each element to a range.
 * @description Clamps nested numeric inputs between lower and upper bounds.
 * @param value - Scalar, vector, or matrix input values
 * @param min - Lower bound applied to each element
 * @param max - Upper bound applied to each element
 * @returns Clamped values matching the input nesting shape
 */
export default function clip(
  value: number | number[] | number[][],
  min = -Infinity,
  max = Infinity
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => Math.min(Math.max(scalar, min), max))
}
