import * as Internal from '@app/internal/index.ts'

/**
 * Find the smallest value.
 * @description Searches for the minimum entry along an axis.
 * @param values - Values to search for the minimum
 * @param nan - Invalid entries or a flag to skip them
 * @param skip - Whether invalid entries are skipped
 * @param axis - Axis along which the minimum is sought
 * @returns Minimum value for the requested axis
 */
export default function min(
  values: unknown[],
  nan?: number[] | boolean | number,
  skip: boolean | number = false,
  axis?: number
): number | number[] {
  return Internal.extreme(values, nan, skip, axis, 'min')
}
