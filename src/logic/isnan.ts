import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Test whether values are NaN.
 * @description Checks each element against NaN.
 * @param value - Scalar, vector, or matrix values to inspect
 * @returns Match results matching the input nesting shape
 */
export default function isnan(
  value: Types.NumerixValue
): boolean | boolean[] | boolean[][] {
  return Internal.traverse(
    value,
    (entry) =>
      Internal.shape(entry)
        ? Number.isNaN(entry.re) || Number.isNaN(entry.im)
        : Number.isNaN(entry),
    false
  )
}
