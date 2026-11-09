import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Zipf distribution.
 * @description Produces rank-weighted variates from the given exponent.
 * @param first - Exponent parameter of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function zipf(
  first: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (!(first > 1)) {
    throw new RangeError('zipf exponent must be greater than 1')
  }
  const exponent = first - 1
  const bound = Math.pow(2, exponent)
  return Internal.draw(count, () => {
    if (!Number.isFinite(bound)) {
      return 1
    }
    while (true) {
      const candidate = Math.floor(Math.pow(1 - Internal.source(generator), -1 / exponent))
      if (candidate < 1) {
        continue
      }
      const trial = Math.pow(1 + 1 / candidate, exponent)
      if (Internal.source(generator) * candidate * ((trial - 1) / (bound - 1)) <= trial / bound) {
        return candidate
      }
    }
  })
}
