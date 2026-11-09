import type * as Types from '@app/types.ts'

/**
 * Compute the row bounds of a diagonal.
 * @description Resolves the offset into an inclusive row range.
 * @param height - Number of rows in the matrix
 * @param columns - Number of columns in the matrix
 * @param offset - Diagonal offset where positive values shift toward the upper right
 * @returns First and last row holding a diagonal entry
 */
export default function bounds(
  height: number,
  columns: number,
  offset: number
): Types.NumerixSpan {
  return {
    start: offset < 0 ? -offset : 0,
    end: height < columns - offset ? height : columns - offset
  }
}
