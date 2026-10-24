import type * as Types from '@app/types.ts'
import convert from '@app/poly/convert.ts'

/**
 * Differentiate a polynomial.
 * @description Applies differentiation repeatedly to reach the order.
 * @param coefficients - Coefficients of the source polynomial
 * @param order - Number of derivatives to apply
 * @param scale - Scaling factor applied to each derivative
 * @param basis - Polynomial basis of the coefficients
 * @returns Coefficients of the differentiated polynomial
 */
export default function der(
  coefficients: number[],
  order = 1,
  scale = 1,
  basis: Types.NumerixBasis = 'poly'
): number[] {
  let derivative = basis === 'poly' ? coefficients.slice() : convert(coefficients, basis, 'poly')
  for (let step = 0; step < order; step++) {
    const length = derivative.length
    if (length <= 1) {
      return [0]
    }
    const result = new Array<number>(length - 1)
    for (let power = 1; power < length; power++) {
      result[power - 1] = (derivative[power] ?? 0) * power * scale
    }
    derivative = result
  }
  return basis === 'poly' ? derivative : convert(derivative, 'poly', basis)
}
