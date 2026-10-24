import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a triangular distribution.
 * @description Produces variates between the bounds and the mode.
 * @param left - Lower bound of the distribution
 * @param mode - Most likely value of the distribution
 * @param right - Upper bound of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function triangular(
  left: number,
  mode: number,
  right: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const cutoff = (mode - left) / (right - left)
  if (size === undefined) {
    return sampleTriangular(left, mode, right, cutoff, generator)
  }
  return Internal.draw(size, () => sampleTriangular(left, mode, right, cutoff, generator))
}

/**
 * Draw one triangular variate.
 * @description Produces a single sample from the triangular distribution.
 * @param left - Lower bound of the distribution
 * @param mode - Most likely value of the distribution
 * @param right - Upper bound of the distribution
 * @param cutoff - Cached split point of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single triangular variate
 */
function sampleTriangular(
  left: number,
  mode: number,
  right: number,
  cutoff: number,
  generator?: Types.NumerixGenerator
): number {
  const uniform = Internal.source(generator)
  if (uniform < cutoff) {
    return left + Math.sqrt(uniform * (right - left) * (mode - left))
  }
  return right - Math.sqrt((1 - uniform) * (right - left) * (right - mode))
}
