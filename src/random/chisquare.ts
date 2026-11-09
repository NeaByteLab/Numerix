import type * as Types from '@app/types.ts'
import gamma from '@app/random/gamma.ts'

/**
 * Draw chi-square distribution samples.
 * @description Produces sums of squared standard normal variates.
 * @param freedom - Number of degrees of freedom
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function chisquare(
  freedom: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (freedom <= 0) {
    throw new RangeError('df <= 0')
  }
  return gamma(freedom / 2, 2, count, generator)
}
