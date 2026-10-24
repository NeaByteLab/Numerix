import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Pareto distribution.
 * @description Produces heavy tailed variates above one.
 * @param left - Shape parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function pareto(
  left: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const exponent = -1 / left
  if (size === undefined) {
    return samplePareto(exponent, generator)
  }
  return Internal.draw(size, () => samplePareto(exponent, generator))
}

/**
 * Draw one Pareto variate.
 * @description Produces a single heavy tailed sample above one.
 * @param exponent - Exponent of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single Pareto variate
 */
function samplePareto(
  exponent: number,
  generator?: Types.NumerixGenerator
): number {
  return Math.pow(1 - Internal.source(generator), exponent) - 1
}
