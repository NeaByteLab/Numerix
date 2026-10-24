import type * as Types from '@app/types.ts'

/**
 * Accumulate the sum and count.
 * @description Collects the total and entry count of a vector.
 * @param values - Vector whose entries are accumulated
 * @param skip - Whether invalid entries are skipped
 * @param accumulator - Tracks the running sum and count
 */
export default function total(
  values: number[],
  skip: boolean,
  accumulator: Types.NumerixSum
): void {
  for (let index = 0; index < values.length; index++) {
    const value = values[index] ?? 0
    if (skip && Number.isNaN(value)) {
      continue
    }
    accumulator.sum += value
    accumulator.count++
  }
}
