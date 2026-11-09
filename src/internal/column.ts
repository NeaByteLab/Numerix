/**
 * Gather a matrix column into a buffer.
 * @description Copies the entries of a single column.
 * @template T - Type of the matrix entries
 * @param matrix - Matrix from which to read the column
 * @param height - Number of rows in the matrix
 * @param column - Index of the column to gather
 * @param buffer - Destination array reused across columns
 * @param fallback - Value used when an entry is missing
 * @returns The supplied buffer holding the gathered column
 */
export default function column<T>(
  matrix: T[][],
  height: number,
  column: number,
  buffer: T[],
  fallback?: T
): T[] {
  for (let outer = 0; outer < height; outer++) {
    const entry = matrix[outer]?.[column]
    buffer[outer] = entry === undefined ? (fallback as T) : entry
  }
  return buffer
}
