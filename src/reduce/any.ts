import * as Internal from '@app/internal/index.ts'

/**
 * Test whether any entry is truthy.
 * @description Combines truthiness along the requested axis.
 * @param values - Values to inspect
 * @param axis - Axis along which the results are combined
 * @returns Combined truthiness for the requested axis
 */
export default function any(
  values: unknown[],
  axis?: number
): boolean | boolean[] {
  return Internal.truthy(values, axis, 'any')
}
