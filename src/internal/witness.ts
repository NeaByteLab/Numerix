import type * as Types from '@app/types.ts'
import settle from '@app/internal/settle.ts'

/**
 * Search nested values for a witness.
 * @description Stops at the first entry that settles the reduction.
 * @param values - Nested values to inspect
 * @param mode - Truthiness mode applied to the entries
 * @returns True when a settling entry exists
 */
export default function witness(values: unknown[], mode: Types.NumerixTruthy): boolean {
  for (let index = 0; index < values.length; index++) {
    const entry = values[index]
    if (Array.isArray(entry)) {
      if (witness(entry, mode)) {
        return true
      }
    } else if (settle(mode, entry)) {
      return true
    }
  }
  return false
}
