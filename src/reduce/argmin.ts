import * as Internal from '@app/internal/index.ts'

/**
 * Find the smallest value index.
 * @description Searches a flat vector for the minimum entry.
 * @param values - Vector to search for the minimum
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the minimum is sought
 * @returns Index of the minimum value
 */
export default function argmin(
  values: unknown[],
  nan: boolean | number = false,
  axis?: number
): number | number[] {
  return Internal.posextreme(values, nan, axis, 'min')
}
