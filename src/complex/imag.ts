import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Extract the imaginary part of values.
 * @description Reads the imaginary component of each nested entry.
 * @param value - Complex or real values to inspect
 * @returns Imaginary parts matching the input nesting shape
 */
export default function imag(
  value: Types.NumerixValue
): number | number[] | number[][] {
  return Internal.traverse(value, (entry) => Internal.components(entry).im)
}
