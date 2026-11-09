import type * as Types from '@app/types.ts'
import shape from '@app/internal/shape.ts'

/**
 * Report whether an entry settles a reduction.
 * @description Looks for a falsy or truthy entry.
 * @param policy - Truthiness mode applied to the entries
 * @param entry - Entry to inspect
 * @returns True when the entry settles the reduction
 */
export default function settle(policy: Types.NumerixTruthy, entry: unknown): boolean {
  if (typeof entry === 'number') {
    return policy === 'all' ? entry === 0 : entry !== 0
  }
  if (shape(entry)) {
    return policy === 'all' ? entry.re === 0 && entry.im === 0 : entry.re !== 0 || entry.im !== 0
  }
  return policy === 'all' ? !entry : !!entry
}
