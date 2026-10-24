import type * as Types from '@app/types.ts'
import gamma from '@app/random/gamma.ts'

/**
 * Draw samples from a chi-square distribution.
 * @description Produces sums of squared standard normal variates.
 * @param freedom - Number of degrees of freedom
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function chisquare(
  freedom: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  return gamma(freedom / 2, 2, size, generator)
}
