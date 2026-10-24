import type * as Types from '@app/types.ts'
import beats from '@app/internal/beats.ts'
import index1d from '@app/internal/index1d.ts'
import sentinel from '@app/internal/sentinel.ts'

/**
 * Reduce a matrix to extreme positions.
 * @description Computes the extreme position of each row or column.
 * @param matrix - Matrix to reduce
 * @param axis - Axis along which the extreme is sought
 * @param skip - Whether invalid entries are skipped
 * @param direction - Whether the smallest or largest entry wins
 * @returns Position of the extreme value for each row or column
 */
export default function axindex(
  matrix: number[][],
  axis: number,
  skip: boolean,
  direction: Types.NumerixDirection
): number[] {
  const rows = matrix.length
  if (axis === 1 || axis === -1) {
    const result = new Array<number>(rows)
    for (let row = 0; row < rows; row++) {
      result[row] = index1d(matrix[row] ?? [], skip, direction)
    }
    return result
  }
  const columns = matrix[0]?.length ?? 0
  const result = new Array<number>(columns)
  for (let column = 0; column < columns; column++) {
    let winner = 0
    let best = sentinel(direction)
    for (let row = 0; row < rows; row++) {
      const value = matrix[row]?.[column] ?? 0
      if (Number.isNaN(value)) {
        if (skip) {
          continue
        }
        winner = row
        break
      }
      if (beats(value, best, direction)) {
        best = value
        winner = row
      }
    }
    result[column] = winner
  }
  return result
}
