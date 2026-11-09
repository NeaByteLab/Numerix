import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Compute the outer product of vectors.
 * @description Multiplies every entry of one vector by the other.
 * @param alpha - First vector of the product
 * @param right - Second vector of the product
 * @returns Outer product matrix of the two inputs
 */
export default function outer(
  alpha: number | number[] | number[][],
  right: number | number[] | number[][]
): number[][]
/**
 * Compute a complex outer product.
 * @description Multiplies every entry of one vector by the other.
 * @param alpha - First vector of the product
 * @param right - Second vector of the product
 * @returns Outer product matrix of the two inputs
 */
export default function outer(
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
): number[][] | Types.NumerixComplex[][]
/**
 * Compute the outer product of vectors.
 * @description Multiplies every entry of one vector by the other.
 * @param alpha - First vector of the product
 * @param right - Second vector of the product
 * @returns Outer product matrix of the two inputs
 */
export default function outer(
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
): number[][] | Types.NumerixComplex[][] {
  const source = !Array.isArray(alpha)
    ? [alpha]
    : Array.isArray(alpha[0])
    ? Shape.flatten(alpha)
    : (alpha as unknown[])
  const target = !Array.isArray(right)
    ? [right]
    : Array.isArray(right[0])
    ? Shape.flatten(right)
    : (right as unknown[])
  if (
    Internal.classify(source, true, true) !== true &&
    Internal.classify(target, true, true) !== true
  ) {
    return Array.from({ length: source.length }, (_outer, index) => {
      const value = Number(source[index] ?? 0)
      return Array.from(
        { length: target.length },
        (_inner, column) => value * Number(target[column] ?? 0)
      )
    })
  }
  return Array.from({ length: source.length }, (_outer, index) => {
    const first = source[index]
    const point = Internal.shape(first) ? first.re : Number(first ?? 0)
    const phase = Internal.shape(first) ? first.im : 0
    return Array.from({ length: target.length }, (_inner, column) => {
      const other = target[column]
      const prior = Internal.shape(other) ? other.re : Number(other ?? 0)
      const extra = Internal.shape(other) ? other.im : 0
      const reals = point * prior - phase * extra
      const imags = point * extra + phase * prior
      return { re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags }
    })
  }) as Types.NumerixComplex[][]
}
