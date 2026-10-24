import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from an exponential distribution.
 * @description Produces variates with the given scale parameter.
 * @param scale - Scale parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function exp(
  scale: number = 1,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleExponential(scale, generator)
  }
  return Internal.draw(size, () => sampleExponential(scale, generator))
}

/**
 * Draw one exponential variate.
 * @description Produces a single sample with the given scale.
 * @param scale - Scale parameter of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single exponential variate
 */
function sampleExponential(
  scale: number,
  generator?: Types.NumerixGenerator
): number {
  return -scale * Math.log(1 - Internal.source(generator))
}
