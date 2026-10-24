import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Extract the real part of values.
 * @description Reads the real component of each nested entry.
 * @param value - Complex or real values to inspect
 * @returns Real parts matching the input nesting shape
 */
export default function real(
  value: Types.NumerixValue
): number | number[] | number[][] {
  return Internal.traverse(value, (entry) => Internal.components(entry).re)
}
