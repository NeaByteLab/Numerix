import kernel from '@app/internal/kernel.ts'

/**
 * Compute the Gram matrix.
 * @description Pairs the columns into the normal matrix.
 * @param matrix - Matrix whose columns are paired
 * @returns Normal matrix of the given matrix
 */
export default function gram(matrix: number[][]): number[][] {
  const rows = matrix.length
  const columns = matrix[0]?.length ?? 0
  const lanes = new Array<Float64Array>(columns)
  for (let column = 0; column < columns; column++) {
    const lane = new Float64Array(rows)
    for (let row = 0; row < rows; row++) {
      lane[row] = matrix[row]?.[column] ?? 0
    }
    lanes[column] = lane
  }
  return kernel(lanes, columns, rows)
}
