import type * as Types from '@app/types.ts'
import beats from '@app/internal/beats.ts'
import sentinel from '@app/internal/sentinel.ts'

/**
 * Find the extreme in a list.
 * @description Scans entries for the extreme value index.
 * @param values - Entries to search
 * @param skip - Whether invalid entries are skipped
 * @param direction - Whether the smallest or largest entry wins
 * @returns Index of the extreme value
 */
export default function index1d(
  values: number[],
  skip: boolean,
  direction: Types.NumerixDirection
): number {
  let winner = 0
  let best = sentinel(direction)
  for (let index = 0; index < values.length; index++) {
    const value = values[index] ?? 0
    if (Number.isNaN(value)) {
      if (skip) {
        continue
      }
      return index
    }
    if (beats(value, best, direction)) {
      best = value
      winner = index
    }
  }
  return winner
}
