import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Wald distribution.
 * @description Produces positive variates with the given mean.
 * @param center - Mean of the distribution
 * @param scale - Scale parameter of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function wald(
  center: number,
  scale: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (center <= 0 || scale <= 0) {
    throw new RangeError('wald mean and scale must be positive')
  }
  return Internal.draw(count, () => {
    const scaled = center * Internal.deviate(generator) ** 2
    const drawn = center +
      (center / (2 * scale)) * (scaled - Math.sqrt(4 * scale * scaled + scaled * scaled))
    return Internal.source(generator) <= center / (center + drawn)
      ? drawn
      : (center * center) / drawn
  })
}
