import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Find the largest value.
 * @description Searches for the maximum entry along an axis.
 * @param values - Values to search for the maximum
 * @param invalid - Invalid entries or a flag to skip them
 * @param ignore - Whether invalid entries are skipped
 * @param level - Axis along which the maximum is sought
 * @returns Maximum value for the requested axis
 */
export default function max(
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
  return Internal.extreme(values, invalid, ignore, level, 'max')
}
