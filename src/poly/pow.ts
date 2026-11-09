import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'
import convert from '@app/poly/convert.ts'
import domain from '@app/poly/domain.ts'

/**
 * Raise a polynomial to a power.
 * @description Uses repeated squaring for the polynomial power.
 * @param coefficients - Coefficients of the source polynomial
 * @param exponent - Integer exponent applied to the polynomial
 * @param basis - Polynomial basis or maximum allowed exponent
 * @param limit - Maximum allowed exponent
 * @returns Coefficients of the powered polynomial
 */
export default function pow(
  coefficients: number[] | Types.NumerixComplex[],
  exponent: number,
  basis?: Types.NumerixBasis | number,
  limit?: number | Types.NumerixBasis
): number[] | Types.NumerixComplex[] {
  const named: Types.NumerixBasis = typeof basis === 'string'
    ? basis
    : typeof limit === 'string'
    ? limit
    : 'poly'
  if (
    named !== 'poly' &&
    named !== 'cheb' &&
    named !== 'leg' &&
    named !== 'herm' &&
    named !== 'herme' &&
    named !== 'lag'
  ) {
    throw new RangeError("basis must be one of 'poly', 'cheb', 'leg', 'herm', 'herme', or 'lag'")
  }
  if (coefficients.length === 0) {
    throw new RangeError('Coefficient array is empty')
  }
  if (Array.isArray(coefficients[0])) {
    throw new RangeError('Coefficient array is not 1-d')
  }
  if (!Number.isInteger(exponent) || exponent < 0) {
    throw new RangeError('polynomial power must be a non-negative integer')
  }
  if (exponent > (typeof basis === 'number' ? basis : typeof limit === 'number' ? limit : 16)) {
    throw new RangeError('Power is too large')
  }
  let remaining = exponent
  let factor = (
    named === 'poly' || exponent <= 1
      ? domain(coefficients as number[], 'trim')
      : convert(coefficients as number[], named, 'poly')
  ) as number[] | Types.NumerixComplex[]
  let product: number[] | Types.NumerixComplex[] =
    Internal.classify(coefficients, true, true) === true ? [{ re: 1, im: 0 }] : [1]
  while (remaining > 1) {
    if ((remaining & 1) === 1) {
      product = Maths.convolve(product, factor) as number[] | Types.NumerixComplex[]
    }
    remaining >>= 1
    factor = Maths.convolve(factor, factor) as number[] | Types.NumerixComplex[]
  }
  if (remaining === 1) {
    product = exponent === 1
      ? factor
      : (domain(Maths.convolve(product, factor) as number[], 'trim') as
        | number[]
        | Types.NumerixComplex[])
  }
  return named === 'poly' || exponent <= 1 ? product : convert(product as number[], 'poly', named)
}
