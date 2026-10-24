import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a power distribution.
 * @description Produces variates from a power law distribution.
 * @param left - Exponent parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function power(
  left: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const inverse = 1 / left
  if (size === undefined) {
    return samplePower(inverse, generator)
  }
  return Internal.draw(size, () => samplePower(inverse, generator))
}

/**
 * Draw one power variate.
 * @description Produces a single sample from a power law.
 * @param inverse - Reciprocal of the exponent parameter
 * @param generator - Generator supplying uniform samples
 * @returns Single power variate
 */
function samplePower(
  inverse: number,
  generator?: Types.NumerixGenerator
): number {
  return Math.pow(Internal.source(generator), inverse)
}
