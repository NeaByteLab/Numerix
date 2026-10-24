import * as Internal from '@app/internal/index.ts'

/**
 * Compute the tangent of each element.
 * @description Applies the tangent function across nested numeric inputs.
 * @param value - Scalar, vector, or matrix angles in radians
 * @returns Tangent values matching the input nesting shape
 */
export default function tan(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.tan)
}
