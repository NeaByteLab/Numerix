import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import chisquare from '@app/random/chisquare.ts'

/**
 * Draw samples from an F distribution.
 * @description Produces variance ratio variates from given degrees of freedom.
 * @param numerator - Degrees of freedom of the numerator
 * @param denominator - Degrees of freedom of the denominator
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function fdist(
  numerator: number,
  denominator: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleFdist(numerator, denominator, generator)
  }
  return Internal.draw(size, () => sampleFdist(numerator, denominator, generator))
}

/**
 * Draw one F variate.
 * @description Produces a single variance ratio sample.
 * @param numerator - Degrees of freedom of the numerator
 * @param denominator - Degrees of freedom of the denominator
 * @param generator - Generator supplying uniform samples
 * @returns Single F variate
 */
function sampleFdist(
  numerator: number,
  denominator: number,
  generator?: Types.NumerixGenerator
): number {
  const ratio = Number(chisquare(numerator, undefined, generator)) / numerator
  const reciprocal = Number(chisquare(denominator, undefined, generator)) / denominator
  return ratio / reciprocal
}
