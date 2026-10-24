import type * as Types from '@app/types.ts'
import beats from '@app/internal/beats.ts'
import extremeone from '@app/internal/extremeone.ts'
import sentinel from '@app/internal/sentinel.ts'

/**
 * Reduce a matrix along an axis.
 * @description Computes the extreme value of each row or column.
 * @param matrix - Matrix to reduce
 * @param axis - Axis along which the extreme is sought
 * @param skip - Whether invalid entries are skipped
 * @param direction - Whether the smallest or largest entry wins
 * @returns Extreme value for each row or column
 */
export default function axis(
  matrix: number[][],
  axis: number,
  skip: boolean,
  direction: Types.NumerixDirection
): number[] {
  const rows = matrix.length
  if (axis === 1 || axis === -1) {
    const result = new Array<number>(rows)
    for (let row = 0; row < rows; row++) {
      result[row] = extremeone(matrix[row] ?? [], skip, direction)
    }
    return result
  }
  const columns = matrix[0]?.length ?? 0
  const result = new Array<number>(columns)
  for (let column = 0; column < columns; column++) {
    let best = sentinel(direction)
    let found = false
    for (let row = 0; row < rows; row++) {
      const value = matrix[row]?.[column] ?? 0
      if (Number.isNaN(value)) {
        if (skip) {
          continue
        }
        best = NaN
        break
      }
      found = true
      if (beats(value, best, direction)) {
        best = value
      }
    }
    result[column] = found ? best : skip ? NaN : best
  }
  return result
}
