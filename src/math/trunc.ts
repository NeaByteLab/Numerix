import * as Internal from '@app/internal/index.ts'

/**
 * Truncate each element toward zero.
 * @description Applies truncation across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Truncated values matching the input nesting shape
 */
export default function trunc(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.trunc)
}
