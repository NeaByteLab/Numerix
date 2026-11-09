import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a power distribution.
 * @description Produces variates from a power-law distribution.
 * @param first - Exponent parameter of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function power(
  first: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (first <= 0) {
    throw new RangeError('a <= 0')
  }
  return Internal.draw(count, () => Math.pow(Internal.source(generator), 1 / first))
}
