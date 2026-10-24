import * as Internal from '@app/internal/index.ts'

/**
 * Round each element toward positive infinity.
 * @description Applies the ceiling function across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Rounded values matching the input nesting shape
 */
export default function ceil(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, Math.ceil)
}
