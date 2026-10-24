import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Gumbel distribution.
 * @description Produces extreme value variates with the given location.
 * @param center - Location parameter of the distribution
 * @param scale - Scale parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function gumbel(
  center: number = 0,
  scale: number = 1,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleGumbel(center, scale, generator)
  }
  return Internal.draw(size, () => sampleGumbel(center, scale, generator))
}

/**
 * Draw one Gumbel variate.
 * @description Produces a single extreme value sample.
 * @param center - Location parameter of the distribution
 * @param scale - Scale parameter of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single Gumbel variate
 */
function sampleGumbel(
  center: number,
  scale: number,
  generator?: Types.NumerixGenerator
): number {
  return center - scale * Math.log(-Math.log(1 - Internal.source(generator)))
}
