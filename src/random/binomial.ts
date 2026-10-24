import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a binomial distribution.
 * @description Produces counts of successes across fixed trials.
 * @param count - Number of independent trials per sample
 * @param probability - Success probability for each trial
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function binomial(
  count: number,
  probability: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleBinomial(count, probability, generator)
  }
  return Internal.draw(size, () => sampleBinomial(count, probability, generator))
}

/**
 * Draw one binomial variate.
 * @description Counts successes across the given trials.
 * @param count - Number of independent trials per sample
 * @param probability - Success probability for each trial
 * @param generator - Generator supplying uniform samples
 * @returns Single binomial variate
 */
function sampleBinomial(
  count: number,
  probability: number,
  generator?: Types.NumerixGenerator
): number {
  let successes = 0
  for (let index = 0; index < count; index++) {
    if (Internal.source(generator) < probability) {
      successes++
    }
  }
  return successes
}
