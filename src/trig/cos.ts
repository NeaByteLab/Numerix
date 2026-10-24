import * as Internal from '@app/internal/index.ts'

/**
 * Compute the cosine of each element.
 * @description Applies the cosine function across nested numeric inputs.
 * @param value - Scalar, vector, or matrix angles in radians
 * @returns Cosine values matching the input nesting shape
 */
export default function cos(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.cos)
}
