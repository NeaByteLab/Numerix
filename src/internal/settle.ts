import type * as Types from '@app/types.ts'

/**
 * Report whether an entry settles reduction.
 * @description Looks for a falsy or truthy entry.
 * @param mode - Truthiness mode applied to the entries
 * @param entry - Entry to inspect
 * @returns True when the entry settles the reduction
 */
export default function settle(mode: Types.NumerixTruthy, entry: unknown): boolean {
  return mode === 'all' ? !entry : !!entry
}
