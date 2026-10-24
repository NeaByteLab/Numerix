import * as Internal from '@app/internal/index.ts'

/**
 * Compute the cumulative sum.
 * @description Adds running values along the requested axis.
 * @param values - Values whose running sum is computed
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the sum accumulates
 * @returns Running sums matching the input shape
 */
export default function cumsum(
  values: unknown[],
  nan: boolean | number = false,
  axis?: number
): number[] | number[][] {
  const { skip } = Internal.nanarg(nan)
  return Internal.accumulate(values, skip, axis, Internal.adder)
}
