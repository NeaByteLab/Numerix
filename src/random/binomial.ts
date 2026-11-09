import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a binomial distribution.
 * @description Produces counts of successes across fixed trials.
 * @param count - Number of independent trials per sample
 * @param probability - Success probability for each trial
 * @param amount - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function binomial(
  count: number,
  probability: number,
  amount?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (!Number.isFinite(count)) {
    throw new RangeError('n must be finite')
  }
  const trials = Math.trunc(count)
  if (trials < 0) {
    throw new RangeError('n < 0')
  }
  if (probability < 0 || probability > 1 || Number.isNaN(probability)) {
    throw new RangeError('binomial probability must be in [0, 1]')
  }
  return Internal.draw(amount, () => {
    let successes = 0
    for (let index = 0; index < trials; index++) {
      if (Internal.source(generator) < probability) {
        successes++
      }
    }
    return successes
  })
}
