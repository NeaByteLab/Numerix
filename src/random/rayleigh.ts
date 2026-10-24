import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Rayleigh distribution.
 * @description Produces magnitudes of two dimensional normal vectors.
 * @param scale - Scale parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function rayleigh(
  scale: number = 1,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleRayleigh(scale, generator)
  }
  return Internal.draw(size, () => sampleRayleigh(scale, generator))
}

/**
 * Draw one Rayleigh variate.
 * @description Produces one magnitude of a normal vector.
 * @param scale - Scale parameter of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single Rayleigh variate
 */
function sampleRayleigh(
  scale: number,
  generator?: Types.NumerixGenerator
): number {
  return scale * Math.sqrt(-2 * Math.log(1 - Internal.source(generator)))
}
