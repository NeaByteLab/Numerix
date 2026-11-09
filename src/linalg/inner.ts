import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'

/**
 * Compute the inner product.
 * @description Multiplies matching entries and sums or scales the results.
 * @param alpha - First scalar, vector, or array of vectors
 * @param right - Second scalar, vector, or array of vectors
 * @returns Inner products matching the input shape
 */
export default function inner(
  alpha:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  right:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (!Array.isArray(alpha) || !Array.isArray(right)) {
    return Maths.mul(alpha as number, right as number)
  }
  const nested = !Array.isArray(alpha[0])
  const paired = !Array.isArray(right[0])
  const complex = Internal.classify(alpha, true, true) === true ||
    Internal.classify(right, true, true) === true
  if (nested && paired) {
    const slice = alpha as unknown[]
    const entry = right as unknown[]
    if (entry.length !== slice.length) {
      throw new RangeError('inner product operands must have the same length')
    }
    if (!complex) {
      let scalar = 0
      for (let cursor = 0; cursor < slice.length; cursor++) {
        scalar += ((slice as number[])[cursor] ?? 0) * ((entry as number[])[cursor] ?? 0)
      }
      return scalar
    }
    let scalar = 0
    let vector = 0
    for (let cursor = 0; cursor < slice.length; cursor++) {
      const first = slice[cursor]
      const other = entry[cursor]
      const reals = Internal.shape(first) ? first.re : Number(first ?? 0)
      const imags = Internal.shape(first) ? first.im : 0
      const prior = Internal.shape(other) ? other.re : Number(other ?? 0)
      const extra = Internal.shape(other) ? other.im : 0
      scalar += reals * prior - imags * extra
      vector += reals * extra + imags * prior
    }
    return { re: scalar === 0 ? 0 : scalar, im: vector === 0 ? 0 : vector }
  }
  const result = ((nested ? [alpha] : alpha) as unknown[][]).map((slice = []) =>
    ((paired ? [right] : right) as unknown[][]).map((entry = []) => {
      if (entry.length !== slice.length) {
        throw new RangeError('inner product operands must have aligned last dimensions')
      }
      if (!complex) {
        let scalar = 0
        for (let cursor = 0; cursor < slice.length; cursor++) {
          scalar += ((slice as number[])[cursor] ?? 0) * ((entry as number[])[cursor] ?? 0)
        }
        return scalar
      }
      let scalar = 0
      let vector = 0
      for (let cursor = 0; cursor < slice.length; cursor++) {
        const first = slice[cursor]
        const other = entry[cursor]
        const reals = Internal.shape(first) ? first.re : Number(first ?? 0)
        const imags = Internal.shape(first) ? first.im : 0
        const prior = Internal.shape(other) ? other.re : Number(other ?? 0)
        const extra = Internal.shape(other) ? other.im : 0
        scalar += reals * prior - imags * extra
        vector += reals * extra + imags * prior
      }
      return { re: scalar === 0 ? 0 : scalar, im: vector === 0 ? 0 : vector }
    })
  )
  return (
    nested
      ? (result[0] ?? [])
      : paired
      ? result.map((entry) => entry[0] ?? (complex ? { re: 0, im: 0 } : 0))
      : result
  ) as
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
}
