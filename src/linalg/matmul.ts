import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Multiply two matrices or vectors.
 * @description Contracts the inner dimension of both operands.
 * @param alpha - First matrix or vector of the product
 * @param right - Second matrix or vector of the product
 * @returns Matrix or vector product of the two inputs
 */
export default function matmul(alpha: number[][], right: number[][]): number[][]
/**
 * Multiply two complex matrices.
 * @description Contracts the inner dimension of both two-dimensional matrix operands.
 * @param alpha - First matrix of the product
 * @param right - Second matrix of the product
 * @returns Complex matrix product of the two inputs
 */
export default function matmul(
  alpha: number[][] | Types.NumerixComplex[][],
  right: number[][] | Types.NumerixComplex[][]
): Types.NumerixComplex[][]
/**
 * Multiply two matrices or vectors.
 * @description Contracts the inner dimension of both operands.
 * @param alpha - First matrix or vector of the product
 * @param right - Second matrix or vector of the product
 * @returns Matrix, vector, or scalar product of the two inputs
 */
export default function matmul(
  alpha: number[] | number[][],
  right: number[] | number[][]
): number | number[] | number[][]
/**
 * Multiply complex matrices or vectors.
 * @description Contracts the inner dimension of both operands.
 * @param alpha - First matrix or vector of the product
 * @param right - Second matrix or vector of the product
 * @returns Matrix, vector, or scalar product of the two inputs
 */
export default function matmul(
  alpha:
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
  | Types.NumerixComplex[][]
/**
 * Multiply two matrices or vectors.
 * @description Contracts the inner dimension of both operands.
 * @param alpha - First matrix or vector of the product
 * @param right - Second matrix or vector of the product
 * @returns Matrix, vector, or scalar product of the two inputs
 */
export default function matmul(
  alpha:
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
  const complex = Internal.classify(alpha, true, true) === true ||
    Internal.classify(right, true, true) === true
  if (!Array.isArray(alpha[0]) && !Array.isArray(right[0])) {
    if (alpha.length !== right.length) {
      throw new RangeError('matmul inner dimensions must match')
    }
    if (!complex) {
      let scalar = 0
      for (let cursor = 0; cursor < alpha.length; cursor++) {
        scalar += ((alpha as number[])[cursor] ?? 0) * ((right as number[])[cursor] ?? 0)
      }
      return scalar
    }
    let scalar = 0
    let vector = 0
    for (let cursor = 0; cursor < alpha.length; cursor++) {
      const first = alpha[cursor]
      const other = right[cursor]
      const reals = Internal.shape(first) ? first.re : Number(first ?? 0)
      const imags = Internal.shape(first) ? first.im : 0
      const prior = Internal.shape(other) ? other.re : Number(other ?? 0)
      const extra = Internal.shape(other) ? other.im : 0
      scalar += reals * prior - imags * extra
      vector += reals * extra + imags * prior
    }
    return { re: scalar, im: vector }
  }
  if (Array.isArray(alpha[0]) && !Array.isArray(right[0])) {
    if (!complex) {
      const vector = right as number[]
      return (alpha as number[][]).map((slice = []) => {
        if (slice.length !== vector.length) {
          throw new RangeError('matmul inner dimensions must match')
        }
        let scalar = 0
        for (let cursor = 0; cursor < slice.length; cursor++) {
          scalar += (slice[cursor] ?? 0) * (vector[cursor] ?? 0)
        }
        return scalar
      })
    }
    const vector = right as (number | Types.NumerixComplex)[]
    return (alpha as (number | Types.NumerixComplex)[][]).map((slice = []) => {
      if (slice.length !== vector.length) {
        throw new RangeError('matmul inner dimensions must match')
      }
      let scalar = 0
      let imags = 0
      for (let cursor = 0; cursor < slice.length; cursor++) {
        const first = slice[cursor]
        const other = vector[cursor]
        const point = Internal.shape(first) ? first.re : Number(first ?? 0)
        const phase = Internal.shape(first) ? first.im : 0
        const prior = Internal.shape(other) ? other.re : Number(other ?? 0)
        const extra = Internal.shape(other) ? other.im : 0
        scalar += point * prior - phase * extra
        imags += point * extra + phase * prior
      }
      return { re: scalar === 0 ? 0 : scalar, im: imags === 0 ? 0 : imags }
    }) as Types.NumerixComplex[]
  }
  const depth = Array.isArray(alpha[0]) ? (alpha[0]?.length ?? 0) : alpha.length
  if (depth !== right.length) {
    throw new RangeError('matmul inner dimensions must match')
  }
  const matrix = right as (number | Types.NumerixComplex)[][]
  const width = matrix[0]?.length ?? 0
  if (!Array.isArray(alpha[0])) {
    if (!complex) {
      return Array.from({ length: width }, (_outer, column) => {
        let scalar = 0
        for (let cursor = 0; cursor < depth; cursor++) {
          scalar += ((alpha as number[])[cursor] ?? 0) *
            ((right as number[][])[cursor]?.[column] ?? 0)
        }
        return scalar
      })
    }
    return Array.from({ length: width }, (_outer, column) => {
      let scalar = 0
      let imags = 0
      for (let cursor = 0; cursor < depth; cursor++) {
        const first = (alpha as (number | Types.NumerixComplex)[])[cursor]
        const other = matrix[cursor]?.[column]
        const point = Internal.shape(first) ? first.re : Number(first ?? 0)
        const phase = Internal.shape(first) ? first.im : 0
        const prior = Internal.shape(other) ? other.re : Number(other ?? 0)
        const extra = Internal.shape(other) ? other.im : 0
        scalar += point * prior - phase * extra
        imags += point * extra + phase * prior
      }
      return { re: scalar === 0 ? 0 : scalar, im: imags === 0 ? 0 : imags }
    }) as Types.NumerixComplex[]
  }
  if (!complex) {
    return (alpha as number[][]).map((slice = []) => {
      if (slice.length !== depth) {
        throw new RangeError('matmul inner dimensions must match')
      }
      return Array.from({ length: width }, (_outer, column) => {
        let scalar = 0
        for (let cursor = 0; cursor < depth; cursor++) {
          scalar += (slice[cursor] ?? 0) * ((right as number[][])[cursor]?.[column] ?? 0)
        }
        return scalar
      })
    })
  }
  return (alpha as (number | Types.NumerixComplex)[][]).map((slice = []) => {
    if (slice.length !== depth) {
      throw new RangeError('matmul inner dimensions must match')
    }
    return Array.from({ length: width }, (_outer, column) => {
      let scalar = 0
      let imags = 0
      for (let cursor = 0; cursor < depth; cursor++) {
        const first = slice[cursor]
        const other = matrix[cursor]?.[column]
        const point = Internal.shape(first) ? first.re : Number(first ?? 0)
        const phase = Internal.shape(first) ? first.im : 0
        const prior = Internal.shape(other) ? other.re : Number(other ?? 0)
        const extra = Internal.shape(other) ? other.im : 0
        scalar += point * prior - phase * extra
        imags += point * extra + phase * prior
      }
      return { re: scalar === 0 ? 0 : scalar, im: imags === 0 ? 0 : imags }
    })
  }) as Types.NumerixComplex[][]
}
