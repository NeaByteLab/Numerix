import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Rayleigh distribution.
 * @description Produces magnitudes of two-dimensional normal vectors.
 * @param scale - Scale parameter of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function rayleigh(
  scale: number = 1,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (scale < 0) {
    throw new RangeError('scale < 0')
  }
  return Internal.draw(
    count,
    () => scale * Math.sqrt(-2 * Math.log(1 - Internal.source(generator)))
  )
}
