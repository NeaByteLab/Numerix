import type * as Types from '@app/types.ts'
import beats from '@app/internal/beats.ts'
import sentinel from '@app/internal/sentinel.ts'

/**
 * Find the extreme in a structure.
 * @description Scans nested entries for the smallest or largest value.
 * @param values - Nested entries to search
 * @param skip - Whether invalid entries are skipped
 * @param direction - Whether the smallest or largest entry wins
 * @returns Extreme value, or NaN when an invalid entry is not skipped
 */
export default function sweep(
  values: unknown[],
  skip: boolean,
  direction: Types.NumerixDirection
): number {
  let best = sentinel(direction)
  let found = false
  for (let index = 0; index < values.length; index++) {
    const entry = values[index]
    const value = Array.isArray(entry) ? sweep(entry, skip, direction) : Number(entry ?? 0)
    if (Number.isNaN(value)) {
      if (skip) {
        continue
      }
      return NaN
    }
    found = true
    if (beats(value, best, direction)) {
      best = value
    }
  }
  return found ? best : skip ? NaN : best
}
