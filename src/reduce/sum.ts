import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the sum of values.
 * @description Combines the entries into a running total.
 * @param values - Values whose entries are summed
 * @param invalid - Whether invalid entries are skipped
 * @param level - Axis along which the entries are summed
 * @returns Sum of the values for the requested axis
 */
export default function sum(
  values: unknown[],
  invalid: boolean | number = false,
  level?: number
): number | number[] | Types.NumerixComplex | Types.NumerixComplex[] {
  return Internal.reduce(values, invalid, level, Internal.adder)
}
