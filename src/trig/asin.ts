import * as Internal from '@app/internal/index.ts'

/**
 * Compute inverse sine of each element.
 * @description Applies the arcsine function across nested numeric inputs.
 * @param value - Scalar, vector, or matrix values within domain
 * @returns Arcsine values matching the input nesting shape
 */
export default function asin(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.asin)
}
