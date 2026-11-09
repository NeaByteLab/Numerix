import type * as Types from '@app/types.ts'
import * as Poly from '@app/poly/index.ts'
import classify from '@app/internal/classify.ts'
import shape from '@app/internal/shape.ts'

/**
 * Combine two coefficient arrays.
 * @description Aligns the coefficients, then applies the operation.
 * @param first - Coefficients of the first polynomial
 * @param second - Coefficients of the second polynomial
 * @param polarity - One to add the coefficients, minus one to subtract them
 * @returns Coefficients of the combined polynomial
 */
export default function combine(
  first: number[] | number | Types.NumerixComplex[] | Types.NumerixComplex,
  second: number[] | number | Types.NumerixComplex[] | Types.NumerixComplex,
  polarity: 1 | -1
): number[] | Types.NumerixComplex[] {
  const leading = Array.isArray(first) ? first : [first]
  const trailing = Array.isArray(second) ? second : [second]
  if (leading.length === 0 || trailing.length === 0) {
    throw new RangeError('Coefficient array is empty')
  }
  if (Array.isArray(leading[0]) || Array.isArray(trailing[0])) {
    throw new RangeError('Coefficient array is not 1-d')
  }
  const length = Math.max(leading.length, trailing.length)
  if (classify(leading, true, true) !== true && classify(trailing, true, true) !== true) {
    let limit = length - 1
    const result = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      result[index] = Number(leading[index] ?? 0) + polarity * Number(trailing[index] ?? 0)
    }
    while (limit > 0 && result[limit] === 0) {
      limit--
    }
    if (limit + 1 < length) {
      result.length = limit + 1
    }
    return result
  }
  return Poly.domain(
    Array.from(
      { length },
      (_outer, index) => {
        const prior = leading[index]
        const later = trailing[index]
        return {
          re: (shape(prior) ? prior.re : Number(prior ?? 0)) +
            polarity * (shape(later) ? later.re : Number(later ?? 0)),
          im: (shape(prior) ? prior.im : 0) + polarity * (shape(later) ? later.im : 0)
        }
      }
    ),
    'trim'
  ) as Types.NumerixComplex[]
}
