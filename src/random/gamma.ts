import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a gamma distribution.
 * @description Produces variates with the given shape and scale.
 * @param shape - Shape parameter of the distribution
 * @param scale - Scale parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function gamma(
  shape: number,
  scale: number = 1,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleGamma(shape, scale, generator)
  }
  return Internal.draw(size, () => sampleGamma(shape, scale, generator))
}

/**
 * Draw one gamma variate.
 * @description Produces a single sample from the gamma distribution.
 * @param shape - Shape parameter of the distribution
 * @param scale - Scale parameter of the distribution
 * @param generator - Generator supplying uniform samples
 * @returns Single gamma variate
 */
function sampleGamma(shape: number, scale: number, generator?: Types.NumerixGenerator): number {
  if (shape < 1) {
    return sampleGamma(shape + 1, 1, generator) * Math.pow(Internal.source(generator), 1 / shape) *
      scale
  }
  const spacing = shape - 1 / 3
  const coefficients = 1 / Math.sqrt(9 * spacing)
  while (true) {
    const normal = Internal.deviate(generator)
    const values = 1 + coefficients * normal
    if (values <= 0) {
      continue
    }
    const cubic = values * values * values
    const acceptance = Internal.source(generator)
    const squared = normal * normal
    if (acceptance < 1 - 0.0331 * squared * squared) {
      return spacing * cubic * scale
    }
    if (Math.log(acceptance) < 0.5 * squared + spacing * (1 - cubic + Math.log(cubic))) {
      return spacing * cubic * scale
    }
  }
}
