import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import normal from '@app/random/normal.ts'

/**
 * Draw samples from a Wald distribution.
 * @description Produces positive variates with the given mean.
 * @param mean - Mean of the distribution
 * @param scale - Scale parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function wald(
  mean: number,
  scale: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleWald(mean, scale, generator)
  }
  return Internal.draw(size, () => sampleWald(mean, scale, generator))
}

/**
 * Draw one Wald variate.
 * @description Produces a single sample from the Wald distribution.
 * @param mean - Mean of the distribution
 * @param scale - Scale parameter of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single Wald variate
 */
function sampleWald(mean: number, scale: number, generator?: Types.NumerixGenerator): number {
  const value = Number(normal(0, 1, undefined, generator))
  const squared = value * value
  const values = mean + (mean * mean * squared) / (2 * scale) -
    (mean / (2 * scale)) * Math.sqrt(4 * mean * scale * squared + mean * mean * squared * squared)
  return Internal.source(generator) <= mean / (mean + values) ? values : (mean * mean) / values
}
