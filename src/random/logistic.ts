import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a logistic distribution.
 * @description Produces variates around the given center.
 * @param center - Location parameter of the distribution
 * @param scale - Scale parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function logistic(
  center: number = 0,
  scale: number = 1,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleLogistic(center, scale, generator)
  }
  return Internal.draw(size, () => sampleLogistic(center, scale, generator))
}

/**
 * Draw one logistic variate.
 * @description Produces a single sample from the logistic distribution.
 * @param center - Location parameter of the distribution
 * @param scale - Scale parameter of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single logistic variate
 */
function sampleLogistic(center: number, scale: number, generator?: Types.NumerixGenerator): number {
  const uniform = Internal.source(generator)
  return center + scale * Math.log(uniform / (1 - uniform))
}
