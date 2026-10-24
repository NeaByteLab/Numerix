import type * as Types from '@app/types.ts'

/**
 * Build a companion matrix.
 * @description Creates the matrix whose eigenvalues are the roots.
 * @param coefficients - Coefficients of the source polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Companion matrix of the polynomial
 */
export default function companion(
  coefficients: number[],
  basis: Types.NumerixBasis = 'poly'
): number[][] {
  const order = coefficients.length - 1
  if (order <= 0) {
    return []
  }
  const leading = coefficients[order] ?? 1
  if (order === 1) {
    const constant = coefficients[0] ?? 0
    if (basis === 'herm') {
      return [[-0.5 * constant / leading]]
    }
    if (basis === 'lag') {
      return [[1 + constant / leading]]
    }
    return [[-constant / leading]]
  }
  const matrix = new Array<number[]>(order)
  for (let row = 0; row < order; row++) {
    matrix[row] = new Array<number>(order).fill(0)
  }
  if (basis === 'poly') {
    for (let index = 0; index < order; index++) {
      const row = matrix[index]
      if (row) {
        if (index > 0) {
          row[index - 1] = 1
        }
        row[order - 1] = -(coefficients[index] ?? 0) / leading
      }
    }
    return matrix
  }
  if (basis === 'cheb') {
    const half = Math.sqrt(0.5)
    for (let index = 0; index < order - 1; index++) {
      const offDiagonal = index === 0 ? half : 0.5
      const current = matrix[index]
      const following = matrix[index + 1]
      if (current && following) {
        current[index + 1] = offDiagonal
        following[index] = offDiagonal
      }
    }
    for (let index = 0; index < order; index++) {
      const row = matrix[index]
      if (row) {
        const ratio = index === 0 ? 1 / half : 1
        row[order - 1] = (row[order - 1] ?? 0) -
          ((coefficients[index] ?? 0) / leading) * ratio * 0.5
      }
    }
    return matrix
  }
  if (basis === 'leg') {
    const scales = new Array<number>(order)
    for (let index = 0; index < order; index++) {
      scales[index] = 1 / Math.sqrt(2 * index + 1)
    }
    for (let index = 0; index < order - 1; index++) {
      const offDiagonal = (index + 1) * (scales[index] ?? 1) * (scales[index + 1] ?? 1)
      const current = matrix[index]
      const following = matrix[index + 1]
      if (current && following) {
        current[index + 1] = offDiagonal
        following[index] = offDiagonal
      }
    }
    const last = scales[order - 1] ?? 1
    for (let index = 0; index < order; index++) {
      const row = matrix[index]
      if (row) {
        row[order - 1] = (row[order - 1] ?? 0) -
          ((coefficients[index] ?? 0) / leading) * ((scales[index] ?? 1) / last) *
            (order / (2 * order - 1))
      }
    }
    return matrix
  }
  if (basis === 'herm' || basis === 'herme') {
    const factor = basis === 'herm' ? 2 : 1
    const scales = new Array<number>(order)
    scales[order - 1] = 1
    let accumulated = 1
    for (let index = order - 1; index >= 1; index--) {
      accumulated /= Math.sqrt(factor * index)
      scales[index - 1] = accumulated
    }
    for (let index = 0; index < order - 1; index++) {
      const offDiagonal = Math.sqrt((index + 1) / factor)
      const current = matrix[index]
      const following = matrix[index + 1]
      if (current && following) {
        current[index + 1] = offDiagonal
        following[index] = offDiagonal
      }
    }
    for (let index = 0; index < order; index++) {
      const row = matrix[index]
      if (row) {
        row[order - 1] = (row[order - 1] ?? 0) -
          ((scales[index] ?? 1) * (coefficients[index] ?? 0)) / (factor * leading)
      }
    }
    return matrix
  }
  for (let index = 0; index < order; index++) {
    const row = matrix[index]
    if (row) {
      row[index] = 2 * index + 1
      if (index < order - 1) {
        row[index + 1] = -(index + 1)
        const following = matrix[index + 1]
        if (following) {
          following[index] = -(index + 1)
        }
      }
    }
  }
  for (let index = 0; index < order; index++) {
    const row = matrix[index]
    if (row) {
      row[order - 1] = (row[order - 1] ?? 0) + ((coefficients[index] ?? 0) / leading) * order
    }
  }
  return matrix
}
