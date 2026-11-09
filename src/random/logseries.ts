import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw logarithmic series samples.
 * @description Produces counts drawn from a logarithmic distribution.
 * @param probability - Success probability of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function logseries(
  probability: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (probability < 0 || probability >= 1 || Number.isNaN(probability)) {
    throw new RangeError('p < 0, p >= 1 or p is NaN')
  }
  return Internal.draw(count, () => {
    const value = Internal.source(generator)
    if (value >= probability) {
      return 1
    }
    const quotient = 1 - Math.exp(Math.log(1 - probability) * Internal.source(generator))
    if (value <= quotient * quotient) {
      return Math.floor(1 + Math.log(value) / Math.log(quotient))
    }
    return value <= quotient ? 2 : 1
  })
}
