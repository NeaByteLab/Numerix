import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a normal distribution.
 * @description Produces variates around the given center.
 * @param center - Location parameter of the distribution
 * @param scale - Standard deviation of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function normal(
  center: number = 0,
  scale: number = 1,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return center + scale * Internal.deviate(generator)
  }
  return Internal.draw(size, () => center + scale * Internal.deviate(generator))
}
