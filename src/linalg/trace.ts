import * as Internal from '@app/internal/index.ts'

/**
 * Compute the trace of a matrix.
 * @description Sums the diagonal entries along the requested offset.
 * @param matrix - Matrix whose diagonal entries are summed
 * @param offset - Diagonal offset used for the summation
 * @returns Sum of the selected diagonal entries
 */
export default function trace(matrix: number[][], offset = 0): number {
  const rows = matrix.length
  const columns = matrix[0]?.length ?? 0
  const { start, end } = Internal.bounds(rows, columns, offset)
  let sum = 0
  for (let row = start; row < end; row++) {
    sum += matrix[row]?.[row + offset] ?? 0
  }
  return sum
}
