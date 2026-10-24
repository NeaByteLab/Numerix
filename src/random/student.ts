import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import chisquare from '@app/random/chisquare.ts'
import normal from '@app/random/normal.ts'

/**
 * Draw samples from a Student t-distribution.
 * @description Produces heavy tailed variates with given freedom.
 * @param freedom - Degrees of freedom for the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function student(
  freedom: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleStudent(freedom, generator)
  }
  return Internal.draw(size, () => sampleStudent(freedom, generator))
}

/**
 * Draw one Student t variate.
 * @description Produces a single sample from the Student distribution.
 * @param freedom - Degrees of freedom for the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single Student t variate
 */
function sampleStudent(freedom: number, generator?: Types.NumerixGenerator): number {
  return Number(normal(0, 1, undefined, generator)) /
    Math.sqrt(Number(chisquare(freedom, undefined, generator)) / freedom)
}
