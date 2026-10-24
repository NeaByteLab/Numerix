import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/** Full turn angle in radians */
const turn = 2 * Math.PI

/**
 * Draw von Mises samples.
 * @description Produces circular variates around the given mean angle.
 * @param mean - Mean direction of the distribution
 * @param kappa - Concentration parameter of the distribution
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function vonmises(
  mean: number,
  kappa: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const tau = 1 + Math.sqrt(1 + 4 * kappa * kappa)
  const rho = kappa < 1e-6 ? 0 : (tau - Math.sqrt(2 * tau)) / (2 * kappa)
  const radius = kappa < 1e-6 ? 0 : (1 + rho * rho) / (2 * rho)
  if (size === undefined) {
    return sampleMises(mean, kappa, radius, generator)
  }
  return Internal.draw(size, () => sampleMises(mean, kappa, radius, generator))
}

/**
 * Draw one von Mises variate.
 * @description Produces a single sample from the von Mises law.
 * @param mean - Mean direction of the distribution
 * @param kappa - Concentration parameter of the distribution
 * @param radius - Cached radius of the rejection sampler
 * @param generator - Generator supplying uniform samples
 * @returns Single von Mises variate
 */
function sampleMises(
  mean: number,
  kappa: number,
  radius: number,
  generator?: Types.NumerixGenerator
): number {
  if (kappa < 1e-6) {
    return Math.PI * (2 * Internal.source(generator) - 1)
  }
  while (true) {
    const angle = Internal.source(generator)
    const cosine = Math.cos(Math.PI * angle)
    const proposal = (1 + radius * cosine) / (radius + cosine)
    const coefficients = kappa * (radius - proposal)
    const acceptance = Internal.source(generator)
    if (
      acceptance < coefficients * (2 - coefficients) ||
      acceptance <= coefficients * Math.exp(1 - coefficients)
    ) {
      const sign = Internal.source(generator)
      const theta = sign > 0.5 ? Math.acos(proposal) : -Math.acos(proposal)
      return ((mean + theta + Math.PI) % turn) - Math.PI
    }
  }
}
