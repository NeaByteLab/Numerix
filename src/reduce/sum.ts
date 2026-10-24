import * as Internal from '@app/internal/index.ts'

/**
 * Compute the sum of values.
 * @description Combines the entries into a running total.
 * @param values - Values whose entries are summed
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the entries are summed
 * @returns Sum of the values for the requested axis
 */
export default function sum(
  values: unknown[],
  nan: boolean | number = false,
  axis?: number
): number | number[] {
  return Internal.reduce(values, nan, axis, Internal.adder)
}
