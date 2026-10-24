import type * as Types from '@app/types.ts'

/**
 * Reduce a vector with an accumulator.
 * @description Combines a flat vector into a single running value.
 * @param values - Vector whose entries are combined
 * @param skip - Whether invalid entries are skipped
 * @param accumulator - Running combination applied to the entries
 * @returns Combined value of the vector entries
 */
export default function reduceone(
  values: number[],
  skip: boolean,
  accumulator: Types.NumerixReduce
): number {
  let running = accumulator.identity
  if (skip) {
    for (let index = 0; index < values.length; index++) {
      const value = Number(values[index])
      if (!Number.isNaN(value)) {
        running = accumulator.combine(running, value)
      }
    }
    return running
  }
  for (let index = 0; index < values.length; index++) {
    running = accumulator.combine(running, Number(values[index]))
  }
  return running
}
