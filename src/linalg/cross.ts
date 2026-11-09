import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the cross product of vectors.
 * @description Combines vectors into a perpendicular direction.
 * @param first - First vector or array of vectors
 * @param right - Second vector or array of vectors
 * @returns Cross products matching the input shape
 */
export default function cross(
  first:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  right:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][]
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  const nested = Array.isArray(first[0])
  const paired = Array.isArray(right[0])
  const source = nested ? (first as unknown[][]) : [first as unknown[]]
  const target = paired ? (right as unknown[][]) : [right as unknown[]]
  if (source.length !== target.length && source.length !== 1 && target.length !== 1) {
    throw new RangeError('operands could not be broadcast together')
  }
  if (
    Internal.classify(first, true, true) !== true &&
    Internal.classify(right, true, true) !== true
  ) {
    const result = Array.from(
      { length: Math.max(source.length, target.length) },
      (_outer, index) => {
        const leading = source[source.length === 1 ? 0 : index] ?? []
        const trailing = target[target.length === 1 ? 0 : index] ?? []
        if (
          (leading.length !== 2 && leading.length !== 3) ||
          (trailing.length !== 2 && trailing.length !== 3)
        ) {
          throw new RangeError(
            'incompatible dimensions for cross product (dimension must be 2 or 3)'
          )
        }
        const alpha = Number(leading[0] ?? 0)
        const gamma = Number(leading[1] ?? 0)
        const fourth = Number(trailing[0] ?? 0)
        const fifth = Number(trailing[1] ?? 0)
        const third = alpha * fifth - gamma * fourth
        if (leading.length === 2 && trailing.length === 2) {
          return third
        }
        const omega = Number(leading[2] ?? 0)
        const sixth = Number(trailing[2] ?? 0)
        return [gamma * sixth - omega * fifth, omega * fourth - alpha * sixth, third]
      }
    )
    return (!nested && !paired ? result[0] : result) as number | number[] | number[][]
  }
  const result = Array.from(
    { length: Math.max(source.length, target.length) },
    (_outer, index) => {
      const leading = source[source.length === 1 ? 0 : index] ?? []
      const trailing = target[target.length === 1 ? 0 : index] ?? []
      if (
        (leading.length !== 2 && leading.length !== 3) ||
        (trailing.length !== 2 && trailing.length !== 3)
      ) {
        throw new RangeError(
          'incompatible dimensions for cross product (dimension must be 2 or 3)'
        )
      }
      const alpha = leading[0]
      const gamma = leading[1]
      const omega = leading[2]
      const fourth = trailing[0]
      const fifth = trailing[1]
      const sixth = trailing[2]
      const first = Internal.shape(alpha) ? alpha.re : Number(alpha ?? 0)
      const phase = Internal.shape(alpha) ? alpha.im : 0
      const second = Internal.shape(gamma) ? gamma.re : Number(gamma ?? 0)
      const shift = Internal.shape(gamma) ? gamma.im : 0
      const third = Internal.shape(omega) ? omega.re : Number(omega ?? 0)
      const angle = Internal.shape(omega) ? omega.im : 0
      const prior = Internal.shape(fourth) ? fourth.re : Number(fourth ?? 0)
      const extra = Internal.shape(fourth) ? fourth.im : 0
      const other = Internal.shape(fifth) ? fifth.re : Number(fifth ?? 0)
      const image = Internal.shape(fifth) ? fifth.im : 0
      const final = Internal.shape(sixth) ? sixth.re : Number(sixth ?? 0)
      const twist = Internal.shape(sixth) ? sixth.im : 0
      const reals = (first * other - phase * image) - (second * prior - shift * extra)
      const imags = (first * image + phase * other) - (second * extra + shift * prior)
      if (leading.length === 2 && trailing.length === 2) {
        return { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
      }
      const lower = (second * final - shift * twist) - (third * other - angle * image)
      const minor = (second * twist + shift * final) - (third * image + angle * other)
      const upper = (third * prior - angle * extra) - (first * final - phase * twist)
      const major = (third * extra + angle * prior) - (first * twist + phase * final)
      return [
        { re: lower === 0 ? 0 : lower, im: minor === 0 ? 0 : minor },
        { re: upper === 0 ? 0 : upper, im: major === 0 ? 0 : major },
        { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
      ]
    }
  )
  return (!nested && !paired ? result[0] : result) as
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
}
