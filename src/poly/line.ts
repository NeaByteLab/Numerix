import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Build a linear polynomial.
 * @description Creates coefficients for a straight line.
 * @param offset - Constant term of the line
 * @param scale - Gradient of the line
 * @param basis - Polynomial basis of the coefficients
 * @returns Coefficients describing the line
 */
export default function line(
  offset: number,
  scale: number,
  basis?: Types.NumerixBasis
): number[]
/**
 * Build a complex linear polynomial.
 * @description Creates complex coefficients for a straight line.
 * @param offset - Constant term of the line
 * @param scale - Gradient of the line
 * @param basis - Polynomial basis of the coefficients
 * @returns Complex coefficients describing the line
 */
export default function line(
  offset: number | Types.NumerixComplex,
  scale: number | Types.NumerixComplex,
  basis?: Types.NumerixBasis
): Types.NumerixComplex[]
/**
 * Build a linear polynomial.
 * @description Creates coefficients for a straight line.
 * @param offset - Constant term of the line
 * @param scale - Gradient of the line
 * @param basis - Polynomial basis of the coefficients
 * @returns Coefficients describing the line
 */
export default function line(
  offset: number | Types.NumerixComplex,
  scale: number | Types.NumerixComplex,
  basis: Types.NumerixBasis = 'poly'
): number[] | Types.NumerixComplex[] {
  if (
    basis !== 'poly' &&
    basis !== 'cheb' &&
    basis !== 'leg' &&
    basis !== 'herm' &&
    basis !== 'herme' &&
    basis !== 'lag'
  ) {
    throw new RangeError("basis must be one of 'poly', 'cheb', 'leg', 'herm', 'herme', or 'lag'")
  }
  const factor = basis === 'herm' ? 0.5 : basis === 'lag' ? -1 : 1
  if (!Internal.shape(offset) && !Internal.shape(scale)) {
    const constant = (basis === 'lag' ? offset + scale : offset) || 0
    return scale === 0 ? [constant] : [constant, (scale * factor) || 0]
  }
  const origin = Internal.components(offset as number)
  const slope = Internal.components(scale as number)
  const reals = basis === 'lag' ? origin.re + slope.re : origin.re
  const imags = basis === 'lag' ? origin.im + slope.im : origin.im
  const constant = { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
  if (slope.re === 0 && slope.im === 0) {
    return [constant]
  }
  return [
    constant,
    {
      re: slope.re === 0 ? 0 : slope.re * factor,
      im: slope.im === 0 ? 0 : slope.im * factor
    }
  ]
}
