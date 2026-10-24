import type * as Types from '@app/types.ts'
import convert from '@app/poly/convert.ts'
import mul from '@app/poly/mul.ts'

/**
 * Raise a polynomial to a power.
 * @description Uses repeated squaring for the polynomial power.
 * @param coefficients - Coefficients of the source polynomial
 * @param exponent - Integer exponent applied to the polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Coefficients of the powered polynomial
 */
export default function pow(
  coefficients: number[],
  exponent: number,
  basis: Types.NumerixBasis = 'poly'
): number[] {
  let remaining = Math.trunc(exponent)
  if (remaining <= 0) {
    return [1]
  }
  let factor = basis === 'poly' ? coefficients.slice() : convert(coefficients, basis, 'poly')
  if (remaining === 1) {
    return basis === 'poly' ? factor : convert(factor, 'poly', basis)
  }
  let product: number[] = [1]
  while (remaining > 0) {
    if ((remaining & 1) === 1) {
      product = mul(product, factor, 'poly')
    }
    remaining >>= 1
    if (remaining > 0) {
      factor = mul(factor, factor, 'poly')
    }
  }
  return basis === 'poly' ? product : convert(product, 'poly', basis)
}
