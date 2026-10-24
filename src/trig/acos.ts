import * as Internal from '@app/internal/index.ts'

/**
 * Compute inverse cosine of each element.
 * @description Applies the arccosine function across nested numeric inputs.
 * @param value - Scalar, vector, or matrix values within domain
 * @returns Arccosine values matching the input nesting shape
 */
export default function acos(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.acos)
}
