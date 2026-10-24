import type * as Types from '@app/types.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Accumulate values along an axis.
 * @description Combines entries into running values for the requested axis.
 * @param values - Values whose running values are computed
 * @param skip - Whether invalid entries are skipped
 * @param axis - Axis along which the entries accumulate
 * @param accumulator - Running combination applied to the entries
 * @returns Running values matching the input shape
 */
export default function accumulate(
  values: unknown[],
  skip: boolean,
  axis: number | undefined,
  accumulator: Types.NumerixReduce
): number[] | number[][] {
  if (axis !== undefined && Array.isArray(values[0])) {
    const matrix = values as number[][]
    const rows = matrix.length
    if (axis === 1 || axis === -1) {
      const result = new Array<number[]>(rows)
      for (let row = 0; row < rows; row++) {
        result[row] = accumulate(matrix[row] ?? [], skip, undefined, accumulator) as number[]
      }
      return result
    }
    if (axis === 0 || axis === -2) {
      const width = matrix[0]?.length ?? 0
      const result = new Array<number[]>(rows)
      for (let row = 0; row < rows; row++) {
        result[row] = new Array<number>(width)
      }
      for (let column = 0; column < width; column++) {
        let running = accumulator.identity
        for (let row = 0; row < rows; row++) {
          const value = matrix[row]?.[column] ?? 0
          running = accumulator.combine(
            running,
            skip && Number.isNaN(value) ? accumulator.neutral : value
          )
          const current = result[row]
          if (current) {
            current[column] = running
          }
        }
      }
      return result
    }
  }
  const flat = Array.isArray(values[0]) ? Shape.flatten<number>(values) : (values as number[])
  const length = flat.length
  const result = new Array<number>(length)
  let running = accumulator.identity
  if (skip) {
    for (let index = 0; index < length; index++) {
      const value = Number(flat[index])
      if (!Number.isNaN(value)) {
        running = accumulator.combine(running, value)
      }
      result[index] = running
    }
    return result
  }
  for (let index = 0; index < length; index++) {
    running = accumulator.combine(running, Number(flat[index]))
    result[index] = running
  }
  return result
}
