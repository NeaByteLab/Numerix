import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a uniform distribution.
 * @description Produces variates spread evenly over the given range.
 * @param lower - Lower bound of the distribution
 * @param upper - Upper bound of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function uniform(
  lower: number = 0,
  upper: number = 1,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const width = upper - lower
  if (!Number.isFinite(width)) {
    throw new RangeError('high - low range exceeds valid bounds')
  }
  if (width < 0) {
    throw new RangeError('high - low < 0')
  }
  return Internal.draw(count, () => lower + Internal.source(generator) * width)
}
