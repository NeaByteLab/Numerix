import type * as Types from '@app/types.ts'
import column from '@app/internal/column.ts'
import shape from '@app/internal/shape.ts'

/**
 * Find the extreme position of values.
 * @description Searches for the position of the extreme entry.
 * @param values - Values to search for the extreme position
 * @param missing - Whether invalid entries are skipped
 * @param level - Axis along which the extreme is sought
 * @param direction - Whether the smallest or largest entry wins
 * @returns Position of the extreme value
 */
export default function posextreme(
  values: unknown[],
  missing: boolean | number,
  level: number | boolean | undefined,
  direction: Types.NumerixDirection
): number | number[] {
  const ignore = missing === true || level === true
  const resolved = typeof missing === 'number'
    ? missing
    : typeof level === 'number'
    ? level
    : undefined
  const planar = Array.isArray(values[0])
  if (!planar && resolved !== undefined && resolved !== 0 && resolved !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  if (planar && resolved !== undefined) {
    if (resolved !== 1 && resolved !== -1 && resolved !== 0 && resolved !== -2) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    const matrix = values as unknown[][]
    const height = matrix.length
    const horizontal = resolved === 1 || resolved === -1
    const buffer = horizontal ? undefined : new Array<unknown>(height)
    return Array.from(
      { length: horizontal ? height : (matrix[0]?.length ?? 0) },
      (_outer, index) =>
        posextreme(
          horizontal ? (matrix[index] ?? []) : column(matrix, height, index, buffer!, 0),
          ignore,
          undefined,
          direction
        ) as number
    )
  }
  const outer = planar ? (values as unknown[][]) : [values]
  let winner = -1
  let reals = direction === 'min' ? Infinity : -Infinity
  let imags = reals
  let position = 0
  let halted = false
  for (let slice = 0; slice < outer.length; slice++) {
    const items = (outer[slice] ?? []) as unknown[]
    for (let inner = 0; inner < items.length; inner++) {
      if (!halted) {
        const entry = items[inner]
        const shaped = shape(entry)
        const first = shaped ? entry.re : Number(entry ?? 0)
        const second = shaped ? entry.im : 0
        if (Number.isNaN(first) || Number.isNaN(second)) {
          if (!ignore) {
            winner = position
            halted = true
          }
        } else if (
          winner < 0 ||
          (direction === 'min'
            ? first < reals || (first === reals && second < imags)
            : first > reals || (first === reals && second > imags))
        ) {
          reals = first
          imags = second
          winner = position
        }
      }
      position++
    }
  }
  if (position === 0) {
    throw new RangeError(`attempt to get arg${direction} of an empty sequence`)
  }
  if (winner < 0) {
    throw new RangeError('All-NaN slice encountered')
  }
  return winner
}
