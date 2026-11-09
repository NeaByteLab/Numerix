import type * as Types from '@app/types.ts'
import * as Complex from '@app/complex/index.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'
import * as Shape from '@app/shape/index.ts'
import matmul from '@app/linalg/matmul.ts'

/**
 * Compute the dot product.
 * @description Multiplies matching entries and sums or scales the results.
 * @param first - First scalar, vector, or array of vectors
 * @param right - Second scalar, vector, or array of vectors
 * @param conjugate - When true, conjugates and flattens the operands
 * @returns Dot products matching the input shape
 */
export default function dot(
  first:
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
    | Types.NumerixComplex[][],
  conjugate = false
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (conjugate) {
    if (!Array.isArray(first) && !Array.isArray(right)) {
      return Maths.mul(Complex.conj(first as number) as number, right as number)
    }
    const primary = Array.isArray(first)
      ? (Array.isArray(first[0])
        ? Shape.flatten<number | Types.NumerixComplex>(first as (number | Types.NumerixComplex)[][])
        : (first as (number | Types.NumerixComplex)[]))
      : [first as number | Types.NumerixComplex]
    const other = Array.isArray(right)
      ? (Array.isArray(right[0])
        ? Shape.flatten<number | Types.NumerixComplex>(right as (number | Types.NumerixComplex)[][])
        : (right as (number | Types.NumerixComplex)[]))
      : [right as number | Types.NumerixComplex]
    if (primary.length !== other.length) {
      throw new RangeError('matmul inner dimensions must match')
    }
    if (
      Internal.classify(first, true, true) !== true &&
      Internal.classify(right, true, true) !== true
    ) {
      let total = 0
      for (let index = 0; index < primary.length; index++) {
        total += Number(primary[index] ?? 0) * Number(other[index] ?? 0)
      }
      return total
    }
    let reals = 0
    let imags = 0
    for (let index = 0; index < primary.length; index++) {
      const alpha = primary[index]
      const omega = other[index]
      const first = Internal.shape(alpha) ? alpha.re : Number(alpha ?? 0)
      const phase = Internal.shape(alpha) ? -alpha.im : 0
      const prior = Internal.shape(omega) ? omega.re : Number(omega ?? 0)
      const extra = Internal.shape(omega) ? omega.im : 0
      reals += first * prior - phase * extra
      imags += first * extra + phase * prior
    }
    return { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
  }
  if (!Array.isArray(first) || !Array.isArray(right)) {
    return Maths.mul(first as number, right as number)
  }
  return matmul(first, right)
}
