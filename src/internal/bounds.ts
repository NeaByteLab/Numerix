import type * as Types from '@app/types.ts'

/**
 * Compute the row bounds of diagonal.
 * @description Resolves the offset into an inclusive row range.
 * @param rows - Number of rows in the matrix
 * @param columns - Number of columns in the matrix
 * @param offset - Diagonal offset where positive shifts toward the upper right
 * @returns First and last row holding a diagonal entry
 */
export default function bounds(
  rows: number,
  columns: number,
  offset: number
): Types.NumerixSpan {
  const start = offset < 0 ? -offset : 0
  const limit = columns - offset
  const end = rows < limit ? rows : limit
  return { start, end }
}
