import * as Internal from '@app/internal/index.ts'

/**
 * Test whether all entries are truthy.
 * @description Combines truthiness along the requested axis.
 * @param values - Values to inspect
 * @param axis - Axis along which the results are combined
 * @returns Combined truthiness for the requested axis
 */
export default function all(
  values: unknown[],
  axis?: number
): boolean | boolean[] {
  return Internal.truthy(values, axis, 'all')
}
