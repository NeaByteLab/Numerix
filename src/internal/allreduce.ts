import type * as Types from '@app/types.ts'

/**
 * Reduce nested values with an accumulator.
 * @description Combines nested arrays into a single running value.
 * @param values - Nested values whose entries are combined
 * @param skip - Whether invalid entries are skipped
 * @param accumulator - Running combination applied to the entries
 * @returns Combined value of the nested entries
 */
export default function allreduce(
  values: unknown[],
  skip: boolean,
  accumulator: Types.NumerixReduce
): number {
  let running = accumulator.identity
  for (let index = 0; index < values.length; index++) {
    const entry = values[index]
    if (Array.isArray(entry)) {
      running = accumulator.combine(running, allreduce(entry, skip, accumulator))
    } else {
      const value = Number(entry)
      if (!skip || !Number.isNaN(value)) {
        running = accumulator.combine(running, value)
      }
    }
  }
  return running
}
