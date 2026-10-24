import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Laplace distribution.
 * @description Produces symmetric variates around the given center.
 * @param center - Location parameter of the distribution
 * @param scale - Scale parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function laplace(
  center: number = 0,
  scale: number = 1,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleLaplace(center, scale, generator)
  }
  return Internal.draw(size, () => sampleLaplace(center, scale, generator))
}

/**
 * Draw one Laplace variate.
 * @description Produces a single sample from the Laplace distribution.
 * @param center - Location parameter of the distribution
 * @param scale - Scale parameter of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single Laplace variate
 */
function sampleLaplace(center: number, scale: number, generator?: Types.NumerixGenerator): number {
  const uniform = Internal.source(generator) - 0.5
  return center - scale * Math.sign(uniform) * Math.log(1 - 2 * Math.abs(uniform))
}
