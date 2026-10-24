/**
 * Compute a Cholesky decomposition.
 * @description Factors a positive definite matrix into triangular factors.
 * @param matrix - Symmetric positive definite matrix to factor
 * @param upper - When true returns the upper triangular factor
 * @returns Cholesky factor of the input matrix
 */
export default function cholesky(matrix: number[][], upper = false): number[][] {
  const order = matrix.length
  const lower = new Array<number[]>(order)
  for (let row = 0; row < order; row++) {
    lower[row] = new Array<number>(order).fill(0)
  }
  for (let row = 0; row < order; row++) {
    const current = lower[row]
    if (!current) {
      continue
    }
    for (let column = 0; column <= row; column++) {
      let sum = 0
      const previous = lower[column]
      for (let index = 0; index < column; index++) {
        sum += (current[index] ?? 0) * (previous?.[index] ?? 0)
      }
      const entry = matrix[row]?.[column] ?? 0
      current[column] = row === column
        ? Math.sqrt(Math.max(0, entry - sum))
        : (entry - sum) / (previous?.[column] ?? 1)
    }
  }
  if (upper) {
    const transposed = new Array<number[]>(order)
    for (let row = 0; row < order; row++) {
      const output = new Array<number>(order)
      for (let column = 0; column < order; column++) {
        output[column] = lower[column]?.[row] ?? 0
      }
      transposed[row] = output
    }
    return transposed
  }
  return lower
}
