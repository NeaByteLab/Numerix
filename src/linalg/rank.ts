import * as Internal from '@app/internal/index.ts'

/**
 * Compute the numerical rank of matrices.
 * @description Counts significant singular values within a tolerance.
 * @param matrix - Matrix whose rank is computed
 * @param tolerance - Threshold below which values count as zero
 * @returns Number of significant dimensions in the matrix
 */
export default function rank(matrix: number[][], tolerance = 1e-10): number {
  const rows = matrix.length
  const columns = matrix[0]?.length ?? 0
  const grid = Internal.working(matrix)
  let rank = 0
  for (let column = 0; column < columns && rank < rows; column++) {
    let swap = rank
    for (let row = rank + 1; row < rows; row++) {
      if (Math.abs(grid[row]?.[column] ?? 0) > Math.abs(grid[swap]?.[column] ?? 0)) {
        swap = row
      }
    }
    if (Math.abs(grid[swap]?.[column] ?? 0) <= tolerance) {
      continue
    }
    const swapped = grid[rank] ?? []
    grid[rank] = grid[swap] ?? []
    grid[swap] = swapped
    const pivot = grid[rank]
    if (!pivot) {
      continue
    }
    const divisor = pivot[column] ?? 1
    for (let target = column; target < columns; target++) {
      pivot[target] = (pivot[target] ?? 0) / divisor
    }
    for (let row = 0; row < rows; row++) {
      const current = grid[row]
      if (row !== rank && current && Math.abs(current[column] ?? 0) > tolerance) {
        const factor = current[column] ?? 0
        for (let target = column; target < columns; target++) {
          current[target] = (current[target] ?? 0) - factor * (pivot[target] ?? 0)
        }
      }
    }
    rank++
  }
  return rank
}
