import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute a Cholesky decomposition.
 * @description Factors a positive-definite matrix into triangular factors.
 * @param matrix - Symmetric or Hermitian positive-definite matrix to factor
 * @param upper - When true, returns the upper-triangular factor
 * @returns Cholesky factor of the input matrix
 */
export default function cholesky(
  matrix: number[][] | Types.NumerixComplex[][],
  upper = false
): number[][] | Types.NumerixComplex[][] {
  const order = matrix.length
  for (let index = 0; index < order; index++) {
    if ((matrix[index]?.length ?? 0) !== order) {
      throw new RangeError('matrix must be square')
    }
  }
  if (Internal.classify(matrix, true, true) !== true) {
    const lower = Array.from({ length: order }, () => new Array<number>(order).fill(0))
    for (let index = 0; index < order; index++) {
      const current = lower[index]!
      for (let column = 0; column <= index; column++) {
        let total = 0
        const previous = lower[column]!
        for (let inner = 0; inner < column; inner++) {
          total += (current[inner] ?? 0) * (previous[inner] ?? 0)
        }
        const first = Number((upper ? matrix[column]?.[index] : matrix[index]?.[column]) ?? 0)
        if (index === column) {
          const diagonal = first - total
          if (!(diagonal > 0)) {
            throw new RangeError('matrix is not positive definite')
          }
          current[column] = Math.sqrt(diagonal)
        } else {
          const pivot = previous[column] ?? 0
          if (!(pivot > 0)) {
            throw new RangeError('matrix is not positive definite')
          }
          current[column] = (first - total) / pivot
        }
      }
    }
    return upper
      ? Array.from(
        { length: order },
        (_outer, outer) =>
          Array.from({ length: order }, (_inner, column) => lower[column]?.[outer] ?? 0)
      )
      : lower
  }
  const lower = Array.from(
    { length: order },
    () => Array.from({ length: order }, () => ({ re: 0, im: 0 }))
  )
  for (let index = 0; index < order; index++) {
    const current = lower[index]!
    for (let column = 0; column <= index; column++) {
      let reals = 0
      let imags = 0
      const previous = lower[column]!
      for (let inner = 0; inner < column; inner++) {
        const alpha = current[inner] ?? { re: 0, im: 0 }
        const right = previous[inner] ?? { re: 0, im: 0 }
        reals += alpha.re * right.re + alpha.im * right.im
        imags += alpha.im * right.re - alpha.re * right.im
      }
      const entry = upper ? matrix[column]?.[index] : matrix[index]?.[column]
      const first = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
      const other = Internal.shape(entry) ? (upper ? -entry.im : entry.im) : 0
      const target = current[column]!
      if (index === column) {
        const diagonal = first - reals
        if (!(diagonal > 0) || !(Math.abs(other) <= first * 1e-12)) {
          throw new RangeError('matrix is not positive definite')
        }
        target.re = Math.sqrt(diagonal)
        target.im = 0
      } else {
        const pivot = previous[column]?.re ?? 0
        if (!(pivot > 0)) {
          throw new RangeError('matrix is not positive definite')
        }
        target.re = (first - reals) / pivot
        target.im = (other - imags) / pivot
      }
    }
  }
  if (upper) {
    return Array.from(
      { length: order },
      (_outer, outer) =>
        Array.from({ length: order }, (_inner, column) => {
          const entry = lower[column]?.[outer] ?? { re: 0, im: 0 }
          return { re: entry.re, im: entry.im === 0 ? 0 : -entry.im }
        })
    )
  }
  return lower
}
