import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Shuffle an array in place.
 * @description Rearranges entries using a Fisher-Yates pass.
 * @param values - Array whose entries are reordered
 * @param generator - Generator supplying uniform samples
 * @returns The same array with reordered entries
 * @template T - Type of the shuffled entries
 */
export default function shuffle<T>(values: T[], generator?: Types.NumerixGenerator): T[] {
  for (let index = values.length - 1; index > 0; index--) {
    const offset = Math.floor(Internal.source(generator) * (index + 1))
    const current = values[index] as T
    values[index] = values[offset] as T
    values[offset] = current
  }
  return values
}
