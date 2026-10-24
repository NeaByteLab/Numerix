import type * as Types from '@app/types.ts'
import convert from '@app/poly/convert.ts'

/**
 * Multiply two polynomials.
 * @description Convolves the coefficient arrays together.
 * @param left - Coefficients of the first polynomial
 * @param right - Coefficients of the second polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Coefficients of the multiplied polynomial
 */
export default function mul(
  left: number[],
  right?: number[] | number,
  basis: Types.NumerixBasis = 'poly'
): number[] {
  const source = basis === 'poly' ? left : convert(left, basis, 'poly')
  const count = source.length
  if (right === undefined) {
    const shifted = new Array<number>(count + 1)
    shifted[0] = 0
    for (let index = 0; index < count; index++) {
      shifted[index + 1] = source[index] ?? 0
    }
    return basis === 'poly' ? shifted : convert(shifted, 'poly', basis)
  }
  const operand = typeof right === 'number' ? [right] : right
  const target = basis === 'poly' ? operand : convert(operand, basis, 'poly')
  const width = target.length
  const length = count + width - 1
  const product = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    product[index] = 0
  }
  for (let index = 0; index < count; index++) {
    const coefficient = source[index] ?? 0
    if (coefficient === 0) {
      continue
    }
    for (let offset = 0; offset < width; offset++) {
      const power = index + offset
      product[power] = (product[power] ?? 0) + coefficient * (target[offset] ?? 0)
    }
  }
  return basis === 'poly' ? product : convert(product, 'poly', basis)
}
