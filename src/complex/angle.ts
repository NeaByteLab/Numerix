import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the phase angle of values.
 * @description Reports the argument of each nested entry.
 * @param value - Complex or real values to inspect
 * @param degrees - When true, returns the angle in degrees
 * @returns Phase angles matching the input nesting shape
 */
export default function angle(
  value: Types.NumerixValue,
  degrees = false
): number | number[] | number[][] {
  return Internal.traverse(
    value,
    (entry) =>
      (Internal.shape(entry) ? Math.atan2(entry.im, entry.re) : Math.atan2(0, Number(entry))) *
      (degrees ? 180 / Math.PI : 1),
    false
  )
}
