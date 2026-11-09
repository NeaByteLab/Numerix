import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the cumulative sum.
 * @description Adds running values along the requested axis.
 * @param values - Values whose running sum is computed
 * @param invalid - Whether invalid entries are skipped, or the axis index
 * @param level - Axis along which the sum accumulates
 * @returns Running sums matching the input shape
 */
export default function cumsum(
  values: unknown[],
  invalid: boolean | number | null = false,
  level?: number | boolean | null
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  return Internal.accumulate(values, invalid, level, Internal.adder)
}
