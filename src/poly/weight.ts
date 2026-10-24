import type * as Types from '@app/types.ts'

/**
 * Compute quadrature weights for sample points.
 * @description Evaluates the weight function at each point.
 * @param samples - Point or points where weights are computed
 * @param kind - Quadrature weight family
 * @returns Weights matching the input shape
 */
export default function weight(
  samples: number | number[],
  kind: Types.NumerixGauss = 'chebyshev'
): number | number[] {
  if (typeof samples === 'number') {
    return weightAt(samples, kind)
  }
  const length = samples.length
  const weights = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    weights[index] = weightAt(samples[index] ?? 0, kind)
  }
  return weights
}

/**
 * Evaluate a quadrature weight.
 * @description Computes the weight function value at the given point.
 * @param sample - Point where the weight is evaluated
 * @param kind - Quadrature weight family
 * @returns Weight value at the given point
 */
function weightAt(sample: number, kind: Types.NumerixGauss): number {
  if (kind === 'legendre') {
    return 1
  }
  if (kind === 'hermite') {
    return Math.exp(-sample * sample)
  }
  if (kind === 'hermite_e') {
    return Math.exp(-0.5 * sample * sample)
  }
  if (kind === 'laguerre') {
    return Math.exp(-sample)
  }
  const factor = 1 - sample * sample
  return 1 / Math.sqrt(factor > 1e-15 ? factor : 1e-15)
}
