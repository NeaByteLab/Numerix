import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Multiply the entries of an array.
 * @description Combines values into a running product.
 * @param values - Values whose product is computed
 * @param invalid - Whether invalid entries are skipped
 * @param level - Axis along which the product is taken
 * @returns Product for the requested axis
 */
export default function prod(
  values: unknown[],
  invalid: boolean | number = false,
  level?: number
): number | number[] | Types.NumerixComplex | Types.NumerixComplex[] {
  return Internal.reduce(values, invalid, level, Internal.multiplier)
}
