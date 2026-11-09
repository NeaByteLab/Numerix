import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import chisquare from '@app/random/chisquare.ts'

/**
 * Draw Student distribution samples.
 * @description Produces heavy-tailed variates with the given degrees of freedom.
 * @param freedom - Degrees of freedom for the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function student(
  freedom: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (freedom <= 0) {
    throw new RangeError('df <= 0')
  }
  return Internal.draw(
    count,
    () =>
      Internal.deviate(generator) /
      Math.sqrt(Number(chisquare(freedom, undefined, generator)) / freedom)
  )
}
