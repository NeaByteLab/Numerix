import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import chisquare from '@app/random/chisquare.ts'

/**
 * Draw samples from an F distribution.
 * @description Produces variance ratio variates from given degrees of freedom.
 * @param numerator - Degrees of freedom of the numerator
 * @param denominator - Degrees of freedom of the denominator
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function fdist(
  numerator: number,
  denominator: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (numerator <= 0) {
    throw new RangeError('dfnum <= 0')
  }
  if (denominator <= 0) {
    throw new RangeError('dfden <= 0')
  }
  return Internal.draw(
    count,
    () =>
      (Number(chisquare(numerator, undefined, generator)) / numerator) /
      (Number(chisquare(denominator, undefined, generator)) / denominator)
  )
}
