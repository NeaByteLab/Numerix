import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Zipf distribution.
 * @description Produces rank weighted variates from the given exponent.
 * @param left - Exponent parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function zipf(
  left: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const exponent = left - 1
  const limit = Math.pow(2, exponent)
  if (size === undefined) {
    return sampleZipf(exponent, limit, generator)
  }
  return Internal.draw(size, () => sampleZipf(exponent, limit, generator))
}

/**
 * Draw one Zipf variate.
 * @description Produces a single rank weighted sample.
 * @param exponent - Exponent parameter of the distribution
 * @param limit - Cached upper bound of the rejection sampler
 * @param generator - Generator supplying uniform samples
 * @returns Single Zipf variate
 */
function sampleZipf(exponent: number, limit: number, generator?: Types.NumerixGenerator): number {
  const inverse = -1 / exponent
  while (true) {
    const uniform = 1 - Internal.source(generator)
    const value = Internal.source(generator)
    const values = Math.floor(Math.pow(uniform, inverse))
    if (values < 1) {
      continue
    }
    const trial = Math.pow(1 + 1 / values, exponent)
    if (value * values * ((trial - 1) / (limit - 1)) <= trial / limit) {
      return values
    }
  }
}
