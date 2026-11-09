import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'

/**
 * Compute quadrature weights for sample points.
 * @description Evaluates the weight function at each point.
 * @param samples - Point or points where weights are computed
 * @param family - Quadrature weight family
 * @returns Weights matching the input shape
 */
export default function weight(
  samples: number,
  family?: Types.NumerixGauss | Types.NumerixBasis
): number
/**
 * Compute one-dimensional weights.
 * @description Evaluates the weight function at each point.
 * @param samples - One-dimensional array of sample points
 * @param family - Quadrature weight family
 * @returns One-dimensional array of weights
 */
export default function weight(
  samples: number[],
  family?: Types.NumerixGauss | Types.NumerixBasis
): number[]
/**
 * Compute two-dimensional weights.
 * @description Evaluates the weight function at each point.
 * @param samples - Two-dimensional array of sample points
 * @param family - Quadrature weight family
 * @returns Two-dimensional array of weights
 */
export default function weight(
  samples: number[][],
  family?: Types.NumerixGauss | Types.NumerixBasis
): number[][]
/**
 * Compute complex quadrature weights.
 * @description Evaluates the weight function at each complex point.
 * @param samples - Complex point or array of points
 * @param family - Quadrature weight family
 * @returns Complex weights matching the input shape
 */
export default function weight(
  samples:
    | Types.NumerixComplex
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  family?: Types.NumerixGauss | Types.NumerixBasis
): Types.NumerixComplex | Types.NumerixComplex[] | Types.NumerixComplex[][]
/**
 * Compute quadrature weights for sample points.
 * @description Evaluates the weight function at each point.
 * @param samples - Point or points where weights are computed
 * @param family - Quadrature weight family
 * @returns Weights matching the input shape
 */
export default function weight(
  samples:
    | number
    | Types.NumerixComplex
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  family: Types.NumerixGauss | Types.NumerixBasis = 'chebyshev'
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (
    family !== 'legendre' &&
    family !== 'leg' &&
    family !== 'poly' &&
    family !== 'hermite' &&
    family !== 'herm' &&
    family !== 'hermite_e' &&
    family !== 'herme' &&
    family !== 'laguerre' &&
    family !== 'lag' &&
    family !== 'chebyshev' &&
    family !== 'cheb'
  ) {
    throw new RangeError('unsupported quadrature weight kind')
  }
  const complex = Internal.classify(samples, true, true) === true
  const factor = family === 'hermite' || family === 'herm' ? -1 : -0.5
  return Internal.traverse(samples, (entry) => {
    const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const imags = Internal.shape(entry) ? entry.im : 0
    if (family === 'legendre' || family === 'leg' || family === 'poly') {
      return complex ? { re: 1, im: 0 } : 1
    }
    if (family === 'laguerre' || family === 'lag') {
      if (!complex) {
        return Math.exp(-reals)
      }
      const scale = Math.exp(-reals)
      return { re: scale * Math.cos(-imags), im: scale * Math.sin(-imags) }
    }
    if (family === 'hermite' || family === 'herm' || family === 'hermite_e' || family === 'herme') {
      if (!complex) {
        return Math.exp(factor * reals * reals)
      }
      const scale = Math.exp(factor * (reals * reals - imags * imags))
      const angle = 2 * factor * reals * imags
      return { re: scale * Math.cos(angle), im: scale * Math.sin(angle) }
    }
    if (!complex) {
      const factor = 1 - reals * reals
      return factor === 0 ? Infinity : factor < 0 ? NaN : 1 / Math.sqrt(factor)
    }
    return Maths.reciprocal(
      Maths.mul(
        Maths.sqrt({ re: 1 + reals, im: imags }) as Types.NumerixComplex,
        Maths.sqrt({ re: 1 - reals, im: -imags }) as Types.NumerixComplex
      )
    ) as Types.NumerixComplex
  }, complex) as
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
}
