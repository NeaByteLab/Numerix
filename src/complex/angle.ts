import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/** Conversion factor from radians to degrees */
const scale = 180 / Math.PI

/**
 * Compute the phase angle of values.
 * @description Reports the argument of each nested entry.
 * @param value - Complex or real values to inspect
 * @param degrees - When true returns the angle in degrees
 * @returns Phase angles matching the input nesting shape
 */
export default function angle(
  value: Types.NumerixValue,
  degrees = false
): number | number[] | number[][] {
  return Internal.traverse(value, (entry) => {
    const { re, im } = Internal.components(entry)
    const radians = Math.atan2(im, re)
    return degrees ? radians * scale : radians
  })
}
