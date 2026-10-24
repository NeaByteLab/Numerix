import type * as Types from '@app/types.ts'
import convert from '@app/poly/convert.ts'

/**
 * Divide one polynomial by another.
 * @description Performs polynomial long division.
 * @param dividend - Coefficients of the dividend polynomial
 * @param divisor - Coefficients of the divisor polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Quotient and remainder coefficients
 */
export default function div(
  dividend: number[],
  divisor: number[],
  basis: Types.NumerixBasis = 'poly'
): [number[], number[]] {
  const remainder = basis === 'poly' ? dividend.slice() : convert(dividend, basis, 'poly')
  const target = basis === 'poly' ? divisor : convert(divisor, basis, 'poly')
  const degree = remainder.length - 1
  const order = target.length - 1
  if (degree < order) {
    return [[0], basis === 'poly' ? remainder : convert(remainder, 'poly', basis)]
  }
  const quotient: number[] = new Array(degree - order + 1).fill(0)
  const leading = target[order] ?? 1
  for (let power = degree - order; power >= 0; power--) {
    const term = (remainder[order + power] ?? 0) / leading
    quotient[power] = term
    for (let factor = 0; factor <= order; factor++) {
      remainder[factor + power] = (remainder[factor + power] ?? 0) -
        term * (target[factor] ?? 0)
    }
  }
  const rest = remainder.slice(0, Math.max(1, order))
  if (basis === 'poly') {
    return [quotient, rest]
  }
  return [convert(quotient, 'poly', basis), convert(rest, 'poly', basis)]
}
