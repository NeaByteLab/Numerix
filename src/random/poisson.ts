import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Poisson distribution.
 * @description Produces counts of events in an interval.
 * @param intensity - Expected number of events per interval
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function poisson(
  intensity: number = 1,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const threshold = Math.exp(-intensity)
  if (size === undefined) {
    return samplePoisson(threshold, generator)
  }
  return Internal.draw(size, () => samplePoisson(threshold, generator))
}

/**
 * Draw one Poisson variate.
 * @description Produces a single event count.
 * @param threshold - Cached exponential threshold of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single Poisson variate
 */
function samplePoisson(threshold: number, generator?: Types.NumerixGenerator): number {
  let index = 0
  let probability = 1
  do {
    index++
    probability *= Internal.source(generator)
  } while (probability > threshold)
  return index - 1
}
