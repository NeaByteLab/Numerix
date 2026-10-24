import * as Internal from '@app/internal/index.ts'

/**
 * Find the largest value.
 * @description Searches for the maximum entry along an axis.
 * @param values - Values to search for the maximum
 * @param nan - Invalid entries or a flag to skip them
 * @param skip - Whether invalid entries are skipped
 * @param axis - Axis along which the maximum is sought
 * @returns Maximum value for the requested axis
 */
export default function max(
  values: unknown[],
  nan?: number[] | boolean | number,
  skip: boolean | number = false,
  axis?: number
): number | number[] {
  return Internal.extreme(values, nan, skip, axis, 'max')
}
