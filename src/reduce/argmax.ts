import * as Internal from '@app/internal/index.ts'

/**
 * Find the largest value index.
 * @description Searches a flat vector for the maximum entry.
 * @param values - Vector to search for the maximum
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the maximum is sought
 * @returns Index of the maximum value
 */
export default function argmax(
  values: unknown[],
  nan: boolean | number = false,
  axis?: number
): number | number[] {
  return Internal.posextreme(values, nan, axis, 'max')
}
