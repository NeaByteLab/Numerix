import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the absolute value per element.
 * @description Applies the absolute value across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Magnitudes matching the input nesting shape
 */
export default function abs(
  value: Types.NumerixValue
): number | number[] | number[][] {
  return Internal.traverse(
    value,
    (entry) => Internal.shape(entry) ? Math.hypot(entry.re, entry.im) : Math.abs(Number(entry)),
    false
  )
}
