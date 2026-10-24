import type * as Types from '@app/types.ts'
import sentinel from '@app/internal/sentinel.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Combine two candidate lists element-wise.
 * @description Pairs entries and keeps the extreme of each pair.
 * @param values - Candidate entries
 * @param peer - Competing entries
 * @param skip - Whether invalid entries are skipped
 * @param direction - Whether the smallest or largest entry wins
 * @returns Extreme of each pair
 */
export default function pair(
  values: unknown[],
  peer: number[],
  skip: boolean,
  direction: Types.NumerixDirection
): number[] {
  const flat = Array.isArray(values[0]) ? Shape.flatten<number>(values) : (values as number[])
  const fallback = sentinel(direction)
  const length = flat.length
  const result = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    const value = flat[index] ?? fallback
    const competing = peer[index] ?? fallback
    if (skip) {
      if (Number.isNaN(value)) {
        result[index] = competing
        continue
      }
      if (Number.isNaN(competing)) {
        result[index] = value
        continue
      }
    }
    result[index] = direction === 'min' ? Math.min(value, competing) : Math.max(value, competing)
  }
  return result
}
