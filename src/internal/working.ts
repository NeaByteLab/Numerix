/**
 * Copy a matrix for mutation.
 * @description Clones each row of the matrix.
 * @param matrix - Matrix to copy
 * @returns Independent copy of the matrix
 */
export default function working(matrix: number[][]): number[][] {
  const order = matrix.length
  const working = new Array<number[]>(order)
  for (let row = 0; row < order; row++) {
    working[row] = (matrix[row] ?? []).slice()
  }
  return working
}
