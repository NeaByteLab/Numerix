import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Test whether values are finite.
 * @description Checks each element against infinity and NaN.
 * @param value - Scalar, vector, or matrix values to inspect
 * @returns Match results matching the input nesting shape
 */
export default function isfinite(
  value: Types.NumerixValue
): boolean | boolean[] | boolean[][] {
  return Internal.traverse(
    value,
    (entry) =>
      Internal.shape(entry)
        ? Number.isFinite(entry.re) && Number.isFinite(entry.im)
        : Number.isFinite(entry),
    false
  )
}
