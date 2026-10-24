import * as Internal from '@app/internal/index.ts'

/**
 * Compute the sine of each element.
 * @description Applies the sine function across nested numeric inputs.
 * @param value - Scalar, vector, or matrix angles in radians
 * @returns Sine values matching the input nesting shape
 */
export default function sin(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.sin)
}
