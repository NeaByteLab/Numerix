/**
 * Create a triangular matrix.
 * @description Builds a matrix filled above or below the diagonal.
 * @param input - Number of rows or an existing matrix
 * @param columns - Number of columns in the matrix
 * @param diagonal - Diagonal offset of the triangle
 * @param mode - Triangle side that is filled
 * @returns Triangular matrix
 */
export default function tri(
  input: number | number[][],
  columns?: number,
  diagonal: number | boolean = 0,
  mode: 'mask' | 'lower' | 'upper' = 'mask'
): number[][] {
  const offset = typeof diagonal === 'number' ? diagonal : 0
  const upper = mode === 'upper'
  const rows = typeof input === 'number' ? input : input.length
  const width = typeof input === 'number' ? columns ?? input : columns ?? input[0]?.length ?? 0
  const result = new Array<number[]>(rows)
  for (let row = 0; row < rows; row++) {
    const current = new Array<number>(width).fill(0)
    const source = typeof input === 'number' ? undefined : input[row]
    if (upper) {
      const start = Math.max(0, row + offset)
      for (let column = start; column < width; column++) {
        current[column] = source === undefined ? 1 : source[column] ?? 0
      }
    } else {
      const limit = Math.min(width - 1, row + offset)
      for (let column = 0; column <= limit; column++) {
        current[column] = source === undefined ? 1 : source[column] ?? 0
      }
    }
    result[row] = current
  }
  return result
}
