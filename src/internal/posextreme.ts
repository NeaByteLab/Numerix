import type * as Types from '@app/types.ts'
import allindex from '@app/internal/allindex.ts'
import axindex from '@app/internal/axindex.ts'
import index1d from '@app/internal/index1d.ts'
import sentinel from '@app/internal/sentinel.ts'

/**
 * Find the extreme position of values.
 * @description Searches for the position of the extreme entry.
 * @param values - Values to search for the extreme position
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the extreme is sought
 * @param direction - Whether the smallest or largest entry wins
 * @returns Position of the extreme value
 */
export default function posextreme(
  values: unknown[],
  nan: boolean | number,
  axis: number | undefined,
  direction: Types.NumerixDirection
): number | number[] {
  const skip = typeof nan === 'boolean' ? nan : false
  if (!Array.isArray(values[0])) {
    return index1d(values as number[], skip, direction)
  }
  if (axis !== undefined) {
    return axindex(values as number[][], axis, skip, direction)
  }
  const state = { position: 0, bestIndex: 0, best: sentinel(direction), hitNan: false }
  allindex(values, skip, direction, state)
  return state.bestIndex
}
