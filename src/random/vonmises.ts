import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw von Mises samples.
 * @description Produces circular variates around the given mean angle.
 * @param center - Mean direction of the distribution
 * @param kappa - Concentration parameter of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function vonmises(
  center: number,
  kappa: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (kappa < 0) {
    throw new RangeError('kappa < 0')
  }
  const cycle = 2 * Math.PI
  const radical = 1 + Math.sqrt(1 + 4 * kappa * kappa)
  const factor = kappa < 1e-6 ? 0 : (radical - Math.sqrt(2 * radical)) / (2 * kappa)
  const radius = kappa < 1e-6 ? 0 : (1 + factor * factor) / (2 * factor)
  return Internal.draw(count, () => {
    if (Number.isNaN(center) || Number.isNaN(kappa) || !Number.isFinite(center)) {
      return NaN
    }
    if (kappa < 1e-6) {
      return Math.PI * (2 * Internal.source(generator) - 1)
    }
    if (kappa > 1e6) {
      const wrapped = (
        center + (kappa === Infinity ? 0 : Internal.deviate(generator) / Math.sqrt(kappa)) + Math.PI
      ) % cycle
      return (wrapped < 0 ? wrapped + cycle : wrapped) - Math.PI
    }
    while (true) {
      const cosine = Math.cos(Math.PI * Internal.source(generator))
      const proposal = (1 + radius * cosine) / (radius + cosine)
      const weight = kappa * (radius - proposal)
      const chance = Internal.source(generator)
      if (
        chance < weight * (2 - weight) ||
        chance <= weight * Math.exp(1 - weight)
      ) {
        const angle = Math.acos(proposal)
        const wrapped = (
          center +
          (Internal.source(generator) > 0.5 ? angle : -angle) +
          Math.PI
        ) % cycle
        return (wrapped < 0 ? wrapped + cycle : wrapped) - Math.PI
      }
    }
  })
}
