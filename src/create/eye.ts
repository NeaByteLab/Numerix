/**
 * Create an identity matrix.
 * @description Builds a matrix with ones along the diagonal.
 * @param height - Number of rows in the matrix
 * @param columns - Number of columns in the matrix
 * @param offset - Diagonal offset of the ones
 * @returns Identity matrix with the requested shape
 */
export default function eye(height: number, columns = height, offset = 0): number[][] {
  if (height < 0 || columns < 0) {
    throw new RangeError('negative dimensions are not allowed')
  }
  return Array.from(
    { length: height },
    (_outer, index) =>
      Array.from(
        { length: columns },
        (_inner, column) => (column === index + offset ? 1 : 0)
      )
  )
}
