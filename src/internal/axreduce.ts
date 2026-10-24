import type * as Types from '@app/types.ts'
import reduceone from '@app/internal/reduceone.ts'

/**
 * Reduce a matrix along an axis.
 * @description Combines the entries of each row or column.
 * @param matrix - Matrix whose entries are combined
 * @param axis - Axis along which the entries are combined
 * @param skip - Whether invalid entries are skipped
 * @param accumulator - Running combination applied to the entries
 * @returns Combined value for each row or column
 */
export default function axreduce(
  matrix: number[][],
  axis: number,
  skip: boolean,
  accumulator: Types.NumerixReduce
): number[] {
  const rows = matrix.length
  if (axis === 1 || axis === -1) {
    const result = new Array<number>(rows)
    for (let row = 0; row < rows; row++) {
      result[row] = reduceone(matrix[row] ?? [], skip, accumulator)
    }
    return result
  }
  const columns = matrix[0]?.length ?? 0
  const result = new Array<number>(columns)
  for (let column = 0; column < columns; column++) {
    let running = accumulator.identity
    for (let row = 0; row < rows; row++) {
      const value = Number(matrix[row]?.[column] ?? 0)
      if (skip && Number.isNaN(value)) {
        continue
      }
      running = accumulator.combine(running, value)
    }
    result[column] = running
  }
  return result
}
