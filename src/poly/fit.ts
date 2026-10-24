import type * as Types from '@app/types.ts'
import * as Linalg from '@app/linalg/index.ts'
import vander from '@app/poly/vander.ts'

/**
 * Fit a polynomial to sample data.
 * @description Solves a least squares system for the coefficients.
 * @param samples - Sample points where the function is evaluated
 * @param targets - Observed values at the sample points
 * @param degree - Degree of the fitted polynomial
 * @param basis - Polynomial basis of the fitted coefficients
 * @returns Coefficients of the fitted polynomial
 */
export default function fit(
  samples: number[],
  targets: number[],
  degree: number,
  basis: Types.NumerixBasis = 'poly'
): number[] {
  const design = vander(samples, degree, basis)
  const coefficients = Linalg.solve(design, targets, true)
  return coefficients
}
