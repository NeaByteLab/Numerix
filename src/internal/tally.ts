import type * as Types from '@app/types.ts'

/**
 * Accumulate the sum and count.
 * @description Walks nested arrays collecting their total and entry count.
 * @param values - Nested values to tally
 * @param skip - Whether invalid entries are skipped
 * @param accumulator - Tracks the running sum and count
 */
export default function tally(
  values: unknown[],
  skip: boolean,
  accumulator: Types.NumerixSum
): void {
  for (let index = 0; index < values.length; index++) {
    const entry = values[index]
    if (Array.isArray(entry)) {
      tally(entry, skip, accumulator)
    } else {
      const value = Number(entry ?? 0)
      if (skip && Number.isNaN(value)) {
        continue
      }
      accumulator.sum += value
      accumulator.count++
    }
  }
}
