import * as Internal from '@app/internal/index.ts'

/**
 * Apply an operation across array slices.
 * @description Runs an operation on each row of a matrix.
 * @template T - Type of the array values
 * @template R - Type of the operation result
 * @param operation - Operation applied to each slice
 * @param source - Vector or matrix on which the operation runs
 * @param level - Axis along which the slices are taken
 * @returns Results of the operation for each slice
 */
export default function apply<T, R>(
  operation: (slice: T[]) => R,
  source: T[] | T[][] | number,
  level: number | T[] | T[][] = 0
): R[] {
  const input = (typeof source === 'number' ? level : source) as T[] | T[][]
  const matrix = Array.isArray(input[0])
  const dimensions = matrix ? 2 : 1
  const requested = typeof source === 'number' ? source : (level as number)
  const resolved = requested < 0 ? dimensions + requested : requested
  if (resolved < 0 || resolved >= dimensions) {
    throw new RangeError(`axis is out of bounds for array of dimension ${dimensions}`)
  }
  const values = Internal.classify(input, true, true) === true
    ? (Internal.nested(input) as T[] | T[][])
    : input
  if (!matrix) {
    if (values.length === 0) {
      throw new RangeError('Cannot apply_along_axis when any iteration dimensions are 0')
    }
    return [operation((values as T[]).slice())]
  }
  const table = values as T[][]
  const height = table.length
  const width = table[0]?.length ?? 0
  if (resolved === 1) {
    if (height === 0) {
      throw new RangeError('Cannot apply_along_axis when any iteration dimensions are 0')
    }
    return table.map((slice) => operation((slice ?? []).slice()))
  }
  if (width === 0) {
    throw new RangeError('Cannot apply_along_axis when any iteration dimensions are 0')
  }
  return Array.from(
    { length: width },
    (_outer, column) => operation(Internal.column(table, height, column, new Array<T>(height)))
  )
}
