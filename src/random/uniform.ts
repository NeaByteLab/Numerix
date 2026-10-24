import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a uniform distribution.
 * @description Produces variates spread evenly over the given range.
 * @param low - Lower bound of the distribution
 * @param high - Upper bound of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function uniform(
  low: number = 0,
  high: number = 1,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const span = high - low
  if (size === undefined) {
    return sampleUniform(low, span, generator)
  }
  return Internal.draw(size, () => sampleUniform(low, span, generator))
}

/**
 * Draw one uniform variate.
 * @description Produces a single sample spread over the given range.
 * @param low - Lower bound of the distribution
 * @param span - Width of the distribution range
 * @param generator - Generator supplying uniform samples
 * @returns Single uniform variate
 */
function sampleUniform(
  low: number,
  span: number,
  generator?: Types.NumerixGenerator
): number {
  return low + Internal.source(generator) * span
}
