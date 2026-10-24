import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the determinant of a matrix.
 * @description Uses elimination and tracks the determinant sign.
 * @param matrix - Square matrix whose determinant is computed
 * @param logged - When true returns the log determinant with sign
 * @returns Determinant value or log determinant with sign
 */
export default function det(
  matrix: number[][],
  logged = false
): number | Types.NumerixDet {
  const order = matrix.length
  const grid = Internal.working(matrix)
  let sign = 1
  let logarithm = 0
  let product = 1
  for (let index = 0; index < order; index++) {
    let swap = index
    let largest = Math.abs(grid[index]?.[index] ?? 0)
    for (let row = index + 1; row < order; row++) {
      const candidate = Math.abs(grid[row]?.[index] ?? 0)
      if (candidate > largest) {
        largest = candidate
        swap = row
      }
    }
    if (largest < 1e-15) {
      return logged ? { sign: 0, logDet: -Infinity } : 0
    }
    if (swap !== index) {
      const swapped = grid[index] ?? []
      grid[index] = grid[swap] ?? []
      grid[swap] = swapped
      sign = -sign
    }
    const pivot = grid[index]!
    const diagonal = pivot[index] ?? 1
    if (logged) {
      if (diagonal < 0) {
        sign = -sign
      }
      logarithm += Math.log(largest)
    } else {
      product *= diagonal
    }
    const scale = 1 / diagonal
    for (let row = index + 1; row < order; row++) {
      const current = grid[row]!
      const leading = current[index] ?? 0
      if (leading === 0) {
        continue
      }
      const factor = leading * scale
      for (let column = index + 1; column < order; column++) {
        current[column] = (current[column] ?? 0) - factor * (pivot[column] ?? 0)
      }
    }
  }
  if (logged) {
    return { sign, logDet: logarithm }
  }
  return sign * product
}
