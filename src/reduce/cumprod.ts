import * as Internal from '@app/internal/index.ts'

/**
 * Compute the cumulative product.
 * @description Multiplies running values along the requested axis.
 * @param values - Values whose running product is computed
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the product accumulates
 * @returns Running products matching the input shape
 */
export default function cumprod(
  values: unknown[],
  nan: boolean | number = false,
  axis?: number
): number[] | number[][] {
  const { skip } = Internal.nanarg(nan)
  return Internal.accumulate(values, skip, axis, Internal.multiplier)
}
