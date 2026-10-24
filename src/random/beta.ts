import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import gamma from '@app/random/gamma.ts'

/**
 * Draw samples from a beta distribution.
 * @description Produces variates with the given shape parameters.
 * @param left - First shape parameter of the distribution
 * @param right - Second shape parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function beta(
  left: number,
  right: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleBeta(left, right, generator)
  }
  return Internal.draw(size, () => sampleBeta(left, right, generator))
}

/**
 * Draw one beta variate.
 * @description Produces a single sample from the beta distribution.
 * @param left - First shape parameter of the distribution
 * @param right - Second shape parameter of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single beta variate
 */
function sampleBeta(
  left: number,
  right: number,
  generator?: Types.NumerixGenerator
): number {
  const first = Number(gamma(left, 1, undefined, generator))
  const second = Number(gamma(right, 1, undefined, generator))
  return first / (first + second)
}
