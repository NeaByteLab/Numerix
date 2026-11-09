import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a triangular distribution.
 * @description Produces variates between the bounds and the mode.
 * @param first - Lower bound of the distribution
 * @param method - Most likely value of the distribution
 * @param right - Upper bound of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function triangular(
  first: number,
  method: number,
  right: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (first > method || method > right || first === right) {
    throw new RangeError('invalid triangular distribution bounds')
  }
  const width = right - first
  const lower = method - first
  return Internal.draw(count, () => {
    const uniform = Internal.source(generator)
    return uniform < lower / width
      ? first + Math.sqrt(uniform * width * lower)
      : right - Math.sqrt((1 - uniform) * width * (right - method))
  })
}
