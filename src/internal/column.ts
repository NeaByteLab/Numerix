/**
 * Gather a matrix column into buffer.
 * @description Copies the entries of a single column.
 * @param matrix - Matrix to read the column from
 * @param rows - Number of rows in the matrix
 * @param column - Index of the column to gather
 * @param buffer - Destination array reused across columns
 * @param fallback - Value used when an entry is missing
 * @returns The supplied buffer holding the gathered column
 * @template T - Type of the matrix entries
 */
export default function column<T>(
  matrix: T[][],
  rows: number,
  column: number,
  buffer: T[],
  fallback?: T
): T[] {
  for (let row = 0; row < rows; row++) {
    const entry = matrix[row]?.[column]
    buffer[row] = entry === undefined ? (fallback as T) : entry
  }
  return buffer
}
