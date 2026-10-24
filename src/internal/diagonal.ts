import bounds from '@app/internal/bounds.ts'

/**
 * Extract the entries of a diagonal.
 * @description Reads entries along a diagonal of the supplied matrix.
 * @param matrix - Matrix to read the diagonal from
 * @param offset - Diagonal offset where positive shifts toward the upper right
 * @param fallback - Value used when an entry is missing
 * @returns Diagonal entries ordered from the leading row
 */
export default function diagonal<T>(
  matrix: T[][],
  offset = 0,
  fallback?: T
): T[] {
  const rows = matrix.length
  const columns = matrix[0]?.length ?? 0
  const { start, end } = bounds(rows, columns, offset)
  if (end <= start) {
    return []
  }
  const result = new Array<T>(end - start)
  for (let row = start; row < end; row++) {
    const entry = matrix[row]?.[row + offset]
    result[row - start] = entry === undefined ? (fallback as T) : entry
  }
  return result
}
