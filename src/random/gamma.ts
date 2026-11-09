import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a gamma distribution.
 * @description Produces variates with the given shape and scale.
 * @param shape - Shape parameter of the distribution
 * @param scale - Scale parameter of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function gamma(
  shape: number,
  scale: number = 1,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (shape < 0) {
    throw new RangeError('shape < 0')
  }
  if (scale < 0) {
    throw new RangeError('scale < 0')
  }
  const spacing = (shape < 1 ? shape + 1 : shape) - 1 / 3
  return Internal.draw(count, () => {
    if (Number.isNaN(shape) || Number.isNaN(scale)) {
      return NaN
    }
    if (shape === 0 || scale === 0) {
      return 0
    }
    if (!Number.isFinite(shape) || !Number.isFinite(scale)) {
      return Infinity
    }
    while (true) {
      const normal = Internal.deviate(generator)
      const value = 1 + normal / Math.sqrt(9 * spacing)
      if (value <= 0) {
        continue
      }
      const cubic = value * value * value
      const chance = Internal.source(generator)
      const squared = normal * normal
      if (
        chance < 1 - 0.0331 * squared * squared ||
        Math.log(chance) < 0.5 * squared + spacing * (1 - cubic + Math.log(cubic))
      ) {
        return spacing * scale * cubic *
          (shape < 1 ? Math.pow(Internal.source(generator), 1 / shape) : 1)
      }
    }
  })
}
