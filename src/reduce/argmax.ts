import * as Internal from '@app/internal/index.ts'

/**
 * Find the largest value index.
 * @description Searches a flat vector for the maximum entry.
 * @param values - Vector to search for the maximum
 * @param invalid - Whether invalid entries are skipped
 * @param level - Axis along which the maximum is sought
 * @returns Index of the maximum value
 */
export default function argmax(
  values: unknown[],
  invalid: boolean | number = false,
  level?: number | boolean
): number | number[] {
  return Internal.posextreme(values, invalid, level, 'max')
}
