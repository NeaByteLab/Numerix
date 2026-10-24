/**
 * Rotate a matrix by quarter turns.
 * @description Turns the matrix clockwise by the given count.
 * @param matrix - Matrix to rotate
 * @param turns - Number of quarter turns to apply
 * @returns Rotated matrix
 */
export default function rotate(matrix: unknown[][], turns = 1): unknown[][] {
  const quarter = ((turns % 4) + 4) % 4
  const rows = matrix.length
  const columns = matrix[0]?.length ?? 0
  if (quarter === 0) {
    const result = new Array<unknown[]>(rows)
    for (let row = 0; row < rows; row++) {
      result[row] = (matrix[row] ?? []).slice()
    }
    return result
  }
  if (quarter === 1) {
    const result = new Array<unknown[]>(columns)
    for (let column = 0; column < columns; column++) {
      const output = new Array<unknown>(rows)
      const source = columns - 1 - column
      for (let row = 0; row < rows; row++) {
        output[row] = matrix[row]?.[source]
      }
      result[column] = output
    }
    return result
  }
  if (quarter === 2) {
    const result = new Array<unknown[]>(rows)
    for (let row = 0; row < rows; row++) {
      const source = matrix[rows - 1 - row] ?? []
      const output = new Array<unknown>(columns)
      for (let column = 0; column < columns; column++) {
        output[column] = source[columns - 1 - column]
      }
      result[row] = output
    }
    return result
  }
  const result = new Array<unknown[]>(columns)
  for (let column = 0; column < columns; column++) {
    const output = new Array<unknown>(rows)
    for (let row = 0; row < rows; row++) {
      output[row] = matrix[rows - 1 - row]?.[column]
    }
    result[column] = output
  }
  return result
}
