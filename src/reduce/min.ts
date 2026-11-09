import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Find the smallest value.
 * @description Searches for the minimum entry along an axis.
 * @param values - Values to search for the minimum
 * @param invalid - Invalid entries or a flag to skip them
 * @param ignore - Whether invalid entries are skipped
 * @param level - Axis along which the minimum is sought
 * @returns Minimum value for the requested axis
 */
export default function min(
  values: unknown[],
  invalid?: unknown[] | boolean | number,
  ignore: boolean | number = false,
  level?: number
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  return Internal.extreme(values, invalid, ignore, level, 'min')
}
