/**
 * Create an identity matrix.
 * @description Builds a matrix with ones along the diagonal.
 * @param rows - Number of rows in the matrix
 * @param columns - Number of columns in the matrix
 * @param offset - Diagonal offset of the ones
 * @returns Identity matrix with the requested shape
 */
export default function eye(rows: number, columns = rows, offset = 0): number[][] {
  const matrix = new Array<number[]>(rows)
  for (let row = 0; row < rows; row++) {
    const current = new Array<number>(columns).fill(0)
    const column = row + offset
    if (column >= 0 && column < columns) {
      current[column] = 1
    }
    matrix[row] = current
  }
  return matrix
}
