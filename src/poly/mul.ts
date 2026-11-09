import type * as Types from '@app/types.ts'
import * as Maths from '@app/math/index.ts'
import convert from '@app/poly/convert.ts'
import domain from '@app/poly/domain.ts'

/**
 * Multiply two polynomials.
 * @description Convolves the coefficient arrays together.
 * @param first - Coefficients of the first polynomial
 * @param right - Coefficients of the second polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Coefficients of the multiplied polynomial
 */
export default function mul(
  first: number[] | number | Types.NumerixComplex[] | Types.NumerixComplex,
  right?:
    | number[]
    | number
    | Types.NumerixComplex[]
    | Types.NumerixComplex
    | Types.NumerixBasis
    | 'x',
  basis: Types.NumerixBasis = 'poly'
): number[] | Types.NumerixComplex[] {
  const source = Array.isArray(first) ? first : [first]
  const second = right === undefined || typeof right === 'string'
    ? [0, 1]
    : Array.isArray(right)
    ? right
    : [right]
  if (source.length === 0 || second.length === 0) {
    throw new RangeError('Coefficient array is empty')
  }
  if (Array.isArray(source[0]) || Array.isArray(second[0])) {
    throw new RangeError('Coefficient array is not 1-d')
  }
  const named: Types.NumerixBasis = typeof right === 'string' && right !== 'x' ? right : basis
  if (named === 'poly') {
    return domain(
      Maths.convolve(
        source as Types.NumerixComplex[],
        second as Types.NumerixComplex[]
      ) as number[],
      'trim'
    ) as number[] | Types.NumerixComplex[]
  }
  return domain(
    convert(
      Maths.convolve(
        convert(source, named, 'poly'),
        (right === undefined || typeof right === 'string'
          ? second
          : convert(second, named, 'poly')) as Types.NumerixComplex[]
      ) as number[],
      'poly',
      named
    ) as number[],
    'trim'
  ) as number[] | Types.NumerixComplex[]
}
