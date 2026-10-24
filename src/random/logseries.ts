import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw logarithmic series samples.
 * @description Produces counts drawn from a logarithmic distribution.
 * @param probability - Success probability of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function logseries(
  probability: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const logarithm = Math.log(1 - probability)
  if (size === undefined) {
    return sampleSeries(probability, logarithm, generator)
  }
  return Internal.draw(size, () => sampleSeries(probability, logarithm, generator))
}

/**
 * Draw one logarithmic series variate.
 * @description Produces a single count from the distribution.
 * @param probability - Success probability of the distribution
 * @param logarithm - Cached logarithm of the failure probability
 * @param generator - Generator supplying uniform samples
 * @returns Single logarithmic series variate
 */
function sampleSeries(
  probability: number,
  logarithm: number,
  generator?: Types.NumerixGenerator
): number {
  const value = Internal.source(generator)
  if (value >= probability) {
    return 1
  }
  const uniform = Internal.source(generator)
  const quotient = 1 - Math.exp(logarithm * uniform)
  if (value <= quotient * quotient) {
    return Math.floor(1 + Math.log(value) / Math.log(quotient))
  }
  return value <= quotient ? 2 : 1
}
