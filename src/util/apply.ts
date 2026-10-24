import * as Internal from '@app/internal/index.ts'

/**
 * Apply an operation across array slices.
 * @description Runs an operation on each row of a matrix.
 * @param operation - Operation applied to each slice
 * @param array - Vector or matrix the operation runs on
 * @param axis - Axis along which the slices are taken
 * @returns Results of the operation for each slice
 * @template T - Type of the array values
 * @template R - Type of the operation result
 */
export default function apply<T, R>(
  operation: (slice: T[]) => R,
  array: T[] | T[][],
  axis = 0
): R[] {
  if (!Array.isArray(array[0])) {
    return [operation(array as T[])]
  }
  const matrix = array as T[][]
  const height = matrix.length
  if (axis === 1) {
    const result = new Array<R>(height)
    for (let row = 0; row < height; row++) {
      result[row] = operation(matrix[row] ?? [])
    }
    return result
  }
  const width = matrix[0]?.length ?? 0
  const result = new Array<R>(width)
  const buffer = new Array<T>(height)
  for (let column = 0; column < width; column++) {
    result[column] = operation(Internal.column(matrix, height, column, buffer))
  }
  return result
}
