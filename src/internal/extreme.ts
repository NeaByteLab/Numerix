import type * as Types from '@app/types.ts'
import axis from '@app/internal/axis.ts'
import extremeone from '@app/internal/extremeone.ts'
import nanarg from '@app/internal/nanarg.ts'
import pair from '@app/internal/pair.ts'
import sweep from '@app/internal/sweep.ts'

/**
 * Find the extreme value of values.
 * @description Searches for the extreme entry along an axis.
 * @param values - Values to search for the extreme
 * @param nan - Invalid entries or a flag to skip them
 * @param skip - Whether invalid entries are skipped
 * @param target - Axis along which the extreme is sought
 * @param direction - Whether the smallest or largest entry wins
 * @returns Extreme value for the requested axis
 */
export default function extreme(
  values: unknown[],
  nan: number[] | boolean | number | undefined,
  skip: boolean | number,
  wanted: number | undefined,
  direction: Types.NumerixDirection
): number | number[] {
  const peer = Array.isArray(nan) ? nan : undefined
  const raw = typeof nan === 'number' || typeof nan === 'boolean' ? nan : undefined
  const { skip: ignoring, target } = nanarg(raw, wanted, skip)
  if (target !== undefined && Array.isArray(values[0])) {
    return axis(values as number[][], target, ignoring, direction)
  }
  if (peer !== undefined) {
    return pair(values, peer, ignoring, direction)
  }
  return Array.isArray(values[0])
    ? sweep(values, ignoring, direction)
    : extremeone(values as number[], ignoring, direction)
}
