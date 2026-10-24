import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a geometric distribution.
 * @description Produces counts of trials before the first success.
 * @param probability - Success probability for each trial
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function geometric(
  probability: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const scale = 1 / Math.log(1 - probability)
  if (size === undefined) {
    return sampleGeometric(scale, generator)
  }
  return Internal.draw(size, () => sampleGeometric(scale, generator))
}

/**
 * Draw one geometric variate.
 * @description Produces a single count of trials before a success.
 * @param scale - Reciprocal log scale of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single geometric variate
 */
function sampleGeometric(
  scale: number,
  generator?: Types.NumerixGenerator
): number {
  return Math.floor(Math.log(1 - Internal.source(generator)) * scale) + 1
}
