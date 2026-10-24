import type * as Types from '@app/types.ts'

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
  basis: Types.NumerixBasis = 'poly'
): number[] {
  if (scale === 0) {
    return [offset]
  }
  if (basis === 'herm') {
    return [offset, scale / 2]
  }
  if (basis === 'lag') {
    return [offset + scale, -scale]
  }
  return [offset, scale]
}
