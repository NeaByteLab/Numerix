import bounds from '@app/internal/bounds.ts'
import classify from '@app/internal/classify.ts'
import nested from '@app/internal/nested.ts'

/**
 * Extract the entries of a diagonal.
 * @description Reads entries along a diagonal of the supplied matrix.
 * @template T - Type of the matrix entries
 * @param matrix - Matrix from which to read the diagonal
 * @param offset - Diagonal offset where positive values shift toward the upper right
 * @param fallback - Value used when an entry is missing
 * @returns Diagonal entries ordered from the leading row
 */
export default function diagonal<T>(
  matrix: T[][],
  offset = 0,
  fallback?: T
): T[] {
  const range = bounds(matrix.length, matrix[0]?.length ?? 0, offset)
  if (range.end <= range.start) {
    return []
  }
  const entries = Array.from(
    { length: range.end - range.start },
    (_outer, index) =>
      (matrix[range.start + index]?.[range.start + index + offset] ?? fallback) as T
  )
  return classify(matrix, true, true) === true ? (nested(entries) as unknown as T[]) : entries
}
