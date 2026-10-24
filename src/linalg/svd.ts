import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import eig from '@app/linalg/eig.ts'

/**
 * Compute a singular value decomposition.
 * @description Derives singular values from the matrix eigenpairs.
 * @param matrix - Matrix to decompose
 * @param only - When true returns singular values without factors
 * @returns Singular values alone or singular values with factors
 */
export default function svd(
  matrix: number[][],
  only = false
): number[] | Types.NumerixSvd {
  const rows = matrix.length
  const columns = matrix[0]?.length ?? 0
  const eigen = eig(Internal.gram(matrix), false) as Types.NumerixEigen
  const factors = Math.min(rows, columns)
  const length = eigen.values.length
  const singular = new Float64Array(length)
  const order = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    const value = eigen.values[index] ?? 0
    singular[index] = Math.sqrt(value > 0 ? value : 0)
    order[index] = index
  }
  order.sort((left, right) => (singular[right] ?? 0) - (singular[left] ?? 0))
  const values = new Array<number>(factors)
  for (let index = 0; index < factors; index++) {
    values[index] = singular[order[index] ?? 0] ?? 0
  }
  if (only) {
    return values
  }
  const transposed = new Array<number[]>(factors)
  for (let index = 0; index < factors; index++) {
    const position = order[index] ?? 0
    const vector = eigen.vectors[position] ?? []
    const line = new Array<number>(columns)
    for (let row = 0; row < columns; row++) {
      line[row] = vector[row] ?? 0
    }
    transposed[index] = line
  }
  const left = new Array<number[]>(rows)
  for (let row = 0; row < rows; row++) {
    left[row] = new Array<number>(factors)
  }
  for (let column = 0; column < factors; column++) {
    const singular = values[column] ?? 0
    const right = transposed[column] ?? []
    for (let row = 0; row < rows; row++) {
      let projection = 0
      const current = matrix[row] ?? []
      for (let inner = 0; inner < columns; inner++) {
        projection += (current[inner] ?? 0) * (right[inner] ?? 0)
      }
      const target = left[row]
      if (target) {
        target[column] = singular > 1e-12 ? projection / singular : (row === column ? 1 : 0)
      }
    }
  }
  return { U: left, S: values, Vt: transposed }
}
