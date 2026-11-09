import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a geometric distribution.
 * @description Produces counts of trials before the first success.
 * @param probability - Success probability for each trial
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function geometric(
  probability: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (!(probability > 0) || probability > 1) {
    throw new RangeError('geometric probability must be in (0, 1]')
  }
  return Internal.draw(
    count,
    () => Math.floor(Math.log(1 - Internal.source(generator)) / Math.log(1 - probability)) + 1
  )
}
