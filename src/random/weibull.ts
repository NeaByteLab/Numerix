import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Weibull distribution.
 * @description Produces positive variates with the given shape.
 * @param left - Shape parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function weibull(
  left: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const inverse = 1 / left
  if (size === undefined) {
    return sampleWeibull(inverse, generator)
  }
  return Internal.draw(size, () => sampleWeibull(inverse, generator))
}

/**
 * Draw one Weibull variate.
 * @description Produces a single positive sample with the given shape.
 * @param inverse - Reciprocal of the shape parameter
 * @param generator - Generator supplying uniform samples
 * @returns Single Weibull variate
 */
function sampleWeibull(
  inverse: number,
  generator?: Types.NumerixGenerator
): number {
  return Math.pow(-Math.log(1 - Internal.source(generator)), inverse)
}
