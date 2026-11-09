import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Weibull distribution.
 * @description Produces positive variates with the given shape.
 * @param first - Shape parameter of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function weibull(
  first: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (first < 0) {
    throw new RangeError('a < 0')
  }
  return Internal.draw(
    count,
    () => (first === 0 ? 0 : Math.pow(-Math.log(1 - Internal.source(generator)), 1 / first))
  )
}
