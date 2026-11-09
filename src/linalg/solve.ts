import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import inv from '@app/linalg/inv.ts'
import matmul from '@app/linalg/matmul.ts'

/**
 * Solve a linear system of equations.
 * @description Computes the solution vector for the coefficient matrix.
 * @param factors - Matrix of system coefficients
 * @param constants - Right-hand side vector of the system
 * @param square - Whether the coefficient matrix is square
 * @returns Solution vector for the given system
 */
export default function solve(
  factors: number[][],
  constants: number[],
  square?: boolean
): number[]
/**
 * Solve a matrix linear system.
 * @description Computes the solution matrix for the coefficient matrix.
 * @param factors - Matrix of system coefficients
 * @param constants - Right-hand side matrix of the system
 * @param square - Whether the coefficient matrix is square
 * @returns Solution matrix for the given system
 */
export default function solve(
  factors: number[][],
  constants: number[][],
  square?: boolean
): number[][]
/**
 * Solve a complex linear system.
 * @description Computes the solution vector or matrix.
 * @param factors - Matrix of system coefficients
 * @param constants - Right-hand side vector or matrix of the system
 * @param square - Whether the coefficient matrix is square
 * @returns Solution vector or matrix for the given system
 */
export default function solve(
  factors: number[][] | Types.NumerixComplex[][],
  constants: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  square?: boolean
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][]
/**
 * Solve a linear system of equations.
 * @description Computes the solution for the coefficient matrix.
 * @param factors - Matrix of system coefficients
 * @param constants - Right-hand side vector or matrix of the system
 * @param square - Whether the coefficient matrix is square
 * @returns Solution vector or matrix for the given system
 */
export default function solve(
  factors: number[][] | Types.NumerixComplex[][],
  constants: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  square = false
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  const height = factors.length
  const count = factors[0]?.length ?? 0
  if (square && height !== count) {
    throw new RangeError('coefficient matrix must be square')
  }
  if (constants.length !== height) {
    throw new RangeError('Incompatible dimensions between coefficient matrix and constants')
  }
  if (height !== count) {
    return matmul(inv(factors, true), constants) as
      | number[]
      | number[][]
      | Types.NumerixComplex[]
      | Types.NumerixComplex[][]
  }
  const vector = !Array.isArray(constants[0])
  const width = count + (vector ? 1 : ((constants[0] as unknown[])?.length ?? 0))
  if (
    Internal.classify(factors, true, true) !== true &&
    Internal.classify(constants, true, true) !== true
  ) {
    let maximum = 0
    const augmented = Array.from(
      { length: count },
      (_outer, outer) =>
        Array.from({ length: width }, (_inner, column) => {
          const reals = Number(
            (column >= count
              ? (vector ? constants[outer] : (constants[outer] as unknown[])?.[column - count])
              : factors[outer]?.[column]) ?? 0
          )
          if (column < count) {
            maximum = Math.max(maximum, Math.abs(reals))
          }
          return reals
        })
    )
    for (let cursor = 0; cursor < count; cursor++) {
      let chosen = cursor
      let largest = Math.abs(augmented[cursor]?.[cursor] ?? 0)
      for (let outer = cursor + 1; outer < count; outer++) {
        const value = Math.abs(augmented[outer]?.[cursor] ?? 0)
        if (value > largest) {
          largest = value
          chosen = outer
        }
      }
      if (largest <= maximum * count * Number.EPSILON) {
        if (square) {
          throw new RangeError('coefficient matrix is singular')
        }
        return matmul(inv(factors, true), constants) as number[] | number[][]
      }
      if (chosen !== cursor) {
        ;[augmented[cursor], augmented[chosen]] = [augmented[chosen] ?? [], augmented[cursor] ?? []]
      }
      const pivot = augmented[cursor]!
      const diagonal = pivot[cursor] ?? 1
      for (let column = cursor; column < width; column++) {
        pivot[column] = (pivot[column] ?? 0) / diagonal
      }
      for (let outer = 0; outer < count; outer++) {
        const current = augmented[outer]
        if (outer !== cursor && current) {
          const factor = current[cursor] ?? 0
          for (let column = cursor + 1; column < width; column++) {
            current[column] = (current[column] ?? 0) - factor * (pivot[column] ?? 0)
          }
          current[cursor] = 0
        }
      }
    }
    return vector
      ? augmented.map((slice) => slice[count] ?? 0)
      : augmented.map((slice) => slice.slice(count))
  }
  let maximum = 0
  const augmented = Array.from(
    { length: count },
    (_outer, outer) =>
      Array.from({ length: width }, (_inner, column) => {
        const entry = column >= count
          ? (vector ? constants[outer] : (constants[outer] as unknown[])?.[column - count])
          : factors[outer]?.[column]
        const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        const imags = Internal.shape(entry) ? entry.im : 0
        if (column < count) {
          maximum = Math.max(maximum, Math.hypot(reals, imags))
        }
        return { re: reals, im: imags }
      })
  )
  for (let cursor = 0; cursor < count; cursor++) {
    let chosen = cursor
    let largest = Math.hypot(
      augmented[cursor]?.[cursor]?.re ?? 0,
      augmented[cursor]?.[cursor]?.im ?? 0
    )
    for (let outer = cursor + 1; outer < count; outer++) {
      const value = Math.hypot(
        augmented[outer]?.[cursor]?.re ?? 0,
        augmented[outer]?.[cursor]?.im ?? 0
      )
      if (value > largest) {
        largest = value
        chosen = outer
      }
    }
    if (largest <= maximum * count * Number.EPSILON) {
      if (square) {
        throw new RangeError('coefficient matrix is singular')
      }
      return matmul(inv(factors, true), constants) as
        | number[]
        | number[][]
        | Types.NumerixComplex[]
        | Types.NumerixComplex[][]
    }
    if (chosen !== cursor) {
      ;[augmented[cursor], augmented[chosen]] = [augmented[chosen] ?? [], augmented[cursor] ?? []]
    }
    const pivot = augmented[cursor]!
    const diagonal = pivot[cursor] ?? { re: 1, im: 0 }
    const crest = Math.max(Math.abs(diagonal.re), Math.abs(diagonal.im)) || 1
    const cosine = diagonal.re / crest
    const sines = diagonal.im / crest
    const scaled = crest * (cosine * cosine + sines * sines)
    for (let column = cursor; column < width; column++) {
      const entry = pivot[column]!
      const first = entry.re
      entry.re = (first * cosine + entry.im * sines) / scaled
      entry.im = (entry.im * cosine - first * sines) / scaled
    }
    for (let outer = 0; outer < count; outer++) {
      const current = augmented[outer]
      if (outer !== cursor && current) {
        const factor = current[cursor]!
        const alpha = factor.re
        const omega = factor.im
        for (let column = cursor + 1; column < width; column++) {
          const entry = current[column]!
          const target = pivot[column]!
          entry.re -= alpha * target.re - omega * target.im
          entry.im -= alpha * target.im + omega * target.re
        }
        factor.re = 0
        factor.im = 0
      }
    }
  }
  if (vector) {
    return augmented.map((slice) => {
      const entry = slice[count]!
      entry.re = entry.re || 0
      entry.im = entry.im || 0
      return entry
    })
  }
  return augmented.map((slice) => {
    const items = slice.slice(count)
    for (let column = 0; column < items.length; column++) {
      const entry = items[column]!
      entry.re = entry.re || 0
      entry.im = entry.im || 0
    }
    return items
  })
}
